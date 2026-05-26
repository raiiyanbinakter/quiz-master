import React from 'react';

interface RankBadgeProps {
  coins: number;
  showText?: boolean;
}

export default function RankBadge({ coins, showText = true }: RankBadgeProps) {
  let rank = { name: "Rookie", icon: "🥉", color: "text-orange-400 drop-shadow-sm border-orange-500/30 bg-orange-500/10" };
  
  if (coins >= 3000) {
    rank = { name: "Legend", icon: "💎", color: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] border-cyan-400/50 bg-cyan-400/20" };
  } else if (coins >= 1500) {
    rank = { name: "Mastermind", icon: "🥇", color: "text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)] border-yellow-400/40 bg-yellow-400/10" };
  } else if (coins > 500) {
    rank = { name: "Scholar", icon: "🥈", color: "text-slate-300 drop-shadow-sm border-slate-400/30 bg-slate-400/10" };
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase border ${rank.color}`} title={`${rank.name} Rank`}>
      <span>{rank.icon}</span>
      {showText && <span>{rank.name}</span>}
    </span>
  );
}
