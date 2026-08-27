import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  Layers, 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Clock, 
  GraduationCap, 
  AlertCircle,
  HelpCircle,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Languages,
  Binary,
  Globe
} from 'lucide-react';
import { 
  VARSITY_UNIVERSITIES, 
  VarsityUniversity, 
  VarsityUnit, 
  VarsitySubjectKey,
  toBanglaNumber 
} from '../../lib/varsityPracticeBank';
import { Question } from '../../types';
import { getLocalVarsityQuestions } from '../../lib/varsitySeedQuestions';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface VarsityUnitPracticeProps {
  onBack: () => void;
  onStartQuiz: (options: {
    mode: 'quiz' | 'exam';
    questions: Question[];
    title: string;
    timeMinutes?: number;
  }) => void;
}

export default function VarsityUnitPractice({
  onBack,
  onStartQuiz
}: VarsityUnitPracticeProps) {
  const [selectedUniversity, setSelectedUniversity] = useState<VarsityUniversity>(VARSITY_UNIVERSITIES[0]);
  const [selectedUnit, setSelectedUnit] = useState<VarsityUnit>(VARSITY_UNIVERSITIES[0].units[0]);
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<VarsitySubjectKey | 'all'>('all');
  const [firestoreQuestions, setFirestoreQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal / launch state
  const [examModalMode, setExamModalMode] = useState<'quiz' | 'exam'>('quiz');
  const [examTimeLimit, setExamTimeLimit] = useState<number>(20);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Fetch Firestore questions for this varsity route & unit if available
  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      if (!db) return;
      try {
        setLoading(true);
        const qRef = collection(db, 'questions');
        const qQuery = query(qRef, where('route', '==', 'varsity'));
        const snap = await getDocs(qQuery);
        if (isMounted) {
          const list: Question[] = [];
          snap.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() } as unknown as Question);
          });
          setFirestoreQuestions(list);
        }
      } catch (err) {
        console.warn('VarsityUnitPractice: Firestore question fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchQuestions();
    return () => { isMounted = false; };
  }, []);

  // Update selected unit when university changes
  const handleSelectUniversity = (univ: VarsityUniversity) => {
    setSelectedUniversity(univ);
    if (univ.units && univ.units.length > 0) {
      setSelectedUnit(univ.units[0]);
    }
    setSelectedSubjectKey('all');
  };

  // Combine seed questions with firestore questions
  const seedQuestions = getLocalVarsityQuestions();
  const allVarsityQuestions = [...seedQuestions, ...firestoreQuestions];

  // Filter questions for the selected university unit & subject
  const currentUnitQuestions = allVarsityQuestions.filter((q) => {
    if (q.route && q.route !== 'varsity') return false;
    
    // Check unit match or general varsity science/general alignment
    const unitMatch = !q.unit || q.unit === selectedUnit.id || 
      (selectedUnit.targetGroup === 'science' && (q.unit === 'du_ka' || q.unit === 'gst_a'));

    if (!unitMatch) return false;

    // Filter by subject if specified
    if (selectedSubjectKey !== 'all') {
      const qSub = (q.subject || '').toLowerCase();
      const sKey = selectedSubjectKey.toLowerCase();
      return qSub.includes(sKey) || sKey.includes(qSub);
    }

    return true;
  });

  const getSubjectIcon = (subKey: string) => {
    switch (subKey) {
      case 'physics': return <Atom className="w-4 h-4 text-cyan-400" />;
      case 'chemistry': return <FlaskConical className="w-4 h-4 text-emerald-400" />;
      case 'higher_math': return <Calculator className="w-4 h-4 text-indigo-400" />;
      case 'biology': return <Dna className="w-4 h-4 text-rose-400" />;
      case 'english': return <Languages className="w-4 h-4 text-amber-400" />;
      case 'bangla':
      case 'bangla_first':
      case 'bangla_second': return <Languages className="w-4 h-4 text-teal-400" />;
      case 'ict': return <Binary className="w-4 h-4 text-sky-400" />;
      case 'general_knowledge': return <Globe className="w-4 h-4 text-purple-400" />;
      default: return <BookOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSubjectNameBn = (subKey: string) => {
    switch (subKey) {
      case 'physics': return 'পদার্থবিজ্ঞান';
      case 'chemistry': return 'রসায়ন';
      case 'higher_math': return 'উচ্চতর গণিত';
      case 'biology': return 'জীববিজ্ঞান';
      case 'english': return 'ইংরেজি';
      case 'bangla':
      case 'bangla_first': return 'বাংলা ১ম পত্র';
      case 'bangla_second': return 'বাংলা ২য় পত্র';
      case 'ict': return 'তথ্য ও যোগাযোগ প্রযুক্তি';
      case 'general_knowledge': return 'সাধারণ জ্ঞান';
      default: return subKey;
    }
  };

  const handleLaunchPractice = (mode: 'quiz' | 'exam') => {
    if (currentUnitQuestions.length === 0) return;
    const title = `${selectedUniversity.shortName} • ${selectedUnit.nameEn} (${selectedSubjectKey === 'all' ? 'পূর্ণাঙ্গ ইউনিট' : getSubjectNameBn(selectedSubjectKey)})`;
    onStartQuiz({
      mode,
      questions: currentUnitQuestions,
      title,
      timeMinutes: mode === 'exam' ? examTimeLimit : undefined
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
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>মডিউল ১ • বিশ্ববিদ্যালয় / ইউনিটভিত্তিক অনুশীলন</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              বিশ্ববিদ্যালয় ও ইউনিট নির্বাচন
            </h1>
          </div>
        </div>
      </div>

      {/* STEP 1: UNIVERSITY SELECTOR */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-extrabold">১</span>
            <span>বিশ্ববিদ্যালয় নির্বাচন করুন</span>
          </h2>
          <span className="text-xs text-slate-400">
            {VARSITY_UNIVERSITIES.length}টি প্রধান ক্লাস্টার
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {VARSITY_UNIVERSITIES.map((univ) => {
            const isSelected = selectedUniversity.key === univ.key;
            return (
              <button
                key={univ.key}
                onClick={() => handleSelectUniversity(univ)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/80 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-cyan-400">
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
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-extrabold">২</span>
            <span>{selectedUniversity.shortName} এর ইউনিট নির্বাচন করুন</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedUniversity.units.map((unit) => {
            const isSelected = selectedUnit.id === unit.id;
            return (
              <div
                key={unit.id}
                onClick={() => {
                  setSelectedUnit(unit);
                  setSelectedSubjectKey('all');
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 text-white shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-400">
                      {unit.nameEn}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <h3 className="text-base font-bold mt-2 text-white">
                    {unit.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {unit.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>বিষয় সংখ্যা: {toBanglaNumber(unit.applicableSubjects.length)}টি</span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-1">
                    নির্বাচন করুন <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: SUBJECT SELECTION & PRACTICE LAUNCH */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {selectedUniversity.name} • {selectedUnit.name}
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              ইউনিটের বিষয় ও প্রশ্ন অনুশীলন
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              মোট প্রশ্ন: <strong className="text-cyan-400 font-bold font-mono">{toBanglaNumber(currentUnitQuestions.length)}</strong> টি
            </span>
          </div>
        </div>

        {/* Subjects in this Unit */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            বিষয়ভিত্তিক ফিল্টার:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubjectKey('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedSubjectKey === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>সকল বিষয় ({toBanglaNumber(allVarsityQuestions.filter(q => !q.unit || q.unit === selectedUnit.id || (selectedUnit.targetGroup === 'science' && (q.unit === 'du_ka' || q.unit === 'gst_a'))).length)})</span>
            </button>

            {selectedUnit.applicableSubjects.map((subKey) => {
              const subQuestionsCount = allVarsityQuestions.filter((q) => {
                const qSub = (q.subject || '').toLowerCase();
                const sKey = subKey.toLowerCase();
                const matchSub = qSub.includes(sKey) || sKey.includes(qSub);
                const unitMatch = !q.unit || q.unit === selectedUnit.id || 
                  (selectedUnit.targetGroup === 'science' && (q.unit === 'du_ka' || q.unit === 'gst_a'));
                return matchSub && unitMatch;
              }).length;

              const isSelected = selectedSubjectKey === subKey;
              return (
                <button
                  key={subKey}
                  onClick={() => setSelectedSubjectKey(subKey)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {getSubjectIcon(subKey)}
                  <span>{getSubjectNameBn(subKey)}</span>
                  <span className="text-[10px] opacity-75 font-mono">({toBanglaNumber(subQuestionsCount)})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Questions Status or Empty State */}
        {currentUnitQuestions.length > 0 ? (
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>অনুশীলনের জন্য প্রস্তুত</span>
              </div>
              <h4 className="text-lg font-bold text-white">
                {selectedUniversity.shortName} {selectedUnit.nameEn} অনুশীলন সেট
              </h4>
              <p className="text-xs text-slate-400 max-w-xl">
                এই ইউনিটের জন্য মোট {toBanglaNumber(currentUnitQuestions.length)}টি যাচাইকৃত প্রশ্ন রয়েছে। আপনি তাৎক্ষণিক সমাধান সহ প্র্যাকটিস অথবা টাইমার সহ পরীক্ষা দিতে পারেন।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleLaunchPractice('quiz')}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-cyan-500/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>প্র্যাকটিস মোড</span>
              </button>

              <button
                onClick={() => {
                  setExamModalMode('exam');
                  setShowConfigModal(true);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-slate-700"
              >
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>টাইমড পরীক্ষা</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
            <h4 className="text-base font-bold text-white">
              এই বিষয়ের প্রশ্নব্যাংক শিগগিরই আসছে
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              নির্বাচিত ইউনিট ও বিষয়ের জন্য নতুন প্রশ্ন সংকলন ও যাচাইকরণের কাজ চলছে। খুব শীঘ্রই এখানে লাইভ হবে।
            </p>
          </div>
        )}
      </div>

      {/* TIMED EXAM CONFIG MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>ইউনিট পরীক্ষার সময় নির্ধারণ</span>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
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
                  {[10, 15, 20, 30].map((t) => (
                    <button
                      key={t}
                      onClick={() => setExamTimeLimit(t)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        examTimeLimit === t
                          ? 'bg-cyan-500 text-slate-950'
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
                  <span>মোট প্রশ্ন:</span>
                  <span className="text-white font-bold">{toBanglaNumber(currentUnitQuestions.length)}টি</span>
                </div>
                <div className="flex justify-between">
                  <span>নেগেটিভ মার্কিং:</span>
                  <span className="text-amber-400 font-bold">০.২৫ প্রতি ভুল উত্তর</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  setShowConfigModal(false);
                  handleLaunchPractice('exam');
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2"
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
