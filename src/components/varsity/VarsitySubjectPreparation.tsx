import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  GraduationCap, 
  Search, 
  ChevronRight, 
  Play, 
  FileText, 
  AlertCircle,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Languages,
  Binary,
  RotateCcw,
  CheckSquare,
  Square,
  Check,
  X,
  Timer,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { 
  VARSITY_SUBJECT_PREPARATION_SUBJECTS, 
  VarsitySubjectConfig,
  VarsitySubjectKey, 
  VarsityChapterInfo,
  getVarsityChaptersForSubject,
  toBanglaNumber 
} from '../../lib/varsityPracticeBank';
import { getLocalVarsityQuestions } from '../../lib/varsitySeedQuestions';
import { Question } from '../../types';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface VarsitySubjectPreparationProps {
  onBack: () => void;
  onStartQuiz: (options: {
    mode: 'quiz' | 'exam';
    questions: Question[];
    title: string;
    timeMinutes?: number;
  }) => void;
  initialSubject?: VarsitySubjectKey;
  initialPaper?: 'first' | 'second' | 'not_applicable';
}

interface ChapterTopicItem {
  id: string;
  name: string;
  count: number;
}

export default function VarsitySubjectPreparation({
  onBack,
  onStartQuiz,
  initialSubject = 'physics',
  initialPaper = 'first'
}: VarsitySubjectPreparationProps) {
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<VarsitySubjectKey>(initialSubject);
  const [selectedPaper, setSelectedPaper] = useState<'first' | 'second' | 'not_applicable'>(initialPaper);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Exam Setup Modal State
  const [setupModalChapter, setSetupModalChapter] = useState<VarsityChapterInfo | null>(null);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [setupMode, setSetupMode] = useState<'quiz' | 'exam'>('exam');
  const [selectedCountOption, setSelectedCountOption] = useState<number | 'all'>('all');
  const [practiceTimeOption, setPracticeTimeOption] = useState<'no_limit' | 'custom'>('no_limit');
  const [timeInput, setTimeInput] = useState<string>('20');
  const [timeError, setTimeError] = useState<string>('');

  // Firestore questions cache for varsity route
  const [firestoreQuestions, setFirestoreQuestions] = useState<Question[]>([]);
  const [loadingFirestore, setLoadingFirestore] = useState(false);

  // Fetch Firestore questions strictly for route == 'varsity'
  useEffect(() => {
    let isMounted = true;
    const fetchVarsityQuestions = async () => {
      if (!db) return;
      try {
        setLoadingFirestore(true);
        const qRef = collection(db, 'questions');
        const qQuery = query(qRef, where('route', '==', 'varsity'));
        const snap = await getDocs(qQuery);
        if (isMounted) {
          const list: Question[] = [];
          snap.forEach((doc) => {
            const d = doc.data();
            list.push({ id: doc.id, ...d } as unknown as Question);
          });
          setFirestoreQuestions(list);
        }
      } catch (err) {
        console.warn('Varsity Firestore fetch notice (offline or empty):', err);
      } finally {
        if (isMounted) setLoadingFirestore(false);
      }
    };

    fetchVarsityQuestions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Active Subject Config from exactly the 7 subjects
  const currentSubjectConfig: VarsitySubjectConfig = useMemo(() => {
    return (
      VARSITY_SUBJECT_PREPARATION_SUBJECTS.find((s) => s.key === selectedSubjectKey) ||
      VARSITY_SUBJECT_PREPARATION_SUBJECTS[0]
    );
  }, [selectedSubjectKey]);

  // Adjust paper when subject changes based on paper rules
  const handleSelectSubject = (subjectKey: VarsitySubjectKey) => {
    setSelectedSubjectKey(subjectKey);
    const subConf = VARSITY_SUBJECT_PREPARATION_SUBJECTS.find((s) => s.key === subjectKey);
    if (!subConf) return;

    if (subConf.hasPapers) {
      // Physics, Chemistry, Biology, Higher Math default to 1st paper
      setSelectedPaper('first');
    } else if (subConf.fixedPaper) {
      setSelectedPaper(subConf.fixedPaper);
    } else {
      setSelectedPaper('not_applicable');
    }
  };

  // Combine static verified local questions with Firestore data
  const combinedVarsityQuestions = useMemo(() => {
    const staticQuestions = getLocalVarsityQuestions();
    return [...staticQuestions, ...firestoreQuestions];
  }, [firestoreQuestions]);

  // Get chapter list for the active subject and paper
  const chapters: VarsityChapterInfo[] = useMemo(() => {
    return getVarsityChaptersForSubject(
      selectedSubjectKey,
      selectedPaper,
      combinedVarsityQuestions
    );
  }, [selectedSubjectKey, selectedPaper, combinedVarsityQuestions]);

  // Filtered chapters by search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters;
    const q = searchQuery.toLowerCase();
    return chapters.filter(
      (c) =>
        c.chapterName.toLowerCase().includes(q) ||
        c.chapterNumberLabel.toLowerCase().includes(q) ||
        c.topics.some((t) => t.toLowerCase().includes(q))
    );
  }, [chapters, searchQuery]);

  // Total questions count for currently displayed chapters
  const totalSubjectPaperQuestions = useMemo(() => {
    return chapters.reduce((sum, ch) => sum + ch.publishedQuestionCount, 0);
  }, [chapters]);

  // Extract structured topic breakdown from active chapter's questions
  const activeChapterTopics: ChapterTopicItem[] = useMemo(() => {
    if (!setupModalChapter || !setupModalChapter.questions || setupModalChapter.questions.length === 0) {
      return [];
    }

    const map = new Map<string, { id: string; name: string; count: number }>();

    setupModalChapter.questions.forEach((q) => {
      const tId = q.topicId || (q as any).topic_id;
      const tName = q.topicName || q.topic || 'সাধারণ টপিক';
      const key = tId ? tId : tName;

      if (!map.has(key)) {
        map.set(key, {
          id: tId || `top_${map.size + 1}`,
          name: tName,
          count: 0
        });
      }
      map.get(key)!.count += 1;
    });

    const list = Array.from(map.values());
    if (list.length > 0) return list;

    // Fallback if questions don't have topic tags yet
    if (setupModalChapter.topics && setupModalChapter.topics.length > 0) {
      return setupModalChapter.topics.map((t, idx) => ({
        id: `T-0${idx + 1}`,
        name: t,
        count: Math.ceil(setupModalChapter.questions!.length / setupModalChapter.topics.length)
      }));
    }

    return [{
      id: 'T-01',
      name: setupModalChapter.chapterName,
      count: setupModalChapter.questions.length
    }];
  }, [setupModalChapter]);

  // Open the setup modal for a chapter
  const handleOpenSetupModal = (chapter: VarsityChapterInfo, defaultMode: 'quiz' | 'exam' = 'exam') => {
    if (chapter.publishedQuestionCount === 0 || !chapter.questions || chapter.questions.length === 0) {
      return;
    }
    setSetupModalChapter(chapter);
    setSetupMode(defaultMode);
    setSelectedCountOption('all');
    setTimeInput(defaultMode === 'exam' ? '20' : '20');
    setPracticeTimeOption('no_limit');
    setTimeError('');

    // Pre-select all topics by default
    const topics = getTopicsForChapter(chapter);
    setSelectedTopicIds(topics.map((t) => t.id));
  };

  const getTopicsForChapter = (chapter: VarsityChapterInfo): ChapterTopicItem[] => {
    if (!chapter.questions || chapter.questions.length === 0) return [];
    const map = new Map<string, { id: string; name: string; count: number }>();
    chapter.questions.forEach((q) => {
      const tId = q.topicId || (q as any).topic_id;
      const tName = q.topicName || q.topic || 'সাধারণ টপিক';
      const key = tId ? tId : tName;
      if (!map.has(key)) {
        map.set(key, {
          id: tId || `top_${map.size + 1}`,
          name: tName,
          count: 0
        });
      }
      map.get(key)!.count += 1;
    });
    return Array.from(map.values());
  };

  // Toggle individual topic in setup modal
  const handleToggleTopic = (topicId: string) => {
    if (selectedTopicIds.includes(topicId)) {
      if (selectedTopicIds.length === 1) return; // Keep at least one selected
      setSelectedTopicIds(selectedTopicIds.filter((id) => id !== topicId));
    } else {
      setSelectedTopicIds([...selectedTopicIds, topicId]);
    }
  };

  // Toggle all topics
  const handleToggleAllTopics = () => {
    if (selectedTopicIds.length === activeChapterTopics.length) {
      // Select first only
      if (activeChapterTopics.length > 0) {
        setSelectedTopicIds([activeChapterTopics[0].id]);
      }
    } else {
      setSelectedTopicIds(activeChapterTopics.map((t) => t.id));
    }
  };

  // Compute total questions for selected topics
  const totalAvailableForSelectedTopics = useMemo(() => {
    if (!setupModalChapter || !setupModalChapter.questions) return 0;
    return activeChapterTopics
      .filter((t) => selectedTopicIds.includes(t.id))
      .reduce((sum, t) => sum + t.count, 0);
  }, [setupModalChapter, activeChapterTopics, selectedTopicIds]);

  // Allowed Question Count Options (never exceed totalAvailableForSelectedTopics)
  const allowedCountOptions = useMemo(() => {
    const total = totalAvailableForSelectedTopics;
    if (total <= 0) return [];
    
    const standardLimits = [10, 20, 30, 50];
    const filtered = standardLimits.filter(limit => limit < total);
    
    return [...filtered, 'all' as const];
  }, [totalAvailableForSelectedTopics]);

  // Effective question count to take
  const effectiveQuestionCount = useMemo(() => {
    if (totalAvailableForSelectedTopics === 0) return 0;
    if (selectedCountOption === 'all') return totalAvailableForSelectedTopics;
    return Math.min(selectedCountOption, totalAvailableForSelectedTopics);
  }, [selectedCountOption, totalAvailableForSelectedTopics]);

  // Time validation
  const parsedTime = parseInt(timeInput.trim(), 10);
  const isTimeNumber = !isNaN(parsedTime) && String(parsedTime) === timeInput.trim();
  const isTimeValid = setupMode === 'quiz' && practiceTimeOption === 'no_limit' 
    ? true 
    : isTimeNumber && parsedTime >= 1 && parsedTime <= 180;

  const handleTimeChange = (val: string) => {
    setTimeInput(val);
    const num = parseInt(val.trim(), 10);
    if (!val.trim()) {
      setTimeError('সময় লিখুন (কমপক্ষে ১ মিনিট)');
    } else if (isNaN(num) || num <= 0) {
      setTimeError('সময় কমপক্ষে ১ মিনিট হতে হবে');
    } else if (num > 180) {
      setTimeError('সময় সর্বোচ্চ ১৮০ মিনিট হতে পারে');
    } else {
      setTimeError('');
    }
  };

  // Launch the exam/quiz from setup modal
  const handleStartExamFromModal = () => {
    if (!setupModalChapter || !setupModalChapter.questions || totalAvailableForSelectedTopics === 0) {
      return;
    }

    if (!isTimeValid) {
      setTimeError('অনুগ্রহ করে ১ থেকে ১৮০ মিনিটের মধ্যে বৈধ সময় লিখুন');
      return;
    }

    // Filter questions by selected topics
    const selectedTopicsList = activeChapterTopics.filter((t) => selectedTopicIds.includes(t.id));
    const selectedTopicNames = selectedTopicsList.map((t) => t.name);

    const pool = setupModalChapter.questions.filter((q) => {
      const tId = q.topicId || (q as any).topic_id;
      const tName = q.topicName || q.topic;
      return (
        (tId && selectedTopicIds.includes(tId)) ||
        (tName && selectedTopicNames.includes(tName))
      );
    });

    const finalQuestions = pool.slice(0, effectiveQuestionCount);

    const paperName = currentSubjectConfig.hasPapers
      ? selectedPaper === 'first' ? '১ম পত্র' : '২য় পত্র'
      : '';
    
    const timeLimitMinutes = setupMode === 'exam' 
      ? parsedTime 
      : practiceTimeOption === 'custom' ? parsedTime : undefined;

    const title = `${currentSubjectConfig.name} ${paperName} • ${setupModalChapter.chapterName} (${toBanglaNumber(finalQuestions.length)}টি প্রশ্ন)`;

    onStartQuiz({
      mode: setupMode,
      questions: finalQuestions,
      title,
      timeMinutes: timeLimitMinutes
    });

    setSetupModalChapter(null);
  };

  const getSubjectIcon = (subKey: string) => {
    switch (subKey) {
      case 'physics': return <Atom className="w-5 h-5" />;
      case 'chemistry': return <FlaskConical className="w-5 h-5" />;
      case 'higher_math': return <Calculator className="w-5 h-5" />;
      case 'biology': return <Dna className="w-5 h-5" />;
      case 'bangla_first':
      case 'bangla_second': return <Languages className="w-5 h-5" />;
      case 'ict': return <Binary className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
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
              <Layers className="w-4 h-4" />
              <span>মডিউল ৩ • বিষয়ভিত্তিক প্রস্তুতি</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              ৩. বিষয়ভিত্তিক প্রস্তুতি
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              বিষয়, পত্র ও অধ্যায়ভিত্তিক ধারাবাহিক ভর্তি প্রস্তুতি ও কাস্টম পরীক্ষা।
            </p>
          </div>
        </div>
      </div>

      {/* 7 EXACT SUBJECT TABS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-extrabold">১</span>
            <span>বিষয় নির্বাচন করুন</span>
          </h2>
          <span className="text-xs text-slate-400">
            ৭টি নির্ধারিত বিষয়
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {VARSITY_SUBJECT_PREPARATION_SUBJECTS.map((sub) => {
            const isSelected = selectedSubjectKey === sub.key;
            return (
              <button
                key={sub.key}
                onClick={() => handleSelectSubject(sub.key)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${sub.bgLight} ${sub.borderColor} ring-1 ring-cyan-500/40 text-white shadow-lg shadow-cyan-500/10`
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${sub.bgLight} ${sub.color}`}>
                    {getSubjectIcon(sub.key)}
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  )}
                </div>
                <div className="mt-3">
                  <div className="text-xs sm:text-sm font-bold truncate">
                    {sub.name}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {sub.hasPapers ? '২টি পত্র' : '১টি পত্র'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PAPER SELECTOR (Only when applicable) */}
      {currentSubjectConfig.hasPapers && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-extrabold">২</span>
              <span>পত্র নির্বাচন করুন</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSelectedPaper('first')}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                selectedPaper === 'first'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>১ম পত্র (First Paper)</span>
            </button>

            <button
              onClick={() => setSelectedPaper('second')}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                selectedPaper === 'second'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>২য় পত্র (Second Paper)</span>
            </button>
          </div>
        </div>
      )}

      {/* CHAPTER LIST & CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        {/* Search and Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{currentSubjectConfig.name}</span>
              {currentSubjectConfig.hasPapers && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {selectedPaper === 'first' ? '১ম পত্র' : '২য় পত্র'}
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              মোট অধ্যায়: {toBanglaNumber(chapters.length)}টি • উপলব্ধ প্রশ্ন: {toBanglaNumber(totalSubjectPaperQuestions)}টি
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="অধ্যায় বা টপিক খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Chapters Grid */}
        {filteredChapters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChapters.map((chapter) => {
              const hasQuestions = chapter.publishedQuestionCount > 0;
              return (
                <div
                  key={chapter.chapterId}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    hasQuestions
                      ? 'bg-slate-950/60 border-slate-800/80 hover:border-cyan-500/50 shadow-md'
                      : 'bg-slate-950/30 border-slate-800/40 opacity-80'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                        {chapter.chapterNumberLabel}
                      </span>
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        hasQuestions 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {hasQuestions ? `${toBanglaNumber(chapter.publishedQuestionCount)}টি প্রশ্ন` : 'আসছে'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white">
                        {chapter.chapterName}
                      </h4>
                      {chapter.topics && chapter.topics.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {chapter.topics.slice(0, 4).map((topic, tidx) => (
                            <span
                              key={tidx}
                              className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md"
                            >
                              {topic}
                            </span>
                          ))}
                          {chapter.topics.length > 4 && (
                            <span className="text-[10px] text-slate-500 self-center">
                              +{chapter.topics.length - 4}টি টপিক
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    {hasQuestions ? (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <button
                          onClick={() => handleOpenSetupModal(chapter, 'quiz')}
                          className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>প্র্যাকটিস সেটআপ</span>
                        </button>
                        <button
                          onClick={() => handleOpenSetupModal(chapter, 'exam')}
                          className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>পরীক্ষা শুরু</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-amber-400/90 py-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>এই বিষয়ের প্রস্তুতি শিগগিরই আসছে।</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
            <h4 className="text-base font-bold text-white">
              এই বিষয়ের প্রস্তুতি শিগগিরই আসছে।
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              নির্বাচিত বিষয় ও পত্রের বিস্তারিত অধ্যায় এবং যাচাইকৃত ভর্তি প্রশ্নসমূহ দ্রুত যুক্ত করা হচ্ছে।
            </p>
          </div>
        )}
      </div>

      {/* REUSABLE EXAM / PRACTICE SETUP MODAL FOR MODULE 3 CHAPTERS */}
      {setupModalChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 text-slate-100 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                    {setupModalChapter.chapterNumberLabel}
                  </span>
                  <span className="text-xs text-slate-400">
                    {currentSubjectConfig.name} {currentSubjectConfig.hasPapers ? (selectedPaper === 'first' ? '১ম পত্র' : '২য় পত্র') : ''}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  {setupModalChapter.chapterName}
                </h3>
              </div>

              <button
                onClick={() => setSetupModalChapter(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: TOPIC SELECTION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>১. টপিক নির্বাচন করুন ({activeChapterTopics.length}টি টপিক)</span>
                </label>
                <button
                  type="button"
                  onClick={handleToggleAllTopics}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
                >
                  {selectedTopicIds.length === activeChapterTopics.length ? 'পছন্দ বাতিল করুন' : 'সব টপিক সিলেক্ট'}
                </button>
              </div>

              <div className="space-y-2">
                {activeChapterTopics.map((topic) => {
                  const isChecked = selectedTopicIds.includes(topic.id);
                  return (
                    <div
                      key={topic.id}
                      onClick={() => handleToggleTopic(topic.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-slate-950 border-cyan-500/60 text-white shadow-sm'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <span className="text-xs font-bold truncate">
                          {topic.id}: {topic.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg shrink-0 ${
                        isChecked ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {toBanglaNumber(topic.count)}টি প্রশ্ন
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                {toBanglaNumber(selectedTopicIds.length)}টি টপিক নির্বাচিত • মোট উত্তরযোগ্য প্রশ্ন: <strong className="text-emerald-400 font-extrabold">{toBanglaNumber(totalAvailableForSelectedTopics)}টি</strong>
              </p>
            </div>

            {/* STEP 2: MODE SELECTION */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-extrabold text-slate-300 block uppercase tracking-wider">
                ২. মোড নির্বাচন করুন
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSetupMode('quiz')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    setupMode === 'quiz'
                      ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-extrabold text-xs text-cyan-400">
                    <HelpCircle className="w-4 h-4" />
                    অনুশীলন মোড
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    প্রতিটি প্রশ্নের সাথে সাথে উত্তর ও বিস্তারিত সমাধান।
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSetupMode('exam')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    setupMode === 'exam'
                      ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-extrabold text-xs text-emerald-400">
                    <Timer className="w-4 h-4" />
                    পরীক্ষা মোড
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    কাউন্টডাউন টাইমার, একক সাবমিট এবং ফলাফল অ্যানালিটিক্স।
                  </p>
                </button>
              </div>
            </div>

            {/* STEP 3: QUESTION COUNT SELECTOR */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-extrabold text-slate-300 block uppercase tracking-wider">
                ৩. প্রশ্ন সংখ্যা নির্ধারণ করুন
              </label>
              <div className="flex flex-wrap gap-2">
                {allowedCountOptions.map((opt) => {
                  const isSelected = selectedCountOption === opt;
                  const label = opt === 'all' ? `সব ${toBanglaNumber(totalAvailableForSelectedTopics)}টি প্রশ্ন` : `${toBanglaNumber(opt)}টি`;
                  return (
                    <button
                      key={String(opt)}
                      type="button"
                      onClick={() => setSelectedCountOption(opt)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-black'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: TIME LIMIT CONFIGURATION */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-extrabold text-slate-300 block uppercase tracking-wider">
                ৪. মোট সময় নির্ধারণ করুন
              </label>

              {setupMode === 'quiz' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
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
                      type="button"
                      onClick={() => setPracticeTimeOption('custom')}
                      className={`p-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                        practiceTimeOption === 'custom'
                          ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      কাস্টম সময় নির্ধারণ
                    </button>
                  </div>

                  {practiceTimeOption === 'custom' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="1"
                          max="180"
                          value={timeInput}
                          onChange={(e) => handleTimeChange(e.target.value)}
                          placeholder="মিনিট লিখুন"
                          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 w-36 focus:outline-none focus:border-cyan-500 font-mono font-bold"
                        />
                        <span className="text-xs text-slate-400 font-bold">মিনিট (১ - ১৮০ মিনিট)</span>
                      </div>
                      {timeError && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 font-bold">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{timeError}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {[10, 15, 20, 30, 45].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => handleTimeChange(String(mins))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          timeInput === String(mins)
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {toBanglaNumber(mins)} মিনিট
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="180"
                      value={timeInput}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      placeholder="কাস্টম সময় (মিনিট)"
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 w-44 focus:outline-none focus:border-emerald-500 font-mono font-bold"
                    />
                    <span className="text-xs text-slate-400 font-bold">মিনিট</span>
                  </div>

                  {timeError && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{timeError}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* MODAL ACTIONS */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSetupModalChapter(null)}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={handleStartExamFromModal}
                disabled={totalAvailableForSelectedTopics === 0 || !isTimeValid}
                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{setupMode === 'exam' ? 'পরীক্ষা শুরু করুন' : 'অনুশীলন শুরু করুন'}</span>
                <span className="text-[11px] font-normal opacity-90">({toBanglaNumber(effectiveQuestionCount)}টি প্রশ্ন)</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
