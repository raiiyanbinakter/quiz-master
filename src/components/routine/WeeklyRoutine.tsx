import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  MoveRight,
  UserCheck,
  Bot,
  Play,
  RotateCcw
} from 'lucide-react';
import { StudyPlan, StudySession } from '../../types/routine';

interface WeeklyRoutineProps {
  plan: StudyPlan;
  onUpdatePlan: (updatedPlan: StudyPlan) => void;
  onStartSession: (session: StudySession) => void;
}

const DAYS_OF_WEEK = [
  { index: 0, bn: 'রবিবার (Sun)' },
  { index: 1, bn: 'সোমবার (Mon)' },
  { index: 2, bn: 'মঙ্গলবার (Tue)' },
  { index: 3, bn: 'বুধবার (Wed)' },
  { index: 4, bn: 'বৃহস্পতিবার (Thu)' },
  { index: 5, bn: 'শুক্রবার (Fri)' },
  { index: 6, bn: 'শনিবার (Sat)' },
];

export const WeeklyRoutine: React.FC<WeeklyRoutineProps> = ({
  plan,
  onUpdatePlan,
  onStartSession,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(new Date().getDay());
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Custom Session Form
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSubject, setNewSubject] = useState<string>('রসায়ন');
  const [newTime, setNewTime] = useState<string>('09:00');
  const [newDuration, setNewDuration] = useState<number>(45);

  const handleToggleLock = (sessionId: string) => {
    const updatedSessions = plan.sessions.map(s => {
      if (s.id === sessionId) {
        return { ...s, locked: !s.locked };
      }
      return s;
    });
    onUpdatePlan({ ...plan, sessions: updatedSessions, updatedAt: new Date().toISOString() });
  };

  const handleStatusChange = (sessionId: string, status: StudySession['status']) => {
    const updatedSessions = plan.sessions.map(s => {
      if (s.id === sessionId) {
        return { ...s, status };
      }
      return s;
    });
    onUpdatePlan({ ...plan, sessions: updatedSessions, updatedAt: new Date().toISOString() });
  };

  const handleDeleteSession = (sessionId: string) => {
    const updatedSessions = plan.sessions.filter(s => s.id !== sessionId);
    onUpdatePlan({ ...plan, sessions: updatedSessions, updatedAt: new Date().toISOString() });
  };

  const handleAddCustomSession = () => {
    if (!newTitle.trim()) return;

    // Find date corresponding to selectedDayIndex starting from plan.startDate
    const start = new Date(plan.startDate);
    const dateForDay = new Date(start);
    while (dateForDay.getDay() !== selectedDayIndex) {
      dateForDay.setDate(dateForDay.getDate() + 1);
    }
    const dateStr = dateForDay.toISOString().split('T')[0];

    const newSession: StudySession = {
      id: `student_sess_${Date.now()}`,
      date: dateStr,
      startTime: newTime,
      durationMinutes: newDuration,
      subjectName: newSubject,
      type: 'custom',
      task: newTitle,
      successCriteria: 'শিক্ষার্থীর নিজস্ব লক্ষ্য সম্পন্নকরণ',
      source: 'student',
      locked: true, // Student created sessions locked by default
      status: 'planned',
      recommendationReasons: ['শিক্ষার্থী কর্তৃক ম্যানুয়ালি যুক্তকৃত'],
    };

    onUpdatePlan({
      ...plan,
      sessions: [...plan.sessions, newSession],
      updatedAt: new Date().toISOString()
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  // Filter sessions for selected day index
  const daySessions = plan.sessions.filter(s => {
    const sessionDay = new Date(s.date).getDay();
    return sessionDay === selectedDayIndex;
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-400" /> সাপ্তাহিক স্টাডি ক্যালেন্ডার (Weekly Calendar)
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            অটো-সাজেস্টেড এবং নিজের তৈরি সেশনসমূহ পরিচালনা ও লক করুন।
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> কাস্টম সেশন যোগ করুন
        </button>
      </div>

      {/* Day Picker Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {DAYS_OF_WEEK.map((d) => {
          const isSelected = selectedDayIndex === d.index;
          const count = plan.sessions.filter(s => new Date(s.date).getDay() === d.index).length;

          return (
            <button
              key={d.index}
              onClick={() => setSelectedDayIndex(d.index)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className="text-xs font-semibold">{d.bn}</div>
              <div className={`text-[11px] mt-1 ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                {count} সেশন
              </div>
            </button>
          );
        })}
      </div>

      {/* Sessions Timeline List for Selected Day */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white border-b border-slate-700/80 pb-3 flex items-center justify-between">
          <span>{DAYS_OF_WEEK.find(d => d.index === selectedDayIndex)?.bn} এর সেশনসমূহ ({daySessions.length})</span>
          <span className="text-xs font-normal text-slate-400">
            লক করা (<Lock className="w-3 h-3 inline text-amber-400" />) সেশন রি-প্ল্যানিং এর সময় অপরিবর্তিত থাকে
          </span>
        </h3>

        {daySessions.length > 0 ? (
          <div className="space-y-3">
            {daySessions.map((s) => {
              const isCompleted = s.status === 'completed';
              const isSkipped = s.status === 'skipped';

              return (
                <div
                  key={s.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                      : isSkipped
                      ? 'bg-rose-950/20 border-rose-500/40 opacity-75'
                      : 'bg-slate-900/60 border-slate-700 text-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleLock(s.id)}
                      title={s.locked ? 'লক করা (Locked)' : 'আনলকড (Unlocked)'}
                      className={`p-2 rounded-xl border mt-0.5 transition-colors cursor-pointer ${
                        s.locked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {s.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                          {s.startTime} ({s.durationMinutes} মি.)
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{s.subjectName}</span>
                        {s.source === 'student' ? (
                          <span className="bg-purple-500/20 text-purple-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
                            <UserCheck className="w-3 h-3" /> Student Added
                          </span>
                        ) : (
                          <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30 flex items-center gap-1">
                            <Bot className="w-3 h-3" /> Auto Suggested
                          </span>
                        )}
                      </div>

                      <h4 className={`font-bold text-base ${isCompleted ? 'line-through text-emerald-400' : 'text-white'}`}>
                        {s.topicTitle || s.task}
                      </h4>

                      {s.recommendationReasons && s.recommendationReasons.length > 0 && (
                        <p className="text-xs text-slate-400 mt-1">
                          মূল কারণ: {s.recommendationReasons[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    {!isCompleted && s.status === 'planned' && (
                      <button
                        onClick={() => onStartSession(s)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> সেশন শুরু
                      </button>
                    )}

                    <button
                      onClick={() => handleStatusChange(s.id, isCompleted ? 'planned' : 'completed')}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-500 text-white border-emerald-400'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-emerald-400'
                      }`}
                      title={isCompleted ? 'Mark Pending' : 'Mark Complete'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleStatusChange(s.id, isSkipped ? 'planned' : 'skipped')}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isSkipped
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-rose-400'
                      }`}
                      title="Skip Session"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteSession(s.id)}
                      className="p-2 bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                      title="Delete Session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-8 text-slate-400 text-sm">
            এই দিনের জন্য কোনো সেশন শিডিউল করা নেই। কাস্টম সেশন যোগ করতে উপরে বাটন এ ক্লিক করুন।
          </div>
        )}
      </div>

      {/* Add Custom Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" /> কাস্টম স্টাডি সেশন যুক্ত করুন
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">টাস্ক / টপিকের নাম:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: জৈব রসায়ন প্রশ্ন ব্যাংক সমাধান"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">বিষয়:</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">শুরুর সময়:</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">স্থায়িত্ব (মিনিট):</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={handleAddCustomSession}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl cursor-pointer"
              >
                যোগ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
