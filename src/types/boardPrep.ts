export interface BoardYearConfig {
  year: number;
  banglaYear: string;
  title: string;
}

export interface BoardConfig {
  code: string;
  name: string;
  shortName: string;
}

export interface BoardQuestion {
  id: string;
  subjectId: string;
  chapterIndex: number;
  year: number;
  board: string;
  boardCode?: string;
  stimulus?: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  image?: string;
  imageUrl?: string;
  imageAlt?: string;
  topic?: string;
  source?: string;
  createdAt?: any;
}

export interface BoardYearProgress {
  attempts: number;
  bestScore: number;
  correctCount: number;
  totalQuestions: number;
  status: 'completed' | 'in_progress' | 'not_started';
  lastAttemptAt?: string;
}

export const BOARD_PREP_YEARS: BoardYearConfig[] = [
  { year: 2025, banglaYear: '২০২৫', title: 'বোর্ড প্রশ্ন ২০২৫' },
  { year: 2024, banglaYear: '২০২৪', title: 'বোর্ড প্রশ্ন ২০২৪' },
  { year: 2023, banglaYear: '২০২৩', title: 'বোর্ড প্রশ্ন ২০২৩' },
  { year: 2022, banglaYear: '২০২২', title: 'বোর্ড প্রশ্ন ২০২২' },
  { year: 2021, banglaYear: '২০২১', title: 'বোর্ড প্রশ্ন ২০২১' },
];

export const BD_BOARDS: BoardConfig[] = [
  { code: 'dha', name: 'ঢাকা বোর্ড', shortName: 'ঢা.বো.' },
  { code: 'raj', name: 'রাজশাহী বোর্ড', shortName: 'রা.বো.' },
  { code: 'jas', name: 'যশোর বোর্ড', shortName: 'য.বো.' },
  { code: 'com', name: 'কুমিল্লা বোর্ড', shortName: 'কু.বো.' },
  { code: 'chi', name: 'চট্টগ্রাম বোর্ড', shortName: 'চ.বো.' },
  { code: 'bar', name: 'বরিশাল বোর্ড', shortName: 'ব.বো.' },
  { code: 'syl', name: 'সিলেট বোর্ড', shortName: 'সি.বো.' },
  { code: 'din', name: 'দিনাজপুর বোর্ড', shortName: 'দি.বো.' },
  { code: 'mmy', name: 'ময়মনসিংহ বোর্ড', shortName: 'ম.বো.' },
  { code: 'mad', name: 'মাদ্রাসা বোর্ড', shortName: 'মা.বো.' },
  { code: 'all', name: 'সকল বোর্ড', shortName: 'সকল বো.' },
];
