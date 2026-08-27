/**
 * Universal Normalized Question Registry
 *
 * Collects, normalizes, and indexes all question sources across:
 * - Academic (ICT, Physics, Chemistry, Biology, Higher Math, Board Prep)
 * - Medical (Medical Physics, Medical Chemistry, Teacher Sets)
 * - Varsity (DCU Physics, DCU Chemistry, DCU & GST Math)
 * - Engineering (Engineering Question Datasets & Practice Sets)
 * - Firestore (Dynamic Live Question Bank)
 *
 * Strict Rules:
 * 1. No hardcoded fallback to Varsity or Physics.
 * 2. If data for a requested route/subject is missing, flags as empty with an Admin diagnostic message.
 * 3. If route/subject metadata is incomplete/unknown, categorized under "মেটাডেটা যাচাই প্রয়োজন" / "তথ্য অসম্পূর্ণ".
 * 4. Generates canonical stable keys and detects all media placeholders using the pure detection engine.
 */

import { getQuestionMediaRequirements, MediaRequirement, MediaPlacement } from './questionMediaRequirements';
import { getStableQuestionKey } from '../lib/questionMediaOverrides';
import { QuestionItem, QuestionMediaItem, QuestionMediaPlacement } from '../types/questionBank';
import { slugifyText } from './questionParser';

export interface NormalizedQuestion {
  id: string | number;
  stableKey: string;
  questionKey: string;
  sourceType:
    | 'academic_ict'
    | 'academic_science'
    | 'academic_board'
    | 'medical_bank'
    | 'medical_teacher_set'
    | 'varsity_dcu'
    | 'varsity_gst'
    | 'engineering'
    | 'firestore'
    | 'static_general'
    | 'unknown';
  route: 'academic' | 'medical' | 'varsity' | 'engineering' | 'unknown' | string;
  routeLabel: string;
  subject: string;
  subjectLabel: string;
  paper: 'first' | 'second' | 'not_applicable' | string;
  paperLabel: string;
  chapterId?: string;
  chapterName: string;
  topicId?: string;
  topicName: string;
  teacher?: string;
  sourceSet?: string;
  sourceSetLabel?: string;
  sourceQuestionNumber?: string | number;
  stem: string;
  questionText: string;
  stimulus?: string;
  options: string[];
  correctOption?: string;
  explanation?: string;
  shortExplanation?: string;
  detailedExplanation?: string;
  hasPlaceholder: boolean;
  detectedRequirements: MediaRequirement[];
  requiredPlacements: QuestionMediaPlacement[];
  missingPlacements: QuestionMediaPlacement[];
  status: 'image_missing' | 'image_uploaded' | 'none';
  attachedMedia: QuestionMediaItem[];
  stemImageUrl?: string;
  altText?: string;
  rawItem?: any;
  isMetadataIncomplete?: boolean;
  metadataStatus: 'complete' | 'incomplete';
  stimulusGroupKey?: string;
  isSharedStimulusMember?: boolean;
}

export interface QuestionMetadataInput {
  route?: string;
  routeLabel?: string;
  subject?: string;
  subjectLabel?: string;
  paper?: 'first' | 'second' | 'not_applicable' | string;
  paperLabel?: string;
  chapterId?: string;
  chapterName?: string;
  topicId?: string;
  topicName?: string;
  teacher?: string;
  sourceSet?: string;
  sourceSetLabel?: string;
  sourceQuestionNumber?: string | number;
  sourceType?: NormalizedQuestion['sourceType'];
}

/**
 * Route labels in Bangla
 */
export const ROUTE_BANGLA_LABELS: Record<string, string> = {
  academic: 'Academic (এইচএসসি একাডেমি)',
  medical: 'Medical (মেডিকেল ভর্তি প্রস্তুতি)',
  varsity: 'Varsity (বিশ্ববিদ্যালয় ‘ক’ ইউনিট)',
  engineering: 'Engineering (ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি)',
  unknown: 'মেটাডেটা যাচাই প্রয়োজন'
};

/**
 * Subject labels in Bangla
 */
