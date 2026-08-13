export const ROUTINE_CONFIG = {
  DEFAULT_REVIEW_GAPS: [1, 3, 7, 14], // in days
  DEFAULT_BUFFER_PERCENTAGE: 0.20,    // 20% free capacity buffer
  DEFAULT_SESSION_MINUTES: 45,
  DEFAULT_MAX_DAILY_MINUTES: 240,     // 4 hours max daily
  WEIGHTS: {
    EXAM_BLUEPRINT: 0.30,
    STUDENT_WEAKNESS: 0.25,
    PREREQUISITE_URGENCY: 0.20,
    REVIEW_DUE: 0.15,
    TIME_PRESSURE: 0.10,
  },
  ROUTE_LABELS: {
    academic: { bn: 'এইচএসসি ও একাডেমিক', en: 'Academic (HSC)' },
    medical: { bn: 'মেডিকেল ভর্তি পরীক্ষা', en: 'Medical Admission' },
    varsity: { bn: 'ভার্সিটি ক ইউনিট', en: 'Varsity Science' },
    engineering: { bn: 'ইঞ্জিনিয়ারিং ভর্তি পরীক্ষা', en: 'Engineering Admission' },
  }
};
