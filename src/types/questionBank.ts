export type QuestionStatus =
  | 'draft'
  | 'in_review'
  | 'changes_requested'
  | 'approved'
  | 'published'
  | 'archived';

export type SourceStatus =
  | 'verified'
  | 'needs_verification'
  | 'original_practice';

export type DeliveryFeature =
  | 'practice_bank'
  | 'past_questions'
  | 'subject_test'
  | 'mock_test'
  | 'model_test'
  | 'routine_review'
  | 'competition_future';

export type MedicalSubject =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'english'
  | 'general_knowledge';

export type TeacherSourceSet = 
  | 'ishak' 
  | 'topon' 
  | 'pramanik' 
  | 'tofazzal'
  | 'hazari'
  | 'guha'
  | 'kabir'
  | 'lincoln'
  | 'abul_hasan'
  | 'gazi_ajmol'
  | 'azibur'
  | 'alim'
  | 'majeda'
  | 'board'
  | 'english_expert'
  | 'gk_expert';

export type TeacherSourceSetLabel = 
  | 'ইসহাক স্যার' 
  | 'তপন স্যার' 
  | 'প্রামাণিক স্যার' 
  | 'তোফাজ্জল স্যার'
  | 'হাজারী স্যার'
  | 'গুহ স্যার'
  | 'কবীর স্যার'
  | 'লিংকন স্যার'
  | 'আবুল হাসান স্যার'
  | 'গাজী আজমল স্যার'
  | 'আজিবুর স্যার'
  | 'আলীম স্যার'
  | 'মাজেদা বেগম ম্যাডাম'
  | 'বোর্ড প্রশ্ন'
  | 'এক্সপার্ট প্যানেল';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  imageUrl?: string;
  misconceptionTag?: string;
}

export interface QuestionExplanation {
  shortExplanation: string;
  detailedExplanation?: string;
  hint?: string;
  whyOtherOptions?: Record<string, string>;
  sourceNote?: string;
}

export interface QuestionSource {
  status: SourceStatus;
  title?: string;
  publisher?: string;
  url?: string;
  year?: string;
  note?: string;
}

export type QuestionMediaPlacement =
  | 'question'
  | 'stimulus'
  | 'option_a'
  | 'option_b'
  | 'option_c'
  | 'option_d'
  | 'explanation';

export interface QuestionMedia {
  id: string;
  placement: QuestionMediaPlacement;
  type: 'diagram' | 'graph' | 'table' | 'circuit' | 'formula_image' | 'question_image' | 'equation' | 'photo';
  storagePath: string;
  url: string;
  altText?: string;
  fileName: string;
  fileSize?: number;
  width?: number;
  height?: number;
  uploadedBy: string;
  uploadedAt: any;
}

export type QuestionMediaItem = QuestionMedia;

export interface QuestionItem {
  id: string;
  version: number;
  route: 'medical' | 'academic' | 'varsity' | 'engineering';
  subject: MedicalSubject | string;
  subjectId?: string;
  paper?: 'first' | 'second' | 'not_applicable';
  sectionId?: string;
  sectionName?: string;
  chapterId?: string;
  chapterName?: string;
  topicId?: string;
  topicName?: string;
  sourceSet?: TeacherSourceSet;
  sourceSetLabel?: TeacherSourceSetLabel;
  sourceQuestionNumber?: number | string;
  learningObjective?: string;
  questionType: 'single_choice';
  stem: string;
  stemImageUrl?: string;
  hasImage?: boolean;
  media?: QuestionMediaItem[];
  options: QuestionOption[];
  correctOptionId: string; // 'A', 'B', 'C', 'D'
  explanation: QuestionExplanation;
  estimatedSeconds: number;
  difficulty: 'foundation' | 'standard' | 'challenge' | 'exam';
  cognitiveLevel?: 'recall' | 'understand' | 'apply' | 'analyze';
  language: 'bn' | 'en' | 'mixed';
  source: QuestionSource;
  featureTags: DeliveryFeature[];
  tags: string[];
  status: QuestionStatus;
  createdBy: string;
  reviewedBy?: string;
  reviewedAt?: any;
  publishedAt?: any;
  createdAt?: any;
  updatedAt?: any;
  changeNote?: string;
}

export interface AssessmentBlueprint {
  id: string;
  route: 'medical';
  feature: DeliveryFeature;
  title: string;
  description?: string;
  subject?: MedicalSubject;
  questionIds: string[];
  timeLimitSeconds?: number;
  scoringRule: 'practice' | 'exam_negative_marking' | 'custom';
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showFeedback: 'instant' | 'after_submit' | 'after_end';
  sourceStatus: SourceStatus;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  publishedAt?: any;
}

export type QuestionReportIssueType =
  | 'wrong_answer_key'
  | 'explanation_unclear_or_wrong'
  | 'question_wording_unclear'
  | 'option_missing_or_duplicate'
  | 'image_formula_issue'
  | 'source_year_issue'
  | 'other';

export type QuestionReportStatus = 'open' | 'reviewing' | 'resolved' | 'dismissed';

export interface QuestionReport {
  id: string;
  questionId: string;
  questionVersion?: number;
  issueType: QuestionReportIssueType;
  note?: string;
  submittedBy: string;
  status: QuestionReportStatus;
  createdAt: any;
  reviewerNote?: string;
}

export type ReviewFlag = 'too_easy' | 'too_hard' | 'weak_distractor' | 'possible_error' | 'none';

export interface QuestionAnalytics {
  questionId: string;
  version: number;
  attemptCount: number;
  correctCount: number;
  accuracy: number;
  optionSelections: Record<string, number>;
  reportCount: number;
  medianResponseSeconds: number;
  lastUsedAt: any;
  reviewFlag: ReviewFlag;
}
