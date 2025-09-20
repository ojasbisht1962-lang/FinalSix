import React, { useState } from 'react';
import ExpandableCard from '../components/ExpandableCard';
import { schools } from '../data/educationalData';
import { getSchoolImageWithFallback } from '../utils/imageResolver';

const SchoolsPage = () => {
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredSchools = schools.filter(school => {
    const streamMatch = selectedStream === 'all' || school.streams_offered.includes(selectedStream);
    const typeMatch = selectedType === 'all' || school.type === selectedType;
    return streamMatch && typeMatch;
  });

  const getSchoolImage = (schoolId) => {
    return getSchoolImageWithFallback(schoolId);
  };

  const renderExpandedContent = (school) => (
    <div className="space-y-4">
      <p className="text-gray-700 leading-relaxed">{school.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">School Details</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><span className="font-medium">Established:</span> {school.established}</li>
            <li><span className="font-medium">Gender:</span> {school.gender}</li>
            <li><span className="font-medium">Board:</span> {school.board}</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Official Links</h4>
          <a 
            href={school.website} 
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🏫 Educational Institutions & Schools</h1>
          <p className="text-lg text-gray-600">Discover the perfect school that offers your preferred stream and educational approach in Chandigarh.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Stream</label>
              <select 
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="all">All Streams</option>
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
              </select>
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">School Type</label>
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
            Schools Offering {selectedStream === 'all' ? 'All Streams' : selectedStream.charAt(0).toUpperCase() + selectedStream.slice(1)}
          </h2>
          <p className="text-gray-600 mt-2">Found {filteredSchools.length} schools</p>
        </div>

        {/* School Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school, index) => (
            <ExpandableCard
              key={school.id || index}
              title={school.name}
              subtitle={school.location}
              image={getSchoolImage(school.id)}
              category={school.type}
              tags={school.streams_offered}
              expandedContent={renderExpandedContent(school)}
            />
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No schools found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolsPage;