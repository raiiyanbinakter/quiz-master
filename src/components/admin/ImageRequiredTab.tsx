import React, { useState, useEffect, useMemo } from 'react';
import {
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle2,
  Search,
  RefreshCw,
  Layers,
  Loader2,
  FileText,
  Filter,
  Tag,
  BookOpen,
  Hash,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { QuestionItem, QuestionMediaPlacement } from '../../types/questionBank';
import {
  QuestionNeedingImage,
  fetchAllQuestionsNeedingImage,
  getPlacementBanglaLabel
} from '../../lib/questionMediaOverrides';
import { MediaPlacement } from '../../utils/questionMediaRequirements';
import {
  getRouteLabel,
  getSubjectLabel
} from '../../utils/getAllNormalizedQuestions';
import { MathText } from '../MathText';

interface ImageRequiredTabProps {
  questions: QuestionItem[];
  userEmail: string;
  onRefreshQuestions?: () => void;
}

export interface NormalizedMediaRequirement extends QuestionNeedingImage {
  routeId: string;
  subjectId: string;
  paperId: string;
  chapterId: string;
  topicId: string;
  sourceSetId: string;
}

export function formatPlacementRequirementLabel(placement: MediaPlacement | QuestionMediaPlacement | string): string {
  switch (placement) {
    case 'question':
      return 'question image required (প্রশ্নের মূল চিত্র প্রয়োজন)';
    case 'stimulus':
      return 'stimulus image required (উদ্দীপকের চিত্র প্রয়োজন)';
    case 'option_a':
      return 'option_a image required (অপশন ক-এর চিত্র প্রয়োজন)';
    case 'option_b':
      return 'option_b image required (অপশন খ-এর চিত্র প্রয়োজন)';
    case 'option_c':
      return 'option_c image required (অপশন গ-এর চিত্র প্রয়োজন)';
    case 'option_d':
      return 'option_d image required (অপশন ঘ-এর চিত্র প্রয়োজন)';
    case 'option_e':
      return 'option_e image required (অপশন ঙ-এর চিত্র প্রয়োজন)';
    case 'explanation':
      return 'explanation image required (ব্যাখ্যার চিত্র প্রয়োজন)';
    default:
      return `${placement} image required`;
  }
}

/**
 * Normalizes a detected question requirement to strictly use stable IDs
 */
function normalizeRequirementItem(item: QuestionNeedingImage): NormalizedMediaRequirement {
  const anyItem = item as any;
  const routeId = (anyItem.routeId || item.route || 'unknown').trim().toLowerCase();
  const subjectId = (anyItem.subjectId || item.subject || 'unknown').trim().toLowerCase();
  const paperId = (anyItem.paperId || item.paper || 'not_applicable').trim().toLowerCase();
  const chapterId = (item.chapterId || item.chapterName || 'unknown').trim();
  const topicId = (item.topicId || item.topicName || 'general').trim();
  const sourceSetId = (anyItem.sourceSetId || item.sourceSetLabel || item.sourceType || 'default').trim();

  return {
    ...item,
    routeId,
    subjectId,
    paperId,
    chapterId,
    topicId,
    sourceSetId
  };
}

export default function ImageRequiredTab({
  questions,
  userEmail: _userEmail,
  onRefreshQuestions
}: ImageRequiredTabProps) {
  // Single canonical normalized media-requirement array
  const [rawItems, setRawItems] = useState<QuestionNeedingImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Stable ID filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [routeFilter, setRouteFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [paperFilter, setPaperFilter] = useState<string>('all');
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'image_missing' | 'image_uploaded'>('all');

  const loadAll = async () => {
    setLoading(true);
    try {
      const data = await fetchAllQuestionsNeedingImage(questions);
      setRawItems(data || []);
    } catch (err) {
      console.error('Failed to scan questions needing images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [questions]);

  // 1. One canonical normalized media-requirement array for summary counts, filters, and list
  const items: NormalizedMediaRequirement[] = useMemo(() => {
    return rawItems.map(normalizeRequirementItem);
  }, [rawItems]);

  // 2. Dynamic Route Options (Derived ONLY from normalized items)
  const availableRoutes = useMemo(() => {
    const map = new Map<string, { id: string; label: string; count: number }>();
    items.forEach(it => {
      const id = it.routeId;
      const label = id === 'unknown' ? 'মেটাডেটা যাচাই প্রয়োজন' : getRouteLabel(id);
      const curr = map.get(id) || { id, label, count: 0 };
      curr.count++;
      map.set(id, curr);
    });
    return Array.from(map.values());
  }, [items]);

  // 3. Dynamic Subject Options (Derived ONLY from normalized items)
  const availableSubjects = useMemo(() => {
    const map = new Map<string, { id: string; label: string; count: number }>();
    const source = routeFilter === 'all' ? items : items.filter(it => it.routeId === routeFilter);
    source.forEach(it => {
      const id = it.subjectId;
      const label = id === 'unknown' ? 'মেটাডেটা যাচাই প্রয়োজন' : (it.subjectLabel || getSubjectLabel(id));
      const curr = map.get(id) || { id, label, count: 0 };
      curr.count++;
      map.set(id, curr);
    });
    return Array.from(map.values());
  }, [items, routeFilter]);

  // 4. Dynamic Paper Options (Derived ONLY from normalized items)
  const availablePapers = useMemo(() => {
    const map = new Map<string, { id: string; label: string; count: number }>();
    const source = items.filter(it => {
      const matchesRoute = routeFilter === 'all' || it.routeId === routeFilter;
      const matchesSubject = subjectFilter === 'all' || it.subjectId === subjectFilter;
      return matchesRoute && matchesSubject;
    });
    source.forEach(it => {
      const id = it.paperId;
      let label = it.paperLabel || id;
      if (id === 'first') label = '১ম পত্র';
      else if (id === 'second') label = '২য় পত্র';
      else if (id === 'not_applicable') label = 'প্রযোজ্য নয়';
      else if (id === 'unknown') label = 'মেটাডেটা যাচাই প্রয়োজন';
      const curr = map.get(id) || { id, label, count: 0 };
      curr.count++;
      map.set(id, curr);
    });
    return Array.from(map.values());
  }, [items, routeFilter, subjectFilter]);

  // 5. Dynamic Chapter Options (Derived ONLY from normalized items)
  const availableChapters = useMemo(() => {
    const map = new Map<string, { id: string; label: string; count: number }>();
    const source = items.filter(it => {
      const matchesRoute = routeFilter === 'all' || it.routeId === routeFilter;
      const matchesSubject = subjectFilter === 'all' || it.subjectId === subjectFilter;
      const matchesPaper = paperFilter === 'all' || it.paperId === paperFilter;
      return matchesRoute && matchesSubject && matchesPaper;
    });
    source.forEach(it => {
      const id = it.chapterId;
      const label = id === 'unknown' ? 'মেটাডেটা যাচাই প্রয়োজন' : (it.chapterName || id);
      const curr = map.get(id) || { id, label, count: 0 };
      curr.count++;
      map.set(id, curr);
    });
    return Array.from(map.values());
  }, [items, routeFilter, subjectFilter, paperFilter]);

  // 6. Dynamic Topic Options (Derived ONLY from normalized items)
  const availableTopics = useMemo(() => {
    const map = new Map<string, { id: string; label: string; count: number }>();
    const source = items.filter(it => {
      const matchesRoute = routeFilter === 'all' || it.routeId === routeFilter;
      const matchesSubject = subjectFilter === 'all' || it.subjectId === subjectFilter;
      const matchesPaper = paperFilter === 'all' || it.paperId === paperFilter;
      const matchesChapter = chapterFilter === 'all' || it.chapterId === chapterFilter;
      return matchesRoute && matchesSubject && matchesPaper && matchesChapter;
    });
    source.forEach(it => {
      const id = it.topicId;
      let label = it.topicName || id;
      if (id === 'unknown') label = 'মেটাডেটা যাচাই প্রয়োজন';
      else if (id === 'general' && !it.topicName) label = 'সাধারণ / বিবিধ';
      const curr = map.get(id) || { id, label, count: 0 };
      curr.count++;
      map.set(id, curr);
    });
    return Array.from(map.values());
  }, [items, routeFilter, subjectFilter, paperFilter, chapterFilter]);

  // 7. Filtered Question List (Filtered using stable IDs only)
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesRoute = routeFilter === 'all' || item.routeId === routeFilter;
      const matchesSubject = subjectFilter === 'all' || item.subjectId === subjectFilter;
      const matchesPaper = paperFilter === 'all' || item.paperId === paperFilter;
      const matchesChapter = chapterFilter === 'all' || item.chapterId === chapterFilter;
      const matchesTopic = topicFilter === 'all' || item.topicId === topicFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.stem.toLowerCase().includes(q) ||
        (item.chapterName && item.chapterName.toLowerCase().includes(q)) ||
        (item.topicName && item.topicName.toLowerCase().includes(q)) ||
        (item.stimulus && item.stimulus.toLowerCase().includes(q)) ||
        (item.teacher && item.teacher.toLowerCase().includes(q)) ||
        String(item.questionId).includes(q) ||
        String(item.sourceQuestionNumber || '').includes(q) ||
        item.stableKey.toLowerCase().includes(q);

      return (
        matchesRoute &&
        matchesSubject &&
        matchesPaper &&
        matchesChapter &&
        matchesTopic &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [items, routeFilter, subjectFilter, paperFilter, chapterFilter, topicFilter, statusFilter, searchQuery]);

  // Summary counts calculated from the EXACT same normalized array
  const totalDetected = items.length;
  const missingCount = items.filter((it) => it.status === 'image_missing').length;
  const uploadedCount = items.filter((it) => it.status === 'image_uploaded').length;

  const isAnyFilterActive =
    routeFilter !== 'all' ||
    subjectFilter !== 'all' ||
    paperFilter !== 'all' ||
    chapterFilter !== 'all' ||
    topicFilter !== 'all' ||
    statusFilter !== 'all' ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setRouteFilter('all');
    setSubjectFilter('all');
    setPaperFilter('all');
    setChapterFilter('all');
    setTopicFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  // Internal Admin Debug Log
  useEffect(() => {
    console.debug('[ImageRequiredTab Debug]', {
      totalDetectedRequirements: totalDetected,
      requirementsAfterFilters: filteredItems.length,
      selectedFilterIDs: {
        routeId: routeFilter,
        subjectId: subjectFilter,
        paperId: paperFilter,
        chapterId: chapterFilter,
        topicId: topicFilter,
        status: statusFilter,
        searchQuery
      },
      requirementsList: items.map(it => ({
        stableKey: it.stableKey,
        questionId: it.questionId,
        routeId: it.routeId,
        subjectId: it.subjectId,
        paperId: it.paperId,
        chapterId: it.chapterId,
        topicId: it.topicId,
        status: it.status
      }))
    });
  }, [items, filteredItems, totalDetected, routeFilter, subjectFilter, paperFilter, chapterFilter, topicFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Stats Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <span>স্বয়ংক্রিয় চিত্র সনাক্তকরণ ও চিত্র কন্ট্রোল (Image Required Manager)</span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              সকল রাউট ও চ্যাপ্টারে <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">[এখানে চিত্র ছিল]</code> থাকা প্রশ্নসমূহ স্বয়ংক্রিয়ভাবে স্ক্যান করে সনাক্ত করা হয়েছে।
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAnyFilterActive && (
              <button
                onClick={handleResetFilters}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="সকল ফিল্টার রিসেট করুন"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>সব ফিল্টার রিসেট করুন</span>
              </button>
            )}

            <button
              onClick={() => {
                loadAll();
                if (onRefreshQuestions) onRefreshQuestions();
              }}
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>পুনরায় স্ক্যান করুন</span>
            </button>
          </div>
        </div>

        {/* Top Summary Counts - Same Normalized Array */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Total Image-Required */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">মোট চিত্র-প্রয়োজনীয় প্রশ্ন</span>
              <span className="text-2xl font-extrabold text-white mt-0.5 block">{totalDetected}</span>
            </div>
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          {/* Missing Uploads */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">চিত্র যোগ করা বাকি</span>
              <span className="text-2xl font-extrabold text-amber-300 mt-0.5 block">{missingCount}</span>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Uploaded Completed */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">চিত্র সংযুক্ত সম্পন্ন</span>
              <span className="text-2xl font-extrabold text-emerald-300 mt-0.5 block">{uploadedCount}</span>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-3 pt-1">
          {/* Row 1: Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্রশ্ন টেক্সট, চ্যাপ্টার, টপিক, উদ্দীপক বা প্রশ্ন নং দিয়ে খুঁজুন..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Row 2: Select Filters (IDs as values, UI text as labels) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {/* Route Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 block uppercase">রুট</label>
              <select
                value={routeFilter}
                onChange={(e) => {
                  setRouteFilter(e.target.value);
                  setSubjectFilter('all');
                  setChapterFilter('all');
                  setTopicFilter('all');
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white font-medium focus:outline-none focus:border-amber-500/50"
              >
                <option value="all">সকল রুট ({items.length})</option>
                {availableRoutes.map(r => (
                  <option key={r.id} value={r.id}>{r.label} ({r.count})</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 block uppercase">বিষয়</label>
              <select
                value={subjectFilter}
                onChange={(e) => {
                  setSubjectFilter(e.target.value);
                  setChapterFilter('all');
                  setTopicFilter('all');
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white font-medium focus:outline-none focus:border-amber-500/50"
              >
                <option value="all">সকল বিষয়</option>
                {availableSubjects.map(s => (
                  <option key={s.id} value={s.id}>{s.label} ({s.count})</option>
                ))}
              </select>
            </div>

            {/* Paper Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 block uppercase">পত্র</label>
              <select
                value={paperFilter}
                onChange={(e) => setPaperFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white font-medium focus:outline-none focus:border-amber-500/50"
              >
                <option value="all">সকল পত্র</option>
                {availablePapers.map(p => (
                  <option key={p.id} value={p.id}>{p.label} ({p.count})</option>
                ))}
              </select>
            </div>

            {/* Chapter Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 block uppercase">অধ্যায়</label>
              <select
                value={chapterFilter}
                onChange={(e) => {
                  setChapterFilter(e.target.value);
                  setTopicFilter('all');
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white font-medium focus:outline-none focus:border-amber-500/50 truncate"
              >
                <option value="all">সকল অধ্যায়</option>
                {availableChapters.map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.label} ({ch.count})</option>
                ))}
              </select>
            </div>

            {/* Topic Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 block uppercase">টপিক / টাইপ</label>
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white font-medium focus:outline-none focus:border-amber-500/50 truncate"
              >
                <option value="all">সকল টপিক</option>
                {availableTopics.map(t => (
                  <option key={t.id} value={t.id}>{t.label} ({t.count})</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 block uppercase">স্ট্যাটাস</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white font-medium focus:outline-none focus:border-amber-500/50"
              >
                <option value="all">সকল ({totalDetected})</option>
                <option value="image_missing">চিত্র বাকি ({missingCount})</option>
                <option value="image_uploaded">চিত্র যুক্ত ({uploadedCount})</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Detected Questions List */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-slate-400 text-xs font-bold">সকল প্রশ্ন স্ক্যান করে স্বয়ংক্রিয় সনাক্তকরণ সম্পন্ন হচ্ছে...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4">
          {totalDetected === 0 ? (
            /* True Empty State - Only when total detected is truly 0 */
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">কোনো চিত্র-প্রয়োজনীয় প্রশ্ন অবশিষ্ট নেই</h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto">
                সবগুলো প্রশ্নের চিত্র সম্পূর্ণ বা কোনো চিত্র প্রয়োজনীয় প্রশ্ন অবশিষ্ট নেই।
              </p>
            </div>
          ) : (
            /* Filter Mismatch Empty State - When total > 0 but filter returns 0 */
            <div className="space-y-3 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <Filter className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white">নির্বাচিত ফিল্টারের সাথে কোনো প্রশ্ন পাওয়া যায়নি।</h3>
              <p className="text-slate-400 text-xs">
                নির্বাচিত ফিল্টারের শর্তে কোনো প্রশ্ন পাওয়া যায়নি। মোট {totalDetected} টি চিত্র-প্রয়োজনীয় প্রশ্ন সংরক্ষিত রয়েছে।
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 mx-auto transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>সব ফিল্টার রিসেট করুন</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-400">
              সনাক্তকৃত প্রশ্ন দেখানো হচ্ছে: <span className="text-white font-extrabold">{filteredItems.length}</span> টি
              {isAnyFilterActive && (
                <span className="text-amber-400 font-medium ml-2">
                  (মোট {totalDetected} টির মধ্যে ফিল্টারকৃত)
                </span>
              )}
            </span>

            {isAnyFilterActive && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ফিল্টার রিসেট</span>
              </button>
            )}
          </div>

          {filteredItems.map((item) => {
            const isUploaded = item.status === 'image_uploaded';
            const detectedReqs = item.detectedRequirements || [];
            const reqPlacements = item.requiredPlacements && item.requiredPlacements.length > 0
              ? item.requiredPlacements
              : ['question' as QuestionMediaPlacement];

            return (
              <div
                key={item.stableKey}
                className={`bg-slate-900 border rounded-3xl p-5 md:p-6 shadow-xl transition-all space-y-4 ${
                  isUploaded
                    ? 'border-emerald-500/30 shadow-emerald-950/10'
                    : 'border-amber-500/40 shadow-amber-950/20'
                }`}
              >
                {/* 1. Meta Badges Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Route */}
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase border ${
                      item.routeId === 'unknown'
                        ? 'bg-purple-950/50 text-purple-300 border-purple-800'
                        : 'bg-slate-800 text-cyan-300 border-slate-700'
                    }`}>
                      {item.routeId === 'unknown' ? 'মেটাডেটা যাচাই প্রয়োজন' : getRouteLabel(item.routeId)}
                    </span>

                    {/* Subject & Paper */}
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800/80 text-purple-300 border border-slate-700">
                      {item.subjectId === 'unknown' ? 'মেটাডেটা যাচাই প্রয়োজন' : (item.subjectLabel || getSubjectLabel(item.subjectId))} {item.paperLabel ? `(${item.paperLabel})` : ''}
                    </span>

                    {/* Chapter */}
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800/60 text-slate-300 border border-slate-700/60 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      {item.chapterId === 'unknown' ? 'মেটাডেটা যাচাই প্রয়োজন' : item.chapterName}
                    </span>

                    {/* Topic/Type */}
                    {item.topicName && (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-500" />
                        {item.topicName}
                      </span>
                    )}

                    {/* Source Question Number */}
                    {(item.sourceQuestionNumber || item.questionId) && (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                        <Hash className="w-3 h-3 text-amber-400" />
                        প্রশ্ন নং #{item.sourceQuestionNumber || item.questionId}
                      </span>
                    )}

                    {/* Stable Key Label */}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-500 border border-slate-800">
                      {item.stableKey}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isUploaded ? (
                      <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        চিত্র সংযুক্ত সম্পন্ন
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        চিত্র যোগ করা বাকি
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Detected Media Requirements List */}
                <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-3.5 space-y-2">
                  <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>সনাক্তকৃত চিত্র চাহিদা (Detected Media Requirements):</span>
                  </div>

                  <div className="space-y-1.5 pl-1">
                    {detectedReqs.length > 0 ? (
                      detectedReqs.map((req, rIdx) => (
                        <div key={rIdx} className="text-xs flex items-center gap-2 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span className="font-mono text-amber-300 font-semibold">{req.placement}</span>
                          <span className="text-slate-400">—</span>
                          <span className="text-slate-200">{formatPlacementRequirementLabel(req.placement)}</span>
                        </div>
                      ))
                    ) : (
                      reqPlacements.map((p, pIdx) => (
                        <div key={pIdx} className="text-xs flex items-center gap-2 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span className="font-mono text-amber-300 font-semibold">{p}</span>
                          <span className="text-slate-400">—</span>
                          <span className="text-slate-200">{getPlacementBanglaLabel(p)} প্রয়োজন</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 3. Question Preview Section */}
                <div className="space-y-3">
                  {/* Stimulus if available */}
                  {item.stimulus && (
                    <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-800/30 text-slate-200 text-xs sm:text-sm">
                      <span className="font-bold text-purple-400 block mb-1 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> উদ্দীপক / Context:
                      </span>
                      <MathText text={item.stimulus} />
                    </div>
                  )}

                  {/* Stem */}
                  <div className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                    <MathText text={item.stem} />
                  </div>

                  {/* Options */}
                  {item.options && item.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {item.options.map((opt, oIdx) => {
                        const letter = ['ক', 'খ', 'গ', 'ঘ', 'ঙ'][oIdx] || String(oIdx + 1);
                        const isCorrect = item.correctOption === opt || item.correctOption === ['A', 'B', 'C', 'D', 'E'][oIdx];
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl text-xs border flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                              {letter}
                            </span>
                            <span className="truncate">
                              <MathText text={opt} />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation */}
                  {item.explanation && (
                    <div className="text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="font-bold text-slate-300 block mb-0.5">ব্যাখ্যা:</span>
                      <MathText text={item.explanation} />
                    </div>
                  )}
                </div>

                {/* 4. Phase Notice: Disabled Upload Placeholder */}
                <div className="border-t border-slate-800/80 pt-3.5 mt-2">
                  <div className="bg-slate-950/50 border border-dashed border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                        <ImageIcon className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-300 block">
                          চিত্র আপলোড ব্যবস্থা পরবর্তী ধাপে যুক্ত হবে
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Phase 2: ডাইনামিক সনাক্তকরণ তালিকা সফলভাবে প্রস্তুত হয়েছে। পরবর্তী ধাপে সরাসরি ড্রপজোন ও ক্লাউড সিঙ্ক চালু করা হবে।
                        </span>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                      আপলোড পরবর্তী ধাপে প্রস্তুত
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

