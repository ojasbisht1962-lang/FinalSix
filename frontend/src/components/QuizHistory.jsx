// src/components/QuizHistory.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import API_CONFIG from '../config/api';
import { Calendar, Clock, BookOpen, ChevronDown, ChevronRight, Award, TrendingUp, RefreshCw } from 'lucide-react';

const QuizHistory = () => {
  const { user } = useAuth();
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedQuiz, setExpandedQuiz] = useState(null);

  useEffect(() => {
    if (user && user.type === 'google') {
      fetchQuizHistory();
    }
  }, [user]);
  
  if (!user || user.type !== 'google') {
    return null;
  }

  const fetchQuizHistory = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch quiz history from user_answers collection using the user's Google ID
      const response = await fetch(API_CONFIG.getFullUrl(`${API_CONFIG.ENDPOINTS.QUIZ_HISTORY}/${user.id}`));
      
      if (!response.ok) {
        throw new Error('Failed to fetch quiz history');
      }
      
      const data = await response.json();
      setQuizHistory(data.quizzes || []);
    } catch (error) {
      console.error('Error fetching quiz history:', error);
      setError('Failed to load quiz history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
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

  const getScoreColor = (answeredCount, totalCount) => {
    const percentage = (answeredCount / totalCount) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getQuizTitle = (quiz) => {
    let title = 'Career Assessment Quiz';
    if (quiz.class_level) {
      title = `${quiz.class_level} Assessment`;
    }
    if (quiz.stream) {
      title += ` - ${quiz.stream}`;
    }
    return title;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Quiz History...</h3>
        <p className="text-gray-600">Fetching your quiz results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading History</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={fetchQuizHistory}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (quizHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quiz History Yet</h3>
        <p className="text-gray-600 mb-4">Take your first career assessment quiz to see your history here.</p>
        <button 
          onClick={() => window.location.href = '/quiz'}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Take Your First Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Quiz History
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {quizHistory.length} quiz{quizHistory.length !== 1 ? 'es' : ''} completed
          </div>
          <button 
            onClick={fetchQuizHistory}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {quizHistory.map((quiz) => (
          <div key={quiz._id || quiz.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Quiz Card Header */}
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(quiz._id || quiz.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getQuizTitle(quiz)}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(quiz.created_at || quiz.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.answers?.length || 0} questions answered</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {quiz.answers && (
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(quiz.answers.length, quiz.total_questions || quiz.answers.length)}`}>
                      {quiz.answers.length}/{quiz.total_questions || quiz.answers.length} Completed
                    </div>
                  )}
                  <div className="text-gray-400">
                    {expandedQuiz === (quiz._id || quiz.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Quiz Details */}
            {expandedQuiz === (quiz._id || quiz.id) && (
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <div className="space-y-4">
                  {/* Quiz Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Quiz Details
                    </h4>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Class Level:</span>
                          <span className="font-medium">{quiz.class_level || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stream:</span>
                          <span className="font-medium">{quiz.stream || 'Not applicable'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Questions Answered:</span>
                          <span className="font-medium">{quiz.answers?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completion Date:</span>
                          <span className="font-medium">{formatDate(quiz.created_at || quiz.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quiz Answers */}
                  {quiz.answers && quiz.answers.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Your Responses</h4>
                      <div className="bg-white rounded-lg p-4 border max-h-60 overflow-y-auto">
                        <div className="space-y-2">
                          {quiz.answers.map((answer, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <span className="text-gray-600 text-sm">Question {index + 1}:</span>
                              <span className="font-medium text-sm">{answer.answer}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-2">
                    <button 
                      onClick={() => window.location.href = '/suggestions?user_id=' + user.id}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                    >
                      View Career Suggestions →
                    </button>
                    <button 
                      onClick={() => window.location.href = '/quiz'}
                      className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline"
                    >
                      Take Another Quiz →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizHistory;