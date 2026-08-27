import { 
  QuestionItem, 
  MedicalSubject, 
  TeacherSourceSet, 
  TeacherSourceSetLabel 
} from '../types/questionBank';
import { Question } from '../types';
import { syllabus as staticSyllabus } from '../data/syllabus';
import { phy1Chap4RawQuestions } from '../data/questions_phy1_chap4_newtonian';
import { phy1Chap6RawQuestions } from '../data/questions_phy1_chap6_gravity';
import { medPhys1Chap1MeasurementQuestions } from '../data/questions_med_phys1_c1_measurement';
import { medPhys1Chap2VectorQuestions } from '../data/questions_med_phys1_c2_vector';
import { medPhys1Chap3KinematicsQuestions } from '../data/questions_med_phys1_c3_kinematics';
import { medPhys1Chap5WorkPowerQuestions } from '../data/questions_med_phys1_c5_work_power';
import { medPhys1Chap7StructureQuestions } from '../data/questions_med_phys1_c7_structure';
import { medPhys1Chap8PeriodicQuestions } from '../data/questions_med_phys1_c8_periodic';
import { medPhys1Chap9WaveQuestions } from '../data/questions_med_phys1_c9_wave';
import { medPhys1Chap10GasQuestions } from '../data/questions_med_phys1_c10_gas';
import { bio1Chap1Data } from '../data/questions_bio1_chap1';
import { bio1Chap7Data } from '../data/questions_bio1_chap7';
import { chem1Chap2Data } from '../data/questions_chem1_chap2';
import { medChem1Chap2QualitativeQuestions } from '../data/questions_med_chem1_c2_qualitative';
import { medChem1Chap3PeriodicQuestions } from '../data/questions_med_chem1_c3_periodic';
import { medChem1Chap4ChemicalChangeQuestions } from '../data/questions_med_chem1_c4_chemical_change';
import {
  medBio1Chap8TissueBoardQuestions,
  medBio1Chap8TissueHasanQuestions,
  medBio1Chap8TissueAziburQuestions,
  medBio1Chap8TissueAlimQuestions
} from '../data/questions_med_bio1_c8_tissue';

export interface MedicalSubjectConfig {
  key: MedicalSubject;
  name: string;
  hasPapers: boolean;
  papers: Array<{
    key: 'first' | 'second' | 'not_applicable';
    label: string;
    syllabusId?: string;
  }>;
}

export const MEDICAL_PRACTICE_SUBJECTS: MedicalSubjectConfig[] = [
  {
    key: 'physics',
    name: 'পদার্থবিজ্ঞান',
    hasPapers: true,
    papers: [
      { key: 'first', label: '১ম পত্র', syllabusId: 'phys1' },
      { key: 'second', label: '২য় পত্র', syllabusId: 'phys2' }
    ]
  },
  {
    key: 'chemistry',
    name: 'রসায়ন',
    hasPapers: true,
    papers: [
      { key: 'first', label: '১ম পত্র', syllabusId: 'chem1' },
      { key: 'second', label: '২য় পত্র', syllabusId: 'chem2' }
    ]
  },
  {
    key: 'biology',
    name: 'জীববিজ্ঞান',
    hasPapers: true,
    papers: [
      { key: 'first', label: '১ম পত্র', syllabusId: 'bio1' },
      { key: 'second', label: '২য় পত্র', syllabusId: 'bio2' }
    ]
  },
  {
    key: 'english',
    name: 'ইংরেজি',
    hasPapers: false,
    papers: [
      { key: 'not_applicable', label: 'ইংরেজি', syllabusId: 'english' }
    ]
  },
  {
    key: 'general_knowledge',
    name: 'সাধারণ জ্ঞান',
    hasPapers: false,
    papers: [
      { key: 'not_applicable', label: 'সাধারণ জ্ঞান', syllabusId: 'gk' }
    ]
  }
];

export const TEACHER_SOURCE_SETS: Array<{
  id: TeacherSourceSet;
  label: TeacherSourceSetLabel;
}> = [
  { id: 'ishak', label: 'ইসহাক স্যার' },
  { id: 'topon', label: 'তপন স্যার' },
  { id: 'pramanik', label: 'প্রামাণিক স্যার' },
  { id: 'hazari', label: 'হাজারী স্যার' },
  { id: 'kabir', label: 'কবীর স্যার' },
  { id: 'guha', label: 'গুহ স্যার' },
  { id: 'lincoln', label: 'লিংকন স্যার' },
  { id: 'board', label: 'বোর্ড প্রশ্ন' },
  { id: 'abul_hasan', label: 'আবুল হাসান স্যার' },
  { id: 'gazi_ajmol', label: 'গাজী আজমল স্যার' },
  { id: 'azibur', label: 'আজিবুর স্যার' },
  { id: 'alim', label: 'আলীম স্যার' },
  { id: 'majeda', label: 'মাজেদা বেগম ম্যাডাম' }
];

