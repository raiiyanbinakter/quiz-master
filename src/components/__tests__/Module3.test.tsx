import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MedicalSubjectTests from '../medical/MedicalSubjectTests';
import MedicalQuestionBank from '../medical/MedicalQuestionBank';
import { MODULE_3_CHAPTERS, getModule3QuestionsForTopics } from '../../data/module3TopicConfig';
import { syllabus } from '../../data/syllabus';

describe('Module 3 Tests', () => {
  it('1. Module 3 does not render Ishak/Topon/Tofazzal teacher filters', () => {
    const onBack = vi.fn();
    render(<MedicalSubjectTests onBack={onBack} />);

    // Check teacher filters are absent from Module 3
    expect(screen.queryByText(/ইসহাক স্যার/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/তপন স্যার/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/তোফাজ্জল স্যার/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/শিক্ষক ফিল্টার/i)).not.toBeInTheDocument();
  });

  it('2. Module 3 Chapter 4 renders exactly 9 topics', () => {
    const chap4 = MODULE_3_CHAPTERS.find(c => c.id === 'phy1_chap4');
    expect(chap4).toBeDefined();
    expect(chap4?.topics).toHaveLength(9);

    const topicNames = chap4?.topics.map(t => t.name);
    expect(topicNames).toEqual([
      'বল ও বলের প্রকারভেদ',
      'নিউটনের গতিসূত্র',
      'নিউটনের গতিসূত্রের ব্যবহার',
      'রৈখিক ভরবেগের নিত্যতা',
      'জড়তার ভ্রামক ও কৌণিক ভরবেগ',
      'টর্ক ও জড়তার ভ্রামকের উপপাদ্য',
      'নিউটনীয় বলবিদ্যা',
      'সংঘর্ষ এবং কেন্দ্রমুখী/কেন্দ্রবিমুখী বল',
      'Practice'
    ]);
  });

  it('3. Module 3 Chapter 4 count total is 120', () => {
    const chap4 = MODULE_3_CHAPTERS.find(c => c.id === 'phy1_chap4');
    expect(chap4).toBeDefined();
    expect(chap4?.totalQuestions).toBe(120);

    const sumCounts = chap4?.topics.reduce((acc, t) => acc + t.count, 0);
    expect(sumCounts).toBe(120);
  });

  it('4. Module 3 Chapter 6 renders exactly 7 topics', () => {
    const chap6 = MODULE_3_CHAPTERS.find(c => c.id === 'phy1_chap6');
    expect(chap6).toBeDefined();
    expect(chap6?.topics).toHaveLength(7);

    const topicNames = chap6?.topics.map(t => t.name);
    expect(topicNames).toEqual([
      'গ্যালিলিও ও কেপলারের সূত্র',
      'মহাকর্ষ',
      'অভিকর্ষজ ত্বরণ',
      'মহাকর্ষীয় ক্ষেত্র ও মহাকর্ষীয় ক্ষেত্রের প্রাবল্য',
      'অভিকর্ষ কেন্দ্র ও মুক্তিবেগ',
      'মহাকর্ষীয় সূত্রের ব্যবহার',
      'Practice'
    ]);
  });

  it('5. Module 3 Chapter 6 count total is 103', () => {
    const chap6 = MODULE_3_CHAPTERS.find(c => c.id === 'phy1_chap6');
    expect(chap6).toBeDefined();
    expect(chap6?.totalQuestions).toBe(103);

    const sumCounts = chap6?.topics.reduce((acc, t) => acc + t.count, 0);
    expect(sumCounts).toBe(103);
  });

  it('6. Module 1 teacher UI remains untouched (Module 1 still has teacher filters)', () => {
    const onBack = vi.fn();
    const onStartQuiz = vi.fn();

    render(
      <MedicalQuestionBank
        syllabus={syllabus}
        onBack={onBack}
        onStartQuiz={onStartQuiz}
      />
    );

    // Open Chapter 4 customization modal in Module 1
    const chap4Btn = screen.getByText(/নিউটনীয় বলবিদ্যা/i);
    fireEvent.click(chap4Btn);

    // Module 1 SHOULD still contain teacher options
    expect(screen.getAllByText(/ইসহাক স্যার/i).length).toBeGreaterThan(0);
  });

  it('7. Topic selection calculates selected question totals correctly', () => {
    const onBack = vi.fn();
    render(<MedicalSubjectTests onBack={onBack} />);

    // Open Chapter 4
    const chapter4CardBtn = screen.getAllByText(/টপিক বেছে নিন/i)[0];
    fireEvent.click(chapter4CardBtn);

    // Initially 120 questions selected
    expect(screen.getByText(/120টি প্রশ্ন নির্বাচিত/i)).toBeInTheDocument();

    // Click topic 1 checkbox to deselect topic 1 (14 questions)
    const topic1Item = screen.getByText(/বল ও বলের প্রকারভেদ/i);
    fireEvent.click(topic1Item);

    // Total becomes 120 - 14 = 106 questions
    expect(screen.getByText(/106টি প্রশ্ন নির্বাচিত/i)).toBeInTheDocument();
  });

  it('8. Question amount options never exceed selected topic question count', () => {
    // Verify direct question list generator for single topic
    const singleTopicQuestions = getModule3QuestionsForTopics('phy1_chap4', ['টর্ক ও জড়তার ভ্রামকের উপপাদ্য']);
    expect(singleTopicQuestions).toHaveLength(3); // Exactly 3 questions

    const onBack = vi.fn();
    render(<MedicalSubjectTests onBack={onBack} />);

    // Open Chapter 4
    const chapter4CardBtn = screen.getAllByText(/টপিক বেছে নিন/i)[0];
    fireEvent.click(chapter4CardBtn);

    // Deselect all topics except first topic (14 questions)
    const deselectAllBtn = screen.getByText(/সকল পছন্দ বাতিল করুন/i);
    fireEvent.click(deselectAllBtn);

    // Select topic 6 ("টর্ক ও জড়তার ভ্রামকের উপপাদ্য", 3 questions)
    const topic6Item = screen.getByText(/টর্ক ও জড়তার ভ্রামকের উপপাদ্য/i);
    fireEvent.click(topic6Item);

    // Deselect topic 1 ("বল ও বলের প্রকারভেদ")
    const topic1Item = screen.getByText(/বল ও বলের প্রকারভেদ/i);
    fireEvent.click(topic1Item);

    // Now only topic 6 (3 questions) is selected
    expect(screen.getByText(/3টি প্রশ্ন নির্বাচিত/i)).toBeInTheDocument();

    // Button option should say "সব 3টি প্রশ্ন" and standard options 10/20/30/50 must NOT be present
    expect(screen.getByText(/সব 3টি প্রশ্ন/i)).toBeInTheDocument();
    expect(screen.queryByText(/^10টি$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^20টি$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^30টি$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^50টি$/)).not.toBeInTheDocument();
  });
});
