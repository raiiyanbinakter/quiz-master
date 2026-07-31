import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Trophy, ShoppingBag, GraduationCap, 
  Stethoscope, Building2, CheckCircle, ChevronRight, Zap, 
  Flame, Award, ShieldAlert, Users, Compass, HelpCircle, 
  Star, MessageCircle, ChevronLeft, ArrowRight
} from 'lucide-react';
import { uiCopy } from '../content/uiCopy';
import DailyMissions from './DailyMissions';
import { HOUSES, House } from '../data/houses';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import RankBadge from './RankBadge';

interface HomeProps {
  onSelectCategory: (category: 'academic' | 'board' | 'medical' | 'varsity') => void;
  onShowLeaderboard: () => void;
  onShowShop: () => void;
  userData?: any;
  onClaimReward?: (missionId: string) => void;
}

export default function Home({ onSelectCategory, onShowLeaderboard, onShowShop, userData, onClaimReward }: HomeProps) {
  const [showHouseModal, setShowHouseModal] = useState(false);
  const [updatingHouse, setUpdatingHouse] = useState(false);

  // Fallback assigned house based on string hash if not defined in Firestore yet
  const getFallbackHouse = () => {
    if (!userData?.uid) return HOUSES[0];
    const sum = userData.uid.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return HOUSES[sum % 4];
  };

  const userHouseId = userData?.assignedHouse || getFallbackHouse().id;
  const currentHouse = HOUSES.find(h => h.id === userHouseId) || HOUSES[0];

  const handleSelectHouse = async (houseId: string) => {
    if (!auth.currentUser) {
      alert("হাউজে যোগ দিতে অনুগ্রহ করে আগে লগইন করুন।");
      return;
    }
    setUpdatingHouse(true);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        assignedHouse: houseId
      });
      // FireStore listener will trigger update of userData state in App.tsx
      setShowHouseModal(false);
    } catch (e) {
      console.error(e);
      alert("হাউজ পরিবর্তন করতে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setUpdatingHouse(false);
    }
  };

  const CATEGORIES = [
    {
      id: 'academic',
      title: uiCopy.home.categories.academic.title,
      subTitle: 'HSC Academic Campaign',
      desc: uiCopy.home.categories.academic.desc,
      icon: BookOpen,
      gradient: 'from-blue-600/10 via-blue-900/5 to-slate-900',
      borderColor: 'group-hover:border-blue-500/40 border-slate-800',
      accentColor: 'text-blue-400 bg-blue-500/10'
    },
    {
      id: 'board',
      title: uiCopy.home.categories.board.title,
      subTitle: 'Board Exam Drills',
      desc: uiCopy.home.categories.board.desc,
      icon: CheckCircle,
      gradient: 'from-purple-600/10 via-purple-900/5 to-slate-900',
      borderColor: 'group-hover:border-purple-500/40 border-slate-800',
      accentColor: 'text-purple-400 bg-purple-500/10'
    },
    {
      id: 'medical',
      title: uiCopy.home.categories.medical.title,
      subTitle: 'Medical Admissions',
      desc: uiCopy.home.categories.medical.desc,
      icon: Stethoscope,
      gradient: 'from-rose-600/10 via-rose-900/5 to-slate-900',
      borderColor: 'group-hover:border-rose-500/40 border-slate-800',
      accentColor: 'text-rose-400 bg-rose-500/10'
    },
    {
      id: 'varsity',
      title: uiCopy.home.categories.varsity.title,
      subTitle: 'Varsity Battles',
      desc: uiCopy.home.categories.varsity.desc,
      icon: Building2,
      gradient: 'from-amber-600/10 via-amber-900/5 to-slate-900',
      borderColor: 'group-hover:border-amber-500/40 border-slate-800',
      accentColor: 'text-amber-400 bg-amber-500/10'
    }
  ] as const;

  // Derive stats
  const unlockedChaptersCount = userData?.unlockedChapters?.length || 1;
  const currentStreak = userData?.currentStreak || 0;
  const scholarScore = (unlockedChaptersCount * 120) + (currentStreak * 15);
  
  // Mentor specialization mapping based on chapters cleared or repute
  const mentorRep = userData?.reputation || 0;
  const getMentorTitle = (rep: number) => {
    if (rep > 55) return 'সিনিয়র মেন্টর (Chief Mentor Giga Specialist) 🎓';
    if (rep > 20) return 'অনলাইন মেন্টর (Verified Online Mentor)';
    if (rep > 0) return 'সহযোগী পরামর্শক (Expert Assistant)';
    return 'সহকারী শিক্ষানবিস (Help Apprentice)';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      
      {/* Campaign Portal Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 p-8 md:p-10 mb-8 shadow-2xl">
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              Bangladesh Academic Campaign
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              একাডেমিক ক্যাম্পেইন পোর্টাল
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
              এইচএসসি ও এডমিশন প্রস্তুতির বৈপ্লবিক প্ল্যাটফর্ম। জেলাভিত্তিক চ্যালেঞ্জ জয় করুন, দুর্বলতা কাটিয়ে উঠুন এবং আপনার হাউজকে বিজয়ী করুন।
            </p>
          </div>

          <button
            onClick={() => setShowHouseModal(true)}
            className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${currentHouse.bgGradient} border ${currentHouse.borderColor} hover:scale-[1.02] transition-all text-left relative overflow-hidden shrink-0 w-full sm:w-auto cursor-pointer`}
          >
            <div className="text-2xl">{currentHouse.flagEmoji}</div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">আপনার হাউজ</span>
              <span className="block text-white font-extrabold text-sm">{currentHouse.banglaName}</span>
              <span className="block text-[10px] text-emerald-400 font-medium italic mt-0.5">"{currentHouse.motto}"</span>
            </div>
            <div className="absolute -bottom-4 -right-4 text-white opacity-5 text-8xl font-black">{currentHouse.flagEmoji}</div>
          </button>
        </div>
      </div>

      {/* Role Splits Dashboard: Scholar Role & Mentor Role */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Scholar Role Hub (Left Side) */}
        <div className="lg:col-span-7 bg-[#0f172a] rounded-3xl border border-slate-800 p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
                  <Compass className="w-5 h-5 animate-spin duration-[8000ms]" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm">স্কলার ড্যাশবোর্ড (Scholar Dashboard)</h4>
                  <p className="text-[10px] text-slate-400">ক্যাম্পেইন ডিস্ট্রিক্ট ও লেভেল প্রোগ্রেস ট্র্যাকিং</p>
                </div>
              </div>
              <div className="bg-blue-500/10 text-blue-400 text-xs font-mono font-bold px-3 py-1 rounded-full border border-blue-500/20">
                Level-Up Pass
              </div>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-[#1e293b]/45 p-3.5 rounded-2xl border border-slate-800/80 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1 leading-none">মাস্টারি পয়েন্ট</span>
                <span className="text-blue-400 font-extrabold text-lg">{scholarScore}</span>
              </div>
              <div className="bg-[#1e293b]/45 p-3.5 rounded-2xl border border-slate-800/80 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1 leading-none">সিকিউরড ডিস্ট্রিক্ট</span>
                <span className="text-emerald-400 font-extrabold text-lg">{unlockedChaptersCount}</span>
              </div>
              <div className="bg-[#1e293b]/45 p-3.5 rounded-2xl border border-slate-800/80 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1 leading-none">টানা পড়াশোনা (দিন)</span>
                <span className="text-orange-400 font-extrabold text-lg flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-orange-500/10" />
                  {currentStreak}
                </span>
              </div>
            </div>

            {/* Emergency Rescue Prompt */}
            {userData?.rescueChapters && userData.rescueChapters.length > 0 ? (
              <div className="bg-rose-950/20 border border-rose-500/25 rounded-2xl p-4 flex gap-4 items-start mb-6">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
                <div className="space-y-1">
                  <h5 className="text-rose-400 font-extrabold text-xs">জরুরি উদ্ধার মিশন সক্রিয়া (Halt! Distress Active)</h5>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    আপনার {userData.rescueChapters.length}টি ডিস্ট্রিক্ট বর্তমানে দুর্বল স্কোরের জন্য <span className="font-bold text-rose-400">At Risk</span> অবস্থায় রয়েছে। ট্রায়াল সম্পন্ন করতে এখনই ক্যাম্পেইন ম্যাপে গিয়ে এই জোনগুলোকে উদ্ধার ও সিকিউর করুন!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-950/10 border border-emerald-500/15 rounded-2xl p-4 flex gap-3 items-center mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <p className="text-[11px] text-slate-400 leading-normal">
                  আপনার সকল সক্রিয় ডিস্ট্রিক্ট সম্পূর্ণ নিরাপদ। নতুন ডিস্ট্রিক্ট সিকিউর করতে নিচের ক্যাম্পেইন সিলেক্ট করুন।
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={onShowLeaderboard}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all text-xs uppercase cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              হাউজ ওয়ার র‍্যাংকিং
            </button>
            <button
              onClick={onShowShop}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-950 border border-slate-800 hover:border-cyan-500/30 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all text-xs uppercase cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              রোল-আপ লুট শপ
            </button>
          </div>
        </div>

        {/* Mentor Role Hub (Right Side) */}
        <div className="lg:col-span-5 bg-[#0f172a] rounded-3xl border border-slate-800 p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm">মেন্টর সেন্টার (Mentor Center)</h4>
                  <p className="text-[10px] text-slate-400">সহকারী ও শিক্ষার্থীদের ডাউট সমাধানের মেন্টরশিপ</p>
                </div>
              </div>
            </div>

            {/* Mentor Overview Card */}
            <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80 mb-5 text-center">
              <span className="block text-[10px] font-mono tracking-widest text-emerald-400 uppercase leading-none">MENTOR RANK</span>
              <h5 className="text-white font-black text-sm mt-2">{getMentorTitle(mentorRep)}</h5>
              <div className="flex justify-center items-center gap-2 mt-3 text-xs bg-slate-900 border border-slate-850 py-1.5 px-4 rounded-xl w-fit mx-auto">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-slate-300">রেপুটেশন: <strong className="text-white">{mentorRep} Rep</strong></span>
              </div>
            </div>

            {/* Specialization tags */}
            <div className="mb-6">
              <span className="block text-[10px] uppercase font-bold text-slate-500 mb-2">মেন্টর স্পেশালাইজেশন</span>
              <div className="flex flex-wrap gap-1.5">
                {mentorRep > 15 || (userData?.mentorStats?.acceptedAnswers || 0) > 0 ? (
                  <>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/25 font-bold">Biology Plant Specialist 🌿</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded-lg border border-blue-500/25 font-bold">Physics Kinematics Pro ⚛️</span>
                  </>
                ) : (
                  <span className="text-[10px] text-slate-500 italic">অন্যদের সমস্যার সমাধান করে বাউন্টি জিতুন এবং স্পেশালাইজেশন অনলক করুন।</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              // Direct navigation click to Chapter Rescue Board
              window.history.pushState(null, '', '/doubt-arena');
              const popStateEvent = new PopStateEvent('popstate');
              window.dispatchEvent(popStateEvent);
            }}
            className="w-full flex items-center justify-between bg-gradient-to-r from-orange-600/20 to-amber-600/15 hover:from-orange-600/30 hover:to-amber-600/25 border border-orange-500/30 text-orange-300 font-extrabold py-4 px-5 rounded-2xl transition-all text-xs uppercase cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 animate-pulse" />
              <span>রেসকিউ বোর্ড (Rescue Board-এ সাহায্য করুন)</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Daily Missions Widget */}
      {userData?.dailyMissions && onClaimReward && (
        <div className="mb-10">
          <DailyMissions userData={userData} onClaimReward={onClaimReward} />
        </div>
      )}

      {/* Campaign Pathway Selections */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h2 className="text-xl font-black text-white uppercase tracking-wider">ক্যাম্পেইন পথশালা নির্বাচন (Select Campaign)</h2>
      </div>

      {/* Grid of the 4 Category Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as any)}
              className={`group text-left p-8 rounded-3xl bg-gradient-to-br ${cat.gradient} border ${cat.borderColor} transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1 block w-full relative overflow-hidden cursor-pointer`}
            >
              <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${cat.accentColor} border border-white/5 group-hover:scale-105 transition-transform duration-300 shadow-inner`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <div className="bg-slate-850 p-2 rounded-full border border-slate-850 text-slate-500 group-hover:text-white group-hover:bg-slate-850 transition-all duration-300">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors leading-none">
                    {cat.title}
                  </h3>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">
                    {cat.subTitle}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                  {cat.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Roster of Houses Modal (Self Contained UI) */}
      {showHouseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative shadow-3xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-white">অ্যাকাডেমিক হাউজে যোগ দিন</h3>
                <p className="text-xs text-slate-400 mt-1">দেশসেরা অন্য ক্যাম্পেইনারদের সাথে লড়াইয়ে শরিক হতে আপনার উপযুক্ত ডরমিটরি বেছে নিন।</p>
              </div>
              <button 
                onClick={() => setShowHouseModal(false)}
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOUSES.map((h) => {
                const isActive = h.id === userHouseId;
                return (
                  <div
                    key={h.id}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${h.bgGradient} border ${isActive ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-slate-800'} relative flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-3xl">{h.flagEmoji}</span>
                        {isActive && (
                          <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-2.5 py-0.5 rounded-full uppercase">যোগ দেওয়া আছে</span>
                        )}
                      </div>
                      <h4 className="text-white font-black text-base">{h.banglaName}</h4>
                      <p className="text-[10px] text-slate-500 font-mono tracking-wide mb-2 uppercase">{h.name}</p>
                      <p className="text-xs text-slate-400 leading-normal mb-4">{h.banglaDescription}</p>
                    </div>

                    <button
                      disabled={isActive || updatingHouse}
                      onClick={() => handleSelectHouse(h.id)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer ${
                        isActive 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-white text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {updatingHouse && !isActive ? 'প্রবেশ করা হচ্ছে...' : isActive ? 'সদস্য' : 'যোগ দিন (Select House)'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
