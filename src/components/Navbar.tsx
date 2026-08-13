import React from 'react';
import { motion } from 'motion/react';
import { LogOut, Loader2, BookOpen, Settings, MessageSquare, Flame, Calendar, User, HelpCircle } from 'lucide-react';
import { uiCopy } from '../content/uiCopy';
import UserAvatar from './UserAvatar';

interface NavbarProps {
  user: any;
  userData?: any;
  isAdmin?: boolean;
  authLoading: boolean;
  onLogout: () => void;
  onNavigate: (view: 'home' | 'login' | 'signup' | 'profile' | 'admin' | 'feedback' | 'doubt-arena' | 'shop' | 'routine') => void;
  onUpgradeClick?: () => void;
  currentView: string;
}

export default function Navbar({ user, userData, isAdmin, authLoading, onLogout, onNavigate, currentView }: NavbarProps) {
  const currentStreak = userData?.currentStreak || 0;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold text-white tracking-tight">
              Quiz Master
            </span>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {authLoading ? (
              <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
            ) : user ? (
              <>
                {/* Streak Counter */}
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs font-bold text-amber-400 mr-2"
                  title="ধারাবাহিকতা"
                >
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  <span>{currentStreak} দিন</span>
                </div>

                {/* Home */}
                <button
                  onClick={() => onNavigate('home')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    currentView === 'home' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">{uiCopy.navbar.home}</span>
                </button>

                {/* Routine */}
                <button
                  onClick={() => onNavigate('routine')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    currentView === 'routine' ? 'bg-slate-800 text-indigo-400 border border-slate-700' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">{uiCopy.navbar.routine}</span>
                </button>

                {/* Doubt Arena */}
                <button
                  onClick={() => onNavigate('doubt-arena')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    currentView === 'doubt-arena' ? 'bg-slate-800 text-purple-400 border border-slate-700' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  <span className="hidden sm:inline">{uiCopy.navbar.doubtArena}</span>
                </button>

                {/* Feedback */}
                <button
                  onClick={() => onNavigate('feedback')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    currentView === 'feedback' ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden md:inline">মতামত</span>
                </button>

                {/* Admin */}
                {isAdmin && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentView === 'admin' ? 'bg-slate-800 text-amber-400 border border-slate-700' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden lg:inline">{uiCopy.navbar.admin}</span>
                  </button>
                )}

                {/* Profile */}
                <button
                  onClick={() => onNavigate('profile')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    currentView === 'profile' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <UserAvatar url={userData?.equippedAvatar} borderId={userData?.equippedBorder} className="w-5 h-5 border" />
                  <span className="hidden sm:inline">{uiCopy.navbar.profile}</span>
                </button>

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-xs font-medium"
                  title={uiCopy.navbar.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    currentView === 'login' ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {uiCopy.navbar.login}
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-xl transition-colors cursor-pointer"
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

