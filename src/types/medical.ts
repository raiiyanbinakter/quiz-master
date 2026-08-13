export interface MedicalPastQuestionSet {
  id: string;
  subject: 'physics' | 'chemistry' | 'biology' | 'english' | 'general_knowledge' | string;
  year: number | string;
  title: string;
  sourceUrl?: string;
  sourceTitle?: string;
  sourceStatus: 'verified' | 'needs_verification';
  questionIds: (string | number)[];
  questions?: any[];
  academicYear?: string;
  isPublished?: boolean;
}

export interface MedicalSubjectTest {
  id: string;
  title: string;
  subject: 'physics' | 'chemistry' | 'biology' | 'english' | 'general_knowledge' | string;
  questionCount: number;
  timeLimitMinutes: number;
  sourceStatus: 'verified' | 'needs_verification';
  coverageDescription?: string;
  isPublished: boolean;
  questionIds: (string | number)[];
  sourceUrl?: string;
  sourceTitle?: string;
}

export interface MedicalMockTest {
  id: string;
  title: string;
  route: 'medical';
  questionIds: (string | number)[];
  timeLimitMinutes: number;
  sourceStatus: 'verified' | 'needs_verification';
  coverageDescription: string;
  isPublished: boolean;
  sourceUrl?: string;
  sourceTitle?: string;
}
