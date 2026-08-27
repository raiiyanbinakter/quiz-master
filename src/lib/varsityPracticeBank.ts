import { ROUTE_TAXONOMY, SubjectTaxonomy } from '../data/routeTaxonomy';
import { Question } from '../types';

export type VarsityUniversityKey = 'du' | 'gst' | 'ru' | 'ju' | 'cu' | 'agri';
export type VarsitySubjectKey = 'physics' | 'chemistry' | 'higher_math' | 'biology' | 'bangla_first' | 'bangla_second' | 'ict' | 'english' | 'bangla' | 'general_knowledge';

export interface VarsityUniversity {
  key: VarsityUniversityKey;
  name: string;
  shortName: string;
  badge: string;
  units: VarsityUnit[];
}

export interface VarsityUnit {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  targetGroup: 'science' | 'arts' | 'commerce' | 'general';
  applicableSubjects: VarsitySubjectKey[];
}

export interface VarsitySubjectConfig {
  key: VarsitySubjectKey;
  name: string;
  nameEn: string;
  hasPapers: boolean;
  fixedPaper?: 'first' | 'second' | 'not_applicable';
  color: string;
  bgLight: string;
  borderColor: string;
}

export interface VarsityChapterInfo {
  chapterId: string;
  chapterNumberLabel: string;
  chapterName: string;
  topics: string[];
  publishedQuestionCount: number;
  questions?: Question[];
}

