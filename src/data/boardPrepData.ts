import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { BoardQuestion, BoardYearProgress, BOARD_PREP_YEARS, BD_BOARDS } from '../types/boardPrep';

// Built-in initial board questions across years and chapters with LaTeX
export const INITIAL_BOARD_QUESTIONS: BoardQuestion[] = [
  // Higher Math 1st Paper (math1), Chapter 8 (অন্তরীকরণ - index 8)
  {
    id: 'bq_math1_8_2025_1',
    subjectId: 'math1',
    chapterIndex: 8,
    year: 2025,
    board: 'ঢা.বো.',
    question_text: '$\\lim_{x \\to 0} \\frac{\\sin 5x}{x}$ এর মান কত?',
    options: ['০', '১', '৫', '$\\frac{1}{5}$'],
    correct_answer: '৫',
    explanation: '$\\lim_{x \\to 0} \\frac{\\sin 5x}{x} = \\lim_{x \\to 0} 5 \\cdot \\frac{\\sin 5x}{5x} = 5 \\times 1 = 5$',
    topic: 'লিমিট'
  },
  {
    id: 'bq_math1_8_2025_2',
    subjectId: 'math1',
    chapterIndex: 8,
    year: 2025,
    board: 'রা.বো.',
    question_text: '$y = \\ln e^{x^2}$ হলে $y_2$ এর মান কত?',
    options: ['2x', '$e^{x^2}\\ln e^{x^2}$', '2', '$e^{x^2}$'],
    correct_answer: '2',
    explanation: '$y = \\ln e^{x^2} = x^2 \\implies y_1 = 2x \\implies y_2 = 2$',
    topic: 'পর্যায়ক্রমিক অন্তরীকরণ'
  },
  {
    id: 'bq_math1_8_2024_1',
    subjectId: 'math1',
    chapterIndex: 8,
    year: 2024,
    board: 'কু.বো.',
    question_text: 'যদি $y = \\sec x$ হয় তবে $y_2 + y$ এর মান কোনটি?',
    options: ['2', '2y', '$2y^2$', '$2y^3$'],
    correct_answer: '$2y^3$',
    explanation: '$y = \\sec x \\implies y_1 = \\sec x \\tan x \\implies y_2 = \\sec x \\sec^2 x + \\tan x(\\sec x \\tan x) = \\sec^3 x + \\sec x(\\sec^2 x - 1) = y^3 + y(y^2 - 1) = 2y^3 - y \\implies y_2 + y = 2y^3$',
    topic: 'পর্যায়ক্রমিক অন্তরীকরণ'
  },
  {
    id: 'bq_math1_8_2023_1',
    subjectId: 'math1',
    chapterIndex: 8,
    year: 2023,
    board: 'য.বো.',
    question_text: '$f(x) = x(2a - x)$ এর সর্বোচ্চ মান কোনটি?',
    options: ['$2a$', '$a^2$', '$2a^2$', '$a$'],
    correct_answer: '$a^2$',
    explanation: '$f(x) = 2ax - x^2 \\implies f\'(x) = 2a - 2x = 0 \\implies x = a$। সর্বোচ্চ মান $f(a) = 2a^2 - a^2 = a^2$',
    topic: 'ফাংশনের চরমমান'
  },
  {
    id: 'bq_math1_8_2023_2',
    subjectId: 'math1',
    chapterIndex: 8,
    year: 2023,
    board: 'ঢা.বো.',
    question_text: '$y = \\frac{1}{x^3}$ বক্ররেখার $(-1, -1)$ বিন্দুতে স্পর্শকের ঢাল কত?',
    options: ['-3', '-1', '1', '3'],
    correct_answer: '-3',
    explanation: '$m = \\left.\\frac{dy}{dx}\\right|_{(-1,-1)} = -3x^{-4}|_{(-1,-1)} = -3(-1)^{-4} = -3$',
    topic: 'স্পর্শক ও ঢাল'
  },
  {
    id: 'bq_math1_8_2022_1',
    subjectId: 'math1',
    chapterIndex: 8,
    year: 2022,
    board: 'দি.বো.',
    question_text: '$x = a$ বিন্দুতে $f(x)$ ফাংশন ক্রমবর্ধমান হবে যদি-',
    options: ["$f'(a) = 0$", "$f'(a) < 0$", "$f'(a) \\neq 0$", "$f'(a) > 0$"],
    correct_answer: "$f'(a) > 0$",
    explanation: 'কোনো বিন্দুতে প্রথম অন্তরজের মান ধনাত্মক ($f\'(x) > 0$) হলে ফাংশনটি ক্রমবর্ধমান হয়।',
    topic: 'ফাংশনের চরমমান'
  },
  {
    id: 'bq_math1_8_2021_1',
    subjectId: 'math1',
    chapterIndex: 8,
    year: 2021,
    board: 'চ.বো.',
    question_text: '$\\frac{d}{dx}(\\sin^{-1} x + \\cos^{-1} x) = ?$',
    options: ['0', '1', '$\\frac{\\pi}{2}$', '$\\frac{2}{\\sqrt{1-x^2}}$'],
    correct_answer: '0',
    explanation: '$\\sin^{-1} x + \\cos^{-1} x = \\frac{\\pi}{2}$ (ধ্রুবক), তাই এর অন্তরক সহগ $\\frac{d}{dx}(\\frac{\\pi}{2}) = 0$।',
    topic: 'মৌলিক অন্তরীকরণ'
  },

  // Physics 1st Paper (phys1), Chapter 1 (ভেক্টর - index 1)
  {
    id: 'bq_phys1_1_2025_1',
    subjectId: 'phys1',
    chapterIndex: 1,
    year: 2025,
    board: 'ঢা.বো.',
    question_text: 'দুটি ভেক্টর $\\vec{A}$ ও $\\vec{B}$ পরস্পর লম্ব হওয়ার শর্ত কোনটি?',
    options: ['$\\vec{A} \\times \\vec{B} = 0$', '$\\vec{A} \\cdot \\vec{B} = 0$', '$\\vec{A} + \\vec{B} = 0$', '$|\\vec{A}| = |\\vec{B}|$'],
    correct_answer: '$\\vec{A} \\cdot \\vec{B} = 0$',
    explanation: '$\\vec{A} \\cdot \\vec{B} = AB \\cos \\theta$। যখন $\\theta = 90^\\circ$, $\\cos 90^\\circ = 0$, ফলে ডট গুণন শূন্য হয়।',
    topic: 'ভেক্টর গুণন'
  },
  {
    id: 'bq_phys1_1_2024_1',
    subjectId: 'phys1',
    chapterIndex: 1,
    year: 2024,
    board: 'রা.বো.',
    question_text: '$\\vec{A} = 2\\hat{i} + 3\\hat{j} - \\hat{k}$ ভেক্টরের মান কত?',
    options: ['$\\sqrt{12}$', '$\\sqrt{14}$', '$14$', '$4$'],
    correct_answer: '$\\sqrt{14}$',
    explanation: '$|\\vec{A}| = \\sqrt{2^2 + 3^2 + (-1)^2} = \\sqrt{4 + 9 + 1} = \\sqrt{14}$',
    topic: 'ভেক্টরের মান'
  },
  {
    id: 'bq_phys1_1_2023_1',
    subjectId: 'phys1',
    chapterIndex: 1,
    year: 2023,
    board: 'কু.বো.',
    question_text: 'দুটি সমান বলের লব্ধির মান যেকোনো একটি বলের সমান হলে বলদ্বয়ের মধ্যবর্তী কোণ কত?',
    options: ['$60^\\circ$', '$90^\\circ$', '$120^\\circ$', '$180^\\circ$'],
    correct_answer: '$120^\\circ$',
    explanation: '$R^2 = P^2 + Q^2 + 2PQ\\cos\\alpha \\implies P^2 = P^2 + P^2 + 2P^2\\cos\\alpha \\implies \\cos\\alpha = -\\frac{1}{2} \\implies \\alpha = 120^\\circ$',
    topic: 'ভেক্টর যোজন'
  },

  // Chemistry 1st Paper (chem1), Chapter 1 (গুণগত রসায়ন - index 1)
  {
    id: 'bq_chem1_1_2025_1',
    subjectId: 'chem1',
    chapterIndex: 1,
    year: 2025,
    board: 'ঢা.বো.',
    question_text: 'একটি লবণের $30^{\\circ}\\mathrm{C}$ তাপমাত্রায় দ্রাব্যতা $25$ হলে $50\\,\\mathrm{g}$ সম্পৃক্ত দ্রবণে দ্রবের পরিমাণ কত? [DB\'25]',
    options: ['$5\\,\\mathrm{g}$', '$7\\,\\mathrm{g}$', '$10\\,\\mathrm{g}$', '$25\\,\\mathrm{g}$'],
    correct_answer: '$10\\,\\mathrm{g}$',
    explanation: 'ধরি, দ্রবের পরিমাণ $= x\\,\\mathrm{g}$\nআমরা জানি, দ্রাব্যতা $=$ $$\\dfrac{\\text{দ্রবের ভর}}{\\text{দ্রাবকের ভর}} \\times 100$$\n$$\\Rightarrow 25 = \\dfrac{x}{50-x} \\times 100$$\n$$\\therefore x = 10\\,\\mathrm{g}$$',
    topic: 'দ্রাব্যতা ও দ্রাব্যতার গুণফল'
  },
  {
    id: 'bq_chem1_1_2025_2',
    subjectId: 'chem1',
    chapterIndex: 1,
    year: 2025,
    board: 'ঢা.বো.',
    question_text: 'বোর পরমাণু মডেল নিচের কোনটির ক্ষেত্রে প্রযোজ্য? [DB\'25; JB\'25; BB\'23; DB\'22; MB\'22, 21; Ctg. B\'21]',
    options: ['$\\mathrm{H^{+}}$', '$\\mathrm{He^{2+}}$', '$\\mathrm{Li^{3+}}$', '$\\mathrm{He^{+}}$'],
    correct_answer: '$\\mathrm{He^{+}}$',
    explanation: 'বোর পরমাণু মডেল শুধুমাত্র এক ইলেকট্রনবিশিষ্ট পরমাণু বা আয়নের ক্ষেত্রে প্রযোজ্য। $\\mathrm{He^{+}}$ এর ইলেকট্রন সংখ্যা $2 - 1 = 1$।',
    topic: 'বোর পরমাণু মডেল'
  },
  {
    id: 'bq_chem1_1_2025_3',
    subjectId: 'chem1',
    chapterIndex: 1,
    year: 2025,
    board: 'ঢা.বো.',
    question_text: 'বোর পরমাণু মডেল অনুসারে ইলেকট্রনের কৌণিক ভরবেগ $L = ?$ [DB\'25]',
    options: ['$\\frac{nh}{2\\pi}$', '$\\frac{nh}{\\pi}$', '$\\frac{2\\pi}{nh}$', '$\\frac{h}{2\\pi n}$'],
    correct_answer: '$\\frac{nh}{2\\pi}$',
    explanation: 'বোরের দ্বিতীয় স্বীকার্য অনুযায়ী, $mvr = \\frac{nh}{2\\pi}$, যেখানে $n = 1, 2, 3, \\dots$',
    topic: 'বোর পরমাণু মডেল'
  },
  {
    id: 'bq_chem1_1_2024_1',
    subjectId: 'chem1',
    chapterIndex: 1,
    year: 2024,
    board: 'য.বো.',
    question_text: 'কোন নীতির কারণে একই অরবিটালে দুটি ইলেকট্রনের স্পিন বিপরীতমুখী হয়?',
    options: ['আউফবাউ নীতি', 'হুন্ডের নীতি', 'পাউলির বর্জন নীতি', 'হাইজেনবার্গের অনিশ্চয়তা নীতি'],
    correct_answer: 'পাউলির বর্জন নীতি',
    explanation: 'পাউলির বর্জন নীতি অনুসারে একটি পরমাণুর যেকোনো দুটি ইলেকট্রনের চারটি কোয়ান্টাম সংখ্যার মান কখনোই একই হতে পারে না।',
    topic: 'কোয়ান্টাম সংখ্যা'
  },
  {
    id: 'bq_chem1_1_2023_1',
    subjectId: 'chem1',
    chapterIndex: 1,
    year: 2023,
    board: 'চ.বো.',
    question_text: 'একটি দ্রবণের $pH = 3$ হলে দ্রবণে $[H^+]$ আয়ন ঘনমাত্রা কত?',
    options: ['$10^{-3}\\,\\text{M}$', '$10^{-11}\\,\\text{M}$', '$3\\,\\text{M}$', '$10^3\\,\\text{M}$'],
    correct_answer: '$10^{-3}\\,\\text{M}$',
    explanation: '$pH = -\\log[H^+] \\implies [H^+] = 10^{-pH} = 10^{-3}\\,\\text{M}$',
    topic: 'pH ও বাফার দ্রবণ'
  }
];

