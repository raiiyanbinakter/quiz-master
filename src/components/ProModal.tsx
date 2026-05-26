import React from 'react';
import { Crown, Sparkles, Zap, Shield, X, Rocket } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProModal({ isOpen, onClose }: ProModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-yellow-500/30 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-slate-800 p-1.5 rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-900 mb-6 shadow-xl shadow-yellow-500/20 animate-bounce">
            <Crown className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 mb-3">
            PRO is Coming Soon!
          </h2>
          <p className="text-slate-400 mb-8 px-2 leading-relaxed">
            We are working hard to bring you the ultimate premium learning experience. Lock in early!
          </p>

          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50">
              <div className="bg-rose-500/20 p-2 rounded-xl border border-rose-500/30 text-rose-400"><Zap className="w-5 h-5"/></div>
              <div>
                <strong className="text-white block font-bold">Unlimited Energy</strong>
                <span className="text-sm text-slate-400">Never wait for regeneration</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50">
              <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30 text-amber-400"><Crown className="w-5 h-5"/></div>
              <div>
                <strong className="text-white block font-bold">Golden Name Tag</strong>
                <span className="text-sm text-slate-400">Stand out in Doubt Arena</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50">
              <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30 text-emerald-400"><Shield className="w-5 h-5"/></div>
              <div>
                <strong className="text-white block font-bold">Priority Moderation</strong>
                <span className="text-sm text-slate-400">Your doubts get highlighted</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
          >
            <Rocket className="w-5 h-5" />
            I'm Excited!
          </button>
        </div>
      </div>
    </div>
  );
}
