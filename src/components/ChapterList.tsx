import React from 'react';
import { ArrowLeft, Lock, PlayCircle } from 'lucide-react';
import { Subject } from '../types';

interface ChapterListProps {
  subject: Subject;
  onBack: () => void;
  onSelectChapter: (chapterIndex: number) => void;
}

export default function ChapterList({ subject, onBack, onSelectChapter }: ChapterListProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{subject.name}</h1>
          <p className="text-slate-400 text-sm">অধ্যায় নির্বাচন করুন</p>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-3">
        {subject.chapters.map((chapter, index) => {
          const isActive = subject.activeChapters.includes(index);
          
          return (
            <button
              key={index}
              disabled={!isActive}
              onClick={() => isActive && onSelectChapter(index)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                isActive 
                  ? 'bg-slate-800 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/80 cursor-pointer' 
                  : 'bg-slate-800/50 border-slate-800 opacity-75 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-4 text-left">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'
                }`}>
                  <span className="font-semibold">{index + 1}</span>
                </div>
                <span className={`font-medium text-lg ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                  {chapter}
                </span>
              </div>
              
              <div>
                {isActive ? (
                  <PlayCircle className="w-6 h-6 text-emerald-500" />
                ) : (
                  <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-900/50 px-3 py-1.5 rounded-full">
                    <Lock className="w-4 h-4" />
                    <span>শীঘ্রই আসছে</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
