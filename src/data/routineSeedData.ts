import {
  LearningRoute,
  ExamBlueprint,
  SyllabusTopic,
  SourceReference,
  StudentAvailabilityBlock,
  FixedCommitment,
  RoutinePreferences,
  VisualExplanationSpec
} from '../types/routine';

export const DEMO_SOURCE_REFERENCES: Record<string, SourceReference> = {
  nctb_chem2: {
    id: 'src_nctb_chem2',
    url: 'https://nctb.gov.bd/site/page/d822df46-51d0-4efb-8664-884841fb2b86',
    title: 'NCTB HSC Chemistry 2nd Paper Curriculum & Mark Distribution (DEMO Reference)',
    publisher: 'National Curriculum and Textbook Board (NCTB)',
    academicYear: '2024-2025',
    retrievedAt: '2025-01-15',
    reviewerStatus: 'verified',
    notes: 'Official NCTB syllabus specification'
  },
  dgte_med: {
    id: 'src_dgte_med',
    url: 'https://dgme.gov.bd',
    title: 'DGME MBBS Admission Test Syllabus & Weightage Bulletin (DEMO Reference)',
    publisher: 'Directorate General of Medical Education (DGME)',
    academicYear: '2024-2025',
    retrievedAt: '2025-01-20',
    reviewerStatus: 'verified',
    notes: 'Official 100 mark MCQ weightage breakdown'
  },
  du_ka: {
    id: 'src_du_ka',
    url: 'https://admission.eis.du.ac.bd',
    title: 'Dhaka University A-Unit Admission Circular & Question Structure (DEMO Reference)',
    publisher: 'University of Dhaka',
    academicYear: '2024-2025',
    retrievedAt: '2025-01-10',
    reviewerStatus: 'verified',
    notes: 'Combined MCQ and written mark structure'
  },
  buet_eng: {
    id: 'src_buet_eng',
    url: 'https://buet.ac.bd/admission',
    title: 'BUET Undergraduate Admission Test Syllabus (DEMO Reference)',
    publisher: 'Bangladesh University of Engineering and Technology (BUET)',
    academicYear: '2024-2025',
    retrievedAt: '2025-01-12',
    reviewerStatus: 'needs_verification',
    notes: 'Provisional blueprint based on past BUET exam structure'
  }
};

export const DEMO_BLUEPRINTS: ExamBlueprint[] = [
  {
    id: 'bp_academic',
    title: 'এইচএসসি ও বোর্ড পরীক্ষা ২০২৫ (HSC Board Exam)',
    route: 'academic',
    subjectIds: ['chem1', 'phys1', 'math1'],
    totalMarks: 100,
    durationMinutes: 180,
    sourceReferences: [DEMO_SOURCE_REFERENCES.nctb_chem2]
  },
  {
    id: 'bp_medical',
    title: 'মেডিকেল ভর্তি পরীক্ষা ২০২৪-২৫ (MBBS Medical Admission)',
    route: 'medical',
    subjectIds: ['chem1', 'phys1', 'bio1', 'gk_eng'],
    totalMarks: 100,
    durationMinutes: 60,
    sourceReferences: [DEMO_SOURCE_REFERENCES.dgte_med]
  },
  {
    id: 'bp_varsity',
    title: 'ঢাকা বিশ্ববিদ্যালয় ক-ইউনিট ভর্তি পরীক্ষা (DU A-Unit Admission)',
    route: 'varsity',
    subjectIds: ['chem1', 'phys1', 'math1'],
    totalMarks: 100,
    durationMinutes: 90,
    sourceReferences: [DEMO_SOURCE_REFERENCES.du_ka]
  },
  {
    id: 'bp_engineering',
    title: 'বুয়েট ও ইঞ্জিনিয়ারিং ভর্তি পরীক্ষা (BUET & Engineering Admission)',
    route: 'engineering',
    subjectIds: ['chem1', 'phys1', 'math1'],
    totalMarks: 400,
    durationMinutes: 180,
    sourceReferences: [DEMO_SOURCE_REFERENCES.buet_eng]
  }
];

export const DEMO_SYLLABUS_TOPICS: SyllabusTopic[] = [
  // Academic & Varsity Chemistry
  {
    id: 'top_env_gas',
    route: 'academic',
    examBlueprintId: 'bp_academic',
    subjectId: 'chem1',
    subjectName: 'রসায়ন ২য় পত্র',
    chapterId: 'chap_env',
    chapterName: 'পরিবেশ রসায়ন',
    title: 'গ্যাসীয় সূত্রাবলি ও আদর্শ গ্যাস সমীকরণ (Gaseous Laws & Ideal Gas Equation)',
    learningObjectives: [
      'বয়েল, চার্লস ও অ্যাভোগাড্রোর সূত্র প্রয়োগ করা',
      'PV = nRT গাণিতিক সমস্যা সমাধান',
      'গ্যাসের ঘনত্ব ও আণবিক ভর নির্ণয়'
    ],
    prerequisites: [],
    estimatedMinutes: 60,
    practiceType: 'learn',
    officialStatus: 'verified',
    sourceReferences: [DEMO_SOURCE_REFERENCES.nctb_chem2],
    examBlueprintWeight: 85,
  },
  {
    id: 'top_env_diffusion',
    route: 'academic',
    examBlueprintId: 'bp_academic',
    subjectId: 'chem1',
    subjectName: 'রসায়ন ২য় পত্র',
    chapterId: 'chap_env',
    chapterName: 'পরিবেশ রসায়ন',
    title: 'গ্রাহামের ব্যাপন সূত্র ও আংশিক চাপ (Graham Diffusion & Partial Pressure)',
    learningObjectives: [
      'ব্যাপন হারের সাথে আণবিক ভরের সম্পর্ক',
      'ডাল্টনের আংশিক চাপ সূত্রের প্রয়োগ'
    ],
    prerequisites: ['top_env_gas'],
    estimatedMinutes: 50,
    practiceType: 'practice',
    officialStatus: 'verified',
    sourceReferences: [DEMO_SOURCE_REFERENCES.nctb_chem2],
    examBlueprintWeight: 75,
  },
  {
    id: 'top_env_rms',
    route: 'academic',
    examBlueprintId: 'bp_academic',
    subjectId: 'chem1',
    subjectName: 'রসায়ন ২য় পত্র',
    chapterId: 'chap_env',
    chapterName: 'পরিবেশ রসায়ন',
    title: 'গ্যাসের গতিতত্ত্ব ও RMS বেগ (RMS Velocity & Kinetic Energy)',
    learningObjectives: [
      'RMS বেগের সূত্র C = √(3RT/M) এর গাণিতিক সমাধান',
      'গ্যাসের গতিশক্তি E = 3/2 nRT নির্ণয়'
    ],
    prerequisites: ['top_env_gas'],
    estimatedMinutes: 45,
    practiceType: 'retrieve',
    officialStatus: 'verified',
    sourceReferences: [DEMO_SOURCE_REFERENCES.nctb_chem2],
    examBlueprintWeight: 90,
  },
  {
    id: 'top_env_acid_base',
    route: 'academic',
    examBlueprintId: 'bp_academic',
    subjectId: 'chem1',
    subjectName: 'রসায়ন ২য় পত্র',
    chapterId: 'chap_env',
    chapterName: 'পরিবেশ রসায়ন',
    title: 'লুইস অম্ল-ক্ষারক ধারণা ও পানির মানদণ্ড (Lewis Acid-Base & Water Quality BOD/COD)',
    learningObjectives: [
      'ব্রনস্টেড ও লুইস এসিড-ক্ষার চিহ্নিত করা',
      'DO, BOD, COD ও pH মান ব্যাখ্যা করা'
    ],
    prerequisites: [],
    estimatedMinutes: 55,
    practiceType: 'review',
    officialStatus: 'verified',
    sourceReferences: [DEMO_SOURCE_REFERENCES.nctb_chem2],
    examBlueprintWeight: 70,
  },

  // Medical Admission
  {
    id: 'top_med_bio_cell',
    route: 'medical',
    examBlueprintId: 'bp_medical',
    subjectId: 'bio1',
    subjectName: 'জীববিজ্ঞান ১off পত্র',
    chapterId: 'chap_cell',
    chapterName: 'কোষ ও এর গঠন',
    title: 'কোষ অঙ্গাণু ও ডিএনএ/আরএনএ বৈশিষ্ট্য (Cell Organelles & Nucleic Acids)',
    learningObjectives: [
      'মাইটোকন্ড্রিয়া ও প্লাস্টিডের গঠন ও কাজ',
      'ডিএনএ অনুলিপন ও প্রোটিন সংশ্লেষণ তথ্য'
    ],
    prerequisites: [],
    estimatedMinutes: 45,
    practiceType: 'learn',
    officialStatus: 'verified',
    sourceReferences: [DEMO_SOURCE_REFERENCES.dgte_med],
    examBlueprintWeight: 95,
  },
  {
    id: 'top_med_chem_qualitative',
    route: 'medical',
    examBlueprintId: 'bp_medical',
    subjectId: 'chem1',
    subjectName: 'রসায়ন ১ম পত্র',
    chapterId: 'chap_qual',
    chapterName: 'গুণগত রসায়ন',
    title: 'কোয়ান্টাম সংখ্যা ও আয়ন সনাক্তকরণ (Quantum Numbers & Ion Identification)',
    learningObjectives: [
      'কোয়ান্টাম সংখ্যার সেট হিসাব',
      'আয়ন শিখা পরীক্ষা ও দ্রাব্যতা গুণফল'
    ],
    prerequisites: [],
    estimatedMinutes: 50,
    practiceType: 'practice',
    officialStatus: 'verified',
    sourceReferences: [DEMO_SOURCE_REFERENCES.dgte_med],
    examBlueprintWeight: 90,
  },

  // Varsity Admission
  {
    id: 'top_varsity_electrostatics',
    route: 'varsity',
    examBlueprintId: 'bp_varsity',
    subjectId: 'phys1',
    subjectName: 'পদার্থবিজ্ঞান ২য় পত্র',
    chapterId: 'chap_elec',
    chapterName: 'স্থির তড়িৎ',
    title: 'কুলম্বের সূত্র, বিভব ও ধারকত্ব (Coulomb Law, Potential & Capacitance)',
    learningObjectives: [
      'তড়িৎ ক্ষেত্র প্রাবল্য ও বিভব হিসাব',
      'ধারকের সমবায় ও সঞ্চিত শক্তি'
    ],
    prerequisites: [],
    estimatedMinutes: 60,
    practiceType: 'practice',
    officialStatus: 'verified',
    sourceReferences: [DEMO_SOURCE_REFERENCES.du_ka],
    examBlueprintWeight: 88,
  },

  // Engineering Admission
  {
    id: 'top_eng_straight_line',
    route: 'engineering',
    examBlueprintId: 'bp_engineering',
    subjectId: 'math1',
    subjectName: 'উচ্চতর গণিত ১ম পত্র',
    chapterId: 'chap_line',
    chapterName: 'সরলরেখা',
    title: 'সরলরেখার সমীকরণ ও লম্ব দূরত্ব (Straight Line Equations & Perpendicular Distance)',
    learningObjectives: [
      'বিভিন্ন আকারের সরলরেখার সমীকরণ',
      'বিন্দু হতে রেখার দূরত্ব ও মধ্যবর্তী কোণ নির্ণয়'
    ],
    prerequisites: [],
    estimatedMinutes: 70,
    practiceType: 'practice',
    officialStatus: 'needs_verification',
    sourceReferences: [DEMO_SOURCE_REFERENCES.buet_eng],
    examBlueprintWeight: 92,
  },
];

export const DEMO_DEFAULT_AVAILABILITY: StudentAvailabilityBlock[] = [
  { id: 'av_sun', dayOfWeek: 0, startTime: '08:00', endTime: '12:00', availableMinutes: 240 },
  { id: 'av_mon', dayOfWeek: 1, startTime: '08:00', endTime: '12:00', availableMinutes: 240 },
  { id: 'av_tue', dayOfWeek: 2, startTime: '08:00', endTime: '12:00', availableMinutes: 240 },
  { id: 'av_wed', dayOfWeek: 3, startTime: '08:00', endTime: '12:00', availableMinutes: 240 },
  { id: 'av_thu', dayOfWeek: 4, startTime: '08:00', endTime: '12:00', availableMinutes: 240 },
  { id: 'av_fri', dayOfWeek: 5, startTime: '15:00', endTime: '18:00', availableMinutes: 180 },
  { id: 'av_sat', dayOfWeek: 6, startTime: '08:00', endTime: '12:00', availableMinutes: 240 },
];

export const DEMO_DEFAULT_COMMITMENTS: FixedCommitment[] = [
  { id: 'cm_college', title: 'কলেজ/কোচিং ক্লাস (College/Coaching)', dayOfWeek: 1, startTime: '10:00', endTime: '12:00' },
  { id: 'cm_rest_fri', title: 'শুক্রবার জুমআ ও বিশ্রামের ব্লক (Friday Rest)', dayOfWeek: 5, startTime: '12:00', endTime: '15:00', isRestBlock: true },
];

