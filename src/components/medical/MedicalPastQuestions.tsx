import React, { useState } from 'react';
import { 
  ArrowLeft, 
  History, 
  CheckCircle2, 
  ExternalLink, 
  AlertCircle, 
  Play, 
  Clock,
  X,
  HelpCircle
} from 'lucide-react';
import { MedicalPastQuestionSet } from '../../types/medical';
import { phy1Chap4PastQuestions } from '../../data/questions_phy1_chap4_newtonian';
import { phy1Chap6PastQuestions } from '../../data/questions_phy1_chap6_gravity';
import { medBio1Chap8TissuePastQuestions } from '../../data/questions_med_bio1_c8_tissue';

interface MedicalPastQuestionsProps {
  onBack: () => void;
  pastQuestionSets?: MedicalPastQuestionSet[];
  initialActiveSet?: MedicalPastQuestionSet | null;
  initialTimeMinutes?: number;
  initialMode?: 'exam' | 'practice';
  onStartPastQuestionQuiz?: (set: MedicalPastQuestionSet, timeMinutes?: number, mode?: 'exam' | 'practice') => void;
  onStartCustomTest?: (questions: any[], title: string, mode?: 'exam' | 'practice', timeMinutes?: number, meta?: any) => void;
}

type FilterSubject = 'all' | 'physics' | 'chemistry' | 'biology' | 'english' | 'general_knowledge';

