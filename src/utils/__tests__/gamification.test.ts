import { describe, it, expect } from 'vitest';
import {
  calculateTopicStatus,
  calculateNextReviewDate,
  updateTopicMastery
} from '../topicMastery';
import {
  calculateProgressPoints,
  calculateHelpPoints,
  awardProgressPointsOnce,
  updateMeaningfulStreak,
  checkCompetitionEligibility,
  processMeaningfulActionLocally,
  getOrResetDailyGoals,
  getLockedAchievementHint,
  INITIAL_ACHIEVEMENTS
} from '../gamification';
import { StudentGameProfile, CompetitionEligibility } from '../../types/gamification';

describe('Topic Mastery Utilities', () => {
  it('returns not_started when answered is 0', () => {
    expect(calculateTopicStatus(0, 0)).toBe('not_started');
  });

  it('returns review_due when accuracy is below 60%', () => {
    expect(calculateTopicStatus(10, 4)).toBe('review_due'); // 40%
  });

  it('returns learning when accuracy is 60-79%', () => {
    expect(calculateTopicStatus(10, 7)).toBe('learning'); // 70%
  });

  it('returns learning when accuracy >= 80% BUT answered < 5 questions', () => {
    expect(calculateTopicStatus(4, 4)).toBe('learning'); // 100% but only 4 questions
  });

  it('returns mastered when accuracy >= 80% AND answered >= 5 questions', () => {
    expect(calculateTopicStatus(5, 4)).toBe('mastered'); // 80% with 5 questions
    expect(calculateTopicStatus(10, 9)).toBe('mastered'); // 90% with 10 questions
  });

  it('calculates next review dates correctly', () => {
    const baseDate = new Date('2026-08-01T10:00:00Z');
    expect(calculateNextReviewDate('review_due', baseDate)).toBe('2026-08-02');
    expect(calculateNextReviewDate('learning', baseDate)).toBe('2026-08-04');
    expect(calculateNextReviewDate('mastered', baseDate)).toBe('2026-08-08');
  });

  it('does not create topic mastery if topicId is empty', () => {
    const result = updateTopicMastery(undefined, 5, 5, '', 'physics_1');
    expect(result).toBeNull();
  });
});

describe('Gamification Utilities', () => {
  it('calculates progress points correctly for events', () => {
    expect(calculateProgressPoints({ type: 'quiz' })).toBe(5);
    expect(calculateProgressPoints({ type: 'planned_review' })).toBe(8);
    expect(calculateProgressPoints({ type: 'planned_session' })).toBe(10);
    expect(calculateProgressPoints({ type: 'custom_session' })).toBe(10);
    expect(calculateProgressPoints({ type: 'topic_improved' })).toBe(10);
    expect(calculateProgressPoints({ type: 'mock_test' })).toBe(15);
  });

  it('calculates help points correctly', () => {
    expect(calculateHelpPoints({ type: 'accepted_answer' })).toBe(10);
    expect(calculateHelpPoints({ type: 'normal_answer' })).toBe(0);
  });

  it('prevents awarding progress points twice for the same event ID', () => {
    const profile: StudentGameProfile = {
      userId: 'user123',
      selectedSubjects: ['physics'],
      skillDivisions: {},
      progressPoints: 100,
      helpPoints: 0,
      currentStreak: 1,
      competitionOptIn: false
    };

    const firstResult = awardProgressPointsOnce(profile, 'quiz_event_001', 'quiz');
    expect(firstResult.pointsAdded).toBe(5);
    expect(firstResult.updatedProfile.progressPoints).toBe(105);

    const secondResult = awardProgressPointsOnce(firstResult.updatedProfile, 'quiz_event_001', 'quiz');
    expect(secondResult.pointsAdded).toBe(0);
    expect(secondResult.updatedProfile.progressPoints).toBe(105);
  });

  it('updates meaningful streak correctly', () => {
    // Same day activity -> does not increment streak again
    const sameDay = updateMeaningfulStreak(3, '2026-08-01', '2026-08-01');
    expect(sameDay.newStreak).toBe(3);
    expect(sameDay.isUpdated).toBe(false);

    // Consecutive day -> increments streak
    const consecutiveDay = updateMeaningfulStreak(3, '2026-08-01', '2026-08-02');
    expect(consecutiveDay.newStreak).toBe(4);
    expect(consecutiveDay.isUpdated).toBe(true);

    // Missed day -> resets streak to 1
    const missedDay = updateMeaningfulStreak(5, '2026-07-25', '2026-08-01');
    expect(missedDay.newStreak).toBe(1);
    expect(missedDay.isUpdated).toBe(true);
  });

  it('processes meaningful action locally updating goals, points, and streak', () => {
    const profile: StudentGameProfile = {
      userId: 'user_a',
      selectedSubjects: [],
      skillDivisions: {},
      progressPoints: 0,
      helpPoints: 0,
      currentStreak: 0,
      lastMeaningfulStudyDate: null,
      competitionOptIn: false
    };

    const result = processMeaningfulActionLocally(profile, {
      eventId: 'evt_quiz_1',
      type: 'quiz'
    }, '2026-08-01');

    expect(result.isNewEvent).toBe(true);
    expect(result.progressPointsAdded).toBe(5);
    expect(result.updatedProfile.progressPoints).toBe(5);
    expect(result.updatedProfile.currentStreak).toBe(1);
    expect(result.updatedProfile.lastMeaningfulStudyDate).toBe('2026-08-01');

    // Quiz goal should be progressed
    const quizGoal = result.updatedProfile.dailyGoals?.find(g => g.id === 'complete_quiz');
    expect(quizGoal?.current).toBe(1);
    expect(quizGoal?.completed).toBe(true);
  });

  it('resets daily goals on a new date', () => {
    const oldGoals = [
      { id: 'complete_quiz', title: 'Quiz', description: 'desc', target: 1, current: 1, completed: true }
    ];
    const { dailyGoals, dailyGoalDate } = getOrResetDailyGoals(oldGoals, '2026-07-31', '2026-08-01');
    expect(dailyGoalDate).toBe('2026-08-01');
    expect(dailyGoals.find(g => g.id === 'complete_quiz')?.completed).toBe(false);
  });

  it('generates clear locked achievement hints', () => {
    const streak3Ach = INITIAL_ACHIEVEMENTS.find(a => a.id === 'streak_3')!;
    const hint = getLockedAchievementHint(streak3Ach, {
      userId: '1',
      selectedSubjects: [],
      skillDivisions: {},
      progressPoints: 0,
      helpPoints: 0,
      currentStreak: 1,
      competitionOptIn: false
    });
    expect(hint).toContain('আরও 2 দিন');
  });

  it('rejects cross-route competition eligibility', () => {
    const academicCandidate: CompetitionEligibility = {
      route: 'academic',
      subjectId: 'physics_1',
      topicIds: ['top1'],
      division: 'standard'
    };

    const medicalParticipant: CompetitionEligibility = {
      route: 'medical',
      subjectId: 'physics_1',
      topicIds: ['top1'],
      division: 'standard'
    };

    const academicMatch: CompetitionEligibility = {
      route: 'academic',
      subjectId: 'physics_1',
      topicIds: ['top1'],
      division: 'standard'
    };

    expect(checkCompetitionEligibility(academicCandidate, medicalParticipant)).toBe(false);
    expect(checkCompetitionEligibility(academicCandidate, academicMatch)).toBe(true);
  });
});
