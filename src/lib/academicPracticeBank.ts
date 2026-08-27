import { 
  QuestionItem, 
  TeacherSourceSet, 
  TeacherSourceSetLabel 
} from '../types/questionBank';
import { Question } from '../types';
import { phy1Chap2Data } from '../data/questions_phy1_chap2';
import { phy1Chap4RawQuestions } from '../data/questions_phy1_chap4_newtonian';
import { phy1Chap6RawQuestions } from '../data/questions_phy1_chap6_gravity';

export const ACADEMIC_TEACHER_SOURCE_SETS: Array<{
  id: TeacherSourceSet;
  label: TeacherSourceSetLabel;
}> = [
  { id: 'ishak', label: 'ইসহাক স্যার' },
  { id: 'topon', label: 'তপন স্যার' },
  { id: 'pramanik', label: 'প্রামাণিক স্যার' },
  { id: 'tofazzal', label: 'তোফাজ্জল স্যার' }
];

export interface CanonicalTopicDefinition {
  topicId: string;
  topicName: string;
  keywords: string[];
}

export const CANONICAL_TOPICS_BY_CHAPTER: Record<string, CanonicalTopicDefinition[]> = {
  // Chapter 2: Vector
  'ch2': [
    {
      topicId: 'vector_basics',
      topicName: 'ভেক্টর ও ভেক্টরের প্রকারভেদ',
      keywords: ['প্রকারভেদ', 'একক ভেক্টর', 'নাল ভেক্টর', 'বিপরীত ভেক্টর', 'সদৃশ', 'অবস্থান ভেক্টর', 'স্কেলার', 'রাশি']
    },
    {
      topicId: 'vector_addition',
      topicName: 'ভেক্টর যোগ ও বিয়োজন',
      keywords: ['যোগ', 'বিয়োগ', 'যোজন', 'বিয়োজন', 'সামান্তরিক', 'লব্ধি', 'কোণ', 'বহুভুজ', 'বিভাজন', 'উপাংশ']
    },
    {
      topicId: 'river_boat_motion',
      topicName: 'নদী, নৌকা ও আপেক্ষিক বেগ',
      keywords: ['নদী', 'নৌকা', 'স্রোত', 'বৃষ্টি', 'ছাতা', 'আপেক্ষিক বেগ', 'পারাপার', 'সর্বনিম্ন দূরত্ব', 'সর্বনিম্ন সময়']
    },
    {
      topicId: 'dot_product',
      topicName: 'ডট গুণন (স্কেলার গুণন)',
      keywords: ['ডট', 'স্কেলার গুণন', 'লম্ব', 'মধ্যবর্তী কোণ', 'অভিক্ষেপ', 'উপাংশ']
    },
    {
      topicId: 'cross_product',
      topicName: 'ক্রস গুণন (ভেক্টর গুণন)',
      keywords: ['ক্রস', 'ভেক্টর গুণন', 'সমান্তরাল', 'ক্ষেত্রফল', 'ত্রিভুজ', 'সামান্তরিকের ক্ষেত্রফল', 'ডানহাতি কর্কস্ক্রু']
    },
    {
      topicId: 'vector_calculus',
      topicName: 'ভেক্টর ক্যালকুলাস (গ্রেডিয়েন্ট, ডাইভারজেন্স ও কার্ল)',
      keywords: ['ক্যালকুলাস', 'গ্রেডিয়েন্ট', 'ডাইভারজেন্স', 'কার্ল', 'সলিনয়ডাল', 'অঘূর্ণনশীল', 'ডেল', 'নেবলা', 'nabla']
    },
    {
      topicId: 'vector_coordinates',
      topicName: 'ত্রিমাত্রিক স্থানাঙ্ক ও অবস্থান ভেক্টর',
      keywords: ['স্থানাঙ্ক', 'অক্ষ', 'কোসাইন্স', 'দিক কোসাইন', 'x-অক্ষ', 'y-অক্ষ', 'z-অক্ষ']
    }
  ],
  // Chapter 4: Newtonian Mechanics
  'ch4': [
    {
      topicId: 'force_types',
      topicName: 'বল ও বলের প্রকারভেদ',
      keywords: ['প্রকারভেদ', 'মৌলিক বল', 'সংরক্ষণশীল', 'অসংরক্ষণশীল বল', 'স্পর্শ বল', 'অস্পর্শ বল']
    },
    {
      topicId: 'force_acceleration',
      topicName: 'বল ও ত্বরণ (গতির সূত্র)',
      keywords: ['ত্বরণ', 'নিউটনের গতির সূত্র', 'লিফট', 'টান', 'সুতার টান']
    },
    {
      topicId: 'momentum_conservation',
      topicName: 'ভরবেগ ও ভরবেগের সংরক্ষণ সূত্র',
      keywords: ['ভরবেগ', 'সংরক্ষণ', 'সংঘর্ষ', 'বন্দুক', 'গুলি', 'রকেট']
    },
    {
      topicId: 'impulse_force',
      topicName: 'ঘাত বল ও বলের ঘাত',
      keywords: ['ঘাত বল', 'বলের ঘাত', 'বল-সময়']
    },
    {
      topicId: 'friction_motion',
      topicName: 'ঘর্ষণ বল ও গতি',
      keywords: ['ঘর্ষণ', 'ঘর্ষণ গুণাঙ্ক', 'স্থিতি ঘর্ষণ', 'গতীয় ঘর্ষণ', 'ঘর্ষণ কোণ']
    },
    {
      topicId: 'linear_angular',
      topicName: 'রৈখিক ও কৌণিক গতির সম্পর্ক',
      keywords: ['কৌণিক বেগ', 'কৌণিক ত্বরণ', 'কৌণিক ভরবেগ', 'চাকা', 'ঘূর্ণন']
    },
    {
      topicId: 'torque_inertia',
      topicName: 'টর্ক ও জড়তার ভ্রামক',
      keywords: ['টর্ক', 'জড়তার ভ্রামক', 'চক্রগতির ব্যাসার্ধ', 'ঘূর্ণন গতিশক্তি']
    },
    {
      topicId: 'centripetal_banking',
      topicName: 'কেন্দ্রমুখী বল ও ব্যাংকিং কোণ',
      keywords: ['কেন্দ্রমুখী বল', 'ব্যাংকিং', 'রাস্তার ব্যাংকিং', 'রেললাইন', 'মোড়']
    }
  ],
  // Chapter 6: Gravitation
  'ch6': [
    {
      topicId: 'kepler_laws',
      topicName: 'কেপলারের সূত্র ও গ্রহের গতি',
      keywords: ['কেপলার', 'গ্রহের গতি', 'পর্যায়কাল', 'উপবৃত্ত']
    },
    {
      topicId: 'newton_gravitation',
      topicName: 'নিউটনের মহাকর্ষ সূত্র ও মহাকর্ষীয় ধ্রুবক',
      keywords: ['মহাকর্ষ সূত্র', 'মহাকর্ষীয় ধ্রুবক', 'মহাকর্ষ বল', 'G']
    },
    {
      topicId: 'gravity_acceleration',
      topicName: 'অভিকর্ষজ ত্বরণ (g) ও এর পরিবর্তন',
      keywords: ['অভিকর্ষজ ত্বরণ', 'উচ্চতা', 'গভীরতা', 'আহ্নিক গতি', 'অক্ষাংশ']
    },
    {
      topicId: 'gravitational_field_potential',
      topicName: 'মহাকর্ষীয় প্রাবল্য ও বিভব',
      keywords: ['প্রাবল্য', 'বিভব', 'মহাকর্ষীয় ক্ষেত্র']
    },
    {
      topicId: 'escape_velocity',
      topicName: 'মুক্তিবেগ',
      keywords: ['মুক্তিবেগ', 'Escape velocity']
    },
    {
      topicId: 'artificial_satellite',
      topicName: 'কৃত্রিম উপগ্রহ ও এর গতি',
      keywords: ['কৃত্রিম উপগ্রহ', 'ভূ-স্থির উপগ্রহ', 'কক্ষপথীয় বেগ', 'উচ্চতা']
    }
  ]
};

