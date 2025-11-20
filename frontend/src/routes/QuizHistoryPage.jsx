// src/routes/QuizHistoryPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getQuizHistory } from '../services/api';
import { Trophy, Calendar, Clock, Target } from 'lucide-react';

const QuizHistoryPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchHistory();
  }, [user, isAuthenticated]);

  const fetchHistory = async () => {
    try {
      const response = await getQuizHistory(user.google_id);
      if (response.success) {
        setHistory(response.history || []);
      } else {
        setError('Failed to load quiz history');
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      setError('An error occurred while loading your quiz history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading quiz history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Quiz History</h1>
          <p className="text-gray-300">Track your progress and review past quiz attempts</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 border border-white/20 text-center">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Quiz History Yet</h2>
            <p className="text-gray-300 mb-6">Start taking quizzes to see your progress here!</p>
            <button
              onClick={() => navigate('/arabian-quiz')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Take Your First Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((quiz, index) => {
              const percentage = ((quiz.score / quiz.total_questions) * 100).toFixed(1);
              
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Quiz Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {quiz.quiz_type || 'Arabian Nights Quiz'}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(quiz.completed_at || quiz.timestamp)}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {quiz.time_taken ? `${Math.floor(quiz.time_taken / 60)}m ${quiz.time_taken % 60}s` : 'N/A'}
                        </div>
                        
                        {quiz.difficulty && (
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            <span className="capitalize">{quiz.difficulty}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                          {quiz.score}/{quiz.total_questions}
                        </div>
                        <div className="text-sm text-gray-400">Score</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                          {percentage}%
                        </div>
                        <div className="text-sm text-gray-400">Accuracy</div>
                      </div>
                    </div>
                  </div>

                  {/* Story Info */}
                  {quiz.story && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <span className="text-sm text-gray-400">Story: </span>
                      <span className="text-sm text-white capitalize">{quiz.story.replace(/_/g, ' ')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Summary */}
        {history.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-blue-400">{history.length}</div>
              <div className="text-gray-300">Total Quizzes</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-green-400">
                {(history.reduce((sum, q) => sum + ((q.score / q.total_questions) * 100), 0) / history.length).toFixed(1)}%
              </div>
              <div className="text-gray-300">Average Score</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-purple-400">
                {Math.max(...history.map(q => Math.round((q.score / q.total_questions) * 100)))}%
              </div>
              <div className="text-gray-300">Best Score</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHistoryPage;
