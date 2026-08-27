import { describe, it, expect } from 'vitest';
import { normalizeQuestionForScan, scanAllDatasetsForImageRequirements } from '../questionMediaScanner';
import { fetchAllQuestionsNeedingImage } from '../../lib/questionMediaOverrides';

describe('Universal Dynamic Question Media Scanner', () => {
  it('1. Returns null for questions with no image placeholder [এখানে চিত্র ছিল]', () => {
    const regularQuestion = {
      id: 101,
      question_text: 'নিচের কোনটি ইনপুট ডিভাইস?',
      options: ['কীবোর্ড', 'মনিটর', 'প্রিন্টার', 'স্পিকার'],
      correct_answer: 'কীবোর্ড',
      explanation: 'কীবোর্ড একটি ইনপুট ডিভাইস।'
    };

    const detected = normalizeQuestionForScan(regularQuestion, {
      route: 'academic',
      subject: 'ict',
      chapterName: 'সংখ্যা পদ্ধতি',
      sourceType: 'academic_ict'
    });

    expect(detected).toBeNull();
  });

  it('2. Dynamically detects question stem placeholder without hardcoded IDs', () => {
    const questionWithStemPlaceholder = {
      id: 9999, // arbitrary un-hardcoded ID
      question_text: 'চিত্রে প্রদর্শিত গেটটির আউটপুট কী হবে? [এখানে চিত্র ছিল]',
      options: ['0', '1', 'A+B', 'AB'],
      correct_answer: '1'
    };

    const detected = normalizeQuestionForScan(questionWithStemPlaceholder, {
      route: 'academic',
      subject: 'ict',
      paper: 'first',
      chapterName: 'ডিজিটাল ডিভাইস',
      sourceType: 'academic_ict'
    });

    expect(detected).not.toBeNull();
    expect(detected?.requiredPlacements).toContain('question');
    expect(detected?.detectedRequirements.some(r => r.placement === 'question')).toBe(true);
    expect(detected?.stableKey).toBeDefined();
    expect(detected?.stem).toBe('চিত্রে প্রদর্শিত গেটটির আউটপুট কী হবে? [এখানে চিত্র ছিল]');
  });

  it('3. Dynamically detects multiple placement placeholders (stem + options + explanation)', () => {
    const complexQuestion = {
      id: 116,
      question_text: 'নিচের কোন বর্তনীটি সঠিক? [এখানে চিত্র ছিল]',
      options: [
        'বর্তনী ক [এখানে চিত্র ছিল]',
        'বর্তনী খ [এখানে চিত্র ছিল]',
        'বর্তনী গ [এখানে চিত্র ছিল]',
        'বর্তনী ঘ [এখানে চিত্র ছিল]'
      ],
      correct_answer: 'বর্তনী ক [এখানে চিত্র ছিল]',
      explanation: 'ব্যাখ্যা: সঠিক বর্তনীর ডায়াগ্রাম নিচে দেওয়া হলো [এখানে চিত্র ছিল]'
    };

    const detected = normalizeQuestionForScan(complexQuestion, {
      route: 'academic',
      subject: 'physics',
      paper: 'second',
      chapterName: 'চল তড়িৎ',
      sourceType: 'static_practice'
    });

    expect(detected).not.toBeNull();
    const placements = detected?.detectedRequirements.map(r => r.placement) || [];
    expect(placements).toContain('question');
    expect(placements).toContain('option_a');
    expect(placements).toContain('option_b');
    expect(placements).toContain('option_c');
    expect(placements).toContain('option_d');
    expect(placements).toContain('explanation');
  });

  it('4. Scans all static datasets and returns dynamically detected items', async () => {
    const allDetected = await scanAllDatasetsForImageRequirements([]);
    expect(Array.isArray(allDetected)).toBe(true);
    expect(allDetected.length).toBeGreaterThan(0);

    // Verify all detected questions actually contain the placeholder or media requirement
    allDetected.forEach(item => {
      expect(item.detectedRequirements.length).toBeGreaterThan(0);
      expect(item.requiredPlacements.length).toBeGreaterThan(0);
      expect(item.stableKey).toBeDefined();
      expect(item.route).toBeDefined();
      expect(item.subject).toBeDefined();
      expect(item.chapterName).toBeDefined();
    });
  });

  it('5. fetchAllQuestionsNeedingImage returns correctly structured items with status', async () => {
    const results = await fetchAllQuestionsNeedingImage([]);
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);

    const first = results[0];
    expect(first).toHaveProperty('stableKey');
    expect(first).toHaveProperty('route');
    expect(first).toHaveProperty('subject');
    expect(first).toHaveProperty('chapterName');
    expect(first).toHaveProperty('requiredPlacements');
    expect(first).toHaveProperty('missingPlacements');
    expect(['image_missing', 'image_uploaded']).toContain(first.status);
  });

  it('6. Does not modify original question content during scan', () => {
    const original = Object.freeze({
      id: 55,
      question_text: 'লজিক গেটের মান কত? [এখানে চিত্র ছিল]',
      options: Object.freeze(['ক', 'খ', 'গ', 'ঘ']),
      correct_answer: 'ক'
    });

    const detected = normalizeQuestionForScan(original, {
      route: 'academic',
      subject: 'ict',
      chapterName: 'সংখ্যা পদ্ধতি',
      sourceType: 'academic_ict'
    });

    expect(detected).not.toBeNull();
    expect(original.question_text).toBe('লজিক গেটের মান কত? [এখানে চিত্র ছিল]');
  });
});
