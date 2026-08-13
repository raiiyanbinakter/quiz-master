import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  BookOpen,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  ShieldCheck,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';
import {
  LearningRoute,
  ExamBlueprint,
  SyllabusTopic,
  StudentAvailabilityBlock,
  FixedCommitment,
  RoutinePreferences,
  StudyPlan
} from '../../types/routine';
import {
  DEMO_BLUEPRINTS,
  DEMO_SYLLABUS_TOPICS,
  DEMO_DEFAULT_AVAILABILITY,
  DEMO_DEFAULT_COMMITMENTS,
  DEMO_DEFAULT_PREFERENCES
} from '../../data/routineSeedData';
import { validatePlanFeasibility, generateStudyPlan } from '../../utils/routinePlanner';

interface RoutineSetupWizardProps {
  userId: string;
  onPlanGenerated: (plan: StudyPlan) => void;
  onCancel: () => void;
}

const DAY_NAMES = ['রোববার (Sun)', 'সোমবার (Mon)', 'মঙ্গলবার (Tue)', 'বুধবার (Wed)', 'বৃহস্পতিবার (Thu)', 'শুক্রবার (Fri)', 'শনিবার (Sat)'];

export const RoutineSetupWizard: React.FC<RoutineSetupWizardProps> = ({
  userId,
  onPlanGenerated,
  onCancel,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [route, setRoute] = useState<LearningRoute>('academic');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('bp_academic');
  const [targetExamDate, setTargetExamDate] = useState<string>(
    new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 60 days default
  );
  const [preferences, setPreferences] = useState<RoutinePreferences>(DEMO_DEFAULT_PREFERENCES);
  const [availability, setAvailability] = useState<StudentAvailabilityBlock[]>(DEMO_DEFAULT_AVAILABILITY);
  const [commitments, setCommitments] = useState<FixedCommitment[]>(DEMO_DEFAULT_COMMITMENTS);
  const [customGoals, setCustomGoals] = useState<string[]>(['দৈনিক ৫০টি বহুনির্বাচনী প্রশ্ন প্র্যাকটিস করা']);
  const [newGoalInput, setNewGoalInput] = useState<string>('');

  // Filter available blueprints based on selected route
  const availableBlueprints = DEMO_BLUEPRINTS.filter(bp => bp.route === route);
  const activeBlueprint = DEMO_BLUEPRINTS.find(bp => bp.id === selectedBlueprintId) || availableBlueprints[0];

  // Topics for the selected route
  const relevantTopics = DEMO_SYLLABUS_TOPICS.filter(
    t => t.route === route || t.examBlueprintId === activeBlueprint?.id
  );

  const todayStr = new Date().toISOString().split('T')[0];

  // Feasibility Check
  const feasibility = validatePlanFeasibility(
    relevantTopics,
    todayStr,
    targetExamDate,
    availability,
    commitments,
    preferences
  );

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Generate Plan
      const newPlan = generateStudyPlan({
        userId,
        route,
        title: `${activeBlueprint?.title || 'কাস্টম রুটিন'} - স্টাডি প্ল্যান`,
        startDate: todayStr,
        targetExamDate,
        preferences,
        availability,
        commitments,
        customGoals,
        topics: relevantTopics,
      });

      onPlanGenerated(newPlan);
    }
  };

  const handleAddCustomGoal = () => {
    if (!newGoalInput.trim()) return;
    setCustomGoals([...customGoals, newGoalInput.trim()]);
    setNewGoalInput('');
  };

  const handleRemoveCustomGoal = (idx: number) => {
    setCustomGoals(customGoals.filter((_, i) => i !== idx));
  };

  const handleAddCommitment = () => {
    const newComm: FixedCommitment = {
      id: `cm_${Date.now()}`,
      title: 'নতুন প্রাইভেট/কোচিং ক্লাস',
      dayOfWeek: 1,
      startTime: '14:00',
      endTime: '16:00',
    };
    setCommitments([...commitments, newComm]);
  };

  const handleRemoveCommitment = (id: string) => {
    setCommitments(commitments.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Wizard Header */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400" /> রুটিন সেটআপ উইজার্ড (Routine Setup)
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              ধাপ {step} এর ৫: {
                step === 1 ? 'রুটিন টাইপ নির্বাচন' :
                step === 2 ? 'সিলেবাস ব্লুপ্রিন্ট নির্বাচন' :
                step === 3 ? 'পছন্দের সময় ও বাফার নির্ধারণ' :
                step === 4 ? 'ফ্রি সময় ও ফিক্সড ক্লাস' : 'কাস্টম লক্ষ্য ও ফাইনাল রিভিউ'
              }
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white text-sm underline cursor-pointer"
          >
            বাতিল করুন
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s <= step ? 'bg-indigo-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-3xl shadow-xl space-y-6">
        {/* STEP 1: Route Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              ১. আপনার বর্তমান ক্যাটাগরি বা পরীক্ষার রুট নির্বাচন করুন:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'academic', label: 'এইচএসসি ও একাডেমিক (HSC)', desc: 'বোর্ড পরীক্ষা ও কলেজ সিলেবাস অনুযায়ী পড়াশোনা' },
                { id: 'medical', label: 'মেডিকেল ভর্তি পরীক্ষা (Medical)', desc: 'MBBS/BDS ভর্তি পরীক্ষার স্পেশাল ব্লুপ্রিন্ট' },
                { id: 'varsity', label: 'ভার্সিটি ক ইউনিট (Varsity A-Unit)', desc: 'ঢাকা বিশ্ববিদ্যালয় ও অন্যান্য ভার্সিটির প্রশ্ন ব্যাংক অনুযায়ী' },
                { id: 'engineering', label: 'ইঞ্জিনিয়ারিং (BUET/Engineering)', desc: 'বুয়েট ও ইঞ্জিনিয়ারিং ভর্তি পরীক্ষার প্রস্তুতি' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRoute(r.id as LearningRoute);
                    const bp = DEMO_BLUEPRINTS.find(b => b.route === r.id);
                    if (bp) setSelectedBlueprintId(bp.id);
                  }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    route === r.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg'
                      : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-indigo-300">{r.label}</span>
                    {route === r.id && (
                      <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Blueprint Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
              ২. সিলেবাস ব্লুপ্রিন্ট নির্বাচন করুন:
            </h3>
            <p className="text-slate-400 text-sm">
              নিচে আপনার রুট ভিত্তিক অনুমোদিত অফিসিয়াল ব্লুপ্রিন্ট দেওয়া হল। অফিসিয়াল ডাটা না থাকলে আপনি কাস্টম সিলেবাস ব্যবহার করতে পারবেন।
            </p>

            <div className="space-y-3">
              {availableBlueprints.map((bp) => (
                <div
                  key={bp.id}
                  onClick={() => setSelectedBlueprintId(bp.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedBlueprintId === bp.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg'
                      : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-white flex items-center gap-2">
                        {bp.title}
                        {bp.sourceReferences[0]?.reviewerStatus === 'verified' ? (
                          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified Source
                          </span>
                        ) : (
                          <span className="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/30">
                            Needs verification / Provisional
                          </span>
                        )}
                      </h4>
                      {bp.sourceReferences[0] && (
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          উৎস (Source): {bp.sourceReferences[0].publisher} ({bp.sourceReferences[0].academicYear})
                          <a
                            href={bp.sourceReferences[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:underline flex items-center gap-0.5 ml-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            অফিসিয়াল লিংক <ExternalLink className="w-3 h-3" />
                          </a>
                        </p>
                      )}
                    </div>
                    {selectedBlueprintId === bp.id && (
                      <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Dates & Preferences */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">
              ৩. পরীক্ষার তারিখ ও পড়ার সময়সীমা নির্ধারণ:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" /> পরীক্ষার সম্ভাব্য তারিখ (Target Exam Date)
                </label>
                <input
                  type="date"
                  value={targetExamDate}
                  min={todayStr}
                  onChange={(e) => setTargetExamDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" /> এক একটি পঠন সেশনের সময় (Minutes per Session)
                </label>
                <select
                  value={preferences.preferredSessionMinutes}
                  onChange={(e) => setPreferences({ ...preferences, preferredSessionMinutes: Number(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={30}>৩০ মিনিট (স্বল্প বিরতি সেশন)</option>
                  <option value={45}>৪৫ মিনিট (আদর্শ রিট্রিভাল সেশন - Default)</option>
                  <option value={60}>৬০ মিনিট (১ ঘণ্টা সেশন)</option>
                  <option value={90}>৯০ মিনিট (ইন-ডেপথ প্র্যাকটিস)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700 space-y-3">
              <label className="block text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> অপরিকল্পিত বাফার টাইম (Unplanned Buffer Capacity)
              </label>
              <p className="text-xs text-slate-400">
                ডিফল্ট ২০% সময় বাফার হিসেবে রাখা হয় যাতে জরুরি কোনো কাজে পড়া মিস হলে চাপ না পড়ে।
              </p>
              <div className="flex items-center gap-4">
                {[
                  { value: 0.10, label: '১০% বাফার (টাইট রুটিন)' },
                  { value: 0.20, label: '২০% বাফার (সুপারিশকৃত)' },
                  { value: 0.30, label: '৩০% বাফার (ফ্লেক্সিবল)' },
                ].map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, bufferPercentage: b.value })}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      preferences.bufferPercentage === b.value
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Availability & Commitments */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">
              ৪. আপনার ফ্রি সময় ও নির্ধারিত কাজ (Commitments):
            </h3>

            {/* Commitments list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-300">নির্ধারিত কলেজ/কোচিং/বিশ্রাম ব্লকসমূহ:</h4>
                <button
                  onClick={handleAddCommitment}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> ব্লক যোগ করুন
                </button>
              </div>

              {commitments.map((cm) => (
                <div key={cm.id} className="bg-slate-900/60 p-3 rounded-xl border border-slate-700 flex items-center justify-between text-xs text-slate-300">
                  <div>
                    <span className="font-bold text-white">{cm.title}</span> — {DAY_NAMES[cm.dayOfWeek]} ({cm.startTime} - {cm.endTime})
                  </div>
                  <button
                    onClick={() => handleRemoveCommitment(cm.id)}
                    className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Goals & Feasibility Check */}
        {step === 5 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">
              ৫. কাস্টম ছাত্র লক্ষ্য ও রুটিন সম্ভাব্যতা (Feasibility Check):
            </h3>

            {/* Custom goals */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
              <label className="block text-sm font-semibold text-slate-300">ব্যক্তিগত লক্ষ্যসমূহ (Student Goals):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGoalInput}
                  onChange={(e) => setNewGoalInput(e.target.value)}
                  placeholder="যেমন: প্রতিদিন ৩০টি ইংরেজি ভোকাবুলারি রিভিশন"
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                />
                <button
                  onClick={handleAddCustomGoal}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  যোগ করুন
                </button>
              </div>

              <div className="space-y-2 mt-2">
                {customGoals.map((goal, idx) => (
                  <div key={idx} className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs text-slate-200">
                    <span>• {goal}</span>
                    <button
                      onClick={() => handleRemoveCustomGoal(idx)}
                      className="text-rose-400 hover:text-rose-300 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instant Feasibility Status Box */}
            <div className={`p-5 rounded-2xl border ${
              feasibility.isFeasible
                ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-900/30 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-base mb-2">
                <AlertCircle className="w-5 h-5" />
                {feasibility.isFeasible ? 'রুটিন টি সম্পূর্ণ বাস্তবায়নযোগ্য (Feasible)' : 'রুটিনে সময়ের ঘাটতি দেখা দিয়েছে (Infeasible)'}
              </div>
              <div className="text-xs space-y-1 leading-relaxed">
                <p>মোট ফ্রি সময়: {feasibility.totalAvailableMinutes} মিনিট</p>
                <p>২০% বাফার বাদে বরাদ্দযোগ্য সময়: {feasibility.usableMinutesAfterBuffer} মিনিট</p>
                <p>সিলেবাসের জন্য প্রয়োজনীয় সময়: {feasibility.totalRequiredMinutes} মিনিট</p>
                {feasibility.reasons.map((r, i) => (
                  <p key={i} className="font-semibold text-white mt-1">• {r}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-slate-200 font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> পেছনে
          </button>

          <button
            onClick={handleNextStep}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            {step === 5 ? 'রুটিন তৈরি করুন (Generate Plan)' : 'পরবর্তী ধাপ'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
