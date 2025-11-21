// Badge criteria and configuration
export const BADGES = [
  {
    id: 'first_quiz',
    name: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯',
    color: 'from-blue-400 to-blue-600',
    criteria: (stats) => stats.totalQuizzes >= 1
  },
  {
    id: 'quiz_5',
    name: 'Getting Started',
    description: 'Complete 5 quizzes',
    icon: '🌟',
    color: 'from-green-400 to-green-600',
    criteria: (stats) => stats.totalQuizzes >= 5
  },
  {
    id: 'quiz_10',
    name: 'Quiz Enthusiast',
    description: 'Complete 10 quizzes',
    icon: '🏆',
    color: 'from-yellow-400 to-yellow-600',
    criteria: (stats) => stats.totalQuizzes >= 10
  },
  {
    id: 'quiz_25',
    name: 'Quiz Master',
    description: 'Complete 25 quizzes',
    icon: '👑',
    color: 'from-purple-400 to-purple-600',
    criteria: (stats) => stats.totalQuizzes >= 25
  },
  {
    id: 'quiz_50',
    name: 'Quiz Legend',
    description: 'Complete 50 quizzes',
    icon: '⚡',
    color: 'from-red-400 to-red-600',
    criteria: (stats) => stats.totalQuizzes >= 50
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Score 100% in any quiz',
    icon: '💯',
    color: 'from-pink-400 to-pink-600',
    criteria: (stats) => stats.perfectScores >= 1
  },
  {
    id: 'high_scorer',
    name: 'High Scorer',
    description: 'Score above 80% in 10 quizzes',
    icon: '🎓',
    color: 'from-indigo-400 to-indigo-600',
    criteria: (stats) => stats.highScores >= 10
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a quiz in under 3 minutes',
    icon: '⚡',
    color: 'from-orange-400 to-orange-600',
    criteria: (stats) => stats.fastestTime && stats.fastestTime < 180
  },
  {
    id: 'story_explorer',
    name: 'Story Explorer',
    description: 'Complete quizzes from all story categories',
    icon: '📚',
    color: 'from-teal-400 to-teal-600',
    criteria: (stats) => stats.uniqueStories >= 4
  },
  {
    id: 'difficulty_master',
    name: 'Difficulty Master',
    description: 'Complete quizzes on all difficulty levels',
    icon: '🎯',
    color: 'from-cyan-400 to-cyan-600',
    criteria: (stats) => stats.completedDifficulties && stats.completedDifficulties.length >= 3
  },
  {
    id: 'consecutive_wins',
    name: 'Win Streak',
    description: 'Score above 70% in 5 consecutive quizzes',
    icon: '🔥',
    color: 'from-amber-400 to-amber-600',
    criteria: (stats) => stats.longestWinStreak >= 5
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Complete quizzes between midnight and 6 AM',
    icon: '🦉',
    color: 'from-violet-400 to-violet-600',
    criteria: (stats) => stats.nightQuizzes >= 5
  }
];

// Calculate badge stats from quiz history
export const calculateBadgeStats = (quizHistory) => {
  const stats = {
    totalQuizzes: quizHistory.length,
    perfectScores: 0,
    highScores: 0,
    fastestTime: null,
    uniqueStories: new Set(),
    completedDifficulties: new Set(),
    longestWinStreak: 0,
    nightQuizzes: 0
  };

  let currentStreak = 0;

  quizHistory.forEach((quiz) => {
    const percentage = (quiz.score / quiz.total_questions) * 100;
    
    // Perfect scores
    if (percentage === 100) stats.perfectScores++;
    
    // High scores
    if (percentage >= 80) stats.highScores++;
    
    // Fastest time
    if (quiz.time_taken && (!stats.fastestTime || quiz.time_taken < stats.fastestTime)) {
      stats.fastestTime = quiz.time_taken;
    }
    
    // Unique stories
    if (quiz.story) stats.uniqueStories.add(quiz.story);
    
    // Difficulties
    if (quiz.difficulty) stats.completedDifficulties.add(quiz.difficulty);
    
    // Win streak
    if (percentage >= 70) {
      currentStreak++;
      if (currentStreak > stats.longestWinStreak) {
        stats.longestWinStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
    
    // Night quizzes
    if (quiz.completed_at) {
      const hour = new Date(quiz.completed_at).getHours();
      if (hour >= 0 && hour < 6) stats.nightQuizzes++;
    }
  });

  stats.uniqueStories = stats.uniqueStories.size;
  stats.completedDifficulties = Array.from(stats.completedDifficulties);

  return stats;
};

// Get earned badges
export const getEarnedBadges = (quizHistory) => {
  const stats = calculateBadgeStats(quizHistory);
  return BADGES.filter(badge => badge.criteria(stats));
};

export default BADGES;
