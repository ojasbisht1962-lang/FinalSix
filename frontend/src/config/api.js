// API Configuration for production and development
// Force redeploy: Environment variable should be https://matricks.onrender.com
const API_CONFIG = {
  // Use environment variable for production, fallback to production URL if env var not set
  BASE_URL: import.meta.env.VITE_API_URL || 
           (import.meta.env.MODE === 'production' ? 'https://matricks.onrender.com' : 'http://localhost:8000'),
  
  // API endpoints
  ENDPOINTS: {
    QUIZ_QUESTIONS: '/quiz/questions',
    SUBMIT_ANSWERS: '/answers/submit', 
    QUIZ_HISTORY: '/quiz/history',
    SUGGESTIONS: '/suggestions/get',
    USERS: '/users',
    CAREERS: '/careers',
    COLLEGES: '/colleges', 
    SCHOOLS: '/schools'
  },

  // Helper function to get full URL
  getFullUrl: (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`,

  // Helper function to get endpoint with query params
  getUrlWithParams: (endpoint, params = {}) => {
    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    return url.toString();
  }
};

export default API_CONFIG;