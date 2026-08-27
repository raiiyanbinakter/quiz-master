import { QuestionItem } from '../types/questionBank';
import { chem1Chap4HazariPart1, ChemQuestionData } from './med_chem1_c4_hazari_part1';
import { chem1Chap4HazariPart2 } from './med_chem1_c4_hazari_part2';
import { chem1Chap4HazariPart3 } from './med_chem1_c4_hazari_part3';
import { chem1Chap4HazariPart4 } from './med_chem1_c4_hazari_part4';

export type { ChemQuestionData };

export const medChem1Chap4HazariRawQuestions: ChemQuestionData[] = [
  ...chem1Chap4HazariPart1,
  ...chem1Chap4HazariPart2,
  ...chem1Chap4HazariPart3,
  ...chem1Chap4HazariPart4
];

const hazariQuestionItems: QuestionItem[] = medChem1Chap4HazariRawQuestions.map((q) => {
  const options = (q.options || []).map((optText, oIdx) => ({
    id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
    text: optText
  }));

  const correctIdx = q.options.indexOf(q.correct_answer);
  const correctOptionId = correctIdx >= 0 ? ['A', 'B', 'C', 'D'][correctIdx] : 'A';

  return {
    id: `seed_med_chem1_c4_hazari_${q.id}`,
    version: 1,
    route: 'medical',
    subject: 'chemistry',
    subjectId: 'chem1',
    paper: 'first',
    chapterId: 'chem1_c4',
    chapterName: 'রাসায়নিক পরিবর্তন',
    topicName: q.topic,
    sourceSet: 'hazari',
    sourceSetLabel: 'হাজারী স্যার',
    questionType: 'single_choice',
    stem: q.question_text,
    options,
    correctOptionId,
    explanation: {
      shortExplanation: q.explanation || 'হাজারী স্যার রাসায়নিক পরিবর্তন পাঠ্যবই সমাধান',
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
    tags: ['medical', 'chemistry', 'chem1', 'chem1_c4', 'hazari', 'practice_bank'],
    status: 'published',
    createdBy: 'system'
  };
});

export const medChem1Chap4ChemicalChangeQuestions: QuestionItem[] = [
  ...hazariQuestionItems
];
