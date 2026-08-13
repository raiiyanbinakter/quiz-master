import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, writeBatch } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase';
import { 
  ArrowLeft, BookOpen, TrendingUp, HeartHandshake, Flame, Award, 
  Sparkles, Settings, Trash2, Loader2, AlertTriangle, ChevronRight, 
  ShoppingBag, CheckCircle2, Lock, BarChart2, ShieldAlert, Target,
  Compass, Users2, Layers, Check
} from 'lucide-react';
import UserAvatar from './UserAvatar';
import { StudentGameProfile, LearningRoute } from '../types/gamification';
import { INITIAL_ACHIEVEMENTS, getLockedAchievementHint } from '../utils/gamification';

interface ProfileProps {
  user: any;
  userData?: any;
  gameProfile?: StudentGameProfile | null;
  onBack: () => void;
  onNavigate?: (view: string) => void;
  onUpgradeClick?: () => void;
  onOpenRouteSetup?: () => void;
}

interface ResultEntry {
  id: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  createdAt: any;
}

const ROUTE_LABELS: Record<LearningRoute, string> = {
  academic: 'একাডেমিক প্রস্তুতি (SSC / HSC)',
  medical: 'মেডিকেল ভর্তি প্রস্তুতি',
  varsity: 'বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি',
  engineering: 'ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি'
};

