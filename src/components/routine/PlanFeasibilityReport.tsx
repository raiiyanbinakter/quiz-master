import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  PieChart,
  Sliders,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { StudyPlan } from '../../types/routine';
import { DEMO_SYLLABUS_TOPICS } from '../../data/routineSeedData';
import { validatePlanFeasibility } from '../../utils/routinePlanner';

interface PlanFeasibilityReportProps {
  plan: StudyPlan;
  onReplan: () => void;
}

export const PlanFeasibilityReport: React.FC<PlanFeasibilityReportProps> = ({
  plan,
  onReplan,
}) => {
  const relevantTopics = DEMO_SYLLABUS_TOPICS.filter(
    t => t.route === plan.route || plan.selectedTopicIds.includes(t.id)
  );

  const todayStr = new Date().toISOString().split('T')[0];
  const feasibility = validatePlanFeasibility(
    relevantTopics,
    todayStr,
    plan.targetExamDate,
    plan.availability,
    plan.commitments,
    plan.preferences
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <PieChart className="w-6 h-6 text-amber-400" /> প্ল্যান সম্ভাব্যতা ও বাফার রিপোর্ট (Feasibility Report)
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          আপনার বরাদ্দকৃত সময় এবং সিলেবাসের চাহিদার গাণিতিক সামঞ্জস্য পরীক্ষা করা হয়েছে।
        </p>
      </div>

      {/* Main Status Meter */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
        feasibility.isFeasible
          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100'
          : 'bg-rose-950/30 border-rose-500/50 text-rose-100'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {feasibility.isFeasible ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-rose-400" />
            )}
            <div>
              <h3 className="text-xl font-bold">
                {feasibility.isFeasible ? 'রুটিন টি সম্পূর্ণ বাস্তবায়নযোগ্য (Plan Feasible)' : 'রুটিনে সময়ের ঘাটতি দেখা দিয়েছে (Plan Infeasible)'}
              </h3>
              <p className="text-xs text-slate-300">
                {feasibility.isFeasible
                  ? `আপনার কাছে ${feasibility.shortfallOrSurplusMinutes} মিনিট অতিরিক্ত সারপ্লাস সময় রয়েছে।`
                  : `পরিকল্পনাটি সম্পন্ন করতে আরও ${Math.abs(feasibility.shortfallOrSurplusMinutes)} মিনিটের সময় প্রয়োজন।`}
              </p>
            </div>
          </div>

          <button
            onClick={onReplan}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> রুটিন এডজাস্ট করুন
          </button>
        </div>

        {/* Math Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-slate-200">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80">
            <div className="text-xs text-slate-400 mb-1">মোট ফ্রি সময় (Total Available)</div>
            <div className="text-xl font-bold text-white">{feasibility.totalAvailableMinutes} মিনিট</div>
            <div className="text-[11px] text-slate-400">পরীক্ষার আগ পর্যন্ত মোট ফ্রি ব্লক</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80">
            <div className="text-xs text-slate-400 mb-1">২০% বাফার বাদে বরাদ্দযোগ্য সময়</div>
            <div className="text-xl font-bold text-emerald-300">{feasibility.usableMinutesAfterBuffer} মিনিট</div>
            <div className="text-[11px] text-slate-400">জরুরি কাজের জন্য ২০% সংরক্ষিত</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80">
            <div className="text-xs text-slate-400 mb-1">সিলেবাসের চাহিদা (Required)</div>
            <div className="text-xl font-bold text-indigo-300">{feasibility.totalRequiredMinutes} মিনিট</div>
            <div className="text-[11px] text-slate-400">{relevantTopics.length} টি সিলেবাস টপিক</div>
          </div>
        </div>
      </div>

      {/* Suggested Actions if Infeasible or Notice */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl space-y-3">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-400" /> সুপারিশকৃত অ্যাকশন (Actionable Choices):
        </h3>

        <div className="space-y-2 text-xs text-slate-300">
          {feasibility.suggestions.map((sug, i) => (
            <div key={i} className="bg-slate-900/60 p-3 rounded-xl border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>{sug}</span>
            </div>
          ))}

          {feasibility.isFeasible && (
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700 text-slate-300">
              ✓ বর্তমান সময়সূচি অনুযায়ী আপনি প্রতিদিন নির্দিষ্ট সেশনে ভাগ করে পড়ালেখা শেষ করতে পারবেন। অতিরিক্ত সময় থাকলে প্রতিদিন রিভিশনের পরিমাণ বাড়াতে পারেন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
