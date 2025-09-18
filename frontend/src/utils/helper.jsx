// Helper functions for filtering and searching

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const filterByStream = (items, stream) => {
  if (!stream || stream === 'all') return items;
  return items.filter(item => 
    item.stream === stream || 
    (item.streams_offered && item.streams_offered.includes(stream))
  );
};

export const filterByType = (items, type) => {
  if (!type || type === 'all') return items;
  return items.filter(item => item.type === type);
};

export const filterByDegree = (items, degree) => {
  if (!degree || degree === 'all') return items;
  return items.filter(item => 
    item.required_degree === degree || 
    (item.degrees_offered && item.degrees_offered.includes(degree))
  );
};

export const searchItems = (items, searchTerm) => {
  if (!searchTerm) return items;
  
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item => {
    // Search in name/career_name
    const name = item.name || item.career_name || '';
    if (name.toLowerCase().includes(lowercaseSearchTerm)) return true;
    
    // Search in location
    if (item.location && item.location.toLowerCase().includes(lowercaseSearchTerm)) return true;
    
    // Search in description
    if (item.description && item.description.toLowerCase().includes(lowercaseSearchTerm)) return true;
    
    // Search in keywords
    if (item.keywords && item.keywords.some(keyword => 
      keyword.toLowerCase().includes(lowercaseSearchTerm)
    )) return true;
    
    // Search in degrees_offered
    if (item.degrees_offered && item.degrees_offered.some(degree => 
      degree.toLowerCase().includes(lowercaseSearchTerm)
    )) return true;
    
    // Search in streams_offered
    if (item.streams_offered && item.streams_offered.some(stream => 
      stream.toLowerCase().includes(lowercaseSearchTerm)
    )) return true;
    
    return false;
  });
};

export const getUniqueValues = (items, key) => {
  const values = items.map(item => item[key]).filter(Boolean);
  return [...new Set(values)];
};

export const getUniqueArrayValues = (items, key) => {
  const allValues = items.reduce((acc, item) => {
    if (item[key] && Array.isArray(item[key])) {
      return [...acc, ...item[key]];
    }
    return acc;
  }, []);
  return [...new Set(allValues)];
};

export const getStreamColor = (stream) => {
  const colors = {
    science: 'bg-blue-100 text-blue-800',
    commerce: 'bg-green-100 text-green-800',
    arts: 'bg-purple-100 text-purple-800'
  };
  return colors[stream] || 'bg-gray-100 text-gray-800';
};

export const getTypeColor = (type) => {
  const colors = {
    government: 'bg-blue-100 text-blue-800',
    private: 'bg-orange-100 text-orange-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

export const formatDegreesList = (degrees) => {
  if (!degrees || !Array.isArray(degrees)) return '';
  return degrees.join(', ');
};

export const formatKeywordsList = (keywords) => {
  if (!keywords || !Array.isArray(keywords)) return '';
  return keywords.map(capitalizeFirstLetter).join(', ');
};