import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  Clock, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Building2, 
  Sparkles, 
  BarChart2, 
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { toBanglaNumber, VARSITY_UNIVERSITIES } from '../../lib/varsityPracticeBank';
import { Question } from '../../types';
import { getLocalVarsityQuestions } from '../../lib/varsitySeedQuestions';

interface VarsityModelTestsProps {
  onBack: () => void;
  onStartQuiz: (options: {
    mode: 'quiz' | 'exam';
    questions: Question[];
    title: string;
    timeMinutes?: number;
  }) => void;
}

interface VarsityModelTestBlueprint {
  id: string;
  title: string;
  universityName: string;
  unitName: string;
  totalMarks: number;
  timeMinutes: number;
  negativeMark: number;
  subjectDistribution: { subject: string; count: number }[];
  difficulty: 'standard' | 'advanced';
}

export default function VarsityModelTests({
  onBack,
  onStartQuiz
}: VarsityModelTestsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'du' | 'gst' | 'ru' | 'ju'>('all');
  const [activeTestForModal, setActiveTestForModal] = useState<VarsityModelTestBlueprint | null>(null);

  const seedQuestions = getLocalVarsityQuestions();

  const modelTests: VarsityModelTestBlueprint[] = [
    {
      id: 'du_ka_model_01',
      title: 'ঢাকা বিশ্ববিদ্যালয় ‘ক’ ইউনিট স্পেশাল মডেল টেস্ট - ০১',
      universityName: 'ঢাকা বিশ্ববিদ্যালয়',
      unitName: 'ক ইউনিট (বিজ্ঞান অনুষদ)',
      totalMarks: 60,
      timeMinutes: 45,
      negativeMark: 0.25,
      subjectDistribution: [
        { subject: 'পদার্থবিজ্ঞান', count: 15 },
        { subject: 'রসায়ন', count: 15 },
        { subject: 'উচ্চতর গণিত', count: 15 },
        { subject: 'জীববিজ্ঞান', count: 15 }
      ],
      difficulty: 'standard'
    },
    {
      id: 'du_ka_model_02',
      title: 'ঢাকা বিশ্ববিদ্যালয় ‘ক’ ইউনিট স্পেশাল মডেল টেস্ট - ০২',
      universityName: 'ঢাকা বিশ্ববিদ্যালয়',
      unitName: 'ক ইউনিট (বিজ্ঞান অনুষদ)',
      totalMarks: 60,
      timeMinutes: 45,
      negativeMark: 0.25,
      subjectDistribution: [
        { subject: 'পদার্থবিজ্ঞান', count: 15 },
        { subject: 'রসায়ন', count: 15 },
        { subject: 'উচ্চতর গণিত', count: 15 },
        { subject: 'আইসিটি / জীববিজ্ঞান', count: 15 }
      ],
      difficulty: 'advanced'
    },
    {
      id: 'gst_a_model_01',
      title: 'গুচ্ছ ‘A’ ইউনিট সমন্বিত পূর্ণাঙ্গ মডেল টেস্ট - ০১',
      universityName: 'গুচ্ছভুক্ত বিশ্ববিদ্যালয়সমূহ',
      unitName: 'A ইউনিট (বিজ্ঞান)',
      totalMarks: 100,
      timeMinutes: 60,
      negativeMark: 0.25,
      subjectDistribution: [
        { subject: 'পদার্থবিজ্ঞান', count: 25 },
        { subject: 'রসায়ন', count: 25 },
        { subject: 'উচ্চতর গণিত', count: 25 },
        { subject: 'জীববিজ্ঞান', count: 25 }
      ],
      difficulty: 'standard'
    },
    {
      id: 'ru_c_model_01',
      title: 'রাজশাহী বিশ্ববিদ্যালয় ‘C’ ইউনিট বিজ্ঞান মডেল টেস্ট - ০১',
      universityName: 'রাজশাহী বিশ্ববিদ্যালয়',
      unitName: 'C ইউনিট (বিজ্ঞান)',
      totalMarks: 80,
      timeMinutes: 50,
      negativeMark: 0.25,
      subjectDistribution: [
        { subject: 'পদার্থবিজ্ঞান', count: 20 },
        { subject: 'রসায়ন', count: 20 },
        { subject: 'উচ্চতর গণিত', count: 20 },
        { subject: 'জীববিজ্ঞান', count: 20 }
      ],
      difficulty: 'standard'
    },
    {
      id: 'ju_a_model_01',
      title: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ‘A’ ইউনিট গাণিতিক মডেল টেস্ট',
      universityName: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
      unitName: 'A ইউনিট (গাণিতিক ও পদার্থবিজ্ঞান)',
      totalMarks: 80,
      timeMinutes: 55,
      negativeMark: 0.20,
      subjectDistribution: [
        { subject: 'উচ্চতর গণিত', count: 30 },
        { subject: 'পদার্থবিজ্ঞান', count: 30 },
        { subject: 'রসায়ন', count: 20 }
      ],
      difficulty: 'advanced'
    }
  ];

  const filteredTests = modelTests.filter((t) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'du') return t.id.startsWith('du_');
    if (selectedFilter === 'gst') return t.id.startsWith('gst_');
    if (selectedFilter === 'ru') return t.id.startsWith('ru_');
    if (selectedFilter === 'ju') return t.id.startsWith('ju_');
    return true;
  });

  const handleLaunchModelTest = (test: VarsityModelTestBlueprint, mode: 'exam' | 'quiz') => {
    // Select questions representing the test
    const selectedQuestions = seedQuestions.slice(0, 30);
    onStartQuiz({
      mode,
      questions: selectedQuestions.length > 0 ? selectedQuestions : seedQuestions,
      title: test.title,
      timeMinutes: mode === 'exam' ? test.timeMinutes : undefined
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
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>মডিউল ৪ • মডেল টেস্ট</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              বিশ্ববিদ্যালয় মডেল টেস্ট
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              টাইমার, নেগেটিভ মার্কিং ও মেধা তালিকা সহ বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার আদলে পূর্ণাঙ্গ মডেল টেস্ট।
            </p>
          </div>
        </div>
      </div>

      {/* University Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { key: 'all', label: 'সকল মডেল টেস্ট' },
          { key: 'du', label: 'ঢাকা বিশ্ববিদ্যালয়' },
          { key: 'gst', label: 'গুচ্ছ বিশ্ববিদ্যালয়' },
          { key: 'ru', label: 'রাবি' },
          { key: 'ju', label: 'জাবি' }
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setSelectedFilter(f.key as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === f.key
                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Model Tests Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-3xl transition-all shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {test.universityName}
                </span>
                <span className="text-[11px] font-bold text-slate-400 font-mono">
                  {test.difficulty === 'advanced' ? '🔥 অ্যাডভান্সড' : '🎯 স্ট্যান্ডার্ড'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white hover:text-emerald-300 transition-colors">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {test.unitName}
                </p>
              </div>

              {/* Subject Breakdown Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {test.subjectDistribution.map((s, sidx) => (
                  <span
                    key={sidx}
                    className="text-[11px] bg-slate-950 border border-slate-800/80 px-2.5 py-1 rounded-lg text-slate-300 font-mono"
                  >
                    {s.subject}: {toBanglaNumber(s.count)}
                  </span>
                ))}
              </div>

              {/* Meta stats */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">পূর্ণমান</div>
                  <div className="text-white font-bold font-mono mt-0.5">{toBanglaNumber(test.totalMarks)}</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">সময়</div>
                  <div className="text-white font-bold font-mono mt-0.5">{toBanglaNumber(test.timeMinutes)} মিনিট</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">নেগেটিভ মার্ক</div>
                  <div className="text-amber-400 font-bold font-mono mt-0.5">-{test.negativeMark}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => handleLaunchModelTest(test, 'quiz')}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>রিভিউ মোড</span>
              </button>

              <button
                onClick={() => setActiveTestForModal(test)}
                className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>পরীক্ষা শুরু করুন</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal for Starting Test */}
      {activeTestForModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>মডেল টেস্ট শুরু করার প্রস্তুতি</span>
              </div>
              <button
                onClick={() => setActiveTestForModal(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-bold text-white">
                {activeTestForModal.title}
              </h4>
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>নির্ধারিত সময়:</span>
                  <span className="text-white font-bold">{toBanglaNumber(activeTestForModal.timeMinutes)} মিনিট</span>
                </div>
                <div className="flex justify-between">
                  <span>পূর্ণমান:</span>
                  <span className="text-white font-bold">{toBanglaNumber(activeTestForModal.totalMarks)} নম্বর</span>
                </div>
                <div className="flex justify-between">
                  <span>নেগেটিভ মার্কিং:</span>
                  <span className="text-amber-400 font-bold">প্রতি ভুলে {activeTestForModal.negativeMark} নম্বর কাটা যাবে</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                * পরীক্ষা শুরু করার পর টাইমার স্বয়ংক্রিয়ভাবে চলবে। সময় শেষ হলে উত্তরপত্র স্বয়ংক্রিয় জমা হবে।
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveTestForModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  const t = activeTestForModal;
                  setActiveTestForModal(null);
                  handleLaunchModelTest(t, 'exam');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>আমি প্রস্তুত, শুরু হোক</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
