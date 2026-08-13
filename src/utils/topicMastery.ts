import { TopicMasteryStatus, TopicMastery, LearningRoute } from '../types/gamification';

export function calculateTopicStatus(
  answered: number,
  correct: number,
  currentStatus?: TopicMasteryStatus
): TopicMasteryStatus {
  if (answered <= 0) {
    return 'not_started';
  }

  const accuracy = Math.round((correct / answered) * 100);

  if (accuracy < 60) {
    return 'review_due';
  }

  if (accuracy >= 80 && answered >= 5) {
    return 'mastered';
  }

  // 60-79%, OR >=80% with fewer than 5 questions
  return 'learning';
}

export function calculateNextReviewDate(
  status: TopicMasteryStatus,
  fromDate: Date = new Date()
): string {
  const result = new Date(fromDate);

  if (status === 'review_due') {
    result.setDate(result.getDate() + 1); // Next day
  } else if (status === 'mastered') {
    result.setDate(result.getDate() + 7); // 7 days later
  } else {
    // learning or default
    result.setDate(result.getDate() + 3); // 3 days later
  }

  return result.toISOString().split('T')[0];
}

export function updateTopicMastery(
  existing: Partial<TopicMastery> | undefined,
  addAnswered: number,
  addCorrect: number,
  topicId: string,
  subjectId: string,
  route?: LearningRoute,
  chapterIndex?: number
): TopicMastery | null {
  if (!topicId || topicId.trim() === '') {
    // If a question has no topic value, do not create fake topic mastery
    return null;
  }

  const prevAnswered = existing?.answered || 0;
  const prevCorrect = existing?.correct || 0;
  const prevAttempts = existing?.attempts || 0;

  const totalAnswered = prevAnswered + addAnswered;
  const totalCorrect = prevCorrect + addCorrect;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const status = calculateTopicStatus(totalAnswered, totalCorrect, existing?.status);
  const nextReviewAt = calculateNextReviewDate(status);

  return {
    userId: existing?.userId || '',
    route: route || existing?.route,
    subjectId,
    chapterIndex,
    topicId,
    attempts: prevAttempts + 1,
    answered: totalAnswered,
    correct: totalCorrect,
    accuracy,
    status,
    nextReviewAt,
    updatedAt: new Date().toISOString()
  };
}

import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function recordTopicMasteryInFirestore(
  userId: string,
  subjectId: string,
  topicId: string,
  addAnswered: number,
  addCorrect: number,
  route?: LearningRoute,
  chapterIndex?: number
): Promise<TopicMastery | null> {
  if (!userId || !topicId) return null;
  try {
    const docRef = doc(db, 'users', userId, 'topicMastery', topicId);
    const snap = await getDoc(docRef);
    const existing = snap.exists() ? snap.data() as TopicMastery : undefined;
    
    const updated = updateTopicMastery(existing, addAnswered, addCorrect, topicId, subjectId, route, chapterIndex);
    if (!updated) return null;
    
    updated.userId = userId;
    await setDoc(docRef, {
      ...updated,
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    return updated;
  } catch (err) {
    console.warn("Failed to record topic mastery:", err);
    return null;
  }
}
