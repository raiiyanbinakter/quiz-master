import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Layers, X, GraduationCap, Home, ChevronRight } from 'lucide-react';
import { Subject, Question } from '../types';
import AcademicExamSetupModal from './AcademicExamSetupModal';

export const DEFAULT_ACADEMIC_12_TOPICS = [
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
    timeMinutes?: number
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
  const chapterName = subject.chapters[chapterIndex];

  // Topic matching helper
  const normalizeTopicStr = (str: string) => str.replace(/^[০-৯0-9]+\.\s*/, '').trim();

  // Extract topics from question dataset
  const rawTopicsFromQuestions = Array.from(
    new Set(questions.map(q => q.topic).filter(Boolean))
  ) as string[];

  // Merge default 12 topics + extra topics found in question list
  const topics = Array.from(
    new Set([...DEFAULT_ACADEMIC_12_TOPICS, ...rawTopicsFromQuestions])
  );

  const [selectedTopicForMode, setSelectedTopicForMode] = useState<string | null | undefined>(undefined);
  const [showExamSetup, setShowExamSetup] = useState(false);

  const getTopicQuestionCount = (topicName: string | null) => {
    if (!topicName) return questions.length;
    const norm = normalizeTopicStr(topicName);
    return questions.filter(q => {
      if (!q.topic) return false;
      return q.topic === topicName || normalizeTopicStr(q.topic) === norm;
    }).length;
  };

  const handleTopicClick = (topic: string | null) => {
    setSelectedTopicForMode(topic);
  };

  const handleStartPracticeMode = () => {
    if (selectedTopicForMode !== undefined) {
      onSelectTopic(selectedTopicForMode, 'quiz');
      setSelectedTopicForMode(undefined);
    }
  };

  const handleOpenExamSetup = () => {
    setShowExamSetup(true);
  };

  const handleExamSetupStart = (setup: { questionCount: number; timeMinutes: number }) => {
    if (selectedTopicForMode !== undefined) {
      onSelectTopic(
        selectedTopicForMode,
        'exam',
        setup.questionCount,
        setup.timeMinutes
      );
      setShowExamSetup(false);
      setSelectedTopicForMode(undefined);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-6 font-medium bg-slate-900/50 p-3 rounded-xl border border-slate-800 w-fit">
        <button onClick={onGoHome} className="hover:text-white flex items-center gap-1.5 transition-colors">
          <Home className="w-4 h-4" /> Home
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        <button onClick={onBack} className="hover:text-emerald-400 transition-colors truncate max-w-[150px] sm:max-w-[200px]">
          {subject.name}
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        <span className="text-emerald-400">{chapterName}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{chapterName}</h1>
          <p className="text-slate-400 text-sm">টপিক নির্বাচন করুন (Select Topic)</p>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {/* Full Chapter Button */}
        <button
          onClick={() => handleTopicClick(null)}
          className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-slate-800 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/80 cursor-pointer"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-medium text-lg text-slate-200">সম্পূর্ণ অধ্যায় (Full Chapter)</span>
              <p className="text-sm text-slate-400">{questions.length} টি প্রশ্ন ({questions.length} Questions)</p>
            </div>
          </div>
        </button>

        {/* 12 Academic Topics */}
        {topics.map((topic, index) => {
          const qCount = getTopicQuestionCount(topic);
          return (
            <button
              key={index}
              onClick={() => handleTopicClick(topic)}
              className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-slate-800 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/80 cursor-pointer"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 shrink-0">
                  <span className="font-semibold">{index + 1}</span>
                </div>
                <div>
                  <span className="font-medium text-base sm:text-lg text-slate-200 leading-snug block">{topic}</span>
                  <p className="text-xs sm:text-sm text-slate-400">{qCount} টি প্রশ্ন</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mode Selection Modal */}
      {selectedTopicForMode !== undefined && !showExamSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setSelectedTopicForMode(undefined)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-2">মোড নির্বাচন করুন (Select Mode)</h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              আপনি কীভাবে এই টপিকটি অনুশীলন করতে চান?
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleStartPracticeMode}
                className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-700 bg-slate-800/50 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-left group cursor-pointer"
              >
                <div className="bg-emerald-500/20 p-3 rounded-xl group-hover:bg-emerald-500/30 transition-colors">
                  <BookOpen className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">অনুশীলন মোড (Practice Mode)</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    প্রতিটি প্রশ্নের পর সঠিক উত্তর ও ব্যাখ্যা দেখুন। অনুশীলনের জন্য সেরা।
                  </p>
                </div>
              </button>

              <button
                onClick={handleOpenExamSetup}
                className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-700 bg-slate-800/50 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all text-left group cursor-pointer"
              >
                <div className="bg-indigo-500/20 p-3 rounded-xl group-hover:bg-indigo-500/30 transition-colors">
                  <GraduationCap className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">পরীক্ষা মোড (Real Exam Mode)</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    নিজের পছন্দের প্রশ্ন সংখ্যা ও সময় নির্ধারণ করে রিয়েল পরীক্ষা দিন।
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Academic Exam Setup Modal */}
      {selectedTopicForMode !== undefined && showExamSetup && (
        <AcademicExamSetupModal
          isOpen={showExamSetup}
          topicName={selectedTopicForMode ? selectedTopicForMode : 'সম্পূর্ণ অধ্যায় (Full Chapter)'}
          totalAvailableQuestions={getTopicQuestionCount(selectedTopicForMode)}
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
