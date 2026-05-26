import React, { useState, useEffect } from 'react';
import { Flame, ArrowLeft, Trophy, MessageCircle, HelpCircle, CheckCircle2, Image as ImageIcon, Send, ThumbsUp, Loader2, Filter, BookOpen, Crown, Star, Award } from 'lucide-react';
import { collection, addDoc, updateDoc, doc, serverTimestamp, query, orderBy, onSnapshot, runTransaction, increment } from 'firebase/firestore';
import { db } from '../firebase';
import RankBadge from './RankBadge';
import UserAvatar from './UserAvatar';

interface DoubtArenaProps {
  user: any;
  userData: any;
  onBack: () => void;
  setUserData: (data: any) => void;
  syllabus: any[];
}

export default function DoubtArena({ user, userData, onBack, setUserData, syllabus }: DoubtArenaProps) {
  const [doubts, setDoubts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'feed' | 'post' | 'detail'>('feed');
  
  // Filter state
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterChapter, setFilterChapter] = useState<string>('all');

  // Post state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [postSubject, setPostSubject] = useState<string>('');
  const [postChapter, setPostChapter] = useState<string>('');
  const [posting, setPosting] = useState(false);

  // Detail state
  const [selectedDoubt, setSelectedDoubt] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [answerText, setAnswerText] = useState('');
  const [answering, setAnswering] = useState(false);

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
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoubts(dbts);
      setLoading(false);
      
      if (selectedDoubt) {
        const updatedSelected = dbts.find(d => d.id === selectedDoubt.id);
        if (updatedSelected) setSelectedDoubt(updatedSelected);
      }
    });
    return unsubscribe;
  }, [selectedDoubt]);

  useEffect(() => {
    if (view === 'detail' && selectedDoubt) {
      const q = query(collection(db, `doubts/${selectedDoubt.id}/answers`), orderBy('upvotes', 'desc'), orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setAnswers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return unsubscribe;
    }
  }, [view, selectedDoubt]);

  const handlePostDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Please login to post a doubt.');
    if (!userData?.isPro && userData?.energy <= 0) {
      alert('Out of Energy! Wait for regeneration or Upgrade to PRO for Unlimited Energy.');
      return;
    }
    if (userData?.coins < 10) return alert('Not enough coins! You need 10 coins to post a doubt.');
    if (!postSubject || !postChapter) return alert('Please select subject and chapter.');
    
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
        if (!userDoc.exists() || udata.coins < 10) {
          throw new Error('Not enough coins');
        }
        if (!udata.isPro && udata.energy <= 0) {
          throw new Error('Out of energy');
        }
        
        // Deduct 10 coins and 1 energy (if not PRO)
        let updates: any = { coins: increment(-10) };
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
          title,
          description,
          imageUrl: uploadedImageUrl,
          subject: postSubject,
          chapter: postChapter,
          bounty: 10,
          isResolved: false,
          timestamp: serverTimestamp()
        });
      });
      
      // Update local state proactively
      setUserData({ 
        ...userData, 
        coins: userData.coins - 10,
        energy: userData.isPro ? userData.energy : Math.max(0, userData.energy - 1)
      });
      setTitle('');
      setDescription('');
      setImageFile(null);
      setPostSubject('');
      setPostChapter('');
      setView('feed');
    } catch (e: any) {
      alert(e.message || 'Error posting doubt.');
    } finally {
      setPosting(false);
    }
  };

  const handlePostAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Please login to answer.');
    if (!answerText.trim()) return;
    if (selectedDoubt.askedByUid === user.uid) return alert('You cannot answer your own doubt.');

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
          answeredByReputation: currentRep + 5, // Instant +5 for answering
          text: answerText,
          upvotes: 0,
          upvotedBy: [],
          isBest: false,
          timestamp: serverTimestamp()
        });

        // Earn +5 reputation for answering someone else's doubt
        transaction.update(userRef, {
          reputation: increment(5)
        });
      });

      // Update local state proactively
      setUserData({
        ...userData,
        reputation: (userData.reputation || 0) + 5
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
    if (!user) return alert('Please login to upvote answers.');
    if (answer.upvotedBy?.includes(user.uid)) return; // Already upvoted

    try {
      const answerRef = doc(db, `doubts/${selectedDoubt.id}/answers`, answer.id);
      
      await runTransaction(db, async (transaction) => {
        // Increment upvotes and add voter to the list
        transaction.update(answerRef, {
          upvotes: increment(1),
          upvotedBy: [...(answer.upvotedBy || []), user.uid]
        });

        // Award +2 Reputation to the solver/answerer in Firestore
        const solverRef = doc(db, 'users', answer.answeredByUid);
        transaction.update(solverRef, {
          reputation: increment(2)
        });
      });
    } catch (e) {
      console.error('Error upvoting', e);
    }
  };

  const handleMarkBest = async (answer: any) => {
    if (!user) return;
    if (selectedDoubt.askedByUid !== user.uid) return alert('Only the original poster can mark the best answer.');
    if (selectedDoubt.isResolved) return alert('This doubt is already resolved.');

    try {
      await runTransaction(db, async (transaction) => {
        const doubtRef = doc(db, 'doubts', selectedDoubt.id);
        const answerRef = doc(db, `doubts/${selectedDoubt.id}/answers`, answer.id);
        const solverRef = doc(db, 'users', answer.answeredByUid);

        // Mark doubt resolved
        transaction.update(doubtRef, { isResolved: true });
        // Mark answer as best
        transaction.update(answerRef, { isBest: true });

        // Add 15 coins to solver (best answer reward) and award +15 reputation
        const solverDoc = await transaction.get(solverRef);
        if (solverDoc.exists()) {
          transaction.update(solverRef, { 
            coins: increment(15),
            reputation: increment(15) 
          });
        }
      });
    } catch (e) {
      alert('Error marking best answer.');
    }
  };

  const filteredDoubts = doubts.filter(d => {
    if (filterSubject !== 'all' && d.subject !== filterSubject) return false;
    if (filterChapter !== 'all' && d.chapter !== filterChapter) return false;
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
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 p-2.5 rounded-xl border border-orange-500/30">
              <Trophy className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Doubt Arena</h1>
              <p className="text-xs text-slate-400">অ্যাকাডেমিক প্রশ্নোত্তর ফোরাম ও রেপুটেশন মেডেল</p>
            </div>
          </div>
        </div>

        {view === 'feed' && user && (
          <button 
            onClick={() => setView('post')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
          >
            <HelpCircle className="w-5 h-5" />
            Post Doubt (-10 Coins)
          </button>
        )}
      </div>

      {view === 'feed' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <div className="flex-1 relative">
               <label className="block text-slate-400 font-medium mb-1 text-xs">Filter Subject</label>
               <select
                 value={filterSubject}
                 onChange={e => { setFilterSubject(e.target.value); setFilterChapter('all'); }}
                 className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-orange-500 text-sm appearance-none"
               >
                 <option value="all">All Subjects</option>
                 {Object.keys(doubtSyllabus).map(subject => (
                   <option key={subject} value={subject}>{subject}</option>
                 ))}
               </select>
               <Filter className="absolute left-3 bottom-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
            <div className="flex-1 relative">
               <label className="block text-slate-400 font-medium mb-1 text-xs">Filter Chapter</label>
               <select
                 value={filterChapter}
                 onChange={e => setFilterChapter(e.target.value)}
                 disabled={filterSubject === 'all'}
                 className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-orange-500 text-sm disabled:opacity-50 appearance-none"
               >
                 <option value="all">All Chapters</option>
                 {filterSubject !== 'all' && doubtSyllabus[filterSubject]?.map((chap) => (
                   <option key={chap} value={chap}>{chap}</option>
                 ))}
               </select>
               <Filter className="absolute left-3 bottom-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-orange-400 animate-spin" /></div>
          ) : filteredDoubts.length === 0 ? (
             <div className="text-center py-10 bg-slate-800/50 rounded-3xl border border-slate-700/50">
               <MessageCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-slate-300 mb-2">No doubts found!</h3>
               <p className="text-slate-500">Be the first to post a doubt in this category.</p>
             </div>
          ) : filteredDoubts.map(doubt => (
            <div key={doubt.id} className="bg-slate-800 hover:bg-slate-800/80 transition-colors rounded-2xl p-6 border border-slate-700 shadow-lg cursor-pointer flex flex-col gap-3" onClick={() => { setSelectedDoubt(doubt); setView('detail'); }}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-white leading-tight">{doubt.title}</h3>
                {doubt.isResolved ? (
                  <span className="shrink-0 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                  </span>
                ) : (
                  <span className="shrink-0 bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" /> Bounty: {doubt.bounty}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                {doubt.subject && (
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getSubjectColor(doubt.subject)} flex items-center gap-1`}>
                    <BookOpen className="w-3 h-3" /> {doubt.subject}
                  </span>
                )}
                {doubt.chapter && (
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border bg-slate-700/50 text-slate-300 border-slate-600/50 truncate max-w-[150px]">
                    {doubt.chapter}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm mb-2 line-clamp-2">{doubt.description}</p>
              <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-700/50 pt-4">
                <span className="flex items-center gap-2">
                  <UserAvatar url={doubt.askedByAvatar} borderId={doubt.askedByBorder} className="w-5 h-5 flex-shrink-0" />
                  <span className={`font-bold flex items-center gap-1 ${doubt.askedByIsPro ? 'text-yellow-400' : 'text-slate-300'}`}>{doubt.askedByName} <RankBadge coins={doubt.askedByCoins || 0} showText={false} /> {doubt.askedByIsPro && <Crown className="w-3 h-3" title="PRO Member" />}</span>
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-0.5" title="Academic Reputation">
                    <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" /> {doubt.askedByReputation || 0} Rep
                  </span>
                </span>
                <span>{doubt.timestamp?.toDate ? Math.floor((new Date().getTime() - doubt.timestamp.toDate().getTime()) / 3600000) : 0}h ago</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'post' && (
        <form onSubmit={handlePostDoubt} className="bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-700 shadow-xl">
          <div className="mb-6 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex gap-3 text-sm text-orange-300">
            <Flame className="w-5 h-5 shrink-0" />
            <p>Posting a doubt will deduct <strong>10 coins</strong> from your balance. The community will help you solve it!</p>
          </div>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-medium mb-2 text-sm">Subject</label>
                <select
                  value={postSubject}
                  onChange={e => { setPostSubject(e.target.value); setPostChapter(''); }}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 appearance-none"
                >
                  <option value="" disabled>Select Subject</option>
                  {Object.keys(doubtSyllabus).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-2 text-sm">Chapter</label>
                <select
                  value={postChapter}
                  onChange={e => setPostChapter(e.target.value)}
                  required
                  disabled={!postSubject}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 disabled:opacity-50 appearance-none"
                >
                  <option value="" disabled>Select Chapter</option>
                  {postSubject && doubtSyllabus[postSubject]?.map((chap) => (
                    <option key={chap} value={chap}>{chap}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-slate-400 font-medium mb-2 text-sm">Doubt Title</label>
              <input 
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                placeholder="e.g. How to use V_rms formula correctly?"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-2 text-sm">Detailed Description</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 h-32 resize-none"
                placeholder="Explain what exactly you are struggling with..."
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-2 text-sm">Image (Optional)</label>
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-slate-300 focus:outline-none focus:border-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition-colors cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={posting || !title || !description || !postSubject || !postChapter}
            className="w-full mt-8 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
          >
            {posting ? 'Uploading...' : 'Post Doubt'}
          </button>
        </form>
      )}

      {view === 'detail' && selectedDoubt && (
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-700 shadow-xl">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-white">{selectedDoubt.title}</h2>
                {selectedDoubt.isResolved ? (
                  <span className="shrink-0 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Resolved
                  </span>
                ) : (
                  <span className="shrink-0 bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                    <Flame className="w-4 h-4" /> Bounty: {selectedDoubt.bounty}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {selectedDoubt.subject && (
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getSubjectColor(selectedDoubt.subject)} flex items-center gap-1`}>
                    <BookOpen className="w-3 h-3" /> {selectedDoubt.subject}
                  </span>
                )}
                {selectedDoubt.chapter && (
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border bg-slate-700/50 text-slate-300 border-slate-600/50 truncate max-w-[200px]">
                    {selectedDoubt.chapter}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed mb-6">
              {selectedDoubt.description}
            </p>
            
            {selectedDoubt.imageUrl && (
              <div className="mb-6 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                <img src={selectedDoubt.imageUrl} alt="Doubt context" className="w-full max-h-96 object-contain" />
              </div>
            )}
            
            <div className="flex items-center text-sm text-slate-500 border-t border-slate-700/50 pt-4 mt-4">
              <span className="flex items-center gap-2">
                <UserAvatar url={selectedDoubt.askedByAvatar} borderId={selectedDoubt.askedByBorder} className="w-6 h-6 flex-shrink-0" />
                <span className={`font-bold flex items-center gap-1 ${selectedDoubt.askedByIsPro ? 'text-yellow-400' : 'text-slate-300'}`}>{selectedDoubt.askedByName} <RankBadge coins={selectedDoubt.askedByCoins || 0} showText={false} /> {selectedDoubt.askedByIsPro && <Crown className="w-4 h-4" title="PRO Member" />}</span> 
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-0.5" title="Academic Reputation">
                  <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" /> {selectedDoubt.askedByReputation || 0} Rep
                </span>
                <span className="text-slate-500">on {selectedDoubt.timestamp?.toDate ? selectedDoubt.timestamp.toDate().toLocaleDateString() : ''}</span>
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
                  placeholder="Think you know the answer? Claim the bounty and gain +5 reputation!"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 min-h-[100px] resize-none"
                  required
                />
                <div className="flex justify-end">
                  <button type="submit" disabled={answering || !answerText.trim()} className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors">
                    <Send className="w-4 h-4" />
                    Submit Answer (+5 Rep)
                  </button>
                </div>
              </form>
            )}

            {answers.map((ans) => (
              <div key={ans.id} className={`rounded-2xl p-6 border ${ans.isBest ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
                {ans.isBest && (
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4 bg-emerald-500/20 w-fit px-3 py-1 rounded-full border border-emerald-500/30">
                    <Trophy className="w-4 h-4" />
                    Best Answer (+15 Coins & +15 Rep)
                  </div>
                )}
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed mb-4">{ans.text}</p>
                <div className="flex items-center justify-between mt-4">
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
                       <span className={`font-bold flex items-center gap-1 ${ans.answeredByIsPro ? 'text-yellow-400' : 'text-slate-300'}`}>{ans.answeredByName} <RankBadge coins={ans.answeredByCoins || 0} showText={false} /> {ans.answeredByIsPro && <Crown className="w-3.5 h-3.5" title="PRO Member" />}</span>
                       <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-0.5" title="Academic Reputation">
                         <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" /> {ans.answeredByReputation || 0} Rep
                       </span>
                    </span>
                  </div>
                  
                  {selectedDoubt.askedByUid === user?.uid && !selectedDoubt.isResolved && (
                    <button 
                      onClick={() => handleMarkBest(ans)}
                      className="text-xs font-bold text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
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
