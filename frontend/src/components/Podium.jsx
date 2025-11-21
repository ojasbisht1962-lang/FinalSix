// components/Podium.jsx
import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

const Podium = ({ topPlayers }) => {
  // Ensure we have exactly 3 players (fill with nulls if needed)
  const [first, second, third] = topPlayers;

  const getPodiumHeight = (position) => {
    if (position === 1) return 'h-64';
    if (position === 2) return 'h-48';
    if (position === 3) return 'h-40';
    return 'h-32';
  };

  const getMedalColor = (position) => {
    if (position === 1) return 'from-yellow-400 to-amber-500';
    if (position === 2) return 'from-gray-300 to-gray-400';
    if (position === 3) return 'from-orange-400 to-amber-600';
    return 'from-purple-500 to-pink-500';
  };

  const getMedalIcon = (position) => {
    if (position === 1) return <Trophy className="w-16 h-16" />;
    if (position === 2) return <Award className="w-14 h-14" />;
    if (position === 3) return <Medal className="w-12 h-12" />;
    return null;
  };

  const renderPlayer = (player, position) => {
    if (!player) {
      return (
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center opacity-50">
            <div className="w-24 h-24 rounded-full bg-gray-600/30 flex items-center justify-center mb-4">
              <span className="text-4xl">?</span>
            </div>
            <div className="text-gray-500 font-semibold">No Entry</div>
          </div>
          <div className={`${getPodiumHeight(position)} w-48 bg-gray-700/30 rounded-t-2xl border-t-4 border-gray-500 flex items-center justify-center`}>
            <div className="text-6xl font-bold text-gray-600">#{position}</div>
          </div>
        </div>
      );
    }

    const percentage = Math.round((player.score / player.total_questions) * 100);

    return (
      <div className="flex flex-col items-center">
        {/* Player Card */}
        <div className={`mb-4 text-center transform ${position === 1 ? '-translate-y-4' : ''}`}>
          {/* Medal Icon */}
          <div className={`mb-3 bg-gradient-to-br ${getMedalColor(position)} text-white p-4 rounded-full inline-block shadow-2xl animate-pulse`}>
            {getMedalIcon(position)}
          </div>
          
          {/* Profile Picture or Avatar */}
          <div className="relative mb-3">
            {player.picture ? (
              <img
                src={player.picture}
                alt={player.username}
                className={`${position === 1 ? 'w-28 h-28' : position === 2 ? 'w-24 h-24' : 'w-20 h-20'} rounded-full border-4 ${
                  position === 1 ? 'border-yellow-400' : position === 2 ? 'border-gray-300' : 'border-orange-400'
                } shadow-xl`}
              />
            ) : (
              <div className={`${position === 1 ? 'w-28 h-28' : position === 2 ? 'w-24 h-24' : 'w-20 h-20'} rounded-full bg-gradient-to-br ${getMedalColor(position)} flex items-center justify-center text-white font-bold ${
                position === 1 ? 'text-4xl' : position === 2 ? 'text-3xl' : 'text-2xl'
              } shadow-xl`}>
                {player.username ? player.username.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            {/* Crown for first place */}
            {position === 1 && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce">
                👑
              </div>
            )}
          </div>
          
          {/* Username */}
          <div className={`font-bold text-white mb-2 ${position === 1 ? 'text-2xl' : position === 2 ? 'text-xl' : 'text-lg'}`}>
            {player.username || 'Anonymous'}
          </div>
          
          {/* Score */}
          <div className={`font-bold bg-gradient-to-r ${getMedalColor(position)} bg-clip-text text-transparent mb-1 ${
            position === 1 ? 'text-3xl' : position === 2 ? 'text-2xl' : 'text-xl'
          }`}>
            {player.score}/{player.total_questions}
          </div>
          
          {/* Percentage */}
          <div className="text-sm text-gray-300">
            {percentage}% • ⏱️ {Math.floor(player.time_taken / 60)}:{(player.time_taken % 60).toString().padStart(2, '0')}
          </div>
          
          {/* Tags */}
          <div className="flex gap-2 mt-2 justify-center flex-wrap">
            <span className="bg-purple-600/40 px-2 py-1 rounded-full text-xs text-white">
              {player.story}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${
              player.difficulty === 'easy' ? 'bg-green-600/40' :
              player.difficulty === 'medium' ? 'bg-amber-600/40' :
              'bg-red-600/40'
            }`}>
              {player.difficulty}
            </span>
          </div>
        </div>
        
        {/* Podium Stand */}
        <div className={`${getPodiumHeight(position)} w-48 bg-gradient-to-b ${getMedalColor(position)} rounded-t-2xl border-t-4 ${
          position === 1 ? 'border-yellow-300 shadow-2xl shadow-yellow-500/50' :
          position === 2 ? 'border-gray-200 shadow-xl shadow-gray-400/30' :
          'border-orange-300 shadow-xl shadow-orange-400/30'
        } flex items-center justify-center relative overflow-hidden`}>
          {/* Rank Number */}
          <div className="text-7xl font-bold text-white/20">#{position}</div>
          
          {/* Sparkle Effect */}
          {position === 1 && (
            <>
              <div className="absolute top-4 left-4 text-2xl animate-ping">✨</div>
              <div className="absolute top-8 right-6 text-xl animate-ping animation-delay-200">✨</div>
              <div className="absolute bottom-10 left-8 text-xl animate-ping animation-delay-400">✨</div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Podium Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2">
          🏆 Top Champions 🏆
        </h2>
        <p className="text-gray-300 text-lg">The elite performers of Arabian Nights Quiz</p>
      </div>

      {/* Podium Layout: 2nd, 1st, 3rd */}
      <div className="flex items-end justify-center gap-8 mb-8">
        {/* 2nd Place */}
        <div className="transform translate-y-8">
          {renderPlayer(second, 2)}
        </div>
        
        {/* 1st Place (Higher) */}
        <div className="transform -translate-y-4 scale-110">
          {renderPlayer(first, 1)}
        </div>
        
        {/* 3rd Place */}
        <div className="transform translate-y-12">
          {renderPlayer(third, 3)}
        </div>
      </div>

      {/* Confetti/Stars Background for First Place */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-400 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 0.2}s`,
              fontSize: `${Math.random() * 20 + 15}px`
            }}
          >
            ⭐
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podium;
