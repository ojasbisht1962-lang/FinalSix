// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
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
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/complete-profile" 
              element={
                <ProtectedRoute>
                  <CompleteProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/arabian-quiz" 
              element={
                <ProtectedRoute>
                  <ArabianQuizIntro />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/arabian-quiz/play" 
              element={
                <ProtectedRoute>
                  <ArabianQuizPlay />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/arabian-quiz/results" 
              element={
                <ProtectedRoute>
                  <ArabianQuizResults />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/arabian-quiz/leaderboard" 
              element={
                <ProtectedRoute>
                  <ArabianLeaderboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ArabianProfile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