export default function Profile({ user, userData, gameProfile, onBack, onNavigate, onOpenRouteSetup }: ProfileProps) {
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  useEffect(() => {
    const fetchUserResults = async () => {
      if (!user?.uid) return;
      
      try {
        const q = query(
          collection(db, 'results'),
          where('userId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ResultEntry[];
        
        data.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
        setResults(data);
      } catch (error) {
        console.warn("Error fetching user results:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserResults();
  }, [user]);

  // Meaningful progress calculation
  const progressPoints = gameProfile?.progressPoints || userData?.progressPoints || 0;
  const helpPoints = gameProfile?.helpPoints || userData?.reputation || 0;
  const currentStreak = gameProfile?.currentStreak || userData?.currentStreak || 0;
  const selectedRoute = gameProfile?.selectedRoute || userData?.selectedRoute;
  const targetExam = gameProfile?.targetExam || userData?.targetExam || 'নির্ধারিত হয়নি';

  const totalQuizzesTaken = results.length;
  const unlockedChaptersCount = (userData?.unlockedChapters || []).length;
  const acceptedAnswersCount = userData?.mentorStats?.acceptedAnswers || 0;

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError('');

    try {
      if (!auth.currentUser) throw new Error("No user logged in");
      
      const q = query(collection(db, 'results'), where('userId', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => {
        batch.delete(d.ref);
      });
      await batch.commit();

      await deleteDoc(doc(db, 'users', auth.currentUser.uid));
      await deleteUser(auth.currentUser);
      onBack();
    } catch (error: any) {
      console.error("Error deleting account:", error);
      if (error.code === 'auth/requires-recent-login') {
        setDeleteError("নিরাপত্তার কারণে, অ্যাকাউন্ট ডিলিট করার জন্য আপনাকে নতুন করে লগইন করতে হবে। অনুগ্রহ করে লগআউট করে আবার লগইন করুন।");
      } else {
        setDeleteError(`ত্রুটি হয়েছে: ${error.message}`);
      }
    } finally {
      setDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. PROFILE HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white cursor-pointer"
            title="ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">আমার প্রোফাইল</h1>
            <p className="text-xs md:text-sm text-slate-400">আপনার পড়াশোনার সামগ্রিক অগ্রগতি ও প্রোফাইল বিবরণী</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2 border-t border-slate-800/80">
          <UserAvatar 
            url={userData?.equippedAvatar} 
            borderId={userData?.equippedBorder} 
            className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 shadow-lg" 
          />
          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {user.displayName || userData?.name || 'শিক্ষার্থী'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {user.email}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-extrabold shadow-sm">
                <Flame className={`w-4 h-4 text-amber-400 ${currentStreak > 0 ? 'fill-amber-400/20 animate-pulse' : ''}`} />
                <span>{currentStreak} দিনের ধারাবাহিকতা</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ROUTE & TARGET CARD */}
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl shrink-0 mt-0.5">
            <Compass className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-400">আপনার প্রস্তুতির পথ</span>
            <h3 className="text-lg font-extrabold text-white">
              {selectedRoute ? ROUTE_LABELS[selectedRoute as LearningRoute] : 'প্রস্তুতির পথ নির্বাচন করা হয়নি'}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              লক্ষ্য: <span className="text-slate-200 font-bold">{targetExam}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onOpenRouteSetup}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer shrink-0 self-stretch md:self-auto justify-center"
        >
          <span>{selectedRoute ? 'পথ পরিবর্তন করুন' : 'প্রস্তুতির পথ বেছে নিন'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. THREE CLEAR PROGRESS VALUES */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-emerald-400" />
          পড়াশোনার অগ্রগতি
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Progress Value 1: Topic-level Mastery */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-300">১. আয়ত্ত (Mastery)</h3>
              </div>
              
              <div className="text-2xl font-black text-white mb-2">
                {unlockedChaptersCount}টি টপিক/অধ্যায়
              </div>
              <p className="text-xs text-emerald-400 font-bold">
                বাস্তব অনুশীলন ও সঠিক পারফরম্যান্সের ভিত্তিতে
              </p>
            </div>
            
            <p className="text-xs text-slate-400 font-medium mt-4 pt-3 border-t border-slate-800">
              পর্যাপ্ত প্রশ্নের সঠিক উত্তরের মাধ্যমে অর্জিত
            </p>
          </div>

          {/* Progress Value 2: Progress Points */}
          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-300">২. অগ্রগতি পয়েন্ট</h3>
              </div>

              <div className="text-2xl font-black text-white mb-2">
                {progressPoints} পয়েন্ট
              </div>
              <p className="text-xs text-cyan-400 font-bold">
                কুইজ, রিভিশন ও মক টেস্ট থেকে অর্জিত
              </p>
            </div>

            <p className="text-xs text-slate-400 font-medium mt-4 pt-3 border-t border-slate-800">
              বাস্তব শেখার প্রতিটি পদক্ষেপে বৃদ্ধি পায়
            </p>
          </div>

          {/* Progress Value 3: Help Points */}
          <div className="bg-slate-900 border border-violet-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-300">৩. সহায়তা পয়েন্ট</h3>
              </div>

              <div className="text-2xl font-black text-white mb-2">
                {helpPoints} পয়েন্ট
              </div>
              <p className="text-xs text-violet-400 font-bold">
                {acceptedAnswersCount > 0 ? `${acceptedAnswersCount}টি গৃহীত উত্তর` : 'ডাউট ফোরামে সহায়তার মাধ্যমে অর্জিত'}
              </p>
            </div>

            <p className="text-xs text-slate-400 font-medium mt-4 pt-3 border-t border-slate-800">
              সহপাঠীদের সাহায্য করার স্বীকৃতি
            </p>
          </div>

        </div>
      </div>

      {/* 4. ACHIEVEMENTS SECTION */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          আমার অর্জন
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {INITIAL_ACHIEVEMENTS.map((ach) => {
            const achProgress = gameProfile?.achievementProgress || {};
            let isUnlocked = false;

            if (ach.id === 'first_quiz') {
              isUnlocked = (achProgress.completed_quizzes || totalQuizzesTaken) >= 1;
            } else if (ach.id === 'streak_3') {
              isUnlocked = currentStreak >= 3;
            } else if (ach.id === 'review_5') {
              isUnlocked = (achProgress.completed_reviews || 0) >= 5;
            } else if (ach.id === 'review_10') {
              isUnlocked = (achProgress.completed_reviews || 0) >= 10;
            } else if (ach.id === 'help_5') {
              isUnlocked = (achProgress.helpful_answers || acceptedAnswersCount) >= 5;
            } else if (ach.id === 'chapter_mastery') {
              isUnlocked = (achProgress.mastered_topics || unlockedChaptersCount) >= 1;
            }

            const lockedHint = getLockedAchievementHint(ach, gameProfile);

            return (
              <div 
                key={ach.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isUnlocked 
                    ? 'bg-slate-900 border-amber-500/40 text-amber-300 shadow-lg' 
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl ${isUnlocked ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-600'}`}>
                    <Award className="w-5 h-5" />
                  </div>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <h3 className="font-extrabold text-white text-sm mb-1">{ach.title}</h3>
                <p className="text-xs leading-relaxed font-medium text-slate-300 mb-2">
                  {ach.description}
                </p>
                {!isUnlocked && (
                  <p className="text-[11px] text-amber-400/80 font-medium pt-2 border-t border-slate-800/80">
                    {lockedHint}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. FUTURE FAIR COMPETITION PLACEHOLDER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
            <Users2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">
              একই লক্ষ্য, একই স্তরের প্রতিযোগিতা
            </h2>
            <p className="text-xs text-slate-400">
              আপনার প্রস্তুতির পথ, বিষয় এবং অনুশীলনের স্তর অনুযায়ী সঠিক প্রতিযোগিতা সাজানো হবে।
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-3">
          {!selectedRoute ? (
            <div className="space-y-3">
              <p className="text-amber-300 font-bold">
                প্রতিযোগিতায় অংশ নেওয়ার আগে আপনার প্রস্তুতির পথ নির্বাচন করুন।
              </p>
              <button
                onClick={onOpenRouteSetup}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/20 inline-flex items-center gap-2"
              >
                <span>প্রস্তুতির পথ বেছে নিন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-slate-300 font-medium">
              প্রতিযোগিতা শিগগিরই চালু হবে। এখন ব্যক্তিগত অগ্রগতি ও অনুশীলনে মন দিন।
            </p>
          )}
        </div>
      </div>

      {/* 6. ACCOUNT SETTINGS SECTION */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <button
          onClick={() => setShowAccountSettings(!showAccountSettings)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-slate-300 rounded-2xl border border-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">অ্যাকাউন্ট সেটিংস</h3>
              <p className="text-xs text-slate-400">অ্যাকাউন্ট তথ্য ও কনফিগারেশন</p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showAccountSettings ? 'rotate-90' : ''}`} />
        </button>

        {showAccountSettings && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>ইমেইল:</span>
                <span className="font-bold text-white">{user.email}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>ইউজার আইডি:</span>
                <span className="font-mono text-slate-500 text-[10px]">{user.uid}</span>
              </div>
            </div>

            {deleteError && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-3 text-xs text-rose-300">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <p>{deleteError}</p>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setShowDeleteConfirmModal(true)}
                className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold transition-colors border border-rose-500/30 flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>আমার অ্যাকাউন্ট ডিলিট করুন</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">অ্যাকাউন্ট ডিলিট নিশ্চিতকরণ</h3>
                <p className="text-xs text-rose-300">এই কাজটিকে আর পূর্বাবস্থায় ফিরিয়ে আনা যাবে না</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              আপনি যদি আপনার অ্যাকাউন্ট মুছে ফেলেন, তবে আপনার প্রোফাইল, সমস্ত কুইজ ডাটা এবং সংরক্ষণ চিরতরে মুছে যাবে।
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                disabled={deleting}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs border border-slate-700 cursor-pointer transition-colors"
              >
                বাতিল করুন
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{deleting ? 'ডিলিট হচ্ছে...' : 'হাঁ, ডিলিট করুন'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
