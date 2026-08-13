import React from 'react';
import { Target, CheckCircle2, RotateCcw, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { StudentGameProfile, DailyGoal } from '../types/gamification';
import { DEFAULT_DAILY_GOALS, getOrResetDailyGoals } from '../utils/gamification';

interface DailyMissionsProps {
  userData?: any;
  gameProfile?: StudentGameProfile | null;
  onNavigateToRoutine?: (options?: { openAddTask?: boolean; focusToday?: boolean }) => void;
  onNavigateToCategory?: () => void;
}

export default function DailyMissions({
  gameProfile,
  onNavigateToRoutine,
  onNavigateToCategory
}: DailyMissionsProps) {
  const todayStr = new Date().toISOString().split('T')[0];
  const { dailyGoals } = getOrResetDailyGoals(
    gameProfile?.dailyGoals,
    gameProfile?.dailyGoalDate,
    todayStr
  );

  const completedCount = dailyGoals.filter(g => g.completed || g.current >= g.target).length;
  const allCompleted = completedCount === dailyGoals.length && dailyGoals.length > 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <Target className="w-5 h-5 text-indigo-400" />
            আজকের লক্ষ্য
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            ছোট কাজ শেষ করুন, নিয়মিত অগ্রগতি তৈরি করুন
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs font-bold text-slate-300">
            আজ ৩টির মধ্যে <span className="text-indigo-400">{completedCount}টি</span> লক্ষ্য সম্পন্ন হয়েছে
          </div>
          {onNavigateToRoutine && (
            <button
              onClick={() => onNavigateToRoutine({ openAddTask: true })}
              className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>লক্ষ্য তৈরি করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* GOALS LIST */}
      <div className="space-y-3.5">
        {dailyGoals.map((goal) => {
          const isDone = goal.completed || goal.current >= goal.target;
          const progressPercent = Math.min(100, Math.round((goal.current / goal.target) * 100));

          return (
            <div 
              key={goal.id}
              className={`p-4 rounded-2xl border transition-all ${
                isDone 
                  ? 'bg-emerald-500/5 border-emerald-500/30' 
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {goal.id === 'complete_quiz' && <BookOpen className="w-4 h-4" />}
                    {goal.id === 'complete_review' && <RotateCcw className="w-4 h-4" />}
                    {goal.id === 'focused_minutes' && <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {goal.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {goal.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 pl-11">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>অগ্রগতি</span>
                    <span className="font-bold text-slate-300">
                      {goal.current} / {goal.target} {goal.id === 'focused_minutes' ? 'মিনিট' : ''}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      style={{ width: `${progressPercent}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDone ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex justify-end items-center gap-2">
                {isDone ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>সম্পন্ন</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 font-medium">
                    চলছে
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {allCompleted && (
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 text-center text-xs font-bold text-indigo-300 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span>আজকের লক্ষ্যগুলো সম্পন্ন হয়েছে। চাইলে আগামীকালের জন্য পরিকল্পনা করুন।</span>
        </div>
      )}

    </div>
  );
}
