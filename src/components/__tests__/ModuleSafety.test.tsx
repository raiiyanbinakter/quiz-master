import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MedicalQuestionBank from '../medical/MedicalQuestionBank';
import MedicalSubjectTests from '../medical/MedicalSubjectTests';
import { MODULE_1_CONFIG, MODULE_3_CONFIG } from '../../data/moduleConfig';
import { syllabus } from '../../data/syllabus';
import { phy1Chap4RawQuestions } from '../../data/questions_phy1_chap4_newtonian';
import { MODULE_3_CHAPTERS, getModule3QuestionsForTopics } from '../../data/module3TopicConfig';

describe('Module Separation & Safety Tests', () => {
  it('1. Module 1 renders teacher set UI', () => {
    const onBack = vi.fn();
    const onStartQuiz = vi.fn();
    render(
      <MedicalQuestionBank
        syllabus={syllabus}
        onBack={onBack}
        onStartQuiz={onStartQuiz}
      />
    );

    // Open Chapter 4 modal in Module 1 (Chapter 4 is the second available chapter)
    const openModalBtns = screen.getAllByText(/অনুশীলন মোড/i);
    fireEvent.click(openModalBtns[1]);

    // Verify teacher selection UI is present
    expect(screen.getAllByText(/ইসহাক স্যার/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/শিক্ষক সংকলন/i).length).toBeGreaterThan(0);
    expect(MODULE_1_CONFIG.mode).toBe('teacher_sets');
  });

  it('2. Module 1 does not render Chapter 4/Chapter 6 topic selector', () => {
    const onBack = vi.fn();
    const onStartQuiz = vi.fn();
    render(
      <MedicalQuestionBank
        syllabus={syllabus}
        onBack={onBack}
        onStartQuiz={onStartQuiz}
      />
    );

    // Verify Module 3 topic selection controls are not rendered in Module 1
    expect(screen.queryByText(/টপিক ভিত্তিক প্রশ্ন কাস্টমাইজেশন/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/সকল পছন্দ বাতিল করুন/i)).not.toBeInTheDocument();
  });

  it('3. Module 3 renders Chapter 4 and Chapter 6 cards', () => {
    const onBack = vi.fn();
    render(<MedicalSubjectTests onBack={onBack} />);

    // Verify Chapter 4 and Chapter 6 cards are rendered
    expect(screen.getByText(/৪র্থ অধ্যায়/i)).toBeInTheDocument();
    expect(screen.getByText(/৬ষ্ঠ অধ্যায়/i)).toBeInTheDocument();
    expect(screen.getByText(/নিউটনীয় বলবিদ্যা/i)).toBeInTheDocument();
    expect(screen.getByText(/মহাকর্ষ ও অভিকর্ষ/i)).toBeInTheDocument();
    expect(MODULE_3_CONFIG.mode).toBe('chapter_topics');
  });

  it('4. Module 3 does not render teacher names', () => {
    const onBack = vi.fn();
    render(<MedicalSubjectTests onBack={onBack} />);

    expect(screen.queryByText(/ইসহাক স্যার/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/তপন স্যার/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/তোফাজ্জল স্যার/i)).not.toBeInTheDocument();
  });

  it('5. Module 3 does not render teacher filters', () => {
    const onBack = vi.fn();
    render(<MedicalSubjectTests onBack={onBack} />);

    expect(screen.queryByText(/শিক্ষক ফিল্টার/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/লেখক ও শিক্ষক নির্বাচন/i)).not.toBeInTheDocument();
  });

  it('6. Module 1 and Module 3 use separate data sources', () => {
    // Module 1 uses raw question arrays with author metadata
    expect(phy1Chap4RawQuestions).toBeDefined();
    expect(phy1Chap4RawQuestions[0]).toHaveProperty('author');

    // Module 3 uses MODULE_3_CHAPTERS topic configuration and getModule3QuestionsForTopics
    expect(MODULE_3_CHAPTERS).toBeDefined();
    expect(MODULE_3_CHAPTERS[0].id).toBe('phy1_chap4');
    
    const m3Questions = getModule3QuestionsForTopics('phy1_chap4', ['বল ও বলের প্রকারভেদ']);
    expect(m3Questions.length).toBe(14);
    expect(m3Questions[0].chapterId).toBe('phy1_chap4');
  });
});
