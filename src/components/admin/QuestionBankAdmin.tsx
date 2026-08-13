import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Save,
  Send,
  Eye,
  Trash2,
  Edit,
  RotateCcw,
  Sparkles,
  Layers,
  HelpCircle,
  Flag,
  BarChart2,
  List,
  Search,
  Check,
  X,
  FileCheck,
  Archive,
  RefreshCw
} from 'lucide-react';
import {
  QuestionItem,
  QuestionStatus,
  DeliveryFeature,
  MedicalSubject,
  SourceStatus,
  AssessmentBlueprint,
  QuestionReport,
  QuestionReportIssueType,
  QuestionReportStatus
} from '../../types/questionBank';
import {
  parsePlainTextQuestions,
  validatePublishGuard,
  ParseResult,
  ParseResultItem
} from '../../utils/questionParser';
import {
  fetchQuestions,
  saveQuestionItem,
  batchSaveDraftQuestions,
  updateQuestionStatus,
  updatePublishedQuestionVersion,
  archiveQuestion,
  fetchBlueprints,
  saveBlueprint,
  fetchQuestionReports,
  updateReportStatus,
  getQuestionAnalytics
} from '../../lib/questionBankFirestore';

import ModelTestBlueprintAdmin from './ModelTestBlueprintAdmin';
import { TopicAnalysisAdmin } from './TopicAnalysisAdmin';

interface QuestionBankAdminProps {
  userEmail?: string;
  onBack?: () => void;
}

type SubTab =
  | 'add'
  | 'import'
  | 'drafts'
  | 'in_review'
  | 'published'
  | 'reports'
  | 'blueprints'
  | 'topic_analysis';

const SAMPLE_IMPORT_TEXT = `---QUESTION---
ID: MED-BIO-001
ROUTE: medical
SUBJECT: biology
PAPER: first
CHAPTER: কোষের রাসায়নিক উপাদান
TOPIC: প্রোটিন
FEATURES: practice_bank
DIFFICULTY: standard
TIME: 45
LANGUAGE: bn
SOURCE_STATUS: original_practice
SOURCE_TITLE:
SOURCE_URL:
YEAR:
TAGS: protein, biomolecule
QUESTION: প্রোটিনের গাঠনিক একক কোনটি?
A: গ্লুকোজ
B: অ্যামিনো এসিড
C: ফ্যাটি এসিড
D: নিউক্লিওটাইড
ANSWER: B
SHORT_EXPLANATION: প্রোটিন মূলত অ্যামিনো এসিডের পলিমার। পেপটাইড বন্ধন দ্বারা অ্যামিনো এসিডসমূহ যুক্ত হয়ে প্রোটিন তৈরি করে।
DETAILED_EXPLANATION: প্রোটিন অণুতে বিশ প্রকার অ্যামিনো এসিড পর পর যুক্ত হয়ে পলিপেপটাইড চেইন গঠন করে।
HINT: পেপটাইড বন্ধন মনে করুন।
---END---

---QUESTION---
ID: MED-PHY-002
ROUTE: medical
SUBJECT: physics
PAPER: first
CHAPTER: ভেক্টর
TOPIC: ডট গুণন
FEATURES: past_questions
DIFFICULTY: exam
TIME: 60
LANGUAGE: bn
SOURCE_STATUS: verified
SOURCE_TITLE: মেডিকেল ভর্তি পরীক্ষা ২০২৩-২৪
SOURCE_URL:
YEAR: 2023
TAGS: vector, dot_product
QUESTION: দুটি ভেক্টর পরষ্পর লম্ব হওয়ার শর্ত কোনটি?
A: তাদের ডট গুণন শূন্য
B: তাদের ক্রস গুণন শূন্য
C: তাদের যোগফল শূন্য
D: তাদের বিয়োগফল শূন্য
ANSWER: A
SHORT_EXPLANATION: দুটি ভেক্টরের ডট গুণন A.B = AB cos(theta)। theta = 90 ডিগ্রি হলে cos(90) = 0 হয়।
DETAILED_EXPLANATION: লম্ব ভেক্টরের অন্তর্বর্তী কোণ ৯০ ডিগ্রি, তাই ডট গুণফল সর্বদা শূন্য।
HINT: cos(90) এর মান কত?
---END---`;

export default function QuestionBankAdmin({ userEmail = 'admin@example.com', onBack }: QuestionBankAdminProps) {
  const [activeTab, setActiveTab] = useState<SubTab>('import');

  // Question lists state
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Single Question Form State
  const [singleForm, setSingleForm] = useState<Partial<QuestionItem>>({
    route: 'medical',
    subject: 'biology',
    paper: 'first',
    chapterName: '',
    topicName: '',
    questionType: 'single_choice',
    stem: '',
    options: [
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' }
    ],
    correctOptionId: 'A',
    explanation: {
      shortExplanation: '',
      detailedExplanation: '',
      hint: ''
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: '',
      url: '',
      year: ''
    },
    featureTags: ['practice_bank'],
    tags: []
  });
  const [singleTagInput, setSingleTagInput] = useState('');
  const [formMsg, setFormMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Plain Text Import State
  const [pastedText, setPastedText] = useState(SAMPLE_IMPORT_TEXT);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [editingBlockIndex, setEditingBlockIndex] = useState<number | null>(null);
  const [importStatusMsg, setImportStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Module 3 Import Metadata controls
  const [m3Chapter, setM3Chapter] = useState<'Chapter 4' | 'Chapter 6'>('Chapter 4');
  const [m3Topic, setM3Topic] = useState<string>('বল ও বলের প্রকারভেদ');
  const m3Route = 'Academic';
  const m3Subject = 'Physics';
  const m3Paper = 'First Paper';
  const [m3SourceStatus, setM3SourceStatus] = useState<'Original Practice' | 'Needs Verification'>('Original Practice');

  const m3TopicsList = m3Chapter === 'Chapter 4' ? [
    'বল ও বলের প্রকারভেদ',
    'নিউটনের গতিসূত্র',
    'নিউটনের গতিসূত্রের ব্যবহার',
    'রৈখিক ভরবেগের নিত্যতা',
    'জড়তার ভ্রামক ও কৌণিক ভরবেগ',
    'টর্ক ও জড়তার ভ্রামকের উপপাদ্য',
    'নিউটনীয় বলবিদ্যা',
    'সংঘর্ষ এবং কেন্দ্রমুখী/কেন্দ্রবিমুখী বল',
    'Practice'
  ] : [
    'গ্যালিলিও ও কেপলারের সূত্র',
    'মহাকর্ষ',
    'অভিকর্ষজ ত্বরণ',
    'মহাকর্ষীয় ক্ষেত্র ও মহাকর্ষীয় ক্ষেত্রের প্রাবল্য',
    'অভিকর্ষ কেন্দ্র ও মুক্তিবেগ',
    'মহাকর্ষীয় সূত্রের ব্যবহার',
    'Practice'
  ];

  // Review & Inspect Modal State
  const [inspectQuestion, setInspectQuestion] = useState<QuestionItem | null>(null);
  const [reviewNoteInput, setReviewNoteInput] = useState('');
  const [editPublishedModal, setEditPublishedModal] = useState<QuestionItem | null>(null);
  const [editPublishedChangeNote, setEditPublishedChangeNote] = useState('');

  // Question Reports State
  const [reports, setReports] = useState<QuestionReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  // Blueprints State
  const [blueprints, setBlueprints] = useState<AssessmentBlueprint[]>([]);
  const [loadingBlueprints, setLoadingBlueprints] = useState(false);
  const [blueprintForm, setBlueprintForm] = useState<Partial<AssessmentBlueprint>>({
    route: 'medical',
    feature: 'practice_bank',
    title: '',
    description: '',
    subject: 'biology',
    questionIds: [],
    timeLimitSeconds: 600,
    scoringRule: 'exam_negative_marking',
    shuffleQuestions: true,
    shuffleOptions: true,
    showFeedback: 'after_submit',
    sourceStatus: 'verified',
    status: 'draft'
  });

  // Filter state for tables
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load questions on tab change
  useEffect(() => {
    loadQuestions();
    if (activeTab === 'reports') {
      loadReports();
    } else if (activeTab === 'blueprints') {
      loadBlueprints();
    }
  }, [activeTab]);

  const loadQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const data = await fetchQuestions();
      setQuestions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const loadReports = async () => {
    setLoadingReports(true);
    try {
      const data = await fetchQuestionReports();
      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingReports(false);
    }
  };

  const loadBlueprints = async () => {
    setLoadingBlueprints(true);
    try {
      const data = await fetchBlueprints();
      setBlueprints(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingBlueprints(false);
    }
  };

  // --- HANDLERS: Plain Text Import ---
  const handleParseText = () => {
    setImportStatusMsg(null);
    const result = parsePlainTextQuestions(pastedText, userEmail);
    setParseResult(result);
  };

  const handleSaveAllValidDrafts = async () => {
    if (!parseResult) return;
    const validItems = parseResult.items
      .filter(i => i.errors.length === 0 && i.parsedItem)
      .map(i => i.parsedItem!);

    if (validItems.length === 0) {
      setImportStatusMsg({ text: 'সংরক্ষণ করার মতো কোনো বৈধ প্রশ্ন নেই।', type: 'error' });
      return;
    }

    try {
      const count = await batchSaveDraftQuestions(validItems);
      setImportStatusMsg({
        text: `সফলভাবে ${count} টি বৈধ প্রশ্ন খসড়া (Draft) হিসেবে সংরক্ষণ করা হয়েছে!`,
        type: 'success'
      });
      loadQuestions();
    } catch (err: any) {
      setImportStatusMsg({ text: `সংরক্ষণে সমস্যা: ${err.message}`, type: 'error' });
    }
  };

  const handleRemoveParsedBlock = (index: number) => {
    if (!parseResult) return;
    const updatedItems = parseResult.items.filter(i => i.index !== index);
    const valid = updatedItems.filter(i => i.errors.length === 0);
    const invalid = updatedItems.filter(i => i.errors.length > 0);
    const dupes = updatedItems.filter(i => i.isDuplicateCandidate);
    const needsVerif = updatedItems.filter(i => i.needsSourceVerification);

    setParseResult({
      totalParsed: updatedItems.length,
      validCount: valid.length,
      invalidCount: invalid.length,
      duplicateCount: dupes.length,
      needsVerificationCount: needsVerif.length,
      items: updatedItems
    });
  };

  // --- HANDLERS: Single Question Form ---
  const handleSaveSingleForm = async (targetStatus: QuestionStatus) => {
    setFormMsg(null);
    if (!singleForm.stem || !singleForm.stem.trim()) {
      setFormMsg({ text: 'প্রশ্নের মূল বক্তব্য (Stem) প্রয়োজন।', type: 'error' });
      return;
    }
    if (!singleForm.explanation?.shortExplanation) {
      setFormMsg({ text: 'সংক্ষিপ্ত ব্যাখ্যা প্রদান আবশ্যক।', type: 'error' });
      return;
    }

    try {
      const tags = singleTagInput.split(',').map(t => t.trim()).filter(Boolean);
      await saveQuestionItem({
        ...singleForm,
        tags,
        status: targetStatus,
        createdBy: userEmail
      });

      setFormMsg({
        text: targetStatus === 'in_review' ? 'প্রশ্নটি সফলভাবে রিভিউয়ের জন্য পাঠানো হয়েছে!' : 'প্রশ্নটি খসড়া হিসেবে সংরক্ষিত হয়েছে!',
        type: 'success'
      });

      // Reset form stem & options
      setSingleForm(prev => ({
        ...prev,
        stem: '',
        options: [
          { id: 'A', text: '' },
          { id: 'B', text: '' },
          { id: 'C', text: '' },
          { id: 'D', text: '' }
        ],
        explanation: { shortExplanation: '', detailedExplanation: '', hint: '' }
      }));
      setSingleTagInput('');
      loadQuestions();
    } catch (err: any) {
      setFormMsg({ text: `সমস্যা হয়েছে: ${err.message}`, type: 'error' });
    }
  };

  // --- HANDLERS: Review & Publish ---
  const handleApproveAndPublish = async (question: QuestionItem) => {
    const publishErrors = validatePublishGuard(question);
    if (publishErrors.length > 0) {
      alert(`প্রকাশ করা যাবে না। নিচে উল্লেখিত তথ্যের ঘাটতি রয়েছে:\n\n• ${publishErrors.join('\n• ')}`);
      return;
    }

    try {
      await updateQuestionStatus(question.id, 'published', userEmail, 'প্রকাশিত ও অনুমোদিত');
      alert('প্রশ্নটি সফলভাবে প্রকাশিত হয়েছে!');
      setInspectQuestion(null);
      loadQuestions();
    } catch (err: any) {
      alert(`সমস্যা হয়েছে: ${err.message}`);
    }
  };

  const handleRequestChanges = async (question: QuestionItem) => {
    if (!reviewNoteInput.trim()) {
      alert('সংশোধনের নির্দেশনাসমূহ উল্লেখ করুন।');
      return;
    }
    try {
      await updateQuestionStatus(question.id, 'changes_requested', userEmail, reviewNoteInput);
      alert('প্রশ্নটিতে সংশোধনের অনুরোধ পাঠানো হয়েছে।');
      setInspectQuestion(null);
      setReviewNoteInput('');
      loadQuestions();
    } catch (err: any) {
      alert(`সমস্যা হয়েছে: ${err.message}`);
    }
  };

  const handleUpdatePublishedVersion = async () => {
    if (!editPublishedModal) return;
    if (!editPublishedChangeNote.trim()) {
      alert('পরিবর্তনের কারণ/নোট প্রদান করুন।');
      return;
    }

    try {
      await updatePublishedQuestionVersion(
        editPublishedModal.id,
        editPublishedModal,
        editPublishedChangeNote
      );
      alert(`সংস্করণ v${(editPublishedModal.version || 1) + 1} হিসেবে সফলভাবে হালনাগাদ হয়েছে!`);
      setEditPublishedModal(null);
      setEditPublishedChangeNote('');
      loadQuestions();
    } catch (err: any) {
      alert(`সমস্যা হয়েছে: ${err.message}`);
    }
  };

  const handleArchiveQuestion = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই প্রশ্নটি আর্কাইভ করতে চান?')) return;
    try {
      await archiveQuestion(id);
      loadQuestions();
    } catch (e) {
      console.error(e);
    }
  };

  // --- HANDLERS: Reports ---
  const handleReportAction = async (reportId: string, status: QuestionReportStatus) => {
    try {
      await updateReportStatus(reportId, status, 'এডমিন পর্যালোচনা সম্পন্ন');
      loadReports();
    } catch (e) {
      console.error(e);
    }
  };

  // --- HANDLERS: Blueprint ---
  const handleSaveBlueprint = async () => {
    if (!blueprintForm.title?.trim()) {
      alert('ব্লুপ্রিন্টের শিরোনাম প্রদান করুন।');
      return;
    }
    try {
      await saveBlueprint({
        ...blueprintForm,
        createdBy: userEmail
      });
      alert('টেস্ট ব্লুপ্রিন্ট সফলভাবে সংরক্ষিত হয়েছে!');
      setBlueprintForm(prev => ({ ...prev, title: '', description: '', questionIds: [] }));
      loadBlueprints();
    } catch (err: any) {
      alert(`সমস্যা হয়েছে: ${err.message}`);
    }
  };

  // Filtered lists
  const filteredQuestions = questions.filter(q => {
    const matchesSubject = subjectFilter === 'all' || q.subject === subjectFilter;
    const matchesSearch = !searchQuery || q.stem.toLowerCase().includes(searchQuery.toLowerCase()) || q.chapterName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const draftQuestions = filteredQuestions.filter(q => q.status === 'draft' || q.status === 'changes_requested');
  const inReviewQuestions = filteredQuestions.filter(q => q.status === 'in_review' || q.status === 'approved');
  const publishedQuestions = filteredQuestions.filter(q => q.status === 'published');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 text-emerald-400">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              প্রশ্নব্যাংক পরিচালনা
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-0.5">
              মেডিকেল রুট প্রশ্ন ব্যাংক, প্লেইন টেক্সট ইমপোর্ট, রিভিউ ও টেস্ট ব্লুপ্রিন্ট
            </p>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="self-start md:self-auto bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            ফিরে যান
          </button>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('import')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'import'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>১. প্লেইন টেক্সট ইমপোর্ট</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'add'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>২. একক প্রশ্ন যোগ</span>
        </button>

        <button
          onClick={() => setActiveTab('drafts')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'drafts'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Edit className="w-4 h-4 text-cyan-400" />
          <span>৩. খসড়া প্রশ্ন ({questions.filter(q => q.status === 'draft').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('in_review')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'in_review'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Eye className="w-4 h-4 text-amber-400" />
          <span>৪. রিভিউয়ের জন্য ({questions.filter(q => q.status === 'in_review').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('published')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'published'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>৫. প্রকাশিত প্রশ্ন ({questions.filter(q => q.status === 'published').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'reports'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Flag className="w-4 h-4 text-rose-400" />
          <span>৬. প্রশ্ন রিপোর্ট ({reports.filter(r => r.status === 'open').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('blueprints')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'blueprints'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4 text-purple-400" />
          <span>৭. টেস্ট ব্লুপ্রিন্ট ({blueprints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('topic_analysis')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'topic_analysis'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>৮. টপিক বিশ্লেষণ</span>
        </button>
      </div>

      {/* ==================== TAB 1: PLAIN TEXT IMPORT ==================== */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          {/* MODULE 3 METADATA CONTROLS */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                ইমপোর্ট মেটাডাটা কন্ট্রোল (মডিউল ৩)
              </h3>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                একসাথে একটি টপিক ইমপোর্ট করুন
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block">Module</span>
                <span className="text-white font-extrabold mt-0.5 block">Module 3</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block">Route</span>
                <span className="text-white font-extrabold mt-0.5 block">{m3Route}</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block">Subject / Paper</span>
                <span className="text-white font-extrabold mt-0.5 block">{m3Subject} ({m3Paper})</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <label className="text-[10px] text-slate-400 font-bold block">Chapter</label>
                <select
                  value={m3Chapter}
                  onChange={e => {
                    const newChap = e.target.value as 'Chapter 4' | 'Chapter 6';
                    setM3Chapter(newChap);
                    setM3Topic(newChap === 'Chapter 4' ? 'বল ও বলের প্রকারভেদ' : 'গ্যালিলিও ও কেপলারের সূত্র');
                  }}
                  className="w-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs rounded-lg mt-0.5 p-1 focus:outline-none"
                >
                  <option value="Chapter 4">Chapter 4 (নিউটনীয় বলবিদ্যা)</option>
                  <option value="Chapter 6">Chapter 6 (মহাকর্ষ ও অভিকর্ষ)</option>
                </select>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 col-span-2">
                <label className="text-[10px] text-slate-400 font-bold block">Topic</label>
                <select
                  value={m3Topic}
                  onChange={e => setM3Topic(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs rounded-lg mt-0.5 p-1 focus:outline-none"
                >
                  {m3TopicsList.map((top) => (
                    <option key={top} value={top}>{top}</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <label className="text-[10px] text-slate-400 font-bold block">Source Status</label>
                <select
                  value={m3SourceStatus}
                  onChange={e => setM3SourceStatus(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 text-amber-300 font-bold text-xs rounded-lg mt-0.5 p-1 focus:outline-none"
                >
                  <option value="Original Practice">Original Practice</option>
                  <option value="Needs Verification">Needs Verification</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  প্লেইন টেক্সট ইমপোর্ট ফরম্যাট
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  একাধিক প্রশ্ন একসাথে পেস্ট করে পার্স ও প্রিভিউ করুন (Target: {m3Chapter} → {m3Topic})।
                </p>
              </div>

              <button
                onClick={handleParseText}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                প্রিভিউ করুন
              </button>
            </div>

            <textarea
              rows={12}
              value={pastedText}
              onChange={e => setPastedText(e.target.value)}
              placeholder="এখানে নির্দেশিত ফরম্যাটে প্রশ্ন পেস্ট করুন..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-y"
            />

            {importStatusMsg && (
              <div
                className={`p-4 rounded-2xl text-xs font-bold border ${
                  importStatusMsg.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                }`}
              >
                {importStatusMsg.text}
              </div>
            )}
          </div>

          {/* PARSE RESULT SUMMARY & PREVIEW */}
          {parseResult && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Report Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
                  <span className="text-slate-400 text-[10px] font-bold block">মোট পার্সকৃত</span>
                  <span className="text-xl font-extrabold text-white mt-1 block">{parseResult.totalParsed}</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-center">
                  <span className="text-emerald-400 text-[10px] font-bold block">বৈধ প্রশ্ন</span>
                  <span className="text-xl font-extrabold text-emerald-300 mt-1 block">{parseResult.validCount}</span>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl text-center">
                  <span className="text-rose-400 text-[10px] font-bold block">ত্রুটিযুক্ত</span>
                  <span className="text-xl font-extrabold text-rose-300 mt-1 block">{parseResult.invalidCount}</span>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-center">
                  <span className="text-amber-400 text-[10px] font-bold block">সম্ভাব্য ডুপ্লিকেট</span>
                  <span className="text-xl font-extrabold text-amber-300 mt-1 block">{parseResult.duplicateCount}</span>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl text-center col-span-2 sm:col-span-1">
                  <span className="text-cyan-400 text-[10px] font-bold block">সোর্স ভেরিফিকেশন</span>
                  <span className="text-xl font-extrabold text-cyan-300 mt-1 block">{parseResult.needsVerificationCount}</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-xs text-slate-300">
                  <strong className="text-emerald-400 font-bold">{parseResult.validCount}</strong> টি বৈধ প্রশ্ন খসড়া (Draft) হিসেবে সংরক্ষণের জন্য প্রস্তুত।
                </p>
                <button
                  onClick={handleSaveAllValidDrafts}
                  disabled={parseResult.validCount === 0}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  সকল বৈধ প্রশ্ন খসড়া হিসেবে সংরক্ষণ করুন
                </button>
              </div>

              {/* Parsed Items List */}
              <div className="space-y-4">
                {parseResult.items.map((item) => {
                  const isValid = item.errors.length === 0;
                  const parsed = item.parsedItem;

                  return (
                    <div
                      key={item.index}
                      className={`p-5 rounded-2xl border transition-all ${
                        isValid
                          ? 'bg-slate-900/90 border-slate-800'
                          : 'bg-rose-950/20 border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-slate-800 text-slate-300 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-slate-700">
                            #{item.index} {item.rawId ? `(${item.rawId})` : ''}
                          </span>

                          {isValid ? (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> বৈধ
                            </span>
                          ) : (
                            <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> ত্রুটিযুক্ত ({item.errors.length})
                            </span>
                          )}

                          {item.isDuplicateCandidate && (
                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> ডুপ্লিকেট
                            </span>
                          )}

                          {parsed?.subject && (
                            <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {parsed.subject}
                            </span>
                          )}

                          {parsed?.estimatedSeconds && (
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {parsed.estimatedSeconds}s
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleRemoveParsedBlock(item.index)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="ব্লকটি মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Validation Errors List */}
                      {item.errors.length > 0 && (
                        <div className="mt-3 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 space-y-1">
                          <span className="text-rose-400 text-xs font-bold block">শনাক্তকৃত ত্রুটিসমূহ:</span>
                          <ul className="list-disc list-inside text-[11px] text-rose-300 space-y-0.5">
                            {item.errors.map((err, idx) => (
                              <li key={idx}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Question Content Preview */}
                      {parsed && (
                        <div className="mt-4 space-y-3">
                          <h3 className="font-bold text-white text-sm leading-snug">
                            {parsed.stem || '(প্রশ্ন অনুপস্থিত)'}
                          </h3>

                          {/* Options Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {parsed.options?.map((opt) => {
                              const isCorrect = opt.id === parsed.correctOptionId;
                              return (
                                <div
                                  key={opt.id}
                                  className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                                    isCorrect
                                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold'
                                      : 'bg-slate-950 border-slate-800 text-slate-300'
                                  }`}
                                >
                                  <span className="font-bold shrink-0">{opt.id}.</span>
                                  <span className="flex-1">{opt.text}</span>
                                  {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                                </div>
                              );
                            })}
                          </div>

                          {/* Short Explanation */}
                          {parsed.explanation?.shortExplanation && (
                            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-400">
                              <strong className="text-slate-300 font-bold block mb-0.5">ব্যাখ্যা:</strong>
                              {parsed.explanation.shortExplanation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 2: SINGLE QUESTION FORM ==================== */}
      {activeTab === 'add' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            একক প্রশ্ন তৈরি করুন (Medical Route)
          </h2>

          {formMsg && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold border ${
                formMsg.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
              }`}
            >
              {formMsg.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">বিষয় (Subject)</label>
              <select
                value={singleForm.subject}
                onChange={e => setSingleForm({ ...singleForm, subject: e.target.value as MedicalSubject })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="biology">জীববিজ্ঞান (Biology)</option>
                <option value="chemistry">রসায়ন (Chemistry)</option>
                <option value="physics">পদার্থবিজ্ঞান (Physics)</option>
                <option value="english">ইংরেজি (English)</option>
                <option value="general_knowledge">সাধারণ জ্ঞান (GK)</option>
              </select>
            </div>

            {/* Paper */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">পত্র (Paper)</label>
              <select
                value={singleForm.paper}
                onChange={e => setSingleForm({ ...singleForm, paper: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="first">১ম পত্র</option>
                <option value="second">২য় পত্র</option>
                <option value="not_applicable">প্রযোজ্য নয়</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">কঠিনতার মাত্রা</label>
              <select
                value={singleForm.difficulty}
                onChange={e => setSingleForm({ ...singleForm, difficulty: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="foundation">মৌলিক (Foundation)</option>
                <option value="standard">মানসম্মত (Standard)</option>
                <option value="challenge">চ্যালেঞ্জিং (Challenge)</option>
                <option value="exam">পরীক্ষা উপযোগী (Exam)</option>
              </select>
            </div>

            {/* Chapter */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">অধ্যায়ের নাম (Chapter)</label>
              <input
                type="text"
                value={singleForm.chapterName}
                onChange={e => setSingleForm({ ...singleForm, chapterName: e.target.value })}
                placeholder="যেমন: কোষের রাসায়নিক উপাদান"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Topic */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">টপিকের নাম (Topic)</label>
              <input
                type="text"
                value={singleForm.topicName}
                onChange={e => setSingleForm({ ...singleForm, topicName: e.target.value })}
                placeholder="যেমন: প্রোটিন"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Timer */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">সময় (Seconds)</label>
              <input
                type="number"
                value={singleForm.estimatedSeconds}
                onChange={e => setSingleForm({ ...singleForm, estimatedSeconds: parseInt(e.target.value) || 45 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Stem */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">প্রশ্নের মূল কথা (Stem)</label>
            <textarea
              rows={3}
              value={singleForm.stem}
              onChange={e => setSingleForm({ ...singleForm, stem: e.target.value })}
              placeholder="এখানে প্রশ্ন লিখুন..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Options A, B, C, D */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">উত্তর অপশনসমূহ</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {singleForm.options?.map((opt, idx) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 shrink-0 w-6">{opt.id}.</span>
                  <input
                    type="text"
                    value={opt.text}
                    onChange={e => {
                      const updated = [...(singleForm.options || [])];
                      updated[idx].text = e.target.value;
                      setSingleForm({ ...singleForm, options: updated });
                    }}
                    placeholder={`অপশন ${opt.id} এর লেখা`}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">সঠিক অপশন নির্বাচন করুন</label>
              <select
                value={singleForm.correctOptionId}
                onChange={e => setSingleForm({ ...singleForm, correctOptionId: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-emerald-300 font-bold"
              >
                <option value="A">অপশন A</option>
                <option value="B">অপশন B</option>
                <option value="C">অপশন C</option>
                <option value="D">অপশন D</option>
              </select>
            </div>
          </div>

          {/* Explanations */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">সংক্ষিপ্ত ব্যাখ্যা (Short Explanation)</label>
              <textarea
                rows={2}
                value={singleForm.explanation?.shortExplanation}
                onChange={e => setSingleForm({
                  ...singleForm,
                  explanation: { ...(singleForm.explanation || { shortExplanation: '' }), shortExplanation: e.target.value }
                })}
                placeholder="সংক্ষিপ্ত ও সঠিক ব্যাখ্যা..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">বিস্তারিত ব্যাখ্যা (ঐচ্ছিক)</label>
              <textarea
                rows={2}
                value={singleForm.explanation?.detailedExplanation}
                onChange={e => setSingleForm({
                  ...singleForm,
                  explanation: { ...(singleForm.explanation || { shortExplanation: '' }), detailedExplanation: e.target.value }
                })}
                placeholder="অতিরিক্ত বিস্তারিত বিশ্লেষণ..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handleSaveSingleForm('draft')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-5 py-3 rounded-2xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              খসড়া হিসেবে সংরক্ষণ করুন
            </button>

            <button
              onClick={() => handleSaveSingleForm('in_review')}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-2xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              রিভিউয়ের জন্য পাঠান
            </button>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: DRAFT QUESTIONS ==================== */}
      {activeTab === 'drafts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Edit className="w-5 h-5 text-cyan-400" />
              খসড়া ও সংশোধন প্রয়োজনীয় প্রশ্ন তালিকা ({draftQuestions.length})
            </h2>
          </div>

          {draftQuestions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs">
              কোনো খসড়া প্রশ্ন পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-3">
              {draftQuestions.map(q => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {q.subject}
                      </span>
                      {q.status === 'changes_requested' && (
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          সংশোধন চাওয়া হয়েছে
                        </span>
                      )}
                      <span className="text-slate-400 text-xs">{q.chapterName}</span>
                    </div>
                    <h3 className="text-white text-sm font-bold leading-snug">{q.stem}</h3>
                    {q.changeNote && (
                      <p className="text-rose-300 text-xs bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                        রিভিউয়ার নোট: {q.changeNote}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setInspectQuestion(q)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      দেখুন
                    </button>
                    <button
                      onClick={async () => {
                        await updateQuestionStatus(q.id, 'in_review', userEmail);
                        loadQuestions();
                      }}
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold px-3 py-2 rounded-xl border border-amber-500/30 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      রিভিউ পাঠান
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 4: IN REVIEW QUESTIONS ==================== */}
      {activeTab === 'in_review' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" />
              রিভিউয়ের অপেক্ষায় থাকা প্রশ্ন তালিকা ({inReviewQuestions.length})
            </h2>
          </div>

          {inReviewQuestions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs">
              বর্তমানে রিভিউয়ের অপেক্ষায় কোনো প্রশ্ন নেই।
            </div>
          ) : (
            <div className="space-y-3">
              {inReviewQuestions.map(q => {
                const publishGuardErrors = validatePublishGuard(q);
                const canPublish = publishGuardErrors.length === 0;

                return (
                  <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {q.subject}
                        </span>
                        <span className="text-slate-400 text-xs">{q.chapterName}</span>
                      </div>
                      <h3 className="text-white text-sm font-bold leading-snug">{q.stem}</h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setInspectQuestion(q)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        নিরীক্ষণ
                      </button>
                      <button
                        onClick={() => handleApproveAndPublish(q)}
                        className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 ${
                          canPublish
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold shadow-md'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        অনুমোদন ও প্রকাশ
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 5: PUBLISHED QUESTIONS ==================== */}
      {activeTab === 'published' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              প্রকাশিত প্রশ্ন তালিকা ({publishedQuestions.length})
            </h2>
          </div>

          {publishedQuestions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs">
              কোনো প্রকাশিত প্রশ্ন পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-3">
              {publishedQuestions.map(q => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {q.subject}
                      </span>
                      <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                        v{q.version || 1}
                      </span>
                      <span className="text-slate-400 text-xs">{q.chapterName}</span>
                    </div>
                    <h3 className="text-white text-sm font-bold leading-snug">{q.stem}</h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditPublishedModal(q)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      সম্পাদনা (v{(q.version || 1) + 1})
                    </button>
                    <button
                      onClick={() => handleArchiveQuestion(q.id)}
                      className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold px-3 py-2 rounded-xl border border-rose-500/20 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      আর্কাইভ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 6: QUESTION REPORTS ==================== */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Flag className="w-5 h-5 text-rose-400" />
              শিক্ষার্থীদের প্রশ্ন রিপোর্ট ({reports.length})
            </h2>
          </div>

          {reports.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs">
              কোনো নতুন প্রশ্ন রিপোর্ট পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map(r => (
                <div key={r.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {r.issueType}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase">
                      Status: {r.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    <strong className="text-slate-400 block mb-0.5">শিক্ষার্থীর নোট:</strong>
                    {r.note || '(কোনো মন্তব্য নেই)'}
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleReportAction(r.id, 'reviewing')}
                      className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 cursor-pointer"
                    >
                      পর্যালোচনায় মার্ক করুন
                    </button>
                    <button
                      onClick={() => handleReportAction(r.id, 'resolved')}
                      className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30 cursor-pointer"
                    >
                      সমাধান হয়েছে
                    </button>
                    <button
                      onClick={() => handleReportAction(r.id, 'dismissed')}
                      className="bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      খারিজ করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 7: TEST BLUEPRINT BUILDER ==================== */}
      {activeTab === 'blueprints' && (
        <div className="space-y-8">
          <ModelTestBlueprintAdmin />

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>সাধারণ অ্যাসেসমেন্ট ব্লুপ্রিন্ট বিল্ডার</span>
              নতুন টেস্ট ব্লুপ্রিন্ট বিল্ডার (Assessment Blueprint Builder)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ব্লুপ্রিন্টের নাম</label>
                <input
                  type="text"
                  value={blueprintForm.title}
                  onChange={e => setBlueprintForm({ ...blueprintForm, title: e.target.value })}
                  placeholder="যেমন: মেডিকেল জীববিজ্ঞান স্পেশাল টেস্ট-০১"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ফিচার প্লেসমেন্ট</label>
                <select
                  value={blueprintForm.feature}
                  onChange={e => setBlueprintForm({ ...blueprintForm, feature: e.target.value as DeliveryFeature })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="practice_bank">অনুশীলনী প্রশ্নব্যাংক (Practice Bank)</option>
                  <option value="past_questions">বিগত বছরের প্রশ্ন (Past Questions)</option>
                  <option value="subject_test">বিষয়ভিত্তিক পরীক্ষা (Subject Test)</option>
                  <option value="mock_test">মক টেস্ট (Mock Test)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">সময়সীমা (সেকেন্ড)</label>
                <input
                  type="number"
                  value={blueprintForm.timeLimitSeconds}
                  onChange={e => setBlueprintForm({ ...blueprintForm, timeLimitSeconds: parseInt(e.target.value) || 600 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSaveBlueprint}
                className="bg-purple-500 hover:bg-purple-600 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-2xl transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                ব্লুপ্রিন্ট প্রকাশ/সংরক্ষণ করুন
              </button>
            </div>
          </div>

          {/* Blueprints List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300">বিদ্যমান ব্লুপ্রিন্টসমূহ ({blueprints.length})</h3>
            {blueprints.map(bp => (
              <div key={bp.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {bp.feature}
                  </span>
                  <h4 className="text-white text-sm font-bold mt-1">{bp.title}</h4>
                </div>
                <span className="text-xs text-slate-400 font-bold">{bp.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 8: TOPIC ANALYSIS ==================== */}
      {activeTab === 'topic_analysis' && (
        <TopicAnalysisAdmin />
      )}

      {/* INSPECT / REVIEW MODAL */}
      {inspectQuestion && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white">প্রশ্ন বিবরণ ও নিরীক্ষণ</h3>
              <button
                onClick={() => setInspectQuestion(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-1">প্রশ্ন:</span>
                <p className="text-white font-bold text-sm bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {inspectQuestion.stem}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {inspectQuestion.options?.map(opt => (
                  <div
                    key={opt.id}
                    className={`p-2.5 rounded-xl border ${
                      opt.id === inspectQuestion.correctOptionId
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <strong>{opt.id}.</strong> {opt.text}
                  </div>
                ))}
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300">
                <strong className="block text-slate-400 mb-1">ব্যাখ্যা:</strong>
                {inspectQuestion.explanation?.shortExplanation}
              </div>

              {/* Publish Guard Errors if any */}
              {validatePublishGuard(inspectQuestion).length > 0 && (
                <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl space-y-1">
                  <span className="text-rose-400 font-bold block">প্রকাশের জন্য ঘাটতিসমূহ:</span>
                  <ul className="list-disc list-inside text-rose-300 text-[11px]">
                    {validatePublishGuard(inspectQuestion).map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Review Note Input */}
              {inspectQuestion.status === 'in_review' && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="block font-bold text-slate-300">সংশোধনের মন্তব্য (প্রযোজ্য হলে):</label>
                  <textarea
                    rows={2}
                    value={reviewNoteInput}
                    onChange={e => setReviewNoteInput(e.target.value)}
                    placeholder="কী সংশোধন করতে হবে লিখুন..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  />

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleRequestChanges(inspectQuestion)}
                      className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold py-2.5 rounded-xl border border-amber-500/30 cursor-pointer"
                    >
                      সংশোধনের অনুরোধ করুন
                    </button>
                    <button
                      onClick={() => handleApproveAndPublish(inspectQuestion)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-2.5 rounded-xl shadow-lg cursor-pointer"
                    >
                      অনুমোদন ও প্রকাশ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT PUBLISHED VERSION MODAL */}
      {editPublishedModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-4">
            <h3 className="text-base font-extrabold text-white">
              প্রকাশিত প্রশ্ন হালনাগাদ (v{(editPublishedModal.version || 1) + 1})
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">প্রশ্নের মূল কথা (Stem)</label>
              <textarea
                rows={3}
                value={editPublishedModal.stem}
                onChange={e => setEditPublishedModal({ ...editPublishedModal, stem: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">পরিবর্তনের কারণ/নোট (Change Note)</label>
              <input
                type="text"
                value={editPublishedChangeNote}
                onChange={e => setEditPublishedChangeNote(e.target.value)}
                placeholder="যেমন: টাইপো সংশোধন করা হয়েছে"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setEditPublishedModal(null)}
                className="flex-1 bg-slate-800 text-slate-300 font-bold py-2.5 rounded-xl cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={handleUpdatePublishedVersion}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-2.5 rounded-xl shadow-lg cursor-pointer"
              >
                নতুন সংস্করণ প্রকাশ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
