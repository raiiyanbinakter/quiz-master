import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { QuestionMediaItem, QuestionMediaPlacement, QuestionItem } from '../types/questionBank';
import { slugifyText } from '../utils/questionParser';

export const PLACEMENT_BANGLA_LABELS: Record<QuestionMediaPlacement, string> = {
  question: 'প্রশ্নের চিত্র',
  stimulus: 'উদ্দীপকের চিত্র',
  option_a: 'অপশন ক-এর চিত্র',
  option_b: 'অপশন খ-এর চিত্র',
  option_c: 'অপশন গ-এর চিত্র',
  option_d: 'অপশন ঘ-এর চিত্র',
  explanation: 'ব্যাখ্যার চিত্র'
};

export const PLACEMENT_MISSING_BANGLA_LABELS: Record<QuestionMediaPlacement, string> = {
  question: 'প্রশ্নের চিত্র প্রয়োজন',
  stimulus: 'উদ্দীপকের চিত্র প্রয়োজন',
  option_a: 'অপশন ক-এর চিত্র প্রয়োজন',
  option_b: 'অপশন খ-এর চিত্র প্রয়োজন',
  option_c: 'অপশন গ-এর চিত্র প্রয়োজন',
  option_d: 'অপশন ঘ-এর চিত্র প্রয়োজন',
  explanation: 'ব্যাখ্যার চিত্র প্রয়োজন'
};

export const ALL_QUESTION_MEDIA_PLACEMENTS: QuestionMediaPlacement[] = [
  'question',
  'stimulus',
  'option_a',
  'option_b',
  'option_c',
  'option_d',
  'explanation'
];

export function getPlacementBanglaLabel(placement: QuestionMediaPlacement): string {
  return PLACEMENT_BANGLA_LABELS[placement] || 'চিত্র';
}

export function getPlacementMissingBanglaLabel(placement: QuestionMediaPlacement): string {
  return PLACEMENT_MISSING_BANGLA_LABELS[placement] || 'চিত্র প্রয়োজন';
}

// Type for a unified question that needs an image
export interface QuestionNeedingImage {
  stableKey: string;
  questionKey?: string;
  questionId: string | number;
  sourceType: string;
  route: string;
  subject: string;
  subjectLabel?: string;
  paper?: string;
  paperLabel?: string;
  chapterId?: string;
  chapterName: string;
  topicId?: string;
  topicName?: string;
  teacher?: string;
  sourceSetLabel?: string;
  sourceQuestionNumber?: string | number;
  stem: string;
  stimulus?: string;
  explanation?: string;
  options?: string[];
  correctOption?: string;
  status: 'image_missing' | 'image_uploaded';
  attachedMedia?: QuestionMediaItem[];
  stemImageUrl?: string;
  altText?: string;
  rawItem?: any;
  requiredPlacements?: QuestionMediaPlacement[];
  missingPlacements?: QuestionMediaPlacement[];
  stimulusGroupKey?: string;
  isSharedStimulusMember?: boolean;
}

export interface SharedStimulusGroup {
  groupKey: string; // e.g. 'academic_ict_ch3_type02_stimulus_28_29'
  title: string; // e.g. 'উদ্দীপক চিত্র: প্রশ্ন 28–29'
  stimulusText: string;
  route: string;
  subject: string;
  subjectLabel?: string;
  paper?: string;
  paperLabel?: string;
  chapterName: string;
  topicName?: string;
  memberQuestionKeys: string[];
  memberQuestionNumbers: (string | number)[];
  media?: QuestionMediaItem[];
  status: 'image_missing' | 'image_uploaded';
  updatedAt?: string;
  updatedBy?: string;
}

export interface QuestionMediaOverrideRecord {
  questionKey?: string;
  stableKey: string;
  questionId?: string | number;
  route?: string;
  subject?: string;
  paper?: string;
  chapterId?: string;
  chapterName?: string;
  topicId?: string;
  topicName?: string;
  teacher?: string;
  sourceQuestionNumber?: string | number;
  media: QuestionMediaItem[];
  requirements?: QuestionMediaPlacement[];
  stemImageUrl?: string;
  altText?: string;
  updatedAt: string;
  updatedBy: string;
}

const OVERRIDES_COLLECTION = 'questionMediaOverrides';
const LOCAL_STORAGE_KEY = 'question_media_overrides_v2';

// In-memory cache for ultra-fast lookup during student quiz sessions
let memoryOverridesCache: Record<string, QuestionMediaOverrideRecord> | null = null;

/**
 * Format helper for canonical topic slugs (e.g. Type 02 -> type02)
 */
