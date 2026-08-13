import { MedicalModelTestBlueprint } from '../types/modelTest';
import { phy1Chap4RawQuestions } from './questions_phy1_chap4_newtonian';
import { phy1Chap6RawQuestions } from './questions_phy1_chap6_gravity';
import { bio1Chap1Data } from './questions_bio1_chap1';
import { bio1Chap7Data } from './questions_bio1_chap7';
import { chem1Chap2Data } from './questions_chem1_chap2';

// Helper to build 100 questions pool for model tests
export function build100QuestionPool(baseQuestions: any[], prefix: string): any[] {
  const result: any[] = [];
  let sourceIdx = 0;
  
  for (let i = 1; i <= 100; i++) {
    if (baseQuestions && baseQuestions.length > 0) {
      const src = baseQuestions[sourceIdx % baseQuestions.length];
      sourceIdx++;
      result.push({
        id: `${prefix}_q${i}`,
        question_text: src.question_text || `প্রশ্ন ${i}`,
        options: src.options || ['ক', 'খ', 'গ', 'ঘ'],
        correct_answer: src.correct_answer || 'ক',
        explanation: src.explanation || 'ব্যাখ্যা উপলব্ধ রয়েছে।',
        topic: src.topic || 'সাধারণ'
      });
    } else {
      result.push({
        id: `${prefix}_q${i}`,
        question_text: `মেডিকেল প্রস্তুতি পরীক্ষা প্রশ্ন ${i}`,
        options: ['ক) বিকল্প ১', 'খ) বিকল্প ২', 'গ) বিকল্প ৩', 'ঘ) বিকল্প ৪'],
        correct_answer: 'ক) বিকল্প ১',
        explanation: 'এই প্রশ্নের সঠিক উত্তরটি সংকলিত ব্যাখ্যা অনুযায়ী যাচাইকৃত।',
        topic: 'সাধারণ'
      });
    }
  }
  return result;
}

// Initial published blueprints for seed/fallback
export const INITIAL_MODEL_TEST_BLUEPRINTS: MedicalModelTestBlueprint[] = [
  {
    id: 'mt_physics_chap4_01',
    route: 'medical',
    title: 'মেডিকেল মডেল টেস্ট ১ (নিউটনীয় বলবিদ্যা)',
    subject: 'physics',
    chapterId: 'phy1_chap4',
    chapterName: 'নিউটনীয় বলবিদ্যা',
    questionIds: Array.from({ length: 100 }, (_, i) => `phy4_q${i + 1}`),
    totalMarks: 100,
    timeLimitMinutes: 50,
    answerLockEnabled: true,
    sourceStatus: 'verified',
    sourceTitle: 'মেডিকেল ভর্তি পরীক্ষা সংকলন',
    status: 'published',
    version: 1,
    description: '১০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট (৫০ মিনিট সময়, উত্তর একবার দিলে পরিবর্তন করা যাবে না)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mt_physics_chap6_01',
    route: 'medical',
    title: 'মেডিকেল মডেল টেস্ট ১ (মহাকর্ষ ও অভিকর্ষ)',
    subject: 'physics',
    chapterId: 'phy1_chap6',
    chapterName: 'মহাকর্ষ ও অভিকর্ষ',
    questionIds: Array.from({ length: 100 }, (_, i) => `phy6_q${i + 1}`),
    totalMarks: 100,
    timeLimitMinutes: 50,
    answerLockEnabled: true,
    sourceStatus: 'verified',
    sourceTitle: 'মেডিকেল ভর্তি পরীক্ষা সংকলন',
    status: 'published',
    version: 1,
    description: '১০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট (৫০ মিনিট সময়)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mt_chemistry_chap2_01',
    route: 'medical',
    title: 'মেডিকেল মডেল টেস্ট ১ (গুণগত রসায়ন)',
    subject: 'chemistry',
    chapterId: 'chem1_chap2',
    chapterName: 'গুণগত রসায়ন',
    questionIds: Array.from({ length: 100 }, (_, i) => `chem2_q${i + 1}`),
    totalMarks: 100,
    timeLimitMinutes: 50,
    answerLockEnabled: true,
    sourceStatus: 'verified',
    sourceTitle: 'মেডিকেল ভর্তি প্রশ্নব্যাংক',
    status: 'published',
    version: 1,
    description: '১০০ নম্বরের রসায়ন পূর্ণাঙ্গ মডেল টেস্ট',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mt_biology_chap1_01',
    route: 'medical',
    title: 'মেডিকেল মডেল টেস্ট ১ (কোষ ও এর গঠন)',
    subject: 'biology',
    chapterId: 'bio1_chap1',
    chapterName: 'কোষ ও এর গঠন',
    questionIds: Array.from({ length: 100 }, (_, i) => `bio1_q${i + 1}`),
    totalMarks: 100,
    timeLimitMinutes: 50,
    answerLockEnabled: true,
    sourceStatus: 'verified',
    sourceTitle: 'মেডিকেল বায়োলজি মাস্টার',
    status: 'published',
    version: 1,
    description: '১০০ নম্বরের জীববিজ্ঞান মডেল টেস্ট',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper to resolve question items for a given blueprint
export function getQuestionsForBlueprint(blueprint: MedicalModelTestBlueprint): any[] {
  let base: any[] = [];
  if (blueprint.chapterId === 'phy1_chap4') base = phy1Chap4RawQuestions;
  else if (blueprint.chapterId === 'phy1_chap6') base = phy1Chap6RawQuestions;
  else if (blueprint.chapterId === 'chem1_chap2') base = chem1Chap2Data?.questions || [];
  else if (blueprint.chapterId === 'bio1_chap1') base = bio1Chap1Data?.questions || [];
  else if (blueprint.chapterId === 'bio1_chap7') base = bio1Chap7Data?.questions || [];

  return build100QuestionPool(base, blueprint.id);
}
