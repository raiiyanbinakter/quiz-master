import React, { useState } from 'react';
import { ArrowLeft, Home, ChevronRight, Play, CheckCircle2, AlertCircle, FileText, ChevronDown, ChevronUp, Layers, Award } from 'lucide-react';
import { Subject } from '../../types';
import { BoardQuestion, BOARD_PREP_YEARS } from '../../types/boardPrep';
import { filterBoardQuestions, getBoardYearProgress } from '../../data/boardPrepData';
import { MathText } from '../MathText';

interface BoardChapterPageProps {
  subject: Subject;
  chapterIndex: number;
  allBoardQuestions: BoardQuestion[];
  userData: any;
  onBack: () => void;
  onGoHome: () => void;
  onStartQuiz: (
    questions: BoardQuestion[],
    title: string,
    mode: 'quiz' | 'exam',
    year: number
  ) => void;
}

export default function BoardChapterPage({
  subject,
  chapterIndex,
  allBoardQuestions,
  userData,
  onBack,
  onGoHome,
  onStartQuiz
}: BoardChapterPageProps) {
  const chapterName = subject.chapters[chapterIndex] || `অধ্যায় ${chapterIndex + 1}`;
  const chapterQuestions = filterBoardQuestions(allBoardQuestions, subject.id, chapterIndex);
  const totalChapterQuestions = chapterQuestions.length;

  const [expandedYear, setExpandedYear] = useState<number | null>(BOARD_PREP_YEARS[0]?.year || 2025);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const toggleYear = (year: number) => {
    setExpandedYear(prev => (prev === year ? null : year));
  };

  const toggleQuestionPreview = (qId: string) => {
    setExpandedQuestionId(prev => (prev === qId ? null : qId));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-6 font-medium bg-slate-900/50 p-3 rounded-2xl border border-slate-800 w-fit">
        <button onClick={onGoHome} className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
          <Home className="w-4 h-4" /> হোম
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        <button onClick={onBack} className="hover:text-purple-400 transition-colors truncate max-w-[150px] sm:max-w-[200px] cursor-pointer">
          {subject.name}
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        <span className="text-purple-400 font-semibold">{chapterName}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2.5 bg-slate-850 hover:bg-slate-800 rounded-2xl transition-colors text-slate-400 hover:text-white cursor-pointer border border-slate-750"
              title="ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 border border-purple-800/80 px-2.5 py-0.5 rounded-lg">
                  বোর্ড প্রিপারেশন
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {subject.name}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{chapterName}</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                বিগত বছরগুলোর বোর্ড পরীক্ষার প্রশ্ন সমাধান ও অনুশীলন
              </p>
            </div>
          </div>

          <div className="bg-slate-850/80 border border-slate-750 px-4 py-2.5 rounded-2xl flex items-center gap-3 self-start sm:self-center shrink-0">
            <Layers className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-xs text-slate-400">মোট প্রশ্ন</div>
              <div className="text-lg font-bold text-white">{totalChapterQuestions} টি</div>
            </div>
          </div>
        </div>
      </div>

      {/* Whole Chapter Empty Notice if 0 questions */}
      {totalChapterQuestions === 0 && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3.5 text-amber-300">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <h4 className="font-bold text-sm sm:text-base">এই অধ্যায়ে এখনো প্রশ্ন যুক্ত হয়নি</h4>
            <p className="text-xs sm:text-sm text-amber-300/80 mt-0.5">
              আমাদের শিক্ষক প্যানেল এই অধ্যায়ের বোর্ড প্রশ্নসমূহ দ্রুত আপলোড করছেন। নিচের বছরভিত্তিক তালিকা থেকে আপডেট চেক করুন।
            </p>
          </div>
        </div>
      )}

      {/* Group Questions BY YEAR (Newest first: 2025 -> 2021) */}
      <div className="space-y-4">
        {BOARD_PREP_YEARS.map(yearConfig => {
          const yearQuestions = filterBoardQuestions(allBoardQuestions, subject.id, chapterIndex, yearConfig.year);
          const hasQuestions = yearQuestions.length > 0;
          const isExpanded = expandedYear === yearConfig.year;
          const yearProgress = getBoardYearProgress(subject.id, chapterIndex, yearConfig.year, userData);

          return (
            <div
              key={yearConfig.year}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                isExpanded 
                  ? 'bg-slate-900 border-purple-500/40 shadow-lg shadow-purple-500/5' 
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Year Header Bar */}
              <div
                onClick={() => toggleYear(yearConfig.year)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base border ${
                    hasQuestions
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      : 'bg-slate-800 text-slate-500 border-slate-700/50'
                  }`}>
                    {yearConfig.banglaYear}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {yearConfig.title}
                      </h3>
                      {hasQuestions ? (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {yearQuestions.length} টি প্রশ্ন
                        </span>
                      ) : (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          এখনো প্রশ্ন যুক্ত হয়নি
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {hasQuestions
                        ? `${yearQuestions.map(q => q.board).filter(Boolean).slice(0, 4).join(', ')}${yearQuestions.length > 4 ? ' ইত্যাদি' : ''}`
                        : 'এই বছরের জন্য প্রশ্ন শীঘ্রই যুক্ত হবে'}
                    </p>
                  </div>
                </div>

                {/* Status and Action / Expand */}
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  {hasQuestions && (
                    <div className="flex items-center gap-2">
                      {yearProgress.status === 'completed' ? (
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          সম্পূর্ণ ({Math.round(yearProgress.bestScore)}%)
                        </span>
                      ) : yearProgress.status === 'in_progress' ? (
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          অনুশীলন চলছে ({Math.round(yearProgress.bestScore)}%)
                        </span>
                      ) : (
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          শুরু হয়নি
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-slate-400 p-1.5 rounded-xl bg-slate-800/60">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Year Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5">
                  {hasQuestions ? (
                    <>
                      {/* Action Buttons for this Year Quiz */}
                      <div className="bg-slate-850/90 rounded-2xl p-4 border border-slate-750 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                          <h4 className="font-bold text-white text-sm sm:text-base">
                            {yearConfig.title} পরীক্ষা / কুইজ
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            একসাথে এই বছরের সব প্রশ্ন দিয়ে নিজেকে যাচাই করুন
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5 w-full sm:w-auto">
                          <button
                            onClick={() =>
                              onStartQuiz(
                                yearQuestions,
                                `${subject.name} - ${chapterName} (${yearConfig.title})`,
                                'quiz',
                                yearConfig.year
                              )
                            }
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-white" />
                            অনুশীলন মোড
                          </button>
                          <button
                            onClick={() =>
                              onStartQuiz(
                                yearQuestions,
                                `${subject.name} - ${chapterName} (${yearConfig.title})`,
                                'exam',
                                yearConfig.year
                              )
                            }
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-purple-300 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-purple-500/30 transition-all cursor-pointer"
                          >
                            <Award className="w-4 h-4" />
                            পরীক্ষা দিন
                          </button>
                        </div>
                      </div>

                      {/* Question List Preview */}
                      <div className="space-y-3 pt-1">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          প্রশ্ন তালিকা ({yearQuestions.length} টি)
                        </div>
                        {yearQuestions.map((q, idx) => {
                          const isQExpanded = expandedQuestionId === q.id;
                          const boardLabel = q.board ? `[${q.board} ${yearConfig.banglaYear}]` : `[${yearConfig.banglaYear}]`;

                          return (
                            <div
                              key={q.id || idx}
                              className="bg-slate-850/60 rounded-2xl border border-slate-800 p-4 transition-all hover:border-slate-700"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800/80">
                                      {boardLabel}
                                    </span>
                                    {q.topic && (
                                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                                        {q.topic}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                                    {q.stimulus && (
                                      <div className="mb-2 p-2.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs sm:text-sm text-purple-200 font-normal">
                                        <div className="font-bold text-purple-400 mb-1">উদ্দীপক:</div>
                                        <MathText text={q.stimulus} />
                                      </div>
                                    )}
                                    <span className="text-purple-400 mr-1.5">{idx + 1}.</span>
                                    <MathText text={q.question_text} />
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleQuestionPreview(q.id)}
                                  className="text-xs font-medium text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 transition-colors shrink-0"
                                >
                                  {isQExpanded ? 'লুকান' : 'বিস্তারিত'}
                                </button>
                              </div>

                              {/* Expanded Question Details (Options, Answer, Explanation) */}
                              {isQExpanded && (
                                <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 text-xs sm:text-sm">
                                  {/* Optional Image */}
                                  {(q.imageUrl || q.image) && (
                                    <div className="max-w-xs rounded-xl overflow-hidden border border-slate-700 bg-slate-900 p-1">
                                      <img src={q.imageUrl || q.image} alt="Formula" className="w-full h-auto max-h-48 object-contain" />
                                    </div>
                                  )}

                                  {/* Options */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {q.options.map((opt, optIdx) => {
                                      const badgeLetter = ['ক', 'খ', 'গ', 'ঘ'][optIdx] || (optIdx + 1).toString();
                                      const isCorrect = opt === q.correct_answer;
                                      return (
                                        <div
                                          key={optIdx}
                                          className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                                            isCorrect
                                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-semibold'
                                              : 'bg-slate-900/60 border-slate-800 text-slate-300'
                                          }`}
                                        >
                                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                                            isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                                          }`}>
                                            {badgeLetter}
                                          </span>
                                          <span><MathText text={opt} /></span>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Explanation */}
                                  {q.explanation && (
                                    <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3 text-slate-300">
                                      <span className="font-bold text-purple-400 block mb-1">ব্যাখ্যা:</span>
                                      <MathText text={q.explanation} />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    /* Empty State for Year */
                    <div className="py-8 text-center bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
                      <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p className="text-slate-300 font-bold text-sm">
                        {yearConfig.title} - এখনো প্রশ্ন যুক্ত হয়নি
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        এই বছরের প্রশ্নব্যাংক শীঘ্রই যুক্ত করা হবে।
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
