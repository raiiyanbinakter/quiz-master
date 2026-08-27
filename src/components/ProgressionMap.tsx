import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Target, RotateCcw, CheckCircle2, ArrowRight, Lock, BookMarked } from 'lucide-react';
import { Subject } from '../types';

interface ProgressionMapProps {
  subject: Subject;
  userData: any;
  selectedSectionId?: string | 'all';
  onSelectChapter: (chapterIndex: number) => void;
  onBack: () => void;
}

export type ChapterLearningStatus = 'not_started' | 'in_practice' | 'needs_revision' | 'mastered';

export function getChapterLearningStatus(
  subjectId: string,
  index: number,
  userData: any
): { status: ChapterLearningStatus; bestScore?: number; statusLabel: string; statusColor: string; statusBg: string; statusBorder: string } {
  const chapterKey = `${subjectId}_${index}`;
  const isRescue = userData?.rescueChapters?.includes(chapterKey);
  const chapterProg = userData?.chapterProgress?.[chapterKey];
  const unlocked = (userData?.unlockedChapters || []).includes(chapterKey);

  let bestScore: number | undefined = undefined;
  if (chapterProg?.bestScore !== undefined) {
    bestScore = chapterProg.bestScore;
  }

  // 1. Needs revision if explicitly in rescueChapters or accuracy < 60% with attempts
  if (isRescue || (chapterProg && chapterProg.attempts > 0 && chapterProg.bestScore < 60)) {
    return {
      status: 'needs_revision',
      bestScore,
      statusLabel: 'রিভিশন দরকার',
      statusColor: 'text-amber-400',
      statusBg: 'bg-amber-500/10',
      statusBorder: 'border-amber-500/30'
    };
  }

  // 2. Mastered if unlocked or score >= 80%
  if (unlocked || (chapterProg && chapterProg.bestScore >= 80)) {
    return {
      status: 'mastered',
      bestScore,
      statusLabel: 'আয়ত্তে',
      statusColor: 'text-emerald-400',
      statusBg: 'bg-emerald-500/10',
      statusBorder: 'border-emerald-500/30'
    };
  }

  // 3. In practice if has attempts or chapterProgress entry
  if (chapterProg && chapterProg.attempts > 0) {
    return {
      status: 'in_practice',
      bestScore,
      statusLabel: 'অনুশীলন চলছে',
      statusColor: 'text-cyan-400',
      statusBg: 'bg-cyan-500/10',
      statusBorder: 'border-cyan-500/30'
    };
  }

  // 4. Default: Not started
  return {
    status: 'not_started',
    bestScore,
    statusLabel: 'শুরু হয়নি',
    statusColor: 'text-blue-400',
    statusBg: 'bg-blue-500/10',
    statusBorder: 'border-blue-500/30'
  };
}

