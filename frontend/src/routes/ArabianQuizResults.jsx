import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ArabianQuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, percentage, answers, timeTaken } = location.state || {};

  // Redirect if no data
  if (!location.state) {
    navigate('/arabian-quiz');
    return null;
  }

  const getScoreMessage = () => {
    if (percentage >= 90) return { emoji: '👑', message: 'Story Master!', color: 'text-yellow-400' };
    if (percentage >= 75) return { emoji: '🌟', message: 'Excellent!', color: 'text-green-400' };
    if (percentage >= 60) return { emoji: '⭐', message: 'Good Job!', color: 'text-blue-400' };
    if (percentage >= 50) return { emoji: '📚', message: 'Keep Learning!', color: 'text-purple-400' };
    return { emoji: '💪', message: 'Try Again!', color: 'text-gray-400' };
  };

  const scoreInfo = getScoreMessage();
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="text-8xl mb-4 animate-bounce">{scoreInfo.emoji}</div>
        <h1 className={`text-5xl md:text-6xl font-bold ${scoreInfo.color} mb-4`}>
          {scoreInfo.message}
        </h1>
        <p className="text-2xl text-gray-200">Quiz Complete!</p>
      </div>

      {/* Score Summary */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-green-400/30 text-center">
          <div className="text-5xl font-bold text-green-400 mb-2">{score}</div>
          <div className="text-xl text-white">Correct Answers</div>
          <div className="text-gray-300">out of {totalQuestions}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-blue-400/30 text-center">
          <div className="text-5xl font-bold text-blue-400 mb-2">{percentage}%</div>
          <div className="text-xl text-white">Score</div>
          <div className="text-gray-300">Accuracy</div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-400/30 text-center">
          <div className="text-5xl font-bold text-purple-400 mb-2">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xl text-white">Time Taken</div>
          <div className="text-gray-300">Total Duration</div>
        </div>
      </div>

      {/* Answers Review */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
          📋 Review Your Answers
        </h2>
        <div className="space-y-6">
          {answers && answers.map((answer, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border ${
                answer.is_correct
                  ? 'border-green-400/50 bg-green-900/10'
                  : 'border-red-400/50 bg-red-900/10'
              }`}
            >
              {/* Question Number & Status */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xl font-bold text-white">
                  Question {index + 1}
                </span>
                <span className={`text-2xl ${answer.is_correct ? 'text-green-400' : 'text-red-400'}`}>
                  {answer.is_correct ? '✓' : '✗'}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-xl text-white mb-4 font-semibold">
                {answer.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-4">
                {answer.options.map((option, optIndex) => {
                  const isCorrect = optIndex === answer.correct_index;
                  const isSelected = optIndex === answer.selected_index;

                  return (
                    <div
                      key={optIndex}
                      className={`p-4 rounded-lg ${
                        isCorrect
                          ? 'bg-green-600/30 border-2 border-green-400'
                          : isSelected
                          ? 'bg-red-600/30 border-2 border-red-400'
                          : 'bg-white/5 border border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-white mr-3">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          <span className="text-white">{option}</span>
                        </div>
                        <div className="text-xl">
                          {isCorrect && '✓'}
                          {isSelected && !isCorrect && '✗'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-400/30">
                <p className="text-sm font-bold text-yellow-300 mb-2">💡 Explanation:</p>
                <p className="text-gray-200">{answer.explanation}</p>
              </div>

              {/* Time Taken */}
              <div className="mt-3 text-right text-sm text-gray-400">
                ⏱️ Time: {answer.time_taken}s
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => navigate('/arabian-quiz')}
          className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-gray-900 px-8 py-4 rounded-full text-xl font-bold shadow-lg shadow-amber-500/50 hover:shadow-amber-400/70 transform hover:scale-110 transition-all duration-300"
        >
          🔄 Play Again
        </button>
        <button
          onClick={() => navigate('/arabian-quiz/leaderboard')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg shadow-purple-500/50 hover:shadow-purple-400/70 transform hover:scale-110 transition-all duration-300"
        >
          🏆 View Leaderboard
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
        🎉
      </div>
      <div className="fixed bottom-10 right-10 text-6xl animate-pulse opacity-20">
        ✨
      </div>
    </div>
  );
};

export default ArabianQuizResults;
