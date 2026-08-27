import { QuestionItem } from '../types/questionBank';
import { chem1Chap2HazariPart1, ChemQuestionData } from './med_chem1_c2_hazari_part1';
import { chem1Chap2HazariPart2 } from './med_chem1_c2_hazari_part2';
import { chem1Chap2HazariPart3 } from './med_chem1_c2_hazari_part3';
import { chem1Chap2HazariPart4 } from './med_chem1_c2_hazari_part4';
import { chem1Chap2KabirPart1 } from './med_chem1_c2_kabir_part1';
import { chem1Chap2KabirPart2 } from './med_chem1_c2_kabir_part2';
import { chem1Chap2KabirPart3 } from './med_chem1_c2_kabir_part3';
import { chem1Chap2GuhaPart1 } from './med_chem1_c2_guha_part1';
import { chem1Chap2GuhaPart2 } from './med_chem1_c2_guha_part2';
import { chem1Chap2GuhaPart3 } from './med_chem1_c2_guha_part3';
import { chem1Chap2Lincoln } from './med_chem1_c2_lincoln';

export type { ChemQuestionData };

export const medChem1Chap2HazariRawQuestions: ChemQuestionData[] = [
  ...chem1Chap2HazariPart1,
  ...chem1Chap2HazariPart2,
  ...chem1Chap2HazariPart3,
  ...chem1Chap2HazariPart4
];

export const medChem1Chap2KabirRawQuestions: ChemQuestionData[] = [
  ...chem1Chap2KabirPart1,
  ...chem1Chap2KabirPart2,
  ...chem1Chap2KabirPart3
];

export const medChem1Chap2GuhaRawQuestions: ChemQuestionData[] = [
  ...chem1Chap2GuhaPart1,
  ...chem1Chap2GuhaPart2,
  ...chem1Chap2GuhaPart3
];

export const medChem1Chap2LincolnRawQuestions: ChemQuestionData[] = [
  ...chem1Chap2Lincoln
];

const hazariQuestionItems: QuestionItem[] = medChem1Chap2HazariRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c2_hazari_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c2',
    chapterName: 'গুণগত রসায়ন',
    topicName: q.topic,
    sourceSet: 'hazari',
    sourceSetLabel: 'হাজারী স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'হাজারী স্যার গুণগত রসায়ন সমাধান',
      detailedExplanation: q.ref ? `উৎস: ${q.ref}` : undefined
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: 'হাজারী স্যার'
    },
    featureTags: ['practice_bank'],
    tags: ['medical', 'chemistry', 'practice_bank', 'hazari', 'chem1_c2'],
    status: 'published',
    createdBy: 'system'
  };
});

const kabirQuestionItems: QuestionItem[] = medChem1Chap2KabirRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c2_kabir_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c2',
    chapterName: 'গুণগত রসায়ন',
    topicName: q.topic,
    sourceSet: 'kabir',
    sourceSetLabel: 'কবীর স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'কবীর স্যার গুণগত রসায়ন সমাধান',
      detailedExplanation: q.ref ? `উৎস: ${q.ref}` : undefined
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: 'কবীর স্যার'
    },
    featureTags: ['practice_bank'],
    tags: ['medical', 'chemistry', 'practice_bank', 'kabir', 'chem1_c2'],
    status: 'published',
    createdBy: 'system'
  };
});

const guhaQuestionItems: QuestionItem[] = medChem1Chap2GuhaRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c2_guha_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c2',
    chapterName: 'গুণগত রসায়ন',
    topicName: q.topic,
    sourceSet: 'guha',
    sourceSetLabel: 'গুহ স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'গুহ স্যার গুণগত রসায়ন সমাধান',
      detailedExplanation: q.ref ? `উৎস: ${q.ref}` : undefined
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: 'গুহ স্যার'
    },
    featureTags: ['practice_bank'],
    tags: ['medical', 'chemistry', 'practice_bank', 'guha', 'chem1_c2'],
    status: 'published',
    createdBy: 'system'
  };
});

const lincolnQuestionItems: QuestionItem[] = medChem1Chap2LincolnRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c2_lincoln_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c2',
    chapterName: 'গুণগত রসায়ন',
    topicName: q.topic,
    sourceSet: 'lincoln',
    sourceSetLabel: 'লিংকন স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'লিংকন স্যার গুণগত রসায়ন সমাধান',
      detailedExplanation: q.ref ? `উৎস: ${q.ref}` : undefined
    },
    estimatedSeconds: 45,
    difficulty: 'standard',
    language: 'bn',
    source: {
      status: 'original_practice',
      title: 'লিংকন স্যার'
    },
    featureTags: ['practice_bank'],
    tags: ['medical', 'chemistry', 'practice_bank', 'lincoln', 'chem1_c2'],
    status: 'published',
    createdBy: 'system'
  };
});

export const medChem1Chap2QualitativeQuestions: QuestionItem[] = [
  ...hazariQuestionItems,
  ...kabirQuestionItems,
  ...guhaQuestionItems,
  ...lincolnQuestionItems
];
