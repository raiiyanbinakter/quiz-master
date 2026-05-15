import { ChapterData } from "../types";

export const dcuPhysicsVectorData: ChapterData = {
  subject: "পদার্থবিজ্ঞান (ICU)",
  chapter: "ভেক্টর এক্সাম",
  questions: [
  {
    "id": 1,
    "question_text": "A⃗ = 3î + ĵ - 2k̂ ও B⃗ = î + 3ĵ + 2k̂ হলে, |AB⃗| কত?",
    "options": [
      "2√6",
      "2√2",
      "√6",
      "√2"
    ],
    "correct_answer": "2√6",
    "explanation": "Soln: AB⃗ = OB⃗ - OA⃗ = î + 3ĵ + 2k̂ - (3î + ĵ - 2k̂) = -2î + 2ĵ + 4k̂ |AB⃗| = √((-2)² + 2² + 4²) = √(4 + 4 + 16) = √24 = √(4 × 6) = 2√6",
    "time_limit": 58
  },
  {
    "id": 2,
    "question_text": "দুটি বলের লব্ধির সর্বোচ্চ ও সর্বনিম্ন মান যথাক্রমে 7 N ও 1 N। কোনো একটি বিন্দুতে বল দুইটি 90° কোণে ক্রিয়া করলে লব্ধির মান কত?",
    "options": [
      "8 N",
      "6 N",
      "5 N",
      "4 N"
    ],
    "correct_answer": "5 N",
    "explanation": "Soln: R_max = A + B = 7, R_min = A - B = 1 ∴ A = 4 N এবং B = 3 N অতএব, লব্ধি, R = √(A² + B²) = √(4² + 3²) = √25 = 5 N",
    "time_limit": 58
  },
  {
    "id": 3,
    "question_text": "দুটি সমান ভেক্টর থেকে শূন্য ভেক্টর পেতে হলে এদের মধ্যবর্তী কোণ কত হবে?",
    "options": [
      "0°",
      "45°",
      "90°",
      "180°"
    ],
    "correct_answer": "180°",
    "explanation": "",
    "time_limit": 58
  },
  {
    "id": 4,
    "question_text": "দুটি ভেক্টর রাশির লব্ধির সর্বোচ্চ মান 25 একক এবং সর্বনিম্ন মান 7 একক। ভেক্টর দুটির মান কত?",
    "options": [
      "25, 18",
      "14, 7",
      "16, 9",
      "20, 5"
    ],
    "correct_answer": "16, 9",
    "explanation": "Soln: A + B = 25, A - B = 7 ∴ A = 16, B = 9",
    "time_limit": 58
  },
  {
    "id": 5,
    "question_text": "কোনটি ভেক্টর রাশি নয়?",
    "options": [
      "তাপমাত্রা",
      "চৌম্বকবল",
      "বেগ",
      "তড়িৎ প্রাবল্য"
    ],
    "correct_answer": "তাপমাত্রা",
    "explanation": "",
    "time_limit": 58
  },
  {
    "id": 6,
    "question_text": "যদি |A⃗ + B⃗| = |A⃗ - B⃗| হয় তখন A⃗ এবং B⃗ এর মধ্যবর্তী কোণ হবে-",
    "options": [
      "π/2",
      "π/4",
      "π/3",
      "0"
    ],
    "correct_answer": "π/2",
    "explanation": "Soln: |A⃗ + B⃗| = |A⃗ - B⃗| ⇒ √(A² + B² + 2AB cos α) = √(A² + B² - 2AB cos α) ⇒ A² + B² + 2AB cos α = A² + B² - 2AB cos α ⇒ 4AB cos α = 0 ⇒ cos α = 0 ∴ α = 90° = π/2",
    "time_limit": 58
  },
  {
    "id": 7,
    "question_text": "20 এবং 50 মানবিশিষ্ট দুইটি ভেক্টর যোগ করা হলে এদের লব্ধি কত?",
    "options": [
      "10",
      "20",
      "40",
      "80"
    ],
    "correct_answer": "40",
    "explanation": "Soln: 20 এবং 50 মানবিশিষ্ট ভেক্টর দুটির সর্বোচ্চ মান = (50 + 20) একক = 70 একক এবং সর্বনিম্ন মান = (50 - 20) একক = 30 একক। লব্ধির মান 30 একক হতে 70 একক এর মাঝে হবে। ∴ একমাত্র গ্রহণযোগ্য উত্তর 40।",
    "time_limit": 58
  },
  {
    "id": 8,
    "question_text": "দুটি ভেক্টর A⃗ এবং B⃗ এর যোগফল তাদের পার্থক্যের ওপর লম্ব। নিচের কোন বিবৃতিটি অবশ্যই সত্য?",
    "options": [
      "|A⃗| = |B⃗|",
      "A⃗ · B⃗ = 0",
      "A⃗ × B⃗ = 0",
      "A⃗ = -2B⃗"
    ],
    "correct_answer": "|A⃗| = |B⃗|",
    "explanation": "Soln: (A⃗ + B⃗) · (A⃗ - B⃗) = 0 ⇒ A² + A⃗ · B⃗ - A⃗ · B⃗ - B² = 0 ⇒ A² = B² ∴ |A⃗| = |B⃗|",
    "time_limit": 58
  },
  {
    "id": 9,
    "question_text": "কোনটি ভেক্টর রাশি?",
    "options": [
      "আয়তন",
      "বৈদ্যুতিক বিভব",
      "স্বর্ণপাত ধারকযন্ত্র",
      "বৈদ্যুতিক প্রাবল্য"
    ],
    "correct_answer": "বৈদ্যুতিক প্রাবল্য",
    "explanation": "",
    "time_limit": 58
  },
  {
    "id": 10,
    "question_text": "(4î + 3ĵ) N বল প্রয়োগ করায় একটি বস্তু (-2î + 5ĵ) অবস্থান থেকে (4ĵ + 3k̂) অবস্থানে সরে যায়। কাজ কত?",
    "options": [
      "8 J",
      "11 J",
      "5 J",
      "2 J"
    ],
    "correct_answer": "5 J",
    "explanation": "Soln: W = F⃗ · s⃗ = (4î + 3ĵ) · {(4ĵ + 3k̂) - (-2î + 5ĵ)} = (4î + 3ĵ) · (2î - ĵ + 3k̂) = 8 - 3 = 5 J",
    "time_limit": 58
  },
  {
    "id": 11,
    "question_text": "(î + ĵ) এবং î এর মধ্যবর্তী কোণ কত?",
    "options": [
      "0°",
      "180°",
      "90°",
      "45°"
    ],
    "correct_answer": "45°",
    "explanation": "Soln: cos θ = ((î + ĵ) · î) / (√2 × 1) = 1/√2 ∴ θ = 45°",
    "time_limit": 58
  },
  {
    "id": 12,
    "question_text": "îx + ĵy ভেক্টরটি একটি তলের সমান্তরাল এবং c⃗ = 2î - ĵ + 5k̂ ভেক্টরটি তলটিতে লম্ব হলে একক ভেক্টর কোনটি?",
    "options": [
      "± (î+2ĵ)/√5",
      "± (î+2ĵ)/√3",
      "± (2î+ĵ)/√5",
      "± (î-2ĵ)/√3"
    ],
    "correct_answer": "± (î+2ĵ)/√5",
    "explanation": "Soln: (xî + yĵ) · (2î - ĵ + 5k̂) = 0 ⇒ 2x - y = 0 ⇒ y = 2x আবার, √(x² + y²) = 1 ⇒ x² + y² = 1 ⇒ x² + 4x² = 1 ⇒ 5x² = 1 ⇒ x² = 1/5 ∴ x = ± 1/√5 এবং y = 2 × (± 1/√5) = ± 2/√5 ∴ ভেক্টরটি হলো: ± (î + 2ĵ)/√5",
    "time_limit": 58
  },
  {
    "id": 13,
    "question_text": "î - ĵ ও ĵ - k̂ এদের মধ্যবর্তী কোণ-",
    "options": [
      "0°",
      "45°",
      "90°",
      "120°"
    ],
    "correct_answer": "120°",
    "explanation": "Soln: î - ĵ ও ĵ - k̂ এর মধ্যবর্তী কোণ = cos⁻¹( (A⃗·B⃗) / (|A⃗||B⃗|) ) = cos⁻¹( -1 / (√2 × √2) ) = 120°",
    "time_limit": 58
  },
  {
    "id": 14,
    "question_text": "দুটি ভেক্টর P⃗ ও Q⃗ এর স্কেলার গুণন 0 হলে-",
    "options": [
      "P⃗ ও Q⃗ একে অপরের উপর লম্ব",
      "P⃗ ও Q⃗ একই দিক বরাবর",
      "P⃗ ও Q⃗ বিপরীত দিক বরাবর",
      "কোনোটিই নয়"
    ],
    "correct_answer": "P⃗ ও Q⃗ একে অপরের উপর লম্ব",
    "explanation": "",
    "time_limit": 58
  },
  {
    "id": 15,
    "question_text": "a এর মান কত হলে A⃗ = 2î + 2ĵ - k̂ এবং B⃗ = aî + ĵ ভেক্টরদ্বয় পরস্পর লম্ব হবে?",
    "options": [
      "0",
      "7/4",
      "-1",
      "2"
    ],
    "correct_answer": "-1",
    "explanation": "Soln: ভেক্টরদ্বয় লম্ব হলে তাদের ডট গুণন 0 হবে। A⃗ · B⃗ = 0 ⇒ 2a + 2 + 0 = 0 ⇒ a = -1",
    "time_limit": 58
  },
  {
    "id": 16,
    "question_text": "A⃗ এবং B⃗ ভেক্টরদ্বয় কখন A⃗ · B⃗ = -AB হবে?",
    "options": [
      "ভেক্টরদ্বয় সমান্তরাল এবং একই দিকে",
      "ভেক্টরদ্বয় সমান্তরাল কিন্তু বিপরীতমুখী",
      "ভেক্টরদ্বয় পরস্পর লম্ব",
      "কোনোটিই নয়"
    ],
    "correct_answer": "ভেক্টরদ্বয় সমান্তরাল কিন্তু বিপরীতমুখী",
    "explanation": "Soln: A⃗ · B⃗ = -AB ⇒ AB cos θ = -AB ⇒ cos θ = -1 ∴ θ = 180°",
    "time_limit": 58
  },
  {
    "id": 17,
    "question_text": "যদি P⃗ = 2î + ĵ - 3k̂ এবং Q⃗ = 4ĵ - k̂ হয়, তবে তাদের স্কেলার গুণন কী হয়?",
    "options": [
      "7",
      "3",
      "9",
      "11"
    ],
    "correct_answer": "7",
    "explanation": "Soln: P⃗ · Q⃗ = (2î + ĵ - 3k̂) · (4ĵ - k̂) = 4 + 3 = 7",
    "time_limit": 58
  },
  {
    "id": 18,
    "question_text": "î × (î × ĵ) = কত?",
    "options": [
      "0",
      "ĵ",
      "-ĵ",
      "k̂"
    ],
    "correct_answer": "-ĵ",
    "explanation": "Soln: î × (î × ĵ) = î × k̂ = -ĵ",
    "time_limit": 58
  },
  {
    "id": 19,
    "question_text": "যদি C⃗ = A⃗ × B⃗ এবং D⃗ = B⃗ × A⃗ হয়, তবে C⃗ · D⃗ কত?",
    "options": [
      "CD",
      "-CD",
      "0",
      "কোনোটিই নয়"
    ],
    "correct_answer": "-CD",
    "explanation": "Soln: C⃗ = -D⃗ ∴ C⃗ · D⃗ = CD cos 180° = -CD",
    "time_limit": 58
  },
  {
    "id": 20,
    "question_text": "দুটি ভেক্টরের স্কেলার গুণফল 18 একক এবং ভেক্টরের গুণফল 6√3 একক হলে ভেক্টরদ্বয়ের মধ্যবর্তী কোণ কত?",
    "options": [
      "20°",
      "30°",
      "40°",
      "50°"
    ],
    "correct_answer": "30°",
    "explanation": "Soln: AB cos θ = 18; AB sin θ = 6√3 ∴ tan θ = (6√3) / 18 ∴ θ = tan⁻¹(1/√3) = 30°",
    "time_limit": 58
  },
  {
    "id": 21,
    "question_text": "A⃗ = 3î + ĵ + 2k̂ এবং B⃗ = 2î - 2ĵ + 4k̂। উভয় ভেক্টরের উপর অভিলম্ব ভেক্টরটি হলো-",
    "options": [
      "-8î - 8ĵ + 8k̂",
      "8î - 8ĵ - 8k̂",
      "8î - 8ĵ + 8k̂",
      "8î + 8ĵ + 8k̂"
    ],
    "correct_answer": "8î - 8ĵ - 8k̂",
    "explanation": "Soln: A⃗ × B⃗ = | î ĵ k̂ | | 3 1 2 | | 2 -2 4 | = î(4 + 4) - ĵ(12 - 4) + k̂(-6 - 2) = 8î - 8ĵ - 8k̂",
    "time_limit": 58
  },
  {
    "id": 22,
    "question_text": "P⃗ = 2î + 2ĵ - k̂ এবং Q⃗ = 6î + 3ĵ - 3k̂ ভেক্টরদ্বয়ের উভয়ের ওপর লম্ব দিকে একটি একক ভেক্টর কোনটি হবে?",
    "options": [
      "-î - 2k̂",
      "-3î - 6k̂",
      "-3(î+2k̂)/√45",
      "-3(î-2k̂)/√45"
    ],
    "correct_answer": "-3(î+2k̂)/√45",
    "explanation": "Soln: | î ĵ k̂ | | 2 2 -1 | = -3î + 0ĵ - 6k̂ | 6 3 -3 | ∴ একক ভেক্টর = ± (-3î - 6k̂) / √45 = ± -3(î + 2k̂) / √45",
    "time_limit": 58
  },
  {
    "id": 23,
    "question_text": "কোনটি y-অক্ষের উপর লম্ব হবে?",
    "options": [
      "(î × ĵ) × î",
      "(î × ĵ) × k̂",
      "(ĵ × î) × ĵ",
      "(k̂ × ĵ) × k̂"
    ],
    "correct_answer": "(ĵ × î) × ĵ",
    "explanation": "Soln: (ĵ × î) × ĵ = -k̂ × ĵ = î",
    "time_limit": 58
  },
  {
    "id": 24,
    "question_text": "A⃗ × B⃗ = B⃗ × A⃗ হলে এদের মধ্যবর্তী কোণ কত?",
    "options": [
      "π",
      "π/3",
      "π/4",
      "π/2"
    ],
    "correct_answer": "π",
    "explanation": "Soln: A⃗ × B⃗ = B⃗ × A⃗ ⇒ A⃗ × B⃗ = -A⃗ × B⃗ ⇒ 2(A⃗ × B⃗) = 0 ⇒ 2 AB sin θ = 0 ⇒ sin θ = 0 ∴ θ = 0, π",
    "time_limit": 58
  },
  {
    "id": 25,
    "question_text": "x = e⁻²ᵗ, y = 2 cos 3t এবং z = 2 sin 2t দ্বারা বর্ণিত বক্রপথে একটি কণা ভ্রমণ করে। t = 0 s সময়ে কণাটির বেগ কত হবে?",
    "options": [
      "-2î + 4k̂",
      "-2î + 6ĵ + 4k̂",
      "-î + 2î",
      "2î + 6ĵ + 4k̂"
    ],
    "correct_answer": "-2î + 4k̂",
    "explanation": "Soln: v⃗ = (dx/dt)î + (dy/dt)ĵ + (dz/dt)k̂ = -2e⁻²ᵗ î - (2 sin 3t · 3)ĵ + (2 cos 2t · 2)k̂ = -2e⁻²ᵗ î - 6 sin 3t ĵ + 4 cos 2t k̂ = -2î + 4k̂ [t = 0 s বসিয়ে]",
    "time_limit": 58
  },
  {
    "id": 26,
    "question_text": "একটি সংরক্ষণশীল বল F⃗ এর জন্য কোন সম্পর্কটি সঠিক?",
    "options": [
      "∇⃗ · F⃗ = 0",
      "∇⃗ × F⃗ = 0",
      "∇⃗ · F⃗ ≠ 0",
      "∇⃗ × F⃗ ≠ 0"
    ],
    "correct_answer": "∇⃗ × F⃗ = 0",
    "explanation": "Soln: সংরক্ষণশীল বলের কার্ল শূন্য।",
    "time_limit": 58
  },
  {
    "id": 27,
    "question_text": "কোনো অঘূর্ণনযোগ্য ভেক্টর অপেক্ষকের ডাইভারজেন্স হলো-",
    "options": [
      "∇⃗ × V⃗",
      "∇⃗ · V⃗",
      "∇⃗∇⃗",
      "∇⃗ · ∇⃗"
    ],
    "correct_answer": "∇⃗ · V⃗",
    "explanation": "",
    "time_limit": 58
  },
  {
    "id": 28,
    "question_text": "কোনো ভেক্টরের ডাইভারজেন্স 2(x + y + z) হলে ভেক্টরটি কী?",
    "options": [
      "xî + yĵ + zk̂",
      "x²î + y²ĵ + zk̂",
      "x²î + y²ĵ + z²k̂",
      "xî + y²ĵ + z²k̂"
    ],
    "correct_answer": "x²î + y²ĵ + z²k̂",
    "explanation": "Soln: ∇⃗ · (x²î + y²ĵ + z²k̂) = 2(x + y + z)",
    "time_limit": 58
  },
  {
    "id": 29,
    "question_text": "কোনো গ্যাসীয় পদার্থের আয়তন V। ∇⃗ · V⃗ ধনাত্মক হলে-",
    "options": [
      "ঘনত্ব ও আয়তন উভয়ই বৃদ্ধি পায়",
      "ঘনত্ব কমে, আয়তন বৃদ্ধি পায়",
      "ঘনত্ব ও আয়তন উভয়ই কমে যায়",
      "আয়তন কমে কিন্তু ঘনত্ব বৃদ্ধি পায়"
    ],
    "correct_answer": "ঘনত্ব কমে, আয়তন বৃদ্ধি পায়",
    "explanation": "",
    "time_limit": 58
  },
  {
    "id": 30,
    "question_text": "যদি B⃗ = x²yî + y²zĵ + z²xk̂ হয়, তবে (1, 1, 0) বিন্দুতে ∇⃗ · B⃗ এর মান নির্ণয় করো।",
    "options": [
      "2",
      "1",
      "0",
      "6"
    ],
    "correct_answer": "2",
    "explanation": "Soln: ∇⃗ · B⃗ = (∂/∂x î + ∂/∂y ĵ + ∂/∂z k̂) · (x²yî + y²zĵ + z²xk̂) = ∂/∂x (x²y) + ∂/∂y (y²z) + ∂/∂z (z²x) = 2xy + 2yz + 2zx ∴ ∇⃗ · B⃗|₍₁,₁,₀₎ = 2 + 0 + 0 = 2",
    "time_limit": 58
  },
  {
    "id": 31,
    "question_text": "m-এর মান কত হলে r⃗ = (x + z³)î + (my + x³)ĵ + (z - xy)k̂ সলিনয়ডাল হবে?",
    "options": [
      "1",
      "2",
      "-1",
      "-2"
    ],
    "correct_answer": "-2",
    "explanation": "Soln: ∇⃗ · r⃗ = (∂/∂x î + ∂/∂y ĵ + ∂/∂z k̂) · [(x + z³)î + (my + x³)ĵ + (z - xy)k̂] = ∂/∂x(x + z³) + ∂/∂y(my + x³) + ∂/∂z(z - xy) = 1 + m + 1 = 2 + m সলিনয়ডাল হলে, ∇⃗ · r⃗ = 0 হবে, 2 + m = 0 ∴ m = -2",
    "time_limit": 58
  }
]
};
