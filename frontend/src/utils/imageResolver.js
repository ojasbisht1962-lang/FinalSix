// Image resolver for colleges and schools
// Maps institution IDs to their corresponding image files

// College image mappings
export const collegeImageMap = {
  1: '/images/colleges/panjab-university.jpeg', // Panjab University (PU)
  2: '/images/colleges/pec.jpeg', // Punjab Engineering College (PEC)
  3: '/images/colleges/uiet.jpeg', // UIET, Panjab University
  4: '/images/colleges/ssbuicet.jpeg', // SSBUICET, Panjab University
  5: '/images/colleges/cca.jpeg', // Chandigarh College of Architecture (CCA)
  6: '/images/colleges/dav-college.jpeg', // DAV College
  7: '/images/colleges/mcm-dav.jpeg', // MCM DAV College for Women
  8: '/images/colleges/pggc-11.jpeg', // Post Graduate Government College, Sector 11
  9: '/images/colleges/pgcg-42.jpeg', // Post Graduate Government College for Girls, Sector 42
  10: '/images/colleges/gccbca.jpeg', // Govt. College of Commerce & Business Admin.
  11: '/images/colleges/chandigarh-university.jpeg', // Chandigarh University
  12: '/images/colleges/chitkara-university.jpeg', // Chitkara University
  13: '/images/colleges/rayat-bahra-university.jpeg' // Rayat Bahra University
};

// School image mappings
export const schoolImageMap = {
  1: '/images/schools/st-johns.jpeg', // St. John's High School
  2: '/images/schools/sacred-heart.jpeg', // Sacred Heart Senior Secondary School
  3: '/images/schools/vivek-high.jpeg', // Vivek High School
  4: '/images/schools/dps-chandigarh.jpeg', // Delhi Public School, Chandigarh
  5: '/images/schools/carmel-convent.jpeg', // Carmel Convent School
  6: '/images/schools/st-kabir.jpeg', // St. Kabir Public School
  7: '/images/schools/saupins.jpeg', // Saupin's School
  8: '/images/schools/ryan-international.jpeg', // Ryan International School
  9: '/images/schools/st-stephens.jpeg', // St. Stephen's School
  10: '/images/schools/strawberry-fields.jpeg', // Strawberry Fields High School
  11: '/images/schools/gmsss-16.jpeg', // Govt. Model Senior Secondary School, Sector-16
  12: '/images/schools/gmsss-19.jpeg', // Govt. Model Senior Secondary School, Sector-19
  13: '/images/schools/gmsss-33.jpeg', // Govt. Model Senior Secondary School, Sector-33
  14: '/images/schools/gmsss-23.jpeg' // Govt. Model Senior Secondary School, Sector-23
};

// Function to get college image by ID
export const getCollegeImage = (collegeId) => {
  return collegeImageMap[collegeId] || '/images/placeholder.jpg';
};

// Function to get school image by ID
export const getSchoolImage = (schoolId) => {
  return schoolImageMap[schoolId] || '/images/placeholder.jpg';
};

// Fallback images for when local images are not found
export const fallbackImages = {
  college: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  school: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

// Enhanced function that checks if local image exists, otherwise uses fallback
export const getCollegeImageWithFallback = (collegeId) => {
  const localImage = collegeImageMap[collegeId];
  if (localImage) {
    return localImage;
  }
  return fallbackImages.college;
};

export const getSchoolImageWithFallback = (schoolId) => {
  const localImage = schoolImageMap[schoolId];
  if (localImage) {
    return localImage;
  }
  return fallbackImages.school;
};