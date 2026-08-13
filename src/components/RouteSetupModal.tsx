import { useState } from 'react';
import { Stethoscope, GraduationCap, Building2, Atom, Check, ArrowRight, X } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { LearningRoute, StudentGameProfile } from '../types/gamification';
import { syllabus, MEDICAL_SUBJECT_IDS } from '../data/syllabus';

const MEDICAL_SUBJECTS_LIST = [
  { id: 'bio1', name: 'জীববিজ্ঞান ১ম পত্র' },
  { id: 'bio2', name: 'জীববিজ্ঞান ২য় পত্র' },
  { id: 'chem1', name: 'রসায়ন ১ম পত্র' },
  { id: 'chem2', name: 'রসায়ন ২য় পত্র' },
  { id: 'phys1', name: 'পদার্থবিজ্ঞান ১ম পত্র' },
  { id: 'phys2', name: 'পদার্থবিজ্ঞান ২য় পত্র' },
  { id: 'english', name: 'ইংরেজি' },
  { id: 'gk', name: 'সাধারণ জ্ঞান' },
];

const getSubjectsForRoute = (route: LearningRoute) => {
  if (route === 'medical') {
    return MEDICAL_SUBJECTS_LIST;
  } else if (route === 'academic') {
    return [
      { id: 'bio1', name: 'জীববিজ্ঞান ১ম পত্র' },
      { id: 'bio2', name: 'জীববিজ্ঞান ২য় পত্র' },
      { id: 'phys1', name: 'পদার্থবিজ্ঞান ১ম পত্র' },
      { id: 'phys2', name: 'পদার্থবিজ্ঞান ২য় পত্র' },
      { id: 'chem1', name: 'রসায়ন ১ম পত্র' },
      { id: 'chem2', name: 'রসায়ন ২য় পত্র' },
      { id: 'math1', name: 'উচ্চতর গণিত ১ম পত্র' },
      { id: 'math2', name: 'উচ্চতর গণিত ২য় পত্র' },
    ];
  } else {
    return syllabus
      .filter(s => !s.id.startsWith('gst_') && !s.id.startsWith('dcu_'))
      .map(s => ({ id: s.id, name: s.name }));
  }
};

interface RouteOption {
  id: LearningRoute;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
  defaultExam: string;
}

const ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'academic',
    title: 'একাডেমিক প্রস্তুতি',
    subtitle: 'SSC / HSC / বোর্ডভিত্তিক অনুশীলন',
    description: 'পাঠ্যবইয়ের অধ্যায়ভিত্তিক মৌলিক ও উচ্চতর দক্ষতা অনুশীলন।',
    icon: GraduationCap,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    defaultExam: 'HSC'
  },
  {
    id: 'medical',
    title: 'মেডিকেল ভর্তি',
    subtitle: 'মেডিকেল ভর্তি প্রস্তুতি',
    description: 'জীববিজ্ঞান, রসায়ন ও পদার্থবিজ্ঞানের দ্রুত ও নিখুঁত উত্তর অনুশীলন।',
    icon: Stethoscope,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    defaultExam: 'MBBS Admission'
  },
  {
    id: 'varsity',
    title: 'বিশ্ববিদ্যালয় ভর্তি',
    subtitle: 'GST / বিশ্ববিদ্যালয় ইউনিট প্রস্তুতি',
    description: 'ঢাকা বিশ্ববিদ্যালয় ও গুচ্ছ বিশ্ববিদ্যালয় ইউনিটের সমন্বিত অনুশীলন।',
    icon: Building2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    defaultExam: 'Varsity A Unit'
  },
  {
    id: 'engineering',
    title: 'ইঞ্জিনিয়ারিং ভর্তি',
    subtitle: 'গণিত, পদার্থবিজ্ঞান ও রসায়নভিত্তিক প্রস্তুতি',
    description: 'গাণিতিক সমস্যার নিখুঁত ধারণা ও সমস্যা সমাধানের দক্ষতা।',
    icon: Atom,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    defaultExam: 'BUET Admission'
  }
];

interface RouteSetupModalProps {
  user?: any;
  gameProfile?: Partial<StudentGameProfile> | null;
  currentRoute?: LearningRoute;
  currentTargetExam?: string;
  onSave?: (route: LearningRoute, targetExam: string) => void;
  onSaveProfile?: (profile: StudentGameProfile) => void;
  onClose?: () => void;
  isDismissable?: boolean;
}