export const VARSITY_UNIVERSITIES: VarsityUniversity[] = [
  {
    key: 'du',
    name: 'ঢাকা বিশ্ববিদ্যালয় (DU)',
    shortName: 'ঢাবি',
    badge: 'শীর্ষ বিশ্ববিদ্যালয়',
    units: [
      {
        id: 'du_ka',
        name: 'ক ইউনিট (বিজ্ঞান অনুষদ)',
        nameEn: 'KA Unit (Science)',
        description: 'পদার্থবিজ্ঞান, রসায়ন, গণিত, জীববিজ্ঞান ও আইসিটি ভিত্তিক পূর্ণাঙ্গ ভর্তি প্রস্তুতি।',
        targetGroup: 'science',
        applicableSubjects: ['physics', 'chemistry', 'higher_math', 'biology', 'ict', 'english', 'bangla_first']
      },
      {
        id: 'du_kha',
        name: 'খ ইউনিট (কলা, আইন ও সামাজিক বিজ্ঞান)',
        nameEn: 'KHA Unit (Arts)',
        description: 'বাংলা, ইংরেজি ও সাধারণ জ্ঞান ভিত্তিক প্রস্তুতি।',
        targetGroup: 'arts',
        applicableSubjects: ['bangla_first', 'bangla_second', 'english', 'general_knowledge']
      },
      {
        id: 'du_ga',
        name: 'গ ইউনিট (ব্যবসায় শিক্ষা অনুষদ)',
        nameEn: 'GA Unit (Business)',
        description: 'ব্যবসায় শিক্ষা, হিসাববিজ্ঞান ও সাধারণ জ্ঞান প্রস্তুতি।',
        targetGroup: 'commerce',
        applicableSubjects: ['bangla_first', 'bangla_second', 'english', 'general_knowledge']
      }
    ]
  },
  {
    key: 'gst',
    name: 'গুচ্ছভুক্ত বিশ্ববিদ্যালয়সমূহ (GST)',
    shortName: 'গুচ্ছ',
    badge: '২৪ বিশ্ববিদ্যালয় সমন্বিত',
    units: [
      {
        id: 'gst_a',
        name: 'A ইউনিট (বিজ্ঞান)',
        nameEn: 'A Unit (Science)',
        description: 'পদার্থবিজ্ঞান, রসায়ন, গণিত ও জীববিজ্ঞান সহ সাধারণ বিজ্ঞান প্রস্তুতি।',
        targetGroup: 'science',
        applicableSubjects: ['physics', 'chemistry', 'higher_math', 'biology', 'english', 'bangla_first', 'ict']
      },
      {
        id: 'gst_b',
        name: 'B ইউনিট (মানবিক)',
        nameEn: 'B Unit (Humanities)',
        description: 'বাংলা, ইংরেজি ও সাধারণ জ্ঞান প্রস্তুতি।',
        targetGroup: 'arts',
        applicableSubjects: ['bangla_first', 'bangla_second', 'english', 'general_knowledge']
      },
      {
        id: 'gst_c',
        name: 'C ইউনিট (বাণিজ্য)',
        nameEn: 'C Unit (Commerce)',
        description: 'ব্যবসায় শিক্ষা ও সাধারণ জ্ঞান প্রস্তুতি।',
        targetGroup: 'commerce',
        applicableSubjects: ['bangla_first', 'bangla_second', 'english', 'general_knowledge']
      }
    ]
  },
  {
    key: 'ru',
    name: 'রাজশাহী বিশ্ববিদ্যালয় (RU)',
    shortName: 'রাবি',
    badge: 'বিজ্ঞান ও প্রকৌশল',
    units: [
      {
        id: 'ru_c',
        name: 'C ইউনিট (বিজ্ঞান অনুষদ)',
        nameEn: 'C Unit (Science)',
        description: 'পদার্থবিজ্ঞান, রসায়ন, গণিত ও জীববিজ্ঞানের বিশেষায়িত প্রস্তুতি।',
        targetGroup: 'science',
        applicableSubjects: ['physics', 'chemistry', 'higher_math', 'biology', 'ict']
      },
      {
        id: 'ru_a',
        name: 'A ইউনিট (মানবিক ও কলা)',
        nameEn: 'A Unit (Arts)',
        description: 'বাংলা, ইংরেজি ও সাধারণ জ্ঞান প্রস্তুতি।',
        targetGroup: 'arts',
        applicableSubjects: ['bangla_first', 'bangla_second', 'english', 'general_knowledge']
      }
    ]
  },
  {
    key: 'ju',
    name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় (JU)',
    shortName: 'জাবি',
    badge: 'বিশেষায়িত ইউনিট',
    units: [
      {
        id: 'ju_a',
        name: 'A ইউনিট (গাণিতিক ও পদার্থবিজ্ঞান)',
        nameEn: 'A Unit (Math & Physical Science)',
        description: 'উচ্চতর গণিত, পদার্থবিজ্ঞান ও রসায়নের গভীর সমাধান।',
        targetGroup: 'science',
        applicableSubjects: ['higher_math', 'physics', 'chemistry', 'ict']
      },
      {
        id: 'ju_d',
        name: 'D ইউনিট (জীববিজ্ঞান অনুষদ)',
        nameEn: 'D Unit (Biological Science)',
        description: 'উদ্ভিদবিজ্ঞান, প্রাণিবিজ্ঞান ও রসায়নের সমৃদ্ধ প্রশ্ন সমাধান।',
        targetGroup: 'science',
        applicableSubjects: ['biology', 'chemistry', 'bangla_first', 'english']
      }
    ]
  },
  {
    key: 'cu',
    name: 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)',
    shortName: 'চবি',
    badge: 'বিজ্ঞান অনুষদ',
    units: [
      {
        id: 'cu_a',
        name: 'A ইউনিট (বিজ্ঞান অনুষদ)',
        nameEn: 'A Unit (Science)',
        description: 'পদার্থবিজ্ঞান, রসায়ন, গণিত ও জীববিজ্ঞানের ধারাবাহিক প্রস্তুতি।',
        targetGroup: 'science',
        applicableSubjects: ['physics', 'chemistry', 'higher_math', 'biology', 'english']
      }
    ]
  },
  {
    key: 'agri',
    name: 'কৃষি গুচ্ছ বিশ্ববিদ্যালয়সমূহ',
    shortName: 'কৃষি গুচ্ছ',
    badge: '৯টি কৃষি বিশ্ববিদ্যালয়',
    units: [
      {
        id: 'agri_science',
        name: 'বিজ্ঞান ইউনিট (কৃষি গুচ্ছ)',
        nameEn: 'Agri Science Unit',
        description: 'উদ্ভিদবিজ্ঞান, প্রাণিবিজ্ঞান, রসায়ন, পদার্থবিজ্ঞান ও গণিত প্রস্তুতি।',
        targetGroup: 'science',
        applicableSubjects: ['biology', 'chemistry', 'physics', 'higher_math', 'english']
      }
    ]
  }
];

