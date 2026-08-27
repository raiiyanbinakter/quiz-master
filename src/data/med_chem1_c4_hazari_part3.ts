import { ChemQuestionData } from './med_chem1_c4_hazari_part1';

export const chem1Chap4HazariPart3: ChemQuestionData[] = [
  // ========================================================
  // এসিড ও ক্ষারের তীব্রতা (১০১-১২০)
  // ========================================================
  {
    id: 101,
    question_text: "মৃদু এসিডের ক্ষেত্রে বিয়োজন মাত্রা $\\alpha$ এবং ঘনমাত্রা $C$-এর সম্পর্ক কোনটি? [হাজারী স্যার]",
    options: ["$\\alpha = \\sqrt{\\dfrac{K_a}{C}}$", "$\\alpha = K_a \\cdot C$", "$\\alpha = \\sqrt{K_a \\cdot C}$", "$\\alpha = \\dfrac{C}{K_a}$"],
    correct_answer: "$\\alpha = \\sqrt{\\dfrac{K_a}{C}}$",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 102,
    question_text: "কোন এসিডের $pK_a$ এর মান সবচেয়ে কম? [হাজারী স্যার]",
    options: ["তীব্র এসিড", "মৃদু এসিড", "অতি মৃদু এসিড", "নিরপেক্ষ পদার্থ"],
    correct_answer: "তীব্র এসিড",
    explanation: "$pK_a = -\\log K_a$; এসিড যত শক্তিশালী হয় $K_a$ তত বড় হয় এবং $pK_a$ তত কম হয়।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 103,
    question_text: "নিচের কোন লবণটি জলীয় দ্রবণে অম্লীয় প্রকৃতির হবে? [হাজারী স্যার]",
    options: ["$\\mathrm{NH_4Cl}$", "$\\mathrm{NaCl}$", "$\\mathrm{CH_3COONa}$", "$\\mathrm{K_2SO_4}$"],
    correct_answer: "$\\mathrm{NH_4Cl}$",
    explanation: "$\\mathrm{NH_4Cl}$ তীব্র এসিড ($\mathrm{HCl}$) ও মৃদু ক্ষার ($\mathrm{NH_4OH}$)-এর লবণ, তাই এর জলীয় দ্রবণ অম্লীয় (pH < 7)।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 104,
    question_text: "সোডিয়াম অ্যাসিটেটের ($\mathrm{CH_3COONa}$) জলীয় দ্রবণের প্রকৃতি কেমন? [হাজারী স্যার]",
    options: ["ক্ষারীয়", "অম্লীয়", "নিরপেক্ষ", "উভধর্মী"],
    correct_answer: "ক্ষারীয়",
    explanation: "মৃদু এসিড ($\mathrm{CH_3COOH}$) ও তীব্র ক্ষার ($\mathrm{NaOH}$)-এর লবণ হওয়ায় ক্যাটায়ন অপেক্ষা অ্যানায়নের আর্দ্রবিশ্লেষণে $OH^-$ তৈরি হয়ে দ্রবণ ক্ষারীয় হয়।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 105,
    question_text: "নিচের কোন আয়নটি উভধর্মী (Amphiprotic)? [হাজারী স্যার]",
    options: ["$\\mathrm{HCO_3^-}$", "$\\mathrm{CO_3^{2-}}$", "$\\mathrm{SO_4^{2-}}$", "$\\mathrm{NH_4^+}$"],
    correct_answer: "$\\mathrm{HCO_3^-}$",
    explanation: "$\\mathrm{HCO_3^-}$ প্রোটন গ্রহণ করে $\mathrm{H_2CO_3}$ তৈরি করতে পারে (ক্ষার) এবং প্রোটন বর্জন করে $\mathrm{CO_3^{2-}}$ হতে পারে (এসিড)।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 106,
    question_text: "অ্যালুমিনিয়াম ক্লোরাইড ($\mathrm{AlCl_3}$) জলীয় দ্রবণে কোন ধরনের আচরণ প্রদর্শন করে? [হাজারী স্যার]",
    options: ["লুইস এসিড", "লুইস ক্ষারক", "নিরপেক্ষ লবণ", "ক্ষারকীয়"],
    correct_answer: "লুইস এসিড",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 107,
    question_text: "এসিটিক এসিডের বিয়োজন ধ্রুবক $K_a = 1.8 \\times 10^{-5}$ হলে এর $pK_a$ এর মান কত? [হাজারী স্যার]",
    options: ["4.74", "5.74", "3.74", "7.00"],
    correct_answer: "4.74",
    explanation: "$$pK_a = -\\log(1.8 \\times 10^{-5}) = 5 - \\log(1.8) \\approx 5 - 0.255 = 4.74$$",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 108,
    question_text: "ক্ষারকীয় তীব্রতার ক্ষেত্রে মিথাইল অ্যামিনের সঠিক ক্রম কোনটি? (জলীয় দ্রবণে) [হাজারী স্যার]",
    options: [
      "$(\\mathrm{CH_3})_2\\mathrm{NH} > \\mathrm{CH_3NH_2} > (\\mathrm{CH_3})_3\\mathrm{N} > \\mathrm{NH_3}$",
      "$(\\mathrm{CH_3})_3\\mathrm{N} > (\\mathrm{CH_3})_2\\mathrm{NH} > \\mathrm{CH_3NH_2} > \\mathrm{NH_3}$",
      "$\\mathrm{NH_3} > \\mathrm{CH_3NH_2} > (\\mathrm{CH_3})_2\\mathrm{NH} > (\\mathrm{CH_3})_3\\mathrm{N}$",
      "$\\mathrm{CH_3NH_2} > (\\mathrm{CH_3})_2\\mathrm{NH} > (\\mathrm{CH_3})_3\\mathrm{N} > \\mathrm{NH_3}$"
    ],
    correct_answer: "$(\\mathrm{CH_3})_2\\mathrm{NH} > \\mathrm{CH_3NH_2} > (\\mathrm{CH_3})_3\\mathrm{N} > \\mathrm{NH_3}$",
    explanation: "জলীয় দ্রবণে ইন্ডাক্টিভ ইফেক্ট, হাইড্রেশন শক্তি এবং স্টেরিক বাধার যৌথ প্রভাবে ২° অ্যামিন > ১° অ্যামিন > ৩° অ্যামিন > $\mathrm{NH_3}$ ক্রম বজায় থাকে।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 109,
    question_text: "নিচের কোন ক্যাটায়নটি জলীয় দ্রবণে লুইস এসিডের ন্যায় আচরণ করে? [হাজারী স্যার]",
    options: ["$\\mathrm{Fe^{3+}}$", "$\\mathrm{Na^+}$", "$\\mathrm{K^+}$", "$\\mathrm{Cl^-}$"],
    correct_answer: "$\\mathrm{Fe^{3+}}$",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 110,
    question_text: "ক্লোরো-প্রতিস্থাপিত অ্যাসিটিক এসিডের অম্লতার সঠিক ক্রম কোনটি? [হাজারী স্যার]",
    options: [
      "$\\mathrm{CCl_3COOH > CHCl_2COOH > CH_2ClCOOH > CH_3COOH}$",
      "$\\mathrm{CH_3COOH > CH_2ClCOOH > CHCl_2COOH > CCl_3COOH}$",
      "$\\mathrm{CH_2ClCOOH > CHCl_2COOH > CCl_3COOH > CH_3COOH}$",
      "$\\mathrm{CHCl_2COOH > CCl_3COOH > CH_2ClCOOH > CH_3COOH}$"
    ],
    correct_answer: "$\\mathrm{CCl_3COOH > CHCl_2COOH > CH_2ClCOOH > CH_3COOH}$",
    explanation: "$-I$ (ইলেকট্রন প্রত্যাহারী) প্রভাববিশিষ্ট ক্লোরিন পরমাণুর সংখ্যা যত বাড়ে, কনজুগেট ক্ষারকের স্থায়িত্ব বাড়ে এবং অম্লত্ব বৃদ্ধি পায়।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 111,
    question_text: "ক্ষারকের বিয়োজন ধ্রুবক $K_b$-এর মান বেশি হলে ক্ষারকের তীব্রতা কেমন হবে? [হাজারী স্যার]",
    options: ["অধিক তীব্র হবে", "মৃদু হবে", "কোনো প্রভাব নেই", "নিরপেক্ষ হবে"],
    correct_answer: "অধিক তীব্র হবে",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 112,
    question_text: "অ্যাসিডের তীব্রতার ক্ষেত্রে অনুবন্ধী ক্ষারকের স্থায়িত্ব কেমন হওয়া প্রয়োজন? [হাজারী স্যার]",
    options: ["যত বেশি স্থায়ী হবে, এসিড তত তীব্র হবে", "যত কম স্থায়ী হবে, এসিড তত তীব্র হবে", "স্থায়িত্বের সাথে সম্পর্ক নেই", "স্থায়িত্ব শূন্য হতে হবে"],
    correct_answer: "যত বেশি স্থায়ী হবে, এসিড তত তীব্র হবে",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 113,
    question_text: "নিচের কোন এসিডটি সবচেয়ে দুর্বল? [হাজারী স্যার]",
    options: ["$\\mathrm{HCN}$ ($pK_a \\approx 9.2$)", "$\\mathrm{CH_3COOH}$ ($pK_a = 4.74$)", "$\\mathrm{HCOOH}$ ($pK_a = 3.75$)", "$\\mathrm{HNO_2}$ ($pK_a = 3.3$)" ],
    correct_answer: "$\\mathrm{HCN}$ ($pK_a \\approx 9.2$)",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 114,
    question_text: "লুইস তত্ত্ব অনুযায়ী ধাতব আয়ন ও লিগ্যান্ডের মধ্যে বন্ধন গঠনের সময় লিগ্যান্ড কী হিসেবে কাজ করে? [হাজারী স্যার]",
    options: ["লুইস ক্ষারক", "লুইস এসিড", "নিরপেক্ষ অণু", "জারক"],
    correct_answer: "লুইস ক্ষারক",
    explanation: "লিগ্যান্ড মুক্তজোড় ইলেকট্রন ধাতব আয়নে দান করে সন্নিবেশ সমযোজী বন্ধন তৈরি করে, তাই লিগ্যান্ড হলো লুইস ক্ষারক।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 115,
    question_text: "আর্দ্রবিশ্লেষণ প্রক্রিয়ায় দুর্বল ক্ষারক ও শক্তিশালী এসিডের লবণের দ্রবণের pH কেমন হয়? [হাজারী স্যার]",
    options: ["pH < 7", "pH > 7", "pH = 7", "pH = 14"],
    correct_answer: "pH < 7",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 116,
    question_text: "কোন অক্সাইডটি ক্ষারকীয় অক্সাইড? [হাজারী স্যার]",
    options: ["$\\mathrm{Na_2O}$", "$\\mathrm{SO_2}$", "$\\mathrm{CO_2}$", "$\\mathrm{N_2O_5}$"],
    correct_answer: "$\\mathrm{Na_2O}$",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 117,
    question_text: "কোন অক্সাইডটি উভধর্মী অক্সাইড? [হাজারী স্যার]",
    options: ["$\\mathrm{Al_2O_3}$", "$\\mathrm{CaO}$", "$\\mathrm{SO_3}$", "$\\mathrm{Cl_2O_7}$"],
    correct_answer: "$\\mathrm{Al_2O_3}$",
    explanation: "$\\mathrm{Al_2O_3}$ এবং $\\mathrm{ZnO}$ এসিড ও ক্ষার উভয়ের সাথে বিক্রিয়া করে লবণ ও পানি তৈরি করে।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 118,
    question_text: "নিরপেক্ষ অক্সাইড কোনটি? [হাজারী স্যার]",
    options: ["$\\mathrm{CO}$ ও $\\mathrm{NO}$", "$\\mathrm{CO_2}$", "$\\mathrm{SO_2}$", "$\\mathrm{Na_2O}$"],
    correct_answer: "$\\mathrm{CO}$ ও $\\mathrm{NO}$",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 119,
    question_text: "$\\mathrm{H_3PO_3}$ (ফসফরাস এসিড)-এর ক্ষারকত্ব (basicity) কত? [হাজারী স্যার]",
    options: ["2", "3", "1", "4"],
    correct_answer: "2",
    explanation: "$\\mathrm{H_3PO_3}$-এর গঠনে দুটি $-OH$ মূলক ও একটি সরাসরি $P-H$ বন্ধন থাকে, ফলে এটি দ্বি-ক্ষারকীয় এসিড (ক্ষারকত্ব = 2)।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 120,
    question_text: "$\\mathrm{H_3PO_2}$ (হাইপোফসফরাস এসিড)-এর ক্ষারকত্ব কত? [হাজারী স্যার]",
    options: ["1", "2", "3", "0"],
    correct_answer: "1",
    explanation: "$\\mathrm{H_3PO_2}$-এর গঠনে মাত্র একটি প্রতিস্থাপনযোগ্য $-OH$ মূলক থাকায় এর ক্ষারকত্ব ১।",
    topic: "এসিড ও ক্ষারের তীব্রতা",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },

  // ========================================================
  // দ্রবণের pH ও বাফার দ্রবণ (১২১-১৫০)
  // ========================================================
  {
    id: 121,
    question_text: "pH স্কেলের আবিষ্কারক কে? [হাজারী স্যার]",
    options: ["এস. পি. এল. সোরেনসেন", "লুইস", "আরহেনিয়াস", "ভ্যান্ট হফ"],
    correct_answer: "এস. পি. এল. সোরেনসেন",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 122,
    question_text: "pH-এর সংজ্ঞা সমীকরণ কোনটি? [হাজারী স্যার]",
    options: ["$\\text{pH} = -\\log[\\mathrm{H^+}]$", "$\\text{pH} = \\log[\\mathrm{H^+}]$", "$\\text{pH} = -\\ln[\\mathrm{OH^-}]$", "$\\text{pH} = 10^{-[\\mathrm{H^+}]}$"],
    correct_answer: "$\\text{pH} = -\\log[\\mathrm{H^+}]$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 123,
    question_text: "$25^\\circ\\text{C}$ তাপমাত্রায় $\\text{pH} + \\text{pOH} = ?$ [হাজারী স্যার]",
    options: ["14", "7", "10", "1"],
    correct_answer: "14",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 124,
    question_text: "$0.001\\text{ M } \\mathrm{HCl}$ দ্রবণের pH কত? [হাজারী স্যার]",
    options: ["3", "1", "2", "4"],
    correct_answer: "3",
    explanation: "$$\\text{pH} = -\\log(10^{-3}) = 3$$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 125,
    question_text: "$0.005\\text{ M } \\mathrm{H_2SO_4}$ দ্রবণের pH কত? [হাজারী স্যার]",
    options: ["2", "1", "2.3", "3"],
    correct_answer: "2",
    explanation: "$$[\\mathrm{H^+}] = 2 \\times 0.005 = 0.01\\text{ M} = 10^{-2}\\text{ M} \\implies \\text{pH} = 2$$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 126,
    question_text: "$0.01\\text{ M } \\mathrm{NaOH}$ দ্রবণের pH কত? [হাজারী স্যার]",
    options: ["12", "2", "14", "10"],
    correct_answer: "12",
    explanation: "$$\\text{pOH} = -\\log(0.01) = 2 \\implies \\text{pH} = 14 - 2 = 12$$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 127,
    question_text: "কোনো দ্রবণের pH = 3 থেকে পরিবর্তিত হয়ে pH = 6 হলে $[\mathrm{H^+}]$ কতগুণ হ্রাস পেল? [হাজারী স্যার]",
    options: ["১০০০ গুণ", "৩ গুণ", "১০০ গুণ", "১০ গুণ"],
    correct_answer: "১০০০ গুণ",
    explanation: "$$[\\mathrm{H^+}]_1 = 10^{-3}\\text{ M}, [\\mathrm{H^+}]_2 = 10^{-6}\\text{ M} \\implies \\dfrac{10^{-3}}{10^{-6}} = 10^3 = 1000\\text{ গুণ}$$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 128,
    question_text: "মানুষের রক্তের স্বাভাবিক pH কত? [হাজারী স্যার]",
    options: ["7.35 - 7.45", "6.5 - 7.0", "7.8 - 8.2", "7.0 - 7.2"],
    correct_answer: "7.35 - 7.45",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 129,
    question_text: "রক্তের pH কতের নিচে নামলে এসিডোসিস (Acidosis) এবং কতের উপরে গেলে অ্যালকালোসিস (Alkalosis) হয়ে মানুষের মৃত্যু হতে পারে? [হাজারী স্যার]",
    options: ["< 7.0 এবং > 7.8", "< 6.0 এবং > 8.5", "< 7.2 এবং > 7.6", "< 5.5 এবং > 9.0"],
    correct_answer: "< 7.0 এবং > 7.8",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 130,
    question_text: "মানবদেহের প্রধান আন্তঃকোষীয় ও বহিঃকোষীয় বাফার সিস্টেম কোনটি? [হাজারী স্যার]",
    options: [
      "বাইকার্বনেট বাফার ($\\mathrm{H_2CO_3 / HCO_3^-}$)",
      "অ্যাসিটেট বাফার",
      "বোরেট বাফার",
      "সাইট্রেট বাফার"
    ],
    correct_answer: "বাইকার্বনেট বাফার ($\\mathrm{H_2CO_3 / HCO_3^-}$)",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 131,
    question_text: "অম্লীয় বাফার দ্রবণের pH গণনার হেনডারসন-হ্যাসেলবালখ সমীকরণ কোনটি? [হাজারী স্যার]",
    options: [
      "$\\text{pH} = pK_a + \\log\\dfrac{[\\text{লবণ}]}{[\\text{অম্ল}]}$",
      "$\\text{pH} = pK_a - \\log\\dfrac{[\\text{লবণ}]}{[\\text{অম্ল}]}$",
      "$\\text{pH} = pK_w + \\log\\dfrac{[\\text{লবণ}]}{[\\text{অম্ল}]}$",
      "$\\text{pH} = pK_b + \\log\\dfrac{[\\text{লবণ}]}{[\\text{ক্ষার}]}$"
    ],
    correct_answer: "$\\text{pH} = pK_a + \\log\\dfrac{[\\text{লবণ}]}{[\\text{অম্ল}]}$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 132,
    question_text: "ক্ষারীয় বাফার দ্রবণের pOH সমীকরণ কোনটি? [হাজারী স্যার]",
    options: [
      "$\\text{pOH} = pK_b + \\log\\dfrac{[\\text{লবণ}]}{[\\text{ক্ষার}]}$",
      "$\\text{pOH} = pK_b - \\log\\dfrac{[\\text{লবণ}]}{[\\text{ক্ষার}]}$",
      "$\\text{pOH} = pK_a + \\log\\dfrac{[\\text{ক্ষার}]}{[\\text{লবণ}]}$",
      "$\\text{pOH} = 14 - pK_a$"
    ],
    correct_answer: "$\\text{pOH} = pK_b + \\log\\dfrac{[\\text{লবণ}]}{[\\text{ক্ষার}]}$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 133,
    question_text: "কোন মিশ্রণটি অম্লীয় বাফার দ্রবণ তৈরি করে? [হাজারী স্যার]",
    options: [
      "$\\mathrm{CH_3COOH + CH_3COONa}$",
      "$\\mathrm{NH_4OH + NH_4Cl}$",
      "$\\mathrm{HCl + NaCl}$",
      "$\\mathrm{NaOH + CH_3COONa}$"
    ],
    correct_answer: "$\\mathrm{CH_3COOH + CH_3COONa}$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 134,
    question_text: "কোন মিশ্রণটি ক্ষারীয় বাফার দ্রবণ তৈরি করে? [হাজারী স্যার]",
    options: [
      "$\\mathrm{NH_4OH + NH_4Cl}$",
      "$\\mathrm{CH_3COOH + CH_3COONa}$",
      "$\\mathrm{HNO_3 + KNO_3}$",
      "$\\mathrm{NaOH + NaCl}$"
    ],
    correct_answer: "$\\mathrm{NH_4OH + NH_4Cl}$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 135,
    question_text: "বাফার দ্রবণে সমপরিমাণ লবণ ও এসিড থাকলে ($\mathrm{[লবণ] = [অম্ল]}$) দ্রবণের pH কত হবে? [হাজারী স্যার]",
    options: ["$\\text{pH} = pK_a$", "$\\text{pH} = 7$", "$\\text{pH} = pK_a + 1$", "$\\text{pH} = 14$"],
    correct_answer: "$\\text{pH} = pK_a$",
    explanation: "$\\log([\\text{লবণ}]/[\\text{অম্ল}]) = \\log 1 = 0$, ফলে $\\text{pH} = pK_a$।",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 136,
    question_text: "একটি বাফার দ্রবণের সর্বোচ্চ বাফার ক্ষমতা বা কার্যকারিতা থাকে কোন পরিসরে? [হাজারী স্যার]",
    options: ["$\\text{pH} = pK_a \\pm 1$", "$\\text{pH} = pK_a \\pm 2$", "$\\text{pH} = 7 \\pm 1$", "$\\text{pH} = 0 - 14$"],
    correct_answer: "$\\text{pH} = pK_a \\pm 1$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 137,
    question_text: "ত্বকের স্বাভাবিক pH কত? [হাজারী স্যার]",
    options: ["4.5 - 5.5 (সামান্য অম্লীয়)", "7.0 - 7.5", "8.0 - 9.0", "2.0 - 3.0"],
    correct_answer: "4.5 - 5.5 (সামান্য অম্লীয়)",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 138,
    question_text: "পাকস্থলীর গ্যাস্ট্রিক জুসের pH কত? [হাজারী স্যার]",
    options: ["1.0 - 2.0", "4.0 - 5.0", "7.0", "8.0 - 8.5"],
    correct_answer: "1.0 - 2.0",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 139,
    question_text: "কৃষি জমিতে মাটির অম্লত্ব দূর করার জন্য কী যোগ করা হয়? [হাজারী স্যার]",
    options: ["চুন ($\\mathrm{CaO}$ বা $\\mathrm{CaCO_3}$)", "ইউরিয়া", "টিএসপি", "লবণ"],
    correct_answer: "চুন ($\\mathrm{CaO}$ বা $\\mathrm{CaCO_3}$)",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 140,
    question_text: "মাটির অতিরিক্ত ক্ষারত্ব দূর করতে সাধারণত কী ব্যবহার করা হয়? [হাজারী স্যার]",
    options: ["জিপসাম বা অ্যামোনিয়াম সালফেট", "চুন", "সোডা অ্যাশ", "ব্লিচিং পাউডার"],
    correct_answer: "জিপসাম বা অ্যামোনিয়াম সালফেট",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 141,
    question_text: "রক্তে বাইকার্বনেট ও কার্বনিক এসিডের অনুপাত কত থাকে? [হাজারী স্যার]",
    options: ["20 : 1", "1 : 20", "10 : 1", "1 : 1"],
    correct_answer: "20 : 1",
    explanation: "$$\\dfrac{[\\mathrm{HCO_3^-}]}{[\\mathrm{H_2CO_3}]} = \\dfrac{20}{1}$$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 142,
    question_text: "$0.1\\text{ M } \\mathrm{CH_3COOH}$ এবং $0.1\\text{ M } \\mathrm{CH_3COONa}$ মিশ্রণের pH কত? ($pK_a = 4.74$) [হাজারী স্যার]",
    options: ["4.74", "5.74", "3.74", "7.00"],
    correct_answer: "4.74",
    explanation: "$$\\text{pH} = 4.74 + \\log(0.1/0.1) = 4.74 + 0 = 4.74$$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 143,
    question_text: "যদি বাফার দ্রবণে লবণের ঘনমাত্রা এসিডের ঘনমাত্রার ১০ গুণ হয়, তবে pH কত হবে? ($pK_a = 4.74$) [হাজারী স্যার]",
    options: ["5.74", "4.74", "3.74", "6.74"],
    correct_answer: "5.74",
    explanation: "$$\\text{pH} = 4.74 + \\log(10) = 4.74 + 1 = 5.74$$",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 144,
    question_text: "$10^{-8}\\text{ M } \\mathrm{HCl}$ দ্রবণের pH কত? [হাজারী স্যার]",
    options: ["6.96 - 6.98 (প্রায় 7)", "8", "6", "14"],
    correct_answer: "6.96 - 6.98 (প্রায় 7)",
    explanation: "অতি লঘু এসিড দ্রবণে পানির স্বতঃবিয়োজন হতে প্রাপ্ত $[\mathrm{H^+}] = 10^{-7}\\text{ M}$ গণনা করতে হয়: $[\\mathrm{H^+}]_{\\text{total}} = 10^{-8} + 10^{-7} = 1.1 \\times 10^{-7} \\implies \\text{pH} = 6.96$।",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 145,
    question_text: "বাফার দ্রবণে সামান্য এসিড বা ক্ষার যোগ করলে কী ঘটে? [হাজারী স্যার]",
    options: ["pH প্রায় অপরিবর্তিত থাকে", "pH শূন্য হয়ে যায়", "pH দ্রুত বাড়ে", "pH দ্রুত কমে"],
    correct_answer: "pH প্রায় অপরিবর্তিত থাকে",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 146,
    question_text: "নিচের কোন লবণটি পানিতে আর্দ্রবিশ্লেষিত হয় না? [হাজারী স্যার]",
    options: ["$\\mathrm{NaCl}$", "$\\mathrm{NH_4Cl}$", "$\\mathrm{CH_3COONa}$", "$\\mathrm{AlCl_3}$"],
    correct_answer: "$\\mathrm{NaCl}$",
    explanation: "তীব্র এসিড ($\mathrm{HCl}$) ও তীব্র ক্ষার ($\mathrm{NaOH}$)-এর লবণ পানিতে আর্দ্রবিশ্লেষিত হয় না এবং এর দ্রবণ সম্পূর্ণ নিরপেক্ষ (pH = 7) থাকে।",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 147,
    question_text: "রক্তের প্রোটিন বাফার সিস্টেমে কোন অ্যামাইনো এসিডের পার্শ্বশিকল বাফার হিসেবে কার্যকর ভূমিকা পালন করে? [হাজারী স্যার]",
    options: ["হিস্টিডিন (Histidine)", "গ্লাইসিন", "অ্যালানিন", "ভ্যালিন"],
    correct_answer: "হিস্টিডিন (Histidine)",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 148,
    question_text: "লাল লিটমাসকে নীল করে কোন ধরনের দ্রবণ? [হাজারী স্যার]",
    options: ["ক্ষারকীয় দ্রবণ (pH > 7)", "অম্লীয় দ্রবণ (pH < 7)", "নিরপেক্ষ দ্রবণ (pH = 7)", "বিশুদ্ধ পানি"],
    correct_answer: "ক্ষারকীয় দ্রবণ (pH > 7)",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 149,
    question_text: "মিথাইল অরেঞ্জ নির্দেশকের বর্ণ পরিবর্তনের pH সীমা কত? [হাজারী স্যার]",
    options: ["3.1 - 4.4", "8.2 - 10.0", "6.0 - 7.6", "4.2 - 6.3"],
    correct_answer: "3.1 - 4.4",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 150,
    question_text: "ফেনলফথ্যালিন নির্দেশকের বর্ণ পরিবর্তনের pH সীমা কত? [হাজারী স্যার]",
    options: ["8.2 - 10.0", "3.1 - 4.4", "4.2 - 6.3", "6.0 - 7.6"],
    correct_answer: "8.2 - 10.0",
    topic: "দ্রবণের pH ও বাফার দ্রবণ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  }
];
