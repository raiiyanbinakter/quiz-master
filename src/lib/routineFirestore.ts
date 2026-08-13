import { doc, getDoc, setDoc, collection, getDocs, updateDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { StudyPlan, StudySession, TopicPerformanceSummary } from '../types/routine';

const LOCAL_STORAGE_KEY_PLAN = 'routine_active_plan';
const LOCAL_STORAGE_KEY_SESSIONS = 'routine_sessions';
const LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS = 'routine_user_study_sessions';

export interface UserStudySession {
  id: string;
  date: string; // "YYYY-MM-DD"
  durationMinutes: number;
  topicId?: string | null;
  subjectId?: string | null;
  chapterIndex?: number | null;
  type: 'review' | 'practice' | 'custom' | 'mock';
  task: string;
  source?: 'quiz_result' | 'student' | 'template';
  status: 'planned' | 'completed' | 'skipped';
  createdAt?: any;
  completedAt?: any;
}

export async function fetchUserStudySessions(userId: string | null): Promise<UserStudySession[]> {
  let localSessions: UserStudySession[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS);
    if (raw) {
      localSessions = JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading local user study sessions:', err);
  }

  if (!userId || !db) return localSessions;

  try {
    const colRef = collection(db, 'users', userId, 'studySessions');
    const snap = await getDocs(colRef);
    const firestoreSessions: UserStudySession[] = snap.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as UserStudySession[];

    // Merge firestore and local sessions (firestore takes precedence by id)
    const sessionMap = new Map<string, UserStudySession>();
    localSessions.forEach(s => sessionMap.set(s.id, s));
    firestoreSessions.forEach(s => sessionMap.set(s.id, s));

    const merged = Array.from(sessionMap.values());
    
    // Save updated combined to local
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS, JSON.stringify(merged));
    } catch (_) {}

    return merged.sort((a, b) => a.date.localeCompare(b.date));
  } catch (err) {
    console.warn('Error fetching studySessions from Firestore, returning local:', err);
    return localSessions.sort((a, b) => a.date.localeCompare(b.date));
  }
}

export async function saveUserStudySession(
  userId: string | null,
  sessionData: Omit<UserStudySession, 'id'> & { id?: string }
): Promise<UserStudySession> {
  const newId = sessionData.id || `session_${Date.now()}`;
  const fullSession: UserStudySession = {
    id: newId,
    ...sessionData,
    createdAt: sessionData.createdAt || new Date().toISOString()
  };

  // Update localStorage first
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS);
    const list: UserStudySession[] = raw ? JSON.parse(raw) : [];
    const existingIndex = list.findIndex(s => s.id === newId);
    if (existingIndex >= 0) {
      list[existingIndex] = fullSession;
    } else {
      list.push(fullSession);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS, JSON.stringify(list));
  } catch (err) {
    console.warn('Error saving session to local storage:', err);
  }

  // Save to Firestore if user logged in
  if (userId && db) {
    try {
      const docRef = doc(db, 'users', userId, 'studySessions', newId);
      await setDoc(docRef, {
        ...fullSession,
        createdAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('Error saving study session to Firestore:', err);
    }
  }

  return fullSession;
}

export async function updateUserStudySessionStatus(
  userId: string | null,
  sessionId: string,
  status: 'completed' | 'skipped'
): Promise<void> {
  const nowIso = new Date().toISOString();

  // Update Local Storage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS);
    if (raw) {
      const list: UserStudySession[] = JSON.parse(raw);
      const updated = list.map(s => {
        if (s.id === sessionId) {
          return { ...s, status, completedAt: status === 'completed' ? nowIso : s.completedAt };
        }
        return s;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS, JSON.stringify(updated));
    }
  } catch (err) {
    console.warn('Error updating local session status:', err);
  }

  // Update Firestore
  if (userId && db) {
    try {
      const docRef = doc(db, 'users', userId, 'studySessions', sessionId);
      await updateDoc(docRef, {
        status,
        completedAt: status === 'completed' ? serverTimestamp() : null
      });

      // Update meaningful study activity / streak if completed
      if (status === 'completed') {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const uData = userSnap.data();
          const lastStudyDate = uData.lastStudyDate;
          const todayStr = new Date().toISOString().split('T')[0];

          let streakUpdate = uData.currentStreak || 0;
          if (lastStudyDate !== todayStr) {
            // Check if last study date was yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastStudyDate === yesterdayStr) {
              streakUpdate += 1;
            } else if (!lastStudyDate) {
              streakUpdate = 1;
            } else {
              streakUpdate = 1; // reset or start fresh 1
            }

            await updateDoc(userRef, {
              currentStreak: streakUpdate,
              lastStudyDate: todayStr,
              lastSessionCompletedAt: serverTimestamp()
            });
          }
        }
      }
    } catch (err) {
      console.warn('Error updating session status in Firestore:', err);
    }
  }
}