function normalizeTopicSlug(topicStr?: string): string {
  if (!topicStr) return 'general';
  const clean = topicStr.trim();
  const typeMatch = clean.match(/(?:type|টাইপ|টপিক|topic)\s*[:_-]?\s*0?(\d+)/i) || clean.match(/^0?(\d+)[.\s]/);
  if (typeMatch) {
    const num = parseInt(typeMatch[1], 10);
    return `type${num < 10 ? '0' + num : num}`;
  }
  return slugifyText(clean) || 'general';
}

/**
 * Format helper for canonical chapter slugs (e.g. অধ্যায় ৩ -> ch3)
 */
function normalizeChapterSlug(chapStr?: string): string {
  if (!chapStr) return 'ch_general';
  const chapMatch = chapStr.match(/(?:অধ্যায়|অধ্যায়|chapter|ch)\s*[:_-]?\s*0?(\d+)/i) || chapStr.match(/(\d+)/);
  if (chapMatch) {
    return `ch${chapMatch[1]}`;
  }
  return slugifyText(chapStr) || 'ch_general';
}

/**
 * Format helper for canonical question number (e.g. 19 -> q019, 256 -> q256)
 */
function normalizeQNumSlug(qNum?: number | string): string {
  if (qNum === undefined || qNum === null || qNum === '') return 'q';
  const num = parseInt(String(qNum).replace(/[^\d]/g, ''), 10);
  if (!isNaN(num)) {
    return `q${num < 100 ? (num < 10 ? '00' + num : '0' + num) : num}`;
  }
  return slugifyText(String(qNum)) || 'q';
}

/**
 * Generate a canonical stable key following the rule:
 * route_subject_paper_chapter_topic_teacher_sourceQuestionNumber
 * Example: academic_ict_ch3_type02_q019
 */
export function getStableQuestionKey(q: {
  id?: string | number;
  questionKey?: string;
  stableKey?: string;
  route?: string;
  subject?: string;
  paper?: string;
  chapterId?: string;
  chapterName?: string;
  topicId?: string;
  topicName?: string;
  topic?: string;
  teacher?: string;
  sourceSet?: string;
  sourceQuestionNumber?: number | string;
  stem?: string;
  question_text?: string;
}): string {
  if (q.questionKey) return q.questionKey.trim().toLowerCase();
  if (q.stableKey) return q.stableKey.trim().toLowerCase();

  const route = slugifyText(q.route || 'academic') || 'academic';
  const subject = slugifyText(q.subject || 'general') || 'general';
  const chapter = normalizeChapterSlug(q.chapterId || q.chapterName || 'ch_general');
  const topic = normalizeTopicSlug(q.topicId || q.topicName || q.topic || 'general');
  const qNum = normalizeQNumSlug(q.sourceQuestionNumber ?? q.id);

  // Short canonical format: academic_ict_ch3_type02_q019
  const shortCanonical = `${route}_${subject}_${chapter}_${topic}_${qNum}`
    .replace(/[^a-zA-Z0-9_\u0980-\u09FF-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();

  return shortCanonical;
}

/**
 * Generate alternative alias keys for a question to guarantee lookup match
 */
export function getQuestionKeyAliases(q: any): string[] {
  const aliases = new Set<string>();
  const canonical = getStableQuestionKey(q);
  aliases.add(canonical);

  if (q.id !== undefined) aliases.add(String(q.id).toLowerCase());
  if (q.sourceQuestionNumber !== undefined) aliases.add(String(q.sourceQuestionNumber).toLowerCase());
  if (q.questionKey) aliases.add(q.questionKey.toLowerCase());
  if (q.stableKey) aliases.add(q.stableKey.toLowerCase());

  // Legacy format: route__subject__paper__chapter__topic__teacher__id
  const route = slugifyText(q.route || 'academic') || 'academic';
  const subject = slugifyText(q.subject || 'general') || 'general';
  const paper = slugifyText(q.paper || 'first') || 'first';
  const chapter = slugifyText(q.chapterId || q.chapterName || 'general') || 'general';
  const topic = slugifyText(q.topicId || q.topicName || q.topic || 'general') || 'general';
  const teacher = slugifyText(q.teacher || q.sourceSet || 'general') || 'general';
  const idPart = String(q.id ?? q.sourceQuestionNumber ?? 'q');

  const legacyKey = `${route}__${subject}__${paper}__${chapter}__${topic}__${teacher}__${idPart}`
    .replace(/[^a-zA-Z0-9_\u0980-\u09FF-]/g, '_')
    .toLowerCase();
  aliases.add(legacyKey);

  // Numerical unpadded alias (e.g. academic_ict_ch3_type02_q19)
  const rawNum = String(q.sourceQuestionNumber ?? q.id ?? '').replace(/[^\d]/g, '');
  if (rawNum) {
    aliases.add(`${route}_${subject}_${normalizeChapterSlug(q.chapterName)}_type02_q${rawNum}`);
    aliases.add(`${route}_${subject}_${normalizeChapterSlug(q.chapterName)}_q${rawNum}`);
    aliases.add(`${subject}_${normalizeChapterSlug(q.chapterName)}_q${rawNum}`);
    aliases.add(`${subject}_${normalizeChapterSlug(q.chapterName)}_${rawNum}`);
  }

  return Array.from(aliases);
}

/**
 * Fetch all media overrides from Firestore with local storage & memory caching
 */
export async function fetchQuestionMediaOverrides(): Promise<Record<string, QuestionMediaOverrideRecord>> {
  if (memoryOverridesCache) {
    return memoryOverridesCache;
  }

  // Check LocalStorage cache first
  const localCache: Record<string, QuestionMediaOverrideRecord> = {};
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('question_media_overrides_v1');
      if (stored) {
        Object.assign(localCache, JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read local media overrides cache', e);
    }
  }

  try {
    const snap = await getDocs(collection(db, OVERRIDES_COLLECTION));
    const firestoreData: Record<string, QuestionMediaOverrideRecord> = {};
    snap.docs.forEach((docSnap) => {
      const data = docSnap.data() as QuestionMediaOverrideRecord;
      firestoreData[docSnap.id] = {
        ...data,
        stableKey: data.stableKey || docSnap.id,
        questionKey: data.questionKey || data.stableKey || docSnap.id
      };
    });

    const merged = { ...localCache, ...firestoreData };
    memoryOverridesCache = merged;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
      } catch (err) {
        console.warn('Could not update local media overrides cache', err);
      }
    }

    return merged;
  } catch (error) {
    console.warn('Error fetching Firestore question media overrides, using local cache:', error);
    memoryOverridesCache = localCache;
    return localCache;
  }
}

