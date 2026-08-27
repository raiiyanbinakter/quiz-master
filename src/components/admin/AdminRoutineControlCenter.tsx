import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Plus, Save, Edit, Copy, Trash2, CheckCircle2, 
  XCircle, Calendar, Users, BarChart3, History, Shield, AlertTriangle, 
  Sparkles, RefreshCw, Eye, Tag, Clock, Flame, Award, ChevronDown, ChevronUp, Layers,
  Loader2
} from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { 
  RoutineTemplate, RoutineEvent, LearningRoute 
} from '../../types/routine';
import { 
  fetchAdminRoutineTemplates, saveAdminRoutineTemplate, deleteAdminRoutineTemplate,
  fetchAdminRoutineEvents, saveAdminRoutineEvent, deleteAdminRoutineEvent,
  fetchRoutineAnalyticsData, RoutineAnalyticsSummary,
  DEMO_ROUTINE_TEMPLATES, DEMO_ROUTINE_EVENTS
} from '../../lib/adminRoutineFirestore';

interface AdminRoutineControlCenterProps {
  user?: any;
  isAdmin?: boolean;
}

export default function AdminRoutineControlCenter({ user, isAdmin }: AdminRoutineControlCenterProps = {}) {
  const [activeTab, setActiveTab] = useState<'templates' | 'events' | 'targeting' | 'analytics' | 'history'>('templates');
  
  // Data States
  const [templates, setTemplates] = useState<RoutineTemplate[]>([]);
  const [events, setEvents] = useState<RoutineEvent[]>([]);
  const [analytics, setAnalytics] = useState<RoutineAnalyticsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Template Form State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Partial<RoutineTemplate> | null>(null);

  // Template Delete Confirmation Modal State
  const [templateToDelete, setTemplateToDelete] = useState<RoutineTemplate | null>(null);
  const [isDeletingTemplate, setIsDeletingTemplate] = useState(false);

  // Event Form State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<RoutineEvent> | null>(null);

  // Load Data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const tmpls = await fetchAdminRoutineTemplates();
      const evts = await fetchAdminRoutineEvents();
      const stats = await fetchRoutineAnalyticsData();
      setTemplates(tmpls);
      setEvents(evts);
      setAnalytics(stats);
    } catch (err) {
      console.error('Error loading admin routine data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setActionMessage({ text, type });
    setTimeout(() => setActionMessage(null), 4000);
  };

  // --- TEMPLATE HANDLERS ---
  const handleOpenTemplateModal = (template?: RoutineTemplate) => {
    if (template) {
      setEditingTemplate({ ...template });
    } else {
      setEditingTemplate({
        id: `tmpl_${Date.now()}`,
        title: '',
        banglaTitle: '',
        description: '',
        route: 'academic',
        targetProfiles: ['HSC 2025'],
        level: 'intermediate',
        subjects: ['পদার্থবিজ্ঞান ১ম পত্র'],
        topicOrder: ['ভেক্টর'],
        studyDays: [0, 1, 2, 3, 4, 5, 6],
        suggestedDailyMinutes: 240,
        sessionMinutes: 45,
        breakMinutes: 15,
        revisionIntervals: [1, 3, 7, 14],
        mockTestFrequency: 'weekly',
        dailyGoalText: 'দৈনিক ৪টি ফোকাস সেশন সম্পূর্ণ করা',
        weeklyGoalText: 'সাপ্তাহিক ১টি মডেল টেস্ট ও রিভিশন করা',
        isPublished: true,
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Admin'
      });
    }
    setIsTemplateModalOpen(true);
  };

  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate || !editingTemplate.title || !editingTemplate.banglaTitle) {
      showNotification('অনুগ্রহ করে শিরোনাম ও বাংলা শিরোনাম প্রদান করুন।', 'error');
      return;
    }

    try {
      const templateToSave = {
        ...editingTemplate,
        id: editingTemplate.id || `tmpl_${Date.now()}`,
        version: editingTemplate.version || 1,
        updatedAt: new Date().toISOString()
      } as RoutineTemplate;

      await saveAdminRoutineTemplate(templateToSave);
      showNotification('রুটিন টেমপ্লেট সফলভাবে সংরক্ষণ করা হয়েছে!');
      setIsTemplateModalOpen(false);
      setEditingTemplate(null);
      loadAllData();
    } catch (err) {
      console.error(err);
      showNotification('টেমপ্লেট সংরক্ষণে সমস্যা হয়েছে।', 'error');
    }
  };

  const handleDuplicateTemplate = async (tmpl: RoutineTemplate) => {
    try {
      const duplicated: RoutineTemplate = {
        ...tmpl,
        id: `tmpl_${Date.now()}`,
        title: `${tmpl.title} (Copy)`,
        banglaTitle: `${tmpl.banglaTitle} (কপি)`,
        version: 1,
        isPublished: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await saveAdminRoutineTemplate(duplicated);
      showNotification('টেমপ্লেট কপি করা হয়েছে!');
      loadAllData();
    } catch (err) {
      showNotification('কপি করতে সমস্যা হয়েছে।', 'error');
    }
  };

  const handleTogglePublishTemplate = async (tmpl: RoutineTemplate) => {
    try {
      const updated = { ...tmpl, isPublished: !tmpl.isPublished };
      await saveAdminRoutineTemplate(updated);
      showNotification(tmpl.isPublished ? 'টেমপ্লেট আনপাবলিশ করা হয়েছে' : 'টেমপ্লেট পাবলিশ করা হয়েছে');
      loadAllData();
    } catch (err) {
      showNotification('পাবলিশ স্টেটাস পরিবর্তন করতে ব্যর্থ', 'error');
    }
  };

  const handleConfirmDeleteTemplate = async (tmpl: RoutineTemplate) => {
    const currentUser = user || auth?.currentUser;
    if (!currentUser) {
      showNotification('টেমপ্লেট মুছে ফেলতে আগে লগইন করুন।', 'error');
      setTemplateToDelete(null);
      return;
    }

    let userIsAdmin = isAdmin;
    if (userIsAdmin === undefined && db && currentUser.uid) {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        userIsAdmin = userDoc.exists() && userDoc.data()?.role === 'admin';
      } catch (e) {
        console.error('Error checking admin status in Firestore:', e);
      }
    }

    if (userIsAdmin === false) {
      showNotification('এই টেমপ্লেট মুছে ফেলার অনুমতি আপনার নেই।', 'error');
      setTemplateToDelete(null);
      return;
    }

    setIsDeletingTemplate(true);
    try {
      await deleteAdminRoutineTemplate(tmpl.id, currentUser, userIsAdmin);
      setTemplates(prev => prev.filter(t => t.id !== tmpl.id));
      showNotification('রুটিন টেমপ্লেটটি মুছে ফেলা হয়েছে।', 'success');
      setTemplateToDelete(null);
    } catch (err: any) {
      console.error('Error deleting routine template:', err);
      if (err?.message === 'NOT_LOGGED_IN') {
        showNotification('টেমপ্লেট মুছে ফেলতে আগে লগইন করুন।', 'error');
      } else if (err?.message === 'NOT_ADMIN') {
        showNotification('এই টেমপ্লেট মুছে ফেলার অনুমতি আপনার নেই।', 'error');
      } else if (err?.message === 'NOT_FOUND' || err?.code === 'not-found') {
        showNotification('এই টেমপ্লেটটি আর পাওয়া যাচ্ছে না।', 'error');
      } else if (err?.code === 'permission-denied' || err?.message?.includes('permission') || err?.message === 'PERMISSION_DENIED') {
        showNotification('টেমপ্লেট মুছে ফেলা যায়নি। Firebase অনুমতি পরীক্ষা করুন।', 'error');
      } else {
        showNotification('টেমপ্লেট মুছে ফেলতে সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'error');
      }
    } finally {
      setIsDeletingTemplate(false);
    }
  };

  // --- EVENT HANDLERS ---
  const handleOpenEventModal = (event?: RoutineEvent) => {
    if (event) {
      setEditingEvent({ ...event });
    } else {
      setEditingEvent({
        id: `evt_${Date.now()}`,
        title: 'DEMO: Custom Revision Event',
        banglaTitle: 'ডেমো: কাস্টম রিভিশন ইভেন্ট',
        description: 'শিক্ষার্থীদের জন্য একটি বিশেষ রিভিশন স্প্রিন্ট ইভেন্ট।',
        route: 'academic',
        targetProfiles: ['HSC 2025', 'Admission 2025'],
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        bannerColor: 'from-indigo-600 via-purple-600 to-pink-600',
        requiredTopics: ['ভেক্টর', 'তাপগতিবিদ্যা'],
        suggestedDailyTasks: ['অধ্যায় ১ রিভিশন ও ২৫টি কুইজ সমাধান করা'],
        achievementTitle: 'রিভিশন স্প্রিন্টার 🏆',
        isJoinable: true,
        showOnHome: true,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title || !editingEvent.banglaTitle) {
      showNotification('অনুগ্রহ করে ইভেন্টের শিরোনাম দিন।', 'error');
      return;
    }

    try {
      const eventToSave = {
        ...editingEvent,
        id: editingEvent.id || `evt_${Date.now()}`,
        updatedAt: new Date().toISOString()
      } as RoutineEvent;

      await saveAdminRoutineEvent(eventToSave);
      showNotification('ইভেন্ট সফলভাবে সংরক্ষণ করা হয়েছে!');
      setIsEventModalOpen(false);
      setEditingEvent(null);
      loadAllData();
    } catch (err) {
      showNotification('ইভেন্ট সংরক্ষণে সমস্যা হয়েছে।', 'error');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই ইভেন্টটি মুছে ফেলতে চান?')) return;
    try {
      await deleteAdminRoutineEvent(id);
      showNotification('ইভেন্ট সফলভাবে মুছে ফেলা হয়েছে।');
      loadAllData();
    } catch (err) {
      showNotification('ইভেন্ট মুছে ফেলতে সমস্যা হয়েছে।', 'error');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl my-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl text-indigo-400">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              রুটিন কন্ট্রোল সেন্টার
            </h2>
          </div>
          <p className="text-slate-400 text-sm">
            শিক্ষার্থীদের জন্য রুটিন টেমপ্লেট, ইভেন্ট এবং ব্যক্তিগত সাজেশন পরিচালনা করুন।
          </p>
        </div>

        <button
          onClick={loadAllData}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold border border-slate-700 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          রিফ্রেশ
        </button>
      </div>

      {/* Action Notification Toast */}
      {actionMessage && (
        <div className={`mb-6 p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between ${
          actionMessage.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          <span>{actionMessage.text}</span>
          <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'templates' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
              : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          টেমপ্লেট ({templates.length})
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'events' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
              : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          ইভেন্ট রুটিন ({events.length})
        </button>

        <button
          onClick={() => setActiveTab('targeting')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'targeting' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
              : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          স্টুডেন্ট টারগেটিং
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'analytics' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
              : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          অ্যানালিটিক্স
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'history' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
              : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4 text-cyan-400" />
          ভার্সন হিস্ট্রি
        </button>
      </div>

      {/* TAB A: ROUTINE TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div>
              <h3 className="text-white font-bold text-base">রুটিন টেমপ্লেট লাইব্রেরি</h3>
              <p className="text-slate-400 text-xs">শিক্ষার্থীদের জন্য প্রস্তুতকৃত স্ট্যান্ডার্ড মাস্টার প্ল্যান</p>
            </div>
            <button
              onClick={() => handleOpenTemplateModal()}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              নতুন টেমপ্লেট তৈরি
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((tmpl) => (
              <div 
                key={tmpl.id}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 relative hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-extrabold uppercase">
                      {tmpl.route} • {tmpl.level}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        tmpl.isPublished ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {tmpl.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-slate-500 text-xs font-mono font-bold">v{tmpl.version}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-extrabold text-white mb-1">{tmpl.banglaTitle}</h4>
                  <p className="text-xs font-medium text-slate-400 mb-3">{tmpl.title}</p>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4">{tmpl.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                      ⏱ {tmpl.suggestedDailyMinutes} মি./দিন
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                      ⚡ {tmpl.sessionMinutes}মি. সেশন
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                      ☕ {tmpl.breakMinutes}মি. ব্রেক
                    </span>
                  </div>

                  {/* Syllabus Notice Badge */}
                  <div className="mb-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Custom template / Needs verification status applied to manual syllabus input</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 mt-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenTemplateModal(tmpl)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicateTemplate(tmpl)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleTogglePublishTemplate(tmpl)}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        tmpl.isPublished ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      }`}
                      title={tmpl.isPublished ? "Unpublish" : "Publish"}
                    >
                      {tmpl.isPublished ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <button
                    type="button"
                    aria-label="টেমপ্লেট মুছুন"
                    title="টেমপ্লেট মুছুন"
                    disabled={isDeletingTemplate}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTemplateToDelete(tmpl);
                    }}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs transition-colors disabled:opacity-50"
                  >
                    {isDeletingTemplate && templateToDelete?.id === tmpl.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB B: EVENT ROUTINES */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div>
              <h3 className="text-white font-bold text-base">ইভেন্ট রুটিন ম্যানেজমেন্ট</h3>
              <p className="text-slate-400 text-xs">বিশেষ তারিখ ও চ্যালেঞ্জভিত্তিক শর্ট-টার্ম ইভেন্ট পরিচালনা</p>
            </div>
            <button
              onClick={() => handleOpenEventModal()}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              নতুন ইভেন্ট তৈরি
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((evt) => (
              <div 
                key={evt.id}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 relative hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Event Top Banner Accent */}
                <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${evt.bannerColor || 'from-indigo-500 to-emerald-500'}`} />

                <div>
                  <div className="flex items-start justify-between gap-2 mb-3 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-extrabold">
                      📅 {evt.startDate} হতে {evt.endDate}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      evt.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {evt.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-white mb-1">{evt.banglaTitle}</h4>
                  <p className="text-xs font-medium text-slate-400 mb-2">{evt.title}</p>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-3">{evt.description}</p>

                  {evt.achievementTitle && (
                    <div className="mb-3 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      <span>পুরস্কার/ব্যাজ: {evt.achievementTitle}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEventModal(evt)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                      title="Edit Event"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs"
                    title="Delete Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB C: STUDENT TARGETING */}
      {activeTab === 'targeting' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">স্টুডেন্ট গ্রুপ ও প্রোফাইল ম্যাপিং</h3>
            <p className="text-xs text-slate-400 mb-6">
              নির্দিষ্ট গ্রুপের শিক্ষার্থীদের জন্য কোন টেমপ্লেট ও ইভেন্ট রুটিন সুপারিশ হিসেবে দেখাবে তা পরিচালনা করুন।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Academic Route</span>
                <h4 className="text-white font-extrabold mt-1 mb-2">এইচএসসি ও বোর্ড পরীক্ষা</h4>
                <p className="text-xs text-slate-400 mb-3">Target Profiles: HSC 2025, HSC 2026, Board Examinee</p>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
                  ম্যাপ করা টেমপ্লেট: HSC Academic Complete Mastery Plan
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Medical Route</span>
                <h4 className="text-white font-extrabold mt-1 mb-2">মেডিকেল ভর্তি প্রস্তুতি</h4>
                <p className="text-xs text-slate-400 mb-3">Target Profiles: Medical Candidate, Repeat Examinee</p>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
                  ম্যাপ করা টেমপ্লেট: Medical Admissions Intensive Sprint
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB D: ROUTINE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              রুটিন ব্যবহারের প্রকৃত অ্যানালিটিক্স
            </h3>

            {analytics && analytics.hasData ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-xs font-bold text-slate-400 mb-1">টেমপ্লেট এনরোলমেন্ট</div>
                  <div className="text-2xl font-extrabold text-white">{analytics.templateEnrollmentCount}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-xs font-bold text-slate-400 mb-1">পরিকল্পিত সেশন</div>
                  <div className="text-2xl font-extrabold text-indigo-400">{analytics.plannedSessionCount}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-xs font-bold text-slate-400 mb-1">সম্পন্নকৃত সেশন</div>
                  <div className="text-2xl font-extrabold text-emerald-400">{analytics.completedSessionCount}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-xs font-bold text-slate-400 mb-1">স্কিপ করা সেশন</div>
                  <div className="text-2xl font-extrabold text-rose-400">{analytics.skippedSessionCount}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-xs font-bold text-slate-400 mb-1">সামগ্রিক সম্পন্ন করার হার</div>
                  <div className="text-2xl font-extrabold text-amber-400">{analytics.completionPercentage}%</div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400 text-sm font-medium">
                এখনও পর্যাপ্ত রুটিন ডেটা পাওয়া যায়নি।
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB E: TEMPLATE VERSION HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">টেমপ্লেট ভার্সন ইতিহাস</h3>
            <p className="text-xs text-slate-400 mb-6">
              টেমপ্লেটের প্রতিটি আপডেটের ভার্সন ট্র্যাকিং। এডমিন টেমপ্লেট ভার্সন বাড়ালে শিক্ষার্থীরা নন-ইনট্রুসিভ নোটিফিকেশন পাবে।
            </p>

            <div className="space-y-3">
              {templates.map(tmpl => (
                <div key={tmpl.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-extrabold text-sm">{tmpl.banglaTitle}</h4>
                    <p className="text-xs text-slate-400">সর্বশেষ আপডেট: {new Date(tmpl.updatedAt).toLocaleDateString('bn-BD')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-mono font-bold rounded-xl text-xs border border-indigo-500/30">
                      Version {tmpl.version}
                    </span>
                    <button
                      onClick={async () => {
                        const updated = { ...tmpl, version: tmpl.version + 1 };
                        await saveAdminRoutineTemplate(updated);
                        showNotification(`ভার্সন v${tmpl.version + 1}-এ উন্নীত করা হয়েছে!`);
                        loadAllData();
                      }}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl transition-colors"
                    >
                      Bump Version (+1)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATE DELETE CONFIRMATION MODAL */}
      {templateToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3.5 text-rose-400">
              <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  এই রুটিন টেমপ্লেটটি মুছে ফেলতে চান?
                </h3>
                <p className="text-xs text-rose-400 font-semibold mt-0.5">
                  এই কাজটি ফিরিয়ে আনা যাবে না।
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-1">
              <div className="text-[11px] font-bold text-slate-400">টেমপ্লেট:</div>
              <div className="text-sm font-bold text-white">
                {templateToDelete.banglaTitle}
              </div>
              {templateToDelete.title && (
                <div className="text-xs text-slate-400 font-medium">
                  {templateToDelete.title}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                disabled={isDeletingTemplate}
                onClick={() => setTemplateToDelete(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors disabled:opacity-50"
              >
                বাতিল করুন
              </button>
              <button
                type="button"
                disabled={isDeletingTemplate}
                onClick={() => handleConfirmDeleteTemplate(templateToDelete)}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors disabled:opacity-50 shadow-lg shadow-rose-600/20"
              >
                {isDeletingTemplate ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>মুছে ফেলা হচ্ছে...</span>
                  </>
                ) : (
                  <span>মুছে ফেলুন</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATE EDIT / CREATE MODAL */}
      {isTemplateModalOpen && editingTemplate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingTemplate.id ? 'টেমপ্লেট এডিট করুন' : 'নতুন টেমপ্লেট তৈরি'}
              </h3>
              <button 
                onClick={() => setIsTemplateModalOpen(false)}
                className="text-slate-400 hover:text-white p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-300 mb-1">বাংলা শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={editingTemplate.banglaTitle || ''}
                  onChange={e => setEditingTemplate({...editingTemplate, banglaTitle: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="যেমন: এইচএসসি একাডেমি মাস্টার প্ল্যান"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">ইংরেজি টাইটেল *</label>
                <input
                  type="text"
                  required
                  value={editingTemplate.title || ''}
                  onChange={e => setEditingTemplate({...editingTemplate, title: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. HSC Complete Mastery Plan"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">বিবরণ</label>
                <textarea
                  value={editingTemplate.description || ''}
                  onChange={e => setEditingTemplate({...editingTemplate, description: e.target.value})}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">লার্নিং রুট</label>
                  <select
                    value={editingTemplate.route || 'academic'}
                    onChange={e => setEditingTemplate({...editingTemplate, route: e.target.value as LearningRoute})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="academic">Academic</option>
                    <option value="medical">Medical</option>
                    <option value="varsity">Varsity</option>
                    <option value="engineering">Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">লেভেল</label>
                  <select
                    value={editingTemplate.level || 'intermediate'}
                    onChange={e => setEditingTemplate({...editingTemplate, level: e.target.value as any})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="intensive">Intensive</option>
                    <option value="recovery">Recovery</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">দৈনিক মিনিট (Suggested)</label>
                  <input
                    type="number"
                    value={editingTemplate.suggestedDailyMinutes || 240}
                    onChange={e => setEditingTemplate({...editingTemplate, suggestedDailyMinutes: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">সেশন মিনিট</label>
                  <input
                    type="number"
                    value={editingTemplate.sessionMinutes || 45}
                    onChange={e => setEditingTemplate({...editingTemplate, sessionMinutes: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">ব্রেক মিনিট</label>
                  <input
                    type="number"
                    value={editingTemplate.breakMinutes || 15}
                    onChange={e => setEditingTemplate({...editingTemplate, breakMinutes: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">দৈনিক গোল টেক্সট</label>
                <input
                  type="text"
                  value={editingTemplate.dailyGoalText || ''}
                  onChange={e => setEditingTemplate({...editingTemplate, dailyGoalText: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">সাপ্তাহিক গোল টেক্সট</label>
                <input
                  type="text"
                  value={editingTemplate.weeklyGoalText || ''}
                  onChange={e => setEditingTemplate({...editingTemplate, weeklyGoalText: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingTemplate.isPublished || false}
                    onChange={e => setEditingTemplate({...editingTemplate, isPublished: e.target.checked})}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-0"
                  />
                  <span>সরাসরি পাবলিশ করুন</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EVENT EDIT / CREATE MODAL */}
      {isEventModalOpen && editingEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingEvent.id ? 'ইভেন্ট এডিট করুন' : 'নতুন ইভেন্ট তৈরি'}
              </h3>
              <button 
                onClick={() => setIsEventModalOpen(false)}
                className="text-slate-400 hover:text-white p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-300 mb-1">ইভেন্ট বাংলা শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.banglaTitle || ''}
                  onChange={e => setEditingEvent({...editingEvent, banglaTitle: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  placeholder="যেমন: ডেমো: ৭ দিনের রিভিশন চ্যালেঞ্জ"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">ইভেন্ট ইংরেজি টাইটেল *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={e => setEditingEvent({...editingEvent, title: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  placeholder="e.g. DEMO: 7-Day High Yield Revision Challenge"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  value={editingEvent.description || ''}
                  onChange={e => setEditingEvent({...editingEvent, description: e.target.value})}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">শুরুর তারিখ</label>
                  <input
                    type="date"
                    value={editingEvent.startDate || ''}
                    onChange={e => setEditingEvent({...editingEvent, startDate: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">শেষের তারিখ</label>
                  <input
                    type="date"
                    value={editingEvent.endDate || ''}
                    onChange={e => setEditingEvent({...editingEvent, endDate: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">পুরস্কার/ব্যাজ শিরোনাম (Optional)</label>
                <input
                  type="text"
                  value={editingEvent.achievementTitle || ''}
                  onChange={e => setEditingEvent({...editingEvent, achievementTitle: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  placeholder="যেমন: ৭ দিনের রিভিশন মাস্টার 🏆"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingEvent.isJoinable ?? true}
                    onChange={e => setEditingEvent({...editingEvent, isJoinable: e.target.checked})}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-0"
                  />
                  <span>স্টুডেন্ট জয়েন করতে পারবে</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingEvent.showOnHome ?? true}
                    onChange={e => setEditingEvent({...editingEvent, showOnHome: e.target.checked})}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-0"
                  />
                  <span>হোমে প্রদর্শন করুন</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingEvent.isPublished ?? true}
                    onChange={e => setEditingEvent({...editingEvent, isPublished: e.target.checked})}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-0"
                  />
                  <span>পাবলিশ করুন</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
