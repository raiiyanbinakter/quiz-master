import React, { useState } from 'react';
import { Clock, HelpCircle, AlertCircle, Lock, GraduationCap, X, Check } from 'lucide-react';

interface AcademicExamSetupModalProps {
  isOpen: boolean;
  topicName: string;
  totalAvailableQuestions: number;
  onClose: () => void;
  onStartExam: (setup: { questionCount: number; timeMinutes: number }) => void;
}

export default function AcademicExamSetupModal({
  isOpen,
  topicName,
  totalAvailableQuestions,
  onClose,
  onStartExam
}: AcademicExamSetupModalProps) {
  // 1. Time input starts empty (no default prefill, no preset buttons)
  const [timeInput, setTimeInput] = useState<string>('');
  
  // 2. Question count starts unselected (null)
  const [selectedCountOption, setSelectedCountOption] = useState<number | 'all' | null>(null);

  if (!isOpen) return null;

  // Question count options filtering (only show count <= totalAvailableQuestions)
  const possibleCounts = [10, 20, 30, 50];
  const validCounts = possibleCounts.filter(c => c <= totalAvailableQuestions);

  // Parse and validate total time
  const parsedTime = parseInt(timeInput.trim(), 10);
  const isTimeEmpty = timeInput.trim() === '';
  const isTimeNumber = !isNaN(parsedTime) && String(parsedTime) === timeInput.trim();

  let timeError = '';
  if (isTimeEmpty) {
    timeError = 'পরীক্ষার মোট সময় লিখুন';
  } else if (!isTimeNumber || parsedTime <= 0) {
    timeError = 'সময় কমপক্ষে ১ মিনিট হতে হবে';
  } else if (parsedTime > 180) {
    timeError = 'সময় সর্বোচ্চ ১৮০ মিনিট হতে পারে';
  }

  const isTimeValid = !isTimeEmpty && isTimeNumber && parsedTime >= 1 && parsedTime <= 180;

  // Calculate actual effective question count
  let effectiveQuestionCount: number | null = null;
  if (selectedCountOption === 'all') {
    effectiveQuestionCount = totalAvailableQuestions;
  } else if (typeof selectedCountOption === 'number') {
    effectiveQuestionCount = selectedCountOption;
  }

  const isCountValid = selectedCountOption !== null && effectiveQuestionCount !== null && effectiveQuestionCount > 0;
  const canStart = isTimeValid && isCountValid;

  const handleStart = () => {
    if (!canStart || effectiveQuestionCount === null) return;
    onStartExam({
      questionCount: effectiveQuestionCount,
      timeMinutes: parsedTime
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">একাডেমিক পরীক্ষা মোড</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {topicName}
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {/* SECTION 1: QUESTION COUNT SELECTION */}
          <div>
            <label className="block text-sm font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>প্রশ্ন সংখ্যা নির্বাচন করুন:</span>
            </label>
            <p className="text-xs text-slate-400 mb-3">
              মোট উত্তরযোগ্য প্রশ্ন সংখ্যা নির্ধারণ করুন (মোট প্রাপ্তিকতা: {totalAvailableQuestions}টি)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {validCounts.map(count => {
                const isSelected = selectedCountOption === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedCountOption(count)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span>{count}টি প্রশ্ন</span>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}

              {/* All Available Questions Option */}
              <button
                type="button"
                onClick={() => setSelectedCountOption('all')}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                  selectedCountOption === 'all'
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <span>সবগুলো ({totalAvailableQuestions}টি)</span>
                {selectedCountOption === 'all' && <Check className="w-4 h-4 text-white shrink-0" />}
              </button>
            </div>

            {selectedCountOption === null && (
              <p className="text-xs text-amber-400 font-medium mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>অনুগ্রহ করে প্রশ্ন সংখ্যা নির্বাচন করুন</span>
              </p>
            )}
          </div>

          {/* SECTION 2: CUSTOM TOTAL TIME ONLY */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-sm font-bold text-slate-200 mb-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>পরীক্ষার মোট সময় নির্ধারণ করুন</span>
            </label>
            <p className="text-xs text-slate-400 mb-3">
              পুরো পরীক্ষার জন্য আপনি কত মিনিট সময় নিতে চান তা লিখুন।
            </p>

            <div className="relative max-w-xs">
              <input
                type="number"
                min={1}
                max={180}
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                placeholder="যেমন: 25"
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-white text-base font-bold placeholder-slate-600 outline-none transition-all pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                মিনিট
              </span>
            </div>

            {/* Validation Message */}
            <div className="mt-2 text-xs font-semibold">
              {!isTimeValid ? (
                <p className="text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{timeError}</span>
                </p>
              ) : (
                <p className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>মোট সময়: {parsedTime} মিনিট নির্ধারিত হয়েছে</span>
                </p>
              )}
            </div>
          </div>

          {/* SECTION 3: FINAL EXAM SUMMARY */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
              <span className="text-indigo-400">পরীক্ষা মোড সারসংক্ষেপ</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Lock className="w-3.5 h-3.5" /> আনসার লক প্রযোজ্য
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bold pt-1">
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-normal">প্রশ্ন সংখ্যা:</span>
                <span className="text-white">
                  {isCountValid ? `${effectiveQuestionCount}টি প্রশ্ন` : 'নির্বাচন করুন'}
                </span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-normal">মোট সময়:</span>
                <span className="text-white">
                  {isTimeValid ? `${parsedTime} মিনিট` : 'লিখুন'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <Lock className="w-3 h-3 text-amber-400 shrink-0" />
              <span>উত্তর একবার নির্বাচন করলে পরিবর্তন করা যাবে না।</span>
            </p>
          </div>

          {/* START BUTTON */}
          <button
            type="button"
            disabled={!canStart}
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold text-base shadow-lg shadow-indigo-600/20 transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer disabled:cursor-not-allowed border border-indigo-400/30 disabled:border-slate-700/50"
          >
            {canStart ? (
              <>
                <span>পরীক্ষা শুরু করুন</span>
                <span className="text-xs font-semibold text-indigo-200">
                  {effectiveQuestionCount}টি প্রশ্ন • {parsedTime} মিনিট
                </span>
              </>
            ) : (
              <span className="text-sm">পরীক্ষা শুরু করতে প্রশ্ন সংখ্যা ও মোট সময় নির্বাচন করুন</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
