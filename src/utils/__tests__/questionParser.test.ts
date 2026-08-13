import { describe, it, expect } from 'vitest';
import { parsePlainTextQuestions, validatePublishGuard, parseBengaliTypedMcq, parseBengaliTypedBatch } from '../questionParser';

describe('Plain Text Question Parser', () => {
  it('parses one valid plain-text question correctly', () => {
    const text = `---QUESTION---
ID: MED-BIO-001
ROUTE: medical
SUBJECT: biology
PAPER: first
CHAPTER: কোষ
TOPIC: প্লাস্টিড
FEATURES: practice_bank
DIFFICULTY: standard
TIME: 45
LANGUAGE: bn
SOURCE_STATUS: original_practice
QUESTION: উদ্ভিদকোষের পাওয়ার হাউস কোনটি?
A: গলগি বডি
B: মাইটোকন্ড্রিয়া
C: লাইসোজোম
D: রাইবোজোম
ANSWER: B
SHORT_EXPLANATION: মাইটোকন্ড্রিয়া শসনের মাধ্যমে শক্তি উৎপন্ন করে।
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.totalParsed).toBe(1);
    expect(result.validCount).toBe(1);
    expect(result.invalidCount).toBe(0);

    const item = result.items[0].parsedItem!;
    expect(item.id).toBe('MED-BIO-001');
    expect(item.route).toBe('medical');
    expect(item.subject).toBe('biology');
    expect(item.options).toHaveLength(4);
    expect(item.correctOptionId).toBe('B');
    expect(item.explanation?.shortExplanation).toContain('মাইটোকন্ড্রিয়া');
  });

  it('parses multiple question blocks', () => {
    const text = `---QUESTION---
ID: Q1
ROUTE: medical
SUBJECT: physics
FEATURES: practice_bank
QUESTION: বলের মাত্রা কোনটি?
A: MLT^-2
B: MLT^-1
C: MLT
D: M^2LT
ANSWER: A
SHORT_EXPLANATION: F = ma
TIME: 30
SOURCE_STATUS: original_practice
---END---

---QUESTION---
ID: Q2
ROUTE: medical
SUBJECT: chemistry
FEATURES: practice_bank
QUESTION: পানির আণবিক ভর কত?
A: 16
B: 18
C: 20
D: 22
ANSWER: B
SHORT_EXPLANATION: H2O = 2 + 16 = 18
TIME: 30
SOURCE_STATUS: original_practice
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.totalParsed).toBe(2);
    expect(result.validCount).toBe(2);
  });

  it('detects missing answer error', () => {
    const text = `---QUESTION---
ROUTE: medical
SUBJECT: biology
FEATURES: practice_bank
QUESTION: ডিএনএ এর ডাবল হেলিক্স কাঠামোর আবিষ্কারক কে?
A: ওয়াটসন ও ক্রিক
B: রবার্ট হুক
C: লুই পাস্তুর
D: মেন্ডেল
SHORT_EXPLANATION: ওয়াটসন ও ক্রিক ১৯৫৩ সালে আবিষ্কার করেন।
TIME: 45
SOURCE_STATUS: original_practice
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.invalidCount).toBe(1);
    expect(result.items[0].errors).toContain('ANSWER missing');
  });

  it('detects answer does not match option error', () => {
    const text = `---QUESTION---
ROUTE: medical
SUBJECT: biology
FEATURES: practice_bank
QUESTION: পেশিতন্তুর আবরণীকে কী বলে?
A: সারকোলেমা
B: মায়োলেমা
C: নিউরোলেমা
D: এপিলেমা
ANSWER: E
SHORT_EXPLANATION: সারকোলেমা।
TIME: 45
SOURCE_STATUS: original_practice
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.invalidCount).toBe(1);
    expect(result.items[0].errors.some(e => e.includes("ANSWER 'E' does not match an option"))).toBe(true);
  });

  it('detects invalid subject error', () => {
    const text = `---QUESTION---
ROUTE: medical
SUBJECT: astronomy
FEATURES: practice_bank
QUESTION: মহাবিশ্বের বয়স কত?
A: ১৩.৮ বিলিয়ন বছর
B: ১০ বিলিয়ন বছর
C: ১৫ বিলিয়ন বছর
D: ৫ বিলিয়ন বছর
ANSWER: A
SHORT_EXPLANATION: ১৩.৮ বিলিয়ন বছর।
TIME: 45
SOURCE_STATUS: original_practice
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.invalidCount).toBe(1);
    expect(result.items[0].errors.some(e => e.includes("SUBJECT 'astronomy' is invalid"))).toBe(true);
  });

  it('detects missing explanation error', () => {
    const text = `---QUESTION---
ROUTE: medical
SUBJECT: english
FEATURES: practice_bank
QUESTION: Select the correct sentence.
A: He is senior than me.
B: He is senior to me.
C: He is senior from me.
D: He is senior with me.
ANSWER: B
TIME: 30
SOURCE_STATUS: original_practice
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.invalidCount).toBe(1);
    expect(result.items[0].errors).toContain('SHORT_EXPLANATION missing');
  });

  it('detects verified source missing source title error', () => {
    const text = `---QUESTION---
ROUTE: medical
SUBJECT: biology
FEATURES: practice_bank
QUESTION: হরমোন সরাসরি রক্তে নিঃসৃত হয় কোন গ্রন্থি থেকে?
A: এন্ডোক্রাইন
B: এক্সোক্রাইন
C: মিক্সড
D: কোনোটিই নয়
ANSWER: A
SHORT_EXPLANATION: অনাল বা এন্ডোক্রাইন গ্রন্থি।
TIME: 45
SOURCE_STATUS: verified
SOURCE_TITLE:
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.invalidCount).toBe(1);
    expect(result.items[0].errors).toContain('SOURCE_TITLE is required when SOURCE_STATUS is verified');
  });

  it('detects past question missing year error', () => {
    const text = `---QUESTION---
ROUTE: medical
SUBJECT: chemistry
FEATURES: past_questions
QUESTION: কোনটির ইলেকট্রন আসক্তি সবচেয়ে বেশি?
A: ফ্লুরিন
B: ক্লোরিন
C: ব্রোমিন
D: আয়োডিন
ANSWER: B
SHORT_EXPLANATION: ক্লোরিনের ইলেকট্রন আসক্তি সর্বোচ্চ।
TIME: 45
SOURCE_STATUS: verified
SOURCE_TITLE: মেডিকেল ভর্তি পরীক্ষা
YEAR:
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.invalidCount).toBe(1);
    expect(result.items[0].errors).toContain('YEAR is required when FEATURES contains past_questions');
  });

  it('handles 3-option and 4-option MCQ correctly', () => {
    const text3Opt = `---QUESTION---
ROUTE: medical
SUBJECT: general_knowledge
FEATURES: practice_bank
QUESTION: বাংলাদেশের জাতীয় ফল কোনটি?
A: আম
B: কাঁঠাল
C: লিচু
ANSWER: B
SHORT_EXPLANATION: কাঁঠাল বাংলাদেশের জাতীয় ফল।
TIME: 30
SOURCE_STATUS: original_practice
---END---`;

    const result = parsePlainTextQuestions(text3Opt);
    expect(result.validCount).toBe(1);
    expect(result.items[0].parsedItem?.options).toHaveLength(3);
  });

  it('detects duplicate normalized question stem in batch', () => {
    const text = `---QUESTION---
ROUTE: medical
SUBJECT: physics
FEATURES: practice_bank
QUESTION: আলো এক ধরণের কী?
A: তরঙ্গ
B: কণা
C: উভয়ই
D: কোনোটিই নয়
ANSWER: C
SHORT_EXPLANATION: আলো তরঙ্গ ও কণা উভয় ধর্ম প্রকাশ করে।
TIME: 30
SOURCE_STATUS: original_practice
---END---

---QUESTION---
ROUTE: medical
SUBJECT: physics
FEATURES: practice_bank
QUESTION: আলো এক ধরণের কী?
A: তরঙ্গ
B: কণা
C: উভয়ই
D: কোনোটিই নয়
ANSWER: C
SHORT_EXPLANATION: রিপিট প্রশ্ন।
TIME: 30
SOURCE_STATUS: original_practice
---END---`;

    const result = parsePlainTextQuestions(text);
    expect(result.duplicateCount).toBe(1);
    expect(result.items[1].isDuplicateCandidate).toBe(true);
  });

  it('publish guard prevents invalid draft from publishing', () => {
    const invalidQuestion = {
      stem: '', // empty stem
      options: [
        { id: 'A', text: 'Opt A' },
        { id: 'B', text: 'Opt B' }
      ], // less than 3 options
      correctOptionId: 'C', // invalid correct choice
      explanation: { shortExplanation: '' },
      route: 'medical' as const,
      subject: 'biology' as const,
      featureTags: []
    };

    const errors = validatePublishGuard(invalidQuestion);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toContain('Question text (stem) is required');
    expect(errors).toContain('At least 3 options are required');
    expect(errors).toContain('Short explanation is required');
  });

  it('parses Bengali typed MCQ with exact LaTeX math preservation', () => {
    const rawMcq = `১. $\\lim_{n\\to\\infty}\\frac{1}{n^4}\\sum_{r=1}^n r^3 = $ ? [IUT'19-'20]
ক) $\\frac{1}{4}$
খ) $\\frac{1}{2}$
গ) $4$
ঘ) $\\frac{1}{8}$
সঠিক উত্তর: ক) $\\frac{1}{4}$
ব্যাখ্যা: $$ \\lim_{n\\to\\infty}\\frac{1}{n^4}\\left\\{\\frac{n(n+1)}{2}\\right\\}^2 = \\frac{1}{4} $$`;

    const parsed = parseBengaliTypedMcq(rawMcq);
    expect(parsed).not.toBeNull();
    expect(parsed?.question).toContain('$\\lim_{n\\to\\infty}\\frac{1}{n^4}\\sum_{r=1}^n r^3 = $');
    expect(parsed?.option_ka).toBe('$\\frac{1}{4}$');
    expect(parsed?.option_kha).toBe('$\\frac{1}{2}$');
    expect(parsed?.option_ga).toBe('$4$');
    expect(parsed?.option_gha).toBe('$\\frac{1}{8}$');
    expect(parsed?.correct).toBe('সঠিক উত্তর: ক) $\\frac{1}{4}$');
    expect(parsed?.explanation).toContain('$$ \\lim_{n\\to\\infty}\\frac{1}{n^4}\\left\\{\\frac{n(n+1)}{2}\\right\\}^2 = \\frac{1}{4} $$');
  });

  it('skips invalid block missing options or correct answer in batch', () => {
    const batchText = `১. $\\lim_{x\\to 0}\\frac{\\sin x}{x} = ?$
ক) $1$
খ) $0$
গ) $-1$
ঘ) $\\infty$
সঠিক উত্তর: ক) $1$
ব্যাখ্যা: standard limit.

২. Invalid question without options
সঠিক উত্তর: ক) $0$`;

    const result = parseBengaliTypedBatch(batchText);
    expect(result.addedCount).toBe(1);
    expect(result.skippedIndices).toEqual([2]);
  });
});
