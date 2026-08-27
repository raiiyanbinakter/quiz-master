/**
 * Dynamic Universal Question Media Scanner
 *
 * Scans all available static datasets in src/data and live Firestore question records,
 * runs the pure getQuestionMediaRequirements detection engine, generates stable keys,
 * and extracts all metadata without hardcoding question IDs, numbers, or totals.
 */

import { getQuestionMediaRequirements, MediaRequirement, MediaPlacement } from './questionMediaRequirements';
import { getStableQuestionKey } from '../lib/questionMediaOverrides';
import { QuestionItem, QuestionMediaItem, QuestionMediaPlacement } from '../types/questionBank';
import { getAllNormalizedQuestions } from './getAllNormalizedQuestions';

export interface DetectedQuestionItem {
  stableKey: string;
  questionKey: string;
  questionId: string | number;
  sourceType: string;
  route: string;
  subject: string;
  subjectLabel?: string;
  paper: string;
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
  requiredPlacements: QuestionMediaPlacement[];
  missingPlacements: QuestionMediaPlacement[];
  detectedRequirements: MediaRequirement[];
  isSharedStimulusMember?: boolean;
  stimulusGroupKey?: string;
}

/**
 * Maps MediaPlacement to QuestionMediaPlacement
 */
export function mapMediaPlacementToQuestionMediaPlacement(p: MediaPlacement): QuestionMediaPlacement {
  if (p === 'option_e') {
    // QuestionMediaPlacement uses option_d or question if 5th option
    return 'option_d';
  }
  return p as QuestionMediaPlacement;
}

/**
 * Normalizes any static or runtime question into standard fields for detection
 */
export function normalizeQuestionForScan(
  rawQ: any,
  meta: {
    route: string;
    subject: string;
    subjectLabel?: string;
    paper?: string;
    paperLabel?: string;
    chapterName: string;
    chapterId?: string;
    topicName?: string;
    topicId?: string;
    teacher?: string;
    sourceSetLabel?: string;
    sourceType: DetectedQuestionItem['sourceType'];
  }
): DetectedQuestionItem | null {
  if (!rawQ || typeof rawQ !== 'object') return null;

  const stem = String(
    rawQ.question_text ??
    rawQ.stem ??
    rawQ.question ??
    rawQ.title ??
    ''
  ).trim();

  const stimulus = rawQ.stimulus ?? rawQ.context ?? rawQ.passage ?? rawQ.stem_context ?? undefined;

  let shortExp = '';
  let detailedExp = '';
  if (typeof rawQ.explanation === 'string') {
    detailedExp = rawQ.explanation;
  } else if (rawQ.explanation && typeof rawQ.explanation === 'object') {
    shortExp = rawQ.explanation.shortExplanation || '';
    detailedExp = rawQ.explanation.detailedExplanation || '';
  }
  if (rawQ.shortExplanation) shortExp = rawQ.shortExplanation;
  if (rawQ.detailedExplanation) detailedExp = rawQ.detailedExplanation;

  let optionsList: string[] = [];
  if (Array.isArray(rawQ.options)) {
    optionsList = rawQ.options.map((opt: any) => {
      if (typeof opt === 'string') return opt;
      if (opt && typeof opt === 'object') return opt.text || opt.optionText || '';
      return String(opt || '');
    });
  }

  const rawId = rawQ.id ?? rawQ.sourceQuestionNumber ?? rawQ.questionId;

  // Build normalized test question for detection engine
  const questionForEngine = {
    id: rawId,
    questionText: stem,
    stimulus: stimulus || undefined,
    options: optionsList,
    optionA: optionsList[0] || rawQ.optionA || rawQ.option_a,
    optionB: optionsList[1] || rawQ.optionB || rawQ.option_b,
    optionC: optionsList[2] || rawQ.optionC || rawQ.option_c,
    optionD: optionsList[3] || rawQ.optionD || rawQ.option_d,
    optionE: optionsList[4] || rawQ.optionE || rawQ.option_e,
    shortExplanation: shortExp,
    detailedExplanation: detailedExp,
    explanation: detailedExp || shortExp || (typeof rawQ.explanation === 'string' ? rawQ.explanation : undefined)
  };

  // Run pure placeholder detection engine
  const requirements = getQuestionMediaRequirements(questionForEngine);
  if (requirements.length === 0) {
    return null; // No placeholder detected
  }

  // Generate canonical stable key
  const stableKey = getStableQuestionKey({
    id: rawId,
    route: meta.route,
    subject: meta.subject,
    paper: meta.paper,
    chapterName: meta.chapterName,
    chapterId: meta.chapterId,
    topicName: rawQ.topic || rawQ.topicName || meta.topicName,
    topicId: rawQ.topicId || meta.topicId,
    teacher: rawQ.author || rawQ.teacher || meta.teacher,
    sourceQuestionNumber: rawQ.sourceQuestionNumber ?? rawId,
    stem
  });

  // Extract unique required placements
  const requiredPlacementsSet = new Set<QuestionMediaPlacement>();
  requirements.forEach(r => {
    requiredPlacementsSet.add(mapMediaPlacementToQuestionMediaPlacement(r.placement));
  });

  const requiredPlacements = Array.from(requiredPlacementsSet);

  // Check if existing attached media satisfies requirements
  const attachedMedia: QuestionMediaItem[] = [];
  if (Array.isArray(rawQ.media)) {
    attachedMedia.push(...rawQ.media);
  } else if (rawQ.stemImageUrl || rawQ.image || rawQ.imageUrl) {
    attachedMedia.push({
      id: `legacy_${stableKey}_question`,
      placement: 'question',
      type: 'diagram',
      storagePath: '',
      url: rawQ.stemImageUrl || rawQ.image || rawQ.imageUrl,
      altText: rawQ.altText || 'Question diagram',
      fileName: 'diagram.png',
      uploadedBy: 'system',
      uploadedAt: new Date().toISOString()
    });
  }

  const presentPlacements = new Set(
    attachedMedia.filter(m => Boolean(m.url)).map(m => m.placement || 'question')
  );
  const missingPlacements = requiredPlacements.filter(p => !presentPlacements.has(p));
  const isUploaded = missingPlacements.length === 0 && attachedMedia.length > 0;

  return {
    stableKey,
    questionKey: stableKey,
    questionId: rawId ?? stableKey,
    sourceType: meta.sourceType,
    route: meta.route,
    subject: meta.subject,
    subjectLabel: meta.subjectLabel || meta.subject,
    paper: meta.paper || 'first',
    paperLabel: meta.paperLabel || (meta.paper === 'second' ? '২য় পত্র' : '১ম পত্র'),
    chapterId: meta.chapterId,
    chapterName: meta.chapterName,
    topicId: rawQ.topicId || meta.topicId,
    topicName: rawQ.topic || rawQ.topicName || meta.topicName || 'সাধারণ',
    teacher: rawQ.author || rawQ.teacher || meta.teacher,
    sourceSetLabel: rawQ.sourceSetLabel || meta.sourceSetLabel,
    sourceQuestionNumber: rawQ.sourceQuestionNumber ?? rawId,
    stem,
    stimulus: stimulus || undefined,
    explanation: detailedExp || shortExp || (typeof rawQ.explanation === 'string' ? rawQ.explanation : undefined),
    options: optionsList,
    correctOption: rawQ.correct_answer ?? rawQ.correctOptionId ?? rawQ.correctOption,
    status: isUploaded ? 'image_uploaded' : 'image_missing',
    attachedMedia,
    stemImageUrl: attachedMedia.find(m => (m.placement || 'question') === 'question')?.url,
    altText: rawQ.altText,
    rawItem: rawQ,
    requiredPlacements,
    missingPlacements,
    detectedRequirements: requirements
  };
}

