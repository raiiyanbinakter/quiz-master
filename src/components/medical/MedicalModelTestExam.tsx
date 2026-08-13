import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Lock, 
  Grid, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Send,
  Sparkles,
  BookOpen,
  RotateCcw,
  Calendar,
  X,
  Flag
} from 'lucide-react';
import { MedicalModelTestBlueprint, ModelTestAttempt } from '../../types/modelTest';
import { db, auth } from '../../firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { MathText } from '../MathText';

interface MedicalModelTestExamProps {
  blueprint: MedicalModelTestBlueprint;
  questions: any[];
  onBack: () => void;
  onAddToRoutine?: (title: string, durationMinutes: number) => void;
}

// Convert numbers to Bangla digits
const toBanglaNum = (num: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).split('').map(d => banglaDigits[parseInt(d, 10)] || d).join('');
};

export default function MedicalModelTestExam({
  blueprint,
  questions,
  onBack,
  onAddToRoutine
}: MedicalModelTestExamProps) {
  // Exam State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> selectedOption
  const [lockedQuestions, setLockedQuestions] = useState<Record<string, boolean>>({}); // questionId -> true
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Timer State (50 minutes = 3000 seconds)
  const [timeRemaining, setTimeRemaining] = useState<number>(3000); // 50 * 60
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [autoSubmittedNotice, setAutoSubmittedNotice] = useState<boolean>(false);

  // Modals
  const [showNavigatorModal, setShowNavigatorModal] = useState<boolean>(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  // Filter state for reviewing questions post-submission
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong'>('all');
  const [weakTopicsAdded, setWeakTopicsAdded] = useState<boolean>(false);

  // Stats post submission
  const [attemptResult, setAttemptResult] = useState<ModelTestAttempt | null>(null);

  const startTimeRef = useRef<string>(new Date().toISOString());

  // Timer effect
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    const mStr = mins < 10 ? `0${mins}` : `${mins}`;
    const sStr = s < 10 ? `0${s}` : `${s}`;
    return `${toBanglaNum(mStr)}:${toBanglaNum(sStr)}`;
  };

  const currentQ = questions[currentIndex] || questions[0];
  const currentQId = currentQ?.id || `q_${currentIndex}`;
  const isCurrentLocked = !!lockedQuestions[currentQId];
  const selectedForCurrent = answers[currentQId];

  // Lock answer handler
  const handleSelectOption = (option: string) => {
    if (isSubmitted || isCurrentLocked) return; // Permanently locked once selected

    setAnswers((prev) => ({ ...prev, [currentQId]: option }));
    setLockedQuestions((prev) => ({ ...prev, [currentQId]: true }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Submission calculation
  const calculateResult = (isAuto = false): ModelTestAttempt => {
    let score = 0;
    const lockedIds: string[] = [];

    questions.forEach((q) => {
      const qId = q.id;
      if (lockedQuestions[qId]) {
        lockedIds.push(qId);
      }
      const studentAns = answers[qId];
      if (studentAns && studentAns.trim() === q.correct_answer?.trim()) {
        score += 1;
      }
    });

    const now = new Date().toISOString();
    return {
      modelTestId: blueprint.id,
      startedAt: startTimeRef.current,
      submittedAt: now,
      answers,
      lockedAnswerQuestionIds: lockedIds,
      score,
      totalMarks: 100,
      status: isAuto ? 'auto_submitted' : 'submitted',
      timeLimitMinutes: 50,
      route: 'medical',
      subject: blueprint.subject,
      chapterId: blueprint.chapterId
    };
  };

  const handleManualSubmit = async () => {
    setShowSubmitConfirmModal(false);
    const result = calculateResult(false);
    setAttemptResult(result);
    setIsSubmitted(true);
    await saveAttemptToFirestore(result);
  };

  const handleAutoSubmit = async () => {
    if (isSubmitted) return;
    setAutoSubmittedNotice(true);
    const result = calculateResult(true);
    setAttemptResult(result);
    setIsSubmitted(true);
    await saveAttemptToFirestore(result);
  };

  const saveAttemptToFirestore = async (result: ModelTestAttempt) => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const attemptId = `attempt_${Date.now()}`;
      const ref = doc(db, `users/${uid}/modelTestAttempts/${attemptId}`);
      await setDoc(ref, result);
    } catch (e) {
      console.error('Error saving model test attempt:', e);
    }
  };

  const answeredCount = Object.keys(lockedQuestions).length;
  const unansweredCount = questions.length - answeredCount;

  // Topic performance map for post-exam review
  const topicBreakdown = React.useMemo(() => {
    if (!isSubmitted) return [];
    const map: Record<string, { total: number; correct: number }> = {};
    questions.forEach((q) => {
      const top = q.topic || 'সাধারণ';
      if (!map[top]) map[top] = { total: 0, correct: 0 };
      map[top].total += 1;
      if (answers[q.id] && answers[q.id].trim() === q.correct_answer?.trim()) {
        map[top].correct += 1;
      }
    });
    return Object.entries(map).map(([topic, stats]) => ({
      topic,
      total: stats.total,
      correct: stats.correct,
      percentage: Math.round((stats.correct / stats.total) * 100)
    }));
  }, [isSubmitted, questions, answers]);

  // ==========================================
  // RESULT VIEW
  // ==========================================
  if (isSubmitted && attemptResult) {
    const scorePct = Math.round((attemptResult.score / 100) * 100);
    const timeUsedSecs = 3000 - timeRemaining;
    const timeUsedMin = Math.floor(timeUsedSecs / 60);
    const timeUsedSec = timeUsedSecs % 60;

    const wrongCount = Object.keys(lockedQuestions).filter(
      (qId) => answers[qId] && answers[qId].trim() !== questions.find((q) => q.id === qId)?.correct_answer?.trim()
    ).length;
    const unansweredCountFinal = 100 - Object.keys(lockedQuestions).length;

    const weakTopics = topicBreakdown.filter((t) => t.percentage < 70);

    const handleAddWeakTopicsToRevision = () => {
      if (onAddToRoutine && weakTopics.length > 0) {
        const topicNames = weakTopics.map((w) => w.topic).join(', ');
        onAddToRoutine(`রিভিশন: ${topicNames}`, 45);
        setWeakTopicsAdded(true);
      }
    };

    const displayedQuestions = questions.filter((q) => {
      if (reviewFilter === 'wrong') {
        const userAns = answers[q.id];
        return !userAns || userAns.trim() !== q.correct_answer?.trim();
      }
      return true;
    });

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        
        {autoSubmittedNotice && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 text-sm font-bold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>সময় শেষ হয়েছে। আপনার পরীক্ষা স্বয়ংক্রিয়ভাবে জমা দেওয়া হয়েছে।</span>
          </div>
        )}

        {/* HEADER RESULT CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quiz Master মডেল টেস্ট (ফলাফল ও পর্যালোচনা)</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {blueprint.title}
            </h1>
            <p className="text-xs text-slate-400">
              বিষয়: <strong className="text-slate-200">{blueprint.subject}</strong> | অধ্যায়: <strong className="text-cyan-400">{blueprint.chapterName}</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold">প্রাপ্ত নম্বর</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-1">
                {toBanglaNum(attemptResult.score)} <span className="text-xs font-normal text-slate-400">/ ১০০</span>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold">সঠিক উত্তর</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                {toBanglaNum(attemptResult.score)}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold">ভুল উত্তর</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1">
                {toBanglaNum(wrongCount)}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold">উত্তরহীন</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-400 mt-1">
                {toBanglaNum(unansweredCountFinal)}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">ব্যবহৃত সময়</div>
              <div className="text-lg font-extrabold text-amber-400 mt-2">
                {toBanglaNum(timeUsedMin)} মি: {toBanglaNum(timeUsedSec)} সে:
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-800">
            {weakTopics.length > 0 && onAddToRoutine && (
              <button
                onClick={handleAddWeakTopicsToRevision}
                disabled={weakTopicsAdded}
                className="bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-600/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>{weakTopicsAdded ? 'দুর্বল টপিক যুক্ত হয়েছে' : 'দুর্বল টপিক রিভিশনে যোগ করুন'}</span>
              </button>
            )}

            {onAddToRoutine && (
              <button
                onClick={() => onAddToRoutine(blueprint.title, 50)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                <Calendar className="w-4 h-4" />
                <span>রুটিনে যোগ করুন</span>
              </button>
            )}

            <button
              onClick={onBack}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>মডেল টেস্টে ফিরে যান</span>
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-500 max-w-xl mx-auto italic">
            এটি Quiz Master মডেল টেস্ট প্রস্তুতি মূল্যায়ন। এটি কোনো অফিশিয়াল মেডিকেল ভর্তি পরীক্ষার পূর্বাভাস বা নিশ্চয়তা নয়।
          </p>
        </div>

        {/* TOPIC PERFORMANCE BREAKDOWN */}
        {topicBreakdown.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>টপিকভিত্তিক পারফরম্যান্স</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topicBreakdown.map((tb, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{tb.topic}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      সঠিক: {toBanglaNum(tb.correct)} / {toBanglaNum(tb.total)}
                    </div>
                  </div>
                  <div className={`text-sm font-extrabold ${tb.percentage >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {toBanglaNum(tb.percentage)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DETAILED QUESTION ANSWERS REVIEW */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>সকল প্রশ্নের উত্তর ও সমাধান</span>
            </h3>

            {/* Filter Toggle Buttons */}
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  reviewFilter === 'all' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                সকল প্রশ্ন ({toBanglaNum(100)})
              </button>
              <button
                onClick={() => setReviewFilter('wrong')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  reviewFilter === 'wrong' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ভুল প্রশ্ন দেখুন ({toBanglaNum(100 - attemptResult.score)})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {displayedQuestions.map((q) => {
              const idx = questions.findIndex((origQ) => origQ.id === q.id);
              const userAns = answers[q.id];
              const isCorrect = userAns && userAns.trim() === q.correct_answer?.trim();
              const isUnanswered = !userAns;

              return (
                <div 
                  key={q.id || idx}
                  className={`p-4 rounded-2xl border ${
                    isCorrect 
                      ? 'bg-emerald-950/20 border-emerald-500/30' 
                      : isUnanswered 
                        ? 'bg-slate-950 border-slate-800' 
                        : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <span className="text-xs font-extrabold text-cyan-400">
                        প্রশ্ন {toBanglaNum(idx + 1)} / {toBanglaNum(100)}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-relaxed">
                        <MathText text={q.question_text} />
                      </h4>
                    </div>
                    {isCorrect ? (
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold rounded-lg shrink-0">
                        সঠিক
                      </span>
                    ) : isUnanswered ? (
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-[11px] font-bold rounded-lg shrink-0">
                        উত্তর নেই
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-bold rounded-lg shrink-0">
                        ভুল
                      </span>
                    )}
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {q.options?.map((opt: string, optIdx: number) => {
                      const isOptionCorrect = opt.trim() === q.correct_answer?.trim();
                      const isOptionSelected = opt === userAns;

                      let optStyle = "bg-slate-900 border-slate-800 text-slate-400";
                      if (isOptionCorrect) {
                        optStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold";
                      } else if (isOptionSelected) {
                        optStyle = "bg-rose-500/10 border-rose-500/40 text-rose-300 font-bold";
                      }

                      return (
                        <div key={optIdx} className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${optStyle}`}>
                          <span><MathText text={opt} /></span>
                          {isOptionCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          {!isOptionCorrect && isOptionSelected && <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="mt-3 p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-300 space-y-1">
                      <span className="font-bold text-cyan-400">ব্যাখ্যা: </span>
                      <MathText text={q.explanation} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // ==========================================
  // ACTIVE EXAM INTERFACE
  // ==========================================
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300 select-none">
      
      {/* TOP HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSubmitConfirmModal(true)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
              title="পরীক্ষা ত্যাগ করুন"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                  মডেল টেস্ট
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-semibold">
                  {blueprint.subject} ({blueprint.chapterName})
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                {blueprint.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* TIMER CARD */}
            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 text-sm font-extrabold ${
              timeRemaining < 300 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse' 
                : 'bg-slate-950 border-slate-800 text-amber-400'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            {/* QUESTION LIST NAVIGATOR TOGGLE BUTTON */}
            <button
              onClick={() => setShowNavigatorModal(true)}
              className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Grid className="w-4 h-4" />
              <span>প্রশ্ন তালিকা</span>
            </button>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400">
              অগ্রগতি: <strong className="text-white">{toBanglaNum(currentIndex + 1)}</strong> / {toBanglaNum(100)}
            </span>
            <span className="text-cyan-400">
              উত্তর দেওয়া হয়েছে: {toBanglaNum(answeredCount)} / {toBanglaNum(100)}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* QUESTION DISPLAY CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
        
        <div className="flex items-center justify-between gap-4">
          <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl text-xs font-extrabold">
            প্রশ্ন {toBanglaNum(currentIndex + 1)}
          </span>

          <div className="flex items-center gap-3">
            {/* Lock Status Label */}
            {isCurrentLocked && (
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl text-xs font-extrabold flex items-center gap-1.5 animate-in fade-in">
                <Lock className="w-3.5 h-3.5" />
                <span>উত্তর লক করা হয়েছে</span>
              </span>
            )}

            {/* Flag Button */}
            <button
              onClick={() => toggleFlag(currentQId)}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                flaggedQuestions[currentQId] 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="প্রশ্ন চিহ্নাংকন করুন"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* QUESTION TEXT */}
        <div className="text-base sm:text-lg font-extrabold text-white leading-relaxed tracking-tight">
          <MathText text={currentQ?.question_text} />
        </div>

        {/* ANSWER OPTIONS */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQ?.options?.map((option: string, optIdx: number) => {
            const isSelected = selectedForCurrent === option;

            let optionStyle = "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-950/80";
            if (isSelected) {
              optionStyle = "bg-cyan-500/10 border-cyan-500/50 text-cyan-300 font-bold shadow-lg shadow-cyan-500/5";
            } else if (isCurrentLocked) {
              optionStyle = "bg-slate-950/40 border-slate-800/40 text-slate-600 cursor-not-allowed";
            }

            return (
              <button
                key={optIdx}
                disabled={isCurrentLocked}
                onClick={() => handleSelectOption(option)}
                className={`w-full p-4 rounded-2xl border text-left text-sm transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'border-slate-800 text-slate-400'
                  }`}>
                    {toBanglaNum(optIdx + 1)}
                  </div>
                  <span><MathText text={option} /></span>
                </div>

                {isSelected && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 shrink-0">
                    <Lock className="w-3.5 h-3.5" />
                    <span>লকড</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Lock Rules Notice */}
        <p className="text-[11px] text-slate-500 text-center italic">
          * একবার উত্তর নির্বাচন করলে তা স্থায়ীভাবে লক হয়ে যাবে এবং পরবর্তীতে পরিবর্তন করা যাবে না।
        </p>

        {/* NAVIGATION CONTROLS */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-2xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>পূর্ববর্তী</span>
          </button>

          <button
            onClick={() => setShowSubmitConfirmModal(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>পরীক্ষা জমা দিন</span>
          </button>

          <button
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-2xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            <span>পরবর্তী</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* QUESTION LIST NAVIGATOR MODAL */}
      {showNavigatorModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] flex flex-col space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-cyan-400" />
                <span>প্রশ্ন নেভিগেটর (১০০টি প্রশ্ন)</span>
              </h3>
              <button 
                onClick={() => setShowNavigatorModal(false)}
                className="p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold py-1">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-cyan-500/20 border border-cyan-500" />
                <span className="text-slate-300">লক করা (উত্তর দেওয়া)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800" />
                <span className="text-slate-400">উত্তরহীন</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500" />
                <span className="text-amber-400">চিহ্নিত (Flagged)</span>
              </div>
            </div>

            {/* Grid of 100 questions */}
            <div className="overflow-y-auto flex-1 grid grid-cols-5 sm:grid-cols-10 gap-2 p-1">
              {questions.map((q, idx) => {
                const qId = q.id;
                const isLocked = !!lockedQuestions[qId];
                const isFlagged = !!flaggedQuestions[qId];
                const isCurrent = idx === currentIndex;

                let cellStyle = "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700";
                if (isCurrent) {
                  cellStyle = "bg-white text-slate-950 font-black border-white ring-2 ring-cyan-400";
                } else if (isLocked) {
                  cellStyle = "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold";
                } else if (isFlagged) {
                  cellStyle = "bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold";
                }

                return (
                  <button
                    key={qId || idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowNavigatorModal(false);
                    }}
                    className={`h-10 rounded-xl border text-xs transition-all flex items-center justify-center cursor-pointer ${cellStyle}`}
                  >
                    {toBanglaNum(idx + 1)}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowNavigatorModal(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EARLY SUBMIT CONFIRMATION MODAL */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">
                আপনি কি পরীক্ষা জমা দিতে চান?
              </h3>
              <p className="text-xs text-slate-400">
                একবার পরীক্ষা জমা দিলে আর কোনো উত্তর দেওয়ার সুযোগ থাকবে না।
              </p>
            </div>

            {/* Quick Status Stats */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">উত্তর দেওয়া হয়েছে:</span>
                <span className="font-bold text-cyan-400">{toBanglaNum(answeredCount)}টি</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">উত্তর দেওয়া হয়নি:</span>
                <span className="font-bold text-rose-400">{toBanglaNum(unansweredCount)}টি</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">অবশিষ্ট সময়:</span>
                <span className="font-bold text-amber-400">{formatTime(timeRemaining)}</span>
              </div>

              {unansweredCount > 0 && (
                <div className="pt-2 text-[11px] text-rose-400 font-bold border-t border-slate-800/80">
                  ⚠️ আপনার {toBanglaNum(unansweredCount)}টি প্রশ্নের উত্তর দেওয়া হয়নি।
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs transition-all cursor-pointer"
              >
                প্রশ্নে ফিরে যান
              </button>
              <button
                onClick={handleManualSubmit}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                পরীক্ষা জমা দিন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
