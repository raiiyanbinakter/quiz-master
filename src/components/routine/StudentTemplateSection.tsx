import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Layers, CheckCircle2, Clock, Calendar, AlertCircle, RefreshCw, ChevronRight, Award, Flame 
} from 'lucide-react';
import { RoutineTemplate, RoutineEvent, LearningRoute, StudyPlan } from '../../types/routine';
import { 
  fetchPublishedRoutineTemplates, fetchPublishedRoutineEvents,
  getStudentRoutineProfile, updateStudentRoutineProfile 
} from '../../lib/adminRoutineFirestore';
import { generateStudyPlan } from '../../utils/routinePlanner';
import { DEMO_SYLLABUS_TOPICS, DEMO_DEFAULT_AVAILABILITY, DEMO_DEFAULT_COMMITMENTS } from '../../data/routineSeedData';

interface StudentTemplateSectionProps {
  userId: string | null;
  currentPlan: StudyPlan | null;
  onApplyTemplate: (newPlan: StudyPlan) => void;
}

export const StudentTemplateSection: React.FC<StudentTemplateSectionProps> = ({
  userId,
  currentPlan,
  onApplyTemplate,
}) => {
  const [templates, setTemplates] = useState<RoutineTemplate[]>([]);
  const [events, setEvents] = useState<RoutineEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<RoutineTemplate | null>(null);
  
  // Version update state
  const [hasNewVersion, setHasNewVersion] = useState<boolean>(false);
  const [newerTemplate, setNewerTemplate] = useState<RoutineTemplate | null>(null);
  const [viewVersionModal, setViewVersionModal] = useState<boolean>(false);

  useEffect(() => {
    loadPublishedTemplatesAndCheckVersion();
  }, [userId, currentPlan]);

  const loadPublishedTemplatesAndCheckVersion = async () => {
    setLoading(true);
    try {
      const tmpls = await fetchPublishedRoutineTemplates();
      const evts = await fetchPublishedRoutineEvents();
      setTemplates(tmpls);
      setEvents(evts);

      if (userId) {
        const profile = await getStudentRoutineProfile(userId);
        if (profile?.selectedTemplateId) {
          const matchingTmpl = tmpls.find(t => t.id === profile.selectedTemplateId);
          if (matchingTmpl) {
            setSelectedTemplate(matchingTmpl);
            const acceptedVersion = profile.acceptedTemplateVersion || 1;
            if (matchingTmpl.version > acceptedVersion) {
              setHasNewVersion(true);
              setNewerTemplate(matchingTmpl);
            }
          }
        }
      }
    } catch (err) {
      console.warn('Error loading published templates for student:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = async (template: RoutineTemplate) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const targetDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const matchedTopics = DEMO_SYLLABUS_TOPICS.filter(
      t => t.route === template.route
    );

    const newPlan = generateStudyPlan({
      userId: userId || 'student_user',
      route: template.route,
      title: template.banglaTitle,
      startDate: todayStr,
      targetExamDate: targetDate,
      preferences: {
        preferredSessionMinutes: template.sessionMinutes || 45,
        bufferPercentage: 0.20,
        studyDays: template.studyDays || [0, 1, 2, 3, 4, 5, 6],
        maxDailyStudyMinutes: template.suggestedDailyMinutes || 240,
        reviewGaps: template.revisionIntervals || [1, 3, 7, 14]
      },
      availability: DEMO_DEFAULT_AVAILABILITY,
      commitments: DEMO_DEFAULT_COMMITMENTS,
      customGoals: [template.dailyGoalText, template.weeklyGoalText].filter(Boolean),
      topics: matchedTopics.length > 0 ? matchedTopics : DEMO_SYLLABUS_TOPICS.slice(0, 5)
    });

    // Save profile linkage with accepted version
    if (userId) {
      await updateStudentRoutineProfile(userId, {
        route: template.route,
        selectedTemplateId: template.id,
        acceptedTemplateVersion: template.version,
        hasCustomSchedule: false,
        availableMinutesByDay: {},
        lockedSessionIds: []
      });
    }

    setSelectedTemplate(template);
    setHasNewVersion(false);
    setNewerTemplate(null);
    onApplyTemplate(newPlan);
  };

  const handleKeepCurrentRoutine = async () => {
    if (newerTemplate && userId) {
      await updateStudentRoutineProfile(userId, {
        acceptedTemplateVersion: newerTemplate.version
      });
    }
    setHasNewVersion(false);
    setViewVersionModal(false);
  };

  const studentRoute: LearningRoute = currentPlan?.route || 'academic';

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-slate-400 text-sm">
        উপযুক্ত রুটিন টেমপ্লেট লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="space-y-6 my-6">
      
      {/* 1. New Version Banner (Non-intrusive) */}
      {hasNewVersion && newerTemplate && (
        <div className="bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-purple-500/20 border border-amber-500/40 rounded-3xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-base">
                এই রুটিনের নতুন সংস্করণ পাওয়া গেছে (v{newerTemplate.version})
              </h4>
              <p className="text-slate-300 text-xs mt-0.5">
                এডমিন প্যানেল হতে নতুন সিলেবাস বা টপিক আপডেট দেওয়া হয়েছে। আপনার ব্যক্তিগত কাস্টম টাস্ক ও কাজ অক্ষুণ্ণ রেখে আপডেট গ্রহণ করতে পারেন।
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end md:self-auto shrink-0">
            <button
              onClick={() => setViewVersionModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              নতুন সংস্করণ দেখুন
            </button>
            <button
              onClick={handleKeepCurrentRoutine}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors border border-slate-700 cursor-pointer"
            >
              বর্তমান রুটিন রাখুন
            </button>
            <button
              onClick={() => handleSelectTemplate(newerTemplate)}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-extrabold transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              নতুন রুটিন ব্যবহার করুন
            </button>
          </div>
        </div>
      )}

      {/* 2. Active Routine Events Banner */}
      {events.filter(e => e.showOnHome && e.isPublished).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            চলতি ইভেন্ট রুটিন ও স্প্রিন্ট চ্যালেঞ্জ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {events.filter(e => e.showOnHome && e.isPublished).map(evt => (
              <div 
                key={evt.id}
                className={`p-4 rounded-2xl border border-slate-700/80 bg-gradient-to-r ${evt.bannerColor || 'from-indigo-900/60 to-slate-900'} relative`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
                  <span>📅 {evt.startDate} - {evt.endDate}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                    {evt.isJoinable ? 'উন্মুক্ত ইভেন্ট' : 'অটো রিকমেন্ডেড'}
                  </span>
                </div>
                <h4 className="text-white font-extrabold text-sm mb-1">{evt.banglaTitle}</h4>
                <p className="text-xs text-slate-300 line-clamp-2">{evt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Published Templates Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            রুটিন টেমপ্লেটস
          </h3>
          <span className="text-xs text-slate-400">
            শিক্ষার্থীদের জন্য প্রস্তুত করা বিজ্ঞানসম্মত টেমপ্লেট
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map(tmpl => {
            const isRecommended = tmpl.route === studentRoute;
            const isSelected = selectedTemplate?.id === tmpl.id;

            return (
              <div 
                key={tmpl.id}
                className={`rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-slate-900 border-emerald-500/60 shadow-xl ring-2 ring-emerald-500/20'
                    : isRecommended
                    ? 'bg-slate-900/80 border-indigo-500/40 hover:border-indigo-500'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      isRecommended 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {isRecommended ? 'আপনার জন্য প্রস্তাবিত' : 'নিজে বেছে নিন'}
                    </span>

                    {isSelected && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> সক্রিয় রুটিন
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-extrabold text-white mb-1">{tmpl.banglaTitle}</h4>
                  <p className="text-xs font-medium text-slate-400 mb-2">{tmpl.title}</p>
                  <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">{tmpl.description}</p>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 mb-4">
                    <div>
                      <div className="text-[10px] text-slate-400">দৈনিক স্টাডি</div>
                      <div className="font-bold text-white mt-0.5">{tmpl.suggestedDailyMinutes} মি.</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">সেশন দৈর্ঘ্য</div>
                      <div className="font-bold text-white mt-0.5">{tmpl.sessionMinutes} মি.</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">মক টেস্ট</div>
                      <div className="font-bold text-white mt-0.5 uppercase">{tmpl.mockTestFrequency}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`w-full py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  {isSelected ? 'পুনরায় টেমপ্লেট অ্যাপ্লাই করুন' : 'এই টেমপ্লেট ব্যবহার করুন'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* VIEW VERSION MODAL */}
      {viewVersionModal && newerTemplate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                নতুন সংস্করণ বিবরণ (v{newerTemplate.version})
              </h3>
              <button onClick={() => setViewVersionModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div>
              <h4 className="text-white font-extrabold text-base mb-1">{newerTemplate.banglaTitle}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{newerTemplate.description}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 font-bold">নতুন সিলেবাস আপডেট:</div>
              <div className="text-slate-200">• দৈনিক লক্ষ মাত্রা: {newerTemplate.dailyGoalText}</div>
              <div className="text-slate-200">• সাপ্তাহিক লক্ষ মাত্রা: {newerTemplate.weeklyGoalText}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={handleKeepCurrentRoutine}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs border border-slate-700"
              >
                বর্তমান রুটিন রাখুন
              </button>
              <button
                onClick={() => {
                  handleSelectTemplate(newerTemplate);
                  setViewVersionModal(false);
                }}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-500/20"
              >
                নতুন সংস্করণ ব্যবহার করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