export function normalizeAcademicTeacherSet(raw: string | undefined | null): {
  id: TeacherSourceSet;
  label: TeacherSourceSetLabel;
} | null {
  if (!raw) return null;
  const s = raw.trim().toLowerCase();
  if (s.includes('ishak') || s.includes('ইসহাক')) {
    return { id: 'ishak', label: 'ইসহাক স্যার' };
  }
  if (s.includes('topon') || s.includes('তপন')) {
    return { id: 'topon', label: 'তপন স্যার' };
  }
  if (s.includes('pramanik') || s.includes('প্রামাণিক')) {
    return { id: 'pramanik', label: 'প্রামাণিক স্যার' };
  }
  if (s.includes('tofazzal') || s.includes('তোফাজ্জল')) {
    return { id: 'tofazzal', label: 'তোফাজ্জল স্যার' };
  }
  return null;
}

export function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '_')
    .replace(/^-+|-+$/g, '') || 'general';
}

export function resolveCanonicalTopic(
  rawTopic: string | undefined | null,
  chapterKey: string = 'ch2',
  questionText: string = ''
): { topicId: string; topicName: string } {
  if (!rawTopic && !questionText) {
    return { topicId: 'general', topicName: 'সাধারণ টপিক' };
  }

  const normalizedChapKey = chapterKey.toLowerCase().includes('4') ? 'ch4' 
    : chapterKey.toLowerCase().includes('6') ? 'ch6' 
    : 'ch2';

  const canonicalList = CANONICAL_TOPICS_BY_CHAPTER[normalizedChapKey] || [];
  const searchStr = `${rawTopic || ''} ${questionText}`.toLowerCase();

  // 1. Direct match on topicName or topicId
  for (const def of canonicalList) {
    if (
      (rawTopic && rawTopic.trim() === def.topicName) ||
      (rawTopic && rawTopic.trim() === def.topicId) ||
      searchStr.includes(def.topicName.toLowerCase())
    ) {
      return { topicId: def.topicId, topicName: def.topicName };
    }
  }

  // 2. Keyword match
  for (const def of canonicalList) {
    for (const kw of def.keywords) {
      if (searchStr.includes(kw.toLowerCase())) {
        return { topicId: def.topicId, topicName: def.topicName };
      }
    }
  }

  // Fallback to cleaned raw topic or first canonical
  if (rawTopic && rawTopic.trim() && rawTopic.trim() !== 'ভেক্টর') {
    const clean = rawTopic.replace(/^[০-৯0-9]+\.\s*/, '').trim();
    return {
      topicId: slugifyText(clean) || 'topic_custom',
      topicName: clean
    };
  }

  return canonicalList[0] 
    ? { topicId: canonicalList[0].topicId, topicName: canonicalList[0].topicName }
    : { topicId: 'general', topicName: 'সাধারণ টপিক' };
}

