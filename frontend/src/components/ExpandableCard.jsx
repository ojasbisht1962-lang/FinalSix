import React, { useState } from 'react';

const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ExpandableCard = ({ 
  title, 
  subtitle, 
  image, 
  category, 
  tags = [], 
  expandedContent,
  children,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      
      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1 mr-2">
            {title}
          </h3>
          {category && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
              category === 'government' || category === 'public'
                ? 'bg-green-100 text-green-800' 
                : category === 'private'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800'
            }`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-600 text-sm mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {subtitle}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {typeof tag === 'string' ? tag.charAt(0).toUpperCase() + tag.slice(1) : tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Children (for any additional content) */}
        {children}

        {/* Expanded Content */}
        {isExpanded && expandedContent && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
            {expandedContent}
          </div>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={toggleExpand}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center justify-center"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUpIcon className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              <span>Read More</span>
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExpandableCard;