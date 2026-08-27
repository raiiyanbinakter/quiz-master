import {
  QuestionItem,
  QuestionOption,
  DeliveryFeature,
  MedicalSubject,
  SourceStatus,
  QuestionStatus,
  TeacherSourceSet,
  TeacherSourceSetLabel
} from '../types/questionBank';

export interface AdminImportTargetMetadata {
  route: 'academic' | 'medical' | 'varsity' | 'engineering';
  feature: DeliveryFeature;
  subject: string;
  subjectId?: string;
  subjectName?: string;
  paper: 'first' | 'second' | 'not_applicable';
  sectionId?: string;
  sectionName?: string;
  chapterId?: string;
  chapterName: string;
  topicId?: string;
  topicName?: string;
  sourceSet?: TeacherSourceSet | string;
  sourceSetLabel?: TeacherSourceSetLabel | string;
  customTeacherSource?: string;
  sourceStatus?: SourceStatus;
  sourceTitle?: string;
  pastYear?: string | number;
  pastExamYear?: string | number;
  boardOrExam?: string;
}

export type MedicalImportTargetMetadata = AdminImportTargetMetadata;

export interface ParseResultItem {
  index: number;
  rawId?: string;
  sourceQuestionNumber?: string | number;
  parsedItem?: Partial<QuestionItem> & {
    questionText?: string;
    correctOption?: string;
    shortExplanation?: string;
    detailedExplanation?: string;
    timeSeconds?: number;
    hasImagePlaceholder?: boolean;
    sourceStatus?: SourceStatus;
  };
  errors: string[];
  isDuplicateCandidate?: boolean;
  needsSourceVerification?: boolean;
  hasImagePlaceholder?: boolean;
  rawFields: Record<string, string>;
}

export interface ParseResult {
  totalParsed: number;
  validCount: number;
  invalidCount: number;
  duplicateCount: number;
  needsVerificationCount: number;
  items: ParseResultItem[];
}

export const ALLOWED_DELIVERY_FEATURES: Array<{ id: DeliveryFeature; label: string }> = [
  { id: 'practice_bank', label: 'Practice Question Bank' },
  { id: 'past_questions', label: 'Past Year Questions' },
  { id: 'subject_test', label: 'Subject Test' },
  { id: 'mock_test', label: 'Mock Test' },
  { id: 'model_test', label: 'Model Test' },
  { id: 'routine_review', label: 'Routine Review' }
];

export const KNOWN_TEACHER_OPTIONS = [
  { id: 'ishak', label: 'ইসহাক স্যার' },
  { id: 'topon', label: 'তপন স্যার' },
  { id: 'pramanik', label: 'প্রামাণিক স্যার' },
  { id: 'tofazzal', label: 'তোফাজ্জল স্যার' },
  { id: 'hazari', label: 'হাজারী স্যার' },
  { id: 'kabir', label: 'কবীর স্যার' },
  { id: 'guha', label: 'গুহ স্যার' },
  { id: 'lincoln', label: 'লিংকন স্যার' },
  { id: 'abul_hasan', label: 'আবুল হাসান স্যার' },
  { id: 'gazi_ajmol', label: 'গাজী আজমল স্যার' },
  { id: 'majeda', label: 'মাজেদা বেগম ম্যাডাম' },
  { id: 'other', label: 'অন্যান্য' }
];

const RECOGNIZED_HEADERS = new Set([
  'ID',
  'SOURCE_QUESTION_NUMBER',
  'SOURCE_Q_NO',
  'QUESTION_NUMBER',
  'Q_NO',
  'SL',
  'MODULE',
  'ROUTE',
  'SUBJECT',
  'PAPER',
  'CHAPTER',
  'TOPIC',
  'TOPIC_ID',
  'SOURCE_SET',
  'TEACHER',
  'AUTHOR',
  'SOURCE',
  'FEATURES',
  'DIFFICULTY',
  'TIME',
  'ESTIMATED_TIME',
  'LANGUAGE',
  'SOURCE_STATUS',
  'SOURCE_TITLE',
  'SOURCE_PUBLISHER',
  'SOURCE_URL',
  'YEAR',
  'TAGS',
  'QUESTION',
  'STEM',
  'A',
  'B',
  'C',
  'D',
  'E',
  'ANSWER',
  'CORRECT_ANSWER',
  'ANS',
  'SHORT_EXPLANATION',
  'EXPLANATION',
  'DETAILED_EXPLANATION',
  'DETAILED_EXP',
  'HINT'
]);

