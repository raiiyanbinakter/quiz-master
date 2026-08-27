import { describe, it, expect } from 'vitest';
import {
  getQuestionMediaRequirements,
  hasImagePlaceholder,
  MediaPlacement,
  MediaRequirement
} from '../questionMediaRequirements';

describe('Question Placeholder Detection Engine (Phase 1)', () => {
  it('1. Question text placeholder returns question placement', () => {
    const question = {
      id: 'Q-001',
      questionText: 'নিচের চিত্রে প্রদর্শিত লজিক গেটটি শনাক্ত কর: [এখানে চিত্র ছিল]',
      options: ['AND গেট', 'OR গেট', 'NAND গেট', 'NOR গেট'],
      correctAnswer: 'A'
    };

    const reqs = getQuestionMediaRequirements(question);
    expect(reqs).toHaveLength(1);
    expect(reqs[0]).toEqual({
      questionKey: 'Q-001',
      placement: 'question',
      placeholderFound: true
    });
  });

  it('2. Stimulus placeholder returns stimulus placement', () => {
    const question = {
      id: 'Q-002',
      stimulus: 'উদ্দীপকটি লক্ষ্য কর: [এখানে চিত্র ছিল]',
      questionText: 'উপরের উদ্দীপকে উল্লেখিত পরিবাহীর রোধ কত?',
      options: ['5 ohm', '10 ohm', '15 ohm', '20 ohm'],
      correctAnswer: 'B'
    };

    const reqs = getQuestionMediaRequirements(question);
    expect(reqs).toHaveLength(1);
    expect(reqs[0]).toEqual({
      questionKey: 'Q-002',
      placement: 'stimulus',
      placeholderFound: true
    });
  });

  it('3. Option A placeholder returns option_a placement', () => {
    const question = {
      id: 'Q-003',
      questionText: 'কোন বর্তনীটি সঠিক?',
      options: ['[এখানে চিত্র ছিল]', 'বিকল্প ২', 'বিকল্প ৩', 'বিকল্প ৪'],
      correctAnswer: 'A'
    };

    const reqs = getQuestionMediaRequirements(question);
    expect(reqs).toHaveLength(1);
    expect(reqs[0]).toEqual({
      questionKey: 'Q-003',
      placement: 'option_a',
      placeholderFound: true
    });
  });

  it('4. Option D placeholder returns option_d placement', () => {
    const question = {
      id: 'Q-004',
      questionText: 'নিচের কোনটি সঠিক ভেক্টর ডায়াগ্রাম?',
      options: ['ডায়াগ্রাম ১', 'ডায়াগ্রাম ২', 'ডায়াগ্রাম ৩', '[এখানে চিত্র ছিল]'],
      correctAnswer: 'D'
    };

    const reqs = getQuestionMediaRequirements(question);
    expect(reqs).toHaveLength(1);
    expect(reqs[0]).toEqual({
      questionKey: 'Q-004',
      placement: 'option_d',
      placeholderFound: true
    });
  });

  it('5. Explanation placeholder returns explanation placement', () => {
    const question = {
      id: 'Q-005',
      questionText: 'গাঠনিক সংকেত কোনটি?',
      options: ['A', 'B', 'C', 'D'],
      detailedExplanation: 'বিশ্লেষণ চিত্র: [এখানে চিত্র ছিল]'
    };

    const reqs = getQuestionMediaRequirements(question);
    expect(reqs).toHaveLength(1);
    expect(reqs[0]).toEqual({
      questionKey: 'Q-005',
      placement: 'explanation',
      placeholderFound: true
    });
  });

  it('6. Multiple placeholders return multiple requirements', () => {
    const question = {
      id: 'Q-006',
      questionText: 'প্রশ্নের চিত্র: [এখানে চিত্র ছিল]',
      options: [
        '[এখানে চিত্র ছিল]',
        'সাধারণ অপশন খ',
        'সাধারণ অপশন গ',
        '[এখানে চিত্র ছিল]'
      ],
      explanation: {
        shortExplanation: 'সংক্ষিপ্ত ব্যাখ্যা',
        detailedExplanation: 'বিস্তারিত ব্যাখ্যায় চিত্র ছিল: [এখানে চিত্র ছিল]'
      }
    };

    const reqs = getQuestionMediaRequirements(question);
    expect(reqs).toHaveLength(4);
    expect(reqs.map((r) => r.placement)).toEqual([
      'question',
      'option_a',
      'option_d',
      'explanation'
    ]);
    expect(reqs.every((r) => r.placeholderFound && r.questionKey === 'Q-006')).toBe(true);
  });

  it('7. No placeholder returns empty array', () => {
    const question = {
      id: 'Q-007',
      questionText: 'স্বাভাবিক তাপমাত্রায় পানি কোন অবস্থায় থাকে?',
      options: ['কঠিন', 'তরল', 'বায়বীয়', 'প্লাজমা'],
      detailedExplanation: 'পানি ২৫ ডিগ্রি সেলসিয়াসে তরল থাকে।'
    };

    const reqs = getQuestionMediaRequirements(question);
    expect(reqs).toEqual([]);
  });

  it('8. Function does not modify original question object', () => {
    const original = {
      id: 'Q-008',
      questionText: 'চিত্রভিত্তিক প্রশ্ন [এখানে চিত্র ছিল]',
      options: ['ক', 'খ', 'গ', 'ঘ'],
      detailedExplanation: 'ব্যাখ্যা'
    };

    const deepClone = JSON.parse(JSON.stringify(original));
    const reqs = getQuestionMediaRequirements(original);

    expect(reqs).toHaveLength(1);
    expect(original).toEqual(deepClone);
  });
});
