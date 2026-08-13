import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MedicalModelTests from '../medical/MedicalModelTests';
import MedicalModelTestExam from '../medical/MedicalModelTestExam';
import ModelTestBlueprintAdmin from '../admin/ModelTestBlueprintAdmin';
import { MedicalModelTestBlueprint } from '../../types/modelTest';

const mockBlueprint: MedicalModelTestBlueprint = {
  id: 'mt_test_01',
  route: 'medical',
  title: 'টেস্ট মডেল টেস্ট ১',
  subject: 'physics',
  chapterId: 'phy1_chap4',
  chapterName: 'নিউটনীয় বলবিদ্যা',
  questionIds: Array.from({ length: 100 }, (_, i) => `q_${i + 1}`),
  totalMarks: 100,
  timeLimitMinutes: 50,
  answerLockEnabled: true,
  sourceStatus: 'verified',
  status: 'published',
  version: 1,
  description: '১০০ নম্বরের মডেল টেস্ট'
};

const mockQuestions = Array.from({ length: 100 }, (_, i) => ({
  id: `q_${i + 1}`,
  question_text: `মডেল টেস্ট প্রশ্ন ${i + 1}`,
  options: ['ক) অপশন ১', 'খ) অপশন ২', 'গ) অপশন ৩', 'ঘ) অপশন ৪'],
  correct_answer: 'ক) অপশন ১',
  explanation: `প্রশ্ন ${i + 1} এর বিস্তারিত সমাধান`,
  topic: 'নিউটনীয় গতিসূত্র'
}));

