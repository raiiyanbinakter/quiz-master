import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  Sparkles,
  Layers,
  BarChart3,
  CheckSquare,
  Square,
  HelpCircle,
  Play,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { 
  MODULE_3_CHAPTERS, 
  Module3Chapter, 
  getModule3QuestionsForTopics 
} from '../../data/module3TopicConfig';
import { MODULE_3_CONFIG } from '../../data/moduleConfig';

interface MedicalSubjectTestsProps {
  onBack: () => void;
  onAddToRoutine?: (title: string, durationMinutes: number) => void;
  onStartCustomTest?: (questions: any[], title: string, mode: 'quiz' | 'exam') => void;
}

export default function MedicalSubjectTests({
  onBack,
  onStartCustomTest
}: MedicalSubjectTestsProps) {
  // Screen state: null = Chapter selection screen (Screen 1), or chapter ID ('phy1_chap4' | 'phy1_chap6')
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  // Selected Chapter object
  const activeChapter: Module3Chapter | undefined = useMemo(() => {
    return MODULE_3_CHAPTERS.find(c => c.id === selectedChapterId);
  }, [selectedChapterId]);

  // Topic Selection State
  const [selectedTopicNames, setSelectedTopicNames] = useState<string[]>([]);

  // When chapter changes, select all topics for that chapter by default
  useEffect(() => {
    if (activeChapter) {
      setSelectedTopicNames(activeChapter.topics.map(t => t.name));
    } else {
      setSelectedTopicNames([]);
    }
  }, [activeChapter]);

  // Selected Questions Count Limit & Exam Config
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(30);
  const [examTimeMinutes, setExamTimeMinutes] = useState<number>(15);
  const [customTimeInput, setCustomTimeInput] = useState<string>('15');
  const [examModeType, setExamModeType] = useState<'exam' | 'quiz'>('exam');

  // Compute total available questions based on selected topics
  const totalAvailableForSelectedTopics = useMemo(() => {
    if (!activeChapter) return 0;
    return activeChapter.topics
      .filter(t => selectedTopicNames.includes(t.name))
      .reduce((sum, t) => sum + t.count, 0);
  }, [activeChapter, selectedTopicNames]);

  // Ensure questionCountLimit doesn't exceed totalAvailableForSelectedTopics
  const effectiveQuestionLimit = useMemo(() => {
    if (totalAvailableForSelectedTopics === 0) return 0;
    if (questionCountLimit > totalAvailableForSelectedTopics) {
      return totalAvailableForSelectedTopics;
    }
    return questionCountLimit;
  }, [questionCountLimit, totalAvailableForSelectedTopics]);

  // Allowed Question Count Options (never exceed totalAvailableForSelectedTopics)
  const allowedCountOptions = useMemo(() => {
    const total = totalAvailableForSelectedTopics;
    if (total <= 0) return [];
    
    const standardLimits = [10, 20, 30, 50];
    const filtered = standardLimits.filter(limit => limit < total);
    
    // Always include 'all' (total)
    return [...filtered, total];
  }, [totalAvailableForSelectedTopics]);

  // Toggle Topic Selection
  const toggleTopic = (topicName: string) => {
    if (selectedTopicNames.includes(topicName)) {
      if (selectedTopicNames.length === 1) return; // Keep at least 1 topic selected
      setSelectedTopicNames(selectedTopicNames.filter(t => t !== topicName));
    } else {
      setSelectedTopicNames([...selectedTopicNames, topicName]);
    }
  };

  // Toggle All Topics
  const toggleAllTopics = () => {
    if (!activeChapter) return;
    if (selectedTopicNames.length === activeChapter.topics.length) {
      setSelectedTopicNames([activeChapter.topics[0].name]);
    } else {
      setSelectedTopicNames(activeChapter.topics.map(t => t.name));
    }
  };

  const handleTimeMinutesChange = (mins: number) => {
    const validMins = Math.max(1, Math.min(180, mins));
    setExamTimeMinutes(validMins);
    setCustomTimeInput(validMins.toString());
  };

  const handleCustomTimeInput = (val: string) => {
    setCustomTimeInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setExamTimeMinutes(Math.min(180, num));
    }
  };

  const handleStartExam = () => {
    if (!activeChapter || totalAvailableForSelectedTopics === 0) return;

    // Get full question items for selected topics
    const fullQuestions = getModule3QuestionsForTopics(activeChapter.id, selectedTopicNames);

    // Slice up to effective question limit
    const actualCount = Math.min(effectiveQuestionLimit || fullQuestions.length, fullQuestions.length);
    const selectedQuestions = fullQuestions.slice(0, actualCount);

    // Calculate per-question time
    const totalSeconds = examTimeMinutes * 60;
    const perQuestionTimeSeconds = Math.max(10, Math.floor(totalSeconds / selectedQuestions.length));

    const formattedQuestions = selectedQuestions.map((q, idx) => ({
      id: idx + 1,
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      topic: q.topic,
      time_limit: perQuestionTimeSeconds
    }));

    const title = `পদার্থবিজ্ঞান ১ম পত্র: ${activeChapter.number}ম অধ্যায় (${activeChapter.title}) - ${selectedTopicNames.length}টি টপিক (${formattedQuestions.length}টি প্রশ্ন, ${examTimeMinutes} মিনিট)`;

    if (onStartCustomTest) {
      onStartCustomTest(formattedQuestions, title, examModeType);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER & BACK BUTTON */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            if (selectedChapterId) {
              setSelectedChapterId(null);
            } else {
              onBack();
            }
          }}
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{selectedChapterId ? 'অধ্যায় তালিকায় ফিরে যান' : 'ড্যাশবোর্ডে ফিরে যান'}</span>
        </button>

        <div className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          <span>মডিউল ৩</span>
        </div>
      </div>

      {/* TITLE BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>মডিউল ৩</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            পদার্থবিজ্ঞান ১ম পত্র — মডিউল ৩
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            অধ্যায় ও টপিকভিত্তিক কাস্টম অনুশীলন
          </p>
        </div>
      </div>

      {/* SCREEN 1: CHAPTER SELECTION VIEW */}
      {!selectedChapterId && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-cyan-400" />
            অধ্যায় নির্বাচন করুন
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MODULE_3_CHAPTERS.map((chap) => (
              <div
                key={chap.id}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-3xl transition-all duration-200 shadow-xl flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-xl">
                      {chap.number === 4 ? '৪র্থ অধ্যায়' : '৬ষ্ঠ অধ্যায়'}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
                      {chap.totalQuestions}টি প্রশ্ন
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white pt-1">
                    {chap.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    মোট {chap.topics.length}টি টপিক অন্তর্ভুক্ত রয়েছে
                  </p>
                </div>

                <button
                  onClick={() => setSelectedChapterId(chap.id)}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/10"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>টপিক বেছে নিন</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCREEN 2: SELECTED CHAPTER TOPIC SELECTION & CUSTOM EXAM BUILDER */}
      {activeChapter && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold text-cyan-400">
                {activeChapter.number === 4 ? '৪র্থ অধ্যায়' : '৬ষ্ঠ অধ্যায়'}
              </span>
              <h2 className="text-base md:text-lg font-bold text-white">
                {activeChapter.title} — টপিক নির্বাচন
              </h2>
            </div>

            <button
              onClick={() => setSelectedChapterId(null)}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
            >
              অধ্যায় পরিবর্তন করুন
            </button>
          </div>

          {/* TOPIC CHECKBOX GRID */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  টপিক ও প্রশ্ন সংখ্যা ({activeChapter.topics.length}টি টপিক)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedTopicNames.length}টি টপিক সিলেক্টেড (মোট {totalAvailableForSelectedTopics}টি প্রশ্ন নির্বাচিত)
                </p>
              </div>

              <button
                onClick={toggleAllTopics}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer self-start sm:self-auto"
              >
                {selectedTopicNames.length === activeChapter.topics.length ? 'সকল পছন্দ বাতিল করুন' : 'সব টপিক সিলেক্ট করুন'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {activeChapter.topics.map((topic, index) => {
                const isChecked = selectedTopicNames.includes(topic.name);

                return (
                  <div
                    key={topic.id}
                    onClick={() => toggleTopic(topic.name)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-slate-950 border-cyan-500/50 text-white shadow-sm'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                      <span className="text-xs font-bold truncate" title={topic.name}>
                        {index + 1}. {topic.name}
                      </span>
                    </div>

                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg shrink-0 ${
                      isChecked ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {topic.count}টি প্রশ্ন
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QUESTION COUNT & TIME LIMIT SELECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            
            {/* QUESTION COUNT SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>প্রশ্ন সংখ্যা নির্ধারণ করুন:</span>
                <span className="text-cyan-400 font-extrabold">{effectiveQuestionLimit} টি প্রশ্ন</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {allowedCountOptions.map((limit) => {
                  const isTotalOption = limit === totalAvailableForSelectedTopics;
                  const isSelected = effectiveQuestionLimit === limit;

                  return (
                    <button
                      key={limit}
                      onClick={() => setQuestionCountLimit(limit)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {isTotalOption ? `সব ${limit}টি প্রশ্ন` : `${limit}টি`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* EXAM TIME LIMIT SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>পরীক্ষার সময় (মিনিট):</span>
                <span className="text-amber-400 font-extrabold">{examTimeMinutes} মিনিট</span>
              </label>

              <div className="space-y-2">
                <div className="grid grid-cols-5 gap-1.5">
                  {[5, 10, 15, 20, 30].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => handleTimeMinutesChange(mins)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        examTimeMinutes === mins
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mins}মি.
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 shrink-0 font-medium">কাস্টম সময়:</span>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={customTimeInput}
                    onChange={(e) => handleCustomTimeInput(e.target.value)}
                    className="w-20 bg-slate-900 border border-slate-700 text-white font-bold text-xs px-2.5 py-1 rounded-lg text-center focus:outline-none focus:border-amber-400"
                    placeholder="মিনিট"
                  />
                  <span className="text-xs text-amber-300 font-bold">মিনিট</span>
                </div>
              </div>
            </div>
          </div>

          {/* EXAM VS PRACTICE MODE */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              অনুশীলনের ধরণ নির্বাচন করুন:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setExamModeType('exam')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-0.5 ${
                  examModeType === 'exam'
                    ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-amber-400">পরীক্ষা মোড (Exam)</div>
                <p className="text-[11px] text-slate-400">নির্দিষ্ট সময়ে পরীক্ষা দিয়ে শেষে ফলাফল পাবেন</p>
              </button>

              <button
                onClick={() => setExamModeType('quiz')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-0.5 ${
                  examModeType === 'quiz'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white ring-1 ring-cyan-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-cyan-400">অনুশীলন মোড (Practice)</div>
                <p className="text-[11px] text-slate-400">প্রতিটি প্রশ্ন উত্তর করার সাথে সাথে ব্যাখ্যা পাবেন</p>
              </button>
            </div>
          </div>

          {/* START BUTTON BANNER */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                বরাদ্দকৃত সময়: <strong className="text-white">{examTimeMinutes} মিনিট</strong> ({effectiveQuestionLimit}টি প্রশ্নের জন্য)।
              </span>
            </div>

            <button
              onClick={handleStartExam}
              disabled={effectiveQuestionLimit === 0}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50 shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>কাস্টম অনুশীলন শুরু করুন ({effectiveQuestionLimit}টি প্রশ্ন)</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
