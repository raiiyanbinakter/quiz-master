import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { UserPlus, Loader2, AlertCircle } from 'lucide-react';

interface SignUpProps {
  onNavigate: (view: 'login' | 'home') => void;
  onSuccess: () => void;
}

export default function SignUp({ onNavigate, onSuccess }: SignUpProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
        
        // Create user document in Firestore with strict default role 'user'
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: email,
          name: name,
          role: 'user',
          coins: 100,
          gems: 0,
          energy: 5,
          isPro: false,
          currentStreak: 0,
          lastActiveDate: new Date().toISOString().split('T')[0],
          lastEnergyUpdate: Date.now(),
          purchasedItems: ["avatar_default"],
          equippedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
          equippedBorder: "none",
          createdAt: serverTimestamp()
        });
      }
      onSuccess();
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || '';
      const errorCode = err.code || '';

      if (errorCode === 'auth/email-already-in-use' || errorMessage.includes('auth/email-already-in-use')) {
        setError('এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট খোলা আছে। লগইন পেজ ব্যবহার করুন।');
      } else if (errorCode === 'auth/weak-password' || errorMessage.includes('auth/weak-password')) {
        setError('পাসওয়ার্ড খুব দুর্বল। অন্তত ৬ অক্ষরের পাসওয়ার্ড দিন।');
      } else if (errorCode === 'auth/invalid-email' || errorMessage.includes('auth/invalid-email')) {
        setError('ইমেইলটি সঠিক নয়। অনুগ্রহ করে সঠিক ইমেইল দিন।');
      } else if (errorCode === 'auth/network-request-failed' || errorMessage.includes('auth/network-request-failed')) {
        setError('ইন্টারনেট সংযোগ বিচ্ছিন্ন। আপনার নেটওয়ার্ক সংযোগ যাচাই করুন এবং আবার চেষ্টা করুন।');
      } else if (errorCode === 'auth/invalid-credential' || errorMessage.includes('auth/invalid-credential')) {
        setError('অনুমতি পাওয়া যায়নি (Invalid Credential)। আপনার নেটওয়ার্ক বা কনফিগারেশন চেক করুন।');
      } else {
        setError(`অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে: ${errorMessage || 'জানা যায়নি'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/30">
            <UserPlus className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">নতুন অ্যাকাউন্ট খুলুন</h2>
          <p className="text-slate-400 mt-2 text-sm">ক্যুইজ খেলতে অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">আপনার নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="রহিম উদ্দিন"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center mt-6"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'সাইন আপ'}
          </button>
        </form>

        <p className="text-slate-400 text-center mt-6 text-sm">
          ইতোমধ্যে অ্যাকাউন্ট আছে? {' '}
          <button onClick={() => onNavigate('login')} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            লগইন করুন
          </button>
        </p>

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-blue-300 text-xs text-center">
            <strong>নোট:</strong> আপনার ফায়ারবেস কনসোলে (Firebase Console) Email/Password Authentication চালু (Enable) থাকতে হবে।
          </p>
        </div>
      </div>
    </div>
  );
}