describe('Medical Model Test Requirements & Safeguards', () => {

  it('1. Medical Model Test dashboard renders subject choices and 100 mark / 50 min badge', () => {
    const onBack = vi.fn();
    render(<MedicalModelTests onBack={onBack} />);

    expect(screen.getAllByText(/মডেল টেস্ট/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/১০০ নম্বর • ৫০ মিনিট • আনসার লক/i)).toBeInTheDocument();
    expect(screen.getByText(/পদার্থবিজ্ঞান/i)).toBeInTheDocument();
    expect(screen.getByText(/রসায়ন/i)).toBeInTheDocument();
  });

  it('2. Clicking "পরীক্ষার তথ্য দেখুন" opens Pre-Exam Confirmation screen with 100 marks and 50 min info', () => {
    const onBack = vi.fn();
    render(<MedicalModelTests onBack={onBack} />);

    const infoBtn = screen.getAllByText(/পরীক্ষার তথ্য দেখুন/i)[0];
    fireEvent.click(infoBtn);

    expect(screen.getByText(/পরীক্ষা শুরু করার আগে/i)).toBeInTheDocument();
    expect(screen.getByText(/১০০ নম্বর \(১০০টি প্রশ্ন\)/i)).toBeInTheDocument();
    expect(screen.getByText(/৫০ মিনিট \(নির্দিষ্ট\)/i)).toBeInTheDocument();
    expect(screen.getByText(/একবার উত্তর নির্বাচন করলে তা পরিবর্তন করা যাবে না।/i)).toBeInTheDocument();
  });

  it('3. Start button remains disabled until rules checkbox is acknowledged', () => {
    const onBack = vi.fn();
    render(<MedicalModelTests onBack={onBack} />);

    const infoBtn = screen.getAllByText(/পরীক্ষার তথ্য দেখুন/i)[0];
    fireEvent.click(infoBtn);

    const startBtn = screen.getByText(/মডেল টেস্ট শুরু করুন/i).closest('button');
    expect(startBtn).toBeDisabled();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(startBtn).not.toBeDisabled();
  });

  it('4. Active Exam Screen renders fixed 100 question progress and 50 min countdown', () => {
    const onBack = vi.fn();
    render(
      <MedicalModelTestExam
        blueprint={mockBlueprint}
        questions={mockQuestions}
        onBack={onBack}
      />
    );

    expect(screen.getAllByText(/প্রশ্ন ১/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/৫০:০০/i)).toBeInTheDocument();
    expect(screen.getByText(/মডেল টেস্ট প্রশ্ন 1/i)).toBeInTheDocument();
  });

  it('5. Selecting an answer locks it permanently and prevents changing selection', () => {
    const onBack = vi.fn();
    render(
      <MedicalModelTestExam
        blueprint={mockBlueprint}
        questions={mockQuestions}
        onBack={onBack}
      />
    );

    const optionBtn = screen.getByText(/ক\) অপশন ১/i).closest('button')!;
    fireEvent.click(optionBtn);

    // Verify lock label appears
    expect(screen.getByText(/উত্তর লক করা হয়েছে/i)).toBeInTheDocument();

    // Verify other option buttons are disabled after answer lock
    const option2Btn = screen.getByText(/খ\) অপশন ২/i).closest('button')!;
    expect(option2Btn).toBeDisabled();

    // Attempting to click option 2 should not change answer
    fireEvent.click(option2Btn);
    expect(screen.getByText(/উত্তর লক করা হয়েছে/i)).toBeInTheDocument();
  });

  it('6. Question Navigator drawer displays 100 question grid with locked state', () => {
    const onBack = vi.fn();
    render(
      <MedicalModelTestExam
        blueprint={mockBlueprint}
        questions={mockQuestions}
        onBack={onBack}
      />
    );

    // Lock option on question 1
    const optionBtn = screen.getByText(/ক\) অপশন ১/i).closest('button')!;
    fireEvent.click(optionBtn);

    // Open question navigator modal
    const navToggleBtn = screen.getByText(/প্রশ্ন তালিকা/i);
    fireEvent.click(navToggleBtn);

    expect(screen.getByText(/প্রশ্ন নেভিগেটর \(১০০টি প্রশ্ন\)/i)).toBeInTheDocument();
  });

  it('7. Early Submit shows confirmation modal with answered/unanswered stats', () => {
    const onBack = vi.fn();
    render(
      <MedicalModelTestExam
        blueprint={mockBlueprint}
        questions={mockQuestions}
        onBack={onBack}
      />
    );

    // Click submit button
    const submitBtn = screen.getByText(/পরীক্ষা জমা দিন/i);
    fireEvent.click(submitBtn);

    expect(screen.getByText(/আপনি কি পরীক্ষা জমা দিতে চান\?/i)).toBeInTheDocument();
    expect(screen.getByText(/আপনার ১০০টি প্রশ্নের উত্তর দেওয়া হয়নি।/i)).toBeInTheDocument();
  });

  it('8. Submitting exam reveals score, statistics, and detailed review explanations', () => {
    const onBack = vi.fn();
    render(
      <MedicalModelTestExam
        blueprint={mockBlueprint}
        questions={mockQuestions}
        onBack={onBack}
      />
    );

    // Answer Q1 correctly
    fireEvent.click(screen.getByText(/ক\) অপশন ১/i).closest('button')!);

    // Open submit modal & confirm
    fireEvent.click(screen.getByText(/পরীক্ষা জমা দিন/i));
    const confirmSubmitBtn = screen.getAllByText(/পরীক্ষা জমা দিন/i)[1];
    fireEvent.click(confirmSubmitBtn);

    expect(screen.getByText(/ফলাফল ও পর্যালোচনা/i)).toBeInTheDocument();
    expect(screen.getByText(/প্রাপ্ত নম্বর/i)).toBeInTheDocument();
    expect(screen.getByText(/সকল প্রশ্নের উত্তর ও সমাধান/i)).toBeInTheDocument();
    expect(screen.getByText(/প্রশ্ন 1 এর বিস্তারিত সমাধান/i)).toBeInTheDocument();
  });

  it('9. Timer auto-submits when remaining time reaches zero', () => {
    vi.useFakeTimers();
    const onBack = vi.fn();
    render(
      <MedicalModelTestExam
        blueprint={mockBlueprint}
        questions={mockQuestions}
        onBack={onBack}
      />
    );

    // Fast-forward 3000 seconds (50 minutes)
    act(() => {
      vi.advanceTimersByTime(3001000);
    });

    expect(screen.getByText(/সময় শেষ হয়েছে। আপনার পরীক্ষা স্বয়ংক্রিয়ভাবে জমা দেওয়া হয়েছে।/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('10. Admin cannot publish empty blueprint with 0 questions', () => {
    render(<ModelTestBlueprintAdmin />);

    const newBtn = screen.getAllByText(/নতুন ব্লুপ্রিন্ট তৈরি/i)[0];
    fireEvent.click(newBtn);

    // Set title and set question count to 0
    const titleInput = screen.getByPlaceholderText(/যেমন: মেডিকেল মডেল টেস্ট ১/i);
    fireEvent.change(titleInput, { target: { value: 'খালি ব্লুপ্রিন্ট' } });

    // Try to publish with 0 questions
    const publishBtn = screen.getByText(/প্রকাশ করুন \(Publish\)/i);
    
    // Set question count input to 0
    const countInput = screen.getByDisplayValue('100');
    fireEvent.change(countInput, { target: { value: '0' } });

    fireEvent.click(publishBtn);

    expect(screen.getByText(/Cannot publish empty blueprint/i)).toBeInTheDocument();
  });

});