export async function updateUserStudySessionDate(
  userId: string | null,
  sessionId: string,
  newDate: string
): Promise<void> {
  // Update Local Storage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS);
    if (raw) {
      const list: UserStudySession[] = JSON.parse(raw);
      const updated = list.map(s => {
        if (s.id === sessionId) {
          return { ...s, date: newDate, status: 'planned' as const };
        }
        return s;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_STUDY_SESSIONS, JSON.stringify(updated));
    }
  } catch (err) {
    console.warn('Error updating local session date:', err);
  }

  // Update Firestore
  if (userId && db) {
    try {
      const docRef = doc(db, 'users', userId, 'studySessions', sessionId);
      await updateDoc(docRef, {
        date: newDate,
        status: 'planned'
      });
    } catch (err) {
      console.warn('Error updating session date in Firestore:', err);
    }
  }
}

export async function saveActiveStudyPlan(userId: string | null, plan: StudyPlan): Promise<void> {
  // Always save to localStorage first for instant UI response and offline safety
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PLAN, JSON.stringify(plan));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }

  if (!userId || !db) return;

  try {
    const planRef = doc(db, 'users', userId, 'studyPlans', plan.id);
    await setDoc(planRef, plan, { merge: true });

    // Also update routineProfile main pointer
    const profileRef = doc(db, 'users', userId, 'routineProfile', 'main');
    await setDoc(profileRef, {
      activePlanId: plan.id,
      route: plan.route,
      targetExamDate: plan.targetExamDate,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore plan save skipped/failed:', err);
  }
}

export async function loadActiveStudyPlan(userId: string | null): Promise<StudyPlan | null> {
  // Try Firestore if user is logged in
  if (userId && db) {
    try {
      const profileRef = doc(db, 'users', userId, 'routineProfile', 'main');
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const activePlanId = profileSnap.data()?.activePlanId;
        if (activePlanId) {
          const planRef = doc(db, 'users', userId, 'studyPlans', activePlanId);
          const planSnap = await getDoc(planRef);
          if (planSnap.exists()) {
            return planSnap.data() as StudyPlan;
          }
        }
      }
    } catch (err) {
      console.warn('Firestore load failed, falling back to local storage:', err);
    }
  }

  // Fallback to localStorage
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY_PLAN);
    if (localData) {
      return JSON.parse(localData) as StudyPlan;
    }
  } catch (err) {
    console.warn('LocalStorage parse error:', err);
  }

  return null;
}

export async function updateSessionStatusInFirestore(
  userId: string | null,
  planId: string,
  sessionId: string,
  status: StudySession['status'],
  checkIn?: StudySession['checkIn']
): Promise<void> {
  // Update in localStorage
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY_PLAN);
    if (localData) {
      const plan = JSON.parse(localData) as StudyPlan;
      plan.sessions = plan.sessions.map(s => {
        if (s.id === sessionId) {
          return { ...s, status, checkIn: checkIn || s.checkIn };
        }
        return s;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY_PLAN, JSON.stringify(plan));
    }
  } catch (err) {
    console.warn('LocalStorage update failed:', err);
  }

  if (!userId || !db) return;

  try {
    const planRef = doc(db, 'users', userId, 'studyPlans', planId);
    const planSnap = await getDoc(planRef);
    if (planSnap.exists()) {
      const plan = planSnap.data() as StudyPlan;
      const updatedSessions = plan.sessions.map(s => {
        if (s.id === sessionId) {
          return { ...s, status, checkIn: checkIn || s.checkIn };
        }
        return s;
      });
      await updateDoc(planRef, { sessions: updatedSessions, updatedAt: new Date().toISOString() });
    }
  } catch (err) {
    console.warn('Firestore session update failed:', err);
  }
}
