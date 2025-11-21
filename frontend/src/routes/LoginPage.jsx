// src/routes/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, LogIn } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, signInAsGuest, isAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Initialize Google Sign-In
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        console.log('Initializing Google Sign-In for real authentication...');
        
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1070985351952-kps4ke1t7rh1n6t2cp1vubr3i8tfabn9.apps.googleusercontent.com',
          callback: handleGoogleSuccess,
          auto_select: false,
          cancel_on_tap_outside: false,
          use_fedcm_for_prompt: false,
          ux_mode: 'popup',
          context: 'signin',
          // These might help with localhost issues
          hosted_domain: undefined
        });
        
        console.log('Google Sign-In initialized - ready for authentication');
      }
    };

    // Load Google Identity Services script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    } else {
      initializeGoogleSignIn();
    }
  }, []);

  const handleGoogleSuccess = async (response) => {
    try {
      setError('');
      
      // Decode the JWT token
      let payload;
      try {
        payload = JSON.parse(atob(response.credential.split('.')[1]));
      } catch (decodeError) {
        console.error('JWT decode error:', decodeError);
        throw new Error('Invalid credential format');
      }
      
      // console.log('Google Sign-In payload:', payload);
      
      const result = await signInWithGoogle(payload);
      if (result.success) {
        // Check if profile is completed
        if (result.user && !result.user.profile_completed) {
          navigate('/complete-profile');
        } else {
          navigate('/');
        }
      } else {
        setError(result.error || 'Google sign-in failed');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      // console.log('Google Sign-In clicked - attempting real Google OAuth...');
      
      if (window.google && window.google.accounts) {
        // console.log('Google library loaded, trying to prompt sign-in...');
        
        // Try multiple methods to force Google sign-in
        try {
          // Method 1: Direct prompt
          window.google.accounts.id.prompt((notification) => {
            // console.log('Google prompt notification:', notification);
            
            if (notification.isNotDisplayed()) {
              // console.log('Google prompt not displayed - trying renderButton method');
              // Method 2: Render button and auto-click
              const tempDiv = document.createElement('div');
              tempDiv.style.position = 'absolute';
              tempDiv.style.top = '-9999px';
              document.body.appendChild(tempDiv);
              
              try {
                window.google.accounts.id.renderButton(tempDiv, {
                  theme: 'outline',
                  size: 'large',
                  type: 'standard',
                  text: 'signin_with',
                  shape: 'rectangular',
                  logo_alignment: 'left',
                  width: 250
                });
                
                // Auto-click the rendered button
                setTimeout(() => {
                  const button = tempDiv.querySelector('div[role="button"]');
                  if (button) {
                    console.log('Auto-clicking Google button');
                    button.click();
                  } else {
                    console.log('Could not find Google button to click');
                    document.body.removeChild(tempDiv);
                    setTimeout(() => {
                      if (loading) {
                        offerFallback();
                      }
                    }, 1000);
                  }
                }, 500);
                
                // Cleanup after 3 seconds
                setTimeout(() => {
                  if (document.body.contains(tempDiv)) {
                    document.body.removeChild(tempDiv);
                  }
                }, 3000);
                
              } catch (renderError) {
                console.error('Google render button error:', renderError);
                document.body.removeChild(tempDiv);
                setTimeout(() => {
                  if (loading) {
                    offerFallback();
                  }
                }, 1000);
              }
            } else if (notification.isSkippedMoment()) {
              console.log('Google sign-in was skipped');
              setTimeout(() => {
                if (loading) {
                  offerFallback();
                }
              }, 2000);
            }
          });
          
          // Also try disabling one-tap and forcing account chooser
          window.google.accounts.id.disableAutoSelect();
          
        } catch (promptError) {
          console.error('Google prompt error:', promptError);
          setTimeout(() => {
            if (loading) {
              offerFallback();
            }
          }, 1000);
        }
        
        // Give it time to work, then offer fallback
        setTimeout(() => {
          if (loading) {
            offerFallback();
          }
        }, 6000); // Increased timeout for real OAuth attempts
        
      } else {
        console.log('Google library not loaded, using demo mode');
        triggerFallbackAuth();
      }
    } catch (error) {
      console.error('Error initiating Google sign-in:', error);
      setTimeout(() => {
        if (loading) {
          offerFallback();
        }
      }, 1000);
    }
  };

  const offerFallback = () => {
    const userWantsFallback = confirm('Google Sign-In is having issues. This might be due to:\n\n• OAuth app needs approval\n• Popup blockers\n• Network issues\n\nWould you like to continue with demo mode for now?');
    if (userWantsFallback) {
      triggerFallbackAuth();
    } else {
      setLoading(false);
      setError('Google Sign-In failed. Try refreshing the page or check if popups are blocked.');
    }
  };

  const triggerFallbackAuth = async () => {
    try {
      console.log('Using fallback Google authentication...');
      const simulatedGoogleUser = {
        sub: 'google_dev_' + Date.now(),
        name: 'Demo Google User',
        email: 'demo@gmail.com',
        picture: 'https://via.placeholder.com/100x100/4285F4/fff?text=G',
      };
      
      await handleGoogleSuccess({ credential: createSimulatedJWT(simulatedGoogleUser) });
      setLoading(false);
    } catch (error) {
      console.error('Fallback authentication failed:', error);
      setError('Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  // Helper function to create a simulated JWT for development
  const createSimulatedJWT = (userData) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify(userData));
    const signature = btoa('simulated_signature');
    return `${header}.${payload}.${signature}`;
  };

  const handleGuestLogin = async () => {
    try {
      setError('');
      const result = await signInAsGuest();
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Guest login failed');
      }
    } catch (error) {
      console.error("Guest login failed:", error);
      setError("Failed to log in as guest. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Career Compass</h1>
            <p className="text-blue-100">Your journey to the right career starts here</p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Sign In Options */}
            <div className="space-y-4">
              {/* Google Sign-In Button */}
              <div className="w-full">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-blue-500 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-600 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-md"
                  title="Sign in with your Google account"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-base group-hover:text-gray-900">
                    {loading ? 'Signing in...' : 'Sign in with Google'}
                  </span>
                </button>
                
                {/* Hidden container for Google's rendered button as backup */}
                <div id="google-signin-button" className="mt-2 hidden"></div>
                
                {/* Demo mode button for development */}
                <button
                  onClick={triggerFallbackAuth}
                  className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
                  type="button"
                >
                  Or use Demo Google Account (for development)
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative bg-white px-4 text-sm text-gray-500 font-medium">
                  OR
                </div>
              </div>

              {/* Guest Login Button */}
              <button
                onClick={handleGuestLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <User className="w-5 h-5" />
                {loading ? 'Signing in...' : 'Continue as Guest'}
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                By signing in, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-3 text-center">Why Choose Career Compass?</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Personalized career assessments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Expert guidance and resources</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>College and course recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
