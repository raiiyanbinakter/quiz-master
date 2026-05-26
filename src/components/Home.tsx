import React from 'react';
import { BookOpen, Sparkles, Trophy, ShoppingBag, GraduationCap, Stethoscope, Building2, CheckCircle, ChevronRight } from 'lucide-react';

interface HomeProps {
  onSelectCategory: (category: 'academic' | 'board' | 'medical' | 'varsity') => void;
  onShowLeaderboard: () => void;
  onShowShop: () => void;
}

export default function Home({ onSelectCategory, onShowLeaderboard, onShowShop }: HomeProps) {
  const CATEGORIES = [
    {
      id: 'academic',
      title: 'অনুশীলনী',
      subTitle: 'Academic Practice',
      desc: 'অধ্যায়ভিত্তিক MCQ অনুশীলন ও পঠিত বিষয়ের সঠিক মূল্যায়ন।',
      icon: BookOpen,
      gradient: 'from-blue-600/20 via-blue-900/10 to-slate-900',
      borderColor: 'group-hover:border-blue-500/50 border-slate-800',
      accentColor: 'text-blue-400 bg-blue-500/10'
    },
    {
      id: 'board',
      title: 'বোর্ড প্রিপারেশন',
      subTitle: 'Board Prep',
      desc: 'বিগত বছরগুলোর ফাইনাল বোর্ড প্রশ্নের সমাধান ও পূর্ণাঙ্গ পরীক্ষা।',
      icon: CheckCircle,
      gradient: 'from-purple-600/20 via-purple-900/10 to-slate-900',
      borderColor: 'group-hover:border-purple-500/50 border-slate-800',
      accentColor: 'text-purple-400 bg-purple-500/10'
    },
    {
      id: 'medical',
      title: 'মেডিকেল প্রিপারেশন',
      subTitle: 'Medical Prep',
      desc: 'মেডিকেল ও ডেন্টাল অ্যাডমিশন টেস্টের জন্য বিশেষ গুরুত্বপূর্ণ প্রশ্নব্যাংক।',
      icon: Stethoscope,
      gradient: 'from-rose-600/20 via-rose-900/10 to-slate-900',
      borderColor: 'group-hover:border-rose-500/50 border-slate-800',
      accentColor: 'text-rose-400 bg-rose-500/10'
    },
    {
      id: 'varsity',
      title: 'ভার্সিটি প্রিপারেশন',
      subTitle: 'Varsity Prep',
      desc: 'GST ভর্তি পরীক্ষা, DCU ICU ইউনিট এবং শীর্ষ বিশ্ববিদ্যালয়ের বিশেষ প্রস্তুতি।',
      icon: Building2,
      gradient: 'from-amber-600/20 via-amber-900/10 to-slate-900',
      borderColor: 'group-hover:border-amber-500/50 border-slate-800',
      accentColor: 'text-amber-400 bg-amber-500/10'
    }
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-in fade-in duration-300">
      {/* Premium Sleek Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-emerald-500/15 p-3.5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.15)] border border-emerald-500/20 animate-pulse">
            <GraduationCap className="w-9 h-9 text-emerald-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-2">
            Learning Portal
            <Sparkles className="w-6 h-6 text-amber-400" />
          </h1>
        </div>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          মাস্টার করুন আপনার সিলেবাস, বোর্ড প্রিপারেশন এবং অ্যাডমিশন যুদ্ধ। অভিজ্ঞতার নতুন অধ্যায়ে স্বাগতম।
        </p>

        {/* Global actions: Leaderboard & Loot Shop side-by-side */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <button
            onClick={onShowLeaderboard}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 px-6 py-4 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all shadow-lg group"
          >
            <Trophy className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-white font-extrabold text-sm">Leaderboard</span>
              <span className="block text-slate-500 text-xs text-nowrap">Global Standings</span>
            </div>
          </button>

          <button
            onClick={onShowShop}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 bg-gradient-to-br from-slate-900 to-slate-900/60 hover:from-slate-800 hover:to-slate-800 px-6 py-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all shadow-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <ShoppingBag className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <div className="text-left relative z-10">
              <span className="block text-white font-extrabold text-sm">Loot Shop</span>
              <span className="block text-cyan-500/70 text-xs text-nowrap">Avatars & Borders</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Core Pathway Section */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h2 className="text-xl font-black text-white uppercase tracking-wider">শিক্ষা মাধ্যম নির্বাচন করুন (Choose Pathway)</h2>
      </div>

      {/* Grid of the 4 Category Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group text-left p-8 rounded-3xl bg-gradient-to-br ${cat.gradient} border ${cat.borderColor} transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1 block w-full relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${cat.accentColor} border border-white/5 group-hover:scale-105 transition-transform duration-300 shadow-inner`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <div className="bg-slate-850 p-2 rounded-full border border-slate-800 text-slate-500 group-hover:text-white group-hover:bg-slate-850 transition-all duration-300">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors leading-none">
                    {cat.title}
                  </h3>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">
                    {cat.subTitle}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                  {cat.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
