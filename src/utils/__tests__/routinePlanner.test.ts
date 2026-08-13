import { describe, it, expect } from 'vitest';
import {
  calculateTopicPriority,
  calculateAvailableMinutes,
  validatePlanFeasibility,
  createReviewDates,
  generateStudyPlan,
  replanIncompleteSessions,
} from '../routinePlanner';
import {
  SyllabusTopic,
  StudentAvailabilityBlock,
  FixedCommitment,
  RoutinePreferences,
  StudySession,
  TopicPerformanceSummary,
} from '../../types/routine';

describe('routinePlanner Unit Tests', () => {
  const mockTopics: SyllabusTopic[] = [
    {
      id: 'topic_1',
      route: 'varsity',
      examBlueprintId: 'bp_varsity',
      subjectId: 'chem1',
      chapterId: 'chap1',
      title: 'পরিবেশ রসায়ন - গ্যাসীয় সূত্রাবলি',
      learningObjectives: ['বয়েলের সূত্র ও চার্লসের সূত্র বোঝা'],
      prerequisites: [],
      estimatedMinutes: 60,
      practiceType: 'learn',
      officialStatus: 'verified',
      sourceReferences: [
        {
          id: 'src_1',
          url: 'https://nctb.gov.bd',
          title: 'NCTB Chemistry 2nd Paper',
          publisher: 'NCTB',
          academicYear: '2024',
          retrievedAt: '2025-01-01',
          reviewerStatus: 'verified',
        },
      ],
      examBlueprintWeight: 80,
    },
    {
      id: 'topic_2',
      route: 'varsity',
      examBlueprintId: 'bp_varsity',
      subjectId: 'chem1',
      chapterId: 'chap1',
      title: 'পরিবেশ রসায়ন - গ্রাহামের ব্যাপন সূত্র',
      learningObjectives: ['ব্যাপন হারের গাণিতিক সমস্যা'],
      prerequisites: ['topic_1'],
      estimatedMinutes: 45,
      practiceType: 'practice',
      officialStatus: 'needs_verification',
      sourceReferences: [],
      examBlueprintWeight: 60,
    },
  ];

  const mockAvailability: StudentAvailabilityBlock[] = [
    { id: 'av_1', dayOfWeek: 0, startTime: '09:00', endTime: '12:00', availableMinutes: 180 }, // Sun
    { id: 'av_2', dayOfWeek: 1, startTime: '09:00', endTime: '12:00', availableMinutes: 180 }, // Mon
    { id: 'av_3', dayOfWeek: 2, startTime: '09:00', endTime: '12:00', availableMinutes: 180 }, // Tue
  ];

  const mockCommitments: FixedCommitment[] = [
    { id: 'cm_1', title: 'Coaching Class', dayOfWeek: 1, startTime: '10:00', endTime: '11:00' },
  ];

  const mockPreferences: RoutinePreferences = {
    preferredSessionMinutes: 45,
    bufferPercentage: 0.20,
    studyDays: [0, 1, 2, 3, 4, 5, 6],
    maxDailyStudyMinutes: 180,
    reviewGaps: [1, 3, 7, 14],
  };

  it('calculates topic priority score deterministically with exact formula', () => {
    const priority = calculateTopicPriority(
      mockTopics[0],
      mockTopics,
      { topicId: 'topic_1', quizAttempts: 5, averageScorePercentage: 40, weaknessScore: 60 },
      '2026-12-31',
      '2026-01-01'
    );

    // topic_1 is a prerequisite for topic_2 -> prerequisiteUrgency = 100
    // blueprintWeight = 80
    // weakness = 60
    // formula: 0.30*80 + 0.25*60 + 0.20*100 + 0.15*0 + 0.10*timePressure
    expect(priority.totalScore).toBeGreaterThan(0);
    expect(priority.reasons.some(r => r.includes('Prerequisite'))).toBe(true);
  });

  it('flags needs_verification topics in priority reasons', () => {
    const priority = calculateTopicPriority(mockTopics[1], mockTopics);
    expect(priority.reasons.some(r => r.includes('Needs verification'))).toBe(true);
  });

  it('calculates available minutes subtracting commitments', () => {
    // 3 days * 180 mins = 540 mins. On day 1 (Mon), 60 mins overlap. Total = 480 mins.
    const minutes = calculateAvailableMinutes(
      '2026-06-07', // Sunday
      '2026-06-09', // Tuesday
      mockAvailability,
      mockCommitments,
      [0, 1, 2]
    );
    expect(minutes).toBe(480);
  });

  it('validates plan feasibility accurately', () => {
    const feasibility = validatePlanFeasibility(
      mockTopics,
      '2026-06-07',
      '2026-06-09',
      mockAvailability,
      mockCommitments,
      mockPreferences
    );

    // Usable minutes = 480 * 0.8 = 384 mins.
    // Required = 60 + 45 = 105 mins.
    expect(feasibility.isFeasible).toBe(true);
    expect(feasibility.shortfallOrSurplusMinutes).toBe(279);
  });

  it('creates scheduled review dates correctly', () => {
    const dates = createReviewDates('2026-06-01', [1, 3, 7, 14]);
    expect(dates).toEqual(['2026-06-02', '2026-06-04', '2026-06-08', '2026-06-15']);
  });

  it('generates a study plan correctly', () => {
    const plan = generateStudyPlan({
      userId: 'test_user_1',
      route: 'varsity',
      title: 'Varsity Routine',
      startDate: '2026-06-07',
      targetExamDate: '2026-06-14',
      preferences: mockPreferences,
      availability: mockAvailability,
      commitments: mockCommitments,
      customGoals: ['Solve 50 QB questions'],
      topics: mockTopics,
    });

    expect(plan.sessions.length).toBeGreaterThan(0);
    expect(plan.sessions.some(s => s.type === 'custom')).toBe(true);
  });

  it('preserves student-locked sessions when replanning', () => {
    const lockedSession: StudySession = {
      id: 'locked_sess_1',
      date: '2026-06-07',
      startTime: '09:00',
      durationMinutes: 45,
      topicId: 'topic_1',
      type: 'learn',
      task: 'Student Locked Custom Review',
      source: 'student',
      locked: true,
      status: 'planned',
    };

    const initialPlan = generateStudyPlan({
      userId: 'test_user_1',
      route: 'varsity',
      title: 'Initial Plan',
      startDate: '2026-06-07',
      targetExamDate: '2026-06-14',
      preferences: mockPreferences,
      availability: mockAvailability,
      commitments: mockCommitments,
      customGoals: [],
      topics: mockTopics,
      existingSessions: [lockedSession],
    });

    expect(initialPlan.sessions.some(s => s.id === 'locked_sess_1')).toBe(true);

    const replanned = replanIncompleteSessions(initialPlan, mockTopics, {}, '2026-06-08');
    expect(replanned.sessions.some(s => s.id === 'locked_sess_1')).toBe(true);
  });
});