export function normalizeQuestionFingerprint(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[\[\].।,\-\s'"?:;()]/g, '')
    .replace(/solve.*$/gi, '')
    .trim();
}

export function toBanglaNumber(num: number | string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)] || d);
}

// Build seed questions for Academic Physics (Physics 1st Paper: Chap 2 Vector, Chap 4 Newtonian, Chap 6 Gravity)
export function buildAcademicPhysicsSeedQuestions(): QuestionItem[] {
  const items: QuestionItem[] = [];

  // 1. Physics 1st Paper - Vector (Chapter 2)
  if (phy1Chap2Data?.questions && Array.isArray(phy1Chap2Data.questions)) {
    // Distribute among teacher sets with realistic distribution
    const teacherCycle: TeacherSourceSet[] = ['ishak', 'topon', 'pramanik', 'tofazzal'];
    phy1Chap2Data.questions.forEach((q, idx) => {
      const assignedTeacherKey = teacherCycle[idx % teacherCycle.length];
      const assignedTeacher = ACADEMIC_TEACHER_SOURCE_SETS.find(t => t.id === assignedTeacherKey)!;
      const canonical = resolveCanonicalTopic(q.topic, 'ch2', q.question_text);
      const sourceQNum = q.id || idx + 1;
      const uniqueId = `academic_phy1_ch2_vector_${assignedTeacher.id}_topic_${canonical.topicId}_q${String(sourceQNum).padStart(3, '0')}`;

      items.push({
        id: uniqueId,
        version: 1,
        route: 'academic',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_ch2',
        chapterName: 'অধ্যায় ২: ভেক্টর',
        topicId: canonical.topicId,
        topicName: canonical.topicName,
        sourceSet: assignedTeacher.id,
        sourceSetLabel: assignedTeacher.label,
        sourceQuestionNumber: sourceQNum,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: String.fromCharCode(65 + oIdx), // 'A', 'B', 'C', 'D'
          text: opt
        })),
        correctOptionId: (() => {
          const cIdx = (q.options || []).findIndex(opt => opt === q.correct_answer);
          return cIdx >= 0 ? String.fromCharCode(65 + cIdx) : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || 'সঠিক উত্তর যাচাই করুন।'
        },
        estimatedSeconds: q.time_limit || 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: `${assignedTeacher.label} অনুশীলনী প্রশ্নব্যাংক`
        },
        featureTags: ['practice_bank'],
        tags: ['academic', 'physics', 'vector', assignedTeacher.id, canonical.topicId],
        status: 'published',
        createdBy: 'system_seed'
      });
    });
  }

  // 2. Physics 1st Paper - Newtonian Mechanics (Chapter 4)
  if (phy1Chap4RawQuestions && Array.isArray(phy1Chap4RawQuestions)) {
    phy1Chap4RawQuestions.forEach((q, idx) => {
      const normSet = normalizeAcademicTeacherSet(q.author) || { id: 'ishak', label: 'ইসহাক স্যার' };
      const canonical = resolveCanonicalTopic(q.topic, 'ch4', q.question_text);
      const sourceQNum = q.id || idx + 1;
      const uniqueId = `academic_phy1_ch4_newtonian_${normSet.id}_topic_${canonical.topicId}_q${String(sourceQNum).padStart(3, '0')}`;

      items.push({
        id: uniqueId,
        version: 1,
        route: 'academic',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_ch4',
        chapterName: 'অধ্যায়-০৪: নিউটনীয় বলবিদ্যা',
        topicId: canonical.topicId,
        topicName: canonical.topicName,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        sourceQuestionNumber: sourceQNum,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: String.fromCharCode(65 + oIdx),
          text: opt
        })),
        correctOptionId: (() => {
          const cIdx = (q.options || []).findIndex(opt => opt === q.correct_answer);
          return cIdx >= 0 ? String.fromCharCode(65 + cIdx) : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || 'সঠিক উত্তর যাচাই করুন।'
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: `${normSet.label} অনুশীলনী প্রশ্নব্যাংক`,
          note: q.ref
        },
        featureTags: ['practice_bank'],
        tags: ['academic', 'physics', 'newtonian', normSet.id, canonical.topicId],
        status: 'published',
        createdBy: 'system_seed'
      });
    });
  }

  // 3. Physics 1st Paper - Gravity (Chapter 6)
  if (phy1Chap6RawQuestions && Array.isArray(phy1Chap6RawQuestions)) {
    phy1Chap6RawQuestions.forEach((q, idx) => {
      const normSet = normalizeAcademicTeacherSet(q.author) || { id: 'ishak', label: 'ইসহাক স্যার' };
      const canonical = resolveCanonicalTopic(q.topic, 'ch6', q.question_text);
      const sourceQNum = q.id || idx + 1;
      const uniqueId = `academic_phy1_ch6_gravity_${normSet.id}_topic_${canonical.topicId}_q${String(sourceQNum).padStart(3, '0')}`;

      items.push({
        id: uniqueId,
        version: 1,
        route: 'academic',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_ch6',
        chapterName: 'অধ্যায়-০৬: মহাকর্ষ ও অভিকর্ষ',
        topicId: canonical.topicId,
        topicName: canonical.topicName,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        sourceQuestionNumber: sourceQNum,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: String.fromCharCode(65 + oIdx),
          text: opt
        })),
        correctOptionId: (() => {
          const cIdx = (q.options || []).findIndex(opt => opt === q.correct_answer);
          return cIdx >= 0 ? String.fromCharCode(65 + cIdx) : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || 'সঠিক উত্তর যাচাই করুন।'
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: `${normSet.label} অনুশীলনী প্রশ্নব্যাংক`,
          note: q.ref
        },
        featureTags: ['practice_bank'],
        tags: ['academic', 'physics', 'gravity', normSet.id, canonical.topicId],
        status: 'published',
        createdBy: 'system_seed'
      });
    });
  }

  return items;
}

