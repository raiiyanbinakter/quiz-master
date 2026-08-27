import { collection, getDocs, doc, setDoc, deleteDoc, query, where, orderBy, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { RoutineTemplate, RoutineEvent, StudentRoutineProfile } from '../types/routine';

const LOCAL_STORAGE_TEMPLATES = 'admin_routine_templates';
const LOCAL_STORAGE_EVENTS = 'admin_routine_events';

// Default Seed Templates if Firestore is empty
export const DEMO_ROUTINE_TEMPLATES: RoutineTemplate[] = [
  {
    id: 'tmpl_academic_mastery_2025',
    title: 'HSC Academic Complete Mastery Plan',
    banglaTitle: 'এইচএসসি একাডেমি মাস্টার প্ল্যান (২০২৫/২০২৬)',
    description: 'পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিতের গুরুত্বপূর্ণ অধ্যায়ভিত্তিক গোছানো রিভিশন ও দৈনিক অনুশীলনের আদর্শ রুটিন।',
    route: 'academic',
    targetProfiles: ['HSC 2025', 'HSC 2026', 'Academic Focus'],
    level: 'intermediate',
    subjects: ['পদার্থবিজ্ঞান ১ম ও ২য় পত্র', 'রসায়ন ১ম ও ২য় পত্র', 'উচ্চতর গণিত ১ম ও ২য় পত্র'],
    topicOrder: ['ভেক্টর ও গতিবিদ্যা', 'থার্মোডায়নামিক্স', 'গুণগত রসায়ন', 'ম্যাট্রিক্স ও নির্ণায়ক', 'জৈব যৌগ বেসিক'],
    studyDays: [0, 1, 2, 3, 4, 5, 6],
    suggestedDailyMinutes: 240,
    sessionMinutes: 45,
    breakMinutes: 15,
    revisionIntervals: [1, 3, 7, 14],
    mockTestFrequency: 'weekly',
    dailyGoalText: 'প্রতিদিন ৪টি ফোকাস সেশনে বিষয়ভিত্তিক টেক্সটবুক রিডিং ও ১৫টি কুইজ সম্পন্ন করা।',
    weeklyGoalText: 'সাপ্তাহিক ১টি ফুল মডেল টেস্ট দিয়ে দুর্বল টপিকগুলোর রেসকিউ সেশন করা।',
    isPublished: true,
    version: 1,
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-07-01T10:00:00Z',
    createdBy: 'Admin Panel'
  },
  {
    id: 'tmpl_medical_sprint',
    title: 'Medical Admissions Intensive Sprint',
    banglaTitle: 'মেডিকেল ভর্তি পরীক্ষা ইন্টেন্সিভ স্প্রিন্ট',
    description: 'জীববিজ্ঞান ও রসায়নের এনসিইআরটি/বোর্ড টেক্সটবুক রিডিং, মেডি ট্রিকস ও প্র্যাকটিস কুইজ স্প্রিন্ট।',
    route: 'medical',
    targetProfiles: ['Medical Candidate', 'Repeat Examinee', 'HSC Passed'],
    level: 'intensive',
    subjects: ['উদ্ভিদবিজ্ঞান', 'প্রাণীবিজ্ঞান', 'রসায়ন ১ম ও ২য় পত্র', 'পদার্থবিজ্ঞান', 'ইংরেজি ও সাধারণ জ্ঞান'],
    topicOrder: ['কোষ ও এর গঠন', 'রক্ত ও সঞ্চালন', 'শ্বসন ও শ্বাসক্রিয়া', 'মৌলের পর্যায়বৃত্ত ধর্ম', 'মেডিকেল জিকে'],
    studyDays: [0, 1, 2, 3, 4, 5, 6],
    suggestedDailyMinutes: 360,
    sessionMinutes: 60,
    breakMinutes: 10,
    revisionIntervals: [1, 3, 5, 10],
    mockTestFrequency: 'biweekly',
    dailyGoalText: 'প্রতিদিন ২টি বায়োলজি ও ১টি কেমিস্ট্রি অধ্যায় লাইন-বাই-লাইন রিভিশন দেওয়া।',
    weeklyGoalText: 'প্রতি সপ্তাহে ২টি ১০০ মার্কের মেডিকেল মক টেস্ট দিয়ে মাইনাস মার্কিং কমানো।',
    isPublished: true,
    version: 1,
    createdAt: '2026-07-05T10:00:00Z',
    updatedAt: '2026-07-05T10:00:00Z',
    createdBy: 'Admin Panel'
  }
];

export const DEMO_ROUTINE_EVENTS: RoutineEvent[] = [
  {
    id: 'evt_demo_7day_revision',
    title: 'DEMO: 7-Day High Yield Revision Challenge',
    banglaTitle: 'ডেমো: ৭ দিনের রিভিশন চ্যালেঞ্জ',
    description: 'সংক্ষিপ্ত সময়ের মধ্যে পদার্থ ও গণিতের ৫টি অতি গুরুত্বপূর্ণ টপিক এক সপ্তাহে আয়ত্ত করার চ্যালেঞ্জ।',
    route: 'academic',
    targetProfiles: ['HSC Examinee', 'Revision Focus'],
    startDate: '2026-08-01',
    endDate: '2026-08-07',
    bannerColor: 'from-indigo-600 via-purple-600 to-pink-600',
    requiredTopics: ['ভেক্টর', 'থার্মোডায়নামিক্স', 'জৈব যৌগ', 'ম্যাট্রিক্স', 'ক্যালকুলাস'],
    suggestedDailyTasks: [
      'দিন ১: ভেক্টরের সামান্তরিক সূত্র ও নদী-নৌকা অংক প্র্যাকটিস',
      'দিন ২: তাপগতিবিদ্যার প্রথম ও দ্বিতীয় সূত্র কুইজ',
      'দিন ৩: জৈব যৌগের নামকরণ ও সমাণুতা স্প্রিন্ট'
    ],
    achievementTitle: '৭ দিনের রিভিশন মাস্টার 🏆',
    isJoinable: true,
    showOnHome: true,
    isPublished: true,
    createdAt: '2026-07-10T10:00:00Z',
    updatedAt: '2026-07-10T10:00:00Z'
  },
  {
    id: 'evt_demo_medical_week',
    title: 'DEMO: Medical Prep Week',
    banglaTitle: 'ডেমো: মেডিকেল প্রস্তুতি সপ্তাহ',
    description: 'জীববিজ্ঞান ও কেমিস্ট্রির উচ্চ সম্ভাবনাযুক্ত প্রশ্নগুলো স্প্রিং রিভিশন দিয়ে দ্রুত ঝালিয়ে নেওয়ার বিশেষ ড্রাইভ।',
    route: 'medical',
    targetProfiles: ['Medical Candidate', 'Admissions 2025'],
    startDate: '2026-08-05',
    endDate: '2026-08-12',
    bannerColor: 'from-emerald-600 via-teal-600 to-cyan-600',
    requiredTopics: ['কোষ বিজ্ঞান', 'রক্ত সঞ্চালন', 'জৈব রসায়ন', 'মেডিকেল জিকে'],
    suggestedDailyTasks: [
      'দিন ১: কোষ ও কোষের গঠন বইয়ের লাইন-বাই-লাইন পড়া',
      'দিন ২: মানব শারীরতত্ত্ব ১০০টি বিগত বছরের এমসিকিউ প্র্যাকটিস'
    ],
    achievementTitle: 'মেডিকেল স্টার স্প্রিন্টার 🩺',
    isJoinable: true,
    showOnHome: true,
    isPublished: true,
    createdAt: '2026-07-12T10:00:00Z',
    updatedAt: '2026-07-12T10:00:00Z'
  }
];

// Fetch all templates (Admin)
export async function fetchAdminRoutineTemplates(): Promise<RoutineTemplate[]> {
  let templates: RoutineTemplate[] = [];

  if (db) {
    try {
      const snap = await getDocs(collection(db, 'routineTemplates'));
      templates = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RoutineTemplate[];
    } catch (err) {
      console.warn('Firestore fetch routineTemplates error, using local fallback:', err);
    }
  }

  if (templates.length === 0) {
    // Try localStorage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_TEMPLATES);
      if (stored) {
        templates = JSON.parse(stored);
      } else {
        templates = DEMO_ROUTINE_TEMPLATES;
        localStorage.setItem(LOCAL_STORAGE_TEMPLATES, JSON.stringify(templates));
      }
    } catch (e) {
      templates = DEMO_ROUTINE_TEMPLATES;
    }
  }

  return templates;
}

