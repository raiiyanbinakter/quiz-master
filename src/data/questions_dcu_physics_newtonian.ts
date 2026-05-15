import { ChapterData } from "../types";

export const dcuPhysicsNewtonianData: ChapterData = {
  subject: "পদার্থবিজ্ঞান (ICU)",
  chapter: "নিউটনিয়ান বলবিদ্যা এক্সাম",
  questions: [
  {
    "id": 1,
    "question_text": "50 kg ভরের একটি স্থির বস্তুর উপর 5 sec ব্যাপী 10 N বল প্রযুক্ত হলো, বস্তুটির বেগের পরিবর্তন কত হবে?",
    "options": [
      "1 ms⁻¹",
      "10 ms⁻¹",
      "50 ms⁻¹",
      "0.5 ms⁻¹"
    ],
    "correct_answer": "1 ms⁻¹",
    "explanation": "Soln: F × t = m(v - u) ⇒ v - u = F×t / m = (10×5) / 50 = 1 ms⁻¹",
    "time_limit": 55
  },
  {
    "id": 2,
    "question_text": "একটি স্থির বস্তুর ভর 22000 kg। একটি বল 10.5 sec বস্তুটির উপর কাজ করায় বস্তুটির বেগ 13.6 ms⁻¹ হলে বলের মান কত?",
    "options": [
      "28495 N",
      "22000 N",
      "2200 N",
      "কোনটিই নয়"
    ],
    "correct_answer": "28495 N",
    "explanation": "Soln: F = m(v-u) / t = 22000×(13.6-0) / 10.5 = 28495 N",
    "time_limit": 55
  },
  {
    "id": 3,
    "question_text": "30 kg ভরের একটি স্থির বস্তুর বেগ 2 মিনিটে বৃদ্ধি করে 36 kmh⁻¹ এ উন্নীত করার জন্য বস্তুটির উপর কত বল প্রয়োগ করতে হবে?",
    "options": [
      "2 N",
      "2.5 N",
      "5 N",
      "5.5 N"
    ],
    "correct_answer": "2.5 N",
    "explanation": "Soln: F = m(v-u) / t = 30×(36/3.6 - 0) / (2×60) = (30×10) / (2×60) = 10 / 4 = 2.5 N",
    "time_limit": 55
  },
  {
    "id": 4,
    "question_text": "নিচের কোনটি নিউক্লিয়াসে নিউক্লীয় উপাদানসমূহকে একত্রে আবদ্ধ করে রাখে?",
    "options": [
      "মহাকর্ষ বল",
      "তড়িৎ চৌম্বক বল",
      "সবল নিউক্লীয় বল",
      "দুর্বল নিউক্লীয় বল"
    ],
    "correct_answer": "সবল নিউক্লীয় বল",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 5,
    "question_text": "8.6 N বাতাসের বাধা অতিক্রম করে 2 kg ভরের একটি কাঁঠাল, গাছ থেকে সোজা নিচের দিকে পড়ছে। তাহলে কাঁঠালের ত্বরণ কত?",
    "options": [
      "5.55 ms⁻¹",
      "5.5 ms⁻²",
      "6.5 ms⁻²",
      "5.6 ms⁻¹"
    ],
    "correct_answer": "5.5 ms⁻²",
    "explanation": "Soln: (b); mg - F = ma ∴ a = g - F/m = 9.8 - 8.6/2 = 9.8 - 4.3 = 5.5 ms⁻²",
    "time_limit": 55
  },
  {
    "id": 6,
    "question_text": "6 kg ভরের একটি স্থির বস্তুর উপর 6 সেকেন্ড ধরে 2 নিউটন বল প্রযুক্ত হলে উক্ত বস্তুর বেগের পরিবর্তন কতটুকু হবে?",
    "options": [
      "4.0 ms⁻¹",
      "2.0 ms⁻¹",
      "0.5 ms⁻¹",
      "8.0 ms⁻¹"
    ],
    "correct_answer": "2.0 ms⁻¹",
    "explanation": "Soln: Δv = F×t / m = 2×6 / 6 = 2 ms⁻¹",
    "time_limit": 55
  },
  {
    "id": 7,
    "question_text": "ভরবেগের মাত্রা (Dimension) কোনটি?",
    "options": [
      "[MLT⁻¹]",
      "[MLT⁻²]",
      "[MLT⁻³]",
      "[ML²T⁻¹]"
    ],
    "correct_answer": "[MLT⁻¹]",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 8,
    "question_text": "বস্তুর ত্বরণ এবং ভরের মধ্যে সম্পর্ক-",
    "options": [
      "a ∝ 1/m",
      "a ∝ m",
      "a ∝ 1/m²",
      "a ∝ m²"
    ],
    "correct_answer": "a ∝ 1/m",
    "explanation": "Soln: F = ma ⇒ a = F × 1/m ; F ধ্রুবক হলে, a ∝ 1/m",
    "time_limit": 55
  },
  {
    "id": 9,
    "question_text": "বস্তুর ত্বরণ এবং বলের মধ্যে সম্পর্ক-",
    "options": [
      "a ∝ -F",
      "a ∝ -1/F",
      "a ∝ F",
      "a ∝ 1/F"
    ],
    "correct_answer": "a ∝ F",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 10,
    "question_text": "কোন বস্তুর উপর 15 N বল 3 s ধরে ক্রিয়া করলে বস্তুটির ভরবেগের পরিবর্তন কত kgms⁻¹?",
    "options": [
      "25",
      "30",
      "45",
      "50"
    ],
    "correct_answer": "45",
    "explanation": "Soln: Δp = FΔt = (15 × 3) Ns = 45 Ns = 45 kg ms⁻¹",
    "time_limit": 55
  },
  {
    "id": 11,
    "question_text": "যেখানে g = 10 ms⁻², সেখানে একটি নির্দিষ্ট বস্তুর ওজন 22 N। g = 5 ms⁻² হলে, ঐ বস্তুর ওজন ও ভর কত হবে?",
    "options": [
      "W = 22 N, m = 2.2 kg",
      "W = 11 N, m = 2.2 kg",
      "W = 11 N, m = 1.1 kg",
      "W = 22 N, m = 1.1 kg"
    ],
    "correct_answer": "W = 11 N, m = 2.2 kg",
    "explanation": "Soln: W = mg ⇒ m = 22/10 = 2.2; দ্বিতীয় ক্ষেত্রে, W' = mg = 22/10 × 5 = 22/2 = 11 N",
    "time_limit": 55
  },
  {
    "id": 12,
    "question_text": "50 kg ওজন বিশিষ্ট একজন ব্যক্তি একই সমতলে (ঘর্ষণহীন) সামনে অবস্থিত 100 kg ভরের একটি পাথরকে অন্য প্রান্তে নেওয়ার জন্য 50 N বল দিয়ে ধাক্কা দেয়। 10 s পরে পাথরটি সম্পর্কে নিচের কোন বাক্যটি সত্য?",
    "options": [
      "বেগ 5 ms⁻¹ হবে",
      "টানা 10 s ধাক্কা দেওয়া সম্ভব না",
      "বেগ 10 ms⁻¹ হবে",
      "বেগ 10 cm হবে"
    ],
    "correct_answer": "বেগ 5 ms⁻¹ হবে",
    "explanation": "Soln: ∴ a = F/m = 50/100 = 0.5 ms⁻² v = u + at = 0 + 0.5 × 10 = 5 ms⁻¹",
    "time_limit": 55
  },
  {
    "id": 13,
    "question_text": "সবল নিউক্লীয় বলের পাল্লা কত?",
    "options": [
      "10⁻¹⁶ m",
      "10⁻¹⁵ m",
      "10⁻¹⁰ m",
      "অসীম"
    ],
    "correct_answer": "10⁻¹⁵ m",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 14,
    "question_text": "5 kg ভরের একটি বস্তু 1.2 ms⁻¹ বেগে একটি দেয়ালে লম্বভাবে ধাক্কা খেয়ে 0.8 ms⁻¹ বেগে বিপরীত দিকে ফিরে আসলে বলের ঘাত কত Ns হবে?",
    "options": [
      "4",
      "5",
      "6",
      "10"
    ],
    "correct_answer": "10",
    "explanation": "Soln: J = m(v - u) = 5 [1.2 - (-0.8)] = 5(1.2 + 0.8)Ns = 10 Ns",
    "time_limit": 55
  },
  {
    "id": 15,
    "question_text": "ঘাতবলের (Impulsive force) মাত্রা কী?",
    "options": [
      "MLT⁻¹",
      "MLT⁻²",
      "ML⁻¹T⁻¹",
      "ML⁻¹T⁻²"
    ],
    "correct_answer": "MLT⁻²",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 16,
    "question_text": "তড়িৎ চৌম্বক বলের ক্ষেত্রে বাহক কণা কোনটি?",
    "options": [
      "গ্লুওন",
      "ফোটন",
      "বোসন",
      "গ্রাভিটন"
    ],
    "correct_answer": "ফোটন",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 17,
    "question_text": "বলের মাত্রা সমীকরণ কোনটি?",
    "options": [
      "[MLT⁻²]",
      "[MLT⁻¹]",
      "[ML²T⁻¹]",
      "[ML²T⁻²]"
    ],
    "correct_answer": "[MLT⁻²]",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 18,
    "question_text": "তড়িৎ চৌম্বক বলের আপেক্ষিক সবলতা কত?",
    "options": [
      "10³⁰",
      "10³⁵",
      "10³⁹",
      "10⁴¹"
    ],
    "correct_answer": "10³⁹",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 19,
    "question_text": "2 ms⁻² ত্বরণে উপরে উঠন্ত একটি লিফট এ একটি লোক দাঁড়ানোর ফলে ঊর্ধ্বমুখী বল 1180 N হলে লোকটির ভর হবে-",
    "options": [
      "50 kg",
      "100 kg",
      "80 kg",
      "কোনোটিই নয়"
    ],
    "correct_answer": "100 kg",
    "explanation": "Soln: লিফট উপরে উঠছে, ফলে ঊর্ধ্বমুখী বল, = F = m(g + a) ⇒ 1180 = m(9.8 + 2) ∴ m = 100 kg",
    "time_limit": 55
  },
  {
    "id": 20,
    "question_text": "সমান ভর বিশিষ্ট তিনটি খণ্ড A, B, C দড়ির দ্বারা চিত্রে প্রদর্শিত রূপে সংযুক্ত। খণ্ড C, F⃗ বল দ্বারা টানা হলে সম্পূর্ণ ব্যবস্থাটি ত্বরিত হয়। ঘর্ষণ উপেক্ষা করলে খণ্ড B এর উপর মোট বল হলো- [এখানে চিত্র ছিল]",
    "options": [
      "0",
      "F⃗/3",
      "F⃗/2",
      "2F⃗/3"
    ],
    "correct_answer": "F⃗/3",
    "explanation": "Soln: কার্যকর ত্বরণ, a⃗ = F⃗ / (m+m+m) = F⃗ / 3m মোট বল, ΣF⃗_B = ma⃗ = m × F⃗/3m = F⃗/3",
    "time_limit": 55
  },
  {
    "id": 21,
    "question_text": "850 kg ভরের একটি গাড়ি সমত্বরণে গতিশীল। গাড়ির উপর ক্রিয়ারত লব্ধিবল নির্ণয় করতে কোন সূত্র প্রয়োগ করতে নাসূত্র",
    "options": [
      "নিউটনের ১ম সূত্র",
      "নিউটনের ২য় সূত্র",
      "নিউটনের ৩য় সূত্র",
      "ভরবেগের নিত্যতা সূত্র"
    ],
    "correct_answer": "নিউটনের ২য় সূত্র",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 22,
    "question_text": "মহাকর্ষ বলের সাপেক্ষে দুর্বল নিউক্লীয় বলের আপেক্ষিক তীব্রতা-",
    "options": [
      "10³⁰",
      "10³⁹",
      "10⁴⁰",
      "10⁴²"
    ],
    "correct_answer": "10³⁰",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 23,
    "question_text": "3 kg ভরের একটি বন্দুক থেকে 210 g ভরের একটি গুলি 100 ms⁻¹ বেগে বের হলে বন্দুকের পশ্চাৎবেগ কত ms⁻¹?",
    "options": [
      "0.70",
      "7.0",
      "0.63",
      "6.3"
    ],
    "correct_answer": "7.0",
    "explanation": "Soln: V = mv / M = 0.21×100 / 3 = 7 ms⁻¹",
    "time_limit": 55
  },
  {
    "id": 24,
    "question_text": "4 মেট্রিক টন ভরের বোঝাই ট্রাক 19 ms⁻¹ বেগে ধাবমান। ট্রাক থেকে 50 kg ভরের 4টি বস্তা রাস্তায় পড়ে গেলে ট্রাকের বেগের পরিবর্তন কত হবে?",
    "options": [
      "20 ms⁻¹",
      "10 ms⁻¹",
      "2 ms⁻¹",
      "1 ms⁻¹"
    ],
    "correct_answer": "1 ms⁻¹",
    "explanation": "Soln: 4 মেট্রিক টন = 4000 kg M₁u₁ = M₂u₂ ⇒ 4000 × 19 = (4000 - 50 × 4) × u₂ ⇒ 4000 × 19 = 3800 × u₂ ∴ u₂ = 4000×19 / 3800 = 20 ms⁻¹ ∴ বেগের পরিবর্তন = 20 - 19 = 1 ms⁻¹",
    "time_limit": 55
  },
  {
    "id": 25,
    "question_text": "স্থির অবস্থায় থাকা একটি বস্তু বিস্ফোরিত হয়ে m₁ ও m₂ ভরের দুইটি বস্তুতে পরিণত হয়ে যথাক্রমে v₁ ও v₂ বেগে বিপরীত দিকে ধাবমান। v₁/v₂ এর অনুপাত কত?",
    "options": [
      "m₁/m₂",
      "- m₂/m₁",
      "m₂/m₁",
      "√(m₂/m₁)"
    ],
    "correct_answer": "m₂/m₁",
    "explanation": "Soln: বিস্ফোরিত হওয়ার আগে বস্তুটি স্থির অবস্থায় থাকে। তাই আদি ভরবেগের সমষ্টি শূন্য। 0 = m₁v₁ - m₂v₂ ⇒ m₁v₁ = m₂v₂ ⇒ v₁/v₂ = m₂/m₁",
    "time_limit": 55
  },
  {
    "id": 26,
    "question_text": "40 kg ও 60 kg ভরের দুটি বস্তু যথাক্রমে 10 ms⁻¹ ও 5 ms⁻¹ বেগে পরস্পর বিপরীত দিক থেকে আসার সময় একে অপরকে ধাক্কা দিল। ধাক্কার পর বস্তুদ্বয় একত্রে যুক্ত হয়ে কত বেগে চলবে?",
    "options": [
      "7 ms⁻¹",
      "1 ms⁻¹",
      "2 ms⁻¹",
      "3 ms⁻¹"
    ],
    "correct_answer": "1 ms⁻¹",
    "explanation": "Soln: m₁u₁ + m₂u₂ = (m₁ + m₂)v = 40 × 10 - 60 × 5 = (40 + 60)v ∴ v = 1 ms⁻¹",
    "time_limit": 55
  },
  {
    "id": 27,
    "question_text": "5 kg ভরের একটি রাইফেল থেকে 20 g ভরের একটি বুলেট 1000 ms⁻¹ গতিতে ছুটে যায়। পিছন থেকে রাইফেলের ধাক্কার বেগ কত?",
    "options": [
      "4000 ms⁻¹",
      "4 ms⁻¹",
      "400 ms⁻¹",
      "40 ms⁻¹"
    ],
    "correct_answer": "4 ms⁻¹",
    "explanation": "Soln: 0 = m₁v₁ + m₂v₂ ∴ v₂ = -m₁/m₂ v₁ = - (20×10⁻³) / 5 × 1000 = -4 ms⁻¹ ∴ পশ্চাৎবেগ = 4 ms⁻¹",
    "time_limit": 55
  },
  {
    "id": 28,
    "question_text": "নিজ অক্ষের সাপেক্ষে ঘূর্ণায়মান নিরেট সিলিন্ডারের ক্ষেত্রে জড়তার ভ্রামক কীসের ওপর নির্ভরশীল?",
    "options": [
      "ব্যাসার্ধ ও ভর",
      "দৈর্ঘ্য ও ভর",
      "ব্যাসার্ধ ও দৈর্ঘ্য",
      "ব্যাসার্ধ, দৈর্ঘ্য ও ভর"
    ],
    "correct_answer": "ব্যাসার্ধ ও ভর",
    "explanation": "Soln: নিজ অক্ষের সাপেক্ষে ঘূর্ণায়মান নিরেট সিলিন্ডারের জড়তার ভ্রামক, I = 1/2 Mr² এই সূত্রানুসারে ব্যাসার্ধ ও ভরের উপর নির্ভরশীল।",
    "time_limit": 55
  },
  {
    "id": 29,
    "question_text": "একটি চাকার ভর 10 kg এবং চক্রগতির ব্যাস 10 m হলে চাকাটির জড়তার ভ্রামক কত?",
    "options": [
      "2.50 kg-m²",
      "250 kg-cm²",
      "250 kg-m²",
      "2.50 gm-cm²"
    ],
    "correct_answer": "250 kg-m²",
    "explanation": "Soln: I = MK² = 10 × (10/2)² = 250 kg-m²",
    "time_limit": 55
  },
  {
    "id": 30,
    "question_text": "1 kg ভর এবং 1 m চক্রগতির ব্যাসার্ধ বিশিষ্ট একটি বৃত্তাকার চাকার কৌণিক ত্বরণ 10 rads⁻² হলে চাকাটির দ্বন্দ্বের মোমেন্ট কত?",
    "options": [
      "5 Nm",
      "8 Nm",
      "10 Nm",
      "12 Nm"
    ],
    "correct_answer": "10 Nm",
    "explanation": "Soln: τ = Iα = MK²α = (1 × 1² × 10)Nm = 10 Nm",
    "time_limit": 55
  },
  {
    "id": 31,
    "question_text": "দ্বিগুণ চক্রগতির ব্যাসার্ধের একটি বস্তুর জড়তার ভ্রামক একই রাখতে হলে, এর ভর প্রথম বস্তুর তুলনায় কত হবে?",
    "options": [
      "√2",
      "1/√2",
      "1/2",
      "1/4"
    ],
    "correct_answer": "1/4",
    "explanation": "Soln: ধরি, I₁ = M₁K₁² ও I₂ = M₂K₂² দেওয়া আছে, K₂ = 2K₁; I₁ = I₂ হতে হলে, M₂K₂² = M₁K₁² ⇒ M₂ × (2K₁)² = M₁K₁² ∴ M₂ = 1/4 M₁",
    "time_limit": 55
  },
  {
    "id": 32,
    "question_text": "একটি বস্তুর জড়তার ভ্রামক নির্ভর করে এর-",
    "options": [
      "ভর ও ঘূর্ণন অক্ষের উপর",
      "আয়তনের উপর",
      "কৌণিক বেগের উপর",
      "কৌণিক ভরবেগের উপর"
    ],
    "correct_answer": "ভর ও ঘূর্ণন অক্ষের উপর",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 33,
    "question_text": "π/5 Nm মানের একটি টর্ক 30 rpm বেগে ঘূর্ণায়মান একটি চাকাতে 10 s-এ থামিয়ে দেয়। চাকার জড়তার ভ্রামক কত kgm²?",
    "options": [
      "2",
      "2π",
      "6π",
      "15"
    ],
    "correct_answer": "2",
    "explanation": "Soln: α = (ω_f - ω_i)/t = (2πf - 0)/t = (2π×30) / (60×10) = π/10 ∴ τ = Iα ⇒ π/5 = I × π/10 ∴ I = 2",
    "time_limit": 55
  },
  {
    "id": 34,
    "question_text": "কোন সম্পর্কটি সঠিক?",
    "options": [
      "τ = I²α",
      "τ = √Iα",
      "τ = I/α",
      "τ = Iα"
    ],
    "correct_answer": "τ = Iα",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 35,
    "question_text": "কেন্দ্রীয় বল F এর প্রভাবে r ব্যাসার্ধের বৃত্তাকার পথে ঘূর্ণায়রত একটি কণার উপর ক্রিয়াশীল টর্কের মান-",
    "options": [
      "rF",
      "-rF",
      "0",
      "∞"
    ],
    "correct_answer": "0",
    "explanation": "Soln: τ = rF sin θ = rF_c sin 180° = 0",
    "time_limit": 55
  },
  {
    "id": 36,
    "question_text": "রৈখিক ভরবেগ ও কৌণিক বেগের মধ্যে সম্পর্ক কোনটি?",
    "options": [
      "L = Iω",
      "L = I/ω",
      "L = ω/I",
      "L ∝ ω"
    ],
    "correct_answer": "L = Iω",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 37,
    "question_text": "একটি বস্তু π m ব্যাসার্ধের বৃত্তাকার পথে 4.0 ms⁻¹ সমদ্রুতিতে ঘুরছে। একবার ঘুরে আসতে বস্তুটির কত সময় লাগবে?",
    "options": [
      "2/π² s",
      "2/π s",
      "π²/4 s",
      "π²/2 s"
    ],
    "correct_answer": "π²/2 s",
    "explanation": "Soln: T = 2πr/v = 2π×π / 4 = π²/2 s",
    "time_limit": 55
  },
  {
    "id": 38,
    "question_text": "একটি দেওয়াল ঘড়ির মিনিটের কাঁটার দৈর্ঘ্য 18 cm হলে, এর কৌণিক বেগ কত?",
    "options": [
      "1.74 × 10⁻³ rad s⁻¹",
      "2.74 × 10⁻³ rad s⁻¹",
      "1.47 × 10⁻³ rad s⁻¹",
      "2.47 × 10⁻³ rad s⁻¹"
    ],
    "correct_answer": "1.74 × 10⁻³ rad s⁻¹",
    "explanation": "Soln: ω = 2π/T = 2π / (60×60) = π/1800 = 3.1416/1800 ≈ 3/1800 ≈ 1/600 ≈ 0.001666 ≈ 1.74 × 10⁻³ rad s⁻¹",
    "time_limit": 55
  },
  {
    "id": 39,
    "question_text": "ঘড়ির সেকেন্ডের কাঁটার কৌণিক বেগ কত?",
    "options": [
      "π/3600 rad s⁻¹",
      "π/60 rad s⁻¹",
      "π/30 rad s⁻¹",
      "π rad s⁻¹"
    ],
    "correct_answer": "π/30 rad s⁻¹",
    "explanation": "Soln: ω = 2π/T = 2π/60 = π/30 rad s⁻¹",
    "time_limit": 55
  },
  {
    "id": 40,
    "question_text": "4 kg ভরের একটি বস্তুকে 0.2 m দৈর্ঘ্যের সুতা দিয়ে একটি নির্দিষ্ট অক্ষের চারিদিকে 2 rads⁻¹ কৌণিক বেগে ঘোরানো হলে কৌণিক ভরবেগ-",
    "options": [
      "0.64 kgm²s⁻¹",
      "0.32 kgm²s⁻¹",
      "0.32 kgm⁻²s⁻¹",
      "0.32 kg⁻¹m⁻¹s"
    ],
    "correct_answer": "0.32 kgm²s⁻¹",
    "explanation": "Soln: L = Iω = mr²ω = 4 × (0.2)² × 2 = 8 × 0.04 = 8×4 / 100 = 0.32 kgm²s⁻¹",
    "time_limit": 55
  },
  {
    "id": 41,
    "question_text": "নিচের কোনটি কৌণিক ভরবেগের মাত্রা সমীকরণ?",
    "options": [
      "M¹L¹T¹",
      "M⁰L⁰T⁰",
      "M¹L¹T⁻¹",
      "কোনটিই নয়"
    ],
    "correct_answer": "M⁰L⁰T⁰",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 42,
    "question_text": "কৌণিক বেগের মাত্রা কোনটি?",
    "options": [
      "M⁰L⁰T⁻¹",
      "ML⁻¹T",
      "M⁻¹L⁻¹T⁻¹",
      "ML⁻²T⁻¹"
    ],
    "correct_answer": "M⁰L⁰T⁻¹",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 43,
    "question_text": "একটি পাখা প্রতি মিনিটে 30 বার ঘুরছে। এর কৌণিক বেগ কত?",
    "options": [
      "π rads⁻¹",
      "2π rads⁻¹",
      "15π rads⁻¹",
      "60π rads⁻¹"
    ],
    "correct_answer": "π rads⁻¹",
    "explanation": "Soln: ω = 2πN/T = 2π×30 / 60 = π rads⁻¹",
    "time_limit": 55
  },
  {
    "id": 44,
    "question_text": "একটি ঘড়ির সেকেন্ড, মিনিট, ঘণ্টার কাঁটার কৌণিক বেগের অনুপাত-",
    "options": [
      "720 : 60 : 1",
      "1 : 60 : 720",
      "1 : 12 : 720",
      "720 : 12 : 1"
    ],
    "correct_answer": "720 : 12 : 1",
    "explanation": "Soln: ω_S : ω_M : ω_H = 2π/60 : 2π/(60×60) : 2π/(12×60×60) = 1/60 : 1/3600 : 1/(12×3600) = (12×3600)/60 : (12×3600)/3600 : (12×3600)/(12×3600) = 720 : 12 : 1",
    "time_limit": 55
  },
  {
    "id": 45,
    "question_text": "কৌণিক ভরবেগের একক কোনটি?",
    "options": [
      "kg m²s⁻¹",
      "kg m s⁻²",
      "kg ms⁻¹",
      "kg m²s⁻²"
    ],
    "correct_answer": "kg m²s⁻¹",
    "explanation": "Soln: L = mvr একক kg . ms⁻¹ . m = kgm²s⁻¹",
    "time_limit": 55
  },
  {
    "id": 46,
    "question_text": "কৌণিক ভরবেগের মাত্রা সমীকরণ কোনটি?",
    "options": [
      "ML²T⁻¹",
      "MLT⁻¹",
      "LT⁻²",
      "MLT⁻²"
    ],
    "correct_answer": "ML²T⁻¹",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 47,
    "question_text": "কোন সম্পর্কটি সঠিক?",
    "options": [
      "L⃗ = p⃗ × r⃗",
      "L⃗ = r⃗ × p⃗",
      "L⃗ = r⃗ × F⃗",
      "L⃗ = p⃗ × F⃗"
    ],
    "correct_answer": "L⃗ = r⃗ × p⃗",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 48,
    "question_text": "ঘূর্ণায়মান বস্তুর গতিশক্তি (KE)-",
    "options": [
      "1/2 Iω²",
      "1/2 Iω",
      "Iω²",
      "1/2 I²ω"
    ],
    "correct_answer": "1/2 Iω²",
    "explanation": "",
    "time_limit": 55
  },
  {
    "id": 49,
    "question_text": "একটি কণা বৃত্তের কেন্দ্রের সাথে 30° কোণে 10 kg ms⁻¹ রৈখিক ভরবেগ নিয়ে ঘুরছে। বৃত্তটির কৌণিক ভরবেগ 5 kg m²s⁻¹ হলে এর ব্যাসার্ধ কত?",
    "options": [
      "1 m",
      "2 m",
      "3 m",
      "4 m"
    ],
    "correct_answer": "1 m",
    "explanation": "Soln: L = rp sin θ ∴ r = L / p sin θ = 5 / (10 sin 30°) = 1 m",
    "time_limit": 55
  }
]
};
