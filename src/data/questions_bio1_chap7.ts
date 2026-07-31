import { ChapterData } from '../types';
import { gymnospermQuestions } from './bio1_chap7_part1';
import { angiospermQuestions1 } from './bio1_chap7_part2';
import { angiospermQuestions2 } from './bio1_chap7_part3';
import { poaceaeQuestions } from './bio1_chap7_part4';

export const bio1Chap7Data: ChapterData = {
  subject: "জীববিজ্ঞান ১ম পত্র",
  chapter: "৭. নগ্নবীজী ও আবৃতবীজী উদ্ভিদ",
  questions: [
    ...gymnospermQuestions,
    ...angiospermQuestions1,
    ...angiospermQuestions2,
    ...poaceaeQuestions
  ]
};