/**
 * Save a question media override to Firestore and update cache.
 * Follows the requirement: /questionMediaOverrides/{stableQuestionKey}
 * Fields: { questionKey, stableKey, media: [], requirements: [], updatedAt, updatedBy }
 */
export async function saveQuestionMediaOverride(
  stableKey: string,
  mediaItemOrList: QuestionMediaItem | QuestionMediaItem[],
  metadata?: Partial<QuestionNeedingImage>,
  userEmail: string = 'admin'
): Promise<void> {
  const existingRecord = memoryOverridesCache ? memoryOverridesCache[stableKey] : undefined;
  const existingMediaList: QuestionMediaItem[] = existingRecord?.media || [];

  let finalMediaList: QuestionMediaItem[] = [];

  if (Array.isArray(mediaItemOrList)) {
    finalMediaList = mediaItemOrList;
  } else {
    const item = mediaItemOrList;
    const targetPlacement = item.placement || 'question';
    const otherItems = existingMediaList.filter(m => (m.placement || 'question') !== targetPlacement);
    finalMediaList = [...otherItems, item];
  }

  const questionItem = finalMediaList.find(m => (m.placement || 'question') === 'question');
  const requiredPlacements = metadata?.requiredPlacements || detectRequiredPlacements(metadata?.rawItem || metadata);

  const record: QuestionMediaOverrideRecord = {
    questionKey: stableKey,
    stableKey,
    questionId: metadata?.questionId || existingRecord?.questionId,
    route: metadata?.route || existingRecord?.route,
    subject: metadata?.subject || existingRecord?.subject,
    paper: metadata?.paper || existingRecord?.paper,
    chapterId: metadata?.chapterId || existingRecord?.chapterId,
    chapterName: metadata?.chapterName || existingRecord?.chapterName,
    topicId: metadata?.topicId || existingRecord?.topicId,
    topicName: metadata?.topicName || existingRecord?.topicName,
    teacher: metadata?.teacher || existingRecord?.teacher,
    sourceQuestionNumber: metadata?.sourceQuestionNumber || existingRecord?.sourceQuestionNumber,
    media: finalMediaList,
    requirements: requiredPlacements,
    stemImageUrl: questionItem?.url || finalMediaList[0]?.url,
    altText: questionItem?.altText || finalMediaList[0]?.altText || '',
    updatedAt: new Date().toISOString(),
    updatedBy: userEmail
  };

  // Update memory & local storage immediately
  if (!memoryOverridesCache) {
    memoryOverridesCache = {};
  }
  memoryOverridesCache[stableKey] = record;

  // Also mirror aliases in memory cache for instant lookup
  if (metadata) {
    const aliases = getQuestionKeyAliases(metadata);
    aliases.forEach((alias) => {
      if (alias && memoryOverridesCache) {
        memoryOverridesCache[alias] = record;
      }
    });
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memoryOverridesCache));
    } catch (e) {
      console.warn('Could not persist to local storage', e);
    }
  }

  // Persist to Firestore
  try {
    const docRef = doc(db, OVERRIDES_COLLECTION, stableKey);
    await setDoc(docRef, record, { merge: true });
  } catch (err) {
    console.warn('Firestore setDoc failed for questionMediaOverrides, fallback local saved:', err);
  }
}

