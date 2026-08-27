import React, { useState, useEffect, useMemo } from 'react';
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
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Check, 
  ChevronRight,
  HelpCircle,
  Award,
  Timer
} from 'lucide-react';
import { Subject, Question } from '../../types';
import { 
  QuestionItem, 
  MedicalSubject, 
  TeacherSourceSet 
} from '../../types/questionBank';
import { 
  MEDICAL_PRACTICE_SUBJECTS, 
  TEACHER_SOURCE_SETS, 
  INITIAL_MEDICAL_PRACTICE_QUESTIONS,
  getChaptersForSelection, 
  getTeacherSetsForChapter, 
  getTopicsForSelectedSets, 
  filterMedicalPracticeQuestions,
  convertToQuizQuestions,
  toBanglaNumber,
  MedicalChapterInfo
} from '../../lib/medicalPracticeBank';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface MedicalQuestionBankProps {
  syllabus?: Subject[];
  onBack: () => void;
  initialSubject?: MedicalSubject;
  initialPaper?: 'first' | 'second' | 'not_applicable';
  initialChapterName?: string;
  initialStep?: Step;
  onStartQuiz?: (subject: Subject, chapterIndex: number, mode?: 'quiz' | 'exam') => void;
  onStartCustomTest?: (questions: Question[], title: string, mode?: 'quiz' | 'exam', timeLimitMinutes?: number | null) => void;
}

type Step = 'subject' | 'paper' | 'chapter' | 'teacher_set' | 'topic' | 'setup';