// EXACT 7 SUBJECTS FOR MODULE 3 (বিষয়ভিত্তিক প্রস্তুতি)
export const VARSITY_SUBJECT_PREPARATION_SUBJECTS: VarsitySubjectConfig[] = [
  {
    key: 'physics',
    name: 'পদার্থবিজ্ঞান',
    nameEn: 'Physics',
    hasPapers: true,
    color: 'text-cyan-400',
    bgLight: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30'
  },
  {
    key: 'chemistry',
    name: 'রসায়ন',
    nameEn: 'Chemistry',
    hasPapers: true,
    color: 'text-emerald-400',
    bgLight: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  },
  {
    key: 'biology',
    name: 'জীববিজ্ঞান',
    nameEn: 'Biology',
    hasPapers: true,
    color: 'text-rose-400',
    bgLight: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30'
  },
  {
    key: 'higher_math',
    name: 'উচ্চতর গণিত',
    nameEn: 'Higher Math',
    hasPapers: true,
    color: 'text-indigo-400',
    bgLight: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30'
  },
  {
    key: 'bangla_first',
    name: 'বাংলা ১ম পত্র',
    nameEn: 'Bangla 1st Paper',
    hasPapers: false,
    fixedPaper: 'first',
    color: 'text-amber-400',
    bgLight: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30'
  },
  {
    key: 'bangla_second',
    name: 'বাংলা ২য় পত্র',
    nameEn: 'Bangla 2nd Paper',
    hasPapers: false,
    fixedPaper: 'second',
    color: 'text-teal-400',
    bgLight: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30'
  },
  {
    key: 'ict',
    name: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    nameEn: 'ICT',
    hasPapers: false,
    fixedPaper: 'not_applicable',
    color: 'text-sky-400',
    bgLight: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30'
  }
];

export const VARSITY_SUBJECTS: VarsitySubjectConfig[] = VARSITY_SUBJECT_PREPARATION_SUBJECTS;

export function toBanglaNumber(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
}

/**
 * Extract varsity chapters from ROUTE_TAXONOMY for a given subject & paper
 */
export function getVarsityChaptersForSubject(
  subjectKey: VarsitySubjectKey,
  paper: 'first' | 'second' | 'not_applicable',
  publishedQuestions: any[] = []
): VarsityChapterInfo[] {
  const varsityTaxonomy = ROUTE_TAXONOMY.varsity.subjects;
  const subTax = varsityTaxonomy.find((s: SubjectTaxonomy) => s.id === subjectKey);
  if (!subTax) return [];

  const paperObj = subTax.papers.find((p) => p.id === paper) || subTax.papers[0];
  if (!paperObj) return [];

  return paperObj.chapters.map((ch, idx) => {
    // Extract actual chapter number from ch.id or ch.name
    const matchNum = ch.id.match(/_ch(\d+)/i) || ch.name.match(/অধ্যায়\s*(\d+|[০-৯]+)/i);
    const chapterNumStr = matchNum ? toBanglaNumber(matchNum[1]) : toBanglaNumber(idx + 1);
    const chapterNumberLabel = `অধ্যায় ${chapterNumStr}`;

    // Clean title: remove "অধ্যায় ৮: " prefix if present so title is clean
    const cleanChapterName = ch.name.replace(/^অধ্যায়\s*[\d০-৯]+[:\s-]*/i, '').trim() || ch.name;

    // Count published varsity questions matching this subject and chapter
    const matchingQuestions = publishedQuestions.filter((q) => {
      if (q.route && q.route !== 'varsity') return false;
      const qSub = (q.subject || q.subjectId || '').toLowerCase();
      const sKey = subjectKey.toLowerCase();
      if (!qSub.includes(sKey) && !sKey.includes(qSub)) return false;
      if (q.paper && paper !== 'not_applicable' && q.paper !== paper) return false;

      if (q.chapterId && q.chapterId === ch.id) return true;

      const qChap = (q.chapter || q.chapterName || '').toLowerCase().replace(/[\s\p{P}]/gu, '');
      const normCh = ch.name.toLowerCase().replace(/[\s\p{P}]/gu, '');
      const normClean = cleanChapterName.toLowerCase().replace(/[\s\p{P}]/gu, '');

      return (
        qChap.includes(normCh) ||
        normCh.includes(qChap) ||
        qChap.includes(normClean) ||
        normClean.includes(qChap) ||
        ((ch.id === 'bio1_ch8' || ch.id === 'var_bio1_ch8') && (qChap.includes('টিস্যু') || (q.chapter || '').includes('টিস্যু')))
      );
    });

    return {
      chapterId: ch.id,
      chapterNumberLabel,
      chapterName: cleanChapterName,
      topics: ch.topics || [],
      publishedQuestionCount: matchingQuestions.length,
      questions: matchingQuestions
    };
  });
}
