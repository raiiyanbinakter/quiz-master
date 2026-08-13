export type ModuleMode = 'teacher_sets' | 'chapter_topics';

export interface ModuleConfig {
  id: 'module_1' | 'module_3';
  title: string;
  mode: ModuleMode;
}

export const MODULE_1_CONFIG: ModuleConfig = {
  id: 'module_1',
  title: 'মডিউল ১ (শিক্ষকভিত্তিক প্রশ্নব্যাংক)',
  mode: 'teacher_sets'
};

export const MODULE_3_CONFIG: ModuleConfig = {
  id: 'module_3',
  title: 'পদার্থবিজ্ঞান ১ম পত্র — মডিউল ৩',
  mode: 'chapter_topics'
};

// Re-export explicit isolated data sources
export { module1TeacherSetData } from './module1TeacherSetData';
export { module3ChapterTopicData } from './module3ChapterTopicData';
