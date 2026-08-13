import {
  QuestionItem,
  QuestionOption,
  DeliveryFeature,
  MedicalSubject,
  SourceStatus,
  QuestionStatus
} from '../types/questionBank';

export interface ParseResultItem {
  index: number;
  rawId?: string;
  parsedItem?: Partial<QuestionItem>;
  errors: string[];
  isDuplicateCandidate?: boolean;
  needsSourceVerification?: boolean;
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

const ALLOWED_SUBJECTS: MedicalSubject[] = [
  'physics',
  'chemistry',
  'biology',
  'english',
  'general_knowledge'
];

const ALLOWED_FEATURES: DeliveryFeature[] = [
  'practice_bank',
  'past_questions',
  'subject_test',
  'mock_test',
  'routine_review',
  'competition_future'
];

const ALLOWED_SOURCE_STATUSES: SourceStatus[] = [
  'verified',
  'needs_verification',
  'original_practice'
];

const RECOGNIZED_HEADERS = new Set([
  'ID',
  'ROUTE',
  'SUBJECT',
  'PAPER',
  'CHAPTER',
  'TOPIC',
  'FEATURES',
  'DIFFICULTY',
  'TIME',
  'LANGUAGE',
  'SOURCE_STATUS',
  'SOURCE_TITLE',
  'SOURCE_PUBLISHER',
  'SOURCE_URL',
  'YEAR',
  'TAGS',
  'QUESTION',
  'A',
  'B',
  'C',
  'D',
  'ANSWER',
  'SHORT_EXPLANATION',
  'DETAILED_EXPLANATION',
  'HINT'
]);

function normalizeString(str?: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/[\s\p{P}]/gu, '');
}

