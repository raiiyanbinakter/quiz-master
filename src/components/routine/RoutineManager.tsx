import React, { useState, useEffect } from 'react';
import { StudyPlan, StudySession, SessionCheckIn } from '../../types/routine';
import { RoutineHome } from './RoutineHome';
import { RoutineSetupWizard } from './RoutineSetupWizard';
import { WeeklyRoutine } from './WeeklyRoutine';
import { TopicAnalysis } from './TopicAnalysis';
import { FocusSession } from './FocusSession';
import { RoutineInsights } from './RoutineInsights';
import { PlanFeasibilityReport } from './PlanFeasibilityReport';
import { loadActiveStudyPlan, saveActiveStudyPlan, updateSessionStatusInFirestore } from '../../lib/routineFirestore';
import { generateStudyPlan, replanIncompleteSessions } from '../../utils/routinePlanner';
import { DEMO_SYLLABUS_TOPICS, DEMO_DEFAULT_AVAILABILITY, DEMO_DEFAULT_COMMITMENTS, DEMO_DEFAULT_PREFERENCES } from '../../data/routineSeedData';

interface RoutineManagerProps {
  userId: string | null;
  autoOpenAddTask?: boolean;
  autoFocusToday?: boolean;
  onNavigateToQuiz?: (topicId?: string) => void;
}

export type RoutineTab = 'home' | 'setup' | 'weekly' | 'syllabus' | 'focus' | 'insights' | 'feasibility';

export const RoutineManager: React.FC<RoutineManagerProps> = ({
  userId,
  autoOpenAddTask,
  autoFocusToday,
  onNavigateToQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<RoutineTab>('home');
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [activeFocusSession, setActiveFocusSession] = useState<StudySession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load plan on mount
  useEffect(() => {
    async function initPlan() {
      setLoading(true);
      const loadedPlan = await loadActiveStudyPlan(userId);
      if (loadedPlan) {
        setPlan(loadedPlan);
      } else {
        // Create initial default plan from demo data so the student immediately sees a working routine
        const defaultPlan = generateStudyPlan({
          userId: userId || 'demo_user',
          route: 'academic',
          title: 'এইচএসসি ও বোর্ড পরীক্ষা ২০২৫ (Demo Plan)',
          startDate: new Date().toISOString().split('T')[0],
          targetExamDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          preferences: DEMO_DEFAULT_PREFERENCES,
          availability: DEMO_DEFAULT_AVAILABILITY,
          commitments: DEMO_DEFAULT_COMMITMENTS,
          customGoals: ['দৈনিক ৫০টি প্রশ্ন সমাধান করা'],
          topics: DEMO_SYLLABUS_TOPICS.filter(t => t.route === 'academic'),
        });
        setPlan(defaultPlan);
        saveActiveStudyPlan(userId, defaultPlan);
      }
      setLoading(false);
    }
    initPlan();
  }, [userId]);

  const handlePlanGenerated = (newPlan: StudyPlan) => {
    setPlan(newPlan);
    saveActiveStudyPlan(userId, newPlan);
    setActiveTab('home');
  };

  const handleUpdatePlan = (updatedPlan: StudyPlan) => {
    setPlan(updatedPlan);
    saveActiveStudyPlan(userId, updatedPlan);
  };

  const handleReplan = () => {
    if (!plan) return;
    const replanned = replanIncompleteSessions(
      plan,
      DEMO_SYLLABUS_TOPICS.filter(t => t.route === plan.route),
      {},
      new Date().toISOString().split('T')[0]
    );
    setPlan(replanned);
    saveActiveStudyPlan(userId, replanned);
  };

  const handleStartFocusSession = (session: StudySession) => {
    setActiveFocusSession(session);
    setActiveTab('focus');
  };

  const handleCompleteFocusSession = (sessionId: string, checkIn: SessionCheckIn) => {
    if (!plan) return;
    updateSessionStatusInFirestore(userId, plan.id, sessionId, 'completed', checkIn);

    // Local state update
    const updatedSessions = plan.sessions.map(s => {
      if (s.id === sessionId) {
        return { ...s, status: 'completed' as const, checkIn };
      }
      return s;
    });
    const updatedPlan = { ...plan, sessions: updatedSessions, updatedAt: new Date().toISOString() };
    setPlan(updatedPlan);
    setActiveFocusSession(null);
    setActiveTab('home');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-slate-400">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
        রুটিন লোড করা হচ্ছে...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Internal Sub-Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 pt-2 flex items-center gap-2 overflow-x-auto border-b border-slate-700/80 pb-2">
        {[
          { id: 'home', label: 'হোম ড্যাশবোর্ড' },
          { id: 'weekly', label: 'সাপ্তাহিক রুটিন' },
          { id: 'syllabus', label: 'টপিক বিশ্লেষণ' },
          { id: 'insights', label: 'ইনসাইটস' },
          { id: 'feasibility', label: 'বাস্তবসম্মত রিপোর্ট' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as RoutineTab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Render Active Subview */}
      {activeTab === 'home' && (
        <RoutineHome
          userId={userId}
          plan={plan}
          autoOpenAddTask={autoOpenAddTask}
          autoFocusToday={autoFocusToday}
          onStartSetup={() => setActiveTab('setup')}
          onStartSession={handleStartFocusSession}
          onReplan={handleReplan}
          onViewTab={(tab) => setActiveTab(tab)}
          onApplyTemplate={handleUpdatePlan}
        />
      )}

      {activeTab === 'setup' && (
        <RoutineSetupWizard
          userId={userId || 'demo_user'}
          onPlanGenerated={handlePlanGenerated}
          onCancel={() => setActiveTab('home')}
        />
      )}

      {activeTab === 'weekly' && plan && (
        <WeeklyRoutine
          plan={plan}
          onUpdatePlan={handleUpdatePlan}
          onStartSession={handleStartFocusSession}
        />
      )}

      {activeTab === 'syllabus' && (
        <TopicAnalysis
          userId={userId}
          onStartQuizForTopic={(topicId) => {
            if (onNavigateToQuiz) onNavigateToQuiz(topicId);
          }}
        />
      )}

      {activeTab === 'focus' && activeFocusSession && (
        <FocusSession
          session={activeFocusSession}
          onCompleteSession={handleCompleteFocusSession}
          onStartQuizForTopic={(topicId) => {
            if (onNavigateToQuiz) onNavigateToQuiz(topicId);
          }}
          onClose={() => setActiveTab('home')}
        />
      )}

      {activeTab === 'insights' && plan && (
        <RoutineInsights plan={plan} />
      )}

      {activeTab === 'feasibility' && plan && (
        <PlanFeasibilityReport
          plan={plan}
          onReplan={handleReplan}
        />
      )}
    </div>
  );
};
