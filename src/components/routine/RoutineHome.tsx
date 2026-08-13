import React from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  BookOpen,
  BarChart3,
  ListChecks,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { StudyPlan, StudySession } from '../../types/routine';
import { ROUTINE_CONFIG } from '../../constants/routineConfig';
import { StudentTemplateSection } from './StudentTemplateSection';
import { UserStudySessionsSection } from './UserStudySessionsSection';

interface RoutineHomeProps {
  userId?: string | null;
  plan: StudyPlan | null;
  autoOpenAddTask?: boolean;
  autoFocusToday?: boolean;
  onStartSetup: () => void;
  onStartSession: (session: StudySession) => void;
  onReplan: () => void;
  onViewTab: (tab: 'weekly' | 'syllabus' | 'insights' | 'feasibility') => void;
  onApplyTemplate?: (newPlan: StudyPlan) => void;
}

export const RoutineHome: React.FC<RoutineHomeProps> = ({
  userId,
  plan,
  autoOpenAddTask,
  autoFocusToday,
  onStartSetup,
  onStartSession,
  onReplan,
  onViewTab,
  onApplyTemplate,
}) => {

  if (!plan) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center space-y-6">
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-3xl border border-indigo-500/30 shadow-2xl">
          <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/40">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">
            স্মার্ট রুটিন ইন্টেলিজেন্স (Routine Intelligence)
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
            আপনার এইচএসসি বা ভর্তি পরীক্ষার সিলেবাস এবং দৈনন্দিন ফ্রি টাইমের সাথে সামঞ্জস্য রেখে একটি বিজ্ঞানসম্মত, ব্যাখ্যাযোগ্য এবং পরিবর্তনযোগ্য রুটিন তৈরি করুন।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 text-left max-w-3xl mx-auto">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-indigo-400 font-bold mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> বিজ্ঞানসম্মত বিরতি
              </div>
              <p className="text-xs text-slate-400">
                Spaced practice (১, ৩, ৭, ১৪ দিন) এবং ২০% বাফার টাইম রেখে বাস্তবসম্মত রুটিন।
              </p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> স্বচ্ছ ও নিয়ন্ত্রণযোগ্য
              </div>
              <p className="text-xs text-slate-400">
                AI আপনাকে পরামর্শ দেবে, কিন্তু রুটিনের সম্পূর্ণ নিয়ন্ত্রণ থাকবে আপনার হাতে।
              </p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-amber-400 font-bold mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> সিলেবাস ম্যাপিং
              </div>
              <p className="text-xs text-slate-400">
                NCTB, মেডিকেল ও বুয়েটের সিলেবাস ব্লুপ্রিন্ট ও সূত্র রেফারেন্স সহ।
              </p>
            </div>
          </div>

          <button
            onClick={onStartSetup}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <PlusCircle className="w-6 h-6" /> রুটিন সেটআপ করুন (Create Routine)
          </button>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const today = new Date().toISOString().split('T')[0];
  const totalSessions = plan.sessions.length;
  const completedSessions = plan.sessions.filter(s => s.status === 'completed').length;
  const progressPercent = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  const totalPlannedMinutes = plan.sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const completedMinutes = plan.sessions
    .filter(s => s.status === 'completed')
    .reduce((acc, s) => acc + (s.checkIn?.durationSpentMinutes || s.durationMinutes), 0);

  // Next upcoming session
  const upcomingSessions = plan.sessions
    .filter(s => s.status === 'planned' && s.date >= today)
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));

  const nextSession = upcomingSessions[0] || null;

  // Days remaining until target exam
  const startMs = new Date().getTime();
  const targetMs = new Date(plan.targetExamDate).getTime();
  const daysRemaining = Math.max(0, Math.ceil((targetMs - startMs) / (1000 * 60 * 60 * 24)));

  const routeLabel = ROUTINE_CONFIG.ROUTE_LABELS[plan.route]?.bn || plan.route;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">
              {routeLabel}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              লক্ষ্য: {plan.targetExamDate} ({daysRemaining} দিন বাকি)
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{plan.title}</h1>
          <p className="text-slate-400 text-sm mt-1">
            মোট পরিকল্পিত সময়: Math.round({totalPlannedMinutes / 60}) ঘণ্টা | সম্পন্ন: Math.round({completedMinutes / 60}) ঘণ্টা
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReplan}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-600 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" /> পুনঃপরিকল্পনা (Replan)
          </button>
          <button
            onClick={onStartSetup}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
          >
            নতুন সেটআপ
          </button>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">অগ্রগতি (Progress)</div>
            <div className="text-xl font-bold text-white">{progressPercent}%</div>
            <div className="text-xs text-slate-500">{completedSessions}/{totalSessions} সেশন</div>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">সম্পন্ন সময়</div>
            <div className="text-xl font-bold text-white">{Math.round(completedMinutes)} মি.</div>
            <div className="text-xs text-slate-500">মোট {totalPlannedMinutes} মি.</div>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">পরীক্ষার বাকি</div>
            <div className="text-xl font-bold text-white">{daysRemaining} দিন</div>
            <div className="text-xs text-slate-500">টার্গেট: {plan.targetExamDate}</div>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
            <ListChecks className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">পছন্দের সময়</div>
            <div className="text-xl font-bold text-white">{plan.preferences.preferredSessionMinutes} মিনিট</div>
            <div className="text-xs text-slate-500">২০% বাফার সহ</div>
          </div>
        </div>
      </div>

      {/* Next Session Highlight Box */}
      {nextSession ? (
        <div className="bg-gradient-to-r from-indigo-900/60 to-slate-800 border-2 border-indigo-500/50 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> পরবর্তী পঠন সেশন (Next Scheduled Session)
            </span>
            <span className="text-xs text-slate-400">
              তারিখ: {nextSession.date} | সময়: {nextSession.startTime} ({nextSession.durationMinutes} মি.)
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-1">
            {nextSession.topicTitle || nextSession.task}
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            বিষয়: <span className="text-indigo-300 font-medium">{nextSession.subjectName}</span>
          </p>

          {nextSession.recommendationReasons && nextSession.recommendationReasons.length > 0 && (
            <div className="bg-slate-900/60 p-3 rounded-xl mb-4 border border-slate-700/60 text-xs space-y-1">
              <div className="text-indigo-400 font-semibold mb-1">সুপারিশের কারণ (Recommendation Reasons):</div>
              {nextSession.recommendationReasons.map((reason, idx) => (
                <div key={idx} className="text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  {reason}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onStartSession(nextSession)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" /> সেশন শুরু করুন (Start Focus Session)
            </button>
            <button
              onClick={() => onViewTab('weekly')}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm px-5 py-3 rounded-xl border border-slate-600 transition-colors cursor-pointer"
            >
              সাপ্তাহিক রুটিনে দেখুন
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">বর্তমান সেশনসমূহ সম্পন্ন হয়েছে!</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            আপনার পরিকল্পিত সব সেশন সম্পন্ন হয়েছে অথবা নতুন কোনো পরিকল্পিত সেশন নেই।
          </p>
          <button
            onClick={onReplan}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            নতুন সেশন পুনঃপরিকল্পনা করুন (Replan)
          </button>
        </div>
      )}

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onViewTab('weekly')}
          className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 p-5 rounded-2xl text-left transition-all hover:border-indigo-500/50 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base mb-1">সাপ্তাহিক ক্যালেন্ডার</h4>
          <p className="text-xs text-slate-400">সেশন এডিট, ড্র্যাগ, লক এবং সম্পূর্ণ মার্ক করার সুবিধা</p>
        </button>

        <button
          onClick={() => onViewTab('syllabus')}
          className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 p-5 rounded-2xl text-left transition-all hover:border-indigo-500/50 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base mb-1">সিলেবাস ম্যাপ</h4>
          <p className="text-xs text-slate-400">অফিসিয়াল সোর্স, গুরুত্ব ও পূর্বশর্ত সহ টপিকের বিবরণ</p>
        </button>

        <button
          onClick={() => onViewTab('insights')}
          className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 p-5 rounded-2xl text-left transition-all hover:border-indigo-500/50 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base mb-1">রুটিন ইনসাইটস</h4>
          <p className="text-xs text-slate-400">পড়াশোনার সময়, কুইজের যথার্থতা এবং ভুল প্যাটার্ন বিশ্লেষণ</p>
        </button>

        <button
          onClick={() => onViewTab('feasibility')}
          className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 p-5 rounded-2xl text-left transition-all hover:border-indigo-500/50 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-white text-base mb-1">বাস্তবসম্মত রিপোর্ট</h4>
          <p className="text-xs text-slate-400">ফ্রি সময় বনাম টপিকের চাহিদার সমতা ও বাফার বিশ্লেষণ</p>
        </button>
      </div>

      {/* User Study Sessions List & Custom Task Form */}
      <UserStudySessionsSection 
        userId={userId || null} 
        autoOpenAddTask={autoOpenAddTask} 
        autoFocusToday={autoFocusToday} 
      />

      {/* Student Routine Template & Event Center */}
      <StudentTemplateSection 
        userId={userId || null} 
        currentPlan={plan} 
        onApplyTemplate={(newPlan) => onApplyTemplate && onApplyTemplate(newPlan)} 
      />
    </div>
  );
};

