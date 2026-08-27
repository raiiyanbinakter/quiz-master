export type AcademicPaperType = 'first' | 'second' | 'not_applicable';

export interface AcademicSectionConfig {
  id: string; // e.g. 'gadya', 'kobita', 'sohopat'
  name: string; // e.g. 'গদ্য', 'কবিতা', 'সহপাঠ'
  description?: string;
  chapterRange: { start: number; end: number };
}

export interface AcademicChapterConfig {
  subjectId: string;
  paper: AcademicPaperType;
  sectionId?: string;
  sectionName?: string;
  chapterNumber: number; // 1-based continuous numbering (e.g. 1..6, 1..26)
  chapterId: string;
  chapterName: string;
  topics?: string[];
}

export interface AcademicSubjectConfig {
  id: string;
  name: string;
  nameEn: string;
  paper: AcademicPaperType;
  icon: string;
  color: string;
  category: string;
  hasSections: boolean;
  sections?: AcademicSectionConfig[];
  chapters: AcademicChapterConfig[];
}

// 1. ICT (তথ্য ও যোগাযোগ প্রযুক্তি)
export const ICT_CHAPTERS: AcademicChapterConfig[] = [
  {
    subjectId: 'ict',
    paper: 'not_applicable',
    chapterNumber: 1,
    chapterId: 'ict_ch1',
    chapterName: 'তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ প্রেক্ষিত',
    topics: ['ভার্চুয়াল রিয়েলিটি', 'কৃত্রিম বুদ্ধিমত্তা', 'রোবোটিক্স', 'ক্রায়োসার্জারি', 'মহাকাশ অভিযান', 'বায়োমেট্রিক্স', 'বায়োইনফরমেটিক্স', 'জেনেটিক ইঞ্জিনিয়ারিং', 'ন্যানোটেকনোলজি']
  },
  {
    subjectId: 'ict',
    paper: 'not_applicable',
    chapterNumber: 2,
    chapterId: 'ict_ch2',
    chapterName: 'কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং',
    topics: ['ডেটা কমিউনিকেশন ধারণা ও উপাদান', 'ব্যান্ডউইথ', 'ডেটা ট্রান্সমিশন মোড ও মেথড', 'তারযুক্ত ও তারবিহীন মাধ্যম', 'ওয়্যারলেস স্ট্যান্ডার্ড (Bluetooth, Wi-Fi, WiMAX)', 'মোবাইল যোগাযোগ প্রজন্ম', 'কম্পিউটার নেটওয়ার্কিং ও টপোলজি', 'ক্লাউড কম্পিউটিং']
  },
  {
    subjectId: 'ict',
    paper: 'not_applicable',
    chapterNumber: 3,
    chapterId: 'ict_ch3',
    chapterName: 'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস',
    topics: [
      '১. সংখ্যা আবিষ্কারের ইতিহাস ও সংখ্যা পদ্ধতির ধারণা',
      '২. বিভিন্ন সংখ্যা পদ্ধতির আন্তঃরূপান্তর',
      '৩. বাইনারি যোগ-বিয়োগ ও ২-এর পরিপূরক',
      '৪. বিভিন্ন প্রকার কোড',
      '৫. বুলিয়ান অ্যালজেবরা',
      '৬. লজিক গেইট',
      '৭. ডিজিটাল ডিভাইস'
    ]
  },
  {
    subjectId: 'ict',
    paper: 'not_applicable',
    chapterNumber: 4,
    chapterId: 'ict_ch4',
    chapterName: 'ওয়েব ডিজাইন পরিচিতি এবং HTML',
    topics: ['ওয়েব পেজ ও ওয়েবসাইটের কাঠামো', 'URL ও ডোমেন নেম', 'HTML বেসিক সিনট্যাক্স ও ট্যাগ', 'টেক্সট ফরম্যাটিং ও কালার কোড', 'হাইপারলিংক তৈরি (Anchor tag)', 'ছবি ও অডিও/ভিডিও সংযোজন', 'HTML টেবিল তৈরি', 'HTML ফর্ম তৈরি', 'ওয়েবসাইট হোস্টিং ও পাবলিশিং']
  },
  {
    subjectId: 'ict',
    paper: 'not_applicable',
    chapterNumber: 5,
    chapterId: 'ict_ch5',
    chapterName: 'প্রোগ্রামিং ভাষা',
    topics: ['প্রোগ্রামিং ভাষার স্তর ও অনুবাদক প্রোগ্রাম', 'প্রোগ্রাম ডিজাইনের ধাপ, অ্যালগরিদম ও ফ্লোচার্ট', 'C ভাষার প্রাথমিক ধারণা ও ডেটা টাইপ', 'ইনপুট ও আউটপুট ফাংশন (printf, scanf)', 'অপারেটর ও এক্সপ্রেশন', 'কন্ডিশনাল কন্ট্রোল স্টেটমেন্ট (if-else, switch)', 'লুপ কন্ট্রোল স্টেটমেন্ট (for, while, do-while)', 'অ্যারে (1D ও 2D)', 'ফাংশন ও পয়েন্টার']
  },
  {
    subjectId: 'ict',
    paper: 'not_applicable',
    chapterNumber: 6,
    chapterId: 'ict_ch6',
    chapterName: 'ডেটাবেজ ম্যানেজমেন্ট সিস্টেম',
    topics: ['ডেটাবেজের উপাদান (Field, Record, Table)', 'DBMS ও RDBMS পরিচিতি', 'প্রাইমারি কি, কম্পোজিট কি ও ফরেন কি', 'ডেটাবেজ রিলেশনশিপ (1:1, 1:N, N:M)', 'SQL কুয়েরি (SELECT, INSERT, UPDATE, DELETE)', 'সর্টিং, ইনডেক্সিং ও সার্চিং', 'ডেটাবেজ সিকিউরিটি ও ব্যাকআপ']
  }
];

// 2. BANGLA FIRST PAPER (বাংলা ১ম পত্র)
export const BANGLA_FIRST_SECTIONS: AcademicSectionConfig[] = [
  {
    id: 'gadya',
    name: 'গদ্য',
    description: '১২টি প্রবন্ধ, গল্প ও স্মৃতিচারণ',
    chapterRange: { start: 1, end: 12 }
  },
  {
    id: 'kobita',
    name: 'কবিতা',
    description: '১২টি আধুনিক ও ঐতিহ্যবাহী কবিতা',
    chapterRange: { start: 13, end: 24 }
  },
  {
    id: 'sohopat',
    name: 'সহপাঠ',
    description: 'নাটক ও উপন্যাস',
    chapterRange: { start: 25, end: 26 }
  }
];

