import React, { useState, useEffect, useRef } from 'react';
import { Trophy, CheckCircle2, XCircle, Clock, RotateCcw, Home, Info, ArrowLeft, Loader2, ChevronDown } from 'lucide-react';
import { collection, addDoc, serverTimestamp, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { QuizSummary } from '../types';

interface ResultProps {
  summary: QuizSummary;
  user?: any;
  userData?: any;
  onRetry: () => void;
  onGoHome: () => void;
  onBack: () => void;
  onShowLeaderboard: () => void;
}

export default function Result({ summary, user, userData, onRetry, onGoHome, onBack, onShowLeaderboard }: ResultProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Guard to prevent saving twice
  const saveAttempted = useRef(false);

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});

  const toggleExplanation = (index: number) => {
    setExpandedExplanations(prev => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    if (user && !saveAttempted.current) {
      saveAttempted.current = true;
      saveScore();
    }
  }, [user]);

  const saveScore = async () => {
    setIsSaving(true);
    setErrorMsg('');
    
    try {
      const batch = writeBatch(db);
      
      const newResultRef = doc(collection(db, 'results'));
      batch.set(newResultRef, {
        userId: user?.uid || 'anonymous',
        userName: user?.displayName || 'Un-named User',
        userAvatar: userData?.equippedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        userBorder: userData?.equippedBorder || 'none',
        subjectName: summary.quizName,
        assessmentType: summary.assessmentType,
        score: summary.totalScore,
        totalQuestions: summary.totalQuestions,
        createdAt: serverTimestamp()
      });

      if (user && userData) {
        let updates: any = {};
        let unlockedNewLevel = false;
        
        // Progression Logic
        const passRate = summary.totalQuestions > 0 ? (summary.correctCount / summary.totalQuestions) : 0;
        if (summary.isGamified && passRate >= 0.8 && summary.subjectId && summary.chapterIndex !== undefined) {
           const nextChapterId = `${summary.subjectId}_${summary.chapterIndex + 1}`;
           const currentUnlocked = userData.unlockedChapters || [];
           if (!currentUnlocked.includes(nextChapterId)) {
             updates.unlockedChapters = [...currentUnlocked, nextChapterId];
             updates.coins = (userData.coins || 0) + Math.floor(summary.totalScore * (userData.isPro ? 2 : 1)) + 50;
             unlockedNewLevel = true;
           }
        }
        
        // Energy Mechanics & standard coins if not already updated by unocking
        if (!updates.coins && summary.totalScore > 0) {
           updates.coins = (userData.coins || 0) + Math.floor(summary.totalScore * (userData.isPro ? 2 : 1));
        }

        // Energy deducted at start, no duplicate deduction here
        
        if (Object.keys(updates).length > 0) {
          const userRef = doc(db, 'users', user.uid);
          batch.update(userRef, updates);
        }

        // Show unlock celebration after rendering
        if (unlockedNewLevel) {
          setShowUnlockModal(true);
        }
      }

      await batch.commit();
      setHasSaved(true);
    } catch (error: any) {
      console.error("Error saving score", error);
      setErrorMsg('স্কোর সেভ করতে সমস্যা হয়েছে। দয়া করে ইন্টারনেট কানেকশন বা কনফিগারেশন চেক করুন।');
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">ফলাফল</h1>
          <p className="text-slate-400 text-sm">আপনার পারফরম্যান্স দেখুন</p>
        </div>
      </div>

      {/* Score Summary Card */}
      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl mb-8 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
        
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-6">
          <Trophy className="w-10 h-10 text-emerald-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">কুইজ সম্পন্ন হয়েছে!</h2>
        <p className="text-slate-400 mb-8">আপনার ফলাফল নিচে দেওয়া হলো</p>

        <div className="flex justify-center items-end gap-2 mb-8">
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            {summary.totalScore}
          </span>
          <span className="text-2xl font-bold text-slate-500 mb-2">/ {summary.totalQuestions}</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{summary.correctCount}</div>
            <div className="text-sm text-slate-400">সঠিক</div>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <XCircle className="w-6 h-6 text-rose-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{summary.wrongCount}</div>
            <div className="text-sm text-slate-400">ভুল</div>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <Clock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{summary.skippedCount}</div>
            <div className="text-sm text-slate-400">স্কিপড</div>
          </div>
        </div>

        {/* Save Score Section */}
        <div className="mt-8 pt-8 border-t border-slate-700/50 flex flex-col items-center">
          {isSaving ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>আপনার স্কোর সেভ করা হচ্ছে...</span>
            </div>
          ) : hasSaved ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex flex-col items-center justify-center w-full">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
              <p className="text-emerald-400 font-medium mb-3">আপনার স্কোর লিডারবোর্ডে সেভ হয়েছে!</p>
              <button
                onClick={onShowLeaderboard}
                className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                লিডারবোর্ড দেখুন
              </button>
            </div>
          ) : errorMsg ? (
            <div className="text-rose-400 text-sm text-center">
              <p>{errorMsg}</p>
              <button onClick={saveScore} className="mt-2 text-emerald-400 hover:underline">আবার চেষ্টা করুন</button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-12">
        <button
          onClick={onRetry}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          পুনরায় চেষ্টা করুন
        </button>
        <button
          onClick={onGoHome}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Home className="w-5 h-5" />
          হোম পেজ
        </button>
      </div>

      {/* Review Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-white">উত্তরমালা পর্যালোচনা</h3>
        </div>

        <div className="space-y-6">
          {summary.results.map((result, index) => (
            <div key={index} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex gap-4 mb-4">
                <div className="w-8 h-8 shrink-0 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 font-bold">
                  {index + 1}
                </div>
                <h4 className="text-lg font-medium text-white leading-relaxed">
                  {result.questionText}
                </h4>
              </div>

              <div className="pl-12 space-y-3 mb-4">
                {result.options.map((option, optIdx) => {
                  let optClass = "text-slate-400";
                  let Icon = null;

                  if (option === result.correctAnswer) {
                    optClass = "text-emerald-400 font-medium";
                    Icon = CheckCircle2;
                  } else if (option === result.selectedOption) {
                    optClass = "text-rose-400 font-medium";
                    Icon = XCircle;
                  }

                  return (
                    <div key={optIdx} className={`flex items-center gap-2 ${optClass}`}>
                      <div className={`w-2 h-2 rounded-full ${option === result.correctAnswer ? 'bg-emerald-400' : option === result.selectedOption ? 'bg-rose-400' : 'bg-slate-600'}`}></div>
                      <span>{option}</span>
                      {Icon && <Icon className="w-4 h-4" />}
                    </div>
                  );
                })}
              </div>

              <div className="pl-12">
                {result.explanation && (
                  <div className="mt-2">
                    <button 
                      onClick={() => toggleExplanation(index)}
                      className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors border ${!result.isCorrect && !result.isSkipped ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20' : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-700'}`}
                    >
                      <Info className="w-4 h-4" />
                      {!result.isCorrect && !result.isSkipped ? 'View Explanation (Wrong Answer)' : 'View Explanation'}
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedExplanations[index] ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {expandedExplanations[index] && (
                      <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/50 mt-3 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex items-start gap-2">
                          <p className="text-sm text-slate-300 leading-relaxed">
                            <span className="font-semibold text-blue-400">ব্যাখ্যা: </span>
                            {result.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Level Unlock Celebration Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 rounded-3xl p-8 border border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)] max-w-sm w-full text-center relative overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-yellow-400 to-emerald-400"></div>
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">LEVEL UNLOCKED! 🎉</h2>
            <p className="text-slate-300 mb-6 font-medium">You passed the level and unlocked the next chapter!</p>
            <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50 mb-8 inline-block">
               <span className="text-2xl font-bold text-yellow-400">+50 Bonus Coins!</span>
            </div>
            <button
               onClick={() => setShowUnlockModal(false)}
               className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-500/20"
            >
               Awesome! Let's Go
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
