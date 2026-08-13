import { phy1Chap4RawQuestions } from './questions_phy1_chap4_newtonian';
import { phy1Chap6RawQuestions } from './questions_phy1_chap6_gravity';

export interface Module1Question {
  id: number | string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  author: 'ইসহাক স্যার' | 'তপন স্যার' | 'তোফাজ্জল স্যার';
  chapterId: string;
  ref?: string;
}

// Module 1 teacher-set question pools
export const module1TeacherSetData: Record<string, Module1Question[]> = {
  phys1_chap4: phy1Chap4RawQuestions.map(q => ({
    id: q.id,
    question_text: q.question_text,
    options: q.options,
    correct_answer: q.correct_answer,
    explanation: q.explanation || '',
    author: q.author,
    chapterId: 'phys1_chap4',
    ref: q.ref
  })),
  phys1_chap6: phy1Chap6RawQuestions.map(q => ({
    id: q.id,
    question_text: q.question_text,
    options: q.options,
    correct_answer: q.correct_answer,
    explanation: q.explanation || '',
    author: q.author,
    chapterId: 'phys1_chap6',
    ref: q.ref
  }))
};
