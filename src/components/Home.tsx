import React, { useEffect, useState } from 'react';
import { 
  BookOpen, Sparkles, CheckCircle, ChevronRight,
  Flame, ArrowRight, Calendar, Target, HelpCircle,
  TrendingUp, Award, BookMarked, Stethoscope, Building2,
  Clock, Plus, UserCheck, Compass, History, FileText,
  Atom, FlaskConical
} from 'lucide-react';
import { uiCopy } from '../content/uiCopy';
import DailyMissions from './DailyMissions';
import UserAvatar from './UserAvatar';
import { fetchUserStudySessions, UserStudySession } from '../lib/routineFirestore';
import { groupUserSessions, getTypeLabel } from '../utils/studySessionUtils';
import { StudentGameProfile } from '../types/gamification';
import { getOrResetDailyGoals } from '../utils/gamification';

interface HomeProps {
  user?: any;
  userData?: any;
  gameProfile?: StudentGameProfile | null;
  onSelectCategory: (category: 'academic' | 'board' | 'medical' | 'varsity') => void;
  onShowLeaderboard?: () => void;
  onShowShop?: () => void;
  onClaimReward?: (missionId: string) => void;
  onNavigateToRoutine?: (options?: { openAddTask?: boolean; focusToday?: boolean }) => void;
  onNavigateToLogin?: () => void;
  onNavigateToDoubtArena?: () => void;
  onOpenRouteSetup?: () => void;
  onNavigateToMedicalDashboard?: () => void;
  onNavigateToMedicalSubView?: (view: string) => void;
}

