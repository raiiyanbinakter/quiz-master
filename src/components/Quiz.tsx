import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { Question, QuizResult } from '../types';

interface QuizProps {
  questions: Question[];
  mode: 'quiz' | 'exam';
  subjectId?: string;
  onComplete: (results: QuizResult[]) => void;
  onBack: () => void;
}

export default function Quiz({ questions, mode, subjectId, onComplete, onBack }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Quiz mode state
  const [quizTimeLeft, setQuizTimeLeft] = useState(questions[0]?.time_limit || 30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  // Exam mode state
  const calculateExamTime = () => {
    if (questions.length === 0) return 0;

    // specific topic lengths for chem1 to set exact minutes
    if (questions.length === 61 && subjectId === 'chem1') return 10 * 60; // 10 mins for Topic 9
    if (questions.length === 14 && subjectId === 'chem1') return 25 * 60; // 25 mins for Topic 10

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
    if (questions.length === 23 && subjectId === 'chem1') return 15 * 60;
    if (questions.length === 23 && subjectId === 'dcu_phys') return 20 * 60;
    return 25 * 60;
  };

  const initialExamTime = calculateExamTime();
  const [examTimeLeft, setExamTimeLeft] = useState(initialExamTime);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const correctCount = quizResults.filter(r => r.isCorrect).length;

  // Timer logic
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
  }, [quizTimeLeft, isAnswered, mode, examTimeLeft]);

  const handleQuizTimeOut = () => {
    setIsAnswered(true);
    recordQuizResult(null, false, true);
  };

  const handleOptionSelect = (option: string) => {
    if (mode === 'quiz') {
      if (isAnswered) return;
      setIsAnswered(true);
      setSelectedOption(option);
      const isCorrect = option === currentQuestion.correct_answer;
      recordQuizResult(option, isCorrect, false);
    } else {
      if (examAnswers[currentIndex] !== undefined) return;
      setExamAnswers(prev => ({
        ...prev,
        [currentIndex]: option
      }));
    }
  };

  const recordQuizResult = (option: string | null, isCorrect: boolean, isSkipped: boolean) => {
    setQuizResults(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question_text,
        options: currentQuestion.options,
        selectedOption: option,
        correctAnswer: currentQuestion.correct_answer,
        explanation: currentQuestion.explanation,
        isCorrect,
        isSkipped
      }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (mode === 'quiz') {
        setQuizTimeLeft(questions[currentIndex + 1].time_limit);
        setSelectedOption(null);
        setIsAnswered(false);
      }
    } else if (mode === 'quiz') {
      onComplete(quizResults);
    }
  };

  const handlePrev = () => {
    if (mode === 'exam' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const submitExam = () => {
    const finalResults: QuizResult[] = questions.map((q, idx) => {
      const selected = examAnswers[idx] || null;
      const isCorrect = selected === q.correct_answer;
      const isSkipped = selected === null;
      return {
        questionId: q.id,
        questionText: q.question_text,
        options: q.options,
        selectedOption: selected,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        isCorrect,
        isSkipped
      };
    });
    onComplete(finalResults);
  };

  const handleBackClick = () => {
    const hasStarted = mode === 'quiz' ? quizResults.length > 0 : Object.keys(examAnswers).length > 0;
    if (hasStarted) {
      setShowBackConfirm(true);
    } else {
      onBack();
    }
  };

  if (!currentQuestion) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const displayTime = mode === 'quiz' ? `${quizTimeLeft}s` : formatTime(examTimeLeft);
  const isDangerTime = mode === 'quiz' ? quizTimeLeft <= 5 : examTimeLeft <= 60;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBackClick}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-slate-800 px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2">
            <span className="text-slate-400 font-medium">প্রশ্ন:</span>
            <span className="text-white font-bold">{currentIndex + 1}/{questions.length}</span>
          </div>
        </div>
        
        {mode === 'quiz' && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">সঠিক: {correctCount}টি</span>
          </div>
        )}

        {mode === 'exam' && (
          <button
            onClick={() => setShowQuitConfirm(true)}
            className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <XCircle className="w-4 h-4 text-rose-400" />
            <span className="text-rose-400 font-medium">পরীক্ষা শেষ করুন</span>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-700 shadow-xl mb-6 relative overflow-hidden">
        {/* Timer */}
        <div className={`absolute top-0 left-0 w-full h-1 ${isDangerTime ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
        
        {currentQuestion.topic && (
          <div className="mb-4 inline-block bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            <span className="text-blue-400 text-sm font-medium">{currentQuestion.topic}</span>
          </div>
        )}

        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed flex-1 pr-4">
            {currentQuestion.question_text}
          </h2>
          
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-lg ${
            isDangerTime ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-300'
          }`}>
            <Clock className="w-5 h-5" />
            {displayTime}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let stateClass = "bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300";
            let Icon = null;

            if (mode === 'quiz' && isAnswered) {
              if (option === currentQuestion.correct_answer) {
                stateClass = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                Icon = CheckCircle2;
              } else if (option === selectedOption) {
                stateClass = "bg-rose-500/20 border-rose-500 text-rose-400";
                Icon = XCircle;
              } else {
                stateClass = "bg-slate-800 border-slate-700 text-slate-500 opacity-50";
              }
            } else if (mode === 'exam') {
              if (examAnswers[currentIndex] === option) {
                stateClass = "bg-blue-500/20 border-blue-500 text-blue-400";
                Icon = CheckCircle2;
              }
            }

            const isExamAnswered = mode === 'exam' && examAnswers[currentIndex] !== undefined;

            return (
              <button
                key={idx}
                disabled={(mode === 'quiz' && isAnswered) || isExamAnswered}
                onClick={() => handleOptionSelect(option)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 text-left text-lg font-medium ${stateClass}`}
              >
                <span>{option}</span>
                {Icon && <Icon className="w-6 h-6" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Box */}
      {mode === 'quiz' && isAnswered && (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-5 mb-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">ব্যাখ্যা:</h4>
              <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {mode === 'exam' && currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-6 h-6" />
            পূর্ববর্তী
          </button>
        )}
        
        {(mode === 'exam' || (mode === 'quiz' && isAnswered)) && (
          <button
            onClick={mode === 'exam' && currentIndex === questions.length - 1 ? submitExam : handleNext}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {currentIndex < questions.length - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}
            {currentIndex < questions.length - 1 && <ArrowRight className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Quit Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">পরীক্ষা শেষ করতে চান?</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              আপনি কি নিশ্চিত যে আপনি পরীক্ষাটি মাঝপথেই শেষ করতে চান? আপনার বর্তমান উত্তরগুলো মূল্যায়ন করা হবে এবং আপনি ব্যাখ্যাগুলো দেখতে পারবেন।
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                বাতিল করুন
              </button>
              <button
                onClick={submitExam}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-rose-500/20"
              >
                হ্যাঁ, শেষ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back Confirmation Modal */}
      {showBackConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">ফিরে যেতে চান?</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              আপনি কি নিশ্চিত যে আপনি ফিরে যেতে চান? আপনার বর্তমান অগ্রগতি হারিয়ে যাবে।
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowBackConfirm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                না, চালিয়ে যান
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-rose-500/20"
              >
                হ্যাঁ, ফিরে যান
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
