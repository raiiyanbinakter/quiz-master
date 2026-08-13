import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, CheckCircle2, XCircle, Play, Plus, 
  RotateCcw, Sparkles, Tag, Edit3, ArrowRight, Check, AlertCircle 
} from 'lucide-react';
import { 
  fetchUserStudySessions, 
  saveUserStudySession, 
  updateUserStudySessionStatus, 
  updateUserStudySessionDate,
  UserStudySession 
} from '../../lib/routineFirestore';
import { recordMeaningfulActionInFirestore } from '../../lib/gamificationService';
import { groupUserSessions, getTypeLabel, formatBanglaDate } from '../../utils/studySessionUtils';

interface UserStudySessionsSectionProps {
  userId: string | null;
  autoOpenAddTask?: boolean;
  autoFocusToday?: boolean;
  onNavigateToPractice?: (subjectId?: string | null, topicId?: string | null) => void;
  onSessionCompleted?: (session: UserStudySession) => void;
}

export const UserStudySessionsSection: React.FC<UserStudySessionsSectionProps> = ({
  userId,
  autoOpenAddTask,
  autoFocusToday,
  onNavigateToPractice,
  onSessionCompleted
}) => {
  const [sessions, setSessions] = useState<UserStudySession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState<boolean>(!!autoOpenAddTask);

  const todaySectionRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  // New task form state
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDate, setTaskDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [taskDuration, setTaskDuration] = useState<number>(20);
  const [taskType, setTaskType] = useState<UserStudySession['type']>('custom');
  const [savingTask, setSavingTask] = useState<boolean>(false);

  // Inline editing date
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newDateValue, setNewDateValue] = useState<string>('');

  useEffect(() => {
    if (autoOpenAddTask) {
      setShowAddForm(true);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [autoOpenAddTask]);

  useEffect(() => {
    if (autoFocusToday) {
      setTimeout(() => todaySectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [autoFocusToday]);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const loaded = await fetchUserStudySessions(userId);
      setSessions(loaded);
    } catch (err) {
      console.error('Error loading study sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [userId]);

  const { todaySessions, futureSessions, completedSessions, skippedSessions } = groupUserSessions(sessions);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setSavingTask(true);
    try {
      const created = await saveUserStudySession(userId, {
        date: taskDate,
        durationMinutes: Number(taskDuration) || 20,
        task: taskTitle.trim(),
        type: taskType,
        source: 'student',
        status: 'planned'
      });

      setSessions(prev => [created, ...prev]);
      setTaskTitle('');
      setShowAddForm(false);
    } catch (err) {
      console.error('Error creating study session:', err);
    } finally {
      setSavingTask(false);
    }
  };

  const handleComplete = async (session: UserStudySession) => {
    try {
      await updateUserStudySessionStatus(userId, session.id, 'completed');
      setSessions(prev =>
        prev.map(s => s.id === session.id ? { ...s, status: 'completed', completedAt: new Date().toISOString() } : s)
      );

      const actionType = session.type === 'review'
        ? 'planned_review'
        : session.type === 'custom'
        ? 'custom_session'
        : 'planned_session';

      await recordMeaningfulActionInFirestore(userId, {
        eventId: `session_completed_${session.id}`,
        type: actionType,
        durationMinutes: session.durationMinutes || 20
      });

      if (onSessionCompleted) onSessionCompleted(session);
    } catch (err) {
      console.error('Error completing session:', err);
    }
  };

  const handleSkip = async (session: UserStudySession) => {
    try {
      await updateUserStudySessionStatus(userId, session.id, 'skipped');
      setSessions(prev =>
        prev.map(s => s.id === session.id ? { ...s, status: 'skipped' } : s)
      );
    } catch (err) {
      console.error('Error skipping session:', err);
    }
  };

  const handleSaveNewDate = async (session: UserStudySession) => {
    if (!newDateValue) return;
    try {
      await updateUserStudySessionDate(userId, session.id, newDateValue);
      setSessions(prev =>
        prev.map(s => s.id === session.id ? { ...s, date: newDateValue } : s)
      );
      setEditingSessionId(null);
    } catch (err) {
      console.error('Error updating session date:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header with Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            পড়ার কাজ ও রিভিশন তালিকা
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            কুইজের পর তৈরি হওয়া রিভিশন সেশন এবং আপনার নিজস্ব পড়ার পরিকল্পনা এখানে সংরক্ষিত থাকবে।
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-3 rounded-2xl transition-all flex items-center gap-2 shadow cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? 'ফর্ম বন্ধ করুন' : 'নতুন কাজ যোগ করুন'}
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <form ref={formRef} onSubmit={handleCreateTask} className="bg-slate-900/90 border border-indigo-500/30 p-5 rounded-3xl space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            নতুন পড়ার কাজ যোগ করুন
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs text-slate-400 font-medium">কাজের নাম / বিষয়</label>
              <input
                type="text"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
                placeholder="যেমন: উচ্চতর গণিত ম্যাট্রিক্স ও নির্ণায়ক রিভিশন"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">তারিখ</label>
              <input
                type="date"
                value={taskDate}
                onChange={e => setTaskDate(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">সময়কাল (মিনিট)</label>
              <select
                value={taskDuration}
                onChange={e => setTaskDuration(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500"
              >
                <option value={10}>১০ মিনিট</option>
                <option value={20}>২০ মিনিট</option>
                <option value={30}>৩০ মিনিট</option>
                <option value={45}>৪৫ মিনিট</option>
                <option value={60}>৬০ মিনিট</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs text-slate-400 font-medium">ধরণ</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'review', label: 'রিভিশন' },
                  { id: 'practice', label: 'অনুশীলন' },
                  { id: 'custom', label: 'নিজের কাজ' },
                  { id: 'mock', label: 'মক টেস্ট' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTaskType(t.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      taskType === t.id
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white border border-slate-700"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={savingTask || !taskTitle.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              {savingTask ? 'সংরক্ষণ হচ্ছে...' : 'কাজ যোগ করুন'}
            </button>
          </div>
        </form>
      )}

      {/* TODAY'S TASKS */}
      <div ref={todaySectionRef} className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-emerald-400" />
            আজকের নির্ধারিত কাজ ({todaySessions.length})
          </h3>
        </div>

        {todaySessions.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400/60 mx-auto" />
            <div className="text-sm font-bold text-slate-300">আজকের জন্য কোনো নির্ধারিত কাজ বাকি নেই</div>
            <p className="text-xs text-slate-500">
              নতুন কুইজ দিলে রিভিশন সেশন স্বয়ংক্রিয়ভাবে তৈরি হবে, অথবা উপরে "নতুন কাজ যোগ করুন" বাটনে ক্লিক করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {todaySessions.map(session => (
              <div key={session.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                      {getTypeLabel(session.type)}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {session.durationMinutes} মিনিট
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{session.task}</h4>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {session.subjectId && onNavigateToPractice && (
                    <button
                      onClick={() => onNavigateToPractice(session.subjectId, session.topicId)}
                      className="bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" /> অনুশীলন
                    </button>
                  )}

                  <button
                    onClick={() => handleComplete(session)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> সম্পন্ন করুন
                  </button>

                  <button
                    onClick={() => handleSkip(session)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 font-semibold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    বাদ দিন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FUTURE TASKS */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-amber-400" />
          আগামী দিনের কাজ ({futureSessions.length})
        </h3>

        {futureSessions.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl text-xs text-slate-500 text-center">
            আগামী দিনের জন্য কোনো অগ্রিম সেশন নেই।
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            {futureSessions.map(session => (
              <div key={session.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold text-xs">{formatBanglaDate(session.date)}</span>
                    <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
                      {getTypeLabel(session.type)}
                    </span>
                    <span className="text-slate-400 text-xs">{session.durationMinutes} মি.</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-200">{session.task}</div>
                </div>

                <div className="flex items-center gap-2">
                  {editingSessionId === session.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="date"
                        value={newDateValue}
                        onChange={e => setNewDateValue(e.target.value)}
                        className="bg-slate-800 border border-indigo-500 text-white text-xs px-2 py-1.5 rounded-lg focus:outline-none"
                      />
                      <button
                        onClick={() => handleSaveNewDate(session)}
                        className="bg-emerald-500 text-slate-950 font-bold text-xs px-2.5 py-1.5 rounded-lg"
                      >
                        ঠিক আছে
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingSessionId(session.id);
                        setNewDateValue(session.date);
                      }}
                      className="text-xs text-slate-400 hover:text-indigo-300 underline font-medium cursor-pointer"
                    >
                      তারিখ বদলান
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT ACTIVITY */}
      {(completedSessions.length > 0 || skippedSessions.length > 0) && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            সাম্প্রতিক কার্যক্রম ({completedSessions.length + skippedSessions.length})
          </h3>

          <div className="grid grid-cols-1 gap-2">
            {completedSessions.slice(0, 3).map(s => (
              <div key={s.id} className="bg-slate-900/40 border border-slate-800/60 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-300 font-medium">{s.task}</span>
                </div>
                <span className="text-emerald-400 font-bold">সম্পন্ন হয়েছে</span>
              </div>
            ))}

            {skippedSessions.slice(0, 2).map(s => (
              <div key={s.id} className="bg-slate-900/40 border border-slate-800/60 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-slate-400 line-through">{s.task}</span>
                </div>
                <span className="text-slate-500">বাদ দেওয়া হয়েছে</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
