export interface ChemQuestionData {
  id: number;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
  topic: string;
  author?: string;
  ref?: string;
}

export const chem1Chap3HazariPart1: ChemQuestionData[] = [
  // ========================================================
  // ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস (১-১১)
  // ========================================================
  {
    id: 1,
    question_text: "কোনো মৌলের পরমাণু যোজ্যতা স্তরে $ns^{2}np^{5}$ ইলেকট্রন বিন্যাস থাকলে ঐ মৌলের অবস্থান পর্যায় সারণিতে কোন গ্রুপ হবে? [হাজারী স্যার]",
    options: ["15(5A)", "5(5B)", "17(7A)", "2(A)"],
    correct_answer: "17(7A)",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 2,
    question_text: "$_{39}\\mathrm{Y}$ মৌলটির পর্যায় সারণিতে অবস্থান- [হাজারী স্যার]",
    options: ["পর্যায়-5 গ্রুপ-1", "পর্যায়-5 গ্রুপ-2", "পর্যায়-5 গ্রুপ-3", "পর্যায়-5 গ্রুপ-13"],
    correct_answer: "পর্যায়-5 গ্রুপ-3",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 3,
    question_text: "কোন ইলেকট্রন বিন্যাসটি সঠিক? [হাজারী স্যার]",
    options: ["$\\mathrm{Zn^{2+}} : [\\mathrm{Ar}]3d^{10}$", "$\\mathrm{Ni^{2+}} : [\\mathrm{Ar}]3d^{4}4s^{2}$", "$\\mathrm{Fe^{2+}} : [\\mathrm{Ar}]3d^{4}4s^{2}$", "$\\mathrm{Cu^{2+}} : [\\mathrm{Ar}]3d^{8}4s^{1}$"],
    correct_answer: "$\\mathrm{Zn^{2+}} : [\\mathrm{Ar}]3d^{10}$",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 4,
    question_text: "পর্যায় সারণির কোন শ্রেণির মৌলকে চ্যালকোজেন বলে? [হাজারী স্যার]",
    options: ["13", "14", "15", "16"],
    correct_answer: "16",
    explanation: "গ্রুপ- 15 $\\rightarrow$ নিকটোজেনস/শ্বাসরোধকারী গ্যাস। গ্রুপ- 16 $\\rightarrow$ চ্যালকোজেন (আকরিক গঠনকারী)।",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 5,
    question_text: "কোনগুলো অপধাতু? [হাজারী স্যার]",
    options: ["$\\mathrm{Si, Ge, As}$", "$\\mathrm{Na, K, Ca}$", "$\\mathrm{Mg, Al, Sb}$", "$\\mathrm{Ne, Fe, Ni}$"],
    correct_answer: "$\\mathrm{Si, Ge, As}$",
    explanation: "অপধাতু $\\rightarrow$ $\\mathrm{B, Si, Ge, As, Sb, Te}$ (৬টি)",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 6,
    question_text: "বিরল মৃত্তিকা ধাতু কোন গ্রুপে অবস্থিত? [হাজারী স্যার]",
    options: ["গ্রুপ-1", "গ্রুপ-2", "গ্রুপ-3", "গ্রুপ-4"],
    correct_answer: "গ্রুপ-3",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 7,
    question_text: "২০১৬ সাল পর্যন্ত আবিষ্কৃত ও IUPAC সংস্থা কর্তৃক অনুমোদিত মৌলের সংখ্যা কত? [হাজারী স্যার]",
    options: ["113", "115", "117", "118"],
    correct_answer: "118",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 8,
    question_text: "দীর্ঘাকার পর্যায় সারণির রূপকার কে? [হাজারী স্যার]",
    options: ["মেন্ডেলিফ", "রাদারফোর্ড", "বোর", "জন ডাল্টন"],
    correct_answer: "বোর",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 9,
    question_text: "কোনটি f ব্লক মৌল নয়? [হাজারী স্যার]",
    options: ["$\\mathrm{Lu}(71)$", "$\\mathrm{Ac}(89)$", "$\\mathrm{Lr}(103)$", "$\\mathrm{Ce}(58)$"],
    correct_answer: "$\\mathrm{Ac}(89)$",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 10,
    question_text: "মৌলের ধর্মসমূহ পর্যায়ক্রমে আবর্তিত হয়- [হাজারী স্যার]",
    options: ["পারমাণবিক সংখ্যার সাথে", "পারমাণবিক ভরের সাথে", "নিউট্রন সংখ্যার সাথে", "নিউক্লিয়ন সংখ্যার সাথে"],
    correct_answer: "পারমাণবিক সংখ্যার সাথে",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 11,
    question_text: "পর্যায় সারণিতে অপধাতুর সংখ্যা কত? [হাজারী স্যার]",
    options: ["৬টি", "১০টি", "১২টি", "১৫টি"],
    correct_answer: "৬টি",
    topic: "ইলেকট্রন বিন্যাসের ভিত্তিতে মৌলের শ্রেণিবিন্যাস",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },

  // ========================================================
  // s-ব্লক মৌলসমূহ (১২-১৯)
  // ========================================================
  {
    id: 12,
    question_text: "s- ব্লকের মৌল সংখ্যা কয়টি? [হাজারী স্যার]",
    options: ["১৪টি", "২৪টি", "২৬টি", "৩৬টি"],
    correct_answer: "১৪টি",
    topic: "s-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 13,
    question_text: "s-ব্লক মৌল কোনটি? [হাজারী স্যার]",
    options: ["$\\mathrm{Al}$", "$\\mathrm{K}$", "$\\mathrm{Mn}$", "$\\mathrm{As}$"],
    correct_answer: "$\\mathrm{K}$",
    topic: "s-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 14,
    question_text: "কোনটি মৃৎ-ক্ষার ধাতু? [হাজারী স্যার]",
    options: ["$\\mathrm{Sr}$", "$\\mathrm{Cs}$", "$\\mathrm{Sc}$", "$\\mathrm{Si}$"],
    correct_answer: "$\\mathrm{Sr}$",
    explanation: "গ্রুপ-2 $\\rightarrow$ মৃৎক্ষার ধাতু ($\\mathrm{Be, Mg, Ca, Sr, Ba, Ra}$)\n$\\mathrm{Cs} \\rightarrow$ সর্বাধিক সক্রিয় ক্ষারীয় ধাতু; $\\mathrm{Si} \\rightarrow$ অপধাতু;\n$\\mathrm{Sc} \\rightarrow$ d ব্লক মৌল।",
    topic: "s-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 15,
    question_text: "$ns^{1}$ যোজ্যতার মৌল পানিসহ বিক্রিয়ায় কোনটি উৎপন্ন করে? [হাজারী স্যার]",
    options: ["এসিড", "ক্ষার", "লবণ", "ক্ষারক"],
    correct_answer: "ক্ষার",
    topic: "s-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 16,
    question_text: "সবচেয়ে দুর্বল ক্ষারক কোনটি? [হাজারী স্যার]",
    options: ["$\\mathrm{NaOH}$", "$\\mathrm{CsOH}$", "$\\mathrm{LiOH}$", "$\\mathrm{KOH}$"],
    correct_answer: "$\\mathrm{LiOH}$",
    topic: "s-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 17,
    question_text: "s-ব্লক মৌলের সঠিক বৈশিষ্ট্য নয় কোনটি? [হাজারী স্যার]",
    options: ["গলনাঙ্ক ও স্ফুটনাঙ্ক নিম্ন", "যৌগসমূহ বর্ণহীন", "তীব্র তড়িৎ ধনাত্মক", "এরা তীব্র জারক"],
    correct_answer: "এরা তীব্র জারক",
    explanation: "s ব্লক মৌলসমূহ তীব্র তড়িৎ ধনাত্মক মৌল এবং তীব্র বিজারকরূপে ক্রিয়া করে।",
    topic: "s-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 18,
    question_text: "কোন মৌলটি বুনসেন বার্নারে উজ্জ্বল সাদা শিখা প্রদান করে? [হাজারী স্যার]",
    options: ["$\\mathrm{Na}$", "$\\mathrm{Mg}$", "$\\mathrm{Ca}$", "$\\mathrm{Ba}$"],
    correct_answer: "$\\mathrm{Mg}$",
    explanation: "শিখা পরীক্ষায় বিভিন্ন ধাতুর বর্ণ:\nসোডিয়াম - সোনালি হলুদ\nপটাশিয়াম - বেগুনি\nম্যাগনেসিয়াম - উজ্জ্বল সাদা\nক্যালসিয়াম - ইটের মত লাল\nস্ট্রনসিয়াম - টকটকে লাল\nবেরিয়াম - আপেল গ্রীন",
    topic: "s-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 19,
    question_text: "সাধারণত পর্যায় সারণির কোন গ্রুপের মৌলগুলো s-ব্লকের অন্তর্ভুক্ত? [হাজারী স্যার]",
    options: ["$\\mathrm{IA}$ ও $\\mathrm{IIA}$", "$\\mathrm{IIA}$ ও $\\mathrm{IIIA}$", "$\\mathrm{IA}$ ও $\\mathrm{IIB}$", "$\\mathrm{IB}$ ও $\\mathrm{IIA}$"],
    correct_answer: "$\\mathrm{IA}$ ও $\\mathrm{IIA}$",
    topic: "s-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },

  // ========================================================
  // p-ব্লক মৌলসমূহ (২০-৫২)
  // ========================================================
  {
    id: 20,
    question_text: "পানিতে কম দ্রবণীয় লবণ কোনটি? [হাজারী স্যার]",
    options: ["$\\mathrm{NaCl}$", "$\\mathrm{KCl}$", "$\\mathrm{LiCl}$", "$\\mathrm{CsCl}$"],
    correct_answer: "$\\mathrm{LiCl}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 21,
    question_text: "দৈত্যাকার অণু গঠন করে কোনটি? /নিম্নের কোনটি অতিবৃহৎ অণু? [হাজারী স্যার]",
    options: ["$\\mathrm{CO_{2}}$", "$\\mathrm{SiO_{2}}$", "$\\mathrm{SO_{2}}$", "$\\mathrm{NO_{2}}$"],
    correct_answer: "$\\mathrm{SiO_{2}}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 22,
    question_text: "p-ব্লকের মৌল সংখ্যা কয়টি? [হাজারী স্যার]",
    options: ["১৪টি", "৩৬ টি", "৪১ টি", "২৭ টি"],
    correct_answer: "৩৬ টি",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 23,
    question_text: "প্রথম p-ব্লক মৌল কোনটি? [হাজারী স্যার]",
    options: ["$\\mathrm{B}$", "$\\mathrm{C}$", "$\\mathrm{S}$", "$\\mathrm{N}$"],
    correct_answer: "$\\mathrm{B}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 24,
    question_text: "নিচের কোন যৌগটি আর্দ্র বিশ্লেষিত হয়? [হাজারী স্যার]",
    options: ["$\\mathrm{C_{6}H_{6}}$", "$\\mathrm{NaCl}$", "$\\mathrm{SiCl_{4}}$", "$\\mathrm{CCl_{4}}$"],
    correct_answer: "$\\mathrm{SiCl_{4}}$",
    explanation: "$_{14}\\mathrm{Si} \\rightarrow 1s^{2}2s^{2}2p^{6}3s^{2}3p^{2}3d^{0}$\n$\\mathrm{Si}$ এর ক্ষেত্রে শেষ কক্ষপথে ফাঁকা d অরবিটাল থাকায়, $\\mathrm{SiCl_{4}}$ আর্দ্র বিশ্লেষিত হয়।",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 25,
    question_text: "কোন যৌগটি সম্ভব নয়? [হাজারী স্যার]",
    options: ["$\\mathrm{AlN}$", "$\\mathrm{NCl_{5}}$", "$\\mathrm{Ca_{3}N_{2}}$", "$\\mathrm{PCl_{5}}$"],
    correct_answer: "$\\mathrm{NCl_{5}}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 26,
    question_text: "কোন নিষ্ক্রিয় গ্যাসটি p-ব্লকের মৌল নয়? [হাজারী স্যার]",
    options: ["$\\mathrm{He}$", "$\\mathrm{Ne}$", "$\\mathrm{Ar}$", "$\\mathrm{Kr}$"],
    correct_answer: "$\\mathrm{He}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 27,
    question_text: "কোন অক্সাইডটি অম্লধর্মী? [হাজারী স্যার]",
    options: ["$\\mathrm{SiO_{2}}$", "$\\mathrm{Al_{2}O_{3}}$", "$\\mathrm{H_{2}O}$", "$\\mathrm{Na_{2}O}$"],
    correct_answer: "$\\mathrm{SiO_{2}}$",
    explanation: "$\\mathrm{Al_{2}O_{3}}, \\mathrm{Na_{2}O} -$ ক্ষারীয় অক্সাইড; $\\mathrm{H_{2}O} -$নিরপেক্ষ অক্সাইড।",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 28,
    question_text: "নিচের কোন অক্সাইডটি সবচেয়ে বেশি অম্লধর্মী হবে? [হাজারী স্যার]",
    options: ["$\\mathrm{SiO_{2}}$", "$\\mathrm{Cl_{2}O_{7}}$", "$\\mathrm{P_{2}O_{5}}$", "$\\mathrm{SO_{3}}$"],
    correct_answer: "$\\mathrm{Cl_{2}O_{7}}$",
    explanation: "অক্সাইডের কেন্দ্রীয় পরমাণুর জারণ সংখ্যার ক্রম: $\\overset{+7}{\\mathrm{Cl_{2}O_{7}}} > \\overset{+6}{\\mathrm{SO_{3}}} > \\overset{+5}{\\mathrm{P_{2}O_{5}}} > \\overset{+4}{\\mathrm{SiO_{2}}}$\nসুতরাং, অম্লধর্মীতার ক্রমও একই হবে।",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 29,
    question_text: "উভধর্মী অক্সাইড নিচের কোনটি? [হাজারী স্যার]",
    options: ["$\\mathrm{BeO}$", "$\\mathrm{Na_{2}O}$", "$\\mathrm{CO_{2}}$", "$\\mathrm{MgO}$"],
    correct_answer: "$\\mathrm{BeO}$",
    explanation: "$\\mathrm{Na_{2}O} \\rightarrow$ ক্ষারীয়; $\\mathrm{CO_{2}} \\rightarrow$ অম্লীয়; $\\mathrm{MgO} \\rightarrow$ ক্ষারীয়।",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 30,
    question_text: "অ্যালুমিনিয়াম ক্লোরাইড কীরূপে থাকে? [হাজারী স্যার]",
    options: ["মনোমার", "ডাইমার", "ট্রাইমার", "পলিমার"],
    correct_answer: "ডাইমার",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 31,
    question_text: "অপধাতুর সংখ্যা কত? [হাজারী স্যার]",
    options: ["6", "8", "9", "10"],
    correct_answer: "6",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 32,
    question_text: "নিচের কোন যৌগে অক্সিজেনের জারণ সংখ্যা $-\\frac{1}{2}$ হয়? [হাজারী স্যার]",
    options: ["$\\mathrm{Na_{2}O_{2}}$", "$\\mathrm{H_{2}O_{2}}$", "$\\mathrm{K_{2}O}$", "$\\mathrm{KO_{2}}$"],
    correct_answer: "$\\mathrm{KO_{2}}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 33,
    question_text: "নিচের কোন যুগলের দুইটি মৌলই অষ্টক সম্প্রসারণ ঘটাতে পারে? [হাজারী স্যার]",
    options: ["$\\mathrm{Al}$ ও $\\mathrm{S}$", "$\\mathrm{Al}$ ও $\\mathrm{Si}$", "$\\mathrm{Al}$ ও $\\mathrm{Sb}$", "$\\mathrm{Si}$ ও $\\mathrm{P}$"],
    correct_answer: "$\\mathrm{Si}$ ও $\\mathrm{P}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 34,
    question_text: "গ্রাফাইটে কোন ধরনের সংকরন ঘটে? [হাজারী স্যার]",
    options: ["$\\mathrm{sp^{3}}$", "$\\mathrm{sp^{2}}$", "$\\mathrm{sp}$", "$\\mathrm{sp^{3}d}$"],
    correct_answer: "$\\mathrm{sp^{2}}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 35,
    question_text: "$\\mathrm{SiO_{2}}$ কোন ধর্মী অক্সাইড? [হাজারী স্যার]",
    options: ["অম্লীয়", "ক্ষারীয়", "উভধর্মী", "নিরপেক্ষ"],
    correct_answer: "অম্লীয়",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 36,
    question_text: "কোনটির সর্ববহিঃস্থ স্তরে সমান সংখ্যক ইলেকট্রন বিদ্যমান? [হাজারী স্যার]",
    options: ["$\\mathrm{N, P}$", "$\\mathrm{Li, B}$", "$\\mathrm{Be, Al}$", "$\\mathrm{C, S}$"],
    correct_answer: "$\\mathrm{N, P}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 37,
    question_text: "নিচের কোনগুলো আকরিক উৎপাদনকারী মৌল? [হাজারী স্যার]",
    options: ["$\\mathrm{O}$ ও $\\mathrm{Se}$", "$\\mathrm{N}$ ও $\\mathrm{O}$", "$\\mathrm{P}$ ও $\\mathrm{O}$", "$\\mathrm{Se}$ ও $\\mathrm{P}$"],
    correct_answer: "$\\mathrm{O}$ ও $\\mathrm{Se}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 38,
    question_text: "p-ব্লক মৌল কোনটি? [হাজারী স্যার]",
    options: ["$\\mathrm{Ne}$", "$\\mathrm{Sc}$", "$\\mathrm{He}$", "$\\mathrm{Mg}$"],
    correct_answer: "$\\mathrm{Ne}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 39,
    question_text: "নিচের কোনটি জারক ও বিজারক উভয় হিসেবেই কাজ করে? [হাজারী স্যার]",
    options: ["nitrogen peroxide", "nitric acid", "ammonia", "nitrous acid"],
    correct_answer: "nitrous acid",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 40,
    question_text: "হীরক ও গ্রাফাইট হলো কার্বন মৌলের বহুরূপ। এদের ক্ষেত্রে কোন উক্তিটি সত্য নয়? [হাজারী স্যার]",
    options: ["উভয়েই কার্বন দ্বারা গঠিত", "হীরক ও গ্রাফাইট যথাক্রমে $\\mathrm{sp^{3}}$ ও $\\mathrm{sp^{2}}$ সংকরিত", "উভয়ের দহন তাপ একই", "উভয়ের বিদ্যুৎ পরিবাহিতা ভিন্ন"],
    correct_answer: "উভয়ের দহন তাপ একই",
    explanation: "হীরকের দহন তাপ গ্রাফাইট অপেক্ষা সামান্য বেশি। কারণ, হীরক তুলনামূলক কম স্থিতিশীল।",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 41,
    question_text: "অসামঞ্জস্যতা বিক্রিয়া কোনটি? [হাজারী স্যার]",
    options: ["পানির সাথে $\\mathrm{O_{2}}$ এর বিক্রিয়া", "$\\mathrm{H_{2}}$ এর সাথে $\\mathrm{Cl_{2}}$ এর বিক্রিয়া", "পানির সাথে $\\mathrm{Cl_{2}}$ এর বিক্রিয়া", "$\\mathrm{N_{2}}$ এর সাথে $\\mathrm{Cl_{2}}$ এর বিক্রিয়া"],
    correct_answer: "পানির সাথে $\\mathrm{Cl_{2}}$ এর বিক্রিয়া",
    explanation: "$\\mathrm{H_{2}O}$ এর সাথে $\\mathrm{Cl_{2}}$ এর বিক্রিয়ায় $\\mathrm{HCl}$ ও $\\mathrm{HOCl}$ উভয়ই উৎপন্ন হয় যেখানে $\\mathrm{Cl_{2}}$ এর দুটি পরমাণুর একই সাথে জারণ ও বিজারণ ঘটে।",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 42,
    question_text: "কোনটির ক্ষয় প্রতিরোধক ধর্ম রয়েছে? [হাজারী স্যার]",
    options: ["$\\mathrm{Fe}$", "$\\mathrm{Li}$", "$\\mathrm{Mg}$", "$\\mathrm{Al}$"],
    correct_answer: "$\\mathrm{Al}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 43,
    question_text: "অর্থো সিলিসিক এসিড এর রাসায়নিক সংকেত কি? [হাজারী স্যার]",
    options: ["$\\mathrm{SiO_{2}}$", "$\\mathrm{Si(OH)_{4}}$", "$\\mathrm{H_{2}SiO_{4}}$", "$\\mathrm{H_{2}SiF}$"],
    correct_answer: "$\\mathrm{Si(OH)_{4}}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 44,
    question_text: "$\\mathrm{N}$-এর কোন অক্সাইডটি নিরপেক্ষ? [হাজারী স্যার]",
    options: ["$\\mathrm{N_{2}O}$", "$\\mathrm{N_{2}O_{4}}$", "$\\mathrm{N_{2}O_{3}}$", "$\\mathrm{N_{2}O_{5}}$"],
    correct_answer: "$\\mathrm{N_{2}O}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 45,
    question_text: "নিচের কোন জোড়াটি সঠিক? [হাজারী স্যার]",
    options: ["ফ্লোরিন-ফিকে হলুদ", "ফ্লোরিন-সবুজাভ হলুদ", "ব্রোমিন-লাল", "আয়োডিন-নীল"],
    correct_answer: "ব্রোমিন-লাল",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 46,
    question_text: "কোন অক্সাইডকে ফসফরাস এসিডের অ্যানহাইড্রাইড বলা হয়? [হাজারী স্যার]",
    options: ["$\\mathrm{P_{2}O_{3}}$", "$\\mathrm{P_{2}O_{4}}$", "$\\mathrm{P_{2}O_{5}}$", "$\\mathrm{P_{2}O_{6}}$"],
    correct_answer: "$\\mathrm{P_{2}O_{3}}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 47,
    question_text: "$\\mathrm{Xe} + \\mathrm{F_{2}} (g) \\xrightarrow{400^{\\circ}\\mathrm{C}} \\mathrm{XeF_{2}} (s) \\text{ ; }$ প্রভাবক হিসেবে কী ব্যবহৃত হয়? [হাজারী স্যার]",
    options: ["$\\mathrm{Ni}$", "$\\mathrm{Pt}$", "$\\mathrm{I_{2}}$", "$\\mathrm{V_{2}O_{5}}$"],
    correct_answer: "$\\mathrm{Ni}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 48,
    question_text: "$\\mathrm{H_{2}}$ এর তুলনায় $\\mathrm{He}$ গ্যাসের বেলুন উত্তোলন ক্ষমতা- [হাজারী স্যার]",
    options: ["70%", "80%", "100%", "92%"],
    correct_answer: "92%",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 49,
    question_text: "$\\mathrm{He}$ এর জন্য নিচের কোনটি সঠিক নয়? [হাজারী স্যার]",
    options: ["এটি inert gas এর অন্তর্ভুক্ত", "অক্সিজেন সিলিন্ডারে এর পরিমাণ 80%", "$\\mathrm{He}$ দাহ্য গ্যাস", "$\\mathrm{He}$, গ্রুপ-18 এর সদস্য"],
    correct_answer: "$\\mathrm{He}$ দাহ্য গ্যাস",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 50,
    question_text: "কোনটি ‘সিলেন’ নামে পরিচিত? [হাজারী স্যার]",
    options: ["$\\mathrm{SiO_{2}}$", "$\\mathrm{Si(OH)_{4}}$", "$\\mathrm{SiH_{4}}$", "$\\mathrm{SiC}$"],
    correct_answer: "$\\mathrm{SiH_{4}}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 51,
    question_text: "কোনটি গঠন হওয়া সম্ভব? [হাজারী স্যার]",
    options: ["$\\mathrm{NI_{5}}$", "$\\mathrm{NF_{5}}$", "$\\mathrm{PI_{3}}$", "$\\mathrm{PI_{5}}$"],
    correct_answer: "$\\mathrm{PI_{3}}$",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  },
  {
    id: 52,
    question_text: "নিচের কোনটি অসংগতিপূর্ণ? [হাজারী স্যার]",
    options: ["$\\mathrm{H_{2}S}$ দুর্বল এসিড", "$\\mathrm{H_{2}O_{2}}$ নিরপেক্ষ যৌগ", "$\\mathrm{HCl}$ তীব্র এসিড", "$\\mathrm{H_{2}O}$ প্রশম যৌগ"],
    correct_answer: "$\\mathrm{H_{2}O_{2}}$ নিরপেক্ষ যৌগ",
    topic: "p-ব্লক মৌলসমূহ",
    author: "হাজারী স্যার",
    ref: "হাজারী স্যার"
  }
];