export function slugifyText(text?: string): string {
  if (!text) return 'general';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '_')
    .replace(/^-+|-+$/g, '') || 'general';
}

export function normalizeTeacherSet(raw?: string): { id: TeacherSourceSet | string; label: TeacherSourceSetLabel | string } | null {
  if (!raw) return null;
  const s = raw.trim().toLowerCase();
  if (s.includes('ishak') || s.includes('ইসহাক')) {
    return { id: 'ishak', label: 'ইসহাক স্যার' };
  }
  if (s.includes('topon') || s.includes('তপন')) {
    return { id: 'topon', label: 'তপন স্যার' };
  }
  if (s.includes('pramanik') || s.includes('প্রামাণিক')) {
    return { id: 'pramanik', label: 'প্রামাণিক স্যার' };
  }
  if (s.includes('tofazzal') || s.includes('তোফাজ্জল')) {
    return { id: 'tofazzal', label: 'তোফাজ্জল স্যার' };
  }
  if (s.includes('hazari') || s.includes('হাজারী') || s.includes('হাজারি')) {
    return { id: 'hazari', label: 'হাজারী স্যার' };
  }
  if (s.includes('kabir') || s.includes('কবীর') || s.includes('কবির')) {
    return { id: 'kabir', label: 'কবীর স্যার' };
  }
  if (s.includes('guha') || s.includes('গুহ')) {
    return { id: 'guha', label: 'গুহ স্যার' };
  }
  if (s.includes('lincoln') || s.includes('লিংকন') || s.includes('লিঙ্কন')) {
    return { id: 'lincoln', label: 'লিংকন স্যার' };
  }
  if (s.includes('hasan') || s.includes('হাসান')) {
    return { id: 'abul_hasan', label: 'আবুল হাসান স্যার' };
  }
  if (s.includes('ajmol') || s.includes('আজমল')) {
    return { id: 'gazi_ajmol', label: 'গাজী আজমল স্যার' };
  }
  if (s.includes('majeda') || s.includes('মাজেদা')) {
    return { id: 'majeda', label: 'মাজেদা বেগম ম্যাডাম' };
  }
  return { id: slugifyText(raw), label: raw.trim() };
}

export function generateUniqueInternalQuestionId(
  route: string,
  subject: string,
  paper: string,
  chapterName: string,
  teacherId: string,
  topicId: string,
  index: number,
  sourceQuestionNum?: string | number
): string {
  const sRoute = route || 'med';
  const sSub = subject.includes('phys') ? 'phy' : subject.includes('chem') ? 'chem' : subject.includes('bio') ? 'bio' : subject.includes('math') ? 'math' : subject;
  const sPap = paper === 'second' ? '2' : paper === 'first' ? '1' : 'na';
  const sChap = slugifyText(chapterName).substring(0, 14) || 'ch';
  const sTeach = slugifyText(teacherId).substring(0, 10) || 'src';
  const sTopic = slugifyText(topicId).substring(0, 12) || 'gen';
  const qNum = sourceQuestionNum ? String(sourceQuestionNum) : String(index);
  const rand = Math.random().toString(36).substring(2, 6);
  const ts = Date.now().toString(36).slice(-4);

  return `${sRoute}_${sSub}${sPap}_${sChap}_${sTeach}_${sTopic}_q${qNum}_${ts}${rand}`;
}

function normalizeString(str?: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/[\s\p{P}]/gu, '');
}

export function checkImagePlaceholder(text: string): boolean {
  if (!text) return false;
  return (
    text.includes('[এখানে চিত্র ছিল]') ||
    text.includes('[IMAGE_PLACEHOLDER]') ||
    text.includes('[চিত্র ছিল]') ||
    text.includes('[চিত্র:') ||
    text.includes('[চিত্র]')
  );
}

