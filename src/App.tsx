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
import { bio1Chap8Data } from './data/questions_bio1_chap8';
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
import { ictChap3Data } from './data/questions_ict_chap3';
import { Subject, Question, QuizResult, QuizSummary } from './types';
import { ADMIN_EMAIL } from './constants';
import RouteSetupModal from './components/RouteSetupModal';
import { StudentGameProfile, LearningRoute } from './types/gamification';
import { recordMeaningfulActionInFirestore } from './lib/gamificationService';
import CalmConfirmationToast from './components/CalmConfirmationToast';
import { recordTopicMasteryInFirestore } from './utils/topicMastery';
import MedicalDashboard from './components/medical/MedicalDashboard';
import MedicalQuestionBank from './components/medical/MedicalQuestionBank';
import MedicalPastQuestions from './components/medical/MedicalPastQuestions';
import { MedicalPastQuestionSet } from './types/medical';
import MedicalSubjectTests from './components/medical/MedicalSubjectTests';
import MedicalMockTests from './components/medical/MedicalMockTests';
import MedicalModelTests from './components/medical/MedicalModelTests';
import MedicalSubjectPreparation from './components/medical/MedicalSubjectPreparation';
import { MedicalSubject } from './types/questionBank';
import VarsityDashboard from './components/varsity/VarsityDashboard';
import VarsityUnitPractice from './components/varsity/VarsityUnitPractice';
import VarsityPastQuestions from './components/varsity/VarsityPastQuestions';
import VarsitySubjectPreparation from './components/varsity/VarsitySubjectPreparation';
import VarsityModelTests from './components/varsity/VarsityModelTests';
import { VarsitySubjectKey } from './lib/varsityPracticeBank';
import BoardChapterList from './components/board/BoardChapterList';
import BoardChapterPage from './components/board/BoardChapterPage';
import { BoardQuestion } from './types/boardPrep';
import { INITIAL_BOARD_QUESTIONS, fetchFirestoreBoardQuestions } from './data/boardPrepData';