// In-memory cache for all academic questions
let cachedAcademicQuestions: QuestionItem[] | null = null;

export function getAllAcademicQuestions(additionalQuestions: QuestionItem[] = []): QuestionItem[] {
  if (!cachedAcademicQuestions) {
    cachedAcademicQuestions = buildAcademicPhysicsSeedQuestions();
  }

  if (!additionalQuestions || additionalQuestions.length === 0) {
    return cachedAcademicQuestions;
  }

  const existingIds = new Set(cachedAcademicQuestions.map(q => q.id));
  const merged = [...cachedAcademicQuestions];
  for (const item of additionalQuestions) {
    if (item.route === 'academic' && !existingIds.has(item.id)) {
      merged.push(item);
      existingIds.add(item.id);
    }
  }
  return merged;
}

// Helper to filter questions for an Academic Chapter
export function filterAcademicChapterQuestions(
  allQuestions: QuestionItem[],
  chapterIndexOrName: number | string
): QuestionItem[] {
  return allQuestions.filter(q => {
    if (q.route !== 'academic') return false;
    if (q.subject !== 'physics' && q.subjectId !== 'phys1') return false;
    if (q.status !== 'published') return false;

    if (typeof chapterIndexOrName === 'number') {
      if (chapterIndexOrName === 1) {
        return q.chapterId === 'phys1_ch2' || (q.chapterName && q.chapterName.includes('ভেক্টর'));
      }
      if (chapterIndexOrName === 3) {
        return q.chapterId === 'phys1_ch4' || (q.chapterName && q.chapterName.includes('বলবিদ্যা'));
      }
      if (chapterIndexOrName === 5) {
        return q.chapterId === 'phys1_ch6' || (q.chapterName && q.chapterName.includes('মহাকর্ষ'));
      }
      return false;
    }

    const cStr = String(chapterIndexOrName).toLowerCase();
    if (cStr.includes('vector') || cStr.includes('ভেক্টর') || cStr.includes('ch2') || cStr.includes('২')) {
      return q.chapterId === 'phys1_ch2' || (q.chapterName && q.chapterName.includes('ভেক্টর'));
    }
    if (cStr.includes('newton') || cStr.includes('বলবিদ্যা') || cStr.includes('ch4') || cStr.includes('৪')) {
      return q.chapterId === 'phys1_ch4' || (q.chapterName && q.chapterName.includes('বলবিদ্যা'));
    }
    if (cStr.includes('gravity') || cStr.includes('মহাকর্ষ') || cStr.includes('ch6') || cStr.includes('৬')) {
      return q.chapterId === 'phys1_ch6' || (q.chapterName && q.chapterName.includes('মহাকর্ষ'));
    }
    return q.chapterName === chapterIndexOrName || q.chapterId === chapterIndexOrName;
  });
}

