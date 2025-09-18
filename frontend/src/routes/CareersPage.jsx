import React, { useState } from 'react';
import ExpandableCard from '../components/ExpandableCard';
import { careers } from '../data/educationalData';

const CareersPage = () => {
  const [selectedStream, setSelectedStream] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCareers = careers.filter(career => {
    const streamMatch = selectedStream === 'all' || career.stream === selectedStream;
    const searchMatch = searchTerm === '' || 
      career.career_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    return streamMatch && searchMatch;
  });

  const getCareerImage = (careerName) => {
    const images = [
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const renderExpandedContent = (career) => (
    <div className="space-y-4">
      <p className="text-gray-700 leading-relaxed">{career.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Career Details</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><span className="font-medium">Required Degree:</span> {career.required_degree}</li>
            <li><span className="font-medium">Stream:</span> {career.stream.charAt(0).toUpperCase() + career.stream.slice(1)}</li>
            <li><span className="font-medium">Salary Range:</span> {career.salary_range}</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Career Progression</h4>
          <p className="text-sm text-gray-600 mb-2">{career.career_progression}</p>
          
          <h4 className="font-semibold text-gray-900 mb-2 mt-4">Key Skills</h4>
          <div className="flex flex-wrap gap-1">
            {career.skills_required && career.skills_required.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {career.website && (
        <div className="pt-2">
          <a 
            href={career.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            Learn More About This Career
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Career Pathways & Opportunities
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore diverse career opportunities across various streams. Each career path offers unique 
          challenges, growth opportunities, and ways to make a meaningful impact.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Careers
          </label>
          <input
            type="text"
            placeholder="Search by career name or keywords..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="md:w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Stream
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
          >
            <option value="all">All Streams</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career, index) => (
          <ExpandableCard
            key={index}
            title={career.career_name}
            subtitle={`${career.stream.charAt(0).toUpperCase() + career.stream.slice(1)} • ${career.required_degree}`}
            image={getCareerImage(career.career_name)}
            category={career.stream}
            tags={career.keywords}
            expandedContent={renderExpandedContent(career)}
          />
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No careers found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find relevant career opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