export function normalizeTeacherSet(raw: string | undefined | null): {
  id: TeacherSourceSet;
  label: TeacherSourceSetLabel;
} | null {
  if (!raw) return null;
  const s = raw.trim().toLowerCase();
  if (s.includes('board') || s.includes('বোর্ড')) {
    return { id: 'board', label: 'বোর্ড প্রশ্ন' };
  }
  if (s.includes('ishak') || s.includes('ইসহাক')) {
    return { id: 'ishak', label: 'ইসহাক স্যার' };
  }
  if (s.includes('topon') || s.includes('তপন')) {
    return { id: 'topon', label: 'তপন স্যার' };
  }
  if (s.includes('pramanik') || s.includes('প্রামাণিক') || s.includes('তোফাজ্জল')) {
    return { id: 'pramanik', label: 'প্রামাণিক স্যার' };
  }
  if (s.includes('hazari') || s.includes('হাজারী') || s.includes('হাজারি')) {
    return { id: 'hazari', label: 'হাজারী স্যার' };
  }
  if (s.includes('kabir') || s.includes('কবীর') || s.includes('কবির')) {
    return { id: 'kabir', label: 'কবীর স্যার' };
  }
  if (s.includes('guha') || s.includes('গুহ')) {
    return { id: 'guha', label: 'গুহ স্যার' };
  }
  if (s.includes('lincoln') || s.includes('লিংকন') || s.includes('লিঙ্কন')) {
    return { id: 'lincoln', label: 'লিংকন স্যার' };
  }
  if (s.includes('hasan') || s.includes('হাসান')) {
    return { id: 'abul_hasan', label: 'আবুল হাসান স্যার' };
  }
  if (s.includes('ajmol') || s.includes('আজমল')) {
    return { id: 'gazi_ajmol', label: 'গাজী আজমল স্যার' };
  }
  if (s.includes('azibur') || s.includes('আজিবুর') || s.includes('আজিমুর')) {
    return { id: 'azibur', label: 'আজিবুর স্যার' };
  }
  if (s.includes('alim') || s.includes('আলীম') || s.includes('আলিম')) {
    return { id: 'alim', label: 'আলীম স্যার' };
  }
  if (s.includes('majeda') || s.includes('মাজেদা')) {
    return { id: 'majeda', label: 'মাজেদা বেগম ম্যাডাম' };
  }
  return null;
}

export function toBanglaNumber(num: number | string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)] || d);
}

