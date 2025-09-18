export const COLORS = {
  primary: {
    50: '#f0fdfa',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e'
  },
  secondary: {
    500: '#3b82f6',
    600: '#2563eb'
  }
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  LOGIN: '/login',
  DASHBOARD: '/dashboard'
};

export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  AUTH: '/auth',
  USERS: '/users',
  CAREERS: '/careers'
};