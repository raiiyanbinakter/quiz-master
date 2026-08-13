import {
  StudentGameProfile,
  CompetitionEligibility,
  AchievementDefinition,
  DailyGoal
} from '../types/gamification';

export const INITIAL_ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first_quiz',
    title: 'শুরুটা হলো',
    description: 'আপনার প্রথম অনুশীলন সম্পন্ন হয়েছে।',
    icon: 'BookOpen',
    category: 'practice',
    requirementType: 'quiz_count',
    requirementValue: 1
  },
  {
    id: 'streak_3',
    title: 'টানা ৩ দিন',
    description: 'টানা ৩ দিন পড়াশোনার ধারাবাহিকতা বজায় রেখেছেন।',
    icon: 'Flame',
    category: 'consistency',
    requirementType: 'streak_days',
    requirementValue: 3
  },
  {
    id: 'review_5',
    title: 'ভুল থেকে শেখা',
    description: 'ভুল প্রশ্নগুলো আবার দেখে শেখার অভ্যাস তৈরি করেছেন।',
    icon: 'RotateCcw',
    category: 'revision',
    requirementType: 'review_count',
    requirementValue: 5
  },
  {
    id: 'review_10',
    title: 'রিভিশন মাস্টার',
    description: 'নিয়মিত রিভিশনের মাধ্যমে অগ্রগতি বজায় রেখেছেন।',
    icon: 'CheckCircle2',
    category: 'revision',
    requirementType: 'review_count',
    requirementValue: 10
  },
  {
    id: 'help_5',
    title: 'সহায়ক বন্ধু',
    description: 'অন্য শিক্ষার্থীদের সহায়তায় এগিয়ে এসেছেন।',
    icon: 'HeartHandshake',
    category: 'help',
    requirementType: 'accepted_answers',
    requirementValue: 5
  },
  {
    id: 'chapter_mastery',
    title: 'এক অধ্যায় আয়ত্তে',
    description: 'পর্যাপ্ত অনুশীলনে একটি অধ্যায়ে ভালো অগ্রগতি করেছেন।',
    icon: 'Trophy',
    category: 'mastery',
    requirementType: 'mastered_topics',
    requirementValue: 1
  }
];

export const DEFAULT_DAILY_GOALS: DailyGoal[] = [
  {
    id: 'complete_quiz',
    title: 'একটি অনুশীলন সম্পন্ন করুন',
    description: 'একটি কুইজ বা অনুশীলন শেষ করুন',
    target: 1,
    current: 0,
    completed: false
  },
  {
    id: 'complete_review',
    title: 'একটি রিভিশন সম্পন্ন করুন',
    description: 'নির্ধারিত রিভিশন কাজ শেষ করুন',
    target: 1,
    current: 0,
    completed: false
  },
  {
    id: 'focused_minutes',
    title: '৩০ মিনিট পড়াশোনা করুন',
    description: 'রুটিনের কাজ বা নিজের পড়ার কাজে সময় দিন',
    target: 30,
    current: 0,
    completed: false
  }
];

export function getOrResetDailyGoals(
  existingGoals?: DailyGoal[],
  goalDate?: string,
  todayStr: string = new Date().toISOString().split('T')[0]
): { dailyGoals: DailyGoal[]; dailyGoalDate: string } {
  if (!goalDate || goalDate !== todayStr || !existingGoals || existingGoals.length === 0) {
    return {
      dailyGoals: DEFAULT_DAILY_GOALS.map(g => ({ ...g })),
      dailyGoalDate: todayStr
    };
  }
  return {
    dailyGoals: existingGoals,
    dailyGoalDate: goalDate
  };
}

export function calculateProgressPoints(event: {
  type: 'quiz' | 'planned_review' | 'planned_session' | 'custom_session' | 'topic_improved' | 'mock_test';
}): number {
  switch (event.type) {
    case 'quiz':
      return 5;
    case 'planned_review':
      return 8;
    case 'planned_session':
    case 'custom_session':
      return 10;
    case 'topic_improved':
      return 10;
    case 'mock_test':
      return 15;
    default:
      return 0;
  }
}

export function calculateHelpPoints(event: {
  type: 'accepted_answer' | 'normal_answer';
}): number {
  switch (event.type) {
    case 'accepted_answer':
      return 10;
    case 'normal_answer':
      return 0;
    default:
      return 0;
  }
}