export const BANGLA_FIRST_CHAPTERS: AcademicChapterConfig[] = [
  // --- গদ্য (Chapters 01 - 12) ---
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 1,
    chapterId: 'bangla1_ch01',
    chapterName: 'বাঙ্গালার নব্য লেখকদিগের প্রতি নিবেদন',
    topics: ['মূল ভাবার্থ ও বিষয়বস্তু', 'রচয়িতার উদ্দেশ্য ও উপদেশাবলী', 'শব্দার্থ ও টীকা', 'অনুধাবনমূলক প্রশ্নোত্তর', 'সৃজনশীল ও MCQ প্রশ্নোত্তর']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 2,
    chapterId: 'bangla1_ch02',
    chapterName: 'অপরিচিতা',
    topics: ['অনুপম ও কল্যাণীর চরিত্র', 'যৌতুক প্রথার বিরুদ্ধে প্রতিবাদ', 'শব্দার্থ ও মূল বক্তব্য', 'উৎস ও প্রেক্ষাপট']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 3,
    chapterId: 'bangla1_ch03',
    chapterName: 'সাহিত্যে খেলা',
    topics: ['সাহিত্যের উদ্দেশ্য ও রসাস্বাদন', 'প্রমথ চৌধুরীর দৃষ্টিভঙ্গি', 'শব্দার্থ ও মূলভাব']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 4,
    chapterId: 'bangla1_ch04',
    chapterName: 'বিলাসী',
    topics: ['মৃত্যুঞ্জয় ও বিলাসীর নিঃস্বার্থ ভালোবাসা', 'তৎকালীন সমাজের কুসংস্কার ও সংকীর্ণতা', 'শরৎচন্দ্রের আখ্যানভঙ্গি']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 5,
    chapterId: 'bangla1_ch05',
    chapterName: 'অর্ধাঙ্গী',
    topics: ['নারী জাগরণ ও অধিকার', 'বেগম রোকেয়ার সংস্কার চিন্তা', 'শব্দার্থ ও তাৎপর্য']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 6,
    chapterId: 'bangla1_ch06',
    chapterName: 'যৌবনের গান',
    topics: ['যৌবনের শক্তি ও তারুণ্যের জয়গান', 'কাজী নজরুল ইসলামের বলিষ্ঠ বাণী', 'জাতীয় চেতনার উন্মেষ']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 7,
    chapterId: 'bangla1_ch07',
    chapterName: 'জীবন ও বৃক্ষ',
    topics: ['বৃক্ষের আত্মদান ও মানব জীবনের সার্থকতা', 'মোতাহের হোসেন চৌধুরীর জীবনদর্শন', 'তপস্বী বৃক্ষের রূপক']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 8,
    chapterId: 'bangla1_ch08',
    chapterName: 'গন্তব্য কাবুল',
    topics: ['সৈয়দ মুজতবা আলীর ভ্রমণ অভিজ্ঞতা', 'কাবুলের ভূ-প্রকৃতি ও জনজীবন', 'আবদুর রহমানের সেবা ও আতিথেয়তা']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 9,
    chapterId: 'bangla1_ch09',
    chapterName: 'মাসি-পিসি',
    topics: ['অসহায় আহ্লাদীর নিরাপত্তা বিধান', 'দুই বিধবা নারীর সংগ্রাম ও দৃঢ়তা', 'মানিক বন্দ্যোপাধ্যায়ের বাস্তবতা']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 10,
    chapterId: 'bangla1_ch10',
    chapterName: 'কপিলদাস মুর্মুর শেষ কাজ',
    topics: ['সাঁওতাল জীবনের বঞ্চনা ও বিদ্রোহ', 'মূল বিষয়বস্তু ও চরিত্র বিশ্লেষণ', 'সামাজিক দ্বন্দ্ব']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 11,
    chapterId: 'bangla1_ch11',
    chapterName: 'রেইনকোট',
    topics: ['১৯৭১ সালের মুক্তিযুদ্ধ ও অবরুদ্ধ ঢাকা', 'নুরুল হুদার মানসিক রূপান্তর', 'রেইনকোটের রূপক অর্থ ও সাহস']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'gadya',
    sectionName: 'গদ্য',
    chapterNumber: 12,
    chapterId: 'bangla1_ch12',
    chapterName: 'নেকলেস',
    topics: ['মরিসবতী মাদাম লোইসেলের উচ্চাশা', 'নেকলেস হারানোর ট্র্যাজেডি ও ১০ বছরের সংগ্রাম', 'গাই দ্য মোপাসার টুইস্ট এন্ডিং']
  },

  // --- কবিতা (Chapters 13 - 24) ---
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 13,
    chapterId: 'bangla1_ch13',
    chapterName: 'ঋতু বর্ণন',
    topics: ['ছয় ঋতুর প্রাকৃতিক রূপ ও সৌন্দর্য', 'কাব্যিক মাধুর্য ও চিত্রকল্প', 'উৎস ও রচয়িতা']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 14,
    chapterId: 'bangla1_ch14',
    chapterName: 'বিভীষণের প্রতি মেঘনাদ',
    topics: ['মেঘনাদের দেশপ্রেম ও তেজস্বিতা', 'বিভীষণের দেশদ্রোহিতা ও ভর্ৎসনা', 'মাইকেল মধুসূদন দত্তের অমিত্রাক্ষর ছন্দ']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 15,
    chapterId: 'bangla1_ch15',
    chapterName: 'সোনার তরী',
    topics: ['কর্মের অক্ষয়তা ও ব্যক্তিস্বত্তার নশ্বরতা', 'রূপক অর্থ ও রবীন্দ্রনাথ ঠাকুরের দর্শন', 'ছন্দ ও অলংকার']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 16,
    chapterId: 'bangla1_ch16',
    chapterName: 'বিদ্রোহী',
    topics: ['অন্যায় ও শোষণের বিরুদ্ধে তীব্র বিদ্রোহ', 'নজরুলের আত্মমর্যাদা ও বিশ্বমানবতা', 'পৌরাণিক ও ঐতিহাসিক অনুষঙ্গ']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 17,
    chapterId: 'bangla1_ch17',
    chapterName: 'সুচেতনা',
    topics: ['জীবনানন্দ দাশের ইতিহাসচেতনা ও স্বপ্ন', 'মানবজাতির উত্তরণ ও শুভবোধ', 'কাব্যভাষা ও রূপকল্প']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 18,
    chapterId: 'bangla1_ch18',
    chapterName: 'প্রতিদান',
    topics: ['অহিতকারীর প্রতি হিতসাধন', 'জসীমউদ্দীন এর পরোপকারী মানবপ্রেম', 'সহমর্মিতা ও উদারতা']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 19,
    chapterId: 'bangla1_ch19',
    chapterName: 'তাহারেই পড়ে মনে',
    topics: ['বসন্তের আগমন ও কবির ব্যক্তিগত শোক', 'প্রকৃতি বনাম মানবমনের বিষাদ', 'সংলাপধর্মী কাব্যরূপ']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 20,
    chapterId: 'bangla1_ch20',
    chapterName: 'পদ্মা',
    topics: ['পদ্মা নদীর প্রমত্ত রূপ ও জীবনসংগ্রাম', 'ফাররুখ আহমদের রূপক বাণী', 'ছন্দ ও সুর']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 21,
    chapterId: 'bangla1_ch21',
    chapterName: 'আঠারো বছর বয়স',
    topics: ['তারুণ্যের অদম্য সাহস ও আত্মত্যাগ', 'সুকান্ত ভট্টাচার্যের সমাজচেতনা', 'ইতিবাচক পরিবর্তনের শক্তি']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 22,
    chapterId: 'bangla1_ch22',
    chapterName: 'ফেব্রুয়ারি ১৯৬৯',
    topics: ['১৯৬৯ সালের গণঅভ্যুত্থান ও ভাষা আন্দোলনের স্মৃতি', 'শামসুর রাহমানের সংগ্রামী চেতনা', 'সালাম ও বরকতের প্রতীকী উপস্থিতি']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 23,
    chapterId: 'bangla1_ch23',
    chapterName: 'আমি কিংবদন্তির কথা বলছি',
    topics: ['বাঙালির হাজার বছরের ঐতিহ্য ও লড়াই', 'আবু জাফর ওবায়দুল্লাহর কাব্যশৈলী', 'মুক্তির আকাঙ্ক্ষা ও শ্রমজীবী মানুষের মহিমা']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'kobita',
    sectionName: 'কবিতা',
    chapterNumber: 24,
    chapterId: 'bangla1_ch24',
    chapterName: 'প্রত্যাবর্তনের লজ্জা',
    topics: ['যুদ্ধোত্তর বাংলাদেশের বাস্তবতা ও বেদনা', 'আত্মগ্লানি ও স্বদেশ ভাবনা', 'কাব্যিক বিশ্লেষণ']
  },

  // --- সহপাঠ (Chapters 25 - 26) ---
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'sohopat',
    sectionName: 'সহপাঠ',
    chapterNumber: 25,
    chapterId: 'bangla1_ch25',
    chapterName: 'নাটক: সিরাজউদ্দৌলা',
    topics: ['১৭৫৭ সালের পলাশী যুদ্ধের পটভূমি', 'নবাব সিরাজউদ্দৌলার দেশপ্রেম ও ট্র্যাজেডি', 'মীর জাফর, ঘসেটি বেগম ও ইংরেজদের ষড়যন্ত্র', 'প্রধান প্রধান দৃশ্য ও সংলাপ বিশ্লেষণ']
  },
  {
    subjectId: 'bangla_first',
    paper: 'first',
    sectionId: 'sohopat',
    sectionName: 'সহপাঠ',
    chapterNumber: 26,
    chapterId: 'bangla1_ch26',
    chapterName: 'উপন্যাস: লালসালু',
    topics: ['মজিদের ধর্ম ব্যবসা ও কুসংস্কারের শৃঙ্খল', 'গ্রামীন সমাজের ধর্মান্ধতা ও জমিলা-রহিমার মনস্তত্ত্ব', 'সৈয়দ ওয়ালীউল্লাহর অস্তিত্ববাদী দর্শন ও প্রতীক']
  }
];

