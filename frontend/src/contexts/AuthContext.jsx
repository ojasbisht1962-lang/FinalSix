// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing authentication on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem('user_id');
    
    if (storedUser && storedUserId) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');
      }
    }
    setIsLoading(false);
  }, []);

  // Google Sign-In handler
  const signInWithGoogle = async (googleUser) => {
    try {
      setIsLoading(true);
      
      const userData = {
        id: googleUser.sub || googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
        type: 'google'
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('user_id', userData.id);
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Guest login handler
  const signInAsGuest = async () => {
    try {
      setIsLoading(true);
      
      const guestId = 'guest_' + Date.now();
      const userData = {
        id: guestId,
        name: 'Guest User',
        email: null,
        picture: null,
        type: 'guest'
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('user_id', guestId);
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Guest sign-in error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    
    // For Google users, you might want to revoke the token
    if (user?.type === 'google' && window.google) {
      try {
        window.google.accounts.id.disableAutoSelect();
      } catch (error) {
        console.log('Google logout cleanup failed:', error);
      }
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signInWithGoogle,
    signInAsGuest,
    logout,
    // Quiz history functions - for Google users, fetch from database
    saveQuizResult: (quizData) => {
      if (user && user.type === 'google') {
        // For Google users, quiz data is already saved in user_answers collection
        // We just need to update the user context to trigger UI refresh
        setUser(prev => ({
          ...prev,
          lastQuizCompleted: new Date().toISOString()
        }));
      }
    },
    getQuizHistory: async () => {
      if (user && user.type === 'google') {
        try {
          // Fetch quiz history from user_answers collection
          const response = await fetch(`http://localhost:8000/quiz/history/${user.id}`);
          if (response.ok) {
            const historyData = await response.json();
            return historyData.quizzes || [];
          }
        } catch (error) {
          console.error('Error fetching quiz history:', error);
        }
      }
      return [];
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;