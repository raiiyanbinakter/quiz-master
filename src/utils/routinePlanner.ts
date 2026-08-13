import {
  SyllabusTopic,
  TopicPerformanceSummary,
  TopicPriorityBreakdown,
  StudentAvailabilityBlock,
  FixedCommitment,
  RoutinePreferences,
  StudySession,
  StudyPlan,
  PlanFeasibility,
  LearningRoute,
  SessionType
} from '../types/routine';
import { ROUTINE_CONFIG } from '../constants/routineConfig';

/**
 * Calculates priority score for a topic deterministically:
 * score = 0.30*examBlueprintWeight + 0.25*studentWeakness + 0.20*prerequisiteUrgency + 0.15*reviewDue + 0.10*timePressure
 */
export function calculateTopicPriority(
  topic: SyllabusTopic,
  allTopics: SyllabusTopic[] = [],
  performance?: TopicPerformanceSummary,
  targetExamDate?: string,
  startDate?: string
): TopicPriorityBreakdown {
  const reasons: string[] = [];

  // 1. Exam Blueprint Weight (0-100)
  let examBlueprintWeight = topic.examBlueprintWeight ?? 50;
  if (topic.officialStatus === 'needs_verification') {
    reasons.push('Needs verification (Provisional weight used / যাচাইকরণ প্রয়োজন)');
  } else {
    reasons.push(`Blueprint Weight: ${examBlueprintWeight}%`);
  }

  // 2. Student Weakness (0-100)
  let studentWeakness = 50; // Neutral default if no quiz data
  if (performance) {
    studentWeakness = Math.min(100, Math.max(0, performance.weaknessScore));
    reasons.push(`Student Weakness Score: ${studentWeakness}% (Quiz Accuracy: ${performance.averageScorePercentage}%)`);
  } else {
    reasons.push('No quiz data yet (Neutral weakness 50%)');
  }

  // 3. Prerequisite Urgency (0-100)
  // Check if other topics list this topic in their prerequisites
  const isPrereqForOther = allTopics.some(t => t.prerequisites && t.prerequisites.includes(topic.id));
  const prerequisiteUrgency = isPrereqForOther ? 100 : 0;
  if (isPrereqForOther) {
    reasons.push('Prerequisite for dependent topics (পূর্বশর্ত মূলক টপিক)');
  }

  // 4. Review Due (0-100)
  let reviewDue = 0;
  if (performance?.lastReviewedDate) {
    const lastRev = new Date(performance.lastReviewedDate).getTime();
    const now = startDate ? new Date(startDate).getTime() : Date.now();
    const daysSince = Math.floor((now - lastRev) / (1000 * 60 * 60 * 24));
    if (daysSince >= 1) {
      reviewDue = Math.min(100, daysSince * 20); // Increases over time
      reasons.push(`Review due (${daysSince} days since last review)`);
    }
  }

  // 5. Time Pressure (0-100)
  let timePressure = 50;
  if (targetExamDate && startDate) {
    const startMs = new Date(startDate).getTime();
    const targetMs = new Date(targetExamDate).getTime();
    const totalDays = Math.max(1, Math.floor((targetMs - startMs) / (1000 * 60 * 60 * 24)));
    const nowMs = Date.now();
    const daysElapsed = Math.max(0, Math.floor((nowMs - startMs) / (1000 * 60 * 60 * 24)));
    timePressure = Math.min(100, Math.max(0, Math.round((daysElapsed / totalDays) * 100)));
    reasons.push(`Exam Time Pressure: ${timePressure}%`);
  }

  const weights = ROUTINE_CONFIG.WEIGHTS;
  const totalScore = Math.round(
    weights.EXAM_BLUEPRINT * examBlueprintWeight +
    weights.STUDENT_WEAKNESS * studentWeakness +
    weights.PREREQUISITE_URGENCY * prerequisiteUrgency +
    weights.REVIEW_DUE * reviewDue +
    weights.TIME_PRESSURE * timePressure
  );

  return {
    examBlueprintWeight,
    studentWeakness,
    prerequisiteUrgency,
    reviewDue,
    timePressure,
    totalScore,
    reasons,
  };
}

