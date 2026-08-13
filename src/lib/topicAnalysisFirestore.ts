import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AnalysisSource, TopicAnalysisRecord, StudentTopicEvidence } from '../types/topicAnalysis';
import { PHYSICS_CH4_SOURCE, PHYSICS_CH4_TOPICS } from '../data/topicAnalysisData';

/**
 * Get Analysis Source by ID
 */
export async function getAnalysisSource(sourceId: string): Promise<AnalysisSource | null> {
  if (sourceId === 'src_phys1_ch4_pdf') {
    return PHYSICS_CH4_SOURCE;
  }
  if (!db) return null;
  try {
    const docRef = doc(db, 'analysisSources', sourceId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as AnalysisSource;
    }
  } catch (err) {
    console.error('Error fetching analysis source:', err);
  }
  return null;
}

/**
 * Save / Update Analysis Source
 */
export async function saveAnalysisSource(source: AnalysisSource): Promise<boolean> {
  if (!db) return false;
  try {
    const docRef = doc(db, 'analysisSources', source.id);
    await setDoc(docRef, {
      ...source,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error saving analysis source:', err);
    return false;
  }
}

/**
 * Fetch Topic Analysis Records for a given route, subject, chapter
 */
export async function getTopicAnalysisRecords(
  route: string = 'academic',
  subjectId: string = 'phys1',
  chapterId: string = 'phys1_ch4'
): Promise<TopicAnalysisRecord[]> {
  // Default seed fallback for Physics 1st paper Ch 4
  if (subjectId === 'phys1' && (chapterId === 'phys1_ch4' || chapterId === '3')) {
    return PHYSICS_CH4_TOPICS;
  }

  if (!db) return [];

  try {
    const colRef = collection(db, 'topicAnalysis');
    const q = query(
      colRef,
      where('subjectId', '==', subjectId),
      where('chapterId', '==', chapterId)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(d => d.data() as TopicAnalysisRecord);
    }
  } catch (err) {
    console.error('Error fetching topic analysis records:', err);
  }

  return [];
}

/**
 * Save / Update Topic Analysis Record
 */
export async function saveTopicAnalysisRecord(record: TopicAnalysisRecord): Promise<boolean> {
  if (!db) return false;
  try {
    const docRef = doc(db, 'topicAnalysis', record.id);
    await setDoc(docRef, {
      ...record,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error saving topic analysis record:', err);
    return false;
  }
}

/**
 * Fetch Student Topic Evidence
 */
export async function getStudentTopicEvidence(
  userId: string | null,
  topicId: string
): Promise<StudentTopicEvidence | null> {
  if (!userId || !db) {
    // Check local storage fallback
    try {
      const key = `topic_evidence_${topicId}`;
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return null;
  }

  try {
    const docRef = doc(db, 'users', userId, 'topicEvidence', topicId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as StudentTopicEvidence;
    }
  } catch (err) {
    console.error('Error fetching student topic evidence:', err);
  }

  return null;
}

/**
 * Save Student Topic Evidence (Only when actual practice happens!)
 */
export async function saveStudentTopicEvidence(
  userId: string,
  evidence: StudentTopicEvidence
): Promise<boolean> {
  // Save local fallback first
  try {
    localStorage.setItem(`topic_evidence_${evidence.topicId}`, JSON.stringify(evidence));
  } catch (e) {
    // ignore
  }

  if (!db || !userId) return true;

  try {
    const docRef = doc(db, 'users', userId, 'topicEvidence', evidence.topicId);
    await setDoc(docRef, {
      ...evidence,
      lastPracticedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error saving student topic evidence:', err);
    return false;
  }
}
