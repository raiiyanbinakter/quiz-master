import { Question } from '../types';

export const ictChap3QuestionsPart3: Question[] = [
  // Type 06 : লজিক গেইট
  {
    id: 91,
    topic: "৬. লজিক গেইট",
    question_text: "৯১. মৌলিক লজিক গেট কয়টি? [কু. বো. ২৩; মা. বো. ১৯]",
    options: ["2", "3", "4", "5"],
    correct_answer: "3",
    explanation: "মৌলিক লজিক গেট ৩টি: ১. OR (যৌক্তিক যোগ), ২. AND (যৌক্তিক গুণ), ৩. NOT (যৌক্তিক পূরক)।",
    time_limit: 30
  },
  {
    id: 92,
    topic: "৬. লজিক গেইট",
    question_text: "৯২. নিচের কোনটি মৌলিক gate? [য. বো. ১৯]",
    options: ["NOT", "NOR", "NAND", "X-NOR"],
    correct_answer: "NOT",
    explanation: "NOT গেট একটি মৌলিক লজিক গেট। NOR ও NAND সার্বজনীন গেট এবং X-NOR বিশেষ গেট।",
    time_limit: 30
  },
  {
    id: 93,
    topic: "৬. লজিক গেইট",
    question_text: "৯৩. কোন লজিক গেইটের ইনপুট ও আউটপুট লাইন সমান থাকে? [ঢা. বো. ১৭; য. বো. ১৭]",
    options: ["AND", "OR", "NOT", "NAND"],
    correct_answer: "NOT",
    explanation: "NOT গেইটে একটিমাত্র ইনপুট এবং একটিমাত্র আউটপুট লাইন থাকে।",
    time_limit: 30
  },
  {
    id: 94,
    topic: "৬. লজিক গেইট",
    question_text: "৯৪. Inverter হিসেবে কাজ করে কোন লজিক গেট? [য. বো. ২৩]",
    options: ["AND", "OR", "NOT", "X-OR"],
    correct_answer: "NOT",
    explanation: "NOT গেটের আউটপুট ইনপুটের বিপরীত (0 হলে 1, 1 হলে 0) বলে একে ইনভার্টার (Inverter) বলা হয়।",
    time_limit: 30
  },
  {
    id: 95,
    topic: "৬. লজিক গেইট",
    question_text: "৯৫. নিচের কোন লজিক গেইটের আউটপুট ইনপুটের বিপরীত? [চ. বো. ১৬]",
    options: ["AND", "OR", "NOT", "X-OR"],
    correct_answer: "NOT",
    explanation: "NOT গেইটের আউটপুট সর্বদা ইনপুটের উল্টো বা বিপরীত মান প্রদান করে।",
    time_limit: 30
  },
  {
    id: 96,
    topic: "৬. লজিক গেইট",
    question_text: "৯৬. বুলিয়ান অ্যালজেবরার যোগের কাজ সম্পাদনের জন্য ব্যবহৃত গেইট কোনটি? [কু. বো. ২৪]",
    options: ["AND", "OR", "SUM", "NAND"],
    correct_answer: "OR",
    explanation: "OR গেইট বুলিয়ান যৌক্তিক যোগ (Logical Addition) সম্পাদনে ব্যবহৃত হয়।",
    time_limit: 30
  },
  {
    id: 97,
    topic: "৬. লজিক গেইট",
    question_text: "৯৭. যদি তিন ইনপুট OR গেইটের আউটপুট 0 (শূন্য) করা প্রয়োজন হয় তাহলে কোনটি প্রয়োগ করতে হবে? [সি. বো. ১৭]",
    options: ["সকল ইনপুট 0 (শূন্য) করতে হবে", "সকল ইনপুট 1 করতে হবে", "যেকোনো একটি ইনপুট 0 (শূন্য) করতে হবে", "যেকোনো একটি ইনপুট 1 করতে হবে"],
    correct_answer: "সকল ইনপুট 0 (শূন্য) করতে হবে",
    explanation: "OR গেইটের যে কোনো একটি ইনপুট 1 হলেই আউটপুট 1 হয়। শুধুমাত্র সকল ইনপুট 0 হলেই আউটপুট 0 হয়।",
    time_limit: 30
  },
  {
    id: 98,
    topic: "৬. লজিক গেইট",
    question_text: "৯৮. বাইনারি যোগকে বুলিয়ান যোগের সাথে সমন্বয় করার জন্য কোন গেইট ব্যবহার করা হয়? [চ. বো. ২৫]",
    options: ["XNOR", "OR", "NOR", "XOR"],
    correct_answer: "XOR",
    explanation: "XOR গেইট বাইনারি যোগের সাম (Sum) বিট তৈরি করতে ব্যবহৃত হয় (যেমন 1 ⊕ 1 = 0)।",
    time_limit: 30
  },
  {
    id: 99,
    topic: "৬. লজিক গেইট",
    question_text: "৯৯. সত্যক সারণিতে ইনপুটদ্বয় অসমান (0,1 বা 1,0) হলে আউটপুট 1 এবং সমান (0,0 বা 1,1) হলে আউটপুট 0 হয়- এটি কোন গেইট? [য. বো. ২৩]",
    options: ["OR", "AND", "NOT", "XOR"],
    correct_answer: "XOR",
    explanation: "XOR গেইটের বৈশিষ্ট্য হলো বিজোড় সংখ্যক 1 বা ইনপুট দুটি ভিন্ন হলে আউটপুট 1 হয়।",
    time_limit: 30
  },
  {
    id: 100,
    topic: "৬. লজিক গেইট",
    question_text: "১০০. দুই ইনপুটের কোন গেইটে ইনপুট দুটি ভিন্ন হলে আউটপুট 1 হয়? [য. বো. ২৫]",
    options: ["AND", "NOR", "XOR", "XNOR"],
    correct_answer: "XOR",
    explanation: "XOR গেইটে ইনপুটদ্বয় অসমান (0, 1 বা 1, 0) হলে আউটপুট 1 হয়।",
    time_limit: 30
  },
  {
    id: 101,
    topic: "৬. লজিক গেইট",
    question_text: "১০১. দুটি সুইচ শ্রেণিতে (Series) যুক্ত থাকলে কোন লজিক গেট নির্দেশ করে? [য. বো. ১৭]",
    options: ["AND", "OR", "NOT", "NOR"],
    correct_answer: "AND",
    explanation: "সুইচগুলো সিরিজে বা শ্রেণিতে থাকলে AND গেট তৈরি হয়, কারণ উভয় সুইচ অন না থাকলে বাতি জ্বলবে না।",
    time_limit: 30
  },
  {
    id: 102,
    topic: "৬. লজিক গেইট",
    question_text: "১০২. AND গেটের আউটপুটের সাথে NOT Gate যুক্ত করলে কোন গেট পাওয়া যাবে? [য. বো. ১৭]",
    options: ["AND", "NAND", "X-OR", "X-NOR"],
    correct_answer: "NAND",
    explanation: "AND + NOT = NAND গেট।",
    time_limit: 30
  },
  {
    id: 103,
    topic: "৬. লজিক গেইট",
    question_text: "১০৩. দুটি সুইচ সমান্তরালে (Parallel) যুক্ত থাকলে কখন বাতির আলো জ্বলবে না? [রা. বো. ২৫]",
    options: ["A=0, B=0", "A=0, B=1", "A=1, B=0", "A=1, B=1"],
    correct_answer: "A=0, B=0",
    explanation: "সমান্তরাল সুইচ বর্তনী OR গেইট নির্দেশ করে। উভয় সুইচ বন্ধ (A=0, B=0) থাকলে বাতি জ্বলবে না।",
    time_limit: 30
  },
  {
    id: 104,
    topic: "৬. লজিক গেইট",
    question_text: "১০৪. NOR এর আউটপুট 0 (শূন্য) হবে যখন- [ঢা. বো. ১৯; দি. বো. ১৭]\ni. সবগুলো ইনপুট 1\nii. সবগুলো ইনপুট 0\niii. যে কোনো একটি ইনপুট 1\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও iii",
    explanation: "NOR গেইটে যেকোনো ইনপুট 1 হলে বা সবগুলো 1 হলে আউটপুট 0 হয়। কেবল সবগুলো ইনপুট 0 হলে আউটপুট 1 হয়।",
    time_limit: 30
  },
  {
    id: 105,
    topic: "৬. লজিক গেইট",
    question_text: "১০৫. উভয় ইনপুট 1 হলে আউটপুট 0 হয় কোন গেইটে? [য. বো. ১৯]\ni. NAND\nii. NOR\niii. XNOR\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও iii",
    explanation: "NAND গেইটে 1.1=0 এবং NOR গেইটে 1+1=0। কিন্তু XNOR গেইটে উভয় ইনপুট 1 হলে আউটপুট 1 হয়।",
    time_limit: 30
  },
  {
    id: 106,
    topic: "৬. লজিক গেইট",
    question_text: "১০৬. কোনো গেইটের সকল ইনপুট 0 হলে আউটপুট 1 হবে? [সম্মিলিত বোর্ড- ১৮]\ni. NAND\nii. NOR\niii. XNOR\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i, ii ও iii",
    explanation: "NAND, NOR এবং XNOR তিনটিতেই সকল ইনপুট 0 হলে আউটপুট 1 হয়।",
    time_limit: 30
  },
  {
    id: 107,
    topic: "৬. লজিক গেইট",
    question_text: "১০৭. কোন গেইটে সকল ইনপুট 1 হলে আউটপুট 0 হয় অন্যথায় আউটপুট 1 হয়? [কু. বো. ২৫]",
    options: ["NAND", "NOR", "XNOR", "AND"],
    correct_answer: "NAND",
    explanation: "NAND গেটের আউটপুট AND গেটের বিপরীত। সব ইনপুট 1 হলে আউটপুট 0, অন্যথায় 1।",
    time_limit: 30
  },
  {
    id: 108,
    topic: "৬. লজিক গেইট",
    question_text: "১০৮. OR গেটের মুখে একটি বাবল (NOT) যুক্ত করলে কোন সার্বজনীন গেট পাওয়া যায়? [দি. বো. ২৩]",
    options: ["AND", "OR", "NOR", "NAND"],
    correct_answer: "NOR",
    explanation: "OR গেটের সাথে NOT গেট যুক্ত করে NOR গেট তৈরি হয়।",
    time_limit: 30
  },
  {
    id: 109,
    topic: "৬. লজিক গেইট",
    question_text: "১০৯. NAND এর ক্ষেত্রে কখন আলো জ্বলবে (আউটপুট 1 হবে)? [দি. বো. ২৩]\ni. A=0, B=0\nii. A=1, B=0\niii. A=1, B=1\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও ii",
    explanation: "NAND গেইটে (0.0)\u0305 = 1, (1.0)\u0305 = 1; কিন্তু (1.1)\u0305 = 0।",
    time_limit: 30
  },
  {
    id: 110,
    topic: "৬. লজিক গেইট",
    question_text: "১১০. যে সত্যক সারণিতে সকল ইনপুট 1 হলে আউটপুট 0 এবং অন্যথায় 1 হয় তা কোন গেট নির্দেশ করে? [য. বো. ২৩]",
    options: ["NOR", "NAND", "XOR", "XNOR"],
    correct_answer: "NAND",
    explanation: "এটি NAND গেটের ট্রুথ টেবিল।",
    time_limit: 30
  },
  {
    id: 111,
    topic: "৬. লজিক গেইট",
    question_text: "১১১. NAND গেইটের আউটপুটকে NOT গেইটের মধ্যে দিয়ে প্রবেশ করালে কোন গেইট পাওয়া যায়? [কু. বো. ২৪]",
    options: ["AND", "OR", "X-OR", "X-NOR"],
    correct_answer: "AND",
    explanation: "(AB)\u0305 এর উপর পুনরায় NOT দিলে ((AB)\u0305)\u0305 = AB অর্থাৎ AND গেইট পাওয়া যায়।",
    time_limit: 30
  },
  {
    id: 112,
    topic: "৬. লজিক গেইট",
    question_text: "১১২. NOR গেইটের আউটপুটকে NOT গেইটের মধ্য দিয়ে প্রবেশ করালে কোন গেইট পাওয়া যায়?",
    options: ["OR", "X-NOR", "X-OR", "AND"],
    correct_answer: "OR",
    explanation: "((A+B)\u0305)\u0305 = A + B অর্থাৎ OR গেইট তৈরি হয়।",
    time_limit: 30
  },
  {
    id: 113,
    topic: "৬. লজিক গেইট",
    question_text: "১১৩. ডিজিটাল ইলেকট্রনিক্সে যে কোনো সার্কিট বাস্তবায়ন করা যায় কোন গেইট দিয়ে? [চ. বো. ২৪]",
    options: ["XNOR", "OR", "NOR", "XOR"],
    correct_answer: "NOR",
    explanation: "NOR এবং NAND সার্বজনীন (Universal) গেইট হওয়ায় এদের যেকোনো একটি দিয়ে সব লজিক সার্কিট তৈরি করা সম্ভব।",
    time_limit: 30
  },
  {
    id: 114,
    topic: "৬. লজিক গেইট",
    question_text: "১১৪. সার্বজনীন গেইট হচ্ছে- [রা. বো. ২৪; অনুরূপ: য. বো. ১৭; রা. বো. ১৬; মা. বো. ১৬]\ni. NAND\nii. NOR\niii. AND\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও ii",
    explanation: "NAND ও NOR হলো দুটি সার্বজনীন গেট।",
    time_limit: 30
  },
  {
    id: 115,
    topic: "৬. লজিক গেইট",
    question_text: "১১৫. সার্বজনীন গেট তৈরিতে ব্যবহৃত হয়- [রা. বো. ২৩; অনুরূপ: চ. বো. ১৬]\ni. AND\nii. OR\niii. NOT\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i, ii ও iii",
    explanation: "সার্বজনীন গেট তৈরিতে মৌলিক ৩টি গেটই (AND, OR, NOT) ব্যবহৃত হয়।",
    time_limit: 30
  },
  {
    id: 116,
    topic: "৬. লজিক গেইট",
    question_text: "১১৬. NAND গেটের প্রতীকী রূপ কোনটি? [কু. বো. ১৭]",
    options: ["AND গেটের মুখে বাবল যুক্ত প্রতীক", "OR গেটের মুখে বাবল যুক্ত প্রতীক", "NOT গেটের প্রতীক", "XOR গেটের প্রতীক"],
    correct_answer: "AND গেটের মুখে বাবল যুক্ত প্রতীক",
    explanation: "AND গেটের আউটপুটে ছোট শূন্য বা বাবল যুক্ত করে NAND গেটের প্রতীক আঁকা হয়।",
    time_limit: 30
  },
  {
    id: 117,
    topic: "৬. লজিক গেইট",
    question_text: "১১৭. সত্যক সারণিতে ইনপুট (0,0) তে 1 এবং বাকি সব ক্ষেত্রে 0 হলে লজিক গেইট কোনটি?",
    options: ["AND", "OR", "NOR", "NAND"],
    correct_answer: "NOR",
    explanation: "NOR গেইটে শুধুমাত্র (0,0) ইনপুটের জন্য আউটপুট 1 হয়, বাকি সব ক্ষেত্রে 0।",
    time_limit: 30
  },
  {
    id: 118,
    topic: "৬. লজিক গেইট",
    question_text: "১১৮. NOR গেটের আউটপুট কলামে '0' স্থলে '1' এবং '1' এর স্থলে '0' বসালে প্রাপ্ত গেইটটি হবে-",
    options: ["AND", "NAND", "XOR", "OR"],
    correct_answer: "OR",
    explanation: "NOR এর আউটপুটকে উল্টে দিলে OR গেইটের আউটপুট পাওয়া যায়।",
    time_limit: 30
  },
  {
    id: 119,
    topic: "৬. লজিক গেইট",
    question_text: "১১৯. Q = M̄ + MN + MN̄ বর্তনীটির Q-এর সরলীকৃত মান কত? [রা. বো. ১৭]",
    options: ["0", "1", "M", "M+N"],
    correct_answer: "1",
    explanation: "Q = M̄ + M(N + N̄) = M̄ + M(1) = M̄ + M = 1।",
    time_limit: 45
  },
  {
    id: 120,
    topic: "৬. লজিক গেইট",
    question_text: "১২০. A ইনপুটটি NOT গেট হয়ে AND গেটে B এর সাথে যুক্ত হলে আউটপুট X হবে- [কু. বো. ২৩, ১৬; অনুরূপ: ঢা. বো. ২৩; দি. বো. ১৫]",
    options: ["AB", "ĀB", "AB̄", "(AB)\u0305"],
    correct_answer: "(AB)\u0305",
    explanation: "NOT(A) ও B কে AND করলে ĀB হয়।",
    time_limit: 30
  },
  {
    id: 121,
    topic: "৬. লজিক গেইট",
    question_text: "১২১. F = (Ā + B̄ + C̄)\u0305 এর সরলীকৃত মান কোনটি? [চ. বো. ১৬; অনুরূপ: ঢা. বো. ২৩; য. বো. ১৬]",
    options: ["A+B+C", "Ā + B̄ + C̄", "ABC", "(A + B + C)\u0305"],
    correct_answer: "ABC",
    explanation: "ডি-মরগ্যানের উপপাদ্য অনুযায়ী: (Ā + B̄ + C̄)\u0305 = (Ā)\u0305 . (B̄)\u0305 . (C̄)\u0305 = A.B.C।",
    time_limit: 45
  },
  {
    id: 122,
    topic: "৬. লজিক গেইট",
    question_text: "১২২. F = ABC সমীকরণটি নিচের কোন মৌলিক গেইটকে সমর্থন করে? [চ. বো. ১৬]",
    options: ["OR", "AND", "NOT", "NOR"],
    correct_answer: "OR",
    explanation: "লজিক্যাল গুণ নির্দেশ করায় এটি AND গেইটের সমতুল্য।",
    time_limit: 30
  },
  {
    id: 123,
    topic: "৬. লজিক গেইট",
    question_text: "১২৩. F = (X̄ + Ȳ)\u0305 এর সরলীকৃত মান কোনটি? [য. বো. ২৫; অনুরূপ: মা. বো. ১৬]",
    options: ["X+Y", "XY", "X̄ + Ȳ", "X.Y"],
    correct_answer: "XY",
    explanation: "ডি-মরগ্যান সূত্র: (X̄ + Ȳ)\u0305 = X̄̄ . Ȳ̄ = XY।",
    time_limit: 30
  },
  {
    id: 124,
    topic: "৬. লজিক গেইট",
    question_text: "১২৪. F = XY এর সরলীকৃত মানকে প্রতিস্থাপন করা যাবে- [দি. বো. ২৫]\ni. NAND Gate দিয়ে\nii. NOR Gate দিয়ে\niii. AND Gate দিয়ে\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i, ii ও iii",
    explanation: "যে কোনো লজিক সমীকরণ NAND, NOR এবং মৌলিক গেট দিয়ে বাস্তবায়ন করা যায়।",
    time_limit: 30
  },
  {
    id: 125,
    topic: "৬. লজিক গেইট",
    question_text: "১২৫. P = ((Ā.B̄) + (A+C))\u0305 এর সরলীকৃত মান কোনটি? [দি. বো. ২৫; অনুরূপ: ঢা. বো. ২৪, ২৩, ১৯; য. বো. ২৩; চ. বো. ২৩]",
    options: ["ABC", "A+B+C", "ĀB̄C̄", "(A+B+C)\u0305"],
    correct_answer: "ABC",
    explanation: "ডিমরগ্যান সূত্রের প্রয়োগে সরলীকরণ করলে ABC পাওয়া যায়।",
    time_limit: 45
  },
  {
    id: 126,
    topic: "৬. লজিক গেইট",
    question_text: "১২৬. P = ABC হলে P=1 হবে, যখন- [সি. বো. ২৫; অনুরূপ: দি. বো. ২৭; ঢা. বো. ২৪, ২৩, ১৯; য. বো. ২৩]",
    options: ["A=0, B=1, C=0", "A=1, B=0, C=1", "A=1, B=1, C=1", "A=0, B=1, C=0"],
    correct_answer: "A=0, B=1, C=0",
    explanation: "বুলিয়ান গুণের ক্ষেত্রে সব ইনপুট 1 হলে গুণফল 1 হয়।",
    time_limit: 30
  },
  {
    id: 127,
    topic: "৬. লজিক গেইট",
    question_text: "১২৭. XOR গেইটের আউটপুট Y এর সমীকরণ কোনটি? [ঢা. বো. ২৫]",
    options: ["ĀB̄ + AB", "ĀB + AB̄", "A.B", "A+B"],
    correct_answer: "ĀB + AB̄",
    explanation: "XOR গেইটের সমীকরণ Y = A ⊕ B = ĀB + AB̄।",
    time_limit: 30
  },
  {
    id: 128,
    topic: "৬. লজিক গেইট",
    question_text: "১২৮. XOR গেইটে Y এর মান 0 হয়, যখন- [ঢা. বো. ২৫; অনুরূপ: ব. বো. ২৩]\ni. A=1, B=0\nii. A=0, B=1\niii. A=1, B=1\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও ii",
    explanation: "XOR গেইটে ইনপুটদ্বয় একই হলে (0,0 বা 1,1) আউটপুট 0 হয়।",
    time_limit: 30
  },
  {
    id: 129,
    topic: "৬. লজিক গেইট",
    question_text: "১২৯. P = ĀB̄ + AB সরলীকরণ মানের সমতুল্য গেইট কোনটি? [ব. বো. ২৪]",
    options: ["NAND", "NOR", "XOR", "XNOR"],
    correct_answer: "XNOR",
    explanation: "ĀB̄ + AB হলো XNOR (Exclusive-NOR) গেইটের সমীকরণ।",
    time_limit: 30
  },
  {
    id: 130,
    topic: "৬. লজিক গেইট",
    question_text: "১৩০. XNOR গেইটের আউটপুট Y এর মান হতে পারে- [রা. বো. ২৩]\ni. P ⊕ Q\nii. PQ + P̄Q̄\niii. (P ⊕ Q)\u0305\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "ii ও iii",
    explanation: "XNOR সমীকরণ: Y = (P ⊕ Q)\u0305 = PQ + P̄Q̄।",
    time_limit: 30
  },
  {
    id: 131,
    topic: "৬. লজিক গেইট",
    question_text: "১৩১. বর্তনীর আউটপুট Y = 0 হবে, যখন- [রা. বো. ২৩]",
    options: ["1 ও 2 নং gate এর পরিবর্তে NOR Gate", "3 নং gate এর পরিবর্তে NAND Gate", "4 নং gate এর পরিবর্তে AND Gate", "5 নং gate এর পরিবর্তে NAND Gate ব্যবহার করা হবে"],
    correct_answer: "3 নং gate এর পরিবর্তে NAND Gate",
    explanation: "গেট পরিবর্তনের মাধ্যমে লজিক আউটপুট 0 নির্ধারিত হয়।",
    time_limit: 45
  },
  {
    id: 132,
    topic: "৬. লজিক গেইট",
    question_text: "১৩২. F = ((X̄Ȳ) + (X̄Ȳ))\u0305 হলে F এর মান কোনটি? [রা. বো. ২৫]",
    options: ["XY", "X.Y", "X̄Ȳ", "XȲ"],
    correct_answer: "XY",
    explanation: "বুলিয়ান উপপাদ্য প্রয়োগে সরলীকরণ করলে মান XY পাওয়া যায়।",
    time_limit: 45
  },
  {
    id: 133,
    topic: "৬. লজিক গেইট",
    question_text: "১৩৩. চিত্রে ২ নং গেইটের পরিবর্তে কোন গেইট স্থাপন করলে F = 0 হয়? [রা. বো. ২৫; অনুরূপ: ঢা. বো. ১৬]",
    options: ["OR", "AND", "NOR", "NAND"],
    correct_answer: "AND",
    explanation: "AND গেইট বসালে F = X . (X+Y)\u0305 = X . X̄Ȳ = 0Ȳ = 0 হয়।",
    time_limit: 45
  },
  {
    id: 134,
    topic: "৬. লজিক গেইট",
    question_text: "১৩৪. F = (A ⊕ A)\u0305 + B এর সরলীকৃত মান হবে- [য. বো. ২৩]",
    options: ["A+B", "Ā+B", "A+B̄", "(A+B)\u0305"],
    correct_answer: "A+B",
    explanation: "A ⊕ A = 0, ফলে (0)\u0305 = 1 অথবা সমীকরণ অনুযায়ী সরলীকরণ A+B নির্দেশ করে।",
    time_limit: 45
  },
  {
    id: 135,
    topic: "৬. লজিক গেইট",
    question_text: "১৩৫. XOR গেইটের স্থলে কোন গেইট বসালে আউটপুট 1 হবে? [ম. বো. ২৫]",
    options: ["AND", "OR", "NAND", "NOR"],
    correct_answer: "NAND",
    explanation: "NAND গেইট প্রয়োগ করলে আউটপুট 1 পাওয়া যায়।",
    time_limit: 30
  },
  {
    id: 136,
    topic: "৬. লজিক গেইট",
    question_text: "১৩৬. F = ((ĀB̄) + (AB)\u0305)\u0305 এর সরলীকৃত মান হচ্ছে- [ব. বো. ২৪]",
    options: ["AB", "ĀB", "AB̄", "(AB)\u0305"],
    correct_answer: "(AB)\u0305",
    explanation: "ডিমরগ্যান সূত্রের সাহায্যে সরলীকৃত রূপ (AB)\u0305 বা AB̄ নির্ধারিত হয়।",
    time_limit: 45
  },
  {
    id: 137,
    topic: "৬. লজিক গেইট",
    question_text: "১৩৭. 'F' এর মান '0' পেতে হলে 'P' এর স্থলে কোন গেইট হবে? [ব. বো. ২৪]",
    options: ["AND", "OR", "NAND", "NOR"],
    correct_answer: "NOR",
    explanation: "NOR গেইট বসালে কমপ্লিমেন্ট আউটপুট 0 নিশ্চিত হয়।",
    time_limit: 30
  },
  {
    id: 138,
    topic: "৬. লজিক গেইট",
    question_text: "১৩৮. Y = (A+B)\u0305 + AB এর সরলীকৃত মান কোনটি? [য. বো. ২৫]",
    options: ["A ⊕ B", "A ⊙ B", "A+B", "AB"],
    correct_answer: "A ⊕ B",
    explanation: "(A+B)\u0305 + AB = ĀB̄ + AB = A ⊙ B (XNOR)।",
    time_limit: 45
  },
  {
    id: 139,
    topic: "৬. লজিক গেইট",
    question_text: "১৩৯. 'Y' এর মান '1' পেতে K এর স্থলে কোন গেইট হবে? [য. বো. ২৫]",
    options: ["NOR", "NAND", "X-OR", "X-NOR"],
    correct_answer: "X-NOR",
    explanation: "K এর স্থলে NAND বা X-NOR সংযুক্ত করলে আউটপুট 1 পাওয়া যায়।",
    time_limit: 30
  },
  {
    id: 140,
    topic: "৬. লজিক গেইট",
    question_text: "১৪০. XOR গেইট বাস্তবায়নে প্রাপ্ত সমীকরণ নিচের কোনটি? [রা. বো. ১৮; কু. বো. ১৯]",
    options: ["ĀB + AB̄", "A ⊙ B", "A ⊕ B", "ĀB̄ + (AB)\u0305"],
    correct_answer: "ĀB + AB̄",
    explanation: "A ⊕ B = ĀB + AB̄। এটি ৫টি মৌলিক গেইট (২টি NOT, ২টি AND, ১টি OR) দিয়ে তৈরি করা যায়।",
    time_limit: 30
  },
  {
    id: 141,
    topic: "৬. লজিক গেইট",
    question_text: "১৪১. F = (A + B̄)\u0305 + (A + B)\u0305 আউটপুটের সরলীকরণ মান কোন গেইটের সাথে সাদৃশ্যপূর্ণ? [য. বো. ১৯]",
    options: ["NAND", "NOR", "XOR", "XNOR"],
    correct_answer: "XOR",
    explanation: "সরলীকরণ করে পাই ĀB + AB̄ = A ⊕ B যা XOR গেইট নির্দেশ করে।",
    time_limit: 45
  },
  {
    id: 142,
    topic: "৬. লজিক গেইট",
    question_text: "১৪২. X = P ⊕ Q ⊕ R এর মান 1 হবে যখন- [কু. বো. ১৯]\ni. P=1, Q=1, R=0\nii. P=0, Q=1, R=1\niii. P=1, Q=1, R=1\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও iii",
    explanation: "XOR গেইটে বিজোড় সংখ্যক 1 থাকলে আউটপুট 1 হয়। (1,1,1) এ ৩টি 1 আছে, তাই আউটপুট 1।",
    time_limit: 45
  },
  {
    id: 143,
    topic: "৬. লজিক গেইট",
    question_text: "১৪৩. ৩ ইনপুট বিজোড় 1 সম্বলিত ট্রুথ টেবিলের সমীকরণ কোনটি? [অনুরূপ: চ. বো. ২৪]",
    options: ["PQ̄R + PQ̄R + PQ̄R", "PQ̄R + P̄QR + PQ̄R + PQR", "P ⊕ Q ⊕ R", "P ⊙ Q ⊙ R"],
    correct_answer: "P ⊕ Q ⊕ R",
    explanation: "৩ ইনপুট XOR গেইটের সমীকরণ P ⊕ Q ⊕ R।",
    time_limit: 30
  },
  {
    id: 144,
    topic: "৬. লজিক গেইট",
    question_text: "১৪৪. যে সত্যক সারণিতে ইনপুট (0,1) ও (1,0) তে আউটপুট 1 হয় তা কোন গেইট? [সি. বো. ২৩]",
    options: ["OR", "NOR", "X-OR", "X-NOR"],
    correct_answer: "X-OR",
    explanation: "ইনপুট অসমান হলে আউটপুট 1 হওয়া XOR (Exclusive-OR) গেইটের বৈশিষ্ট্য।",
    time_limit: 30
  },
  {
    id: 145,
    topic: "৬. লজিক গেইট",
    question_text: "১৪৫. XNOR সত্যক সারণি থেকে প্রাপ্ত সমীকরণ হল- [সি. বো. ২৫]\ni. X = AB̄ + ĀB\nii. X = AB + Ā.B̄\niii. X = (AB)\u0305 + (AB)\u0305\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "ii ও iii",
    explanation: "XNOR এর সঠিক সমীকরণ X = AB + ĀB̄।",
    time_limit: 30
  },
  {
    id: 146,
    topic: "৬. লজিক গেইট",
    question_text: "১৪৬. F = ĀB̄ + AB সমীকরণটির সমতুল্য লজিক গেইট কোনটি? [রা. বো. ১৯]",
    options: ["OR", "XOR", "NAND", "XNOR"],
    correct_answer: "XNOR",
    explanation: "ĀB̄ + AB = A ⊙ B যা XNOR গেট নির্দেশ করে।",
    time_limit: 30
  },
  {
    id: 147,
    topic: "৬. লজিক গেইট",
    question_text: "১৪৭. XOR লজিক গেইট ব্যবহৃত হতে পারে- [রা. বো. ১৯]\ni. দুটি বিটের অবস্থা তুলনা করার জন্য\nii. হাফ অ্যাডার তৈরির ক্ষেত্রে\niii. কাউন্টার তৈরির ক্ষেত্রে\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও ii",
    explanation: "XOR গেইট দুটি বিটের সমতা তুলনা (Comparator) এবং হাফ অ্যাডারের Sum তৈরিতে ব্যবহৃত হয়।",
    time_limit: 30
  },
  {
    id: 148,
    topic: "৬. লজিক গেইট",
    question_text: "১৪৮. সত্যক সারণির আউটপুট ক্রমানুসারে A, B, C এর মান কোনটি? [ঢা. বো. ২৫]",
    options: ["1, 1, 0", "0, 0, 1", "0, 1, 0", "1, 0, 1"],
    correct_answer: "0, 0, 1",
    explanation: "লজিক গেটের নির্দিষ্ট ইনপুট মানের জন্য প্রাপ্ত আউটপুট 0, 0, 1।",
    time_limit: 30
  },
  {
    id: 149,
    topic: "৬. লজিক গেইট",
    question_text: "১৪৯. সার্বজনীনভাবে লজিক সার্কিট বাস্তবায়নের জন্য গেট হলো- [চ. বো. ২৫]\ni. NOR\nii. NAND\niii. AND\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও ii",
    explanation: "NOR এবং NAND সার্বজনীন গেট হওয়ায় এদের মাধ্যমে যে কোনো সার্কিট তৈরি করা সম্ভব।",
    time_limit: 30
  },
  {
    id: 150,
    topic: "৬. লজিক গেইট",
    question_text: "১৫০. NAND গেটের সমন্বয়ে তৈরি বিশেষ লজিক সার্কিটের আউটপুট X এর মান হবে- [বি. বো. ১৭; অনুরূপ: চ. বো. ১৯]",
    options: ["A ⊕ B", "A ⊙ B", "(A ⊕ B)\u0305", "A ⊕ B̄"],
    correct_answer: "A ⊕ B",
    explanation: "৪টি NAND গেট দিয়ে XOR (A ⊕ B) বাস্তবায়ন করা যায়।",
    time_limit: 30
  },
  {
    id: 151,
    topic: "৬. লজিক গেইট",
    question_text: "১৫১. X = (ĀB̄ . (AB)\u0305)\u0305 আউটপুট সমীকরণ কোন গেইটের সমতুল্য? [য. বো. ২৩]",
    options: ["NAND", "NOR", "X-OR", "X-NOR"],
    correct_answer: "X-OR",
    explanation: "সরলীকরণ করে পাই A ⊕ B (XOR গেট)।",
    time_limit: 45
  },
  {
    id: 152,
    topic: "৬. লজিক গেইট",
    question_text: "১৫২. সার্কিটের ইনপুট A, B ও C হলে কখন X = 1 হবে? [য. বো. ২৩]",
    options: ["A=0, B=0, C=0", "A=0, B=0, C=1", "A=0, B=1, C=0", "A=1, B=0, C=0"],
    correct_answer: "A=0, B=0, C=0",
    explanation: "A=0, B=0, C=0 ইনপুটে সার্কিটের সক্রিয় আউটপুট 1 উৎপন্ন হয়।",
    time_limit: 30
  },
  {
    id: 153,
    topic: "৬. লজিক গেইট",
    question_text: "১৫৩. F = P(P+Q)\u0305(P+Q)\u0305 এর সরলীকৃত মান কোনটি? [দি. বো. ২৩]",
    options: ["P ⊕ Q", "(P ⊕ Q)\u0305", "P+Q", "P̄ + Q̄"],
    correct_answer: "P ⊕ Q",
    explanation: "বুলিয়ান উপপাদ্যের সাহায্যে সরলীকরণ করলে মান P ⊕ Q পাওয়া যায়।",
    time_limit: 45
  },
  {
    id: 154,
    topic: "৬. লজিক গেইট",
    question_text: "১৫৪. F = P ⊕ Q সরলীকৃত মানকে মোট কয়টি মৌলিক গেট দ্বারা বাস্তবায়ন সম্ভব? [দি. বো. ২৩]",
    options: ["2", "3", "4", "5"],
    correct_answer: "3",
    explanation: "P ⊕ Q = P̄Q + PQ̄। এতে ৩ ধরনের মৌলিক গেট (NOT, AND, OR) ব্যবহৃত হয়। মোট গেট সংখ্যা ৫টি (২টি NOT, ২টি AND, ১টি OR)।",
    time_limit: 30
  },
  {
    id: 155,
    topic: "৬. লজিক গেইট",
    question_text: "১৫৫. Y = ĀB + C বুলিয়ান সমীকরণ বাস্তবায়ণ করতে মোট কয়টি মৌলিক গেইট প্রয়োজন?",
    options: ["2", "3", "4", "5"],
    correct_answer: "3",
    explanation: "Ā এর জন্য ১টি NOT, ĀB এর জন্য ১টি AND এবং + C এর জন্য ১টি OR — মোট ৩টি মৌলিক গেট প্রয়োজন।",
    time_limit: 30
  },
  {
    id: 156,
    topic: "৬. লজিক গেইট",
    question_text: "১৫৬. Y = (A+B)\u0305 . (Ā + B̄) এর সরলীকৃত মান হলো- [কু. বো. ২৪]",
    options: ["A", "Ā", "B", "B̄"],
    correct_answer: "Ā",
    explanation: "(A+B)\u0305 . (Ā + B̄) = (ĀB̄)(Ā + B̄) = ĀĀB̄ + ĀB̄B̄ = ĀB̄ + ĀB̄ = ĀB̄।",
    time_limit: 45
  },
  {
    id: 157,
    topic: "৬. লজিক গেইট",
    question_text: "১৫৭. বর্তনীতে অ্যান্ড গেইটের পরিবর্তে অর গেইট বসালে Y এর মান কত হবে? [কু. বো. ২৪]",
    options: ["A", "B", "0", "1"],
    correct_answer: "1",
    explanation: "Y = (A+B)\u0305 + (Ā + B̄) = ĀB̄ + Ā + B̄ = (Ā + ĀB̄) + B̄ = Ā + B̄ + ... = 1।",
    time_limit: 45
  }
];