/**
 * Dynamically scans all static question datasets across all subjects, chapters, routes, and Firestore questions
 * using the unified normalized question registry.
 */
export async function scanAllDatasetsForImageRequirements(
  firestoreQuestions: QuestionItem[] = []
): Promise<DetectedQuestionItem[]> {
  const allNormalized = await getAllNormalizedQuestions(firestoreQuestions);

  return allNormalized
    .filter(q => q.hasPlaceholder)
    .map(q => ({
      stableKey: q.stableKey,
      questionKey: q.questionKey,
      questionId: q.id,
      sourceType: q.sourceType,
      route: q.route,
      subject: q.subject,
      subjectLabel: q.subjectLabel,
      paper: q.paper,
      paperLabel: q.paperLabel,
      chapterId: q.chapterId,
      chapterName: q.chapterName,
      topicId: q.topicId,
      topicName: q.topicName,
      teacher: q.teacher,
      sourceSetLabel: q.sourceSetLabel,
      sourceQuestionNumber: q.sourceQuestionNumber,
      stem: q.stem,
      stimulus: q.stimulus,
      explanation: q.explanation,
      options: q.options,
      correctOption: q.correctOption,
      status: q.status === 'image_uploaded' ? 'image_uploaded' : 'image_missing',
      attachedMedia: q.attachedMedia,
      stemImageUrl: q.stemImageUrl,
      altText: q.altText,
      rawItem: q.rawItem,
      requiredPlacements: q.requiredPlacements,
      missingPlacements: q.missingPlacements,
      detectedRequirements: q.detectedRequirements,
      isSharedStimulusMember: q.isSharedStimulusMember,
      stimulusGroupKey: q.stimulusGroupKey
    }));
}