/**
 * Creates recommended review dates based on last reviewed date and review gaps
 */
export function createReviewDates(lastReviewedDate: string, reviewGaps: number[] = ROUTINE_CONFIG.DEFAULT_REVIEW_GAPS): string[] {
  const baseDate = new Date(lastReviewedDate);
  return reviewGaps.map(gap => {
    const nextDate = new Date(baseDate);
    nextDate.setDate(nextDate.getDate() + gap);
    return nextDate.toISOString().split('T')[0];
  });
}

/**
 * Calculates total available free minutes between startDate and endDate
 */
export function calculateAvailableMinutes(
  startDate: string,
  endDate: string,
  availability: StudentAvailabilityBlock[],
  commitments: FixedCommitment[],
  studyDays: number[]
): number {
  let totalMinutes = 0;
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay(); // 0=Sunday..6=Saturday
    if (!studyDays.includes(dayOfWeek)) continue;

    // Sum availability for this day of week
    const dayAvail = availability.filter(a => a.dayOfWeek === dayOfWeek);
    for (const block of dayAvail) {
      let blockMins = block.availableMinutes;

      // Subtract fixed commitments on same day
      const dayComm = commitments.filter(c => c.dayOfWeek === dayOfWeek);
      for (const comm of dayComm) {
        // Calculate overlap if times specified
        const overlap = getMinutesOverlap(block.startTime, block.endTime, comm.startTime, comm.endTime);
        blockMins = Math.max(0, blockMins - overlap);
      }
      totalMinutes += blockMins;
    }
  }

  return totalMinutes;
}

/**
 * Helper to get overlap in minutes between two HH:MM time ranges
 */
function getMinutesOverlap(start1: string, end1: string, start2: string, end2: string): number {
  const s1 = parseTimeToMinutes(start1);
  const e1 = parseTimeToMinutes(end1);
  const s2 = parseTimeToMinutes(start2);
  const e2 = parseTimeToMinutes(end2);

  const overlapStart = Math.max(s1, s2);
  const overlapEnd = Math.min(e1, e2);

  return Math.max(0, overlapEnd - overlapStart);
}

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function formatMinutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Validates plan feasibility
 */
export function validatePlanFeasibility(
  topics: SyllabusTopic[],
  startDate: string,
  endDate: string,
  availability: StudentAvailabilityBlock[],
  commitments: FixedCommitment[],
  preferences: RoutinePreferences
): PlanFeasibility {
  const totalAvailableMinutes = calculateAvailableMinutes(startDate, endDate, availability, commitments, preferences.studyDays);
  const bufferFraction = preferences.bufferPercentage ?? ROUTINE_CONFIG.DEFAULT_BUFFER_PERCENTAGE;
  const usableMinutesAfterBuffer = Math.floor(totalAvailableMinutes * (1 - bufferFraction));

  const totalRequiredMinutes = topics.reduce((sum, t) => sum + (t.estimatedMinutes || 60), 0);
  const shortfallOrSurplusMinutes = usableMinutesAfterBuffer - totalRequiredMinutes;
  const isFeasible = shortfallOrSurplusMinutes >= 0;

  const reasons: string[] = [];
  const suggestions: string[] = [];

  if (isFeasible) {
    reasons.push(`সহজেই সম্পন্নযোগ্য! আপনার কাছে ${shortfallOrSurplusMinutes} মিনিট অতিরিক্ত সময় রয়েছে (Feasible with ${shortfallOrSurplusMinutes} mins surplus).`);
  } else {
    const deficit = Math.abs(shortfallOrSurplusMinutes);
    reasons.push(`পরিকল্পনাটি বর্তমানে অসম্ভব: ${deficit} মিনিটের অভাব রয়েছে (Shortfall of ${deficit} minutes).`);
    suggestions.push('দৈনিক পড়াশোনার সময় বৃদ্ধি করুন (Increase daily study hours)');
    suggestions.push('পরীক্ষার লক্ষ্যমাত্রা তারিখ বৃদ্ধি করুন (Extend target exam date)');
    suggestions.push('উচ্চ অগ্রাধিকারযুক্ত প্রথম কয়েকটি টপিক সিলেক্ট করুন (Focus on top prioritized topics)');
    suggestions.push('বাফার টাইম ২০% থেকে কমান (Reduce unplanned buffer time)');
  }

  return {
    isFeasible,
    totalAvailableMinutes,
    usableMinutesAfterBuffer,
    totalRequiredMinutes,
    shortfallOrSurplusMinutes,
    reasons,
    suggestions,
  };
}

