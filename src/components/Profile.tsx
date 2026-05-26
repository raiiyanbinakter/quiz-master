import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, writeBatch } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase';
import { User, Activity, Loader2, ArrowLeft, Trash2, AlertTriangle, Flame, Diamond, Zap, Crown, Star } from 'lucide-react';

interface ProfileProps {
  user: any;
  userData?: any;
  onBack: () => void;
  onUpgradeClick?: () => void;
}

interface ResultEntry {
  id: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  createdAt: any;
}

import RankBadge from './RankBadge';
import UserAvatar from './UserAvatar';

export default function Profile({ user, userData, onBack, onUpgradeClick }: ProfileProps) {
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const fetchUserResults = async () => {
      if (!user?.uid) return;
      
      try {
        const q = query(
          collection(db, 'results'),
          where('userId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ResultEntry[];
        
        data.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
        
        setResults(data);
      } catch (error) {
        console.error("Error fetching user results:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserResults();
  }, [user]);

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("আপনি কি নিশ্চিত যে আপনি আপনার অ্যাকাউন্ট এবং সমস্ত ডাটা ডিলিট করতে চান? এই কাজটিকে আর পূর্বাবস্থায় ফিরিয়ে আনা যাবে না।");
    if (!confirm) return;

    setDeleting(true);
    setDeleteError('');

    try {
      if (!auth.currentUser) throw new Error("No user logged in");
      
      // 1. Delete user's results using batch
      const q = query(collection(db, 'results'), where('userId', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => {
        batch.delete(d.ref);
      });
      await batch.commit();

      // 2. Delete user's document in 'users' collection
      await deleteDoc(doc(db, 'users', auth.currentUser.uid));

      // 3. Delete from Firebase Auth
      await deleteUser(auth.currentUser);
      
      // Navigate back/home (auth state change listener in App will notice and adjust state)
      onBack();
    } catch (error: any) {
      console.error("Error deleting account:", error);
      if (error.code === 'auth/requires-recent-login') {
        setDeleteError("নিরাপত্তার কারণে, অ্যাকাউন্ট ডিলিট করার জন্য আপনাকে নতুন করে লগইন করতে হবে। অনুগ্রহ করে লগআউট করে আবার লগইন করুন।");
      } else {
        setDeleteError(`ত্রুটি হয়েছে: ${error.message}`);
      }
    } finally {
      setDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 w-full justify-between flex-wrap">
          <div className="flex items-center gap-4">
            <UserAvatar url={userData?.equippedAvatar} borderId={userData?.equippedBorder} className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                আমার প্রোফাইল
                <RankBadge coins={userData?.coins || 0} />
                {userData?.isPro && <Crown className="w-5 h-5 text-yellow-500" title="PRO Member" />}
              </h1>
              <p className="text-slate-400 text-sm">{user.displayName || 'Un-named User'} • {user.email}</p>
            </div>
          </div>
          {userData !== undefined && (
            <div className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700/50 flex-wrap shrink-0">
              <div className="flex items-center gap-2 text-orange-500 bg-orange-500/10 px-3 py-2 rounded-xl">
                <Flame className={`w-5 h-5 ${userData.currentStreak > 2 ? 'animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : ''}`} />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500/80 leading-none mb-0.5">Streak</span>
                  <span className="font-bold leading-none">{userData.currentStreak || 0}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-3 py-2 rounded-xl">
                <div className="w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center font-bold text-[10px]">C</div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500/80 leading-none mb-0.5">Coins</span>
                  <span className="font-bold leading-none">{userData.coins || 0}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 bg-cyan-400/10 px-3 py-2 rounded-xl">
                <Diamond className="w-5 h-5 text-cyan-400" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/80 leading-none mb-0.5">Gems</span>
                  <span className="font-bold leading-none">{userData.gems || 0}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-xl">
                <Star className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 leading-none mb-0.5">Reputation</span>
                  <span className="font-bold leading-none">{userData.reputation || 0}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-rose-400 bg-rose-400/10 px-3 py-2 rounded-xl">
                <Zap className="w-5 h-5 text-rose-400" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400/80 leading-none mb-0.5">Energy</span>
                  <span className="font-bold leading-none">{userData.energy !== undefined ? Math.min(5, userData.energy) : 5} <span className="text-[10px]">/5</span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!userData?.isPro && onUpgradeClick && (
        <div className="mb-8 relative overflow-hidden bg-gradient-to-r from-amber-600/10 via-yellow-500/10 to-orange-600/10 border border-yellow-500/20 rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-xl shadow-yellow-500/5 transition-all group cursor-pointer hover:border-yellow-500/40" onClick={onUpgradeClick}>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-colors"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 mb-2 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              Upgrade to PRO
            </h3>
            <p className="text-yellow-200/70 font-medium">Get Unlimited Energy & Exclusive VIP Features</p>
          </div>
          <button className="relative z-10 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
            Unlock Now
          </button>
        </div>
      )}

      {deleteError && (
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
          <p className="text-rose-300 text-sm">{deleteError}</p>
        </div>
      )}

      <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white">কুইজ হিস্ট্রি (Quiz History)</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-4" />
            <p className="text-slate-400">ডাটা লোড হচ্ছে...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">আপনি এখনো কোনো কুইজ খেলেননি</h3>
            <p className="text-slate-500 text-sm">কুইজ খেলা শুরু করুন এবং আপনার ফলাফল এখানে দেখুন।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-700">
                  <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">বিষয় (Subject/Topic)</th>
                  <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider text-center">স্কোর</th>
                  <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider text-right">তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {results.map((entry) => {
                  const dateInfo = entry.createdAt?.toDate ? entry.createdAt.toDate().toLocaleDateString('bn-BD', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  }) : 'Unknown date';

                  return (
                    <tr key={entry.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{entry.subjectName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-emerald-400 font-bold text-lg">{entry.score}</span>
                        <span className="text-slate-500 text-sm"> / {entry.totalQuestions}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-slate-400 text-sm">
                        {dateInfo}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 border-t border-slate-700 pt-8 flex flex-col items-start gap-4">
        <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          ডেঞ্জার জোন (Danger Zone)
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl">
          আপনি যদি আপনার অ্যাকাউন্ট মুছে ফেলেন, তবে আপনার প্রোফাইল, সমস্ত কুইজ ডাটা এবং স্কোর চিরতরে মুছে যাবে। এই কাজটি আর ফিরিয়ে আনা যাবে না।
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors border border-rose-500/30 font-medium"
        >
          {deleting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
          {deleting ? 'মুছে ফেলা হচ্ছে...' : 'আমার অ্যাকাউন্ট ডিলিট করুন'}
        </button>
      </div>

    </div>
  );
}
