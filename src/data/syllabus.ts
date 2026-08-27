import { Subject } from '../types';
import { ACADEMIC_SYLLABUS_CONFIG } from './academicSyllabusConfig';

const toBangla2Digit = (n: number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const padded = n < 10 ? `0${n}` : `${n}`;
  return padded.split('').map(d => bnDigits[parseInt(d, 10)] ?? d).join('');
};

// Generate Academic subjects dynamically from the single shared source ACADEMIC_SYLLABUS_CONFIG
const academicSubjects: Subject[] = ACADEMIC_SYLLABUS_CONFIG.map(cfg => {
  let defaultActiveChapters: number[] = [];
  if (cfg.id === 'phys1') defaultActiveChapters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  else if (cfg.id === 'bio1') defaultActiveChapters = [0, 6, 7];
  else if (cfg.id === 'bio2') defaultActiveChapters = [0];
  else if (cfg.id === 'chem1') defaultActiveChapters = [1, 2, 3];
  else if (cfg.id === 'math1') defaultActiveChapters = [8];
  else if (cfg.id === 'ict') defaultActiveChapters = [0, 1, 2, 3, 4, 5];
  else if (cfg.id === 'bangla_first') defaultActiveChapters = Array.from({ length: 26 }, (_, i) => i);

  return {
    id: cfg.id,
    name: cfg.name,
    icon: cfg.icon,
    color: cfg.color,
    category: cfg.category,
    paper: cfg.paper,
    hasSections: cfg.hasSections,
    sections: cfg.sections,
    chapters: cfg.chapters.map(ch => `${toBangla2Digit(ch.chapterNumber)}. ${ch.chapterName}`),
    activeChapters: defaultActiveChapters
  };
});

export const syllabus: Subject[] = [
  // Academic Preparation Subjects (from academicSyllabusConfig)
  ...academicSubjects,

  // Medical Subjects
  {
    id: 'english',
    name: 'ইংরেজি',
    icon: 'Languages',
    color: 'from-amber-900/50 to-slate-800',
    category: 'মেডিকেল প্রস্তুতি',
    chapters: [
      '১. Parts of Speech & Identification',
      '২. Tense & Subject-Verb Agreement',
      '৩. Voice & Narration',
      '৪. Preposition & Idioms',
      '৫. Synonym, Antonym & Vocabulary',
      '৬. Sentence Correction & Medical Context'
    ],
    activeChapters: [0, 1]
  },
  {
    id: 'gk',
    name: 'সাধারণ জ্ঞান',
    icon: 'Globe',
    color: 'from-rose-900/50 to-slate-800',
    category: 'মেডিকেল প্রস্তুতি',
    chapters: [
      '১. ইতিহাস ও মুক্তিযুদ্ধ',
      '২. বাংলাদেশ বিষয়াবলী & অর্থনীতি',
      '৩. ভৌগোলিক অবস্থান ও মানচিত্র',
      '৪. আন্তর্জাতিক বিষয়াবলী & সংস্থা',
      '৫. স্বাস্থ্য খাত ও চিকিৎসা বিষয়ক তথ্য'
    ],
    activeChapters: [0, 1]
  },

  // GST Admission Test
  {
    id: 'gst_phys',
    name: 'GST Exam - Physics',
    icon: 'Atom',
    color: 'from-sky-900/50 to-slate-800',
    category: 'GST ভর্তি পরীক্ষা',
    chapters: [
      'Exam 1', 'Exam 2', 'Exam 3'
    ],
    activeChapters: []
  },
  {
    id: 'gst_chem',
    name: 'GST Exam - Chemistry',
    icon: 'FlaskConical',
    color: 'from-purple-900/50 to-slate-800',
    category: 'GST ভর্তি পরীক্ষা',
    chapters: [
      'Exam 1', 'Exam 2', 'Exam 3'
    ],
    activeChapters: []
  },
  {
    id: 'gst_math',
    name: 'GST Exam - Higher Math',
    icon: 'Calculator',
    color: 'from-blue-900/50 to-slate-800',
    category: 'GST ভর্তি পরীক্ষা',
    chapters: [
      'Exam 1 (অন্তরীকরণ)', 'Exam 2 (বহুপদী, বিপরীত ত্রিকোণমিতি, কণিক)', 'Exam 3'
    ],
    activeChapters: [0, 1]
  },
  {
    id: 'gst_bio',
    name: 'GST Exam - Biology',
    icon: 'Dna',
    color: 'from-teal-900/50 to-slate-800',
    category: 'GST ভর্তি পরীক্ষা',
    chapters: [
      'Exam 1', 'Exam 2', 'Exam 3'
    ],
    activeChapters: []
  },

  // DCU --- ICU Unit
  {
    id: 'dcu_phys',
    name: 'পদার্থবিজ্ঞান ১ম পত্র (ICU)',
    icon: 'Atom',
    color: 'from-sky-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['অধ্যায় সমূহ', 'ভেক্টর এক্সাম', 'নিউটনিয়ান বলবিদ্যা এক্সাম', 'কাজ ক্ষমতা শক্তি এক্সাম', 'মহাকর্ষ ও অভিকর্ষ এক্সাম', 'পদার্থের গাঠনিক ধর্ম এক্সাম', 'পর্যায়বৃত্ত গতি এক্সাম', 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব এক্সাম'],
    activeChapters: [0, 1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 'dcu_phys2',
    name: 'পদার্থবিজ্ঞান ২য় পত্র (ICU)',
    icon: 'Zap',
    color: 'from-cyan-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['১. তাপগতিবিদ্যা এক্সাম', '২. স্থির তড়িৎ এক্সাম', '৩. চল তড়িৎ এক্সাম'],
    activeChapters: [0, 1, 2]
  },
  {
    id: 'dcu_chem1',
    name: 'রসায়ন ১ম পত্র (ICU)',
    icon: 'FlaskConical',
    color: 'from-purple-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['গুণগত রসায়ন এক্সাম', 'মৌলের পর্যাবৃত্ত ধর্ম এক্সাম'],
    activeChapters: [0, 1]
  },
  {
    id: 'dcu_chem2',
    name: 'রসায়ন ২য় পত্র (ICU)',
    icon: 'Beaker',
    color: 'from-fuchsia-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['পরিবেশ রসায়ন এক্সাম'],
    activeChapters: [0]
  },
  {
    id: 'dcu_math',
    name: 'উচ্চতর গণিত (ICU)',
    icon: 'Calculator',
    color: 'from-blue-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['সরলরেখা', 'Math Exam 1', 'Exam 3 (বৃত্ত + কণিক)'],
    activeChapters: [0, 1, 2]
  },
  {
    id: 'dcu_bio',
    name: 'জীববিজ্ঞান (ICU)',
    icon: 'Dna',
    color: 'from-teal-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['অধ্যায় সমূহ'],
    activeChapters: []
  }
];

export const MEDICAL_SUBJECT_IDS = ['bio1', 'bio2', 'chem1', 'chem2', 'phys1', 'phys2', 'english', 'gk'];

export function getMedicalSubjects(): Subject[] {
  return syllabus.filter(s => MEDICAL_SUBJECT_IDS.includes(s.id));
}

