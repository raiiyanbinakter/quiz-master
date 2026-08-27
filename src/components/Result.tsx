import React, { useState, useEffect, useRef } from 'react';
import { Trophy, CheckCircle2, XCircle, Clock, RotateCcw, Home, Info, ArrowLeft, Loader2, ChevronDown, Sparkles, MessageCircle, HeartHandshake, Flame, BookOpen, Layers, Calendar, Map, ZoomIn, X, ImageIcon } from 'lucide-react';
import { collection, addDoc, serverTimestamp, writeBatch, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { QuizSummary } from '../types';
import { uiCopy } from '../content/uiCopy';
import { addRevisionFromQuizResult } from '../utils/studySessionUtils';
import { MathText } from './MathText';
import { resolveQuestionMediaState, cleanStudentFacingText, fetchQuestionMediaOverrides } from '../lib/questionMediaOverrides';

interface ResultProps {
  summary: QuizSummary;
  user?: any;
  userData?: any;
  onRetry: () => void;
  onGoHome: () => void;
  onBack: () => void;
  onShowLeaderboard: () => void;
  onAskMentorHelp?: (subjectName?: string, chapterName?: string) => void;
}

export default function Result({ summary, user, userData, onRetry, onGoHome, onBack, onShowLeaderboard, onAskMentorHelp }: ResultProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [addedToRevision, setAddedToRevision] = useState(false);
  const [addingToRevision, setAddingToRevision] = useState(false);

  const handleAddToRevision = async () => {
    setAddingToRevision(true);
    try {
      const weakConcept = detectedWeakConcepts.length > 0 ? detectedWeakConcepts[0] : null;
      await addRevisionFromQuizResult(
        user?.uid || null,
        summary.quizName,
        summary.subjectId || null,
        (summary as any).topicId || null,
        weakConcept
      );
      setAddedToRevision(true);
    } catch (err) {
      console.error('Error adding revision session:', err);
    } finally {
      setAddingToRevision(false);
    }
  };
  
  // Guard to prevent saving twice
  const saveAttempted = useRef(false);

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [overridesMap, setOverridesMap] = useState<Record<string, any>>({});
  const resultsCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchQuestionMediaOverrides()
      .then(data => {
        if (data) setOverridesMap(data);
      })
      .catch(err => console.warn('Could not load overrides in Result', err));
  }, []);

  useEffect(() => {
    if (resultsCardRef.current && window.renderMathInElement) {
      try {
        window.renderMathInElement(resultsCardRef.current, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
      } catch (e) {
        console.error('KaTeX auto-render error in Result:', e);
      }
    }
  }, [summary, expandedExplanations]);

  const toggleExplanation = (index: number) => {
    setExpandedExplanations(prev => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    if (user && !saveAttempted.current) {
      saveAttempted.current = true;
      saveScore();
    }
  }, [user]);

  // Extract list of weak concepts from wrong results
  const wrongQuestions = summary.results.filter(r => !r.isCorrect && !r.isSkipped);
  const detectedWeakConcepts = Array.from(new Set(
    wrongQuestions
      .map(q => q.topic || 'General Concept')
      .filter(t => t !== '')
  ));

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
        const currentScorePercent = Math.round(passRate * 100);

        if (summary.subjectId && summary.chapterIndex !== undefined) {
           const chapterId = `${summary.subjectId}_${summary.chapterIndex}`;
           const currentRescues = userData.rescueChapters || [];
           
           if (passRate >= 0.8) {
             // Unlock next chapter if gamified
             const nextChapterId = `${summary.subjectId}_${summary.chapterIndex + 1}`;
             const currentUnlocked = userData.unlockedChapters || [];
             if (!currentUnlocked.includes(nextChapterId)) {
               updates.unlockedChapters = [...currentUnlocked, nextChapterId];
               updates.coins = (userData.coins || 0) + Math.floor(summary.totalScore * (userData.isPro ? 2 : 1)) + 50;
               unlockedNewLevel = true;
             }
             // If previously in rescue list, remove it as it's now mastered
             if (currentRescues.includes(chapterId)) {
               updates.rescueChapters = currentRescues.filter((rc: string) => rc !== chapterId);
             }
           } else {
             // Save chapter under revision needed
             if (!currentRescues.includes(chapterId)) {
               updates.rescueChapters = [...currentRescues, chapterId];
             }
           }
        }
        
        // Energy Mechanics & standard coins if not already updated by locking logic
        if (!updates.coins && summary.totalScore > 0) {
           updates.coins = (userData.coins || 0) + Math.floor(summary.totalScore * (userData.isPro ? 2 : 1));
        }

        // Save progress details to `chapterProgress`
        if (summary.subjectId && summary.chapterIndex !== undefined) {
          const progressDocId = `${user.uid}_${summary.subjectId}_${summary.chapterIndex}`;
          const progressRef = doc(db, 'chapterProgress', progressDocId);
          
          let prevAttempts = 0;
          let prevBest = 0;
          try {
            const progressSnap = await getDoc(progressRef);
            if (progressSnap.exists()) {
              const prevData = progressSnap.data();
              prevAttempts = prevData.attemptsCount || 0;
              prevBest = prevData.bestScore || 0;
            }
          } catch (err) {
            console.warn("Could not load previous progress; starting from zero:", err);
          }

          batch.set(progressRef, {
            userId: user.uid,
            subjectId: summary.subjectId,
            chapterIndex: summary.chapterIndex,
            status: passRate >= 0.8 ? 'cleared' : 'rescue',
            attemptsCount: prevAttempts + 1,
            bestScore: Math.max(prevBest, summary.totalScore),
            latestScore: summary.totalScore,
            masteryScore: currentScorePercent,
            updatedAt: serverTimestamp()
          }, { merge: true });
        }

        // Save weak concepts if score is below 80%
        if (passRate < 0.8 && summary.subjectId && summary.chapterIndex !== undefined && detectedWeakConcepts.length > 0) {
          const weakRef = doc(db, 'weakConcepts', `${user.uid}_${summary.subjectId}_${summary.chapterIndex}`);
          batch.set(weakRef, {
            userId: user.uid,
            subjectId: summary.subjectId,
            chapterIndex: summary.chapterIndex,
            weakConceptIds: detectedWeakConcepts,
            rescueMissionId: `rescue_${Date.now()}`,
            updatedAt: serverTimestamp()
          }, { merge: true });
        }

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

  const passRate = summary.totalQuestions > 0 ? (summary.correctCount / summary.totalQuestions) : 0;

  const isFailed = passRate < 0.8;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{uiCopy.result.title}</h1>
          <p className="text-slate-400 text-sm">আপনার পারফরম্যান্স দেখুন</p>
        </div>
      </div>

      {/* Score Summary Card */}
      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl mb-8 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
        
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-6">
          <Trophy className="w-10 h-10 text-emerald-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">{isFailed ? 'কুইজ সম্পন্ন হয়েছে!' : uiCopy.result.celebration}</h2>
        <p className="text-slate-400 mb-8">{uiCopy.result.scoreText}</p>

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
            <div className="text-sm text-slate-400">{uiCopy.result.correct}</div>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <XCircle className="w-6 h-6 text-rose-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{summary.wrongCount}</div>
            <div className="text-sm text-slate-400">{uiCopy.result.wrong}</div>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <Clock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{summary.skippedCount}</div>
            <div className="text-sm text-slate-400">{uiCopy.result.skipped}</div>
          </div>
        </div>

        {/* Save Score Section */}
        <div className="mt-8 pt-8 border-t border-slate-700/50 flex flex-col items-center">
          {isSaving ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{uiCopy.result.savingScore}</span>
            </div>
          ) : hasSaved ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex flex-col items-center justify-center w-full">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
              <p className="text-emerald-400 font-medium mb-3">{uiCopy.result.savedSuccess}</p>
              <button
                onClick={onShowLeaderboard}
                className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                {uiCopy.result.viewLeaderboard}
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

      {/* Dynamic Rescue Mission Card if Failed */}
      {isFailed && (
        <div className="bg-gradient-to-br from-slate-900 via-[#1C1625] to-[#25121B] border border-rose-500/30 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-2xl animate-in fade-in duration-300">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-xl sm:text-2xl font-black text-rose-400 mb-3 flex items-center gap-2.5">
            <HeartHandshake className="w-6 h-6 text-rose-400 animate-pulse" />
            {uiCopy.result.rescueTitle}
          </h3>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            {uiCopy.result.rescueDesc}
          </p>

          {/* Weak Concepts List */}
          {detectedWeakConcepts.length > 0 && (
            <div className="mb-6 bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                চিহ্নিত দুর্বল টপিকসমূহ (Weak Concepts Detected):
              </h4>
              <div className="flex flex-wrap gap-2">
                {detectedWeakConcepts.map((concept, idx) => (
                  <span key={idx} className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4 mb-8 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <Layers className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200 block mb-0.5">টপিক-ভিত্তিক সমাধান এবং ব্যাখ্যা (Topic Analysis)</span>
                <span>{uiCopy.result.rescueWeakConcepts}</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <MessageCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200 block mb-0.5">মেন্টর ও বন্ধুদের সাথে আলোচনা (Community Help)</span>
                <span>{uiCopy.result.rescueAskDoubt}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <button
              onClick={handleAddToRevision}
              disabled={addedToRevision || addingToRevision}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-80"
            >
              <Calendar className="w-4.5 h-4.5" />
              {addedToRevision ? '✓ আগামীকালের রিভিশনে যোগ করা হয়েছে' : addingToRevision ? 'যোগ হচ্ছে...' : 'আগামী রিভিশনে যোগ করুন'}
            </button>

            <button
              onClick={() => onAskMentorHelp?.(summary.quizName)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <MessageCircle className="w-4.5 h-4.5 text-rose-400" />
              {uiCopy.result.rescueOptionBtn}
            </button>
            
            <button
              onClick={onRetry}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4.5 h-4.5 text-rose-400" />
              আবার পরীক্ষা দিন
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button
          onClick={handleAddToRevision}
          disabled={addedToRevision || addingToRevision}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-80"
        >
          <Calendar className="w-5 h-5" />
          {addedToRevision ? '✓ আগামীকালের রিভিশনে যোগ করা হয়েছে' : addingToRevision ? 'যোগ হচ্ছে...' : 'আগামী রিভিশনে যোগ করুন'}
        </button>

        <button
          onClick={onBack}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
        >
          <Map className="w-5 h-5" />
          পড়ার অগ্রগতি দেখুন
        </button>

        <button
          onClick={onRetry}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          {uiCopy.result.retryBtn}
        </button>
        <button
          onClick={onGoHome}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Home className="w-5 h-5" />
          {uiCopy.result.goHomeBtn}
        </button>
      </div>

      {/* Review Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-white">{uiCopy.result.reviewSection}</h3>
        </div>

        <div ref={resultsCardRef} className="space-y-6">
          {summary.results.map((result, index) => {
            const mediaState = resolveQuestionMediaState(result, overridesMap);
            const cleanStem = cleanStudentFacingText(mediaState.cleanStem || result.questionText);
            const cleanExp = cleanStudentFacingText(mediaState.cleanExplanation || result.explanation);

            return (
              <div key={index} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 animate-in fade-in duration-200">
                <div className="flex gap-4 mb-4">
                  <div className="w-8 h-8 shrink-0 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <h4 className="text-lg font-medium text-white leading-relaxed">
                      <MathText text={cleanStem} />
                    </h4>

                    {/* Question Stem Image if present */}
                    {mediaState.imageUrl && (
                      <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 max-w-sm space-y-2">
                        <div className="relative rounded-lg overflow-hidden bg-slate-950/80 flex items-center justify-center max-h-56">
                          <img
                            src={mediaState.imageUrl}
                            alt={mediaState.altText || 'Question diagram'}
                            className="w-full h-auto max-h-52 object-contain rounded"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-0.5">
                          <span className="text-[11px] text-slate-400 italic truncate max-w-[200px]">
                            {mediaState.altText || 'চিত্র / ডায়াগ্রাম'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (mediaState.imageUrl) setZoomImage(mediaState.imageUrl);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer shrink-0"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>চিত্র বড় করুন</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Options List */}
                <div className="pl-12 space-y-3 mb-4">
                  {result.options.map((option, optIdx) => {
                    const optMedia = mediaState.getOptionMedia(optIdx);
                    const optText = mediaState.cleanOptionText(option);
                    const hasOnlyImage = Boolean(optMedia?.url) && (!optText || optText.trim() === '');

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
                      <div key={optIdx} className={`flex items-start gap-2.5 ${optClass}`}>
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${option === result.correctAnswer ? 'bg-emerald-400' : option === result.selectedOption ? 'bg-rose-400' : 'bg-slate-600'}`}></div>
                        <div className="flex-1 space-y-1.5">
                          {optMedia?.url && (
                            <div className="rounded-lg overflow-hidden bg-slate-950/80 border border-slate-700/60 p-1.5 max-w-xs relative group inline-block">
                              <img
                                src={optMedia.url}
                                alt={optMedia.altText || `Option diagram`}
                                className="w-full h-auto max-h-32 object-contain rounded"
                                loading="lazy"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (optMedia.url) setZoomImage(optMedia.url);
                                }}
                                className="absolute top-2 right-2 p-1 bg-slate-900/90 hover:bg-slate-800 text-cyan-300 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700"
                                title="বড় করে দেখুন"
                              >
                                <ZoomIn className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                          {!hasOnlyImage && optText && (
                            <div><MathText text={optText} /></div>
                          )}
                        </div>
                        {Icon && <Icon className="w-4 h-4 shrink-0 mt-1" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Section */}
                <div className="pl-12">
                  {(cleanExp || mediaState.explanationMedia?.url) && (
                    <div className="mt-2">
                      <button 
                        onClick={() => toggleExplanation(index)}
                        className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors border ${!result.isCorrect && !result.isSkipped ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20' : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-700'} cursor-pointer`}
                      >
                        <Info className="w-4 h-4" />
                        {!result.isCorrect && !result.isSkipped ? 'View Explanation (Wrong Answer)' : 'View Explanation'}
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedExplanations[index] ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedExplanations[index] && (
                        <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/50 mt-3 animate-in slide-in-from-top-2 duration-200 space-y-3">
                          {cleanExp && (
                            <div className="flex items-start gap-2">
                              <p className="text-sm text-slate-300 leading-relaxed">
                                <span className="font-semibold text-blue-400">{uiCopy.result.explanation}: </span>
                                <MathText text={cleanExp} />
                              </p>
                            </div>
                          )}

                          {/* Explanation Image */}
                          {mediaState.explanationMedia?.url && (
                            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 max-w-sm space-y-2">
                              <div className="relative rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center max-h-48">
                                <img
                                  src={mediaState.explanationMedia.url}
                                  alt={mediaState.explanationMedia.altText || 'ব্যাখ্যার চিত্র'}
                                  className="w-full h-auto max-h-44 object-contain rounded"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex items-center justify-between gap-2 pt-0.5">
                                <span className="text-[10px] text-slate-400 italic truncate">
                                  {mediaState.explanationMedia.altText || 'ব্যাখ্যার চিত্র'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (mediaState.explanationMedia?.url) setZoomImage(mediaState.explanationMedia.url);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] font-semibold rounded border border-slate-700 transition-colors cursor-pointer shrink-0"
                                >
                                  <ZoomIn className="w-3 h-3" />
                                  <span>বড় করে দেখুন</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Full-screen Image Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl p-4 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-600 transition-colors cursor-pointer z-10"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-center max-h-[80vh] overflow-auto">
              <img
                src={zoomImage}
                alt="Enlarged preview"
                className="max-h-[80vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
      {/* Level Unlock Celebration Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 rounded-3xl p-8 border border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)] max-w-sm w-full text-center relative overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-yellow-400 to-emerald-400"></div>
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">LEVEL UNLOCKED! 🎉</h2>
            <p className="text-slate-300 mb-6 font-medium">You passed the level and unlocked the next chapter!</p>
            <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50 mb-8 inline-block shadow-lg">
               <span className="text-2xl font-bold text-yellow-400">+50 Bonus Coins!</span>
            </div>
            <button
               onClick={() => setShowUnlockModal(false)}
               className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
               Awesome! Let's Go
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
