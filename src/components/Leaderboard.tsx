import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Trophy, ArrowLeft, Loader2, Medal, Flame, Crown, Star } from 'lucide-react';
import { syllabus } from '../data/syllabus';
import RankBadge from './RankBadge';
import UserAvatar from './UserAvatar';

interface LeaderboardEntry {
  id: string;
  userName: string;
  score: number;
  totalQuestions: number;
  subjectName: string;
  assessmentType: 'quiz' | 'exam';
  createdAt: number;
}

export default function Leaderboard({ onBack }: { onBack: () => void }) {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'quiz' | 'exam' | 'global' | 'reputation'>('quiz');

  // Hardcode or generate a list of subjects from syllabus for the dropdown
  const allSubjects = ['All', ...syllabus.map(s => s.name)];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        let q;
        let data: any[] = [];
        
        if (typeFilter === 'global') {
          q = query(collection(db, 'users'), orderBy('coins', 'desc'), limit(100));
          const snapshot = await getDocs(q);
          data = snapshot.docs.map(doc => ({
            ...doc.data() as any,
            id: doc.id,
            isGlobalEntry: true
          }));
        } else if (typeFilter === 'reputation') {
          q = query(collection(db, 'users'), orderBy('reputation', 'desc'), limit(100));
          const snapshot = await getDocs(q);
          data = snapshot.docs.map(doc => ({
            ...doc.data() as any,
            id: doc.id,
            isReputationEntry: true,
            isGlobalEntry: true
          }));
        } else {
          if (subjectFilter === 'All') {
            q = query(collection(db, 'results'), where('assessmentType', '==', typeFilter), limit(300));
          } else {
            q = query(collection(db, 'results'), where('subjectName', '>=', subjectFilter), where('subjectName', '<=', subjectFilter + '\uf8ff'), limit(300));
          }
          const snapshot = await getDocs(q);
          data = snapshot.docs.map(doc => ({
            ...doc.data() as any,
            id: doc.id
          }));
          
          if (subjectFilter !== 'All') {
            data = data.filter(d => Boolean(d.subjectName) && d.subjectName.includes(subjectFilter));
            data = data.filter(d => d.assessmentType === typeFilter);
          }
          data.sort((a, b) => b.score - a.score);
          data = data.slice(0, 100);
        }

        setEntries(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [subjectFilter, typeFilter]);

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
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/30">
            <Trophy className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">লিডারবোর্ড</h1>
            <p className="text-slate-400 text-sm">সর্বোচ্চ স্কোর অর্জনকারীদের তালিকা</p>
          </div>
        </div>
      </div>

      {/* Filters and Tabs */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 w-full flex-wrap sm:w-auto">
          <button
            onClick={() => setTypeFilter('quiz')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-medium transition-colors ${typeFilter === 'quiz' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            কুইজ (Quiz)
          </button>
          <button
            onClick={() => setTypeFilter('exam')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-medium transition-colors ${typeFilter === 'exam' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            এক্সাম (Exam)
          </button>
          <button
            onClick={() => setTypeFilter('global')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${typeFilter === 'global' ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-lg shadow-yellow-500/20' : 'text-slate-400 hover:text-yellow-400 bg-slate-800'}`}
          >
            <Flame className="w-4 h-4" /> Global (Coins)
          </button>
          <button
            onClick={() => setTypeFilter('reputation')}
            className={`w-full sm:w-auto mt-1 sm:mt-0 px-6 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${typeFilter === 'reputation' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-900 shadow-lg shadow-teal-500/20' : 'text-slate-400 hover:text-emerald-400 bg-slate-800'}`}
          >
            <Star className="w-4 h-4" /> Reputation
          </button>
        </div>

        {typeFilter !== 'global' && typeFilter !== 'reputation' && (
          <select 
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors w-full sm:w-auto min-w-[200px]"
          >
            {allSubjects.map(sub => (
              <option key={sub} value={sub}>{sub === 'All' ? 'সকল বিষয়' : sub}</option>
            ))}
          </select>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
            <p className="text-slate-400 text-lg">ডাটা লোড হচ্ছে...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">কোনো ডাটা পাওয়া যায়নি</h3>
            <p className="text-slate-500">এখনো কেউ এই বিষয়ে কুইজ খেলেনি।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-700">
                  <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider w-16">র‍্যাংক</th>
                  <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">নাম</th>
                  <th className="px-6 py-4 text-slate-400 font-semibold text-sm uppercase tracking-wider text-right">স্কোর</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {entries.map((entry, idx) => {
                  let badge = null;
                  let rowClass = "hover:bg-slate-700/30 transition-colors";
                  
                  if (idx === 0) {
                    badge = <Medal className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />;
                    rowClass = "bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors";
                  } else if (idx === 1) {
                    badge = <Medal className="w-6 h-6 text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]" />;
                  } else if (idx === 2) {
                    badge = <Medal className="w-6 h-6 text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" />;
                  } else {
                    badge = <span className="text-slate-500 font-bold px-2">{idx + 1}</span>;
                  }

                  return (
                    <tr key={entry.id} className={rowClass}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8">
                          {badge}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <UserAvatar 
                            url={entry.isGlobalEntry ? entry.equippedAvatar : entry.userAvatar} 
                            borderId={entry.isGlobalEntry ? entry.equippedBorder : entry.userBorder} 
                            className="w-10 h-10" 
                          />
                          <div className="flex flex-col items-start">
                            <span className="text-white font-medium text-lg flex items-center gap-2">
                              {entry.isGlobalEntry ? (entry.name || 'Un-named User') : (entry.userName || 'Un-named User')}
                              {entry.isGlobalEntry && <RankBadge coins={entry.coins || 0} showText={false} />}
                              {entry.isGlobalEntry && entry.isPro && <Crown className="w-4 h-4 text-yellow-500" title="PRO Member" />}
                            </span>
                            {!entry.isGlobalEntry && <span className="text-slate-500 text-xs mt-0.5">{entry.subjectName}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {entry.isReputationEntry ? (
                           <div className="flex items-center justify-end gap-1.5 text-emerald-400 font-bold text-xl">
                             <Star className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                             <span>{entry.reputation || 0}</span>
                           </div>
                        ) : entry.isGlobalEntry ? (
                           <div className="flex items-center justify-end gap-1.5 text-yellow-500">
                             <div className="w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center font-bold text-[10px]">C</div>
                             <span className="font-bold text-xl">{entry.coins || 0}</span>
                           </div>
                        ) : (
                           <div className="flex items-end justify-end gap-1">
                             <span className="text-emerald-400 font-bold text-xl">{entry.score}</span>
                             <span className="text-slate-500 text-sm mb-0.5">/ {entry.totalQuestions}</span>
                           </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
