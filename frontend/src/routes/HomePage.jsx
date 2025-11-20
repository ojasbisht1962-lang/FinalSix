import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizStats } from "../services/api";
import arabianTheme from "../data/arabianTheme";

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getQuizStats();
        if (response.success) {
          setStats(response);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-sm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🪔</div>
          <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">✨</div>
          <div className="absolute bottom-40 left-20 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🌙</div>
          <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Main Title */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 mb-4 animate-pulse">
              Arabian Nights Quiz
            </h1>
            <div className="flex justify-center gap-4 text-5xl mb-6">
              <span className="animate-bounce">🪔</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🧞‍♂️</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>👳</span>
              <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🏺</span>
              <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>💎</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-yellow-200 mb-8 max-w-3xl mx-auto font-semibold">
            Journey through the magical tales of One Thousand and One Nights
          </p>
          <p className="text-lg md:text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Test your knowledge of Aladdin, Ali Baba, Sinbad, Scheherazade, and more legendary stories!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => navigate('/arabian-quiz')}
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-gray-900 px-12 py-5 rounded-full text-2xl font-bold shadow-2xl shadow-amber-500/50 hover:shadow-amber-400/70 transform hover:scale-110 transition-all duration-300 animate-pulse"
            >
              ✨ Start Quiz Now ✨
            </button>
            <button
              onClick={() => navigate('/arabian-quiz/leaderboard')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-xl shadow-purple-500/50 hover:shadow-purple-400/70 transform hover:scale-105 transition-all duration-300"
            >
              🏆 View Leaderboard
            </button>
          </div>

          {/* Stats Section */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/30 text-center transform hover:scale-105 transition-all">
                <div className="text-5xl mb-3">📚</div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">{stats.total_questions}</div>
                <div className="text-lg text-purple-200">Total Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-amber-400/30 text-center transform hover:scale-105 transition-all">
                <div className="text-5xl mb-3">🎮</div>
                <div className="text-4xl font-bold text-amber-300 mb-2">{stats.total_quiz_attempts || 0}</div>
                <div className="text-lg text-purple-200">Quiz Attempts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-pink-400/30 text-center transform hover:scale-105 transition-all">
                <div className="text-5xl mb-3">🌟</div>
                <div className="text-4xl font-bold text-pink-300 mb-2">{Object.keys(stats.story_distribution || {}).length}</div>
                <div className="text-lg text-purple-200">Story Themes</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-950 to-purple-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-yellow-300 mb-12">
            ✨ Quiz Features ✨
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30 text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-white mb-3">20+ Questions</h3>
              <p className="text-purple-200">Diverse questions covering all major Arabian Nights tales</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-green-400/30 text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">⏱️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Timed Challenge</h3>
              <p className="text-purple-200">15 seconds per question to test your knowledge</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-pink-400/30 text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-white mb-3">Difficulty Levels</h3>
              <p className="text-purple-200">Easy, Medium, and Hard questions to match your expertise</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/30 text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-3">Instant Feedback</h3>
              <p className="text-purple-200">Know immediately if your answer is correct or wrong</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-3">Leaderboards</h3>
              <p className="text-purple-200">Compete globally and see weekly top performers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-amber-400/30 text-center transform hover:scale-105 transition-all">
              <div className="text-6xl mb-4">👑</div>
              <h3 className="text-2xl font-bold text-white mb-3">Earn Badges</h3>
              <p className="text-purple-200">Unlock achievements like Story Master and Speed Genie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-yellow-300 mb-12">
            📚 Featured Stories 📚
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {arabianTheme.stories.filter(s => s.id !== 'all').map((story) => (
              <div
                key={story.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30 text-center transform hover:scale-105 transition-all cursor-pointer"
                onClick={() => navigate('/arabian-quiz')}
              >
                <div className="text-6xl mb-4">{story.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{story.name}</h3>
                <p className="text-purple-200 text-sm">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready for the Adventure? 🧞‍♂️
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Join thousands of quiz takers exploring the magical world of Arabian Nights!
          </p>
          <button
            onClick={() => navigate('/arabian-quiz')}
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-gray-900 px-16 py-6 rounded-full text-3xl font-bold shadow-2xl shadow-amber-500/50 hover:shadow-amber-400/70 transform hover:scale-110 transition-all duration-300"
          >
            🪔 Begin Your Journey 🪔
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
