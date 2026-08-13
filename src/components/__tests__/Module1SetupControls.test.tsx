import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MedicalQuestionBank from '../medical/MedicalQuestionBank';
import { syllabus } from '../../data/syllabus';

describe('Module 1 Question Count and Custom Time Setup Controls', () => {
  // Helper to open modal for Chapter 4 (Physics Chap 4, 55 questions, teacher sets)
  const setupModalForChapter4 = () => {
    const onBack = vi.fn();
    const onStartQuiz = vi.fn();
    const onStartCustomTest = vi.fn();

    render(
      <MedicalQuestionBank
        syllabus={syllabus}
        onBack={onBack}
        onStartQuiz={onStartQuiz}
        onStartCustomTest={onStartCustomTest}
      />
    );

    // Switch to Physics
    const physBtn = screen.getByText('পদার্থবিজ্ঞান');
    fireEvent.click(physBtn);

    // Click "অনুশীলন মোড" on Chapter 4 card
    const practiceBtns = screen.getAllByText(/অনুশীলন মোড/i);
    fireEvent.click(practiceBtns[1]);

    // Select "সকল শিক্ষক সংকলন" if teacher select step is shown
    const teacherOpt = screen.queryByText(/সকল শিক্ষক সংকলন/i);
    if (teacherOpt) {
      fireEvent.click(teacherOpt);
    }

    return { onStartCustomTest };
  };

  // Helper to open modal for Chapter 2 (Physics Chap 2, 55 questions, no teacher sets)
  const setupModalForChapter2 = () => {
    const onBack = vi.fn();
    const onStartQuiz = vi.fn();
    const onStartCustomTest = vi.fn();

    render(
      <MedicalQuestionBank
        syllabus={syllabus}
        onBack={onBack}
        onStartQuiz={onStartQuiz}
        onStartCustomTest={onStartCustomTest}
      />
    );

    // Switch to Physics
    const physBtn = screen.getByText('পদার্থবিজ্ঞান');
    fireEvent.click(physBtn);

    // Click "অনুশীলন মোড" on Chapter 2 card
    const practiceBtns = screen.getAllByText(/অনুশীলন মোড/i);
    fireEvent.click(practiceBtns[0]);

    return { onStartCustomTest };
  };

  it('1. Initial state: selectedQuestionCount is null when setup modal opens', () => {
    setupModalForChapter2();

    // Should prompt student to select question count
    expect(screen.getAllByText(/প্রথমে প্রশ্ন সংখ্যা নির্বাচন করুন/i).length).toBeGreaterThan(0);
  });

  it('2. Disabled start button: Start button disabled when no count selected', () => {
    setupModalForChapter2();

    const startBtn = screen.getByRole('button', { name: /প্রথমে প্রশ্ন সংখ্যা নির্বাচন করুন/i });
    expect(startBtn).toBeDisabled();
  });

  it('3. Question selection update: Selecting 20 questions updates start button text', () => {
    setupModalForChapter4(); // Chapter 4 has 55 questions

    // Click 20 questions button
    const btn20 = screen.getByRole('button', { name: /২০টি প্রশ্ন/i });
    fireEvent.click(btn20);

    // Start button should now say "অনুশীলন শুরু করুন (২০টি প্রশ্ন)"
    expect(screen.getByRole('button', { name: /অনুশীলন শুরু করুন \(২০টি প্রশ্ন\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /অনুশীলন শুরু করুন \(২০টি প্রশ্ন\)/i })).not.toBeDisabled();
  });

  it('4. "All" option update: Selecting all questions updates start button to exact available count', () => {
    setupModalForChapter4();

    const btnAll = screen.getByRole('button', { name: /সব [০-৯0-9]+টি প্রশ্ন/i });
    const allLabel = btnAll.textContent?.trim() || '';
    fireEvent.click(btnAll);

    expect(screen.getByRole('button', { name: new RegExp(`অনুশীলন শুরু করুন \\(${allLabel}\\)`, 'i') })).toBeInTheDocument();
  });

  it('5. Hide unavailable options: Question count options greater than total available questions are hidden', () => {
    render(
      <MedicalQuestionBank
        syllabus={syllabus}
        onBack={vi.fn()}
        onStartQuiz={vi.fn()}
        onStartCustomTest={vi.fn()}
      />
    );

    // Click "অনুশীলন মোড" on Chapter 4 card (second available chapter card)
    const practiceBtns = screen.getAllByText(/অনুশীলন মোড/i);
    fireEvent.click(practiceBtns[1]);

    // Click teacher "তোফাজ্জল স্যার" card button (has 8 questions)
    const teacherBtn = screen.getByText(/সেট ৩: তোফাজ্জল স্যার/i).closest('button');
    expect(teacherBtn).not.toBeNull();
    fireEvent.click(teacherBtn!);

    // For 8 questions, options 10, 20, 30, 50 are all > 8, so they are hidden.
    // Only "সব ৮টি প্রশ্ন" is available!
    expect(screen.getByRole('button', { name: /সব ৮টি প্রশ্ন/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /১০টি প্রশ্ন/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /২০টি প্রশ্ন/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /৩০টি প্রশ্ন/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /৫০টি প্রশ্ন/i })).not.toBeInTheDocument();
  });

  it('6. Practice Mode no-timer works: Allows starting without time limit', () => {
    const { onStartCustomTest } = setupModalForChapter4();

    // Select 20 questions
    fireEvent.click(screen.getByRole('button', { name: /২০টি প্রশ্ন/i }));

    // Click "সময় ছাড়া অনুশীলন" button
    fireEvent.click(screen.getByRole('button', { name: /সময় ছাড়া অনুশীলন/i }));

    // Click start
    const startBtn = screen.getByRole('button', { name: /অনুশীলন শুরু করুন \(২০টি প্রশ্ন\)/i });
    expect(startBtn).not.toBeDisabled();
    fireEvent.click(startBtn);

    expect(onStartCustomTest).toHaveBeenCalled();
  });

  it('7. Custom time input: Typing in custom time input updates timer value', () => {
    setupModalForChapter4();

    // Select 20 questions
    fireEvent.click(screen.getByRole('button', { name: /২০টি প্রশ্ন/i }));

    // Click "নিজের সময়"
    fireEvent.click(screen.getByRole('button', { name: /নিজের সময়/i }));

    // Change input value to 25
    const timeInput = screen.getByPlaceholderText('১৫');
    fireEvent.change(timeInput, { target: { value: '25' } });

    // Verify summary preview shows 25 minute
    expect(screen.getByText('২৫ মিনিট')).toBeInTheDocument();
  });

  it('8. Exam Mode timer check: Exam Mode cannot start without a valid time', () => {
    const onBack = vi.fn();
    const onStartQuiz = vi.fn();
    render(
      <MedicalQuestionBank
        syllabus={syllabus}
        onBack={onBack}
        onStartQuiz={onStartQuiz}
      />
    );

    // Open Chapter 4 in Exam Mode
    const examBtns = screen.getAllByText(/পরীক্ষা মোড/i);
    fireEvent.click(examBtns[1]);

    // Select "সকল শিক্ষক সংকলন" if teacher select step is present
    const teacherOpt = screen.queryByText(/সকল শিক্ষক সংকলন/i);
    if (teacherOpt) {
      fireEvent.click(teacherOpt);
    }

    // Select 20 questions
    fireEvent.click(screen.getByRole('button', { name: /২০টি প্রশ্ন/i }));

    // Exam mode starts with empty time input by default
    expect(screen.getAllByText(/সঠিক সময়সীমা লিখুন/i).length).toBeGreaterThan(0);

    const startBtn = screen.getByRole('button', { name: /সঠিক সময়সীমা লিখুন \(১-১৮০ মিনিট\)/i });
    expect(startBtn).toBeDisabled();

    // Now select 15 minutes quick button
    const btn15 = screen.getByRole('button', { name: /১৫ মিনিট/i });
    fireEvent.click(btn15);

    // Start button should now be enabled
    expect(screen.getByRole('button', { name: /পরীক্ষা শুরু করুন \(২০টি প্রশ্ন\)/i })).not.toBeDisabled();
  });

  it('9. Single source of truth: Start button always reflects exact selected question count', () => {
    setupModalForChapter4();

    // Select 20 questions
    fireEvent.click(screen.getByRole('button', { name: /২০টি প্রশ্ন/i }));
    expect(screen.getByRole('button', { name: /অনুশীলন শুরু করুন \(২০টি প্রশ্ন\)/i })).toBeInTheDocument();

    // Switch to 30 questions
    fireEvent.click(screen.getByRole('button', { name: /৩০টি প্রশ্ন/i }));
    expect(screen.getByRole('button', { name: /অনুশীলন শুরু করুন \(৩০টি প্রশ্ন\)/i })).toBeInTheDocument();
  });
});
