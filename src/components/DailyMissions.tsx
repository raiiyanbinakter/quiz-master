import React, { useState } from 'react';
import { Coins, Check, Gift, Hourglass, Sparkles, Flame, CheckCircle, MessageSquare, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { uiCopy } from '../content/uiCopy';

interface DailyMissionsProps {
  userData: any;
  onClaimReward: (missionId: string) => void;
}

export default function DailyMissions({ userData, onClaimReward }: DailyMissionsProps) {
  const missions = userData?.dailyMissions || [];
  const [claimingId, setClaimingId] = useState<string | null>(null);

  // Helper to get remaining time until next UTC day reset
  const getHoursToReset = () => {
    const now = new Date();
    const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const diffMs = tomorrow.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHrs}h ${diffMins}m`;
  };

  const [timeToReset, setTimeToReset] = React.useState(getHoursToReset());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeToReset(getHoursToReset());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = async (missionId: string) => {
    setClaimingId(missionId);
    // Add a tiny delay to make the claim reward sound/feel organic
    setTimeout(() => {
      onClaimReward(missionId);
      setClaimingId(null);
    }, 6000); // Give user some luxury fireworks feedback
  };

  // Icon mapping helper
  const getMissionIcon = (id: string) => {
    switch (id) {
      case 'mcq_correct':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'upvote_doubt':
        return <ThumbsUp className="w-5 h-5 text-cyan-400" />;
      case 'post_doubt':
        return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getMissionTheme = (id: string) => {
    switch (id) {
      case 'mcq_correct':
        return {
          bg: 'bg-gradient-to-r from-orange-500/10 to-transparent',
          border: 'border-orange-500/25 hover:border-orange-500/50',
          progressColor: 'bg-orange-500',
        };
      case 'upvote_doubt':
        return {
          bg: 'bg-gradient-to-r from-cyan-500/10 to-transparent',
          border: 'border-cyan-500/25 hover:border-cyan-500/50',
          progressColor: 'bg-cyan-500',
        };
      case 'post_doubt':
        return {
          bg: 'bg-gradient-to-r from-emerald-500/10 to-transparent',
          border: 'border-emerald-500/25 hover:border-emerald-500/50',
          progressColor: 'bg-emerald-500',
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-slate-950 to-transparent',
          border: 'border-slate-800 hover:border-slate-700',
          progressColor: 'bg-yellow-500',
        };
    }
  };

  const completedCount = missions.filter((m: any) => m.isCompleted).length;
  const claimedAll = missions.length > 0 && missions.every((m: any) => m.isClaimed);

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header section with Reset Countdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg">
              <Gift className="w-5 h-5 animate-bounce" />
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              {uiCopy.dailyMissions.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            {uiCopy.dailyMissions.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-2xl border border-slate-800/80 self-start sm:self-center">
          <Hourglass className="w-4 h-4 text-amber-500 animate-spin duration-[4000ms]" />
          <div className="text-left font-mono">
            <span className="block text-[9px] uppercase tracking-wider text-slate-500 leading-none">Next Reset</span>
            <span className="text-xs text-amber-400 font-bold">{timeToReset}</span>
          </div>
        </div>
      </div>

      {/* Summary progress widget */}
      <div className="flex items-center justify-between bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sm font-black text-slate-100">
            {completedCount}/{missions.length || 3}
          </div>
          <div>
            <span className="block text-slate-300 text-sm font-bold">Daily Progress</span>
            <span className="block text-xs text-slate-400">
              {claimedAll 
                ? "All claimed! Standard job, Scholar! 🌟" 
                : `${missions.filter((m: any) => m.isCompleted && !m.isClaimed).length} ready to claim`}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-slate-500 text-[10px] uppercase tracking-wider font-mono">Daily Target</span>
          <span className="text-emerald-400 text-xs font-bold leading-none flex items-center gap-1 justify-end">
            <Coins className="w-3.5 h-3.5" />
            Get Bonus Coins
          </span>
        </div>
      </div>

      {/* Missions list */}
      <div className="space-y-4">
        {missions.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm font-medium">
            Loading daily challenges...
          </div>
        ) : (
          missions.map((mission: any) => {
            const theme = getMissionTheme(mission.id);
            const progressPercent = Math.min(100, (mission.current / mission.target) * 100);
            const canClaim = mission.isCompleted && !mission.isClaimed;

            return (
              <div 
                key={mission.id}
                className={`p-4 rounded-2xl border ${theme.border} ${theme.bg} transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
                      {getMissionIcon(mission.id)}
                    </div>
                    <div>
                      {/* Bangla Title */}
                      <h4 className="text-sm font-black text-white leading-tight">
                        {mission.banglaTitle}
                      </h4>
                      {/* English Title / Goal subtitle */}
                      <p className="text-[11px] text-slate-400 font-medium">
                        {mission.title}
                      </p>
                    </div>
                  </div>

                  {/* Progress tracker bar */}
                  <div className="space-y-1 pl-12">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>Progress</span>
                      <span className="font-bold text-slate-200">
                        {mission.current} / {mission.target}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                      <div 
                        style={{ width: `${progressPercent}%` }}
                        className={`h-full ${theme.progressColor} rounded-full transition-all duration-500`}
                      />
                    </div>
                  </div>
                </div>

                {/* Reward & Claim Actions side */}
                <div className="flex items-center sm:flex-col justify-between sm:justify-center gap-3 shrink-0 sm:border-l sm:border-slate-800/80 sm:pl-6 min-w-[120px]">
                  <div className="text-left sm:text-center shrink-0">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block leading-none">Reward</span>
                    <span className="text-amber-400 font-extrabold text-sm flex items-center gap-1 justify-start sm:justify-center mt-1">
                      <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
                      +{mission.reward}
                    </span>
                  </div>

                  <div className="shrink-0">
                    {mission.isClaimed ? (
                      <div className="flex items-center gap-1 text-[11px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        <span>{uiCopy.dailyMissions.claimed}</span>
                      </div>
                    ) : canClaim ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleClaim(mission.id)}
                        disabled={claimingId === mission.id}
                        className="relative group bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 text-xs font-black px-4 py-1.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all flex items-center gap-1 pointer-events-auto cursor-pointer"
                      >
                        {claimingId === mission.id ? (
                          <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-spin" />
                        )}
                        <span>{uiCopy.dailyMissions.claimReward}</span>
                        {/* Shimmer overlay effect */}
                        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-white/20 rounded-b-xl group-hover:bg-white/30" />
                      </motion.button>
                    ) : (
                      <div className="text-[10px] text-slate-500 font-mono tracking-wide bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 text-center">
                        Locked
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
