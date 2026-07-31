import { Subject } from '../types';

export const syllabus: Subject[] = [
  // Academic Preparation
  {
    id: 'bio1',
    name: 'জীববিজ্ঞান ১ম পত্র',
    icon: 'Dna',
    color: 'from-teal-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    chapters: [
      '১. কোষ ও এর গঠন', '২. কোষ বিভাজন', '৩. কোষ রসায়ন', '৪. অণুজীব',
      '৫. শৈবাল ও ছত্রাক', '৬. ব্রায়োফাইটা ও টেরাইডোফাইটা', '৭. নগ্নবীজী ও আবৃতবীজী উদ্ভিদ',
      '৮. টিস্যু ও টিস্যুতন্ত্র', '৯. উদ্ভিদ শারীরতত্ত্ব', '১০. উদ্ভিদ প্রজনন',
      '১১. জীবপ্রযুক্তি', '১২. জীবের পরিবেশ, বিস্তার ও সংরক্ষণ'
    ],
    activeChapters: [0, 6]
  },
  {
    id: 'bio2',
    name: 'জীববিজ্ঞান ২য় পত্র',
    icon: 'Microscope',
    color: 'from-emerald-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    chapters: [
      '১. প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস', '২. প্রাণীর পরিচিতি', '৩. মানব শারীরতত্ত্ব: পরিপাক ও শোষণ',
      '৪. মানব শারীরতত্ত্ব: রক্ত ও সংবহন', '৫. মানব শারীরতত্ত্ব: শ্বসন ও শ্বাসক্রিয়া', '৬. মানব শারীরতত্ত্ব: বর্জ্য ও নিষ্কাশন',
      '৭. মানব শারীরতত্ত্ব: চলন ও অঙ্গচালনা', '৮. মানব শারীরতত্ত্ব: সমন্বয় ও নিয়ন্ত্রণ', '৯. মানব জীবনের ধারাবাহিকতা',
      '১০. মানবদেহের প্রতিরক্ষা', '১১. জিনতত্ত্ব ও বিবর্তন', '১২. প্রাণীর আচরণ'
    ],
    activeChapters: [0]
  },
  {
    id: 'math1',
    name: 'উচ্চতর গণিত ১ম পত্র',
    icon: 'Ruler',
    color: 'from-indigo-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    chapters: [
      '১. ম্যাট্রিক্স ও নির্ণায়ক', '২. ভেক্টর', '৩. সরলরেখা', '৪. বৃত্ত',
      '৫. বিন্যাস ও সমাবেশ', '৬. ত্রিকোণমিতিক অনুপাত', '৭. সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত',
      '৮. ফাংশন ও ফাংশনের লেখচিত্র', '৯. অন্তরীকরণ', '১০. যোগজীকরণ'
    ],
    activeChapters: []
  },
  {
    id: 'math2',
    name: 'উচ্চতর গণিত ২য় পত্র',
    icon: 'Calculator',
    color: 'from-blue-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    chapters: [
      '১. বাস্তব সংখ্যা ও অসমতা', '২. যোগাশ্রয়ী প্রোগ্রাম', '৩. জটিল সংখ্যা', '৪. বহুপদী ও বহুপদী সমীকরণ',
      '৫. দ্বিপদী বিস্তৃতি', '৬. কণিক', '৭. বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ',
      '৮. স্থিতিবিদ্যা', '৯. সমতলে বস্তুকণার গতি', '১০. বিস্তার পরিমাপ ও সম্ভাবনা'
    ],
    activeChapters: []
  },
  {
    id: 'chem1',
    name: 'রসায়ন ১ম পত্র',
    icon: 'FlaskConical',
    color: 'from-purple-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    chapters: [
      '১. ল্যাবরেটরির নিরাপদ ব্যবহার', '২. গুণগত রসায়ন', '৩. মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
      '৪. রাসায়নিক পরিবর্তন', '৫. কর্মমুখী রসায়ন'
    ],
    activeChapters: [1]
  },
  {
    id: 'chem2',
    name: 'রসায়ন ২য় পত্র',
    icon: 'Beaker',
    color: 'from-fuchsia-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    chapters: [
      '১. পরিবেশ রসায়ন', '২. জৈব রসায়ন', '৩. পরিমাণগত রসায়ন', '৪. তড়িৎ রসায়ন', '৫. অর্থনৈতিক রসায়ন'
    ],
    activeChapters: []
  },
  {
    id: 'phys1',
    name: 'পদার্থবিজ্ঞান ১ম পত্র',
    icon: 'Atom',
    color: 'from-sky-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    chapters: [
      '১. ভৌতজগৎ ও পরিমাপ', '২. ভেক্টর', '৩. গতিবিদ্যা', '৪. নিউটনীয় বলবিদ্যা',
      '৫. কাজ, শক্তি ও ক্ষমতা', '৬. মহাকর্ষ ও অভিকর্ষ', '৭. পদার্থের গাঠনিক ধর্ম',
      '৮. পর্যাবৃত্তিক গতি', '৯. তরঙ্গ', '১০. আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব'
    ],
    activeChapters: [1]
  },
  {
    id: 'phys2',
    name: 'পদার্থবিজ্ঞান ২য় পত্র',
    icon: 'Zap',
    color: 'from-cyan-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    chapters: [
      '১. তাপগতিবিদ্যা', '২. স্থির তড়িৎ', '৩. চল তড়িৎ', '৪. তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চুম্বকত্ব',
      '৫. তাড়িতচৌম্বকীয় আবেশ ও পরিবর্তী প্রবাহ', '৬. জ্যামিতিক আলোকবিজ্ঞান', '৭. ভৌত আলোকবিজ্ঞান',
      '৮. আধুনিক পদার্থবিজ্ঞানের সূচনা', '৯. পরমাণু মডেল এবং নিউক্লিয়ার পদার্থবিজ্ঞান',
      '১০. সেমিকন্ডাক্টর ও ইলেকট্রনিক্স', '১১. জ্যোতির্বিজ্ঞান'
    ],
    activeChapters: []
  },

  // GST Admission Test
  {
    id: 'gst_phys',
    name: 'GST Exam - Physics',
    icon: 'Atom',
    color: 'from-sky-900/50 to-slate-800',
    category: 'GST ভর্তি পরীক্ষা',
    chapters: [
      'Exam 1', 'Exam 2', 'Exam 3'
    ],
    activeChapters: []
  },
  {
    id: 'gst_chem',
    name: 'GST Exam - Chemistry',
    icon: 'FlaskConical',
    color: 'from-purple-900/50 to-slate-800',
    category: 'GST ভর্তি পরীক্ষা',
    chapters: [
      'Exam 1', 'Exam 2', 'Exam 3'
    ],
    activeChapters: []
  },
  {
    id: 'gst_math',
    name: 'GST Exam - Higher Math',
    icon: 'Calculator',
    color: 'from-blue-900/50 to-slate-800',
    category: 'GST ভর্তি পরীক্ষা',
    chapters: [
      'Exam 1 (অন্তরীকরণ)', 'Exam 2 (বহুপদী, বিপরীত ত্রিকোণমিতি, কণিক)', 'Exam 3'
    ],
    activeChapters: [0, 1]
  },
  {
    id: 'gst_bio',
    name: 'GST Exam - Biology',
    icon: 'Dna',
    color: 'from-teal-900/50 to-slate-800',
    category: 'GST ভর্তি পরীক্ষা',
    chapters: [
      'Exam 1', 'Exam 2', 'Exam 3'
    ],
    activeChapters: []
  },

  // DCU --- ICU Unit
  {
    id: 'dcu_phys',
    name: 'পদার্থবিজ্ঞান ১ম পত্র (ICU)',
    icon: 'Atom',
    color: 'from-sky-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['অধ্যায় সমূহ', 'ভেক্টর এক্সাম', 'নিউটনিয়ান বলবিদ্যা এক্সাম', 'কাজ ক্ষমতা শক্তি এক্সাম', 'মহাকর্ষ ও অভিকর্ষ এক্সাম', 'পদার্থের গাঠনিক ধর্ম এক্সাম', 'পর্যায়বৃত্ত গতি এক্সাম', 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব এক্সাম'],
    activeChapters: [0, 1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 'dcu_phys2',
    name: 'পদার্থবিজ্ঞান ২য় পত্র (ICU)',
    icon: 'Zap',
    color: 'from-cyan-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['১. তাপগতিবিদ্যা এক্সাম', '২. স্থির তড়িৎ এক্সাম', '৩. চল তড়িৎ এক্সাম'],
    activeChapters: [0, 1, 2]
  },
  {
    id: 'dcu_chem1',
    name: 'রসায়ন ১ম পত্র (ICU)',
    icon: 'FlaskConical',
    color: 'from-purple-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['গুণগত রসায়ন এক্সাম', 'মৌলের পর্যাবৃত্ত ধর্ম এক্সাম'],
    activeChapters: [0, 1]
  },
  {
    id: 'dcu_chem2',
    name: 'রসায়ন ২য় পত্র (ICU)',
    icon: 'Beaker',
    color: 'from-fuchsia-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['পরিবেশ রসায়ন এক্সাম'],
    activeChapters: [0]
  },
  {
    id: 'dcu_math',
    name: 'উচ্চতর গণিত (ICU)',
    icon: 'Calculator',
    color: 'from-blue-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['সরলরেখা', 'Math Exam 1', 'Exam 3 (বৃত্ত + কণিক)'],
    activeChapters: [0, 1, 2]
  },
  {
    id: 'dcu_bio',
    name: 'জীববিজ্ঞান (ICU)',
    icon: 'Dna',
    color: 'from-teal-900/50 to-slate-800',
    category: 'DCU --- ICU Unit',
    chapters: ['অধ্যায় সমূহ'],
    activeChapters: []
  }
];
