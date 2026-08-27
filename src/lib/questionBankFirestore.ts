import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  QuestionItem,
  AssessmentBlueprint,
  QuestionReport,
  QuestionAnalytics,
  QuestionStatus,
  DeliveryFeature,
  MedicalSubject
} from '../types/questionBank';

const QUESTIONS_COLLECTION = 'questionBank';
const BLUEPRINTS_COLLECTION = 'assessmentBlueprints';
const REPORTS_COLLECTION = 'questionReports';
const ANALYTICS_COLLECTION = 'questionAnalytics';

// Fetch questions by status or filter
export async function fetchQuestions(filters?: {
  status?: QuestionStatus;
  subject?: MedicalSubject;
  feature?: DeliveryFeature;
  route?: 'medical' | 'academic' | 'varsity' | string;
}): Promise<QuestionItem[]> {
  try {
    let q = query(collection(db, QUESTIONS_COLLECTION));
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters?.subject) {
      q = query(q, where('subject', '==', filters.subject));
    }
    if (filters?.route) {
      q = query(q, where('route', '==', filters.route));
    }

    const snapshot = await getDocs(q);
    let items = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    })) as QuestionItem[];

    if (filters?.feature) {
      items = items.filter(i => i.featureTags?.includes(filters.feature!));
    }

    return items;
  } catch (err) {
    console.error('Error fetching questions:', err);
    return [];
  }
}

// Create new question (draft / in_review)
export async function saveQuestionItem(question: Partial<QuestionItem>): Promise<string> {
  const docRef = question.id
    ? doc(db, QUESTIONS_COLLECTION, question.id)
    : doc(collection(db, QUESTIONS_COLLECTION));

  const questionId = docRef.id;

  const dataToSave = {
    ...question,
    id: questionId,
    version: question.version || 1,
    route: question.route || 'academic',
    status: question.status || 'draft',
    createdAt: question.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await setDoc(docRef, dataToSave, { merge: true });
  return questionId;
}

// Batch save parsed plain text questions as Draft
export async function batchSaveDraftQuestions(items: Partial<QuestionItem>[]): Promise<number> {
  let savedCount = 0;
  for (const item of items) {
    try {
      await saveQuestionItem({
        ...item,
        status: 'draft'
      });
      savedCount++;
    } catch (err) {
      console.error('Error batch saving draft question:', err);
    }
  }
  return savedCount;
}

// Update question status (e.g., draft -> in_review -> approved / changes_requested -> published / archived)
export async function updateQuestionStatus(
  questionId: string,
  newStatus: QuestionStatus,
  reviewerEmail?: string,
  changeNote?: string
): Promise<void> {
  const docRef = doc(db, QUESTIONS_COLLECTION, questionId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error('Question not found');

  const currentData = snap.data() as QuestionItem;
  const updates: Partial<QuestionItem> = {
    status: newStatus,
    updatedAt: new Date().toISOString()
  };

  if (reviewerEmail) {
    updates.reviewedBy = reviewerEmail;
    updates.reviewedAt = new Date().toISOString();
  }

  if (newStatus === 'published') {
    updates.publishedAt = new Date().toISOString();
  }

  if (changeNote) {
    updates.changeNote = changeNote;
  }

  await updateDoc(docRef, updates);
}

// Update published question with version increment
export async function updatePublishedQuestionVersion(
  questionId: string,
  updatedFields: Partial<QuestionItem>,
  changeNote: string
): Promise<void> {
  const docRef = doc(db, QUESTIONS_COLLECTION, questionId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error('Question not found');

  const currentData = snap.data() as QuestionItem;
  const newVersion = (currentData.version || 1) + 1;

  await updateDoc(docRef, {
    ...updatedFields,
    version: newVersion,
    changeNote,
    updatedAt: new Date().toISOString()
  });
}

// Archive question
export async function archiveQuestion(questionId: string): Promise<void> {
  await updateQuestionStatus(questionId, 'archived');
}

// ASSESSMENT BLUEPRINTS
export async function fetchBlueprints(): Promise<AssessmentBlueprint[]> {
  try {
    const snapshot = await getDocs(collection(db, BLUEPRINTS_COLLECTION));
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    })) as AssessmentBlueprint[];
  } catch (err) {
    console.error('Error fetching blueprints:', err);
    return [];
  }
}

export async function saveBlueprint(blueprint: Partial<AssessmentBlueprint>): Promise<string> {
  const docRef = blueprint.id
    ? doc(db, BLUEPRINTS_COLLECTION, blueprint.id)
    : doc(collection(db, BLUEPRINTS_COLLECTION));

  const blueprintId = docRef.id;
  const data = {
    ...blueprint,
    id: blueprintId,
    route: 'medical',
    status: blueprint.status || 'draft'
  };

  await setDoc(docRef, data, { merge: true });
  return blueprintId;
}

// QUESTION REPORTS
export async function fetchQuestionReports(): Promise<QuestionReport[]> {
  try {
    const snapshot = await getDocs(collection(db, REPORTS_COLLECTION));
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    })) as QuestionReport[];
  } catch (err) {
    console.error('Error fetching question reports:', err);
    return [];
  }
}

export async function submitQuestionReport(report: Partial<QuestionReport>): Promise<string> {
  const docRef = doc(collection(db, REPORTS_COLLECTION));
  const data: QuestionReport = {
    id: docRef.id,
    questionId: report.questionId || '',
    questionVersion: report.questionVersion || 1,
    issueType: report.issueType || 'other',
    note: report.note || '',
    submittedBy: report.submittedBy || 'student',
    status: 'open',
    createdAt: new Date().toISOString()
  };
  await setDoc(docRef, data);
  return docRef.id;
}

export async function updateReportStatus(
  reportId: string,
  status: QuestionReport['status'],
  reviewerNote?: string
): Promise<void> {
  const docRef = doc(db, REPORTS_COLLECTION, reportId);
  await updateDoc(docRef, {
    status,
    reviewerNote: reviewerNote || '',
    updatedAt: new Date().toISOString()
  });
}

// QUESTION ANALYTICS
export async function getQuestionAnalytics(questionId: string): Promise<QuestionAnalytics | null> {
  try {
    const docRef = doc(db, ANALYTICS_COLLECTION, questionId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as QuestionAnalytics;
    }
    return null;
  } catch (err) {
    console.error('Error fetching analytics:', err);
    return null;
  }
}

export async function updateQuestionAnalyticsFlag(
  questionId: string,
  flag: QuestionAnalytics['reviewFlag']
): Promise<void> {
  const docRef = doc(db, ANALYTICS_COLLECTION, questionId);
  await setDoc(docRef, { reviewFlag: flag }, { merge: true });
}
