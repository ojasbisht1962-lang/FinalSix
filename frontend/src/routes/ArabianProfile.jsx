import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserQuizHistory, getQuizStats } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ArabianProfile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    // Check if user is logged in with Google
    const storedUser = localStorage.getItem('user');
    let storedUserId, storedUsername;
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.type === 'google') {
          // Use Google OAuth user
          storedUserId = userData.id;
          storedUsername = userData.name;
        } else {
          // Guest user
          storedUserId = userData.id;
          storedUsername = userData.name || 'Guest';
        }
      } catch (e) {
        // Fallback
        storedUserId = localStorage.getItem('user_id') || 'guest_' + Date.now();
        storedUsername = 'Traveler';
      }
    } else {
      // No user logged in
      storedUserId = localStorage.getItem('user_id') || 'guest_' + Date.now();
      storedUsername = localStorage.getItem('arabian_username') || 'Traveler';
      localStorage.setItem('user_id', storedUserId);
    }

    setUserId(storedUserId);
    setUsername(storedUsername);
    setNewUsername(storedUsername);

    fetchUserData(storedUserId);
  }, []);

  const fetchUserData = async (uid) => {
    try {
      setLoading(true);
      const [historyResponse, statsResponse] = await Promise.all([
        getUserQuizHistory(uid, 50),
        getQuizStats()
      ]);

      if (historyResponse.success) {
        setHistory(historyResponse.history);
      }

      if (statsResponse.success) {
        setStats(statsResponse);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUsername = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      
      // Check if Google user
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData.type !== 'google') {
            // Only allow editing for non-Google users
            localStorage.setItem('arabian_username', newUsername.trim());
          } else {
            alert('Google users cannot edit their name. It is synced with your Google account.');
            setNewUsername(username);
            setEditMode(false);
            return;
          }
        } catch (e) {
          localStorage.setItem('arabian_username', newUsername.trim());
        }
      } else {
        localStorage.setItem('arabian_username', newUsername.trim());
      }
      
      setEditMode(false);
    }
  };

  const calculateUserStats = () => {
    if (history.length === 0) return null;

    const totalQuizzes = history.length;
    const totalScore = history.reduce((sum, quiz) => sum + quiz.score, 0);
    const totalQuestions = history.reduce((sum, quiz) => sum + quiz.total_questions, 0);
    const avgScore = totalQuestions > 0 ? ((totalScore / totalQuestions) * 100).toFixed(1) : 0;
    const bestScore = Math.max(...history.map(q => q.percentage));
    const totalTime = history.reduce((sum, quiz) => sum + (quiz.time_taken || 0), 0);

    // Count by difficulty
    const difficultyBreakdown = {
      easy: history.filter(q => q.difficulty === 'easy').length,
      medium: history.filter(q => q.difficulty === 'medium').length,
      hard: history.filter(q => q.difficulty === 'hard').length,
    };

    // Count by story
    const storyBreakdown = {};
    history.forEach(quiz => {
      storyBreakdown[quiz.story] = (storyBreakdown[quiz.story] || 0) + 1;
    });

    return {
      totalQuizzes,
      totalScore,
      totalQuestions,
      avgScore,
      bestScore,
      totalTime,
      difficultyBreakdown,
      storyBreakdown
    };
  };

  const userStats = calculateUserStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🪔</div>
          <p className="text-2xl text-yellow-300 animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => navigate('/')}
          className="text-white hover:text-yellow-300 flex items-center gap-2 mb-6 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {isGoogleUser && user?.picture ? (
                <img src={user.picture} alt="Profile" className="w-20 h-20 rounded-full border-4 border-yellow-400" />
              ) : (
                <div className="text-7xl">👤</div>
              )}
              <div>
                {editMode ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="bg-white/10 text-white text-3xl font-bold px-4 py-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter username"
                    />
                    <button
                      onClick={handleSaveUsername}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      ✓ Save
                    </button>
                    <button
                      onClick={() => {
                        setNewUsername(username);
                        setEditMode(false);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      ✗ Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-bold text-yellow-300 mb-2">
                      {username}
                    </h1>
                    {isGoogleUser ? (
                      <p className="text-gray-400 text-sm">✓ Google Account</p>
                    ) : (
                      <button
                        onClick={() => setEditMode(true)}
                        className="text-gray-300 hover:text-white text-sm underline"
                      >
                        ✏️ Edit name
                      </button>
                    )}
                  </div>
                )}
                <p className="text-gray-300 mt-2">User ID: {userId.substring(0, 20)}...</p>
              </div>
            </div>
            <div className="text-6xl animate-pulse">🪔</div>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      {userStats && (
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6">📊 Your Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-center shadow-lg">
              <div className="text-5xl font-bold text-white mb-2">{userStats.totalQuizzes}</div>
              <div className="text-blue-100">Quizzes Taken</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 text-center shadow-lg">
              <div className="text-5xl font-bold text-white mb-2">{userStats.avgScore}%</div>
              <div className="text-green-100">Average Score</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl p-6 text-center shadow-lg">
              <div className="text-5xl font-bold text-white mb-2">{userStats.bestScore.toFixed(1)}%</div>
              <div className="text-yellow-100">Best Score</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-center shadow-lg">
              <div className="text-5xl font-bold text-white mb-2">
                {Math.floor(userStats.totalTime / 60)}m
              </div>
              <div className="text-purple-100">Total Time</div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">⭐ By Difficulty</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-400">🟢 Easy</span>
                  <span className="text-white font-bold">{userStats.difficultyBreakdown.easy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-400">🟡 Medium</span>
                  <span className="text-white font-bold">{userStats.difficultyBreakdown.medium}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-400">🔴 Hard</span>
                  <span className="text-white font-bold">{userStats.difficultyBreakdown.hard}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">📚 By Story</h3>
              <div className="space-y-3">
                {Object.entries(userStats.storyBreakdown).map(([story, count]) => (
                  <div key={story} className="flex justify-between items-center">
                    <span className="text-white">{story}</span>
                    <span className="text-yellow-300 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz History */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6">📜 Quiz History</h2>
        {history.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-purple-400/30 text-center">
            <div className="text-6xl mb-4">🏜️</div>
            <p className="text-2xl text-white mb-2">No quizzes taken yet</p>
            <p className="text-gray-300 mb-6">Start your Arabian Nights adventure!</p>
            <button
              onClick={() => navigate('/arabian-quiz')}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Take Your First Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((quiz, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-400/30 hover:border-yellow-400/50 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-purple-600/50 text-yellow-300 px-3 py-1 rounded-full text-sm font-bold">
                        📚 {quiz.story}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        quiz.difficulty === 'easy' ? 'bg-green-600/50 text-white' :
                        quiz.difficulty === 'medium' ? 'bg-amber-600/50 text-white' :
                        'bg-red-600/50 text-white'
                      }`}>
                        ⭐ {quiz.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      {new Date(quiz.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-yellow-300">
                      {quiz.score}/{quiz.total_questions}
                    </div>
                    <div className="text-lg text-white">
                      {quiz.percentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-400">
                      ⏱️ {Math.floor(quiz.time_taken / 60)}:{(quiz.time_taken % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="max-w-6xl mx-auto mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate('/arabian-quiz')}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
        >
          🪔 Take Quiz
        </button>
        <button
          onClick={() => navigate('/arabian-quiz/leaderboard')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
        >
          🏆 Leaderboard
        </button>
      </div>
    </div>
  );
};

export default ArabianProfile;
