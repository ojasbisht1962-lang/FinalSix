import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arabianTheme from '../data/arabianTheme';

const ArabianQuizIntro = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStory, setSelectedStory] = useState('all');

  const handleStartQuiz = () => {
    navigate('/arabian-quiz/play', {
      state: { difficulty: selectedDifficulty, story: selectedStory }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-4 animate-pulse">
          🪔 Arabian Nights Quiz 🌙
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
          Journey through the magical tales of One Thousand and One Nights. Test your knowledge of Aladdin, Ali Baba, Sinbad, and more!
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
        {/* Difficulty Selection */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
            <span>⭐</span> Choose Difficulty
          </h2>
          <div className="space-y-4">
            {arabianTheme.difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`w-full p-5 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                  selectedDifficulty === diff.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 hover:bg-white/10 border border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl mb-2">{diff.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{diff.name}</h3>
                    <p className="text-sm text-gray-300">{diff.description}</p>
                  </div>
                  {selectedDifficulty === diff.id && (
                    <span className="text-3xl">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Story Selection */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-amber-400/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
            <span>📚</span> Choose Story
          </h2>
          <div className="space-y-4">
            {arabianTheme.stories.map((story) => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story.id)}
                className={`w-full p-5 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                  selectedStory === story.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg shadow-amber-500/50'
                    : 'bg-white/5 hover:bg-white/10 border border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl mb-2">{story.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                    <p className="text-sm text-gray-300">{story.description}</p>
                  </div>
                  {selectedStory === story.id && (
                    <span className="text-3xl">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Info Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-blue-400/30 text-center">
          <div className="text-4xl mb-3">📝</div>
          <h3 className="text-xl font-bold text-white mb-2">20 Questions</h3>
          <p className="text-gray-300">Test your Arabian Nights knowledge</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-green-400/30 text-center">
          <div className="text-4xl mb-3">⏱️</div>
          <h3 className="text-xl font-bold text-white mb-2">15 Seconds Each</h3>
          <p className="text-gray-300">Answer before time runs out</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-pink-400/30 text-center">
          <div className="text-4xl mb-3">🏆</div>
          <h3 className="text-xl font-bold text-white mb-2">Earn Badges</h3>
          <p className="text-gray-300">Unlock achievements</p>
        </div>
      </div>

      {/* Start Button */}
      <div className="max-w-6xl mx-auto text-center">
        <button
          onClick={handleStartQuiz}
          className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-gray-900 px-12 py-4 rounded-full text-2xl font-bold shadow-2xl shadow-amber-500/50 hover:shadow-amber-400/70 transform hover:scale-110 transition-all duration-300 animate-pulse"
        >
          ✨ Start Quiz ✨
        </button>
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => navigate('/arabian-quiz/leaderboard')}
            className="text-yellow-300 hover:text-yellow-200 underline text-lg transition-colors"
          >
            🏆 View Leaderboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white underline text-lg transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-10 left-10 text-6xl animate-bounce opacity-20">
        🧞‍♂️
      </div>
      <div className="fixed bottom-10 right-10 text-6xl animate-bounce opacity-20" style={{ animationDelay: '1s' }}>
        🪔
      </div>
      <div className="fixed top-1/2 right-10 text-4xl animate-pulse opacity-20">
        ✨
      </div>
    </div>
  );
};

export default ArabianQuizIntro;
