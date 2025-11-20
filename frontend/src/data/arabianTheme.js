// Arabian Nights Theme Configuration
export const arabianTheme = {
  colors: {
    primary: '#8B5CF6', // Purple
    secondary: '#D97706', // Gold/Amber
    accent: '#EC4899', // Pink
    background: {
      primary: 'from-purple-900 via-indigo-900 to-blue-900',
      secondary: 'from-amber-900 via-orange-900 to-red-900',
      desert: 'from-yellow-800 via-orange-800 to-amber-900',
      night: 'from-indigo-950 via-purple-950 to-slate-950',
    },
    text: {
      primary: '#F3F4F6',
      secondary: '#D1D5DB',
      gold: '#FCD34D',
      purple: '#C084FC',
    },
    card: {
      bg: 'rgba(139, 92, 246, 0.1)',
      border: 'rgba(139, 92, 246, 0.3)',
      hover: 'rgba(139, 92, 246, 0.2)',
    }
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    secondary: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    night: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4C1D95 100%)',
    desert: 'linear-gradient(135deg, #92400E 0%, #B45309 50%, #D97706 100%)',
    magical: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
  },
  
  fonts: {
    heading: "'Cinzel', serif",
    body: "'Poppins', sans-serif",
    decorative: "'Scheherazade New', serif",
  },
  
  stories: [
    {
      id: 'all',
      name: 'All Stories',
      icon: '📚',
      color: '#8B5CF6',
      description: 'Mix of all Arabian Nights tales'
    },
    {
      id: 'Aladdin',
      name: 'Aladdin',
      icon: '🪔',
      color: '#D97706',
      description: 'The tale of the magic lamp and the genie'
    },
    {
      id: 'Ali Baba',
      name: 'Ali Baba',
      icon: '💎',
      color: '#EC4899',
      description: 'The story of forty thieves and hidden treasure'
    },
    {
      id: 'Sinbad',
      name: 'Sinbad',
      icon: '⛵',
      color: '#06B6D4',
      description: 'Seven legendary voyages of Sinbad the Sailor'
    },
    {
      id: 'Scheherazade',
      name: 'Scheherazade',
      icon: '👸',
      color: '#A855F7',
      description: 'The storyteller of One Thousand and One Nights'
    }
  ],
  
  difficulties: [
    {
      id: 'all',
      name: 'All Levels',
      icon: '🌟',
      color: '#8B5CF6',
      description: 'Mixed difficulty questions'
    },
    {
      id: 'easy',
      name: 'Easy',
      icon: '⭐',
      color: '#10B981',
      description: 'Perfect for beginners'
    },
    {
      id: 'medium',
      name: 'Medium',
      icon: '⭐⭐',
      color: '#F59E0B',
      description: 'For intermediate knowledge'
    },
    {
      id: 'hard',
      name: 'Hard',
      icon: '⭐⭐⭐',
      color: '#EF4444',
      description: 'Challenge for experts'
    }
  ],
  
  badges: [
    {
      id: 'story-master',
      name: 'Story Master',
      icon: '👑',
      description: 'Achieved 100% score',
      color: '#FCD34D'
    },
    {
      id: 'speed-genie',
      name: 'Speed Genie',
      icon: '⚡',
      description: 'Answered under 5 seconds per question',
      color: '#60A5FA'
    },
    {
      id: 'explorer',
      name: 'Explorer',
      icon: '🧭',
      description: 'Completed all difficulty levels',
      color: '#34D399'
    },
    {
      id: 'persistent-scholar',
      name: 'Persistent Scholar',
      icon: '📖',
      description: 'Completed 10+ quizzes',
      color: '#A78BFA'
    },
    {
      id: 'high-achiever',
      name: 'High Achiever',
      icon: '🏆',
      description: 'Scored 90% or higher',
      color: '#F472B6'
    }
  ],
  
  icons: {
    lamp: '🪔',
    genie: '🧞‍♂️',
    magic: '✨',
    carpet: '🧣',
    treasure: '💰',
    moon: '🌙',
    star: '⭐',
    crown: '👑',
    book: '📚',
    compass: '🧭',
  },
  
  animations: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
  }
};

export default arabianTheme;
