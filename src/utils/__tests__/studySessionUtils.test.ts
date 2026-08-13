import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  groupUserSessions,
  getNextSessionForHome,
  isDuplicateRevision,
  formatBanglaDate,
  getTypeLabel,
  UserStudySession
} from '../studySessionUtils';

describe('studySessionUtils Unit Tests', () => {
  const todayStr = '2026-05-20';
  const tomorrowStr = '2026-05-21';

  const sampleSessions: UserStudySession[] = [
    {
      id: 's1',
      date: '2026-05-20',
      durationMinutes: 20,
      type: 'review',
      task: 'পদার্থবিজ্ঞান ভেক্টর রিভিশন',
      status: 'planned',
      source: 'quiz_result'
    },
    {
      id: 's2',
      date: '2026-05-21',
      durationMinutes: 30,
      type: 'practice',
      task: 'রসায়ন জারণ-বিজারণ কুইজ',
      status: 'planned',
      source: 'student'
    },
    {
      id: 's3',
      date: '2026-05-19',
      durationMinutes: 15,
      type: 'custom',
      task: 'জীববিজ্ঞান নোট পড়া',
      status: 'completed',
      completedAt: '2026-05-19T10:00:00Z'
    },
    {
      id: 's4',
      date: '2026-05-18',
      durationMinutes: 25,
      type: 'mock',
      task: 'মক টেস্ট সমাধান',
      status: 'skipped'
    }
  ];

  it('groups user sessions accurately into today, future, completed, skipped', () => {
    const grouped = groupUserSessions(sampleSessions, todayStr);

    expect(grouped.todaySessions.length).toBe(1);
    expect(grouped.todaySessions[0].id).toBe('s1');

    expect(grouped.futureSessions.length).toBe(1);
    expect(grouped.futureSessions[0].id).toBe('s2');

    expect(grouped.completedSessions.length).toBe(1);
    expect(grouped.completedSessions[0].id).toBe('s3');

    expect(grouped.skippedSessions.length).toBe(1);
    expect(grouped.skippedSessions[0].id).toBe('s4');
  });

  it('selects the correct next session for Home when today session exists', () => {
    const grouped = groupUserSessions(sampleSessions, todayStr);
    const nextInfo = getNextSessionForHome(grouped.todaySessions, grouped.futureSessions);

    expect(nextInfo.type).toBe('today');
    expect(nextInfo.session?.task).toBe('পদার্থবিজ্ঞান ভেক্টর রিভিশন');
  });

  it('selects future session when no session today', () => {
    const futureOnly: UserStudySession[] = [
      {
        id: 's2',
        date: '2026-05-21',
        durationMinutes: 30,
        type: 'practice',
        task: 'রসায়ন জারণ-বিজারণ কুইজ',
        status: 'planned'
      }
    ];
    const grouped = groupUserSessions(futureOnly, todayStr);
    const nextInfo = getNextSessionForHome(grouped.todaySessions, grouped.futureSessions);

    expect(nextInfo.type).toBe('future');
    expect(nextInfo.session?.task).toBe('রসায়ন জারণ-বিজারণ কুইজ');
  });

  it('returns type "none" when no planned sessions exist', () => {
    const grouped = groupUserSessions([], todayStr);
    const nextInfo = getNextSessionForHome(grouped.todaySessions, grouped.futureSessions);

    expect(nextInfo.type).toBe('none');
    expect(nextInfo.session).toBeUndefined();
  });

  it('prevents duplicate revision creation for the same date and topic/task', () => {
    const existing: UserStudySession[] = [
      {
        id: 'rev1',
        date: tomorrowStr,
        durationMinutes: 20,
        type: 'review',
        task: 'রসায়ন - গুণগত রসায়ন (ভুল প্রশ্নগুলো আবার দেখুন)',
        topicId: 'topic_chem_1',
        status: 'planned'
      }
    ];

    const isDup1 = isDuplicateRevision(
      existing,
      tomorrowStr,
      'রসায়ন - গুণগত রসায়ন (ভুল প্রশ্নগুলো আবার দেখুন)',
      'topic_chem_1'
    );
    expect(isDup1).toBe(true);

    const isDup2 = isDuplicateRevision(
      existing,
      tomorrowStr,
      'উচ্চতর গণিত সরলরেখা',
      'topic_math_2'
    );
    expect(isDup2).toBe(false);
  });

  it('translates session type to Bengali label correctly', () => {
    expect(getTypeLabel('review')).toBe('রিভিশন');
    expect(getTypeLabel('practice')).toBe('অনুশীলন');
    expect(getTypeLabel('custom')).toBe('নিজের কাজ');
    expect(getTypeLabel('mock')).toBe('মক টেস্ট');
  });
});
