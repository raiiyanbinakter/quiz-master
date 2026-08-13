import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function CalmConfirmationToast() {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string }>;
      if (customEvent.detail && customEvent.detail.message) {
        setToast({
          message: customEvent.detail.message,
          visible: true
        });
      }
    };

    window.addEventListener('gamification_toast', handleToast);
    return () => window.removeEventListener('gamification_toast', handleToast);
  }, []);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, toast.message]);

  if (!toast.visible || !toast.message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900/95 border border-indigo-500/30 text-white px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 max-w-sm">
        <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0">
          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
        </div>
        <p className="text-sm font-semibold text-slate-100 tracking-tight">
          {toast.message}
        </p>
      </div>
    </div>
  );
}
