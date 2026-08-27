import React, { useState } from 'react';
import { 
  ArrowLeft, 
  History, 
  Building2, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Play, 
  BookOpen, 
  AlertCircle, 
  ChevronRight,
  Filter,
  Calendar
} from 'lucide-react';
import { 
  VARSITY_UNIVERSITIES, 
  VarsityUniversity, 
  VarsityUnit, 
  toBanglaNumber 
} from '../../lib/varsityPracticeBank';
import { Question } from '../../types';
import { getLocalVarsityQuestions } from '../../lib/varsitySeedQuestions';

interface VarsityPastQuestionsProps {
  onBack: () => void;
  onStartQuiz: (options: {
    mode: 'quiz' | 'exam';
    questions: Question[];
    title: string;
    timeMinutes?: number;
  }) => void;
}

interface PastYearSet {
  id: string;
  yearLabel: string;
  yearBn: string;
  totalQuestions: number;
  universityKey: string;
  unitId: string;
  questions: Question[];
}

export default function VarsityPastQuestions({
  onBack,
  onStartQuiz
}: VarsityPastQuestionsProps) {
  const [selectedUniversity, setSelectedUniversity] = useState<VarsityUniversity>(VARSITY_UNIVERSITIES[0]);
  const [selectedUnit, setSelectedUnit] = useState<VarsityUnit>(VARSITY_UNIVERSITIES[0].units[0]);
  const [selectedYear, setSelectedYear] = useState<string>('2023-24');

  // Exam launch modal
  const [showModal, setShowModal] = useState(false);
  const [activeSetForModal, setActiveSetForModal] = useState<PastYearSet | null>(null);
  const [examTimeMinutes, setExamTimeMinutes] = useState<number>(45);

  const handleSelectUniversity = (univ: VarsityUniversity) => {
    setSelectedUniversity(univ);
    if (univ.units && univ.units.length > 0) {
      setSelectedUnit(univ.units[0]);
    }
  };

  const seedQuestions = getLocalVarsityQuestions();

  // Create mock/verified past year sets using existing varsity questions
  const availableYears = [
    { year: '2023-24', yearBn: '২০২৩-২৪' },
    { year: '2022-23', yearBn: '২০২২-২৩' },
    { year: '2021-22', yearBn: '২০২১-২২' },
    { year: '2020-21', yearBn: '২০২০-২১' },
    { year: '2019-20', yearBn: '২০১৯-২০' }
  ];

  // Get matching questions for current university and unit
  const currentUnitQuestions = seedQuestions.filter((q: any) => {
    if (selectedUniversity.key === 'du' && (selectedUnit.id === 'du_ka' || selectedUnit.targetGroup === 'science')) {
      return q.unit === 'du_ka' || q.subject === 'physics' || q.subject === 'chemistry' || q.subject === 'higher_math';
    }
    if (selectedUniversity.key === 'gst' && (selectedUnit.id === 'gst_a' || selectedUnit.targetGroup === 'science')) {
      return q.unit === 'gst_a' || q.subject === 'higher_math';
    }
    return false;
  });

  const handleLaunchQuiz = (setQuestions: Question[], title: string, mode: 'quiz' | 'exam') => {
    if (setQuestions.length === 0) return;
    onStartQuiz({
      mode,
      questions: setQuestions,
      title,
      timeMinutes: mode === 'exam' ? examTimeMinutes : undefined
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <History className="w-4 h-4" />
              <span>মডিউল ২ • বিগত বছরের প্রশ্ন</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              বিগত বছরের ভর্তি পরীক্ষার প্রশ্নব্যাংক
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              ঢাকা বিশ্ববিদ্যালয় ও গুচ্ছ বিশ্ববিদ্যালয়সমূহের বিগত বছরের ভর্তি পরীক্ষার প্রশ্ন ও ব্যাখ্যাসহ সমাধান।
            </p>
          </div>
        </div>
      </div>

      {/* STEP 1: UNIVERSITY SELECTOR */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-extrabold">১</span>
          <span>বিশ্ববিদ্যালয় নির্বাচন করুন</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {VARSITY_UNIVERSITIES.map((univ) => {
            const isSelected = selectedUniversity.key === univ.key;
            return (
              <button
                key={univ.key}
                onClick={() => handleSelectUniversity(univ)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/80 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-amber-400">
                    {univ.badge}
                  </div>
                  <div className="text-sm font-extrabold mt-1">
                    {univ.name}
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-slate-400">
                  {univ.units.length}টি ইউনিট
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: UNIT SELECTOR */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-extrabold">২</span>
          <span>{selectedUniversity.shortName} এর ইউনিট নির্বাচন করুন</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedUniversity.units.map((unit) => {
            const isSelected = selectedUnit.id === unit.id;
            return (
              <div
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500 text-white shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400">
                    {unit.nameEn}
                  </span>
                  <h3 className="text-sm font-bold mt-1 text-white">
                    {unit.name}
                  </h3>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: YEAR-WISE PAST QUESTION SETS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>{selectedUniversity.shortName} • {selectedUnit.name} বিগত বছরের প্রশ্নাবলি</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              বছর নির্বাচন করে প্রশ্ন সমাধান ও মক টেস্ট দিন।
            </p>
          </div>
        </div>

        {/* Year Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableYears.map((yr, idx) => {
            const hasQuestions = currentUnitQuestions.length > 0;
            const yearQuestions = hasQuestions ? currentUnitQuestions : [];

            return (
              <div
                key={yr.year}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  hasQuestions
                    ? 'bg-slate-950/60 border-slate-800 hover:border-amber-500/50 shadow-md'
                    : 'bg-slate-950/30 border-slate-800/40 opacity-75'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                      শিক্ষাবর্ষ {yr.yearBn}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {hasQuestions ? `${toBanglaNumber(yearQuestions.length)}টি প্রশ্ন` : 'আসছে'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mt-1">
                    {selectedUniversity.shortName} {selectedUnit.nameEn} ({yr.yearBn})
                  </h4>
                  <p className="text-xs text-slate-400">
                    মূল ভর্তি পরীক্ষার প্রশ্নপত্র এবং প্রতিটি প্রশ্নের বিশদ সমাধান।
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {hasQuestions ? (
                    <div className="flex items-center gap-2 w-full justify-end">
                      <button
                        onClick={() => handleLaunchQuiz(
                          yearQuestions, 
                          `${selectedUniversity.shortName} ${selectedUnit.nameEn} (${yr.yearBn})`, 
                          'quiz'
                        )}
                        className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>প্র্যাকটিস</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveSetForModal({
                            id: `${selectedUniversity.key}_${selectedUnit.id}_${yr.year}`,
                            yearLabel: yr.year,
                            yearBn: yr.yearBn,
                            totalQuestions: yearQuestions.length,
                            universityKey: selectedUniversity.key,
                            unitId: selectedUnit.id,
                            questions: yearQuestions
                          });
                          setShowModal(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>পরীক্ষা দিন</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 py-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>এই সেশনের প্রশ্ন সংকলন শীঘ্রই আসছে</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXAM MODAL */}
      {showModal && activeSetForModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>বিগত বছরের পরীক্ষার সময় নির্ধারণ</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">
                  পরীক্ষার সময় (মিনিট):
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[20, 30, 45, 60].map((t) => (
                    <button
                      key={t}
                      onClick={() => setExamTimeMinutes(t)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        examTimeMinutes === t
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {toBanglaNumber(t)} মিনিট
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>প্রশ্ন সংখ্যা:</span>
                  <span className="text-white font-bold">{toBanglaNumber(activeSetForModal.totalQuestions)}টি</span>
                </div>
                <div className="flex justify-between">
                  <span>নেগেটিভ মার্কিং:</span>
                  <span className="text-amber-400 font-bold">০.২৫ প্রতি ভুল উত্তর</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handleLaunchQuiz(
                    activeSetForModal.questions,
                    `${selectedUniversity.shortName} ${selectedUnit.nameEn} (${activeSetForModal.yearBn})`,
                    'exam'
                  );
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>পরীক্ষা শুরু করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
