import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getGlobalLeaderboard, getWeeklyLeaderboard } from '../services/api';
import arabianTheme from '../data/arabianTheme';
import Podium from '../components/Podium';

const ArabianLeaderboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leaderboardType, setLeaderboardType] = useState('global'); // global or weekly
  const [difficulty, setDifficulty] = useState('all');
  const [story, setStory] = useState('all');
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserPosition, setCurrentUserPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [leaderboardType, difficulty, story]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = leaderboardType === 'global'
        ? await getGlobalLeaderboard(difficulty, story, 100)
        : await getWeeklyLeaderboard(difficulty, story, 100);

      if (response.success) {
        setLeaderboard(response.leaderboard);
        
        // Find current user's position if logged in
        if (user && user.type === 'google') {
          const googleId = user.google_id || user.id;
          const userEntry = response.leaderboard.find(entry => entry.google_id === googleId);
          setCurrentUserPosition(userEntry);
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-amber-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-amber-600';
    return 'from-purple-500 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-4">
          🏆 Leaderboard 🏆
        </h1>
        <p className="text-xl text-gray-200">
          Top performers in the Arabian Nights Quiz
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2">
                📊 Leaderboard Type
              </label>
              <select
                value={leaderboardType}
                onChange={(e) => setLeaderboardType(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="global" className="bg-gray-900">🌍 All Time</option>
                <option value="weekly" className="bg-gray-900">📅 This Week</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2">
                ⭐ Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {arabianTheme.difficulties.map((diff) => (
                  <option key={diff.id} value={diff.id} className="bg-gray-900">
                    {diff.icon} {diff.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Story Filter */}
            <div>
              <label className="block text-yellow-300 font-bold mb-2">
                📚 Story
              </label>
              <select
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {arabianTheme.stories.map((s) => (
                  <option key={s.id} value={s.id} className="bg-gray-900">
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-spin">🪔</div>
            <p className="text-2xl text-yellow-300 animate-pulse">Loading leaderboard...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-purple-400/30 text-center">
            <div className="text-6xl mb-4">🏜️</div>
            <p className="text-2xl text-white mb-2">No entries yet</p>
            <p className="text-gray-300">Be the first to complete the quiz!</p>
            <button
              onClick={() => navigate('/arabian-quiz')}
              className="mt-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Take Quiz Now
            </button>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {leaderboard.length >= 1 && (
              <div className="mb-16">
                <Podium topPlayers={leaderboard.slice(0, 3)} />
              </div>
            )}

            {/* Current User Position (if not in top 3) */}
            {currentUserPosition && currentUserPosition.rank > 3 && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-600/40 to-purple-600/40 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-400/50 shadow-2xl">
                  <div className="text-center mb-3">
                    <h3 className="text-xl font-bold text-yellow-300">Your Position</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* Rank & User Info */}
                    <div className="flex items-center gap-6">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        #{currentUserPosition.rank}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {currentUserPosition.username || 'You'}
                        </h3>
                        <div className="flex gap-3 text-sm text-gray-300">
                          <span className="bg-purple-600/30 px-3 py-1 rounded-full">
                            📚 {currentUserPosition.story}
                          </span>
                          <span className={`px-3 py-1 rounded-full ${
                            currentUserPosition.difficulty === 'easy' ? 'bg-green-600/30' :
                            currentUserPosition.difficulty === 'medium' ? 'bg-amber-600/30' :
                            'bg-red-600/30'
                          }`}>
                            ⭐ {currentUserPosition.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Score Info */}
                    <div className="text-right">
                      <div className="text-3xl font-bold text-yellow-300 mb-1">
                        {currentUserPosition.score}/{currentUserPosition.total_questions}
                      </div>
                      <div className="text-sm text-gray-300">
                        {Math.round((currentUserPosition.score / currentUserPosition.total_questions) * 100)}%
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        ⏱️ {Math.floor(currentUserPosition.time_taken / 60)}:{(currentUserPosition.time_taken % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rest of Leaderboard (starting from rank 4) */}
            {leaderboard.length > 3 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white text-center mb-6">Other Top Performers</h3>
                {leaderboard.slice(3).map((entry, index) => (
                  <div
                    key={index}
                    className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border ${
                      currentUserPosition && entry.rank === currentUserPosition.rank
                        ? 'border-blue-400/50 shadow-lg shadow-blue-500/30'
                        : 'border-purple-400/30'
                    } transform transition-all duration-300 hover:scale-105 shadow-lg`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Rank & User Info */}
                      <div className="flex items-center gap-6">
                        <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                          #{entry.rank}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {entry.username || 'Anonymous'}
                          </h3>
                          <div className="flex gap-3 text-sm text-gray-300">
                            <span className="bg-purple-600/30 px-3 py-1 rounded-full">
                              📚 {entry.story}
                            </span>
                            <span className={`px-3 py-1 rounded-full ${
                              entry.difficulty === 'easy' ? 'bg-green-600/30' :
                              entry.difficulty === 'medium' ? 'bg-amber-600/30' :
                              'bg-red-600/30'
                            }`}>
                              ⭐ {entry.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Score Info */}
                      <div className="text-right">
                        <div className="text-3xl font-bold text-yellow-300 mb-1">
                          {entry.score}/{entry.total_questions}
                        </div>
                        <div className="text-sm text-gray-300">
                          {Math.round((entry.score / entry.total_questions) * 100)}%
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          ⏱️ {Math.floor(entry.time_taken / 60)}:{(entry.time_taken % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="max-w-6xl mx-auto mt-12 flex justify-center gap-4">
        <button
          onClick={() => navigate('/arabian-quiz')}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-full text-xl font-bold shadow-lg shadow-amber-500/50 hover:shadow-amber-400/70 transform hover:scale-110 transition-all duration-300"
        >
          🪔 Take Quiz
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-white/10 text-white px-8 py-4 rounded-full text-xl font-bold border border-white/30 hover:bg-white/20 transition-all duration-300"
        >
          🏠 Home
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-10 left-10 text-6xl animate-bounce opacity-20">
        👑
      </div>
      <div className="fixed bottom-10 right-10 text-6xl animate-pulse opacity-20">
        🏆
      </div>
    </div>
  );
};

export default ArabianLeaderboard;
