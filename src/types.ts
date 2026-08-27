import { QuestionMediaItem, QuestionMediaPlacement, QuestionMedia } from './types/questionBank';

export * from './types/gamification';
export type { QuestionMediaPlacement, QuestionMedia, QuestionMediaItem };

export interface Question {
  id: number;
  topic?: string;
  topicId?: string;
  topicName?: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  time_limit?: number;
  image?: string;
  media?: any[];
  hasImage?: boolean;
  altText?: string;
  stimulus?: string;
  hints?: string[];
  author?: string;
  ref?: string;
}

export interface ChapterData {
  subject: string;
  chapter: string;
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: string[];
  activeChapters: number[]; // Indices of chapters that are available
  category?: string;
  paper?: 'first' | 'second' | 'not_applicable';
  hasSections?: boolean;
  sections?: Array<{
    id: string;
    name: string;
    description?: string;
    chapterRange: { start: number; end: number };
  }>;
}

export interface QuizResult {
  questionId: number;
  questionText: string;
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
  isSkipped: boolean;
  topic?: string;
  media?: QuestionMediaItem[];
}

export interface QuizSummary {
  quizName: string;
  subjectId?: string;
  chapterIndex?: number;
  isGamified?: boolean;
  assessmentType: 'quiz' | 'exam';
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  totalScore: number;
  results: QuizResult[];
}

export interface ChapterProgress {
  userId: string;
  subjectId: string;
  chapterIndex: number;
  status: 'locked' | 'in_progress' | 'rescue' | 'cleared';
  attemptsCount: number;
  bestScore: number;
  latestScore: number;
  masteryScore: number; // percentage 0-100
  updatedAt: any;
}

export interface WeakConcepts {
  userId: string;
  subjectId: string;
  chapterIndex: number;
  weakConceptIds: string[];
  rescueMissionId: string;
  updatedAt: any;
}

export interface MentorStats {
  userId: string;
  acceptedAnswers: number;
  answerCount: number;
  upvotesCount: number;
  reputation: number;
  specialization: string[];
  mentorRankLabel: string;
}

export interface DailyMission {
  id: string;
  title: string;
  banglaTitle: string;
  target: number;
  current: number;
  reward: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

