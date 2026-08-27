import React from 'react';
import { 
  BookOpen, 
  History, 
  Layers, 
  Award, 
  ArrowRight, 
  Compass, 
  Building2, 
  Atom, 
  FlaskConical, 
  Calculator, 
  Dna, 
  Languages, 
  Binary, 
  Globe 
} from 'lucide-react';
import { StudentGameProfile } from '../../types/gamification';
import { 
  VARSITY_UNIVERSITIES, 
  VARSITY_SUBJECT_PREPARATION_SUBJECTS 
} from '../../lib/varsityPracticeBank';

interface VarsityDashboardProps {
  onNavigate: (view: string) => void;
  onOpenRouteSetup: () => void;
  gameProfile?: StudentGameProfile | null;
  onSelectSubjectForPractice?: (subjectId: string) => void;
}

export default function VarsityDashboard({
  onNavigate,
  onOpenRouteSetup,
  gameProfile,
  onSelectSubjectForPractice
}: VarsityDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Pathway Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি • Varsity Admission Pathway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            বিশ্ববিদ্যালয় ড্যাশবোর্ড
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            ঢাকা বিশ্ববিদ্যালয়, গুচ্ছ ও অন্যান্য পাবলিক বিশ্ববিদ্যালয়ের সমন্বিত ভর্তি প্রস্তুতি ও অনুশীলন।
          </p>
        </div>

        <button
          onClick={onOpenRouteSetup}
          className="self-start sm:self-auto bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>পথ পরিবর্তন করুন</span>
        </button>
      </div>

      {/* FOUR PRIMARY WORKING MODULE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: University / Unit Practice */}
        <div 
          onClick={() => onNavigate('varsity-unit-practice')}
          className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-6 rounded-3xl transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between hover:bg-slate-900/90 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                ১. বিশ্ববিদ্যালয় / ইউনিটভিত্তিক অনুশীলন
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                ঢাকা বিশ্ববিদ্যালয়, গুচ্ছ, রাবি, জাবি, চবি ও কৃষি গুচ্ছের ইউনিটভিত্তিক সমন্বিত প্রশ্ন অনুশীলন।
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
            <span>অনুশীলন শুরু করুন</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 2: Past Year Questions */}
        <div 
          onClick={() => onNavigate('varsity-past-questions')}
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
                ঢাকা বিশ্ববিদ্যালয় ও গুচ্ছ বিশ্ববিদ্যালয়সমূহের বিগত বছরের ভর্তি পরীক্ষার প্রশ্ন সমাধান।
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>প্রশ্নব্যাংকে যান</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 3: Subject Preparation */}
        <div 
          onClick={() => onNavigate('varsity-subject-preparation')}
          className="group bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 p-6 rounded-3xl transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between hover:bg-slate-900/90 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                ৩. বিষয়ভিত্তিক প্রস্তুতি
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, উচ্চতর গণিত, বাংলা ও আইসিটি বিষয়ভিত্তিক ধারাবাহিক প্রস্তুতি।
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
            <span>প্রস্তুতি শুরু করুন</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 4: Model Test */}
        <div 
          onClick={() => onNavigate('varsity-model-test')}
          className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-3xl transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between hover:bg-slate-900/90 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                বিশ্ববিদ্যালয় স্ট্যান্ডার্ড
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                ৪. মডেল টেস্ট
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                টাইমার ও নেগেটিভ মার্কিং সহ বিশ্ববিদ্যালয়ের আদলে পূর্ণাঙ্গ মডেল টেস্ট।
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>মডেল টেস্ট দিন</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* 7 VARSITY PREPARATION SUBJECTS QUICK GRID */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">
            ভার্সিটি প্রস্তুতি বিষয়সমূহ
          </h3>
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
            {VARSITY_SUBJECT_PREPARATION_SUBJECTS.length}টি বিষয়
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {VARSITY_SUBJECT_PREPARATION_SUBJECTS.map((sub) => {
            const getIcon = () => {
              switch(sub.key) {
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
              <div
                key={sub.key}
                onClick={() => {
                  if (onSelectSubjectForPractice) {
                    onSelectSubjectForPractice(sub.key);
                  } else {
                    onNavigate('varsity-subject-preparation');
                  }
                }}
                className="bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 p-4 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${sub.bgLight} ${sub.color}`}>
                    {getIcon()}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {sub.hasPapers ? '২ পত্র' : '১ পত্র'}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {sub.name}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {sub.nameEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UNIVERSITIES COVERAGE OVERVIEW */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>অন্তর্ভুক্ত শীর্ষ বিশ্ববিদ্যালয়সমূহ</span>
          </h3>
          <span className="text-xs text-slate-400">
            {VARSITY_UNIVERSITIES.length}টি প্রধান ক্লাস্টার
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VARSITY_UNIVERSITIES.map((univ) => (
            <div
              key={univ.key}
              onClick={() => onNavigate('varsity-unit-practice')}
              className="bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 hover:border-cyan-500/30 p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {univ.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {univ.units.map(u => u.nameEn).join(' • ')}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