function mapBanglaOptionToLetter(val: string): string {
  const v = val.trim().toUpperCase();
  if (v === 'ক' || v === 'A' || v.startsWith('ক') || v === 'অপশন ক' || v === 'OPTION A') return 'A';
  if (v === 'খ' || v === 'B' || v.startsWith('খ') || v === 'অপশন খ' || v === 'OPTION B') return 'B';
  if (v === 'গ' || v === 'C' || v.startsWith('গ') || v === 'অপশন গ' || v === 'OPTION C') return 'C';
  if (v === 'ঘ' || v === 'D' || v.startsWith('ঘ') || v === 'অপশন ঘ' || v === 'OPTION D') return 'D';
  if (v === 'ঙ' || v === 'E' || v.startsWith('ঙ') || v === 'অপশন ঙ' || v === 'OPTION E') return 'E';
  return v;
}

export function parsePlainTextQuestions(
  rawText: string,
  creatorEmail: string = 'admin@example.com',
  targetMetadata?: AdminImportTargetMetadata
): ParseResult {
  if (!rawText || !rawText.trim()) {
    return {
      totalParsed: 0,
      validCount: 0,
      invalidCount: 0,
      duplicateCount: 0,
      needsVerificationCount: 0,
      items: []
    };
  }

  // Check if text has top-level headers before first ---QUESTION---
  const firstMarkerIndex = rawText.search(/---QUESTION---/i);
  const globalHeaderFields: Record<string, string> = {};

  if (firstMarkerIndex > 0) {
    const preamble = rawText.substring(0, firstMarkerIndex);
    const preambleLines = preamble.split(/\r?\n/);
    preambleLines.forEach(line => {
      const match = line.match(/^([A-Z_]+):\s*(.*)$/i);
      if (match) {
        const k = match[1].toUpperCase();
        if (RECOGNIZED_HEADERS.has(k)) {
          globalHeaderFields[k] = match[2].trim();
        }
      }
    });
  }

  // Split by ---QUESTION--- marker
  const rawBlocks = rawText
    .split(/---QUESTION---/i)
    .map(b => b.replace(/---END---/gi, '').trim())
    .filter(b => b.length > 0);

  let questionBlocks = rawBlocks;
  if (firstMarkerIndex > 0 && questionBlocks.length > 1) {
    if (!rawBlocks[0].includes('QUESTION:') && !rawBlocks[0].includes('ANSWER:') && !rawBlocks[0].includes('A:')) {
      questionBlocks = rawBlocks.slice(1);
    }
  }

  const parsedItems: ParseResultItem[] = [];
  const normalizedStems = new Set<string>();

  questionBlocks.forEach((block, blockIndex) => {
    const lines = block.split(/\r?\n/);
    const fields: Record<string, string> = { ...globalHeaderFields };
    let currentKey: string | null = null;

    lines.forEach(line => {
      // Look for standard KEY: value line
      const match = line.match(/^([A-Z_]+)\s*:\s*(.*)$/i);
      if (match) {
        const potentialKey = match[1].toUpperCase();
        if (RECOGNIZED_HEADERS.has(potentialKey)) {
          currentKey = potentialKey;
          fields[currentKey] = match[2];
          return;
        }
      }

      // Look for Bengali option keys like ক: বা খ:
      const banglaOptMatch = line.match(/^(ক|খ|গ|ঘ|ঙ)\s*:\s*(.*)$/);
      if (banglaOptMatch) {
        const bKey = banglaOptMatch[1];
        const letterKey = bKey === 'ক' ? 'A' : bKey === 'খ' ? 'B' : bKey === 'গ' ? 'C' : bKey === 'ঘ' ? 'D' : 'E';
        currentKey = letterKey;
        fields[currentKey] = banglaOptMatch[2];
        return;
      }

      // Multi-line continuation
      if (currentKey) {
        fields[currentKey] = (fields[currentKey] ? fields[currentKey] + '\n' : '') + line;
      }
    });

    // Clean up field values
    Object.keys(fields).forEach(k => {
      fields[k] = fields[k].trim();
    });

    const errors: string[] = [];

    // Target mapping with fallback to parsed fields
    const route = ((fields['ROUTE'] || targetMetadata?.route || 'academic').toLowerCase()) as
      | 'academic'
      | 'medical'
      | 'varsity'
      | 'engineering';

    const subject = (fields['SUBJECT'] || targetMetadata?.subject || '').trim().toLowerCase();
    if (!subject) {
      errors.push('SUBJECT missing');
      errors.push('বিষয় (Subject) নির্বাচন করা হয়নি বা পাওয়া যায়নি।');
    } else {
      const validSubjects = ['biology', 'chemistry', 'physics', 'english', 'general_knowledge', 'math', 'higher_math', 'ict'];
      if (!validSubjects.includes(subject)) {
        errors.push(`SUBJECT '${fields['SUBJECT'] || subject}' is invalid`);
      }
    }

    const paper = ((fields['PAPER'] || targetMetadata?.paper || 'first').toLowerCase()) as
      | 'first'
      | 'second'
      | 'not_applicable';

    const chapterName = (fields['CHAPTER'] || targetMetadata?.chapterName || 'সাধারণ অধ্যায়').trim();
    if (!chapterName && targetMetadata) {
      errors.push('অধ্যায় (Chapter) নির্বাচন করা হয়নি বা পাওয়া যায়নি।');
    }

    const topicName = (fields['TOPIC'] || targetMetadata?.topicName || 'সাধারণ টপিক').trim();
    const topicId = fields['TOPIC_ID'] || targetMetadata?.topicId || slugifyText(topicName);

    // Topic can be optional only for model_test or mock_test
    const feature = (fields['FEATURES'] || targetMetadata?.feature || 'practice_bank') as DeliveryFeature;
    const isTopicRequired = feature !== 'model_test' && feature !== 'mock_test';
    if (isTopicRequired && !topicName && targetMetadata) {
      errors.push('টপিক (Topic) নির্বাচন করা হয়নি বা পাওয়া যায়নি।');
    }

    // Teacher Source Set
    const rawTeacher = fields['SOURCE_SET'] || fields['TEACHER'] || fields['AUTHOR'] || targetMetadata?.customTeacherSource || targetMetadata?.sourceSet || 'ishak';
    const normSourceSet = normalizeTeacherSet(rawTeacher) || (targetMetadata?.sourceSet ? { id: targetMetadata.sourceSet, label: targetMetadata.sourceSetLabel || 'ইসহাক স্যার' } : { id: 'ishak', label: 'ইসহাক স্যার' });

    // Question Text / Stem
    const stem = fields['QUESTION'] || fields['STEM'] || '';
    if (!stem || !stem.trim()) {
      errors.push('QUESTION missing');
      errors.push(`প্রশ্ন ${blockIndex + 1}: প্রশ্নের মূল বক্তব্য (QUESTION) অনুপস্থিত।`);
    }

    // Options A, B, C, D
    const optionA = fields['A'] || '';
    const optionB = fields['B'] || '';
    const optionC = fields['C'] || '';
    const optionD = fields['D'] || '';
    const optionE = fields['E'] || '';

    if (!optionA) errors.push(`প্রশ্ন ${blockIndex + 1}: অপশন A অনুপস্থিত।`);
    if (!optionB) errors.push(`প্রশ্ন ${blockIndex + 1}: অপশন B অনুপস্থিত।`);
    if (!optionC) errors.push(`প্রশ্ন ${blockIndex + 1}: অপশন C অনুপস্থিত।`);

    const options: QuestionOption[] = [];
    if (optionA) options.push({ id: 'A', text: optionA });
    if (optionB) options.push({ id: 'B', text: optionB });
    if (optionC) options.push({ id: 'C', text: optionC });
    if (optionD) options.push({ id: 'D', text: optionD });
    if (optionE) options.push({ id: 'E', text: optionE });

    // Answer resolution
    const rawAnswerField = fields['ANSWER'] || fields['CORRECT_ANSWER'] || fields['ANS'] || '';
    let resolvedAnswer = mapBanglaOptionToLetter(rawAnswerField);

    if (!resolvedAnswer) {
      errors.push('ANSWER missing');
      errors.push(`প্রশ্ন ${blockIndex + 1}: সঠিক উত্তর (ANSWER) অনুপস্থিত।`);
    } else {
      // If answer is not 'A', 'B', 'C', 'D', 'E', check if it matches option text
      let matchingOption = options.find(o => o.id === resolvedAnswer);
      if (!matchingOption && rawAnswerField) {
        const textMatch = options.find(o => o.text.trim().toLowerCase() === rawAnswerField.trim().toLowerCase());
        if (textMatch) {
          resolvedAnswer = textMatch.id;
          matchingOption = textMatch;
        }
      }

      if (!matchingOption) {
        const availableChoices = options.map(o => o.id).join(', ') || 'কোনো অপশন নেই';
        errors.push(`ANSWER '${rawAnswerField}' does not match an option`);
        errors.push(`প্রশ্ন ${blockIndex + 1}: সঠিক উত্তর ${rawAnswerField} দেওয়া হয়েছে, কিন্তু ${availableChoices} অপশনের মধ্যে পাওয়া যায়নি।`);
      }
    }

    // Short Explanation
    const shortExplanation = fields['SHORT_EXPLANATION'] || fields['EXPLANATION'] || '';
    if (!shortExplanation || !shortExplanation.trim()) {
      errors.push('SHORT_EXPLANATION missing');
      errors.push(`প্রশ্ন ${blockIndex + 1}: সংক্ষিপ্ত ব্যাখ্যা (SHORT_EXPLANATION) অনুপস্থিত।`);
    }

    const detailedExplanation = fields['DETAILED_EXPLANATION'] || fields['DETAILED_EXP'] || undefined;

    // Time validation (10 to 300 seconds)
    const rawTime = fields['TIME'] || fields['ESTIMATED_TIME'] || '';
    let estimatedSeconds = parseInt(rawTime, 10);
    if (!rawTime) {
      estimatedSeconds = 45;
    } else if (isNaN(estimatedSeconds) || estimatedSeconds < 10 || estimatedSeconds > 300) {
      errors.push(`প্রশ্ন ${blockIndex + 1}: সময় ১০ থেকে ৩০০ সেকেন্ডের মধ্যে হতে হবে (বর্তমান: ${rawTime})।`);
      estimatedSeconds = 45;
    }

    // Image placeholder detection
    const fullTextContent = `${stem} ${shortExplanation} ${detailedExplanation || ''}`;
    const hasImagePlaceholder = checkImagePlaceholder(fullTextContent);

    // Duplicate detection
    const normStem = normalizeString(stem);
    let isDuplicateCandidate = false;
    if (normStem) {
      if (normalizedStems.has(normStem)) {
        isDuplicateCandidate = true;
        errors.push(`প্রশ্ন ${blockIndex + 1}: একই ব্যাচের মধ্যে পূর্ববর্তী প্রশ্নের সাথে মিল (সম্ভাব্য ডুপ্লিকেট)।`);
      } else {
        normalizedStems.add(normStem);
      }
    }

    const rawSourceStatus = (fields['SOURCE_STATUS'] || targetMetadata?.sourceStatus || 'original_practice').toLowerCase();
    const sourceStatus: SourceStatus = ['verified', 'needs_verification', 'original_practice'].includes(rawSourceStatus)
      ? (rawSourceStatus as SourceStatus)
      : 'original_practice';
    const needsSourceVerification = sourceStatus === 'needs_verification';

    if (sourceStatus === 'verified' && !fields['SOURCE_TITLE'] && !targetMetadata?.sourceTitle) {
      errors.push('SOURCE_TITLE is required when SOURCE_STATUS is verified');
    }
    if ((rawSourceStatus === 'past_year' || fields['PAST_YEAR']) && !fields['PAST_YEAR'] && !fields['YEAR'] && !targetMetadata?.pastYear) {
      errors.push('PAST_YEAR is required when SOURCE_STATUS is past_year');
    }
    if (feature === 'past_questions' && !fields['YEAR'] && !fields['PAST_YEAR'] && !targetMetadata?.pastYear) {
      errors.push('YEAR is required when FEATURES contains past_questions');
    }

    const sourceQuestionNum = fields['SOURCE_QUESTION_NUMBER'] || fields['SOURCE_Q_NO'] || fields['QUESTION_NUMBER'] || fields['Q_NO'] || fields['SL'] || (blockIndex + 1);

    const internalId = fields['ID'] || generateUniqueInternalQuestionId(
      route,
      subject,
      paper,
      chapterName,
      normSourceSet?.id || 'teacher',
      topicId || 'general',
      blockIndex + 1,
      sourceQuestionNum
    );

    const parsedQuestion: NonNullable<ParseResultItem['parsedItem']> = {
      id: internalId,
      version: 1,
      route,
      subject,
      subjectId: targetMetadata?.subjectId,
      paper,
      sectionId: targetMetadata?.sectionId,
      sectionName: targetMetadata?.sectionName,
      chapterId: targetMetadata?.chapterId,
      chapterName,
      topicId,
      topicName: topicName || undefined,
      sourceSet: normSourceSet?.id as any,
      sourceSetLabel: normSourceSet?.label as any,
      sourceQuestionNumber: sourceQuestionNum,
      questionType: 'single_choice',
      stem,
      questionText: stem,
      options,
      correctOptionId: resolvedAnswer,
      correctOption: resolvedAnswer,
      explanation: {
        shortExplanation,
        detailedExplanation,
        hint: fields['HINT'] || undefined
      },
      shortExplanation,
      detailedExplanation,
      estimatedSeconds,
      timeSeconds: estimatedSeconds,
      difficulty: (fields['DIFFICULTY']?.toLowerCase() as any) || 'standard',
      language: (fields['LANGUAGE']?.toLowerCase() as any) || 'bn',
      source: {
        status: sourceStatus,
        title: fields['SOURCE_TITLE'] || normSourceSet?.label || 'প্রশ্নব্যাংক',
        publisher: fields['SOURCE_PUBLISHER'],
        url: fields['SOURCE_URL'],
        year: fields['YEAR']
      },
      sourceStatus,
      featureTags: [feature],
      tags: fields['TAGS']
        ? fields['TAGS'].split(',').map(t => t.trim()).filter(Boolean)
        : [route, feature, subject, normSourceSet?.id || '', topicId || ''].filter(Boolean),
      status: 'draft',
      createdBy: creatorEmail,
      hasImagePlaceholder
    };

    parsedItems.push({
      index: blockIndex + 1,
      rawId: fields['ID'],
      sourceQuestionNumber: sourceQuestionNum,
      parsedItem: parsedQuestion,
      errors,
      isDuplicateCandidate,
      needsSourceVerification,
      hasImagePlaceholder,
      rawFields: fields
    });
  });

  const validCount = parsedItems.filter(i => i.errors.length === 0).length;
  const invalidCount = parsedItems.filter(i => i.errors.length > 0).length;
  const duplicateCount = parsedItems.filter(i => i.isDuplicateCandidate).length;
  const needsVerificationCount = parsedItems.filter(i => i.needsSourceVerification).length;

  return {
    totalParsed: parsedItems.length,
    validCount,
    invalidCount,
    duplicateCount,
    needsVerificationCount,
    items: parsedItems
  };
}

