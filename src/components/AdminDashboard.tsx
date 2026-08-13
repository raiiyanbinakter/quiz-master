import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc, setDoc, serverTimestamp, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ShieldAlert, Plus, Save, Loader2, Trash2, Flag, MessageSquare, CheckCircle2, Edit, Flame } from 'lucide-react';

import AdminQuizBuilder from './AdminQuizBuilder';
import AdminRoutineControlCenter from './admin/AdminRoutineControlCenter';
import QuestionBankAdmin from './admin/QuestionBankAdmin';

interface AdminDashboardProps {

  user: any;
  isAdmin?: boolean;
  onBack: () => void;
}

interface FeedbackEntry {
  id: string;
  userEmail: string;
  message: string;
  status: string;
  timestamp: any;
}

interface ReportEntry {
  id: string;
  quizId: string;
  chapterIndex: number;
  topic: string | null;
  quizTitle: string;
  questionIndex: number;
  questionId: number;
  questionText: string;
  reportType: string;
  issueDetails: string;
  reportedBy: string;
  status: string;
  timestamp: any;
}

// Temporary interface for the results list
interface ResultEntry {
  id: string;
  userName: string;
  subjectName: string;
  assessmentType: string;
  score: number;
  totalQuestions: number;
  createdAt: any;
}

