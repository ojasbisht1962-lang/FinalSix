import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      let url = `http://localhost:8000/quiz/questions?class_level=${classLevel}`;
      if (classLevel === '10th-pass' && stream) {
        url += `&stream=${stream}`;
      }
      
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
      
      const response = await axios.post('http://localhost:8000/answers/submit', payload);
      console.log("Submission response:", response.data);
      
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Are you Class 10th pass?</h2>
          <div className="space-x-4">
            <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700" onClick={() => setClassLevel('10th-pass')}>Yes</button>
            <button className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700" onClick={() => setClassLevel('below-10')}>No</button>
          </div>
        </div>
      </div>
    );
  }

  if (classLevel === '10th-pass' && !stream) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Please select your stream:</h2>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => setStream('science')}>Science</button>
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => setStream('commerce')}>Commerce</button>
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => setStream('arts')}>Arts</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Suggestion Quiz</h1>
          <div className="bg-white rounded-full px-6 py-2 inline-block shadow-md">
            <p className="text-lg font-semibold text-blue-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}
        
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <>
            <QuestionCard
              question={questions[currentQuestionIndex]}
              selectedAnswer={answers[questions[currentQuestionIndex].id]}
              onAnswerChange={handleAnswerChange}
            />
            <div className="text-center mt-8">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Submit Quiz ✓
                </button>
              )}
            </div>
          </>
        ) : (
          questions.length > 0 && (
            <div className="text-center mt-12 bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Complete! 🎉</h2>
              <p className="text-lg text-gray-600">Thank you for completing the career assessment.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuizPage;