export function validatePublishGuard(question: Partial<QuestionItem>): string[] {
  const errors: string[] = [];

  if (!question.stem || !question.stem.trim()) {
    errors.push('Question text (stem) is required');
    errors.push('প্রশ্নের মূল বক্তব্য (Stem) প্রয়োজন');
  }

  if (!question.options || question.options.length < 3) {
    errors.push('At least 3 options are required');
    errors.push('কমপক্ষে ৩টি অপশন থাকা আবশ্যক');
  } else {
    question.options.forEach((opt, idx) => {
      if (!opt.text || !opt.text.trim()) {
        errors.push(`অপশন ${opt.id || idx + 1} এর টেক্সট খালি রাখা যাবে না`);
      }
    });
  }

  if (!question.correctOptionId) {
    errors.push('সঠিক উত্তর (Correct Option) নির্বাচন করা হয়নি');
  } else if (question.options && !question.options.some(o => o.id === question.correctOptionId)) {
    errors.push(`সঠিক উত্তর '${question.correctOptionId}' প্রদত্ত অপশন তালিকার সাথে মিলছে না`);
  }

  if (!question.explanation?.shortExplanation || !question.explanation.shortExplanation.trim()) {
    errors.push('Short explanation is required');
    errors.push('সংক্ষিপ্ত ব্যাখ্যা (Short Explanation) আবশ্যক');
  }

  if (!question.route) {
    errors.push('রুট (Route) আবশ্যক');
  }

  if (!question.subject) {
    errors.push('বিষয় (Subject) আবশ্যক');
  }

  if (!question.featureTags || question.featureTags.length === 0) {
    errors.push('কমপক্ষে একটি ফিচার ট্যাগ প্রয়োজন');
  }

  return errors;
}

