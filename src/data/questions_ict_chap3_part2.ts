import { Question } from '../types';

export const ictChap3QuestionsPart2: Question[] = [
  // Type 04 : বিভিন্ন প্রকার কোড
  {
    id: 55,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৫৫. 4 বিটবিশিষ্ট কোড কোনটি? [রা. বো. ২৪; অনুরূপ: ব. বো. ১৬]",
    options: ["Octal code", "BCD code", "ASCII code", "Unicode"],
    correct_answer: "BCD code",
    explanation: "BCD (Binary Coded Decimal) হলো ৪ বিটের কোড। ASCII ৭ বা ৮ বিটের, Unicode ১৬ বিটের।",
    time_limit: 30
  },
  {
    id: 56,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৫৬. (78)₁₀ এর BCD মান কত? [রা. বো. ১৬; য. বো. ১৬]",
    options: ["01111001", "01111000", "01101000", "01101100"],
    correct_answer: "01111000",
    explanation: "৭ = 0111 এবং ৮ = 1000 -> (78)₁₀ এর BCD মান হলো 01111000।",
    time_limit: 30
  },
  {
    id: 57,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৫৭. কোনটি ৮ বিটের কোড? [য. বো. ১৯; অনুরূপ: ব. বো. ২৫]\ni. ASCII Code (ASCII-8)\nii. EBCDIC Code\niii. BCD Code\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও ii",
    explanation: "ASCII-8 এবং EBCDIC উভয়ই ৮ বিটের কোড। BCD হলো ৪ বিটের কোড।",
    time_limit: 30
  },
  {
    id: 58,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৫৮. আসকিতে প্রতীক নির্দেশক কোড কয়টি? [চ. বো. ২০]",
    options: ["১৬", "৩২", "৬৪", "৯৬"],
    correct_answer: "৯৬",
    explanation: "ASCII-7 এর ১২৮টি কোডের মধ্যে প্রথম ৩২টি কন্ট্রোল বা যান্ত্রিক নিয়ন্ত্রণ কোড (0-31) এবং বাকি ৯৬টি মুদ্রণযোগ্য প্রতীক নির্দেশক কোড (32-127)।",
    time_limit: 30
  },
  {
    id: 59,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৫৯. ASCII-8 কোডের মাধ্যমে সর্বোচ্চ কতটি অক্ষর বা চিহ্নকে কোডভুক্ত করা যায়? [কু. বো. ২৪]",
    options: ["16", "32", "256", "1024"],
    correct_answer: "256",
    explanation: "ASCII-8 কোডে ৮টি বিট থাকে। ফলে মোট 2⁸ = 256 টি ভিন্ন অক্ষর বা চিহ্ন কোডভুক্ত করা যায়।",
    time_limit: 30
  },
  {
    id: 60,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬০. ASCII কোডে যান্ত্রিক নিয়ন্ত্রণের জন্য কতটি কোড ব্যবহৃত হয়? [দি. বো. ২৩]",
    options: ["৮", "১৬", "৩২", "৬৪"],
    correct_answer: "৩২",
    explanation: "ASCII কোডের প্রথম ৩২টি কোড (0 থেকে 31) যান্ত্রিক নিয়ন্ত্রণের (Control characters) জন্য ব্যবহৃত হয়।",
    time_limit: 30
  },
  {
    id: 61,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬১. 7 বিটের ASCII কোডের যান্ত্রিক নিয়ন্ত্রণ কোড কয়টি? [চ. বো. ২৫]",
    options: ["৩২", "৯৬", "১২৭", "১২৮"],
    correct_answer: "৩২",
    explanation: "৭ বিটের ASCII কোডে মোট ১২৮টি কোডের মধ্যে ৩২টি যান্ত্রিক নিয়ন্ত্রণ কোড।",
    time_limit: 30
  },
  {
    id: 62,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬২. ASCII-8 কোডের মাধ্যমে কতটি অদ্বিতীয় চিহ্নকে নির্দিষ্ট করে যায়? [কু. বো. ১৭; অনুরূপ: ঢা. বো. ১৭]",
    options: ["১২৮", "২৫৬", "৫১২", "৬৫৫৩৬"],
    correct_answer: "২৫৬",
    explanation: "ASCII-8 এ ৮ বিট থাকায় 2⁸ = ২৫৬টি অদ্বিতীয় চিহ্ন নির্দিষ্ট করা যায়।",
    time_limit: 30
  },
  {
    id: 63,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬৩. ASCII-8 কোডে সংখ্যাসূচক বিট কতটি? [রা. বো. ১৯]",
    options: ["2", "4", "8", "16"],
    correct_answer: "4",
    explanation: "ASCII-8 কোডে সর্বডানের ৪টি বিট হলো সংখ্যাসূচক বিট (Numeric bits), মাঝের ৩টি জোন বিট এবং বামের ১টি প্যারিটি বিট।",
    time_limit: 30
  },
  {
    id: 64,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬৪. '#FFFFFF' কোন রং নির্দেশ করে? [ঢা. বো. ২৫]",
    options: ["সাদা", "নীল", "সায়ান", "লাল"],
    correct_answer: "সাদা",
    explanation: "RGB কালার কোডে #FFFFFF নির্দেশ করে সম্পূর্ণ সাদা (White) রং।",
    time_limit: 30
  },
  {
    id: 65,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬৫. ইউনিকোডের বিটের সংখ্যা কত? [মা. বো. ১৯, ১৬]",
    options: ["4", "8", "16", "32"],
    correct_answer: "16",
    explanation: "ইউনিকোড মূলত ১৬ বিটবিশিষ্ট কোড (2¹⁶ = 65,536 টি চিহ্ন)।",
    time_limit: 30
  },
  {
    id: 66,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬৬. ইউনিকোডের প্রথম সংস্করণ কতটি ভাষা নিয়ে চালু করা হয়? [রা. বো. ২৫]",
    options: ["৬টি", "১২টি", "২৪টি", "৪৮টি"],
    correct_answer: "২৪টি",
    explanation: "ইউনিকোডের প্রথম সংস্করণ ১৯৯১ সালে ২৪টি আন্তর্জাতিক ভাষা নিয়ে চালু করা হয়েছিল।",
    time_limit: 30
  },
  {
    id: 67,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬৭. পৃথিবীর সকল ভাষাকে কোন কোডভুক্ত করা সম্ভব হয়েছে? [দি. বো. ২৪]",
    options: ["BCD", "ASCII", "Unicode", "EBCDIC"],
    correct_answer: "Unicode",
    explanation: "ইউনিকোড (Universal Code) এর মাধ্যমে পৃথিবীর সকল ভাষার বর্ণ ও চিহ্নকে কোডভুক্ত করা সম্ভব হয়েছে।",
    time_limit: 30
  },
  {
    id: 68,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬৮. বাংলা বর্ণমালা কোন কোডভুক্ত? [ঢা. বো. ২৪; সি. বো. ১৭; রা. বো. ১৯]",
    options: ["BCD", "ASCII", "EBCDIC", "UNICODE"],
    correct_answer: "UNICODE",
    explanation: "বাংলা বর্ণমালাকে কম্পিউটারে অন্তর্ভুক্ত করার জন্য ইউনিকোড ব্যবহৃত হয়।",
    time_limit: 30
  },
  {
    id: 69,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৬৯. হায়ারোগ্লিফিক্স ভাষা হতে বর্তমানে ইমোজি পর্যন্ত কোন কোডের অন্তর্ভুক্ত? [ঢা. বো. ২৫; ব. বো. ২৪]",
    options: ["EBCDIC", "ASCII-7", "ASCII-8", "Unicode"],
    correct_answer: "Unicode",
    explanation: "ইউনিকোডে প্রাচীন হায়ারোগ্লিফিক্স থেকে শুরু করে আধুনিক সকল ইমোজি ও আন্তর্জাতিক চিহ্ন অন্তর্ভুক্ত করা হয়েছে।",
    time_limit: 30
  },
  {
    id: 70,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৭০. ইউনিকোডে সর্বোচ্চ কতটি চিহ্ন প্রকাশ করা যায়? [য. বো. ২৫; সম্মিলিত বোর্ড-১৮]",
    options: ["128", "256", "512", "65,536"],
    correct_answer: "65,536",
    explanation: "ইউনিকোড ১৬ বিটের হওয়ায় এতে 2¹⁶ = ৬৫,৫৩৬টি চিহ্ন প্রকাশ করা যায়।",
    time_limit: 30
  },
  {
    id: 71,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৭১. UTF-8 নিম্নের কোন কোড? [য. বো. ২৪]",
    options: ["BCD", "EBCDIC", "ASCII-8", "Unicode"],
    correct_answer: "Unicode",
    explanation: "UTF-8 (Unicode Transformation Format - 8 bit) হলো ইউনিকোডের একটি জনপ্রিয় এনকোডিং ফরম্যাট।",
    time_limit: 30
  },
  {
    id: 72,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৭২. সকল মেইনফ্রেম কম্পিউটারে ইংরেজি বর্ণকে অন্তর্ভুক্ত করা যায়- [চ. বো. ১৭]\ni. ASCII দ্বারা\nii. EBCDIC দ্বারা\niii. Unicode দ্বারা\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i, ii ও iii",
    explanation: "মেইনফ্রেম কম্পিউটারে প্রধানত EBCDIC ছাড়াও ASCII ও ইউনিকোড ব্যবহার করা যায়।",
    time_limit: 30
  },
  {
    id: 73,
    topic: "৪. বিভিন্ন প্রকার কোড",
    question_text: "৭৩. আলফানিউমেরিক ডেটা আদান-প্রদানের জন্য ব্যবহৃত হয়- [ম. বো. ১৯]\ni. ASCII code\nii. EBCDIC code\niii. Unicode\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i, ii ও iii",
    explanation: "ASCII, EBCDIC এবং Unicode তিনটিই আলফানিউমেরিক ডেটা আদান-প্রদানের জন্য ব্যবহৃত হয়।",
    time_limit: 30
  },

  // Type 05 : বুলিয়ান অ্যালজেবরা
  {
    id: 74,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৭৪. কোনটি মৌলিক উপপাদ্য? [য. বো. ১৭]",
    options: ["A + 1 = A", "A + 0 = A", "A + Ā = 0", "A + A = 1"],
    correct_answer: "A + 0 = A",
    explanation: "বুলিয়ান অ্যালজেবরার মৌলিক যোগের উপপাদ্য: A + 0 = A, A + 1 = 1, A + A = A, A + Ā = 1।",
    time_limit: 30
  },
  {
    id: 75,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৭৫. কোনটি বুলিয়ান অ্যালজেবরার মৌলিক উপপাদ্য? [সি. বো. ১৯]",
    options: ["A + 1 = A", "A + A = A", "A + 0 = 0", "A + Ā = 0"],
    correct_answer: "A + A = A",
    explanation: "বুলিয়ান অ্যালজেবরায় A + A = A হলো Idempotent মৌলিক উপপাদ্য।",
    time_limit: 30
  },
  {
    id: 76,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৭৬. F = A + Ā হলে F-এর মান কত?",
    options: ["1", "0", "A", "Ā"],
    correct_answer: "1",
    explanation: "বুলিয়ান অ্যালজেবরার পরিপূরক উপপাদ্য অনুযায়ী A + Ā = 1।",
    time_limit: 30
  },
  {
    id: 77,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৭৭. A ফলাফল হতে পারে যখন-\ni. A + A + A\nii. A . A\niii. A ⊕ A\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও ii",
    explanation: "A + A + A = A এবং A . A = A। কিন্তু A ⊕ A = 0। তাই i ও ii সঠিক।",
    time_limit: 30
  },
  {
    id: 78,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৭৮. A + BC = (A + B)(A + C) উপপাদ্যটি হলো: [অনুরূপ: সি. বো. ১৭; রা. বো. ১৭]",
    options: ["বিনিময়", "অনুষঙ্গ", "মৌলিক", "বিভাজন"],
    correct_answer: "বিভাজন",
    explanation: "A + BC = (A + B)(A + C) হলো বুলিয়ান অ্যালজেবরার বিভাজন বা Distributive উপপাদ্য।",
    time_limit: 30
  },
  {
    id: 79,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৭৯. বুলিয়ান সহায়ক উপপাদ্য-\ni. x + xy = x\nii. x(x + y) = x\niii. x + x = x\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i, ii ও iii",
    explanation: "সহায়ক বা Absorption উপপাদ্য: x + xy = x, x(x + y) = x এবং মৌলিক উপপাদ্য: x + x = x।",
    time_limit: 30
  },
  {
    id: 80,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮০. ডি-মরগ্যান এর উপপাদ্য কোনটি? [কু. বো. ১৬]",
    options: ["A ⊕ B = ĀB + A\u014c", "(AB)\u0305 = Ā + B\u0305", "(A ⊕ B)\u0305 = (AB)\u0305 + AB", "A + (AB)\u0305 = A"],
    correct_answer: "(AB)\u0305 = Ā + B\u0305",
    explanation: "ডি-মরগ্যানের ২টি উপপাদ্য: (A + B)\u0305 = Ā . B\u0305 এবং (A . B)\u0305 = Ā + B\u0305।",
    time_limit: 30
  },
  {
    id: 81,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮১. ডি-মরগ্যানের উপপাদ্য অনুযায়ী পাই-",
    options: ["(AB)\u0305 = Ā . B\u0305", "(A + B)\u0305 = A + B", "Ā . B\u0305 = (A + B)\u0305", "(A + B)\u0305 = Ā . B\u0305"],
    correct_answer: "(A + B)\u0305 = Ā . B\u0305",
    explanation: "(A + B)\u0305 = Ā . B\u0305 হলো ডি-মরগ্যানের প্রথম উপপাদ্য।",
    time_limit: 30
  },
  {
    id: 82,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮২. বুলিয়ান অ্যালজেবরা সরলীকরণ করার সময় প্রথমে কোনটি করতে হয়? [দি. বো. ২৪]",
    options: ["গুণ", "পূরক", "যোগ", "ভাগ"],
    correct_answer: "পূরক",
    explanation: "বুলিয়ান অ্যালজেবরায় অপারেটর অগ্রাধিকার ক্রম: ব্র্যাকেট/পূরক (NOT) > গুণ (AND) > যোগ (OR)।",
    time_limit: 30
  },
  {
    id: 83,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮৩. F = XY + X̄Y + X এর সরলীকৃত মান কত? [সি. বো. '২৩]",
    options: ["XY", "X", "X(Y + 1)", "X + Y"],
    correct_answer: "X + Y",
    explanation: "F = Y(X + X̄) + X = Y(1) + X = Y + X বা X + Y।",
    time_limit: 45
  },
  {
    id: 84,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮৪. (A + B)(Ā + B̄) এর সরলীকৃত মান- [দি. বো. ২৫]",
    options: ["0", "1", "A", "AB"],
    correct_answer: "0",
    explanation: "ডিমরগ্যান ও বুলিয়ান সূত্রানুসারে সরলীকরণ করলে মান শূন্য (0) নির্দেশ করে।",
    time_limit: 45
  },
  {
    id: 85,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮৫. F = ABC + AB̄C এর সরলীকৃত মান কোনটি? [চ. বো. ১৬]",
    options: ["A + B + C", "ABC", "AB̄C", "AC"],
    correct_answer: "ABC",
    explanation: "ABC + ABC = ABC।",
    time_limit: 30
  },
  {
    id: 86,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮৬. F = A + ĀB + ĀB̄ হলে F এর সরলীকৃত মান কত? [দি. বো. ১৯]",
    options: ["0", "1", "A", "B"],
    correct_answer: "1",
    explanation: "F = A + Ā(B + B̄) = A + Ā(1) = A + Ā = 1।",
    time_limit: 45
  },
  {
    id: 87,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮৭. (a + b)(ā + b̄) সমীকরণটি সরল করতে যে সূত্রের প্রয়োগ ঘটে- [কু. বো. ২৩]\ni. A ⊕ B\nii. ĀB + AB̄\niii. (A ⊕ B)\u0305\nনিচের কোনটি সঠিক?",
    options: ["i ও ii", "i ও iii", "ii ও iii", "i, ii ও iii"],
    correct_answer: "i ও ii",
    explanation: "(A + B)(Ā + B̄) = AĀ + AB̄ + ĀB + BB̄ = 0 + AB̄ + ĀB + 0 = A ⊕ B।",
    time_limit: 45
  },
  {
    id: 88,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮৮. F = R̄S + RS̄ সমীকরণটি কোন গেইট নির্দেশ করে? [কু. বো. ১৯]",
    options: ["NOR", "NAND", "X-OR", "X-NOR"],
    correct_answer: "X-OR",
    explanation: "R̄S + RS̄ হলো XOR (Exclusive-OR) গেইটের সমীকরণ।",
    time_limit: 30
  },
  {
    id: 89,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৮৯. a = 1, b = 0 এর জন্য a ⊕ b = ? [কু. বো. ১৭]",
    options: ["0", "1", "0, 1", "1, 0"],
    correct_answer: "1",
    explanation: "a ⊕ b = āb + ab̄ = 0.0 + 1.1 = 0 + 1 = 1।",
    time_limit: 30
  },
  {
    id: 90,
    topic: "৫. বুলিয়ান অ্যালজেবরা",
    question_text: "৯০. x = c + b(a + bc); x এর মান 1 হবে যখন- [দি. বো. '২৩]",
    options: ["a=0, b=0, c=0", "a=1, b=0, c=0", "a=1, b=1, c=0", "a=0, b=1, c=1"],
    correct_answer: "a=1, b=1, c=0",
    explanation: "a=1, b=1, c=0 বসালে: x = 0 + 1(1 + 1.0) = 0 + 1(1) = 1।",
    time_limit: 45
  }
];
