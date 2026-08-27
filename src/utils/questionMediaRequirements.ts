/**
 * Universal Question Placeholder Detection Engine (Phase 1)
 *
 * Pure reusable TypeScript utility to detect image placeholders (`[এখানে চিত্র ছিল]`)
 * in normalized question objects without altering any question content.
 */

export type MediaPlacement =
  | 'question'
  | 'stimulus'
  | 'option_a'
  | 'option_b'
  | 'option_c'
  | 'option_d'
  | 'option_e'
  | 'explanation';

export interface MediaRequirement {
  questionKey: string;
  placement: MediaPlacement;
  placeholderFound: boolean;
}

export const PLACEHOLDER_TAG = '[এখানে চিত্র ছিল]';

/**
 * Checks if a given text contains the image placeholder tag [এখানে চিত্র ছিল]
 */
export function hasImagePlaceholder(text?: string | null): boolean {
  if (!text || typeof text !== 'string') return false;
  return text.includes(PLACEHOLDER_TAG) || /\[\s*এখানে\s*চিত্র\s*ছিল\s*\]/.test(text);
}

/**
 * Extracts raw text from an option entry which can be a string or an object { text: string }
 */
function extractOptionText(opt: any): string {
  if (typeof opt === 'string') return opt;
  if (opt && typeof opt === 'object') {
    if (typeof opt.text === 'string') return opt.text;
    if (typeof opt.optionText === 'string') return opt.optionText;
  }
  return '';
}

/**
 * Pure function: Inspects a normalized question object and detects all media requirements
 * based on the presence of `[এখানে চিত্র ছিল]`.
 *
 * Inspects:
 * - questionText (stem / question / question_text)
 * - stimulus (context / passage)
 * - option A (option_a / options[0])
 * - option B (option_b / options[1])
 * - option C (option_c / options[2])
 * - option D (option_d / options[3])
 * - option E (option_e / options[4] if available)
 * - shortExplanation (explanation.shortExplanation / shortExplanation)
 * - detailedExplanation (explanation.detailedExplanation / detailedExplanation / explanation as string)
 *
 * Does NOT modify the original question object.
 */
export function getQuestionMediaRequirements(question: any): MediaRequirement[] {
  if (!question || typeof question !== 'object') {
    return [];
  }

  const requirements: MediaRequirement[] = [];
  const questionKey = String(
    question.questionKey ||
    question.stableKey ||
    question.id ||
    ''
  );

  // 1. Question Text (stem / questionText / question / question_text)
  const questionText =
    question.questionText ??
    question.stem ??
    question.question ??
    question.question_text ??
    '';
  if (hasImagePlaceholder(String(questionText))) {
    requirements.push({
      questionKey,
      placement: 'question',
      placeholderFound: true
    });
  }

  // 2. Stimulus / উদ্দীপক (stimulus / context / passage / stem_context)
  const stimulusText =
    question.stimulus ??
    question.context ??
    question.passage ??
    question.stem_context ??
    '';
  if (hasImagePlaceholder(String(stimulusText))) {
    requirements.push({
      questionKey,
      placement: 'stimulus',
      placeholderFound: true
    });
  }

  // 3. Option A
  const optAText =
    question.optionA ??
    question.option_a ??
    (Array.isArray(question.options) ? extractOptionText(question.options[0]) : '');
  if (hasImagePlaceholder(String(optAText))) {
    requirements.push({
      questionKey,
      placement: 'option_a',
      placeholderFound: true
    });
  }

  // 4. Option B
  const optBText =
    question.optionB ??
    question.option_b ??
    (Array.isArray(question.options) ? extractOptionText(question.options[1]) : '');
  if (hasImagePlaceholder(String(optBText))) {
    requirements.push({
      questionKey,
      placement: 'option_b',
      placeholderFound: true
    });
  }

  // 5. Option C
  const optCText =
    question.optionC ??
    question.option_c ??
    (Array.isArray(question.options) ? extractOptionText(question.options[2]) : '');
  if (hasImagePlaceholder(String(optCText))) {
    requirements.push({
      questionKey,
      placement: 'option_c',
      placeholderFound: true
    });
  }

  // 6. Option D
  const optDText =
    question.optionD ??
    question.option_d ??
    (Array.isArray(question.options) ? extractOptionText(question.options[3]) : '');
  if (hasImagePlaceholder(String(optDText))) {
    requirements.push({
      questionKey,
      placement: 'option_d',
      placeholderFound: true
    });
  }

  // 7. Option E (if available)
  const optEText =
    question.optionE ??
    question.option_e ??
    (Array.isArray(question.options) && question.options.length > 4 ? extractOptionText(question.options[4]) : '');
  if (hasImagePlaceholder(String(optEText))) {
    requirements.push({
      questionKey,
      placement: 'option_e',
      placeholderFound: true
    });
  }

  // 8. Explanation (shortExplanation, detailedExplanation, explanation string/object)
  let shortExp = '';
  let detailedExp = '';

  if (typeof question.shortExplanation === 'string') {
    shortExp = question.shortExplanation;
  }
  if (typeof question.detailedExplanation === 'string') {
    detailedExp = question.detailedExplanation;
  }

  if (question.explanation) {
    if (typeof question.explanation === 'string') {
      detailedExp = detailedExp ? `${detailedExp} ${question.explanation}` : question.explanation;
    } else if (typeof question.explanation === 'object') {
      if (typeof question.explanation.shortExplanation === 'string') {
        shortExp = shortExp || question.explanation.shortExplanation;
      }
      if (typeof question.explanation.detailedExplanation === 'string') {
        detailedExp = detailedExp || question.explanation.detailedExplanation;
      }
    }
  }

  if (hasImagePlaceholder(shortExp) || hasImagePlaceholder(detailedExp)) {
    requirements.push({
      questionKey,
      placement: 'explanation',
      placeholderFound: true
    });
  }

  return requirements;
}
