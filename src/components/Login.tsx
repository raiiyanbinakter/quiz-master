import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';

interface LoginProps {
  onNavigate: (view: 'signup' | 'home') => void;
  onSuccess: () => void;
}

export default function Login({ onNavigate, onSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || '';
      const errorCode = err.code || '';
      
      if (errorCode === 'auth/invalid-credential' || 
          errorCode === 'auth/user-not-found' || 
          errorCode === 'auth/wrong-password' || 
          errorMessage.includes('auth/invalid-credential') || 
          errorMessage.includes('auth/user-not-found') || 
          errorMessage.includes('auth/wrong-password')) {
        setError('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে। আবার চেষ্টা করুন।');
      } else if (errorCode === 'auth/too-many-requests' || errorMessage.includes('auth/too-many-requests')) {
        setError('অতিরিক্ত ভুল চেষ্টার কারণে আপনার অ্যাকাউন্ট সাময়িকভাবে বন্ধ করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।');
      } else if (errorCode === 'auth/network-request-failed' || errorMessage.includes('auth/network-request-failed')) {
        setError('ইন্টারনেট সংযোগ বিচ্ছিন্ন। আপনার নেটওয়ার্ক সংযোগ যাচাই করুন এবং আবার চেষ্টা করুন।');
      } else {
        setError(`লগইন করতে সমস্যা হয়েছে: ${errorMessage || 'জানা যায়নি'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('পাসওয়ার্ড রিসেট করতে আগে আপনার ইমেইল দিন।');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, email);
      setError('পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে। অনুগ্রহ করে চেক করুন।');
    } catch (err: any) {
      console.error(err);
      setError(`রিসেট লিঙ্ক পাঠাতে সমস্যা হয়েছে: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/30">
            <LogIn className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">স্বাগতম ফিরে এসেছেন</h2>
          <p className="text-slate-400 mt-2 text-sm">অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center mt-6"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'লগইন করুন'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button 
            onClick={handleForgotPassword}
            className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </button>
        </div>

        <p className="text-slate-400 text-center mt-6 text-sm">
          অ্যাকাউন্ট নেই? {' '}
          <button onClick={() => onNavigate('signup')} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            সাইন আপ করুন
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
