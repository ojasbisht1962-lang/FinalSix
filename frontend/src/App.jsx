// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import Layout
import HomePage from "./routes/HomePage";
import QuizPage from "./routes/QuizPage";
import SuggestionsPage from "./routes/SuggestionsPage";
import LoginPage from "./routes/LoginPage";
import DashboardPage from "./routes/DashboardPage";
import CareersPage from "./routes/CareersPage";
import CollegesPage from "./routes/CollegesPage";
import SchoolsPage from "./routes/SchoolsPage";
import NotificationsPage from "./routes/NotificationsPage";
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/suggestions" element={<SuggestionsPage />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
