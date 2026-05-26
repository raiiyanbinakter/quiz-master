import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface FeedbackProps {
  user: any;
  onBack: () => void;
}

export default function Feedback({ user, onBack }: FeedbackProps) {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    setErrorMsg('');
    
    try {
      await addDoc(collection(db, 'feedbacks'), {
        userId: user?.uid || 'anonymous',
        userEmail: user?.email || 'Anonymous',
        message: message,
        status: 'unread',
        timestamp: serverTimestamp()
      });
      setSuccess(true);
      setMessage('');
      setTimeout(() => {
        setSuccess(false);
        onBack();
      }, 3000);
    } catch (err: any) {
      console.error("Error submitting feedback:", err);
      setErrorMsg('ফিডব্যাক পাঠানো যায়নি। ইন্টারনেট সংযোগ চেক করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">মতামত ও অভিযোগ</h1>
        </div>
      </div>

      <div className="bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-700 shadow-xl relative overflow-hidden">
        <p className="text-slate-300 mb-6 leading-relaxed">
          আপনার যেকোনো অভিযোগ, পরামর্শ বা অ্যাপ সম্পর্কে মতামত আমাদের জানান। আমরা দ্রুত সমাধান করার চেষ্টা করব।
        </p>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium">
            {errorMsg}
          </div>
        )}

        {success ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-emerald-400 mb-2">ধন্যবাদ!</h3>
            <p className="text-emerald-500/80">আপনার মতামত সফলভাবে আমাদের কাছে পৌঁছেছে।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-400 font-medium mb-3">আপনার বার্তা লিখুন</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 h-40 resize-none placeholder-slate-600 transition-colors"
                placeholder="আপনার অভিযোগ বা পরামর্শ এখানে বিস্তারিত লিখুন..."
              />
            </div>
            
            <button
              type="submit"
              disabled={submitting || !message.trim()}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              {submitting ? 'পাঠানো হচ্ছে...' : 'পাঠিয়ে দিন'}
              {!submitting && <Send className="w-5 h-5" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
