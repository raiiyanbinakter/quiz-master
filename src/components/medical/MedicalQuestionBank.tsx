import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Dna, 
  FlaskConical, 
  Atom, 
  Languages, 
  Globe, 
  AlertCircle, 
  Play, 
  Layers, 
  Sparkles, 
  X, 
  Filter, 
  BookMarked,
  ShieldCheck,
  Timer,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Check
} from 'lucide-react';
import { Subject } from '../../types';
import { MODULE_1_CONFIG } from '../../data/moduleConfig';
import { phy1Chap4RawQuestions } from '../../data/questions_phy1_chap4_newtonian';
import { phy1Chap6RawQuestions } from '../../data/questions_phy1_chap6_gravity';
import { phy1Chap2Data } from '../../data/questions_phy1_chap2';
import { bio1Chap1Data } from '../../data/questions_bio1_chap1';
import { bio1Chap7Data } from '../../data/questions_bio1_chap7';
import { chem1Chap2Data } from '../../data/questions_chem1_chap2';

interface MedicalQuestionBankProps {
  syllabus: Subject[];
  onBack: () => void;
  onStartQuiz: (subject: Subject, chapterIndex: number, mode?: 'quiz' | 'exam') => void;
  onStartCustomTest?: (questions: any[], title: string, mode?: 'quiz' | 'exam') => void;
}

type MainSubjectKey = 'physics' | 'chemistry' | 'biology' | 'english' | 'general_knowledge';

interface SetupChapterState {
  chapterIdx: number;
  chapterName: string;
  chapterNumberLabel: string;
  rawList: any[];
  hasTeacherSets: boolean;
}

// Convert numbers to Bangla digits
const getBanglaNumber = (num: number): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).split('').map(d => banglaDigits[parseInt(d, 10)] || d).join('');
};

