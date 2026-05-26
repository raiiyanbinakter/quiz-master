import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, getDocs, query, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ChapterList from './components/ChapterList';
import TopicList from './components/TopicList';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import Feedback from './components/Feedback';
import DoubtArena from './components/DoubtArena';
import ProModal from './components/ProModal';
import Shop from './components/Shop';
import CategoryPage from './components/CategoryPage';
import { syllabus as staticSyllabus } from './data/syllabus';
import { sampleChapterData } from './data/questions';
import { bio1Chap1Data } from './data/questions_bio1_chap1';
import { phy1Chap2Data } from './data/questions_phy1_chap2';
import { chem1Chap2Data } from './data/questions_chem1_chap2';
import { gstMathExam1Data } from './data/questions_gst_math_exam1';
import { gstMathExam2Data } from './data/questions_gst_math_exam2';
import { dcuMathStraightLineData } from './data/questions_dcu_math_straight_line';
import { dcuMathExam1Data } from './data/questions_dcu_math_exam1';
import { dcuMathExam3Data } from './data/questions_dcu_math_exam3';
import { dcuPhysicsVectorData } from './data/questions_dcu_physics_vector';
import { dcuPhysicsNewtonianData } from './data/questions_dcu_physics_newtonian';
import { dcuPhysicsWorkEnergyData } from './data/questions_dcu_physics_work_energy';
import { dcuPhysicsGravityData } from './data/questions_dcu_physics_gravity';
import { dcuPhysicsStructureData } from './data/questions_dcu_physics_structure';
import { dcuPhysicsPeriodicData } from './data/questions_dcu_physics_periodic';
import { dcuPhysicsIdealGasData } from './data/questions_dcu_physics_ideal_gas';
import { dcuPhysicsThermodynamicsData } from './data/questions_dcu_physics_thermodynamics';
import { dcuPhysicsElectrostaticsData } from './data/questions_dcu_physics_electrostatics';
import { Subject, QuizResult, QuizSummary } from './types';
import { ADMIN_EMAIL } from './constants';