// Memory set for local idempotency fallback
const memoryProcessedEvents = new Set<string>();

export function awardProgressPointsOnce(
  currentProfile: StudentGameProfile,
  eventId: string,
  eventType: 'quiz' | 'planned_review' | 'planned_session' | 'custom_session' | 'topic_improved' | 'mock_test'
): { updatedProfile: StudentGameProfile; pointsAdded: number } {
  const processedList = currentProfile.processedEvents || [];
  if (memoryProcessedEvents.has(eventId) || processedList.includes(eventId)) {
    return { updatedProfile: currentProfile, pointsAdded: 0 };
  }

  memoryProcessedEvents.add(eventId);
  const updatedProcessedList = [eventId, ...processedList].slice(0, 100);

  const pointsAdded = calculateProgressPoints({ type: eventType });
  const updatedProfile: StudentGameProfile = {
    ...currentProfile,
    progressPoints: (currentProfile.progressPoints || 0) + pointsAdded,
    processedEvents: updatedProcessedList,
    updatedAt: new Date().toISOString()
  };

  return { updatedProfile, pointsAdded };
}

export function updateMeaningfulStreak(
  currentStreak: number,
  lastMeaningfulStudyDate?: string | null,
  todayStr: string = new Date().toISOString().split('T')[0]
): { newStreak: number; newDate: string; isUpdated: boolean } {
  if (lastMeaningfulStudyDate === todayStr) {
    return { newStreak: currentStreak || 1, newDate: todayStr, isUpdated: false };
  }

  const todayDate = new Date(todayStr);
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  if (lastMeaningfulStudyDate === yesterdayStr) {
    return { newStreak: (currentStreak || 0) + 1, newDate: todayStr, isUpdated: true };
  }

  // Resets or starts streak at 1 if broken or first action
  return { newStreak: 1, newDate: todayStr, isUpdated: true };
}

export interface MeaningfulActionEvent {
  eventId: string;
  type: 'quiz' | 'planned_review' | 'planned_session' | 'custom_session' | 'mock_test' | 'accepted_helpful_answer';
  durationMinutes?: number;
}

export function processMeaningfulActionLocally(
  profile: StudentGameProfile,
  action: MeaningfulActionEvent,
  todayStr: string = new Date().toISOString().split('T')[0]
): {
  updatedProfile: StudentGameProfile;
  progressPointsAdded: number;
  helpPointsAdded: number;
  streakUpdated: boolean;
  isNewEvent: boolean;
  toastMessage?: string;
} {
  const processedList = profile.processedEvents || [];
  if (memoryProcessedEvents.has(action.eventId) || processedList.includes(action.eventId)) {
    return {
      updatedProfile: profile,
      progressPointsAdded: 0,
      helpPointsAdded: 0,
      streakUpdated: false,
      isNewEvent: false
    };
  }

  memoryProcessedEvents.add(action.eventId);
  const newProcessedEvents = [action.eventId, ...processedList].slice(0, 100);

  // 1. Daily Goals Check & Setup
  const { dailyGoals, dailyGoalDate } = getOrResetDailyGoals(profile.dailyGoals, profile.dailyGoalDate, todayStr);

  // 2. Streak Update
  const { newStreak, newDate, isUpdated: streakUpdated } = updateMeaningfulStreak(
    profile.currentStreak || 0,
    profile.lastMeaningfulStudyDate,
    todayStr
  );

  // 3. Points Calculation
  let progressPointsAdded = 0;
  let helpPointsAdded = 0;

  if (action.type === 'accepted_helpful_answer') {
    helpPointsAdded = calculateHelpPoints({ type: 'accepted_answer' });
  } else {
    progressPointsAdded = calculateProgressPoints({ type: action.type });
  }

  // 4. Daily Goals Progress
  const updatedGoals = dailyGoals.map(goal => {
    let current = goal.current;
    if (action.type === 'quiz' || action.type === 'mock_test') {
      if (goal.id === 'complete_quiz') current += 1;
    }
    if (action.type === 'planned_review') {
      if (goal.id === 'complete_review') current += 1;
      if (goal.id === 'focused_minutes') current += (action.durationMinutes || 15);
    }
    if (action.type === 'planned_session' || action.type === 'custom_session') {
      if (goal.id === 'focused_minutes') current += (action.durationMinutes || 20);
    }
    const finalCurrent = Math.min(goal.target, current);
    return {
      ...goal,
      current: finalCurrent,
      completed: finalCurrent >= goal.target
    };
  });

  // 5. Achievement Progress
  const achProgress = { ...(profile.achievementProgress || {}) };
  if (action.type === 'quiz' || action.type === 'mock_test') {
    achProgress.completed_quizzes = (achProgress.completed_quizzes || 0) + 1;
  }
  if (action.type === 'planned_review') {
    achProgress.completed_reviews = (achProgress.completed_reviews || 0) + 1;
  }
  if (action.type === 'accepted_helpful_answer') {
    achProgress.helpful_answers = (achProgress.helpful_answers || 0) + 1;
  }
  achProgress.streak_days = Math.max(achProgress.streak_days || 0, newStreak);

  // 6. Build Updated Profile
  const updatedProfile: StudentGameProfile = {
    ...profile,
    progressPoints: (profile.progressPoints || 0) + progressPointsAdded,
    helpPoints: (profile.helpPoints || 0) + helpPointsAdded,
    currentStreak: newStreak,
    lastMeaningfulStudyDate: newDate,
    dailyGoalDate,
    dailyGoals: updatedGoals,
    achievementProgress: achProgress,
    processedEvents: newProcessedEvents,
    lastActiveDate: todayStr,
    updatedAt: new Date().toISOString()
  };

  const toastMessage = progressPointsAdded > 0 
    ? `+${progressPointsAdded} অগ্রগতি পয়েন্ট • আজকের লক্ষ্য এগিয়েছে`
    : helpPointsAdded > 0
    ? `+${helpPointsAdded} সহায়তা পয়েন্ট • সেরা উত্তর গৃহীত হয়েছে`
    : 'আজকের লক্ষ্য আপডেট হয়েছে';

  return {
    updatedProfile,
    progressPointsAdded,
    helpPointsAdded,
    streakUpdated,
    isNewEvent: true,
    toastMessage
  };
}

