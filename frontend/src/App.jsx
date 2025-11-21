// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout"; // Import Layout
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import CompleteProfile from "./routes/CompleteProfile";
import ArabianQuizIntro from "./routes/ArabianQuizIntro";
import ArabianQuizPlay from "./routes/ArabianQuizPlay";
import ArabianQuizResults from "./routes/ArabianQuizResults";
import ArabianLeaderboard from "./routes/ArabianLeaderboard";
import ArabianProfile from "./routes/ArabianProfile";
import "./App.css";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/arabian-quiz" element={<ArabianQuizIntro />} />
            <Route path="/arabian-quiz/play" element={<ArabianQuizPlay />} />
            <Route path="/arabian-quiz/results" element={<ArabianQuizResults />} />
            <Route path="/arabian-quiz/leaderboard" element={<ArabianLeaderboard />} />
            <Route path="/profile" element={<ArabianProfile />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
