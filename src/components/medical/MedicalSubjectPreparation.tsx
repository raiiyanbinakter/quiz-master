import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  Dna, 
  FlaskConical, 
  Atom, 
  Languages, 
  Globe, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search,
  Sparkles,
  CalendarPlus,
  Play,
  RotateCcw,
  Eye,
  Check
} from 'lucide-react';
import { 
  MedicalSubject, 
  QuestionItem 
} from '../../types/questionBank';
import { 
  MEDICAL_PRACTICE_SUBJECTS, 
  INITIAL_MEDICAL_PRACTICE_QUESTIONS,
  getChaptersForSelection, 
  toBanglaNumber,
  MedicalChapterInfo
} from '../../lib/medicalPracticeBank';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface MedicalSubjectPreparationProps {
  onBack: () => void;
  onOpenQuestionBank: (
    subject: MedicalSubject, 
    paper: 'first' | 'second' | 'not_applicable', 
    chapterName: string
  ) => void;
  onAddToRoutine?: (title: string, durationMinutes?: number) => void;
  userData?: any;
}

type ChapterStatus = 'not_started' | 'in_progress' | 'needs_revision' | 'mastered';

export default function MedicalSubjectPreparation({
  onBack,
  onOpenQuestionBank,
  onAddToRoutine,
  userData
}: MedicalSubjectPreparationProps) {
  // Master question list (seeds + Firestore published medical practice questions)
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>(INITIAL_MEDICAL_PRACTICE_QUESTIONS);
  const [loadingFirestore, setLoadingFirestore] = useState(false);

  // Active Subject and Paper Selection
  const [selectedSubject, setSelectedSubject] = useState<MedicalSubject>('physics');
  const [selectedPaper, setSelectedPaper] = useState<'first' | 'second' | 'not_applicable'>('first');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | ChapterStatus>('all');
  const [addedRoutineMap, setAddedRoutineMap] = useState<Record<string, boolean>>({});

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
        console.warn('Could not load Firestore medical practice questions for preparation:', err);
      } finally {
        if (isMounted) setLoadingFirestore(false);
      }
    };

    fetchPublishedFirestoreQuestions();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentSubjectConfig = useMemo(() => {
    return MEDICAL_PRACTICE_SUBJECTS.find(s => s.key === selectedSubject) || MEDICAL_PRACTICE_SUBJECTS[0];
  }, [selectedSubject]);

  // Handle subject change
  const handleSelectSubject = (subjectKey: MedicalSubject) => {
    setSelectedSubject(subjectKey);
    const subConfig = MEDICAL_PRACTICE_SUBJECTS.find(s => s.key === subjectKey);
    if (subConfig?.hasPapers) {
      setSelectedPaper('first');
    } else {
      setSelectedPaper('not_applicable');
    }
    setSearchQuery('');
  };

  // Available Chapters for current Subject & Paper from shared syllabus
  const chapters = useMemo(() => {
    return getChaptersForSelection(selectedSubject, selectedPaper, allQuestions);
  }, [selectedSubject, selectedPaper, allQuestions]);

  // Derive chapter status from real student progress evidence if available
  const getChapterStatus = (chap: MedicalChapterInfo): ChapterStatus => {
    if (!userData) return 'not_started';

    const history = userData.quizHistory || userData.history || [];
    const wrongList = userData.wrongQuestions || [];
    const normChapName = chap.chapterName.toLowerCase().replace(/[\s\p{P}]/gu, '');

    // Check wrong questions
    const hasWrong = wrongList.some((w: any) => {
      const wChap = (w.chapter || w.chapterName || '').toLowerCase().replace(/[\s\p{P}]/gu, '');
      return wChap.includes(normChapName) || normChapName.includes(wChap);
    });

    // Check completed quiz history for this chapter
    const attempts = history.filter((h: any) => {
      const hChap = (h.chapter || h.chapterName || h.quizName || '').toLowerCase().replace(/[\s\p{P}]/gu, '');
      return hChap.includes(normChapName) || normChapName.includes(hChap);
    });

    if (attempts.length > 0) {
      const latest = attempts[attempts.length - 1];
      const accuracy = latest.total > 0 ? (latest.score / latest.total) : 0;
      if (accuracy >= 0.8 && !hasWrong) {
        return 'mastered';
      }
      if (hasWrong || accuracy < 0.6) {
        return 'needs_revision';
      }
      return 'in_progress';
    }

    if (hasWrong) {
      return 'needs_revision';
    }

    return 'not_started';
  };

  // Get real wrong questions count for a chapter if any
  const getChapterWrongQuestionCount = (chap: MedicalChapterInfo): number => {
    if (!userData?.wrongQuestions) return 0;
    const normChapName = chap.chapterName.toLowerCase().replace(/[\s\p{P}]/gu, '');
    return userData.wrongQuestions.filter((w: any) => {
      const wChap = (w.chapter || w.chapterName || '').toLowerCase().replace(/[\s\p{P}]/gu, '');
      return wChap.includes(normChapName) || normChapName.includes(wChap);
    }).length;
  };

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    return chapters.filter(chap => {
      if (searchQuery.trim()) {
        const queryNorm = searchQuery.trim().toLowerCase();
        const nameNorm = chap.chapterName.toLowerCase();
        const numNorm = chap.chapterNumberLabel.toLowerCase();
        if (!nameNorm.includes(queryNorm) && !numNorm.includes(queryNorm)) {
          return false;
        }
      }
      if (statusFilter !== 'all') {
        const st = getChapterStatus(chap);
        if (st !== statusFilter) return false;
      }
      return true;
    });
  }, [chapters, searchQuery, statusFilter, userData]);

  const handleAddChapterToRoutine = (chap: MedicalChapterInfo) => {
    const title = `${currentSubjectConfig.name}${selectedPaper !== 'not_applicable' ? ` (${selectedPaper === 'first' ? '১ম পত্র' : '২য় পত্র'})` : ''} - ${chap.chapterName} রিভিশন`;
    if (onAddToRoutine) {
      onAddToRoutine(title, 25);
      setAddedRoutineMap(prev => ({ ...prev, [chap.chapterId]: true }));
      setTimeout(() => {
        setAddedRoutineMap(prev => ({ ...prev, [chap.chapterId]: false }));
      }, 3000);
    }
  };

  const getSubjectIcon = (subKey: MedicalSubject) => {
    switch (subKey) {
      case 'physics': return Atom;
      case 'chemistry': return FlaskConical;
      case 'biology': return Dna;
      case 'english': return Languages;
      case 'general_knowledge': return Globe;
      default: return BookOpen;
    }
  };

  const renderStatusBadge = (status: ChapterStatus) => {
    switch (status) {
      case 'mastered':
        return (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            আয়ত্তে
          </span>
        );
      case 'in_progress':
        return (
          <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            অনুশীলন চলছে
          </span>
        );
      case 'needs_revision':
        return (
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1">
            <RotateCcw className="w-3 h-3" />
            রিভিশন দরকার
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="bg-slate-800/80 text-slate-400 border border-slate-700/80 px-2.5 py-1 rounded-xl text-[11px] font-medium">
            শুরু হয়নি
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* TOP HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer"
                title="ফিরে যান"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                মেডিকেল প্রস্তুতি
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ৫. বিষয়ভিত্তিক প্রস্তুতি
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              বিষয়, পত্র ও অধ্যায়ভিত্তিক ধারাবাহিক প্রস্তুতি পরিকল্পনা।
            </p>
          </div>
        </div>
      </div>

      {/* 5 MEDICAL SUBJECTS TAB BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {MEDICAL_PRACTICE_SUBJECTS.map((sub) => {
          const Icon = getSubjectIcon(sub.key);
          const isSelected = selectedSubject === sub.key;

          return (
            <button
              key={sub.key}
              onClick={() => handleSelectSubject(sub.key)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-500/50 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${
                  isSelected 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </div>
              <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {sub.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* PAPER SELECTOR (FOR SCIENCE SUBJECTS ONLY) */}
      {currentSubjectConfig.hasPapers && (
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setSelectedPaper('first')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedPaper === 'first'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ১ম পত্র
          </button>
          <button
            onClick={() => setSelectedPaper('second')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedPaper === 'second'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ২য় পত্র
          </button>
        </div>
      )}

      {/* SEARCH AND FILTER TOOLBAR */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="অধ্যায় খুঁজুন..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">অবস্থা:</span>
          {[
            { id: 'all', label: 'সব' },
            { id: 'not_started', label: 'শুরু হয়নি' },
            { id: 'in_progress', label: 'চলছে' },
            { id: 'needs_revision', label: 'রিভিশন' },
            { id: 'mastered', label: 'আয়ত্তে' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === f.id
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* CHAPTERS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            মোট অধ্যায়: <strong className="text-white">{toBanglaNumber(filteredChapters.length)}টি</strong>
          </span>
          {loadingFirestore && (
            <span className="text-cyan-400 animate-pulse">প্রশ্ন যাচাই করা হচ্ছে...</span>
          )}
        </div>

        {filteredChapters.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">কোনো অধ্যায় পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500">অন্য অনুসন্ধান শব্দ বা ফিল্টার ব্যবহার করে দেখুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChapters.map((chap) => {
              const status = getChapterStatus(chap);
              const wrongCount = getChapterWrongQuestionCount(chap);
              const hasPublishedQuestions = chap.publishedQuestionCount > 0;
              const isRoutineAdded = addedRoutineMap[chap.chapterId];

              return (
                <div
                  key={chap.chapterId}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-3xl p-5 md:p-6 transition-all duration-200 flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Header line: Chapter Number & Status Badge */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-xl">
                        {chap.chapterNumberLabel}
                      </span>
                      <div className="flex items-center gap-2">
                        {renderStatusBadge(status)}
                        {hasPublishedQuestions ? (
                          <span className="text-[11px] font-bold text-slate-300 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl">
                            {toBanglaNumber(chap.publishedQuestionCount)}টি প্রশ্ন
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                            প্রশ্ন যুক্ত করা হচ্ছে
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Chapter Name */}
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {chap.chapterName}
                    </h3>
                  </div>

                  {/* Chapter Actions Area */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-3">
                    
                    {/* Primary Action Button */}
                    <button
                      disabled={!hasPublishedQuestions}
                      onClick={() => onOpenQuestionBank(selectedSubject, selectedPaper, chap.chapterName)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                        hasPublishedQuestions
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 cursor-pointer active:scale-[0.98]'
                          : 'bg-slate-800/80 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>প্রস্তুতি শুরু করুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Secondary Actions (Only rendered if real data / questions exist) */}
                    {hasPublishedQuestions && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => onOpenQuestionBank(selectedSubject, selectedPaper, chap.chapterName)}
                          className="flex-1 bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3 text-cyan-400" />
                          <span>অনুশীলন করুন</span>
                        </button>

                        {onAddToRoutine && (
                          <button
                            onClick={() => handleAddChapterToRoutine(chap)}
                            className="bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            title="রিভিশনে যোগ করুন"
                          >
                            {isRoutineAdded ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">যোগ হয়েছে</span>
                              </>
                            ) : (
                              <>
                                <CalendarPlus className="w-3 h-3 text-amber-400" />
                                <span>রিভিশনে যোগ</span>
                              </>
                            )}
                          </button>
                        )}

                        {wrongCount > 0 && (
                          <button
                            onClick={() => onOpenQuestionBank(selectedSubject, selectedPaper, chap.chapterName)}
                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            title={`${toBanglaNumber(wrongCount)}টি ভুল প্রশ্ন রয়েছে`}
                          >
                            <Eye className="w-3 h-3 text-rose-400" />
                            <span>ভুল প্রশ্ন ({toBanglaNumber(wrongCount)})</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
