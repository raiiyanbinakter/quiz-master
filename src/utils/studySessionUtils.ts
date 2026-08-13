import { fetchUserStudySessions, saveUserStudySession, updateUserStudySessionStatus, updateUserStudySessionDate, UserStudySession } from '../lib/routineFirestore';

export type { UserStudySession };

export interface GroupedUserSessions {
  todaySessions: UserStudySession[];
  futureSessions: UserStudySession[];
  completedSessions: UserStudySession[];
  skippedSessions: UserStudySession[];
}

export interface NextSessionInfo {
  type: 'today' | 'future' | 'none';
  session?: UserStudySession;
}

/**
 * Format a YYYY-MM-DD date string into Bengali readable string (e.g. "২৫ মে, ২০২৬" or "আজ", "আগামীকাল")
 */
export function formatBanglaDate(dateStr: string): string {
  if (!dateStr) return '';
  const todayStr = new Date().toISOString().split('T')[0];
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  if (dateStr === todayStr) return 'আজ';
  if (dateStr === tomorrowStr) return 'আগামীকাল';

  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      const months = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
      ];
      const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      
      const dayBangla = day.toString().split('').map(d => banglaDigits[parseInt(d, 10)] || d).join('');
      const monthBangla = months[monthIdx] || '';
      const yearBangla = year.split('').map(d => banglaDigits[parseInt(d, 10)] || d).join('');

      return `${dayBangla} ${monthBangla}, ${yearBangla}`;
    }
  } catch (err) {
    console.warn('Date format error:', err);
  }
  return dateStr;
}

/**
 * Group user sessions into Today, Future, Completed, and Skipped.
 */
export function groupUserSessions(
  sessions: UserStudySession[],
  targetDateStr?: string
): GroupedUserSessions {
  const todayStr = targetDateStr || new Date().toISOString().split('T')[0];

  const todaySessions: UserStudySession[] = [];
  const futureSessions: UserStudySession[] = [];
  const completedSessions: UserStudySession[] = [];
  const skippedSessions: UserStudySession[] = [];

  sessions.forEach(s => {
    if (s.status === 'completed') {
      completedSessions.push(s);
    } else if (s.status === 'skipped') {
      skippedSessions.push(s);
    } else {
      // status === 'planned'
      if (s.date === todayStr || s.date < todayStr) {
        // Current or overdue planned sessions belong to today
        todaySessions.push(s);
      } else {
        futureSessions.push(s);
      }
    }
  });

  todaySessions.sort((a, b) => a.date.localeCompare(b.date));
  futureSessions.sort((a, b) => a.date.localeCompare(b.date));
  completedSessions.sort((a, b) => (b.completedAt || b.date).toString().localeCompare((a.completedAt || a.date).toString()));
  skippedSessions.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return {
    todaySessions,
    futureSessions,
    completedSessions,
    skippedSessions
  };
}

/**
 * Select the primary upcoming session for Home or Routine Hero.
 */
export function getNextSessionForHome(
  todaySessions: UserStudySession[],
  futureSessions: UserStudySession[]
): NextSessionInfo {
  if (todaySessions.length > 0) {
    return { type: 'today', session: todaySessions[0] };
  }
  if (futureSessions.length > 0) {
    return { type: 'future', session: futureSessions[0] };
  }
  return { type: 'none' };
}

/**
 * Check if a duplicate revision session already exists for tomorrow with the same topic/task.
 */
export function isDuplicateRevision(
  sessions: UserStudySession[],
  targetDateStr: string,
  taskTitle: string,
  topicId?: string | null
): boolean {
  return sessions.some(s => {
    if (s.date !== targetDateStr || s.status !== 'planned') return false;
    if (topicId && s.topicId === topicId) return true;
    if (s.task.trim().toLowerCase() === taskTitle.trim().toLowerCase()) return true;
    return false;
  });
}

/**
 * Add a revision session for tomorrow from Quiz Result.
 */
export async function addRevisionFromQuizResult(
  userId: string | null,
  quizName: string,
  subjectId?: string | null,
  topicId?: string | null,
  weakTopicName?: string | null
): Promise<{ success: boolean; session: UserStudySession; duplicate: boolean }> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const taskTitle = weakTopicName
    ? `${weakTopicName} - রিভিশন`
    : `${quizName || 'কুইজ'} (ভুল প্রশ্নগুলো আবার দেখুন)`;

  const existingSessions = await fetchUserStudySessions(userId);
  const duplicate = isDuplicateRevision(existingSessions, tomorrowStr, taskTitle, topicId);

  if (duplicate) {
    const dupSession = existingSessions.find(
      s => s.date === tomorrowStr && s.status === 'planned' && (s.topicId === topicId || s.task === taskTitle)
    ) || {
      id: `session_dup`,
      date: tomorrowStr,
      durationMinutes: 20,
      topicId: topicId || null,
      subjectId: subjectId || null,
      type: 'review',
      task: taskTitle,
      source: 'quiz_result',
      status: 'planned'
    };
    return { success: true, session: dupSession, duplicate: true };
  }

  const newSession = await saveUserStudySession(userId, {
    date: tomorrowStr,
    durationMinutes: 20,
    topicId: topicId || null,
    subjectId: subjectId || null,
    type: 'review',
    task: taskTitle,
    source: 'quiz_result',
    status: 'planned'
  });

  return { success: true, session: newSession, duplicate: false };
}

export function getTypeLabel(type: UserStudySession['type']): string {
  switch (type) {
    case 'review':
      return 'রিভিশন';
    case 'practice':
      return 'অনুশীলন';
    case 'custom':
      return 'নিজের কাজ';
    case 'mock':
      return 'মক টেস্ট';
    default:
      return 'পড়ার কাজ';
  }
}
