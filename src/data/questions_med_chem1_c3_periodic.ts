import { QuestionItem } from '../types/questionBank';
import { chem1Chap3HazariPart1, ChemQuestionData } from './med_chem1_c3_hazari_part1';
import { chem1Chap3HazariPart2 } from './med_chem1_c3_hazari_part2';
import { chem1Chap3HazariPart3 } from './med_chem1_c3_hazari_part3';
import { chem1Chap3HazariPart4 } from './med_chem1_c3_hazari_part4';
import { chem1Chap3KabirPart1 } from './med_chem1_c3_kabir_part1';
import { chem1Chap3KabirPart2 } from './med_chem1_c3_kabir_part2';
import { chem1Chap3KabirPart3 } from './med_chem1_c3_kabir_part3';
import { chem1Chap3KabirPart4 } from './med_chem1_c3_kabir_part4';
import { chem1Chap3GuhaPart1 } from './med_chem1_c3_guha_part1';
import { chem1Chap3GuhaPart2 } from './med_chem1_c3_guha_part2';
import { chem1Chap3GuhaPart3 } from './med_chem1_c3_guha_part3';
import { chem1Chap3GuhaPart4 } from './med_chem1_c3_guha_part4';
import { chem1Chap3LincolnPart1 } from './med_chem1_c3_lincoln_part1';
import { chem1Chap3LincolnPart2 } from './med_chem1_c3_lincoln_part2';

export type { ChemQuestionData };

export const medChem1Chap3HazariRawQuestions: ChemQuestionData[] = [
  ...chem1Chap3HazariPart1,
  ...chem1Chap3HazariPart2,
  ...chem1Chap3HazariPart3,
  ...chem1Chap3HazariPart4
];

export const medChem1Chap3KabirRawQuestions: ChemQuestionData[] = [
  ...chem1Chap3KabirPart1,
  ...chem1Chap3KabirPart2,
  ...chem1Chap3KabirPart3,
  ...chem1Chap3KabirPart4
];

export const medChem1Chap3GuhaRawQuestions: ChemQuestionData[] = [
  ...chem1Chap3GuhaPart1,
  ...chem1Chap3GuhaPart2,
  ...chem1Chap3GuhaPart3,
  ...chem1Chap3GuhaPart4
];

export const medChem1Chap3LincolnRawQuestions: ChemQuestionData[] = [
  ...chem1Chap3LincolnPart1,
  ...chem1Chap3LincolnPart2
];

const hazariQuestionItems: QuestionItem[] = medChem1Chap3HazariRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c3_hazari_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c3',
    chapterName: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
    topicName: q.topic,
    sourceSet: 'hazari',
    sourceSetLabel: 'হাজারী স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'হাজারী স্যার মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন পাঠ্যবই সমাধান',
      detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: 'হাজারী স্যার'
    },
    featureTags: ['practice_bank'],
    tags: ['medical', 'chemistry', 'chem1', 'chem1_c3', 'hazari', 'practice_bank'],
    status: 'published',
    createdBy: 'system'
  };
});

const kabirQuestionItems: QuestionItem[] = medChem1Chap3KabirRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c3_kabir_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c3',
    chapterName: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
    topicName: q.topic,
    sourceSet: 'kabir',
    sourceSetLabel: 'কবীর স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'কবীর স্যার মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন পাঠ্যবই সমাধান',
      detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: 'কবীর স্যার'
    },
    featureTags: ['practice_bank'],
    tags: ['medical', 'chemistry', 'chem1', 'chem1_c3', 'kabir', 'practice_bank'],
    status: 'published',
    createdBy: 'system'
  };
});

const guhaQuestionItems: QuestionItem[] = medChem1Chap3GuhaRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c3_guha_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c3',
    chapterName: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
    topicName: q.topic,
    sourceSet: 'guha',
    sourceSetLabel: 'গুহ স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'গুহ স্যার মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন পাঠ্যবই সমাধান',
      detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: 'গুহ স্যার'
    },
    featureTags: ['practice_bank'],
    tags: ['medical', 'chemistry', 'chem1', 'chem1_c3', 'guha', 'practice_bank'],
    status: 'published',
    createdBy: 'system'
  };
});

const lincolnQuestionItems: QuestionItem[] = medChem1Chap3LincolnRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c3_lincoln_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c3',
    chapterName: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
    topicName: q.topic,
    sourceSet: 'lincoln',
    sourceSetLabel: 'লিংকন স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'লিংকন স্যার মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন পাঠ্যবই সমাধান',
      detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: 'লিংকন স্যার'
    },
    featureTags: ['practice_bank'],
    tags: ['medical', 'chemistry', 'chem1', 'chem1_c3', 'lincoln', 'practice_bank'],
    status: 'published',
    createdBy: 'system'
  };
});

export const medChem1Chap3PeriodicQuestions: QuestionItem[] = [
  ...hazariQuestionItems,
  ...kabirQuestionItems,
  ...guhaQuestionItems,
  ...lincolnQuestionItems
];



