import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  X, 
  GraduationCap, 
  Home, 
  ChevronRight, 
  UserCheck, 
  Sparkles,
  AlertCircle,
  Check,
  Filter
} from 'lucide-react';
import { Subject, Question } from '../types';
import AcademicExamSetupModal from './AcademicExamSetupModal';
import {
  TeacherSourceSet,
  TeacherSourceSetLabel,
  QuestionItem
} from '../types/questionBank';
import {
  ACADEMIC_TEACHER_SOURCE_SETS,
  CANONICAL_TOPICS_BY_CHAPTER,
  buildAcademicPhysicsSeedQuestions,
  getAcademicTeacherSetCounts,
  getAcademicCanonicalTopicsWithCounts,
  createAcademicMixedPracticePool,
  AcademicCanonicalTopicCard,
  toBanglaNumber
} from '../lib/academicPracticeBank';
import { fetchQuestions } from '../lib/questionBankFirestore';
import { findAcademicChapter } from '../data/academicSyllabusConfig';

export const MATH1_CHAP9_TOPICS = [
  "১. লিমিটের অস্তিত্ব, বিচ্ছিন্নতা ও অবিচ্ছিন্নতা",
  "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
  "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
  "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
  "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
  "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
  "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
  "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
  "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
  "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
  "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
  "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান"
];

// Deprecated alias for backwards compatibility with tests
export const DEFAULT_ACADEMIC_12_TOPICS = MATH1_CHAP9_TOPICS;

interface TopicListProps {
  subject: Subject;
  chapterIndex: number;
  questions: Question[];
  onBack: () => void;
  onGoHome: () => void;
  onSelectTopic: (
    topic: string | null,
    mode: 'quiz' | 'exam',
    questionCount?: number,
    timeMinutes?: number,
    customQuestions?: Question[]
  ) => void;
}