/**
 * Generates a weekly/period study plan
 */
export function generateStudyPlan(params: {
  userId: string;
  route: LearningRoute;
  title: string;
  startDate: string;
  targetExamDate: string;
  preferences: RoutinePreferences;
  availability: StudentAvailabilityBlock[];
  commitments: FixedCommitment[];
  customGoals: string[];
  topics: SyllabusTopic[];
  performanceSummaries?: Record<string, TopicPerformanceSummary>;
  existingSessions?: StudySession[];
}): StudyPlan {
  const {
    userId,
    route,
    title,
    startDate,
    targetExamDate,
    preferences,
    availability,
    commitments,
    customGoals,
    topics,
    performanceSummaries = {},
    existingSessions = []
  } = params;

  // 1. Keep locked or completed sessions from existing plan
  const preservedSessions = existingSessions.filter(s => s.locked || s.status === 'completed');
  const preservedIds = new Set(preservedSessions.map(s => s.id));

  // 2. Sort topics by priority
  const prioritizedTopics = [...topics].sort((a, b) => {
    const prioA = calculateTopicPriority(a, topics, performanceSummaries[a.id], targetExamDate, startDate).totalScore;
    const prioB = calculateTopicPriority(b, topics, performanceSummaries[b.id], targetExamDate, startDate).totalScore;
    return prioB - prioA; // Descending
  });

  const generatedSessions: StudySession[] = [...preservedSessions];

  // Map to track allocated time per day
  const dailyAllocatedMinutes: Record<string, number> = {};
  preservedSessions.forEach(s => {
    dailyAllocatedMinutes[s.date] = (dailyAllocatedMinutes[s.date] || 0) + s.durationMinutes;
  });

  const start = new Date(startDate);
  const end = new Date(targetExamDate);
  const sessionLength = preferences.preferredSessionMinutes || ROUTINE_CONFIG.DEFAULT_SESSION_MINUTES;
  const maxDaily = preferences.maxDailyStudyMinutes || ROUTINE_CONFIG.DEFAULT_MAX_DAILY_MINUTES;

  let topicIndex = 0;

  // Iterate date by date
  for (let d = new Date(start); d <= end && topicIndex < prioritizedTopics.length; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();

    if (!preferences.studyDays.includes(dayOfWeek)) continue;

    const dayAvail = availability.filter(a => a.dayOfWeek === dayOfWeek);
    if (dayAvail.length === 0) continue;

    for (const block of dayAvail) {
      if (topicIndex >= prioritizedTopics.length) break;

      const currentAllocated = dailyAllocatedMinutes[dateStr] || 0;
      if (currentAllocated >= maxDaily) continue;

      let blockStartMins = parseTimeToMinutes(block.startTime);
      const blockEndMins = parseTimeToMinutes(block.endTime);

      while (
        blockStartMins + sessionLength <= blockEndMins &&
        (dailyAllocatedMinutes[dateStr] || 0) + sessionLength <= maxDaily &&
        topicIndex < prioritizedTopics.length
      ) {
        // Check commitment overlaps
        const sessionStartStr = formatMinutesToTime(blockStartMins);
        const sessionEndStr = formatMinutesToTime(blockStartMins + sessionLength);

        const hasOverlap = commitments.some(c =>
          c.dayOfWeek === dayOfWeek &&
          getMinutesOverlap(sessionStartStr, sessionEndStr, c.startTime, c.endTime) > 0
        );

        if (hasOverlap) {
          blockStartMins += 30; // Shift window
          continue;
        }

        const currentTopic = prioritizedTopics[topicIndex];
        const prioInfo = calculateTopicPriority(currentTopic, topics, performanceSummaries[currentTopic.id], targetExamDate, startDate);

        const newSession: StudySession = {
          id: `sess_${dateStr}_${blockStartMins}_${currentTopic.id}`,
          date: dateStr,
          startTime: sessionStartStr,
          durationMinutes: sessionLength,
          topicId: currentTopic.id,
          topicTitle: currentTopic.title,
          subjectName: currentTopic.subjectName || currentTopic.subjectId,
          type: currentTopic.practiceType || 'learn',
          task: `${currentTopic.title} - ${currentTopic.practiceType === 'retrieve' ? 'সরাসরি প্র্যাকটিস ও রিভিশন' : 'পড়াশোনা ও সমাধান'}`,
          successCriteria: `টপিকের মৌলিক ধারণা পরিষ্কার করা এবং কমপক্ষে ১০টি প্রশ্ন সমাধান করা`,
          source: 'auto',
          locked: false,
          status: 'planned',
          recommendationReasons: prioInfo.reasons,
        };

        if (!preservedIds.has(newSession.id)) {
          generatedSessions.push(newSession);
        }

        dailyAllocatedMinutes[dateStr] = (dailyAllocatedMinutes[dateStr] || 0) + sessionLength;
        blockStartMins += sessionLength + 15; // 15 mins break default
        topicIndex++;
      }
    }
  }

  // Add custom goals as custom sessions if any remaining slot
  customGoals.forEach((goal, idx) => {
    const dateStr = startDate;
    generatedSessions.push({
      id: `custom_goal_${idx}_${Date.now()}`,
      date: dateStr,
      startTime: '18:00',
      durationMinutes: 30,
      type: 'custom',
      task: `কাস্টম লক্ষ্য: ${goal}`,
      successCriteria: 'ব্যক্তিগত লক্ষ্য অর্জিত হয়েছে',
      source: 'student',
      locked: true,
      status: 'planned',
      recommendationReasons: ['Student-added custom goal'],
    });
  });

  return {
    id: `plan_${Date.now()}`,
    userId,
    route,
    title,
    startDate,
    targetExamDate,
    preferences,
    availability,
    commitments,
    customGoals,
    selectedTopicIds: topics.map(t => t.id),
    sessions: generatedSessions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Replans incomplete/overdue sessions while preserving locked and completed ones
 */
export function replanIncompleteSessions(
  existingPlan: StudyPlan,
  topics: SyllabusTopic[],
  performanceSummaries: Record<string, TopicPerformanceSummary> = {},
  currentDate: string = new Date().toISOString().split('T')[0]
): StudyPlan {
  // Filter sessions
  const completedOrLocked = existingPlan.sessions.filter(
    s => s.status === 'completed' || s.locked
  );

  const pendingOverdueTopics = existingPlan.sessions
    .filter(s => s.status === 'planned' || s.status === 'skipped' || s.status === 'moved')
    .filter(s => !s.locked)
    .map(s => s.topicId)
    .filter((id): id is string => Boolean(id));

  const topicsToReplan = topics.filter(t => pendingOverdueTopics.includes(t.id));

  // Re-generate future plan starting from currentDate
  const replannedPlan = generateStudyPlan({
    userId: existingPlan.userId,
    route: existingPlan.route,
    title: `${existingPlan.title} (Replanned)`,
    startDate: currentDate,
    targetExamDate: existingPlan.targetExamDate,
    preferences: existingPlan.preferences,
    availability: existingPlan.availability,
    commitments: existingPlan.commitments,
    customGoals: existingPlan.customGoals,
    topics: topicsToReplan.length > 0 ? topicsToReplan : topics,
    performanceSummaries,
    existingSessions: completedOrLocked,
  });

  return replannedPlan;
}
