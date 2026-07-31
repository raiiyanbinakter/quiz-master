import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Trophy, ArrowLeft, Loader2, Medal, Flame, Crown, 
  Star, Users, Calendar, Award, ShieldAlert, Zap
} from 'lucide-react';
import { syllabus } from '../data/syllabus';
import { uiCopy } from '../content/uiCopy';
import RankBadge from './RankBadge';
import UserAvatar from './UserAvatar';
import { HOUSES, House } from '../data/houses';

interface LeaderboardProps {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [entries, setEntries] = useState<any[]>([]);
  const [houseStandings, setHouseStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'weekly' | 'global' | 'mentor' | 'house_war'>('house_war');

  const allSubjects = ['All', ...syllabus.map(s => s.name)];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        let q;
        let data: any[] = [];
        
        // Fetch all users to group for House War or extract lists
        const allUsersSnap = await getDocs(query(collection(db, 'users'), limit(300)));
        const allUsers = allUsersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

        if (typeFilter === 'house_war') {
          // Initialize House Stats
          const houseStats = HOUSES.map(house => ({
            ...house,
            totalPoints: 0,
            memberCount: 0,
            topScholars: [] as any[]
          }));

          // Group users into houses
          allUsers.forEach(user => {
            const sum = user.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
            const userHouseId = user.assignedHouse || HOUSES[sum % 4].id;
            const house = houseStats.find(h => h.id === userHouseId);
            
            if (house) {
              const uChapters = user.unlockedChapters?.length || 1;
              const uStreak = user.currentStreak || 0;
              const userPoints = (uChapters * 120) + (uStreak * 15) + (user.reputation || 0) * 10;
              
              house.totalPoints += userPoints;
              house.memberCount += 1;
              house.topScholars.push({
                name: user.name || 'Anonymous',
                points: userPoints,
                equippedAvatar: user.equippedAvatar,
                equippedBorder: user.equippedBorder,
                isPro: user.isPro || false
              });
            }
          });

          // Sort scholars in each house and sort houses by total points
          houseStats.forEach(house => {
            house.topScholars.sort((a, b) => b.points - a.points);
            house.topScholars = house.topScholars.slice(0, 3); // top 3 scholars of each house
          });

          houseStats.sort((a, b) => b.totalPoints - a.totalPoints);
          setHouseStandings(houseStats);
        } else if (typeFilter === 'global') {
          // Sort loaded users by points/coins
          data = [...allUsers];
          data.sort((a, b) => {
            const aCh = a.unlockedChapters?.length || 1;
            const bCh = b.unlockedChapters?.length || 1;
            const aPoints = (aCh * 120) + ((a.currentStreak || 0) * 15);
            const bPoints = (bCh * 120) + ((b.currentStreak || 0) * 15);
            return bPoints - aPoints;
          });
          data = data.slice(0, 100).map(u => ({ ...u, isGlobalEntry: true }));
          setEntries(data);
        } else if (typeFilter === 'mentor') {
          // Sort loaded users by reputation
          data = allUsers.filter(u => (u.reputation || 0) >= 0);
          data.sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
          data = data.slice(0, 100).map(u => ({ ...u, isReputationEntry: true, isGlobalEntry: true }));
          setEntries(data);
        } else if (typeFilter === 'weekly') {
          // Fetch results collection
          q = query(collection(db, 'results'), limit(300));
          const snapshot = await getDocs(q);
          data = snapshot.docs.map(doc => ({ ...doc.data() as any, id: doc.id }));
          
          if (subjectFilter !== 'All') {
            data = data.filter(d => Boolean(d.subjectName) && d.subjectName.includes(subjectFilter));
          }
          data.sort((a, b) => b.score - a.score);
          setEntries(data.slice(0, 100));
        }

      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [subjectFilter, typeFilter]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-350">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-[#f59e0b]/15 p-2.5 rounded-xl border border-amber-500/20">
            <Trophy className="w-7 h-7 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">অ্যাকাডেমিক লিডারবোর্ড</h1>
            <p className="text-slate-400 text-sm">হাউজ যুদ্ধ, সাপ্তাহিক ট্রায়াল ও দেশসেরা মেন্টরদের রিয়েল-টাইম র্যাঙ্কিং</p>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex bg-slate-850 p-1.5 rounded-2xl border border-slate-800 w-full flex-wrap sm:w-auto">
          <button
            onClick={() => setTypeFilter('house_war')}
            className={`flex-1 sm:flex-none px-5 py-2.5 text-xs font-black rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase ${typeFilter === 'house_war' ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-yellow-500/10' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Users className="w-3.5 h-3.5" /> House War ⚔️
          </button>
          <button
            onClick={() => setTypeFilter('global')}
            className={`flex-1 sm:flex-none px-5 py-2.5 text-xs font-black rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase ${typeFilter === 'global' ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Flame className="w-3.5 h-3.5" /> scholars
          </button>
          <button
            onClick={() => setTypeFilter('mentor')}
            className={`flex-1 sm:flex-none px-5 py-2.5 text-xs font-black rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase ${typeFilter === 'mentor' ? 'bg-[#10b981] text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Star className="w-3.5 h-3.5" /> mentors
          </button>
          <button
            onClick={() => setTypeFilter('weekly')}
            className={`flex-1 sm:flex-none px-5 py-2.5 text-xs font-black rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase ${typeFilter === 'weekly' ? 'bg-[#6366f1] text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Calendar className="w-3.5 h-3.5" /> trials
          </button>
        </div>

        {typeFilter === 'weekly' && (
          <select 
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors w-full sm:w-auto min-w-[200px] cursor-pointer text-sm"
          >
            {allSubjects.map(sub => (
              <option key={sub} value={sub}>{sub === 'All' ? 'সকল বিষয়' : sub}</option>
            ))}
          </select>
        )}
      </div>

      {/* Leaderboard Board Rendering */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-900/40 rounded-3xl border border-slate-850">
          <Loader2 className="w-9 h-9 text-amber-500 animate-spin mb-4" />
          <p className="text-slate-400 text-sm">রিপোর্ট ও স্কোরসমূহ প্রক্রিয়াজাত করা হচ্ছে...</p>
        </div>
      ) : typeFilter === 'house_war' ? (
        
        /* House War Grid Display */
        <div className="space-y-6 animate-in fade-in duration-300">
          {houseStandings.map((house, hIdx) => {
            let badgeColor = 'bg-slate-800 text-slate-400';
            if (hIdx === 0) badgeColor = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            else if (hIdx === 1) badgeColor = 'bg-slate-300/20 text-slate-300 border-slate-300/30';
            else if (hIdx === 2) badgeColor = 'bg-amber-600/20 text-amber-500 border-amber-500/30';

            return (
              <div 
                key={house.id} 
                className={`rounded-3xl bg-gradient-to-br ${house.bgGradient} border ${house.borderColor} p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 text-white opacity-5 text-9xl font-black">{house.flagEmoji}</div>
                
                <div className="space-y-3 relative z-10 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${badgeColor}`}>
                      Rank #{hIdx + 1}
                    </span>
                    <span className="text-2xl">{house.flagEmoji}</span>
                    <h3 className="text-xl font-black text-white">{house.banglaName}</h3>
                  </div>
                  <p className="text-[11px] text-amber-300/80 font-bold italic">"{house.motto}"</p>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">{house.banglaDescription}</p>
                  
                  {/* Top Members of the House */}
                  <div className="pt-2">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">শীর্ষ অবধায়কগণ (Top Contributors)</span>
                    <div className="flex flex-wrap gap-3">
                      {house.topScholars.length === 0 ? (
                        <span className="text-[11px] text-slate-500 italic">এখনো অবধায়ক যোগ দেয়নি।</span>
                      ) : house.topScholars.map((scholar: any, sIdx: number) => (
                        <div key={sIdx} className="flex items-center gap-2 bg-slate-950/40 border border-slate-850 px-2.5 py-1 rounded-xl text-[11px] text-slate-300">
                          <UserAvatar url={scholar.equippedAvatar} borderId={scholar.equippedBorder} className="w-4 h-4" />
                          <span>{scholar.name}</span>
                          <span className="text-amber-400 font-extrabold">{scholar.points} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-left md:text-right bg-slate-950/60 p-5 rounded-2xl border border-slate-800 relative z-10 w-full md:w-auto min-w-[150px]">
                  <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">মোট হাউজ স্কোর</span>
                  <span className="text-white text-3xl font-black leading-none block mt-1.5">{house.totalPoints} <span className="text-xs text-amber-400 font-mono">Pts</span></span>
                  <span className="block text-[10px] text-slate-400 mt-2">{house.memberCount} জন সক্রিয় সদস্য</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* Traditional Leaderboard Tables */
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/40 border-b border-slate-800">
                  <th className="px-6 py-4 text-slate-400 font-bold text-xs uppercase tracking-wider w-16">র্যাংক</th>
                  <th className="px-6 py-4 text-slate-400 font-bold text-xs uppercase tracking-wider">ক্যাম্পেইনার</th>
                  <th className="px-6 py-4 text-slate-400 font-bold text-xs uppercase tracking-wider text-right">স্কোর / মেডেল</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {entries.map((entry, idx) => {
                  let badge = null;
                  let rowClass = "hover:bg-slate-850/40 transition-colors";
                  
                  if (idx === 0) {
                    badge = <Medal className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />;
                    rowClass = "bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors";
                  } else if (idx === 1) {
                    badge = <Medal className="w-6 h-6 text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]" />;
                  } else if (idx === 2) {
                    badge = <Medal className="w-6 h-6 text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" />;
                  } else {
                    badge = <span className="text-slate-500 font-mono font-bold px-2">{idx + 1}</span>;
                  }

                  const uChapters = entry.unlockedChapters?.length || 1;
                  const uStreak = entry.currentStreak || 0;
                  const totalXP = (uChapters * 120) + (uStreak * 15);

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
                            <span className="text-white font-black text-base flex items-center gap-2">
                              {entry.isGlobalEntry ? (entry.name || 'Anonymous') : (entry.userName || 'Anonymous')}
                              {entry.isGlobalEntry && <RankBadge coins={entry.coins || 0} showText={false} />}
                              {entry.isGlobalEntry && entry.isPro && <Crown className="w-3.5 h-3.5 text-yellow-500" />}
                            </span>
                            {!entry.isGlobalEntry && <span className="text-slate-500 text-xs mt-1">{entry.subjectName}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {entry.isReputationEntry ? (
                           <div className="flex items-center justify-end gap-1.5 text-emerald-400 font-black text-lg">
                             <Star className="w-4.5 h-4.5 text-emerald-400 fill-emerald-400" />
                             <span>{entry.reputation || 0} Rep</span>
                           </div>
                        ) : entry.isGlobalEntry ? (
                           <div className="flex items-center justify-end gap-1.5 text-indigo-400 font-black text-lg">
                             <span>{totalXP} XP</span>
                           </div>
                        ) : (
                           <div className="flex items-end justify-end gap-1">
                             <span className="text-emerald-400 font-extrabold text-xl">{entry.score}</span>
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
        </div>
      )}

    </div>
  );
}
