import React, { useState, useEffect } from 'react';
import { 
  Flame, ArrowLeft, Trophy, MessageCircle, HelpCircle, 
  CheckCircle2, Image as ImageIcon, Send, ThumbsUp, Loader2, 
  Filter, BookOpen, Crown, Star, Award, ShieldAlert, Zap, Users
} from 'lucide-react';
import { 
  collection, doc, serverTimestamp, query, orderBy, 
  onSnapshot, runTransaction, increment, addDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import RankBadge from './RankBadge';
import UserAvatar from './UserAvatar';

interface DoubtArenaProps {
  user: any;
  userData: any;
  onBack: () => void;
  setUserData: (data: any) => void;
  syllabus: any[];
  initialSubject?: string;
  initialChapter?: string;
  onUpdateMissionProgress?: (missionId: string, increment: number) => void;
}

export default function DoubtArena({ 
  user, 
  userData, 
  onBack, 
  setUserData, 
  syllabus, 
  initialSubject, 
  initialChapter,
  onUpdateMissionProgress 
}: DoubtArenaProps) {
  const [doubts, setDoubts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'feed' | 'post' | 'detail'>('feed');
  
  // Filter state
  const [filterSubject, setFilterSubject] = useState<string>(initialSubject || 'all');
  const [filterChapter, setFilterChapter] = useState<string>(initialChapter || 'all');
  const [filterType, setFilterType] = useState<'all' | 'doubt' | 'retry_boost'>('all');

  useEffect(() => {
    if (initialSubject) {
      setFilterSubject(initialSubject);
    }
    if (initialChapter) {
      setFilterChapter(initialChapter);
    }
  }, [initialSubject, initialChapter]);

  // Post state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [postSubject, setPostSubject] = useState<string>('');
  const [postChapter, setPostChapter] = useState<string>('');
  const [postType, setPostType] = useState<'doubt' | 'retry_boost'>('doubt');
  const [posting, setPosting] = useState(false);

  // Detail state
  const [selectedDoubtId, setSelectedDoubtId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [answerText, setAnswerText] = useState('');
  const [answering, setAnswering] = useState(false);

  // Dynamically derive selectedDoubt from doubts collection and selectedDoubtId
  const selectedDoubt = React.useMemo(() => {
    if (!selectedDoubtId) return null;
    return doubts.find(d => d.id === selectedDoubtId) || null;
  }, [doubts, selectedDoubtId]);

  // Dynamically compute syllabus map from prop
  const doubtSyllabus = React.useMemo(() => {
    const sMap: Record<string, string[]> = {};
    if (syllabus && Array.isArray(syllabus)) {
      syllabus.forEach((sub: any) => {
        if (sub && sub.name && sub.chapters) {
          sMap[sub.name] = sub.chapters;
        }
      });
    }
    return sMap;
  }, [syllabus]);

  useEffect(() => {
    const q = query(collection(db, 'doubts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const dbts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoubts(dbts);
        setLoading(false);
      },
      (error) => {
        console.warn('Doubts snapshot error:', error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (view === 'detail' && selectedDoubtId && selectedDoubt?.type === 'doubt') {
      const q = collection(db, `doubts/${selectedDoubtId}/answers`);
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const rawAnswers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          rawAnswers.sort((a: any, b: any) => {
            const upDiff = (b.upvotes || 0) - (a.upvotes || 0);
            if (upDiff !== 0) return upDiff;
            const aTime = a.timestamp?.toMillis ? a.timestamp.toMillis() : (a.timestamp?.seconds ? a.timestamp.seconds * 1000 : 0);
            const bTime = b.timestamp?.toMillis ? b.timestamp.toMillis() : (b.timestamp?.seconds ? b.timestamp.seconds * 1000 : 0);
            return aTime - bTime;
          });
          setAnswers(rawAnswers);
        },
        (error) => {
          console.warn('Answers snapshot error:', error);
        }
      );
      return unsubscribe;
    }
  }, [view, selectedDoubtId, selectedDoubt?.type]);

  const handlePostDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('ডাউট পোস্ট করতে অনুগ্রহ করে আগে লগইন করুন।');
    
    // Check energy rules
    if (!userData?.isPro && userData?.energy <= 0) {
      alert('এনার্জি শেষ! রিঅ্যাক্টিভ হতে অপেক্ষা করুন অথবা প্রিমিয়াম আপগ্রেড করুন।');
      return;
    }
    
    // Verify coins based on post type (Doubt: 5 coins, Retry Boost is free but requests help)
    const requiredCoins = postType === 'doubt' ? 5 : 0;
    if (userData?.coins < requiredCoins) {
      alert(`দুঃখিত! এই অ্যাকশনের জন্য আপনার ${requiredCoins} কয়েন ব্যালেন্স প্রয়োজন।`);
      return;
    }

    if (!postSubject || !postChapter) return alert('দয়া করে বিষয় ও অধ্যায় সিলেক্ট করুন।');
    
    setPosting(true);
    try {
      let uploadedImageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const res = await fetch('https://api.imgbb.com/1/upload?key=95bef9cb5cf5eaa509b25463ce10f0e1', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          uploadedImageUrl = data.data.display_url;
        } else {
          throw new Error('Failed to upload image to ImgBB');
        }
      }

      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await transaction.get(userRef);
        const udata = userDoc.data();
        if (!userDoc.exists() || udata.coins < requiredCoins) {
          throw new Error('Not enough coins');
        }
        if (!udata.isPro && udata.energy <= 0) {
          throw new Error('Out of energy');
        }
        
        let updates: any = { coins: increment(-requiredCoins) };
        if (!udata.isPro) {
          updates.energy = increment(-1);
        }
        transaction.update(userRef, updates);
        
        const newDoubtRef = doc(collection(db, 'doubts'));
        transaction.set(newDoubtRef, {
          askedByUid: user.uid,
          askedByName: userData?.name || 'Anonymous',
          askedByIsPro: userData?.isPro || false,
          askedByCoins: userData?.coins || 0,
          askedByAvatar: userData?.equippedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          askedByBorder: userData?.equippedBorder || 'none',
          askedByReputation: userData?.reputation || 0,
          type: postType,
          title: postType === 'retry_boost' ? `⚡ Distress Trial Retry request from ${userData.name || 'Student'}` : title,
          description,
          imageUrl: uploadedImageUrl,
          subject: postSubject,
          chapter: postChapter,
          bounty: postType === 'doubt' ? 10 : 0,
          isResolved: false,
          timestamp: serverTimestamp()
        });
      });
      
      // Update local state proactively
      setUserData({ 
        ...userData, 
        coins: userData.coins - requiredCoins,
        energy: userData.isPro ? userData.energy : Math.max(0, userData.energy - 1)
      });

      // Track posted doubt in daily missions
      if (onUpdateMissionProgress && postType === 'doubt') {
        onUpdateMissionProgress('post_doubt', 1);
      }

      setTitle('');
      setDescription('');
      setImageFile(null);
      setPostSubject('');
      setPostChapter('');
      setView('feed');
    } catch (e: any) {
      alert(e.message || 'Error posting to Doubt Arena.');
    } finally {
      setPosting(false);
    }
  };

  const handlePostAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('অনুগ্রহ করে উত্তর দিতে আগে লগইন করুন।');
    if (!answerText.trim()) return;
    if (selectedDoubt.askedByUid === user.uid) return alert('আপনি নিজের পোস্টে নিজেই উত্তর দিতে পারবেন না।');

    setAnswering(true);
    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await transaction.get(userRef);
        const udata = userDoc.data() || {};
        const currentRep = udata.reputation || 0;

        const newAnswerRef = doc(collection(db, `doubts/${selectedDoubt.id}/answers`));
        transaction.set(newAnswerRef, {
          answeredByUid: user.uid,
          answeredByName: userData?.name || 'Anonymous',
          answeredByIsPro: userData?.isPro || false,
          answeredByCoins: userData?.coins || 0,
          answeredByAvatar: userData?.equippedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          answeredByBorder: userData?.equippedBorder || 'none',
          answeredByReputation: currentRep + 5,
          text: answerText,
          upvotes: 0,
          upvotedBy: [],
          isBest: false,
          timestamp: serverTimestamp()
        });

        const currentAnswersCount = udata.mentorStats?.answerCount || 0;
        transaction.update(userRef, {
          reputation: increment(5),
          'mentorStats.answerCount': currentAnswersCount + 1
        });
      });

      setUserData({
        ...userData,
        reputation: (userData.reputation || 0) + 5,
        mentorStats: {
          ...(userData.mentorStats || {}),
          answerCount: (userData.mentorStats?.answerCount || 0) + 1
        }
      });
      setAnswerText('');
    } catch (e) {
      console.error(e);
      alert('Error posting answer.');
    } finally {
      setAnswering(false);
    }
  };

  const handleUpvote = async (answer: any) => {
    if (!user) return alert('লাইক করতে আগে লগইন করুন।');
    if (answer.upvotedBy?.includes(user.uid)) return;

    try {
      const answerRef = doc(db, `doubts/${selectedDoubt.id}/answers`, answer.id);
      
      await runTransaction(db, async (transaction) => {
        transaction.update(answerRef, {
          upvotes: increment(1),
          upvotedBy: [...(answer.upvotedBy || []), user.uid]
        });

        const solverRef = doc(db, 'users', answer.answeredByUid);
        transaction.update(solverRef, {
          reputation: increment(2)
        });
      });

      if (onUpdateMissionProgress) {
        onUpdateMissionProgress('upvote_doubt', 1);
      }
    } catch (e) {
      console.error('Error upvoting', e);
    }
  };

  const handleMarkBest = async (answer: any) => {
    if (!user) return;
    if (selectedDoubt.askedByUid !== user.uid) return alert('শুধুমাত্র প্রশ্নকারী এই উত্তরটি সেরা নির্বাচিত করতে পারবে।');
    if (selectedDoubt.isResolved) return alert('এই পোস্টটি ইতিমধ্যে সমাধানকৃত!');

    try {
      await runTransaction(db, async (transaction) => {
        const doubtRef = doc(db, 'doubts', selectedDoubt.id);
        const answerRef = doc(db, `doubts/${selectedDoubt.id}/answers`, answer.id);
        const solverRef = doc(db, 'users', answer.answeredByUid);

        transaction.update(doubtRef, { isResolved: true });
        transaction.update(answerRef, { isBest: true });

        const solverDoc = await transaction.get(solverRef);
        if (solverDoc.exists()) {
          const sData = solverDoc.data() || {};
          const currentAcceptedAnswers = sData.mentorStats?.acceptedAnswers || 0;
          const currentRepVal = (sData.reputation || 0) + 15;
          
          let rankLabel = 'সহকারী শিক্ষানবিস (Help Apprentice)';
          if (currentRepVal > 55) rankLabel = 'সিনিয়র মেন্টর (Chief Mentor Giga Specialist) 🎓';
          else if (currentRepVal > 20) rankLabel = 'অনলাইন মেন্টর (Verified online Mentor)';
          else if (currentRepVal > 0) rankLabel = 'সহযোগী পরামর্শক (Expert Assistant)';

          transaction.update(solverRef, { 
            coins: increment(15),
            reputation: increment(15),
            'mentorStats.acceptedAnswers': currentAcceptedAnswers + 1,
            'mentorStats.mentorRankLabel': rankLabel
          });
        }
      });
      const { recordMeaningfulActionInFirestore } = await import('../lib/gamificationService');
      await recordMeaningfulActionInFirestore(answer.answeredByUid, {
        type: 'accepted_helpful_answer',
        eventId: `doubt_accepted_${answer.id}`
      });

      alert('সফল হয়েছে! সেরা উত্তরটি গৃহীত হয়েছে এবং সহায়ক মেন্টরের পয়েন্ট ও অর্জন আপডেট করা হয়েছে।');
    } catch (e) {
      alert('Error marking best answer.');
    }
  };

  const handleGrantRetryBoost = async (doubtItem: any) => {
    if (!user) return alert('গ্রান্ট করতে আগে লগইন করুন।');
    if (doubtItem.askedByUid === user.uid) return alert('আপনি নিজের পোস্টে নিজে বুস্ট করতে পারবেন না।');

    try {
      await runTransaction(db, async (transaction) => {
        const doubtRef = doc(db, 'doubts', doubtItem.id);
        const recipientRef = doc(db, 'users', doubtItem.askedByUid);
        const donorRef = doc(db, 'users', user.uid);

        // Mark request resolved
        transaction.update(doubtRef, { isResolved: true });

        // Update recipient rescue chapters list to grant retry boost
        const recipientDoc = await transaction.get(recipientRef);
        if (recipientDoc.exists()) {
          const recipData = recipientDoc.data();
          const targetChap = `${doubtItem.subject}_${doubtItem.chapter}`;
          const currentRescues = recipData.rescueChapters || [];
          
          // Remove the chapter
          const updatedRescues = currentRescues.filter((rc: string) => rc !== targetChap && !rc.includes(doubtItem.chapter));
          transaction.update(recipientRef, {
            rescueChapters: updatedRescues,
            energy: Math.min(5, (recipData.energy || 0) + 1) // Give them +1 free try energy directly!
          });
        }

        // Reward the donor mentor +10 Reputation points for doing a mentor duty
        transaction.update(donorRef, {
          reputation: increment(10)
        });
      });

      alert('সফলভাবে বুস্ট প্রদান করা হয়েছে! সহপাঠীর রেসকিউ সম্পন্ন হয়েছে এবং মেন্টর হিসেবে আপনি +১০ মেডেল রেপুটেশন পেয়েছেন! ⚡');
    } catch (e) {
      console.error(e);
      alert('বুস্ট প্রদান করতে কোনো সমস্যা হয়েছে।');
    }
  };

  const filteredDoubts = doubts.filter(d => {
    if (filterSubject !== 'all' && d.subject !== filterSubject) return false;
    if (filterChapter !== 'all' && d.chapter !== filterChapter) return false;
    if (filterType !== 'all' && d.type !== filterType) return false;
    return true;
  });

  const getSubjectColor = (subject: string) => {
    if (subject.includes('পদার্থ') || subject.includes('Phys')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (subject.includes('রসায়ন') || subject.includes('Chem')) return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
    if (subject.includes('গণিত') || subject.includes('Math')) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    if (subject.includes('জীব') || subject.includes('Bio')) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (view === 'detail' || view === 'post') setView('feed');
              else onBack();
            }}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-[#f43f5e]/15 p-2.5 rounded-xl border border-rose-500/20">
              <ShieldAlert className="w-6 h-6 text-rose-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">ডাউট সহায়তা ফোরাম</h1>
              <p className="text-xs text-slate-400">অ্যাকাডেমিক ডাউট পোস্ট ও পিয়ার-টু-পিয়ার সাহায্য</p>
            </div>
          </div>
        </div>

        {view === 'feed' && user && (
          <button 
            onClick={() => setView('post')}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 animate-bounce" />
            সহায়তা চেয়ে পোস্ট (Post Help Signal)
          </button>
        )}
      </div>

      {view === 'feed' && (
        <div className="space-y-4 animate-in fade-in duration-250">
          
          {/* Quick Stats Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-[#1E1B2C] to-[#120F1D] border border-violet-500/20 rounded-2xl p-4 flex gap-3.5 items-center">
              <div className="p-3 bg-violet-600/10 border border-violet-500/30 rounded-xl text-violet-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-slate-400 text-xs font-semibold">মোট ডিস্ট্রেস রেসকিউস</span>
                <span className="text-white text-lg font-black">{doubts.filter(d => !d.isResolved).length} টি উন্মুক্ত কেস</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1C251D] to-[#0F1410] border border-emerald-500/20 rounded-2xl p-4 flex gap-3.5 items-center">
              <div className="p-3 bg-emerald-600/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="block text-slate-400 text-xs font-semibold">সফল রেসকিউ মিশন</span>
                <span className="text-emerald-400 text-lg font-black">{doubts.filter(d => d.isResolved).length} টি সমাধানকৃত</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col md:flex-row gap-4 mb-6 items-end">
            <div className="flex-1 relative w-full">
               <label className="block text-slate-400 font-bold mb-2 text-xs">বিষয় ফিল্টারিং (Subject)</label>
               <select
                 value={filterSubject}
                 onChange={e => { setFilterSubject(e.target.value); setFilterChapter('all'); }}
                 className="w-full bg-slate-900 border border-slate-750 rounded-xl pl-4 pr-3 py-3 text-white focus:outline-none focus:border-rose-500 text-sm appearance-none cursor-pointer"
               >
                 <option value="all">সকল বিষয় (All Subjects)</option>
                 {Object.keys(doubtSyllabus).map(subject => (
                   <option key={subject} value={subject}>{subject}</option>
                 ))}
               </select>
            </div>
            <div className="flex-1 relative w-full">
               <label className="block text-slate-400 font-bold mb-2 text-xs">অধ্যায় ফিল্টারিং (Chapter)</label>
               <select
                 value={filterChapter}
                 onChange={e => setFilterChapter(e.target.value)}
                 disabled={filterSubject === 'all'}
                 className="w-full bg-slate-900 border border-slate-750 rounded-xl pl-4 pr-3 py-3 text-white focus:outline-none focus:border-rose-500 text-sm disabled:opacity-50 appearance-none cursor-pointer"
               >
                 <option value="all">সকল অধ্যায় (All Chapters)</option>
                 {filterSubject !== 'all' && doubtSyllabus[filterSubject]?.map((chap) => (
                   <option key={chap} value={chap}>{chap}</option>
                 ))}
               </select>
            </div>
            <div className="flex-1 relative w-full">
               <label className="block text-slate-400 font-bold mb-2 text-xs">ক্যাটাগরি</label>
               <select
                 value={filterType}
                 onChange={e => setFilterType(e.target.value as any)}
                 className="w-full bg-slate-900 border border-slate-750 rounded-xl pl-4 pr-3 py-3 text-white focus:outline-none focus:border-rose-500 text-sm appearance-none cursor-pointer"
               >
                 <option value="all">সব পোস্ট (All Signals)</option>
                 <option value="doubt">একাডেমিক ডাউট (Doubts)</option>
                 <option value="retry_boost">রেসকিউ এনার্জি বুস্ট (Retry Booster Requests)</option>
               </select>
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-rose-400 animate-spin" /></div>
          ) : filteredDoubts.length === 0 ? (
             <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800">
               <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
               <h3 className="text-lg font-black text-slate-300 mb-2">কোনো উন্মুক্ত সিগন্যাল পাওয়া যায়নি</h3>
               <p className="text-slate-500 text-xs">এই ক্যাটাগরিতে প্রথম সাহায্য সিগন্যালটি আপনি চাইলে করতে পারেন!</p>
             </div>
          ) : filteredDoubts.map(doubt => {
            const isRetryRequest = doubt.type === 'retry_boost';
            return (
              <div 
                key={doubt.id} 
                onClick={() => {
                  if (!isRetryRequest) {
                    setSelectedDoubtId(doubt.id); 
                    setView('detail');
                  }
                }}
                className={`bg-slate-800 hover:bg-slate-750/90 transition-all duration-200 rounded-3xl p-6 border ${isRetryRequest ? 'border-orange-500/25 bg-[#251b14]/90 shadow-[0_0_15px_rgba(249,115,22,0.06)]' : 'border-slate-700/80 shadow-lg'} cursor-pointer flex flex-col gap-4 relative overflow-hidden`}
              >
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    {isRetryRequest ? (
                      <span className="inline-flex gap-1 items-center font-black text-orange-400 tracking-wide text-xs bg-orange-500/10 border border-orange-500/20 py-1 px-3 mb-2 rounded-full uppercase">
                        <Zap className="w-3.5 h-3.5" /> Energy Retry Boost Distress
                      </span>
                    ) : (
                      <span className="inline-flex gap-1 items-center font-bold text-blue-400 tracking-wide text-xs bg-blue-500/10 border border-blue-500/20 py-1 px-3 mb-2 rounded-full uppercase">
                        <HelpCircle className="w-3.5 h-3.5" /> Academic Doubt
                      </span>
                    )}
                    <h3 className="text-lg font-black text-white leading-tight mt-1">{doubt.title}</h3>
                  </div>

                  {doubt.isResolved ? (
                    <span className="shrink-0 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                    </span>
                  ) : (
                    <span className={`shrink-0 ${isRetryRequest ? 'bg-orange-500/25 border-orange-500/35 text-orange-400' : 'bg-rose-500/20 border-rose-500/30 text-rose-400'} px-3.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 uppercase tracking-wider`}>
                      <Flame className="w-3.5 h-3.5 shrink-0" /> {isRetryRequest ? 'Urgent Boost!' : `Bounty: ${doubt.bounty}`}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {doubt.subject && (
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${getSubjectColor(doubt.subject)} flex items-center gap-1`}>
                      <BookOpen className="w-3 h-3" /> {doubt.subject}
                    </span>
                  )}
                  {doubt.chapter && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border bg-slate-700/50 text-slate-300 border-slate-650 truncate max-w-[170px]">
                      {doubt.chapter}
                    </span>
                  )}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-1 line-clamp-3">{doubt.description}</p>

                {/* Boost Button directly visible inside feed card to make UI extremely active & high-quality */}
                {isRetryRequest && !doubt.isResolved && doubt.askedByUid !== user?.uid && (
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
                    <p className="text-[11px] text-slate-400 text-center sm:text-left leading-normal">
                      সহপাঠী বিপদে পড়েছে! ১টি ক্লিক দিয়ে ট্রায়াল আনলক করে দিন। আপনার কোনো পয়েন্ট নষ্ট হবে না, কৃতজ্ঞতাস্বরূপ আপনি পাবেন <strong>+১০ মেন্টর মেডেল</strong>।
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGrantRetryBoost(doubt);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 font-extrabold text-[#111] text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-orange-500/10 cursor-pointer text-nowrap"
                    >
                      বুস্ট রিসোর্ট করুন (+10 Rep) ⚡
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-700/40 pt-4 mt-2">
                  <span className="flex items-center gap-2">
                    <UserAvatar url={doubt.askedByAvatar} borderId={doubt.askedByBorder} className="w-5 h-5 flex-shrink-0" />
                    <span className={`font-black flex items-center gap-1 ${doubt.askedByIsPro ? 'text-yellow-400' : 'text-slate-300'}`}>
                      {doubt.askedByName} 
                      <RankBadge coins={doubt.askedByCoins || 0} showText={false} /> 
                      {doubt.askedByIsPro && <Crown className="w-3 h-3 text-yellow-400" />}
                    </span>
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" /> {doubt.askedByReputation || 0} Rep
                    </span>
                  </span>
                  <span>{doubt.timestamp?.toDate ? Math.round((Date.now() - doubt.timestamp.toDate().getTime()) / 3600000) : 0}h ago</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === 'post' && (
        <form onSubmit={handlePostDoubt} className="bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-700 shadow-xl animate-in slide-in-from-bottom-2 duration-300">
          
          {/* Post Type Selector Switch */}
          <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700/80 mb-6 font-bold">
            <button
              type="button"
              onClick={() => { setPostType('doubt'); setPostSubject(''); setPostChapter(''); }}
              className={`py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer ${postType === 'doubt' ? 'bg-rose-500 font-black text-white' : 'text-slate-400 hover:text-white'}`}
            >
              একাডেমিক ডাউট (-5 Coins)
            </button>
            <button
              type="button"
              onClick={() => { setPostType('retry_boost'); setPostSubject(''); setPostChapter(''); }}
              className={`py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer ${postType === 'retry_boost' ? 'bg-orange-500 font-black text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
              এনার্জি বুস্ট রিকোয়েস্ট (Free)
            </button>
          </div>

          <div className="mb-6 bg-[#f43f5e]/10 border border-rose-500/20 rounded-2xl p-4 flex gap-3 text-xs sm:text-sm text-slate-300">
            <Flame className="w-5 h-5 shrink-0 text-rose-400 animate-pulse" />
            <div>
              {postType === 'doubt' ? (
                <p>ডাউট পোস্ট করলে <strong>৫টি কয়েন</strong> কেটে নেওয়া হবে। মেন্টর ও সক্রিয় বন্ধুরা আপনাকে সাহায্য করার জন্য দ্রুত নোটিফাইড হবে!</p>
              ) : (
                <p>স্কোর ৮০% এর নিচে হওয়া ডিস্ট্রিক্ট পুনরায় আনলক করতে এই সাহায্য রিকোয়েস্টটি করুন। কোনো কয়েন চার্জ নেই এবং বুস্ট দেওয়ার সাথে সাথে ডিস্ট্রিক্ট সক্রিয় হবে!</p>
              )}
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-2 text-xs">বিষয় (Subject)</label>
                <select
                  value={postSubject}
                  onChange={e => { setPostSubject(e.target.value); setPostChapter(''); }}
                  required
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 appearance-none cursor-pointer text-sm"
                >
                  <option value="" disabled>বিষয় সিলেক্ট করুন (Select Subject)</option>
                  {Object.keys(doubtSyllabus).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-2 text-xs">অধ্যায় (Chapter)</label>
                <select
                  value={postChapter}
                  onChange={e => setPostChapter(e.target.value)}
                  required
                  disabled={!postSubject}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 disabled:opacity-50 appearance-none cursor-pointer text-sm"
                >
                  <option value="" disabled>অধ্যায় সিলেক্ট করুন (Select Chapter)</option>
                  {postSubject && doubtSyllabus[postSubject]?.map((chap) => (
                    <option key={chap} value={chap}>{chap}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {postType === 'doubt' && (
              <div>
                <label className="block text-slate-400 font-bold mb-2 text-xs">প্রশ্নের শিরোনাম (Doubt Title)</label>
                <input 
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required={postType === 'doubt'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 text-sm"
                  placeholder="যথা: তাপগতিবিদ্যায় এন্ট্রপির পরিবর্তন কীভাবে হিসাব করব?"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-400 font-bold mb-2 text-xs">বিস্তারিত বিবরণ (Detailed Description)</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 h-32 resize-none text-sm"
                placeholder={postType === 'doubt' 
                  ? "আপনার সমস্যা বা কুইজে ভুল হওয়া প্রশ্নটি এখানে বিস্তারিত বুঝিয়ে বলুন..." 
                  : "আমার ট্রায়াল স্কোর ৮০% নিচে এসেছে এবং এনার্জি শূন্য হয়েছে। দয়া করে আমাকে বুস্ট প্রদান করে উধাও করুন!"
                }
              />
            </div>

            {postType === 'doubt' && (
              <div>
                <label className="block text-slate-400 font-bold mb-2 text-xs text-nowrap">ছবি যুক্ত করুন, ঐচ্ছিক (Add Image, Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-slate-500" />
                  </div>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files && e.target.files.length > 0) {
                        setImageFile(e.target.files[0]);
                      } else {
                        setImageFile(null);
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-slate-300 focus:outline-none focus:border-rose-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-rose-500 file:text-white hover:file:bg-rose-600 transition-colors cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={posting || (postType === 'doubt' && !title) || !description || !postSubject || !postChapter}
            className="w-full mt-8 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-black py-4 rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer text-sm"
          >
            {posting ? 'আপলোড হচ্ছে...' : postType === 'doubt' ? 'পোস্ট করুন' : 'বুস্ট রিকোয়েস্ট জমা দিন'}
          </button>
        </form>
      )}

      {view === 'detail' && selectedDoubt && (
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-700 shadow-xl animate-in fade-in duration-300">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-2xl font-black text-white">{selectedDoubt.title}</h2>
                {selectedDoubt.isResolved ? (
                  <span className="shrink-0 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Resolved
                  </span>
                ) : (
                  <span className="shrink-0 bg-rose-500/20 border border-rose-500/30 text-rose-400 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                    <Flame className="w-4 h-4 animate-pulse" /> Bounty: {selectedDoubt.bounty}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedDoubt.subject && (
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${getSubjectColor(selectedDoubt.subject)} flex items-center gap-1`}>
                    <BookOpen className="w-3 h-3" /> {selectedDoubt.subject}
                  </span>
                )}
                {selectedDoubt.chapter && (
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border bg-slate-700/50 text-slate-300 border-slate-650 truncate max-w-[200px]">
                    {selectedDoubt.chapter}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-slate-200 whitespace-pre-wrap leading-relaxed mb-6 text-sm sm:text-base">
              {selectedDoubt.description}
            </p>
            
            {selectedDoubt.imageUrl && (
              <div className="mb-6 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 p-2">
                <img src={selectedDoubt.imageUrl} alt="Doubt context" className="w-full max-h-96 object-contain rounded-xl" />
              </div>
            )}
            
            <div className="flex items-center text-sm text-slate-500 border-t border-slate-700/50 pt-4 mt-4">
              <span className="flex items-center gap-2">
                <UserAvatar url={selectedDoubt.askedByAvatar} borderId={selectedDoubt.askedByBorder} className="w-6 h-6 flex-shrink-0" />
                <span className={`font-black flex items-center gap-1 ${selectedDoubt.askedByIsPro ? 'text-yellow-400' : 'text-slate-300'}`}>{selectedDoubt.askedByName} <RankBadge coins={selectedDoubt.askedByCoins || 0} showText={false} /> {selectedDoubt.askedByIsPro && <Crown className="w-4 h-4 text-yellow-400" />}</span> 
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded text-[10px] flex items-center gap-0.5" title="Academic Reputation">
                  <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" /> {selectedDoubt.askedByReputation || 0} Rep
                </span>
                <span className="text-slate-500 hidden sm:inline">on {selectedDoubt.timestamp?.toDate ? selectedDoubt.timestamp.toDate().toLocaleDateString() : ''}</span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 px-2">Answers ({answers.length})</h3>
            
            {!selectedDoubt.isResolved && selectedDoubt.askedByUid !== user?.uid && (
              <form onSubmit={handlePostAnswer} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex flex-col gap-3">
                <textarea
                  value={answerText}
                  onChange={e => setAnswerText(e.target.value)}
                  placeholder="Think you know the solution? Write a detailed explanation to claim the bounty and earn +5 reputation points!"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 min-h-[100px] resize-none text-sm"
                  required
                />
                <div className="flex justify-end">
                  <button type="submit" disabled={answering || !answerText.trim()} className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-[#111] font-extrabold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors cursor-pointer text-xs uppercase">
                    <Send className="w-4 h-4" />
                    Submit Answer (+5 Rep)
                  </button>
                </div>
              </form>
            )}

            {answers.map((ans) => (
              <div key={ans.id} className={`rounded-2xl p-6 border ${ans.isBest ? 'bg-emerald-500/5 border-emerald-500/35' : 'bg-slate-800 border-slate-700'}`}>
                {ans.isBest && (
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs mb-4 bg-emerald-500/10 w-fit px-3 py-1.5 rounded-full border border-emerald-500/25">
                    <Trophy className="w-4 h-4 animate-bounce" />
                    Best Answer (+15 Coins & +15 Rep)
                  </div>
                )}
                <p className="text-slate-200 whitespace-pre-wrap leading-relaxed mb-4 text-sm sm:text-base">{ans.text}</p>
                <div className="flex items-center justify-between mt-4 border-t border-slate-700/50 pt-4">
                  <div className="flex items-center gap-4 text-sm">
                    <button 
                      onClick={() => handleUpvote(ans)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${ans.upvotedBy?.includes(user?.uid) ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {ans.upvotes || 0}
                    </button>
                    <span className="text-slate-500 flex items-center gap-2">
                       <UserAvatar url={ans.answeredByAvatar} borderId={ans.answeredByBorder} className="w-5 h-5 flex-shrink-0" />
                       <span className={`font-black flex items-center gap-1 ${ans.answeredByIsPro ? 'text-yellow-400' : 'text-slate-300'}`}>{ans.answeredByName} <RankBadge coins={ans.answeredByCoins || 0} showText={false} /> {ans.answeredByIsPro && <Crown className="w-3.5 h-3.5 text-yellow-400" />}</span>
                       <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded text-[10px] flex items-center gap-0.5" title="Academic Reputation">
                         <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" /> {ans.answeredByReputation || 0} Rep
                       </span>
                    </span>
                  </div>
                  
                  {selectedDoubt.askedByUid === user?.uid && !selectedDoubt.isResolved && (
                    <button 
                      onClick={() => handleMarkBest(ans)}
                      className="text-xs font-black text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Mark as Best (+15 Coins)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
