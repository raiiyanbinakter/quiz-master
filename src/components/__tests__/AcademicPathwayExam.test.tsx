import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AcademicExamSetupModal from '../AcademicExamSetupModal';
import Quiz from '../Quiz';
import { Question } from '../../types';

const mockQuestions: Question[] = [
  {
    id: 1,
    topic: '১. লিমিটের অস্তিত্ব, বিচ্ছিন্নতা ও অবিচ্ছিন্নতা',
    question_text: 'Question 1 text?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct_answer: 'Option A',
    explanation: 'Explanation 1'
  },
  {
    id: 2,
    topic: '১. লিমিটের অস্তিত্ব, বিচ্ছিন্নতা ও অবিচ্ছিন্নতা',
    question_text: 'Question 2 text?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct_answer: 'Option B',
    explanation: 'Explanation 2'
  }
];

describe('Academic Pathway Exam Setup and Exam Mode', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('1. time input starts empty', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('যেমন: 25') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('2. shows validation message when time input is empty', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    expect(screen.getByText('পরীক্ষার মোট সময় লিখুন')).toBeInTheDocument();
  });

  it('3. shows error when time input is 0 or negative', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('যেমন: 25');
    fireEvent.change(input, { target: { value: '0' } });

    expect(screen.getByText('সময় কমপক্ষে ১ মিনিট হতে হবে')).toBeInTheDocument();
  });

  it('4. shows error when time input is above 180', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('যেমন: 25');
    fireEvent.change(input, { target: { value: '200' } });

    expect(screen.getByText('সময় সর্বোচ্চ ১৮০ মিনিট হতে পারে')).toBeInTheDocument();
  });

  it('5. accepts valid custom time between 1 and 180', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('যেমন: 25');
    fireEvent.change(input, { target: { value: '25' } });

    expect(screen.getByText('মোট সময়: 25 মিনিট নির্ধারিত হয়েছে')).toBeInTheDocument();
  });

  it('6. start button remains disabled until valid time and question count are selected', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    const startBtn = screen.getByRole('button', { name: /পরীক্ষা শুরু করতে প্রশ্ন সংখ্যা ও মোট সময় নির্বাচন করুন/i });
    expect(startBtn).toBeDisabled();

    // Fill valid time only
    const input = screen.getByPlaceholderText('যেমন: 25');
    fireEvent.change(input, { target: { value: '25' } });
    expect(startBtn).toBeDisabled();

    // Select question count
    fireEvent.click(screen.getByRole('button', { name: /10টি প্রশ্ন/i }));

    // Now start button should be enabled
    expect(screen.getByRole('button', { name: /পরীক্ষা শুরু করুন/i })).not.toBeDisabled();
  });

  it('7. shows question count options only up to available question limit', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={15}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    // 10 and all (15) should be visible, but 20, 30, 50 should NOT be visible
    expect(screen.getByText('10টি প্রশ্ন')).toBeInTheDocument();
    expect(screen.getByText('সবগুলো (15টি)')).toBeInTheDocument();
    expect(screen.queryByText('20টি প্রশ্ন')).not.toBeInTheDocument();
    expect(screen.queryByText('30টি প্রশ্ন')).not.toBeInTheDocument();
  });

  it('8. question count selection starts unselected', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    expect(screen.getByText('অনুগ্রহ করে প্রশ্ন সংখ্যা নির্বাচন করুন')).toBeInTheDocument();
  });

  it('9. selecting count updates start button label with exact values', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('যেমন: 25');
    fireEvent.change(input, { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /10টি প্রশ্ন/i }));

    expect(screen.getByText('10টি প্রশ্ন • 25 মিনিট')).toBeInTheDocument();
  });

  it('10. shows correct summary before starting exam', () => {
    render(
      <AcademicExamSetupModal
        isOpen={true}
        topicName="অন্তরীকরণ"
        totalAvailableQuestions={25}
        onClose={vi.fn()}
        onStartExam={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('যেমন: 25');
    fireEvent.change(input, { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /10টি প্রশ্ন/i }));

    expect(screen.getByText('পরীক্ষা মোড সারসংক্ষেপ')).toBeInTheDocument();
    expect(screen.getByText('উত্তর একবার নির্বাচন করলে পরিবর্তন করা যাবে না।')).toBeInTheDocument();
  });

  it('11. exam timer runs as a single total countdown from selected custom time', () => {
    render(
      <Quiz
        questions={mockQuestions}
        mode="exam"
        examTimeLimitMinutes={25}
        onComplete={vi.fn()}
        onBack={vi.fn()}
      />
    );

    expect(screen.getByText('সময় বাকি: 25:00')).toBeInTheDocument();

    // Fast-forward 10 seconds
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(screen.getByText('সময় বাকি: 24:50')).toBeInTheDocument();
  });

  it('12. selecting an option locks the answer immediately and disables other options', () => {
    render(
      <Quiz
        questions={mockQuestions}
        mode="exam"
        examTimeLimitMinutes={25}
        onComplete={vi.fn()}
        onBack={vi.fn()}
      />
    );

    const optionA = screen.getByText('Option A');
    const optionB = screen.getByText('Option B');

    // Click Option A
    fireEvent.click(optionA);

    // Lock banner should appear
    expect(screen.getByText('উত্তর লক করা হয়েছে')).toBeInTheDocument();

    // Option B button should now be disabled
    const optionBBtn = optionB.closest('button');
    expect(optionBBtn).toBeDisabled();

    // Clicking Option B should NOT change answer
    fireEvent.click(optionB);
    expect(screen.getByText('উত্তর লক করা হয়েছে')).toBeInTheDocument();
  });

  it('13. timer auto-submits exam when reaching 00:00', () => {
    const onComplete = vi.fn();
    render(
      <Quiz
        questions={mockQuestions}
        mode="exam"
        examTimeLimitMinutes={1}
        onComplete={onComplete}
        onBack={vi.fn()}
      />
    );

    // Fast-forward 60 seconds (1 minute)
    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(onComplete).toHaveBeenCalled();
  });
});