export const DEMO_DEFAULT_PREFERENCES: RoutinePreferences = {
  preferredSessionMinutes: 45,
  bufferPercentage: 0.20,
  studyDays: [0, 1, 2, 3, 4, 5, 6],
  maxDailyStudyMinutes: 240,
  reviewGaps: [1, 3, 7, 14],
};

export const DEMO_VISUAL_EXPLANATION: VisualExplanationSpec = {
  id: 've_env_gas',
  topicId: 'top_env_gas',
  title: 'আদর্শ গ্যাস অণুর আচরণ ও তাপমাত্রা-চাপের আন্তঃসম্পর্ক (Visual Diagram)',
  learningObjective: 'আদর্শ গ্যাসে অণুগুলোর গতিশীলতা, পাত্রের দেয়ালে চাপ ও কেলভিন তাপমাত্রার পরিবর্তন দৃশ্যায়ন',
  steps: [
    { stepNumber: 1, title: 'বয়েলের সূত্র (Boyle\'s Law)', description: 'স্থির তাপমাত্রায় পাত্রের আয়তন অর্ধেক করলে অণুগুলোর সংঘর্ষ দ্বিগুণ হয় ও চাপ ২ গুণ বাড়ে।' },
    { stepNumber: 2, title: 'চার্লসের সূত্র (Charles\'s Law)', description: 'স্থির চাপে তাপমাত্রা বৃদ্ধি করলে গ্যাসের অণুগুলোর গতিশক্তি বাড়ে এবং আয়তন প্রসারিত হয়।' },
    { stepNumber: 3, title: 'অ্যাভোগাড্রোর সূত্র (Avogadro\'s Law)', description: 'সমান তাপমাত্রা ও চাপে সমায়তন পাত্রে সমান সংখ্যক অণু অবস্থান করে (V ∝ n)।' }
  ],
  labels: ['P1V1 = P2V2', 'V1/T1 = V2/T2', 'PV = nRT', 'DEMO Diagram / Feature Flagged'],
  sourceIds: ['src_nctb_chem2'],
  isFeatureFlagged: true,
};
