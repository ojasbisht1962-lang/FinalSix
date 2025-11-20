import React, { useState, useEffect } from 'react';
import ExpandableCard from '../components/ExpandableCard';
import CareerFlowChart from '../components/CareerFlowChart';
import { careers } from '../data/educationalData';
import { careerImageResolver } from '../utils/careerImageResolver';

const CareersPage = () => {
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [availableDegrees, setAvailableDegrees] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);

  // Update available degrees when stream changes
  useEffect(() => {
    if (selectedStream) {
      const degrees = [...new Set(careers
        .filter(career => career.stream === selectedStream)
        .map(career => career.required_degree)
      )];
      setAvailableDegrees(degrees);
      setSelectedDegree('');
      setFilteredCareers([]);
    } else {
      setAvailableDegrees([]);
      setSelectedDegree('');
      setFilteredCareers([]);
    }
  }, [selectedStream]);

  // Update filtered careers when both stream and degree are selected
  useEffect(() => {
    if (selectedStream && selectedDegree) {
      const filtered = careers.filter(career => 
        career.stream === selectedStream && career.required_degree === selectedDegree
      );
      setFilteredCareers(filtered);
    } else {
      setFilteredCareers([]);
    }
  }, [selectedStream, selectedDegree]);

  const streams = [
    { value: 'science', label: 'Science Stream (PCM/PCB)', icon: '🔬' },
    { value: 'commerce', label: 'Commerce Stream', icon: '💼' },
    { value: 'arts', label: 'Arts Stream', icon: '🎨' }
  ];

  const getCareerImage = (careerName) => {
    return careerImageResolver(careerName);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );

  const renderPathwayInfo = () => {
    if (!selectedStream || !selectedDegree) return null;

    const streamInfo = {
      science: {
        name: 'Science Stream',
        description: 'Focuses on mathematics, physics, chemistry, and biology. Leads to careers in engineering, medicine, research, and technology.',
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology (for PCB)', 'English']
      },
      commerce: {
        name: 'Commerce Stream', 
        description: 'Emphasizes business, economics, and financial literacy. Opens doors to careers in finance, management, and entrepreneurship.',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English']
      },
      arts: {
        name: 'Arts Stream',
        description: 'Covers humanities, social sciences, and creative fields. Leads to careers in law, journalism, social work, and creative industries.',
        subjects: ['History', 'Geography', 'Political Science', 'English', 'Psychology']
      }
    };

    const currentStream = streamInfo[selectedStream];

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="text-3xl mr-3">
              {streams.find(s => s.value === selectedStream)?.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{currentStream.name} → {selectedDegree}</h3>
              <p className="text-sm text-gray-600">Your selected educational pathway</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">About This Stream</h4>
              <p className="text-gray-700 text-sm mb-4">{currentStream.description}</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Key Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {currentStream.subjects.map((subject, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Degree Requirements</h4>
              <div className="bg-white p-4 rounded border">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">🎓</span>
                  <span className="font-medium text-gray-900">{selectedDegree}</span>
                </div>
                <p className="text-sm text-gray-600">
                  This degree will provide you with the necessary foundation for the career opportunities shown below.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Career Flowchart */}
        <CareerFlowChart 
          selectedStream={selectedStream}
          selectedDegree={selectedDegree}
          relevantCareers={filteredCareers}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Career Guidance & Educational Pathways
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Choose your educational stream and degree to discover career opportunities and pathways. 
          Get detailed insights about job prospects, salary ranges, and career progression.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <span className="flex items-center">
                <span className="text-lg mr-2">🎯</span>
                Step 1: Select Your Educational Stream
              </span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
            >
              <option value="">Choose your stream...</option>
              {streams.map(stream => (
                <option key={stream.value} value={stream.value}>
                  {stream.icon} {stream.label}
                </option>
              ))}
            </select>
            {!selectedStream && (
              <p className="text-sm text-gray-500 mt-2">
                Select a stream to see available degrees
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <span className="flex items-center">
                <span className="text-lg mr-2">🎓</span>
                Step 2: Select Your Degree Program
              </span>
            </label>
            <select
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                !selectedStream ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              disabled={!selectedStream}
            >
              <option value="">Choose your degree...</option>
              {availableDegrees.map(degree => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
            {selectedStream && availableDegrees.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No degrees available for this stream
              </p>
            )}
            {!selectedStream && (
              <p className="text-sm text-gray-500 mt-2">
                First select a stream to see degree options
              </p>
            )}
          </div>
        </div>
      </div>

      {renderPathwayInfo()}

      {filteredCareers.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-3">💼</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Career Opportunities</h2>
              <p className="text-gray-600">
                {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''} available for {selectedStream} stream with {selectedDegree}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career, index) => (
              <ExpandableCard
                key={index}
                title={career.career_name}
                subtitle={`${career.salary_range} • ${career.stream.charAt(0).toUpperCase() + career.stream.slice(1)}`}
                image={getCareerImage(career.career_name)}
                category={career.stream}
                tags={career.keywords}
                expandedContent={renderExpandedContent(career)}
              />
            ))}
          </div>
        </div>
      )}

      {!selectedStream && !selectedDegree && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🎯</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Start Your Career Journey</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Select your educational stream and degree program above to discover relevant career opportunities and pathways.
          </p>
        </div>
      )}

      {selectedStream && !selectedDegree && availableDegrees.length > 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🎓</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Choose Your Degree</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Great! You've selected the {streams.find(s => s.value === selectedStream)?.label}. 
            Now choose your degree program to see career opportunities.
          </p>
        </div>
      )}

      {selectedStream && selectedDegree && filteredCareers.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Careers Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any career opportunities for {selectedDegree} in the {selectedStream} stream. 
            Try selecting a different combination.
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default CareersPage;