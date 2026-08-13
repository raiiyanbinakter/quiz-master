export type LearningRoute = 'academic' | 'medical' | 'varsity' | 'engineering';

export type TopicMasteryStatus = 'not_started' | 'learning' | 'review_due' | 'mastered';

export type SkillDivision = 'foundation' | 'rising' | 'standard' | 'advanced';

export type StudySessionType = 'practice' | 'review' | 'custom' | 'mock';

export interface DailyGoal {
  id: string; // 'complete_quiz' | 'complete_review' | 'focused_minutes'
  title: string;
  description: string;
  current: number;
  target: number;
  completed: boolean;
}

export interface StudentGameProfile {
  userId: string;
  selectedRoute?: LearningRoute;
  targetExam?: string;
  selectedSubjects: string[];
  skillDivisions: Record<string, SkillDivision>;
  progressPoints: number;
  helpPoints: number;
  currentStreak: number;
  lastMeaningfulStudyDate?: string | null;
  dailyGoalDate?: string;
  dailyGoals?: DailyGoal[];
  achievementProgress?: Record<string, number>;
  processedEvents?: string[];
  competitionOptIn: boolean;
  publicAlias?: string;
  lastActiveDate?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface TopicMastery {
  userId: string;
  route?: LearningRoute;
  subjectId: string;
  chapterIndex?: number;
  topicId: string;
  attempts: number;
  answered: number;
  correct: number;
  accuracy: number;
  status: TopicMasteryStatus;
  nextReviewAt?: string;
  updatedAt?: any;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'practice' | 'revision' | 'consistency' | 'help' | 'mastery';
  requirementType: string;
  requirementValue: number;
}

export interface UserAchievement {
  achievementId: string;
  earnedAt?: any;
  progress?: number;
}

export interface CompetitionEligibility {
  route: LearningRoute;
  targetExam?: string;
  subjectId: string;
  topicIds: string[];
  division: SkillDivision;
  seasonId?: string;
}
