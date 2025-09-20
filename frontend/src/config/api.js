// API Configuration for production and development
const API_CONFIG = {
  // Use environment variable for production, fallback to localhost for development
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // API endpoints
  ENDPOINTS: {
    QUIZ_QUESTIONS: '/quiz/questions',
    SUBMIT_ANSWERS: '/answers/submit',
    QUIZ_HISTORY: '/quiz/history',
    SUGGESTIONS: '/suggestions/get'
  }
};

export default API_CONFIG;