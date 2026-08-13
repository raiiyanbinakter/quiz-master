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
import { RoutineManager } from './components/routine/RoutineManager';
import { syllabus as staticSyllabus } from './data/syllabus';
import { sampleChapterData } from './data/questions';
import { bio1Chap1Data } from './data/questions_bio1_chap1';
import { bio1Chap7Data } from './data/questions_bio1_chap7';
import { phy1Chap2Data } from './data/questions_phy1_chap2';
import { phy1Chap4RawQuestions } from './data/questions_phy1_chap4_newtonian';
import { phy1Chap6RawQuestions } from './data/questions_phy1_chap6_gravity';
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
import { dcuPhysicsCurrentElectricityData } from './data/questions_dcu_physics_current_electricity';
import { dcuChemQualitativeData } from './data/questions_dcu_chem_qualitative';
import { dcuChemPeriodicPropertiesData } from './data/questions_dcu_chem_periodic_properties';
import { dcuChemEnvironmentalData } from './data/questions_dcu_chem_environmental';
import { math1Chap9Data } from './data/questions_math1_chap9';
import { Subject, QuizResult, QuizSummary } from './types';
import { ADMIN_EMAIL } from './constants';
import RouteSetupModal from './components/RouteSetupModal';
import { StudentGameProfile, LearningRoute } from './types/gamification';
import { recordMeaningfulActionInFirestore } from './lib/gamificationService';
import CalmConfirmationToast from './components/CalmConfirmationToast';
import { recordTopicMasteryInFirestore } from './utils/topicMastery';
import MedicalDashboard from './components/medical/MedicalDashboard';
import MedicalQuestionBank from './components/medical/MedicalQuestionBank';
import MedicalPastQuestions from './components/medical/MedicalPastQuestions';
import MedicalSubjectTests from './components/medical/MedicalSubjectTests';
import MedicalMockTests from './components/medical/MedicalMockTests';
import MedicalModelTests from './components/medical/MedicalModelTests';

