// src/components/ResourceCard.jsx

import React from 'react';
import './ResourceCard.css'; // Assuming a new CSS file for this component.

const ResourceCard = ({ resource, type, image }) => {
  return (
    <div className="resource-card">
      <div className="resource-card-content">
        <h3 className="resource-name">
          {type === 'colleges' || type === 'schools' ? resource.name : resource.career_name}
        </h3>
        {/* Conditional rendering for location and degrees/streams */}
        {(type === 'colleges' || type === 'schools') && (
          <>
            <p className="resource-location">Location: {resource.location}</p>
            <p className="resource-degrees-offered">
              {type === 'colleges' 
                ? `Degrees Offered: ${resource.degrees_offered?.join(', ') || 'N/A'}` 
                : `Streams Offered: ${resource.streams_offered?.join(', ') || 'N/A'}`
              }
            </p>
          </>
        )}
        {type === 'streams' && (
          <>
            <p className="resource-stream">Stream: {resource.stream}</p>
            <p className="resource-required-degree">Required Degree: {resource.required_degree}</p>
            <p className="resource-description">{resource.description}</p>
          </>
        )}
        <button className="view-details-button">
          View Details
        </button>
      </div>
      <div className="resource-image-container">
        <img src={image} alt={resource.name} className="resource-image" />
      </div>
    </div>
  );
};

export default ResourceCard;