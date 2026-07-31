import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { User, LogOut, Loader2, BookOpen, Settings, MessageSquare, Flame, Diamond, Zap, Crown, ShoppingBag } from 'lucide-react';
import { uiCopy } from '../content/uiCopy';

interface NavbarProps {
  user: any;
  userData?: any;
  isAdmin?: boolean;
  authLoading: boolean;
  onLogout: () => void;
  onNavigate: (view: 'home' | 'login' | 'signup' | 'profile' | 'admin' | 'feedback' | 'doubt-arena' | 'shop') => void;
  onUpgradeClick?: () => void;
  currentView: string;
}

import UserAvatar from './UserAvatar';

export default function Navbar({ user, userData, isAdmin, authLoading, onLogout, onNavigate, onUpgradeClick, currentView }: NavbarProps) {
  const [nextEnergyMins, setNextEnergyMins] = useState<number | null>(null);

  useEffect(() => {
    if (!userData || userData.isPro || userData.energy >= 5) {
      setNextEnergyMins(null);
      return;
    }
    
    const updateTimer = () => {
      const timePassedMs = Date.now() - (userData.lastEnergyUpdate || Date.now());
      const msPerEnergy = 60 * 60 * 1000;
      const remainder = timePassedMs % msPerEnergy;
      const minsLeft = 60 - Math.floor(remainder / 60000);
      setNextEnergyMins(minsLeft);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [userData]);

  // Streak Milestones configuration
  const currentStreak = userData?.currentStreak || 0;
  const isMilestone = currentStreak === 3 || currentStreak === 7 || currentStreak === 30;

  const lastPlayedStreakRef = useRef<number | null>(null);

  const triggerMilestoneEffects = useCallback(() => {
    if (!isMilestone) return;

    // 1. Premium Haptic Vibration for Mobile Devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        if (currentStreak === 3) {
          navigator.vibrate([100, 50, 100]);
        } else if (currentStreak === 7) {
          navigator.vibrate([150, 50, 150, 50, 200]);
        } else if (currentStreak === 30) {
          navigator.vibrate([200, 80, 200, 80, 300, 80, 400]);
        }
      } catch (e) {
        console.warn('Haptic vibe blocked:', e);
      }
    }

    // 2. High Quality Browser-based Sound Cue (Web Audio API)
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      let notes = [523.25, 659.25, 783.99]; // Default C5, E5, G5 for 3-Day
      let duration = 0.15;
      let waveType: OscillatorType = 'sine';

      if (currentStreak === 7) {
        notes = [523.25, 659.25, 783.99, 1046.50]; // Ascending arpeggio
        duration = 0.13;
        waveType = 'sine';
      } else if (currentStreak === 30) {
        notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // Celestial majestic arpeggio
        duration = 0.10;
        waveType = 'triangle';
      }

      const now = audioCtx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = waveType;
        osc.frequency.setValueAtTime(freq, now + idx * duration);

        gainNode.gain.setValueAtTime(0.12, now + idx * duration);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * duration + 0.25);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start(now + idx * duration);
        osc.stop(now + (idx + 1) * duration + 0.3);
      });
    } catch (e) {
      console.warn('AudioCue blocked by user preference or strict autoplay browser policy:', e);
    }
  }, [currentStreak, isMilestone]);

  // Play automatically once when the user opens or reaches the milestone
  useEffect(() => {
    if (isMilestone && lastPlayedStreakRef.current !== currentStreak) {
      triggerMilestoneEffects();
      lastPlayedStreakRef.current = currentStreak;
    } else if (!isMilestone) {
      lastPlayedStreakRef.current = null;
    }
  }, [currentStreak, isMilestone, triggerMilestoneEffects]);

  let milestoneBg = '';
  let milestoneBorder = '';
  let milestoneTextClass = '';
  let milestoneLabel = '';
  let flameColorClass = 'text-orange-500/50';
  let pulseContainerClass = '';

  if (currentStreak === 3) {
    milestoneBg = 'bg-gradient-to-r from-amber-600/20 to-orange-500/10';
    milestoneBorder = 'border-amber-500/50';
    milestoneTextClass = 'text-amber-400 font-black';
    milestoneLabel = '3-Day Fire! 🥉';
    flameColorClass = 'text-amber-400 transform scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-bounce';
    pulseContainerClass = 'ring-2 ring-amber-500/30 animate-pulse';
  } else if (currentStreak === 7) {
    milestoneBg = 'bg-gradient-to-r from-cyan-600/30 to-emerald-500/10';
    milestoneBorder = 'border-cyan-400/50';
    milestoneTextClass = 'text-cyan-300 font-extrabold';
    milestoneLabel = '7-Day Master! 🥈';
    flameColorClass = 'text-cyan-400 transform scale-115 drop-shadow-[0_0_12px_rgba(34,211,238,1)] animate-bounce';
    pulseContainerClass = 'ring-2 ring-cyan-400/40 animate-pulse';
  } else if (currentStreak === 30) {
    milestoneBg = 'bg-gradient-to-r from-purple-600/30 to-rose-500/20';
    milestoneBorder = 'border-rose-400/60';
    milestoneTextClass = 'text-rose-300 font-black animate-pulse';
    milestoneLabel = '30-Day Godlike! 🥇';
    flameColorClass = 'text-rose-400 transform scale-125 drop-shadow-[0_0_15px_rgba(251,113,133,1)] animate-pulse';
    pulseContainerClass = 'ring-4 ring-rose-500/50 animate-ping duration-1000';
  } else if (currentStreak > 2) {
    flameColorClass = 'text-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]';
  }

  const sparks = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    delay: `${i * 0.35}s`,
    left: `${20 + i * 14}%`,
    size: i % 2 === 0 ? 'w-1 h-1' : 'w-1.5 h-1.5',
  }));

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      {/* Self-contained styling for Spark Particle float-up animation to achieve high fidelity Lottie-like behavior */}
      <style>{`
        @keyframes sparkRise {
          0% {
            transform: translateY(120%) scale(0.4);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-160%) scale(1.3);
            opacity: 0;
          }
        }
        .animate-spark-rise {
          animation: sparkRise 1.6s infinite ease-in-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              QuizApp
            </span>
          </div>

          <div className="flex items-center gap-4">
            {authLoading ? (
              <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
            ) : user ? (
              <>
                {userData !== undefined && (
                  <div className="hidden md:flex items-center gap-3 mr-2 bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-700/50">
                    <div 
                      onClick={triggerMilestoneEffects}
                      className={`flex items-center gap-1.5 relative px-2 py-0.5 rounded-lg border transition-all duration-300 group cursor-pointer active:scale-95 overflow-hidden ${isMilestone ? `${milestoneBg} ${milestoneBorder} ${pulseContainerClass}` : 'border-transparent text-orange-500'}`} 
                      title={isMilestone ? milestoneLabel : "Streak"}
                    >
                      {/* Interactive Spark particles float up inside the streak container for milestone celebrations */}
                      {isMilestone && sparks.map(spark => (
                        <span 
                          key={spark.id}
                          style={{ left: spark.left, animationDelay: spark.delay }}
                          className={`absolute bottom-0 ${spark.size} bg-amber-400 rounded-full animate-spark-rise opacity-0 pointer-events-none`}
                        />
                      ))}

                      <Flame className={`w-4 h-4 transition-transform duration-300 ${flameColorClass}`} />
                      <motion.span
                        key={currentStreak}
                        initial={{ scale: 0.9 }}
                        animate={{
                          scale: [1, 1.45, 1],
                          textShadow: [
                            "0 0 0px rgba(249, 115, 22, 0)",
                            "0 0 15px rgba(251, 146, 60, 1)",
                            "0 0 0px rgba(249, 115, 22, 0)"
                          ],
                          y: [0, -3, 0]
                        }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className={`inline-block text-sm tracking-wide ${isMilestone ? milestoneTextClass : 'font-bold text-orange-400'}`}
                      >
                        {currentStreak || 0}
                      </motion.span>

                      {/* Tooltip highlighting the milestone achievements */}
                      {isMilestone && (
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-950 text-[10px] text-yellow-300 font-mono px-2 py-0.5 rounded shadow-xl border border-yellow-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                          {milestoneLabel}
                        </span>
                      )}
                    </div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="flex items-center gap-1.5 text-yellow-500" title="Coins">
                      <div className="w-4 h-4 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center font-bold text-[10px]">C</div>
                      <span className="font-bold text-sm">{userData.coins || 0}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="flex items-center gap-1.5 text-cyan-400" title="Gems">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center font-bold text-[10px]">G</div>
                      <span className="font-bold text-sm">{userData.gems || 0}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="flex items-center gap-1.5 text-rose-400 group relative" title="Energy">
                      <Zap className="w-4 h-4 text-rose-400" />
                      <span className="font-bold text-sm">{userData.energy !== undefined ? Math.min(5, userData.energy) : 5}/5</span>
                      {nextEnergyMins !== null && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                          Next ⚡ in {nextEnergyMins}m
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {userData !== undefined && !userData.isPro && (
                  <button
                    onClick={onUpgradeClick}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-bold rounded-lg border border-yellow-300 shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Crown className="w-4 h-4" />
                    <span className="text-sm">PRO</span>
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${currentView === 'admin' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">{uiCopy.navbar.admin}</span>
                  </button>
                )}
                <button
                  onClick={() => onNavigate('shop')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${currentView === 'shop' ? 'bg-slate-800 text-yellow-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden lg:inline">{uiCopy.navbar.shop}</span>
                </button>
                <button
                  onClick={() => onNavigate('doubt-arena')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${currentView === 'doubt-arena' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <Flame className="w-4 h-4" />
                  <span className="hidden sm:inline">{uiCopy.navbar.doubtArena}</span>
                </button>
                <button
                  onClick={() => onNavigate('feedback')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${currentView === 'feedback' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">মতামত (Feedback)</span>
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${currentView === 'profile' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <UserAvatar url={userData?.equippedAvatar} borderId={userData?.equippedBorder} className="w-6 h-6 border" />
                  <span className="hidden sm:inline">{uiCopy.navbar.profile}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-400/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{uiCopy.navbar.logout}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className={`text-sm font-medium transition-colors cursor-pointer ${currentView === 'login' ? 'text-emerald-400' : 'text-slate-300 hover:text-white'}`}
                >
                  {uiCopy.navbar.login}
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  {uiCopy.navbar.signup}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
