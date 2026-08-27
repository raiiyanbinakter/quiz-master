import React, { useState } from 'react';
import { ArrowLeft, PlayCircle, Home, ChevronRight, Map, List, BookOpen, RotateCcw, CheckCircle2, Target } from 'lucide-react';
import { Subject } from '../types';
import ProgressionMap, { getChapterLearningStatus } from './ProgressionMap';

interface ChapterListProps {
  subject: Subject;
  userData: any;
  onBack: () => void;
  onSelectChapter: (chapterIndex: number) => void;
}

export default function ChapterList({ subject, userData, onBack, onSelectChapter }: ChapterListProps) {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedSectionId, setSelectedSectionId] = useState<string | 'all'>(
    subject.hasSections && subject.sections && subject.sections.length > 0 ? subject.sections[0].id : 'all'
  );

  const handleSelect = (index: number) => {
    // Academic open access rule: Do not hard block students from viewing or practicing normal academic chapters
    onSelectChapter(index);
  };

  const sections = subject.sections || [];
  const activeSection = sections.find(s => s.id === selectedSectionId);

  // Filter chapters if section is selected
  const displayedChapters = subject.chapters.map((title, index) => ({ title, originalIndex: index })).filter(item => {
    if (!subject.hasSections || selectedSectionId === 'all' || !activeSection) return true;
    const chNum = item.originalIndex + 1;
    return chNum >= activeSection.chapterRange.start && chNum <= activeSection.chapterRange.end;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 p-3 rounded-xl border border-slate-800 w-fit">
        <button onClick={onBack} className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
          <Home className="w-4 h-4" /> হোম
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600" />
        <span className="text-emerald-400 font-bold">{subject.name}</span>
      </div>

      {/* Header with view mode toggle */}
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
            <h1 className="text-2xl font-bold text-white">{subject.name}</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">পড়ার অগ্রগতি ও অধ্যায় নির্বাচন করুন</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex items-center gap-1.5 self-start sm:self-center">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'map' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" /> অগ্রগতি ম্যাপ
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" /> লিস্ট ভিউ
          </button>
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
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
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
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            সবগুলো ({subject.chapters.length})
          </button>
        </div>
      )}

      {viewMode === 'map' ? (
        <ProgressionMap 
          subject={subject}
          userData={userData}
          selectedSectionId={selectedSectionId}
          onSelectChapter={onSelectChapter}
          onBack={onBack}
        />
      ) : (
        /* Chapters List */
        <div className="space-y-3">
          {displayedChapters.map(({ title: chapterTitle, originalIndex: index }) => {
            const statusInfo = getChapterLearningStatus(subject.id, index, userData);

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-200 text-left cursor-pointer bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    statusInfo.status === 'mastered'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : statusInfo.status === 'needs_revision'
                      ? 'bg-amber-500/20 text-amber-400'
                      : statusInfo.status === 'in_practice'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 text-base block">
                      {chapterTitle}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">
                      {statusInfo.status === 'not_started' && 'এখনও অনুশীলন শুরু হয়নি'}
                      {statusInfo.status === 'in_practice' && 'অনুশীলন চলমান'}
                      {statusInfo.status === 'needs_revision' && 'আগের অনুশীলনে রিভিশন প্রয়োজন'}
                      {statusInfo.status === 'mastered' && 'অধ্যায় ভালোভাবে অর্জিত হয়েছে'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusInfo.statusBg} ${statusInfo.statusColor} ${statusInfo.statusBorder}`}>
                    {statusInfo.statusLabel}
                  </span>
                  <PlayCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
