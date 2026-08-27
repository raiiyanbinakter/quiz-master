import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Edit, Loader2, CheckCircle2, AlertCircle, Eye, RefreshCw, Image, BookOpen, Layers, Search, Filter } from 'lucide-react';
import { Subject } from '../../types';
import { BoardQuestion, BOARD_PREP_YEARS, BD_BOARDS } from '../../types/boardPrep';
import {
  INITIAL_BOARD_QUESTIONS,
  fetchFirestoreBoardQuestions,
  saveBoardQuestionToFirestore,
  deleteBoardQuestionFromFirestore
} from '../../data/boardPrepData';
import { MathText } from '../MathText';

interface AdminBoardQuestionAdderProps {
  syllabus: Subject[];
}

export default function AdminBoardQuestionAdder({ syllabus }: AdminBoardQuestionAdderProps) {
  // Only use Academic subjects for board prep (or all if available)
  const academicSubjects = syllabus.filter(s =>
    s.category === 'একাডেমিক প্রস্তুতি' || s.category === 'অনুশীলনী' || ['bio1','bio2','math1','math2','chem1','chem2','phys1','phys2'].includes(s.id)
  );

  const [allQuestions, setAllQuestions] = useState<BoardQuestion[]>(INITIAL_BOARD_QUESTIONS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(academicSubjects[0]?.id || 'phys1');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(BOARD_PREP_YEARS[0]?.year || 2025);
  const [selectedBoard, setSelectedBoard] = useState<string>(BD_BOARDS[0]?.shortName || 'ঢা.বো.');
  const [topicName, setTopicName] = useState<string>('');
  const [questionText, setQuestionText] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctOptionIdx, setCorrectOptionIdx] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter/Search State for Existing Questions
  const [filterSubjectId, setFilterSubjectId] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentSubject = academicSubjects.find(s => s.id === selectedSubjectId) || academicSubjects[0];
  const chapters = currentSubject?.chapters || [];

  // Fetch from Firestore on mount
  const loadData = async () => {
    setLoading(true);
    try {
      const firestoreQs = await fetchFirestoreBoardQuestions();
      if (firestoreQs.length > 0) {
        // Merge with initial questions (Firestore takes precedence)
        const combined = [...firestoreQs];
        INITIAL_BOARD_QUESTIONS.forEach(initQ => {
          if (!combined.some(q => q.id === initQ.id)) {
            combined.push(initQ);
          }
        });
        setAllQuestions(combined);
      } else {
        setAllQuestions(INITIAL_BOARD_QUESTIONS);
      }
    } catch (e) {
      console.error(e);
      setAllQuestions(INITIAL_BOARD_QUESTIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubjectChange = (newSubId: string) => {
    setSelectedSubjectId(newSubId);
    setSelectedChapterIndex(0);
  };

  const handleOptionChange = (idx: number, val: string) => {
    const next = [...options];
    next[idx] = val;
    setOptions(next);
  };

  const resetForm = () => {
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectOptionIdx(0);
    setExplanation('');
    setImageUrl('');
    setTopicName('');
    setEditingId(null);
  };

  const handleEditQuestion = (q: BoardQuestion) => {
    setEditingId(q.id);
    setSelectedSubjectId(q.subjectId);
    setSelectedChapterIndex(q.chapterIndex);
    setSelectedYear(q.year);
    setSelectedBoard(q.board);
    setTopicName(q.topic || '');
    setQuestionText(q.question_text);
    setOptions(q.options && q.options.length === 4 ? q.options : ['', '', '', '']);
    const cIdx = q.options.indexOf(q.correct_answer);
    setCorrectOptionIdx(cIdx >= 0 ? cIdx : 0);
    setExplanation(q.explanation || '');
    setImageUrl(q.imageUrl || q.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই বোর্ড প্রশ্নটি মুছে ফেলতে চান?')) return;
    try {
      await deleteBoardQuestionFromFirestore(id);
      setAllQuestions(prev => prev.filter(q => q.id !== id));
      setStatusMsg({ text: 'প্রশ্ন সফলভাবে মুছে ফেলা হয়েছে!', type: 'success' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ text: `মুছতে সমস্যা হয়েছে: ${err.message}`, type: 'error' });
    }
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      alert('অনুগ্রহ করে প্রশ্ন লিখুন।');
      return;
    }
    if (options.some(opt => !opt.trim())) {
      alert('ক, খ, গ, ঘ সব অপশন পূরণ করুন।');
      return;
    }

    const correctAnswer = options[correctOptionIdx];
    setSaving(true);
    try {
      const qData: Omit<BoardQuestion, 'id'> & { id?: string } = {
        id: editingId || undefined,
        subjectId: selectedSubjectId,
        chapterIndex: Number(selectedChapterIndex),
        year: Number(selectedYear),
        board: selectedBoard,
        topic: topicName.trim() || undefined,
        question_text: questionText.trim(),
        options: options.map(o => o.trim()),
        correct_answer: correctAnswer.trim(),
        explanation: explanation.trim(),
        imageUrl: imageUrl.trim() || undefined,
        image: imageUrl.trim() || undefined
      };

      const savedId = await saveBoardQuestionToFirestore(qData);

      const savedFull: BoardQuestion = {
        ...qData,
        id: savedId
      };

      setAllQuestions(prev => {
        const filtered = prev.filter(q => q.id !== savedId);
        return [savedFull, ...filtered];
      });

      setStatusMsg({
        text: editingId ? 'বোর্ড প্রশ্ন সফলভাবে আপডেট করা হয়েছে!' : 'নতুন বোর্ড প্রশ্ন সফলভাবে যুক্ত করা হয়েছে!',
        type: 'success'
      });
      resetForm();
      setTimeout(() => setStatusMsg(null), 3500);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ text: `সংরক্ষণে সমস্যা হয়েছে: ${err.message}`, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Filtered List of Questions for management
  const filteredQuestions = allQuestions.filter(q => {
    if (filterSubjectId !== 'all' && q.subjectId !== filterSubjectId) return false;
    if (filterYear !== 'all' && Number(q.year) !== Number(filterYear)) return false;
    if (searchQuery.trim()) {
      const s = searchQuery.toLowerCase();
      const matchText = q.question_text.toLowerCase().includes(s);
      const matchBoard = q.board.toLowerCase().includes(s);
      const matchTopic = (q.topic || '').toLowerCase().includes(s);
      if (!matchText && !matchBoard && !matchTopic) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 border border-purple-800/80 px-2.5 py-0.5 rounded-lg">
                বোর্ড প্রিপারেশন এডমিন
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Plus className="w-6 h-6 text-purple-400" />
              বোর্ড প্রশ্ন যুক্ত এবং পরিচালনা করুন
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              একই সিলেবাস ও অধ্যায়ের অধীনে বিগত বছরের বোর্ড প্রশ্নসমূহ (২০২১–২০২৫) সহজে অ্যাড করুন। LaTeX ফর্মুলা স্বয়ংক্রিয়ভাবে KaTeX এ রেন্ডার হবে।
            </p>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-650 text-slate-200 text-xs font-semibold border border-slate-600 transition-colors cursor-pointer self-start sm:self-center shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            রিফ্রেশ ডাটা
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold ${
          statusMsg.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-750">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {editingId ? <Edit className="w-5 h-5 text-amber-400" /> : <Plus className="w-5 h-5 text-purple-400" />}
              {editingId ? 'প্রশ্ন এডিট করুন' : 'নতুন বোর্ড প্রশ্ন ফর্ম'}
            </h3>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-650 transition-colors"
              >
                বাতিল করুন
              </button>
            )}
          </div>

          {/* Board Questions Note */}
          <div className="mb-5 p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center gap-2.5 text-xs text-purple-200">
            <AlertCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="font-semibold">বোর্ড প্রশ্ন যুক্ত করুন শুধুমাত্র বিগত বছরের বোর্ড প্রশ্নের জন্য।</span>
          </div>

          <form onSubmit={handleSaveQuestion} className="space-y-4">
            {/* Subject and Chapter Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  বিষয় নির্বাচন করুন (Subject) *
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  {academicSubjects.map(sub => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  অধ্যায় নির্বাচন করুন (Chapter) *
                </label>
                <select
                  value={selectedChapterIndex}
                  onChange={(e) => setSelectedChapterIndex(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  {chapters.map((chap, idx) => (
                    <option key={idx} value={idx}>
                      {chap}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year, Board & Topic Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  সাল / বছর (Year) *
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  {BOARD_PREP_YEARS.map(y => (
                    <option key={y.year} value={y.year}>
                      {y.title} ({y.banglaYear})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  বোর্ডের নাম (Board) *
                </label>
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  {BD_BOARDS.map(b => (
                    <option key={b.code} value={b.shortName}>
                      {b.name} ({b.shortName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  টপিক / বিষয়বস্তু (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: লিমিট, ভেক্টর যোজন"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                প্রশ্ন (Question Text with LaTeX support `$math$`) *
              </label>
              <textarea
                rows={3}
                placeholder="যেমন: $\lim_{x \to 0} \frac{\sin 5x}{x}$ এর মান কত?"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {/* Options ক, খ, গ, ঘ */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                অপশনসমূহ ও সঠিক উত্তর নির্ধারণ (Options & Correct Answer) *
              </label>
              <div className="space-y-2.5">
                {options.map((opt, idx) => {
                  const label = ['ক', 'খ', 'গ', 'ঘ'][idx] || (idx + 1).toString();
                  const isSelected = correctOptionIdx === idx;

                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setCorrectOptionIdx(idx)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500'
                        }`}
                        title="সঠিক উত্তর হিসেবে চিহ্নিত করুন"
                      >
                        {label}
                      </button>
                      <input
                        type="text"
                        placeholder={`অপশন ${label} লিখুন (LaTeX: $...$)`}
                        value={opt}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        className={`flex-1 bg-slate-900 border rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none ${
                          isSelected ? 'border-emerald-500/60 bg-emerald-950/20' : 'border-slate-700 focus:border-purple-500'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setCorrectOptionIdx(idx)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : 'bg-slate-900 text-slate-500 border-slate-700 hover:text-slate-300'
                        }`}
                      >
                        {isSelected ? '✓ সঠিক উত্তর' : 'চিহ্নিত করুন'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation & Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ব্যাখ্যা (Explanation with LaTeX)
                </label>
                <textarea
                  rows={2}
                  placeholder="প্রশ্নের বিস্তারিত ব্যাখ্যা ও সূত্র লিখুন..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  ছবির URL (চিত্র বা ডায়াগ্রাম - ঐচ্ছিক)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/diagram.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                />
                {imageUrl && (
                  <div className="mt-2 max-h-24 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 p-1">
                    <img src={imageUrl} alt="Preview" className="h-20 object-contain mx-auto" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    সংরক্ষণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {editingId ? 'আপডেট সংরক্ষণ করুন' : 'বোর্ড প্রশ্ন ডাটাবেজে সংরক্ষণ করুন'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live KaTeX Student View Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl sticky top-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-750">
              <Eye className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white">লাইভ স্টুডেন্ট প্রিভিউ (KaTeX Live)</h3>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-purple-500/30 p-5 space-y-4">
              {/* Board Tag & Year Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800">
                  [{selectedBoard} {BOARD_PREP_YEARS.find(y => y.year === selectedYear)?.banglaYear || selectedYear}]
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  {currentSubject?.name}
                </span>
                {topicName && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800">
                    {topicName}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <div className="text-base font-bold text-white leading-relaxed">
                {questionText.trim() ? (
                  <MathText text={questionText} />
                ) : (
                  <span className="text-slate-600 italic">প্রশ্ন এখানে রেন্ডার হবে...</span>
                )}
              </div>

              {/* Image Preview if provided */}
              {imageUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2">
                  <img src={imageUrl} alt="Diagram preview" className="max-h-40 mx-auto object-contain" />
                </div>
              )}

              {/* Options */}
              <div className="space-y-2">
                {options.map((opt, idx) => {
                  const label = ['ক', 'খ', 'গ', 'ঘ'][idx] || (idx + 1).toString();
                  const isCorrect = correctOptionIdx === idx;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center gap-3 text-xs sm:text-sm ${
                        isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-850 border-slate-750 text-slate-300'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {label}
                      </span>
                      <span className="leading-snug">
                        {opt.trim() ? <MathText text={opt} /> : <span className="text-slate-600">অপশন {label}</span>}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {explanation.trim() && (
                <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-3.5 text-xs text-purple-200">
                  <span className="font-bold text-purple-400 block mb-1">সঠিক উত্তর ও ব্যাখ্যা:</span>
                  <MathText text={explanation} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Existing Board Questions Table / List */}
      <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-750">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              সংরক্ষিত বোর্ড প্রশ্নসমূহ ({filteredQuestions.length} টি)
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">ডাটাবেজে থাকা প্রশ্ন ফিল্টার ও ম্যানেজ করুন</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="সার্চ করুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <select
              value={filterSubjectId}
              onChange={(e) => setFilterSubjectId(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">সব বিষয়</option>
              {academicSubjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">সব বছর</option>
              {BOARD_PREP_YEARS.map(y => (
                <option key={y.year} value={y.year}>{y.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            কোনো বোর্ড প্রশ্ন পাওয়া যায়নি। উপরে ফর্ম থেকে যুক্ত করুন।
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => {
              const subObj = academicSubjects.find(s => s.id === q.subjectId);
              const subName = subObj?.name || q.subjectId;
              const chapName = subObj?.chapters[q.chapterIndex] || `অধ্যায় ${q.chapterIndex + 1}`;
              const yearObj = BOARD_PREP_YEARS.find(y => y.year === q.year);
              const banglaYr = yearObj?.banglaYear || q.year;

              return (
                <div
                  key={q.id || idx}
                  className="bg-slate-900/90 border border-slate-750 hover:border-purple-500/40 rounded-2xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800">
                        [{q.board} {banglaYr}]
                      </span>
                      <span className="font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                        {subName} • {chapName}
                      </span>
                      {q.topic && (
                        <span className="text-slate-400 bg-slate-850 px-2 py-0.5 rounded-md border border-slate-750">
                          {q.topic}
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-semibold text-slate-100">
                      <span className="text-purple-400 mr-1.5">{idx + 1}.</span>
                      <MathText text={q.question_text} />
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">উত্তর:</span>
                      <MathText text={q.correct_answer} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleEditQuestion(q)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 border border-slate-700 transition-colors cursor-pointer"
                      title="এডিট করুন"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-rose-400 hover:text-rose-300 border border-slate-700 hover:border-rose-700 transition-colors cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
