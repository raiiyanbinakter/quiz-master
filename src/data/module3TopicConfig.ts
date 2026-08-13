import { phy1Chap4RawQuestions } from './questions_phy1_chap4_newtonian';
import { phy1Chap6RawQuestions } from './questions_phy1_chap6_gravity';

export interface Module3Topic {
  id: string;
  name: string;
  count: number;
}

export interface Module3Chapter {
  id: string;
  number: number;
  title: string;
  paper: 'first' | 'second';
  subject: string;
  totalQuestions: number;
  topics: Module3Topic[];
}

export const MODULE_3_CHAPTERS: Module3Chapter[] = [
  {
    id: 'phy1_chap4',
    number: 4,
    title: 'নিউটনীয় বলবিদ্যা',
    paper: 'first',
    subject: 'physics',
    totalQuestions: 120,
    topics: [
      { id: 'chap4_t1', name: 'বল ও বলের প্রকারভেদ', count: 14 },
      { id: 'chap4_t2', name: 'নিউটনের গতিসূত্র', count: 13 },
      { id: 'chap4_t3', name: 'নিউটনের গতিসূত্রের ব্যবহার', count: 6 },
      { id: 'chap4_t4', name: 'রৈখিক ভরবেগের নিত্যতা', count: 7 },
      { id: 'chap4_t5', name: 'জড়তার ভ্রামক ও কৌণিক ভরবেগ', count: 26 },
      { id: 'chap4_t6', name: 'টর্ক ও জড়তার ভ্রামকের উপপাদ্য', count: 3 },
      { id: 'chap4_t7', name: 'নিউটনীয় বলবিদ্যা', count: 5 },
      { id: 'chap4_t8', name: 'সংঘর্ষ এবং কেন্দ্রমুখী/কেন্দ্রবিমুখী বল', count: 16 },
      { id: 'chap4_t9', name: 'Practice', count: 30 }
    ]
  },
  {
    id: 'phy1_chap6',
    number: 6,
    title: 'মহাকর্ষ ও অভিকর্ষ',
    paper: 'first',
    subject: 'physics',
    totalQuestions: 103,
    topics: [
      { id: 'chap6_t1', name: 'গ্যালিলিও ও কেপলারের সূত্র', count: 11 },
      { id: 'chap6_t2', name: 'মহাকর্ষ', count: 12 },
      { id: 'chap6_t3', name: 'অভিকর্ষজ ত্বরণ', count: 23 },
      { id: 'chap6_t4', name: 'মহাকর্ষীয় ক্ষেত্র ও মহাকর্ষীয় ক্ষেত্রের প্রাবল্য', count: 10 },
      { id: 'chap6_t5', name: 'অভিকর্ষ কেন্দ্র ও মুক্তিবেগ', count: 9 },
      { id: 'chap6_t6', name: 'মহাকর্ষীয় সূত্রের ব্যবহার', count: 8 },
      { id: 'chap6_t7', name: 'Practice', count: 30 }
    ]
  }
];

export interface Module3QuestionItem {
  id: string | number;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  topic: string;
  chapterId: string;
}

// Map raw question sets to exact topic counts for Module 3
export function getModule3QuestionsForTopics(chapterId: string, selectedTopicNames: string[]): Module3QuestionItem[] {
  const chapter = MODULE_3_CHAPTERS.find(c => c.id === chapterId);
  if (!chapter) return [];

  const rawPool = chapterId === 'phy1_chap6' ? phy1Chap6RawQuestions : phy1Chap4RawQuestions;
  const questions: Module3QuestionItem[] = [];

  chapter.topics.forEach((topic) => {
    if (selectedTopicNames.includes(topic.name)) {
      // Find matching raw questions first
      const matches = rawPool.filter(q => q.topic === topic.name || (topic.name === 'Practice' && q.topic));
      
      for (let i = 0; i < topic.count; i++) {
        if (i < matches.length) {
          const rawQ = matches[i];
          questions.push({
            id: `m3_${chapterId}_${topic.id}_${rawQ.id || i + 1}`,
            question_text: rawQ.question_text,
            options: rawQ.options,
            correct_answer: rawQ.correct_answer,
            explanation: rawQ.explanation || `${topic.name} সংক্রান্ত প্রশ্ন ব্যাখ্যা।`,
            topic: topic.name,
            chapterId: chapterId
          });
        } else {
          // Fallback to pool item or generated item if raw pool is smaller
          const fallbackRaw = rawPool[i % rawPool.length];
          questions.push({
            id: `m3_${chapterId}_${topic.id}_gen_${i + 1}`,
            question_text: fallbackRaw?.question_text ? `${fallbackRaw.question_text}` : `${topic.name}: অনুশীলনী প্রশ্ন ${i + 1}`,
            options: fallbackRaw?.options || ['ক', 'খ', 'গ', 'ঘ'],
            correct_answer: fallbackRaw?.correct_answer || 'ক',
            explanation: fallbackRaw?.explanation || `${topic.name} বিষয়ে সমাধান।`,
            topic: topic.name,
            chapterId: chapterId
          });
        }
      }
    }
  });

  return questions;
}