type ViewState = 'home' | 'chapters' | 'topics' | 'quiz' | 'result' | 'leaderboard' | 'login' | 'signup' | 'profile' | 'admin' | 'feedback' | 'doubt-arena' | 'shop' | 'routine'
  | 'category_academic' | 'category_board' | 'category_medical' | 'category_varsity'
  | 'medical-dashboard' | 'medical-question-bank' | 'medical-past-questions' | 'medical-subject-tests' | 'medical-mock-tests' | 'medical-model-tests';

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
  const [examTimeLimitMinutes, setExamTimeLimitMinutes] = useState<number | undefined>(undefined);
  const [examQuestionCountLimit, setExamQuestionCountLimit] = useState<number | undefined>(undefined);
  const [customExamQuestions, setCustomExamQuestions] = useState<any[] | null>(null);
  const [customExamTitle, setCustomExamTitle] = useState<string>('');
  const [quizSummary, setQuizSummary] = useState<QuizSummary | null>(null);
  
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [gameProfile, setGameProfile] = useState<StudentGameProfile | null>(null);
  const [showRouteModal, setShowRouteModal] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [showProModal, setShowProModal] = useState(false);
  const [routineNavOptions, setRoutineNavOptions] = useState<{ openAddTask?: boolean; focusToday?: boolean }>({});

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
            
            // Streak Safety: Login updates active date, resets if missed, but NEVER increments streak on login
            if (data.lastActiveDate !== today) {
              const todayDate = new Date(today);
              const lastActiveDateObj = new Date(data.lastActiveDate);
              const diffTime = Math.abs(todayDate.getTime() - lastActiveDateObj.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
              
              if (diffDays > 1) {
                  data.currentStreak = 0;
              }
              data.lastActiveDate = today;
              needsUpdate = true;
            }

            if (data.dailyMissions === undefined || data.lastMissionsResetDate !== today) {
              data.dailyMissions = [
                {
                  id: 'mcq_correct',
                  title: 'Correct 5 MCQs',
                  banglaTitle: '৫টি প্রশ্নের সঠিক উত্তর দিন',
                  target: 5,
                  current: 0,
                  reward: 30,
                  isCompleted: false,
                  isClaimed: false
                },
                {
                  id: 'upvote_doubt',
                  title: 'Upvote 2 doubts',
                  banglaTitle: 'ডাউট এরিনায় ২টি উত্তর আপভোট করুন',
                  target: 2,
                  current: 0,
                  reward: 20,
                  isCompleted: false,
                  isClaimed: false
                },
                {
                  id: 'post_doubt',
                  title: 'Post 1 doubt',
                  banglaTitle: 'ডাউট এরিনায় ১টি প্রশ্ন পোস্ট করুন',
                  target: 1,
                  current: 0,
                  reward: 15,
                  isCompleted: false,
                  isClaimed: false
                }
              ];
              data.lastMissionsResetDate = today;
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
                equippedBorder: data.equippedBorder,
                dailyMissions: data.dailyMissions,
                lastMissionsResetDate: data.lastMissionsResetDate
              }, { merge: true });
            }
            setUserData(data);

            // Fetch Gamification Profile
            try {
              const gameProfileRef = doc(db, 'users', currentUser.uid, 'gameProfile', 'main');
              const gameProfileSnap = await getDoc(gameProfileRef);
              if (gameProfileSnap.exists()) {
                const gpData = gameProfileSnap.data() as StudentGameProfile;
                setGameProfile(gpData);
                if (!gpData.selectedRoute) {
                  setShowRouteModal(true);
                }
              } else {
                setGameProfile(null);
                setShowRouteModal(true);
              }
            } catch (gpErr) {
              console.warn("Could not load game profile:", gpErr);
            }
          } else {
            // Check if admin email and set role accordingly, fixing legacy missing users
            const defaultRole = currentUser.email === ADMIN_EMAIL ? 'admin' : 'user';
            const today = new Date().toISOString().split('T')[0];
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
              lastActiveDate: today,
              lastEnergyUpdate: Date.now(),
              purchasedItems: ["avatar_default"],
              equippedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
              equippedBorder: "none",
              dailyMissions: [
                {
                  id: 'mcq_correct',
                  title: 'Correct 5 MCQs',
                  banglaTitle: '৫টি প্রশ্নের সঠিক উত্তর দিন',
                  target: 5,
                  current: 0,
                  reward: 30,
                  isCompleted: false,
                  isClaimed: false
                },
                {
                  id: 'upvote_doubt',
                  title: 'Upvote 2 doubts',
                  banglaTitle: 'ডাউট এরিনায় ২টি উত্তর আপভোট করুন',
                  target: 2,
                  current: 0,
                  reward: 20,
                  isCompleted: false,
                  isClaimed: false
                },
                {
                  id: 'post_doubt',
                  title: 'Post 1 doubt',
                  banglaTitle: 'ডাউট এরিনায় ১টি প্রশ্ন পোস্ট করুন',
                  target: 1,
                  current: 0,
                  reward: 15,
                  isCompleted: false,
                  isClaimed: false
                }
              ],
              lastMissionsResetDate: today,
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
    const subject = syllabus.find(s => s?.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
      setCurrentView('chapters');
    }
  };

  const handleSelectChapter = (chapterIndex: number) => {
    setSelectedChapterIndex(chapterIndex);
    setCurrentView('topics');
  };

  const handleSelectTopic = (
    topic: string | null,
    mode: 'quiz' | 'exam',
    questionCount?: number,
    timeMinutes?: number
  ) => {
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
    setExamTimeLimitMinutes(timeMinutes);
    setExamQuestionCountLimit(questionCount);
    setCurrentView('quiz');
  };

  const handleSaveRoute = async (route: LearningRoute, targetExam: string) => {
    if (!user) return;
    try {
      const profileRef = doc(db, 'users', user.uid, 'gameProfile', 'main');
      const existingSnap = await getDoc(profileRef);
      const existingData = existingSnap.exists() ? existingSnap.data() : {};

      const updatedProfile: StudentGameProfile = {
        userId: user.uid,
        selectedRoute: route,
        targetExam,
        selectedSubjects: existingData.selectedSubjects || [],
        skillDivisions: existingData.skillDivisions || { [route]: 'foundation' },
        competitionOptIn: existingData.competitionOptIn ?? false,
        progressPoints: existingData.progressPoints || 0,
        helpPoints: existingData.helpPoints || userData?.reputation || 0,
        currentStreak: existingData.currentStreak || userData?.currentStreak || 0,
        lastActiveDate: existingData.lastActiveDate || new Date().toISOString().split('T')[0],
        createdAt: existingData.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(profileRef, updatedProfile, { merge: true });
      setGameProfile(updatedProfile);
      setShowRouteModal(false);
    } catch (err) {
      console.error("Error saving learning route:", err);
    }
  };

  const handleQuizComplete = async (results: QuizResult[]) => {
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

    if (correctCount > 0) {
      updateMissionProgress('mcq_correct', correctCount).catch(console.error);
    }

    // Award Gamification Foundation Points, Streaks, Daily Goals & Topic Mastery
    if (user?.uid) {
      try {
        const eventType = quizMode === 'exam' ? 'mock_test' : 'quiz';
        const eventId = `quiz_${selectedSubject?.id || 'gen'}_${Date.now()}`;
        const res = await recordMeaningfulActionInFirestore(user.uid, {
          type: eventType,
          eventId
        }, gameProfile);
        
        setGameProfile(res.updatedProfile);

        // Update Topic Mastery for topic if available
        if (selectedSubject?.id && selectedTopic) {
          const topicId = `${selectedSubject.id}_${selectedTopic}`;
          await recordTopicMasteryInFirestore(user.uid, selectedSubject.id, topicId, results.length, correctCount, gameProfile?.selectedRoute, selectedChapterIndex ?? undefined);
        }
      } catch (gErr) {
        console.warn("Error updating gamification profile on quiz complete:", gErr);
      }
    }

    setCurrentView('result');
  };

  const handleRetry = () => {
    setCurrentView('quiz');
  };

  const updateMissionProgress = async (missionId: string, incrementValue: number) => {
    if (!user || !userData || !userData.dailyMissions) return;

    const today = new Date().toISOString().split('T')[0];
    let updatedMissions = [...userData.dailyMissions];
    let needsUpdate = false;

    if (userData.lastMissionsResetDate !== today) {
      updatedMissions = [
        {
          id: 'mcq_correct',
          title: 'Correct 5 MCQs',
          banglaTitle: '৫টি প্রশ্নের সঠিক উত্তর দিন',
          target: 5,
          current: 0,
          reward: 30,
          isCompleted: false,
          isClaimed: false
        },
        {
          id: 'upvote_doubt',
          title: 'Upvote 2 doubts',
          banglaTitle: 'ডাউট এরিনায় ২টি উত্তর আপভোট করুন',
          target: 2,
          current: 0,
          reward: 20,
          isCompleted: false,
          isClaimed: false
        },
        {
          id: 'post_doubt',
          title: 'Post 1 doubt',
          banglaTitle: 'ডাউট এরিনায় ১টি প্রশ্ন পোস্ট করুন',
          target: 1,
          current: 0,
          reward: 15,
          isCompleted: false,
          isClaimed: false
        }
      ];
      needsUpdate = true;
    }

    updatedMissions = updatedMissions.map((mission: any) => {
      if (mission.id === missionId && !mission.isCompleted) {
        const newCurrent = Math.min(mission.target, mission.current + incrementValue);
        const isCompleted = newCurrent >= mission.target;
        needsUpdate = true;
        return {
          ...mission,
          current: newCurrent,
          isCompleted
        };
      }
      return mission;
    });

    if (needsUpdate) {
      const updatedData = {
        ...userData,
        dailyMissions: updatedMissions,
        lastMissionsResetDate: today
      };
      setUserData(updatedData);

      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          dailyMissions: updatedMissions,
          lastMissionsResetDate: today
        }, { merge: true });
      } catch (err) {
        console.error("Error updating daily missions in Firestore", err);
      }
    }
  };

  const claimMissionReward = async (missionId: string) => {
    if (!user || !userData || !userData.dailyMissions) return;

    let rewardCoins = 0;
    const updatedMissions = userData.dailyMissions.map((mission: any) => {
      if (mission.id === missionId && mission.isCompleted && !mission.isClaimed) {
        rewardCoins = mission.reward;
        return {
          ...mission,
          isClaimed: true
        };
      }
      return mission;
    });

    if (rewardCoins > 0) {
      const updatedData = {
        ...userData,
        coins: (userData.coins || 0) + rewardCoins,
        dailyMissions: updatedMissions
      };
      setUserData(updatedData);

      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          coins: updatedData.coins,
          dailyMissions: updatedMissions
        }, { merge: true });
      } catch (err) {
        console.error("Error claiming mission reward", err);
      }
    }
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
    if (customExamQuestions && customExamQuestions.length > 0) {
      return customExamQuestions;
    }

    let questions: any[] = [];
    
    // Check if it is a Custom dynamic subject first
    if (selectedSubject?.id?.startsWith('subj_') && selectedChapterIndex !== null) {
       const rawChapters = (selectedSubject as any)._rawChapters;
       if (rawChapters && rawChapters[selectedChapterIndex]) {
          const rawQ = rawChapters[selectedChapterIndex].questions || [];
          questions = rawQ.map((q: any, i: number) => ({
             id: i + 1,
             question_text: q?.questionText || q?.question_text || '',
             options: q?.options || [],
             correct_answer: q?.correctAnswer || q?.correct_answer || '',
             explanation: q?.explanation || ''
          }));
       }
       return questions;
    }

    if (selectedSubject?.id === 'bio1' && selectedChapterIndex === 0) {
      questions = bio1Chap1Data?.questions || [];
    } else if (selectedSubject?.id === 'bio1' && selectedChapterIndex === 6) {
      questions = bio1Chap7Data?.questions || [];
    } else if (selectedSubject?.id === 'bio2' && selectedChapterIndex === 0) {
      questions = sampleChapterData?.questions || [];
    } else if (selectedSubject?.id === 'phys1' && selectedChapterIndex === 1) {
      questions = phy1Chap2Data?.questions || [];
    } else if (selectedSubject?.id === 'phys1' && selectedChapterIndex === 3) {
      questions = phy1Chap4RawQuestions || [];
    } else if (selectedSubject?.id === 'phys1' && selectedChapterIndex === 5) {
      questions = phy1Chap6RawQuestions || [];
    } else if (selectedSubject?.id === 'chem1' && selectedChapterIndex === 1) {
      questions = chem1Chap2Data?.questions || [];
    } else if (selectedSubject?.id === 'gst_math' && selectedChapterIndex === 0) {
      questions = gstMathExam1Data?.questions || [];
    } else if (selectedSubject?.id === 'gst_math' && selectedChapterIndex === 1) {
      questions = gstMathExam2Data?.questions || [];
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 0) {
      questions = dcuMathStraightLineData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 1) {
      questions = dcuMathExam1Data?.questions || [];
    } else if (selectedSubject?.id === 'dcu_math' && selectedChapterIndex === 2) {
      questions = dcuMathExam3Data?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 1) {
      questions = dcuPhysicsVectorData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 2) {
      questions = dcuPhysicsNewtonianData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 3) {
      questions = dcuPhysicsWorkEnergyData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 4) {
      questions = dcuPhysicsGravityData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 5) {
      questions = dcuPhysicsStructureData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 6) {
      questions = dcuPhysicsPeriodicData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys' && selectedChapterIndex === 7) {
      questions = dcuPhysicsIdealGasData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys2' && selectedChapterIndex === 0) {
      questions = dcuPhysicsThermodynamicsData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys2' && selectedChapterIndex === 1) {
      questions = dcuPhysicsElectrostaticsData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_phys2' && selectedChapterIndex === 2) {
      questions = dcuPhysicsCurrentElectricityData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_chem1' && selectedChapterIndex === 0) {
      questions = dcuChemQualitativeData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_chem1' && selectedChapterIndex === 1) {
      questions = dcuChemPeriodicPropertiesData?.questions || [];
    } else if (selectedSubject?.id === 'dcu_chem2' && selectedChapterIndex === 0) {
      questions = dcuChemEnvironmentalData?.questions || [];
    } else if (selectedSubject?.id === 'math1' && selectedChapterIndex === 8) {
      questions = math1Chap9Data?.questions || [];
    }

    // Apply Overrides globally to all questions found
    const appliedQuestions = (questions || []).filter(Boolean).map((q, idx) => {
      // The override key pattern used in AdminDashboard: 
      // `override_${subjectId}_${chapterIndex}_${topic || 'none'}_${questionId}`
      // This applies to the selected topic if there's one, but let's check exact topic matching.
      const overrideKeyBase = `override_${selectedSubject?.id}_${selectedChapterIndex}`;
      // Q's topic might be different from selectedTopic if we haven't filtered yet
      const qTopicStr = q?.topic || 'none';
      const qIdStr = q?.id ?? idx + 1;
      const exactOverrideKey = `${overrideKeyBase}_${qTopicStr}_${qIdStr}`;
      
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

    let resultQuestions = appliedQuestions;
    if (selectedTopic) {
      const norm = selectedTopic.replace(/^[০-৯0-9]+\.\s*/, '').trim();
      resultQuestions = appliedQuestions.filter(q => {
        if (!q?.topic) return false;
        return q.topic === selectedTopic || q.topic.replace(/^[০-৯0-9]+\.\s*/, '').trim() === norm;
      });
    }

    if (examQuestionCountLimit && examQuestionCountLimit > 0 && resultQuestions.length > examQuestionCountLimit) {
      return resultQuestions.slice(0, examQuestionCountLimit);
    }
    return resultQuestions;
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
      <CalmConfirmationToast />
      
      <main className="flex-1">
        {currentView === 'home' && (
          <Home 
            user={user}
            userData={userData}
            gameProfile={gameProfile}
            onSelectCategory={(category) => {
              setCurrentCategory(category);
              if (category === 'medical') {
                setCurrentView('medical-dashboard');
              } else {
                setCurrentView(`category_${category}` as ViewState);
              }
            }} 
            onShowLeaderboard={handleShowLeaderboard} 
            onShowShop={() => setCurrentView('shop')} 
            onClaimReward={claimMissionReward}
            onNavigateToRoutine={(options) => {
              setRoutineNavOptions(options || {});
              handleNavigate('routine');
            }}
            onNavigateToLogin={() => handleNavigate('login')}
            onNavigateToDoubtArena={() => handleNavigate('doubt-arena')}
            onOpenRouteSetup={() => setShowRouteModal(true)}
            onNavigateToMedicalDashboard={() => setCurrentView('medical-dashboard')}
            onNavigateToMedicalSubView={(v) => setCurrentView(v as ViewState)}
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

        {(currentView === 'category_medical' || currentView === 'medical-dashboard') && (
          <MedicalDashboard
            onNavigate={(v) => setCurrentView(v as ViewState)}
            onOpenRouteSetup={() => setShowRouteModal(true)}
            gameProfile={gameProfile}
            onSelectSubjectForPractice={(subjectId) => {
              const sub = syllabus.find(s => s?.id === subjectId);
              if (sub) {
                setSelectedSubject(sub);
                setCurrentView('medical-question-bank');
              } else {
                setCurrentView('medical-question-bank');
              }
            }}
          />
        )}

        {currentView === 'medical-question-bank' && (
          <MedicalQuestionBank
            syllabus={syllabus}
            onBack={() => setCurrentView('medical-dashboard')}
            onStartQuiz={(subject, chapterIndex, mode) => {
              setCustomExamQuestions(null);
              setSelectedSubject(subject);
              setSelectedChapterIndex(chapterIndex);
              setQuizMode(mode || 'quiz');
              setCurrentView('quiz');
            }}
            onStartCustomTest={(questions, title, mode) => {
              setCustomExamQuestions(questions);
              setCustomExamTitle(title);
              setQuizMode(mode || 'quiz');
              setCurrentView('quiz');
            }}
          />
        )}

        {currentView === 'medical-past-questions' && (
          <MedicalPastQuestions
            onBack={() => setCurrentView('medical-dashboard')}
            pastQuestionSets={[]}
          />
        )}

        {currentView === 'medical-subject-tests' && (
          <MedicalSubjectTests
            onBack={() => setCurrentView('medical-dashboard')}
            onStartCustomTest={(questions, title, mode) => {
              setCustomExamQuestions(questions);
              setCustomExamTitle(title);
              setQuizMode(mode || 'exam');
              setCurrentView('quiz');
            }}
            onAddToRoutine={(title, durationMinutes) => {
              setRoutineNavOptions({ openAddTask: true, focusToday: true });
              setCurrentView('routine');
            }}
          />
        )}

        {currentView === 'medical-mock-tests' && (
          <MedicalMockTests
            onBack={() => setCurrentView('medical-dashboard')}
            mockTests={[]}
          />
        )}

        {currentView === 'medical-model-tests' && (
          <MedicalModelTests
            onBack={() => setCurrentView('medical-dashboard')}
            onAddToRoutine={(title, durationMinutes) => {
              setRoutineNavOptions({ openAddTask: true, focusToday: true });
              setCurrentView('routine');
            }}
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
            subjectId={selectedSubject?.id || 'physics'}
            chapterIndex={selectedChapterIndex ?? undefined}
            quizTitle={customExamQuestions ? customExamTitle : selectedSubject?.name}
            userEmail={user?.email || undefined}
            examTimeLimitMinutes={examTimeLimitMinutes}
            onComplete={handleQuizComplete} 
            onBack={() => {
              if (customExamQuestions) {
                setCustomExamQuestions(null);
                setCurrentView('medical-subject-tests');
              } else {
                setCurrentView('topics');
              }
            }}
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
            onAskMentorHelp={() => setCurrentView('doubt-arena')}
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
          <Profile 
            user={user} 
            userData={userData} 
            gameProfile={gameProfile}
            onBack={handleGoHome} 
            onNavigate={handleNavigate as any} 
            onUpgradeClick={() => setShowProModal(true)} 
            onOpenRouteSetup={() => setShowRouteModal(true)}
          />
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
          <DoubtArena 
            user={user} 
            userData={userData} 
            onBack={handleGoHome} 
            setUserData={setUserData} 
            syllabus={syllabus} 
            initialSubject={selectedSubject?.name}
            initialChapter={selectedChapterIndex !== null && selectedSubject ? selectedSubject.chapters[selectedChapterIndex] : undefined}
            onUpdateMissionProgress={updateMissionProgress}
          />
        )}

        {currentView === 'routine' && (
          <RoutineManager
            userId={user?.uid || null}
            autoOpenAddTask={routineNavOptions.openAddTask}
            autoFocusToday={routineNavOptions.focusToday}
            onNavigateToQuiz={(topicId) => {
              setCurrentView('category_academic');
            }}
          />
        )}

        {/* Gamification Onboarding / Route Setup Modal */}
        {user && showRouteModal && (
          <RouteSetupModal
            currentRoute={gameProfile?.selectedRoute}
            currentTargetExam={gameProfile?.targetExam}
            onSave={handleSaveRoute}
            onClose={() => setShowRouteModal(false)}
          />
        )}
      </main>
    </div>
  );
}
