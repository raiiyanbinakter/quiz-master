import { MODULE_3_CHAPTERS, getModule3QuestionsForTopics, Module3Chapter } from './module3TopicConfig';

export interface Module3Question {
  id: string | number;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  topic: string;
  chapterId: string;
}

// Module 3 chapter topic data source (strictly topic based, no teacher sets)
export const module3ChapterTopicData = {
  chapters: MODULE_3_CHAPTERS as Module3Chapter[],
  getQuestionsForTopics: (chapterId: string, topicNames: string[]): Module3Question[] => {
    return getModule3QuestionsForTopics(chapterId, topicNames).map(q => ({
      id: q.id,
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      topic: q.topic,
      chapterId: q.chapterId
    }));
  }
};
