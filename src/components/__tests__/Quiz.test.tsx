import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Quiz from '../Quiz';
import { Question } from '../../types';

const mockQuestions: Question[] = [
  {
    id: 1,
    topic: 'Topic 1',
    question_text: 'Question 1 text?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct_answer: 'Option A',
    explanation: 'Explanation for Q1',
    time_limit: 30
  },
  {
    id: 2,
    topic: 'Topic 2',
    question_text: 'Question 2 text?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correct_answer: 'Option 2',
    explanation: 'Explanation for Q2',
    time_limit: 10
  }
];

describe('Quiz Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders the first question correctly', () => {
    const onComplete = vi.fn();
    const onBack = vi.fn();
    render(<Quiz questions={mockQuestions} mode="quiz" onComplete={onComplete} onBack={onBack} />);

    expect(screen.getByText('Question 1 text?')).toBeInTheDocument();
    expect(screen.getByText('Topic 1')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('handles option selection correctly in quiz mode (correct answer)', () => {
    const onComplete = vi.fn();
    const onBack = vi.fn();
    render(<Quiz questions={mockQuestions} mode="quiz" onComplete={onComplete} onBack={onBack} />);

    const correctOption = screen.getByText('Option A');
    fireEvent.click(correctOption);

    // Explanation should appear
    expect(screen.getByText(/ব্যাখ্যা/)).toBeInTheDocument();
    expect(screen.getByText('Explanation for Q1')).toBeInTheDocument();

    // Next button should appear
    const nextButton = screen.getByText(/পরবর্তী প্রশ্ন/);
    expect(nextButton).toBeInTheDocument();
  });

  it('handles option selection correctly in incorrect answer', () => {
    const onComplete = vi.fn();
    const onBack = vi.fn();
    render(<Quiz questions={mockQuestions} mode="quiz" onComplete={onComplete} onBack={onBack} />);

    const incorrectOption = screen.getByText('Option B');
    fireEvent.click(incorrectOption);

    // Explanation should appear
    expect(screen.getByText(/ব্যাখ্যা/)).toBeInTheDocument();
    expect(screen.getByText('Explanation for Q1')).toBeInTheDocument();

    // Next button should appear
    const nextButton = screen.getByText(/পরবর্তী প্রশ্ন/);
    expect(nextButton).toBeInTheDocument();
  });

  it('handles option selection correctly in exam mode', () => {
    const onComplete = vi.fn();
    const onBack = vi.fn();
    render(<Quiz questions={mockQuestions} mode="exam" onComplete={onComplete} onBack={onBack} />);

    const option = screen.getByText('Option A');
    fireEvent.click(option);

    // Explanation should NOT appear in exam mode
    expect(screen.queryByText(/ব্যাখ্যা/)).not.toBeInTheDocument();

    // Next button should appear
    const nextButton = screen.getByText(/পরবর্তী প্রশ্ন/);
    expect(nextButton).toBeInTheDocument();
  });

  it('navigates to the next question', () => {
    const onComplete = vi.fn();
    const onBack = vi.fn();
    render(<Quiz questions={mockQuestions} mode="quiz" onComplete={onComplete} onBack={onBack} />);

    // Answer first question
    fireEvent.click(screen.getByText('Option A'));
    
    // Click next
    fireEvent.click(screen.getByText(/পরবর্তী প্রশ্ন/));

    // Should show second question
    expect(screen.getByText('Question 2 text?')).toBeInTheDocument();
    expect(screen.getByText('Topic 2')).toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();
  });

  it('calls onComplete when finishing the last question', () => {
    const onComplete = vi.fn();
    const onBack = vi.fn();
    render(<Quiz questions={mockQuestions} mode="quiz" onComplete={onComplete} onBack={onBack} />);

    // Answer first question
    fireEvent.click(screen.getByText('Option A'));
    fireEvent.click(screen.getByText(/পরবর্তী প্রশ্ন/));

    // Answer second question
    fireEvent.click(screen.getByText('Option 2'));
    
    // Click finish
    const finishButton = screen.getByText(/ফলাফল দেখুন/);
    fireEvent.click(finishButton);

    expect(onComplete).toHaveBeenCalledTimes(1);
    const results = onComplete.mock.calls[0][0];
    expect(results).toHaveLength(2);
    expect(results[0].isCorrect).toBe(true);
    expect(results[1].isCorrect).toBe(true);
  });

  it('handles timeout correctly', () => {
    const onComplete = vi.fn();
    const onBack = vi.fn();
    render(<Quiz questions={mockQuestions} mode="quiz" onComplete={onComplete} onBack={onBack} />);

    expect(screen.getByText('30s')).toBeInTheDocument();

    // Fast-forward time by 30 seconds
    act(() => {
      vi.advanceTimersByTime(30000);
    });

    // Should automatically show explanation and next button
    expect(screen.getByText(/ব্যাখ্যা/)).toBeInTheDocument();
    expect(screen.getByText(/পরবর্তী প্রশ্ন/)).toBeInTheDocument();
  });
});