export default function TopicList({
  subject,
  chapterIndex,
  questions,
  onBack,
  onGoHome,
  onSelectTopic
}: TopicListProps) {
  const chapterName = subject.chapters[chapterIndex] || `অধ্যায় ${chapterIndex + 1}`;

  // Topic matching helper
  const normalizeTopicStr = (str: string) => str.replace(/^[০-৯0-9]+\.\s*/, '').trim();

  // Determine if this is an Academic Physics / Teacher Set supported chapter
  const isAcademicPhysics = useMemo(() => {
    const sId = (subject.id || '').toLowerCase();
    const sName = (subject.name || '').toLowerCase();
    return sId.includes('phy') || sName.includes('পদার্থ') || sName.includes('physics');
  }, [subject.id, subject.name]);

  // Academic Bank Questions state (Seed + Firestore)
  const [academicBankQuestions, setAcademicBankQuestions] = useState<QuestionItem[]>(() => {
    return buildAcademicPhysicsSeedQuestions();
  });

  // Selected Teacher Sets state (PART 4)
  const [selectedTeacherSets, setSelectedTeacherSets] = useState<TeacherSourceSet[]>([
    'ishak',
    'topon',
    'pramanik',
    'tofazzal'
  ]);

  // Load any published Firestore questions for Academic route
  useEffect(() => {
    let isMounted = true;
    async function loadFirestoreAcademicQuestions() {
      try {
        const firestoreQuestions = await fetchQuestions({
          route: 'academic',
          status: 'published'
        });
        if (isMounted && firestoreQuestions.length > 0) {
          setAcademicBankQuestions(prev => {
            const map = new Map<string, QuestionItem>();
            prev.forEach(q => map.set(q.id, q));
            firestoreQuestions.forEach(q => map.set(q.id, q));
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.warn('Academic Firestore questions fetch error, using local dataset:', err);
      }
    }
    loadFirestoreAcademicQuestions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute teacher set counts for this chapter
  const teacherCounts = useMemo(() => {
    return getAcademicTeacherSetCounts(chapterIndex, academicBankQuestions);
  }, [chapterIndex, academicBankQuestions]);

  // Active teacher sets with at least 1 question
  const activeTeacherSets = useMemo(() => {
    return ACADEMIC_TEACHER_SOURCE_SETS.filter(t => (teacherCounts[t.id] || 0) > 0);
  }, [teacherCounts]);

  const hasTeacherSets = isAcademicPhysics && activeTeacherSets.length > 0;

  // Toggle single teacher selection
  const handleToggleTeacher = (tId: TeacherSourceSet) => {
    setSelectedTeacherSets(prev => {
      if (prev.includes(tId)) {
        return prev.filter(id => id !== tId);
      } else {
        return [...prev, tId];
      }
    });
  };

  // Select all / clear teacher sets
  const handleSelectAllTeachers = () => {
    setSelectedTeacherSets(activeTeacherSets.map(t => t.id));
  };

  const handleClearTeachers = () => {
    setSelectedTeacherSets([]);
  };

  // Canonical Topics with dynamic question counts based on active teacher selection (PART 5)
  const canonicalTopicCards: AcademicCanonicalTopicCard[] = useMemo(() => {
    if (!hasTeacherSets) return [];
    return getAcademicCanonicalTopicsWithCounts(
      selectedTeacherSets,
      chapterIndex,
      academicBankQuestions
    );
  }, [hasTeacherSets, selectedTeacherSets, chapterIndex, academicBankQuestions]);

  // Total questions in full chapter with current teacher selection
  const fullChapterPool = useMemo(() => {
    if (!hasTeacherSets || selectedTeacherSets.length === 0) {
      return null;
    }
    return createAcademicMixedPracticePool(
      null,
      selectedTeacherSets,
      chapterIndex,
      academicBankQuestions
    );
  }, [hasTeacherSets, selectedTeacherSets, chapterIndex, academicBankQuestions]);

  // Fallback raw topics from question list for non-Physics subjects
  const rawTopicsFromQuestions = useMemo(() => {
    return Array.from(new Set(questions.map(q => q.topic).filter(Boolean))) as string[];
  }, [questions]);

  const isMath1Chap9 = subject.id === 'math1' && chapterIndex === 8;
  const configChapter = useMemo(() => {
    return findAcademicChapter(subject.id, chapterIndex);
  }, [subject.id, chapterIndex]);

  const syllabusTopics = configChapter?.topics || [];

  const legacyTopics = useMemo(() => {
    if (isMath1Chap9) {
      return Array.from(new Set([...MATH1_CHAP9_TOPICS, ...rawTopicsFromQuestions]));
    }
    if (syllabusTopics.length > 0) {
      return Array.from(new Set([...syllabusTopics, ...rawTopicsFromQuestions]));
    }
    return rawTopicsFromQuestions;
  }, [isMath1Chap9, syllabusTopics, rawTopicsFromQuestions]);

  // Selection Modal State
  const [selectedTopicForMode, setSelectedTopicForMode] = useState<{
    topicId: string | null;
    topicName: string | null;
    count: number;
  } | null | undefined>(undefined);

  const [showExamSetup, setShowExamSetup] = useState(false);

  const handleTopicCardClick = (topicId: string | null, topicName: string | null, count: number) => {
    if (selectedTeacherSets.length === 0) return;
    setSelectedTopicForMode({ topicId, topicName, count });
  };

  const handleLegacyTopicClick = (topic: string | null) => {
    const norm = topic ? normalizeTopicStr(topic) : null;
    const count = topic
      ? questions.filter(q => q.topic === topic || (q.topic && normalizeTopicStr(q.topic) === norm)).length
      : questions.length;
    setSelectedTopicForMode({ topicId: null, topicName: topic, count });
  };

  const handleStartPracticeMode = () => {
    if (selectedTopicForMode !== undefined && selectedTopicForMode !== null) {
      if (hasTeacherSets) {
        const pool = createAcademicMixedPracticePool(
          selectedTopicForMode.topicId ? [selectedTopicForMode.topicId] : null,
          selectedTeacherSets,
          chapterIndex,
          academicBankQuestions
        );
        onSelectTopic(
          selectedTopicForMode.topicName,
          'quiz',
          pool.quizQuestions.length,
          undefined,
          pool.quizQuestions
        );
      } else {
        onSelectTopic(selectedTopicForMode.topicName, 'quiz');
      }
      setSelectedTopicForMode(undefined);
    }
  };

  const handleOpenExamSetup = () => {
    setShowExamSetup(true);
  };

  const handleExamSetupStart = (setup: { questionCount: number; timeMinutes: number }) => {
    if (selectedTopicForMode !== undefined && selectedTopicForMode !== null) {
      if (hasTeacherSets) {
        const pool = createAcademicMixedPracticePool(
          selectedTopicForMode.topicId ? [selectedTopicForMode.topicId] : null,
          selectedTeacherSets,
          chapterIndex,
          academicBankQuestions
        );
        onSelectTopic(
          selectedTopicForMode.topicName,
          'exam',
          setup.questionCount,
          setup.timeMinutes,
          pool.quizQuestions
        );
      } else {
        onSelectTopic(
          selectedTopicForMode.topicName,
          'exam',
          setup.questionCount,
          setup.timeMinutes
        );
      }
      setShowExamSetup(false);
      setSelectedTopicForMode(undefined);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-6 font-medium bg-slate-900/50 p-3 rounded-xl border border-slate-800 w-fit">
        <button onClick={onGoHome} className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
          <Home className="w-4 h-4" /> Home
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        <button onClick={onBack} className="hover:text-emerald-400 transition-colors truncate max-w-[150px] sm:max-w-[200px] cursor-pointer">
          {subject.name}
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        <span className="text-emerald-400">{chapterName}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{chapterName}</h1>
            {hasTeacherSets && (
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                শিক্ষকভিত্তিক অনুশীলন
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-0.5">
            {hasTeacherSets 
              ? 'শিক্ষক সেট ও ক্যানোনিকাল টপিক নির্বাচন করুন' 
              : 'টপিক নির্বাচন করুন (Select Topic)'}
          </p>
        </div>
      </div>

      {/* ==================== PART 4: TEACHER / SOURCE SET SELECTION ==================== */}
      {hasTeacherSets && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>শিক্ষক / প্রশ্ন উৎস নির্বাচন</span>
                  <span className="text-xs text-slate-400 font-normal">
                    ({selectedTeacherSets.length}/{activeTeacherSets.length} টি নির্বাচিত)
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  এক বা একাধিক শিক্ষকের প্রশ্ন একসাথে নির্বাচন করে মিক্সড অনুশীলন করতে পারেন
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleSelectAllTeachers}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 transition-colors cursor-pointer"
              >
                সবগুলো নির্বাচন
              </button>
              <button
                onClick={handleClearTeachers}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer"
              >
                রিসেট
              </button>
            </div>
          </div>

          {/* Teacher Selection Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activeTeacherSets.map(teacher => {
              const count = teacherCounts[teacher.id] || 0;
              const isSelected = selectedTeacherSets.includes(teacher.id);

              return (
                <button
                  key={teacher.id}
                  onClick={() => handleToggleTeacher(teacher.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-transparent border border-slate-700'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="font-extrabold text-sm truncate">
                      {teacher.label}
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 border ${
                    isSelected
                      ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {toBanglaNumber(count)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* No Teacher Selected Warning Notice (PART 4) */}
          {selectedTeacherSets.length === 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-amber-300">
                অনুশীলন শুরু করতে অন্তত একটি শিক্ষক সেট নির্বাচন করুন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* ==================== EMPTY STATE ==================== */}
      {!hasTeacherSets && questions.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center my-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <BookOpen className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">কোনো প্রশ্ন বা টপিক নেই</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            এই অধ্যায়ের জন্য এখনও কোনো টপিক বা প্রশ্ন যুক্ত করা হয়নি।
          </p>
          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-sm font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> অধ্যায় তালিকায় ফিরে যান
          </button>
        </div>
      ) : (
        /* ==================== PART 5: CANONICAL TOPIC LIST ==================== */
        <div className="space-y-3">
          {hasTeacherSets ? (
            <>
              {/* Full Chapter Button for Teacher Sets */}
              <button
                disabled={selectedTeacherSets.length === 0 || !fullChapterPool || fullChapterPool.totalUnique === 0}
                onClick={() => handleTopicCardClick(null, 'সম্পূর্ণ অধ্যায় (Full Chapter)', fullChapterPool?.totalUnique || 0)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
                  selectedTeacherSets.length === 0 || !fullChapterPool || fullChapterPool.totalUnique === 0
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-50 cursor-not-allowed'
                    : 'bg-slate-800/90 border-slate-700 hover:border-emerald-500 hover:bg-slate-800 cursor-pointer shadow-lg hover:shadow-emerald-500/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base sm:text-lg text-white">
                        সম্পূর্ণ অধ্যায় (Full Chapter)
                      </span>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[11px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-500/20">
                        মিক্সড পুল
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      {selectedTeacherSets.length === 0
                        ? 'শিক্ষক সেট নির্বাচন করুন'
                        : `${toBanglaNumber(fullChapterPool?.totalUnique || 0)} টি প্রশ্ন (${selectedTeacherSets.map(id => ACADEMIC_TEACHER_SOURCE_SETS.find(t => t.id === id)?.label).filter(Boolean).join(' + ')})`}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                    {toBanglaNumber(fullChapterPool?.totalUnique || 0)} টি
                  </span>
                </div>
              </button>

              {/* Canonical Topic Cards */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    ক্যানোনিকাল টপিক তালিকা (Canonical Topics)
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    নির্বাচিত শিক্ষকের প্রশ্নের সংখ্যা প্রদর্শিত হচ্ছে
                  </span>
                </div>

                <div className="space-y-3">
                  {canonicalTopicCards.map((topic, index) => {
                    const isDisabled = selectedTeacherSets.length === 0 || topic.questionCount === 0;

                    return (
                      <button
                        key={topic.topicId || index}
                        disabled={isDisabled}
                        onClick={() => handleTopicCardClick(topic.topicId, topic.topicName, topic.questionCount)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
                          isDisabled
                            ? 'bg-slate-900/40 border-slate-800/60 opacity-50 cursor-not-allowed'
                            : 'bg-slate-800 border-slate-700 hover:border-cyan-500 hover:bg-slate-800/80 cursor-pointer shadow-md hover:shadow-cyan-500/10'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0 pr-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm ${
                            isDisabled ? 'bg-slate-800 text-slate-500' : 'bg-cyan-500/20 text-cyan-400'
                          }`}>
                            {toBanglaNumber(index + 1)}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-sm sm:text-base text-slate-200 leading-snug block truncate">
                              {topic.topicName}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-400">
                                {selectedTeacherSets.length === 0 ? '০ টি প্রশ্ন' : `${toBanglaNumber(topic.questionCount)} টি প্রশ্ন`}
                              </span>
                              {topic.sources && topic.sources.length > 0 && selectedTeacherSets.length > 0 && (
                                <span className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 truncate">
                                  {topic.sources.join(', ')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                            isDisabled 
                              ? 'bg-slate-800 text-slate-500 border-slate-700' 
                              : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                          }`}>
                            {toBanglaNumber(topic.questionCount)} টি
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Legacy Non-Physics Subjects List (e.g. Math Chapter 9) */
            <>
              {/* Full Chapter Button */}
              <button
                onClick={() => handleLegacyTopicClick(null)}
                className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-slate-800 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/80 cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-medium text-lg text-slate-200">সম্পূর্ণ অধ্যায় (Full Chapter)</span>
                    <p className="text-sm text-slate-400">
                      {questions.length > 0 ? `${questions.length} টি প্রশ্ন` : 'প্রশ্ন যুক্ত করা হচ্ছে'}
                    </p>
                  </div>
                </div>
              </button>

              {/* Legacy Chapter Specific Topics */}
              {legacyTopics.map((topic, index) => {
                const norm = normalizeTopicStr(topic);
                const qCount = questions.filter(q => q.topic === topic || (q.topic && normalizeTopicStr(q.topic) === norm)).length;
                return (
                  <button
                    key={index}
                    onClick={() => handleLegacyTopicClick(topic)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-slate-800 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/80 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 shrink-0">
                        <span className="font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <span className="font-medium text-base sm:text-lg text-slate-200 leading-snug block">{topic}</span>
                        <p className="text-xs sm:text-sm text-slate-400">
                          {qCount > 0 ? `${qCount} টি প্রশ্ন` : 'প্রশ্ন যুক্ত করা হচ্ছে'}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* ==================== MODE SELECTION MODAL ==================== */}
      {selectedTopicForMode !== undefined && selectedTopicForMode !== null && !showExamSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setSelectedTopicForMode(undefined)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60">
                {selectedTopicForMode.topicName || 'সম্পূর্ণ অধ্যায়'}
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">মোড নির্বাচন করুন</h2>
              <p className="text-slate-400 text-xs mt-1">
                উপলব্ধ মোট প্রশ্ন: <strong className="text-emerald-300">{toBanglaNumber(selectedTopicForMode.count)} টি</strong>
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleStartPracticeMode}
                className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-700 bg-slate-800/50 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-left group cursor-pointer"
              >
                <div className="bg-emerald-500/20 p-3 rounded-xl group-hover:bg-emerald-500/30 transition-colors shrink-0">
                  <BookOpen className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">অনুশীলন মোড (Practice Mode)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    প্রতিটি প্রশ্নের পর সঠিক উত্তর ও বিশদ ব্যাখ্যা দেখুন। অনুশীলনের জন্য সেরা।
                  </p>
                </div>
              </button>

              <button
                onClick={handleOpenExamSetup}
                className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-700 bg-slate-800/50 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all text-left group cursor-pointer"
              >
                <div className="bg-indigo-500/20 p-3 rounded-xl group-hover:bg-indigo-500/30 transition-colors shrink-0">
                  <GraduationCap className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">পরীক্ষা মোড (Real Exam Mode)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    নিজের পছন্দের প্রশ্ন সংখ্যা ও সময় নির্ধারণ করে বাস্তব পরীক্ষার অভিজ্ঞতা নিন।
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ACADEMIC EXAM SETUP MODAL ==================== */}
      {selectedTopicForMode !== undefined && selectedTopicForMode !== null && showExamSetup && (
        <AcademicExamSetupModal
          isOpen={showExamSetup}
          topicName={selectedTopicForMode.topicName ? selectedTopicForMode.topicName : 'সম্পূর্ণ অধ্যায় (Full Chapter)'}
          totalAvailableQuestions={selectedTopicForMode.count || 1}
          onClose={() => {
            setShowExamSetup(false);
            setSelectedTopicForMode(undefined);
          }}
          onStartExam={handleExamSetupStart}
        />
      )}
    </div>
  );
}
