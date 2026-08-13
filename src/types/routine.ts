export type LearningRoute = 'academic' | 'medical' | 'varsity' | 'engineering';

export type ReviewerStatus = 'verified' | 'needs_verification';

export type SessionType = 'learn' | 'retrieve' | 'practice' | 'review' | 'mock' | 'error_review' | 'custom';

export type SessionStatus = 'planned' | 'completed' | 'skipped' | 'moved';

export interface SourceReference {
  id: string;
  url: string;
  title: string;
  publisher: string;
  academicYear: string;
  retrievedAt: string;
  reviewerStatus: ReviewerStatus;
  notes?: string;
}

export interface ExamBlueprint {
  id: string;
  title: string;
  route: LearningRoute;
  subjectIds: string[];
  totalMarks?: number;
  durationMinutes?: number;
  sourceReferences: SourceReference[];
}

export interface SyllabusTopic {
  id: string;
  route: LearningRoute;
  examBlueprintId: string;
  subjectId: string;
  chapterId: string;
  chapterName?: string;
  subjectName?: string;
  title: string;
  learningObjectives: string[];
  prerequisites: string[]; // array of topic ids
  estimatedMinutes: number;
  practiceType: SessionType;
  officialStatus: ReviewerStatus;
  sourceReferences: SourceReference[];
  editorPriority?: number; // 0 - 100
  examBlueprintWeight?: number; // 0 - 100
}

export interface TopicPriorityBreakdown {
  examBlueprintWeight: number; // 0 - 100
  studentWeakness: number;      // 0 - 100
  prerequisiteUrgency: number;  // 0 - 100
  reviewDue: number;            // 0 - 100
  timePressure: number;         // 0 - 100
  totalScore: number;           // 0 - 100
  reasons: string[];
}

export interface StudentAvailabilityBlock {
  id: string;
  dayOfWeek: number; // 0=Sunday, 1=Monday, ..., 6=Saturday
  startTime: string; // "09:00"
  endTime: string;   // "11:00"
  availableMinutes: number;
}

export interface FixedCommitment {
  id: string;
  title: string;
  dayOfWeek: number; // 0=Sunday ... 6=Saturday
  startTime: string; // "14:00"
  endTime: string;   // "16:00"
  isRestBlock?: boolean;
}

export interface RoutinePreferences {
  preferredSessionMinutes: number; // e.g. 45 or 60
  bufferPercentage: number;        // e.g. 0.20 for 20%
  studyDays: number[];             // e.g. [0, 1, 2, 3, 4, 5, 6]
  maxDailyStudyMinutes: number;    // e.g. 240
  reviewGaps: number[];            // default [1, 3, 7, 14]
}

export interface StudySession {
  id: string;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "09:00"
  durationMinutes: number;
  topicId?: string;
  topicTitle?: string;
  subjectName?: string;
  type: SessionType;
  task: string;
  successCriteria?: string;
  source: 'auto' | 'student';
  locked: boolean;
  status: SessionStatus;
  recommendationReasons?: string[];
  checkIn?: SessionCheckIn;
}

export interface SessionCheckIn {
  id: string;
  sessionId: string;
  completedAt: string;
  selfRating: number; // 1 to 5
  notes?: string;
  durationSpentMinutes: number;
}

export interface StudyPlan {
  id: string;
  userId: string;
  route: LearningRoute;
  title: string;
  startDate: string;        // "YYYY-MM-DD"
  targetExamDate: string;   // "YYYY-MM-DD"
  preferences: RoutinePreferences;
  availability: StudentAvailabilityBlock[];
  commitments: FixedCommitment[];
  customGoals: string[];
  selectedTopicIds: string[];
  sessions: StudySession[];
  createdAt: string;
  updatedAt: string;
}

export interface TopicPerformanceSummary {
  topicId: string;
  quizAttempts: number;
  averageScorePercentage: number;
  weaknessScore: number; // 0-100
  lastReviewedDate?: string;
}

export interface VisualExplanationSpec {
  id: string;
  topicId: string;
  title: string;
  learningObjective: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  labels: string[];
  sourceIds: string[];
  isFeatureFlagged: boolean;
}

export interface PlanFeasibility {
  isFeasible: boolean;
  totalAvailableMinutes: number;
  usableMinutesAfterBuffer: number;
  totalRequiredMinutes: number;
  shortfallOrSurplusMinutes: number; // positive = surplus, negative = shortfall
  reasons: string[];
  suggestions: string[];
}

export interface RoutineTemplate {
  id: string;
  title: string;
  banglaTitle: string;
  description: string;
  route: LearningRoute;
  targetProfiles: string[];
  level: 'beginner' | 'intermediate' | 'intensive' | 'recovery';
  subjects: string[];
  topicOrder: string[];
  studyDays: number[];
  suggestedDailyMinutes: number;
  sessionMinutes: number;
  breakMinutes: number;
  revisionIntervals: number[];
  mockTestFrequency: 'none' | 'weekly' | 'biweekly';
  dailyGoalText: string;
  weeklyGoalText: string;
  isPublished: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface RoutineEvent {
  id: string;
  title: string;
  banglaTitle: string;
  description: string;
  route: LearningRoute;
  targetProfiles: string[];
  startDate: string;
  endDate: string;
  bannerColor: string;
  requiredTopics: string[];
  suggestedDailyTasks: string[];
  achievementTitle?: string;
  isJoinable: boolean;
  showOnHome: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudentRoutineProfile {
  route?: LearningRoute;
  targetProfile?: string;
  selectedTemplateId?: string;
  acceptedTemplateVersion?: number;
  hasCustomSchedule: boolean;
  availableMinutesByDay: Record<string, number>;
  lockedSessionIds: string[];
  updatedAt: string;
}

