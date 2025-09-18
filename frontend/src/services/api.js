import axios from "axios";

// Base API URL (set in .env file)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if your backend requires credentials
});

// Add request interceptor for debugging (optional)
API.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging (optional)
API.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// ------------------- HEALTH CHECK ------------------- //

// Test API connection
export const healthCheck = async () => {
  const res = await API.get("/");
  return res.data;
};

// ------------------- AUTH ------------------- //

// Guest login
export const guestLogin = async () => {
  const res = await API.post("/users/guest-login");
  return res.data; // { user_id } or similar structure
};

// ------------------- QUIZ ------------------- //

// Get quiz by type (e.g. "10th_below", "science_stream")
export const getQuiz = async (quizType) => {
  const res = await API.get(`/quiz/${quizType}`);
  return res.data; // quiz object
};

// Submit quiz answers
export const submitQuiz = async (userId, quizId, answers) => {
  const res = await API.post(`/quiz/submit`, {
    user_id: userId,
    quiz_id: quizId,
    answers: answers,
  });
  return res.data; // result + suggestions
};

// ------------------- SUGGESTIONS ------------------- //

// Get suggestions for current user
export const getSuggestions = async (userId) => {
  const res = await API.get(`/suggestions/${userId}`);
  return res.data; // streams/degrees + schools/colleges
};

// ------------------- INSTITUTIONS ------------------- //

// Fetch nearby schools
export const getSchools = async (city, stream) => {
  const res = await API.get(`/schools`, {
    params: { city, stream },
  });
  return res.data; // list of schools
};

// Fetch nearby colleges
export const getColleges = async (city, degree) => {
  const res = await API.get(`/colleges`, {
    params: { city, degree },
  });
  return res.data; // list of colleges
};