// Helper to fetch all board questions from Firestore
export async function fetchFirestoreBoardQuestions(): Promise<BoardQuestion[]> {
  try {
    const q = query(collection(db, 'board_questions'));
    const snapshot = await getDocs(q);
    const firestoreQuestions: BoardQuestion[] = [];
    snapshot.forEach(docSnap => {
      firestoreQuestions.push({
        id: docSnap.id,
        ...docSnap.data()
      } as BoardQuestion);
    });
    return firestoreQuestions;
  } catch (err) {
    console.warn('Error fetching board questions from Firestore:', err);
    return [];
  }
}

// Helper to save a board question to Firestore
export async function saveBoardQuestionToFirestore(questionData: Omit<BoardQuestion, 'id'> & { id?: string }): Promise<string> {
  const qId = questionData.id || `bq_${questionData.subjectId}_${questionData.chapterIndex}_${questionData.year}_${Date.now()}`;
  const docRef = doc(db, 'board_questions', qId);
  await setDoc(docRef, {
    ...questionData,
    id: qId,
    updatedAt: serverTimestamp(),
    createdAt: questionData.createdAt || serverTimestamp()
  }, { merge: true });
  return qId;
}

// Helper to delete a board question from Firestore
export async function deleteBoardQuestionFromFirestore(id: string): Promise<void> {
  await deleteDoc(doc(db, 'board_questions', id));
}

