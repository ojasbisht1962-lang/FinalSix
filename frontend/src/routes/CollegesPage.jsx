import React, { useState } from 'react';
import ExpandableCard from '../components/ExpandableCard';
import { colleges } from '../data/educationalData';
import { getCollegeImageWithFallback } from '../utils/imageResolver';

const CollegesPage = () => {
  const [selectedDegree, setSelectedDegree] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const degrees = [
    "B.Tech", "B.Sc", "B.Com", "B.A.", "LL.B.", "M.A.", "M.Com", "M.Sc",
    "M.Tech", "Ph.D", "BBA", "BCA", "MBA", "MCA", "B.E.", "M.E.",
    "B.Ed", "M.Ed", "B.Arch", "M.Arch"
  ];

  const filteredColleges = colleges.filter(college => {
    const degreeMatch = selectedDegree === 'all' || college.degrees_offered.includes(selectedDegree);
    const typeMatch = selectedType === 'all' || college.type === selectedType;
    return degreeMatch && typeMatch;
  });

  const getCollegeImage = (collegeId) => {
    return getCollegeImageWithFallback(collegeId);
  };

  const renderExpandedContent = (college) => (
    <div className="space-y-4">
      <p className="text-gray-700 leading-relaxed">{college.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">College Details</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><span className="font-medium">Established:</span> {college.established}</li>
            <li><span className="font-medium">Category:</span> {college.category}</li>
            <li><span className="font-medium">Accreditation:</span> {college.accreditation}</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Official Links</h4>
          <a 
            href={college.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            Visit Official Website
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🏛️ Higher Education Institutions</h1>
          <p className="text-lg text-gray-600">Filter and find the perfect college for your desired stream and degree in Chandigarh and surrounding areas.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Degree</label>
              <select 
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="all">All Degrees</option>
                {degrees.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">College Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="all">All Types</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Colleges Offering {selectedDegree === 'all' ? 'Various Degrees' : selectedDegree}
          </h2>
          <p className="text-gray-600 mt-2">Found {filteredColleges.length} colleges</p>
        </div>

        {/* College Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college, index) => (
            <ExpandableCard
              key={college.id || index}
              title={college.name}
              subtitle={college.location}
              image={getCollegeImage(college.id)}
              category={college.type}
              tags={college.degrees_offered}
              expandedContent={renderExpandedContent(college)}
            />
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No colleges found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesPage;