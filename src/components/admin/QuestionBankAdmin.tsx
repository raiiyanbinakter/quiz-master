import React, { useState, useEffect, useMemo } from 'react';
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
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import {
  QuestionItem,
  QuestionMediaItem,
  QuestionStatus,
  DeliveryFeature,
  MedicalSubject,
  SourceStatus,
  AssessmentBlueprint,
  QuestionReport,
  QuestionReportIssueType,
  QuestionReportStatus
} from '../../types/questionBank';
import QuestionImageUploader from './QuestionImageUploader';
import { StoragePathParams } from '../../utils/questionMediaStorage';
import {
  parsePlainTextQuestions,
  validatePublishGuard,
  ParseResult,
  ParseResultItem,
  AdminImportTargetMetadata,
  slugifyText,
  ALLOWED_DELIVERY_FEATURES
} from '../../utils/questionParser';
import { ROUTE_TAXONOMY, AppRoute } from '../../data/routeTaxonomy';
import { MathText } from '../MathText';
import {
  TEACHER_SOURCE_SETS,
  MEDICAL_PRACTICE_SUBJECTS,
  getMedicalPracticeRemovedStats,
  REMOVED_MEDICAL_PRACTICE_QUESTIONS_ARCHIVE
} from '../../lib/medicalPracticeBank';
import {
  ACADEMIC_TEACHER_SOURCE_SETS,
  resolveCanonicalTopic,
  CANONICAL_TOPICS_BY_CHAPTER
} from '../../lib/academicPracticeBank';
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
import ImageRequiredTab from './ImageRequiredTab';
import { 
  fetchAllQuestionsNeedingImage,
  QuestionNeedingImage
} from '../../lib/questionMediaOverrides';

interface QuestionBankAdminProps {
  userEmail?: string;
  onBack?: () => void;
}

type SubTab =
  | 'add'
  | 'import'
  | 'image_required'
  | 'drafts'
  | 'in_review'
  | 'published'
  | 'reports'
  | 'blueprints'
  | 'topic_analysis'
  | 'medical_cleanup';

export const PAST_YEAR_OPTIONS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010
];

export const PAST_EXAM_BOARDS_UNIVERSITIES = [
  // General HSC Education Boards
  { id: 'ঢা.বো.', label: 'ঢাকা বোর্ড (Dhaka Board)' },
  { id: 'রা.বো.', label: 'রাজশাহী বোর্ড (Rajshahi Board)' },
  { id: 'চ.বো.', label: 'চট্টগ্রাম বোর্ড (Chittagong Board)' },
  { id: 'কু.বো.', label: 'কুমিল্লা বোর্ড (Cumilla Board)' },
  { id: 'য.বো.', label: 'যশোর বোর্ড (Jashore Board)' },
  { id: 'ব.বো.', label: 'বরিশাল বোর্ড (Barishal Board)' },
  { id: 'সি.বো.', label: 'সিলেট বোর্ড (Sylhet Board)' },
  { id: 'দি.বো.', label: 'দিনাজপুর বোর্ড (Dinajpur Board)' },
  { id: 'ম.বো.', label: 'ময়মনসিংহ বোর্ড (Mymensingh Board)' },
  { id: 'মা.বো.', label: 'মাদ্রাসা বোর্ড (Madrasah Board)' },
  // Medical & Health Admissions
  { id: 'মেডিকেল (MBBS)', label: 'মেডিকেল ভর্তি পরীক্ষা (MBBS / MATS)' },
  { id: 'ডেন্টাল (BDS)', label: 'ডেন্টাল ভর্তি পরীক্ষা (BDS Dental)' },
  { id: 'আর্মড ফোর্সেস (AFMC)', label: 'আর্মড ফোর্সেস মেডিকেল (AFMC)' },
  // University Admissions
  { id: 'ঢাবি ক ইউনিট (DU)', label: 'ঢাকা বিশ্ববিদ্যালয় (DU A Unit)' },
  { id: 'জিএসটি গুচ্ছ (GST)', label: 'জিএসটি গুচ্ছ পরীক্ষা (GST Admission)' },
  { id: 'রাবি (RU)', label: 'রাজশাহী বিশ্ববিদ্যালয় (RU)' },
  { id: 'চবি (CU)', label: 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)' },
  { id: 'জাবি (JU)', label: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় (JU)' },
  { id: 'কৃষি গুচ্ছ (BAU)', label: 'কৃষি বিশ্ববিদ্যালয় গুচ্ছ (Agri Cluster)' },
  // Engineering Admissions
  { id: 'বুয়েট (BUET)', label: 'বুয়েট (BUET Admission)' },
  { id: 'সিকেআরইউইটি (CKRUET)', label: 'চুয়েট/কুয়েট/রুয়েট গুচ্ছ (CKRUET)' },
  { id: 'বুটেক্স (BUTEX)', label: 'বুটেক্স (BUTEX Admission)' },
  { id: 'আইইউটি (IUT)', label: 'আইইউটি (IUT Admission)' },
  { id: 'মিলিটারি (MIST)', label: 'মিলিটারি ইনস্টিটিউট (MIST)' },
  { id: 'other_custom', label: 'অন্যান্য বোর্ড/বিশ্ববিদ্যালয় (কাস্টম নাম)' }
];

export const TEACHER_SOURCE_OPTIONS = [
  { id: 'ishak', label: 'ইসহাক স্যার (Amir Hossain Ishak)' },
  { id: 'topon', label: 'তপন স্যার (Shahjahan Tapan)' },
  { id: 'pramanik', label: 'প্রামাণিক স্যার (Pramanik)' },
  { id: 'tofazzal', label: 'তোফাজ্জল স্যার (Tofazzal Hossain)' },
  { id: 'hazari', label: 'হাজারী স্যার (Hazari & Nag)' },
  { id: 'kabir', label: 'কবীর স্যার (Sanjit Kumar Kabir)' },
  { id: 'guha', label: 'গুহ স্যার (Swapan Kumar Guha)' },
  { id: 'lincoln', label: 'লিংকন স্যার (Lincoln)' },
  { id: 'abul_hasan', label: 'আবুল হাসান স্যার (Dr. Abul Hasan)' },
  { id: 'gazi_ajmol', label: 'গাজী আজমল স্যার (Gazi Azmal)' },
  { id: 'majeda', label: 'মাজেদা বেগম ম্যাডাম' },
  { id: 'other', label: 'অন্যান্য (কাস্টম নাম লিখুন)' }
];

export const FEATURE_PLACEMENT_OPTIONS: Array<{ id: DeliveryFeature; label: string; shortLabel: string }> = [
  { id: 'practice_bank', label: 'Practice Question Bank (অনুশীলনী প্রশ্নব্যাংক)', shortLabel: 'Practice Bank' },
  { id: 'past_questions', label: 'Past Year Questions (বিগত বছরের প্রশ্ন)', shortLabel: 'Past Questions' },
  { id: 'subject_test', label: 'Subject Test (বিষয়ভিত্তিক টেস্ট)', shortLabel: 'Subject Test' },
  { id: 'mock_test', label: 'Mock Test (মক টেস্ট)', shortLabel: 'Mock Test' },
  { id: 'model_test', label: 'Model Test (মডেল টেস্ট)', shortLabel: 'Model Test' },
  { id: 'routine_review', label: 'Routine Review (রুটিন রিভিশন)', shortLabel: 'Routine Review' }
];

export const DEFAULT_SAMPLE_PLAIN_TEXT = `---QUESTION---
SOURCE_QUESTION_NUMBER: 1
QUESTION: আধুনিক পর্যায় সারণিতে বিভিন্ন মৌলসমূহকে কীসের ক্রম অনুসারে সাজানো হয়েছে? [লিংকন স্যার]
A: পারমাণবিক স্তর
B: নিউট্রন সংখ্যা
C: বর্ণানুক্রমিক ভাবে
D: পারমাণবিক সংখ্যা
ANSWER: D
SHORT_EXPLANATION: আধুনিক পর্যায় সারণি মৌলসমূহের পারমাণবিক সংখ্যার ক্রমানুসারে সাজানো হয়েছে।
DETAILED_EXPLANATION: ১৯১৩ সালে হেনরি মোসলে পারমাণবিক সংখ্যার ধারণা দেন যা আধুনিক পর্যায় সারণির ভিত্তি।
TIME: 45
---END---

---QUESTION---
SOURCE_QUESTION_NUMBER: 2
QUESTION: $\\mathrm{C_{6}H_{5}OH + Zn \\xrightarrow{\\text{পাতন}} \\mathrm{C_{6}H_{6}} + ZnO}$ [হাজারী স্যার]
উপরোক্ত বিক্রিয়ায় এটম ইকোনমির মান কত?
A: 34.5%
B: 48.9%
C: 51.1%
D: 65.5%
ANSWER: B
SHORT_EXPLANATION: এটম ইকোনমি = (কাঙ্ক্ষিত উৎপাদের ভর / মোট উৎপাদের ভর) * ১০০% = ৪৮.৯%
DETAILED_EXPLANATION: সবুজ রসায়নের ১২টি নীতির মধ্যে এটম ইকোনমি অন্যতম প্রধান নীতি।
TIME: 60
---END---

---QUESTION---
SOURCE_QUESTION_NUMBER: 3
QUESTION: নিচের প্রদর্শিত বর্তনীতে তুল্য রোধের মান কত? [এখানে চিত্র ছিল]
A: $5\\,\\Omega$
B: $10\\,\\Omega$
C: $15\\,\\Omega$
D: $20\\,\\Omega$
ANSWER: A
SHORT_EXPLANATION: সমান্তরাল ও শ্রেণি সমবায়ের সূত্র ব্যবহার করে তুল্য রোধ $5\\,\\Omega$ নির্ণয় করা যায়।
DETAILED_EXPLANATION: $R_p = \\frac{R_1 \\times R_2}{R_1 + R_2}$
TIME: 45
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
  const [pastedText, setPastedText] = useState(DEFAULT_SAMPLE_PLAIN_TEXT);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [editingBlockIndex, setEditingBlockIndex] = useState<number | null>(null);
  const [importStatusMsg, setImportStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [uploadingItemIndices, setUploadingItemIndices] = useState<Set<number>>(new Set());

  // Dedicated Admin Import Destination Target State
  const [importRoute, setImportRoute] = useState<AppRoute>('academic');
  const [importFeature, setImportFeature] = useState<DeliveryFeature>('practice_bank');
  const [importSubject, setImportSubject] = useState<string>('physics');
  const [importPaper, setImportPaper] = useState<'first' | 'second' | 'not_applicable'>('first');
  const [importChapter, setImportChapter] = useState<string>('অধ্যায় ২: ভেক্টর');
  const [importChapterCustom, setImportChapterCustom] = useState<string>('');
  const [isCustomChapter, setIsCustomChapter] = useState<boolean>(false);
  const [importTopic, setImportTopic] = useState<string>('ভেক্টর যোগ ও বিয়োজন');
  const [importTopicCustom, setImportTopicCustom] = useState<string>('');
  const [isCustomTopic, setIsCustomTopic] = useState<boolean>(false);
  const [importTeacher, setImportTeacher] = useState<string>('ishak');
  const [importTeacherCustom, setImportTeacherCustom] = useState<string>('');
  const [importSourceStatus, setImportSourceStatus] = useState<SourceStatus>('original_practice');

  // Past Year Questions specific target states
  const [importYear, setImportYear] = useState<number>(2024);
  const [importBoardOrExam, setImportBoardOrExam] = useState<string>('ঢা.বো.');
  const [importBoardOrExamCustom, setImportBoardOrExamCustom] = useState<string>('');
  const [importSourceTitle, setImportSourceTitle] = useState<string>('');

  // Available subjects for current route
  const currentRouteSubjects = useMemo(() => {
    return ROUTE_TAXONOMY[importRoute]?.subjects || [];
  }, [importRoute]);

  // Current subject object
  const currentSubjectObj = useMemo(() => {
    return currentRouteSubjects.find(s => s.id === importSubject) || currentRouteSubjects[0];
  }, [currentRouteSubjects, importSubject]);

  // Available papers for current subject
  const currentSubjectPapers = useMemo(() => {
    return currentSubjectObj?.papers || [];
  }, [currentSubjectObj]);

  // Current paper object
  const currentPaperObj = useMemo(() => {
    return currentSubjectPapers.find(p => p.id === importPaper) || currentSubjectPapers[0];
  }, [currentSubjectPapers, importPaper]);

  // Available chapters for current paper
  const currentPaperChapters = useMemo(() => {
    return currentPaperObj?.chapters || [];
  }, [currentPaperObj]);

  // Current chapter object
  const currentChapterObj = useMemo(() => {
    return currentPaperChapters.find(c => c.name === importChapter) || currentPaperChapters[0];
  }, [currentPaperChapters, importChapter]);

  // Available topics for current chapter
  const currentChapterTopics = useMemo(() => {
    return currentChapterObj?.topics || [];
  }, [currentChapterObj]);

  // Synchronize on Route change
  const handleRouteChange = (newRoute: AppRoute) => {
    setImportRoute(newRoute);
    const subjects = ROUTE_TAXONOMY[newRoute]?.subjects || [];
    if (subjects.length > 0) {
      const firstSub = subjects[0];
      setImportSubject(firstSub.id);
      const newPaper = firstSub.hasPapers ? 'first' : 'not_applicable';
      setImportPaper(newPaper);
      const firstPaperObj = firstSub.papers.find(p => p.id === newPaper) || firstSub.papers[0];
      if (firstPaperObj && firstPaperObj.chapters.length > 0) {
        setImportChapter(firstPaperObj.chapters[0].name);
        setIsCustomChapter(false);
        setImportTopic(firstPaperObj.chapters[0].topics[0] || '');
        setIsCustomTopic(false);
      } else {
        setImportChapter('');
        setImportTopic('');
      }
    }
  };

  // Synchronize on Subject change
  const handleSubjectChange = (newSubjectId: string) => {
    setImportSubject(newSubjectId);
    const subObj = currentRouteSubjects.find(s => s.id === newSubjectId);
    if (subObj) {
      const newPaper = subObj.hasPapers ? 'first' : 'not_applicable';
      setImportPaper(newPaper);
      const paperObj = subObj.papers.find(p => p.id === newPaper) || subObj.papers[0];
      if (paperObj && paperObj.chapters.length > 0) {
        setImportChapter(paperObj.chapters[0].name);
        setIsCustomChapter(false);
        setImportTopic(paperObj.chapters[0].topics[0] || '');
        setIsCustomTopic(false);
      } else {
        setImportChapter('');
        setImportTopic('');
      }
    }
  };

  // Synchronize on Paper change
  const handlePaperChange = (newPaper: 'first' | 'second' | 'not_applicable') => {
    setImportPaper(newPaper);
    const paperObj = currentSubjectPapers.find(p => p.id === newPaper);
    if (paperObj && paperObj.chapters.length > 0) {
      setImportChapter(paperObj.chapters[0].name);
      setIsCustomChapter(false);
      setImportTopic(paperObj.chapters[0].topics[0] || '');
      setIsCustomTopic(false);
    }
  };

  // Synchronize on Chapter change
  const handleChapterChange = (newChapterName: string) => {
    if (newChapterName === '__CUSTOM__') {
      setIsCustomChapter(true);
      setImportChapter('');
      setIsCustomTopic(true);
      setImportTopic('');
    } else {
      setIsCustomChapter(false);
      setImportChapter(newChapterName);
      const chapObj = currentPaperChapters.find(c => c.name === newChapterName);
      if (chapObj && chapObj.topics.length > 0) {
        setImportTopic(chapObj.topics[0]);
        setIsCustomTopic(false);
      } else {
        setImportTopic('');
      }
    }
  };

  // Target Metadata Validation & Retrieval
  const getSelectedTargetMetadata = (): { metadata: AdminImportTargetMetadata | null; error: string | null } => {
    if (!importRoute) {
      return { metadata: null, error: 'অনুগ্রহ করে Route (Academic / Medical / Varsity / Engineering) নির্বাচন করুন।' };
    }
    if (!importFeature) {
      return { metadata: null, error: 'অনুগ্রহ করে Feature placement নির্বাচন করুন।' };
    }
    if (!importSubject) {
      return { metadata: null, error: 'অনুগ্রহ করে Subject নির্বাচন করুন।' };
    }
    if (!importPaper) {
      return { metadata: null, error: 'অনুগ্রহ করে Paper নির্বাচন করুন।' };
    }
    
    const finalChapter = isCustomChapter ? importChapterCustom.trim() : importChapter.trim();
    if (!finalChapter) {
      return { metadata: null, error: 'অনুগ্রহ করে অধ্যায়ের (Chapter) নাম নির্বাচন অথবা লিখুন।' };
    }

    const topicRequired = importFeature !== 'model_test' && importFeature !== 'mock_test';
    const finalTopic = isCustomTopic ? importTopicCustom.trim() : importTopic.trim();
    if (topicRequired && !finalTopic) {
      return { metadata: null, error: 'অনুগ্রহ করে টপিকের (Topic) নাম নির্বাচন অথবা লিখুন।' };
    }

    let finalTeacherLabel = '';
    let finalSourceSet = importTeacher;

    if (importFeature === 'past_questions') {
      const finalBoard = importBoardOrExam === 'other_custom' ? importBoardOrExamCustom.trim() : importBoardOrExam;
      if (!finalBoard) {
        return { metadata: null, error: 'অনুগ্রহ করে বিগত বছরের পরীক্ষার বোর্ড বা বিশ্ববিদ্যালয়ের নাম নির্বাচন/লিখুন।' };
      }
      finalTeacherLabel = importSourceTitle.trim() || `${finalBoard} ${importYear}`;
      finalSourceSet = finalBoard;
    } else {
      if (!importTeacher) {
        return { metadata: null, error: 'অনুগ্রহ করে শিক্ষক / প্রশ্ন উৎস (Teacher / Question Source) নির্বাচন করুন।' };
      }
      if (importTeacher === 'other' && !importTeacherCustom.trim()) {
        return { metadata: null, error: 'অন্যান্য উৎসের ক্ষেত্রে কাস্টম শিক্ষক/উৎস নাম লেখা আবশ্যক।' };
      }
      const selectedTeacherObj = TEACHER_SOURCE_OPTIONS.find(t => t.id === importTeacher);
      finalTeacherLabel = importTeacher === 'other' ? importTeacherCustom.trim() : (selectedTeacherObj?.label || importTeacher);
    }

    const targetMetadata: AdminImportTargetMetadata = {
      route: importRoute,
      feature: importFeature,
      subject: importSubject,
      subjectId: importSubject,
      subjectName: currentSubjectObj?.name || importSubject,
      paper: importPaper,
      chapterName: finalChapter,
      chapterId: currentChapterObj?.id || slugifyText(finalChapter),
      topicName: finalTopic || (importFeature === 'model_test' ? 'মডেল টেস্ট' : importFeature === 'past_questions' ? finalTeacherLabel : 'মক টেস্ট'),
      topicId: slugifyText(finalTopic || importFeature),
      sourceSet: finalSourceSet,
      sourceSetLabel: finalTeacherLabel,
      customTeacherSource: importTeacher === 'other' ? importTeacherCustom.trim() : undefined,
      sourceStatus: importSourceStatus,
      pastExamYear: importYear,
      boardOrExam: importBoardOrExam === 'other_custom' ? importBoardOrExamCustom.trim() : importBoardOrExam,
      sourceTitle: finalTeacherLabel
    };

    return { metadata: targetMetadata, error: null };
  };

  // Review & Inspect Modal State
  const [inspectQuestion, setInspectQuestion] = useState<QuestionItem | null>(null);
  const [reviewNoteInput, setReviewNoteInput] = useState('');
  const [editPublishedModal, setEditPublishedModal] = useState<QuestionItem | null>(null);
  const [editPublishedChangeNote, setEditPublishedChangeNote] = useState('');

  // Image Upload & Validation States
  const [isUploadingSingleImage, setIsUploadingSingleImage] = useState(false);
  const [missingImageConfirmQuestion, setMissingImageConfirmQuestion] = useState<QuestionItem | null>(null);
  const [imageZoomModalUrl, setImageZoomModalUrl] = useState<{ url: string; altText?: string; title?: string } | null>(null);

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

  // Medical Practice Cleanup & Removal State
  const [showRemovalConfirmationModal, setShowRemovalConfirmationModal] = useState(false);
  const [cleanupConfirmed, setCleanupConfirmed] = useState(true);
  const [cleanupNotification, setCleanupNotification] = useState<{ text: string; type: 'success' | 'info' } | null>(null);
  const [cleanupSubjectFilter, setCleanupSubjectFilter] = useState<'all' | 'biology' | 'chemistry'>('all');
  const [cleanupSearchQuery, setCleanupSearchQuery] = useState('');
  const removedStats = getMedicalPracticeRemovedStats();

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
    const { metadata, error } = getSelectedTargetMetadata();
    if (error || !metadata) {
      setImportStatusMsg({
        text: error || 'অনুগ্রহ করে সকল আবশ্যকীয় টার্গেট ফিল্ড পূরণ করুন।',
        type: 'error'
      });
      return;
    }
    if (!pastedText || !pastedText.trim()) {
      setImportStatusMsg({
        text: 'অনুগ্রহ করে পার্স করার জন্য প্রশ্নের টেক্সট পেস্ট করুন।',
        type: 'error'
      });
      return;
    }
    const result = parsePlainTextQuestions(pastedText, userEmail, metadata);
    setParseResult(result);
    if (result.invalidCount > 0) {
      setImportStatusMsg({
        text: `পার্সিং সম্পন্ন: ${result.validCount} টি বৈধ প্রশ্ন পাওয়া গেছে, তবে ${result.invalidCount} টি প্রশ্নে ত্রুটি রয়েছে। ত্রুটিগুলো নিচে দেখে সংশোধন করুন।`,
        type: 'error'
      });
    } else if (result.validCount > 0) {
      setImportStatusMsg({
        text: `পার্সিং সফল! ${result.validCount} টি প্রশ্ন বৈধভাবে পার্স করা হয়েছে। খসড়া হিসেবে সংরক্ষণ করতে নিচের বাটনে ক্লিক করুন।`,
        type: 'success'
      });
    } else {
      setImportStatusMsg({
        text: 'কোনো প্রশ্ন পাওয়া যায়নি। ফরম্যাট ঠিক আছে কিনা পরীক্ষা করুন।',
        type: 'error'
      });
    }
  };

  const handleItemUploadStateChange = (itemIndex: number, isUploading: boolean) => {
    setUploadingItemIndices((prev) => {
      const next = new Set(prev);
      if (isUploading) {
        next.add(itemIndex);
      } else {
        next.delete(itemIndex);
      }
      return next;
    });
  };

  const handleParsedItemMediaChange = (
    itemIndex: number,
    updatedMedia: QuestionMediaItem[],
    hasImage: boolean
  ) => {
    if (!parseResult) return;
    const updatedItems = parseResult.items.map((it) => {
      if (it.index === itemIndex) {
        const hasMediaAttached = hasImage && updatedMedia.length > 0;
        const updatedParsedItem = {
          ...it.parsedItem,
          media: updatedMedia,
          hasImage: hasMediaAttached,
          stemImageUrl: updatedMedia[0]?.url || undefined
        };
        return {
          ...it,
          hasImagePlaceholder: !hasMediaAttached && (
            it.rawFields?.['STEM']?.includes('[এখানে চিত্র ছিল]') ||
            it.rawFields?.['QUESTION']?.includes('[এখানে চিত্র ছিল]') ||
            Boolean(it.hasImagePlaceholder)
          ),
          parsedItem: updatedParsedItem
        };
      }
      return it;
    });

    setParseResult({
      ...parseResult,
      items: updatedItems
    });
  };

  const getItemPathParams = (item: ParseResultItem): StoragePathParams => {
    const parsed = item.parsedItem;
    const route = parsed?.route || importRoute || 'academic';
    const subject = parsed?.subject || importSubject || 'physics';
    const paper = parsed?.paper || importPaper || 'first';
    const chapterId = parsed?.chapterId || slugifyText(parsed?.chapterName || importChapter || 'general');
    const sourceSet = parsed?.sourceSet || importTeacher || 'general';
    const topicId = parsed?.topicId || slugifyText(parsed?.topicName || importTopic || 'general');
    const questionId = parsed?.id || (item.rawId ? `q_${item.rawId}` : `q_parsed_${item.index}_${Date.now()}`);

    return {
      route,
      subject,
      paper,
      chapterId,
      sourceSet,
      topicId,
      questionId,
      filename: 'diagram.png'
    };
  };

  const handleSaveAllValidDrafts = async () => {
    if (uploadingItemIndices.size > 0) {
      setImportStatusMsg({
        text: 'চিত্র আপলোড সম্পন্ন হওয়া পর্যন্ত অনুগ্রহ করে অপেক্ষা করুন।',
        type: 'error'
      });
      return;
    }
    const { metadata, error } = getSelectedTargetMetadata();
    if (error || !metadata) {
      setImportStatusMsg({
        text: error || 'অনুগ্রহ করে সকল আবশ্যকীয় টার্গেট ফিল্ড পূরণ করুন।',
        type: 'error'
      });
      return;
    }
    if (!parseResult) return;
    const validItems = parseResult.items
      .filter(i => i.errors.length === 0 && i.parsedItem)
      .map(i => ({
        ...i.parsedItem!,
        status: 'draft' as QuestionStatus
      }));

    if (validItems.length === 0) {
      setImportStatusMsg({ text: 'সংরক্ষণ করার মতো কোনো বৈধ প্রশ্ন নেই।', type: 'error' });
      return;
    }

    try {
      const count = await batchSaveDraftQuestions(validItems);
      setImportStatusMsg({
        text: `সফলভাবে ${count} টি বৈধ প্রশ্ন খসড়া (Draft) হিসেবে সংরক্ষণ করা হয়েছে! এগুলো 'খসড়া প্রশ্ন' ট্যাবে জমা হয়েছে।`,
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
    if (isUploadingSingleImage) {
      setFormMsg({ text: 'চিত্র আপলোড সম্পন্ন হওয়া পর্যন্ত অনুগ্রহ করে অপেক্ষা করুন।', type: 'error' });
      return;
    }
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
      const hasMediaImage = Boolean(singleForm.media && singleForm.media.length > 0);

      await saveQuestionItem({
        ...singleForm,
        hasImage: hasMediaImage,
        media: singleForm.media || [],
        stemImageUrl: singleForm.media?.[0]?.url || singleForm.stemImageUrl || undefined,
        tags,
        status: targetStatus,
        createdBy: userEmail
      });

      setFormMsg({
        text: targetStatus === 'in_review' ? 'প্রশ্নটি সফলভাবে রিভিউয়ের জন্য পাঠানো হয়েছে!' : 'প্রশ্নটি খসড়া হিসেবে সংরক্ষিত হয়েছে!',
        type: 'success'
      });

      // Reset form stem, options & media
      setSingleForm(prev => ({
        ...prev,
        stem: '',
        media: [],
        hasImage: false,
        stemImageUrl: undefined,
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
    // Check if question has [এখানে চিত্র ছিল] but no uploaded image
    const hasPlaceholder = Boolean(
      (question.stem && question.stem.includes('[এখানে চিত্র ছিল]')) ||
      (question.explanation?.shortExplanation && question.explanation.shortExplanation.includes('[এখানে চিত্র ছিল]')) ||
      (question.explanation?.detailedExplanation && question.explanation.detailedExplanation.includes('[এখানে চিত্র ছিল]'))
    );
    const hasUploadedImage = Boolean(
      question.hasImage ||
      (question.media && question.media.length > 0) ||
      question.stemImageUrl
    );

    if (hasPlaceholder && !hasUploadedImage) {
      setMissingImageConfirmQuestion(question);
      return;
    }

    const publishErrors = validatePublishGuard(question);
    if (publishErrors.length > 0) {
      alert(`প্রকাশ করা যাবে না। নিচে উল্লেখিত তথ্যের ঘাটতি রয়েছে:\n\n• ${publishErrors.join('\n• ')}`);
      return;
    }

    try {
      await updateQuestionStatus(question.id, 'published', userEmail, 'প্রকাশিত ও অনুমোদিত');
      alert('প্রশ্নটি সফলভাবে প্রকাশিত হয়েছে!');
      setInspectQuestion(null);
      setMissingImageConfirmQuestion(null);
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
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'add'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>নতুন প্রশ্ন যোগ করুন</span>
        </button>

        <button
          onClick={() => setActiveTab('import')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'import'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>প্লেইন টেক্সট ইমপোর্ট</span>
        </button>

        <button
          onClick={() => setActiveTab('image_required')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'image_required'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span>চিত্র প্রয়োজন</span>
        </button>

        <button
          onClick={() => setActiveTab('drafts')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'drafts'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Edit className="w-4 h-4 text-cyan-400" />
          <span>খসড়া প্রশ্ন ({questions.filter(q => q.status === 'draft').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('in_review')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'in_review'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Eye className="w-4 h-4 text-amber-400" />
          <span>রিভিউয়ের জন্য ({questions.filter(q => q.status === 'in_review').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('published')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'published'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>প্রকাশিত প্রশ্ন ({questions.filter(q => q.status === 'published').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'reports'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-md shadow-rose-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Flag className="w-4 h-4 text-rose-400" />
          <span>প্রশ্ন রিপোর্ট ({reports.filter(r => r.status === 'open').length})</span>
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
          <span>টেস্ট ব্লুপ্রিন্ট ({blueprints.length})</span>
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
          <span>টপিক বিশ্লেষণ</span>
        </button>

        <button
          onClick={() => setActiveTab('medical_cleanup')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'medical_cleanup'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>প্র্যাকটিস ক্লিন-আপ অডিট ({removedStats.totalRemovedCount})</span>
        </button>
      </div>

      {/* ==================== TAB 1: PLAIN TEXT IMPORT ==================== */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          {/* TARGET DESTINATION SELECTOR CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>ইমপোর্ট গন্তব্য ও মেটাডাটা নির্বাচন (Import Target)</span>
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  প্রশ্ন টেক্সট পার্স করার আগে সঠিক রুট, ফিচার, বিষয়, পত্র, অধ্যায়, টপিক ও প্রশ্ন উৎস নির্বাচন করুন।
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  খসড়া (Draft First) ওয়ার্কফ্লো
                </span>
              </div>
            </div>

            {/* 1. ROUTE SELECTOR BUTTONS */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                ১. রুট নির্বাচন করুন (Route) <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['academic', 'medical', 'varsity', 'engineering'] as AppRoute[]).map((r) => {
                  const isSelected = importRoute === r;
                  const routeMeta = ROUTE_TAXONOMY[r];
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleRouteChange(r)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className={`text-xs font-extrabold block ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {routeMeta.name}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {r.toUpperCase()} ROUTE
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. FEATURE PLACEMENT, SUBJECT, PAPER, TEACHER, SOURCE STATUS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80 text-xs">
              {/* Feature Placement */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">
                  ২. ফিচার প্লেসমেন্ট (Feature Placement) <span className="text-rose-400">*</span>
                </label>
                <select
                  value={importFeature}
                  onChange={(e) => setImportFeature(e.target.value as DeliveryFeature)}
                  className="w-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500"
                >
                  {FEATURE_PLACEMENT_OPTIONS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Selector */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">
                  ৩. বিষয় (Subject) <span className="text-rose-400">*</span>
                </label>
                <select
                  value={importSubject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500"
                >
                  {currentRouteSubjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Paper Selector */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">
                  ৪. পত্র (Paper) <span className="text-rose-400">*</span>
                </label>
                <select
                  value={importPaper}
                  disabled={!currentSubjectObj?.hasPapers}
                  onChange={(e) => handlePaperChange(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                >
                  {currentSubjectPapers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                  {!currentSubjectObj?.hasPapers && (
                    <option value="not_applicable">প্রযোজ্য নয় (Not Applicable)</option>
                  )}
                </select>
              </div>

              {/* Conditional 5: Teacher Selection OR Past Year Exam/Board Selection */}
              {importFeature === 'past_questions' ? (
                <>
                  {/* Past Exam Board / University */}
                  <div
                    className={`bg-slate-950/80 p-3.5 rounded-2xl border space-y-1.5 ${
                      !importBoardOrExam ? 'border-purple-500/60 shadow-lg shadow-purple-500/10' : 'border-slate-800/80'
                    }`}
                  >
                    <label className="text-[11px] font-extrabold text-purple-400 block flex items-center justify-between">
                      <span>৫. বোর্ড / বিশ্ববিদ্যালয় / পরীক্ষা</span>
                      <span className="text-rose-400">* আবশ্যক</span>
                    </label>
                    <select
                      value={importBoardOrExam}
                      onChange={(e) => setImportBoardOrExam(e.target.value)}
                      className="w-full bg-slate-900 border border-purple-500/50 text-purple-300 font-extrabold text-xs rounded-xl p-2 focus:outline-none focus:border-purple-400"
                    >
                      {PAST_EXAM_BOARDS_UNIVERSITIES.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                    {importBoardOrExam === 'other_custom' && (
                      <input
                        type="text"
                        value={importBoardOrExamCustom}
                        onChange={(e) => setImportBoardOrExamCustom(e.target.value)}
                        placeholder="কাস্টম বোর্ড / বিশ্ববিদ্যালয়ের নাম লিখুন *"
                        className="w-full bg-slate-900 border border-purple-500/70 text-white font-bold text-xs rounded-xl p-2 mt-1 focus:outline-none"
                      />
                    )}
                  </div>

                  {/* Past Exam Year */}
                  <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 block">
                      ৬. পরীক্ষার সাল (Exam Year) <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={importYear}
                      onChange={(e) => setImportYear(parseInt(e.target.value) || 2024)}
                      className="w-full bg-slate-900 border border-slate-700 text-amber-300 font-bold text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500"
                    >
                      {PAST_YEAR_OPTIONS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                /* Regular Teacher / Source Selection (Mandatory) */
                <div
                  className={`bg-slate-950/80 p-3.5 rounded-2xl border space-y-1.5 ${
                    !importTeacher ? 'border-amber-500/60 shadow-lg shadow-amber-500/10' : 'border-slate-800/80'
                  }`}
                >
                  <label className="text-[11px] font-extrabold text-amber-400 block flex items-center justify-between">
                    <span>৫. শিক্ষক / প্রশ্ন উৎস (Teacher/Source)</span>
                    <span className="text-rose-400">* আবশ্যক</span>
                  </label>
                  <select
                    value={importTeacher}
                    onChange={(e) => {
                      setImportTeacher(e.target.value);
                      if (importStatusMsg?.text?.includes('শিক্ষক')) {
                        setImportStatusMsg(null);
                      }
                    }}
                    className="w-full bg-slate-900 border border-amber-500/50 text-emerald-300 font-extrabold text-xs rounded-xl p-2 focus:outline-none focus:border-amber-400"
                  >
                    <option value="">-- শিক্ষক / প্রশ্ন উৎস নির্বাচন করুন --</option>
                    {TEACHER_SOURCE_OPTIONS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {importTeacher === 'other' && (
                    <input
                      type="text"
                      value={importTeacherCustom}
                      onChange={(e) => setImportTeacherCustom(e.target.value)}
                      placeholder="কাস্টম শিক্ষক / প্রশ্ন উৎসের নাম লিখুন *"
                      className="w-full bg-slate-900 border border-amber-500/70 text-white font-bold text-xs rounded-xl p-2 mt-1 focus:outline-none"
                    />
                  )}
                </div>
              )}

              {/* Source Status */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">
                  {importFeature === 'past_questions' ? '৭. ভেরিফিকেশন স্ট্যাটাস' : '৬. সোর্স স্ট্যাটাস (Source Status)'}
                </label>
                <select
                  value={importSourceStatus}
                  onChange={(e) => setImportSourceStatus(e.target.value as SourceStatus)}
                  className="w-full bg-slate-900 border border-slate-700 text-amber-300 font-bold text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500"
                >
                  <option value="original_practice">Original Practice (মূল প্র্যাকটিস প্রশ্ন)</option>
                  <option value="needs_verification">Needs Verification (যাচাই প্রয়োজন)</option>
                  <option value="verified">Verified (যাচাইকৃত)</option>
                </select>
              </div>

              {/* Target Summary Pill */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 font-bold block">নির্বাচিত গন্তব্য সারাংশ</span>
                <span className="text-xs font-extrabold text-white mt-1">
                  {ROUTE_TAXONOMY[importRoute]?.name} → {currentSubjectObj?.name || importSubject} (
                  {importPaper === 'first' ? '১ম পত্র' : importPaper === 'second' ? '২য় পত্র' : 'N/A'})
                </span>
                <span className="text-[11px] text-emerald-400 font-bold mt-0.5">
                  উৎস:{' '}
                  {importFeature === 'past_questions'
                    ? `${importBoardOrExam === 'other_custom' ? importBoardOrExamCustom || 'কাস্টম' : importBoardOrExam} (${importYear})`
                    : importTeacher === 'other'
                    ? importTeacherCustom || '(কাস্টম)'
                    : TEACHER_SOURCE_OPTIONS.find((t) => t.id === importTeacher)?.label || 'অনির্ধারিত'}
                </span>
              </div>
            </div>

            {/* 3. CHAPTER & TOPIC ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 text-xs">
              {/* Chapter Selection */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-300">
                    ৭. অধ্যায় (Chapter) <span className="text-rose-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomChapter(!isCustomChapter);
                      if (!isCustomChapter) {
                        setIsCustomTopic(true);
                      }
                    }}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
                  >
                    {isCustomChapter ? 'তালিকা থেকে বাছুন' : '+ কাস্টম অধ্যায় লিখুন'}
                  </button>
                </div>

                {isCustomChapter ? (
                  <input
                    type="text"
                    value={importChapterCustom}
                    onChange={(e) => setImportChapterCustom(e.target.value)}
                    placeholder="অধ্যায়ের পুরো নাম লিখুন (যেমন: অধ্যায় ২: ভেক্টর)"
                    className="w-full bg-slate-900 border border-cyan-500 text-white font-bold text-xs rounded-xl p-2.5 focus:outline-none"
                  />
                ) : (
                  <select
                    value={importChapter}
                    onChange={(e) => handleChapterChange(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
                  >
                    {currentPaperChapters.map((c) => (
                      <option key={c.id || c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    {currentPaperChapters.length === 0 && (
                      <option value="">অধ্যায় পাওয়া যায়নি (কাস্টম নাম লিখুন)</option>
                    )}
                  </select>
                )}
              </div>

              {/* Topic Selection */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-300">
                    ৮. টপিক (Topic){' '}
                    {importFeature === 'model_test' || importFeature === 'mock_test' ? (
                      <span className="text-slate-500 font-normal">(ঐচ্ছিক)</span>
                    ) : (
                      <span className="text-rose-400">*</span>
                    )}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomTopic(!isCustomTopic)}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                  >
                    {isCustomTopic ? 'তালিকা থেকে বাছুন' : '+ নতুন টপিক যোগ করুন'}
                  </button>
                </div>

                {isCustomTopic ? (
                  <input
                    type="text"
                    value={importTopicCustom}
                    onChange={(e) => setImportTopicCustom(e.target.value)}
                    placeholder="নতুন টপিকের নাম লিখুন (যেমন: ডট গুণন ও লম্ব ভেক্টর)"
                    className="w-full bg-slate-900 border border-emerald-500 text-white font-bold text-xs rounded-xl p-2.5 focus:outline-none"
                  />
                ) : (
                  <select
                    value={importTopic}
                    onChange={(e) => setImportTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
                  >
                    {currentChapterTopics.map((top) => (
                      <option key={top} value={top}>
                        {top}
                      </option>
                    ))}
                    {currentChapterTopics.length === 0 && (
                      <option value="">কোনো টপিক পাওয়া যায়নি (নতুন টপিক যোগ করুন)</option>
                    )}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* PLAIN TEXT PASTE BOX */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>প্লেইন টেক্সট পেস্ট ও পার্সিং</span>
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  বাংলা ও ইংরেজি সংখ্যা (১, 2), বাংলা অপশন (ক, খ, গ, ঘ) ও LaTeX Math ($...$) স্বয়ংক্রিয়ভাবে পার্স হবে।
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setPastedText(DEFAULT_SAMPLE_PLAIN_TEXT);
                    setImportStatusMsg(null);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl transition-all border border-slate-700 cursor-pointer"
                >
                  নমুনা ফরম্যাট লোড করুন
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPastedText('');
                    setParseResult(null);
                    setImportStatusMsg(null);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all border border-slate-700 cursor-pointer"
                >
                  ক্লিয়ার করুন
                </button>
                <button
                  type="button"
                  onClick={handleParseText}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-5 py-2 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  প্রিভিউ করুন
                </button>
              </div>
            </div>

            <textarea
              rows={13}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="এখানে নির্দেশিত ফরম্যাটে প্রশ্ন পেস্ট করুন (যেমন: ---QUESTION--- ... ---END---)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-y leading-relaxed"
            />

            {importStatusMsg && (
              <div
                className={`p-4 rounded-2xl text-xs font-bold border flex items-start gap-2.5 ${
                  importStatusMsg.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                }`}
              >
                {importStatusMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <span>{importStatusMsg.text}</span>
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
                  <span className="text-xl font-extrabold text-cyan-300 mt-1 block">
                    {parseResult.needsVerificationCount}
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <p className="text-xs text-slate-300">
                  <strong className="text-emerald-400 font-bold">{parseResult.validCount}</strong> টি বৈধ প্রশ্ন খসড়া
                  (Draft) হিসেবে সংরক্ষণের জন্য প্রস্তুত।
                </p>
                <button
                  type="button"
                  onClick={handleSaveAllValidDrafts}
                  disabled={parseResult.validCount === 0 || uploadingItemIndices.size > 0}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {uploadingItemIndices.size > 0 ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      চিত্র আপলোড হচ্ছে ({uploadingItemIndices.size})...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      সকল বৈধ প্রশ্ন খসড়া হিসেবে সংরক্ষণ করুন
                    </>
                  )}
                </button>
              </div>

              {/* Parsed Items List */}
              <div className="space-y-4">
                {parseResult.items.map((item) => {
                  const isValid = item.errors.length === 0;
                  const parsed = item.parsedItem;
                  const hasImageAttached = Boolean(
                    parsed?.hasImage ||
                    (parsed?.media && parsed.media.length > 0) ||
                    parsed?.stemImageUrl
                  );
                  const needsImage = Boolean(
                    !hasImageAttached &&
                    (item.hasImagePlaceholder || parsed?.stem?.includes('[এখানে চিত্র ছিল]'))
                  );

                  return (
                    <div
                      key={item.index}
                      id={`preview-card-${item.index}`}
                      className={`p-5 rounded-2xl border transition-all space-y-4 ${
                        isValid ? 'bg-slate-900/90 border-slate-800' : 'bg-rose-950/20 border-rose-500/40'
                      }`}
                    >
                      {/* Header with Source Question Number & Metadata */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-slate-800 text-slate-200 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-slate-700">
                            #{item.sourceQuestionNumber || item.index} {item.rawId ? `(${item.rawId})` : ''}
                          </span>

                          {isValid ? (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> বৈধ প্রশ্ন
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

                          {/* Target Metadata Badges: Route / Subject / Paper / Chapter / Topic / Teacher */}
                          {(parsed?.route || importRoute) && (
                            <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                              {parsed?.route || importRoute}
                            </span>
                          )}

                          {(parsed?.subject || importSubject) && (
                            <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {parsed?.subject || importSubject}
                            </span>
                          )}

                          {(parsed?.paper || importPaper) && (parsed?.paper || importPaper) !== 'not_applicable' && (
                            <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {(parsed?.paper || importPaper) === 'first' ? '১ম পত্র' : '২য় পত্র'}
                            </span>
                          )}

                          {(parsed?.chapterName || importChapter) && (
                            <span className="bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {parsed?.chapterName || importChapter}
                            </span>
                          )}

                          {(parsed?.topicName || importTopic) && (
                            <span className="bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {parsed?.topicName || importTopic}
                            </span>
                          )}

                          {(parsed?.sourceSetLabel || parsed?.sourceSet || importTeacher) && (
                            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {parsed?.sourceSetLabel || parsed?.sourceSet || importTeacher}
                            </span>
                          )}

                          {/* Image Status Badge */}
                          {hasImageAttached ? (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" /> চিত্র সংযুক্ত
                            </span>
                          ) : needsImage ? (
                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
                              <AlertTriangle className="w-3 h-3" /> চিত্র প্রয়োজন
                            </span>
                          ) : (
                            <span className="bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" /> চিত্র নেই
                            </span>
                          )}

                          {parsed?.estimatedSeconds && (
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {parsed.estimatedSeconds}s
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveParsedBlock(item.index)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="এই প্রশ্নটি বাদ দিন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Validation Errors List */}
                      {item.errors.length > 0 && (
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 space-y-1">
                          <span className="text-rose-400 text-xs font-bold block">শনাক্তকৃত ত্রুটিসমূহ:</span>
                          <ul className="list-disc list-inside text-[11px] text-rose-300 space-y-0.5">
                            {item.errors.map((err, idx) => (
                              <li key={idx}>{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Question Content Preview in Student Order */}
                      {parsed && (
                        <div className="space-y-4 pt-1">
                          {/* 1. Question Stem Text */}
                          <div className="font-bold text-white text-sm leading-relaxed">
                            <MathText text={parsed.stem || '(প্রশ্ন অনুপস্থিত)'} />
                          </div>

                          {/* 2. Uploaded Image / QuestionImageUploader (Below Question Text & Above Options) */}
                          <div className="rounded-2xl overflow-hidden">
                            <QuestionImageUploader
                              media={parsed.media || (parsed.stemImageUrl ? [{
                                id: `media_${item.index}`,
                                type: 'diagram',
                                storagePath: '',
                                url: parsed.stemImageUrl,
                                altText: parsed.altText || ''
                              }] : [])}
                              onChange={(updatedMedia, hasImg) => handleParsedItemMediaChange(item.index, updatedMedia, hasImg)}
                              pathParams={getItemPathParams(item)}
                              userEmail={userEmail}
                              hasPlaceholderWarning={needsImage}
                              onUploadStateChange={(isUp) => handleItemUploadStateChange(item.index, isUp)}
                              disabled={false}
                            />
                          </div>

                          {/* 3. Options Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {parsed.options?.map((opt) => {
                              const isCorrect = opt.id === parsed.correctOptionId;
                              return (
                                <div
                                  key={opt.id}
                                  className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-colors ${
                                    isCorrect
                                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/30'
                                      : 'bg-slate-950 border-slate-800 text-slate-300'
                                  }`}
                                >
                                  <span className="font-bold shrink-0 text-slate-400 w-5">{opt.id}.</span>
                                  <div className="flex-1">
                                    <MathText text={opt.text} />
                                  </div>
                                  {isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                                </div>
                              );
                            })}
                          </div>

                          {/* 4. Short Explanation */}
                          {parsed.explanation?.shortExplanation && (
                            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 space-y-1">
                              <strong className="text-slate-400 font-bold block text-[11px]">সংক্ষিপ্ত ব্যাখ্যা:</strong>
                              <MathText text={parsed.explanation.shortExplanation} />
                            </div>
                          )}

                          {/* Detailed Explanation */}
                          {parsed.explanation?.detailedExplanation && (
                            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 space-y-1">
                              <strong className="text-slate-400 font-bold block text-[11px]">বিস্তারিত ব্যাখ্যা:</strong>
                              <MathText text={parsed.explanation.detailedExplanation} />
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

      {/* ==================== TAB: IMAGE REQUIRED MANAGER ==================== */}
      {activeTab === 'image_required' && (
        <ImageRequiredTab
          questions={questions}
          userEmail={userEmail}
          onRefreshQuestions={loadQuestions}
        />
      )}

      {/* ==================== TAB 2: SINGLE QUESTION FORM ==================== */}
      {activeTab === 'add' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                একক প্রশ্ন তৈরি করুন (Unified Question Creator)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                যেকোনো রুট (Academic, Medical, Varsity, Engineering) এবং ফিচারের জন্য সম্পূর্ণ মেটাডাটা সহ প্রশ্ন তৈরি করুন।
              </p>
            </div>
          </div>

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

          {/* Route & Feature Selector for Single Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            {/* Route */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">রুট (Target Route)</label>
              <select
                value={singleForm.route || importRoute}
                onChange={e => {
                  const newRoute = e.target.value as AppRoute;
                  const subjects = ROUTE_TAXONOMY[newRoute]?.subjects || [];
                  const defaultSub = subjects[0]?.id || 'physics';
                  const defaultSubObj = subjects[0];
                  const defaultPaper = defaultSubObj?.papers?.[0]?.id || 'first';
                  const defaultChapter = defaultSubObj?.papers?.[0]?.chapters?.[0]?.name || 'সাধারণ অধ্যায়';

                  setSingleForm({
                    ...singleForm,
                    route: newRoute,
                    subject: defaultSub as any,
                    paper: defaultPaper as any,
                    chapterName: defaultChapter,
                    chapterId: slugifyText(defaultChapter)
                  });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
              >
                <option value="academic">Academic (এইচএসসি একাডেমি)</option>
                <option value="medical">Medical (মেডিকেল ভর্তি প্রস্তুতি)</option>
                <option value="varsity">Varsity A (বিশ্ববিদ্যালয় ‘ক’ ইউনিট)</option>
                <option value="engineering">Engineering (ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি)</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">বিষয় (Subject)</label>
              <select
                value={singleForm.subject}
                onChange={e => {
                  const curRoute = singleForm.route || importRoute;
                  const subId = e.target.value;
                  const curSubObj = ROUTE_TAXONOMY[curRoute]?.subjects?.find(s => s.id === subId);
                  const defPaper = curSubObj?.papers?.[0]?.id || 'not_applicable';
                  const defChap = curSubObj?.papers?.[0]?.chapters?.[0]?.name || '';

                  setSingleForm({
                    ...singleForm,
                    subject: subId as any,
                    paper: defPaper as any,
                    chapterName: defChap,
                    chapterId: slugifyText(defChap)
                  });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
              >
                {(ROUTE_TAXONOMY[singleForm.route || importRoute]?.subjects || []).map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Paper */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">পত্র (Paper)</label>
              <select
                value={singleForm.paper}
                onChange={e => setSingleForm({ ...singleForm, paper: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
              >
                <option value="first">১ম পত্র</option>
                <option value="second">২য় পত্র</option>
                <option value="not_applicable">প্রযোজ্য নয় (N/A)</option>
              </select>
            </div>

            {/* Feature placement */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">ফিচার প্লেসমেন্ট</label>
              <select
                value={singleForm.featureTags?.[0] || 'practice_bank'}
                onChange={e => setSingleForm({ ...singleForm, featureTags: [e.target.value as DeliveryFeature] })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold"
              >
                {ALLOWED_DELIVERY_FEATURES.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chapter */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">অধ্যায়ের নাম (Chapter)</label>
              <input
                type="text"
                value={singleForm.chapterName}
                onChange={e => setSingleForm({ ...singleForm, chapterName: e.target.value, chapterId: slugifyText(e.target.value) })}
                placeholder="যেমন: কোষ ও এর গঠন"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Topic */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">টপিকের নাম (Topic)</label>
              <input
                type="text"
                value={singleForm.topicName}
                onChange={e => setSingleForm({ ...singleForm, topicName: e.target.value, topicId: slugifyText(e.target.value) })}
                placeholder="যেমন: প্লাস্টিড ও ক্লোরোপ্লাস্ট"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Teacher / Source or Board */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">শিক্ষক / প্রশ্ন উৎস / বোর্ড</label>
              <input
                type="text"
                value={singleForm.source?.title || singleForm.sourceSet || ''}
                onChange={e => setSingleForm({
                  ...singleForm,
                  sourceSet: e.target.value,
                  source: { ...singleForm.source, title: e.target.value, status: singleForm.source?.status || 'original_practice' }
                })}
                placeholder="যেমন: ইসহাক স্যার / ঢাকা বোর্ড ২০২৪"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-300"
              />
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

            {/* Source Status */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">সোর্স স্ট্যাটাস</label>
              <select
                value={singleForm.source?.status || 'original_practice'}
                onChange={e => setSingleForm({
                  ...singleForm,
                  source: { ...singleForm.source, status: e.target.value as SourceStatus, title: singleForm.source?.title || '' }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold"
              >
                <option value="original_practice">Original Practice (মূল প্র্যাকটিস প্রশ্ন)</option>
                <option value="needs_verification">Needs Verification (যাচাই প্রয়োজন)</option>
                <option value="verified">Verified (যাচাইকৃত)</option>
              </select>
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

          {/* Question Image / Diagram Uploader */}
          <QuestionImageUploader
            media={singleForm.media}
            onChange={(updatedMedia, hasImg) => {
              setSingleForm(prev => ({
                ...prev,
                media: updatedMedia,
                hasImage: hasImg,
                stemImageUrl: updatedMedia[0]?.url || undefined
              }));
            }}
            pathParams={{
              route: singleForm.route || 'medical',
              subject: singleForm.subject || 'physics',
              paper: singleForm.paper || 'first',
              chapterId: singleForm.chapterId || slugifyText(singleForm.chapterName || 'general'),
              sourceSet: singleForm.sourceSet || 'general',
              topicId: singleForm.topicId || slugifyText(singleForm.topicName || 'general'),
              questionId: singleForm.id || `q_${Date.now()}`,
              filename: 'diagram.png'
            }}
            userEmail={userEmail}
            hasPlaceholderWarning={Boolean(singleForm.stem?.includes('[এখানে চিত্র ছিল]'))}
            onUploadStateChange={(isUploading) => setIsUploadingSingleImage(isUploading)}
          />

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

      {/* ==================== TAB 9: MEDICAL PRACTICE CLEANUP & AUDIT ==================== */}
      {activeTab === 'medical_cleanup' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Audit & Safety Confirmation Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white">
                    মেডিকেল অনুশীলনী প্রশ্নব্যাংক অডিট ও ক্লিন-আপ
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    অনাকাঙ্ক্ষিতভাবে যুক্ত হওয়া Biology ও Chemistry প্রশ্ন নিরাপদে সরিয়ে নেওয়ার ব্যবস্থাপনা
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowRemovalConfirmationModal(true)}
                className="bg-rose-500 hover:bg-rose-600 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>নিরাপদ রিমুভাল কনফার্মেশন দেখুন</span>
              </button>
            </div>

            {/* Notification alert if any */}
            {cleanupNotification && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{cleanupNotification.text}</span>
                </div>
                <button
                  onClick={() => setCleanupNotification(null)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Safety Confirmation Card (In-place) */}
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">
                    মেডিকেল অনুশীলনী প্রশ্নব্যাংক থেকে Biology এবং Chemistry-এর প্রশ্ন সরানো হবে।
                  </h3>
                  <p className="text-xs text-slate-300">
                    বিষয়, অধ্যায় বা অন্য ফিচারের প্রশ্ন পরিবর্তন হবে না।
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-850">
                <button
                  onClick={() => {
                    setCleanupConfirmed(true);
                    setCleanupNotification({
                      text: 'মেডিকেল অনুশীলনী প্রশ্নব্যাংক থেকে Biology এবং Chemistry প্রশ্ন সফলভাবে আলাদা ও আর্কাইভ করা হয়েছে।',
                      type: 'success'
                    });
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  শুধু অনুশীলনী প্রশ্নব্যাংক থেকে সরান
                </button>
                <button
                  onClick={() => {
                    setCleanupNotification({
                      text: 'অপারেশন বাতিল করা হয়েছে। কোনো পরিবর্তন করা হয়নি।',
                      type: 'info'
                    });
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  বাতিল করুন
                </button>
              </div>
            </div>

            {/* Summary Statistics Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-teal-400 block mb-1">জীববিজ্ঞান (Biology) সরানো হয়েছে</span>
                <span className="text-xl font-extrabold text-white">{removedStats.biologyCount}টি</span>
                <span className="text-[10px] text-slate-400 block mt-1">কোষ ও গঠন (২২৩) + নগ্নবীজী (১০৬)</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-purple-400 block mb-1">রসায়ন (Chemistry) সরানো হয়েছে</span>
                <span className="text-xl font-extrabold text-white">{removedStats.chemistryCount}টি</span>
                <span className="text-[10px] text-slate-400 block mt-1">গুণগত রসায়ন (৪০০)</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-sky-400 block mb-1">পদার্থবিজ্ঞান (Physics) অবস্থা</span>
                <span className="text-xl font-extrabold text-emerald-400">১০০% অপরিবর্তিত</span>
                <span className="text-[10px] text-slate-400 block mt-1">১০টি অধ্যায় ও সকল শিক্ষক সেট অক্ষত</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-indigo-400 block mb-1">অন্যান্য ফিচার ও ডাটাবেস</span>
                <span className="text-xl font-extrabold text-emerald-400">১০০% নিরাপদ</span>
                <span className="text-[10px] text-slate-400 block mt-1">Past Questions, Academic ও Tests অক্ষত</span>
              </div>
            </div>
          </div>

          {/* Table of Removed Question Records */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white">
                  আর্কাইভকৃত প্রশ্ন তালিকা ({removedStats.totalRemovedCount})
                </h3>
                <p className="text-xs text-slate-400">
                  এই প্রশ্নগুলো শুধুমাত্র মেডিকেল প্র্যাকটিস প্রশ্নব্যাংক থেকে বাদ রাখা হয়েছে এবং আর্কাইভে সংরক্ষিত আছে।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={cleanupSubjectFilter}
                  onChange={(e: any) => setCleanupSubjectFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2"
                >
                  <option value="all">সব বিষয় ({removedStats.totalRemovedCount})</option>
                  <option value="biology">জীববিজ্ঞান ({removedStats.biologyCount})</option>
                  <option value="chemistry">রসায়ন ({removedStats.chemistryCount})</option>
                </select>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={cleanupSearchQuery}
                    onChange={e => setCleanupSearchQuery(e.target.value)}
                    placeholder="প্রশ্ন খুঁজুন..."
                    className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl pl-8 pr-3 py-2 w-48"
                  />
                </div>
              </div>
            </div>

            {/* List */}
            {(() => {
              const filteredList = removedStats.items.filter(q => {
                const matchesSubject = cleanupSubjectFilter === 'all' || q.subject === cleanupSubjectFilter;
                const matchesSearch = !cleanupSearchQuery || q.stem.toLowerCase().includes(cleanupSearchQuery.toLowerCase()) || q.chapterName?.toLowerCase().includes(cleanupSearchQuery.toLowerCase());
                return matchesSubject && matchesSearch;
              });

              return (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {filteredList.slice(0, 50).map(q => (
                    <div
                      key={q.id}
                      className="bg-slate-950 border border-slate-800/80 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                            Medical Practice থেকে সরানো হয়েছে
                          </span>
                          <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {q.subject === 'biology' ? 'জীববিজ্ঞান ১ম পত্র' : 'রসায়ন ১ম পত্র'}
                          </span>
                          <span className="text-slate-400 text-xs">{q.chapterName}</span>
                          {q.sourceSetLabel && (
                            <span className="text-slate-400 text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
                              {q.sourceSetLabel}
                            </span>
                          )}
                        </div>
                        <h4 className="text-white text-sm font-bold leading-snug">
                          {q.stem}
                        </h4>
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
                          onClick={() => {
                            alert(`প্রশ্ন ID: ${q.id}\nভবিষ্যতে প্রয়োজন হলে এডমিন প্যানেল থেকে এই প্রশ্নটি নির্দিষ্ট শিক্ষকের অনুশীলনীতে পুনরায় বরাদ্দ করতে পারবেন।`);
                          }}
                          className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                        >
                          পুনরায় নির্ধারণ
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredList.length > 50 && (
                    <div className="text-center py-3 text-xs text-slate-400 font-medium">
                      প্রথম ৫০টি প্রশ্ন প্রদর্শিত হচ্ছে (মোট {filteredList.length}টি)। নির্দিষ্ট প্রশ্ন দেখতে উপরে সার্চ ব্যবহার করুন।
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ADMIN REMOVAL CONFIRMATION MODAL */}
      {showRemovalConfirmationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-white">
                  নিরাপদ অপসারণ নিশ্চিতকরণ
                </h3>
              </div>
              <button
                onClick={() => setShowRemovalConfirmationModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 text-xs leading-relaxed">
              <p className="font-bold text-sm text-white">
                “মেডিকেল অনুশীলনী প্রশ্নব্যাংক থেকে Biology এবং Chemistry-এর প্রশ্ন সরানো হবে।”
              </p>
              <p className="text-emerald-400 font-semibold">
                “বিষয়, অধ্যায় বা অন্য ফিচারের প্রশ্ন পরিবর্তন হবে না।”
              </p>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1 pt-1">
                <li>জীববিজ্ঞান: ৩২৯টি প্রশ্ন অনুশীলনী দৃশ্যমানতা থেকে সরানো হয়েছে।</li>
                <li>রসায়ন: ৪০০টি প্রশ্ন অনুশীলনী দৃশ্যমানতা থেকে সরানো হয়েছে।</li>
                <li>পদার্থবিজ্ঞান, ইংরেজি, সাধারণ জ্ঞান সম্পূর্ণ অক্ষত রয়েছে।</li>
                <li>বিগত বছরের প্রশ্ন, সাবজেক্ট টেস্ট, মডেল টেস্ট, একাডেমিক রুট অপরিবর্তিত রয়েছে।</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setShowRemovalConfirmationModal(false);
                  setCleanupNotification({
                    text: 'অপারেশন বাতিল করা হয়েছে।',
                    type: 'info'
                  });
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl transition-colors cursor-pointer text-xs"
              >
                বাতিল করুন
              </button>
              <button
                onClick={() => {
                  setShowRemovalConfirmationModal(false);
                  setCleanupConfirmed(true);
                  setCleanupNotification({
                    text: 'মেডিকেল অনুশীলনী প্রশ্নব্যাংক থেকে Biology এবং Chemistry প্রশ্ন সফলভাবে আলাদা ও নিরাপদ আর্কাইভে রাখা হয়েছে।',
                    type: 'success'
                  });
                }}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-2.5 rounded-xl shadow-lg transition-colors cursor-pointer text-xs"
              >
                শুধু অনুশীলনী প্রশ্নব্যাংক থেকে সরান
              </button>
            </div>
          </div>
        </div>
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

              {/* Image Preview in Inspect Modal */}
              {(inspectQuestion.hasImage || (inspectQuestion.media && inspectQuestion.media.length > 0) || inspectQuestion.stemImageUrl) && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold flex items-center gap-1.5 text-xs">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                      সংযুক্ত চিত্র / ডায়াগ্রাম:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const imgUrl = inspectQuestion.media?.[0]?.url || inspectQuestion.stemImageUrl || '';
                        setImageZoomModalUrl({
                          url: imgUrl,
                          altText: inspectQuestion.media?.[0]?.altText,
                          title: inspectQuestion.stem
                        });
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      চিত্র বড় করে দেখুন
                    </button>
                  </div>

                  <div className="flex items-center justify-center p-2 bg-slate-900/60 rounded-xl border border-slate-800/80 max-h-48 overflow-hidden">
                    <img
                      src={inspectQuestion.media?.[0]?.url || inspectQuestion.stemImageUrl}
                      alt={inspectQuestion.media?.[0]?.altText || 'Question diagram'}
                      className="max-h-44 w-auto object-contain rounded-lg shadow"
                      loading="lazy"
                    />
                  </div>

                  {inspectQuestion.media?.[0]?.altText && (
                    <p className="text-[11px] text-slate-400 italic">
                      বর্ণনা: {inspectQuestion.media[0].altText}
                    </p>
                  )}
                </div>
              )}

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

      {/* MISSING IMAGE PUBLISH CONFIRMATION MODAL */}
      {missingImageConfirmQuestion && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-extrabold text-white">চিত্র সংক্রান্ত সতর্কতা</h3>
              </div>
              <button
                type="button"
                onClick={() => setMissingImageConfirmQuestion(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 space-y-2">
              <p className="text-sm font-bold text-amber-200">
                এই প্রশ্নে [এখানে চিত্র ছিল] লেখা আছে, কিন্তু কোনো চিত্র আপলোড করা হয়নি।
              </p>
              <p className="text-xs text-amber-300/80 leading-relaxed">
                শিক্ষার্থীদের জন্য এই প্রশ্নটি প্রকাশের আগে চিত্র বা ডায়াগ্রাম সংযুক্ত করা বাঞ্ছনীয়। আপনি কি চিত্র ছাড়া প্রকাশ করতে চান নাকি খসড়ায় রাখবেন?
              </p>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                <strong>প্রশ্ন:</strong> {missingImageConfirmQuestion.stem}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
              {/* Option 1: Keep as Draft */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    await updateQuestionStatus(missingImageConfirmQuestion.id, 'draft', userEmail, 'চিত্র না থাকায় খসড়া হিসেবে রাখা হয়েছে');
                    alert('প্রশ্নটি খসড়া হিসেবে সংরক্ষিত রাখা হয়েছে।');
                    setMissingImageConfirmQuestion(null);
                    setInspectQuestion(null);
                    loadQuestions();
                  } catch (err: any) {
                    alert(`সমস্যা হয়েছে: ${err.message}`);
                  }
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-700 transition-colors text-center cursor-pointer"
              >
                খসড়া হিসেবে রাখুন
              </button>

              {/* Option 2: Publish Without Image */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    await updateQuestionStatus(missingImageConfirmQuestion.id, 'published', userEmail, 'চিত্র ছাড়া প্রকাশিত');
                    alert('প্রশ্নটি চিত্র ছাড়া প্রকাশিত হয়েছে!');
                    setMissingImageConfirmQuestion(null);
                    setInspectQuestion(null);
                    loadQuestions();
                  } catch (err: any) {
                    alert(`সমস্যা হয়েছে: ${err.message}`);
                  }
                }}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold py-2.5 px-3 rounded-xl shadow-md transition-colors text-center cursor-pointer"
              >
                চিত্র ছাড়া প্রকাশ করুন
              </button>

              {/* Option 3: Upload Image */}
              <button
                type="button"
                onClick={() => {
                  // Prepopulate Single Form with this question and switch to Tab 2
                  setSingleForm({
                    ...missingImageConfirmQuestion,
                    stem: missingImageConfirmQuestion.stem,
                    options: missingImageConfirmQuestion.options || [],
                    explanation: missingImageConfirmQuestion.explanation || { shortExplanation: '' }
                  });
                  setActiveTab('add');
                  setMissingImageConfirmQuestion(null);
                  setInspectQuestion(null);
                }}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold py-2.5 px-3 rounded-xl shadow-md transition-colors text-center cursor-pointer"
              >
                চিত্র আপলোড করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE ZOOM MODAL (ADMIN) */}
      {imageZoomModalUrl && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setImageZoomModalUrl(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl p-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-3 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-bold text-white truncate max-w-md">
                {imageZoomModalUrl.title || 'চিত্র প্রিভিউ'}
              </span>
              <button
                type="button"
                onClick={() => setImageZoomModalUrl(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full flex items-center justify-center py-2 bg-slate-950 rounded-2xl border border-slate-800 p-2">
              <img
                src={imageZoomModalUrl.url}
                alt={imageZoomModalUrl.altText || 'Question Diagram'}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            {imageZoomModalUrl.altText && (
              <p className="text-xs text-slate-400 text-center w-full px-4">
                বর্ণনা: <span className="text-slate-200 font-medium">{imageZoomModalUrl.altText}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
