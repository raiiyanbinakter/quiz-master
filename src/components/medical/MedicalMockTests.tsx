import React from 'react';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Play, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { MedicalMockTest } from '../../types/medical';

interface MedicalMockTestsProps {
  onBack: () => void;
  mockTests?: MedicalMockTest[];
  onStartMockTest?: (test: MedicalMockTest) => void;
}

export default function MedicalMockTests({
  onBack,
  mockTests = [],
  onStartMockTest
}: MedicalMockTestsProps) {
  // Only published verified mock tests
  const activeMockTests = mockTests.filter(
    t => t.route === 'medical' && t.isPublished && t.sourceStatus === 'verified'
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER & BACK BUTTON */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ড্যাশবোর্ডে ফিরে যান</span>
        </button>

        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5">
          <Award className="w-4 h-4" />
          <span>মক টেস্ট</span>
        </div>
      </div>

      {/* TITLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white">
          মেডিকেল পূর্ণাঙ্গ মক টেস্ট
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          অফিসিয়াল প্রশ্নকাঠামো ও রিয়েল টাইম টাইমার সহ মডেল ভর্তি পরীক্ষা।
        </p>
      </div>

      {/* ACTIVE MOCK TESTS LIST OR HONEST EMPTY STATE */}
      {activeMockTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMockTests.map((test) => (
            <div
              key={test.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-xl text-[11px] font-bold">
                    মেডিকেল অ্যাডমিশন
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    যাচাইকৃত
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white">
                  {test.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {test.coverageDescription}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-300 font-semibold">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    <span>{test.questionIds?.length || 0} টি প্রশ্ন</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-300 font-semibold">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{test.timeLimitMinutes} মিনিট</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
                <button
                  onClick={() => onStartMockTest && onStartMockTest(test)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>মক টেস্ট শুরু করুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* HONEST EMPTY STATE */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4 shadow-xl max-w-xl mx-auto">
          <div className="w-16 h-16 bg-slate-800 border border-slate-700 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              মক টেস্ট শিগগিরই আসছে
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              যাচাইকৃত প্রশ্ন ও পরীক্ষার কাঠামো যোগ হলে এখানে পূর্ণাঙ্গ মক টেস্ট পাওয়া যাবে।
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
