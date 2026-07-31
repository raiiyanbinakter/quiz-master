import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, Lock, Trophy, Sparkles, Star, Award, Compass, ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { Subject } from '../types';
import RankBadge from './RankBadge';

interface ProgressionMapProps {
  subject: Subject;
  userData: any;
  onSelectChapter: (chapterIndex: number) => void;
  onBack: () => void;
}

export default function ProgressionMap({ subject, userData, onSelectChapter, onBack }: ProgressionMapProps) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(null);

  const chapters = subject.chapters;
  const numChapters = chapters.length;

  const isDynamic = !!(subject as any)._rawChapters;

  const checkGamified = (index: number) => {
    const rawChapters = (subject as any)._rawChapters;
    if (rawChapters && rawChapters[index]) {
       return rawChapters[index].isGamified === true;
    }
    return false;
  };

  const isChapterUnlocked = (index: number) => {
    const isGamified = checkGamified(index);
    if (!isGamified) return true;
    if (index === 0) return true;
    const chapterId = `${subject.id}_${index}`;
    return (userData?.unlockedChapters || []).includes(chapterId);
  };

  const isChapterCompleted = (index: number) => {
    // A chapter is completed if the subsequent chapter is unlocked (meaning they passed this with 80%+)
    // Or if they passed it and it's the last chapter
    const isGamified = checkGamified(index);
    if (!isGamified) return false;
    
    const nextChapterId = `${subject.id}_${index + 1}`;
    const nextUnlocked = (userData?.unlockedChapters || []).includes(nextChapterId);
    if (nextUnlocked) return true;

    // Wait, let's also check if they did pass it from results
    // For simplicity, if they unlocking the next level, it is "Completed"
    return false;
  };

  // Generate coordinate mappings for winding S-curve
  // Height scales with the number of chapters
  const mapHeight = Math.max(500, numChapters * 125); // At least 500px, 125px per chapter
  const points = chapters.map((_, i) => {
    const yPercent = ((i + 0.5) / numChapters) * 100;
    // Wobble horizontally: sin goes 0 -> 1 -> 0 -> -1 -> 0
    const wobble = Math.sin((i * Math.PI) / 2);
    const xPercent = 50 + wobble * 32; // wobbles between 18% and 82%
    return { x: xPercent, y: yPercent, index: i };
  });

  // SVG Path generation
  // We'll generate a smooth spline curve or line segments.
  // Straight line joints with stroke-linejoin="round"
  const getPathD = () => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const prev = points[i - 1];
      // Draw smooth S-curve cubic Bezier instead of jagged line
      const controlY1 = prev.y + (p.y - prev.y) / 2;
      const controlY2 = prev.y + (p.y - prev.y) / 2;
      d += ` C ${prev.x} ${controlY1}, ${p.x} ${controlY2}, ${p.x} ${p.y}`;
    }
    return d;
  };

  const pathD = getPathD();

  // Find users highest unlocked chapter to draw a partial solid progress line
  let highestUnlockedIndex = 0;
  for (let i = 0; i < numChapters; i++) {
    const unlocked = isDynamic ? isChapterUnlocked(i) : subject.activeChapters.includes(i);
    if (unlocked) {
      highestUnlockedIndex = i;
    }
  }

  // Generate part of the path that is completed
  const getProgressD = () => {
    if (points.length === 0) return '';
    const unlockedPoints = points.slice(0, highestUnlockedIndex + 1);
    if (unlockedPoints.length === 0) return '';
    
    let d = `M ${unlockedPoints[0].x} ${unlockedPoints[0].y}`;
    for (let i = 1; i < unlockedPoints.length; i++) {
      const p = unlockedPoints[i];
      const prev = unlockedPoints[i - 1];
      const controlY1 = prev.y + (p.y - prev.y) / 2;
      const controlY2 = prev.y + (p.y - prev.y) / 2;
      d += ` C ${prev.x} ${controlY1}, ${p.x} ${controlY2}, ${p.x} ${p.y}`;
    }
    return d;
  };

  const progressD = getProgressD();

  const handleLaunch = (index: number) => {
    const isUnlocked = isDynamic ? isChapterUnlocked(index) : subject.activeChapters.includes(index);
    if (!isUnlocked) {
      alert("🔒 This level is currently locked. Complete previous chapters to progress!");
      return;
    }
    onSelectChapter(index);
  };

  return (
    <div className="relative w-full bg-slate-950/60 rounded-3xl border border-slate-800 p-6 overflow-hidden shadow-2xl">
      {/* Space-themed background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[30%] right-[5%] w-80 h-80 bg-violet-600/5 rounded-full blur-[120px] animate-pulse duration-1000" />
        {/* Particle stars */}
        <div className="absolute top-12 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-sky-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-24 left-16 w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse" />
      </div>

      <div className="relative flex flex-col md:flex-row gap-8 items-start">
        {/* Interactive Road Map Visualizer Container */}
        <div className="flex-1 w-full relative" style={{ height: `${mapHeight}px` }}>
          {/* Main SVG Map Trail */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="unlockedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="lockedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>
            {/* 1. Underlying total trail line (dashed slate) */}
            {points.length > 1 && (
              <path
                d={pathD}
                fill="none"
                stroke="#1e293b"
                strokeWidth="10"
                strokeLinecap="round"
                className="opacity-70"
              />
            )}
            {points.length > 1 && (
              <path
                d={pathD}
                fill="none"
                stroke="#334155"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 6"
                className="opacity-90"
              />
            )}

            {/* 2. Active track line (glowing connection up to current highest level) */}
            {points.length > 1 && highestUnlockedIndex > 0 && (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d={progressD}
                fill="none"
                stroke="url(#unlockedGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              />
            )}
          </svg>

          {/* Chapters / Nodes Layer */}
          {points.map((pt, idx) => {
            const isUnlocked = isDynamic ? isChapterUnlocked(idx) : subject.activeChapters.includes(idx);
            const isGamified = isDynamic ? checkGamified(idx) : false;
            const isCompleted = isUnlocked && idx < highestUnlockedIndex;
            const isCurrent = isUnlocked && idx === highestUnlockedIndex;
            const chapterTitle = chapters[idx];

            return (
              <div
                key={idx}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              >
                <div className="relative group/node">
                  {/* Outer pulsing glows for Current actively available chapter */}
                  {isCurrent && (
                    <>
                      <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur animate-ping opacity-60 pointer-events-none" />
                      <div className="absolute -inset-2.5 bg-emerald-500/10 rounded-full border border-emerald-400/40 animate-pulse pointer-events-none" />
                    </>
                  )}

                  {/* Node Button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      setSelectedNodeIndex(idx);
                    }}
                    className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 border-4 border-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : isCompleted
                        ? 'bg-slate-800 text-emerald-400 border-2 border-emerald-500/50 hover:border-emerald-400 shadow-md shadow-emerald-500/5'
                        : isUnlocked
                        ? 'bg-gradient-to-tr from-slate-800 to-slate-700 text-teal-400 border-2 border-slate-600 hover:border-teal-400'
                        : 'bg-slate-900 text-slate-500 border-2 border-slate-800 cursor-not-allowed'
                    }`}
                  >
                    <span className="font-mono text-base font-bold">
                      {isUnlocked ? (
                        isCompleted ? (
                          <Check className="w-6 h-6 stroke-[3]" />
                        ) : (
                          idx + 1
                        )
                      ) : (
                        <Lock className="w-5 h-5 opacity-70" />
                      )}
                    </span>

                    {/* Miniature badge context indicator */}
                    {isCurrent && (
                      <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 p-0.5 rounded-full border border-slate-900">
                        <Sparkles className="w-3 h-3 fill-amber-500" />
                      </div>
                    )}
                  </motion.button>

                  {/* Simple floating tooltips on Hover */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 scale-0 group-hover/node:scale-100 transition-all duration-200 pointer-events-none bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl text-center shadow-xl w-44 z-30">
                    <p className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">LEVEL {idx + 1}</p>
                    <p className="text-white text-xs font-semibold truncate">{chapterTitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Panel Sidebar */}
        <div className="w-full md:w-80 shrink-0 bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-800/80 sticky top-4 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Adventure LOG</h3>
          </div>

          <AnimatePresence mode="wait">
            {selectedNodeIndex === null ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-10 text-center"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Compass className="w-6 h-6 text-slate-500 animate-spin" />
                </div>
                <h4 className="text-slate-200 font-bold text-sm">Select a Chapter Node</h4>
                <p className="text-xs text-slate-400 px-4 mt-1">Tap any numbered marker on the quest map to load Level objectives.</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedNodeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">LEVEL {selectedNodeIndex + 1}</span>
                    <h4 className="text-white font-bold text-lg leading-tight mt-1">{chapters[selectedNodeIndex]}</h4>
                  </div>
                  <div className="p-1 rounded bg-slate-800 border border-slate-700">
                    {(() => {
                      const isUnlocked = isDynamic ? isChapterUnlocked(selectedNodeIndex) : subject.activeChapters.includes(selectedNodeIndex);
                      const isCompleted = isUnlocked && selectedNodeIndex < highestUnlockedIndex;
                      if (isCompleted) return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
                      if (isUnlocked) return <Sparkles className="w-5 h-5 text-amber-400" />;
                      return <Lock className="w-5 h-5 text-slate-500" />;
                    })()}
                  </div>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 space-y-3.5 text-xs text-slate-400">
                  <div className="flex justify-between items-center">
                    <span>Status:</span>
                    <span className={`font-bold uppercase tracking-wider text-[10px] ${
                      userData?.rescueChapters?.includes(`${subject.id}_${selectedNodeIndex}`)
                        ? 'text-rose-400 animate-pulse'
                        : isDynamic && selectedNodeIndex < highestUnlockedIndex
                        ? 'text-emerald-400'
                        : (isDynamic ? isChapterUnlocked(selectedNodeIndex) : subject.activeChapters.includes(selectedNodeIndex))
                        ? 'text-amber-400'
                        : 'text-slate-500'
                    }`}>
                      {(() => {
                        if (userData?.rescueChapters?.includes(`${subject.id}_${selectedNodeIndex}`)) {
                          return 'RESCUE NEEDED';
                        }
                        const isUnlocked = isDynamic ? isChapterUnlocked(selectedNodeIndex) : subject.activeChapters.includes(selectedNodeIndex);
                        const isCompleted = isUnlocked && selectedNodeIndex < highestUnlockedIndex;
                        if (isCompleted) return 'COMPLETED / PASSED';
                        if (isUnlocked) return 'CURRENT / READY';
                        return 'LOCKED';
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gray border-t border-slate-900 pt-2">
                    <span>Target Target:</span>
                    <span className="text-slate-300 font-semibold">80% Clear Score</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                    <span>Coins Reward:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> +15 Coins
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-900 pt-2">
                    <span>Rep Reward:</span>
                    <span className="text-teal-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-teal-400/20" /> +15 Rep
                    </span>
                  </div>
                </div>

                {userData?.rescueChapters?.includes(`${subject.id}_${selectedNodeIndex}`) && (
                  <div className="bg-rose-950/40 border border-rose-500/25 rounded-xl p-3.5 space-y-1.5 animate-in slide-in-from-top-1 duration-150">
                    <h5 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span>🚨</span> Rescue Mode Active!
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      You scored less than 80% on this chapter level. Clear your doubts in the Doubt Arena, ask peer mentors, and then retry below!
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-2 mt-2">
                  <button
                    onClick={() => handleLaunch(selectedNodeIndex)}
                    disabled={!(isDynamic ? isChapterUnlocked(selectedNodeIndex) : subject.activeChapters.includes(selectedNodeIndex))}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 shadow-lg ${
                      (isDynamic ? isChapterUnlocked(selectedNodeIndex) : subject.activeChapters.includes(selectedNodeIndex))
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 cursor-pointer hover:shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                    }`}
                  >
                    <span>{selectedNodeIndex === highestUnlockedIndex ? 'Launch Level' : 'Review Level'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest mt-1">Unlock next chapter by scoring 80% or more!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
