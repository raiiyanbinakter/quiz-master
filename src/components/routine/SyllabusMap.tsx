import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Play,
  Layers,
  Info,
  Clock,
  Eye,
  Lock
} from 'lucide-react';
import { SyllabusTopic, SourceReference, VisualExplanationSpec } from '../../types/routine';
import { DEMO_SYLLABUS_TOPICS, DEMO_VISUAL_EXPLANATION } from '../../data/routineSeedData';
import { calculateTopicPriority } from '../../utils/routinePlanner';

interface SyllabusMapProps {
  onStartQuizForTopic?: (topicId: string) => void;
}

export const SyllabusMap: React.FC<SyllabusMapProps> = ({ onStartQuizForTopic }) => {
  const [selectedTopic, setSelectedTopic] = useState<SyllabusTopic | null>(DEMO_SYLLABUS_TOPICS[0]);
  const [showVisualModal, setShowVisualModal] = useState<boolean>(false);

  // Group topics by subject -> chapter
  const subjects = Array.from(new Set(DEMO_SYLLABUS_TOPICS.map(t => t.subjectName || t.subjectId)));

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" /> সিলেবাস ম্যাপ (Syllabus & Blueprint Map)
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            প্রতিটি টপিকের অফিশিয়াল সোর্স, ব্লুপ্রিন্ট ওয়েটেজ, পূর্বশর্ত এবং গাণিতিক অগ্রাধিকারের ব্যাখ্যা।
          </p>
        </div>
      </div>

      {/* Main Grid: Topic List & Topic Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Subject & Topic Hierarchy (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {subjects.map((subj) => {
            const subjTopics = DEMO_SYLLABUS_TOPICS.filter(t => (t.subjectName || t.subjectId) === subj);
            return (
              <div key={subj} className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden shadow-lg">
                <div className="bg-slate-800 p-4 border-b border-slate-700/80 font-bold text-emerald-300 text-base flex items-center gap-2">
                  <Layers className="w-4 h-4" /> {subj} ({subjTopics.length} টপিক)
                </div>

                <div className="p-3 space-y-2">
                  {subjTopics.map((topic) => {
                    const isSelected = selectedTopic?.id === topic.id;
                    const prio = calculateTopicPriority(topic, DEMO_SYLLABUS_TOPICS);

                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600/20 border-indigo-500 text-white'
                            : 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="font-semibold text-sm line-clamp-2">{topic.title}</span>
                          {topic.officialStatus === 'verified' ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                          <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                            {topic.estimatedMinutes} মি.
                          </span>
                          <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-semibold">
                            স্কোর: {prio.totalScore}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Selected Topic Detailed Inspection (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedTopic ? (
            <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl space-y-6">
              {/* Top Meta */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
                    {selectedTopic.subjectName}
                  </span>
                  {selectedTopic.officialStatus === 'verified' ? (
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Official Source
                    </span>
                  ) : (
                    <span className="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5" /> Needs Verification / Provisional
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{selectedTopic.title}</h3>
                <p className="text-slate-400 text-xs">অধ্যায়: {selectedTopic.chapterName || selectedTopic.chapterId}</p>
              </div>

              {/* Learning Objectives */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700 space-y-2">
                <h4 className="font-bold text-indigo-300 text-sm flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> শিখনফল (Learning Objectives):
                </h4>
                <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                  {selectedTopic.learningObjectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Exact Transparent Priority Breakdown */}
              {(() => {
                const prio = calculateTopicPriority(selectedTopic, DEMO_SYLLABUS_TOPICS);
                return (
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700 space-y-3">
                    <h4 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> গাণিতিক অগ্রাধিকার স্কোর ব্যাখ্যা (Priority Score Breakdown):
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                        <div className="text-slate-400">Blueprint Weight (30%)</div>
                        <div className="font-bold text-white text-sm">{prio.examBlueprintWeight}%</div>
                      </div>
                      <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                        <div className="text-slate-400">Weakness (25%)</div>
                        <div className="font-bold text-white text-sm">{prio.studentWeakness}%</div>
                      </div>
                      <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                        <div className="text-slate-400">Prereq Urgency (20%)</div>
                        <div className="font-bold text-white text-sm">{prio.prerequisiteUrgency}%</div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1 pt-1">
                      <div className="font-semibold text-slate-400">সুপারিশের কারণসমূহ:</div>
                      {prio.reasons.map((r, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-400" /> {r}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Official Source Reference */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700 space-y-2">
                <h4 className="font-bold text-slate-300 text-sm">অফিসিয়াল সূত্র ও কর্তৃপক্ষ (Source Reference):</h4>
                {selectedTopic.sourceReferences.length > 0 ? (
                  selectedTopic.sourceReferences.map((src) => (
                    <div key={src.id} className="text-xs text-slate-300 bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-1">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{src.title}</span>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          অফিসিয়াল ওয়েবসাইট <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-slate-400">পাবলিশার: {src.publisher} | শিক্ষাবর্ষ: {src.academicYear}</div>
                      <div className="text-slate-500">সংগৃহীত: {src.retrievedAt}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-amber-400">
                    এখনও কোনো অফিসিয়াল উৎস যাচাই করা হয়নি। (Custom / Needs Verification)
                  </p>
                )}
              </div>

              {/* Visual Explanation Stub (Disabled / Feature Flagged) */}
              <div className="bg-slate-900/40 p-4 rounded-2xl border border-dashed border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-300 text-sm flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-400" /> ভিজ্যুয়াল দৃশ্যকল্প ব্যাখ্যা (Visual Explanation)
                    <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Feature Flagged
                    </span>
                  </h4>
                  <button
                    onClick={() => setShowVisualModal(true)}
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    দৃশ্যপট দেখুন
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  ভিউ স্টাব ফিচার: কোনো কাল্পনিক বা অসত্য মডেল রেসপন্স সরাসরি জেনারেট করা নিষিদ্ধ। এই ফিচারে শুধু স্ট্রাকচার্ড ডায়াগ্রাম স্পেক সংরক্ষিত রয়েছে।
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap gap-3">
                {onStartQuizForTopic && (
                  <button
                    onClick={() => onStartQuizForTopic(selectedTopic.id)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <Play className="w-4 h-4 fill-current" /> এই টপিকের কুইজ প্র্যাকটিস করুন
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/90 border border-slate-700 p-8 rounded-3xl text-center text-slate-400">
              বাম পাশের তালিকা থেকে একটি টপিক নির্বাচন করুন।
            </div>
          )}
        </div>
      </div>

      {/* Visual Explanation Stub Modal */}
      {showVisualModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 max-w-lg w-full p-6 rounded-3xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> Visual Explanation Spec (Stub)
              </h3>
              <button
                onClick={() => setShowVisualModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <div className="text-purple-300 font-bold">{DEMO_VISUAL_EXPLANATION.title}</div>
              <p className="text-slate-300">{DEMO_VISUAL_EXPLANATION.learningObjective}</p>

              <div className="space-y-1.5 pt-2">
                {DEMO_VISUAL_EXPLANATION.steps.map((step) => (
                  <div key={step.stepNumber} className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                    <span className="font-bold text-indigo-400">ধাপ {step.stepNumber}: {step.title}</span>
                    <p className="text-slate-300 text-[11px] mt-0.5">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30">
              * Note: Currently in stub mode to protect official content integrity. No AI model hallucinations are allowed.
            </div>

            <button
              onClick={() => setShowVisualModal(false)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 rounded-xl cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
