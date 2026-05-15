import React from 'react';
import { BookOpen, Sparkles, Dna, Microscope, Ruler, Calculator, FlaskConical, Beaker, Atom, Zap } from 'lucide-react';
import { syllabus } from '../data/syllabus';

const iconMap: Record<string, React.ElementType> = {
  Dna, Microscope, Ruler, Calculator, FlaskConical, Beaker, Atom, Zap
};

interface HomeProps {
  onSelectSubject: (subjectId: string) => void;
}

export default function Home({ onSelectSubject }: HomeProps) {
  // Group subjects by category
  const categories = Array.from(new Set(syllabus.map(s => s.category || 'অন্যান্য')));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-emerald-500/20 p-3 rounded-2xl">
            <BookOpen className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-2">
            কুইজ মাস্টার
            <Sparkles className="w-6 h-6 text-amber-400" />
          </h1>
        </div>
        <p className="text-slate-400 text-lg">
          অধ্যায়ভিত্তিক MCQ অনুশীলন করুন এবং পরীক্ষায় ভালো ফলাফল অর্জন করুন
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-12">
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">{category}</h2>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {syllabus
              .filter(s => (s.category || 'অন্যান্য') === category)
              .map((subject) => {
                const Icon = iconMap[subject.icon] || BookOpen;
                return (
                  <button
                    key={subject.id}
                    onClick={() => onSelectSubject(subject.id)}
                    className={`relative overflow-hidden text-left p-6 rounded-2xl bg-gradient-to-br ${subject.color} border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 group`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-white/10 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="bg-slate-900/50 px-3 py-1 rounded-full text-xs font-medium text-slate-300 border border-slate-700/50">
                        {subject.chapters.length} অধ্যায়
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{subject.name}</h3>
                    <p className="text-sm text-slate-400">মোট {subject.chapters.length}টি অধ্যায় • MCQ অনুশীলন</p>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