export default function RouteSetupModal({ 
  user, 
  gameProfile, 
  currentRoute, 
  currentTargetExam, 
  onSave, 
  onSaveProfile, 
  onClose, 
  isDismissable = false 
}: RouteSetupModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRoute, setSelectedRoute] = useState<LearningRoute>(currentRoute || gameProfile?.selectedRoute || 'academic');
  const [targetExam, setTargetExam] = useState<string>(currentTargetExam || gameProfile?.targetExam || 'HSC 2026');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    gameProfile?.selectedSubjects && gameProfile.selectedSubjects.length > 0 
      ? gameProfile.selectedSubjects 
      : getSubjectsForRoute(selectedRoute).map(s => s.id)
  );
  const [saving, setSaving] = useState(false);

  const handleSelectRoute = (routeId: LearningRoute) => {
    setSelectedRoute(routeId);
    const option = ROUTE_OPTIONS.find(r => r.id === routeId);
    if (option && !targetExam) {
      setTargetExam(option.defaultExam);
    }
  };

  const toggleSubject = (subId: string) => {
    if (selectedSubjects.includes(subId)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter(id => id !== subId));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subId]);
    }
  };

  const handleSave = async () => {
    if (onSave) {
      onSave(selectedRoute, targetExam.trim() || 'সাধারণ প্রস্তুতি');
      return;
    }
    if (!user?.uid) return;
    setSaving(true);

    const updatedProfile: StudentGameProfile = {
      userId: user.uid,
      selectedRoute,
      targetExam: targetExam.trim() || 'সাধারণ প্রস্তুতি',
      selectedSubjects,
      skillDivisions: gameProfile?.skillDivisions || { [selectedRoute]: 'foundation' },
      progressPoints: gameProfile?.progressPoints || 0,
      helpPoints: gameProfile?.helpPoints || 0,
      currentStreak: gameProfile?.currentStreak || 1,
      lastMeaningfulStudyDate: gameProfile?.lastMeaningfulStudyDate || new Date().toISOString().split('T')[0],
      competitionOptIn: gameProfile?.competitionOptIn ?? false,
      updatedAt: new Date().toISOString()
    };

    try {
      if (db) {
        const docRef = doc(db, 'users', user.uid, 'gameProfile', 'main');
        await setDoc(docRef, {
          ...updatedProfile,
          updatedAt: serverTimestamp()
        }, { merge: true });

        // Also sync user document selectedRoute for top-level accessibility
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          selectedRoute,
          targetExam: updatedProfile.targetExam
        }, { merge: true });
      }

      onSaveProfile(updatedProfile);
      onClose?.();
    } catch (err) {
      console.error('Error saving game profile route:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {isDismissable && onClose && (
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* HEADER */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            আপনার প্রস্তুতির পথ বেছে নিন
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto">
            আপনার লক্ষ্য অনুযায়ী অনুশীলন, রুটিন ও অগ্রগতি সাজানো হবে।
          </p>
        </div>

        {/* STEP 1: ROUTE SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ROUTE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedRoute === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectRoute(opt.id)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? `${opt.bg} ${opt.border} ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/10`
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl ${opt.bg} ${opt.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">
                        {opt.title}
                      </h3>
                      <p className={`text-xs font-semibold mb-2 ${opt.color}`}>
                        {opt.subtitle}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 text-sm"
              >
                <span>পরবর্তী ধাপ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TARGET EXAM & SUBJECTS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                টার্গেট পরীক্ষা বা ব্যাচ (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                placeholder="যেমন: HSC 2026 বা MBBS 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                অনুশীলনের বিষয়সমূহ
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {getSubjectsForRoute(selectedRoute).map((subject) => {
                  const isChecked = selectedSubjects.includes(subject.id);

                  return (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => toggleSubject(subject.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-indigo-500/10 border-indigo-500/40 text-white' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-xs font-bold">{subject.name}</span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-400 hover:text-white px-4 py-2 rounded-xl transition-colors"
              >
                পেছনে যান
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20 text-sm disabled:opacity-50"
              >
                <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'প্রস্তুতি শুরু করুন'}</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
