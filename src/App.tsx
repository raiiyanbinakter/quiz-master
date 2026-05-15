import React, { useState } from 'react';
import Home from './components/Home';
import ChapterList from './components/ChapterList';
import TopicList from './components/TopicList';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { syllabus } from './data/syllabus';
import { sampleChapterData } from './data/questions';
import { bio1Chap1Data } from './data/questions_bio1_chap1';
import { phy1Chap2Data } from './data/questions_phy1_chap2';
import { chem1Chap2Data } from './data/questions_chem1_chap2';
import { gstMathExam1Data } from './data/questions_gst_math_exam1';
import { gstMathExam2Data } from './data/questions_gst_math_exam2';
import { dcuMathStraightLineData } from './data/questions_dcu_math_straight_line';
import { dcuMathExam1Data } from './data/questions_dcu_math_exam1';
import { dcuMathExam3Data } from './data/questions_dcu_math_exam3';
import { dcuPhysicsVectorData } from './data/questions_dcu_physics_vector';
import { dcuPhysicsNewtonianData } from './data/questions_dcu_physics_newtonian';
import { dcuPhysicsWorkEnergyData } from './data/questions_dcu_physics_work_energy';
import { dcuPhysicsGravityData } from './data/questions_dcu_physics_gravity';
import { dcuPhysicsStructureData } from './data/questions_dcu_physics_structure';
import { Subject, QuizResult, QuizSummary } from './types';

type ViewState = 'home' | 'chapters' | 'topics' | 'quiz' | 'result';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState<'quiz' | 'exam'>('quiz');
  const [quizSummary, setQuizSummary] = useState<QuizSummary | null>(null);

  const handleSelectSubject = (subjectId: string) => {
    const subject = syllabus.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
      setCurrentView('chapters');
    }
  };

  const handleSelectChapter = (chapterIndex: number) => {
    setSelectedChapterIndex(chapterIndex);
    setCurrentView('topics');
  };

  const handleSelectTopic = (topic: string | null, mode: 'quiz' | 'exam') => {
    setSelectedTopic(topic);
    setQuizMode(mode);
    setCurrentView('quiz');
  };

  const handleQuizComplete = (results: QuizResult[]) => {
    const correctCount = results.filter(r => r.isCorrect).length;
    const wrongCount = results.filter(r => !r.isCorrect && !r.isSkipped).length;
    const skippedCount = results.filter(r => r.isSkipped).length;
    
    // Scoring logic: +1 for correct, -0.25 for wrong
    const totalScore = (correctCount * 1) - (wrongCount * 0.25);

    setQuizSummary({
      totalQuestions: results.length,
      correctCount,
      wrongCount,
      skippedCount,
      totalScore,
      results
    });
    setCurrentView('result');
  };

  const handleRetry = () => {
    setCurrentView('quiz');
  };

  const handleGoHome = () => {
    setSelectedSubject(null);
    setSelectedChapterIndex(null);
    setSelectedTopic(null);
    setQuizSummary(null);
    setCurrentView('home');
  };

  const getQuestions = () => {
    let questions = [];
    if (selectedSubject?.id === 'bio1' && selectedChapterIndex === 0) {
      questions = bio1Chap1Data.questions;
    } else if (selectedSubject?.id === 'bio2' && selectedChapterIndex === 0) {
      questions = sampleChapterData.questions;
    } else if (selectedSubject?.id === 'phys1' && selectedChapterIndex === 1) {
      questions = phy1Chap2Data.questions;
    } else if (selectedSubject?.id === 'chem1' && selectedChapterIndex === 1) {
      questions = chem1Chap2Data.questions;
    } else if (selectedSubject?.id === 'gst_math' && selectedChapterIndex === 0) {
      questions = gstMathExam1Data.questions;
    } else if (selectedSubject?.id === 'gst_math' && selectedChapterIndex === 1) {
      questions = gstMathExam2Data.questions;
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 0) {
      questions = dcuMathStraightLineData.questions;
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 1) {
      questions = dcuMathExam1Data.questions;
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 2) {
      questions = dcuMathExam3Data.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 1) {
      questions = dcuPhysicsVectorData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 2) {
      questions = dcuPhysicsNewtonianData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 3) {
      questions = dcuPhysicsWorkEnergyData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 4) {
      questions = dcuPhysicsGravityData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 5) {
      questions = dcuPhysicsStructureData.questions;
    }

    if (selectedTopic) {
      return questions.filter(q => q.topic === selectedTopic);
    }
    return questions;
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-emerald-500/30">
      {currentView === 'home' && (
        <Home onSelectSubject={handleSelectSubject} />
      )}
      
      {currentView === 'chapters' && selectedSubject && (
        <ChapterList 
          subject={selectedSubject} 
          onBack={() => setCurrentView('home')}
          onSelectChapter={handleSelectChapter}
        />
      )}

      {currentView === 'topics' && selectedSubject && selectedChapterIndex !== null && (
        <TopicList 
          subject={selectedSubject}
          chapterIndex={selectedChapterIndex}
          questions={getQuestions()}
          onBack={() => setCurrentView('chapters')}
          onSelectTopic={handleSelectTopic}
        />
      )}

      {currentView === 'quiz' && (
        <Quiz 
          questions={getQuestions()} 
          mode={quizMode}
          subjectId={selectedSubject?.id}
          onComplete={handleQuizComplete} 
          onBack={() => setCurrentView('topics')}
        />
      )}

      {currentView === 'result' && quizSummary && (
        <Result 
          summary={quizSummary}
          onRetry={handleRetry}
          onGoHome={handleGoHome}
          onBack={() => setCurrentView('topics')}
        />
      )}
    </div>
  );
}
