import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Clock, CheckCircle2, XCircle, Info, ArrowRight, ArrowLeft, Flag, 
  HelpCircle, Grid, Bookmark, RotateCcw, AlertTriangle, Lightbulb, ZoomIn, X, Lock
} from 'lucide-react';
import { Question, QuizResult } from '../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { MathText } from './MathText';

interface QuizProps {
  questions: Question[];
  mode: 'quiz' | 'exam';
  subjectId?: string;
  chapterIndex?: number;
  quizTitle?: string;
  userEmail?: string;
  examTimeLimitMinutes?: number;
  onComplete: (results: QuizResult[]) => void;
  onBack: () => void;
}

const OPTION_BADGES = ['ক', 'খ', 'গ', 'ঘ', 'ঙ'];

const toBanglaNumber = (num: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)]);
};

export default function Quiz({ 
  questions, 
  mode, 
  subjectId, 
  chapterIndex, 
  quizTitle, 
  userEmail,
  examTimeLimitMinutes, 
  onComplete, 
  onBack 
}: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Quiz / Practice mode state
  const [quizTimeLeft, setQuizTimeLeft] = useState(questions[0]?.time_limit || 30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);

  // Confirm dialogs
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showQuestionNav, setShowQuestionNav] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Exam mode state
  const calculateExamTime = useCallback(() => {
    if (examTimeLimitMinutes && examTimeLimitMinutes > 0) {
      return examTimeLimitMinutes * 60;
    }
    if (questions.length === 0) return 0;

    if (subjectId === 'bio1' && chapterIndex === 6) {
      if (questions.length === 67) return 50 * 60;
      if (questions.length === 91) return 60 * 60;
      if (questions.length === 24) return 15 * 60;
      return 120 * 60;
    }

    if (subjectId === 'dcu_phys2' && chapterIndex === 0) return 30 * 60;
    if (subjectId === 'dcu_phys2' && chapterIndex === 1) return 40 * 60;
    if (subjectId === 'dcu_phys2' && chapterIndex === 2) return 40 * 60;
    if (subjectId === 'dcu_chem1' && chapterIndex === 0) return 80 * 60;
    if (subjectId === 'dcu_chem1' && chapterIndex === 1) return 60 * 60;
    if (subjectId === 'dcu_chem2' && chapterIndex === 0) return 50 * 60;

    if (questions.length === 61 && subjectId === 'chem1') return 10 * 60;
    if (questions.length === 14 && subjectId === 'chem1') return 25 * 60;

    if (questions.length === 296 && subjectId === 'chem1') return 215 * 60;
    if (questions.length === 99 && subjectId === 'chem1') return 70 * 60;
    if (questions.length === 61 || questions.length === 62) return 60 * 60;
    if (questions.length === 58 || questions.length === 50) return 60 * 60;
    if (questions.length === 59 && subjectId === 'chem1') return 45 * 60;
    if (questions.length === 79 && subjectId === 'chem1') return 55 * 60;
    if (questions.length === 76 && subjectId === 'chem1') return 70 * 60;
    if (questions.length === 49) return 45 * 60;
    if (questions.length === 40 && subjectId === 'dcu_phys') return 35 * 60;
    if (questions.length === 40) return 45 * 60;
    if (questions.length === 33 && subjectId === 'chem1') return 15 * 60;
    if (questions.length === 31) return 30 * 60;
    if (questions.length === 27 && subjectId === 'dcu_phys') return 25 * 60;
    if (questions.length === 27) return 22 * 60;
    if (questions.length === 26 && subjectId === 'chem1') return 15 * 60;
    if (questions.length === 25 && subjectId === 'dcu_phys') return 23 * 60;
    if (questions.length === 23 && subjectId === 'chem1') return 15 * 60;
    if (questions.length === 23 && subjectId === 'dcu_phys') return 20 * 60;
    return 25 * 60;
  }, [questions.length, subjectId, chapterIndex]);

  const initialExamTime = calculateExamTime();
  const [examTimeLeft, setExamTimeLeft] = useState(initialExamTime);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});

  // Report state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportDetails, setReportDetails] = useState('');
  const [reportType, setReportType] = useState('উত্তর ভুল মনে হচ্ছে');
  const [submittingReport, setSubmittingReport] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const currentQuestion = questions?.[currentIndex];
  const progress = questions?.length ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const correctCount = quizResults.filter(r => r.isCorrect).length;

  const recordQuizResult = useCallback((option: string | null, isCorrect: boolean, isSkipped: boolean) => {
    if (!currentQuestion) return;
    setQuizResults(prev => [
      ...prev,
      {
        questionId: currentQuestion.id ?? 0,
        questionText: currentQuestion.question_text || '',
        options: currentQuestion.options || [],
        selectedOption: option,
        correctAnswer: currentQuestion.correct_answer || '',
        explanation: currentQuestion.explanation || '',
        isCorrect,
        isSkipped,
        topic: currentQuestion.topic
      }
    ]);
  }, [currentQuestion]);

  const handleQuizTimeOut = useCallback(() => {
    setIsAnswered(true);
    recordQuizResult(null, false, true);
  }, [recordQuizResult]);

  const submitExam = useCallback(() => {
    const finalResults: QuizResult[] = (questions || []).map((q, idx) => {
      if (!q) return null as any;
      const selected = examAnswers[idx] || null;
      const isCorrect = selected === q.correct_answer;
      const isSkipped = selected === null;
      return {
        questionId: q.id ?? idx + 1,
        questionText: q.question_text || '',
        options: q.options || [],
        selectedOption: selected,
        correctAnswer: q.correct_answer || '',
        explanation: q.explanation || '',
        isCorrect,
        isSkipped,
        topic: q.topic
      };
    }).filter(Boolean);
    onComplete(finalResults);
  }, [questions, examAnswers, onComplete]);

  // Timers
  useEffect(() => {
    if (mode === 'quiz') {
      if (!isAnswered && quizTimeLeft > 0) {
        const timer = setInterval(() => setQuizTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
      } else if (quizTimeLeft === 0 && !isAnswered) {
        handleQuizTimeOut();
      }
    } else if (mode === 'exam') {
      if (examTimeLeft > 0) {
        const timer = setInterval(() => setExamTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
      } else if (examTimeLeft === 0) {
        submitExam();
      }
    }
  }, [quizTimeLeft, isAnswered, mode, examTimeLeft, handleQuizTimeOut, submitExam]);

  const handleOptionSelect = (option: string) => {
    if (!currentQuestion) return;
    if (mode === 'quiz') {
      if (isAnswered) return;
      setIsAnswered(true);
      setSelectedOption(option);
      const isCorrect = option === currentQuestion.correct_answer;
      recordQuizResult(option, isCorrect, false);
    } else {
      // Locked answer rule: Once selected, cannot change answer
      if (examAnswers[currentIndex] !== undefined) return;
      setExamAnswers(prev => ({
        ...prev,
        [currentIndex]: option
      }));
    }
  };

  const handleClearAnswer = () => {
    if (mode === 'exam') {
      setExamAnswers(prev => {
        const next = { ...prev };
        delete next[currentIndex];
        return next;
      });
    }
  };

  const toggleFlagQuestion = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const handleNext = () => {
    if (currentIndex < (questions?.length || 0) - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowHint(false);
      setUsedHint(false);
      if (mode === 'quiz') {
        setQuizTimeLeft(questions?.[currentIndex + 1]?.time_limit || 30);
        setSelectedOption(null);
        setIsAnswered(false);
      }
    } else if (mode === 'quiz') {
      onComplete(quizResults);
    } else if (mode === 'exam') {
      setShowReviewModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowHint(false);
    }
  };

  const handleBackClick = () => {
    const hasStarted = mode === 'quiz' ? quizResults.length > 0 : Object.keys(examAnswers).length > 0;
    if (hasStarted) {
      setShowBackConfirm(true);
    } else {
      onBack();
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside text input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      if (!currentQuestion) return;

      const key = e.key.toLowerCase();
      if (['1', 'a'].includes(key) && currentQuestion.options[0]) {
        handleOptionSelect(currentQuestion.options[0]);
      } else if (['2', 'b'].includes(key) && currentQuestion.options[1]) {
        handleOptionSelect(currentQuestion.options[1]);
      } else if (['3', 'c'].includes(key) && currentQuestion.options[2]) {
        handleOptionSelect(currentQuestion.options[2]);
      } else if (['4', 'd'].includes(key) && currentQuestion.options[3]) {
        handleOptionSelect(currentQuestion.options[3]);
      } else if (e.key === 'Enter') {
        if (mode === 'quiz' && isAnswered) {
          handleNext();
        } else if (mode === 'exam') {
          if (currentIndex === questions.length - 1) {
            setShowReviewModal(true);
          } else {
            handleNext();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isAnswered, mode, currentIndex, questions.length]);

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion) return;
    setSubmittingReport(true);
    try {
      await addDoc(collection(db, 'reports'), {
        quizId: subjectId || 'unknown_quiz',
        chapterIndex: chapterIndex ?? -1,
        topic: currentQuestion.topic || null,
        quizTitle: quizTitle || 'Custom/Unknown Quiz',
        questionIndex: currentIndex,
        questionId: currentQuestion.id ?? 0,
        questionText: currentQuestion.question_text || '',
        reportType,
        issueDetails: reportDetails,
        reportedBy: userEmail || 'Anonymous',
        status: 'pending',
        timestamp: serverTimestamp()
      });
      setReportSuccess(true);
      setTimeout(() => {
        setShowReportModal(false);
        setReportSuccess(false);
        setReportDetails('');
        setReportType('উত্তর ভুল মনে হচ্ছে');
      }, 1500);
    } catch (err) {
      console.error('Error submitting report:', err);
      alert('Report could not be sent.');
    } finally {
      setSubmittingReport(false);
    }
  };

  if (!currentQuestion) return null;

  // Format timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isQuizTimeWarning = mode === 'quiz' && quizTimeLeft <= 5;
  const isExamTimeWarning = mode === 'exam' && examTimeLeft <= (initialExamTime * 0.2);

  // Clean Question Title & Extract Source
  let cleanQuestionText = currentQuestion.question_text || '';
  let extractedSource = (currentQuestion as any).source || '';
  if (!extractedSource) {
    const sourceMatch = cleanQuestionText.match(/[\(\[]\s*(?:সূত্র|Source):\s*([^\]\)]+)[\)\]]/i);
    if (sourceMatch) {
      extractedSource = sourceMatch[1];
      cleanQuestionText = cleanQuestionText.replace(/[\(\[]\s*(?:সূত্র|Source):\s*([^\]\)]+)[\)\]]/i, '').trim();
    }
  }

  const quizCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quizCardRef.current && window.renderMathInElement) {
      try {
        window.renderMathInElement(quizCardRef.current, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
      } catch (e) {
        console.error('KaTeX auto-render on quiz card error:', e);
      }
    }
  }, [currentIndex, currentQuestion, isAnswered, selectedOption, showHint, mode]);

  // Answered / Flagged statistics for Exam
  const answeredCount = Object.keys(examAnswers).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between py-4 px-3 sm:px-6">
      {/* Centered Desktop Reading Column (max-w-[760px]) */}
      <div className="w-full max-w-[760px] mx-auto flex-1 flex flex-col justify-start">
        
        {/* TOP QUIZ HEADER */}
        <header className="bg-slate-800/90 backdrop-blur border border-slate-700/80 rounded-2xl p-4 mb-4 shadow-lg">
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* Left side: Back + Mode Badge */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleBackClick}
                className="p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="ফিরে যান"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                mode === 'quiz' 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                {mode === 'quiz' ? 'অনুশীলন মোড' : 'পরীক্ষা মোড'}
              </span>
            </div>

            {/* Progress Label */}
            <div className="text-center">
              <div className="text-xs text-slate-400 font-medium">অগ্রগতি</div>
              <div className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center justify-center gap-1">
                <span>প্রশ্ন {toBanglaNumber(currentIndex + 1)} / {toBanglaNumber(questions.length)}</span>
                <span className="text-slate-400 font-normal text-xs">({currentIndex + 1}/{questions.length})</span>
                <span className="sr-only">{currentIndex + 1}/{questions.length}</span>
              </div>
            </div>

            {/* Right side: Timer or Action */}
            <div className="flex items-center gap-2 shrink-0">
              {mode === 'quiz' && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-colors ${
                  isQuizTimeWarning
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-slate-700/60 text-slate-200 border-slate-600/60'
                }`}>
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{quizTimeLeft}s</span>
                </div>
              )}

              {mode === 'exam' && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-colors ${
                  isExamTimeWarning
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-slate-700/60 text-slate-200 border-slate-600/60'
                }`}>
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>সময় বাকি: {formatTime(examTimeLeft)}</span>
                </div>
              )}

              {mode === 'exam' && (
                <button
                  onClick={() => setShowQuestionNav(true)}
                  className="p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-600/50 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  title="প্রশ্ন তালিকা"
                >
                  <Grid className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">তালিকা</span>
                </button>
              )}
            </div>
          </div>

          {/* Thin Progress Bar */}
          <div className="w-full h-1.5 bg-slate-700/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </header>

        {/* METADATA CHIPS */}
        <div className="flex flex-wrap items-center gap-2 mb-4 px-1 text-xs">
          {quizTitle && (
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
              {quizTitle}
            </span>
          )}
          {currentQuestion.topic && (
            <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-lg font-medium">
              {currentQuestion.topic}
            </span>
          )}
          {mode === 'quiz' && (
            <span className="ml-auto bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg font-medium">
              সঠিক: {toBanglaNumber(correctCount)}
            </span>
          )}
        </div>

        {/* QUESTION CARD */}
        <main ref={quizCardRef} className="bg-slate-800 rounded-2xl p-5 sm:p-7 border border-slate-700/80 shadow-xl mb-4 relative overflow-hidden">
          {/* Question Label */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-md">
              প্রশ্ন {toBanglaNumber(currentIndex + 1)}
            </span>

            <div className="flex items-center gap-2">
              {/* Exam mode flag button */}
              {mode === 'exam' && (
                <button
                  onClick={toggleFlagQuestion}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    flaggedQuestions[currentIndex]
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-700/50 hover:bg-slate-700 text-slate-400 border-slate-600/50'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentIndex] ? 'চিহ্নিত' : 'চিহ্নিত করুন'}</span>
                </button>
              )}

              {/* Report button */}
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-700/40 hover:bg-slate-700/80 text-slate-400 hover:text-rose-400 transition-colors border border-slate-600/40 cursor-pointer"
                title="প্রশ্নে সমস্যা আছে?"
              >
                <Flag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">রিপোর্ট</span>
              </button>
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 leading-relaxed mb-3">
            <MathText text={cleanQuestionText} />
          </h2>

          {/* Source / Reference Tag */}
          {extractedSource && (
            <p className="text-xs text-slate-400 font-medium mb-4 flex items-center gap-1.5">
              <span className="text-slate-500">সূত্র:</span>
              <span className="bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60 text-slate-300">
                {extractedSource}
              </span>
            </p>
          )}

          {/* Image formula preview if present */}
          {(currentQuestion as any).image && (
            <div className="mb-4 relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group max-w-sm mx-auto">
              <img
                src={(currentQuestion as any).image}
                alt="Question diagram"
                className="w-full h-auto max-h-56 object-contain"
              />
              <button
                onClick={() => setZoomImage((currentQuestion as any).image)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
                title="Zoom image"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Hint button (Practice mode only) */}
          {mode === 'quiz' && !isAnswered && (currentQuestion as any).hint && (
            <div className="mb-4">
              {!showHint ? (
                <button
                  onClick={() => { setShowHint(true); setUsedHint(true); }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/30 transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>ইঙ্গিত দেখুন (Hint)</span>
                </button>
              ) : (
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200">
                  <span className="font-bold text-amber-400">ইঙ্গিত: </span>
                  <MathText text={(currentQuestion as any).hint} />
                </div>
              )}
            </div>
          )}

          {/* ANSWER OPTIONS */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, idx) => {
              const badge = OPTION_BADGES[idx] || (idx + 1).toString();

              let baseStyle = "bg-slate-900/80 border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/50 text-slate-200";
              let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
              let IconComponent = null;

              if (mode === 'quiz' && isAnswered) {
                if (option === currentQuestion.correct_answer) {
                  baseStyle = "bg-emerald-950/50 border-emerald-500/80 text-emerald-200";
                  badgeStyle = "bg-emerald-500 text-slate-950 border-emerald-400 font-bold";
                  IconComponent = CheckCircle2;
                } else if (option === selectedOption) {
                  baseStyle = "bg-rose-950/50 border-rose-500/80 text-rose-200";
                  badgeStyle = "bg-rose-500 text-white border-rose-400 font-bold";
                  IconComponent = XCircle;
                } else {
                  baseStyle = "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60";
                  badgeStyle = "bg-slate-800/50 text-slate-600 border-slate-800";
                }
              } else if (mode === 'exam') {
                if (examAnswers[currentIndex] === option) {
                  baseStyle = "bg-indigo-950/70 border-indigo-400 text-indigo-100 shadow-sm shadow-indigo-500/20";
                  badgeStyle = "bg-indigo-500 text-white border-indigo-400 font-bold";
                  IconComponent = Lock;
                } else if (examAnswers[currentIndex] !== undefined) {
                  baseStyle = "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60";
                  badgeStyle = "bg-slate-800/50 text-slate-600 border-slate-800";
                }
              }

              const isOptionDisabled = (mode === 'quiz' && isAnswered) || (mode === 'exam' && examAnswers[currentIndex] !== undefined);

              return (
                <button
                  key={idx}
                  disabled={isOptionDisabled}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full min-h-[48px] flex items-center justify-between p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-150 text-left text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                    isOptionDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                  } ${baseStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${badgeStyle}`}>
                      {badge}
                    </span>
                    <span className="leading-snug"><MathText text={option} /></span>
                  </div>
                  {IconComponent && <IconComponent className="w-5 h-5 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Exam Mode locked answer banner */}
          {mode === 'exam' && examAnswers[currentIndex] !== undefined && (
            <div className="mt-3 flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <span className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>উত্তর লক করা হয়েছে</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                উত্তর পরিবর্তনযোগ্য নয়
              </span>
            </div>
          )}
        </main>

        {/* PRACTICE MODE IMMEDIATE FEEDBACK */}
        {mode === 'quiz' && isAnswered && (
          <div className={`rounded-2xl p-5 mb-4 border transition-all duration-200 ${
            selectedOption === currentQuestion.correct_answer
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
          }`}>
            <div className="flex items-start gap-3">
              {selectedOption === currentQuestion.correct_answer ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-base sm:text-lg">
                  {selectedOption === currentQuestion.correct_answer ? 'সঠিক উত্তর!' : 'এই প্রশ্নটি আবার দেখে নিন'}
                </h3>
                
                {selectedOption !== currentQuestion.correct_answer && (
                  <p className="text-xs sm:text-sm font-semibold text-amber-300">
                    সঠিক উত্তর: <span className="text-white underline"><MathText text={currentQuestion.correct_answer} /></span>
                  </p>
                )}

                {currentQuestion.explanation && (
                  <div className="pt-2 border-t border-slate-700/50 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-200 block mb-1">ব্যাখ্যা (Explanation):</span>
                    <MathText text={currentQuestion.explanation} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM ACTION AREA */}
      <footer className="w-full max-w-[760px] mx-auto mt-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-3">
          {mode === 'exam' && currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 min-h-[48px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm sm:text-base rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>পূর্ববর্তী</span>
            </button>
          )}

          {(mode === 'exam' || (mode === 'quiz' && isAnswered)) && (
            <button
              onClick={mode === 'exam' && currentIndex === questions.length - 1 ? () => setShowReviewModal(true) : handleNext}
              className="flex-1 min-h-[48px] bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {currentIndex < questions.length - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}
              </span>
              {currentIndex < questions.length - 1 && <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </footer>

      {/* EXAM REVIEW / SUBMIT DIALOG */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">পরীক্ষা জমা দিতে চান?</h3>
            <p className="text-slate-300 text-sm mb-5">
              আপনার উত্তরগুলোর সারসংক্ষেপ নিচে দেয়া হলো:
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6 text-center">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                <div className="text-lg font-bold text-emerald-400">{toBanglaNumber(answeredCount)}</div>
                <div className="text-xs text-slate-400 mt-0.5">উত্তর দেয়া</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                <div className="text-lg font-bold text-amber-400">{toBanglaNumber(unansweredCount)}</div>
                <div className="text-xs text-slate-400 mt-0.5">উত্তর বাকী</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                <div className="text-lg font-bold text-cyan-400">{toBanglaNumber(flaggedCount)}</div>
                <div className="text-xs text-slate-400 mt-0.5">চিহ্নিত</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-3 rounded-xl transition-colors text-sm cursor-pointer"
              >
                পরীক্ষা চালু রাখুন
              </button>
              <button
                onClick={submitExam}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/20 text-sm cursor-pointer"
              >
                হ্যাঁ, জমা দিন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXAM QUESTION NAVIGATOR MODAL / DRAWER */}
      {showQuestionNav && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-cyan-400" />
                <span>প্রশ্ন নেভিগেটর</span>
              </h3>
              <button
                onClick={() => setShowQuestionNav(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-5 gap-2.5 p-1 mb-4">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnsweredOpt = examAnswers[idx] !== undefined;
                const isFlagged = flaggedQuestions[idx];

                let btnClass = "bg-slate-900 border-slate-700 text-slate-300";
                if (isCurrent) {
                  btnClass = "bg-cyan-500 text-slate-950 border-cyan-300 font-bold ring-2 ring-cyan-400/50";
                } else if (isFlagged) {
                  btnClass = "bg-amber-500/20 text-amber-300 border-amber-500/50";
                } else if (isAnsweredOpt) {
                  btnClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => { setCurrentIndex(idx); setShowQuestionNav(false); }}
                    className={`h-11 rounded-xl border text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ${btnClass}`}
                  >
                    {toBanglaNumber(idx + 1)}
                    {isFlagged && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"></span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-around text-xs text-slate-400 pt-3 border-t border-slate-700">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500"></span> উত্তর দেয়া</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-900 border border-slate-700"></span> উত্তর বাকী</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span> চিহ্নিত</span>
            </div>
          </div>
        </div>
      )}

      {/* QUIT EXAM CONFIRMATION */}
      {showQuitConfirm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">পরীক্ষা শেষ করতে চান?</h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে পরীক্ষাটি মাঝপথেই শেষ করতে চান? আপনার বর্তমান উত্তরগুলো মূল্যায়ন করা হবে।
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                onClick={submitExam}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-rose-500/20 text-sm cursor-pointer"
              >
                হ্যাঁ, শেষ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BACK CONFIRMATION */}
      {showBackConfirm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">ফিরে যেতে চান?</h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে ফিরে যেতে চান? আপনার বর্তমান অগ্রগতি হারিয়ে যাবে।
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBackConfirm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
              >
                না, চালিয়ে যান
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-rose-500/20 text-sm cursor-pointer"
              >
                হ্যাঁ, ফিরে যান
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE ZOOM MODAL */}
      {zoomImage && (
        <div 
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur flex items-center justify-center z-50 p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl w-full">
            <img src={zoomImage} alt="Zoomed view" className="w-full h-auto max-h-[85vh] object-contain mx-auto rounded-xl" />
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-2 right-2 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl text-left">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Flag className="w-5 h-5 text-rose-400" />
              <span>প্রশ্নে সমস্যা আছে?</span>
            </h3>
            <p className="text-slate-400 mb-5 text-xs">
              দয়া করে নিচের সমস্যা থেকে একটি নির্বাচন করুন।
            </p>

            {reportSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="font-medium text-xs">আপনার রিপোর্ট জমা দেওয়া হয়েছে। ধন্যবাদ!</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit}>
                <div className="mb-3">
                  <label className="block text-slate-300 font-medium mb-1.5 text-xs">সমস্যার ধরন</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 text-xs"
                    required
                  >
                    <option value="উত্তর ভুল মনে হচ্ছে">উত্তর ভুল মনে হচ্ছে</option>
                    <option value="ব্যাখ্যা পরিষ্কার নয়">ব্যাখ্যা পরিষ্কার নয়</option>
                    <option value="প্রশ্ন/ভাষা বুঝতে সমস্যা">প্রশ্ন/ভাষা বুঝতে সমস্যা</option>
                    <option value="অপশন সমস্যা">অপশন সমস্যা</option>
                    <option value="ছবি বা সূত্রের সমস্যা">ছবি বা সূত্রের সমস্যা</option>
                    <option value="অন্য সমস্যা">অন্য সমস্যা</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label className="block text-slate-300 font-medium mb-1.5 text-xs">বিস্তারিত (ঐচ্ছিক)</label>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 h-20 resize-none text-xs"
                    placeholder="সমস্যাটি বিস্তারিত লিখুন..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowReportModal(false); setReportDetails(''); }}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-xs cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReport}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-500/50 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-rose-500/20 text-xs cursor-pointer"
                  >
                    {submittingReport ? 'অপেক্ষা করুন...' : 'জমা দিন'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