export function parsePlainTextQuestions(rawText: string, creatorEmail: string = 'admin@example.com'): ParseResult {
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

  // Split by ---QUESTION--- marker
  const rawBlocks = rawText
    .split(/---QUESTION---/i)
    .map(b => b.replace(/---END---/gi, '').trim())
    .filter(b => b.length > 0);

  const parsedItems: ParseResultItem[] = [];
  const normalizedStems = new Set<string>();

  rawBlocks.forEach((block, blockIndex) => {
    const lines = block.split(/\r?\n/);
    const fields: Record<string, string> = {};
    let currentKey: string | null = null;

    lines.forEach(line => {
      const match = line.match(/^([A-Z_]+):\s*(.*)$/i);
      if (match) {
        const potentialKey = match[1].toUpperCase();
        if (RECOGNIZED_HEADERS.has(potentialKey)) {
          currentKey = potentialKey;
          fields[currentKey] = match[2];
          return;
        }
      }

      if (currentKey) {
        fields[currentKey] = (fields[currentKey] ? fields[currentKey] + '\n' : '') + line;
      }
    });

    // Clean up field values
    Object.keys(fields).forEach(k => {
      fields[k] = fields[k].trim();
    });

    const errors: string[] = [];

    // Validation: ROUTE
    const route = (fields['ROUTE'] || '').toLowerCase();
    if (!route) {
      errors.push('ROUTE missing');
    } else if (route !== 'medical') {
      errors.push('ROUTE must be medical for this version');
    }

    // Validation: SUBJECT
    const subject = (fields['SUBJECT'] || '').toLowerCase() as MedicalSubject;
    if (!subject) {
      errors.push('SUBJECT missing');
    } else if (!ALLOWED_SUBJECTS.includes(subject)) {
      errors.push(`SUBJECT '${fields['SUBJECT']}' is invalid. Allowed: physics, chemistry, biology, english, general_knowledge`);
    }

    // Validation: FEATURES
    const rawFeatures = (fields['FEATURES'] || '').split(',').map(f => f.trim().toLowerCase()).filter(Boolean);
    const validFeatures: DeliveryFeature[] = [];
    rawFeatures.forEach(f => {
      if (ALLOWED_FEATURES.includes(f as DeliveryFeature)) {
        validFeatures.push(f as DeliveryFeature);
      } else {
        errors.push(`Invalid feature tag '${f}'`);
      }
    });
    if (rawFeatures.length === 0) {
      errors.push('FEATURES missing');
    }

    // Validation: QUESTION text (stem)
    const stem = fields['QUESTION'] || '';
    if (!stem) {
      errors.push('QUESTION text missing');
    }

    // Options A, B, C required, D optional for 3-option MCQ
    const optionA = fields['A'] || '';
    const optionB = fields['B'] || '';
    const optionC = fields['C'] || '';
    const optionD = fields['D'] || '';

    if (!optionA) errors.push('Option A missing');
    if (!optionB) errors.push('Option B missing');
    if (!optionC) errors.push('Option C missing');

    const options: QuestionOption[] = [];
    if (optionA) options.push({ id: 'A', text: optionA });
    if (optionB) options.push({ id: 'B', text: optionB });
    if (optionC) options.push({ id: 'C', text: optionC });
    if (optionD) options.push({ id: 'D', text: optionD });

    // Validation: ANSWER
    const rawAnswer = (fields['ANSWER'] || '').trim().toUpperCase();
    if (!rawAnswer) {
      errors.push('ANSWER missing');
    } else {
      const matchingOption = options.find(o => o.id === rawAnswer);
      if (!matchingOption) {
        errors.push(`ANSWER '${rawAnswer}' does not match an option (${options.map(o => o.id).join(', ')})`);
      }
    }

    // Validation: SHORT_EXPLANATION
    const shortExplanation = fields['SHORT_EXPLANATION'] || '';
    if (!shortExplanation) {
      errors.push('SHORT_EXPLANATION missing');
    }

    // Validation: TIME
    const rawTime = fields['TIME'] || '';
    let estimatedSeconds = parseInt(rawTime, 10);
    if (!rawTime) {
      errors.push('TIME missing');
      estimatedSeconds = 45;
    } else if (isNaN(estimatedSeconds) || estimatedSeconds < 10 || estimatedSeconds > 300) {
      errors.push('TIME must be between 10 and 300 seconds');
    }

    // Validation: SOURCE_STATUS
    const sourceStatus = (fields['SOURCE_STATUS'] || 'needs_verification').toLowerCase() as SourceStatus;
    if (!fields['SOURCE_STATUS']) {
      errors.push('SOURCE_STATUS missing');
    } else if (!ALLOWED_SOURCE_STATUSES.includes(sourceStatus)) {
      errors.push(`SOURCE_STATUS '${fields['SOURCE_STATUS']}' is invalid`);
    }

    const sourceTitle = fields['SOURCE_TITLE'] || '';
    const year = fields['YEAR'] || '';

    if (sourceStatus === 'verified' && !sourceTitle) {
      errors.push('SOURCE_TITLE is required when SOURCE_STATUS is verified');
    }

    if (validFeatures.includes('past_questions')) {
      if (!sourceTitle) {
        errors.push('SOURCE_TITLE is required when FEATURES contains past_questions');
      }
      if (!year) {
        errors.push('YEAR is required when FEATURES contains past_questions');
      }
    }

    // Duplicate candidate check
    const normalizedStem = normalizeString(stem);
    let isDuplicateCandidate = false;
    if (normalizedStem) {
      if (normalizedStems.has(normalizedStem)) {
        isDuplicateCandidate = true;
      } else {
        normalizedStems.add(normalizedStem);
      }
    }

    const needsSourceVerification = sourceStatus === 'needs_verification';

    // Construct QuestionItem if valid/partial
    const paper = (fields['PAPER'] || 'not_applicable').toLowerCase() as any;
    const difficulty = (fields['DIFFICULTY'] || 'standard').toLowerCase() as any;
    const language = (fields['LANGUAGE'] || 'bn').toLowerCase() as any;

    const tags = (fields['TAGS'] || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const questionItem: Partial<QuestionItem> = {
      id: fields['ID'] || `med_${Date.now()}_${blockIndex + 1}`,
      version: 1,
      route: 'medical',
      subject,
      paper: ['first', 'second', 'not_applicable'].includes(paper) ? paper : 'not_applicable',
      chapterName: fields['CHAPTER'] || '',
      topicName: fields['TOPIC'] || '',
      questionType: 'single_choice',
      stem,
      options,
      correctOptionId: rawAnswer,
      explanation: {
        shortExplanation,
        detailedExplanation: fields['DETAILED_EXPLANATION'] || '',
        hint: fields['HINT'] || ''
      },
      estimatedSeconds,
      difficulty: ['foundation', 'standard', 'challenge', 'exam'].includes(difficulty) ? difficulty : 'standard',
      language: ['bn', 'en', 'mixed'].includes(language) ? language : 'bn',
      source: {
        status: sourceStatus,
        title: sourceTitle,
        url: fields['SOURCE_URL'] || '',
        year
      },
      featureTags: validFeatures,
      tags,
      status: 'draft',
      createdBy: creatorEmail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    parsedItems.push({
      index: blockIndex + 1,
      rawId: fields['ID'],
      parsedItem: questionItem,
      errors,
      isDuplicateCandidate,
      needsSourceVerification,
      rawFields: fields
    });
  });

  const validItems = parsedItems.filter(i => i.errors.length === 0);
  const invalidItems = parsedItems.filter(i => i.errors.length > 0);
  const duplicateItems = parsedItems.filter(i => i.isDuplicateCandidate);
  const needsVerifItems = parsedItems.filter(i => i.needsSourceVerification);

  return {
    totalParsed: parsedItems.length,
    validCount: validItems.length,
    invalidCount: invalidItems.length,
    duplicateCount: duplicateItems.length,
    needsVerificationCount: needsVerifItems.length,
    items: parsedItems
  };
}

export function validatePublishGuard(question: Partial<QuestionItem>): string[] {
  const errors: string[] = [];

  if (!question.stem || !question.stem.trim()) {
    errors.push('Question text (stem) is required');
  }

  if (!question.options || question.options.length < 3) {
    errors.push('At least 3 options are required');
  } else {
    question.options.forEach((opt, idx) => {
      if (!opt.text || !opt.text.trim()) {
        errors.push(`Option ${opt.id || idx + 1} text cannot be empty`);
      }
    });
  }

  if (!question.correctOptionId) {
    errors.push('Correct option ID is required');
  } else if (question.options && !question.options.some(o => o.id === question.correctOptionId)) {
    errors.push(`Correct option '${question.correctOptionId}' is not among option choices`);
  }

  if (!question.explanation?.shortExplanation || !question.explanation.shortExplanation.trim()) {
    errors.push('Short explanation is required');
  }

  if (!question.route || question.route !== 'medical') {
    errors.push('Route must be medical');
  }

  if (!question.subject) {
    errors.push('Subject is required');
  }

  if (!question.featureTags || question.featureTags.length === 0) {
    errors.push('At least one feature tag is required');
  }

  if (question.source) {
    if (question.source.status === 'verified' && !question.source.title) {
      errors.push('Source title is required when source status is verified');
    }
    if (question.featureTags?.includes('past_questions')) {
      if (!question.source.title) {
        errors.push('Source title is required for past questions');
      }
      if (!question.source.year) {
        errors.push('Year is required for past questions');
      }
    }
  } else {
    errors.push('Source information is required');
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

    // Option matching
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

    // Question number stem
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

  // Strict check: must have options ka, kha, ga, gha and correct line
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

  // Split blocks by empty line or question number start e.g. "১. " or "2. "
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
