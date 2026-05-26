export interface Question {
  id: number;
  topic?: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  time_limit?: number;
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
