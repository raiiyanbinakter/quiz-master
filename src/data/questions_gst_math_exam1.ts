import { ChapterData } from '../types';

export const gstMathExam1Data: ChapterData = {
  subject: "GST Exam - Higher Math",
  chapter: "Exam 1 (অন্তরীকরণ)",
  questions: [
  {
    "id": 1,
    "topic": "অন্তরীকরণ",
    "question_text": "১. lim x→∞ 2ˣ (sin (y/2ˣ)) = ?",
    "options": [
      "y",
      "2",
      "2y",
      "∞"
    ],
    "correct_answer": "y",
    "explanation": "let, b = y/2ˣ ⇒ 2ˣ = y/b\n∴ x → ∞ হলে, b → 0\nlim b→0 y/b × sin b = y × lim b→0 (sin b)/b = y × 1 = y",
    "time_limit": 60
  },
  {
    "id": 2,
    "topic": "অন্তরীকরণ",
    "question_text": "২. lim x→∞ x²(2/(x⁴+1) + 3/(x³+7) + 5/(x²+1) + 6/(x²-6)) এর মান কত?",
    "options": [
      "8",
      "10",
      "11",
      "16"
    ],
    "correct_answer": "11",
    "explanation": "lim x→∞ (2/(x²+1/x²) + 3/(x+7/x²) + 5/(1+1/x²) + 6/(1-6/x²)) = 0 + 0 + 5 + 6 = 11",
    "time_limit": 60
  },
  {
    "id": 3,
    "topic": "অন্তরীকরণ",
    "question_text": "৩. lim x→0 (e⁵ˣ + e⁻⁵ˣ - 2) / x² = কত?",
    "options": [
      "-2",
      "0",
      "25",
      "50"
    ],
    "correct_answer": "25",
    "explanation": "lim x→0 (e⁵ˣ + e⁻⁵ˣ - 2) / x²\n= lim x→0 (5e⁵ˣ - 5e⁻⁵ˣ) / 2x [using L'H Rule]\n= lim x→0 (25e⁵ˣ + 25e⁻⁵ˣ) / 2 = (25 + 25) / 2 = 25 [again use L.H Rule]",
    "time_limit": 60
  },
  {
    "id": 4,
    "topic": "অন্তরীকরণ",
    "question_text": "৪. Lim x→0 ln(1-x)/x এর মান-",
    "options": [
      "0",
      "1",
      "-1",
      "∞"
    ],
    "correct_answer": "-1",
    "explanation": "[Using L'Hôpital Rule]\nLim x→0 ln(1-x)/x = Lim x→0 (-1)/(1-x) / 1 = -1",
    "time_limit": 60
  },
  {
    "id": 5,
    "topic": "অন্তরীকরণ",
    "question_text": "৫. Lim x→0 (e⁻ˣ - 1)/x এর মান-",
    "options": [
      "0",
      "1",
      "-1",
      "∞"
    ],
    "correct_answer": "-1",
    "explanation": "[Using L'Hôpital Rule]\nLim x→0 (e⁻ˣ - 1)/x = lim x→0 (-e⁻ˣ - 0)/1 = -e⁰/1 = -1/1 = -1",
    "time_limit": 60
  },
  {
    "id": 6,
    "topic": "অন্তরীকরণ",
    "question_text": "৬. Lt x→0 (3ˣ - 3⁻ˣ - 2x ln 3) / (x - sin x) এর মান হলো-",
    "options": [
      "2(ln 3)³",
      "2(ln 3)²",
      "2(ln 3)³",
      "2(log₃ e)²"
    ],
    "correct_answer": "2(ln 3)³",
    "explanation": "Shortcut: L'Hôpital;\nlim x→0 (3ˣ - 3⁻ˣ - 2x ln 3) / (x - sin x)\n= Lt x→0 (3ˣ ln 3 + 3⁻ˣ ln 3 - 2 ln 3) / (1 - cos x)\n= Lt x→0 (3ˣ (ln 3)² - 3⁻ˣ (ln 3)²) / sin x\n= Lt x→0 (3ˣ (ln 3)³ + 3⁻ˣ (ln 3)³) / cos x\n= ((ln 3)³ + (ln 3)³) / 1 = 2(ln 3)³",
    "time_limit": 60
  },
  {
    "id": 7,
    "topic": "অন্তরীকরণ",
    "question_text": "৭. lim x→0 (aˣ - bˣ) / x এর মান কোনটি?",
    "options": [
      "log e (b/a)",
      "log e (a/b)",
      "log e (b - a)",
      "log e (a - b)"
    ],
    "correct_answer": "log e (a/b)",
    "explanation": "lim x→0 (aˣ - bˣ)/x = (aˣ log e a - bˣ log e b)/1 (x = 0 বসিয়ে)\n= log e a - log e b = log e (a/b)",
    "time_limit": 60
  },
  {
    "id": 8,
    "topic": "অন্তরীকরণ",
    "question_text": "৮. x = lim y→0 (1 - e⁻²ʸ) / log(1+y), 0 < y < 1 হলে এই ফাংশনের সীমার মান-",
    "options": [
      "-1",
      "1",
      "-2",
      "2"
    ],
    "correct_answer": "2",
    "explanation": "[Using L'Hôpital Rule]\nlim y→0 (1 - e⁻²ʸ) / log(1+y) = lim y→0 (2e⁻²ʸ) / (1/(1+y)) = 2e⁻²ʸ(1+y) = 2",
    "time_limit": 60
  },
  {
    "id": 9,
    "topic": "অন্তরীকরণ",
    "question_text": "৯. Lt x→0 (sin⁻¹ x) / x = ?",
    "options": [
      "0",
      "1",
      "π",
      "কোনটিই নয়"
    ],
    "correct_answer": "1",
    "explanation": "Lt x→0 (sin⁻¹ x) / x = 1",
    "time_limit": 60
  },
  {
    "id": 10,
    "topic": "অন্তরীকরণ",
    "question_text": "১০. lim x→0 (a - √(a² - x²)) / x² = ?",
    "options": [
      "1/2a",
      "1/5a",
      "2/7a",
      "3/8a"
    ],
    "correct_answer": "1/2a",
    "explanation": "lim x→0 (a - √(a² - x²)) / x²\n= lim x→0 (2x / 2√(a² - x²)) / 2x\n= lim x→0 1 / 2√(a² - x²) = 1/2a",
    "time_limit": 60
  },
  {
    "id": 11,
    "topic": "অন্তরীকরণ",
    "question_text": "১১. lim x→0 (sin4x) / x এর মান কত?",
    "options": [
      "3",
      "5",
      "8",
      "4"
    ],
    "correct_answer": "4",
    "explanation": "lim x→0 (sin4x) / x = lim x→0 (sin4x / 4x) × 4 = 1 × 4 = 4",
    "time_limit": 60
  },
  {
    "id": 12,
    "topic": "অন্তরীকরণ",
    "question_text": "১২. lim x→0 (1+x)¹/ˣ = ?",
    "options": [
      "0",
      "1",
      "2",
      "e"
    ],
    "correct_answer": "e",
    "explanation": "lim x→0 (1+x)¹/ˣ = e",
    "time_limit": 60
  },
  {
    "id": 13,
    "topic": "অন্তরীকরণ",
    "question_text": "১৩. lim x→5 (x+2)/(x-5) = ?",
    "options": [
      "+∞",
      "-∞",
      "7",
      "অস্তিত্ব নেই"
    ],
    "correct_answer": "+∞",
    "explanation": "lim x→5 (x+2)/(x-5) = 7/0 = +∞",
    "time_limit": 60
  },
  {
    "id": 14,
    "topic": "অন্তরীকরণ",
    "question_text": "১৪. lim x→0 |x|/x = ?",
    "options": [
      "অস্তিত্ব নেই",
      "1",
      "-1",
      "∞"
    ],
    "correct_answer": "অস্তিত্ব নেই",
    "explanation": "lim x→0 |x|/x = lim x→0 ±x/x = lim x→0 (±1) যেখানে limit এর অস্তিত্ব নেই।",
    "time_limit": 60
  },
  {
    "id": 15,
    "topic": "অন্তরীকরণ",
    "question_text": "১৫. lim x→0 (sinx°)/x এর মান কোনটি?",
    "options": [
      "1",
      "0",
      "-1",
      "π/180"
    ],
    "correct_answer": "π/180",
    "explanation": "lim x→0 (sinx°)/x = lim x→0 sin(πx/180) / x = lim x→0 ((π/180) cos(πx/180)) / 1 = π/180",
    "time_limit": 60
  },
  {
    "id": 16,
    "topic": "অন্তরীকরণ",
    "question_text": "১৬. যদি lim x→0 [1 + x ln (1 + b²)]¹/ˣ = 2b sin²θ, b > 0 এবং θ ∈ (-π, π) হয় তবে θ = ?",
    "options": [
      "±π/4",
      "±π/3",
      "±π/6",
      "±π/2"
    ],
    "correct_answer": "±π/2",
    "explanation": "বামপক্ষের limit এর মান হলো e^(ln(1+b²)) = 1 + b²। \nশর্তমতে, 1 + b² = 2b sin²θ \n⇒ sin²θ = (1 + b²) / 2b। \nযেহেতু sin²θ এর মান 1 এর চেয়ে বড় হতে পারে না, তাই (1 + b²) / 2b ≤ 1 \n⇒ 1 + b² - 2b ≤ 0 \n⇒ (b - 1)² ≤ 0। \nবর্গরাশি ঋণাত্মক হতে পারে না, তাই b = 1। \nb = 1 হলে, sin²θ = (1+1)/2 = 1 ⇒ sinθ = ±1। \nযেহেতু θ ∈ (-π, π), তাই θ = ±π/2।",
    "time_limit": 60
  },
  {
    "id": 17,
    "topic": "অন্তরীকরণ",
    "question_text": "১৭. y = x + 1/x বক্ররেখাটির ঢাল শূন্য হলে x এর মান-",
    "options": [
      "-1/2",
      "1/2",
      "±1",
      "±1"
    ],
    "correct_answer": "±1",
    "explanation": "y = x + 1/x ; dy/dx = 1 - 1/x² ; বক্ররেখার ঢাল শূন্য বলে, dy/dx = 0\n⇒ 1 - 1/x² = 0 ⇒ 1 = 1/x² ⇒ x² = 1 ⇒ x = ±1",
    "time_limit": 60
  },
  {
    "id": 18,
    "topic": "অন্তরীকরণ",
    "question_text": "১৮. y = 1/x হলে yn = ?",
    "options": [
      "n! / xⁿ",
      "(n-1)! / xⁿ⁻¹",
      "1/xⁿ",
      "(-1)ⁿ (n!) / xⁿ⁺¹"
    ],
    "correct_answer": "(-1)ⁿ (n!) / xⁿ⁺¹",
    "explanation": "y = x⁻¹ ⇒ y₁ = (-1)x⁻²\n⇒ y₂ = (-1)(-2)x⁻³ = (-1)² 2! x⁻⁽²⁺¹⁾ ∴ yn = (-1)ⁿ n! / xⁿ⁺¹",
    "time_limit": 60
  },
  {
    "id": 19,
    "topic": "অন্তরীকরণ",
    "question_text": "১৯. k-এর কোন মানের জন্য y = kx(1 - x) বক্ররেখার মূলবিন্দুতে স্পর্শকটি x-অক্ষের সাথে 30° কোণ উৎপন্ন করে?",
    "options": [
      "1/√3",
      "√3",
      "√3/2",
      "1"
    ],
    "correct_answer": "1/√3",
    "explanation": "y = kx - kx² ∴ dy/dx = k - 2kx\nএখন, মূলবিন্দু (0, 0) তে dy/dx = k - 2k.0 = k\n∴ মূলবিন্দুতে স্পর্শকটি x-অক্ষের সাথে 30° কোণ উৎপন্ন করে।\n∴ dy/dx = tan 30° = 1/√3 ∴ k = 1/√3",
    "time_limit": 60
  },
  {
    "id": 20,
    "topic": "অন্তরীকরণ",
    "question_text": "২০. x এর কোন মানের জন্য y = x ln x এর লঘু মান নির্ণয় করা যাবে?",
    "options": [
      "e",
      "-e",
      "1/e",
      "-1/e"
    ],
    "correct_answer": "1/e",
    "explanation": "f(x) = x ln x ∴ f'(x) = x(1/x) + ln x = 1 + ln x ; f''(x) = 1/x\nসর্বোচ্চ বা সর্বনিম্ন মানের জন্য f'(x) = 0 ∴ 1 + ln x = 0\n⇒ ln x = -1 ⇒ x = e⁻¹ ∴ x = 1/e ; x = 1/e হলে f''(1/e) = 1/(1/e) = e > 0\n∴ x = 1/e মূল ফাংশনে বসালে, সর্বনিম্ন মান পাওয়া যায়।",
    "time_limit": 60
  },
  {
    "id": 21,
    "topic": "অন্তরীকরণ",
    "question_text": "২১. a > 1 হলে d/dx (ln aˣ) = ?",
    "options": [
      "aˣ / ln a",
      "ln a",
      "aˣ",
      "x ln a"
    ],
    "correct_answer": "ln a",
    "explanation": "d/dx (ln aˣ) = 1/aˣ × d/dx(aˣ) = 1/aˣ × aˣ × ln a = ln a",
    "time_limit": 60
  },
  {
    "id": 22,
    "topic": "অন্তরীকরণ",
    "question_text": "২২. eʸ = tan⁻¹ x হলে dx/dy = ?",
    "options": [
      "√(1+x²) tan⁻¹ x",
      "(1+x²) tan⁻¹ x",
      "√(1-x²) tan⁻¹ x",
      "(1-x²) tan⁻¹ x"
    ],
    "correct_answer": "(1+x²) tan⁻¹ x",
    "explanation": "eʸ = tan⁻¹ x ⇒ y = ln(tan⁻¹ x)\n⇒ dy/dx = 1/(tan⁻¹ x) × d/dx(tan⁻¹ x) = 1/(tan⁻¹ x) × 1/(1+x²)\n⇒ dx/dy = (1+x²) tan⁻¹ x",
    "time_limit": 60
  },
  {
    "id": 23,
    "topic": "অন্তরীকরণ",
    "question_text": "২৩. y = logₓ a⁵ হলে dy/dx = কত?",
    "options": [
      "5x ln a / (x ln x)",
      "5 ln a / x(ln x)²",
      "- ln a⁵ / (x ln x)",
      "- 5 ln a / x(ln x)²"
    ],
    "correct_answer": "- 5 ln a / x(ln x)²",
    "explanation": "y = logₓ a⁵ ⇒ y = 5 logₓ a\n⇒ y = 5 logₑ a × logₓ e ⇒ y = 5 ln a / logₑ x ⇒ y = 5 ln a / ln x\n⇒ y = 5 ln a (ln x)⁻¹ ∴ dy/dx = - 5 ln a / x(ln x)²",
    "time_limit": 60
  },
  {
    "id": 24,
    "topic": "অন্তরীকরণ",
    "question_text": "২৪. যদি f(x) = x + sin x হয়, তবে x এর কোন মানটির জন্য f'(x) = 0 হবে?",
    "options": [
      "π/5",
      "π/4",
      "π/2",
      "π"
    ],
    "correct_answer": "π",
    "explanation": "f(x) = x + sin x; f'(x) = 1 + cos x\n∴ 0 = 1 + cos x (যেহেতু f'(x) = 0) ⇒ cos x = -1 ∴ x = π",
    "time_limit": 60
  },
  {
    "id": 25,
    "topic": "অন্তরীকরণ",
    "question_text": "২৫. d(sin x) / d(cos x) = ?",
    "options": [
      "cot x",
      "-cot x",
      "sec²x",
      "cosec²x"
    ],
    "correct_answer": "-cot x",
    "explanation": "(d/dx (sin x)) / (d/dx (cos x)) = cos x / -sin x = -cot x",
    "time_limit": 60
  },
  {
    "id": 26,
    "topic": "অন্তরীকরণ",
    "question_text": "২৬. f(x) = x + 1/x, x > 0 ফাংশনের চরম বিন্দু কোনটি?",
    "options": [
      "(1, -1)",
      "(-1, -2)",
      "(1, 2)",
      "(2, 5/2)"
    ],
    "correct_answer": "(1, 2)",
    "explanation": "f(x) = x + 1/x ; f'(x) = 1 - 1/x²\nচরম বিন্দুর জন্য f'(x) = 0 ⇒ 1 - 1/x² = 0 ∴ x = 1, -1\n∴ চরমবিন্দু f(1) = 1 + 1/1 = 2 ∴ চরম বিন্দুদ্বয় (1, 2)",
    "time_limit": 60
  },
  {
    "id": 27,
    "topic": "অন্তরীকরণ",
    "question_text": "২৭. y = (x - 2)(x - 3) - x + 7 বক্ররেখাটির কোন বিন্দুতে ঢাল 4?",
    "options": [
      "(2, 3)",
      "(2, 7)",
      "(3, 7)",
      "(5, 8)"
    ],
    "correct_answer": "(5, 8)",
    "explanation": "y = (x - 2)(x - 3) - x + 7 ; dy/dx = 2x - 6\nপ্রশ্নমতে, 2x - 6 = 4 ∴ x = 5 ∴ y = 8 ∴ বিন্দুটি (5, 8)",
    "time_limit": 60
  },
  {
    "id": 28,
    "topic": "অন্তরীকরণ",
    "question_text": "২৮. eˣʸ⁺¹ = 5 হলে dy/dx এর মান-",
    "options": [
      "(ln 5) / xy",
      "- (ln 5) / x²",
      "- y / x",
      "- (ln 5) / y"
    ],
    "correct_answer": "- y / x",
    "explanation": "eˣʸ⁺¹ = 5 ⇒ ln eˣʸ⁺¹ = ln 5 ⇒ (xy + 1) ln e = ln 5\n⇒ xy + 1 = ln 5 ∴ dy/dx = - y / x",
    "time_limit": 60
  },
  {
    "id": 29,
    "topic": "অন্তরীকরণ",
    "question_text": "২৯. x এর কোন মানের জন্য f(x) = x + 1/x ফাংশনটি সর্বোচ্চ মান সম্পন্ন হবে-",
    "options": [
      "1",
      "-1",
      "2",
      "-2"
    ],
    "correct_answer": "-1",
    "explanation": "ধরি, y = x + 1/x ∴ dy/dx = 1 - 1/x²\nবৃহত্তম ও ক্ষুদ্রতম মানের জন্য, dy/dx = 0 ⇒ 1 - 1/x² = 0 ⇒ x = -1, 1\nআবার, d²y/dx² = 2/x³ ∴ x = 1 হলে, d²y/dx² = 2 > 0;\n∴ x = 1 হলে ফাংশনটির মান লঘিষ্ঠ।\nআবার, x = -1 হলে, d²y/dx² = -2 < 0 ∴ x = -1 হলে ফাংশনটির মান গরিষ্ঠ।\n∴ ফাংশনটির সর্বোচ্চ মান = -1 - 1 = -2",
    "time_limit": 60
  },
  {
    "id": 30,
    "topic": "অন্তরীকরণ",
    "question_text": "৩০. একটি বিন্দুতে y = f(x) এর সর্বোচ্চ মান থাকলে-",
    "options": [
      "d²y/dx² < 0",
      "d²y/dx² > 0",
      "d²y/dx² = 0",
      "d²y/dx² = ∞"
    ],
    "correct_answer": "d²y/dx² < 0",
    "explanation": "y = f(x) ; এর সর্বোচ্চ মান থাকবে d²y/dx² < 0",
    "time_limit": 60
  },
  {
    "id": 31,
    "topic": "অন্তরীকরণ",
    "question_text": "৩১. f(x) = ln(x/2) বক্ররেখার x = 3 বিন্দুতে স্পর্শকের ঢাল কত?",
    "options": [
      "3",
      "-3",
      "1/3",
      "-1/3"
    ],
    "correct_answer": "1/3",
    "explanation": "f(x) = ln(x/2) ; f'(x) = 1/(x/2) × 1/2 = 1/x\nঢাল f'(3) = 1/3 = m (x = 3 হলে)",
    "time_limit": 60
  },
  {
    "id": 32,
    "topic": "অন্তরীকরণ",
    "question_text": "৩২. y = tan⁻¹ √( (1 - cos x) / (1 + cos x) ) হলে dy/dx = কত?",
    "options": [
      "1",
      "0.5",
      "-0.5",
      "-1"
    ],
    "correct_answer": "0.5",
    "explanation": "y = tan⁻¹ √( 2sin²(x/2) / 2cos²(x/2) ) = tan⁻¹(tan(x/2)) = x/2\n∴ dy/dx = 1/2 = 0.5",
    "time_limit": 60
  },
  {
    "id": 33,
    "topic": "অন্তরীকরণ",
    "question_text": "৩৩. যদি x = at², y = 2at হয়, তবে dy/dx এর মান কত?",
    "options": [
      "1/2t",
      "-1/t",
      "1/t",
      "2/t"
    ],
    "correct_answer": "1/t",
    "explanation": "x = at² ⇒ dx/dt = 2at ... (i)\nএবং y = 2at ⇒ dy/dt = 2a ... (ii)\n∴ (ii) ÷ (i) ⇒ dy/dx = 2a / 2at = 1/t",
    "time_limit": 60
  },
  {
    "id": 34,
    "topic": "অন্তরীকরণ",
    "question_text": "৩৪. x এর সাপেক্ষে (1 + sin x) / (1 - sin x) এর অন্তরজ-",
    "options": [
      "sin x / (1 + cos x)²",
      "cos x / (1 + sin x)²",
      "2 cos x / (1 + sin x)²",
      "2 cos x / (1 - sin x)²"
    ],
    "correct_answer": "2 cos x / (1 - sin x)²",
    "explanation": "d/dx ( (1 + sin x) / (1 - sin x) ) = ( (1 - sin x) cos x - (1 + sin x) (-cos x) ) / (1 - sin x)²\n= ( cos x - sin x cos x + cos x + sin x cos x ) / (1 - sin x)² = 2 cos x / (1 - sin x)²",
    "time_limit": 60
  },
  {
    "id": 35,
    "topic": "অন্তরীকরণ",
    "question_text": "৩৫. y = (ln x) / x হলে d²y/dx² = ?",
    "options": [
      "(2 ln x - 3) / x³",
      "ln(x - 3) / 2x",
      "(2 ln x - 3) / x³",
      "কোনটিই নয়"
    ],
    "correct_answer": "(2 ln x - 3) / x³",
    "explanation": "dy/dx = d/dx (x⁻¹ ln x) = ln x (-x⁻²) + x⁻¹ (1/x) = 1/x² (1 - ln x)\nd²y/dx² = d/dx { 1/x² (1 - ln x) } = 1/x² (-1/x) + (1 - ln x) (-2/x³) = (-1 - 2 + 2 ln x) / x³ = (2 ln x - 3) / x³",
    "time_limit": 60
  },
  {
    "id": 36,
    "topic": "অন্তরীকরণ",
    "question_text": "৩৬. x² + y² = 20 বৃত্তের x = 2 বিন্দুতে স্পর্শকের সমীকরণ-",
    "options": [
      "x + 2y = 10",
      "x - 2y = 10",
      "2x - y = 10",
      "2x + y = 5"
    ],
    "correct_answer": "x + 2y = 10",
    "explanation": "দেওয়া আছে, x² + y² = 20 এখন, x = 2 হলে, y = 4\n2x + 2y (dy/dx) = 0 ⇒ dy/dx = -x/y ∴ (2, 4) বিন্দুতে dy/dx = -2/4 = -1/2 ∴ স্পর্শকের ঢাল = -1/2\n∴ (2, 4) বিন্দুগামী ও -1/2 ঢাল বিশিষ্ট স্পর্শকের সমীকরণ,\ny - 4 = -1/2 (x - 2) ⇒ 2y - 8 = -x + 2 ⇒ x + 2y = 10",
    "time_limit": 60
  },
  {
    "id": 37,
    "topic": "অন্তরীকরণ",
    "question_text": "৩৭. x = √y³ হলে dy/dx মান কত?",
    "options": [
      "2 / (3√y)",
      "2 / (2√y)",
      "3 / (2√y)",
      "24 / (3√y)"
    ],
    "correct_answer": "2 / (3√y)",
    "explanation": "x = √y³ = y^(3/2) ⇒ dx/dy = 3/2 y^(1/2) = 3/2 √y ∴ dy/dx = 2 / (3√y)",
    "time_limit": 60
  },
  {
    "id": 38,
    "topic": "অন্তরীকরণ",
    "question_text": "৩৮. x-এর সাপেক্ষে অন্তরজ কর: (x + 1)² (x - 1)",
    "options": [
      "x² - 2x",
      "3x² + 2x - 1",
      "2x² + 3x - 1",
      "x² - 2x + 1"
    ],
    "correct_answer": "3x² + 2x - 1",
    "explanation": "y = (x + 1)² (x - 1)\ndy/dx = (x + 1)².1 + (x - 1) 2(x + 1)\n= x² + 2x + 1 + 2x² - 2 = 3x² + 2x - 1",
    "time_limit": 60
  },
  {
    "id": 39,
    "topic": "অন্তরীকরণ",
    "question_text": "৩৯. t সময়ে কোন কণার অতিক্রান্ত দূরত্ব s = t³ - 12t² + 6t + 8 যখন কণাটির ত্বরণ শূন্য তখন এর বেগ কত?",
    "options": [
      "-48",
      "-42",
      "42",
      "48"
    ],
    "correct_answer": "-42",
    "explanation": "s = t³ - 12t² + 6t + 8 বা, v = ds/dt = 3t² - 24t + 6\nবা, a = dv/dt = 6t - 24 ; a = 0\n∴ 0 = 6t - 24 ; t = 4\n∴ v = 3 × (4)² - 24 × 4 + 6 = 48 - 96 + 6 = -42",
    "time_limit": 60
  },
  {
    "id": 40,
    "topic": "অন্তরীকরণ",
    "question_text": "৪০. x = 2 sin t, y = cos 2t, dy/dx = ?",
    "options": [
      "- tan t",
      "tan t",
      "- 2 sin t",
      "- cot t"
    ],
    "correct_answer": "- 2 sin t",
    "explanation": "x = 2 sin t, y = cos 2t\ndy/dx = (dy/dt) / (dx/dt) = (-2 sin 2t) / (2 cos t) = (- 2 × 2 sin t cos t) / (2 cos t) = - 2 sin t",
    "time_limit": 60
  },
  {
    "id": 41,
    "topic": "অন্তরীকরণ",
    "question_text": "৪১. y = logₐ x হলে dy/dx হবে-",
    "options": [
      "1/x",
      "1 / (x logₑ a)",
      "(logₑ a) / x",
      "aˣ",
      "কোনটিই নয়"
    ],
    "correct_answer": "1 / (x logₑ a)",
    "explanation": "y = logₐ x ∴ dy/dx = 1/x logₐ e = 1 / (x logₑ a)",
    "time_limit": 60
  },
  {
    "id": 42,
    "topic": "অন্তরীকরণ",
    "question_text": "৪২. 7x³ + 3 ln(x) এর অন্তরক-",
    "options": [
      "7{3x² + ln(x⁻¹)}",
      "3(7x² + x⁻¹)",
      "21(2x² + x⁻⁰)",
      "3(x² - 2x⁻²)"
    ],
    "correct_answer": "3(7x² + x⁻¹)",
    "explanation": "d/dx (7x³ + 3 ln x) = 7.3x² + 3.(1/x) = 3(7x² + x⁻¹)",
    "time_limit": 60
  },
  {
    "id": 43,
    "topic": "অন্তরীকরণ",
    "question_text": "৪৩. (x² + 1) tan⁻¹ x - x এর অন্তরক-",
    "options": [
      "1",
      "2x tan⁻¹ x",
      "(x - x²)⁻¹",
      "-eˣ / (1 + x²)"
    ],
    "correct_answer": "2x tan⁻¹ x",
    "explanation": "d/dx { (x² + 1) tan⁻¹ x - x }\n= (x² + 1) . 1/(1+x²) + tan⁻¹ x . 2x - 1 = 1 + 2x tan⁻¹ x - 1 = 2x tan⁻¹ x",
    "time_limit": 60
  },
  {
    "id": 44,
    "topic": "অন্তরীকরণ",
    "question_text": "৪৪. x² ln(x) এর অন্তরক-",
    "options": [
      "x²eˣ + 3x²eˣ",
      "x² ln(x)",
      "x + 2x ln(x)",
      "x² ln(x) + x⁻¹"
    ],
    "correct_answer": "x + 2x ln(x)",
    "explanation": "d/dx (x² ln x) = x² . 1/x + ln x . 2x = x + 2x ln x",
    "time_limit": 60
  },
  {
    "id": 45,
    "topic": "অন্তরীকরণ",
    "question_text": "৪৫. d/dx (axⁿ - bxⁿ⁺¹) = ?",
    "options": [
      "anxⁿ⁻¹ - b(n + 1)xⁿ",
      "anxn⁻² - bnxxn⁻¹",
      "(axⁿ + bnˣ)/n",
      "(anxⁿ + bnˣ⁻¹)/n"
    ],
    "correct_answer": "anxⁿ⁻¹ - b(n + 1)xⁿ",
    "explanation": "d/dx (axⁿ - bxⁿ⁺¹) = naxⁿ⁻¹ - b(n + 1)xⁿ",
    "time_limit": 60
  },
  {
    "id": 46,
    "topic": "অন্তরীকরণ",
    "question_text": "৪৬. x এর সাপেক্ষে eˣ cos x এর অন্তরীকরণ-",
    "options": [
      "eˣ (sin x + cos x)",
      "eˣ (sin x - cos x)",
      "eˣ (cos x - sin x)",
      "eˣ (cos x + sin x)"
    ],
    "correct_answer": "eˣ (cos x - sin x)",
    "explanation": "y = eˣ cos x\n∴ dy/dx = eˣ (cos x - sin x)",
    "time_limit": 60
  },
  {
    "id": 47,
    "topic": "অন্তরীকরণ",
    "question_text": "৪৭. x এর প্রেক্ষিতে √(x² + b²) এর অন্তরক সহগ-",
    "options": [
      "2x / √(x² + b²)",
      "x / (2√(x² + b²))",
      "2x² / √(x² + b²)",
      "x / √(x² + b²)"
    ],
    "correct_answer": "x / √(x² + b²)",
    "explanation": "x এর প্রেক্ষিতে √(x² + b²) এর অন্তরক সহগ।\n= 1 / (2√(x² + b²)) × 2x = x / √(x² + b²)",
    "time_limit": 60
  },
  {
    "id": 48,
    "topic": "অন্তরীকরণ",
    "question_text": "৪৮. x = a + b²t², y = c + dt² পরামিতিক সমীকরণ থেকে dy/dx = ?",
    "options": [
      "d√(x - a) / 2b²",
      "2d√(x - a) / 3b²",
      "3√(x - a) / 2b",
      "3d√(x - a) / 2b",
      "দেওয়া নেই"
    ],
    "correct_answer": "দেওয়া নেই",
    "explanation": "x = a + b²t², y = c + dt²\n∴ dy/dx = (2dt) / (2b²t) = d/b²",
    "time_limit": 60
  },
  {
    "id": 49,
    "topic": "অন্তরীকরণ",
    "question_text": "৪৯. y = 4x³ + 3x² - 6x + 1 বক্ররেখার যে সকল বিন্দুতে স্পর্শকগুলো x-অক্ষের সমান্তরাল তাদের স্থানাঙ্ক-",
    "options": [
      "(-1, 6), (1/2, -3/4)",
      "(1, -6), (1/2, -3/4)",
      "(-1, 6), (1/2, 3/4)",
      "(1, 6), (1/2, -3/4)"
    ],
    "correct_answer": "(-1, 6), (1/2, -3/4)",
    "explanation": "y = 4x³ + 3x² - 6x + 1 ⇒ dy/dx = 12x² + 6x - 6। x-অক্ষের সমান্তরাল হলে dy/dx = 0 ⇒ 2x² + x - 1 = 0 ⇒ (2x - 1)(x + 1) = 0 ⇒ x = 1/2, -1। x এর মান বসালে y = -3/4, 6 পাওয়া যায়। স্থানাঙ্ক (-1, 6) এবং (1/2, -3/4)।",
    "time_limit": 60
  },
  {
    "id": 50,
    "topic": "অন্তরীকরণ",
    "question_text": "৫০. x এর সাপেক্ষে e^(xˣ) এর অন্তরক সহগ নিম্নের কোনটি?",
    "options": [
      "e^(xˣ) x log x",
      "e^(xˣ) xˣ (1 + log x)",
      "eˣ log x",
      "xˣ e^(xˣ) (log x - 1)"
    ],
    "correct_answer": "e^(xˣ) xˣ (1 + log x)",
    "explanation": "ধরি, y = e^(xˣ) ⇒ ln y = xˣ ln e = xˣ ⇒ ln(ln y) = x ln x\nd/dx [ln(ln y)] = d/dx (x ln x) ⇒ 1/(ln y) . 1/y . dy/dx = x . 1/x + ln x\n⇒ dy/dx = y ln y (1 + ln x)\n∴ dy/dx = e^(xˣ) ln e^(xˣ) (1 + ln x) = e^(xˣ) xˣ (1 + ln x)",
    "time_limit": 60
  },
  {
    "id": 51,
    "topic": "অন্তরীকরণ",
    "question_text": "৫১. y = tan(b + ax) হলে, dy/dx = ?",
    "options": [
      "a cos²(b + ax)",
      "a sec²(b + ax)",
      "a tan²(b + ax)",
      "a cot²(b + ax)"
    ],
    "correct_answer": "a sec²(b + ax)",
    "explanation": "y = tan(b + ax) হলে, dy/dx = a sec²(b + ax)",
    "time_limit": 60
  },
  {
    "id": 52,
    "topic": "অন্তরীকরণ",
    "question_text": "৫২. x এর সাপেক্ষে tan⁻¹(ax) এর অন্তরক হবে-",
    "options": [
      "a / (1 + a²x²)",
      "x / (1 + a²x²)",
      "a / √(1 + a²x²)",
      "x / √(1 + a²x²)"
    ],
    "correct_answer": "a / (1 + a²x²)",
    "explanation": "d/dx (tan⁻¹ ax) = a / (1 + a²x²)",
    "time_limit": 60
  },
  {
    "id": 53,
    "topic": "অন্তরীকরণ",
    "question_text": "৫৩. x-এর সাপেক্ষে sin(ax+b) এর অন্তরক হবে-",
    "options": [
      "a cos(ax - b)",
      "a sin(ax + b)",
      "a cos(ax + b)",
      "cos(ax + b)"
    ],
    "correct_answer": "a cos(ax + b)",
    "explanation": "y = sin(ax + b) ∴ dy/dx = cos(ax + b) . a = a cos(ax + b)",
    "time_limit": 60
  },
  {
    "id": 54,
    "topic": "অন্তরীকরণ",
    "question_text": "৫৪. কোন বিন্দুতে অঙ্কিত স্পর্শক x-অক্ষের সমান্তরাল হলে dy/dx -এর মান-",
    "options": [
      "0",
      "1",
      "-1",
      "∞"
    ],
    "correct_answer": "0",
    "explanation": "স্পর্শক x অক্ষের সমান্তরাল হলে, dy/dx = 0",
    "time_limit": 60
  },
  {
    "id": 55,
    "topic": "অন্তরীকরণ",
    "question_text": "৫৫. y = 3ˣ হলে dy/dx = ?",
    "options": [
      "3ˣ logₑ 3",
      "logₑ 3",
      "3/logₑ x",
      "log e³ˣ"
    ],
    "correct_answer": "3ˣ logₑ 3",
    "explanation": "ধরি, y = 3ˣ ∴ dy/dx = 3ˣ logₑ 3",
    "time_limit": 60
  },
  {
    "id": 56,
    "topic": "অন্তরীকরণ",
    "question_text": "৫৬. f(x) = ³√(e^√x) হলে f'(x) হবে।",
    "options": [
      "³√(e^√x) / (2√x)",
      "³√(e^√x) / (6√x)",
      "³√(e^√x) / (4√x)",
      "³√(e^√x) / (3√x)"
    ],
    "correct_answer": "³√(e^√x) / (6√x)",
    "explanation": "f(x) = ³√(e^√x) হলে,\nf'(x) = 1/3 (e^√x)⁻²⁽³⁾ . e^√x . 1/(2√x) = (e^√x)¹⁽³⁾ / (6√x) = ³√(e^√x) / (6√x)",
    "time_limit": 60
  },
  {
    "id": 57,
    "topic": "অন্তরীকরণ",
    "question_text": "৫৭. x কে পরিবর্তনশীল ধরে x⁷ + 9 ফাংশনটির অন্তরক-",
    "options": [
      "7x⁶",
      "-7x⁶",
      "5x⁶",
      "-5x⁶"
    ],
    "correct_answer": "7x⁶",
    "explanation": "ধরি, y = x⁷ + 9 ∴ dy/dx = 7x⁶",
    "time_limit": 60
  },
  {
    "id": 58,
    "topic": "অন্তরীকরণ",
    "question_text": "৫৮. y = tan⁻¹ √x হলে dy/dx এর মান কত?",
    "options": [
      "1 / (2√x(1+x))",
      "- 1 / (√x(1+x))",
      "2 / (√x(1+x))",
      "1 / (√x(1-x))"
    ],
    "correct_answer": "1 / (2√x(1+x))",
    "explanation": "y = tan⁻¹(√x)\n∴ dy/dx = 1 / (1 + (√x)²) . 1 / (2√x) = 1 / (2√x(1+x))",
    "time_limit": 60
  },
  {
    "id": 59,
    "topic": "অন্তরীকরণ",
    "question_text": "৫৯. xᵃ yᵇ = (x-y)ᵃ⁺ᵇ হলে dy/dx = ?",
    "options": [
      "- x/y",
      "- y/x",
      "x/y",
      "y/x"
    ],
    "correct_answer": "y/x",
    "explanation": "xᵃ yᵇ = (x-y)ᵃ⁺ᵇ\n⇒ a log x + b log y = (a + b) log(x - y)\n⇒ a log x + b log y - (a + b) log(x - y) = 0\ndy/dx = - [ a/x - (a+b)/(x-y) . 1 ] / [ b/y - (a+b)/(x-y) (-1) ]\n= - [ (ax - ay - ax - bx) / x(x-y) ] / [ (bx - by + ay + by) / y(x-y) ]\n= - [ -(bx + ay) / x ] / [ (bx + ay) / y ] = y / x",
    "time_limit": 60
  },
  {
    "id": 60,
    "topic": "অন্তরীকরণ",
    "question_text": "৬০. x² + y² = 4 হলে, dy/dx = ?",
    "options": [
      "2x + 2y",
      "- x/y",
      "y/x",
      "4 - 2x"
    ],
    "correct_answer": "- x/y",
    "explanation": "d/dx (x² + y²) = d/dx (4) ⇒ 2x + 2y (dy/dx) = 0 ∴ dy/dx = - x / y",
    "time_limit": 60
  },
  {
    "id": 61,
    "topic": "অন্তরীকরণ",
    "question_text": "৬১. মূল বিন্দুতে y = ax(1 + x) বক্ররেখাটির স্পর্শক x-অক্ষের ধনাত্মক দিকের সাথে 60° কোণ উৎপন্ন করলে a এর মান কত?",
    "options": [
      "√3",
      "1/√3",
      "- 1/√3",
      "- √3"
    ],
    "correct_answer": "√3",
    "explanation": "যেহেতু রেখাটি মূল বিন্দুগামী এবং x-অক্ষের সাথে 60° কোণ আনত। সুতরাং a = tan 60° = √3",
    "time_limit": 60
  }
]
};