// 3. PHYSICS 1ST & 2ND PAPERS
export const PHYSICS_FIRST_CHAPTERS: AcademicChapterConfig[] = [
  { subjectId: 'phys1', paper: 'first', chapterNumber: 1, chapterId: 'phys1_ch1', chapterName: 'ভৌতজগৎ ও পরিমাপ', topics: ['ভৌত রাশি ও মাত্রা', 'পরিমাপের ত্রুটি ও ত্রুটির হিসাব', 'ভার্নিয়ার স্কেল ও স্ক্রু গেজ'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 2, chapterId: 'phys1_ch2', chapterName: 'ভেক্টর', topics: ['ভেক্টর যোগ ও বিয়োজন', 'নদী ও নৌকা', 'ডট ও ক্রস গুণন', 'ভেক্টর ক্যালকুলাস'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 3, chapterId: 'phys1_ch3', chapterName: 'গতিবিদ্যা', topics: ['গতির সমীকরণ ও লেখচিত্র', 'প্রাস ও প্রাসের গতি', 'আপেক্ষিক বেগ'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 4, chapterId: 'phys1_ch4', chapterName: 'নিউটনীয় বলবিদ্যা', topics: ['নিউটনের গতিসূত্র ও জড়তা', 'ভরবেগের নিত্যতা ও রকেট', 'টর্ক ও জড়তার ভ্রামক', 'কেন্দ্রমুখী বল ও ব্যাংকিং কোণ'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 5, chapterId: 'phys1_ch5', chapterName: 'কাজ, শক্তি ও ক্ষমতা', topics: ['পরিবর্তনশীল বল দ্বারা কাজ', 'কাজ-শক্তি উপপাদ্য', 'সংরক্ষণশীল বল ও বিভব শক্তি', 'কর্মদক্ষতা ও ক্ষমতা'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 6, chapterId: 'phys1_ch6', chapterName: 'মহাকর্ষ ও অভিকর্ষ', topics: ['কেপলারের সূত্রসমূহ', 'নিউটনের মহাকর্ষ সূত্র ও g-এর পরিবর্তন', 'মহাকর্ষীয় বিভব ও প্রাবল্য', 'মুক্তিবেগ ও কৃত্রিম উপগ্রহ'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 7, chapterId: 'phys1_ch7', chapterName: 'পদার্থের গাঠনিক ধর্ম', topics: ['পীড়ন ও বিকৃতি (হুকের সূত্র)', 'ইয়ং-এর গুণাঙ্ক ও সঞ্চিত শক্তি', 'পৃষ্ঠটান ও পৃষ্ঠশক্তি', 'সান্দ্রতা ও স্টোকসের সূত্র'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 8, chapterId: 'phys1_ch8', chapterName: 'পর্যাবৃত্ত গতি', topics: ['সরল ছন্দিত স্পন্দন ও ব্যবকলনীয় সমীকরণ', 'সরল ছন্দিত গতির শক্তি', 'সরল দোলক ও সেকেন্ড দোলক', 'স্প্রিং-এর দোলনকাল'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 9, chapterId: 'phys1_ch9', chapterName: 'তরঙ্গ', topics: ['অগ্রগামী তরঙ্গের সমীকরণ', 'স্থির তরঙ্গ ও সুস্পন্দ-নিস্পন্দ বিন্দু', 'শব্দের তীব্রতা ও তীব্রতা লেভেল', 'বীট ও ডপলার ক্রিয়া'] },
  { subjectId: 'phys1', paper: 'first', chapterNumber: 10, chapterId: 'phys1_ch10', chapterName: 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব', topics: ['গ্যাসের সূত্রাবলী (বয়েল, চার্লস, অ্যাভোগাড্রো)', 'আদর্শ গ্যাস সমীকরণ ও RMS বেগ', 'গ্যাসের অণুর স্বাধীনতার মাত্রা ও শক্তি সমবিভাজন নীতি', 'আপেক্ষিক আর্দ্রতা ও শিশিরাঙ্ক'] }
];

export const PHYSICS_SECOND_CHAPTERS: AcademicChapterConfig[] = [
  { subjectId: 'phys2', paper: 'second', chapterNumber: 1, chapterId: 'phys2_ch1', chapterName: 'তাপগতিবিদ্যা', topics: ['তাপগতিবিদ্যার ১ম ও ২য় সূত্র', 'সমোষ্ণ ও রুদ্ধতাপীয় প্রক্রিয়া', 'কার্নো চক্র ও দক্ষতা', 'এনট্রপি'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 2, chapterId: 'phys2_ch2', chapterName: 'স্থির তড়িৎ', topics: ['কুলম্বের সূত্র ও তড়িৎ প্রাবল্য', 'তড়িৎ বিভব ও তড়িৎ দ্বিমেরু', 'গাউসের সূত্র', 'ধারক ও ধারকত্ব'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 3, chapterId: 'phys2_ch3', chapterName: 'চল তড়িৎ', topics: ['ওহমের সূত্র ও রোধের সমন্বয়', 'কার্শফের সূত্রাবলী ও হুইটস্টোন ব্রিজ', 'কোষের অভ্যন্তরীণ রোধ ও তড়িচ্চালক বল', 'মিটার ব্রিজ ও পটেনশিওমিটার'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 4, chapterId: 'phys2_ch4', chapterName: 'তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চুম্বকত্ব', topics: ['বায়ো-স্যাভার্ট সূত্র ও অ্যাম্পিয়ারের সূত্র', 'চৌম্বক বল ও লরেঞ্জ বল', 'চুম্বক পদার্থ ও ভূ-চুম্বকত্ব'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 5, chapterId: 'phys2_ch5', chapterName: 'তাড়িতচৌম্বকীয় আবেশ ও পরিবর্তী প্রবাহ', topics: ['ফ্যারাডের সূত্র ও লেঞ্জের সূত্র', 'স্বকীয় ও পারস্পরিক আবেশ', 'AC ভোল্টেজ ও কারেন্ট', 'ট্রান্সফরমার'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 6, chapterId: 'phys2_ch6', chapterName: 'জ্যামিতিক আলোকবিজ্ঞান', topics: ['প্রতিসরণ ও পূর্ণ অভ্যন্তরীণ প্রতিফলন', 'প্রিজম ও ন্যূনতম বিচ্যুতি', 'লেন্স ও লেন্স সমীকরণ', 'দৃষ্টির ত্রুটি ও অপটিক্যাল যন্ত্র'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 7, chapterId: 'phys2_ch7', chapterName: 'ভৌত আলোকবিজ্ঞান', topics: ['হাইগেনসের নীতি ও ব্যতিচার (ইয়ং-এর দ্বি-চির)', 'অপবর্তন (একক ও গ্রেটিং)', 'সমাবর্তন ও ব্রুস্টারের সূত্র'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 8, chapterId: 'phys2_ch8', chapterName: 'আধুনিক পদার্থবিজ্ঞানের সূচনা', topics: ['আপেক্ষিকতার বিশেষ তত্ত্ব', 'দৈর্ঘ্য সংকোচন, কাল দীর্ঘায়ন ও ভর বৃদ্ধি', 'ফটোইলেকট্রিক ক্রিয়া ও কম্পটন ক্রিয়া'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 9, chapterId: 'phys2_ch9', chapterName: 'পরমাণু মডেল এবং নিউক্লিয়ার পদার্থবিজ্ঞান', topics: ['রাদারফোর্ড ও বোর পরমাণু মডেল', 'হাইড্রোজেন বর্ণালী', 'তেজস্ক্রিয়তা ও অর্ধায়ু', 'ভর ত্রুটি ও বন্ধন শক্তি'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 10, chapterId: 'phys2_ch10', chapterName: 'সেমিকন্ডাক্টর ও ইলেকট্রনিক্স', topics: ['p-n জংশন ডায়োড ও রেকটিফিকেশন', 'ট্রানজিস্টর ও অ্যাম্প্লিফায়ার', 'লজিক গেট ও বুলিয়ান অ্যালজেব্রা'] },
  { subjectId: 'phys2', paper: 'second', chapterNumber: 11, chapterId: 'phys2_ch11', chapterName: 'জ্যোতির্বিজ্ঞান', topics: ['সৌরজগৎ ও নক্ষত্রের বিবর্তন', 'হাবলের সূত্র ও মহাবিশ্বের সম্প্রসারণ', 'কৃষ্ণগহ্বর ও কোয়াসার'] }
];

// 4. CHEMISTRY 1ST & 2ND PAPERS
export const CHEMISTRY_FIRST_CHAPTERS: AcademicChapterConfig[] = [
  { subjectId: 'chem1', paper: 'first', chapterNumber: 1, chapterId: 'chem1_ch1', chapterName: 'ল্যাবরেটরির নিরাপদ ব্যবহার', topics: ['ল্যাবরেটরি নিরাপত্তা ও সুরক্ষা সামগ্রী', 'কাচের যন্ত্রপাতি ও পরিমাপ', 'রাসায়নিক দ্রব্যের ঝুঁকি ও হ্যাজার্ড প্রতীক'] },
  { subjectId: 'chem1', paper: 'first', chapterNumber: 2, chapterId: 'chem1_ch2', chapterName: 'গুণগত রসায়ন', topics: ['পরমাণুর মডেল ও কোয়ান্টাম সংখ্যা', 'ইলেকট্রন বিন্যাস নীতি', 'বর্ণালী ও বোর তত্ত্ব', 'দ্রাব্যতা ও দ্রাব্যতা গুণফল', 'আয়ন শনাক্তকরণ ও ক্রোমাটোগ্রাফি'] },
  { subjectId: 'chem1', paper: 'first', chapterNumber: 3, chapterId: 'chem1_ch3', chapterName: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন', topics: ['মৌলের শ্রেণিবিভাগ ও ব্লক', 'পর্যাবৃত্ত ধর্মসমূহ', 'সংকরায়ন ও আণবিক গঠন', 'হাইড্রোজেন বন্ধন ও ভ্যান ডার ওয়ালস বল'] },
  { subjectId: 'chem1', paper: 'first', chapterNumber: 4, chapterId: 'chem1_ch4', chapterName: 'রাসায়নিক পরিবর্তন', topics: ['গ্রিন কেমিস্ট্রি ও এটম ইকোনমি', 'বিক্রিয়ার হার ও প্রভাবক', 'রাসায়নিক সাম্যাবস্থা (Kp, Kc)', 'লা-শাতেলিয়ার নীতি', 'pH, pOH ও বাফার দ্রবণ', 'তাপরসায়ন'] },
  { subjectId: 'chem1', paper: 'first', chapterNumber: 5, chapterId: 'chem1_ch5', chapterName: 'কর্মমুখী রসায়ন', topics: ['খাদ্য নিরাপত্তা ও প্রিজারভেটিভস', 'টয়লেট্রিজ ও ক্লিনিং সামগ্রী', 'দুধ ও ভিনেগার প্রস্তুতি'] }
];

export const CHEMISTRY_SECOND_CHAPTERS: AcademicChapterConfig[] = [
  { subjectId: 'chem2', paper: 'second', chapterNumber: 1, chapterId: 'chem2_ch1', chapterName: 'পরিবেশ রসায়ন', topics: ['বায়ুমণ্ডলের গঠন ও গ্যাস সূত্র', 'ডাল্টনের আংশিক চাপ ও গ্রাহামের ব্যাপন সূত্র', 'আদর্শ ও বাস্তব গ্যাস', 'গ্রিনহাউস গ্যাস ও এসিড বৃষ্টি', 'পানির দূষণ ও বিশুদ্ধতার মানদণ্ড (DO, BOD, COD)'] },
  { subjectId: 'chem2', paper: 'second', chapterNumber: 2, chapterId: 'chem2_ch2', chapterName: 'জৈব রসায়ন', topics: ['জৈব যৌগের নামকরণ ও সমাণুতা', 'হাইড্রোকার্বন (অ্যালকেন, অ্যালকিন, অ্যালকাইন)', 'অ্যারোমেটিক হাইড্রোকার্বন ও প্রতিস্থাপন', 'অ্যালকাইল হ্যালাইড ও অ্যালকোহল', 'কার্বনিল যৌগ (অ্যালডিহাইড ও কিটোন)', 'কার্বক্সিলিক এসিড ও জাতক', 'অ্যামিন ও পলিমার'] },
  { subjectId: 'chem2', paper: 'second', chapterNumber: 3, chapterId: 'chem2_ch3', chapterName: 'পরিমাণগত রসায়ন', topics: ['মোল ও মোলার দ্রবণ', 'স্টয়কিওমেট্রি ও লিমিটিং বিক্রিয়ক', 'এসিড-ক্ষার টাইট্রেশন ও নির্দেশক', 'জারণ-বিজারণ বিক্রিয়া ও সমতাকরণ', 'আয়োডোমিতি ও আয়োডিমেট্রি'] },
  { subjectId: 'chem2', paper: 'second', chapterNumber: 4, chapterId: 'chem2_ch4', chapterName: 'তড়িৎ রসায়ন', topics: ['তড়িৎ পরিবাহী ও ফ্যারাডের সূত্র', 'তড়িৎ রাসায়নিক কোষ ও তড়িৎদ্বার বিভব', 'নার্নস্ট সমীকরণ', 'ব্যাটারি ও ফুয়েল সেল', 'ধাতুর ক্ষয় ও প্রতিকার'] },
  { subjectId: 'chem2', paper: 'second', chapterNumber: 5, chapterId: 'chem2_ch5', chapterName: 'অর্থনৈতিক রসায়ন', topics: ['ইউরিয়া সার কারখানা', 'সিমেন্ট ও কাচ কারখানা', 'চামড়া প্রক্রিয়াকরণ (ট্যানারি)', 'শিল্প বর্জ্য ও রিসাইক্লিং'] }
];

// 5. HIGHER MATH 1ST & 2ND PAPERS
export const HIGHER_MATH_FIRST_CHAPTERS: AcademicChapterConfig[] = [
  { subjectId: 'math1', paper: 'first', chapterNumber: 1, chapterId: 'math1_ch1', chapterName: 'ম্যাট্রিক্স ও নির্ণায়ক', topics: ['ম্যাট্রিক্সের প্রকারভেদ ও গুণন', 'নির্ণায়কের ধর্মাবলী', 'ক্র্যামারের নিয়ম ও বিপরীত ম্যাট্রিক্স'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 2, chapterId: 'math1_ch2', chapterName: 'ভেক্টর', topics: ['ভেক্টরের মৌলিক ধারণা', 'ভেক্টরের সমান্তরাল ও লম্ব হওয়া', 'স্কেলার ও ভেক্টর গুণন'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 3, chapterId: 'math1_ch3', chapterName: 'সরলরেখা', topics: ['স্থানাঙ্ক ও বিভক্তিকরণ', 'সরলরেখার ঢাল ও সমীকরণ', 'দুই রেখার মধ্যবর্তী কোণ ও দূরত্ব'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 4, chapterId: 'math1_ch4', chapterName: 'বৃত্ত', topics: ['বৃত্তের প্রমিত সমীকরণ', 'স্পর্শক ও অভিলম্বের সমীকরণ', 'সাধারণ জ্যা ও অক্ষ ছেদ'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 5, chapterId: 'math1_ch5', chapterName: 'বিন্যাস ও সমাবেশ', topics: ['গণনার মৌলিক নীতি', 'nPr বিন্যাস সমস্যা', 'nCr সমাবেশ সমস্যা', 'শব্দ ও সংখ্যার বিন্যাস'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 6, chapterId: 'math1_ch6', chapterName: 'ত্রিকোণমিতিক অনুপাত', topics: ['কোণের পরিমাপ (ডিগ্রি ও রেডিয়ান)', 'ত্রিকোণমিতিক অভেদাবলী', 'চতুর্ভাগ ও চিহ্নের নিয়ম'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 7, chapterId: 'math1_ch7', chapterName: 'সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত', topics: ['যৌগিক কোণ', 'গুণিতক ও উপগুণিতক কোণ', 'ত্রিভুজের কোণ ও বাহুর সম্পর্ক'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 8, chapterId: 'math1_ch8', chapterName: 'ফাংশন ও ফাংশনের লেখচিত্র', topics: ['ডোমেন ও রেঞ্জ নির্ণয়', 'এক-এক ও সার্বিক ফাংশন', 'বিপরীত ফাংশন ও লেখচিত্র'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 9, chapterId: 'math1_ch9', chapterName: 'অন্তরীকরণ', topics: ['লিমিট ও অবিচ্ছিন্নতা', 'মৌলিক সূত্রের অন্তরজ', 'পর্যায়ক্রমিক অন্তরীকরণ', 'স্পর্শক ও চরম মান (গুরুমান/লঘুমান)'] },
  { subjectId: 'math1', paper: 'first', chapterNumber: 10, chapterId: 'math1_ch10', chapterName: 'যোগজীকরণ', topics: ['অনির্দিষ্ট যোগজ', 'নির্দিষ্ট যোগজ ও ক্ষেত্রফল'] }
];

export const HIGHER_MATH_SECOND_CHAPTERS: AcademicChapterConfig[] = [
  { subjectId: 'math2', paper: 'second', chapterNumber: 1, chapterId: 'math2_ch1', chapterName: 'বাস্তব সংখ্যা ও অসমতা', topics: ['বাস্তব সংখ্যার স্বীকার্য', 'পরমমান ও পরমমান সমাধান', 'অসমতা ও সংখ্যারেখা'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 2, chapterId: 'math2_ch2', chapterName: 'যোগাশ্রয়ী প্রোগ্রাম', topics: ['সীমাবদ্ধতা ও অভিষ্ট ফাংশন', 'লেখচিত্রের সাহায্যে অপটিমাইজেশন'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 3, chapterId: 'math2_ch3', chapterName: 'জটিল সংখ্যা', topics: ['জটিল সংখ্যার রূপ ও মডুলাস-আর্গুমেন্ট', 'এককের ঘনমূল ও চতুর্মূল', 'সঞ্চারপথ'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 4, chapterId: 'math2_ch4', chapterName: 'বহুপদী ও বহুপদী সমীকরণ', topics: ['দ্বিঘাত সমীকরণ ও মূলের প্রকৃতি', 'মূল ও সহগের সম্পর্ক', 'ত্রিঘাত ও বহুঘাত সমীকরণ'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 5, chapterId: 'math2_ch5', chapterName: 'দ্বিপদী বিস্তৃতি', topics: ['প্যাসকেলের ত্রিভুজ', 'দ্বিপদী উপপাদ্য ও সাধারণ পদ', 'মধ্যপদ ও নির্দিষ্ট পদ'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 6, chapterId: 'math2_ch6', chapterName: 'কণিক', topics: ['পরাবৃত্ত (Parabola)', 'উপবৃত্ত (Ellipse)', 'অধিবৃত্ত (Hyperbola)'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 7, chapterId: 'math2_ch7', chapterName: 'বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ', topics: ['বিপরীত ত্রিকোণমিতিক ফাংশনের মান', 'ত্রিকোণমিতিক সমীকরণ সমাধান'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 8, chapterId: 'math2_ch8', chapterName: 'স্থিতিবিদ্যা', topics: ['বলের সাম্যাবস্থা ও লামির উপপাদ্য', 'সমান্তরাল বল ও সদৃশ/বিসদৃশ বল'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 9, chapterId: 'math2_ch9', chapterName: 'সমতলে বস্তুকণার গতি', topics: ['সোজা পথে গতি', 'প্রাসের গতি', 'আপেক্ষিক বেগ'] },
  { subjectId: 'math2', paper: 'second', chapterNumber: 10, chapterId: 'math2_ch10', chapterName: 'বিস্তার পরিমাপ ও সম্ভাবনা', topics: ['গড় ব্যবধান ও পরিমিত ব্যবধান', 'সম্ভাবনার মৌলিক নীতি', 'শর্তাধীন সম্ভাবনা'] }
];

// 6. BIOLOGY 1ST & 2ND PAPERS
export const BIOLOGY_FIRST_CHAPTERS: AcademicChapterConfig[] = [
  { subjectId: 'bio1', paper: 'first', chapterNumber: 1, chapterId: 'bio1_ch1', chapterName: 'কোষ ও এর গঠন', topics: ['কোষ প্রাচীর ও প্লাজমামেমব্রেন', 'সাইটোপ্লাজমীয় অঙ্গাণু', 'নিউক্লিয়াস ও ক্রোমোজোম', 'DNA ও RNA', 'ট্রান্সক্রিপশন ও ট্রান্সলেশন'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 2, chapterId: 'bio1_ch2', chapterName: 'কোষ বিভাজন', topics: ['কোষ চক্র ও ইন্টারফেজ', 'মাইটোটিক বিভাজন', 'মিয়োসিস বিভাজন ও ক্রসিং ওভার'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 3, chapterId: 'bio1_ch3', chapterName: 'কোষ রসায়ন', topics: ['কার্বোহাইড্রেট', 'অ্যামিনো এসিড ও প্রোটিন', 'লিপিড', 'এনজাইম'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 4, chapterId: 'bio1_ch4', chapterName: 'অণুজীব', topics: ['ভাইরাস ও ভাইরাসের গঠন', 'ব্যাকটেরিয়া ও এর বৈশিষ্ট্য', 'ম্যালেরিয়া পরজীবী'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 5, chapterId: 'bio1_ch5', chapterName: 'শৈবাল ও ছত্রাক', topics: ['শৈবালের বৈশিষ্ট্য ও ইউলোথ্রিক্স', 'ছত্রাকের বৈশিষ্ট্য ও এগারিকাস', 'লাইকেন'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 6, chapterId: 'bio1_ch6', chapterName: 'ব্রায়োফাইটা ও টেরাইডোফাইটা', topics: ['রিকসিয়া (Riccia)', 'টেরিস (Pteris / Fern)', 'জনুক্রম'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 7, chapterId: 'bio1_ch7', chapterName: 'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ', topics: ['নগ্নবীজী উদ্ভিদ (Cycas)', 'আবৃতবীজী উদ্ভিদের অঙ্গসংস্থান', 'মালভেসি গোত্র', 'পোয়াসি গোত্র'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 8, chapterId: 'bio1_ch8', chapterName: 'টিস্যু ও টিস্যুতন্ত্র', topics: ['ভাজক টিস্যু', 'স্থায়ী টিস্যু', 'ভাস্কুলার বান্ডল', 'মূল ও কাণ্ডের অন্তর্গঠন'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 9, chapterId: 'bio1_ch9', chapterName: 'উদ্ভিদ শারীরতত্ত্ব', topics: ['খনিজ লবণ পরিশোষণ', 'প্রস্বেদন', 'সালোকসংশ্লেষণ (C3, C4)', 'শ্বসন ও ক্রেবস চক্র'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 10, chapterId: 'bio1_ch10', chapterName: 'উদ্ভিদ প্রজনন', topics: ['পুং ও স্ত্রী গ্যামেটোফাইট বিকাশ', 'নিষেক ও দ্বিনিষেক', 'অযৌন ও অপুংজনি'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 11, chapterId: 'bio1_ch11', chapterName: 'জীবপ্রযুক্তি', topics: ['টিস্যু কালচার', 'রিকম্বিনেন্ট DNA প্রযুক্তি', 'জিনোম সিকোয়েন্সিং'] },
  { subjectId: 'bio1', paper: 'first', chapterNumber: 12, chapterId: 'bio1_ch12', chapterName: 'জীবের পরিবেশ, বিস্তার ও সংরক্ষণ', topics: ['বাস্তুতন্ত্র ও খাদ্যজাল', 'মরুজ ও জলজ উদ্ভিদের অভিযোজন', 'জীববৈচিত্র্য সংরক্ষণ'] }
];

export const BIOLOGY_SECOND_CHAPTERS: AcademicChapterConfig[] = [
  { subjectId: 'bio2', paper: 'second', chapterNumber: 1, chapterId: 'bio2_ch1', chapterName: 'প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস', topics: ['শ্রেণিবিন্যাসের ভিত্তি', 'প্রধান পর্বসমূহ (নন-কর্ডাটা)', 'কর্ডাটা পর্ব ও শ্রেণি'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 2, chapterId: 'bio2_ch2', chapterName: 'প্রাণীর পরিচিতি', topics: ['হাইড্রা (Hydra)', 'ঘাসফড়িং (Grasshopper)', 'রুই মাছ (Labeo rohita)'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 3, chapterId: 'bio2_ch3', chapterName: 'মানব শারীরতত্ত্ব: পরিপাক ও শোষণ', topics: ['পরিপাক নালী ও গ্রন্থি', 'খাদ্য পরিপাক ক্রিয়া', 'শোষণ ও যকৃতের সঞ্চয়ী ভূমিকা'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 4, chapterId: 'bio2_ch4', chapterName: 'মানব শারীরতত্ত্ব: রক্ত ও সংবহন', topics: ['রক্তের উপাদান ও কাজ', 'হৃদপিণ্ডের গঠন ও রক্ত সংবহন', 'কার্ডিয়াক চক্র ও রক্তচাপ', 'হৃদরোগ ও প্রতিকার'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 5, chapterId: 'bio2_ch5', chapterName: 'মানব শারীরতত্ত্ব: শ্বসন ও শ্বাসক্রিয়া', topics: ['শ্বসনতন্ত্রের গঠন', 'গ্যাসীয় পরিবহন (O2, CO2)', 'শ্বসন সমস্যা ও ধূমপানের প্রভাব'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 6, chapterId: 'bio2_ch6', chapterName: 'মানব শারীরতত্ত্ব: বর্জ্য ও নিষ্কাশন', topics: ['বৃক্কের গঠন ও নেফ্রন', 'মূত্র উৎপাদন ও রেচন', 'অসমোরেগুলেশন ও ডায়ালাইসিস'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 7, chapterId: 'bio2_ch7', chapterName: 'মানব শারীরতত্ত্ব: চলন ও অঙ্গচালনা', topics: ['কঙ্কালতন্ত্রের শ্রেণিবিভাগ', 'অস্থিসন্ধি ও পেশি', 'হাড়ের আঘাত ও প্রাথমিক চিকিৎসা'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 8, chapterId: 'bio2_ch8', chapterName: 'মানব শারীরতত্ত্ব: সমন্বয় ও নিয়ন্ত্রণ', topics: ['মস্তিষ্ক ও সুষুম্নাকাণ্ড', 'সংবেদী অঙ্গ (চোখ ও কান)', 'অন্তঃক্ষরা গ্রন্থি ও হরমোন'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 9, chapterId: 'bio2_ch9', chapterName: 'মানব জীবনের ধারাবাহিকতা', topics: ['প্রজননতন্ত্র ও গ্যামেটোজেনেসিস', 'ভ্রূণীয় বিকাশ ও অমরা', 'যৌনরোগ ও পরিবার পরিকল্পনা'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 10, chapterId: 'bio2_ch10', chapterName: 'মানবদেহের প্রতিরক্ষা', topics: ['১ম, ২য় ও ৩য় প্রতিরক্ষা স্তর', 'অ্যান্টিবডি ও এর গঠন', 'টিকা ও ভ্যাকসিনেশন'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 11, chapterId: 'bio2_ch11', chapterName: 'জিনতত্ত্ব ও বিবর্তন', topics: ['মেন্ডেলের সূত্রসমূহ ও ব্যতিক্রম', 'সেক্স লিঙ্কড ডিসঅর্ডার', 'রক্তের গ্রুপ ও Rh ফ্যাক্টর', 'বিবর্তন ও ডারউইনবাদ'] },
  { subjectId: 'bio2', paper: 'second', chapterNumber: 12, chapterId: 'bio2_ch12', chapterName: 'প্রাণীর আচরণ', topics: ['সহজাত ও অর্জিত আচরণ', 'ট্যাক্সিস ও প্রতিবর্তী ক্রিয়া', 'প্যারেন্টাল কেয়ার'] }
];

// Master Academic Subjects Configuration
export const ACADEMIC_SYLLABUS_CONFIG: AcademicSubjectConfig[] = [
  {
    id: 'ict',
    name: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    nameEn: 'ICT',
    paper: 'not_applicable',
    icon: 'Laptop',
    color: 'from-blue-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: ICT_CHAPTERS
  },
  {
    id: 'bangla_first',
    name: 'বাংলা ১ম পত্র',
    nameEn: 'Bangla 1st Paper',
    paper: 'first',
    icon: 'BookOpen',
    color: 'from-amber-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: true,
    sections: BANGLA_FIRST_SECTIONS,
    chapters: BANGLA_FIRST_CHAPTERS
  },
  {
    id: 'phys1',
    name: 'পদার্থবিজ্ঞান ১ম পত্র',
    nameEn: 'Physics 1st Paper',
    paper: 'first',
    icon: 'Atom',
    color: 'from-sky-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: PHYSICS_FIRST_CHAPTERS
  },
  {
    id: 'phys2',
    name: 'পদার্থবিজ্ঞান ২য় পত্র',
    nameEn: 'Physics 2nd Paper',
    paper: 'second',
    icon: 'Zap',
    color: 'from-cyan-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: PHYSICS_SECOND_CHAPTERS
  },
  {
    id: 'chem1',
    name: 'রসায়ন ১ম পত্র',
    nameEn: 'Chemistry 1st Paper',
    paper: 'first',
    icon: 'FlaskConical',
    color: 'from-purple-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: CHEMISTRY_FIRST_CHAPTERS
  },
  {
    id: 'chem2',
    name: 'রসায়ন ২য় পত্র',
    nameEn: 'Chemistry 2nd Paper',
    paper: 'second',
    icon: 'Beaker',
    color: 'from-fuchsia-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: CHEMISTRY_SECOND_CHAPTERS
  },
  {
    id: 'math1',
    name: 'উচ্চতর গণিত ১ম পত্র',
    nameEn: 'Higher Math 1st Paper',
    paper: 'first',
    icon: 'Ruler',
    color: 'from-indigo-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: HIGHER_MATH_FIRST_CHAPTERS
  },
  {
    id: 'math2',
    name: 'উচ্চতর গণিত ২য় পত্র',
    nameEn: 'Higher Math 2nd Paper',
    paper: 'second',
    icon: 'Calculator',
    color: 'from-blue-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: HIGHER_MATH_SECOND_CHAPTERS
  },
  {
    id: 'bio1',
    name: 'জীববিজ্ঞান ১ম পত্র',
    nameEn: 'Biology 1st Paper',
    paper: 'first',
    icon: 'Dna',
    color: 'from-teal-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: BIOLOGY_FIRST_CHAPTERS
  },
  {
    id: 'bio2',
    name: 'জীববিজ্ঞান ২য় পত্র',
    nameEn: 'Biology 2nd Paper',
    paper: 'second',
    icon: 'Microscope',
    color: 'from-emerald-900/50 to-slate-800',
    category: 'একাডেমিক প্রস্তুতি',
    hasSections: false,
    chapters: BIOLOGY_SECOND_CHAPTERS
  }
];

// Helper Functions
export function getAcademicSubjects(): AcademicSubjectConfig[] {
  return ACADEMIC_SYLLABUS_CONFIG;
}

export function getAcademicSubjectById(subjectId: string): AcademicSubjectConfig | undefined {
  return ACADEMIC_SYLLABUS_CONFIG.find(
    s => s.id === subjectId || (subjectId === 'ict' && s.id === 'ict') || (subjectId === 'bangla' && s.id === 'bangla_first')
  );
}

export function getAcademicSections(subjectId: string): AcademicSectionConfig[] {
  const subject = getAcademicSubjectById(subjectId);
  return subject?.sections || [];
}

export function getAcademicChapters(subjectId: string, sectionId?: string): AcademicChapterConfig[] {
  const subject = getAcademicSubjectById(subjectId);
  if (!subject) return [];
  if (sectionId) {
    return subject.chapters.filter(ch => ch.sectionId === sectionId);
  }
  return subject.chapters;
}

export function findAcademicChapter(
  subjectId: string,
  chapterIdOrIndex: string | number
): AcademicChapterConfig | undefined {
  const subject = getAcademicSubjectById(subjectId);
  if (!subject) return undefined;
  if (typeof chapterIdOrIndex === 'number') {
    return subject.chapters[chapterIdOrIndex];
  }
  return subject.chapters.find(
    ch => ch.chapterId === chapterIdOrIndex || ch.chapterName === chapterIdOrIndex
  );
}

/**
 * Format chapter index or chapter number into 2-digit Bangla or English representation
 */
export function formatContinuousChapterNumber(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
