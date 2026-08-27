import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminRoutineControlCenter from '../admin/AdminRoutineControlCenter';
import * as adminRoutineFirestore from '../../lib/adminRoutineFirestore';

describe('Admin Routine Template Delete Flow', () => {
  const mockTemplates = [
    {
      id: 'tmpl_test_1',
      title: 'HSC Academic Test Plan',
      banglaTitle: 'এইচএসসি একাডেমিক টেস্ট প্ল্যান',
      description: 'টেস্ট রুটিন বিবরণ',
      route: 'academic' as const,
      targetProfiles: ['HSC 2025'],
      level: 'intermediate' as const,
      subjects: ['পদার্থবিজ্ঞান ১ম পত্র'],
      topicOrder: ['ভেক্টর'],
      studyDays: [0, 1, 2, 3, 4, 5, 6],
      suggestedDailyMinutes: 240,
      sessionMinutes: 45,
      breakMinutes: 15,
      revisionIntervals: [1, 3, 7, 14],
      mockTestFrequency: 'weekly' as const,
      dailyGoalText: 'লক্ষ্য ১',
      weeklyGoalText: 'সাপ্তাহিক লক্ষ্য ১',
      isPublished: true,
      version: 1,
      createdAt: '2026-08-01T10:00:00Z',
      updatedAt: '2026-08-01T10:00:00Z',
      createdBy: 'Admin'
    },
    {
      id: 'tmpl_test_2',
      title: 'Medical Intensive Test Plan',
      banglaTitle: 'মেডিকেল স্প্রিন্ট প্ল্যান',
      description: 'মেডিকেল রুটিন বিবরণ',
      route: 'medical' as const,
      targetProfiles: ['Medical Candidate'],
      level: 'intensive' as const,
      subjects: ['উদ্ভিদবিজ্ঞান'],
      topicOrder: ['কোষ ও এর গঠন'],
      studyDays: [0, 1, 2, 3, 4, 5, 6],
      suggestedDailyMinutes: 300,
      sessionMinutes: 50,
      breakMinutes: 10,
      revisionIntervals: [1, 3, 7],
      mockTestFrequency: 'weekly' as const,
      dailyGoalText: 'লক্ষ্য ২',
      weeklyGoalText: 'সাপ্তাহিক লক্ষ্য ২',
      isPublished: true,
      version: 1,
      createdAt: '2026-08-02T10:00:00Z',
      updatedAt: '2026-08-02T10:00:00Z',
      createdBy: 'Admin'
    }
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(adminRoutineFirestore, 'fetchAdminRoutineTemplates').mockResolvedValue([...mockTemplates]);
    vi.spyOn(adminRoutineFirestore, 'fetchAdminRoutineEvents').mockResolvedValue([]);
    vi.spyOn(adminRoutineFirestore, 'fetchRoutineAnalyticsData').mockResolvedValue({
      templateEnrollmentCount: 1,
      eventEnrollmentCount: 0,
      plannedSessionCount: 10,
      completedSessionCount: 8,
      skippedSessionCount: 2,
      completionPercentage: 80,
      hasData: true
    });
  });

  it('1. Trash button is rendered with aria-label "টেমপ্লেট মুছুন" and clicking it opens the confirmation modal with template name and warning', async () => {
    render(<AdminRoutineControlCenter user={{ uid: 'admin_123', email: 'admin@test.com' }} isAdmin={true} />);

    await waitFor(() => {
      expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'টেমপ্লেট মুছুন' });
    expect(deleteButtons.length).toBeGreaterThanOrEqual(1);

    // Click trash button on the first template
    fireEvent.click(deleteButtons[0]);

    // Confirmation modal should appear with template name and required text
    expect(screen.getByText('এই রুটিন টেমপ্লেটটি মুছে ফেলতে চান?')).toBeInTheDocument();
    expect(screen.getByText('এই কাজটি ফিরিয়ে আনা যাবে না।')).toBeInTheDocument();
    expect(screen.getAllByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান').length).toBeGreaterThanOrEqual(2); // In card and modal
    expect(screen.getByRole('button', { name: 'বাতিল করুন' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'মুছে ফেলুন' })).toBeInTheDocument();
  });

  it('2. Clicking "বাতিল করুন" dismisses the modal and does not delete the template', async () => {
    const deleteSpy = vi.spyOn(adminRoutineFirestore, 'deleteAdminRoutineTemplate');
    render(<AdminRoutineControlCenter user={{ uid: 'admin_123', email: 'admin@test.com' }} isAdmin={true} />);

    await waitFor(() => {
      expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'টেমপ্লেট মুছুন' });
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText('এই রুটিন টেমপ্লেটটি মুছে ফেলতে চান?')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'বাতিল করুন' });
    fireEvent.click(cancelButton);

    // Modal is closed
    expect(screen.queryByText('এই রুটিন টেমপ্লেটটি মুছে ফেলতে চান?')).not.toBeInTheDocument();
    // Template is still in the document
    expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it('3 & 4. Clicking "মুছে ফেলুন" calls deleteAdminRoutineTemplate and card disappears immediately with success toast', async () => {
    const deleteSpy = vi.spyOn(adminRoutineFirestore, 'deleteAdminRoutineTemplate').mockResolvedValue(undefined);
    render(<AdminRoutineControlCenter user={{ uid: 'admin_123', email: 'admin@test.com' }} isAdmin={true} />);

    await waitFor(() => {
      expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'টেমপ্লেট মুছুন' });
    fireEvent.click(deleteButtons[0]);

    const confirmDeleteBtn = screen.getByRole('button', { name: 'মুছে ফেলুন' });
    fireEvent.click(confirmDeleteBtn);

    await waitFor(() => {
      expect(deleteSpy).toHaveBeenCalledWith('tmpl_test_1', expect.anything(), true);
    });

    // Card should disappear immediately
    await waitFor(() => {
      expect(screen.queryByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).not.toBeInTheDocument();
    });

    // Success toast
    expect(screen.getByText('রুটিন টেমপ্লেটটি মুছে ফেলা হয়েছে।')).toBeInTheDocument();
    // The other template remains
    expect(screen.getByText('মেডিকেল স্প্রিন্ট প্ল্যান')).toBeInTheDocument();
  });

  it('6. Non-admin user cannot delete and receives "এই টেমপ্লেট মুছে ফেলার অনুমতি আপনার নেই।"', async () => {
    const deleteSpy = vi.spyOn(adminRoutineFirestore, 'deleteAdminRoutineTemplate');
    render(<AdminRoutineControlCenter user={{ uid: 'user_regular', email: 'user@test.com' }} isAdmin={false} />);

    await waitFor(() => {
      expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'টেমপ্লেট মুছুন' });
    fireEvent.click(deleteButtons[0]);

    const confirmDeleteBtn = screen.getByRole('button', { name: 'মুছে ফেলুন' });
    fireEvent.click(confirmDeleteBtn);

    await waitFor(() => {
      expect(screen.getByText('এই টেমপ্লেট মুছে ফেলার অনুমতি আপনার নেই।')).toBeInTheDocument();
    });

    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it('7. Firestore permission error displays "টেমপ্লেট মুছে ফেলা যায়নি। Firebase অনুমতি পরীক্ষা করুন।"', async () => {
    const permissionError: any = new Error('PERMISSION_DENIED');
    permissionError.code = 'permission-denied';
    vi.spyOn(adminRoutineFirestore, 'deleteAdminRoutineTemplate').mockRejectedValue(permissionError);

    render(<AdminRoutineControlCenter user={{ uid: 'admin_123', email: 'admin@test.com' }} isAdmin={true} />);

    await waitFor(() => {
      expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'টেমপ্লেট মুছুন' });
    fireEvent.click(deleteButtons[0]);

    const confirmDeleteBtn = screen.getByRole('button', { name: 'মুছে ফেলুন' });
    fireEvent.click(confirmDeleteBtn);

    await waitFor(() => {
      expect(screen.getByText('টেমপ্লেট মুছে ফেলা যায়নি। Firebase অনুমতি পরীক্ষা করুন।')).toBeInTheDocument();
    });
  });

  it('8. Unauthenticated user receives "টেমপ্লেট মুছে ফেলতে আগে লগইন করুন।"', async () => {
    render(<AdminRoutineControlCenter user={null} isAdmin={false} />);

    await waitFor(() => {
      expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'টেমপ্লেট মুছুন' });
    fireEvent.click(deleteButtons[0]);

    const confirmDeleteBtn = screen.getByRole('button', { name: 'মুছে ফেলুন' });
    fireEvent.click(confirmDeleteBtn);

    await waitFor(() => {
      expect(screen.getByText('টেমপ্লেট মুছে ফেলতে আগে লগইন করুন।')).toBeInTheDocument();
    });
  });

  it('9. Missing document error displays "এই টেমপ্লেটটি আর পাওয়া যাচ্ছে না।"', async () => {
    const notFoundErr: any = new Error('NOT_FOUND');
    notFoundErr.code = 'not-found';
    vi.spyOn(adminRoutineFirestore, 'deleteAdminRoutineTemplate').mockRejectedValue(notFoundErr);

    render(<AdminRoutineControlCenter user={{ uid: 'admin_123', email: 'admin@test.com' }} isAdmin={true} />);

    await waitFor(() => {
      expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'টেমপ্লেট মুছুন' });
    fireEvent.click(deleteButtons[0]);

    const confirmDeleteBtn = screen.getByRole('button', { name: 'মুছে ফেলুন' });
    fireEvent.click(confirmDeleteBtn);

    await waitFor(() => {
      expect(screen.getByText('এই টেমপ্লেটটি আর পাওয়া যাচ্ছে না।')).toBeInTheDocument();
    });
  });

  it('10. Network or unknown error displays "টেমপ্লেট মুছে ফেলতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"', async () => {
    vi.spyOn(adminRoutineFirestore, 'deleteAdminRoutineTemplate').mockRejectedValue(new Error('Network error'));

    render(<AdminRoutineControlCenter user={{ uid: 'admin_123', email: 'admin@test.com' }} isAdmin={true} />);

    await waitFor(() => {
      expect(screen.getByText('এইচএসসি একাডেমিক টেস্ট প্ল্যান')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'টেমপ্লেট মুছুন' });
    fireEvent.click(deleteButtons[0]);

    const confirmDeleteBtn = screen.getByRole('button', { name: 'মুছে ফেলুন' });
    fireEvent.click(confirmDeleteBtn);

    await waitFor(() => {
      expect(screen.getByText('টেমপ্লেট মুছে ফেলতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')).toBeInTheDocument();
    });
  });
});
