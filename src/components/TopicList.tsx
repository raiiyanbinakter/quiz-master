import React from 'react';
import { ArrowLeft, BookOpen, Layers, X, GraduationCap } from 'lucide-react';
import { Subject, Question } from '../types';

interface TopicListProps {
  subject: Subject;
  chapterIndex: number;
  questions: Question[];
  onBack: () => void;
  onSelectTopic: (topic: string | null, mode: 'quiz' | 'exam') => void;
}

export default function TopicList({ subject, chapterIndex, questions, onBack, onSelectTopic }: TopicListProps) {
  const chapterName = subject.chapters[chapterIndex];
  
  // Extract unique topics
  const topics = Array.from(new Set(questions.map(q => q.topic).filter(Boolean))) as string[];

  const [selectedTopicForMode, setSelectedTopicForMode] = React.useState<string | null | undefined>(undefined);

  const handleTopicClick = (topic: string | null) => {
    setSelectedTopicForMode(topic);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{chapterName}</h1>
          <p className="text-slate-400 text-sm">টপিক নির্বাচন করুন</p>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        <button
          onClick={() => handleTopicClick(null)}
          className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-slate-800 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/80 cursor-pointer"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-medium text-lg text-slate-200">সম্পূর্ণ অধ্যায়</span>
              <p className="text-sm text-slate-400">{questions.length} টি প্রশ্ন</p>
            </div>
          </div>
        </button>

        {topics.map((topic, index) => {
          const topicQuestions = questions.filter(q => q.topic === topic);
          return (
            <button
              key={index}
              onClick={() => handleTopicClick(topic)}
              className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-slate-800 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/80 cursor-pointer"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400">
                  <span className="font-semibold">{index + 1}</span>
                </div>
                <div>
                  <span className="font-medium text-lg text-slate-200">{topic}</span>
                  <p className="text-sm text-slate-400">{topicQuestions.length} টি প্রশ্ন</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mode Selection Modal */}
      {selectedTopicForMode !== undefined && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setSelectedTopicForMode(undefined)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-2">মোড নির্বাচন করুন</h2>
            <p className="text-slate-400 mb-8">আপনি কীভাবে এই টপিকটি অনুশীলন করতে চান?</p>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  onSelectTopic(selectedTopicForMode, 'quiz');
                  setSelectedTopicForMode(undefined);
                }}
                className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-700 bg-slate-800/50 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-left group"
              >
                <div className="bg-emerald-500/20 p-3 rounded-xl group-hover:bg-emerald-500/30 transition-colors">
                  <BookOpen className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">কুইজ মোড</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">প্রতিটি প্রশ্নের পর সঠিক উত্তর ও ব্যাখ্যা দেখুন। অনুশীলনের জন্য সেরা।</p>
                </div>
              </button>

              <button
                onClick={() => {
                  onSelectTopic(selectedTopicForMode, 'exam');
                  setSelectedTopicForMode(undefined);
                }}
                className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-700 bg-slate-800/50 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-left group"
              >
                <div className="bg-blue-500/20 p-3 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">এক্সাম মোড</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">সবগুলো প্রশ্নের উত্তর দেওয়ার পর একসাথে ফলাফল ও ব্যাখ্যা দেখুন।</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