/**
 * Remove a single placement or all overrides for a question
 */
export async function deleteQuestionMediaOverride(
  stableKey: string,
  placementToRemove?: QuestionMediaPlacement
): Promise<void> {
  if (placementToRemove) {
    const existing = memoryOverridesCache ? memoryOverridesCache[stableKey] : undefined;
    if (existing && existing.media) {
      const remaining = existing.media.filter(m => (m.placement || 'question') !== placementToRemove);
      if (remaining.length > 0) {
        await saveQuestionMediaOverride(stableKey, remaining);
        return;
      }
    }
  }

  if (memoryOverridesCache) {
    delete memoryOverridesCache[stableKey];
  }
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memoryOverridesCache || {}));
    } catch (e) {
      console.warn(e);
    }
  }

  try {
    const docRef = doc(db, OVERRIDES_COLLECTION, stableKey);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Error deleting override from Firestore:', err);
  }
}

/**
 * Helper to check whether any text contains generic or placement-specific image placeholder
 */
export function hasImagePlaceholderText(text?: string | null): boolean {
  if (!text) return false;
  return (
    text.includes('[এখানে চিত্র ছিল]') ||
    text.includes('[এখানে চিত্র ছিল ]') ||
    text.includes('(এখানে চিত্র ছিল)') ||
    text.includes('[প্রশ্নে চিত্র ছিল]') ||
    text.includes('[উদ্দীপকে চিত্র ছিল]') ||
    text.includes('[চিত্র ছিল]') ||
    text.includes('[IMAGE_PLACEHOLDER]') ||
    text.includes('[অপশন ক-তে চিত্র ছিল]') ||
    text.includes('[অপশন ক তে চিত্র ছিল]') ||
    text.includes('[অপশন খ-তে চিত্র ছিল]') ||
    text.includes('[অপশন খ তে চিত্র ছিল]') ||
    text.includes('[অপশন গ-তে চিত্র ছিল]') ||
    text.includes('[অপশন গ তে চিত্র ছিল]') ||
    text.includes('[অপশন ঘ-তে চিত্র ছিল]') ||
    text.includes('[অপশন ঘ তে চিত্র ছিল]') ||
    text.includes('[ক তে চিত্র ছিল]') ||
    text.includes('[খ তে চিত্র ছিল]') ||
    text.includes('[গ তে চিত্র ছিল]') ||
    text.includes('[ঘ তে চিত্র ছিল]') ||
    text.includes('[ব্যাখ্যায় চিত্র ছিল]') ||
    text.includes('[ব্যাখ্যায় চিত্র ছিল]') ||
    text.includes('[ব্যাখ্যার চিত্র ছিল]')
  );
}

/**
 * Detect which placements require an image for a question based on its text, options, stimulus, and explanation
 */