// Convert raw question formats to QuestionItem
function buildSeedPracticeQuestions(): QuestionItem[] {
  const items: QuestionItem[] = [];

  // 0. Physics 1st Paper - Physical World & Measurement / ভৌতজগৎ ও পরিমাপ (Chapter 1)
  if (Array.isArray(medPhys1Chap1MeasurementQuestions)) {
    medPhys1Chap1MeasurementQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author || q.ref || 'ইসহাক স্যার') || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c1_${normSet.id}_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c1',
        chapterName: 'ভৌতজগৎ ও পরিমাপ',
        topicName: q.topic,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} ভৌতজগৎ ও পরিমাপ সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 1. Physics 1st Paper - Newtonian Mechanics (Chapter 4)
  if (phy1Chap4RawQuestions && Array.isArray(phy1Chap4RawQuestions)) {
    phy1Chap4RawQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author) || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c4_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c4',
        chapterName: 'নিউটনীয় বলবিদ্যা',
        topicName: q.topic || 'বল ও বলের প্রকারভেদ',
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} এর সমাধান ও টেক্সটবুক রেফারেন্স`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 2. Physics 1st Paper - Gravity (Chapter 6)
  if (phy1Chap6RawQuestions && Array.isArray(phy1Chap6RawQuestions)) {
    phy1Chap6RawQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author) || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c6_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c6',
        chapterName: 'মহাকর্ষ ও অভিকর্ষ',
        topicName: q.topic || 'কেপলারের সূত্র ও গ্রহের গতি',
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} এর সমাধান ও টেক্সটবুক রেফারেন্স`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 3. Physics 1st Paper - Vector (Chapter 2)
  if (medPhys1Chap2VectorQuestions && Array.isArray(medPhys1Chap2VectorQuestions)) {
    medPhys1Chap2VectorQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author) || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c2_${normSet.id}_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c2',
        chapterName: 'ভেক্টর',
        topicName: q.topic,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} ভেক্টর সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 3.1 Physics 1st Paper - Kinematics / গতিবিদ্যা (Chapter 3)
  if (medPhys1Chap3KinematicsQuestions && Array.isArray(medPhys1Chap3KinematicsQuestions)) {
    medPhys1Chap3KinematicsQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author) || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c3_${normSet.id}_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c3',
        chapterName: 'গতিবিদ্যা',
        topicName: q.topic,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} গতিবিদ্যা সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 3.1 Physics 1st Paper - Work, Energy & Power (Chapter 5)
  if (Array.isArray(medPhys1Chap5WorkPowerQuestions)) {
    medPhys1Chap5WorkPowerQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author || q.ref || 'ইসহাক স্যার') || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c5_${normSet.id}_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c5',
        chapterName: 'কাজ, শক্তি ও ক্ষমতা',
        topicName: q.topic,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} কাজ, শক্তি ও ক্ষমতা সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 3.2 Physics 1st Paper - Structural Properties of Matter (Chapter 7)
  if (Array.isArray(medPhys1Chap7StructureQuestions)) {
    medPhys1Chap7StructureQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author || q.ref || 'ইসহাক স্যার') || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c7_${normSet.id}_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c7',
        chapterName: 'পদার্থের গাঠনিক ধর্ম',
        topicName: q.topic,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} পদার্থের গাঠনিক ধর্ম সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 3.3 Physics 1st Paper - Periodic Motion (Chapter 8)
  if (Array.isArray(medPhys1Chap8PeriodicQuestions)) {
    medPhys1Chap8PeriodicQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author || q.ref || 'ইসহাক স্যার') || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c8_${normSet.id}_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c8',
        chapterName: 'পর্যাবৃত্তিক গতি',
        topicName: q.topic,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} পর্যাবৃত্তিক গতি সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 3.4 Physics 1st Paper - Wave / তরঙ্গ (Chapter 9)
  if (Array.isArray(medPhys1Chap9WaveQuestions)) {
    medPhys1Chap9WaveQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author || q.ref || 'ইসহাক স্যার') || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c9_${normSet.id}_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c9',
        chapterName: 'তরঙ্গ',
        topicName: q.topic,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} তরঙ্গ সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 3.5 Physics 1st Paper - Ideal Gas & Kinetic Theory / আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব (Chapter 10)
  if (Array.isArray(medPhys1Chap10GasQuestions)) {
    medPhys1Chap10GasQuestions.forEach((q, idx) => {
      const normSet = normalizeTeacherSet(q.author || q.ref || 'ইসহাক স্যার') || { id: 'ishak', label: 'ইসহাক স্যার' };
      items.push({
        id: `seed_med_phys1_c10_${normSet.id}_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'physics',
        subjectId: 'phys1',
        paper: 'first',
        chapterId: 'phys1_c10',
        chapterName: 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব',
        topicName: q.topic,
        sourceSet: normSet.id,
        sourceSetLabel: normSet.label,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${normSet.label} আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: normSet.label
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'physics', 'practice_bank', normSet.id],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 4. Chemistry 1st Paper - Qualitative Chemistry / গুণগত রসায়ন (Chapter 2)
  if (Array.isArray(medChem1Chap2QualitativeQuestions)) {
    medChem1Chap2QualitativeQuestions.forEach((q) => {
      items.push(q);
    });
  }

  // 4.1 Chemistry 1st Paper - Periodic Properties & Chemical Bond / মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন (Chapter 3)
  if (Array.isArray(medChem1Chap3PeriodicQuestions)) {
    medChem1Chap3PeriodicQuestions.forEach((q) => {
      items.push(q);
    });
  }

  // 4.2 Chemistry 1st Paper - Chemical Change / রাসায়নিক পরিবর্তন (Chapter 4)
  if (Array.isArray(medChem1Chap4ChemicalChangeQuestions)) {
    medChem1Chap4ChemicalChangeQuestions.forEach((q) => {
      items.push(q);
    });
  }

  // 5. Biology 1st Paper - Tissue & Tissue System / টিস্যু ও টিস্যুতন্ত্র (Chapter 8) - Board Question Sector
  if (Array.isArray(medBio1Chap8TissueBoardQuestions)) {
    medBio1Chap8TissueBoardQuestions.forEach((q, idx) => {
      items.push({
        id: `seed_med_bio1_c8_board_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'biology',
        subjectId: 'bio1',
        paper: 'first',
        chapterId: 'bio1_c8',
        chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
        topicName: q.topic,
        sourceSet: 'board',
        sourceSetLabel: 'বোর্ড প্রশ্ন',
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `টিস্যু ও টিস্যুতন্ত্র বোর্ড প্রশ্ন সমাধান`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: 'বোর্ড প্রশ্ন'
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'biology', 'practice_bank', 'board', 'tissue', 'bio1_c8'],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 5B. Biology 1st Paper - Tissue & Tissue System / টিস্যু ও টিস্যুতন্ত্র (Chapter 8) - Abul Hasan Sir Sector
  if (Array.isArray(medBio1Chap8TissueHasanQuestions)) {
    medBio1Chap8TissueHasanQuestions.forEach((q, idx) => {
      items.push({
        id: `seed_med_bio1_c8_hasan_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'biology',
        subjectId: 'bio1',
        paper: 'first',
        chapterId: 'bio1_c8',
        chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
        topicName: q.topic,
        sourceSet: 'abul_hasan',
        sourceSetLabel: 'আবুল হাসান স্যার',
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `টিস্যু ও টিস্যুতন্ত্র - হাসান স্যার ব্যাখ্যা`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: 'আবুল হাসান স্যার'
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'biology', 'practice_bank', 'abul_hasan', 'tissue', 'bio1_c8'],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 5C. Biology 1st Paper - Tissue & Tissue System / টিস্যু ও টিস্যুতন্ত্র (Chapter 8) - Azibur Sir Sector
  if (Array.isArray(medBio1Chap8TissueAziburQuestions) && medBio1Chap8TissueAziburQuestions.length > 0) {
    medBio1Chap8TissueAziburQuestions.forEach((q, idx) => {
      items.push({
        id: `seed_med_bio1_c8_azibur_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'biology',
        subjectId: 'bio1',
        paper: 'first',
        chapterId: 'bio1_c8',
        chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
        topicName: q.topic,
        sourceSet: 'azibur',
        sourceSetLabel: 'আজিবুর স্যার',
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `টিস্যু ও টিস্যুতন্ত্র - আজিবুর স্যার ব্যাখ্যা`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: 'আজিবুর স্যার'
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'biology', 'practice_bank', 'azibur', 'tissue', 'bio1_c8'],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 5D. Biology 1st Paper - Tissue & Tissue System / টিস্যু ও টিস্যুতন্ত্র (Chapter 8) - Alim Sir Sector
  if (Array.isArray(medBio1Chap8TissueAlimQuestions) && medBio1Chap8TissueAlimQuestions.length > 0) {
    medBio1Chap8TissueAlimQuestions.forEach((q, idx) => {
      items.push({
        id: `seed_med_bio1_c8_alim_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'biology',
        subjectId: 'bio1',
        paper: 'first',
        chapterId: 'bio1_c8',
        chapterName: 'টিস্যু ও টিস্যুতন্ত্র',
        topicName: q.topic,
        sourceSet: 'alim',
        sourceSetLabel: 'আলীম স্যার',
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `টিস্যু ও টিস্যুতন্ত্র - আলীম স্যার ব্যাখ্যা`,
          detailedExplanation: q.ref ? `উৎস / রেফারেন্স: ${q.ref}` : undefined
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: 'আলীম স্যার'
        },
        featureTags: ['practice_bank'],
        tags: ['medical', 'biology', 'practice_bank', 'alim', 'tissue', 'bio1_c8'],
        status: 'published',
        createdBy: 'system'
      });
    });
  }

  // 7. English - Parts of Speech & Medical Vocabulary
  const englishSeeds = [
    {
      q: 'Which of the following is a noun form of the word "Diagnose"?',
      opts: ['Diagnosing', 'Diagnosis', 'Diagnostic', 'Diagnostician'],
      ans: 'B',
      topic: 'Parts of Speech & Identification',
      author: 'ishak' as TeacherSourceSet,
      exp: '"Diagnosis" is the noun form denoting the identification of the nature of an illness.'
    },
    {
      q: 'Choose the correct preposition: "The patient is suffering ____ acute malaria."',
      opts: ['with', 'from', 'by', 'of'],
      ans: 'B',
      topic: 'Preposition & Idioms',
      author: 'topon' as TeacherSourceSet,
      exp: 'The verb "suffer" takes the preposition "from" when referring to diseases or pain.'
    },
    {
      q: 'What is the synonym of the medical term "Benign"?',
      opts: ['Harmless', 'Fatal', 'Malignant', 'Severe'],
      ans: 'A',
      topic: 'Synonym, Antonym & Vocabulary',
      author: 'pramanik' as TeacherSourceSet,
      exp: '"Benign" in medical terminology refers to a mild, non-cancerous condition (harmless).'
    }
  ];

  englishSeeds.forEach((item, idx) => {
    const teacherLabel = TEACHER_SOURCE_SETS.find(t => t.id === item.author)!.label;
    items.push({
      id: `seed_med_eng_${idx + 1}`,
      version: 1,
      route: 'medical',
      subject: 'english',
      paper: 'not_applicable',
      chapterName: item.topic,
      topicName: item.topic,
      sourceSet: item.author,
      sourceSetLabel: teacherLabel,
      questionType: 'single_choice',
      stem: item.q,
      options: item.opts.map((opt, oIdx) => ({
        id: ['A', 'B', 'C', 'D'][oIdx],
        text: opt
      })),
      correctOptionId: item.ans,
      explanation: {
        shortExplanation: item.exp
      },
      estimatedSeconds: 45,
      difficulty: 'standard',
      language: 'en',
      source: {
        status: 'original_practice',
        title: teacherLabel
      },
      featureTags: ['practice_bank'],
      tags: ['medical', 'english', 'practice_bank', item.author],
      status: 'published',
      createdBy: 'system'
    });
  });

  // 8. General Knowledge - History & Health Sector
  const gkSeeds = [
    {
      q: 'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU) কোন সালে প্রতিষ্ঠিত হয়?',
      opts: ['১৯৯৬', '১৯৯৮', '২০০১', '১৯৯১'],
      ans: 'B',
      topic: 'স্বাস্থ্য খাত ও চিকিৎসা বিষয়ক তথ্য',
      author: 'ishak' as TeacherSourceSet,
      exp: '১৯৯৮ সালের ৩০ এপ্রিল আইপিজিএমআর (IPGMR)-কে দেশের প্রথম মেডিকেল বিশ্ববিদ্যালয়ে রূপান্তর করা হয়।'
    },
    {
      q: 'বিশ্ব স্বাস্থ্য সংস্থা (WHO)-এর সদর দপ্তর কোথায় অবস্থিত?',
      opts: ['লন্ডন', 'নিউইয়র্ক', 'জেনেভা', 'প্যারিস'],
      ans: 'C',
      topic: 'আন্তর্জাতিক বিষয়াবলী & সংস্থা',
      author: 'topon' as TeacherSourceSet,
      exp: 'সুইজারল্যান্ডের জেনেভায় বিশ্ব স্বাস্থ্য সংস্থা (WHO) এর সদর দপ্তর অবস্থিত।'
    },
    {
      q: 'মুক্তিযুদ্ধে বাংলাদেশকে কয়টি সেক্টরে বিভক্ত করা হয়েছিল?',
      opts: ['৮টি', '৯টি', '১১টি', '১২টি'],
      ans: 'C',
      topic: 'ইতিহাস ও মুক্তিযুদ্ধ',
      author: 'pramanik' as TeacherSourceSet,
      exp: '১৯৭১ সালের মুক্তিযুদ্ধে সমগ্র বাংলাদেশকে ১১টি প্রশাসনিক সেক্টরে ভাগ করা হয়েছিল।'
    }
  ];

  gkSeeds.forEach((item, idx) => {
    const teacherLabel = TEACHER_SOURCE_SETS.find(t => t.id === item.author)!.label;
    items.push({
      id: `seed_med_gk_${idx + 1}`,
      version: 1,
      route: 'medical',
      subject: 'general_knowledge',
      paper: 'not_applicable',
      chapterName: item.topic,
      topicName: item.topic,
      sourceSet: item.author,
      sourceSetLabel: teacherLabel,
      questionType: 'single_choice',
      stem: item.q,
      options: item.opts.map((opt, oIdx) => ({
        id: ['A', 'B', 'C', 'D'][oIdx],
        text: opt
      })),
      correctOptionId: item.ans,
      explanation: {
        shortExplanation: item.exp
      },
      estimatedSeconds: 45,
      difficulty: 'standard',
      language: 'bn',
      source: {
        status: 'original_practice',
        title: teacherLabel
      },
      featureTags: ['practice_bank'],
      tags: ['medical', 'general_knowledge', 'practice_bank', item.author],
      status: 'published',
      createdBy: 'system'
    });
  });

  return items;
}

// Safe Archive of removed Medical Practice Biology and Chemistry questions.
// Note: Their underlying datasets (bio1Chap1Data, bio1Chap7Data, chem1Chap2Data) are completely preserved
// and remain functional for Academic Pathway, Subject Tests, Model Tests, etc.
export function buildRemovedMedicalPracticeQuestionsArchive(): QuestionItem[] {
  const items: QuestionItem[] = [];

  // Biology 1st Paper - Cell & Structure (Chapter 1)
  if (bio1Chap1Data?.questions && Array.isArray(bio1Chap1Data.questions)) {
    const bio1Topics = [
      'কোষ প্রাচীর ও প্লাজমামেমব্রেন',
      'সাইটোপ্লাজমীয় অঙ্গাণু',
      'নিউক্লিয়াস ও ক্রোমোজোম',
      'ডিএনএ ও আরএনএ'
    ];
    const teachers: TeacherSourceSet[] = ['ishak', 'topon', 'pramanik'];

    bio1Chap1Data.questions.forEach((q, idx) => {
      const teacherKey = teachers[idx % 3];
      const teacherLabel = TEACHER_SOURCE_SETS.find(t => t.id === teacherKey)!.label;
      const topicName = bio1Topics[idx % bio1Topics.length];

      items.push({
        id: `removed_med_bio1_c1_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'biology',
        subjectId: 'bio1',
        paper: 'first',
        chapterId: 'bio1_c1',
        chapterName: 'কোষ ও এর গঠন',
        topicName,
        sourceSet: teacherKey,
        sourceSetLabel: teacherLabel,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${teacherLabel} কোষ ও এর গঠন সমাধান`
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: teacherLabel,
          note: 'Medical Practice থেকে সরানো হয়েছে'
        },
        featureTags: [], // Removed 'practice_bank'
        tags: ['medical', 'biology', 'removed_from_practice_bank', teacherKey],
        status: 'archived',
        changeNote: 'Medical Practice থেকে সরানো হয়েছে',
        createdBy: 'system'
      });
    });
  }

  // Biology 1st Paper - Gymnosperm & Angiosperm (Chapter 7)
  if (bio1Chap7Data?.questions && Array.isArray(bio1Chap7Data.questions)) {
    const bio7Topics = [
      'নগ্নবীজী উদ্ভিদ',
      'আবৃতবীজী উদ্ভিদের বৈশিষ্ট্য',
      'পুষ্প সংকেত ও পুষ্পপ্রতীক',
      'মালভেসি ও পোয়েসি গোত্র'
    ];
    const teachers: TeacherSourceSet[] = ['ishak', 'topon', 'pramanik'];

    bio1Chap7Data.questions.forEach((q, idx) => {
      const teacherKey = teachers[idx % 3];
      const teacherLabel = TEACHER_SOURCE_SETS.find(t => t.id === teacherKey)!.label;
      const topicName = bio7Topics[idx % bio7Topics.length];

      items.push({
        id: `removed_med_bio1_c7_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'biology',
        subjectId: 'bio1',
        paper: 'first',
        chapterId: 'bio1_c7',
        chapterName: 'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ',
        topicName,
        sourceSet: teacherKey,
        sourceSetLabel: teacherLabel,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${teacherLabel} নগ্নবীজী ও আবৃতবীজী সমাধান`
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: teacherLabel,
          note: 'Medical Practice থেকে সরানো হয়েছে'
        },
        featureTags: [], // Removed 'practice_bank'
        tags: ['medical', 'biology', 'removed_from_practice_bank', teacherKey],
        status: 'archived',
        changeNote: 'Medical Practice থেকে সরানো হয়েছে',
        createdBy: 'system'
      });
    });
  }

  // Chemistry 1st Paper - Qualitative Chemistry (Chapter 2)
  if (chem1Chap2Data?.questions && Array.isArray(chem1Chap2Data.questions)) {
    const chem2Topics = [
      'পরমাণুর মডেল',
      'কোয়ান্টাম সংখ্যা',
      'বর্ণালী ও বোর তত্ত্ব',
      'দ্রাব্যতা ও দ্রাব্যতা গুণফল',
      'আয়ন সনাক্তকরণ'
    ];
    const teachers: TeacherSourceSet[] = ['ishak', 'topon', 'pramanik'];

    chem1Chap2Data.questions.forEach((q, idx) => {
      const teacherKey = teachers[idx % 3];
      const teacherLabel = TEACHER_SOURCE_SETS.find(t => t.id === teacherKey)!.label;
      const topicName = chem2Topics[idx % chem2Topics.length];

      items.push({
        id: `removed_med_chem1_c2_${q.id || idx + 1}`,
        version: 1,
        route: 'medical',
        subject: 'chemistry',
        subjectId: 'chem1',
        paper: 'first',
        chapterId: 'chem1_c2',
        chapterName: 'গুণগত রসায়ন',
        topicName,
        sourceSet: teacherKey,
        sourceSetLabel: teacherLabel,
        questionType: 'single_choice',
        stem: q.question_text,
        options: (q.options || []).map((opt, oIdx) => ({
          id: ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1),
          text: opt
        })),
        correctOptionId: (() => {
          const optIdx = (q.options || []).indexOf(q.correct_answer);
          return optIdx >= 0 ? ['A', 'B', 'C', 'D'][optIdx] : 'A';
        })(),
        explanation: {
          shortExplanation: q.explanation || `${teacherLabel} গুণগত রসায়ন সমাধান`
        },
        estimatedSeconds: 45,
        difficulty: 'standard',
        language: 'bn',
        source: {
          status: 'original_practice',
          title: teacherLabel,
          note: 'Medical Practice থেকে সরানো হয়েছে'
        },
        featureTags: [], // Removed 'practice_bank'
        tags: ['medical', 'chemistry', 'removed_from_practice_bank', teacherKey],
        status: 'archived',
        changeNote: 'Medical Practice থেকে সরানো হয়েছে',
        createdBy: 'system'
      });
    });
  }

  return items;
}

export const REMOVED_MEDICAL_PRACTICE_QUESTIONS_ARCHIVE = buildRemovedMedicalPracticeQuestionsArchive();

export function getMedicalPracticeRemovedStats() {
  const bioCount = REMOVED_MEDICAL_PRACTICE_QUESTIONS_ARCHIVE.filter(q => q.subject === 'biology').length;
  const chemCount = REMOVED_MEDICAL_PRACTICE_QUESTIONS_ARCHIVE.filter(q => q.subject === 'chemistry').length;
  return {
    biologyCount: bioCount,
    chemistryCount: chemCount,
    totalRemovedCount: bioCount + chemCount,
    items: REMOVED_MEDICAL_PRACTICE_QUESTIONS_ARCHIVE
  };
}

export const INITIAL_MEDICAL_PRACTICE_QUESTIONS = buildSeedPracticeQuestions();

// Master filter for Medical Practice Bank questions
export function filterMedicalPracticeQuestions(
  allQuestions: QuestionItem[],
  filters: {
    subject?: MedicalSubject;
    paper?: 'first' | 'second' | 'not_applicable';
    chapterName?: string;
    selectedSourceSets?: TeacherSourceSet[];
    selectedTopics?: string[];
  }
): QuestionItem[] {
  return (allQuestions || []).filter(q => {
    // 1. Strict Route & Feature check
    if (q.route !== 'medical') return false;
    if (!q.featureTags || !q.featureTags.includes('practice_bank')) return false;
    if (q.status !== 'published') return false;

    // 2. Reject Past Questions or other tags
    if (q.featureTags.includes('past_questions')) return false;

    // 3. Subject check
    if (filters.subject && q.subject !== filters.subject) return false;

    // 4. Paper check (for subjects with papers)
    if (filters.paper && filters.paper !== 'not_applicable') {
      if (q.paper && q.paper !== filters.paper && q.paper !== 'not_applicable') return false;
    }

    // 5. Chapter check
    if (filters.chapterName) {
      const qChap = (q.chapterName || '').trim().toLowerCase().replace(/[\s\p{P}]/gu, '');
      const fChap = filters.chapterName.trim().toLowerCase().replace(/[\s\p{P}]/gu, '');
      if (qChap !== fChap && !qChap.includes(fChap) && !fChap.includes(qChap)) {
        return false;
      }
    }

    // 6. Source Set check (Must be Ishak, Topon, or Pramanik)
    if (filters.selectedSourceSets && filters.selectedSourceSets.length > 0) {
      if (!q.sourceSet || !filters.selectedSourceSets.includes(q.sourceSet)) {
        return false;
      }
    }

    // 7. Topic check
    if (filters.selectedTopics && filters.selectedTopics.length > 0) {
      const qTopic = (q.topicName || '').trim();
      if (!filters.selectedTopics.includes(qTopic)) {
        return false;
      }
    }

    return true;
  });
}

// Chapter metadata for chapter selection
export interface MedicalChapterInfo {
  chapterNumber: number;
  chapterNumberLabel: string;
  chapterName: string;
  chapterId: string;
  publishedQuestionCount: number;
  availableSourceSets: TeacherSourceSet[];
}

export function getChaptersForSelection(
  subject: MedicalSubject,
  paper: 'first' | 'second' | 'not_applicable',
  allQuestions: QuestionItem[]
): MedicalChapterInfo[] {
  const subConfig = MEDICAL_PRACTICE_SUBJECTS.find(s => s.key === subject);
  const paperConfig = subConfig?.papers.find(p => p.key === paper) || subConfig?.papers[0];
  const syllabusId = paperConfig?.syllabusId;

  const syllabusSubject = staticSyllabus.find(s => s.id === syllabusId);

  // Strict published medical practice questions filter
  const publishedQuestions = (allQuestions || []).filter(q => {
    if (q.route !== 'medical') return false;
    if (!q.featureTags || !q.featureTags.includes('practice_bank')) return false;
    if (q.status !== 'published') return false;
    if (q.subject !== subject) return false;
    if (paper !== 'not_applicable' && q.paper && q.paper !== 'not_applicable' && q.paper !== paper) return false;
    return true;
  });

  if (syllabusSubject && Array.isArray(syllabusSubject.chapters) && syllabusSubject.chapters.length > 0) {
    return syllabusSubject.chapters.map((chapStr, idx) => {
      // Parse leading digit if present: e.g. "১. ভৌতজগৎ ও পরিমাপ" or "২. ভেক্টর"
      const match = chapStr.match(/^([০-৯0-9]+)\.\s*(.+)$/);
      let chapNum = idx + 1;
      let cleanName = chapStr.trim();

      if (match) {
        const banglaToEng: Record<string, string> = {
          '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
          '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
        };
        const numStr = match[1].replace(/[০-৯]/g, d => banglaToEng[d] || d);
        const parsed = parseInt(numStr, 10);
        if (!isNaN(parsed)) {
          chapNum = parsed;
        }
        cleanName = match[2].trim();
      }

      const chapterId = `${syllabusId}_c${chapNum}`;
      const normCleanName = cleanName.toLowerCase().replace(/[\s\p{P}]/gu, '');

      // Strict matching for this specific chapter
      const matching = publishedQuestions.filter(q => {
        // Match by chapterId (e.g. phys1_c2, phys1_ch2, etc.)
        if (q.chapterId) {
          const qCId = q.chapterId.toLowerCase();
          if (qCId === chapterId.toLowerCase()) return true;
          if (qCId === `${syllabusId}_ch${chapNum}`.toLowerCase()) return true;
          if (qCId === `c${chapNum}` || qCId === `ch${chapNum}`) return true;
        }
        // Match by chapterName
        if (q.chapterName) {
          const qNorm = q.chapterName.toLowerCase().replace(/[\s\p{P}]/gu, '');
          if (qNorm === normCleanName) return true;
          if (normCleanName.length > 3 && (qNorm.includes(normCleanName) || normCleanName.includes(qNorm))) return true;
        }
        return false;
      });

      const sourceSets = new Set<TeacherSourceSet>();
      matching.forEach(q => {
        if (q.sourceSet) {
          sourceSets.add(q.sourceSet);
        }
      });

      return {
        chapterNumber: chapNum,
        chapterNumberLabel: `${toBanglaNumber(chapNum)} অধ্যায়`,
        chapterName: cleanName,
        chapterId,
        publishedQuestionCount: matching.length,
        availableSourceSets: Array.from(sourceSets)
      };
    });
  }

  // Fallback if no syllabus entry found
  const chapterMap = new Map<string, { count: number; sourceSets: Set<TeacherSourceSet> }>();
  publishedQuestions.forEach(q => {
    const chapName = q.chapterName?.trim() || 'সাধারণ অধ্যায়';
    if (!chapterMap.has(chapName)) {
      chapterMap.set(chapName, { count: 0, sourceSets: new Set() });
    }
    const entry = chapterMap.get(chapName)!;
    entry.count += 1;
    if (q.sourceSet) {
      entry.sourceSets.add(q.sourceSet);
    }
  });

  const result: MedicalChapterInfo[] = [];
  let fallbackIdx = 1;
  chapterMap.forEach((val, name) => {
    result.push({
      chapterNumber: fallbackIdx,
      chapterNumberLabel: `${toBanglaNumber(fallbackIdx)} অধ্যায়`,
      chapterName: name,
      chapterId: `custom_c${fallbackIdx}`,
      publishedQuestionCount: val.count,
      availableSourceSets: Array.from(val.sourceSets)
    });
    fallbackIdx++;
  });

  return result;
}

// Get 3 teacher set cards for a chapter
export interface TeacherSetCardInfo {
  id: TeacherSourceSet;
  name: TeacherSourceSetLabel;
  questionCount: number;
  isAvailable: boolean;
}

export function getTeacherSetsForChapter(
  subject: MedicalSubject,
  paper: 'first' | 'second' | 'not_applicable',
  chapterName: string,
  allQuestions: QuestionItem[]
): TeacherSetCardInfo[] {
  const chapterQuestions = filterMedicalPracticeQuestions(allQuestions, {
    subject,
    paper,
    chapterName
  });

  // Filter teacher sets by subject relevance
  let relevantSets = TEACHER_SOURCE_SETS;
  if (subject === 'physics') {
    relevantSets = TEACHER_SOURCE_SETS.filter(s => ['ishak', 'topon', 'pramanik'].includes(s.id));
  } else if (subject === 'chemistry') {
    relevantSets = TEACHER_SOURCE_SETS.filter(s => ['hazari', 'kabir', 'guha', 'lincoln'].includes(s.id));
  } else if (subject === 'biology') {
    relevantSets = TEACHER_SOURCE_SETS.filter(s => ['board', 'abul_hasan', 'gazi_ajmol', 'azibur', 'alim', 'majeda'].includes(s.id));
  }

  return relevantSets.map(set => {
    const count = chapterQuestions.filter(q => q.sourceSet === set.id).length;
    return {
      id: set.id,
      name: set.label,
      questionCount: count,
      isAvailable: count > 0
    };
  });
}

// Get topics for selected teacher sets
export interface MedicalTopicInfo {
  topicName: string;
  questionCount: number;
}

export function getTopicsForSelectedSets(
  subject: MedicalSubject,
  paper: 'first' | 'second' | 'not_applicable',
  chapterName: string,
  selectedSourceSets: TeacherSourceSet[],
  allQuestions: QuestionItem[]
): MedicalTopicInfo[] {
  if (selectedSourceSets.length === 0) return [];

  const questions = filterMedicalPracticeQuestions(allQuestions, {
    subject,
    paper,
    chapterName,
    selectedSourceSets
  });

  const topicCountMap = new Map<string, number>();

  questions.forEach(q => {
    const topic = q.topicName?.trim() || 'সাধারণ টপিক';
    topicCountMap.set(topic, (topicCountMap.get(topic) || 0) + 1);
  });

  const topics: MedicalTopicInfo[] = [];
  topicCountMap.forEach((count, topicName) => {
    topics.push({ topicName, questionCount: count });
  });

  return topics;
}

// Convert QuestionItem to Question for Quiz component
export function convertToQuizQuestions(items: QuestionItem[]): Question[] {
  return items.map((q, idx) => {
    const optionTexts = (q.options || []).map(o => o.text);
    const correctOpt = (q.options || []).find(o => o.id === q.correctOptionId);
    const correctText = correctOpt ? correctOpt.text : (q.options?.[0]?.text || '');
    const firstMedia = q.media?.[0];
    const imageUrl = firstMedia?.url || q.stemImageUrl;
    const altText = firstMedia?.altText;

    return {
      id: idx + 1,
      topic: q.topicName || q.chapterName || '',
      question_text: q.stem,
      options: optionTexts,
      correct_answer: correctText,
      explanation: q.explanation?.shortExplanation || '',
      time_limit: q.estimatedSeconds || 45,
      hints: q.explanation?.hint ? [q.explanation.hint] : undefined,
      image: imageUrl,
      stemImageUrl: imageUrl,
      media: q.media,
      hasImage: Boolean(q.hasImage || imageUrl),
      altText
    };
  });
}