type ViewState = 'home' | 'chapters' | 'topics' | 'quiz' | 'result' | 'leaderboard' | 'login' | 'signup' | 'profile' | 'admin' | 'feedback' | 'doubt-arena' | 'shop' | 'routine'
  | 'category_academic' | 'category_board' | 'category_medical' | 'category_varsity'
  | 'medical-dashboard' | 'medical-question-bank' | 'medical-past-questions' | 'medical-subject-tests' | 'medical-mock-tests' | 'medical-model-tests' | 'medical-subject-preparation'
  | 'varsity-dashboard' | 'varsity-unit-practice' | 'varsity-past-questions' | 'varsity-subject-preparation' | 'varsity-model-test' | 'varsity-model-tests' | 'varsity-question-bank'
  | 'board_chapters' | 'board_chapter_page';

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
  const [boardQuestions, setBoardQuestions] = useState<BoardQuestion[]>(INITIAL_BOARD_QUESTIONS);
  const [selectedBoardYear, setSelectedBoardYear] = useState<number | null>(null);

  // Past Questions & Medical Feature Routing State
  const [selectedRoute, setSelectedRoute] = useState<'medical' | 'varsity' | 'board' | 'academic' | null>('medical');
  const [selectedFeature, setSelectedFeature] = useState<'past_questions' | 'subject_tests' | 'mock_tests' | 'model_tests' | null>(null);
  const [selectedQuestionCollectionId, setSelectedQuestionCollectionId] = useState<string | null>(null);
  const [selectedCollectionTitle, setSelectedCollectionTitle] = useState<string>('');
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [selectedChapterName, setSelectedChapterName] = useState<string | null>(null);
  const [activePastQuestionSet, setActivePastQuestionSet] = useState<MedicalPastQuestionSet | null>(null);
  const [pastQuestionModalTime, setPastQuestionModalTime] = useState<number>(15);
  const [pastQuestionModalMode, setPastQuestionModalMode] = useState<'exam' | 'practice'>('exam');
  const [medQuestionBankInitialSubject, setMedQuestionBankInitialSubject] = useState<MedicalSubject | undefined>(undefined);
  const [medQuestionBankInitialPaper, setMedQuestionBankInitialPaper] = useState<'first' | 'second' | 'not_applicable' | undefined>(undefined);
  const [medQuestionBankInitialChapterName, setMedQuestionBankInitialChapterName] = useState<string | undefined>(undefined);
  const [varsityInitialSubject, setVarsityInitialSubject] = useState<VarsitySubjectKey | undefined>(undefined);

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
        const cachedUserStr = localStorage.getItem(`qm_cached_user_${currentUser.uid}`);
        let parsedCachedUser: any = null;
        if (cachedUserStr) {
          try {
            parsedCachedUser = JSON.parse(cachedUserStr);
          } catch (err) {
            console.warn("Failed to parse cached user data", err);
          }
        }

        const isConfiguredAdmin = currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        const defaultRole = isConfiguredAdmin ? 'admin' : 'user';
        const today = new Date().toISOString().split('T')[0];

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
                 if (data.energy > 5) { data.energy = 5; needsUpdate = true; }
            }

            if (isConfiguredAdmin && data.role !== 'admin') {
              data.role = 'admin';
              needsUpdate = true;
            }

            if (needsUpdate) {
              try {
                await setDoc(userDocRef, { 
                  role: data.role || 'user',
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
              } catch (writeErr) {
                console.warn("Could not sync user updates to Firestore (offline):", writeErr);
              }
            }
            localStorage.setItem(`qm_cached_user_${currentUser.uid}`, JSON.stringify(data));
            setUserData(data);

            // Fetch Gamification Profile
            try {
              const gameProfileRef = doc(db, 'users', currentUser.uid, 'gameProfile', 'main');
              const gameProfileSnap = await getDoc(gameProfileRef);
              if (gameProfileSnap.exists()) {
                const gpData = gameProfileSnap.data() as StudentGameProfile;
                localStorage.setItem(`qm_cached_game_profile_${currentUser.uid}`, JSON.stringify(gpData));
                setGameProfile(gpData);
                if (!gpData.selectedRoute) {
                  setShowRouteModal(true);
                }
              } else {
                setGameProfile(null);
                setShowRouteModal(true);
              }
            } catch (gpErr) {
              console.warn("Could not load game profile from Firestore, checking cache:", gpErr);
              const cachedGPStr = localStorage.getItem(`qm_cached_game_profile_${currentUser.uid}`);
              if (cachedGPStr) {
                try {
                  const cachedGP = JSON.parse(cachedGPStr);
                  setGameProfile(cachedGP);
                } catch {
                  setGameProfile(null);
                }
              } else {
                setGameProfile(null);
              }
            }
          } else {
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
            try {
              await setDoc(userDocRef, newUserData);
            } catch (writeErr) {
              console.warn("Could not create user document in Firestore (offline):", writeErr);
            }
            localStorage.setItem(`qm_cached_user_${currentUser.uid}`, JSON.stringify(newUserData));
            setUserData(newUserData);
          }
        } catch (e) {
          console.warn("Offline or network issue accessing user data in Firestore:", e);
          if (parsedCachedUser) {
            setUserData(parsedCachedUser);
          } else {
            const fallbackUserData = {
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || 'Learner',
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
              lastMissionsResetDate: today
            };
            localStorage.setItem(`qm_cached_user_${currentUser.uid}`, JSON.stringify(fallbackUserData));
            setUserData(fallbackUserData);
          }

          // Also attempt local recovery for game profile
          const cachedGPStr = localStorage.getItem(`qm_cached_game_profile_${currentUser.uid}`);
          if (cachedGPStr) {
            try {
              setGameProfile(JSON.parse(cachedGPStr));
            } catch {
              setGameProfile(null);
            }
          }
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

    const fetchBoardQuestionsData = async () => {
      try {
        const firestoreQs = await fetchFirestoreBoardQuestions();
        if (firestoreQs.length > 0) {
          const combined = [...firestoreQs];
          INITIAL_BOARD_QUESTIONS.forEach(initQ => {
            if (!combined.some(q => q.id === initQ.id)) {
              combined.push(initQ);
            }
          });
          setBoardQuestions(combined);
        }
      } catch (e) {
        console.warn("Could not load board questions from Firestore:", e);
      }
    };

    fetchDynamicSubjects();
    fetchOverrides();
    fetchBoardQuestionsData();
  }, []);

  const isAdminUser = Boolean(
    user && (user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || userData?.role === 'admin')
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentView('home');
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavigate = (view: ViewState) => {
    if (view === 'admin' && !isAdminUser) {
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
      if (currentCategory === 'board') {
        setCurrentView('board_chapters');
      } else {
        setCurrentView('chapters');
      }
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
    timeMinutes?: number,
    customQuestions?: Question[]
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

    if (customQuestions && customQuestions.length > 0) {
      setCustomExamQuestions(customQuestions);
      setCustomExamTitle(topic ? `${selectedSubject?.name || 'Academic'} • ${topic}` : (selectedSubject?.name || 'Academic Question Bank'));
    } else {
      setCustomExamQuestions(null);
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

    let quizNameStr = customExamQuestions ? customExamTitle : (selectedSubject?.name || 'Quiz');
    if (!customExamQuestions && selectedChapterIndex !== null && selectedSubject?.chapters[selectedChapterIndex]) {
       quizNameStr += ` - ${selectedSubject.chapters[selectedChapterIndex]}`;
    }
    if (!customExamQuestions && selectedTopic) {
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

        // Update Board Prep progress tracking per year per chapter
        if (currentCategory === 'board' && selectedSubject && selectedChapterIndex !== null && selectedBoardYear !== null) {
          const yearKey = `${selectedSubject.id}_${selectedChapterIndex}_${selectedBoardYear}`;
          const pct = results.length > 0 ? (correctCount / results.length) * 100 : 0;
          const prevProg = userData?.boardPrepProgress?.[yearKey];
          const updatedProg = {
            attempts: (prevProg?.attempts || 0) + 1,
            bestScore: Math.max(prevProg?.bestScore || 0, pct),
            correctCount,
            totalQuestions: results.length,
            status: pct >= 80 ? 'completed' : 'in_progress',
            lastAttemptAt: new Date().toISOString()
          };

          const newUserData = {
            ...userData,
            boardPrepProgress: {
              ...(userData?.boardPrepProgress || {}),
              [yearKey]: updatedProg
            }
          };
          setUserData(newUserData);
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            boardPrepProgress: {
              ...(userData?.boardPrepProgress || {}),
              [yearKey]: updatedProg
            }
          }, { merge: true });
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

  const handleStartPastQuestionQuiz = (
    set: MedicalPastQuestionSet,
    timeMinutes: number = 15,
    mode: 'exam' | 'practice' = 'exam'
  ) => {
    const questions = set.questions || [];
    if (!questions || questions.length === 0) {
      alert("এই প্রশ্ন সেটে কোনো প্রকাশিত প্রশ্ন পাওয়া যায়নি।");
      return;
    }

    const validatedTime = mode === 'exam'
      ? (timeMinutes > 0 ? timeMinutes : Math.max(5, Math.ceil(questions.length * 0.75)))
      : timeMinutes;

    // Set all required state values
    setSelectedQuestionCollectionId(set.id);
    setSelectedCollectionTitle(set.title);
    setSelectedRoute('medical');
    setSelectedFeature('past_questions');
    setActivePastQuestionSet(set);
    setPastQuestionModalTime(validatedTime);
    setPastQuestionModalMode(mode);

    // Subject/Paper/Chapter resolution
    let paperStr: string | null = null;
    let chapStr: string | null = null;
    if (set.title.includes('১ম পত্র') || set.title.includes('1st')) paperStr = '1st Paper';
    if (set.title.includes('২য় পত্র') || set.title.includes('2nd')) paperStr = '2nd Paper';
    const match = set.title.match(/(\d+|[০-৯]+)\s*(?:তম|ম|ষ্ঠ|র্থ|ম)?\s*অধ্যায়/);
    if (match) chapStr = match[0];
    setSelectedPaper(paperStr);
    setSelectedChapterName(chapStr);

    const subjectObj = syllabus.find(s => s.id === set.subject || s.category?.toLowerCase() === set.subject?.toLowerCase()) || {
      id: set.subject || 'biology',
      name: set.subject === 'biology' ? 'জীববিজ্ঞান' : set.subject === 'physics' ? 'পদার্থবিজ্ঞান' : set.subject === 'chemistry' ? 'রসায়ন' : 'মেডিকেল প্রশ্নব্যাংক',
      icon: 'BookOpen',
      color: 'text-amber-400',
      chapters: [],
      activeChapters: []
    } as Subject;
    setSelectedSubject(subjectObj);

    // Set questions & mode & time
    setCustomExamQuestions(questions);
    setCustomExamTitle(set.title);
    setQuizMode(mode === 'practice' ? 'quiz' : 'exam');
    setExamTimeLimitMinutes(validatedTime);
    
    // Set currentView to quiz
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
    } else if (selectedSubject?.id === 'bio1' && selectedChapterIndex === 7) {
      questions = bio1Chap8Data?.questions || [];
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
    } else if (selectedSubject?.id === 'ict' && selectedChapterIndex === 2) {
      questions = ictChap3Data?.questions || [];
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
        isAdmin={isAdminUser}
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
              } else if (category === 'varsity') {
                setCurrentView('varsity-dashboard');
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
            initialSubject={medQuestionBankInitialSubject}
            initialPaper={medQuestionBankInitialPaper}
            initialChapterName={medQuestionBankInitialChapterName}
            onBack={() => {
              setMedQuestionBankInitialChapterName(undefined);
              setCurrentView('medical-dashboard');
            }}
            onStartQuiz={(subject, chapterIndex, mode) => {
              setCustomExamQuestions(null);
              setSelectedSubject(subject);
              setSelectedChapterIndex(chapterIndex);
              setQuizMode(mode || 'quiz');
              setExamTimeLimitMinutes(null);
              setCurrentView('quiz');
            }}
            onStartCustomTest={(questions, title, mode, timeLimitMinutes) => {
              setCustomExamQuestions(questions);
              setCustomExamTitle(title);
              setQuizMode(mode || 'quiz');
              setExamTimeLimitMinutes(timeLimitMinutes ?? null);
              setCurrentView('quiz');
            }}
          />
        )}

        {currentView === 'medical-subject-preparation' && (
          <MedicalSubjectPreparation
            onBack={() => setCurrentView('medical-dashboard')}
            userData={userData}
            onOpenQuestionBank={(subject, paper, chapterName) => {
              setMedQuestionBankInitialSubject(subject);
              setMedQuestionBankInitialPaper(paper);
              setMedQuestionBankInitialChapterName(chapterName);
              setCurrentView('medical-question-bank');
            }}
            onAddToRoutine={(title, durationMinutes) => {
              setRoutineNavOptions({ openAddTask: true, focusToday: true });
              setCurrentView('routine');
            }}
          />
        )}

        {currentView === 'medical-past-questions' && (
          <MedicalPastQuestions
            onBack={() => {
              setActivePastQuestionSet(null);
              setSelectedFeature(null);
              setSelectedQuestionCollectionId(null);
              setCurrentView('medical-dashboard');
            }}
            pastQuestionSets={[]}
            initialActiveSet={activePastQuestionSet}
            initialTimeMinutes={pastQuestionModalTime}
            initialMode={pastQuestionModalMode}
            onStartPastQuestionQuiz={handleStartPastQuestionQuiz}
            onStartCustomTest={(questions, title, mode, timeLimitMinutes, meta) => {
              if (meta?.rawSet) {
                handleStartPastQuestionQuiz(meta.rawSet, timeLimitMinutes || 15, mode || 'exam');
              } else {
                handleStartPastQuestionQuiz({
                  id: meta?.collectionId || 'custom_set',
                  title: title,
                  subject: meta?.subject || 'biology',
                  year: '2024',
                  sourceStatus: 'verified',
                  questionIds: questions.map(q => q.id),
                  questions: questions
                }, timeLimitMinutes || 15, mode || 'exam');
              }
            }}
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

        {(currentView === 'category_varsity' || currentView === 'varsity-dashboard') && (
          <VarsityDashboard
            onNavigate={(v) => setCurrentView(v as ViewState)}
            onOpenRouteSetup={() => setShowRouteModal(true)}
            gameProfile={gameProfile}
            onSelectSubjectForPractice={(subjectId) => {
              setVarsityInitialSubject(subjectId as VarsitySubjectKey);
              setCurrentView('varsity-subject-preparation');
            }}
          />
        )}

        {currentView === 'varsity-unit-practice' && (
          <VarsityUnitPractice
            onBack={() => setCurrentView('varsity-dashboard')}
            onStartQuiz={({ mode, questions, title, timeMinutes }) => {
              setCustomExamQuestions(questions);
              setCustomExamTitle(title);
              setQuizMode(mode || 'quiz');
              setExamTimeLimitMinutes(timeMinutes ?? null);
              setCurrentView('quiz');
            }}
          />
        )}

        {currentView === 'varsity-past-questions' && (
          <VarsityPastQuestions
            onBack={() => setCurrentView('varsity-dashboard')}
            onStartQuiz={({ mode, questions, title, timeMinutes }) => {
              setCustomExamQuestions(questions);
              setCustomExamTitle(title);
              setQuizMode(mode || 'quiz');
              setExamTimeLimitMinutes(timeMinutes ?? null);
              setCurrentView('quiz');
            }}
          />
        )}

        {(currentView === 'varsity-subject-preparation' || currentView === 'varsity-question-bank') && (
          <VarsitySubjectPreparation
            initialSubject={varsityInitialSubject || 'physics'}
            onBack={() => setCurrentView('varsity-dashboard')}
            onStartQuiz={({ mode, questions, title, timeMinutes }) => {
              setCustomExamQuestions(questions);
              setCustomExamTitle(title);
              setQuizMode(mode || 'quiz');
              setExamTimeLimitMinutes(timeMinutes ?? null);
              setCurrentView('quiz');
            }}
          />
        )}

        {(currentView === 'varsity-model-test' || currentView === 'varsity-model-tests') && (
          <VarsityModelTests
            onBack={() => setCurrentView('varsity-dashboard')}
            onStartQuiz={({ mode, questions, title, timeMinutes }) => {
              setCustomExamQuestions(questions);
              setCustomExamTitle(title);
              setQuizMode(mode || 'exam');
              setExamTimeLimitMinutes(timeMinutes ?? null);
              setCurrentView('quiz');
            }}
          />
        )}
        
        {currentView === 'board_chapters' && selectedSubject && (
          <BoardChapterList
            subject={selectedSubject}
            allBoardQuestions={boardQuestions}
            userData={userData}
            onBack={() => setCurrentView('category_board')}
            onSelectChapter={(chapterIndex) => {
              setSelectedChapterIndex(chapterIndex);
              setCurrentView('board_chapter_page');
            }}
          />
        )}

        {currentView === 'board_chapter_page' && selectedSubject && selectedChapterIndex !== null && (
          <BoardChapterPage
            subject={selectedSubject}
            chapterIndex={selectedChapterIndex}
            allBoardQuestions={boardQuestions}
            userData={userData}
            onBack={() => setCurrentView('board_chapters')}
            onGoHome={handleGoHome}
            onStartQuiz={(questions, title, mode, year) => {
              setCustomExamQuestions(questions);
              setCustomExamTitle(title);
              setQuizMode(mode);
              setSelectedBoardYear(year);
              setCurrentView('quiz');
            }}
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
              if (selectedFeature === 'past_questions') {
                setCustomExamQuestions(null);
                setCurrentView('medical-past-questions');
              } else if (currentCategory === 'board') {
                setCustomExamQuestions(null);
                setSelectedBoardYear(null);
                setCurrentView('board_chapter_page');
              } else if (selectedFeature === 'subject_tests' || (customExamQuestions && !selectedFeature)) {
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
            onBack={() => {
              if (selectedFeature === 'past_questions') {
                setCustomExamQuestions(null);
                setCurrentView('medical-past-questions');
              } else if (currentCategory === 'board') {
                setCurrentView('board_chapter_page');
              } else if (selectedFeature === 'subject_tests') {
                setCurrentView('medical-subject-tests');
              } else {
                setCurrentView('topics');
              }
            }}
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

        {currentView === 'admin' && isAdminUser && (
          <AdminDashboard user={user} isAdmin={true} syllabus={syllabus} onBack={handleGoHome} />
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