export function detectRequiredPlacements(question: any): QuestionMediaPlacement[] {
  if (!question) return [];
  const required = new Set<QuestionMediaPlacement>();

  const stem = (question.stem || question.question_text || question.question || '').toString();
  const stimulus = (question.stimulus || question.context || question.passage || question.stem_context || '').toString();
  const shortExp = (question.explanation?.shortExplanation || question.shortExplanation || '').toString();
  const detExp = (question.explanation?.detailedExplanation || question.detailedExplanation || '').toString();
  const rawExp = (typeof question.explanation === 'string' ? question.explanation : '').toString();
  const allExpText = `${shortExp} ${detExp} ${rawExp}`;

  // 1. Stimulus / Uddipak check
  if (
    stimulus.includes('[এখানে চিত্র ছিল]') ||
    stimulus.includes('[উদ্দীপকে চিত্র ছিল]') ||
    stimulus.includes('[চিত্র ছিল]') ||
    stem.includes('[উদ্দীপকে চিত্র ছিল]') ||
    stem.includes('উদ্দীপকের চিত্র') ||
    question.requiresStimulusImage
  ) {
    required.add('stimulus');
  }

  // 2. Question stem check
  if (
    stem.includes('[এখানে চিত্র ছিল]') ||
    stem.includes('[প্রশ্নে চিত্র ছিল]') ||
    stem.includes('[চিত্র ছিল]') ||
    stem.includes('[IMAGE_PLACEHOLDER]') ||
    question.requiresImage ||
    question.hasImagePlaceholder
  ) {
    required.add('question');
  }

  // 3. Explanation check
  if (
    allExpText.includes('[ব্যাখ্যায় চিত্র ছিল]') ||
    allExpText.includes('[ব্যাখ্যায় চিত্র ছিল]') ||
    allExpText.includes('[ব্যাখ্যার চিত্র ছিল]') ||
    allExpText.includes('[এখানে চিত্র ছিল]') ||
    allExpText.includes('[IMAGE_PLACEHOLDER]')
  ) {
    required.add('explanation');
  }

  // 4. Options check
  if (Array.isArray(question.options)) {
    question.options.forEach((opt: any, idx: number) => {
      const optText = (typeof opt === 'string' ? opt : (opt?.text || '')).toString();
      const optId = (typeof opt === 'object' && opt?.id ? String(opt.id).toUpperCase() : '');

      const isKaOrA = optId === 'A' || optId === '1' || idx === 0 || optText.includes('অপশন ক') || optText.includes('অপশন A');
      const isKhaOrB = optId === 'B' || optId === '2' || idx === 1 || optText.includes('অপশন খ') || optText.includes('অপশন B');
      const isGaOrC = optId === 'C' || optId === '3' || idx === 2 || optText.includes('অপশন গ') || optText.includes('অপশন C');
      const isGhaOrD = optId === 'D' || optId === '4' || idx === 3 || optText.includes('অপশন ঘ') || optText.includes('অপশন D');

      if (
        optText.includes('[অপশন ক-তে চিত্র ছিল]') ||
        optText.includes('[অপশন ক তে চিত্র ছিল]') ||
        optText.includes('[অপশন ক এ চিত্র ছিল]') ||
        optText.includes('[ক তে চিত্র ছিল]') ||
        (isKaOrA && optText.includes('[এখানে চিত্র ছিল]'))
      ) {
        required.add('option_a');
      }

      if (
        optText.includes('[অপশন খ-তে চিত্র ছিল]') ||
        optText.includes('[অপশন খ তে চিত্র ছিল]') ||
        optText.includes('[অপশন খ এ চিত্র ছিল]') ||
        optText.includes('[খ তে চিত্র ছিল]') ||
        (isKhaOrB && optText.includes('[এখানে চিত্র ছিল]'))
      ) {
        required.add('option_b');
      }

      if (
        optText.includes('[অপশন গ-তে চিত্র ছিল]') ||
        optText.includes('[অপশন গ তে চিত্র ছিল]') ||
        optText.includes('[অপশন গ এ চিত্র ছিল]') ||
        optText.includes('[গ তে চিত্র ছিল]') ||
        (isGaOrC && optText.includes('[এখানে চিত্র ছিল]'))
      ) {
        required.add('option_c');
      }

      if (
        optText.includes('[অপশন ঘ-তে চিত্র ছিল]') ||
        optText.includes('[অপশন ঘ তে চিত্র ছিল]') ||
        optText.includes('[অপশন ঘ এ চিত্র ছিল]') ||
        optText.includes('[ঘ তে চিত্র ছিল]') ||
        (isGhaOrD && optText.includes('[এখানে চিত্র ছিল]'))
      ) {
        required.add('option_d');
      }
    });
  }

  // Also check raw stem for options or explanation placeholder tags
  if (stem.includes('[অপশন ক-তে চিত্র ছিল]') || stem.includes('[অপশন ক তে চিত্র ছিল]')) required.add('option_a');
  if (stem.includes('[অপশন খ-তে চিত্র ছিল]') || stem.includes('[অপশন খ তে চিত্র ছিল]')) required.add('option_b');
  if (stem.includes('[অপশন গ-তে চিত্র ছিল]') || stem.includes('[অপশন গ তে চিত্র ছিল]')) required.add('option_c');
  if (stem.includes('[অপশন ঘ-তে চিত্র ছিল]') || stem.includes('[অপশন ঘ তে চিত্র ছিল]')) required.add('option_d');
  if (stem.includes('[ব্যাখ্যায় চিত্র ছিল]') || stem.includes('[ব্যাখ্যায় চিত্র ছিল]')) required.add('explanation');

  // Fallback: If hasPlaceholder is true and set is empty, default to 'question'
  if (required.size === 0 && (hasImagePlaceholderText(stem) || question.hasImagePlaceholder || question.requiresImage)) {
    required.add('question');
  }

  return Array.from(required);
}