// Fetch published templates (Student)
export async function fetchPublishedRoutineTemplates(): Promise<RoutineTemplate[]> {
  const all = await fetchAdminRoutineTemplates();
  return all.filter(t => t.isPublished);
}

// Save or Update Template
export async function saveAdminRoutineTemplate(template: RoutineTemplate): Promise<void> {
  const now = new Date().toISOString();
  const updatedTemplate: RoutineTemplate = {
    ...template,
    updatedAt: now,
    createdAt: template.createdAt || now
  };

  // LocalStorage update
  try {
    const existing = await fetchAdminRoutineTemplates();
    const index = existing.findIndex(t => t.id === updatedTemplate.id);
    if (index >= 0) {
      existing[index] = updatedTemplate;
    } else {
      existing.push(updatedTemplate);
    }
    localStorage.setItem(LOCAL_STORAGE_TEMPLATES, JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  // Firestore update
  if (db) {
    try {
      await setDoc(doc(db, 'routineTemplates', updatedTemplate.id), updatedTemplate, { merge: true });
    } catch (err) {
      console.warn('Firestore save routineTemplate failed:', err);
    }
  }
}

// Delete Template
export async function deleteAdminRoutineTemplate(
  templateId: string,
  currentUser?: any,
  isUserAdmin?: boolean
): Promise<void> {
  const user = currentUser || auth?.currentUser;
  if (!user) {
    throw new Error('NOT_LOGGED_IN');
  }

  if (isUserAdmin === false) {
    throw new Error('NOT_ADMIN');
  }

  if (db) {
    const docRef = doc(db, 'routineTemplates', templateId);

    // Optional check: verify if document exists or can be accessed
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const existing = await fetchAdminRoutineTemplates();
        const found = existing.some(t => t.id === templateId);
        if (!found) {
          throw new Error('NOT_FOUND');
        }
      }
    } catch (err: any) {
      if (err?.message === 'NOT_FOUND') {
        throw err;
      }
      if (err?.code === 'permission-denied' || err?.message?.includes('permission') || err?.message?.includes('Missing or insufficient permissions')) {
        console.error('Firestore check permission error:', err);
        throw err;
      }
    }

    try {
      await deleteDoc(docRef);
    } catch (err: any) {
      console.error('Firestore delete routineTemplate failed:', err);
      throw err;
    }
  }

  // Synchronize localStorage
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_TEMPLATES);
    if (stored) {
      const existing: RoutineTemplate[] = JSON.parse(stored);
      const filtered = existing.filter(t => t.id !== templateId);
      localStorage.setItem(LOCAL_STORAGE_TEMPLATES, JSON.stringify(filtered));
    }
  } catch (e) {
    console.warn('LocalStorage delete error:', e);
  }
}

