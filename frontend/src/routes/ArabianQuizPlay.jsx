import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getArabianQuestions, submitArabianQuiz } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ArabianQuizPlay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { difficulty = 'all', story = 'all' } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getArabianQuestions(difficulty, story, 20);
        if (response.success && response.questions.length > 0) {
          setQuestions(response.questions);
          setQuizStartTime(Date.now());
          setQuestionStartTime(Date.now());
        } else {
          alert('No questions found for the selected criteria');
          navigate('/arabian-quiz');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please try again.');
        navigate('/arabian-quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty, story, navigate]);

  // Timer countdown
  useEffect(() => {
    if (loading || showFeedback) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, loading, showFeedback]);

  const handleTimeUp = () => {
    // Auto-select no answer and move to next
    handleAnswerSubmit(null);
  };

  const handleAnswerClick = async (index) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedAnswer(index);
    
    // Show immediate feedback
    setShowFeedback(true);
    
    // Fetch the correct answer from backend for validation
    // For now, we'll show feedback without validation until next question
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    
    // Save answer
    const newAnswer = {
      question_id: questions[currentQuestion].id,
      selected_index: index,
      time_taken: timeTaken
    };

    setAnswers([...answers, newAnswer]);

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setCorrectAnswer(null);
        setTimeLeft(15);
        setQuestionStartTime(Date.now());
      } else {
        // Quiz complete - submit
        submitQuizResults([...answers, newAnswer]);
      }
    }, 2000); // Show feedback for 2 seconds
  };

  const handleAnswerSubmit = (answerIndex) => {
    if (answerIndex === null) {
      // Time up - no answer selected
      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
      const newAnswer = {
        question_id: questions[currentQuestion].id,
        selected_index: -1,
        time_taken: timeTaken
      };
      setAnswers([...answers, newAnswer]);
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
          setTimeLeft(15);
          setQuestionStartTime(Date.now());
        } else {
          submitQuizResults([...answers, newAnswer]);
        }
      }, 500);
    }
  };

  const submitQuizResults = async (allAnswers) => {
    try {
      const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);
      
      // Check if user is logged in with Google
      const storedUser = localStorage.getItem('user');
      let userId, username;
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData.type === 'google') {
            // Use Google OAuth user ID and name
            userId = userData.id;
            username = userData.name;
          } else {
            // Guest user
            userId = userData.id;
            username = userData.name;
          }
        } catch (e) {
          // Fallback if parsing fails
          userId = localStorage.getItem('user_id') || 'guest_' + Date.now();
          username = 'Traveler';
        }
      } else {
        // No user logged in - create guest
        userId = localStorage.getItem('user_id') || 'guest_' + Date.now();
        username = localStorage.getItem('arabian_username') || 'Traveler';
        localStorage.setItem('user_id', userId);
      }

      const payload = {
        user_id: userId,
        username: username,
        difficulty: difficulty,
        story: story,
        answers: allAnswers,
        total_time: totalTime
      };

      const response = await submitArabianQuiz(payload);
      
      // Navigate to results page
      navigate('/arabian-quiz/results', {
        state: {
          score: response.score,
          totalQuestions: response.total_questions,
          percentage: response.percentage,
          answers: response.answers,
          timeTaken: response.time_taken
        }
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer');
      return;
    }
    handleAnswerSubmit(selectedAnswer);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🪔</div>
          <p className="text-2xl text-yellow-300 animate-pulse">Loading magical questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-white">No questions available</p>
          <button
            onClick={() => navigate('/arabian-quiz')}
            className="mt-4 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-yellow-300">
            🪔 Arabian Nights Quiz
          </h1>
          <div className="text-white text-xl">
            Question {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Timer */}
        <div className="flex justify-center mb-6">
          <div className={`text-5xl font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-yellow-300'}`}>
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl mb-8">
          {/* Story Badge */}
          <div className="flex justify-between items-start mb-6">
            <span className="bg-purple-600/50 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold">
              📚 {question.story}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
              question.difficulty === 'easy' ? 'bg-green-600/50 text-white' :
              question.difficulty === 'medium' ? 'bg-amber-600/50 text-white' :
              'bg-red-600/50 text-white'
            }`}>
              ⭐ {question.difficulty.toUpperCase()}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={showFeedback}
                className={`w-full p-5 rounded-xl text-left transition-all duration-300 ${
                  showFeedback && selectedAnswer === index
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105 ring-4 ring-blue-300'
                    : selectedAnswer === index
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 shadow-lg shadow-yellow-500/50 transform scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:scale-105'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-4">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-lg">{option}</span>
                  </div>
                  {showFeedback && selectedAnswer === index && (
                    <span className="text-3xl animate-pulse">📝</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Immediate Feedback Message */}
          {showFeedback && (
            <div className="mt-6 bg-blue-600/30 border-2 border-blue-400 rounded-xl p-4 animate-pulse">
              <p className="text-white text-center text-lg font-bold">
                ✓ Answer recorded! Moving to next question...
              </p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="text-center">
          {!showFeedback && (
            <p className="text-gray-300 text-lg">
              ⚡ Click an option to automatically continue
            </p>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 text-4xl animate-bounce opacity-20">
        ✨
      </div>
      <div className="fixed bottom-20 left-10 text-4xl animate-pulse opacity-20">
        🌙
      </div>
    </div>
  );
};

export default ArabianQuizPlay;
