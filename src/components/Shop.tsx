import React, { useState } from 'react';
import { ShoppingBag, Diamond, Flame, Lock, CheckCircle2, Crown, Sparkles } from 'lucide-react';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';
import UserAvatar from './UserAvatar';

const AVATARS = [
  { id: 'avatar_bot', name: 'Cyber Bot', cost: 500, type: 'coins' as const, image: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot' },
  { id: 'avatar_ninja', name: 'Ninja', cost: 1000, type: 'coins' as const, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja' },
];

const BORDERS = [
  { id: 'border_neon', name: 'Neon Glow', cost: 50, type: 'gems' as const },
  { id: 'border_gold', name: 'Golden Flame', cost: 100, type: 'gems' as const },
];

interface ShopProps {
  user: any;
  userData: any;
  onUserDataUpdate: (data: any) => void;
  onBack: () => void;
}

export default function Shop({ user, userData, onUserDataUpdate, onBack }: ShopProps) {
  const [activeTab, setActiveTab] = useState<'avatars' | 'borders'>('avatars');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const purchasedItems = userData?.purchasedItems || ['avatar_default'];
  const equippedAvatar = userData?.equippedAvatar;
  const equippedBorder = userData?.equippedBorder;

  const handlePurchase = async (itemId: string, cost: number, currencyType: 'coins' | 'gems') => {
    if (!user) return;
    
    if (currencyType === 'coins' && (userData.coins || 0) < cost) {
      alert('Not enough Coins!');
      return;
    }
    if (currencyType === 'gems' && (userData.gems || 0) < cost) {
      alert('Not enough Gems!');
      return;
    }

    setProcessingId(itemId);
    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await transaction.get(userRef);
        const udata = userDoc.data();
        if (!udata) throw new Error('User not found');
        
        if (currencyType === 'coins' && udata.coins < cost) throw new Error('Not enough coins');
        if (currencyType === 'gems' && udata.gems < cost) throw new Error('Not enough gems');

        const currentPurchased = udata.purchasedItems || ['avatar_default'];
        if (currentPurchased.includes(itemId)) throw new Error('Already purchased');

        const updates: any = {
          purchasedItems: [...currentPurchased, itemId]
        };
        
        if (currencyType === 'coins') updates.coins = udata.coins - cost;
        if (currencyType === 'gems') updates.gems = udata.gems - cost;

        transaction.update(userRef, updates);
      });

      // Update local state
      const newItems = [...purchasedItems, itemId];
      onUserDataUpdate({
        ...userData,
        purchasedItems: newItems,
        coins: currencyType === 'coins' ? userData.coins - cost : userData.coins,
        gems: currencyType === 'gems' ? userData.gems - cost : userData.gems
      });
      alert('Purchase successful!');
    } catch (e: any) {
      alert(e.message || 'Error processing purchase');
    } finally {
      setProcessingId(null);
    }
  };

  const handleEquip = async (itemId: string, type: 'avatar' | 'border', image?: string) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const updates: any = {};
    if (type === 'avatar' && image) {
      updates.equippedAvatar = image;
    } else if (type === 'border') {
      updates.equippedBorder = itemId;
    }

    try {
      await runTransaction(db, async (transaction) => {
        transaction.update(userRef, updates);
      });
      onUserDataUpdate({ ...userData, ...updates });
    } catch (e: any) {
      alert('Error equipping item');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-emerald-400" />
            Loot Shop
          </h1>
          <p className="text-slate-400 mt-1">Upgrade your look and show off your status</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('avatars')}
            className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'avatars' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Cool Avatars
          </button>
          <button
            onClick={() => setActiveTab('borders')}
            className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${activeTab === 'borders' ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-lg shadow-yellow-500/20' : 'bg-slate-800 text-slate-400 hover:text-yellow-400'}`}
          >
            <Crown className="w-4 h-4" /> VIP Borders
          </button>
        </div>
      </div>

      {activeTab === 'avatars' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVATARS.map(avatar => {
            const isPurchased = purchasedItems.includes(avatar.id);
            const isEquipped = equippedAvatar === avatar.image;
            return (
              <div key={avatar.id} className="bg-slate-800 border border-slate-700 rounded-3xl p-6 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                <div className="flex justify-center mb-6">
                  <UserAvatar url={avatar.image} borderId={userData?.equippedBorder} className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-4">{avatar.name}</h3>
                
                {isEquipped ? (
                  <button disabled className="w-full bg-emerald-500/20 text-emerald-400 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5" /> Equipped
                  </button>
                ) : isPurchased ? (
                  <button onClick={() => handleEquip(avatar.id, 'avatar', avatar.image)} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                    Equip
                  </button>
                ) : (
                  <button 
                    onClick={() => handlePurchase(avatar.id, avatar.cost, avatar.type)}
                    disabled={processingId === avatar.id}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 hover:scale-[1.02]"
                  >
                    {processingId === avatar.id ? 'Processing...' : (
                      <>
                        <Flame className="w-5 h-5 text-yellow-200" />
                        {avatar.cost} Coins
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'borders' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BORDERS.map(border => {
            const isPurchased = purchasedItems.includes(border.id);
            const isEquipped = equippedBorder === border.id;
            return (
              <div key={border.id} className={`bg-slate-900 border ${border.id === 'border_neon' ? 'border-cyan-500/30 hover:border-cyan-400' : 'border-yellow-500/30 hover:border-yellow-400'} rounded-3xl p-6 relative overflow-hidden group transition-all`}>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="flex justify-center mb-6 py-4">
                  <UserAvatar url={equippedAvatar} borderId={border.id} className="w-24 h-24" />
                </div>
                <h3 className={`text-xl font-bold text-center mb-4 ${border.id === 'border_gold' ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200' : 'text-cyan-400'}`}>{border.name}</h3>
                
                {isEquipped ? (
                  <button disabled className="w-full bg-emerald-500/20 text-emerald-400 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5" /> Equipped
                  </button>
                ) : isPurchased ? (
                  <button onClick={() => handleEquip(border.id, 'border')} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                    Equip
                  </button>
                ) : (
                  <button 
                    onClick={() => handlePurchase(border.id, border.cost, border.type)}
                    disabled={processingId === border.id}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
                  >
                    {processingId === border.id ? 'Processing...' : (
                      <span className="flex items-center gap-1">
                        <Diamond className="w-4 h-4 text-cyan-100" />
                        {border.cost} Gems
                      </span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
          
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center text-center opacity-50 relative overflow-hidden">
             <Lock className="w-10 h-10 text-slate-500 mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">More Coming Soon</h3>
             <p className="text-slate-400">Exclusive borders will be added here</p>
          </div>
        </div>
      )}
    </div>
  );
}
