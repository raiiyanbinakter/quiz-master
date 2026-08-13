import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  BookOpen,
  TrendingUp,
  Brain
} from 'lucide-react';
import { StudyPlan } from '../../types/routine';

interface RoutineInsightsProps {
  plan: StudyPlan;
}

export const RoutineInsights: React.FC<RoutineInsightsProps> = ({ plan }) => {
  const totalSessions = plan.sessions.length;
  const completedSessions = plan.sessions.filter(s => s.status === 'completed').length;
  const skippedSessions = plan.sessions.filter(s => s.status === 'skipped').length;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  const totalMinutes = plan.sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const completedMinutes = plan.sessions
    .filter(s => s.status === 'completed')
    .reduce((acc, s) => acc + (s.checkIn?.durationSpentMinutes || s.durationMinutes), 0);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" /> রুটিন পারফরম্যান্স ইনসাইটস (Routine Insights)
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            আপনার পড়ালেখার রিয়েল-টাইম তথ্য, অর্জিত সময় এবং কুইজ পারফরম্যান্স অ্যানালিটিক্স।
          </p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-400">সেশন কমপ্লিশন রেট</div>
            <div className="text-2xl font-bold text-white">{completionRate}%</div>
            <div className="text-xs text-slate-500">{completedSessions} টি সম্পন্ন / {skippedSessions} টি স্কিপড</div>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-400">পড়াশোনায় ব্যয়িত সময়</div>
            <div className="text-2xl font-bold text-white">{completedMinutes} মিনিট</div>
            <div className="text-xs text-slate-500">পরিকল্পিত: {totalMinutes} মিনিট</div>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3.5 bg-amber-500/20 text-amber-400 rounded-xl">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-slate-400">কুইজ অ্যাকুরেসি ডাটা</div>
            <div className="text-base font-bold text-amber-300">More quiz data needed</div>
            <div className="text-xs text-slate-500">কুইজ দিলে দুর্বল টপিকের তথ্য মিলবে</div>
          </div>
        </div>
      </div>

      {/* Detail Breakdown */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" /> পড়ালেখার নিয়মিতকরণ ও রিভিশন সাইকেল
        </h3>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-700 space-y-3">
          <h4 className="font-semibold text-sm text-slate-300">Spaced Practice (১, ৩, ৭, ১৪ দিন) অটো-ট্র্যাকিং:</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            স্মার্ট রুটিন স্বয়ংক্রিয়ভাবে আপনার সম্পন্ন করা টপিকগুলোকে নির্দিষ্ট ব্যবধানে রিভিশন সেশন হিসেবে শিডিউল করে। কোনো টপিক ভুল হলে বা কুইজে কম মার্ক পেলে দুর্বলতা স্কোর বাড়িয়ে রিভিশনের গুরুত্ব স্বয়ংক্রিয়ভাবে বৃদ্ধি করা হয়।
          </p>
        </div>
      </div>
    </div>
  );
};
