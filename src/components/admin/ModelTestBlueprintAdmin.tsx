import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Plus, 
  Save, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Lock, 
  Trash2,
  Edit3,
  Layers
} from 'lucide-react';
import { MedicalModelTestBlueprint } from '../../types/modelTest';
import { INITIAL_MODEL_TEST_BLUEPRINTS } from '../../data/seedModelTestBlueprints';
import { db } from '../../firebase';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';

export default function ModelTestBlueprintAdmin() {
  const [blueprints, setBlueprints] = useState<MedicalModelTestBlueprint[]>(INITIAL_MODEL_TEST_BLUEPRINTS);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Partial<MedicalModelTestBlueprint> | null>(null);
  
  // Validation / Notice State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<'physics' | 'chemistry' | 'biology' | 'english' | 'general_knowledge'>('physics');
  const [chapterId, setChapterId] = useState('phy1_chap4');
  const [chapterName, setChapterName] = useState('নিউটনীয় বলবিদ্যা');
  const [sourceStatus, setSourceStatus] = useState<'verified' | 'needs_verification' | 'original_practice'>('verified');
  const [sourceTitle, setSourceTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [questionCount, setQuestionCount] = useState<number>(100);

  // Sync blueprints from Firestore
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, 'model_test_blueprints'),
        (snapshot) => {
          const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as MedicalModelTestBlueprint[];
          if (docs.length > 0) {
            setBlueprints(docs);
          }
        },
        (error) => {
          console.warn('Blueprints admin snapshot listener error:', error);
        }
      );
      return unsubscribe;
    } catch (e) {
      console.error('Error fetching blueprints in admin:', e);
    }
  }, []);

  const handleCreateNew = () => {
    setSelectedBlueprint({
      id: `mt_${subject}_${Date.now()}`,
      route: 'medical',
      title: '',
      subject: 'physics',
      chapterId: 'phy1_chap4',
      chapterName: 'নিউটনীয় বলবিদ্যা',
      questionIds: Array.from({ length: 100 }, (_, i) => `q_${i + 1}`),
      totalMarks: 100,
      timeLimitMinutes: 50,
      answerLockEnabled: true,
      sourceStatus: 'verified',
      status: 'draft',
      version: 1,
      description: '১০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট'
    });
    setTitle('');
    setSubject('physics');
    setChapterId('phy1_chap4');
    setChapterName('নিউটনীয় বলবিদ্যা');
    setSourceStatus('verified');
    setSourceTitle('');
    setDescription('১০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট');
    setStatus('draft');
    setQuestionCount(100);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSelectBlueprint = (bp: MedicalModelTestBlueprint) => {
    setSelectedBlueprint(bp);
    setTitle(bp.title);
    setSubject(bp.subject as any);
    setChapterId(bp.chapterId);
    setChapterName(bp.chapterName);
    setSourceStatus(bp.sourceStatus);
    setSourceTitle(bp.sourceTitle || '');
    setDescription(bp.description || '');
    setStatus(bp.status);
    setQuestionCount(bp.questionIds ? bp.questionIds.length : 0);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSaveBlueprint = async (targetStatus: 'draft' | 'published') => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setErrorMessage('অনুগ্রহ করে মডেল টেস্টের শিরোনাম লিখুন।');
      return;
    }

    const questionIds = Array.from({ length: questionCount }, (_, i) => `${chapterId}_q${i + 1}`);

    // VALIDATION RULE: Cannot publish an empty blueprint (no questions)
    if (targetStatus === 'published' && questionIds.length === 0) {
      setErrorMessage('Cannot publish empty blueprint. Please attach at least 1 question.');
      return;
    }

    const bpId = selectedBlueprint?.id || `mt_${subject}_${Date.now()}`;

    const bpPayload: MedicalModelTestBlueprint = {
      id: bpId,
      route: 'medical',
      title: title.trim(),
      subject,
      chapterId,
      chapterName,
      questionIds,
      totalMarks: 100, // Fixed 100
      timeLimitMinutes: 50, // Fixed 50
      answerLockEnabled: true, // Fixed true
      sourceStatus,
      sourceTitle: sourceTitle.trim() || undefined,
      status: targetStatus,
      version: (selectedBlueprint?.version || 0) + 1,
      description: description.trim() || '১০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট',
      createdAt: selectedBlueprint?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'model_test_blueprints', bpId), bpPayload);
      setSuccessMessage(targetStatus === 'published' ? 'মডেল টেস্ট সফলভাবে প্রকাশ করা হয়েছে!' : 'খসড়া সংরক্ষণ করা হয়েছে।');
      setSelectedBlueprint(bpPayload);
    } catch (e) {
      console.error('Error saving blueprint:', e);
      // Local state fallback update
      setBlueprints(prev => {
        const idx = prev.findIndex(p => p.id === bpId);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = bpPayload;
          return copy;
        }
        return [...prev, bpPayload];
      });
      setSuccessMessage(targetStatus === 'published' ? 'মডেল টেস্ট সফলভাবে প্রকাশ করা হয়েছে!' : 'খসড়া সংরক্ষণ করা হয়েছে।');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>মেডিকেল মডেল টেস্ট ব্লুপ্রিন্ট অ্যাডমিন</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ১০০ নম্বর ও ৫০ মিনিট নির্দিষ্ট সময়সীমার মডেল টেস্ট তৈরি ও প্রকাশ করুন।
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ব্লুপ্রিন্ট তৈরি</span>
        </button>
      </div>

      {/* MESSAGES */}
      {errorMessage && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-2 text-rose-400 text-xs font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* EXISTING BLUEPRINTS LIST */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>বিদ্যমান ব্লুপ্রিন্টসমূহ ({blueprints.length})</span>
          </h3>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {blueprints.map((bp) => (
              <div
                key={bp.id}
                onClick={() => handleSelectBlueprint(bp)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedBlueprint?.id === bp.id
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-extrabold text-cyan-400 px-2 py-0.5 bg-cyan-500/10 rounded-md border border-cyan-500/20">
                    {bp.subject}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    bp.status === 'published' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {bp.status === 'published' ? 'প্রকাশিত' : 'খসড়া'}
                  </span>
                </div>

                <div className="text-xs font-bold leading-tight">{bp.title}</div>
                <div className="text-[11px] text-slate-400">
                  {bp.chapterName} • {bp.questionIds?.length || 0}টি প্রশ্ন
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLUEPRINT FORM EDITOR */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          {selectedBlueprint ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  <span>ব্লুপ্রিন্ট এডিটর</span>
                </h3>

                <span className="text-xs text-slate-400 font-mono">
                  ID: {selectedBlueprint.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Title */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-300">মডেল টেস্টের শিরোনাম</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="যেমন: মেডিকেল মডেল টেস্ট ১ (নিউটনীয় বলবিদ্যা)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">বিষয়</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="physics">পদার্থবিজ্ঞান</option>
                    <option value="chemistry">রসায়ন</option>
                    <option value="biology">জীববিজ্ঞান</option>
                    <option value="english">ইংরেজি</option>
                    <option value="general_knowledge">সাধারণ জ্ঞান</option>
                  </select>
                </div>

                {/* Chapter ID */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">অধ্যায় আইডি</label>
                  <input
                    type="text"
                    value={chapterId}
                    onChange={(e) => setChapterId(e.target.value)}
                    placeholder="যেমন: phy1_chap4"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Chapter Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">অধ্যায়ের নাম</label>
                  <input
                    type="text"
                    value={chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                    placeholder="যেমন: নিউটনীয় বলবিদ্যা"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Question Count */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">প্রশ্ন সংখ্যা (Fixed 100 for score 100)</label>
                  <input
                    type="number"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Fixed Total Marks */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">মোট নম্বর (Fixed Rules)</label>
                  <div className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-cyan-400 font-extrabold">
                    ১০০ নম্বর (Student-facing Customization Disabled)
                  </div>
                </div>

                {/* Fixed Time Limit */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">সময়সীমা (Fixed Rules)</label>
                  <div className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-amber-400 font-extrabold">
                    ৫০ মিনিট (Student-facing Customization Disabled)
                  </div>
                </div>

                {/* Source Status */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">সোর্স স্ট্যাটাস</label>
                  <select
                    value={sourceStatus}
                    onChange={(e) => setSourceStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="verified">Verified (যাচাইকৃত)</option>
                    <option value="needs_verification">Needs Verification</option>
                    <option value="original_practice">Original Practice</option>
                  </select>
                </div>

                {/* Source Title */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">সোর্স টাইটেল (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={sourceTitle}
                    onChange={(e) => setSourceTitle(e.target.value)}
                    placeholder="যেমন: মেডিকেল ভর্তি প্রশ্নব্যাংক"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-slate-300">বিবরণ</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="মডেল টেস্ট সংক্রান্ত অতিরিক্ত তথ্য..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleSaveBlueprint('draft')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>খসড়া সংরক্ষণ</span>
                </button>

                <button
                  onClick={() => handleSaveBlueprint('published')}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-600/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>প্রকাশ করুন (Publish)</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 space-y-3">
              <Award className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-bold text-slate-400">
                একটি ব্লুপ্রিন্ট নির্বাচন করুন অথবা নতুন ব্লুপ্রিন্ট তৈরি করুন।
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
