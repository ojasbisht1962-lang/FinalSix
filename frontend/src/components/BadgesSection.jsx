import React from 'react';
import { BADGES, getEarnedBadges } from '../data/badgesData';
import { Lock } from 'lucide-react';

const BadgesSection = ({ quizHistory }) => {
  const earnedBadges = getEarnedBadges(quizHistory);
  const earnedBadgeIds = earnedBadges.map(b => b.id);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-3xl">🏅</span>
        Badges & Achievements
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {BADGES.map((badge) => {
          const isEarned = earnedBadgeIds.includes(badge.id);
          
          return (
            <div
              key={badge.id}
              className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
                isEarned
                  ? `bg-gradient-to-br ${badge.color} border-white/30 shadow-lg hover:scale-105 cursor-pointer`
                  : 'bg-white/5 border-white/10 opacity-50 hover:opacity-70'
              }`}
              title={badge.description}
            >
              {/* Lock icon for locked badges */}
              {!isEarned && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-white/50" />
                </div>
              )}
              
              {/* Badge Icon */}
              <div className="text-center mb-2">
                <span className={`text-4xl ${isEarned ? 'animate-bounce' : 'grayscale'}`}>
                  {badge.icon}
                </span>
              </div>
              
              {/* Badge Name */}
              <h3 className={`text-sm font-bold text-center mb-1 ${
                isEarned ? 'text-white' : 'text-gray-400'
              }`}>
                {badge.name}
              </h3>
              
              {/* Badge Description */}
              <p className={`text-xs text-center ${
                isEarned ? 'text-white/80' : 'text-gray-500'
              }`}>
                {badge.description}
              </p>
              
              {/* Earned indicator */}
              {isEarned && (
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Progress Summary */}
      <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">Badges Earned:</span>
          <span className="text-xl font-bold text-yellow-400">
            {earnedBadges.length} / {BADGES.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-white/10 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(earnedBadges.length / BADGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BadgesSection;
