import React, { useState } from 'react';
import { ArrowLeft, Lock, PlayCircle, Home, ChevronRight, Map, List } from 'lucide-react';
import { Subject } from '../types';
import ProgressionMap from './ProgressionMap';

interface ChapterListProps {
  subject: Subject;
  userData: any;
  onBack: () => void;
  onSelectChapter: (chapterIndex: number) => void;
}

export default function ChapterList({ subject, userData, onBack, onSelectChapter }: ChapterListProps) {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const checkGamified = (index: number) => {
    // Check if the current chapter is gamified. For static subjects, default to false.
    const rawChapters = (subject as any)._rawChapters;
    if (rawChapters && rawChapters[index]) {
       return rawChapters[index].isGamified === true;
    }
    return false; // Static subjects are open (though activeChapters might restrict them, but we let them be fully open for admission focus)
  };

  const isChapterUnlocked = (index: number) => {
    const isGamified = checkGamified(index);
    if (!isGamified) return true; // If not gamified, it's always unlocked

    if (index === 0) return true;
    const chapterId = `${subject.id}_${index}`;
    return (userData?.unlockedChapters || []).includes(chapterId);
  };

  const handleSelect = (index: number) => {
    const isDynamic = !!(subject as any)._rawChapters;
    
    if (!isDynamic && !subject.activeChapters.includes(index)) {
      alert("This chapter is currently unavailable.");
      return;
    }

    if (isDynamic && checkGamified(index) && !isChapterUnlocked(index)) {
      alert("🔒 You must pass the previous chapter with 80% to unlock this level!");
      return;
    }
    onSelectChapter(index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium bg-slate-900/50 p-3 rounded-xl border border-slate-800 w-fit">
        <button onClick={onBack} className="hover:text-white flex items-center gap-1.5 transition-colors">
          <Home className="w-4 h-4" /> Home
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600" />
        <span className="text-emerald-400">{subject.name}</span>
      </div>

      {/* Header with toggle view button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">{subject.name}</h1>
            <p className="text-slate-400 text-sm">অধ্যায় নির্বাচন করুন (Select Chapter)</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-center">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'map' 
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" /> Map View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list' 
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" /> List View
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <ProgressionMap 
          subject={subject}
          userData={userData}
          onSelectChapter={onSelectChapter}
          onBack={onBack}
        />
      ) : (
        /* Chapters List */
        <div className="space-y-3">
          {subject.chapters.map((chapter, index) => {
            const isDynamic = !!(subject as any)._rawChapters;
            const isUnlocked = isDynamic ? isChapterUnlocked(index) : subject.activeChapters.includes(index);
            const isGamified = isDynamic ? checkGamified(index) : false;
            
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                  isUnlocked 
                    ? 'bg-slate-800 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/80 cursor-pointer' 
                    : 'bg-slate-800/50 border-slate-800 opacity-75 cursor-pointer hover:border-rose-500/50'
                }`}
              >
                <div className="flex items-center gap-4 text-left">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'
                  }`}>
                    <span className="font-semibold">{index + 1}</span>
                  </div>
                  <span className={`font-medium text-lg ${isUnlocked ? 'text-slate-200' : 'text-slate-500'}`}>
                    {chapter}
                  </span>
                </div>
                
                <div>
                  {isUnlocked ? (
                    <PlayCircle className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-900/50 px-3 py-1.5 rounded-full">
                       <Lock className="w-4 h-4" />
                       <span>{isGamified ? 'Locked' : 'শীঘ্রই আসছে'}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