type ViewState = 'home' | 'chapters' | 'topics' | 'quiz' | 'result' | 'leaderboard' | 'login' | 'signup' | 'profile' | 'admin' | 'feedback' | 'doubt-arena' | 'shop'
  | 'category_academic' | 'category_board' | 'category_medical' | 'category_varsity';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/doubt-arena') {
      return 'doubt-arena';
    }
    return 'home';
  });
  const [currentCategory, setCurrentCategory] = useState<'academic' | 'board' | 'medical' | 'varsity' | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState<'quiz' | 'exam'>('quiz');
  const [quizSummary, setQuizSummary] = useState<QuizSummary | null>(null);
  
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showProModal, setShowProModal] = useState(false);

  // Dynamic syllabus state
  const [syllabus, setSyllabus] = useState<Subject[]>(staticSyllabus);
  const [dynamicQuizzes, setDynamicQuizzes] = useState<any[]>([]);
  const [questionOverrides, setQuestionOverrides] = useState<Record<string, any>>({});

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/doubt-arena') {
        setCurrentView('doubt-arena');
      } else if (window.location.pathname === '/' || window.location.pathname === '') {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            let needsUpdate = false;
            
            if (data.coins === undefined) { data.coins = 100; needsUpdate = true; }
            if (data.gems === undefined) { data.gems = 0; needsUpdate = true; }
            if (data.energy === undefined) { data.energy = 5; needsUpdate = true; }
            if (data.isPro === undefined) { data.isPro = false; needsUpdate = true; }
            if (data.currentStreak === undefined) { data.currentStreak = 0; needsUpdate = true; }
            if (data.reputation === undefined) { data.reputation = 0; needsUpdate = true; }
            if (data.purchasedItems === undefined) { data.purchasedItems = ["avatar_default"]; needsUpdate = true; }
            if (data.equippedAvatar === undefined) { data.equippedAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"; needsUpdate = true; }
            if (data.equippedBorder === undefined) { data.equippedBorder = "none"; needsUpdate = true; }
            const today = new Date().toISOString().split('T')[0];
            if (data.lastActiveDate === undefined) { data.lastActiveDate = today; needsUpdate = true; }
            if (data.lastEnergyUpdate === undefined) { data.lastEnergyUpdate = Date.now(); needsUpdate = true; }
            
            // Streak Logic
            if (data.lastActiveDate !== today) {
              const todayDate = new Date(today);
              const lastActiveDateObj = new Date(data.lastActiveDate);
              const diffTime = Math.abs(todayDate.getTime() - lastActiveDateObj.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
              
              if (diffDays === 1) {
                  data.currentStreak += 1;
              } else {
                  data.currentStreak = 0;
              }
              data.lastActiveDate = today;
              needsUpdate = true;
            }

            // Energy Regeneration Logic
            if (!data.isPro && data.energy < 5 && data.lastEnergyUpdate) {
              const timePassedMs = Date.now() - data.lastEnergyUpdate;
              const msPerEnergy = 60 * 60 * 1000;
              const energyGained = Math.floor(timePassedMs / msPerEnergy);
              
              if (energyGained > 0) {
                  data.energy = Math.min(5, data.energy + energyGained);
                  data.lastEnergyUpdate = data.energy === 5 ? Date.now() : data.lastEnergyUpdate + (energyGained * msPerEnergy);
                  needsUpdate = true;
              }
            } else if (data.energy >= 5 || data.isPro) {
                 data.lastEnergyUpdate = Date.now();
                 // If needsUpdate is already false, we don't force a write just for lastEnergyUpdate when energy is full
                 if (data.energy > 5) { data.energy = 5; needsUpdate = true; }
            }

            if (needsUpdate) {
              await setDoc(userDocRef, { 
                coins: data.coins, 
                gems: data.gems, 
                energy: data.energy, 
                isPro: data.isPro,
                currentStreak: data.currentStreak,
                reputation: data.reputation,
                lastActiveDate: data.lastActiveDate,
                lastEnergyUpdate: data.lastEnergyUpdate,
                purchasedItems: data.purchasedItems,
                equippedAvatar: data.equippedAvatar,
                equippedBorder: data.equippedBorder
              }, { merge: true });
            }
            setUserData(data);
          } else {
            // Check if admin email and set role accordingly, fixing legacy missing users
            const defaultRole = currentUser.email === ADMIN_EMAIL ? 'admin' : 'user';
            const newUserData = {
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || 'Un-named User',
              role: defaultRole,
              coins: 100,
              gems: 0,
              energy: 5,
              reputation: 0,
              isPro: false,
              currentStreak: 0,
              lastActiveDate: new Date().toISOString().split('T')[0],
              lastEnergyUpdate: Date.now(),
              purchasedItems: ["avatar_default"],
              equippedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
              equippedBorder: "none",
              createdAt: serverTimestamp()
            };
            await setDoc(userDocRef, newUserData);
            setUserData(newUserData);
          }
        } catch (e) {
          console.error("Error fetching or creating user data", e);
          setUserData({ role: 'user' });
        }
      } else {
        setUserData(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Fetch dynamic quizzes from Firestore
  useEffect(() => {
    const fetchDynamicSubjects = async () => {
      try {
        const q = query(collection(db, 'subjects_and_quizzes'));
        const sn = await getDocs(q);
        const dynamicSubjects: Subject[] = sn.docs.map(doc => {
          const data = doc.data();
          return {
             id: doc.id,
             name: data.subjectName,
             category: data.category || 'General',
             icon: data.icon || 'BookOpen',
             color: 'text-emerald-400',
             chapters: data.chapters.map((c: any) => c.chapterName),
             activeChapters: data.chapters.map((_: any, i: number) => i), // we unlock via ChapterList, so all are active here
             _rawChapters: data.chapters // keep raw data for questions mapping and gamification status
          } as Subject;
        });

        // Add them to syllabus
        setSyllabus([...staticSyllabus, ...dynamicSubjects]);
        setDynamicQuizzes(dynamicSubjects); // repurposing this state to hold the raw subject data
      } catch (error) {
        console.error("Error fetching dynamic subjects:", error);
      }
    };
    
    const fetchOverrides = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'question_overrides'));
        const overrides: Record<string, any> = {};
        snapshot.docs.forEach(doc => {
          overrides[doc.id] = doc.data();
        });
        setQuestionOverrides(overrides);
      } catch (error) {
        console.error("Error fetching overrides:", error);
      }
    };

    fetchDynamicSubjects();
    fetchOverrides();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentView('home');
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavigate = (view: ViewState) => {
    if (view === 'admin' && userData?.role !== 'admin') {
      return;
    }
    if (view === 'doubt-arena') {
      window.history.pushState(null, '', '/doubt-arena');
    } else {
      if (window.location.pathname === '/doubt-arena') {
        window.history.pushState(null, '', '/');
      }
    }
    setCurrentView(view);
  };


  const handleSelectSubject = (subjectId: string) => {
    const subject = syllabus.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
      setCurrentView('chapters');
    }
  };

  const handleSelectChapter = (chapterIndex: number) => {
    setSelectedChapterIndex(chapterIndex);
    setCurrentView('topics');
  };

  const handleSelectTopic = (topic: string | null, mode: 'quiz' | 'exam') => {
    if (!user) {
      setCurrentView('login');
      return;
    }

    // Gamification state check based on the selected chapter of the subject
    let isGamified = false;
    if (selectedSubject && selectedChapterIndex !== null) {
      const rawChapters = (selectedSubject as any)._rawChapters;
      if (rawChapters && rawChapters[selectedChapterIndex]) {
        isGamified = rawChapters[selectedChapterIndex].isGamified === true;
      }
    }

    if (isGamified) {
      // Game Mode: Deduct 1 energy and enforce the 80% lock system
      if (!userData?.isPro && userData?.energy < 1) {
        alert('Out of Energy! Wait for regeneration or Upgrade to PRO for Unlimited Energy.');
        setShowProModal(true);
        return;
      }

      if (selectedChapterIndex !== null && selectedChapterIndex > 0) {
        const prevChapterId = `${selectedSubject?.id}_${selectedChapterIndex}`;
        const unlocked = (userData?.unlockedChapters || []).includes(prevChapterId);
        if (!unlocked) {
          alert("🔒 You must pass the previous chapter with 80% to unlock this level!");
          return;
        }
      }

      // Deduct 1 energy safely
      if (!userData?.isPro) {
        const userRef = doc(db, 'users', user.uid);
        const newEnergy = Math.max(0, (userData.energy || 5) - 1);
        setUserData({ ...userData, energy: newEnergy });
        setDoc(userRef, { energy: newEnergy }, { merge: true }).catch(console.error);
      }
    } else {
      // Professional Mode: Instant start, do NOT deduct energy, do NOT check previous locks
    }

    setSelectedTopic(topic);
    setQuizMode(mode);
    setCurrentView('quiz');
  };

  const handleQuizComplete = (results: QuizResult[]) => {
    const correctCount = results.filter(r => r.isCorrect).length;
    const wrongCount = results.filter(r => !r.isCorrect && !r.isSkipped).length;
    const skippedCount = results.filter(r => r.isSkipped).length;
    
    // Scoring logic: +1 for correct, -0.25 for wrong
    const totalScore = (correctCount * 1) - (wrongCount * 0.25);

    let quizNameStr = selectedSubject?.name || 'Quiz';
    if (selectedChapterIndex !== null && selectedSubject?.chapters[selectedChapterIndex]) {
       quizNameStr += ` - ${selectedSubject.chapters[selectedChapterIndex]}`;
    }
    if (selectedTopic) {
      quizNameStr += ` (${selectedTopic})`;
    }

    // Check if it's gamified
    let isGamified = false;
    const isDynamic = !!(selectedSubject as any)?._rawChapters;
    if (isDynamic && selectedChapterIndex !== null) {
       isGamified = (selectedSubject as any)._rawChapters[selectedChapterIndex]?.isGamified === true;
    }

    setQuizSummary({
      quizName: quizNameStr,
      subjectId: selectedSubject?.id,
      chapterIndex: selectedChapterIndex ?? undefined,
      isGamified,
      assessmentType: quizMode,
      totalQuestions: results.length,
      correctCount,
      wrongCount,
      skippedCount,
      totalScore,
      results
    });
    setCurrentView('result');
  };

  const handleRetry = () => {
    setCurrentView('quiz');
  };

  const handleGoHome = () => {
    setSelectedSubject(null);
    setSelectedChapterIndex(null);
    setSelectedTopic(null);
    setQuizSummary(null);
    setCurrentCategory(null);
    if (window.location.pathname === '/doubt-arena') {
      window.history.pushState(null, '', '/');
    }
    setCurrentView('home');
  };

  const handleShowLeaderboard = () => {
    setCurrentView('leaderboard');
  };

  const getQuestions = () => {
    let questions: any[] = [];
    
    // Check if it is a Custom dynamic subject first
    if (selectedSubject?.id.startsWith('subj_') && selectedChapterIndex !== null) {
       const rawChapters = (selectedSubject as any)._rawChapters;
       if (rawChapters && rawChapters[selectedChapterIndex]) {
          const rawQ = rawChapters[selectedChapterIndex].questions;
          questions = rawQ.map((q: any, i: number) => ({
             id: i + 1,
             question_text: q.questionText,
             options: q.options,
             correct_answer: q.correctAnswer,
             explanation: q.explanation || ''
          }));
       }
       return questions;
    }

    if (selectedSubject?.id === 'bio1' && selectedChapterIndex === 0) {
      questions = bio1Chap1Data.questions;
    } else if (selectedSubject?.id === 'bio2' && selectedChapterIndex === 0) {
      questions = sampleChapterData.questions;
    } else if (selectedSubject?.id === 'phys1' && selectedChapterIndex === 1) {
      questions = phy1Chap2Data.questions;
    } else if (selectedSubject?.id === 'chem1' && selectedChapterIndex === 1) {
      questions = chem1Chap2Data.questions;
    } else if (selectedSubject?.id === 'gst_math' && selectedChapterIndex === 0) {
      questions = gstMathExam1Data.questions;
    } else if (selectedSubject?.id === 'gst_math' && selectedChapterIndex === 1) {
      questions = gstMathExam2Data.questions;
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 0) {
      questions = dcuMathStraightLineData.questions;
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 1) {
      questions = dcuMathExam1Data.questions;
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 2) {
      questions = dcuMathExam3Data.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 1) {
      questions = dcuPhysicsVectorData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 2) {
      questions = dcuPhysicsNewtonianData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 3) {
      questions = dcuPhysicsWorkEnergyData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 4) {
      questions = dcuPhysicsGravityData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 5) {
      questions = dcuPhysicsStructureData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 6) {
      questions = dcuPhysicsPeriodicData.questions;
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 7) {
      questions = dcuPhysicsIdealGasData.questions;
    } else if (selectedSubject?.id === 'dcu_phys2' && selectedChapterIndex === 0) {
      questions = dcuPhysicsThermodynamicsData.questions;
    } else if (selectedSubject?.id === 'dcu_phys2' && selectedChapterIndex === 1) {
      questions = dcuPhysicsElectrostaticsData.questions;
    }

    // Apply Overrides globally to all questions found
    const appliedQuestions = questions.map(q => {
      // The override key pattern used in AdminDashboard: 
      // `override_${subjectId}_${chapterIndex}_${topic || 'none'}_${questionId}`
      // This applies to the selected topic if there's one, but let's check exact topic matching.
      const overrideKeyBase = `override_${selectedSubject?.id}_${selectedChapterIndex}`;
      // Q's topic might be different from selectedTopic if we haven't filtered yet
      const qTopicStr = q.topic || 'none';
      const exactOverrideKey = `${overrideKeyBase}_${qTopicStr}_${q.id}`;
      
      const overrideData = questionOverrides[exactOverrideKey];
      if (overrideData) {
        return {
          ...q,
          question_text: overrideData.question_text || q.question_text,
          options: overrideData.options || q.options,
          correct_answer: overrideData.correct_answer || q.correct_answer,
          explanation: overrideData.explanation || q.explanation
        };
      }
      return q;
    });

    if (selectedTopic) {
      return appliedQuestions.filter(q => q.topic === selectedTopic);
    }
    return appliedQuestions;
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-emerald-500/30 flex flex-col">
      <Navbar 
        user={user} 
        userData={userData}
        isAdmin={userData?.role === 'admin'}
        authLoading={authLoading} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate as any} 
        onUpgradeClick={() => setShowProModal(true)}
        currentView={currentView} 
      />
      <ProModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
      
      <main className="flex-1">
        {currentView === 'home' && (
          <Home 
            onSelectCategory={(category) => {
              setCurrentCategory(category);
              setCurrentView(`category_${category}` as ViewState);
            }} 
            onShowLeaderboard={handleShowLeaderboard} 
            onShowShop={() => setCurrentView('shop')} 
          />
        )}

        {currentView === 'category_academic' && (
          <CategoryPage
            category="academic"
            syllabus={syllabus}
            onSelectSubject={handleSelectSubject}
            onBack={handleGoHome}
          />
        )}

        {currentView === 'category_board' && (
          <CategoryPage
            category="board"
            syllabus={syllabus}
            onSelectSubject={handleSelectSubject}
            onBack={handleGoHome}
          />
        )}

        {currentView === 'category_medical' && (
          <CategoryPage
            category="medical"
            syllabus={syllabus}
            onSelectSubject={handleSelectSubject}
            onBack={handleGoHome}
          />
        )}

        {currentView === 'category_varsity' && (
          <CategoryPage
            category="varsity"
            syllabus={syllabus}
            onSelectSubject={handleSelectSubject}
            onBack={handleGoHome}
          />
        )}
        
        {currentView === 'chapters' && selectedSubject && (
          <ChapterList 
            subject={selectedSubject} 
            userData={userData}
            onBack={() => setCurrentView(currentCategory ? `category_${currentCategory}` as ViewState : 'home')}
            onSelectChapter={handleSelectChapter}
          />
        )}

        {currentView === 'topics' && selectedSubject && selectedChapterIndex !== null && (
          <TopicList 
            subject={selectedSubject}
            chapterIndex={selectedChapterIndex}
            questions={getQuestions()}
            onBack={() => setCurrentView('chapters')}
            onGoHome={handleGoHome}
            onSelectTopic={handleSelectTopic}
          />
        )}

        {currentView === 'quiz' && (
          <Quiz 
            questions={getQuestions()} 
            mode={quizMode}
            subjectId={selectedSubject?.id}
            chapterIndex={selectedChapterIndex ?? undefined}
            quizTitle={selectedSubject?.name}
            userEmail={user?.email || undefined}
            onComplete={handleQuizComplete} 
            onBack={() => setCurrentView('topics')}
          />
        )}

        {currentView === 'result' && quizSummary && (
          <Result 
            summary={quizSummary}
            user={user}
            userData={userData}
            onRetry={handleRetry}
            onGoHome={handleGoHome}
            onBack={() => setCurrentView('topics')}
            onShowLeaderboard={handleShowLeaderboard}
          />
        )}

        {currentView === 'leaderboard' && (
          <Leaderboard onBack={handleGoHome} />
        )}

        {currentView === 'login' && (
          <Login onNavigate={handleNavigate as any} onSuccess={() => setCurrentView('home')} />
        )}

        {currentView === 'signup' && (
          <SignUp onNavigate={handleNavigate as any} onSuccess={() => setCurrentView('home')} />
        )}

        {currentView === 'profile' && (
          <Profile user={user} userData={userData} onBack={handleGoHome} onUpgradeClick={() => setShowProModal(true)} />
        )}

        {currentView === 'admin' && userData?.role === 'admin' && (
          <AdminDashboard user={user} isAdmin={userData?.role === 'admin'} onBack={handleGoHome} />
        )}

        {currentView === 'shop' && (
          <Shop user={user} userData={userData} onUserDataUpdate={setUserData} onBack={handleGoHome} />
        )}

        {currentView === 'feedback' && (
          <Feedback user={user} onBack={handleGoHome} />
        )}

        {currentView === 'doubt-arena' && (
          <DoubtArena user={user} userData={userData} onBack={handleGoHome} setUserData={setUserData} syllabus={syllabus} />
        )}
      </main>
    </div>
  );
}
