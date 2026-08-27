import React from 'react';
import { ArrowLeft, PlayCircle, Home, ChevronRight, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { Subject } from '../../types';
import { BoardQuestion, BOARD_PREP_YEARS } from '../../types/boardPrep';
import { filterBoardQuestions, getBoardYearProgress } from '../../data/boardPrepData';

interface BoardChapterListProps {
  subject: Subject;
  allBoardQuestions: BoardQuestion[];
  userData: any;
  onBack: () => void;
  onSelectChapter: (chapterIndex: number) => void;
}

export default function BoardChapterList({
  subject,
  allBoardQuestions,
  userData,
  onBack,
  onSelectChapter
}: BoardChapterListProps) {
  const [selectedSectionId, setSelectedSectionId] = React.useState<string | 'all'>(
    subject.hasSections && subject.sections && subject.sections.length > 0 ? subject.sections[0].id : 'all'
  );

  const sections = subject.sections || [];
  const activeSection = sections.find(s => s.id === selectedSectionId);

  // Filter chapters if section is selected
  const displayedChapters = subject.chapters.map((title, index) => ({ title, originalIndex: index })).filter(item => {
    if (!subject.hasSections || selectedSectionId === 'all' || !activeSection) return true;
    const chNum = item.originalIndex + 1;
    return chNum >= activeSection.chapterRange.start && chNum <= activeSection.chapterRange.end;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 p-3 rounded-2xl border border-slate-800 w-fit">
        <button onClick={onBack} className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
          <Home className="w-4 h-4" /> হোম
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600" />
        <button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">
          বোর্ড প্রিপারেশন
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600" />
        <span className="text-purple-400 font-bold">{subject.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-2xl transition-colors text-slate-400 hover:text-white cursor-pointer border border-slate-800"
            title="ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 border border-purple-800/80 px-2 py-0.5 rounded-md">
                বোর্ড প্রিপারেশন
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">{subject.name}</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">অধ্যায় নির্বাচন করে বিগত বছরগুলোর বোর্ড প্রশ্ন অনুশীলন করুন</p>
          </div>
        </div>
      </div>

      {/* Section Selector if subject has sections (e.g. Bangla 1st Paper) */}
      {subject.hasSections && subject.sections && subject.sections.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {subject.sections.map((sec) => {
            const isSecSelected = selectedSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  isSecSelected
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {sec.name} ({sec.chapterRange.start < 10 ? `০${sec.chapterRange.start}` : sec.chapterRange.start}–{sec.chapterRange.end < 10 ? `০${sec.chapterRange.end}` : sec.chapterRange.end})
              </button>
            );
          })}
          <button
            onClick={() => setSelectedSectionId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
              selectedSectionId === 'all'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            সবগুলো ({subject.chapters.length})
          </button>
        </div>
      )}

      {/* Chapters List */}
      <div className="space-y-3">
        {displayedChapters.map(({ title: chapterTitle, originalIndex: index }) => {
          const chapterQuestions = filterBoardQuestions(allBoardQuestions, subject.id, index);
          const totalQ = chapterQuestions.length;
          const hasQuestions = totalQ > 0;

          // Find years that have questions
          const availableYears = BOARD_PREP_YEARS.filter(y =>
            filterBoardQuestions(allBoardQuestions, subject.id, index, y.year).length > 0
          );

          // Check if any year was attempted
          let completedYearsCount = 0;
          BOARD_PREP_YEARS.forEach(y => {
            const prog = getBoardYearProgress(subject.id, index, y.year, userData);
            if (prog.status === 'completed') completedYearsCount++;
          });

          return (
            <button
              key={index}
              onClick={() => onSelectChapter(index)}
              className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4.5 sm:p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer bg-slate-900 border-slate-800 hover:border-purple-500/40 hover:bg-slate-850 group gap-3"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                  hasQuestions
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30 group-hover:bg-purple-500/30'
                    : 'bg-slate-800 text-slate-500 border-slate-700/50'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <span className="font-bold text-slate-100 text-base block group-hover:text-purple-300 transition-colors">
                    {chapterTitle}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {hasQuestions ? (
                      <span className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-emerald-400 font-semibold">{totalQ} টি বোর্ড প্রশ্ন</span>
                        <span className="text-slate-600">•</span>
                        <span>বছর: {availableYears.map(y => y.banglaYear).join(', ')}</span>
                      </span>
                    ) : (
                      <span className="text-amber-400/90 font-medium">প্রশ্ন যুক্ত করা হচ্ছে</span>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 self-end sm:self-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {hasQuestions ? (
                  completedYearsCount > 0 ? (
                    <span className="text-xs font-bold px-3 py-1 rounded-full border bg-emerald-500/15 text-emerald-300 border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      {completedYearsCount}টি বছর সম্পন্ন
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-3 py-1 rounded-full border bg-purple-500/15 text-purple-300 border-purple-500/30">
                      অনুশীলনযোগ্য
                    </span>
                  )
                ) : (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-slate-800 text-slate-400 border-slate-700 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-slate-500" />
                    প্রশ্ন যুক্ত হচ্ছে
                  </span>
                )}
                <PlayCircle className="w-5 h-5 text-purple-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
