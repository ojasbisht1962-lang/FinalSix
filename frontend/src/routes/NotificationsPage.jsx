// src/routes/NotificationsPage.jsx

import React, { useState } from 'react';
import { Calendar, ExternalLink, Bell, GraduationCap, Briefcase, Award, Clock } from 'lucide-react';

const NotificationsPage = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'admission',
      icon: GraduationCap,
      title: 'B.Sc. Admissions open at XYZ Government College – Apply by 15th July',
      description: 'Applications are now open for Bachelor of Science programs. Limited seats available.',
      timeAgo: '2 days ago',
      color: 'bg-blue-100 text-blue-600',
      link: '#'
    },
    {
      id: 2,
      type: 'scholarship',
      icon: Award,
      title: 'Last date to apply for National Scholarship Scheme – 20th June',
      description: 'Don\'t miss the opportunity to apply for government scholarships worth ₹50,000 annually.',
      timeAgo: '5 days ago',
      color: 'bg-green-100 text-green-600',
      link: '#'
    },
    {
      id: 3,
      type: 'exam',
      icon: Calendar,
      title: 'CUET UG Exam Date: 21st May – Admit cards available from 10th May',
      description: 'Central Universities Entrance Test admit cards are now available for download.',
      timeAgo: '1 week ago',
      color: 'bg-yellow-100 text-yellow-600',
      link: '#'
    },
    {
      id: 4,
      type: 'career',
      icon: Briefcase,
      title: 'Career Guidance Webinar – 18th June at 5 PM',
      description: 'Join our expert panel discussion on emerging career opportunities in technology and healthcare.',
      timeAgo: '1 week ago',
      color: 'bg-purple-100 text-purple-600',
      link: '#'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Notifications', count: notifications.length },
    { value: 'admission', label: 'Admissions', count: notifications.filter(n => n.type === 'admission').length },
    { value: 'scholarship', label: 'Scholarships', count: notifications.filter(n => n.type === 'scholarship').length },
    { value: 'exam', label: 'Exams', count: notifications.filter(n => n.type === 'exam').length },
    { value: 'career', label: 'Career Events', count: notifications.filter(n => n.type === 'career').length }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Notifications</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest updates and deadlines
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-1">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  filter === option.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="block truncate">{option.label}</span>
                <span className={`inline-block ml-2 px-2 py-0.5 text-xs rounded-full ${
                  filter === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-lg ${notification.color} flex-shrink-0`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {notification.description}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Posted {notification.timeAgo}</span>
                      </div>
                      
                      <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <span>Learn More</span>
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-white text-blue-600 border border-blue-200 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 shadow-sm">
            Load More
          </button>
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-500">Try changing your filter to see more notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;