/**
 * Detect which placements are currently MISSING images
 */
export function detectMissingPlacements(
  question: any,
  mediaList: QuestionMediaItem[] = []
): QuestionMediaPlacement[] {
  const required = detectRequiredPlacements(question);
  const presentPlacements = new Set(
    mediaList
      .filter(m => Boolean(m.url))
      .map(m => m.placement || 'question')
  );

  return required.filter(p => !presentPlacements.has(p));
}

/**
 * Clean student-facing text by removing any raw image placeholder tags
 */
export function cleanStudentFacingText(text?: string | null): string {
  if (!text) return '';
  return text
    .replace(/\[\s*এখানে\s*চিত্র\s*ছিল\s*\]/gi, '')
    .replace(/\(\s*এখানে\s*চিত্র\s*ছিল\s*\)/gi, '')
    .replace(/\[\s*প্রশ্নে\s*চিত্র\s*ছিল\s*\]/gi, '')
    .replace(/\[\s*উদ্দীপকে\s*চিত্র\s*ছিল\s*\]/gi, '')
    .replace(/\[\s*চিত্র\s*ছিল\s*\]/gi, '')
    .replace(/\[\s*IMAGE_PLACEHOLDER\s*\]/gi, '')
    .replace(/\[\s*অপশন\s*(?:ক|খ|গ|ঘ|[A-D])\s*[-–—]?\s*(?:তে|এ|এর)?\s*চিত্র\s*ছিল\s*\]/gi, '')
    .replace(/\[\s*(?:ক|খ|গ|ঘ|[A-D])\s*[-–—]?\s*(?:তে|এ)?\s*চিত্র\s*ছিল\s*\]/gi, '')
    .replace(/\[\s*ব্যাখ্যা(?:য়|য়|র)?\s*চিত্র\s*ছিল\s*\]/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Resolves question media runtime state for student quiz views, result reviews, and admin inspection
 */
export function resolveQuestionMediaState(
  question: any,
  overridesMap?: Record<string, QuestionMediaOverrideRecord> | null
): {
  mediaList: QuestionMediaItem[];
  questionMedia?: QuestionMediaItem;
  stimulusMedia?: QuestionMediaItem;
  optionAMedia?: QuestionMediaItem;
  optionBMedia?: QuestionMediaItem;
  optionCMedia?: QuestionMediaItem;
  optionDMedia?: QuestionMediaItem;
  explanationMedia?: QuestionMediaItem;
  getMediaForPlacement: (placement: QuestionMediaPlacement) => QuestionMediaItem | undefined;
  getOptionMedia: (optionIdOrIndex: string | number) => QuestionMediaItem | undefined;
  imageUrl?: string;
  stimulusImageUrl?: string;
  altText?: string;
  hasPlaceholder: boolean;
  needsImage: boolean;
  requiredPlacements: QuestionMediaPlacement[];
  missingPlacements: QuestionMediaPlacement[];
  cleanStem: string;
  cleanStimulus?: string;
  cleanExplanation?: string;
  cleanOptionText: (text: string) => string;
} {
  const stem = question?.stem || question?.question_text || '';
  const stimulus = question?.stimulus || question?.context || question?.passage || '';
  const explanation = question?.explanation?.shortExplanation || (typeof question?.explanation === 'string' ? question.explanation : '');
  
  // Lookup overrides using canonical key and all aliases
  const stableKey = getStableQuestionKey(question);
  const aliases = getQuestionKeyAliases(question);
  
  let override: QuestionMediaOverrideRecord | undefined = undefined;
  if (overridesMap) {
    for (const key of aliases) {
      if (overridesMap[key]) {
        override = overridesMap[key];
        break;
      }
    }
  }

  if (!override && memoryOverridesCache) {
    for (const key of aliases) {
      if (memoryOverridesCache[key]) {
        override = memoryOverridesCache[key];
        break;
      }
    }
  }

  // Also check if question belongs to a shared stimulus group override
  const stimulusGroupKey = question?.stimulusGroupKey || (question?.sourceQuestionNumber >= 28 && question?.sourceQuestionNumber <= 29 ? 'academic_ict_ch3_type02_stimulus_28_29' : undefined);
  let stimulusGroupOverride: QuestionMediaOverrideRecord | undefined = undefined;
  if (stimulusGroupKey) {
    stimulusGroupOverride = overridesMap?.[stimulusGroupKey] || memoryOverridesCache?.[stimulusGroupKey];
  }

  let combinedMedia: QuestionMediaItem[] = [];
  if (Array.isArray(question?.media) && question.media.length > 0) {
    combinedMedia = [...question.media];
  }

  // If question has legacy stemImageUrl or image property, map to a question media item
  const legacyQuestionUrl = question?.stemImageUrl || question?.image || (question as any)?.imageUrl;
  if (legacyQuestionUrl && !combinedMedia.some(m => (m.placement || 'question') === 'question')) {
    combinedMedia.push({
      id: `legacy_${stableKey}_question`,
      placement: 'question',
      type: 'diagram',
      storagePath: '',
      url: legacyQuestionUrl,
      altText: question?.altText || 'Question diagram',
      fileName: 'diagram.png',
      uploadedBy: 'system',
      uploadedAt: new Date().toISOString()
    });
  }

  // Merge in overrides for missing placements
  if (override?.media && override.media.length > 0) {
    override.media.forEach(ovItem => {
      const p = ovItem.placement || 'question';
      if (!combinedMedia.some(m => (m.placement || 'question') === p)) {
        combinedMedia.push(ovItem);
      }
    });
  } else if (override?.stemImageUrl && !combinedMedia.some(m => (m.placement || 'question') === 'question')) {
    combinedMedia.push({
      id: `override_${stableKey}_question`,
      placement: 'question',
      type: 'diagram',
      storagePath: '',
      url: override.stemImageUrl,
      altText: override.altText || 'Question diagram',
      fileName: 'diagram.png',
      uploadedBy: override.updatedBy || 'admin',
      uploadedAt: override.updatedAt || new Date().toISOString()
    });
  }

  // Merge in stimulus group media if present
  if (stimulusGroupOverride?.media && stimulusGroupOverride.media.length > 0) {
    const stimItem = stimulusGroupOverride.media.find(m => (m.placement || 'question') === 'stimulus') || stimulusGroupOverride.media[0];
    if (stimItem && !combinedMedia.some(m => (m.placement || 'question') === 'stimulus')) {
      combinedMedia.push({
        ...stimItem,
        placement: 'stimulus'
      });
    }
  }

  const getMediaForPlacement = (placement: QuestionMediaPlacement): QuestionMediaItem | undefined => {
    return combinedMedia.find(m => (m.placement || 'question') === placement);
  };

  const getOptionMedia = (optionIdOrIndex: string | number): QuestionMediaItem | undefined => {
    let placement: QuestionMediaPlacement = 'option_a';
    if (typeof optionIdOrIndex === 'number') {
      if (optionIdOrIndex === 0) placement = 'option_a';
      else if (optionIdOrIndex === 1) placement = 'option_b';
      else if (optionIdOrIndex === 2) placement = 'option_c';
      else if (optionIdOrIndex === 3) placement = 'option_d';
      else placement = 'option_a';
    } else {
      const idStr = String(optionIdOrIndex).toUpperCase().trim();
      if (idStr === 'A' || idStr === 'ক' || idStr === '0') placement = 'option_a';
      else if (idStr === 'B' || idStr === 'খ' || idStr === '1') placement = 'option_b';
      else if (idStr === 'C' || idStr === 'গ' || idStr === '2') placement = 'option_c';
      else if (idStr === 'D' || idStr === 'ঘ' || idStr === '3') placement = 'option_d';
    }
    return getMediaForPlacement(placement);
  };

  const questionMedia = getMediaForPlacement('question');
  const stimulusMedia = getMediaForPlacement('stimulus');
  const optionAMedia = getMediaForPlacement('option_a');
  const optionBMedia = getMediaForPlacement('option_b');
  const optionCMedia = getMediaForPlacement('option_c');
  const optionDMedia = getMediaForPlacement('option_d');
  const explanationMedia = getMediaForPlacement('explanation');

  const requiredPlacements = detectRequiredPlacements(question);
  const missingPlacements = detectMissingPlacements(question, combinedMedia);
  const hasPlaceholder = requiredPlacements.length > 0 || hasImagePlaceholderText(stem) || hasImagePlaceholderText(stimulus) || hasImagePlaceholderText(explanation);
  const needsImage = missingPlacements.length > 0;

  return {
    mediaList: combinedMedia,
    questionMedia,
    stimulusMedia,
    optionAMedia,
    optionBMedia,
    optionCMedia,
    optionDMedia,
    explanationMedia,
    getMediaForPlacement,
    getOptionMedia,
    imageUrl: questionMedia?.url,
    stimulusImageUrl: stimulusMedia?.url,
    altText: questionMedia?.altText || stimulusMedia?.altText || 'Question Diagram',
    hasPlaceholder,
    needsImage,
    requiredPlacements,
    missingPlacements,
    cleanStem: cleanStudentFacingText(stem),
    cleanStimulus: stimulus ? cleanStudentFacingText(stimulus) : undefined,
    cleanExplanation: explanation ? cleanStudentFacingText(explanation) : undefined,
    cleanOptionText: (text: string) => cleanStudentFacingText(text)
  };
}

/**
 * Helper to save a shared stimulus media override across a group of linked questions
 */
export async function saveSharedStimulusMediaOverride(
  groupKey: string,
  mediaItem: QuestionMediaItem,
  memberQuestionKeys: string[],
  userEmail: string = 'admin'
): Promise<void> {
  const stimulusItem: QuestionMediaItem = {
    ...mediaItem,
    placement: 'stimulus'
  };

  // 1. Save under the groupKey record
  await saveQuestionMediaOverride(
    groupKey,
    [stimulusItem],
    {
      questionKey: groupKey,
      stableKey: groupKey,
      route: 'academic',
      subject: 'ict',
      chapterName: 'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস',
      topicName: 'বিভিন্ন সংখ্যা পদ্ধতির আন্তঃরূপান্তর',
      requiredPlacements: ['stimulus']
    },
    userEmail
  );

  // 2. Attach to each member question's override record
  for (const qKey of memberQuestionKeys) {
    const existing = memoryOverridesCache?.[qKey];
    const existingMedia = existing?.media || [];
    const otherMedia = existingMedia.filter(m => (m.placement || 'question') !== 'stimulus');
    const updatedMedia = [...otherMedia, stimulusItem];

    await saveQuestionMediaOverride(
      qKey,
      updatedMedia,
      {
        questionKey: qKey,
        stableKey: qKey,
        requiredPlacements: existing?.requirements || ['stimulus']
      },
      userEmail
    );
  }
}

/**
 * Scan all Academic, Medical, Varsity, and Static Question Datasets dynamically
 */
export async function getKnownStaticQuestionsNeedingImage(): Promise<QuestionNeedingImage[]> {
  const { scanAllDatasetsForImageRequirements } = await import('../utils/questionMediaScanner');
  const detected = await scanAllDatasetsForImageRequirements([]);
  return detected as QuestionNeedingImage[];
}

/**
 * Collect all questions from Firestore and Static datasets that need images,
 * cross-referenced against current overrides and specific required placements.
 */
export async function fetchAllQuestionsNeedingImage(
  firestoreQuestions: QuestionItem[] = []
): Promise<QuestionNeedingImage[]> {
  const overridesMap = await fetchQuestionMediaOverrides();
  const { scanAllDatasetsForImageRequirements } = await import('../utils/questionMediaScanner');
  const detectedList = await scanAllDatasetsForImageRequirements(firestoreQuestions);

  const results: QuestionNeedingImage[] = detectedList.map((item) => {
    const override = overridesMap[item.stableKey] || (item.questionKey ? overridesMap[item.questionKey] : undefined);
    
    // Combine attached media with overrides
    const attachedMedia: QuestionMediaItem[] = [];
    if (item.attachedMedia) attachedMedia.push(...item.attachedMedia);
    if (override?.media) {
      override.media.forEach((ov) => {
        if (!attachedMedia.some((m) => (m.placement || 'question') === (ov.placement || 'question'))) {
          attachedMedia.push(ov);
        }
      });
    }

    const presentPlacements = new Set(
      attachedMedia.filter((m) => Boolean(m.url)).map((m) => m.placement || 'question')
    );
    const missingPlacements = item.requiredPlacements.filter((p) => !presentPlacements.has(p));
    const isUploaded = missingPlacements.length === 0 && attachedMedia.length > 0;

    return {
      ...item,
      status: isUploaded ? 'image_uploaded' : 'image_missing',
      attachedMedia,
      stemImageUrl: override?.stemImageUrl || attachedMedia.find((m) => (m.placement || 'question') === 'question')?.url,
      altText: override?.altText || attachedMedia[0]?.altText,
      missingPlacements
    };
  });

  return results;
}