// Fetch Routine Events
export async function fetchAdminRoutineEvents(): Promise<RoutineEvent[]> {
  let events: RoutineEvent[] = [];

  if (db) {
    try {
      const snap = await getDocs(collection(db, 'routineEvents'));
      events = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RoutineEvent[];
    } catch (err) {
      console.warn('Firestore fetch routineEvents error, using local fallback:', err);
    }
  }

  if (events.length === 0) {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_EVENTS);
      if (stored) {
        events = JSON.parse(stored);
      } else {
        events = DEMO_ROUTINE_EVENTS;
        localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(events));
      }
    } catch (e) {
      events = DEMO_ROUTINE_EVENTS;
    }
  }

  return events;
}

// Fetch published Routine Events (Student)
export async function fetchPublishedRoutineEvents(): Promise<RoutineEvent[]> {
  const all = await fetchAdminRoutineEvents();
  return all.filter(e => e.isPublished);
}


// Save or Update Event
export async function saveAdminRoutineEvent(event: RoutineEvent): Promise<void> {
  const now = new Date().toISOString();
  const updatedEvent: RoutineEvent = {
    ...event,
    updatedAt: now,
    createdAt: event.createdAt || now
  };

  try {
    const existing = await fetchAdminRoutineEvents();
    const index = existing.findIndex(e => e.id === updatedEvent.id);
    if (index >= 0) {
      existing[index] = updatedEvent;
    } else {
      existing.push(updatedEvent);
    }
    localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage save event error:', e);
  }

  if (db) {
    try {
      await setDoc(doc(db, 'routineEvents', updatedEvent.id), updatedEvent, { merge: true });
    } catch (err) {
      console.warn('Firestore save routineEvent failed:', err);
    }
  }
}

