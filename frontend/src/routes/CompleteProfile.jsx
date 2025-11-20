// src/routes/CompleteProfile.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { completeProfile } from '../services/api';
import { User, Phone, Calendar } from 'lucide-react';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { user, refreshUserData } = useAuth();
  const [formData, setFormData] = useState({
    age: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.age || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.age < 10 || formData.age > 100) {
      setError('Please enter a valid age between 10 and 100');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setLoading(true);
      const response = await completeProfile(user.google_id, {
        age: parseInt(formData.age),
        phone: formData.phone
      });

      if (response.success) {
        await refreshUserData(user.google_id);
        navigate('/');
      } else {
        setError('Failed to update profile');
      }
    } catch (error) {
      console.error('Profile completion error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={user?.picture} 
              alt={user?.name}
              className="w-20 h-20 rounded-full border-4 border-white/30"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-gray-300">We need a few more details to get started</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2 font-medium">
              <Calendar className="inline w-4 h-4 mr-2" />
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
              min="10"
              max="100"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">
              <Phone className="inline w-4 h-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Your information is secure and will never be shared</p>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