export interface BengaliMcqParsed {
  topic?: string;
  uddipok?: string;
  question: string;
  figure_note?: string;
  option_ka: string;
  option_kha: string;
  option_ga: string;
  option_gha: string;
  option_uma?: string;
  correct: string;
  explanation: string;
  rawBlock: string;
}

export interface BengaliBatchParseResult {
  addedCount: number;
  skippedIndices: number[];
  items: BengaliMcqParsed[];
}

export function parseBengaliTypedMcq(blockText: string): BengaliMcqParsed | null {
  if (!blockText || !blockText.trim()) return null;

  const lines = blockText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  let topic = '';
  let uddipok = '';
  let questionStem = '';
  let figure_note = '';
  let option_ka = '';
  let option_kha = '';
  let option_ga = '';
  let option_gha = '';
  let option_uma = '';
  let correct = '';
  let explanation = '';

  let currentSection: 'topic' | 'uddipok' | 'question' | 'figure' | 'explanation' = 'question';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('সঠিক উত্তর:') || line.startsWith('সঠিক উত্তর :')) {
      correct = line;
      continue;
    }

    if (line.startsWith('ব্যাখ্যা:') || line.startsWith('ব্যাখ্যা :')) {
      explanation = line.replace(/^ব্যাখ্যা\s*:\s*/, '');
      currentSection = 'explanation';
      continue;
    }

    if (line.includes('উদ্দীপক') || line.startsWith('নিচের উদ্দীপকটি')) {
      uddipok = (uddipok ? uddipok + '\n' : '') + line;
      currentSection = 'uddipok';
      continue;
    }

    if (line.startsWith('[এখানে চিত্র ছিল]') || line.includes('চিত্রের বর্ণনা') || line.includes('চিত্র:')) {
      figure_note = (figure_note ? figure_note + '\n' : '') + line;
      currentSection = 'figure';
      continue;
    }

    const mKa = line.match(/^(?:ক[)\.]|A[)\.])\s*(.*)$/);
    if (mKa) { option_ka = mKa[1].trim(); continue; }

    const mKha = line.match(/^(?:খ[)\.]|B[)\.])\s*(.*)$/);
    if (mKha) { option_kha = mKha[1].trim(); continue; }

    const mGa = line.match(/^(?:গ[)\.]|C[)\.])\s*(.*)$/);
    if (mGa) { option_ga = mGa[1].trim(); continue; }

    const mGha = line.match(/^(?:ঘ[)\.]|D[)\.])\s*(.*)$/);
    if (mGha) { option_gha = mGha[1].trim(); continue; }

    const mUma = line.match(/^(?:ঙ[)\.]|E[)\.])\s*(.*)$/);
    if (mUma) { option_uma = mUma[1].trim(); continue; }

    if (currentSection === 'explanation') {
      explanation = (explanation ? explanation + '\n' : '') + line;
      continue;
    }

    const qNumMatch = line.match(/^(?:[০-৯0-9]+\s*[\.\)]\s*)(.*)$/);
    if (qNumMatch && !questionStem) {
      questionStem = qNumMatch[1].trim();
      currentSection = 'question';
      continue;
    }

    if (currentSection === 'question' && questionStem) {
      questionStem += ' ' + line;
    } else if (!questionStem) {
      topic = (topic ? topic + '\n' : '') + line;
    }
  }

  if (!option_ka || !option_kha || !option_ga || !option_gha || !correct) {
    return null;
  }

  return {
    topic: topic || undefined,
    uddipok: uddipok || undefined,
    question: questionStem || blockText,
    figure_note: figure_note || undefined,
    option_ka,
    option_kha,
    option_ga,
    option_gha,
    option_uma: option_uma || undefined,
    correct,
    explanation,
    rawBlock: blockText
  };
}

export function parseBengaliTypedBatch(rawBatchText: string): BengaliBatchParseResult {
  if (!rawBatchText || !rawBatchText.trim()) {
    return { addedCount: 0, skippedIndices: [], items: [] };
  }

  const blocks = rawBatchText
    .split(/(?=\n\s*(?:[০-৯0-9]+\s*[\.\)]))/g)
    .map(b => b.trim())
    .filter(Boolean);

  const items: BengaliMcqParsed[] = [];
  const skippedIndices: number[] = [];

  blocks.forEach((block, idx) => {
    const parsed = parseBengaliTypedMcq(block);
    if (parsed) {
      items.push(parsed);
    } else {
      skippedIndices.push(idx + 1);
    }
  });

  return {
    addedCount: items.length,
    skippedIndices,
    items
  };
}