// Delete Event
export async function deleteAdminRoutineEvent(eventId: string): Promise<void> {
  try {
    const existing = await fetchAdminRoutineEvents();
    const filtered = existing.filter(e => e.id !== eventId);
    localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(filtered));
  } catch (e) {
    console.warn('LocalStorage delete event error:', e);
  }

  if (db) {
    try {
      await deleteDoc(doc(db, 'routineEvents', eventId));
    } catch (err) {
      console.warn('Firestore delete routineEvent failed:', err);
    }
  }
}

// Routine Analytics Summary from real data
export interface RoutineAnalyticsSummary {
  templateEnrollmentCount: number;
  eventEnrollmentCount: number;
  plannedSessionCount: number;
  completedSessionCount: number;
  skippedSessionCount: number;
  completionPercentage: number;
  hasData: boolean;
}

export async function fetchRoutineAnalyticsData(): Promise<RoutineAnalyticsSummary> {
  let planned = 0;
  let completed = 0;
  let skipped = 0;
  let templateEnrollments = 0;
  let eventEnrollments = 0;
  let hasRealData = false;

  // Read active study plan from localStorage if present
  try {
    const localPlan = localStorage.getItem('routine_active_plan');
    if (localPlan) {
      const parsed = JSON.parse(localPlan);
      if (parsed.sessions && Array.isArray(parsed.sessions)) {
        hasRealData = true;
        parsed.sessions.forEach((s: any) => {
          if (s.status === 'completed') completed++;
          else if (s.status === 'skipped') skipped++;
          else planned++;
        });
      }
      if (parsed.selectedTemplateId) {
        templateEnrollments++;
      }
    }
  } catch (e) {
    console.warn('Analytics parse error:', e);
  }

  // Scan Firestore if available
  if (db) {
    try {
      const templatesSnap = await getDocs(collection(db, 'routineTemplates'));
      const eventsSnap = await getDocs(collection(db, 'routineEvents'));
      if (!templatesSnap.empty || !eventsSnap.empty) {
        hasRealData = true;
      }
    } catch (err) {
      console.warn('Firestore analytics fetch skipped:', err);
    }
  }

  const total = planned + completed + skipped;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    templateEnrollmentCount: templateEnrollments,
    eventEnrollmentCount: eventEnrollments,
    plannedSessionCount: planned,
    completedSessionCount: completed,
    skippedSessionCount: skipped,
    completionPercentage,
    hasData: hasRealData
  };
}

// Student Routine Profile helpers
export async function getStudentRoutineProfile(userId: string): Promise<StudentRoutineProfile | null> {
  if (!userId || !db) return null;
  try {
    const profileSnap = await getDoc(doc(db, 'users', userId, 'routineProfile', 'main'));
    if (profileSnap.exists()) {
      return profileSnap.data() as StudentRoutineProfile;
    }
  } catch (err) {
    console.warn('getStudentRoutineProfile error:', err);
  }
  return null;
}

export async function updateStudentRoutineProfile(userId: string, data: Partial<StudentRoutineProfile>): Promise<void> {
  if (!userId || !db) return;
  try {
    await setDoc(doc(db, 'users', userId, 'routineProfile', 'main'), {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('updateStudentRoutineProfile error:', err);
  }
}