export default function MedicalQuestionBank({
  syllabus,
  onBack,
  onStartQuiz,
  onStartCustomTest
}: MedicalQuestionBankProps) {
  const [selectedMainSubject, setSelectedMainSubject] = useState<MainSubjectKey>('physics');
  const [selectedPaper, setSelectedPaper] = useState<'1st' | '2nd'>('1st');

  // Modal Setup State
  const [setupModalOpen, setSetupModalOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<SetupChapterState | null>(null);
  const [step, setStep] = useState<'teacher_select' | 'mode_setup'>('teacher_select');

  // Filters & Customizations
  const [selectedTeacher, setSelectedTeacher] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<'quiz' | 'exam'>('quiz');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number | null>(null);
  const [practiceTimeOption, setPracticeTimeOption] = useState<'no_limit' | 'custom'>('no_limit');
  const [customTimeMinutes, setCustomTimeMinutes] = useState<string>('');

  // Subject Definitions
  const subjectsList = [
    { key: 'physics' as MainSubjectKey, name: 'পদার্থবিজ্ঞান', icon: Atom, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
    { key: 'chemistry' as MainSubjectKey, name: 'রসায়ন', icon: FlaskConical, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { key: 'biology' as MainSubjectKey, name: 'জীববিজ্ঞান', icon: Dna, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
    { key: 'english' as MainSubjectKey, name: 'ইংরেজি', icon: Languages, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { key: 'general_knowledge' as MainSubjectKey, name: 'সাধারণ জ্ঞান', icon: Globe, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' }
  ];

  // Resolve matching syllabus subject ID
  const getSubjectIdForSelection = (): string | null => {
    if (selectedMainSubject === 'biology') return selectedPaper === '1st' ? 'bio1' : 'bio2';
    if (selectedMainSubject === 'chemistry') return selectedPaper === '1st' ? 'chem1' : 'chem2';
    if (selectedMainSubject === 'physics') return selectedPaper === '1st' ? 'phys1' : 'phys2';
    return null;
  };

  const currentSubjectId = getSubjectIdForSelection();
  const currentSyllabusSubject = currentSubjectId ? syllabus.find(s => s.id === currentSubjectId) : null;
  const isPaperSubject = ['biology', 'chemistry', 'physics'].includes(selectedMainSubject);

  // Question & Teacher set resolver for any chapter
  const getChapterData = (subjectId: string, idx: number): { rawList: any[]; hasTeacherSets: boolean } => {
    if (subjectId === 'phys1') {
      if (idx === 3) return { rawList: phy1Chap4RawQuestions, hasTeacherSets: true };
      if (idx === 5) return { rawList: phy1Chap6RawQuestions, hasTeacherSets: true };
      if (idx === 1) return { rawList: phy1Chap2Data?.questions || [], hasTeacherSets: false };
    }
    if (subjectId === 'bio1') {
      if (idx === 0) return { rawList: bio1Chap1Data?.questions || [], hasTeacherSets: false };
      if (idx === 6) return { rawList: bio1Chap7Data?.questions || [], hasTeacherSets: false };
    }
    if (subjectId === 'chem1') {
      if (idx === 1) return { rawList: chem1Chap2Data?.questions || [], hasTeacherSets: false };
    }
    return { rawList: [], hasTeacherSets: false };
  };

  // Open modal for selected chapter & initial mode
  const handleOpenSetup = (chapterIdx: number, chapterName: string, initialMode: 'quiz' | 'exam') => {
    const { rawList, hasTeacherSets } = getChapterData(currentSubjectId || '', chapterIdx);
    if (!rawList || rawList.length === 0) return;

    const chapNumberLabel = `${getBanglaNumber(chapterIdx + 1)} অধ্যায়`;

    setActiveChapter({
      chapterIdx,
      chapterName,
      chapterNumberLabel: chapNumberLabel,
      rawList,
      hasTeacherSets
    });

    setSelectedMode(initialMode);
    setSelectedTeacher('all');
    setSelectedTopic('all');

    // Rule: Default selectedQuestionCount MUST be null
    setSelectedQuestionCount(null);

    // Time defaults
    if (initialMode === 'quiz') {
      setPracticeTimeOption('no_limit');
      setCustomTimeMinutes('15');
    } else {
      setPracticeTimeOption('custom');
      setCustomTimeMinutes(''); // Empty default in exam mode
    }

    // If teacher sets exist, open teacher selection first, else jump straight to mode setup
    if (hasTeacherSets) {
      setStep('teacher_select');
    } else {
      setStep('mode_setup');
    }

    setSetupModalOpen(true);
  };

  // Active Questions Filtered by Teacher Set & Topic
  const getFilteredQuestions = () => {
    if (!activeChapter) return [];
    let list = [...activeChapter.rawList];

    if (activeChapter.hasTeacherSets && selectedTeacher !== 'all') {
      list = list.filter(q => q.author === selectedTeacher);
    }
    if (selectedTopic !== 'all') {
      list = list.filter(q => q.topic === selectedTopic);
    }
    return list;
  };

  const currentFiltered = getFilteredQuestions();
  const totalAvailableCount = currentFiltered.length;

  // If filtered questions list shrinks below currently selected count, reset selected count to null
  React.useEffect(() => {
    if (selectedQuestionCount !== null && totalAvailableCount > 0 && selectedQuestionCount > totalAvailableCount) {
      setSelectedQuestionCount(null);
    }
  }, [totalAvailableCount, selectedQuestionCount]);

  // Generate valid question count options strictly <= available questions
  const getValidQuestionCounts = (totalCount: number) => {
    if (totalCount <= 0) return [];
    const standardOptions = [10, 20, 30, 50];
    const validCounts = standardOptions.filter(n => n < totalCount);

    const choices: { count: number; label: string; isAll?: boolean }[] = validCounts.map(n => ({
      count: n,
      label: `${getBanglaNumber(n)}টি প্রশ্ন`
    }));

    choices.push({
      count: totalCount,
      label: `সব ${getBanglaNumber(totalCount)}টি প্রশ্ন`,
      isAll: true
    });

    return choices;
  };

  // Available topics for active chapter
  const activeTopics = activeChapter ? Array.from(new Set(activeChapter.rawList.map(q => q.topic))).filter(Boolean) : [];

  // Parse & validate time input (1 to 180 minutes)
  const parseAndValidateTime = () => {
    if (selectedMode === 'quiz' && practiceTimeOption === 'no_limit') {
      return { isValid: true, minutes: 0, error: null };
    }

    const trimmed = customTimeMinutes.trim();
    if (trimmed === '') {
      return { 
        isValid: false, 
        minutes: null, 
        error: selectedMode === 'exam' || practiceTimeOption === 'custom' ? '১ থেকে ১৮০ মিনিটের মধ্যে একটি পূর্ণসংখ্যা লিখুন' : null 
      };
    }

    const val = Number(trimmed);
    if (!Number.isInteger(val) || val < 1 || val > 180) {
      return { 
        isValid: false, 
        minutes: null, 
        error: '১ থেকে ১৮০ মিনিটের মধ্যে একটি পূর্ণসংখ্যা লিখুন' 
      };
    }

    return { isValid: true, minutes: val, error: null };
  };

  const timeValidation = parseAndValidateTime();
  const isTimeValid = timeValidation.isValid;
  const timeError = timeValidation.error;
  const parsedTimeMinutes = timeValidation.minutes;

  // Start test/practice execution
  const handleStartTest = () => {
    if (!activeChapter || currentFiltered.length === 0) return;
    if (selectedQuestionCount === null || !isTimeValid) return;

    const countToTake = Math.min(selectedQuestionCount, currentFiltered.length);
    const questionsToUse = currentFiltered.slice(0, countToTake);

    let subjectPrefix = 'পদার্থবিজ্ঞান ১ম';
    if (selectedMainSubject === 'chemistry') subjectPrefix = selectedPaper === '1st' ? 'রসায়ন ১ম' : 'রসায়ন ২য়';
    if (selectedMainSubject === 'biology') subjectPrefix = selectedPaper === '1st' ? 'জীববিজ্ঞান ১ম' : 'জীববিজ্ঞান ২য়';

    let title = `${subjectPrefix} — ${activeChapter.chapterName}`;
    if (activeChapter.hasTeacherSets && selectedTeacher !== 'all') {
      title += ` (${selectedTeacher})`;
    }
    if (selectedTopic !== 'all') {
      title += ` - ${selectedTopic}`;
    }

    const totalMinutes = parsedTimeMinutes || 0;
    const timeLimitPerQuestion = totalMinutes > 0
      ? Math.max(15, Math.floor((totalMinutes * 60) / questionsToUse.length))
      : 30;

    const formattedQuestions = questionsToUse.map((q: any, idx: number) => ({
      id: idx + 1,
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: (q.explanation || '') + (q.author ? ` [লেখক: ${q.author}]` : '') + (q.ref ? ` [Ref: ${q.ref}]` : ''),
      topic: q.topic,
      time_limit: timeLimitPerQuestion
    }));

    setSetupModalOpen(false);

    if (onStartCustomTest && formattedQuestions.length > 0) {
      onStartCustomTest(formattedQuestions, title, selectedMode);
    } else if (currentSyllabusSubject) {
      onStartQuiz(currentSyllabusSubject, activeChapter.chapterIndex, selectedMode);
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

        <div className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>অনুশীলনী প্রশ্নব্যাংক</span>
        </div>
      </div>

      {/* TITLE HERO */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        <h1 className="text-2xl font-extrabold text-white">
          মেডিকেল ও একাডেমিক অনুশীলন প্রশ্নব্যাংক
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          বিষয়, পত্র, অধ্যায় ও শিক্ষকভিত্তিক অনুশীলন প্রশ্নব্যাংক। আপনার পছন্দের অনুশীলনী বা পরীক্ষা মোড বেছে নিয়ে অনুশীলন শুরু করুন।
        </p>
      </div>

      {/* 1. SUBJECT SELECTOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {subjectsList.map((sub) => {
          const Icon = sub.icon;
          const isSelected = selectedMainSubject === sub.key;
          return (
            <button
              key={sub.key}
              onClick={() => setSelectedMainSubject(sub.key)}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-slate-800 border-cyan-500 text-white shadow-lg ring-1 ring-cyan-500/30' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-xl border ${sub.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold">
                {sub.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. PAPER SELECTOR */}
      {isPaperSubject && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center justify-center gap-2 max-w-md mx-auto">
          <button
            onClick={() => setSelectedPaper('1st')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedPaper === '1st'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ১ম পত্র
          </button>
          <button
            onClick={() => setSelectedPaper('2nd')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedPaper === '2nd'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ২য় পত্র
          </button>
        </div>
      )}

      {/* 3. CHAPTER HIERARCHY GRID */}
      {currentSyllabusSubject && currentSyllabusSubject.chapters && currentSyllabusSubject.chapters.length > 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{currentSyllabusSubject.name} — অধ্যায়সমূহ</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                অনুশীলন বা পরীক্ষা শুরু করতে মোড বেছে নিন
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-xl">
              {getBanglaNumber(currentSyllabusSubject.chapters.length)}টি অধ্যায়
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentSyllabusSubject.chapters.map((chapterName, idx) => {
              const { rawList, hasTeacherSets } = getChapterData(currentSubjectId || '', idx);
              const qCount = rawList.length;
              const hasQuestions = qCount > 0;
              const chapterNumLabel = `${getBanglaNumber(idx + 1)} অধ্যায়`;

              return (
                <div
                  key={idx}
                  className={`border rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all ${
                    hasQuestions 
                      ? 'bg-slate-950 border-slate-800 hover:border-slate-700 shadow-md' 
                      : 'bg-slate-950/50 border-slate-800/50 opacity-75'
                  }`}
                >
                  <div className="space-y-1.5">
                    {/* Header Row: Chapter Number + Available Questions Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg">
                        {chapterNumLabel}
                      </span>
                      {hasQuestions ? (
                        <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>{getBanglaNumber(qCount)}টি প্রশ্ন উপলব্ধ</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>প্রশ্ন যুক্ত করা হচ্ছে</span>
                        </span>
                      )}
                    </div>
                    
                    {/* Chapter Name */}
                    <h3 className="text-sm font-bold text-white pt-1">
                      {chapterName}
                    </h3>

                    {/* Optional Teacher Set Label if real teacher data exists */}
                    {hasTeacherSets && (
                      <div className="pt-0.5">
                        <span className="text-[10px] font-bold text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md inline-block">
                          শিক্ষক সংকলন: ইসহাক স্যার • তপন স্যার • তোফাজ্জল স্যার
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="pt-2 border-t border-slate-800/80">
                    {hasQuestions ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenSetup(idx, chapterName, 'quiz')}
                          className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-extrabold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>অনুশীলন মোড</span>
                        </button>
                        <button
                          onClick={() => handleOpenSetup(idx, chapterName, 'exam')}
                          className="bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 hover:border-purple-500/60 font-extrabold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>পরীক্ষা মোড</span>
                        </button>
                      </div>
                    ) : (
                      <div className="w-full py-2 bg-slate-900/60 border border-slate-800/80 rounded-xl text-center text-xs font-semibold text-slate-500 flex items-center justify-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-600" />
                        <span>প্রশ্ন যুক্ত করা হচ্ছে</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* HONEST EMPTY STATE */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4 shadow-xl max-w-xl mx-auto">
          <div className="w-16 h-16 bg-slate-800 border border-slate-700 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              এই বিষয়ের প্রশ্নব্যাংক প্রস্তুত হচ্ছে।
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              পদার্থবিজ্ঞান ১ম পত্রের ৪র্থ অধ্যায় (নিউটনীয় বলবিদ্যা) ও ৬ষ্ঠ অধ্যায় (মহাকর্ষ ও অভিকর্ষ) সম্পূর্ণ প্রস্তুত আছে।
            </p>
          </div>
        </div>
      )}

      {/* SETUP MODAL FLOW */}
      {setupModalOpen && activeChapter && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
                  <BookMarked className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {step === 'mode_setup' && selectedTeacher !== 'all'
                      ? `${activeChapter.chapterName} — ${selectedTeacher}`
                      : `${activeChapter.chapterNumberLabel}: ${activeChapter.chapterName}`}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {step === 'teacher_select'
                      ? 'প্রশ্ন সেট / শিক্ষক সংকলন নির্বাচন করুন'
                      : `উৎস: ${selectedTeacher === 'all' ? 'সকল সংকলন' : selectedTeacher} | উপলব্ধ প্রশ্ন: ${getBanglaNumber(totalAvailableCount)}টি`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSetupModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: TEACHER SET SELECTION */}
            {step === 'teacher_select' && activeChapter.hasTeacherSets && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span>প্রশ্ন সেট / শিক্ষক সংকলন নির্বাচন করুন:</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    পছন্দের লেখকের প্রশ্ন সেট বেছে নিন। প্রতিটি সেটের প্রশ্ন সংখ্যা আলাদা।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option: All Questions */}
                  <button
                    onClick={() => {
                      setSelectedTeacher('all');
                      setStep('mode_setup');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer hover:scale-[1.01] ${
                      selectedTeacher === 'all'
                        ? 'bg-sky-500/15 border-sky-500 text-white shadow-lg ring-1 ring-sky-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-sm text-white">
                      <span>সকল শিক্ষক সংকলন</span>
                      <span className="text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">
                        {getBanglaNumber(activeChapter.rawList.length)}টি প্রশ্ন
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">সব শিক্ষক প্রশ্ন একত্রে অনুশীিলন করুন</p>
                  </button>

                  {/* Option: Isahaq Sir */}
                  <button
                    onClick={() => {
                      setSelectedTeacher('ইসহাক স্যার');
                      setStep('mode_setup');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer hover:scale-[1.01] ${
                      selectedTeacher === 'ইসহাক স্যার'
                        ? 'bg-sky-500/15 border-sky-500 text-white shadow-lg ring-1 ring-sky-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-sm text-white">
                      <span>সেট ১: ইসহাক স্যার</span>
                      <span className="text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">
                        {getBanglaNumber(activeChapter.rawList.filter(q => q.author === 'ইসহাক স্যার').length)}টি প্রশ্ন
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">বোর্ড ও বিশ্ববিদ্যালয় সম্পর্কিত স্ট্যান্ডার্ড প্রশ্ন</p>
                  </button>

                  {/* Option: Tapan Sir */}
                  <button
                    onClick={() => {
                      setSelectedTeacher('তপন স্যার');
                      setStep('mode_setup');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer hover:scale-[1.01] ${
                      selectedTeacher === 'তপন স্যার'
                        ? 'bg-sky-500/15 border-sky-500 text-white shadow-lg ring-1 ring-sky-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-sm text-white">
                      <span>সেট ২: তপন স্যার</span>
                      <span className="text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">
                        {getBanglaNumber(activeChapter.rawList.filter(q => q.author === 'তপন স্যার').length)}টি প্রশ্ন
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">অনুশীলনী ভিত্তিক কনসেপচুয়াল প্রশ্নাবলি</p>
                  </button>

                  {/* Option: Tofazzal Sir */}
                  <button
                    onClick={() => {
                      setSelectedTeacher('তোফাজ্জল স্যার');
                      setStep('mode_setup');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer hover:scale-[1.01] ${
                      selectedTeacher === 'তোফাজ্জল স্যার'
                        ? 'bg-sky-500/15 border-sky-500 text-white shadow-lg ring-1 ring-sky-500/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-sm text-white">
                      <span>সেট ৩: তোফাজ্জল স্যার</span>
                      <span className="text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">
                        {getBanglaNumber(activeChapter.rawList.filter(q => q.author === 'তোফাজ্জল স্যার').length)}টি প্রশ্ন
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">বিশেষ মেডিকেল স্ট্যান্ডার্ড প্রশ্ন সংকলন</p>
                  </button>
                </div>

                {/* Optional Topic Filter */}
                {activeTopics.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Filter className="w-4 h-4 text-emerald-400" />
                      <span>টপিক ফিল্টার (ঐচ্ছিক):</span>
                    </label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:outline-none focus:border-sky-500"
                    >
                      <option value="all">সকল টপিক ({getBanglaNumber(activeTopics.length)}টি টপিক)</option>
                      {activeTopics.map((top, i) => (
                        <option key={i} value={top}>{top}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: MODE SETUP SCREEN */}
            {step === 'mode_setup' && (
              <div className="space-y-5">
                
                {/* Back to Teacher Step Button if Teacher Sets Exist */}
                {activeChapter.hasTeacherSets && (
                  <button
                    onClick={() => setStep('teacher_select')}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>শিক্ষক সংকলন পরিবর্তন করুন</span>
                  </button>
                )}

                {/* MODE CARDS (2 CARDS) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">
                    মোড নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Card A: Practice Mode */}
                    <div
                      onClick={() => setSelectedMode('quiz')}
                      className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                        selectedMode === 'quiz'
                          ? 'bg-cyan-500/10 border-cyan-500 ring-1 ring-cyan-500/40 text-white shadow-xl'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>অনুশীলন মোড</span>
                          </span>
                          {selectedMode === 'quiz' && (
                            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                          )}
                        </div>

                        <p className="text-xs font-semibold text-slate-200">
                          প্রতিটি প্রশ্নের উত্তর দেওয়ার পর ব্যাখ্যা দেখুন।
                        </p>

                        <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>তাৎক্ষণিক সঠিক/ভুল উত্তর প্রদর্শন</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>প্রতিটি উত্তরের পর বিস্তারিত ব্যাখ্যা</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>ইচ্ছেমতো স্কিপ করার সুবিধা</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>কাস্টম টাইমার ঐচ্ছিক</span>
                          </li>
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMode('quiz');
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-extrabold transition-all ${
                          selectedMode === 'quiz'
                            ? 'bg-cyan-500 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {selectedMode === 'quiz' ? '✓ অনুশীলন মোড সক্রিয়' : 'অনুশীলন বেছে নিন'}
                      </button>
                    </div>

                    {/* Card B: Exam Mode */}
                    <div
                      onClick={() => setSelectedMode('exam')}
                      className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                        selectedMode === 'exam'
                          ? 'bg-purple-500/10 border-purple-500 ring-1 ring-purple-500/40 text-white shadow-xl'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>পরীক্ষা মোড</span>
                          </span>
                          {selectedMode === 'exam' && (
                            <CheckCircle2 className="w-5 h-5 text-purple-400" />
                          )}
                        </div>

                        <p className="text-xs font-semibold text-slate-200">
                          নির্ধারিত সময়ের মধ্যে উত্তর দিন। পরীক্ষা শেষে পূর্ণ ফলাফল ও ব্যাখ্যা দেখুন।
                        </p>

                        <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>পরীক্ষা চলাকালীন উত্তর গোপন থাকবে</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>লাইভ কাউন্টডাউন টাইমার দৃশ্যমান</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>পরীক্ষা শেষে পূর্ণাঙ্গ পারফরম্যান্স কার্ড</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>প্রকৃত মেডিকেল পরীক্ষার অভিজ্ঞতা</span>
                          </li>
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMode('exam');
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-extrabold transition-all ${
                          selectedMode === 'exam'
                            ? 'bg-purple-500 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {selectedMode === 'exam' ? '✓ পরীক্ষা মোড সক্রিয়' : 'পরীক্ষা মোড বেছে নিন'}
                      </button>
                    </div>

                  </div>
                </div>

                {/* QUESTION COUNT SELECTION */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>প্রশ্নের সংখ্যা নির্বাচন করুন:</span>
                    <span className="text-[11px] text-sky-400 font-normal">
                      উত্তোলনযোগ্য: {getBanglaNumber(totalAvailableCount)}টি প্রশ্ন
                    </span>
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {getValidQuestionCounts(totalAvailableCount).map((opt) => (
                      <button
                        key={opt.count}
                        type="button"
                        onClick={() => setSelectedQuestionCount(opt.count)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          selectedQuestionCount === opt.count
                            ? selectedMode === 'exam'
                              ? 'bg-purple-500 text-slate-950 shadow-md ring-2 ring-purple-400'
                              : 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-400'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {selectedQuestionCount === null && (
                    <p className="text-xs text-amber-400 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>প্রথমে প্রশ্ন সংখ্যা নির্বাচন করুন</span>
                    </p>
                  )}
                </div>

                {/* TIME LIMIT CUSTOMIZATION */}
                <div className="space-y-3 pt-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-cyan-400" />
                    <span>সময়সীমা নির্ধারণ করুন:</span>
                  </label>

                  {selectedMode === 'quiz' ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setPracticeTimeOption('no_limit')}
                          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                            practiceTimeOption === 'no_limit'
                              ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold ring-2 ring-cyan-400'
                              : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          সময় ছাড়া অনুশীলন
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPracticeTimeOption('custom');
                            if (!customTimeMinutes) setCustomTimeMinutes('15');
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                            practiceTimeOption === 'custom'
                              ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold ring-2 ring-cyan-400'
                              : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          নিজের সময়
                        </button>
                      </div>

                      {practiceTimeOption === 'custom' && (
                        <div className="space-y-2 bg-slate-950 border border-slate-800 p-3.5 rounded-2xl animate-in fade-in">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <label className="text-xs font-bold text-slate-300">
                              সময় লিখুন (মিনিট):
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="1"
                                max="180"
                                value={customTimeMinutes}
                                onChange={(e) => setCustomTimeMinutes(e.target.value)}
                                placeholder="১৫"
                                className="w-24 bg-slate-900 border border-slate-700 text-white font-bold text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400 text-center"
                              />
                              <span className="text-xs text-slate-400 font-medium">মিনিট</span>
                            </div>
                          </div>

                          {timeError && (
                            <p className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{timeError}</span>
                            </p>
                          )}

                          <div className="pt-1">
                            <span className="text-[11px] text-slate-400 block mb-1.5">দ্রুত সময় নির্বাচন:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {[5, 10, 15, 20, 30].map((mins) => (
                                <button
                                  key={mins}
                                  type="button"
                                  onClick={() => setCustomTimeMinutes(String(mins))}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    customTimeMinutes === String(mins)
                                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-extrabold'
                                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  {getBanglaNumber(mins)} মিনিট
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2.5 bg-slate-950 border border-slate-800 p-3.5 rounded-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-xs font-bold text-slate-300">
                          পরীক্ষার সময় লিখুন (মিনিট):
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            max="180"
                            value={customTimeMinutes}
                            onChange={(e) => setCustomTimeMinutes(e.target.value)}
                            placeholder="যেমন: ১৫"
                            className="w-28 bg-slate-900 border border-slate-700 text-white font-bold text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-400 text-center"
                          />
                          <span className="text-xs text-slate-400 font-medium">মিনিট</span>
                        </div>
                      </div>

                      {timeError && (
                        <p className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{timeError}</span>
                        </p>
                      )}

                      <div className="pt-1">
                        <span className="text-[11px] text-slate-400 block mb-1.5">দ্রুত সময় নির্বাচন:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[5, 10, 15, 20, 30].map((mins) => (
                            <button
                              key={mins}
                              type="button"
                              onClick={() => setCustomTimeMinutes(String(mins))}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                customTimeMinutes === String(mins)
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-extrabold'
                                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {getBanglaNumber(mins)} মিনিট
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* SUMMARY PREVIEW */}
                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-400">নির্বাচন সংক্ষেপ:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg font-bold bg-slate-900 border border-slate-700 text-slate-200">
                      {selectedMode === 'exam' ? 'পরীক্ষা মোড' : 'অনুশীলন মোড'}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg font-bold ${
                      selectedQuestionCount !== null
                        ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300'
                        : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                    }`}>
                      {selectedQuestionCount !== null
                        ? (selectedQuestionCount === totalAvailableCount
                            ? `সব ${getBanglaNumber(totalAvailableCount)}টি প্রশ্ন`
                            : `${getBanglaNumber(selectedQuestionCount)}টি প্রশ্ন`)
                        : 'প্রশ্ন নির্বাচন করা হয়নি'}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg font-bold ${
                      isTimeValid
                        ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300'
                        : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                    }`}>
                      {selectedMode === 'quiz' && practiceTimeOption === 'no_limit'
                        ? 'সময় ছাড়া'
                        : (isTimeValid && parsedTimeMinutes !== null ? `${getBanglaNumber(parsedTimeMinutes)} মিনিট` : 'সময় দেওয়া হয়নি')}
                    </span>
                  </div>
                </div>

                {/* PRIMARY START ACTION */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeChapter.hasTeacherSets) {
                        setStep('teacher_select');
                      } else {
                        setSetupModalOpen(false);
                      }
                    }}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {activeChapter.hasTeacherSets ? '← শিক্ষক নির্বাচন' : 'বাতিল'}
                  </button>

                  <button
                    type="button"
                    onClick={handleStartTest}
                    disabled={selectedQuestionCount === null || !isTimeValid}
                    className={`flex-1 py-3.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg ${
                      selectedQuestionCount === null || !isTimeValid
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                        : selectedMode === 'exam'
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-slate-950 cursor-pointer'
                          : 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 cursor-pointer'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>
                      {selectedQuestionCount === null
                        ? 'প্রথমে প্রশ্ন সংখ্যা নির্বাচন করুন'
                        : !isTimeValid
                          ? 'সঠিক সময়সীমা লিখুন (১-১৮০ মিনিট)'
                          : selectedMode === 'exam'
                            ? `পরীক্ষা শুরু করুন (${
                                selectedQuestionCount === totalAvailableCount
                                  ? `সব ${getBanglaNumber(totalAvailableCount)}টি প্রশ্ন`
                                  : `${getBanglaNumber(selectedQuestionCount)}টি প্রশ্ন`
                              })`
                            : `অনুশীলন শুরু করুন (${
                                selectedQuestionCount === totalAvailableCount
                                  ? `সব ${getBanglaNumber(totalAvailableCount)}টি প্রশ্ন`
                                  : `${getBanglaNumber(selectedQuestionCount)}টি প্রশ্ন`
                              })`}
                    </span>
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
