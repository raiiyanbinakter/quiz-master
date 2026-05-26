import React, { useState, useEffect } from 'react';
import { User, LogOut, Loader2, BookOpen, Settings, MessageSquare, Flame, Diamond, Zap, Crown, ShoppingBag } from 'lucide-react';

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

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
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
                    <div className="flex items-center gap-1.5 text-orange-500" title="Streak">
                      <Flame className={`w-4 h-4 ${userData.currentStreak > 2 ? 'text-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'text-orange-500/50'}`} />
                      <span className="font-bold text-sm text-orange-400">{userData.currentStreak || 0}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="flex items-center gap-1.5 text-yellow-500" title="Coins">
                      <div className="w-4 h-4 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center font-bold text-[10px]">C</div>
                      <span className="font-bold text-sm">{userData.coins || 0}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="flex items-center gap-1.5 text-cyan-400" title="Gems">
                      <Diamond className="w-4 h-4 text-cyan-400" />
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
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-bold rounded-lg border border-yellow-300 shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform"
                  >
                    <Crown className="w-4 h-4" />
                    <span className="text-sm">PRO</span>
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${currentView === 'admin' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">এডমিন প্যানেল</span>
                  </button>
                )}
                <button
                  onClick={() => onNavigate('shop')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${currentView === 'shop' ? 'bg-slate-800 text-yellow-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden lg:inline">Shop</span>
                </button>
                <button
                  onClick={() => onNavigate('doubt-arena')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${currentView === 'doubt-arena' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <Flame className="w-4 h-4" />
                  <span className="hidden sm:inline">ডাউট এরিনা</span>
                </button>
                <button
                  onClick={() => onNavigate('feedback')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${currentView === 'feedback' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">মতামত</span>
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${currentView === 'profile' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <UserAvatar url={userData?.equippedAvatar} borderId={userData?.equippedBorder} className="w-6 h-6 border" />
                  <span className="hidden sm:inline">প্রোফাইল</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-400/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">লগআউট</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className={`text-sm font-medium transition-colors ${currentView === 'login' ? 'text-emerald-400' : 'text-slate-300 hover:text-white'}`}
                >
                  লগইন
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  সাইন আপ
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