export default function AdminDashboard({ user, isAdmin, onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'questionBank' | 'results' | 'addQuiz' | 'reports' | 'feedbacks' | 'moderation' | 'routineControl'>('questionBank');

  
  // Results State
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);

  // Feedbacks State
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);

  // Reports State
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  // Moderation State
  const [doubts, setDoubts] = useState<any[]>([]);
  const [loadingDoubts, setLoadingDoubts] = useState(false);

  // Correction Modal State
  const [editingReport, setEditingReport] = useState<ReportEntry | null>(null);
  const [correctionLoading, setCorrectionLoading] = useState(false);
  const [correctionData, setCorrectionData] = useState<any>(null); // To hold question data

  // Add Quiz Form State
  const [subjectName, setSubjectName] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [assessmentType, setAssessmentType] = useState<'quiz' | 'exam'>('quiz');
  
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: '', explanation: '' }
  ]);
  const [savingQuiz, setSavingQuiz] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (activeTab === 'results' && isAdmin) {
      fetchGlobalResults();
    } else if (activeTab === 'feedbacks' && isAdmin) {
      fetchFeedbacks();
    } else if (activeTab === 'reports' && isAdmin) {
      fetchReports();
    } else if (activeTab === 'moderation' && isAdmin) {
      fetchDoubts();
    }
  }, [activeTab, isAdmin]);

  const fetchDoubts = async () => {
    if (!isAdmin) return;
    setLoadingDoubts(true);
    try {
      const q = query(collection(db, 'doubts'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoubts(data);
    } catch(e) {
      console.error(e);
    } finally {
      setLoadingDoubts(false);
    }
  };

  const deleteDoubt = async (doubtId: string) => {
    if (!window.confirm('Are you sure you want to delete this doubt?')) return;
    try {
      await deleteDoc(doc(db, 'doubts', doubtId));
      setDoubts(prev => prev.filter(d => d.id !== doubtId));
    } catch(e) {
      console.error(e);
      alert('Error deleting doubt');
    }
  };

  const fetchFeedbacks = async () => {
    if (!isAdmin) return;
    setLoadingFeedbacks(true);
    try {
      const q = query(collection(db, 'feedbacks'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FeedbackEntry[];
      setFeedbacks(data);
    } catch (e) {
      console.error(e);
      // Fallback
      const snapshot = await getDocs(collection(db, 'feedbacks'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FeedbackEntry[];
      data.sort((a, b) => (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0));
      setFeedbacks(data);
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  const fetchReports = async () => {
    if (!isAdmin) return;
    setLoadingReports(true);
    try {
      const q = query(collection(db, 'reports'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ReportEntry[];
      setReports(data);
    } catch (e) {
      console.error(e);
      // Fallback
      const snapshot = await getDocs(collection(db, 'reports'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ReportEntry[];
      data.sort((a, b) => (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0));
      setReports(data);
    } finally {
      setLoadingReports(false);
    }
  };

  const markFeedbackRead = async (id: string, currentStatus: string) => {
    if (currentStatus === 'read') return;
    try {
      await updateDoc(doc(db, 'feedbacks', id), { status: 'read' });
      setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, status: 'read' } : f));
    } catch(e) {
      console.error(e);
    }
  };

  const markReportResolved = async (id: string, currentStatus: string) => {
    if (currentStatus === 'resolved') return;
    try {
      await updateDoc(doc(db, 'reports', id), { status: 'resolved' });
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    } catch(e) {
      console.error(e);
    }
  };

  const openEditor = async (report: ReportEntry) => {
    setEditingReport(report);
    setCorrectionLoading(true);
    setCorrectionData({
      questionText: report.questionText,
      options: ['', '', '', ''],
      correcAnswer: '',
      explanation: ''
    });

    try {
      const overrideId = `override_${report.quizId}_${report.chapterIndex}_${report.topic || 'none'}_${report.questionId}`;
      const docRef = doc(db, 'question_overrides', overrideId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCorrectionData({
          questionText: data.question_text || '',
          options: data.options || ['', '', '', ''],
          correctAnswer: data.correct_answer || '',
          explanation: data.explanation || ''
        });
      } else {
        // Just pre-populate from the report
        setCorrectionData({
          questionText: report.questionText,
          options: ['', '', '', ''],
          correctAnswer: '',
          explanation: ''
        });
      }
    } catch(e) {
      console.error(e);
    } finally {
      setCorrectionLoading(false);
    }
  };

  const saveCorrection = async () => {
    if (!editingReport) return;
    setCorrectionLoading(true);
    try {
      const overrideId = `override_${editingReport.quizId}_${editingReport.chapterIndex}_${editingReport.topic || 'none'}_${editingReport.questionId}`;
      await setDoc(doc(db, 'question_overrides', overrideId), {
        quizId: editingReport.quizId,
        chapterIndex: editingReport.chapterIndex,
        topic: editingReport.topic || null,
        questionId: editingReport.questionId,
        question_text: correctionData.questionText,
        options: correctionData.options,
        correct_answer: correctionData.correctAnswer,
        explanation: correctionData.explanation,
        updatedAt: serverTimestamp()
      });
      // Also mark report as resolved
      await markReportResolved(editingReport.id, editingReport.status);
      setEditingReport(null);
      alert('Question updated globally!');
    } catch(e) {
       console.error(e);
       alert('Failed to update question.');
    } finally {
      setCorrectionLoading(false);
    }
  };

  const fetchGlobalResults = async () => {
    if (!isAdmin) {
      setMessage({ text: 'Access Denied: You do not have admin permissions.', type: 'error' });
      setLoadingResults(false);
      return;
    }
    setLoadingResults(true);
    try {
      // Fetching all results, limit to 200 for now to prevent massive reads
      const q = query(collection(db, 'results'), orderBy('createdAt', 'desc'));
      // Note: If you don't have an index on createdAt, this might fail or require one.
      // If it fails, we fall back to unsorted fetch and local sort.
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResultEntry[];
      
      setResults(data);
    } catch (error: any) {
      console.error("Error fetching global results:", error);
      // Fallback if index is missing
      if (error.message.includes('index')) {
        try {
          const qFallback = query(collection(db, 'results'));
          const snapshotFallback = await getDocs(qFallback);
          const data = snapshotFallback.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ResultEntry[];
          data.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
          setResults(data);
        } catch (e) {
          console.error("Fallback failed", e);
        }
      }
    } finally {
      setLoadingResults(false);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], answer: '', explanation: '' }
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleSaveQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setMessage({ text: 'Access Denied: You do not have admin permissions.', type: 'error' });
      return;
    }
    if (!subjectName || !chapterName || !topicName || questions.length === 0) {
      setMessage({ text: 'সবগুলো তথ্য সঠিকভাবে দিন।', type: 'error' });
      return;
    }
    
    // basic validation
    for (const q of questions) {
      if (!q.question || q.options.some(o => !o) || !q.answer) {
        setMessage({ text: 'প্রশ্নের সব অপশন এবং সঠিক উত্তর থাকতে হবে।', type: 'error' });
        return;
      }
    }

    setSavingQuiz(true);
    setMessage({ text: '', type: '' });
    try {
      const quizData = {
        subjectId: `custom_${Date.now()}`, // simple unique id
        subjectName,
        chapterName,
        topicName,
        assessmentType,
        questions: questions.map((q, idx) => ({ ...q, id: idx + 1 })),
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'quizzes'), quizData);
      
      setMessage({ text: 'কুইজ সফলভাবে সংরক্ষণ করা হয়েছে!', type: 'success' });
      // Reset form
      setSubjectName('');
      setChapterName('');
      setTopicName('');
      setQuestions([{ question: '', options: ['', '', '', ''], answer: '', explanation: '' }]);
      
    } catch (error: any) {
      console.error(error);
      setMessage({ text: `সমস্যা হয়েছে: ${error.message}`, type: 'error' });
    } finally {
      setSavingQuiz(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-rose-500/20 p-2.5 rounded-xl border border-rose-500/30">
            <ShieldAlert className="w-7 h-7 text-rose-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">এডমিন প্যানেল</h1>
            <p className="text-slate-400 text-sm">অ্যাপ কন্ট্রোল এবং ডাটা ম্যানেজমেন্ট</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('questionBank')}
          className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${activeTab === 'questionBank' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          প্রশ্নব্যাংক পরিচালনা
        </button>
        <button
          onClick={() => setActiveTab('routineControl')}
          className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${activeTab === 'routineControl' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          রুটিন কন্ট্রোল সেন্টার
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${activeTab === 'reports' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          রিপোর্টেড প্রশ্ন
        </button>
        <button
          onClick={() => setActiveTab('feedbacks')}
          className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${activeTab === 'feedbacks' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          ইউজার ফিডব্যাক
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${activeTab === 'moderation' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className="flex items-center gap-1.5"><Flame className="w-4 h-4"/>ডাউট মডারেশন</div>
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${activeTab === 'results' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          গ্লোবাল রেজাল্টস
        </button>
        <button
          onClick={() => setActiveTab('addQuiz')}
          className={`px-4 py-2 font-medium whitespace-nowrap rounded-t-lg transition-colors ${activeTab === 'addQuiz' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          কুইজ যুক্ত করুন
        </button>
      </div>

      {activeTab === 'reports' && (
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Flag className="w-5 h-5 text-emerald-400"/> রিপোর্টেড প্রশ্ন</h2>
          {loadingReports ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-emerald-400 animate-spin" /></div>
          ) : reports.length === 0 ? (
            <p className="text-center text-slate-400 py-10">কোনো রিপোর্ট পাওয়া যায়নি।</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="bg-slate-900 border border-slate-700 rounded-2xl p-5 relative">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={`inline-block px-2 py-1 mb-2 text-xs rounded-lg ${report.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {report.status.toUpperCase()}
                      </span>
                      <h3 className="text-white font-semibold mb-1">{report.quizTitle} {report.topic ? `(${report.topic})` : ''} - Question {report.questionIndex + 1}</h3>
                      <p className="text-slate-300 mb-3 block">{report.questionText}</p>
                    </div>
                    {report.status !== 'resolved' && (
                      <button onClick={() => openEditor(report)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-600 font-medium text-sm">
                        <Edit className="w-4 h-4 text-blue-400"/>
                        Edit Question
                      </button>
                    )}
                  </div>
                  
                  <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl mb-4">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Issue: {report.reportType}</p>
                    <p className="text-rose-300 text-sm">{report.issueDetails || 'No additional details provided.'}</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700 pt-3">
                    <span>Reported by: {report.reportedBy}</span>
                    <span>
                      {report.timestamp?.toDate ? report.timestamp.toDate().toLocaleString('bn-BD') : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'feedbacks' && (
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-emerald-400"/> ইউজার ফিডব্যাক</h2>
          {loadingFeedbacks ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-emerald-400 animate-spin" /></div>
          ) : feedbacks.length === 0 ? (
            <p className="text-center text-slate-400 py-10">কোনো ফিডব্যাক পাওয়া যায়নি।</p>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((f) => (
                <div key={f.id} className={`border rounded-2xl p-5 ${f.status === 'read' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-900 border-emerald-500/30'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap flex-1 mr-4">{f.message}</p>
                    {f.status !== 'read' && (
                      <button onClick={() => markFeedbackRead(f.id, f.status)} className="shrink-0 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors border border-emerald-500/30">
                        Mark Read
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                    <span>From: {f.userEmail}</span>
                    <span>{f.timestamp?.toDate ? f.timestamp.toDate().toLocaleString('bn-BD') : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'moderation' && (
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Flame className="w-5 h-5 text-emerald-400"/> ডাউট মডারেশন (Community Forum)</h2>
          {loadingDoubts ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-emerald-400 animate-spin" /></div>
          ) : doubts.length === 0 ? (
            <p className="text-center text-slate-400 py-10">কী দারুণ! কোনো ডাউট নেই।</p>
          ) : (
            <div className="space-y-4">
              {doubts.map((doubt) => (
                <div key={doubt.id} className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight">{doubt.title}</h3>
                    <button 
                      onClick={() => deleteDoubt(doubt.id)} 
                      className="bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border border-rose-500/30 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Post
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{doubt.description}</p>
                  <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                    <span>Asked by: <strong className="text-slate-300">{doubt.askedByName}</strong> {doubt.isResolved ? '(Resolved)' : '(Unresolved)'}</span>
                    <span>{doubt.timestamp?.toDate ? Math.floor((new Date().getTime() - doubt.timestamp.toDate().getTime()) / 3600000) : 0}h ago</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      {editingReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Edit className="w-6 h-6 text-blue-400" />
              Edit Question (Override)
            </h3>
            
            {correctionLoading ? (
               <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-emerald-400 animate-spin" /></div>
            ) : (
               <div className="space-y-5">
                 <div>
                   <label className="block text-slate-300 font-medium mb-2">Question Text</label>
                   <textarea
                     value={correctionData.questionText}
                     onChange={e => setCorrectionData({...correctionData, questionText: e.target.value})}
                     className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                   />
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {correctionData.options.map((opt: string, optIdx: number) => (
                      <div key={optIdx}>
                        <label className="block text-slate-400 text-xs mb-1">Option {optIdx + 1}</label>
                        <input 
                          value={opt} 
                          onChange={e => {
                            const newOpts = [...correctionData.options];
                            newOpts[optIdx] = e.target.value;
                            setCorrectionData({...correctionData, options: newOpts});
                          }} 
                          required 
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500" 
                        />
                      </div>
                    ))}
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs mb-1">Correct Answer</label>
                      <select 
                        value={correctionData.correctAnswer} 
                        onChange={e => setCorrectionData({...correctionData, correctAnswer: e.target.value})} 
                        required 
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select Correct Option</option>
                        {correctionData.options.map((opt: string, optIdx: number) => opt && <option key={optIdx} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1">Explanation</label>
                      <input 
                        type="text" 
                        value={correctionData.explanation} 
                        onChange={e => setCorrectionData({...correctionData, explanation: e.target.value})} 
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500" 
                      />
                    </div>
                 </div>
                 <div className="flex gap-4 mt-6">
                    <button onClick={() => setEditingReport(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors">Cancel</button>
                    <button onClick={saveCorrection} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20">Update Question Globally</button>
                 </div>
               </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">সকল ইউজারের রেজাল্ট</h2>
          
          {loadingResults ? (
             <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-emerald-400 animate-spin" /></div>
          ) : results.length === 0 ? (
             <p className="text-center text-slate-400 py-10">কোনো রেজাল্ট পাওয়া যায়নি।</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-700">
                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">ইউজার</th>
                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">বিষয়</th>
                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">ধরন</th>
                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm">স্কোর</th>
                    <th className="px-6 py-4 text-slate-400 font-semibold text-sm text-right">তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {results.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-700/30">
                      <td className="px-6 py-4 text-white">{entry.userName}</td>
                      <td className="px-6 py-4 text-slate-300">{entry.subjectName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-lg ${entry.assessmentType === 'exam' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {entry.assessmentType === 'exam' ? 'Exam' : 'Quiz'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-emerald-400 font-bold">{entry.score}/{entry.totalQuestions}</td>
                      <td className="px-6 py-4 text-right text-slate-400 text-sm">
                        {entry.createdAt?.toDate ? entry.createdAt.toDate().toLocaleDateString('bn-BD', {
                           month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        }) : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'questionBank' && (
        <QuestionBankAdmin userEmail={user?.email || 'admin@example.com'} />
      )}

      {activeTab === 'routineControl' && (
        <AdminRoutineControlCenter />
      )}

      {activeTab === 'addQuiz' && (
          <AdminQuizBuilder />
      )}
    </div>
  );
}