export const SUBJECT_BANGLA_LABELS: Record<string, string> = {
  ict: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
  physics: 'পদার্থবিজ্ঞান',
  chemistry: 'রসায়ন',
  biology: 'জীববিজ্ঞান',
  math: 'উচ্চতর গণিত',
  higher_math: 'উচ্চতর গণিত',
  english: 'ইংরেজি',
  general_knowledge: 'সাধারণ জ্ঞান',
  gk: 'সাধারণ জ্ঞান',
  unknown: 'তথ্য অসম্পূর্ণ'
};

export function getRouteLabel(route?: string): string {
  if (!route || route === 'unknown') return 'মেটাডেটা যাচাই প্রয়োজন';
  return ROUTE_BANGLA_LABELS[route.toLowerCase()] || route.toUpperCase();
}

export function getSubjectLabel(subject?: string, customLabel?: string): string {
  if (customLabel) return customLabel;
  if (!subject || subject === 'unknown') return 'তথ্য অসম্পূর্ণ';
  return SUBJECT_BANGLA_LABELS[subject.toLowerCase()] || subject;
}

export function getPaperLabel(paper?: string): string {
  if (paper === 'first') return '১ম পত্র';
  if (paper === 'second') return '২য় পত্র';
  if (paper === 'not_applicable') return 'প্রযোজ্য নয়';
  return paper || '১ম পত্র';
}

/**
 * Maps MediaPlacement to QuestionMediaPlacement
 */
function mapPlacement(p: MediaPlacement): QuestionMediaPlacement {
  if (p === 'option_e') return 'option_d';
  return p as QuestionMediaPlacement;
}

/**
 * Normalizes any question record from any dataset into a standardized NormalizedQuestion
 */