// Teacher set cards calculation for a chapter (omitting 0 count sets per PART 4)
export interface AcademicTeacherSetCard {
  id: TeacherSourceSet;
  name: TeacherSourceSetLabel;
  questionCount: number;
}

export function getAcademicTeacherSetsForChapter(
  chapterIndexOrName: number | string,
  allQuestions: QuestionItem[]
): AcademicTeacherSetCard[] {
  const chapterQuestions = filterAcademicChapterQuestions(allQuestions, chapterIndexOrName);

  const cards: AcademicTeacherSetCard[] = [];
  for (const tSet of ACADEMIC_TEACHER_SOURCE_SETS) {
    const count = chapterQuestions.filter(q => q.sourceSet === tSet.id).length;
    if (count > 0) {
      cards.push({
        id: tSet.id,
        name: tSet.label,
        questionCount: count
      });
    }
  }

  return cards;
}

export function getAcademicTeacherSetCounts(
  chapterIndexOrName: number | string,
  allQuestions: QuestionItem[]
): Partial<Record<TeacherSourceSet, number>> {
  const chapterQuestions = filterAcademicChapterQuestions(allQuestions, chapterIndexOrName);
  const counts: Partial<Record<TeacherSourceSet, number>> = {
    ishak: 0,
    topon: 0,
    pramanik: 0,
    tofazzal: 0,
    hazari: 0
  };

  for (const q of chapterQuestions) {
    if (q.sourceSet) {
      counts[q.sourceSet] = (counts[q.sourceSet] || 0) + 1;
    }
  }

  return counts;
}

// Canonical topic card info for selected teacher sets
export interface AcademicCanonicalTopicCard {
  topicId: string;
  topicName: string;
  questionCount: number;
  sources: TeacherSourceSetLabel[];
  sourceText: string;
}

