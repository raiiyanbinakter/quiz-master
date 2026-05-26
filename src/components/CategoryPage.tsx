import React, { useState } from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Trophy, ChevronRight, Stethoscope, CheckCircle, Building2 } from 'lucide-react';
import { Subject } from '../types';

interface CategoryPageProps {
  category: 'academic' | 'board' | 'medical' | 'varsity';
  syllabus: Subject[];
  onSelectSubject: (subjectId: string) => void;
  onBack: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Stethoscope, CheckCircle, Building2
};

export default function CategoryPage({ category, syllabus, onSelectSubject, onBack }: CategoryPageProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<'GST' | 'DCU' | null>(null);

  // Map category to localized user-friendly titles and icons
  const categoryMeta = {
    academic: {
      title: 'অনুশীলনী (Academic Practice)',
      desc: 'অধ্যায়ভিত্তিক MCQ অনুশীলন করুন এবং প্রাতিষ্ঠানিক পরীক্ষায় সেরা প্রস্তুতি নিন',
      icon: BookOpen,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    board: {
      title: 'বোর্ড প্রিপারেশন (Board Prep)',
      desc: 'বিগত বছরগুলোর বোর্ড ফাইনাল প্রশ্ন সমাধান এবং অধ্যায়ভিত্তিক প্রস্তুতি',
      icon: CheckCircle,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    medical: {
      title: 'মেডিকেল প্রিপারেশন (Medical Prep)',
      desc: 'মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষার জন্য সর্বোচ্চ মানসম্মত প্রশ্নব্যাংক অনুশীলন',
      icon: Stethoscope,
      iconColor: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20'
    },
    varsity: {
      title: 'ভার্সিটি প্রিপারেশন (Varsity Prep)',
      desc: 'দেশের শীর্ষস্থানীয় বিশ্ববিদ্যালয়ের বিজ্ঞান ইউনিট ভর্তি পরীক্ষার স্পেশাল প্রস্তুতি',
      icon: Building2,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    }
  }[category];

  // Helper mapping function to organize subjects by category
  const filteredSubjects = syllabus.filter(subject => {
    const rawCategory = subject.category || 'অন্যান্য';
    
    if (category === 'academic') {
      return rawCategory === 'একাডেমিক প্রস্তুতি' || rawCategory === 'অনুশীলনী';
    }
    if (category === 'board') {
      return rawCategory.includes('বোর্ড');
    }
    if (category === 'medical') {
      return rawCategory.includes('মেডিকেল');
    }
    if (category === 'varsity') {
      const isVarsity = rawCategory.includes('GST') || rawCategory.includes('ICU') || rawCategory.includes('ভার্সিটি');
      if (!isVarsity) return false;
      
      if (selectedSubCategory === 'GST') {
        return rawCategory.includes('GST');
      }
      if (selectedSubCategory === 'DCU') {
        return rawCategory.includes('ICU');
      }
      return true; // We deal with the sub-buttons state separately
    }
    return false;
  });

  const renderSubjectCard = (subject: Subject) => {
    return (
      <button
        key={subject.id}
        onClick={() => onSelectSubject(subject.id)}
        className="relative overflow-hidden text-left p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 block w-full"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="bg-slate-800 p-3 rounded-2xl group-hover:bg-emerald-500/20 transition-colors duration-300 border border-slate-700/50">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 border border-slate-700/30">
            {subject.chapters.length} Papers / Levels
          </div>
        </div>
        <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-tight">
          {subject.name}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {subject.chapters.length}টি স্পেশাল লেভেলে সম্পূর্ণ MCQ পরীক্ষার সমৃদ্ধ আয়োজন।
        </p>
      </button>
    );
  };

  const MetaIcon = categoryMeta.icon;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Back to Home and Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium bg-slate-900/50 p-3 rounded-2xl border border-slate-800 w-fit">
        <button onClick={onBack} className="hover:text-white transition-colors flex items-center gap-1">
          Home
        </button>
        <ChevronRight className="w-4 h-4 text-slate-600" />
        <span className="text-emerald-400">{categoryMeta.title}</span>
        {category === 'varsity' && selectedSubCategory && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-amber-400">{selectedSubCategory === 'GST' ? 'GST Exam' : 'DCU ICU Unit'}</span>
          </>
        )}
      </div>

      {/* Header Panel */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40 rounded-3xl p-6 sm:p-8 border border-slate-800/80 flex flex-col md:flex-row gap-6 items-center justify-between shadow-2xl mb-10">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className={`${categoryMeta.bgColor} ${categoryMeta.iconColor} p-4 rounded-3xl border ${categoryMeta.borderColor} shrink-0`}>
            <MetaIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{categoryMeta.title}</h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">{categoryMeta.desc}</p>
          </div>
        </div>
        <button
          onClick={() => {
            if (category === 'varsity' && selectedSubCategory) {
              setSelectedSubCategory(null);
            } else {
              onBack();
            }
          }}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors border border-slate-700 shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{category === 'varsity' && selectedSubCategory ? 'Back to Sub-Categories' : 'Home Dashboard'}</span>
        </button>
      </div>

      {/* Varsity Prep Sub-Category Mode Selector */}
      {category === 'varsity' && !selectedSubCategory ? (
        <div className="flex flex-col space-y-6">
          <h2 className="text-slate-200 font-extrabold text-xl mb-2 flex items-center gap-2">
            <div className="w-2.5 h-6 bg-amber-500 rounded-full"></div>
            অ্যাডমিশন সাব-ক্যাটাগরি নির্বাচন করুন
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setSelectedSubCategory('GST')}
              className="group relative overflow-hidden text-left p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between min-h-[180px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-between items-start">
                <div className="bg-amber-500/10 p-4 rounded-2xl text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <ChevronRight className="w-6 h-6 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors mb-1">
                  GST Exam
                </h3>
                <p className="text-slate-400 text-sm">
                  গুচ্ছ অধিভুক্ত বিশ্ববিদ্যালয় সমূহের বিজ্ঞান ইউনিট ভর্তি প্রস্তুতি
                </p>
              </div>
            </button>

            <button
              onClick={() => setSelectedSubCategory('DCU')}
              className="group relative overflow-hidden text-left p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5 flex flex-col justify-between min-h-[180px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-between items-start">
                <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <Building2 className="w-8 h-8" />
                </div>
                <ChevronRight className="w-6 h-6 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors mb-1">
                  DCU ICU Unit
                </h3>
                <p className="text-slate-400 text-sm">
                  স্পেশাল ICU ইউনিট ক্যাটাগরি এবং অধ্যায়ভিত্তিক বিশেষ অ্যাডমিশন টেস্ট
                </p>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Grid of Subjects in selected category / sub-category */
        <div>
          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {filteredSubjects.map(renderSubjectCard)}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800/80">
              <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">কোর্সসমূহ খুব শীঘ্রই আসছে</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                আমাদের এডুকেশন প্যানেলে এই ক্যাটাগরিতে নতুন এক্সাম কোর্স তৈরির কাজ চলছে। দ্রুতই যুক্ত করা হবে!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