export default function Home({ 
  user,
  userData,
  gameProfile,
  onSelectCategory, 
  onShowLeaderboard, 
  onShowShop, 
  onClaimReward,
  onNavigateToRoutine,
  onNavigateToLogin,
  onNavigateToDoubtArena,
  onOpenRouteSetup,
  onNavigateToMedicalDashboard,
  onNavigateToMedicalSubView
}: HomeProps) {
  const [sessions, setSessions] = useState<UserStudySession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState<boolean>(true);

  const studentName = userData?.displayName || user?.displayName || 'শিক্ষার্থী';
  const currentStreak = gameProfile?.currentStreak ?? userData?.currentStreak ?? 0;
  const progressPoints = gameProfile?.progressPoints ?? userData?.progressPoints ?? 0;
  const unlockedChaptersCount = userData?.unlockedChapters?.length || 0;

  const selectedRoute = gameProfile?.selectedRoute || userData?.selectedRoute;

  const todayStr = new Date().toISOString().split('T')[0];
  const { dailyGoals } = getOrResetDailyGoals(gameProfile?.dailyGoals, gameProfile?.dailyGoalDate, todayStr);
  const completedGoalsCount = dailyGoals.filter(g => g.completed || g.current >= g.target).length;

  useEffect(() => {
    let isMounted = true;
    async function loadSessions() {
      setLoadingSessions(true);
      try {
        const loaded = await fetchUserStudySessions(user?.uid || null);
        if (isMounted) setSessions(loaded);
      } catch (err) {
        console.warn('Home session fetch error:', err);
      } finally {
        if (isMounted) setLoadingSessions(false);
      }
    }
    loadSessions();
    return () => { isMounted = false; };
  }, [user?.uid]);

  // Route-filtered study sessions: Keep sessions for current route OR legacy sessions without route tag
  const routeSessions = sessions.filter(s => {
    if (!selectedRoute) return true;
    if (!s.route) return true; // keep legacy tasks
    return s.route === selectedRoute;
  });

  const grouped = groupUserSessions(routeSessions);
  const todaySessions = grouped.todaySessions;
  const todaySession = todaySessions.length > 0 ? todaySessions[0] : null;

  // REVISION CARD TRUTH LOGIC
  const plannedReviews = routeSessions.filter(s => s.type === 'review' && s.status === 'planned');
  const rescueChaptersList = userData?.rescueChapters || [];
  const topicMasteryReviewDue = (userData?.topicMastery || []).filter((tm: any) => tm.status === 'review_due');
  const chapterProgressRescue = (userData?.chapterProgress || []).filter((cp: any) => cp.status === 'rescue');

  const totalReviewItemsCount = 
    plannedReviews.length + 
    rescueChaptersList.length + 
    topicMasteryReviewDue.length + 
    chapterProgressRescue.length;

  const hasRealReviewsNeeded = totalReviewItemsCount > 0;

  const hasRealTopicData = 
    (userData?.chapterProgress || []).length > 0 ||
    (userData?.topicMastery || []).length > 0 ||
    (userData?.unlockedChapters || []).length > 1;

  const handleRoutineClick = () => {
    if (!user && onNavigateToLogin) {
      onNavigateToLogin();
      return;
    }
    if (onNavigateToRoutine) {
      onNavigateToRoutine();
    } else {
      window.history.pushState(null, '', '/routine');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleStartSessionClick = () => {
    if (!user && onNavigateToLogin) {
      onNavigateToLogin();
      return;
    }
    if (onNavigateToRoutine) {
      onNavigateToRoutine({ focusToday: true });
    } else {
      window.history.pushState(null, '', '/routine');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleAddTaskClick = () => {
    if (!user && onNavigateToLogin) {
      onNavigateToLogin();
      return;
    }
    if (onNavigateToRoutine) {
      onNavigateToRoutine({ openAddTask: true });
    } else {
      window.history.pushState(null, '', '/routine');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleQuickCompleteTodaySession = async () => {
    if (!todaySession) return;
    try {
      const { updateUserStudySessionStatus } = await import('../lib/routineFirestore');
      const { recordMeaningfulActionInFirestore } = await import('../lib/gamificationService');
      
      await updateUserStudySessionStatus(user?.uid || null, todaySession.id, 'completed');
      setSessions(prev => prev.map(s => s.id === todaySession.id ? { ...s, status: 'completed' as const, completedAt: new Date().toISOString() } : s));

      const actionType = todaySession.type === 'review'
        ? 'planned_review'
        : todaySession.type === 'custom'
        ? 'custom_session'
        : 'planned_session';

      await recordMeaningfulActionInFirestore(user?.uid || null, {
        eventId: `session_completed_${todaySession.id}`,
        type: actionType,
        durationMinutes: todaySession.durationMinutes || 20
      }, gameProfile);
    } catch (err) {
      console.error('Error completing session from Home:', err);
    }
  };

  const handleDoubtArenaClick = () => {
    if (onNavigateToDoubtArena) {
      onNavigateToDoubtArena();
    } else {
      window.history.pushState(null, '', '/doubt-arena');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const CATEGORIES = [
    {
      id: 'academic',
      title: uiCopy.home.categories.academic.title,
      subTitle: 'HSC Academic',
      desc: uiCopy.home.categories.academic.desc,
      icon: BookOpen,
      accentBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      id: 'board',
      title: uiCopy.home.categories.board.title,
      subTitle: 'Board Drills',
      desc: uiCopy.home.categories.board.desc,
      icon: CheckCircle,
      accentBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      id: 'medical',
      title: uiCopy.home.categories.medical.title,
      subTitle: 'Medical Prep',
      desc: uiCopy.home.categories.medical.desc,
      icon: Stethoscope,
      accentBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'varsity',
      title: uiCopy.home.categories.varsity.title,
      subTitle: 'Varsity Prep',
      desc: uiCopy.home.categories.varsity.desc,
      icon: Building2,
      accentBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    }
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Compact Student Greeting Header & Progress Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <UserAvatar url={userData?.equippedAvatar || userData?.photoURL || user?.photoURL} borderId={userData?.equippedBorder} className="w-12 h-12" />
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs text-slate-400 font-medium">
                {uiCopy.home.greeting}
              </span>
              {selectedRoute && (
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${
                  selectedRoute === 'medical' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  selectedRoute === 'academic' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                  selectedRoute === 'varsity' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                  'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {selectedRoute === 'medical' && 'মেডিকেল ভর্তি'}
                  {selectedRoute === 'academic' && 'একাডেমিক প্রস্তুতি'}
                  {selectedRoute === 'varsity' && 'বিশ্ববিদ্যালয় ভর্তি'}
                  {selectedRoute === 'engineering' && 'ইঞ্জিনিয়ারিং ভর্তি'}
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {studentName}
            </h1>
            <div className="text-xs text-indigo-400 font-semibold mt-0.5">
              {progressPoints} {uiCopy.profile.progressPoints}
            </div>
          </div>
        </div>

        {/* Compact Progress Summary & Route Change */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {onOpenRouteSetup && (
            <button
              onClick={onOpenRouteSetup}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3 py-2 rounded-2xl text-xs font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="পথ পরিবর্তন করুন"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>পথ পরিবর্তন করুন</span>
            </button>
          )}

          <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-2xl flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold leading-none">আজকের লক্ষ্য</div>
              <div className="text-xs font-extrabold text-indigo-300">{completedGoalsCount} / 3 সম্পন্ন</div>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-2xl flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold leading-none">ধারাবাহিকতা</div>
              <div className="text-xs font-extrabold text-amber-400">{currentStreak} দিন</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Hero Card: Real Study Session Data */}
      <div className={`bg-gradient-to-br ${
        selectedRoute === 'medical' ? 'from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-500/30' :
        selectedRoute === 'varsity' ? 'from-cyan-950/60 via-slate-900 to-slate-950 border-cyan-500/30' :
        selectedRoute === 'engineering' ? 'from-amber-950/60 via-slate-900 to-slate-950 border-amber-500/30' :
        'from-indigo-950/60 via-slate-900 to-slate-950 border-indigo-500/30'
      } border rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden`}>
        <div className={`absolute -top-10 -right-10 w-48 h-48 ${
          selectedRoute === 'medical' ? 'bg-emerald-500/10' :
          selectedRoute === 'varsity' ? 'bg-cyan-500/10' :
          selectedRoute === 'engineering' ? 'bg-amber-500/10' :
          'bg-indigo-500/10'
        } rounded-full blur-3xl pointer-events-none`} />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {!user ? (
            /* USER NOT LOGGED IN */
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-bold">
                <UserCheck className="w-3.5 h-3.5" />
                প্রস্তুতির শুরু
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {selectedRoute === 'medical' ? 'মেডিকেল ভর্তি প্রস্তুতির পরিকল্পনা' :
                 selectedRoute === 'varsity' ? 'বিশ্ববিদ্যালয় ভর্তি প্রস্তুতির পরিকল্পনা' :
                 selectedRoute === 'engineering' ? 'ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতির পরিকল্পনা' :
                 'একাডেমিক প্রস্তুতির পরিকল্পনা'}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                লগইন করলে আপনার কুইজ, রিভিশন ও দৈনিক পড়ার রুটিন এক জায়গায় সংরক্ষিত থাকবে।
              </p>
            </div>
          ) : todaySession ? (
            /* TODAY PLANNED SESSION EXISTS */
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                আজকের পড়া
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {todaySession.task}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{todaySession.durationMinutes} মিনিট</span>
                <span>•</span>
                <span className="text-emerald-300 font-bold">{getTypeLabel(todaySession.type)}</span>
              </p>
            </div>
          ) : selectedRoute === 'medical' ? (
            /* NO PLANNED SESSION TODAY FOR MEDICAL ROUTE */
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-bold">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                মেডিকেল ভর্তি প্রস্তুতি
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                মেডিকেল প্রস্তুতির জন্য আজকের একটি পড়া শুরু করুন
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                জীববিজ্ঞান, রসায়ন ও পদার্থবিজ্ঞানের অনুশীলনী প্রশ্নব্যাংক ও বিগত বছরের প্রশ্ন সমাধান করুন।
              </p>
            </div>
          ) : selectedRoute === 'varsity' ? (
            /* VARSITY ROUTE */
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                বিশ্ববিদ্যালয় ভর্তি অনুশীলনে এগিয়ে থাকুন
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                ঢাকা বিশ্ববিদ্যালয় ও গুচ্ছ বিশ্ববিদ্যালয় স্ট্যান্ডার্ড প্রশ্নের নিয়মিত অনুশীলন করুন।
              </p>
            </div>
          ) : selectedRoute === 'engineering' ? (
            /* ENGINEERING ROUTE */
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs font-bold">
                <Atom className="w-3.5 h-3.5 text-amber-400" />
                ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                ইঞ্জিনিয়ারিং গাণিতিক সমস্যা সমাধানে দক্ষতা বাড়ান
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                উচ্চতর গণিত, পদার্থবিজ্ঞান ও রসায়নের গাণিতিক অনুশীলনে মনোযোগ দিন।
              </p>
            </div>
          ) : (
            /* NO PLANNED SESSION TODAY DEFAULT */
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                আজকের পড়ার লক্ষ্য
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                আজকের জন্য এখনো কোনো কাজ ঠিক করা হয়নি
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                কুইজ শেষ করার পর রিভিশন যোগ করুন অথবা নিজের একটি পড়ার কাজ তৈরি করুন।
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 shrink-0">
            {!user ? (
              <button
                onClick={() => onNavigateToLogin ? onNavigateToLogin() : onSelectCategory('academic')}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm px-6 py-4 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                লগইন করুন
              </button>
            ) : todaySession ? (
              <>
                <button
                  onClick={handleStartSessionClick}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm px-5 py-4 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  এখন শুরু করুন
                </button>
                <button
                  onClick={handleQuickCompleteTodaySession}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold text-xs px-4 py-4 rounded-2xl border border-emerald-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  সম্পন্ন করুন
                </button>
                <button
                  onClick={handleRoutineClick}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-4 rounded-2xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  রুটিন দেখুন
                </button>
              </>
            ) : selectedRoute === 'medical' ? (
              <>
                <button
                  onClick={() => onNavigateToMedicalDashboard ? onNavigateToMedicalDashboard() : onSelectCategory('medical')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm px-6 py-4 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4" />
                  মেডিকেল অনুশীলন শুরু করুন
                </button>
                <button
                  onClick={handleAddTaskClick}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-4 rounded-2xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  কাজের রুটিন যোগ করুন
                </button>
              </>
            ) : selectedRoute === 'varsity' ? (
              <>
                <button
                  onClick={() => onSelectCategory('varsity')}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-extrabold text-sm px-6 py-4 rounded-2xl transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  বিশ্ববিদ্যালয় অনুশীলন
                </button>
                <button
                  onClick={handleAddTaskClick}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-4 rounded-2xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  কাজের রুটিন যোগ করুন
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelectCategory('academic')}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-sm px-6 py-4 rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  অনুশীলন শুরু করুন
                </button>
                <button
                  onClick={handleAddTaskClick}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-4 rounded-2xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  নিজের কাজ যোগ করুন
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3 & 4. Continue Learning & Weak Topic Cards */}
      <div className={`grid grid-cols-1 ${hasRealReviewsNeeded || hasRealTopicData ? 'md:grid-cols-2' : ''} gap-6`}>
        
        {/* Continue Learning */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <BookMarked className="w-4 h-4" />
              পড়াশোনা চালনা
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {selectedRoute === 'medical' ? 'মেডিকেল অনুশীলনে ফিরে যান' :
               selectedRoute === 'varsity' ? 'বিশ্ববিদ্যালয় অনুশীলনে ফিরে যান' :
               selectedRoute === 'engineering' ? 'ইঞ্জিনিয়ারিং অনুশীলনে ফিরে যান' :
               'একাডেমিক অনুশীলনে ফিরে যান'}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              আয়ত্তে থাকা অধ্যায়: <span className="font-bold text-emerald-400">{unlockedChaptersCount} টি</span>
            </p>
          </div>

          <button
            onClick={() => {
              if (selectedRoute === 'medical') {
                if (onNavigateToMedicalDashboard) onNavigateToMedicalDashboard();
                else onSelectCategory('medical');
              } else if (selectedRoute === 'varsity') {
                onSelectCategory('varsity');
              } else {
                onSelectCategory('academic');
              }
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3.5 px-4 rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {uiCopy.home.continueLearning} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weak Topic / Revision Card: Only shown if real data exists */}
        {hasRealReviewsNeeded ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Target className="w-4 h-4" />
                {uiCopy.home.weakTopicTitle}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {totalReviewItemsCount} টি টপিকে রিভিশন প্রয়োজন
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                কুইজে ভুল হওয়া প্রশ্ন বা পরিকল্পিত রিভিশন সম্পন্ন করুন।
              </p>
            </div>

            <button
              onClick={handleRoutineClick}
              className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs py-3.5 px-4 rounded-2xl border border-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              ১০ মিনিট রিভিশন <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : hasRealTopicData ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Target className="w-4 h-4" />
                রিভিশন
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                এখন কোনো নির্ধারিত রিভিশন নেই
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                আপনার আগের সব অনুশীলন সফলভাবে সম্পন্ন রয়েছে।
              </p>
            </div>
            {/* Subtle notice - NO fake CTA button */}
          </div>
        ) : null}

      </div>

      {/* 5. Today's Goals (Daily Missions) */}
      <DailyMissions 
        gameProfile={gameProfile} 
        userData={userData} 
        onNavigateToRoutine={onNavigateToRoutine} 
      />

      {/* 6. Active Route Specific Preparation Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            {selectedRoute === 'medical' && 'মেডিকেল প্রস্তুতি মডিউলসমূহ'}
            {selectedRoute === 'academic' && 'একাডেমিক অনুশীলন ও বোর্ড প্রস্তুতি'}
            {selectedRoute === 'varsity' && 'বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি'}
            {selectedRoute === 'engineering' && 'ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি'}
            {!selectedRoute && uiCopy.home.pathwayTitle}
          </h2>

          {selectedRoute && onOpenRouteSetup && (
            <button
              onClick={onOpenRouteSetup}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>পথ পরিবর্তন করুন</span>
            </button>
          )}
        </div>

        {/* MEDICAL HOME: Show ONLY 4 Medical Preparation Cards */}
        {selectedRoute === 'medical' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. অনুশীলনী প্রশ্নব্যাংক */}
            <button
              onClick={() => {
                if (onNavigateToMedicalSubView) {
                  onNavigateToMedicalSubView('medical-question-bank');
                } else if (onNavigateToMedicalDashboard) {
                  onNavigateToMedicalDashboard();
                } else {
                  onSelectCategory('medical');
                }
              }}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    ১. অনুশীলনী প্রশ্নব্যাংক
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  জীববিজ্ঞান, রসায়ন ও পদার্থবিজ্ঞানের অধ্যায় ও বিষয়ভিত্তিক নিখুঁত প্রশ্ন অনুশীলন।
                </p>
              </div>
            </button>

            {/* ২. বিগত বছরের প্রশ্ন */}
            <button
              onClick={() => {
                if (onNavigateToMedicalSubView) {
                  onNavigateToMedicalSubView('medical-past-questions');
                } else if (onNavigateToMedicalDashboard) {
                  onNavigateToMedicalDashboard();
                } else {
                  onSelectCategory('medical');
                }
              }}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shrink-0">
                <History className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    ২. বিগত বছরের প্রশ্ন
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  মেডিকেল ভর্তি পরীক্ষার বিগত বছরের অফিশিয়াল প্রশ্ন ও সমাধান বিশ্লেষণ।
                </p>
              </div>
            </button>

            {/* ৩. বিষয়ভিত্তিক পরীক্ষা */}
            <button
              onClick={() => {
                if (onNavigateToMedicalSubView) {
                  onNavigateToMedicalSubView('medical-subject-tests');
                } else if (onNavigateToMedicalDashboard) {
                  onNavigateToMedicalDashboard();
                } else {
                  onSelectCategory('medical');
                }
              }}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    ৩. বিষয়ভিত্তিক পরীক্ষা
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  নির্দিষ্ট বিষয়ভিত্তিক টাইমার সহ রিয়েল-টাইম মেডিকেল স্পেশাল মডেল টেস্ট।
                </p>
              </div>
            </button>

            {/* ৪. মক টেস্ট */}
            <button
              onClick={() => {
                if (onNavigateToMedicalSubView) {
                  onNavigateToMedicalSubView('medical-mock-tests');
                } else if (onNavigateToMedicalDashboard) {
                  onNavigateToMedicalDashboard();
                } else {
                  onSelectCategory('medical');
                }
              }}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    ৪. মক টেস্ট
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  ১০০ নম্বরের পূর্ণাঙ্গ মেডিকেল মডেল টেস্ট ও স্কোর মূল্যায়ন।
                </p>
              </div>
            </button>
          </div>
        )}

        {/* ACADEMIC HOME: Show ONLY Academic Preparation Cards */}
        {selectedRoute === 'academic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. একাডেমিক অনুশীলন */}
            <button
              onClick={() => onSelectCategory('academic')}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                    ১. একাডেমিক অনুশীলন
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  পাঠ্যবইয়ের বিষয় ও অধ্যায়ভিত্তিক মৌলিক এবং উচ্চতর দক্ষতা অনুশীলন।
                </p>
              </div>
            </button>

            {/* 2. বোর্ড প্রস্তুতি */}
            <button
              onClick={() => onSelectCategory('board')}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-purple-500/10 text-purple-400 border-purple-500/20 shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                    ২. বোর্ড প্রস্তুতি
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  এইচএসসি ও এসএসসি বোর্ড পরীক্ষার বিগত বছরের প্রশ্ন ড্রিলে দক্ষতা বাড়ান।
                </p>
              </div>
            </button>

            {/* 3. বিষয়/অধ্যায়ভিত্তিক প্রশ্ন */}
            <button
              onClick={() => onSelectCategory('academic')}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shrink-0">
                <BookMarked className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                    ৩. অধ্যায়ভিত্তিক প্রশ্ন
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  পদার্থবিজ্ঞান, রসায়ন, গণিত ও জীববিজ্ঞানের অধ্যায়ভিত্তিক প্রশ্ন অনুশীলন।
                </p>
              </div>
            </button>

            {/* 4. একাডেমিক রুটিন ও রিভিশন */}
            <button
              onClick={handleRoutineClick}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                    ৪. একাডেমিক রুটিন ও রিভিশন
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  দৈনিক পড়ার লক্ষ্য সেট করুন ও ভুল হওয়া প্রশ্ন নিয়মিত রিভিশন দিন।
                </p>
              </div>
            </button>
          </div>
        )}

        {/* VARSITY HOME: Show ONLY Varsity Preparation Cards */}
        {selectedRoute === 'varsity' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. বিশ্ববিদ্যালয়/ইউনিটভিত্তিক অনুশীলন */}
            <button
              onClick={() => onSelectCategory('varsity')}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 text-left transition-all flex items-start gap-4 cursor-pointer shadow-lg"
            >
              <div className="p-3 rounded-xl border bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    ১. বিশ্ববিদ্যালয়/ইউনিটভিত্তিক অনুশীলন
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  ঢাকা বিশ্ববিদ্যালয়, গুচ্ছ ও অন্যান্য পাবলিক বিশ্ববিদ্যালয়ের ইউনিট প্রস্তুতি।
                </p>
              </div>
            </button>

            {/* 2. বিগত বছরের প্রশ্ন */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-left flex items-start gap-4 opacity-80">
              <div className="p-3 rounded-xl border bg-cyan-500/10 text-cyan-400/70 border-cyan-500/20 shrink-0">
                <History className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    ২. বিগত বছরের প্রশ্ন
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-cyan-400 font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    বিশ্ববিদ্যালয় প্রস্তুতি শিগগিরই আসছে
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  বিশ্ববিদ্যালয় ভর্তি পরীক্ষার অতীতের অফিসিয়াল প্রশ্নব্যাংক সংযোজন চলছে।
                </p>
              </div>
            </div>

            {/* 3. ইউনিট পরীক্ষা */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-left flex items-start gap-4 opacity-80">
              <div className="p-3 rounded-xl border bg-cyan-500/10 text-cyan-400/70 border-cyan-500/20 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    ৩. ইউনিট পরীক্ষা
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-cyan-400 font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    শিগগিরই আসছে
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  ক, খ, গ ইউনিট ভিত্তিক বিষয় পরীক্ষার ডিজিটাল মডেল টেস্ট।
                </p>
              </div>
            </div>

            {/* 4. মক টেস্ট */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-left flex items-start gap-4 opacity-80">
              <div className="p-3 rounded-xl border bg-cyan-500/10 text-cyan-400/70 border-cyan-500/20 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    ৪. মক টেস্ট
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-cyan-400 font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    শিগগিরই আসছে
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  পূর্ণাঙ্গ ঢাবি ও গুচ্ছ স্ট্যান্ডার্ড সময়ভিত্তিক মক টেস্ট।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ENGINEERING HOME: Show ONLY Engineering Preparation Cards */}
        {selectedRoute === 'engineering' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. গণিত সমস্যা সমাধান */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-left flex items-start gap-4 opacity-80">
              <div className="p-3 rounded-xl border bg-amber-500/10 text-amber-400/70 border-amber-500/20 shrink-0">
                <Atom className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    ১. গণিত অনুশীলন
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-amber-400 font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    ইঞ্জিনিয়ারিং প্রস্তুতি শিগগিরই আসছে
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  বুয়েট ও গুচ্ছ ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড গাণিতিক সমস্যা সমাধান।
                </p>
              </div>
            </div>

            {/* 2. পদার্থবিজ্ঞান সমস্যা সমাধান */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-left flex items-start gap-4 opacity-80">
              <div className="p-3 rounded-xl border bg-amber-500/10 text-amber-400/70 border-amber-500/20 shrink-0">
                <Atom className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    ২. পদার্থবিজ্ঞান সমস্যা সমাধান
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-amber-400 font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    শিগগিরই আসছে
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  উচ্চতর গাণিতিক এবং কনসেপচুয়াল ফিজিক্স প্র্যাকটিস সেট।
                </p>
              </div>
            </div>

            {/* 3. রসায়ন অনুশীলন */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-left flex items-start gap-4 opacity-80">
              <div className="p-3 rounded-xl border bg-amber-500/10 text-amber-400/70 border-amber-500/20 shrink-0">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    ৩. রসায়ন অনুশীলন
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-amber-400 font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    শিগগিরই আসছে
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  জৈব ও অজৈব রসায়নের গাণিতিক সমীকরণ ও কৌশল টাইপ প্রশ্ন।
                </p>
              </div>
            </div>

            {/* 4. ইঞ্জিনিয়ারিং মক টেস্ট */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-left flex items-start gap-4 opacity-80">
              <div className="p-3 rounded-xl border bg-amber-500/10 text-amber-400/70 border-amber-500/20 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    ৪. ইঞ্জিনিয়ারিং মক টেস্ট
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-amber-400 font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    শিগগিরই আসছে
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">
                  টাইমড লিখিত ও এমসিকিউ সমন্বিত ইঞ্জিনিয়ারিং মক পরীক্ষা।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ALL ROUTE CARDS SHOWN ONLY IF NO ROUTE IS SELECTED */}
        {!selectedRoute && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (onOpenRouteSetup) {
                      onOpenRouteSetup();
                    } else {
                      onSelectCategory(cat.id as any);
                    }
                  }}
                  className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-left transition-all flex items-start gap-4 cursor-pointer"
                >
                  <div className={`p-3 rounded-xl border ${cat.accentBg} shrink-0`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                        {cat.title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Optional Doubt Help Entry Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {uiCopy.doubtArena.title}
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              {uiCopy.doubtArena.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={handleDoubtArenaClick}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0"
        >
          ডাউট হেল্প নিন
        </button>
      </div>

    </div>
  );
}

