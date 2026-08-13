import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';
import { StudySession, SessionCheckIn } from '../../types/routine';

interface FocusSessionProps {
  session: StudySession;
  onCompleteSession: (sessionId: string, checkIn: SessionCheckIn) => void;
  onStartQuizForTopic?: (topicId: string) => void;
  onClose: () => void;
}

export const FocusSession: React.FC<FocusSessionProps> = ({
  session,
  onCompleteSession,
  onStartQuizForTopic,
  onClose,
}) => {
  const targetSeconds = session.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(targetSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Check-in state
  const [selfRating, setSelfRating] = useState<number>(4);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleFinishEarly = () => {
    setIsActive(false);
    setIsFinished(true);
  };

  const handleSubmitCheckIn = () => {
    const elapsedMinutes = Math.max(1, Math.round((targetSeconds - secondsRemaining) / 60));
    const checkIn: SessionCheckIn = {
      id: `checkin_${Date.now()}`,
      sessionId: session.id,
      completedAt: new Date().toISOString(),
      selfRating,
      notes,
      durationSpentMinutes: elapsedMinutes,
    };

    onCompleteSession(session.id, checkIn);
    onClose();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl flex items-center justify-between">
        <div>
          <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">
            {session.subjectName || 'স্টাডি সেশন'}
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">{session.topicTitle || session.task}</h2>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white text-sm underline cursor-pointer"
        >
          বন্ধ করুন (Close)
        </button>
      </div>

      {!isFinished ? (
        /* Timer Active Card */
        <div className="bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl text-center space-y-6">
          <div className="relative w-56 h-56 mx-auto flex items-center justify-center rounded-full bg-slate-900 border-4 border-indigo-500/30 shadow-inner">
            <div>
              <div className="text-5xl font-mono font-extrabold text-white tracking-wider">
                {formatTime(secondsRemaining)}
              </div>
              <div className="text-xs text-indigo-400 font-semibold mt-2">
                {isActive ? 'পড়াশোনা চলমান (Session Running)' : 'বিরতি/স্থগিত (Paused)'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-xl flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              {isActive ? 'পজ করুন (Pause)' : 'শুরু করুন (Start)'}
            </button>

            <button
              onClick={() => {
                setIsActive(false);
                setSecondsRemaining(targetSeconds);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold p-4 rounded-2xl border border-slate-700 transition-colors cursor-pointer"
              title="রি-সেট করুন"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={handleFinishEarly}
              className="bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold px-5 py-4 rounded-2xl border border-slate-700 transition-colors cursor-pointer text-sm"
            >
              সেশন শেষ করুন (Finish)
            </button>
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto">
            টিপস: সেশন চলাকালীন পেজ পরিবর্তন করলেও আপনার সময় সংরক্ষিত থাকবে। মনোযোগী থাকুন!
          </p>
        </div>
      ) : (
        /* Completion Check-In Form */
        <div className="bg-slate-800/90 border border-slate-700 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">সেশন সম্পন্ন হয়েছে! (Session Completed)</h3>
            <p className="text-slate-300 text-sm">
              আপনার আত্ম-মূল্যায়ন (Self-Rating) সংরক্ষণ করে রুটিনের অগ্রগতি আপডেট করুন।
            </p>
          </div>

          <div className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-700">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                আত্ম-মূল্যায়ন (Self-Rating 1 to 5 Stars):
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelfRating(star)}
                    className="p-2 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= selfRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">
                নোট বা মন্তব্য (মৌলিক নোট):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="যেমন: গ্রাহামের সূত্র প্রয়োগে ২ টি জটিল ম্যাথ আটকে গিয়েছিলাম।"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none"
                rows={3}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {session.topicId && onStartQuizForTopic && (
              <button
                type="button"
                onClick={() => onStartQuizForTopic(session.topicId!)}
                className="bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-200 font-semibold text-xs px-4 py-3 rounded-xl border border-indigo-500/40 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" /> কুইজ দিয়ে রিট্রিভাল টেস্ট করুন
              </button>
            )}

            <button
              onClick={handleSubmitCheckIn}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              মূল্যায়ন সেভ করুন <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
