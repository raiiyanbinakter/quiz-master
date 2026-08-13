import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ShieldCheck,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Edit,
  FileText,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  TopicAnalysisRecord,
  AnalysisSource,
  TopicReviewStatus
} from '../../types/topicAnalysis';
import {
  PHYSICS_CH4_SOURCE,
  PHYSICS_CH4_TOPICS
} from '../../data/topicAnalysisData';
import {
  getTopicAnalysisRecords,
  saveTopicAnalysisRecord,
  saveAnalysisSource,
  getAnalysisSource
} from '../../lib/topicAnalysisFirestore';

export const TopicAnalysisAdmin: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('phys1');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('phys1_ch4');
  const [topics, setTopics] = useState<TopicAnalysisRecord[]>(PHYSICS_CH4_TOPICS);
  const [activeTopic, setActiveTopic] = useState<TopicAnalysisRecord | null>(PHYSICS_CH4_TOPICS[0]);
  const [source, setSource] = useState<AnalysisSource>(PHYSICS_CH4_SOURCE);

  const [saving, setSaving] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Form Fields for active topic
  const [titleInput, setTitleInput] = useState<string>(activeTopic?.title || '');
  const [objectivesInput, setObjectivesInput] = useState<string[]>(activeTopic?.learningObjectives || []);
  const [newObjectiveText, setNewObjectiveText] = useState<string>('');
  const [prereqsInput, setPrereqsInput] = useState<string>(activeTopic?.prerequisiteTopicIds?.join(', ') || '');
  const [questionCountInput, setQuestionCountInput] = useState<number | ''>(activeTopic?.documentedQuestionCount ?? '');
  const [coverageBand, setCoverageBand] = useState<'low' | 'medium' | 'high'>(activeTopic?.coverageBand || 'medium');
  const [reviewStatus, setReviewStatus] = useState<TopicReviewStatus>(activeTopic?.reviewStatus || 'needs_verification');

  // Source form fields
  const [sourceTitle, setSourceTitle] = useState<string>(source.title || '');
  const [sourceFileRef, setSourceFileRef] = useState<string>(source.fileReference || '');
  const [sourcePublisher, setSourcePublisher] = useState<string>(source.publisher || '');
  const [sourceUrl, setSourceUrl] = useState<string>(source.url || '');
  const [sourceVerificationStatus, setSourceVerificationStatus] = useState<'needs_verification' | 'admin_reviewed'>(source.verificationStatus || 'needs_verification');

  // Load records
  useEffect(() => {
    async function loadData() {
      const fetched = await getTopicAnalysisRecords('academic', selectedSubjectId, selectedChapterId);
      if (fetched && fetched.length > 0) {
        setTopics(fetched);
        setActiveTopic(fetched[0]);
      }
      const fetchedSrc = await getAnalysisSource('src_phys1_ch4_pdf');
      if (fetchedSrc) {
        setSource(fetchedSrc);
        setSourceTitle(fetchedSrc.title);
        setSourceFileRef(fetchedSrc.fileReference || '');
        setSourcePublisher(fetchedSrc.publisher || '');
        setSourceUrl(fetchedSrc.url || '');
        setSourceVerificationStatus(fetchedSrc.verificationStatus);
      }
    }
    loadData();
  }, [selectedSubjectId, selectedChapterId]);

  // Sync state when active topic changes
  useEffect(() => {
    if (activeTopic) {
      setTitleInput(activeTopic.title);
      setObjectivesInput(activeTopic.learningObjectives || []);
      setPrereqsInput(activeTopic.prerequisiteTopicIds?.join(', ') || '');
      setQuestionCountInput(activeTopic.documentedQuestionCount ?? '');
      setCoverageBand(activeTopic.coverageBand || 'medium');
      setReviewStatus(activeTopic.reviewStatus || 'needs_verification');
    }
  }, [activeTopic]);

  const handleAddObjective = () => {
    if (!newObjectiveText.trim()) return;
    setObjectivesInput([...objectivesInput, newObjectiveText.trim()]);
    setNewObjectiveText('');
  };

  const handleRemoveObjective = (idx: number) => {
    setObjectivesInput(objectivesInput.filter((_, i) => i !== idx));
  };

  const handleCreateNewTopic = () => {
    const newTopic: TopicAnalysisRecord = {
      id: `rec_${selectedSubjectId}_t${Date.now()}`,
      route: 'academic',
      subjectId: selectedSubjectId,
      paper: 'first',
      chapterId: selectedChapterId,
      chapterTitle: 'নিউটনীয় বলবিদ্যা',
      topicId: `t_${Date.now()}`,
      title: 'নতুন টপিক শিরোনাম',
      learningObjectives: ['প্রথম শিখনফল'],
      prerequisiteTopicIds: [],
      documentedQuestionCount: 0,
      coverageBand: 'medium',
      analysisSourceIds: [source.id],
      reviewStatus: 'draft',
    };

    setTopics([...topics, newTopic]);
    setActiveTopic(newTopic);
  };

  const handleSaveTopic = async () => {
    if (!activeTopic) return;
    setSaving(true);
    setSuccessMsg('');

    const updatedRecord: TopicAnalysisRecord = {
      ...activeTopic,
      title: titleInput.trim(),
      learningObjectives: objectivesInput,
      prerequisiteTopicIds: prereqsInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      documentedQuestionCount: questionCountInput === '' ? undefined : Number(questionCountInput),
      coverageBand,
      reviewStatus,
      updatedAt: new Date().toISOString()
    };

    const updatedSource: AnalysisSource = {
      ...source,
      title: sourceTitle.trim(),
      fileReference: sourceFileRef.trim(),
      publisher: sourcePublisher.trim(),
      url: sourceUrl.trim(),
      verificationStatus: sourceVerificationStatus,
      reviewedAt: sourceVerificationStatus === 'admin_reviewed' ? new Date().toISOString() : undefined
    };

    // Update local state
    setTopics(topics.map(t => t.id === updatedRecord.id ? updatedRecord : t));
    setActiveTopic(updatedRecord);
    setSource(updatedSource);

    // Save to Firestore
    await saveTopicAnalysisRecord(updatedRecord);
    await saveAnalysisSource(updatedSource);

    setSaving(false);
    setSuccessMsg('টপিক বিশ্লেষণ সফলভাবে সংরক্ষিত হয়েছে!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl max-w-6xl mx-auto text-slate-100">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            টপিক বিশ্লেষণ পরিচালনা (Admin Topic Analysis Management)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            অফিশিয়াল সূত্র, শিখনফল, পূর্বশর্ত এবং অ্যাডমিন রিভিউ স্ট্যাটাস কন্ট্রোল প্যানেল।
          </p>
        </div>

        <button
          onClick={handleCreateNewTopic}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন টপিক যোগ করুন</span>
        </button>
      </div>

      {/* SUCCESS BANNER */}
      {successMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* SELECTORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
        <div>
          <label className="block text-slate-400 font-bold mb-1">বিষয় নির্বাচন (Subject):</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
          >
            <option value="phys1">পদার্থবিজ্ঞান ১ম পত্র (phys1)</option>
            <option value="phys2">পদার্থবিজ্ঞান ২য় পত্র (phys2)</option>
            <option value="bio1">জীববিজ্ঞান ১ম পত্র (bio1)</option>
            <option value="chem1">রসায়ন ১ম পত্র (chem1)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 font-bold mb-1">অধ্যায় নির্বাচন (Chapter):</label>
          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
          >
            <option value="phys1_ch4">অধ্যায় ৪ — নিউটনীয় বলবিদ্যা</option>
            <option value="phys1_ch2">অধ্যায় ২ — ভেক্টর</option>
          </select>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* TOPIC LIST (4 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-2">
            টপিকসমূহ ({topics.length})
          </div>

          <div className="space-y-2">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeTopic?.id === t.id
                    ? 'bg-amber-500/10 border-amber-500/60 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs">{t.title}</div>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{t.reviewStatus}</span>
                  {t.documentedQuestionCount !== undefined && <span>{t.documentedQuestionCount}টি প্রশ্ন</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE TOPIC EDIT FORM (8 Cols) */}
        {activeTopic && (
          <div className="lg:col-span-8 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-5 text-xs">
            
            {/* Title */}
            <div>
              <label className="block text-slate-300 font-bold mb-1">টপিক শিরোনাম (Topic Title):</label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Learning Objectives */}
            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">শিখনফলসমূহ (Learning Objectives):</label>
              <div className="space-y-2">
                {objectivesInput.map((obj, i) => (
                  <div key={i} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-slate-200">{i + 1}. {obj}</span>
                    <button
                      onClick={() => handleRemoveObjective(i)}
                      className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newObjectiveText}
                  onChange={(e) => setNewObjectiveText(e.target.value)}
                  placeholder="নতুন শিখনফল যোগ করুন"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                />
                <button
                  onClick={handleAddObjective}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-2 rounded-xl cursor-pointer"
                >
                  যোগ
                </button>
              </div>
            </div>

            {/* Prerequisites & Question Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">পূর্বশর্ত টপিক IDs (Prerequisites):</label>
                <input
                  type="text"
                  value={prereqsInput}
                  onChange={(e) => setPrereqsInput(e.target.value)}
                  placeholder="যেমন: phys1_ch4_t1, phys1_ch4_t2"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">নথিভুক্ত প্রশ্ন সংখ্যা (Documented Questions):</label>
                <input
                  type="number"
                  value={questionCountInput}
                  onChange={(e) => setQuestionCountInput(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="যেমন: ১৫"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Coverage Band & Review Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">কাভারেজ ব্যান্ড (Coverage Band):</label>
                <select
                  value={coverageBand}
                  onChange={(e) => setCoverageBand(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="low">Low Coverage</option>
                  <option value="medium">Medium Coverage</option>
                  <option value="high">High Coverage</option>
                </select>
              </div>

              <div>
                <label className="block text-amber-300 font-bold mb-1">রিভিউ স্ট্যাটাস (Review Status):</label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as TopicReviewStatus)}
                  className="w-full bg-slate-900 border border-amber-500/50 rounded-xl px-3 py-2 text-white font-bold focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="needs_verification">Needs Verification</option>
                  <option value="admin_reviewed">Admin Reviewed (সম্পাদনা-পর্যালোচিত)</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  * Admin Reviewed নির্বাচন করলে শিক্ষার্থীদের কাছে "সম্পাদনা-পর্যালোচিত বিশ্লেষণ" হিসেবে দেখাবে।
                </p>
              </div>
            </div>

            {/* SOURCE MANAGEMENT SUB-SECTION */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="font-extrabold text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                বিশ্লেষণ সোর্স ফাইল ও তথ্য (Source Information):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">সোর্স শিরোনাম:</label>
                  <input
                    type="text"
                    value={sourceTitle}
                    onChange={(e) => setSourceTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">ফাইল রেফারেন্স (PDF Name):</label>
                  <input
                    type="text"
                    value={sourceFileRef}
                    onChange={(e) => setSourceFileRef(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">পাবলিশার / বোর্ড:</label>
                  <input
                    type="text"
                    value={sourcePublisher}
                    onChange={(e) => setSourcePublisher(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">সোর্স যাচাই স্ট্যাটাস:</label>
                  <select
                    value={sourceVerificationStatus}
                    onChange={(e) => setSourceVerificationStatus(e.target.value as 'needs_verification' | 'admin_reviewed')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="needs_verification">Needs Verification</option>
                    <option value="admin_reviewed">Admin Reviewed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveTopic}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 text-sm"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