export default function ProgressionMap({ subject, userData, selectedSectionId, onSelectChapter, onBack }: ProgressionMapProps) {
  const sections = subject.sections || [];
  const activeSection = sections.find(s => s.id === selectedSectionId);

  // Map chapters with their original indices
  const allChaptersWithIndex = subject.chapters.map((title, idx) => ({ title, originalIndex: idx }));
  const visibleChapters = allChaptersWithIndex.filter(item => {
    if (!subject.hasSections || !selectedSectionId || selectedSectionId === 'all' || !activeSection) return true;
    const chNum = item.originalIndex + 1;
    return chNum >= activeSection.chapterRange.start && chNum <= activeSection.chapterRange.end;
  });

  const numChapters = visibleChapters.length;

  // Default to selecting first visible chapter
  const [selectedIndex, setSelectedIndex] = useState<number>(
    visibleChapters.length > 0 ? visibleChapters[0].originalIndex : 0
  );

  // Update selectedIndex if it's not in visibleChapters
  React.useEffect(() => {
    if (visibleChapters.length > 0 && !visibleChapters.some(c => c.originalIndex === selectedIndex)) {
      setSelectedIndex(visibleChapters[0].originalIndex);
    }
  }, [selectedSectionId, visibleChapters, selectedIndex]);

  // Find recommended chapter among visible ones
  let recommendedIndex = visibleChapters.length > 0 ? visibleChapters[0].originalIndex : 0;
  for (const item of visibleChapters) {
    const info = getChapterLearningStatus(subject.id, item.originalIndex, userData);
    if (info.status === 'needs_revision') {
      recommendedIndex = item.originalIndex;
      break;
    }
    if (info.status === 'in_practice' || info.status === 'not_started') {
      recommendedIndex = item.originalIndex;
      break;
    }
  }

  const selectedStatus = getChapterLearningStatus(subject.id, selectedIndex, userData);

  return (
    <div className="relative w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Connected Learning Path */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-indigo-400" />
              {activeSection ? `${activeSection.name} অধ্যায় সমূহ` : 'অধ্যায় সমূহের তালিকা'}
            </h2>
            <span className="text-xs text-slate-400">
              মোট {numChapters} টি অধ্যায়
            </span>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-800 space-y-5 py-2">
            {visibleChapters.map(({ title: chapterTitle, originalIndex: idx }) => {
              const statusInfo = getChapterLearningStatus(subject.id, idx, userData);
              const isSelected = selectedIndex === idx;
              const isRecommended = recommendedIndex === idx;

              return (
                <div key={idx} className="relative">
                  {/* Connected Node Bullet */}
                  <div 
                    className={`absolute -left-[31px] top-4 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                      isSelected ? 'ring-4 ring-indigo-500/20 scale-110' : ''
                    } ${
                      statusInfo.status === 'mastered' 
                        ? 'bg-emerald-500 border-emerald-400' 
                        : statusInfo.status === 'needs_revision'
                        ? 'bg-amber-500 border-amber-400'
                        : statusInfo.status === 'in_practice'
                        ? 'bg-cyan-500 border-cyan-400'
                        : 'bg-slate-800 border-slate-600'
                    }`}
                  />

                  {/* Chapter Card Node */}
                  <button
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected 
                        ? 'bg-slate-800/90 border-indigo-500 shadow-lg shadow-indigo-500/10' 
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">
                          অধ্যায় {idx + 1}
                        </span>
                        {isRecommended && (
                          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            পরামর্শকৃত
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {chapterTitle}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusInfo.statusBg} ${statusInfo.statusColor} ${statusInfo.statusBorder}`}>
                        {statusInfo.statusLabel}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Chapter Detail Box */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sticky top-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                অধ্যায় {selectedIndex + 1} / {subject.chapters.length}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedStatus.statusBg} ${selectedStatus.statusColor} ${selectedStatus.statusBorder}`}>
                {selectedStatus.statusLabel}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">
              {subject.chapters[selectedIndex]}
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            {selectedStatus.bestScore !== undefined && (
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">সর্বোচ্চ স্কোর:</span>
                <span className="font-bold text-emerald-400 text-sm">{selectedStatus.bestScore}%</span>
              </div>
            )}

            <div className="text-slate-300 leading-relaxed">
              {selectedStatus.status === 'not_started' && (
                <p>এখনও অনুশীলন শুরু হয়নি। অধ্যায়টি ভালোভাবে বুঝতে অনুশীলনী কুইজ শুরু করুন।</p>
              )}
              {selectedStatus.status === 'in_practice' && (
                <p>অনুশীলন চলছে। সম্পূর্ণ ধারণা স্পষ্ট করতে আরও কিছু প্রশ্ন অনুশীলন করুন।</p>
              )}
              {selectedStatus.status === 'needs_revision' && (
                <p>আগের অনুশীলনে আরও কিছু প্রশ্ন দেখা দরকার। রিভিশন দিয়ে প্রস্তুতি ঝালাই করে নিন।</p>
              )}
              {selectedStatus.status === 'mastered' && (
                <p>এই অধ্যায়ে আপনার ভালো অগ্রগতি হয়েছে। প্রস্তুতি ধরে রাখতে মাঝে মাঝে রিভিশন দিন।</p>
              )}
            </div>
          </div>

          {selectedIndex > 0 && getChapterLearningStatus(subject.id, selectedIndex - 1, userData).status === 'not_started' && (
            <p className="text-[11px] text-amber-300/80 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              💡 এই অধ্যায় শুরু করার আগে আগের অধ্যায়টি অনুশীলন করলে ভালো হবে।
            </p>
          )}

          <button
            onClick={() => onSelectChapter(selectedIndex)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {selectedStatus.status === 'not_started' && (
              <>
                <BookOpen className="w-4 h-4" />
                <span>অনুশীলন শুরু করুন</span>
              </>
            )}
            {selectedStatus.status === 'in_practice' && (
              <>
                <Target className="w-4 h-4" />
                <span>চালিয়ে যান</span>
              </>
            )}
            {selectedStatus.status === 'needs_revision' && (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>রিভিশন করুন</span>
              </>
            )}
            {selectedStatus.status === 'mastered' && (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>আবার অনুশীলন করুন</span>
              </>
            )}
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