export function getLockedAchievementHint(
  achievement: AchievementDefinition,
  profile?: StudentGameProfile | null
): string {
  const achProgress = profile?.achievementProgress || {};
  const currentStreak = profile?.currentStreak || 0;

  switch (achievement.id) {
    case 'first_quiz':
      return 'এই অর্জনটি পেতে ১টি অনুশীলন সম্পন্ন করুন।';
    case 'streak_3': {
      const remaining = Math.max(1, 3 - currentStreak);
      return `এই অর্জনটি পেতে আরও ${remaining} দিন পড়াশোনার ধারাবাহিকতা বজায় রাখুন।`;
    }
    case 'review_5': {
      const done = achProgress.completed_reviews || 0;
      const remaining = Math.max(1, 5 - done);
      return `এই অর্জনটি পেতে আরও ${remaining}টি রিভিশন সম্পন্ন করুন।`;
    }
    case 'review_10': {
      const done = achProgress.completed_reviews || 0;
      const remaining = Math.max(1, 10 - done);
      return `এই অর্জনটি পেতে আরও ${remaining}টি রিভিশন সম্পন্ন করুন।`;
    }
    case 'help_5': {
      const done = achProgress.helpful_answers || 0;
      const remaining = Math.max(1, 5 - done);
      return `এই অর্জনটি পেতে আরও ${remaining}টি সহায়ক উত্তর প্রদান করুন।`;
    }
    case 'chapter_mastery':
      return 'এই অর্জনটি পেতে যেকোনো একটি অধ্যায়ে কুইজ খেলে ভালো ফলাফল অর্জন করুন।';
    default:
      return 'অনুশীলন ও রিভিশন সম্পন্ন করে আনলক করুন।';
  }
}

export function checkCompetitionEligibility(
  candidate: CompetitionEligibility,
  participant: CompetitionEligibility
): boolean {
  if (candidate.route !== participant.route) return false;
  if (candidate.targetExam && participant.targetExam && candidate.targetExam !== participant.targetExam) return false;
  if (candidate.subjectId !== participant.subjectId) return false;
  if (candidate.division !== participant.division) return false;
  if (candidate.seasonId && participant.seasonId && candidate.seasonId !== participant.seasonId) return false;
  return true;
}
