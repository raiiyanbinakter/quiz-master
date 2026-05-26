import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Save, Plus, Trash2, Edit, CheckCircle2, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';

interface QuestionDraft {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ChapterDraft {
  chapterId: string;
  chapterName: string;
  isGamified: boolean;
  questions: QuestionDraft[];
}

interface SubjectDraft {
  id: string; // Document ID
  subjectName: string;
  category: string;
  icon: string;
  chapters: ChapterDraft[];
}

export default function AdminQuizBuilder({ onBack }: { onBack?: () => void }) {
  const [subjects, setSubjects] = useState<SubjectDraft[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingSubject, setEditingSubject] = useState<SubjectDraft | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'subjects_and_quizzes'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as SubjectDraft));
      setSubjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddNewSubject = () => {
    const newSubject: SubjectDraft = {
      id: `subj_${Date.now()}`,
      subjectName: '',
      category: 'General',
      icon: 'BookOpen',
      chapters: []
    };
    setEditingSubject(newSubject);
  };

  const handleAddChapter = () => {
    if (!editingSubject) return;
    const newChapter: ChapterDraft = {
      chapterId: `chap_${Date.now()}`,
      chapterName: '',
      isGamified: false,
      questions: []
    };
    setEditingSubject({
      ...editingSubject,
      chapters: [...editingSubject.chapters, newChapter]
    });
    setExpandedChapter(newChapter.chapterId);
  };

  const handleAddQuestion = (chapterId: string) => {
    if (!editingSubject) return;
    const updatedChapters = editingSubject.chapters.map(c => {
      if (c.chapterId === chapterId) {
        return {
          ...c,
          questions: [...c.questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '', explanation: '' }]
        };
      }
      return c;
    });
    setEditingSubject({ ...editingSubject, chapters: updatedChapters });
  };

  const updateQuestion = (chapId: string, qIdx: number, field: string, value: any) => {
    if (!editingSubject) return;
    const updatedChapters = editingSubject.chapters.map(c => {
      if (c.chapterId === chapId) {
        const updatedQs = [...c.questions];
        updatedQs[qIdx] = { ...updatedQs[qIdx], [field]: value };
        return { ...c, questions: updatedQs };
      }
      return c;
    });
    setEditingSubject({ ...editingSubject, chapters: updatedChapters });
  };

  const updateOption = (chapId: string, qIdx: number, optIdx: number, value: string) => {
    if (!editingSubject) return;
    const updatedChapters = editingSubject.chapters.map(c => {
      if (c.chapterId === chapId) {
        const updatedQs = [...c.questions];
        const newOpts = [...updatedQs[qIdx].options];
        newOpts[optIdx] = value;
        updatedQs[qIdx] = { ...updatedQs[qIdx], options: newOpts };
        return { ...c, questions: updatedQs };
      }
      return c;
    });
    setEditingSubject({ ...editingSubject, chapters: updatedChapters });
  };

  const removeQuestion = (chapId: string, qIdx: number) => {
    if (!editingSubject) return;
    const updatedChapters = editingSubject.chapters.map(c => {
      if (c.chapterId === chapId) {
        return { ...c, questions: c.questions.filter((_, i) => i !== qIdx) };
      }
      return c;
    });
    setEditingSubject({ ...editingSubject, chapters: updatedChapters });
  };

  const removeChapter = (chapId: string) => {
    if (!editingSubject) return;
    if (!window.confirm("Are you sure?")) return;
    setEditingSubject({
      ...editingSubject,
      chapters: editingSubject.chapters.filter(c => c.chapterId !== chapId)
    });
  };

  const handleSave = async () => {
    if (!editingSubject) return;
    if (!editingSubject.subjectName) {
      alert("Subject name is required.");
      return;
    }
    
    // validation
    for (const chap of editingSubject.chapters) {
      if (!chap.chapterName) {
        alert("All chapters must have a name.");
        return;
      }
      for (const q of chap.questions) {
        if (!q.questionText || !q.correctAnswer || q.options.some(o => !o)) {
          alert(`Incomplete question in chapter: ${chap.chapterName}`);
          return;
        }
      }
    }

    try {
      await setDoc(doc(db, 'subjects_and_quizzes', editingSubject.id), {
        ...editingSubject,
        updatedAt: serverTimestamp()
      });
      alert('Saved successfully!');
      setEditingSubject(null);
      fetchSubjects();
    } catch (e) {
      console.error(e);
      alert('Error saving subject.');
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (!window.confirm('Delete entire subject?')) return;
    try {
      await deleteDoc(doc(db, 'subjects_and_quizzes', id));
      fetchSubjects();
    } catch (e) {
      console.error(e);
    }
  };

  if (editingSubject) {
    return (
      <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Subject Builder
          </h2>
          <div className="flex gap-3">
            <button onClick={() => setEditingSubject(null)} className="px-4 py-2 bg-slate-700 rounded-xl text-white">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-emerald-500 rounded-xl text-white font-bold flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Subject
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-slate-400 mb-1 text-sm">Subject Name</label>
            <input value={editingSubject.subjectName} onChange={e => setEditingSubject({...editingSubject, subjectName: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" placeholder="e.g. Physics" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1 text-sm">Category</label>
            <input value={editingSubject.category} onChange={e => setEditingSubject({...editingSubject, category: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" placeholder="e.g. Science" />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Chapters (Levels)</h3>
          <button onClick={handleAddChapter} className="bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" /> Add Chapter
          </button>
        </div>

        <div className="space-y-4">
          {editingSubject.chapters.map((chap, cIdx) => (
            <div key={chap.chapterId} className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
               <div className="bg-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer border-b border-slate-700 gap-3" onClick={() => setExpandedChapter(expandedChapter === chap.chapterId ? null : chap.chapterId)}>
                 <div className="flex items-center gap-3 w-full max-w-md">
                   {expandedChapter === chap.chapterId ? <ChevronDown className="w-5 h-5 text-slate-400"/> : <ChevronRight className="w-5 h-5 text-slate-400"/>}
                   <span className="text-emerald-400 font-bold">Lvl {cIdx + 1}</span>
                   <input 
                     value={chap.chapterName} 
                     onChange={e => {
                        const newC = [...editingSubject.chapters];
                        newC[cIdx].chapterName = e.target.value;
                        setEditingSubject({...editingSubject, chapters: newC});
                     }} 
                     onClick={e => e.stopPropagation()}
                     className="bg-slate-900 border border-slate-600 rounded px-3 py-1 text-white w-full" 
                     placeholder="Chapter Name" 
                   />
                 </div>
                 <div className="flex items-center gap-4 px-2" onClick={e => e.stopPropagation()}>
                   <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                     <input 
                       type="checkbox" 
                       checked={chap.isGamified}
                       onChange={e => {
                          const newC = [...editingSubject.chapters];
                          newC[cIdx].isGamified = e.target.checked;
                          setEditingSubject({...editingSubject, chapters: newC});
                       }}
                       className="rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500/20"
                     />
                     <span className={chap.isGamified ? 'text-emerald-400 font-bold' : ''}>Enable Game Mode (Energy & Locks) 🔒</span>
                   </label>
                   <button onClick={e => { e.stopPropagation(); removeChapter(chap.chapterId); }} className="text-rose-400 p-2 hover:bg-rose-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                 </div>
               </div>

               {expandedChapter === chap.chapterId && (
                 <div className="p-4 space-y-4">
                    {chap.questions.map((q, qIdx) => (
                      <div key={qIdx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative">
                        <button onClick={() => removeQuestion(chap.chapterId, qIdx)} className="absolute top-2 right-2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                        <textarea value={q.questionText} onChange={e => updateQuestion(chap.chapterId, qIdx, 'questionText', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white mb-3" placeholder="Question Text" rows={2}/>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {q.options.map((opt, oIdx) => (
                            <input key={oIdx} value={opt} onChange={e => updateOption(chap.chapterId, qIdx, oIdx, e.target.value)} className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm" placeholder={`Option ${oIdx + 1}`} />
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <select value={q.correctAnswer} onChange={e => updateQuestion(chap.chapterId, qIdx, 'correctAnswer', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
                                <option value="">Select Correct Option...</option>
                                {q.options.filter(Boolean).map((o, i) => <option key={i} value={o}>{o}</option>)}
                              </select>
                           </div>
                           <div>
                              <input value={q.explanation} onChange={e => updateQuestion(chap.chapterId, qIdx, 'explanation', e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm" placeholder="Explanation (Optional)" />
                           </div>
                        </div>
                      </div>
                    ))}
                    
                    <button onClick={() => handleAddQuestion(chap.chapterId)} className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 font-medium transition-colors">
                      + Add Question
                    </button>
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-8">
         <h2 className="text-xl font-bold text-white">Dynamic Quiz Builder</h2>
         <button onClick={handleAddNewSubject} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2">
           <Plus className="w-4 h-4" /> New Subject
         </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-emerald-400" /></div>
      ) : subjects.length === 0 ? (
        <div className="text-center text-slate-400 py-10 border-2 border-dashed border-slate-700 rounded-2xl">
           No subjects yet. Create your first subject to start building the curriculum!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {subjects.map(s => (
            <div key={s.id} className="bg-slate-900 border border-slate-700 p-5 rounded-2xl flex items-center justify-between">
               <div>
                  <h3 className="text-lg font-bold text-white">{s.subjectName}</h3>
                  <p className="text-sm text-slate-400">{s.category} • {s.chapters.length} Levels/Chapters</p>
               </div>
               <div className="flex gap-2">
                 <button onClick={() => setEditingSubject(s)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Edit className="w-4 h-4" /></button>
                 <button onClick={() => handleDeleteSubject(s.id)} className="p-2 bg-rose-500/20 text-rose-400 rounded-lg"><Trash2 className="w-4 h-4" /></button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
