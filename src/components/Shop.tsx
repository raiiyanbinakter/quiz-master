import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Lock, Sparkles, Info, Palette } from 'lucide-react';
import { doc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import UserAvatar from './UserAvatar';

interface AvatarItem {
  id: string;
  name: string;
  image: string;
  conditionText: string;
  isUnlockedByCondition: (userData: any) => boolean;
}

interface BorderItem {
  id: string;
  name: string;
  conditionText: string;
  isUnlockedByCondition: (userData: any) => boolean;
}

const AVATARS: AvatarItem[] = [
  {
    id: 'avatar_default',
    name: 'ডিফল্ট অ্যাভাটার',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    conditionText: 'ডিফল্ট (সবার জন্য মুক্ত)',
    isUnlockedByCondition: () => true
  },
  {
    id: 'avatar_bot',
    name: 'সাইবার লার্নার',
    image: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot',
    conditionText: 'প্রথম অনুশীলন সম্পূর্ণ করুন',
    isUnlockedByCondition: (userData) => 
      userData?.purchasedItems?.includes('avatar_bot') || (userData?.unlockedChapters || []).length > 0
  },
  {
    id: 'avatar_ninja',
    name: 'স্টাডি নিনজা',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja',
    conditionText: 'টানা ৩ দিন অর্থবহ পড়াশোনা করুন',
    isUnlockedByCondition: (userData) => 
      userData?.purchasedItems?.includes('avatar_ninja') || (userData?.currentStreak || 0) >= 3
  },
  {
    id: 'avatar_scholar',
    name: 'মেধা অর্জক',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=scholar',
    conditionText: 'ডাউট সহায়তায় একটি সহায়ক উত্তর দিন',
    isUnlockedByCondition: (userData) => 
      userData?.purchasedItems?.includes('avatar_scholar') || (userData?.mentorStats?.answerCount || 0) > 0
  },
  {
    id: 'avatar_master',
    name: 'রুটিন মাস্টার',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=master',
    conditionText: '৭ দিনের রুটিন সম্পন্ন করুন',
    isUnlockedByCondition: (userData) => 
      userData?.purchasedItems?.includes('avatar_master')
  }
];

const BORDERS: BorderItem[] = [
  {
    id: 'border_none',
    name: 'ডিফল্ট (কোনো বর্ডার নেই)',
    conditionText: 'ডিফল্ট (সবার জন্য মুক্ত)',
    isUnlockedByCondition: () => true
  },
  {
    id: 'border_neon',
    name: 'নিয়োন গ্লো',
    conditionText: 'প্রথম অনুশীলন কুইজ সম্পন্ন করুন',
    isUnlockedByCondition: (userData) => 
      userData?.purchasedItems?.includes('border_neon') || (userData?.unlockedChapters || []).length > 0
  },
  {
    id: 'border_gold',
    name: 'গোল্ডেন ফ্লেম',
    conditionText: 'টানা ৩ দিন অর্থবহ পড়াশোনা করুন',
    isUnlockedByCondition: (userData) => 
      userData?.purchasedItems?.includes('border_gold') || (userData?.currentStreak || 0) >= 3
  },
  {
    id: 'border_emerald',
    name: 'এমোরাল্ড শাইন',
    conditionText: 'ডাউট সহায়তায় একটি সেরা উত্তর দিন',
    isUnlockedByCondition: (userData) => 
      userData?.purchasedItems?.includes('border_emerald') || (userData?.mentorStats?.acceptedAnswers || 0) > 0
  },
  {
    id: 'border_violet',
    name: 'রয়েল নাইট',
    conditionText: 'শিগগিরই আনলক করা যাবে',
    isUnlockedByCondition: (userData) => 
      userData?.purchasedItems?.includes('border_violet')
  }
];

interface ShopProps {
  user: any;
  userData: any;
  onUserDataUpdate: (data: any) => void;
  onBack: () => void;
}

export default function Shop({ user, userData, onUserDataUpdate, onBack }: ShopProps) {
  const [activeTab, setActiveTab] = useState<'avatars' | 'borders'>('avatars');
  const [equipLoading, setEquipLoading] = useState<string | null>(null);

  const purchasedItems: string[] = userData?.purchasedItems || ['avatar_default', 'border_none'];
  const equippedAvatar = userData?.equippedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix';
  const equippedBorder = userData?.equippedBorder || 'border_none';

  const handleEquipAvatar = async (avatar: AvatarItem) => {
    if (!user?.uid) return;
    setEquipLoading(avatar.id);

    try {
      const updates: any = {
        equippedAvatar: avatar.image
      };

      if (!purchasedItems.includes(avatar.id)) {
        updates.purchasedItems = arrayUnion(avatar.id);
      }

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, updates, { merge: true });

      const newPurchased = Array.from(new Set([...purchasedItems, avatar.id]));
      onUserDataUpdate({
        ...userData,
        equippedAvatar: avatar.image,
        purchasedItems: newPurchased
      });
    } catch (err) {
      console.error('Error equipping avatar:', err);
    } finally {
      setEquipLoading(null);
    }
  };

  const handleEquipBorder = async (border: BorderItem) => {
    if (!user?.uid) return;
    setEquipLoading(border.id);

    try {
      const targetBorderId = border.id === 'border_none' ? '' : border.id;
      const updates: any = {
        equippedBorder: targetBorderId
      };

      if (!purchasedItems.includes(border.id)) {
        updates.purchasedItems = arrayUnion(border.id);
      }

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, updates, { merge: true });

      const newPurchased = Array.from(new Set([...purchasedItems, border.id]));
      onUserDataUpdate({
        ...userData,
        equippedBorder: targetBorderId,
        purchasedItems: newPurchased
      });
    } catch (err) {
      console.error('Error equipping border:', err);
    } finally {
      setEquipLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* 1. HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-colors text-slate-300 hover:text-white cursor-pointer"
            title="ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Palette className="w-6 h-6 text-indigo-400" />
              প্রোফাইল সাজান
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              অ্যাভাটার ও বর্ডার দিয়ে প্রোফাইলকে নিজের মতো সাজান।
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('avatars')}
            className={`flex-1 md:flex-none px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'avatars' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            অ্যাভাটার
          </button>
          <button
            onClick={() => setActiveTab('borders')}
            className={`flex-1 md:flex-none px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'borders' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            প্রোফাইল বর্ডার
          </button>
        </div>
      </div>

      {/* 2. EXPLANATION BANNER */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-300 leading-relaxed shadow-sm">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <p>
          অ্যাভাটার ও বর্ডার আপনার প্রোফাইলকে ব্যক্তিগত করে। এগুলো পড়ার সুযোগ, র্যাঙ্ক বা উত্তর-মান পরিবর্তন করে না।
        </p>
      </div>

      {/* 3. AVATARS TAB */}
      {activeTab === 'avatars' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {AVATARS.map((avatar) => {
            const isUnlocked = avatar.isUnlockedByCondition(userData);
            const isEquipped = equippedAvatar === avatar.image;
            const isLoading = equipLoading === avatar.id;

            return (
              <div 
                key={avatar.id} 
                className={`bg-slate-900 border ${
                  isEquipped ? 'border-emerald-500/50' : 'border-slate-800'
                } rounded-3xl p-6 flex flex-col justify-between transition-all relative overflow-hidden`}
              >
                <div>
                  <div className="flex justify-center mb-5 py-2">
                    <UserAvatar url={avatar.image} borderId={equippedBorder} className="w-24 h-24" />
                  </div>
                  <h3 className="text-base font-extrabold text-white text-center mb-1">
                    {avatar.name}
                  </h3>
                </div>

                <div className="mt-4 space-y-3 pt-3 border-t border-slate-800">
                  {isEquipped ? (
                    <button disabled className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>সক্রিয় রয়েছে</span>
                    </button>
                  ) : isUnlocked ? (
                    <button 
                      onClick={() => handleEquipAvatar(avatar)}
                      disabled={isLoading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                    >
                      {isLoading ? 'সক্রিয় হচ্ছে...' : 'ব্যবহার করুন'}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center flex items-center justify-center gap-1.5 font-medium">
                        <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{avatar.conditionText}</span>
                      </div>
                      <button disabled className="w-full bg-slate-800/60 text-slate-500 font-bold py-2.5 rounded-xl text-xs cursor-not-allowed border border-slate-800">
                        লক্ষ্য পূরণ করুন
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. BORDERS TAB */}
      {activeTab === 'borders' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {BORDERS.map((border) => {
            const isUnlocked = border.isUnlockedByCondition(userData);
            const isEquipped = (border.id === 'border_none' && (!equippedBorder || equippedBorder === 'border_none')) || equippedBorder === border.id;
            const isLoading = equipLoading === border.id;

            return (
              <div 
                key={border.id} 
                className={`bg-slate-900 border ${
                  isEquipped ? 'border-emerald-500/50' : 'border-slate-800'
                } rounded-3xl p-6 flex flex-col justify-between transition-all relative overflow-hidden`}
              >
                <div>
                  <div className="flex justify-center mb-5 py-2">
                    <UserAvatar url={equippedAvatar} borderId={border.id === 'border_none' ? '' : border.id} className="w-24 h-24" />
                  </div>
                  <h3 className="text-base font-extrabold text-white text-center mb-1">
                    {border.name}
                  </h3>
                </div>

                <div className="mt-4 space-y-3 pt-3 border-t border-slate-800">
                  {isEquipped ? (
                    <button disabled className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>সক্রিয় রয়েছে</span>
                    </button>
                  ) : isUnlocked ? (
                    <button 
                      onClick={() => handleEquipBorder(border)}
                      disabled={isLoading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                    >
                      {isLoading ? 'সক্রিয় হচ্ছে...' : 'ব্যবহার করুন'}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center flex items-center justify-center gap-1.5 font-medium">
                        <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{border.conditionText}</span>
                      </div>
                      <button disabled className="w-full bg-slate-800/60 text-slate-500 font-bold py-2.5 rounded-xl text-xs cursor-not-allowed border border-slate-800">
                        লক্ষ্য পূরণ করুন
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