export function normalizeQuestion(
  rawQ: any,
  metaInput: QuestionMetadataInput = {}
): NormalizedQuestion | null {
  if (!rawQ || typeof rawQ !== 'object') return null;

  const stem = String(
    rawQ.question_text ??
    rawQ.stem ??
    rawQ.question ??
    rawQ.title ??
    ''
  ).trim();

  if (!stem && !rawQ.stimulus && (!rawQ.options || rawQ.options.length === 0)) {
    return null; // Empty placeholder/invalid
  }

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

  const rawId = rawQ.id ?? rawQ.sourceQuestionNumber ?? rawQ.questionId ?? '';

  // Determine metadata status
  const rawRoute = rawQ.route || metaInput.route;
  const isRouteMissing = !rawRoute || rawRoute === 'unknown';
  const finalRoute = isRouteMissing ? 'unknown' : rawRoute.toLowerCase();

  const rawSubject = rawQ.subject || rawQ.subjectId || metaInput.subject;
  const isSubjectMissing = !rawSubject || rawSubject === 'unknown';
  const finalSubject = isSubjectMissing ? 'unknown' : rawSubject.toLowerCase();

  const isMetadataIncomplete = isRouteMissing || isSubjectMissing;
  const metadataStatus = isMetadataIncomplete ? 'incomplete' : 'complete';

  const finalPaper = rawQ.paper || metaInput.paper || 'first';
  const finalChapterName = String(
    rawQ.chapterName ??
    rawQ.chapter ??
    metaInput.chapterName ??
    (isMetadataIncomplete ? 'তথ্য অসম্পূর্ণ অধ্যায়' : 'সাধারণ অধ্যায়')
  ).trim();

  const finalChapterId = rawQ.chapterId || metaInput.chapterId || slugifyText(finalChapterName);
  const finalTopicName = String(
    rawQ.topic ??
    rawQ.topicName ??
    metaInput.topicName ??
    (isMetadataIncomplete ? 'তথ্য অসম্পূর্ণ টপিক' : 'সাধারণ')
  ).trim();
  const finalTopicId = rawQ.topicId || metaInput.topicId || slugifyText(finalTopicName);

  const teacher = rawQ.author || rawQ.teacher || rawQ.sourceSet || metaInput.teacher || metaInput.sourceSet;
  const sourceSetLabel = rawQ.sourceSetLabel || metaInput.sourceSetLabel || (teacher ? String(teacher) : undefined);
  const sourceQuestionNumber = rawQ.sourceQuestionNumber ?? rawId;

  // Build canonical stable key
  const stableKey = getStableQuestionKey({
    id: rawId,
    route: finalRoute,
    subject: finalSubject,
    paper: finalPaper,
    chapterName: finalChapterName,
    chapterId: finalChapterId,
    topicName: finalTopicName,
    topicId: finalTopicId,
    teacher: teacher ? String(teacher) : undefined,
    sourceQuestionNumber,
    stem
  });

  // Run pure detection engine
  const questionForEngine = {
    id: rawId,
    questionKey: stableKey,
    stableKey,
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

  const detectedRequirements = getQuestionMediaRequirements(questionForEngine);
  const hasPlaceholder = detectedRequirements.length > 0;

  // Placements calculation
  const requiredPlacementsSet = new Set<QuestionMediaPlacement>();
  detectedRequirements.forEach(r => {
    requiredPlacementsSet.add(mapPlacement(r.placement));
  });
  const requiredPlacements = Array.from(requiredPlacementsSet);

  // Attached media
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
  const isUploaded = hasPlaceholder && missingPlacements.length === 0 && attachedMedia.length > 0;

  const status: NormalizedQuestion['status'] = hasPlaceholder
    ? isUploaded
      ? 'image_uploaded'
      : 'image_missing'
    : 'none';

  return {
    id: rawId || stableKey,
    stableKey,
    questionKey: stableKey,
    sourceType: metaInput.sourceType || (isMetadataIncomplete ? 'unknown' : 'static_general'),
    route: finalRoute,
    routeLabel: getRouteLabel(finalRoute),
    subject: finalSubject,
    subjectLabel: getSubjectLabel(finalSubject, metaInput.subjectLabel),
    paper: finalPaper,
    paperLabel: getPaperLabel(finalPaper),
    chapterId: finalChapterId,
    chapterName: finalChapterName,
    topicId: finalTopicId,
    topicName: finalTopicName,
    teacher: teacher ? String(teacher) : undefined,
    sourceSet: teacher ? String(teacher) : undefined,
    sourceSetLabel,
    sourceQuestionNumber,
    stem,
    questionText: stem,
    stimulus,
    options: optionsList,
    correctOption: rawQ.correct_answer ?? rawQ.correctOptionId ?? rawQ.correctOption,
    explanation: detailedExp || shortExp || (typeof rawQ.explanation === 'string' ? rawQ.explanation : undefined),
    shortExplanation: shortExp || undefined,
    detailedExplanation: detailedExp || undefined,
    hasPlaceholder,
    detectedRequirements,
    requiredPlacements,
    missingPlacements,
    status,
    attachedMedia,
    stemImageUrl: attachedMedia.find(m => (m.placement || 'question') === 'question')?.url,
    altText: rawQ.altText,
    rawItem: rawQ,
    isMetadataIncomplete,
    metadataStatus
  };
}

/**
 * Diagnostic message generator for empty dataset routes & subjects
 */
export function getEmptyDataAdminMessage(route?: string, subject?: string): string {
  const routeName = route ? getRouteLabel(route) : 'নির্বাচিত রুট';
  const subjectName = subject ? getSubjectLabel(subject) : 'বিষয়';
  return `${routeName} ${subjectName} প্রশ্ন ডেটা পাওয়া যায়নি। প্রশ্নব্যাংক ইমপোর্ট বা ডেটা ম্যাপিং প্রয়োজন।`;
}

/**
 * Universal Registry Collector: Gathers every question from all sources
 */
export async function getAllNormalizedQuestions(
  firestoreQuestions: QuestionItem[] = []
): Promise<NormalizedQuestion[]> {
  const allQuestions: NormalizedQuestion[] = [];
  const visitedKeys = new Set<string>();

  const registerQuestion = (item: NormalizedQuestion | null) => {
    if (!item) return;
    if (visitedKeys.has(item.stableKey)) {
      // Merge detected placements if duplicate encountered
      const existing = allQuestions.find(q => q.stableKey === item.stableKey);
      if (existing) {
        item.requiredPlacements.forEach(p => {
          if (!existing.requiredPlacements.includes(p)) existing.requiredPlacements.push(p);
        });
        item.detectedRequirements.forEach(r => {
          if (!existing.detectedRequirements.some(dr => dr.placement === r.placement)) {
            existing.detectedRequirements.push(r);
          }
        });
      }
      return;
    }
    visitedKeys.add(item.stableKey);
    allQuestions.push(item);
  };

  // ==========================================
  // 1. ACADEMIC ROUTE
  // ==========================================

  // 1A. Academic ICT Chapter 3
  try {
    const { ictChap3QuestionsPart1 } = await import('../data/questions_ict_chap3_part1');
    const { ictChap3QuestionsPart2 } = await import('../data/questions_ict_chap3_part2');
    const { ictChap3QuestionsPart3 } = await import('../data/questions_ict_chap3_part3');
    const { ictChap3QuestionsPart4 } = await import('../data/questions_ict_chap3_part4');

    const ictList = [
      ...ictChap3QuestionsPart1,
      ...ictChap3QuestionsPart2,
      ...ictChap3QuestionsPart3,
      ...ictChap3QuestionsPart4
    ];

    ictList.forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'ict',
          subjectLabel: 'তথ্য ও যোগাযোগ প্রযুক্তি',
          paper: 'first',
          chapterId: 'ch3',
          chapterName: 'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস',
          sourceType: 'academic_ict'
        })
      );
    });
  } catch (err) {
    console.warn('Academic ICT import notice:', err);
  }

  // 1B. Academic Physics
  try {
    const { phy1Chap2Data } = await import('../data/questions_phy1_chap2');
    const { phy1Chap4RawQuestions, phy1Chap4PastQuestions } = await import('../data/questions_phy1_chap4_newtonian');
    const { phy1Chap6RawQuestions, phy1Chap6PastQuestions } = await import('../data/questions_phy1_chap6_gravity');

    (phy1Chap2Data?.questions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'physics',
          subjectLabel: 'পদার্থবিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'phys1_ch2',
          chapterName: 'অধ্যায় ২: ভেক্টর',
          sourceType: 'academic_science'
        })
      );
    });

    [...(phy1Chap4RawQuestions || []), ...(phy1Chap4PastQuestions || [])].forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'physics',
          subjectLabel: 'পদার্থবিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'phys1_ch4',
          chapterName: 'অধ্যায় ৪: নিউটনীয় বলবিদ্যা',
          sourceType: 'academic_science'
        })
      );
    });

    [...(phy1Chap6RawQuestions || []), ...(phy1Chap6PastQuestions || [])].forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'physics',
          subjectLabel: 'পদার্থবিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'phys1_ch6',
          chapterName: 'অধ্যায় ৬: মহাকর্ষ ও অভিকর্ষ',
          sourceType: 'academic_science'
        })
      );
    });
  } catch (err) {
    console.warn('Academic Physics import notice:', err);
  }

  // 1C. Academic Chemistry
  try {
    const { chem1Chap2Data } = await import('../data/questions_chem1_chap2');
    (chem1Chap2Data?.questions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'chemistry',
          subjectLabel: 'রসায়ন ১ম পত্র',
          paper: 'first',
          chapterId: 'chem1_ch2',
          chapterName: 'গুণগত রসায়ন',
          sourceType: 'academic_science'
        })
      );
    });
  } catch (err) {
    console.warn('Academic Chemistry import notice:', err);
  }

  // 1D. Academic Biology
  try {
    const { bio1Chap1Data } = await import('../data/questions_bio1_chap1');
    const { bio1Chap7Data } = await import('../data/questions_bio1_chap7');
    const { bio1Chap8Data } = await import('../data/questions_bio1_chap8');
    const { gymnospermQuestions } = await import('../data/bio1_chap7_part1');
    const { angiospermQuestions1 } = await import('../data/bio1_chap7_part2');
    const { angiospermQuestions2 } = await import('../data/bio1_chap7_part3');
    const { poaceaeQuestions } = await import('../data/bio1_chap7_part4');

    (bio1Chap1Data?.questions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'biology',
          subjectLabel: 'জীববিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'bio1_ch1',
          chapterName: 'কোষ ও এর গঠন',
          sourceType: 'academic_science'
        })
      );
    });

    (bio1Chap7Data?.questions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'biology',
          subjectLabel: 'জীববিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'bio1_ch7',
          chapterName: 'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ',
          sourceType: 'academic_science'
        })
      );
    });

    (bio1Chap8Data?.questions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'biology',
          subjectLabel: 'জীববিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'bio1_ch8',
          chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
          sourceType: 'academic_science'
        })
      );
    });

    [
      ...(gymnospermQuestions || []),
      ...(angiospermQuestions1 || []),
      ...(angiospermQuestions2 || []),
      ...(poaceaeQuestions || [])
    ].forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'biology',
          subjectLabel: 'জীববিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'bio1_ch7',
          chapterName: 'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ',
          sourceType: 'academic_science'
        })
      );
    });
  } catch (err) {
    console.warn('Academic Biology import notice:', err);
  }

  // 1E. Academic Higher Math
  try {
    const { math1Chap9Data } = await import('../data/questions_math1_chap9');
    (math1Chap9Data?.questions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'academic',
          subject: 'math',
          subjectLabel: 'উচ্চতর গণিত ১ম পত্র',
          paper: 'first',
          chapterId: 'math1_ch9',
          chapterName: 'অন্তরীকরণ',
          sourceType: 'academic_science'
        })
      );
    });
  } catch (err) {
    console.warn('Academic Higher Math import notice:', err);
  }

  // 1F. Academic Board Prep
  try {
    const { INITIAL_BOARD_QUESTIONS } = await import('../data/boardPrepData');
    (INITIAL_BOARD_QUESTIONS || []).forEach((bq: any) => {
      registerQuestion(
        normalizeQuestion(bq, {
          route: 'academic',
          subject: bq.subjectId || 'physics',
          subjectLabel: 'একাডেমিক বোর্ড প্রশ্ন',
          chapterName: bq.topic || `অধ্যায় ${bq.chapterIndex + 1}`,
          teacher: `${bq.board || ''} ${bq.year || ''}`.trim(),
          sourceType: 'academic_board'
        })
      );
    });
  } catch (err) {
    console.warn('Academic Board Prep import notice:', err);
  }

  // ==========================================
  // 2. MEDICAL ROUTE
  // ==========================================

  // 2A. Medical Physics
  try {
    const { medPhys1Chap1MeasurementQuestions } = await import('../data/questions_med_phys1_c1_measurement');
    const { medPhys1Chap2VectorQuestions } = await import('../data/questions_med_phys1_c2_vector');
    const { medPhys1Chap3KinematicsQuestions } = await import('../data/questions_med_phys1_c3_kinematics');
    const { medPhys1Chap5WorkPowerQuestions } = await import('../data/questions_med_phys1_c5_work_power');
    const { medPhys1Chap7StructureQuestions } = await import('../data/questions_med_phys1_c7_structure');
    const { medPhys1Chap8PeriodicQuestions } = await import('../data/questions_med_phys1_c8_periodic');
    const { medPhys1Chap9WaveQuestions } = await import('../data/questions_med_phys1_c9_wave');
    const { medPhys1Chap10GasQuestions } = await import('../data/questions_med_phys1_c10_gas');

    const medPhysicsPacks = [
      { name: 'ভৌত জগৎ ও পরিমাপ', list: medPhys1Chap1MeasurementQuestions },
      { name: 'ভেক্টর', list: medPhys1Chap2VectorQuestions },
      { name: 'গতিবিদ্যা', list: medPhys1Chap3KinematicsQuestions },
      { name: 'কাজ, ক্ষমতা ও শক্তি', list: medPhys1Chap5WorkPowerQuestions },
      { name: 'পদার্থের গাঠনিক ধর্ম', list: medPhys1Chap7StructureQuestions },
      { name: 'পর্যায়বৃত্ত গতি', list: medPhys1Chap8PeriodicQuestions },
      { name: 'তরঙ্গ', list: medPhys1Chap9WaveQuestions },
      { name: 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব', list: medPhys1Chap10GasQuestions }
    ];

    medPhysicsPacks.forEach(pack => {
      (pack.list || []).forEach(q => {
        registerQuestion(
          normalizeQuestion(q, {
            route: 'medical',
            subject: 'physics',
            subjectLabel: 'পদার্থবিজ্ঞান ১ম পত্র',
            paper: 'first',
            chapterName: pack.name,
            sourceType: 'medical_bank'
          })
        );
      });
    });
  } catch (err) {
    console.warn('Medical Physics import notice:', err);
  }

  // 2B. Medical Chemistry
  try {
    const { medChem1Chap2QualitativeQuestions } = await import('../data/questions_med_chem1_c2_qualitative');
    const { medChem1Chap3PeriodicQuestions } = await import('../data/questions_med_chem1_c3_periodic');
    const { medChem1Chap4ChemicalChangeQuestions } = await import('../data/questions_med_chem1_c4_chemical_change');

    const medChemPacks = [
      { name: 'গুণগত রসায়ন', list: medChem1Chap2QualitativeQuestions },
      { name: 'মৌলের পর্যায়বৃত্ত ধর্ম', list: medChem1Chap3PeriodicQuestions },
      { name: 'রাসায়নিক পরিবর্তন', list: medChem1Chap4ChemicalChangeQuestions }
    ];

    medChemPacks.forEach(pack => {
      (pack.list || []).forEach(q => {
        registerQuestion(
          normalizeQuestion(q, {
            route: 'medical',
            subject: 'chemistry',
            subjectLabel: 'রসায়ন ১ম পত্র',
            paper: 'first',
            chapterName: pack.name,
            sourceType: 'medical_bank'
          })
        );
      });
    });

    // Medical Chemistry Teacher Sets (Guha, Hazari, Kabir, Lincoln)
    const { chem1Chap2GuhaPart1 } = await import('../data/med_chem1_c2_guha_part1').catch(() => ({ chem1Chap2GuhaPart1: [] }));
    const { chem1Chap2GuhaPart2 } = await import('../data/med_chem1_c2_guha_part2').catch(() => ({ chem1Chap2GuhaPart2: [] }));
    const { chem1Chap2GuhaPart3 } = await import('../data/med_chem1_c2_guha_part3').catch(() => ({ chem1Chap2GuhaPart3: [] }));

    [...(chem1Chap2GuhaPart1 || []), ...(chem1Chap2GuhaPart2 || []), ...(chem1Chap2GuhaPart3 || [])].forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'medical',
          subject: 'chemistry',
          subjectLabel: 'রসায়ন ১ম পত্র',
          paper: 'first',
          chapterName: 'গুণগত রসায়ন',
          teacher: 'গুহ স্যার',
          sourceType: 'medical_teacher_set'
        })
      );
    });
  } catch (err) {
    console.warn('Medical Chemistry import notice:', err);
  }

  // 2C. Medical Biology
  try {
    const {
      medBio1Chap8TissueBoardQuestions,
      medBio1Chap8TissueHasanQuestions,
      medBio1Chap8TissueAziburQuestions,
      medBio1Chap8TissueAlimQuestions
    } = await import('../data/questions_med_bio1_c8_tissue');

    (medBio1Chap8TissueBoardQuestions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'medical',
          subject: 'biology',
          subjectLabel: 'জীববিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'bio1_c8',
          chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
          topicName: q.topic,
          teacher: q.author || 'বোর্ড প্রশ্ন',
          sourceSet: 'board',
          sourceSetLabel: 'বোর্ড প্রশ্ন',
          sourceType: 'medical_bank'
        })
      );
    });

    (medBio1Chap8TissueHasanQuestions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'medical',
          subject: 'biology',
          subjectLabel: 'জীববিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'bio1_c8',
          chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
          topicName: q.topic,
          teacher: q.author || 'আবুল হাসান স্যার',
          sourceSet: 'abul_hasan',
          sourceSetLabel: 'আবুল হাসান স্যার',
          sourceType: 'medical_bank'
        })
      );
    });

    (medBio1Chap8TissueAziburQuestions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'medical',
          subject: 'biology',
          subjectLabel: 'জীববিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'bio1_c8',
          chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
          topicName: q.topic,
          teacher: q.author || 'আজিবুর স্যার',
          sourceSet: 'azibur',
          sourceSetLabel: 'আজিবুর স্যার',
          sourceType: 'medical_bank'
        })
      );
    });

    (medBio1Chap8TissueAlimQuestions || []).forEach(q => {
      registerQuestion(
        normalizeQuestion(q, {
          route: 'medical',
          subject: 'biology',
          subjectLabel: 'জীববিজ্ঞান ১ম পত্র',
          paper: 'first',
          chapterId: 'bio1_c8',
          chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
          topicName: q.topic,
          teacher: q.author || 'আলীম স্যার',
          sourceSet: 'alim',
          sourceSetLabel: 'আলীম স্যার',
          sourceType: 'medical_bank'
        })
      );
    });
  } catch (err) {
    console.warn('Medical Biology import notice:', err);
  }

  // ==========================================
  // 3. VARSITY ROUTE (DCU & GST)
  // ==========================================
  try {
    const { dcuPhysicsNewtonianData } = await import('../data/questions_dcu_physics_newtonian');
    const { dcuPhysicsVectorData } = await import('../data/questions_dcu_physics_vector');
    const { dcuPhysicsGravityData } = await import('../data/questions_dcu_physics_gravity');
    const { dcuPhysicsWorkEnergyData } = await import('../data/questions_dcu_physics_work_energy');
    const { dcuPhysicsPeriodicData } = await import('../data/questions_dcu_physics_periodic');
    const { dcuPhysicsStructureData } = await import('../data/questions_dcu_physics_structure');
    const { dcuPhysicsIdealGasData } = await import('../data/questions_dcu_physics_ideal_gas');
    const { dcuPhysicsThermodynamicsData } = await import('../data/questions_dcu_physics_thermodynamics');
    const { dcuPhysicsElectrostaticsData } = await import('../data/questions_dcu_physics_electrostatics');
    const { dcuPhysicsCurrentElectricityData } = await import('../data/questions_dcu_physics_current_electricity');

    const { dcuChemQualitativeData } = await import('../data/questions_dcu_chem_qualitative');
    const { dcuChemPeriodicPropertiesData } = await import('../data/questions_dcu_chem_periodic_properties');
    const { dcuChemEnvironmentalData } = await import('../data/questions_dcu_chem_environmental');

    const { dcuMathExam1Data } = await import('../data/questions_dcu_math_exam1');
    const { dcuMathExam3Data } = await import('../data/questions_dcu_math_exam3');
    const { dcuMathStraightLineData } = await import('../data/questions_dcu_math_straight_line');
    const { gstMathExam1Data } = await import('../data/questions_gst_math_exam1');
    const { gstMathExam2Data } = await import('../data/questions_gst_math_exam2');

    const varsitySets = [
      { name: 'নিউটনিয়ান বলবিদ্যা', subject: 'physics', paper: 'first', data: dcuPhysicsNewtonianData },
      { name: 'ভেক্টর', subject: 'physics', paper: 'first', data: dcuPhysicsVectorData },
      { name: 'মহাকর্ষ ও অভিকর্ষ', subject: 'physics', paper: 'first', data: dcuPhysicsGravityData },
      { name: 'কাজ, শক্তি ও ক্ষমতা', subject: 'physics', paper: 'first', data: dcuPhysicsWorkEnergyData },
      { name: 'পর্যায়বৃত্ত গতি', subject: 'physics', paper: 'first', data: dcuPhysicsPeriodicData },
      { name: 'পদার্থের গাঠনিক ধর্ম', subject: 'physics', paper: 'first', data: dcuPhysicsStructureData },
      { name: 'আদর্শ গ্যাস ও গতিবিদ্যা', subject: 'physics', paper: 'first', data: dcuPhysicsIdealGasData },
      { name: 'তাপগতিবিদ্যা', subject: 'physics', paper: 'second', data: dcuPhysicsThermodynamicsData },
      { name: 'স্থির তড়িৎ', subject: 'physics', paper: 'second', data: dcuPhysicsElectrostaticsData },
      { name: 'চল তড়িৎ', subject: 'physics', paper: 'second', data: dcuPhysicsCurrentElectricityData },
      { name: 'গুণগত রসায়ন', subject: 'chemistry', paper: 'first', data: dcuChemQualitativeData },
      { name: 'মৌলের পর্যায়বৃত্ত ধর্ম', subject: 'chemistry', paper: 'first', data: dcuChemPeriodicPropertiesData },
      { name: 'পরিবেশ রসায়ন', subject: 'chemistry', paper: 'second', data: dcuChemEnvironmentalData },
      { name: 'ম্যাট্রিক্স ও নির্ণায়ক', subject: 'math', paper: 'first', data: dcuMathExam1Data },
      { name: 'বৃত্ত ও সরলরেখা', subject: 'math', paper: 'first', data: dcuMathExam3Data },
      { name: 'সরলরেখা', subject: 'math', paper: 'first', data: dcuMathStraightLineData },
      { name: 'সংযুক্ত কোণের ত্রিকোণমিতি', subject: 'math', paper: 'first', data: gstMathExam1Data },
      { name: 'বিপরীত ত্রিকোণমিতিক ফাংশন', subject: 'math', paper: 'second', data: gstMathExam2Data }
    ];

    varsitySets.forEach(set => {
      (set.data?.questions || []).forEach(q => {
        registerQuestion(
          normalizeQuestion(q, {
            route: 'varsity',
            subject: set.subject,
            subjectLabel: set.subject === 'physics' ? 'পদার্থবিজ্ঞান' : set.subject === 'chemistry' ? 'রসায়ন' : 'উচ্চতর গণিত',
            paper: set.paper,
            chapterName: set.name,
            sourceType: 'varsity_dcu'
          })
        );
      });
    });
  } catch (err) {
    console.warn('Varsity datasets import notice:', err);
  }

  // ==========================================
  // 4. ENGINEERING ROUTE
  // ==========================================
  // Add placeholder / specific engineering questions if present in datasets

  // ==========================================
  // 5. FIRESTORE & DYNAMIC QUESTIONS
  // ==========================================
  if (Array.isArray(firestoreQuestions) && firestoreQuestions.length > 0) {
    firestoreQuestions.forEach(fq => {
      const isRouteEmpty = !fq.route || (fq.route as string) === 'unknown';
      const isSubEmpty = !fq.subject || (fq.subject as string) === 'unknown';

      registerQuestion(
        normalizeQuestion(fq, {
          route: isRouteEmpty ? 'unknown' : fq.route,
          routeLabel: isRouteEmpty ? 'মেটাডেটা যাচাই প্রয়োজন' : getRouteLabel(fq.route),
          subject: isSubEmpty ? 'unknown' : fq.subject,
          subjectLabel: isSubEmpty ? 'তথ্য অসম্পূর্ণ' : getSubjectLabel(fq.subject),
          paper: fq.paper || 'first',
          chapterName: fq.chapterName || (isRouteEmpty ? 'তথ্য অসম্পূর্ণ অধ্যায়' : 'General Chapter'),
          chapterId: fq.chapterId,
          topicName: fq.topicName || (isRouteEmpty ? 'তথ্য অসম্পূর্ণ টপিক' : 'General Topic'),
          topicId: fq.topicId,
          teacher: fq.sourceSet,
          sourceType: 'firestore'
        })
      );
    });
  }

  return allQuestions;
}

/**
 * Filter questions that specifically require images based on placeholder detection
 */
export async function getQuestionsNeedingImages(
  firestoreQuestions: QuestionItem[] = []
): Promise<NormalizedQuestion[]> {
  const all = await getAllNormalizedQuestions(firestoreQuestions);
  return all.filter(q => q.hasPlaceholder);
}
