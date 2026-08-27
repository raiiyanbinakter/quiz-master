import { ChapterData } from '../types';
import { ictChap3QuestionsPart1 } from './questions_ict_chap3_part1';
import { ictChap3QuestionsPart2 } from './questions_ict_chap3_part2';
import { ictChap3QuestionsPart3 } from './questions_ict_chap3_part3';
import { ictChap3QuestionsPart4 } from './questions_ict_chap3_part4';

export const ICT_CHAP3_TOPICS = [
  "১. সংখ্যা আবিষ্কারের ইতিহাস ও সংখ্যা পদ্ধতির ধারণা",
  "২. বিভিন্ন সংখ্যা পদ্ধতির আন্তঃরূপান্তর",
  "৩. বাইনারি যোগ-বিয়োগ ও ২-এর পরিপূরক",
  "৪. বিভিন্ন প্রকার কোড",
  "৫. বুলিয়ান অ্যালজেবরা",
  "৬. লজিক গেইট",
  "৭. ডিজিটাল ডিভাইস"
];

export const ictChap3Data: ChapterData = {
  subject: "তথ্য ও যোগাযোগ প্রযুক্তি",
  chapter: "৩. সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস",
  questions: [
    ...ictChap3QuestionsPart1,
    ...ictChap3QuestionsPart2,
    ...ictChap3QuestionsPart3,
    ...ictChap3QuestionsPart4
  ]
};
