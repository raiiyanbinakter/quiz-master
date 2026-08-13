import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { StudentGameProfile } from '../types/gamification';
import {
  MeaningfulActionEvent,
  processMeaningfulActionLocally,
  getOrResetDailyGoals
} from '../utils/gamification';

export function triggerGamificationToast(message: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('gamification_toast', { detail: { message } }));
  }
}

export async function recordMeaningfulActionInFirestore(
  userId: string | null,
  action: MeaningfulActionEvent,
  currentProfileFallback?: StudentGameProfile | null
): Promise<{ updatedProfile: StudentGameProfile; pointsAdded: number }> {
  const todayStr = new Date().toISOString().split('T')[0];

  let existingProfile: StudentGameProfile = currentProfileFallback || {
    userId: userId || 'guest',
    selectedSubjects: [],
    skillDivisions: {},
    progressPoints: 0,
    helpPoints: 0,
    currentStreak: 0,
    lastMeaningfulStudyDate: null,
    competitionOptIn: false,
    dailyGoalDate: todayStr,
    dailyGoals: []
  };

  if (userId) {
    try {
      const profileRef = doc(db, 'users', userId, 'gameProfile', 'main');
      const snap = await getDoc(profileRef);
      if (snap.exists()) {
        existingProfile = {
          userId,
          ...(snap.data() as Partial<StudentGameProfile>)
        } as StudentGameProfile;
      }
    } catch (err) {
      console.warn("Could not fetch gameProfile from Firestore:", err);
    }
  }

  const result = processMeaningfulActionLocally(existingProfile, action, todayStr);

  if (result.isNewEvent && result.toastMessage) {
    triggerGamificationToast(result.toastMessage);
  }

  if (userId && result.isNewEvent) {
    try {
      const profileRef = doc(db, 'users', userId, 'gameProfile', 'main');
      await setDoc(profileRef, {
        ...result.updatedProfile,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn("Could not save gameProfile to Firestore:", err);
    }
  }

  return {
    updatedProfile: result.updatedProfile,
    pointsAdded: result.progressPointsAdded
  };
}