export function getAcademicCanonicalTopicsForSelectedSets(
  chapterIndexOrName: number | string,
  selectedTeacherSets: TeacherSourceSet[],
  allQuestions: QuestionItem[]
): AcademicCanonicalTopicCard[] {
  if (!selectedTeacherSets || selectedTeacherSets.length === 0) {
    return [];
  }

  const chapterQuestions = filterAcademicChapterQuestions(allQuestions, chapterIndexOrName)
    .filter(q => q.sourceSet && selectedTeacherSets.includes(q.sourceSet));

  // Group by topicId (independent from teacher/source)
  const topicMap = new Map<string, {
    topicId: string;
    topicName: string;
    count: number;
    sourceSetMap: Map<TeacherSourceSet, TeacherSourceSetLabel>;
  }>();

  for (const q of chapterQuestions) {
    const topicId = q.topicId || slugifyText(q.topicName || 'general');
    const topicName = q.topicName || 'সাধারণ টপিক';

    if (!topicMap.has(topicId)) {
      topicMap.set(topicId, {
        topicId,
        topicName,
        count: 0,
        sourceSetMap: new Map()
      });
    }

    const entry = topicMap.get(topicId)!;
    entry.count++;
    if (q.sourceSet && q.sourceSetLabel) {
      entry.sourceSetMap.set(q.sourceSet, q.sourceSetLabel);
    }
  }

  const results: AcademicCanonicalTopicCard[] = [];
  topicMap.forEach(entry => {
    if (entry.count > 0) {
      const sourceLabels = Array.from(entry.sourceSetMap.values());
      results.push({
        topicId: entry.topicId,
        topicName: entry.topicName,
        questionCount: entry.count,
        sources: sourceLabels,
        sourceText: `উৎস: ${sourceLabels.join(', ')}`
      });
    }
  });

  return results;
}

export function getAcademicCanonicalTopicsWithCounts(
  selectedTeacherSets: TeacherSourceSet[],
  chapterIndexOrName: number | string,
  allQuestions: QuestionItem[]
): AcademicCanonicalTopicCard[] {
  return getAcademicCanonicalTopicsForSelectedSets(chapterIndexOrName, selectedTeacherSets, allQuestions);
}

// Create Mixed Practice Pool with normalized fingerprint duplicate protection (PART 6 & 7)
export function createAcademicMixedPracticePool(
  selectedTopicIds: string[] | null, // null means all topics / full chapter
  selectedTeacherSets: TeacherSourceSet[],
  chapterIndexOrName: number | string,
  allQuestions: QuestionItem[]
): {
  quizQuestions: Question[];
  totalBeforeDeduplication: number;
  totalUnique: number;
  duplicateCountPrevented: number;
} {
  const chapterQuestions = filterAcademicChapterQuestions(allQuestions, chapterIndexOrName)
    .filter(q => q.sourceSet && selectedTeacherSets.includes(q.sourceSet));

  const filtered = chapterQuestions.filter(q => {
    if (!selectedTopicIds || selectedTopicIds.length === 0) return true;
    const tId = q.topicId || slugifyText(q.topicName || 'general');
    return selectedTopicIds.includes(tId);
  });

  const totalBeforeDeduplication = filtered.length;

  // Normalized fingerprint duplicate detection (PART 7)
  const seenFingerprints = new Set<string>();
  const uniqueItems: QuestionItem[] = [];

  for (const item of filtered) {
    const fp = normalizeQuestionFingerprint(item.stem);
    if (!fp || !seenFingerprints.has(fp)) {
      if (fp) seenFingerprints.add(fp);
      uniqueItems.push(item);
    }
  }

  const totalUnique = uniqueItems.length;
  const duplicateCountPrevented = totalBeforeDeduplication - totalUnique;

  // Convert to Quiz Questions with sequential session numbering (PART 6)
  const quizQuestions: Question[] = uniqueItems.map((q, idx) => {
    const optionTexts = (q.options || []).map(o => o.text);
    const correctOpt = (q.options || []).find(o => o.id === q.correctOptionId);
    const correctText = correctOpt ? correctOpt.text : (q.options?.[0]?.text || '');

    const sourceLabel = q.sourceSetLabel || '';
    const topicLabel = q.topicName || '';
    const sourceQNum = q.sourceQuestionNumber || idx + 1;
    const secondarySourceInfo = `${sourceLabel} • ${topicLabel} • উৎস প্রশ্ন ${sourceQNum}`;

    const firstMedia = q.media?.[0];
    const imageUrl = firstMedia?.url || q.stemImageUrl;
    const altText = firstMedia?.altText;

    return {
      id: idx + 1, // Session numbering (1 to N)
      topic: q.topicName || q.chapterName || '',
      question_text: q.stem,
      options: optionTexts,
      correct_answer: correctText,
      explanation: q.explanation?.shortExplanation || '',
      time_limit: q.estimatedSeconds || 45,
      hints: q.explanation?.hint ? [q.explanation.hint] : undefined,
      author: q.sourceSetLabel,
      ref: secondarySourceInfo,
      image: imageUrl,
      stemImageUrl: imageUrl,
      media: q.media,
      hasImage: Boolean(q.hasImage || imageUrl),
      altText
    };
  });

  return {
    quizQuestions,
    totalBeforeDeduplication,
    totalUnique,
    duplicateCountPrevented
  };
}