export default function MedicalQuestionBank({
  syllabus = [],
  onBack,
  initialSubject,
  initialPaper,
  initialChapterName,
  initialStep,
  onStartQuiz,
  onStartCustomTest
}: MedicalQuestionBankProps) {
  // Master question list (seeds + Firestore published medical practice questions)
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>(INITIAL_MEDICAL_PRACTICE_QUESTIONS);
  const [loadingFirestore, setLoadingFirestore] = useState(false);

  // Flow State
  const [currentStep, setCurrentStep] = useState<Step>(initialStep || (initialChapterName ? 'teacher_set' : 'subject'));
  const [selectedSubject, setSelectedSubject] = useState<MedicalSubject>(initialSubject || 'physics');
  const [selectedPaper, setSelectedPaper] = useState<'first' | 'second' | 'not_applicable'>(initialPaper || 'first');
  const [selectedChapter, setSelectedChapter] = useState<MedicalChapterInfo | null>(null);
  
  // Selection State
  const [selectedTeacherSets, setSelectedTeacherSets] = useState<TeacherSourceSet[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  // Setup State
  const [selectedMode, setSelectedMode] = useState<'quiz' | 'exam'>('quiz');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number | 'all'>('all');
  const [practiceTimeOption, setPracticeTimeOption] = useState<'no_limit' | 'custom'>('no_limit');
  const [customTimeMinutes, setCustomTimeMinutes] = useState<string>(''); // No default time!
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync published questions from Firestore if available
  useEffect(() => {
    let isMounted = true;
    const fetchPublishedFirestoreQuestions = async () => {
      try {
        setLoadingFirestore(true);
        const qRef = collection(db, 'questions');
        const qQuery = query(
          qRef,
          where('route', '==', 'medical'),
          where('status', '==', 'published')
        );
        const snap = await getDocs(qQuery);
        if (!isMounted) return;

        const firestoreItems: QuestionItem[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data() as QuestionItem;
          if (data.featureTags?.includes('practice_bank')) {
            firestoreItems.push({
              ...data,
              id: docSnap.id
            });
          }
        });

        if (firestoreItems.length > 0) {
          setAllQuestions(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newItems = firestoreItems.filter(f => !existingIds.has(f.id));
            return [...prev, ...newItems];
          });
        }
      } catch (err) {
        console.warn('Could not load Firestore medical practice questions:', err);
      } finally {
        if (isMounted) setLoadingFirestore(false);
      }
    };

    fetchPublishedFirestoreQuestions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync initial selection if provided
  useEffect(() => {
    if (initialSubject) {
      setSelectedSubject(initialSubject);
    }
    if (initialPaper) {
      setSelectedPaper(initialPaper);
    }
    if (initialChapterName) {
      const chaps = getChaptersForSelection(initialSubject || selectedSubject, initialPaper || selectedPaper, allQuestions);
      const found = chaps.find(c => 
        c.chapterName === initialChapterName || 
        c.chapterName.includes(initialChapterName) || 
        initialChapterName.includes(c.chapterName)
      );
      if (found) {
        setSelectedChapter(found);
        const availableSets = found.availableSourceSets || [];
        setSelectedTeacherSets(availableSets.length > 0 ? availableSets : ['ishak']);
        setSelectedTopics([]);
        setCurrentStep(initialStep || 'teacher_set');
      }
    }
  }, [initialSubject, initialPaper, initialChapterName, initialStep, allQuestions]);

  const currentSubjectConfig = useMemo(() => {
    return MEDICAL_PRACTICE_SUBJECTS.find(s => s.key === selectedSubject) || MEDICAL_PRACTICE_SUBJECTS[0];
  }, [selectedSubject]);

  // Available Chapters for current Subject & Paper
  const availableChapters = useMemo(() => {
    return getChaptersForSelection(selectedSubject, selectedPaper, allQuestions);
  }, [selectedSubject, selectedPaper, allQuestions]);

  // Available Teacher Sets for selected Chapter
  const teacherSets = useMemo(() => {
    if (!selectedChapter) return [];
    return getTeacherSetsForChapter(
      selectedSubject, 
      selectedPaper, 
      selectedChapter.chapterName, 
      allQuestions
    );
  }, [selectedSubject, selectedPaper, selectedChapter, allQuestions]);

  // Available Topics for selected Teacher Sets
  const availableTopics = useMemo(() => {
    if (!selectedChapter || selectedTeacherSets.length === 0) return [];
    return getTopicsForSelectedSets(
      selectedSubject,
      selectedPaper,
      selectedChapter.chapterName,
      selectedTeacherSets,
      allQuestions
    );
  }, [selectedSubject, selectedPaper, selectedChapter, selectedTeacherSets, allQuestions]);

  // Filtered pool of questions based on full selection
  const matchingQuestions = useMemo(() => {
    if (!selectedChapter || selectedTeacherSets.length === 0 || selectedTopics.length === 0) {
      return [];
    }
    return filterMedicalPracticeQuestions(allQuestions, {
      subject: selectedSubject,
      paper: selectedPaper,
      chapterName: selectedChapter.chapterName,
      selectedSourceSets: selectedTeacherSets,
      selectedTopics: selectedTopics
    });
  }, [allQuestions, selectedSubject, selectedPaper, selectedChapter, selectedTeacherSets, selectedTopics]);

  // Automatically adjust selected question count if matching count changes
  useEffect(() => {
    if (typeof selectedQuestionCount === 'number' && selectedQuestionCount > matchingQuestions.length) {
      setSelectedQuestionCount('all');
    }
  }, [matchingQuestions.length, selectedQuestionCount]);

  // Handlers for Navigation
  const handleSelectSubject = (subjectKey: MedicalSubject) => {
    setSelectedSubject(subjectKey);
    const subConfig = MEDICAL_PRACTICE_SUBJECTS.find(s => s.key === subjectKey);
    if (subConfig?.hasPapers) {
      setSelectedPaper('first');
      setCurrentStep('paper');
    } else {
      setSelectedPaper('not_applicable');
      setCurrentStep('chapter');
    }
    setSelectedChapter(null);
    setSelectedTeacherSets([]);
    setSelectedTopics([]);
    setValidationError(null);
  };

  const handleSelectPaper = (paperKey: 'first' | 'second' | 'not_applicable') => {
    setSelectedPaper(paperKey);
    setSelectedChapter(null);
    setSelectedTeacherSets([]);
    setSelectedTopics([]);
    setCurrentStep('chapter');
    setValidationError(null);
  };

  const handleSelectChapter = (chap: MedicalChapterInfo) => {
    if (!chap || chap.publishedQuestionCount <= 0) return;
    setSelectedChapter(chap);
    // Pre-select all available sets for this chapter
    const availableSets = chap.availableSourceSets || [];
    setSelectedTeacherSets(availableSets.length > 0 ? availableSets : ['ishak']);
    setSelectedTopics([]);
    setCurrentStep('teacher_set');
    setValidationError(null);
  };

  const handleToggleTeacherSet = (setId: TeacherSourceSet) => {
    setSelectedTeacherSets(prev => {
      const exists = prev.includes(setId);
      if (exists) {
        return prev.filter(id => id !== setId);
      } else {
        return [...prev, setId];
      }
    });
    // Reset topics when teacher set changes
    setSelectedTopics([]);
  };

  const handleSelectAllTeacherSets = () => {
    const available = teacherSets.filter(t => t.isAvailable).map(t => t.id);
    setSelectedTeacherSets(available);
    setSelectedTopics([]);
  };

  const handleClearAllTeacherSets = () => {
    setSelectedTeacherSets([]);
    setSelectedTopics([]);
  };

  const handleProceedToTopics = () => {
    if (selectedTeacherSets.length === 0) {
      setValidationError('অনুগ্রহ করে অন্তত একটি প্রশ্ন সেট নির্বাচন করুন।');
      return;
    }
    setValidationError(null);
    // Automatically pre-select all available topics
    const topics = getTopicsForSelectedSets(
      selectedSubject,
      selectedPaper,
      selectedChapter?.chapterName || '',
      selectedTeacherSets,
      allQuestions
    );
    setSelectedTopics(topics.map(t => t.topicName));
    setCurrentStep('topic');
  };

  const handleToggleTopic = (topicName: string) => {
    setSelectedTopics(prev => {
      const exists = prev.includes(topicName);
      if (exists) {
        return prev.filter(t => t !== topicName);
      } else {
        return [...prev, topicName];
      }
    });
  };

  const handleSelectAllTopics = () => {
    setSelectedTopics(availableTopics.map(t => t.topicName));
  };

  const handleClearAllTopics = () => {
    setSelectedTopics([]);
  };

  const handleProceedToSetup = () => {
    if (selectedTopics.length === 0) {
      setValidationError('অনুগ্রহ করে অন্তত একটি টপিক নির্বাচন করুন।');
      return;
    }
    setValidationError(null);
    setCurrentStep('setup');
  };

  // Start Practice or Exam
  const handleStartExamOrPractice = () => {
    setValidationError(null);

    if (matchingQuestions.length === 0) {
      setValidationError('নির্বাচিত সেট ও টপিকের জন্য এখনো কোনো প্রকাশিত প্রশ্ন পাওয়া যায়নি।');
      return;
    }

    let timeLimitMinutes: number | null = null;

    if (selectedMode === 'exam') {
      // In Exam Mode, custom total time is required
      const parsedTime = parseInt(customTimeMinutes.trim(), 10);
      if (!customTimeMinutes.trim() || isNaN(parsedTime) || parsedTime <= 0) {
        setValidationError('পরীক্ষা মোডের জন্য মোট সময় (মিনিট) নির্ধারণ করা আবশ্যক।');
        return;
      }
      timeLimitMinutes = parsedTime;
    } else {
      // In Practice Mode
      if (practiceTimeOption === 'custom') {
        const parsedTime = parseInt(customTimeMinutes.trim(), 10);
        if (!customTimeMinutes.trim() || isNaN(parsedTime) || parsedTime <= 0) {
          setValidationError('অনুগ্রহ করে মোট সময় (মিনিট) সঠিকভাবে লিখুন অথবা "সময় ছাড়া অনুশীলন" বেছে নিন।');
          return;
        }
        timeLimitMinutes = parsedTime;
      } else {
        timeLimitMinutes = 0; // Untimed practice
      }
    }

    // Determine final questions slice
    let finalItems = [...matchingQuestions];
    if (typeof selectedQuestionCount === 'number' && selectedQuestionCount > 0) {
      finalItems = finalItems.slice(0, selectedQuestionCount);
    }

    const quizQuestions = convertToQuizQuestions(finalItems);
    const modeLabel = selectedMode === 'exam' ? 'পরীক্ষা' : 'অনুশীলন';
    const paperLabel = currentSubjectConfig.hasPapers ? (selectedPaper === 'first' ? '১ম পত্র' : '২য় পত্র') : '';
    const examTitle = `মেডিকেল ${currentSubjectConfig.name} ${paperLabel} - ${selectedChapter?.chapterName} (${modeLabel})`;

    if (onStartCustomTest) {
      onStartCustomTest(quizQuestions, examTitle, selectedMode, timeLimitMinutes);
    }
  };

  // Render Step 1: Subject Selection
  const renderSubjectStep = () => (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs font-extrabold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          মেডিকেল অনুশীলনী প্রশ্নব্যাংক
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          অনুশীলনের বিষয় বেছে নিন
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          প্রখ্যাত লেখকদের অনুশীলনী প্রশ্নাবলি ও টপিকভিত্তিক প্রশ্ন সমাধান।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2">
        {MEDICAL_PRACTICE_SUBJECTS.map((sub) => {
          const count = filterMedicalPracticeQuestions(allQuestions, { subject: sub.key }).length;
          const isPhysics = sub.key === 'physics';
          const isChemistry = sub.key === 'chemistry';
          const isBiology = sub.key === 'biology';
          const isEnglish = sub.key === 'english';

          const IconComponent = isPhysics ? Atom : isChemistry ? FlaskConical : isBiology ? Dna : isEnglish ? Languages : Globe;
          const colorClasses = isPhysics 
            ? 'text-sky-400 bg-sky-500/10 border-sky-500/20 hover:border-sky-500/50'
            : isChemistry
            ? 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50'
            : isBiology
            ? 'text-teal-400 bg-teal-500/10 border-teal-500/20 hover:border-teal-500/50'
            : isEnglish
            ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/50'
            : 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/50';

          return (
            <button
              key={sub.key}
              onClick={() => handleSelectSubject(sub.key)}
              className="bg-slate-900/90 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 p-6 rounded-3xl text-left transition-all duration-200 shadow-lg hover:shadow-cyan-500/5 group flex flex-col justify-between cursor-pointer min-h-[140px]"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl border ${colorClasses}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                {count > 0 ? (
                  <span className="text-[11px] font-extrabold bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                    {toBanglaNumber(count)}টি প্রশ্ন
                  </span>
                ) : (
                  <span className="text-[11px] font-bold bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
                    প্রশ্ন যুক্ত করা হচ্ছে
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {sub.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {sub.hasPapers ? '১ম ও ২য় পত্র' : 'সম্পূর্ণ সিলেবাস'}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Render Step 2: Paper Selection
  const renderPaperStep = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          {currentSubjectConfig.name}: পত্র নির্বাচন
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          অনুশীলন করার জন্য কাঙ্ক্ষিত পত্র বেছে নিন।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentSubjectConfig.papers.map((paper) => {
          const count = filterMedicalPracticeQuestions(allQuestions, {
            subject: selectedSubject,
            paper: paper.key
          }).length;

          return (
            <button
              key={paper.key}
              onClick={() => handleSelectPaper(paper.key)}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 p-6 rounded-3xl text-left transition-all group cursor-pointer shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-xl">
                  {paper.label}
                </span>
                {count > 0 ? (
                  <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                    {toBanglaNumber(count)}টি প্রশ্ন
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    প্রশ্ন যুক্ত করা হচ্ছে
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                {currentSubjectConfig.name} {paper.label}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                অধ্যায়ভিত্তিক শিক্ষক সেট ও টপিক অনুশীলন
              </p>
            </button>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => setCurrentStep('subject')}
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 mx-auto transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          বিষয় নির্বাচনে ফিরে যান
        </button>
      </div>
    </div>
  );

  // Render Step 3: Chapter Selection
  const renderChapterStep = () => {
    const paperLabel = currentSubjectConfig.hasPapers ? (selectedPaper === 'first' ? '১ম পত্র' : '২য় পত্র') : '';

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider block">
              {currentSubjectConfig.name} {paperLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              অধ্যায় নির্বাচন করুন
            </h2>
          </div>
          <button
            onClick={() => setCurrentStep(currentSubjectConfig.hasPapers ? 'paper' : 'subject')}
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            পূর্ববর্তী
          </button>
        </div>

        {availableChapters.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-base font-extrabold text-white">
              এই অধ্যায়ের প্রশ্নব্যাংক প্রস্তুত হচ্ছে।
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              খুব শীঘ্রই নির্বাচিত বিষয়ের প্রখ্যাত লেখকদের অনুশীলনী প্রশ্ন এখানে সংযুক্ত করা হবে।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {availableChapters.map((chap, idx) => {
              const hasQuestions = chap.publishedQuestionCount > 0;

              return (
                <div
                  key={chap.chapterId || chap.chapterName}
                  className={`bg-slate-900/90 border p-5 rounded-3xl flex items-center justify-between gap-4 transition-all shadow-md ${
                    hasQuestions
                      ? 'border-slate-800 hover:border-slate-700'
                      : 'border-slate-800/60 bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-slate-800 text-cyan-400 px-2 py-0.5 rounded-md border border-slate-700">
                        {chap.chapterNumberLabel || `${toBanglaNumber(idx + 1)} অধ্যায়`}
                      </span>
                      {hasQuestions ? (
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {toBanglaNumber(chap.publishedQuestionCount)}টি প্রশ্ন
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          প্রশ্ন যুক্ত করা হচ্ছে
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-extrabold truncate ${hasQuestions ? 'text-white' : 'text-slate-300'}`}>
                      {chap.chapterName}
                    </h3>
                  </div>

                  {hasQuestions ? (
                    <button
                      onClick={() => handleSelectChapter(chap)}
                      className="bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                    >
                      <span>প্রশ্ন সেট বেছে নিন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled
                      aria-disabled="true"
                      className="bg-slate-800/70 text-slate-500 border border-slate-700/50 text-xs font-bold px-3.5 py-2 rounded-xl shrink-0 cursor-not-allowed opacity-75"
                    >
                      <span>প্রশ্ন যুক্ত করা হচ্ছে</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Render Step 4: Teacher / Source Set Selection (Cards for Ishak, Topon, Pramanik)
  const renderTeacherSetStep = () => {
    const paperLabel = currentSubjectConfig.hasPapers ? (selectedPaper === 'first' ? '১ম পত্র' : '২য় পত্র') : '';

    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-cyan-400">
              {currentSubjectConfig.name} {paperLabel} → {selectedChapter?.chapterName}
            </span>
            <button
              onClick={() => setCurrentStep('chapter')}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              অধ্যায় পরিবর্তন
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            প্রশ্ন সেট বেছে নিন
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            এক বা একাধিক শিক্ষক সেট নির্বাচন করে অনুশীলন করুন।
          </p>
        </div>

        {/* Quick Selection Buttons */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <button
            onClick={handleSelectAllTeacherSets}
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold px-4 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            সব সেট নির্বাচন করুন
          </button>
          <button
            onClick={handleClearAllTeacherSets}
            className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-300 font-bold px-4 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            সব নির্বাচন বাতিল করুন
          </button>
        </div>

        {/* Teacher Cards */}
        <div className={`grid grid-cols-1 ${teacherSets.length === 1 ? 'sm:grid-cols-1 max-w-md mx-auto w-full' : teacherSets.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-4`}>
          {teacherSets.map((tSet) => {
            const isSelected = selectedTeacherSets.includes(tSet.id);
            const isDisabled = !tSet.isAvailable;

            return (
              <div
                key={tSet.id}
                onClick={() => !isDisabled && handleToggleTeacherSet(tSet.id)}
                className={`p-5 rounded-3xl border transition-all select-none ${
                  isDisabled
                    ? 'bg-slate-950/50 border-slate-900 opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-cyan-950/20 border-cyan-500/60 shadow-lg shadow-cyan-500/10 cursor-pointer'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                        : 'border-slate-700 bg-slate-950'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      isDisabled
                        ? 'bg-slate-900 text-slate-500 border-slate-800'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    {toBanglaNumber(tSet.questionCount)}টি প্রশ্ন
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className={`text-base font-extrabold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {tSet.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {isDisabled ? 'এই সেটের প্রশ্ন প্রস্তুত হচ্ছে' : 'অনুশীলনী মূল প্রশ্নাবলি'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {validationError && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold p-3.5 rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStep('chapter')}
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl cursor-pointer"
          >
            পূর্ববর্তী
          </button>
          <button
            onClick={handleProceedToTopics}
            disabled={selectedTeacherSets.length === 0}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-extrabold text-xs px-6 py-3 rounded-2xl transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>পরবর্তী: টপিক নির্বাচন</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Render Step 5: Topic Selection
  const renderTopicStep = () => {
    const selectedSetLabels = selectedTeacherSets
      .map(id => TEACHER_SOURCE_SETS.find(t => t.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-cyan-400">
              নির্বাচিত সেট: {selectedSetLabels}
            </span>
            <button
              onClick={() => setCurrentStep('teacher_set')}
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              সেট পরিবর্তন
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            টপিক বেছে নিন
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            নির্বাচিত শিক্ষক সেটের অন্তর্ভুক্ত টপিকসমূহ:
          </p>
        </div>

        {/* Quick Selection Buttons */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <button
            onClick={handleSelectAllTopics}
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold px-4 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            সব টপিক নির্বাচন করুন
          </button>
          <button
            onClick={handleClearAllTopics}
            className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-300 font-bold px-4 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            সব টপিক বাতিল করুন
          </button>
        </div>

        {/* Topics List */}
        <div className="space-y-2.5">
          {availableTopics.map((top) => {
            const isSelected = selectedTopics.includes(top.topicName);

            return (
              <div
                key={top.topicName}
                onClick={() => handleToggleTopic(top.topicName)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                  isSelected
                    ? 'bg-cyan-950/20 border-cyan-500/60 shadow-sm'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                        : 'border-slate-700 bg-slate-950'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-sm font-extrabold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {top.topicName}
                  </span>
                </div>

                <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg">
                  {toBanglaNumber(top.questionCount)}টি প্রশ্ন
                </span>
              </div>
            );
          })}
        </div>

        {validationError && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold p-3.5 rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStep('teacher_set')}
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl cursor-pointer"
          >
            পূর্ববর্তী
          </button>
          <button
            onClick={handleProceedToSetup}
            disabled={selectedTopics.length === 0}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-extrabold text-xs px-6 py-3 rounded-2xl transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>পরবর্তী: কাস্টম সেটআপ</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Render Step 6: Question Setup (Count + Mode + Custom Total Time)
  const renderSetupStep = () => {
    const totalMatching = matchingQuestions.length;

    // Available question count options (strictly capping by totalMatching)
    const countOptions: Array<{ label: string; value: number | 'all' }> = [];
    if (totalMatching >= 10) countOptions.push({ label: '১০টি প্রশ্ন', value: 10 });
    if (totalMatching >= 20) countOptions.push({ label: '২০টি প্রশ্ন', value: 20 });
    if (totalMatching >= 30) countOptions.push({ label: '৩০টি প্রশ্ন', value: 30 });
    if (totalMatching >= 50) countOptions.push({ label: '৫০টি প্রশ্ন', value: 50 });
    countOptions.push({ label: `সব ${toBanglaNumber(totalMatching)}টি প্রশ্ন`, value: 'all' });

    return (
      <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg space-y-2 text-center">
          <span className="text-xs font-extrabold text-cyan-400">
            {selectedChapter?.chapterName}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            অনুশীলন বা পরীক্ষা সেটআপ
          </h2>
          <p className="text-xs text-slate-400">
            মোট নির্বাচিত প্রশ্ন: <strong className="text-emerald-400 font-extrabold">{toBanglaNumber(totalMatching)}টি</strong>
          </p>
        </div>

        {/* 1. Mode Selector */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-3">
          <label className="text-xs font-extrabold text-slate-300 block">
            ১. মোড নির্বাচন করুন
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedMode('quiz')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedMode === 'quiz'
                  ? 'bg-cyan-500/10 border-cyan-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-extrabold text-sm text-cyan-400">
                <HelpCircle className="w-4 h-4" />
                অনুশীলন মোড
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                প্রতিটি প্রশ্নের সাথে সাথে উত্তর ও বিস্তারিত ব্যাখ্যা দেখা যাবে।
              </p>
            </button>

            <button
              onClick={() => setSelectedMode('exam')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedMode === 'exam'
                  ? 'bg-emerald-500/10 border-emerald-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-extrabold text-sm text-emerald-400">
                <Timer className="w-4 h-4" />
                পরীক্ষা মোড
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                একক কাউন্টডাউন, লকড উত্তর এবং পরীক্ষা শেষে ফলাফল ও ব্যাখ্যা।
              </p>
            </button>
          </div>
        </div>

        {/* 2. Question Count Selector */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-3">
          <label className="text-xs font-extrabold text-slate-300 block">
            ২. প্রশ্নের সংখ্যা নির্ধারণ করুন
          </label>
          <div className="flex flex-wrap gap-2">
            {countOptions.map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setSelectedQuestionCount(opt.value)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  selectedQuestionCount === opt.value
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Custom Time Setup (NO default time shown!) */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-3">
          <label className="text-xs font-extrabold text-slate-300 block">
            ৩. মোট সময় নির্ধারণ করুন
          </label>

          {selectedMode === 'quiz' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPracticeTimeOption('no_limit')}
                  className={`p-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    practiceTimeOption === 'no_limit'
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  সময় ছাড়া অনুশীলন (আনলিমিটেড)
                </button>
                <button
                  onClick={() => setPracticeTimeOption('custom')}
                  className={`p-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    practiceTimeOption === 'custom'
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  মোট সময় নির্ধারণ করুন
                </button>
              </div>

              {practiceTimeOption === 'custom' && (
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={customTimeMinutes}
                    onChange={(e) => setCustomTimeMinutes(e.target.value)}
                    placeholder="মিনিট লিখুন (যেমন: ২০)"
                    className="bg-transparent text-white text-xs font-bold w-full focus:outline-none placeholder:text-slate-600"
                  />
                  <span className="text-xs text-slate-400 font-bold shrink-0">মিনিট</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-amber-300/90 font-medium">
                * পরীক্ষা মোডে সম্পূর্ণ পরীক্ষার জন্য একটি সামগ্রিক কাউন্টডাউন টাইমার নির্ধারিত হবে।
              </p>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-3.5 rounded-2xl focus-within:border-emerald-500/60 transition-colors">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customTimeMinutes}
                  onChange={(e) => setCustomTimeMinutes(e.target.value)}
                  placeholder="সম্পূর্ণ পরীক্ষার মোট সময় লিখুন (মিনিট)"
                  className="bg-transparent text-white text-xs font-bold w-full focus:outline-none placeholder:text-slate-600"
                />
                <span className="text-xs text-slate-400 font-bold shrink-0">মিনিট</span>
              </div>
            </div>
          )}
        </div>

        {validationError && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold p-3.5 rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStep('topic')}
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl cursor-pointer"
          >
            পূর্ববর্তী
          </button>
          <button
            onClick={handleStartExamOrPractice}
            disabled={totalMatching === 0}
            className={`font-extrabold text-xs px-8 py-3.5 rounded-2xl transition-all shadow-xl flex items-center gap-2 cursor-pointer ${
              selectedMode === 'exam'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{selectedMode === 'exam' ? 'পরীক্ষা শুরু করুন' : 'অনুশীলন শুরু করুন'}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header Breadcrumb */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-extrabold text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মেডিকেল ড্যাশবোর্ড</span>
        </button>

        {loadingFirestore && (
          <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full font-bold">
            প্রশ্ন সিঙ্ক হচ্ছে...
          </span>
        )}
      </div>

      {/* Main Content Router */}
      <main className="max-w-4xl mx-auto">
        {currentStep === 'subject' && renderSubjectStep()}
        {currentStep === 'paper' && renderPaperStep()}
        {currentStep === 'chapter' && renderChapterStep()}
        {currentStep === 'teacher_set' && renderTeacherSetStep()}
        {currentStep === 'topic' && renderTopicStep()}
        {currentStep === 'setup' && renderSetupStep()}
      </main>
    </div>
  );
}
