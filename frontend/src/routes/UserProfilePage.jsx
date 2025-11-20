// src/routes/UserProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../services/api';
import { User, Mail, Phone, Calendar, Edit2, Save, X, Trash2 } from 'lucide-react';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, refreshUserData } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile(user.google_id);
      if (response.success) {
        setProfileData(response.user);
        setFormData({
          name: response.user.name || '',
          age: response.user.age || '',
          phone: response.user.phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
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

  const handleSave = async () => {
    setError('');
    
    try {
      setSaving(true);
      const response = await updateUserProfile(user.google_id, {
        name: formData.name,
        age: parseInt(formData.age),
        phone: formData.phone
      });

      if (response.success) {
        setProfileData(response.user);
        await refreshUserData(user.google_id);
        setEditMode(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profileData.name || '',
      age: profileData.age || '',
      phone: profileData.phone || ''
    });
    setEditMode(false);
    setError('');
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will delete all your data including quiz history.'
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      'This is your final warning. All your data will be permanently deleted. Continue?'
    );

    if (!doubleConfirm) return;

    try {
      const response = await deleteUserAccount(user.google_id);
      if (response.success) {
        alert('Your account has been deleted successfully');
        logout();
        navigate('/');
      } else {
        setError('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('An error occurred while deleting account');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
              {error}
            </div>
          )}

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <img
              src={profileData.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}`}
              alt={profileData.name}
              className="w-32 h-32 rounded-full border-4 border-white/30 shadow-xl"
            />
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                <User className="inline w-4 h-4 mr-2" />
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-3 bg-white/5 rounded-lg text-white">{profileData.name}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <div className="px-4 py-3 bg-white/5 rounded-lg text-gray-400">{profileData.email}</div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                <Calendar className="inline w-4 h-4 mr-2" />
                Age
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="10"
                  max="100"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-3 bg-white/5 rounded-lg text-white">{profileData.age || 'Not provided'}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                <Phone className="inline w-4 h-4 mr-2" />
                Phone Number
              </label>
              {editMode ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-3 bg-white/5 rounded-lg text-white">{profileData.phone || 'Not provided'}</div>
              )}
            </div>
          </div>

          {/* Delete Account */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <p className="text-gray-300 mb-4">
                Once you delete your account, there is no going back. This will permanently delete your profile, quiz history, and all associated data.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold"
              >
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
