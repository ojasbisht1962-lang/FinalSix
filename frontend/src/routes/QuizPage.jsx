import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import API_CONFIG from '../config/api';
import QuestionCard from '../components/QuestionCard';

const QuizPage = () => {
  const [classLevel, setClassLevel] = useState(null);
  const [stream, setStream] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const { user, saveQuizResult } = useAuth();
  const [quizStartTime] = useState(new Date());

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const params = { class_level: classLevel };
      if (classLevel === '10th-pass' && stream) {
        params.stream = stream;
      }
      
      const url = API_CONFIG.getUrlWithParams(API_CONFIG.ENDPOINTS.QUIZ_QUESTIONS, params);
      
      try {
        const response = await axios.get(url);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (classLevel && (classLevel === 'below-10' || stream)) {
      fetchQuestions();
    }
  }, [classLevel, stream]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!answers[currentQuestion.id]) {
      setError('Please select an option before proceeding.');
      return;
    }
    setError('');
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleSubmitQuiz = async () => {
    const lastQuestion = questions[currentQuestionIndex];
    if (!answers[lastQuestion.id]) {
      setError('Please select an option before submitting.');
      return;
    }

    try {
      // Generate user_id if not present
      let currentUserId = userId;
      if (!currentUserId) {
        currentUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('user_id', currentUserId);
      }

      const payload = {
        user_id: currentUserId,
        class_level: classLevel,
        stream: stream,
        answers: Object.entries(answers).map(([question_id, answer]) => ({ question_id, answer })),
      };
      
      console.log("Submitting quiz with payload:", payload);
      
      const response = await axios.post(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.SUBMIT_ANSWERS), payload);
      console.log("Submission response:", response.data);
      
      // For Google users, the quiz is automatically saved in the database via the submit endpoint
      // No need to save locally since we fetch from database
      
      // Navigate to suggestions page
      navigate(`/suggestions?user_id=${currentUserId}`);
    } catch (error) {
      console.error("Failed to submit answers:", error);
      console.error("Error details:", error.response?.data);
      setError("Failed to submit answers. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700">Loading your questions...</p>
      </div>
    );
  }

  if (!classLevel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-8 right-8 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-4000"></div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-lg p-12 rounded-2xl shadow-2xl text-center max-w-2xl w-full relative z-10 border border-white/20">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-xl mb-6 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Educational Background</h2>
            <p className="text-lg text-gray-600 mb-2">Help us understand your academic level</p>
            <p className="text-sm text-gray-500">This will help us provide personalized career guidance</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Are you Class 10th pass?</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-blue-600 text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 min-w-32" 
              onClick={() => setClassLevel('10th-pass')}
            >
              <span className="block">✓ Yes</span>
              <span className="text-sm font-normal opacity-90">I have completed Class 10th</span>
            </button>
            <button 
              className="bg-blue-500 text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-400/25 min-w-32" 
              onClick={() => setClassLevel('below-10')}
            >
              <span className="block">✗ No</span>
              <span className="text-sm font-normal opacity-90">I haven't completed Class 10th</span>
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Your information helps us customize your career exploration journey
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (classLevel === '10th-pass' && !stream) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-8 right-8 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-4000"></div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-lg p-12 rounded-2xl shadow-2xl text-center max-w-3xl w-full relative z-10 border border-white/20">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-xl mb-6 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Academic Stream Selection</h2>
            <p className="text-lg text-gray-600 mb-2">Choose your field of study</p>
            <p className="text-sm text-gray-500">This helps us provide relevant career paths and opportunities</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Please select your stream:</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center max-w-4xl mx-auto">
            <button 
              className="bg-blue-600 text-white font-bold text-lg py-6 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25" 
              onClick={() => setStream('science')}
            >
              <div className="text-3xl mb-2">🔬</div>
              <span className="block text-xl mb-2">Science</span>
              <span className="text-sm font-normal opacity-90">Physics, Chemistry, Biology, Math</span>
            </button>
            
            <button 
              className="bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-400/25" 
              onClick={() => setStream('commerce')}
            >
              <div className="text-3xl mb-2">💼</div>
              <span className="block text-xl mb-2">Commerce</span>
              <span className="text-sm font-normal opacity-90">Business, Economics, Accounting</span>
            </button>
            
            <button 
              className="bg-blue-700 text-white font-bold text-lg py-6 px-6 rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-600/25" 
              onClick={() => setStream('arts')}
            >
              <div className="text-3xl mb-2">🎨</div>
              <span className="block text-xl mb-2">Arts</span>
              <span className="text-sm font-normal opacity-90">Literature, History, Psychology</span>
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Your stream selection helps us recommend suitable career paths and educational opportunities
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-2xl mb-8 transform hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Career Suggestion Quiz</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Discover your perfect career path through our comprehensive assessment</p>
          
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-8 py-4 inline-block shadow-xl border border-white/30">
            <p className="text-xl font-bold text-white">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-8 max-w-lg mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-full h-4 overflow-hidden border border-white/30">
              <div 
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 h-full rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-lg text-white/90 mt-4 font-semibold">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-lg border border-red-400/50 text-red-100 px-6 py-4 rounded-2xl mb-8 text-center shadow-xl">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <>
            <QuestionCard
              question={questions[currentQuestionIndex]}
              selectedAnswer={answers[questions[currentQuestionIndex].id]}
              onAnswerChange={handleAnswerChange}
            />
            <div className="text-center mt-12">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg py-4 px-12 rounded-full shadow-2xl hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/25"
                >
                  <span className="flex items-center">
                    Next Question
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg py-4 px-12 rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/25"
                >
                  <span className="flex items-center">
                    Submit Quiz
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </>
        ) : (
          questions.length > 0 && (
            <div className="text-center mt-16">
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/20 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-xl mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Quiz Complete! 🎉</h2>
                <p className="text-xl text-gray-600 mb-6">Congratulations on completing your career assessment!</p>
                <p className="text-lg text-gray-500">Your personalized career recommendations are being prepared...</p>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Thank you for taking the time to explore your career possibilities with CareerCompass
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuizPage;
