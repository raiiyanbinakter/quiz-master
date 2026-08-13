import React from 'react';
import { 
  BookOpen, 
  History, 
  FileText, 
  Award, 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  Dna,
  FlaskConical,
  Atom,
  Languages,
  Globe
} from 'lucide-react';
import { StudentGameProfile } from '../../types/gamification';

interface MedicalDashboardProps {
  onNavigate: (view: string) => void;
  onOpenRouteSetup: () => void;
  gameProfile?: StudentGameProfile | null;
  onSelectSubjectForPractice?: (subjectId: string) => void;
}

export default function MedicalDashboard({
  onNavigate,
  onOpenRouteSetup,
  gameProfile,
  onSelectSubjectForPractice
}: MedicalDashboardProps) {
  const currentStreak = gameProfile?.currentStreak || 0;
  const progressPoints = gameProfile?.progressPoints || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                মেডিকেল পথ
              </span>
              
              <button
                onClick={onOpenRouteSetup}
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>পথ পরিবর্তন করুন</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              মেডিকেল ভর্তি প্রস্তুতি
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              বিষয়ভিত্তিক অনুশীলন, পরীক্ষা ও রিভিশন পরিকল্পনা এক জায়গায়।
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl shrink-0">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-bold">পয়েন্ট</div>
              <div className="text-base font-extrabold text-cyan-400">{progressPoints}</div>
            </div>
            <div className="text-center px-3">
              <div className="text-[10px] text-slate-400 uppercase font-bold">ধারাবাহিকতা</div>
              <div className="text-base font-extrabold text-amber-400">{currentStreak} দিন</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 PRIMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* CARD A: Question Bank */}
        <div 
          onClick={() => onNavigate('medical-question-bank')}
          className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-6 rounded-3xl transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between hover:bg-slate-900/90 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                ১. অনুশীলনী প্রশ্নব্যাংক
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                অধ্যায় ও টপিকভিত্তিক প্রশ্ন অনুশীলন করুন
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
            <span>প্রশ্নব্যাংকে যান</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD B: Past Year Questions */}
        <div 
          onClick={() => onNavigate('medical-past-questions')}
          className="group bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-6 rounded-3xl transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between hover:bg-slate-900/90 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                ২. বিগত বছরের প্রশ্ন
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                বছর ও বিষয় অনুযায়ী প্রশ্ন অনুশীলন করুন
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>প্রশ্ন দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD C: Subject Test */}
        <div 
          onClick={() => onNavigate('medical-subject-tests')}
          className="group bg-slate-900 border border-slate-800 hover:border-purple-500/50 p-6 rounded-3xl transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between hover:bg-slate-900/90 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                ৩. বিষয়ভিত্তিক পরীক্ষা
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                একটি নির্দিষ্ট বিষয়ে সময় ধরে পরীক্ষা দিন
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
            <span>পরীক্ষা বেছে নিন</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD D: Model Test */}
        <div 
          onClick={() => onNavigate('medical-model-tests')}
          className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-3xl transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between hover:bg-slate-900/90 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                ১০০ নম্বর • ৫০ মিনিট
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                ৪. মডেল টেস্ট
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                ১০০ নম্বরের পূর্ণাঙ্গ পরীক্ষার পরিবেশে ৫০ মিনিটে প্রস্তুতি যাচাই করুন।
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>মডেল টেস্ট দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* EIGHT MEDICAL PREPARATION SUBJECTS GRID */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">
            মেডিকেল প্রস্তুতি বিষয়সমূহ
          </h3>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            ৮টি বিষয়
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'bio1', name: 'জীববিজ্ঞান ১ম পত্র', shortName: 'জীববিজ্ঞান ১ম', icon: Dna, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40', chapterCount: 12, hasQuestions: true },
            { id: 'bio2', name: 'জীববিজ্ঞান ২য় পত্র', shortName: 'জীববিজ্ঞান ২য়', icon: Dna, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40', chapterCount: 12, hasQuestions: true },
            { id: 'chem1', name: 'রসায়ন ১ম পত্র', shortName: 'রসায়ন ১ম', icon: FlaskConical, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40', chapterCount: 5, hasQuestions: true },
            { id: 'chem2', name: 'রসায়ন ২য় পত্র', shortName: 'রসায়ন ২য়', icon: FlaskConical, color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20 hover:border-fuchsia-500/40', chapterCount: 5, hasQuestions: true },
            { id: 'phys1', name: 'পদার্থবিজ্ঞান ১ম পত্র', shortName: 'পদার্থবিজ্ঞান ১ম', icon: Atom, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40', chapterCount: 10, hasQuestions: true },
            { id: 'phys2', name: 'পদার্থবিজ্ঞান ২য় পত্র', shortName: 'পদার্থবিজ্ঞান ২য়', icon: Atom, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20 hover:border-sky-500/40', chapterCount: 11, hasQuestions: true },
            { id: 'english', name: 'ইংরেজি', shortName: 'ইংরেজি', icon: Languages, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40', chapterCount: 6, hasQuestions: true },
            { id: 'gk', name: 'সাধারণ জ্ঞান', shortName: 'সাধারণ জ্ঞান', icon: Globe, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20 hover:border-rose-500/40', chapterCount: 5, hasQuestions: true },
          ].map(sub => {
            const Icon = sub.icon;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  if (onSelectSubjectForPractice) {
                    onSelectSubjectForPractice(sub.id);
                  } else {
                    onNavigate('medical-question-bank');
                  }
                }}
                className="p-4 bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col justify-between text-left transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${sub.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      sub.hasQuestions 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {sub.hasQuestions ? 'প্রশ্ন উপলব্ধ' : 'প্রস্তুত হচ্ছে'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {sub.name}
                    </h4>
                    {sub.chapterCount > 0 && (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {sub.chapterCount}টি অধ্যায়
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span>অনুশীলন করুন</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
