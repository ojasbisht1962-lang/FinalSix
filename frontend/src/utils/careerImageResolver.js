// Career Image Resolver - Maps career names to their respective images
// Place your career images in public/images/careers/ folder

export const careerImageResolver = (careerName) => {
  const careerImages = {
    // Science Stream Careers - EXACT NAMES from your data
    'Software Engineer': '/images/careers/software-engineer.jpeg',
    'Data Scientist': '/images/careers/data-scientist.jpeg',
    'Doctor/Physician': '/images/careers/doctor-physician.jpeg',
    'Civil Engineer': '/images/careers/civil-engineer.jpeg',
    'Mechanical Engineer': '/images/careers/mechanical-engineer.jpeg',
    'Research Scientist': '/images/careers/research-scientist.jpeg',
    'Architect': '/images/careers/architect.jpeg',
    'Pharmacist': '/images/careers/pharmacist.jpeg',
    'Pilot': '/images/careers/pilot.jpeg',

    // Commerce Stream Careers - EXACT NAMES from your data
    'Chartered Accountant (CA)': '/images/careers/chartered accountant.jpeg',
    'Financial Analyst': '/images/careers/financial-analyst.jpeg',
    'Company Secretary (CS)': '/images/careers/company-secretary.jpeg',
    'Investment Banker': '/images/careers/investment-banker.jpeg',
    'Marketing Manager': '/images/careers/marketing manager.jpeg',
    'Human Resources Manager': '/images/careers/human-resources-manager.jpeg',
    'Economist': '/images/careers/economist.jpeg',
    'Actuary': '/images/careers/actuary.jpeg',

    // Arts Stream Careers - EXACT NAMES from your data
    'Journalist': '/images/careers/journalist.jpeg',
    'Lawyer': '/images/careers/lawyer.jpeg',
    'UI/UX Designer': '/images/careers/ui-ux-designer.jpeg',
    'Psychologist': '/images/careers/psychologist.jpeg',
    'Fashion Designer': '/images/careers/fashion-designer.jpeg',
    'Social Worker': '/images/careers/social-worker.jpeg',
    'Digital Marketing Specialist': '/images/careers/digital-marketing-specialist.jpeg',

    // Government Jobs - EXACT NAMES from your data
    'IAS Officer': '/images/careers/ias-officer.jpeg',
    'Bank PO': '/images/careers/bank-po.jpeg',
    'Software Developer (IT)': '/images/careers/software-developer-it.jpeg',
  };

  // Return specific image if available, otherwise return a fallback
  return careerImages[careerName] || getDefaultCareerImage(careerName);
};

// Fallback function for careers without specific images
const getDefaultCareerImage = (careerName) => {
  // You can organize fallback images by career type/stream
  const fallbackImages = {
    // Science/Tech related fallbacks
    science: [
      '/images/careers/default/science-1.jpg',
      '/images/careers/default/science-2.jpg',
      '/images/careers/default/technology.jpg'
    ],
    // Commerce/Business related fallbacks
    commerce: [
      '/images/careers/default/business-1.jpg',
      '/images/careers/default/finance.jpg',
      '/images/careers/default/office.jpg'
    ],
    // Arts/Creative related fallbacks
    arts: [
      '/images/careers/default/creative.jpg',
      '/images/careers/default/arts.jpg',
      '/images/careers/default/media.jpg'
    ],
    // Government jobs fallback
    government: [
      '/images/careers/default/government.jpg',
      '/images/careers/default/office-building.jpg'
    ]
  };

  // Determine category based on career name keywords
  let category = 'science'; // default
  
  if (careerName.toLowerCase().includes('engineer') || 
      careerName.toLowerCase().includes('scientist') ||
      careerName.toLowerCase().includes('developer') ||
      careerName.toLowerCase().includes('data')) {
    category = 'science';
  } else if (careerName.toLowerCase().includes('manager') ||
             careerName.toLowerCase().includes('analyst') ||
             careerName.toLowerCase().includes('accountant') ||
             careerName.toLowerCase().includes('banking')) {
    category = 'commerce';
  } else if (careerName.toLowerCase().includes('designer') ||
             careerName.toLowerCase().includes('journalist') ||
             careerName.toLowerCase().includes('creative') ||
             careerName.toLowerCase().includes('writer')) {
    category = 'arts';
  } else if (careerName.toLowerCase().includes('ias') ||
             careerName.toLowerCase().includes('government') ||
             careerName.toLowerCase().includes('officer')) {
    category = 'government';
  }

  const categoryImages = fallbackImages[category];
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
};

// Helper function to get all career names that need images
export const getAllCareerNames = () => {
  return Object.keys(careerImageResolver()).filter(key => key !== 'default');
};

// Function to check if an image exists for a career
export const hasCareerImage = (careerName) => {
  const careerImages = {
    'Software Engineer': '/images/careers/software-engineer.jpg',
    'Data Scientist': '/images/careers/data-scientist.jpg',
    'Doctor/Physician': '/images/careers/doctor-physician.jpg',
    'Civil Engineer': '/images/careers/civil-engineer.jpg',
    'Mechanical Engineer': '/images/careers/mechanical-engineer.jpg',
    'Research Scientist': '/images/careers/research-scientist.jpg',
    'Architect': '/images/careers/architect.jpg',
    'Pharmacist': '/images/careers/pharmacist.jpg',
    'Pilot': '/images/careers/pilot.jpg',
    'Chartered Accountant (CA)': '/images/careers/chartered-accountant.jpg',
    'Financial Analyst': '/images/careers/financial-analyst.jpg',
    'Company Secretary (CS)': '/images/careers/company-secretary.jpg',
    'Investment Banker': '/images/careers/investment-banker.jpg',
    'Marketing Manager': '/images/careers/marketing-manager.jpg',
    'Human Resources Manager': '/images/careers/human-resources-manager.jpg',
    'Economist': '/images/careers/economist.jpg',
    'Actuary': '/images/careers/actuary.jpg',
    'Journalist': '/images/careers/journalist.jpg',
    'Lawyer': '/images/careers/lawyer.jpg',
    'UI/UX Designer': '/images/careers/ui-ux-designer.jpg',
    'Psychologist': '/images/careers/psychologist.jpg',
    'Fashion Designer': '/images/careers/fashion-designer.jpg',
    'Social Worker': '/images/careers/social-worker.jpg',
    'Digital Marketing Specialist': '/images/careers/digital-marketing-specialist.jpg',
    'IAS Officer': '/images/careers/ias-officer.jpg',
    'Bank PO': '/images/careers/bank-po.jpg',
    'Software Developer (IT)': '/images/careers/software-developer-it.jpg',
  };
  
  return careerImages.hasOwnProperty(careerName);
};