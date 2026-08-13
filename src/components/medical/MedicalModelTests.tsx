import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Award, 
  Clock, 
  Sparkles, 
  Atom, 
  FlaskConical, 
  Dna, 
  Languages, 
  Globe, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  AlertCircle,
  Play,
  FileText,
  ChevronRight
} from 'lucide-react';
import { MedicalModelTestBlueprint } from '../../types/modelTest';
import { INITIAL_MODEL_TEST_BLUEPRINTS, getQuestionsForBlueprint } from '../../data/seedModelTestBlueprints';
import MedicalModelTestExam from './MedicalModelTestExam';
import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

interface MedicalModelTestsProps {
  onBack: () => void;
  onAddToRoutine?: (title: string, durationMinutes: number) => void;
}

type MainSubjectKey = 'physics' | 'chemistry' | 'biology' | 'english' | 'general_knowledge';

export default function MedicalModelTests({
  onBack,
  onAddToRoutine
}: MedicalModelTestsProps) {
  const [selectedSubject, setSelectedSubject] = useState<MainSubjectKey>('physics');
  const [blueprints, setBlueprints] = useState<MedicalModelTestBlueprint[]>(INITIAL_MODEL_TEST_BLUEPRINTS);
  
  // Selection & Confirmation
  const [selectedBlueprint, setSelectedBlueprint] = useState<MedicalModelTestBlueprint | null>(null);
  const [showPreExamConfirm, setShowPreExamConfirm] = useState<boolean>(false);
  const [rulesAcknowledged, setRulesAcknowledged] = useState<boolean>(false);

  // Active Exam mode
  const [activeExamQuestions, setActiveExamQuestions] = useState<any[] | null>(null);

  // Fetch blueprints from Firestore if available
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'model_test_blueprints'),
        where('route', '==', 'medical'),
        where('status', '==', 'published')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MedicalModelTestBlueprint[];
        if (docs.length > 0) {
          // Filter out blueprints that have no questions
          const validBlueprints = docs.filter(b => b.questionIds && b.questionIds.length > 0);
          setBlueprints(validBlueprints);
        }
      });
      return unsubscribe;
    } catch (e) {
      console.error('Error fetching model test blueprints:', e);
    }
  }, []);

  // Filter published blueprints for selected subject with questions > 0
  const activeSubjectBlueprints = useMemo(() => {
    return blueprints.filter(b => 
      b.subject === selectedSubject && 
      b.status === 'published' && 
      b.questionIds && 
      b.questionIds.length > 0
    );
  }, [blueprints, selectedSubject]);

  // Extract available chapters for the selected subject
  const availableChapters = useMemo(() => {
    const chaptersMap = new Map<string, string>();
    activeSubjectBlueprints.forEach(bp => {
      chaptersMap.set(bp.chapterId, bp.chapterName);
    });
    return Array.from(chaptersMap.entries()).map(([id, name]) => ({ id, name }));
  }, [activeSubjectBlueprints]);

  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');

  // Filter blueprints by chapter if selected
  const filteredBlueprints = useMemo(() => {
    if (selectedChapterId === 'all') return activeSubjectBlueprints;
    return activeSubjectBlueprints.filter(b => b.chapterId === selectedChapterId);
  }, [activeSubjectBlueprints, selectedChapterId]);

  const subjectsList = [
    { key: 'physics' as MainSubjectKey, name: 'পদার্থবিজ্ঞান', icon: Atom, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
    { key: 'chemistry' as MainSubjectKey, name: 'রসায়ন', icon: FlaskConical, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { key: 'biology' as MainSubjectKey, name: 'জীববিজ্ঞান', icon: Dna, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
    { key: 'english' as MainSubjectKey, name: 'ইংরেজি', icon: Languages, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { key: 'general_knowledge' as MainSubjectKey, name: 'সাধারণ জ্ঞান', icon: Globe, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' }
  ];

  const handleOpenConfirm = (bp: MedicalModelTestBlueprint) => {
    setSelectedBlueprint(bp);
    setRulesAcknowledged(false);
    setShowPreExamConfirm(true);
  };

  const handleStartExam = () => {
    if (!selectedBlueprint || !rulesAcknowledged) return;
    const questions = getQuestionsForBlueprint(selectedBlueprint);
    setActiveExamQuestions(questions);
    setShowPreExamConfirm(false);
  };

  // If exam is active, render MedicalModelTestExam component
  if (selectedBlueprint && activeExamQuestions) {
    return (
      <MedicalModelTestExam 
        blueprint={selectedBlueprint}
        questions={activeExamQuestions}
        onBack={() => {
          setActiveExamQuestions(null);
          setSelectedBlueprint(null);
        }}
        onAddToRoutine={onAddToRoutine}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                title="ফিরে যান"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                মেডিকেল পথ
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              মেডিকেল মডেল টেস্ট
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
              ১০০ নম্বরের পরীক্ষার পরিবেশে ৫০ মিনিটে নিজের প্রস্তুতি যাচাই করুন।
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0 space-y-1 text-right">
            <div className="text-[10px] text-slate-400 uppercase font-bold">পরীক্ষার বৈশিষ্ট্য</div>
            <div className="text-xs font-bold text-cyan-400">১০০ নম্বর • ৫০ মিনিট • আনসার লক</div>
          </div>
        </div>
      </div>

      {/* SUBJECT SELECTION TABS */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-cyan-400" />
          <span>বিষয় নির্বাচন করুন</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {subjectsList.map((sub) => {
            const Icon = sub.icon;
            const isSelected = selectedSubject === sub.key;

            return (
              <button
                key={sub.key}
                onClick={() => {
                  setSelectedSubject(sub.key);
                  setSelectedChapterId('all');
                }}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 text-center transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/5 text-white ring-1 ring-cyan-500/20' 
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className={`p-2.5 rounded-xl border ${sub.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold tracking-tight">
                  {sub.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PUBLISHED BLUEPRINTS LIST FOR SELECTED SUBJECT & CHAPTER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-extrabold text-slate-300">
            উপলব্ধ মডেল টেস্ট
          </h3>
          <span className="text-xs text-slate-500 font-bold">
            {filteredBlueprints.length}টি পরীক্ষা
          </span>
        </div>

        {/* CHAPTER SELECTOR PILLS IF CHAPTERS EXIST */}
        {availableChapters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedChapterId === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              সকল অধ্যায়
            </button>
            {availableChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedChapterId === ch.id
                    ? 'bg-cyan-500 text-slate-950 font-extrabold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {ch.name}
              </button>
            ))}
          </div>
        )}

        {filteredBlueprints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBlueprints.map((bp) => (
              <div 
                key={bp.id}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-6 rounded-3xl transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl text-xs font-bold">
                      {bp.chapterName}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      যাচাইকৃত
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-white">
                    {bp.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {bp.description || '১০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট (৫০ মিনিট সময়)'}
                  </p>
                </div>

                {/* Specs */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <FileText className="w-4 h-4" />
                      ১০০ নম্বর
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Clock className="w-4 h-4" />
                      ৫০ মিনিট
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenConfirm(bp)}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-600/20"
                  >
                    <span>পরীক্ষার তথ্য দেখুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* HONEST EMPTY STATE */
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">
              এই বিষয়ের মডেল টেস্ট এখনো প্রকাশ করা হয়নি।
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              অ্যাডমিন যাচাইকৃত প্রশ্ন যোগ করলে এখানে পরীক্ষা পাওয়া যাবে।
            </p>
          </div>
        )}
      </div>

      {/* PRE-EXAM CONFIRMATION MODAL */}
      {showPreExamConfirm && selectedBlueprint && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>পরীক্ষা নির্দেশিকা</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                পরীক্ষা শুরু করার আগে
              </h3>
            </div>

            {/* Exam Information Details */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">পরীক্ষার নাম:</span>
                <span className="font-bold text-white">{selectedBlueprint.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">অধ্যায়:</span>
                <span className="font-bold text-cyan-400">{selectedBlueprint.chapterName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">মোট নম্বর:</span>
                <span className="font-bold text-emerald-400">১০০ নম্বর (১০০টি প্রশ্ন)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">সময়সীমা:</span>
                <span className="font-bold text-amber-400">৫০ মিনিট (নির্দিষ্ট)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">পরীক্ষা মোড:</span>
                <span className="font-bold text-indigo-400">উত্তর শেষে ফলাফল ও ব্যাখ্যা দেখুন</span>
              </div>
            </div>

            {/* Strict Notice Rules */}
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl space-y-1.5 text-xs text-rose-300">
              <div className="font-bold flex items-center gap-1.5 text-rose-400">
                <Lock className="w-4 h-4" />
                <span>পরীক্ষার নিয়মাবলী:</span>
              </div>
              <p className="leading-relaxed">
                • একবার উত্তর নির্বাচন করলে তা পরিবর্তন করা যাবে না।
              </p>
              <p className="leading-relaxed">
                • সময় শেষ হলে পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হবে।
              </p>
              <p className="leading-relaxed">
                • পরীক্ষা চলাকালীন সঠিক উত্তর বা ব্যাখ্যা দেখা যাবে না।
              </p>
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex items-start gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={rulesAcknowledged}
                onChange={(e) => setRulesAcknowledged(e.target.checked)}
                className="mt-0.5 accent-cyan-500 w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-300 leading-snug">
                আমি পরীক্ষার নিয়মগুলো বুঝেছি।
              </span>
            </label>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowPreExamConfirm(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs transition-all cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                disabled={!rulesAcknowledged}
                onClick={handleStartExam}
                className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>মডেল টেস্ট শুরু করুন</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
