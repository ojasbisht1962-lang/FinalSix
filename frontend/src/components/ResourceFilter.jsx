// src/components/ResourceFilter.jsx

import React from 'react';
import './ResourceFilter.css'; // Assuming a new CSS file for this component.

const ResourceFilter = ({ streams, degrees, selectedStream, selectedDegree, onStreamChange, onDegreeChange }) => {
  return (
    <div className="resource-filter-container">
      <div className="filter-group">
        <label htmlFor="stream-select" className="filter-label">Select Stream:</label>
        <select id="stream-select" className="filter-select" value={selectedStream} onChange={onStreamChange}>
          <option value="">All Streams</option>
          {streams.map((stream, index) => (
            <option key={index} value={stream}>
              {stream.charAt(0).toUpperCase() + stream.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="degree-select" className="filter-label">Select Degree:</label>
        <select id="degree-select" className="filter-select" value={selectedDegree} onChange={onDegreeChange}>
          <option value="">All Degrees</option>
          {degrees.map((degree, index) => (
            <option key={index} value={degree}>
              {degree}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ResourceFilter;