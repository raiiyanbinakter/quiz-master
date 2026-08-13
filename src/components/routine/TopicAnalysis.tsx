import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Play,
  Layers,
  Info,
  Clock,
  Lock,
  PlusCircle,
  CheckCircle2,
  BarChart2,
  FileText
} from 'lucide-react';
import {
  TopicAnalysisRecord,
  AnalysisSource,
  StudentTopicEvidence
} from '../../types/topicAnalysis';
import { PHYSICS_CH4_SOURCE, PHYSICS_CH4_TOPICS } from '../../data/topicAnalysisData';
import {
  getTopicAnalysisRecords,
  getAnalysisSource,
  getStudentTopicEvidence
} from '../../lib/topicAnalysisFirestore';
import { PhysicsVisualLab } from '../labs/PhysicsVisualLab';

interface TopicAnalysisProps {
  userId?: string | null;
  onStartQuizForTopic?: (topicId: string) => void;
  onAddToRoutine?: (topicId: string) => void;
}

export const TopicAnalysis: React.FC<TopicAnalysisProps> = ({
  userId,
  onStartQuizForTopic,
  onAddToRoutine
}) => {
  const [topics, setTopics] = useState<TopicAnalysisRecord[]>(PHYSICS_CH4_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<TopicAnalysisRecord>(PHYSICS_CH4_TOPICS[0]);
  const [activeSource, setActiveSource] = useState<AnalysisSource | null>(PHYSICS_CH4_SOURCE);
  const [evidenceMap, setEvidenceMap] = useState<Record<string, StudentTopicEvidence>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showLab, setShowLab] = useState<boolean>(false);

  // Load records and source
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const fetchedTopics = await getTopicAnalysisRecords('academic', 'phys1', 'phys1_ch4');
      if (fetchedTopics && fetchedTopics.length > 0) {
        setTopics(fetchedTopics);
        setSelectedTopic(fetchedTopics[0]);
      }

      const fetchedSource = await getAnalysisSource('src_phys1_ch4_pdf');
      if (fetchedSource) {
        setActiveSource(fetchedSource);
      }

      // Load evidence for initial topics
      const map: Record<string, StudentTopicEvidence> = {};
      for (const t of fetchedTopics || PHYSICS_CH4_TOPICS) {
        const ev = await getStudentTopicEvidence(userId || null, t.topicId);
        if (ev) {
          map[t.topicId] = ev;
        }
      }
      setEvidenceMap(map);
      setLoading(false);
    }
    loadData();
  }, [userId]);

  const selectedEvidence = evidenceMap[selectedTopic.topicId] || null;

  // Determine badge for source verification
  const isSourceAdminReviewed = activeSource?.verificationStatus === 'admin_reviewed';
  const sourceBadgeLabel = isSourceAdminReviewed
    ? 'সম্পাদনা-পর্যালোচিত বিশ্লেষণ'
    : 'বিশ্লেষণ যাচাই প্রয়োজন';

  // Topic Status Helper
  const getTopicStatusBadge = (topic: TopicAnalysisRecord, ev: StudentTopicEvidence | null) => {
    if (!ev || ev.masteryState === 'not_started' || ev.attempts === 0) {
      if (topic.reviewStatus === 'needs_verification') {
        return {
          label: 'বিশ্লেষণ যাচাই প্রয়োজন',
          bg: 'bg-violet-500/10 text-violet-400 border-violet-500/30'
        };
      }
      return {
        label: 'এখনও অনুশীলন করা হয়নি',
        bg: 'bg-slate-800 text-slate-400 border-slate-700'
      };
    }

    switch (ev.masteryState) {
      case 'mastered':
        return {
          label: 'আয়ত্তে',
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
      case 'review_due':
        return {
          label: 'রিভিশন দরকার',
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      case 'learning':
      default:
        return {
          label: 'অনুশীলন চলছে',
          bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
        };
    }
  };

  // Generate transparent recommendation reasons
  const getTransparentReasons = (topic: TopicAnalysisRecord, ev: StudentTopicEvidence | null) => {
    const reasons: string[] = [];

    if (ev && ev.attempts > 0) {
      if (ev.accuracy < 60) {
        reasons.push('আপনার সাম্প্রতিক সঠিকতা কম');
      }
      if (ev.masteryState === 'review_due') {
        reasons.push('রিভিশনের সময় হয়েছে');
      }
    }

    if (topic.prerequisiteTopicIds && topic.prerequisiteTopicIds.length > 0) {
      reasons.push('এই টপিকটি পরের টপিকের ভিত্তি');
    }

    if (topic.reviewStatus === 'admin_reviewed') {
      reasons.push('সম্পাদনা-পর্যালোচিত বিশ্লেষণে এই টপিক অন্তর্ভুক্ত');
    }

    if (reasons.length === 0) {
      reasons.push('এই টপিক সম্পর্কে ব্যক্তিগত সুপারিশ দিতে আরও অনুশীলনের তথ্য প্রয়োজন।');
    }

    return reasons;
  };

  const isVisualLabAvailable =
    selectedTopic.topicId === 'phys1_ch4_t1' ||
    selectedTopic.topicId === 'phys1_ch4_t2' ||
    selectedTopic.title.includes('বল ও বলের প্রকারভেদ') ||
    selectedTopic.title.includes('নিউটনের গতিসূত্র');

  if (showLab) {
    return (
      <PhysicsVisualLab
        onClose={() => setShowLab(false)}
        onStartQuizForTopic={onStartQuizForTopic}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-200">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              টপিক বিশ্লেষণ (Topic Analysis)
            </span>

            <span className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
              isSourceAdminReviewed
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {isSourceAdminReviewed ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {sourceBadgeLabel}
            </span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              পদার্থবিজ্ঞান ১ম পত্র — নিউটনীয় বলবিদ্যা
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              স্বচ্ছ ও নির্ভরযোগ্য উৎস ভিত্তিক অধ্যায় কাঠামো, শিখনফল, অনুশীলন তথ্য এবং সুপারিশমালা।
            </p>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0 text-center space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase">অধ্যায় টপিক সংখ্যা</div>
          <div className="text-2xl font-black text-cyan-400">{topics.length}টি টপিক</div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: TOPIC MAP LIST (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              টপিক তালিকা ({topics.length})
            </h3>
            <span className="text-[11px] text-slate-400">পদার্থবিজ্ঞান ১ম</span>
          </div>

          <div className="space-y-2">
            {topics.map((t) => {
              const isSelected = selectedTopic.id === t.id;
              const ev = evidenceMap[t.topicId] || null;
              const badge = getTopicStatusBadge(t, ev);

              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-500/60 shadow-lg text-white ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-sm leading-snug">{t.title}</span>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform mt-0.5 ${
                      isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'
                    }`} />
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs pt-1">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${badge.bg}`}>
                      {badge.label}
                    </span>

                    {/* Show documented question count ONLY if set by admin */}
                    {t.documentedQuestionCount !== undefined && t.documentedQuestionCount > 0 && (
                      <span className="text-[11px] text-slate-400 font-semibold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {t.documentedQuestionCount}টি নথিভুক্ত প্রশ্ন
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED TOPIC FOCUS PANEL (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">

            {/* TOP TITLE */}
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-xl border border-slate-700">
                  {selectedTopic.chapterTitle}
                </span>
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-xl">
                  {selectedTopic.title}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-extrabold text-white">
                {selectedTopic.title}
              </h2>
            </div>

            {/* QUESTION 1: এই টপিকটি কী? (What is this topic?) */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-extrabold text-sm text-cyan-400 flex items-center gap-2">
                <Info className="w-4 h-4" />
                ১. এই টপিকটি কী? (শিখনফল)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedTopic.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* QUESTION 2: কেন এটি এখন গুরুত্বপূর্ণ? (Why is it important now?) */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-extrabold text-sm text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                ২. কেন এটি এখন গুরুত্বপূর্ণ? (উৎস ও গুরুত্ব)
              </h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{activeSource?.title || 'Past Question & Concept Analysis'}</span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                      {activeSource?.verificationStatus === 'admin_reviewed' ? 'যাচাইকৃত উৎস' : 'বিশ্লেষণ সোর্স'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    ফাইল সোর্স: {activeSource?.fileReference || 'Chapter 4 Physics 1st Paper Analysis.pdf'} ({activeSource?.publisher || 'Academic Board'})
                  </p>
                </div>

                {selectedTopic.prerequisiteTopicIds.length > 0 && (
                  <p className="text-slate-400 text-xs pt-1">
                    • পূর্বশর্ত টপিক: {selectedTopic.prerequisiteTopicIds.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* QUESTION 3: এই টপিকে আমার অবস্থা কী? (What is my current state?) */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-extrabold text-sm text-emerald-400 flex items-center gap-2">
                <BarChart2 className="w-4 h-4" />
                ৩. এই টপিকে আমার অবস্থা কী? (ব্যক্তিগত অগ্রগতি)
              </h3>

              {selectedEvidence && selectedEvidence.attempts > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[11px]">মোট সমাধান</div>
                    <div className="text-base font-extrabold text-white">{selectedEvidence.answered}টি প্রশ্ন</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[11px]">সঠিক উত্তর</div>
                    <div className="text-base font-extrabold text-emerald-400">{selectedEvidence.correct}টি</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                    <div className="text-slate-400 text-[11px]">সঠিকতার হার</div>
                    <div className="text-base font-extrabold text-cyan-400">{selectedEvidence.accuracy}%</div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  এখনও পর্যাপ্ত অনুশীলনের তথ্য নেই।
                </p>
              )}
            </div>

            {/* QUESTION 4: transparent "Why this topic?" & Recommendation */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-extrabold text-sm text-violet-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                কেন এই টপিকটি হাইলাইট করা হয়েছে?
              </h3>

              <div className="space-y-1.5 text-xs text-slate-300">
                {getTransparentReasons(selectedTopic, selectedEvidence).map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS: 4 core actions + disabled Visual Lab */}
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-xs text-slate-400 uppercase">
                ৪. এখন আমার কী করা উচিত? (পরবর্তী পদক্ষেপ)
              </h3>

              <div className="flex flex-wrap gap-3">
                {/* 1. Start Practice */}
                <button
                  onClick={() => {
                    if (onStartQuizForTopic) {
                      onStartQuizForTopic(selectedTopic.topicId);
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>অনুশীলন শুরু করুন (১০টি প্রশ্ন)</span>
                </button>

                {/* 2. Add to Revision (Only if evidence exists) */}
                {selectedEvidence && selectedEvidence.attempts > 0 && (
                  <button
                    onClick={() => {
                      if (onAddToRoutine) onAddToRoutine(selectedTopic.topicId);
                    }}
                    className="bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 font-bold text-xs px-4 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Clock className="w-4 h-4" />
                    <span>রিভিশনে যোগ করুন</span>
                  </button>
                )}

                {/* 3. View Wrong Questions (Only if wrong answers exist) */}
                {selectedEvidence && (selectedEvidence.answered - selectedEvidence.correct) > 0 && (
                  <button
                    onClick={() => {
                      if (onStartQuizForTopic) onStartQuizForTopic(selectedTopic.topicId);
                    }}
                    className="bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 font-bold text-xs px-4 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>ভুল প্রশ্ন দেখুন ({selectedEvidence.answered - selectedEvidence.correct})</span>
                  </button>
                )}

                {/* 4. Add to Routine */}
                {onAddToRoutine && (
                  <button
                    onClick={() => onAddToRoutine(selectedTopic.topicId)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-3 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-cyan-400" />
                    <span>রুটিনে যোগ করুন</span>
                  </button>
                )}

                {/* 5. Visual Lab Button */}
                {isVisualLabAvailable ? (
                  <button
                    onClick={() => setShowLab(true)}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer ring-2 ring-cyan-500/30"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>ভিজ্যুয়ালভাবে বুঝুন</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-slate-950 text-slate-500 border border-slate-800 font-semibold text-xs px-4 py-3 rounded-xl flex items-center gap-2 cursor-not-allowed opacity-70"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                    <span>ভিজ্যুয়ালভাবে বুঝুন — শিগগিরই আসছে</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
