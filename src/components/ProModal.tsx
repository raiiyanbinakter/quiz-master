import React, { useState, useEffect } from 'react';
import { Crown, Sparkles, Zap, Shield, X, Rocket, CreditCard } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { uiCopy } from '../content/uiCopy';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProModal({ isOpen, onClose }: ProModalProps) {
  const [paymentsConfig, setPaymentsConfig] = useState({
    paymentsEnabled: false,
    providers: 'coming_soon'
  });
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Fetch Firestore system config doc for payments
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchPaymentsConfig = async () => {
      try {
        const docRef = doc(db, 'configs', 'payments');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPaymentsConfig({
            paymentsEnabled: data.paymentsEnabled ?? false,
            providers: data.providers ?? 'coming_soon'
          });
        } else {
          // Auto-migrate or set defaults in Firestore config safely
          const defaultConfig = { paymentsEnabled: false, providers: 'coming_soon' };
          await setDoc(docRef, defaultConfig, { merge: true });
          setPaymentsConfig(defaultConfig);
        }
      } catch (error) {
        console.warn("Firestore config read error, falling back to mock defaults:", error);
        // Safe mock fallback if permissions or schema is not fully operational yet
        setPaymentsConfig({
          paymentsEnabled: false,
          providers: 'coming_soon'
        });
      } finally {
        setLoadingConfig(false);
      }
    };
    
    fetchPaymentsConfig();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProviderClick = (providerName: string) => {
    setSelectedProvider(providerName);
  };

  const clearSelectedProvider = () => {
    setSelectedProvider(null);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-yellow-500/30 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Decorative Top Progress Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500"></div>
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <h3 className="font-mono text-sm uppercase tracking-widest text-slate-400">
              {uiCopy.premium?.comingSoonBadge || "PREMIUM UPGRADE"}
            </h3>
          </div>
          <button 
            id="btn-close-promodal"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {selectedProvider ? (
            /* Selected Provider Popup / Dialog UI */
            <div className="bg-slate-800/80 border border-yellow-500/25 rounded-2xl p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="mx-auto w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 font-bold border border-yellow-500/30">
                ⚠️
              </div>
              <h4 className="text-xl font-bold text-white">
                Payment system is being built
              </h4>
              <p className="text-yellow-400 text-xs font-semibold">
                Secure payment support for Bangladesh is coming soon
              </p>
              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                We are preparing support for bKash, Nagad, Rocket, and cards. You will be able to upgrade safely when this feature goes live.
              </p>
              <div className="pt-2">
                <button
                  id="btn-got-it"
                  onClick={clearSelectedProvider}
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-extrabold text-sm px-6 py-2.5 rounded-xl shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </div>
          ) : (
            /* Standard Premium Presentation */
            <>
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-300 mb-2">
                  {uiCopy.premium?.title || "PRO মেম্বারশিপ স্পেশাল"}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {uiCopy.premium?.subtitle || "অগ্রগতির পরবর্তী ধাপে যেতে আপনার প্রো মেম্বারশিপ অ্যাক্টিভেট করুন"}
                </p>
              </div>

              {/* VIP Reward Benefits */}
              <div className="space-y-3">
                <div className="flex items-start gap-3.5 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                  <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 text-rose-400 mt-0.5">
                    <Zap className="w-5 h-5"/>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold">
                      {uiCopy.premium?.benefits?.energy?.title || "আনলিমিটেড এনার্জি (Unlimited Energy)"}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {uiCopy.premium?.benefits?.energy?.desc || "কুইজ চ্যালেঞ্জ দিতে এনার্জি শেষ হওয়ার কোনো ঝামেলা থাকবে না।"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                  <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 text-amber-400 mt-0.5">
                    <Crown className="w-5 h-5"/>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold">
                      {uiCopy.premium?.benefits?.badge?.title || "গোল্ডেন নেম ট্যাগ এবং ব্যাজ"}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {uiCopy.premium?.benefits?.badge?.desc || "ডাউট এরিনা ও লিডারবোর্ডে নিজেকে অনন্যভাবে উপস্থাপন করুন।"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                  <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 text-emerald-400 mt-0.5">
                    <Shield className="w-5 h-5"/>
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold">
                      {uiCopy.premium?.benefits?.support?.title || "মেন্টর সহায়তায় অগ্রাধিকার"}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {uiCopy.premium?.benefits?.support?.desc || "আপনার ডাউটগুলোর তাৎক্ষণিক সমাধান নিশ্চিত করতে মেন্টরদের পুশ সেশন।"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Indicator from Config */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span>System status:</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  paymentsEnabled: {String(paymentsConfig.paymentsEnabled)}
                </span>
                <span>providers: {paymentsConfig.providers}</span>
              </div>

              {/* Bangladesh Payment Providers Subsection */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                  সহজ এবং নিরাপদ পেমেন্ট গেটওয়ে (Choose Provider)
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* bKash card */}
                  <button
                    id="provider-bkash"
                    onClick={() => handleProviderClick("bKash")}
                    className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-900/40 to-slate-800 hover:from-pink-900/60 rounded-2xl border border-pink-500/30 transition-all hover:scale-[1.02] cursor-pointer text-center relative overflow-hidden group"
                  >
                    <span className="text-pink-400 font-bold text-lg font-sans tracking-wide">bKash</span>
                    <span className="text-[10px] text-pink-300 bg-pink-500/15 border border-pink-500/20 px-2 py-0.5 rounded-full mt-2 font-semibold">
                      বিকাশ
                    </span>
                  </button>

                  {/* Nagad card */}
                  <button
                    id="provider-nagad"
                    onClick={() => handleProviderClick("Nagad")}
                    className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-orange-900/40 to-slate-800 hover:from-orange-900/60 rounded-2xl border border-orange-500/30 transition-all hover:scale-[1.02] cursor-pointer text-center relative overflow-hidden group"
                  >
                    <span className="text-orange-400 font-bold text-lg font-sans tracking-wide">Nagad</span>
                    <span className="text-[10px] text-orange-300 bg-orange-500/15 border border-orange-500/20 px-2 py-0.5 rounded-full mt-2 font-semibold">
                      নগদ
                    </span>
                  </button>

                  {/* Rocket card */}
                  <button
                    id="provider-rocket"
                    onClick={() => handleProviderClick("Rocket")}
                    className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900/40 to-slate-800 hover:from-purple-900/60 rounded-2xl border border-purple-500/30 transition-all hover:scale-[1.02] cursor-pointer text-center relative overflow-hidden group"
                  >
                    <span className="text-purple-400 font-bold text-lg font-sans tracking-wide">Rocket</span>
                    <span className="text-[10px] text-purple-300 bg-purple-500/15 border border-purple-500/20 px-2 py-0.5 rounded-full mt-2 font-semibold">
                      রকেট
                    </span>
                  </button>

                  {/* Credit Card / Card */}
                  <button
                    id="provider-card"
                    onClick={() => handleProviderClick("Card")}
                    className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-800 to-slate-700/50 hover:from-slate-700 rounded-2xl border border-slate-600/30 transition-all hover:scale-[1.02] cursor-pointer text-center relative overflow-hidden group"
                  >
                    <CreditCard className="w-5 h-5 text-slate-300" />
                    <span className="text-slate-300 font-bold text-sm mt-1">Cards</span>
                    <span className="text-[10px] text-slate-400 bg-slate-700 border border-slate-600 px-2 py-0.5 rounded-full mt-1 font-semibold">
                      Debit/Credit
                    </span>
                  </button>
                </div>
              </div>

              {/* Payment Placeholder Detail Info */}
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800 text-center text-xs space-y-1.5 leading-relaxed">
                <p className="text-slate-300 font-semibold text-[13px]">
                  {uiCopy.premium?.paymentPlaceholderTitle}
                </p>
                <p className="text-slate-500 text-[11px]">
                  {uiCopy.premium?.paymentPlaceholderSubtitle}
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
