export type TopicReviewStatus =
  | 'draft'
  | 'needs_verification'
  | 'admin_reviewed';

export interface AnalysisSource {
  id: string;
  title: string;
  fileReference?: string;
  url?: string;
  publisher?: string;
  year?: string;
  sourceType:
    | 'official_syllabus'
    | 'past_question_analysis'
    | 'editor_analysis';
  verificationStatus:
    | 'needs_verification'
    | 'admin_reviewed';
  reviewedBy?: string;
  reviewedAt?: any;
}

export interface TopicAnalysisRecord {
  id: string;
  route: 'academic' | 'medical' | 'varsity' | 'engineering';
  subjectId: string;
  paper?: 'first' | 'second' | 'not_applicable';
  chapterId: string;
  chapterTitle: string;
  topicId: string;
  title: string;
  learningObjectives: string[];
  prerequisiteTopicIds: string[];
  documentedQuestionCount?: number;
  coverageBand?: 'low' | 'medium' | 'high';
  analysisSourceIds: string[];
  reviewStatus: TopicReviewStatus;
  visualLabId?: string;
  updatedAt?: any;
}

export interface StudentTopicEvidence {
  userId: string;
  topicId: string;
  attempts: number;
  answered: number;
  correct: number;
  accuracy: number;
  lastPracticedAt?: any;
  nextReviewAt?: any;
  masteryState:
    | 'not_started'
    | 'learning'
    | 'review_due'
    | 'mastered';
}