// Helper to get board questions for a given subject, chapter, and optional year
export function filterBoardQuestions(
  allQuestions: BoardQuestion[],
  subjectId: string,
  chapterIndex: number,
  year?: number
): BoardQuestion[] {
  return allQuestions.filter(q => {
    const matchSub = q.subjectId === subjectId;
    const matchChap = Number(q.chapterIndex) === Number(chapterIndex);
    if (!matchSub || !matchChap) return false;
    if (year !== undefined) {
      return Number(q.year) === Number(year);
    }
    return true;
  });
}

// Helper to get progress for a specific board year
export function getBoardYearProgress(
  subjectId: string,
  chapterIndex: number,
  year: number,
  userData: any
): BoardYearProgress {
  const key = `${subjectId}_${chapterIndex}_${year}`;
  const prog = userData?.boardPrepProgress?.[key];
  if (!prog || !prog.attempts || prog.attempts === 0) {
    return {
      attempts: 0,
      bestScore: 0,
      correctCount: 0,
      totalQuestions: 0,
      status: 'not_started'
    };
  }
  return {
    attempts: prog.attempts || 1,
    bestScore: prog.bestScore || 0,
    correctCount: prog.correctCount || 0,
    totalQuestions: prog.totalQuestions || 0,
    status: prog.status || (prog.bestScore >= 80 ? 'completed' : 'in_progress'),
    lastAttemptAt: prog.lastAttemptAt
  };
}
