export interface MedicalModelTestBlueprint {
  id: string;
  route: 'medical';
  title: string;
  subject: 'physics' | 'chemistry' | 'biology' | 'english' | 'general_knowledge' | string;
  chapterId: string;
  chapterName: string;
  questionIds: string[];
  totalMarks: 100;
  timeLimitMinutes: 50;
  answerLockEnabled: true;
  sourceStatus: 'verified' | 'needs_verification' | 'original_practice';
  sourceTitle?: string;
  sourceUrl?: string;
  status: 'draft' | 'published' | 'archived';
  version: number;
  description?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface ModelTestAttempt {
  id?: string;
  modelTestId: string;
  startedAt: string;
  submittedAt?: string;
  answers: Record<string, string>; // questionId -> selectedOption
  lockedAnswerQuestionIds: string[];
  score: number;
  totalMarks: 100;
  status: 'in_progress' | 'submitted' | 'auto_submitted';
  timeLimitMinutes: 50;
  route: 'medical';
  subject: string;
  chapterId: string;
}