export default function MedicalPastQuestions({
  onBack,
  pastQuestionSets = [],
  initialActiveSet = null,
  initialTimeMinutes,
  initialMode,
  onStartPastQuestionQuiz,
  onStartCustomTest
}: MedicalPastQuestionsProps) {
  const [selectedSubject, setSelectedSubject] = useState<FilterSubject>('all');
  
  // Modal state for time customization
  const [activeSetForConfig, setActiveSetForConfig] = useState<MedicalPastQuestionSet | null>(initialActiveSet);
  const [examTimeMinutes, setExamTimeMinutes] = useState<number>(initialTimeMinutes || 15);
  const [customTimeInput, setCustomTimeInput] = useState<string>(String(initialTimeMinutes || 15));
  const [quizMode, setQuizMode] = useState<'exam' | 'practice'>(initialMode || 'exam');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialActiveSet) {
      setActiveSetForConfig(initialActiveSet);
      if (initialTimeMinutes) {
        setExamTimeMinutes(initialTimeMinutes);
        setCustomTimeInput(String(initialTimeMinutes));
      }
      if (initialMode) {
        setQuizMode(initialMode);
      }
    }
  }, [initialActiveSet, initialTimeMinutes, initialMode]);

  // Built-in verified question sets
  const defaultBuiltInSets: MedicalPastQuestionSet[] = [
    {
      id: 'bio1_chap8_past_set',
      title: 'জীববিজ্ঞান ১ম পত্র: ৮ম অধ্যায় - টিস্যু ও টিস্যুতন্ত্র',
      subject: 'biology',
      year: '২০০০-২০২৬',
      sourceTitle: 'মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষা (মে.ভ.প. / ডে.ভ.প.)',
      sourceStatus: 'verified',
      isPublished: true,
      questions: medBio1Chap8TissuePastQuestions as any,
      questionIds: medBio1Chap8TissuePastQuestions.map(q => q.id)
    },
    {
      id: 'phy1_chap4_past_set',
      title: 'পদার্থবিজ্ঞান ১ম পত্র: ৪র্থ অধ্যায় - নিউটনিয়ান বলবিদ্যা',
      subject: 'physics',
      year: '2000-2024',
      sourceTitle: 'মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষা (ডিডিএইচএমই / ডিএটি)',
      sourceStatus: 'verified',
      isPublished: true,
      questions: phy1Chap4PastQuestions as any,
      questionIds: phy1Chap4PastQuestions.map(q => q.id)
    },
    {
      id: 'phy1_chap6_past_set',
      title: 'পদার্থবিজ্ঞান ১ম পত্র: ৬ষ্ঠ অধ্যায় - মহাকর্ষ ও অভিকর্ষ',
      subject: 'physics',
      year: '1990-2024',
      sourceTitle: 'মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষা (ডিডিএইচএমই / ডিএটি)',
      sourceStatus: 'verified',
      isPublished: true,
      questions: phy1Chap6PastQuestions as any,
      questionIds: phy1Chap6PastQuestions.map(q => q.id)
    }
  ];

  // Combine built-in verified sets with props
  const allSets = [...defaultBuiltInSets, ...pastQuestionSets];

  // Filter only published & verified sets
  const verifiedSets = allSets.filter(
    set => set.sourceStatus === 'verified' && (set.isPublished ?? true)
  );

  const filteredSets = verifiedSets.filter(set => {
    if (selectedSubject === 'all') return true;
    return set.subject === selectedSubject;
  });

  const filterTabs = [
    { key: 'all' as FilterSubject, label: 'সব বিষয়' },
    { key: 'physics' as FilterSubject, label: 'পদার্থবিজ্ঞান' },
    { key: 'biology' as FilterSubject, label: 'জীববিজ্ঞান' },
    { key: 'chemistry' as FilterSubject, label: 'রসায়ন' },
    { key: 'english' as FilterSubject, label: 'ইংরেজি' },
    { key: 'general_knowledge' as FilterSubject, label: 'সাধারণ জ্ঞান' },
  ];

  const handleOpenConfigModal = (set: MedicalPastQuestionSet) => {
    setActiveSetForConfig(set);
    setErrorMessage(null);
    const totalQ = set.questions?.length || set.questionIds?.length || 20;
    const defaultTime = Math.max(5, Math.ceil(totalQ * 0.75));
    setExamTimeMinutes(defaultTime);
    setCustomTimeInput(String(defaultTime));
    setQuizMode('exam');
  };

  const handleTimeMinutesChange = (mins: number) => {
    setExamTimeMinutes(mins);
    setCustomTimeInput(String(mins));
  };

  const handleCustomTimeInput = (val: string) => {
    setCustomTimeInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setExamTimeMinutes(Math.min(180, Math.max(1, parsed)));
    }
  };

  const handleStartExamFromModal = () => {
    if (!activeSetForConfig) return;
    const questions = activeSetForConfig.questions || [];

    if (!questions || questions.length === 0) {
      setErrorMessage('এই প্রশ্ন সেটে কোনো প্রকাশিত প্রশ্ন পাওয়া যায়নি।');
      return;
    }

    setErrorMessage(null);
    const finalMinutes = examTimeMinutes > 0 ? examTimeMinutes : Math.max(5, Math.ceil(questions.length * 0.75));

    if (onStartPastQuestionQuiz) {
      onStartPastQuestionQuiz(activeSetForConfig, finalMinutes, quizMode);
    } else if (onStartCustomTest) {
      onStartCustomTest(
        questions,
        activeSetForConfig.title,
        quizMode,
        finalMinutes,
        {
          collectionId: activeSetForConfig.id,
          collectionTitle: activeSetForConfig.title,
          subject: activeSetForConfig.subject,
          route: 'medical',
          feature: 'past_questions',
          rawSet: activeSetForConfig
        }
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER & BACK BUTTON */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ড্যাশবোর্ডে ফিরে যান</span>
        </button>

        <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5">
          <History className="w-4 h-4" />
          <span>বিগত বছরের প্রশ্ন</span>
        </div>
      </div>

      {/* TITLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white">
          মেডিকেল ও ডেন্টাল বিগত বছরের প্রশ্নাবলি
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          অফিসিয়াল প্রশ্নব্যাংক থেকে পছন্দমত সময় কাস্টমাইজ করে পরীক্ষা দিন।
        </p>
      </div>

      {/* SUBJECT FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => {
          const isSelected = selectedSubject === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedSubject(tab.key)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* LIST OF QUESTION SETS */}
      {filteredSets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSets.map((set) => {
            const count = set.questions?.length || set.questionIds?.length || 0;
            return (
              <div
                key={set.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-xl text-[11px] font-bold">
                      {set.year}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      যাচাইকৃত
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white">
                    {set.title}
                  </h3>

                  {set.sourceTitle && (
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span>উৎস: {set.sourceTitle}</span>
                      {set.sourceUrl && (
                        <a 
                          href={set.sourceUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-amber-400 hover:underline inline-flex items-center gap-0.5"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {count}টি প্রশ্ন
                  </span>

                  <button
                    onClick={() => handleOpenConfigModal(set)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>সময় কাস্টমাইজ ও পরীক্ষা</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4 shadow-xl max-w-xl mx-auto">
          <div className="w-16 h-16 bg-slate-800 border border-slate-700 text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              যাচাইকৃত বিগত বছরের প্রশ্ন এখনো যোগ করা হয়নি।
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              পদার্থবিজ্ঞান বিষয়ের বিগত ২০ বছরের প্রশ্নসমূহ উপরে পদার্থবিজ্ঞান ট্যাবে চেক করুন।
            </p>
          </div>
        </div>
      )}

      {/* TIME & MODE CUSTOMIZATION MODAL */}
      {activeSetForConfig && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-6 shadow-2xl relative">
            
            <button
              onClick={() => setActiveSetForConfig(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-slate-800 pb-4 pr-10">
              <span className="text-[11px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                পরীক্ষা কনফিগারেশন
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {activeSetForConfig.title}
              </h3>
              <p className="text-xs text-slate-400">
                মোট প্রশ্ন: <strong className="text-amber-400">{activeSetForConfig.questions?.length || activeSetForConfig.questionIds?.length || 0}টি</strong>। কোন টপিক সিলেক্ট করার প্রয়োজন নেই। সরাসরি সময় কাস্টমাইজ করুন।
              </p>
            </div>

            {/* TIME SELECTION */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  পরীক্ষার সময় নির্ধারণ করুন:
                </span>
                <span className="text-amber-400 font-extrabold text-sm">{examTimeMinutes} মিনিট</span>
              </label>

              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 15, 20, 30].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => handleTimeMinutesChange(mins)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      examTimeMinutes === mins
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mins}মি.
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 shrink-0 font-semibold">নিজের ইচ্ছামতো কাস্টম সময় (মিনিট):</span>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customTimeInput}
                  onChange={(e) => handleCustomTimeInput(e.target.value)}
                  className="w-24 bg-slate-900 border border-slate-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl text-center focus:outline-none focus:border-amber-400"
                  placeholder="মিনিট"
                />
                <span className="text-xs text-amber-300 font-bold">মিনিট</span>
              </div>
            </div>

            {/* EXAM VS PRACTICE MODE */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                পরীক্ষার মোড নির্বাচন করুন:
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setQuizMode('exam')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                    quizMode === 'exam'
                      ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-400">পরীক্ষা মোড (Exam)</div>
                  <p className="text-[11px] text-slate-400">টাইমার চলবে, পরীক্ষা শেষে সম্পূর্ণ রেজাল্ট ও ব্যাখ্যা পাবেন</p>
                </button>

                <button
                  onClick={() => setQuizMode('practice')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                    quizMode === 'practice'
                      ? 'bg-cyan-500/10 border-cyan-500 ring-1 ring-cyan-500/40 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-cyan-400">অনুশীলন মোড (Practice)</div>
                  <p className="text-[11px] text-slate-400">প্রতিটি প্রশ্নের সাথে সাথে সঠিক উত্তর ও ব্যাখ্যা দেখতে পাবেন</p>
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE IF ANY */}
            {errorMessage && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ACTION BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleStartExamFromModal}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>পরীক্ষা শুরু করুন ({examTimeMinutes} মিনিট)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

