import React from 'react';

const CareerFlowChart = ({ selectedStream, selectedDegree, relevantCareers }) => {
  if (!selectedStream || !selectedDegree) return null;

  // Define career pathway flowcharts based on stream and degree
  const getCareerPathways = () => {
    const pathways = {
      science: {
        'B.Tech': {
          title: 'Engineering Career Pathways',
          icon: '⚙️',
          paths: [
            {
              phase: 'After B.Tech',
              options: [
                { name: 'Software Engineer', salary: '₹3-50L', growth: 'Tech Lead → CTO' },
                { name: 'Data Scientist', salary: '₹4-60L', growth: 'Lead DS → Chief Data Officer' },
                { name: 'Product Manager', salary: '₹8-80L', growth: 'VP Product → CPO' },
                { name: 'PSU Jobs (BHEL, ONGC)', salary: '₹6-25L', growth: 'Engineer → GM → CMD' }
              ]
            },
            {
              phase: 'Higher Studies',
              options: [
                { name: 'M.Tech → R&D', salary: '₹5-40L', growth: 'Research Scientist' },
                { name: 'MBA → Management', salary: '₹10-100L', growth: 'VP → CEO' },
                { name: 'MS Abroad', salary: '₹20-200L', growth: 'International Career' },
                { name: 'GATE → PSU/PhD', salary: '₹8-50L', growth: 'Senior Researcher' }
              ]
            }
          ]
        },
        'B.Tech/B.Sc': {
          title: 'Tech/Science Career Pathways',
          icon: '🔬',
          paths: [
            {
              phase: 'After Graduation',
              options: [
                { name: 'Software Developer', salary: '₹2-30L', growth: 'Senior Developer → Tech Lead' },
                { name: 'Data Analyst', salary: '₹3-25L', growth: 'Data Scientist → Head Analytics' },
                { name: 'Research Assistant', salary: '₹2-15L', growth: 'Research Scientist' },
                { name: 'Technical Support', salary: '₹2-12L', growth: 'Technical Manager' }
              ]
            },
            {
              phase: 'Specialization',
              options: [
                { name: 'M.Tech/M.Sc → Expert', salary: '₹4-35L', growth: 'Domain Expert' },
                { name: 'Certifications → Industry', salary: '₹3-40L', growth: 'Certified Professional' },
                { name: 'MBA → Tech Management', salary: '₹6-60L', growth: 'CTO' }
              ]
            }
          ]
        },
        'M.B.B.S.': {
          title: 'Medical Career Pathways',
          icon: '🩺',
          paths: [
            {
              phase: 'After MBBS',
              options: [
                { name: 'General Practice', salary: '₹6-30L', growth: 'Senior Consultant' },
                { name: 'Government Doctor', salary: '₹8-25L', growth: 'CMO → Director Health' },
                { name: 'Private Hospital', salary: '₹10-100L', growth: 'Head of Department' },
                { name: 'Medical Officer', salary: '₹7-20L', growth: 'Chief Medical Officer' }
              ]
            },
            {
              phase: 'Specialization',
              options: [
                { name: 'MD/MS → Specialist', salary: '₹15-200L', growth: 'Super Specialist' },
                { name: 'DM/MCh → Super Specialist', salary: '₹25-500L', growth: 'Department Head' },
                { name: 'Medical Research', salary: '₹8-50L', growth: 'Research Director' },
                { name: 'Public Health', salary: '₹10-60L', growth: 'Health Policy Expert' }
              ]
            }
          ]
        },
        'B.Sc': {
          title: 'Science Career Pathways',
          icon: '🔬',
          paths: [
            {
              phase: 'After B.Sc',
              options: [
                { name: 'Lab Technician', salary: '₹2-8L', growth: 'Lab Manager' },
                { name: 'Teaching (TGT)', salary: '₹3-12L', growth: 'Principal' },
                { name: 'Banking/UPSC', salary: '₹4-50L', growth: 'Senior Officer' },
                { name: 'Quality Control', salary: '₹3-15L', growth: 'Quality Manager' }
              ]
            },
            {
              phase: 'Higher Studies',
              options: [
                { name: 'M.Sc → Research', salary: '₹4-30L', growth: 'Scientist' },
                { name: 'B.Ed → Teaching', salary: '₹4-20L', growth: 'Professor' },
                { name: 'PhD → Professor', salary: '₹8-80L', growth: 'Dean → VC' },
                { name: 'Professional Courses', salary: '₹5-40L', growth: 'Industry Expert' }
              ]
            }
          ]
        },
        'B.Arch': {
          title: 'Architecture Career Pathways',
          icon: '🏗️',
          paths: [
            {
              phase: 'After B.Arch',
              options: [
                { name: 'Architect', salary: '₹3-50L', growth: 'Principal Architect' },
                { name: 'Urban Planner', salary: '₹4-40L', growth: 'City Planner' },
                { name: 'Interior Designer', salary: '₹3-35L', growth: 'Design Director' },
                { name: 'Construction Manager', salary: '₹4-30L', growth: 'Project Director' }
              ]
            },
            {
              phase: 'Specialization',
              options: [
                { name: 'M.Arch → Specialist', salary: '₹5-60L', growth: 'Design Head' },
                { name: 'Landscape Architecture', salary: '₹4-45L', growth: 'Environmental Planner' },
                { name: 'Sustainable Design', salary: '₹6-50L', growth: 'Green Building Consultant' },
                { name: 'Heritage Conservation', salary: '₹5-35L', growth: 'Conservation Architect' }
              ]
            }
          ]
        },
        'B.Pharm': {
          title: 'Pharmacy Career Pathways',
          icon: '💊',
          paths: [
            {
              phase: 'After B.Pharm',
              options: [
                { name: 'Community Pharmacist', salary: '₹2-12L', growth: 'Pharmacy Owner' },
                { name: 'Hospital Pharmacist', salary: '₹3-15L', growth: 'Chief Pharmacist' },
                { name: 'Pharmaceutical Industry', salary: '₹4-25L', growth: 'Research Head' },
                { name: 'Drug Inspector', salary: '₹5-20L', growth: 'Assistant Commissioner' }
              ]
            },
            {
              phase: 'Higher Studies',
              options: [
                { name: 'M.Pharm → Research', salary: '₹5-30L', growth: 'Senior Scientist' },
                { name: 'Pharm.D → Clinical', salary: '₹6-40L', growth: 'Clinical Director' },
                { name: 'MBA → Pharma Management', salary: '₹8-60L', growth: 'Country Head' },
                { name: 'PhD → Academic/Research', salary: '₹8-50L', growth: 'Professor' }
              ]
            }
          ]
        },
        'B.Sc/B.Com Statistics': {
          title: 'Statistics Career Pathways',
          icon: '📊',
          paths: [
            {
              phase: 'After Graduation',
              options: [
                { name: 'Data Analyst', salary: '₹3-25L', growth: 'Senior Data Scientist' },
                { name: 'Market Research', salary: '₹3-20L', growth: 'Research Director' },
                { name: 'Quality Control', salary: '₹3-18L', growth: 'Quality Head' },
                { name: 'Government Statistics', salary: '₹4-15L', growth: 'Statistical Officer' }
              ]
            },
            {
              phase: 'Specialization',
              options: [
                { name: 'M.Stat → Research', salary: '₹5-40L', growth: 'Chief Statistician' },
                { name: 'Data Science Certification', salary: '₹6-60L', growth: 'Data Science Head' },
                { name: 'Actuarial Science', salary: '₹8-80L', growth: 'Chief Actuary' },
                { name: 'PhD → Academic', salary: '₹8-50L', growth: 'Professor' }
              ]
            }
          ]
        }
      },
      commerce: {
        'B.Com': {
          title: 'Commerce Career Pathways',
          icon: '💼',
          paths: [
            {
              phase: 'Professional Courses',
              options: [
                { name: 'CA → Big4/CFO', salary: '₹4-75L', growth: 'Partner → CFO' },
                { name: 'CS → Legal Head', salary: '₹3-40L', growth: 'Company Secretary' },
                { name: 'CMA → Cost Analyst', salary: '₹3-35L', growth: 'Finance Head' },
                { name: 'Banking Jobs', salary: '₹3-25L', growth: 'General Manager' }
              ]
            },
            {
              phase: 'Higher Studies',
              options: [
                { name: 'MBA → Management', salary: '₹8-100L', growth: 'VP → CEO' },
                { name: 'M.Com → Teaching', salary: '₹4-25L', growth: 'Professor' },
                { name: 'Banking Exams', salary: '₹4-30L', growth: 'GM → CMD' },
                { name: 'Civil Services', salary: '₹8-50L', growth: 'Secretary' }
              ]
            }
          ]
        },
        'BBA/MBA': {
          title: 'Business Administration Pathways',
          icon: '📊',
          paths: [
            {
              phase: 'After BBA',
              options: [
                { name: 'Marketing Executive', salary: '₹3-25L', growth: 'Marketing Head' },
                { name: 'HR Executive', salary: '₹3-20L', growth: 'CHRO' },
                { name: 'Sales Manager', salary: '₹4-40L', growth: 'Regional Head' },
                { name: 'Operations Executive', salary: '₹3-22L', growth: 'Operations Head' }
              ]
            },
            {
              phase: 'After MBA',
              options: [
                { name: 'Management Consultant', salary: '₹10-150L', growth: 'Partner' },
                { name: 'Investment Banking', salary: '₹15-200L', growth: 'MD → Partner' },
                { name: 'Product Manager', salary: '₹12-100L', growth: 'VP Product → CPO' },
                { name: 'Business Development', salary: '₹8-80L', growth: 'VP Business' }
              ]
            }
          ]
        },
        'MBA': {
          title: 'Master of Business Administration',
          icon: '🎓',
          paths: [
            {
              phase: 'Specialization Areas',
              options: [
                { name: 'Finance → Investment Banking', salary: '₹15-200L', growth: 'MD → Partner' },
                { name: 'Marketing → Brand Manager', salary: '₹10-100L', growth: 'CMO' },
                { name: 'HR → Talent Manager', salary: '₹8-80L', growth: 'CHRO' },
                { name: 'Operations → Process Head', salary: '₹10-90L', growth: 'COO' }
              ]
            },
            {
              phase: 'Leadership Roles',
              options: [
                { name: 'Strategy Consulting', salary: '₹20-300L', growth: 'Partner' },
                { name: 'General Management', salary: '₹15-150L', growth: 'CEO' },
                { name: 'Entrepreneurship', salary: '₹10-1000L', growth: 'Founder → Exit' },
                { name: 'Corporate Strategy', salary: '₹12-120L', growth: 'Chief Strategy Officer' }
              ]
            }
          ]
        },
        'B.A. Economics': {
          title: 'Economics Career Pathways',
          icon: '📈',
          paths: [
            {
              phase: 'After Economics',
              options: [
                { name: 'Economic Analyst', salary: '₹4-35L', growth: 'Chief Economist' },
                { name: 'Policy Research', salary: '₹5-40L', growth: 'Policy Director' },
                { name: 'Banking/RBI', salary: '₹8-50L', growth: 'Deputy Governor' },
                { name: 'Financial Services', salary: '₹4-45L', growth: 'Investment Manager' }
              ]
            },
            {
              phase: 'Higher Studies',
              options: [
                { name: 'MA Economics → Research', salary: '₹6-50L', growth: 'Research Head' },
                { name: 'MBA → Consulting', salary: '₹10-200L', growth: 'Partner' },
                { name: 'PhD → Professor', salary: '₹8-80L', growth: 'Dean' },
                { name: 'Civil Services', salary: '₹8-50L', growth: 'Secretary' }
              ]
            }
          ]
        }
      },
      arts: {
        'B.A.': {
          title: 'Arts & Humanities Pathways',
          icon: '🎨',
          paths: [
            {
              phase: 'After B.A.',
              options: [
                { name: 'Civil Services (UPSC)', salary: '₹8-50L', growth: 'IAS → Chief Secretary' },
                { name: 'Teaching (TGT/PGT)', salary: '₹3-15L', growth: 'Principal' },
                { name: 'Content Writing', salary: '₹2-20L', growth: 'Content Head' },
                { name: 'Social Work', salary: '₹2-15L', growth: 'Program Director' }
              ]
            },
            {
              phase: 'Specialization',
              options: [
                { name: 'M.A. → Research/Teaching', salary: '₹4-30L', growth: 'Professor' },
                { name: 'Journalism → Media', salary: '₹3-50L', growth: 'Editor-in-Chief' },
                { name: 'Public Administration', salary: '₹5-40L', growth: 'Administrative Head' },
                { name: 'Creative Writing', salary: '₹3-100L', growth: 'Published Author' }
              ]
            }
          ]
        },
        'LL.B.': {
          title: 'Legal Career Pathways',
          icon: '⚖️',
          paths: [
            {
              phase: 'After LL.B.',
              options: [
                { name: 'Corporate Lawyer', salary: '₹5-100L', growth: 'Partner' },
                { name: 'Civil Practice', salary: '₹3-50L', growth: 'Senior Advocate' },
                { name: 'Government Legal', salary: '₹6-30L', growth: 'Law Secretary' },
                { name: 'Legal Consultant', salary: '₹4-60L', growth: 'Legal Head' }
              ]
            },
            {
              phase: 'Higher Positions',
              options: [
                { name: 'Judge (Competitive)', salary: '₹15-80L', growth: 'High Court → SC' },
                { name: 'LLM → Specialist', salary: '₹6-200L', growth: 'Legal Expert' },
                { name: 'Corporate Compliance', salary: '₹8-150L', growth: 'Chief Legal Officer' },
                { name: 'International Law', salary: '₹10-300L', growth: 'International Arbitrator' }
              ]
            }
          ]
        },
        'B.A. (Journalism/Mass Communication)': {
          title: 'Media & Communication Pathways',
          icon: '📺',
          paths: [
            {
              phase: 'After Graduation',
              options: [
                { name: 'News Reporter', salary: '₹2-15L', growth: 'Bureau Chief' },
                { name: 'Digital Marketing', salary: '₹3-40L', growth: 'Marketing Head' },
                { name: 'PR Executive', salary: '₹3-30L', growth: 'PR Director' },
                { name: 'Radio Jockey', salary: '₹2-20L', growth: 'Program Director' }
              ]
            },
            {
              phase: 'Specialization',
              options: [
                { name: 'News Anchor', salary: '₹5-100L', growth: 'Prime Time Anchor' },
                { name: 'Film Production', salary: '₹4-500L', growth: 'Producer/Director' },
                { name: 'Content Creator', salary: '₹2-200L', growth: 'Media Entrepreneur' },
                { name: 'Documentary Filmmaker', salary: '₹3-50L', growth: 'Award-winning Director' }
              ]
            }
          ]
        },
        'BFA/B.Des': {
          title: 'Design & Fine Arts Pathways',
          icon: '🎨',
          paths: [
            {
              phase: 'After Graduation',
              options: [
                { name: 'UI/UX Designer', salary: '₹3-40L', growth: 'Design Director' },
                { name: 'Graphic Designer', salary: '₹2-25L', growth: 'Creative Director' },
                { name: 'Fashion Designer', salary: '₹3-100L', growth: 'Fashion House Owner' },
                { name: 'Interior Designer', salary: '₹3-50L', growth: 'Design Consultant' }
              ]
            },
            {
              phase: 'Specialization',
              options: [
                { name: 'Art Director', salary: '₹5-80L', growth: 'Creative Head' },
                { name: 'Product Designer', salary: '₹4-60L', growth: 'Design VP' },
                { name: 'Fine Artist', salary: '₹2-500L', growth: 'Renowned Artist' },
                { name: 'Design Entrepreneur', salary: '₹5-1000L', growth: 'Design Studio Owner' }
              ]
            }
          ]
        },
        'B.A. Psychology': {
          title: 'Psychology Career Pathways',
          icon: '🧠',
          paths: [
            {
              phase: 'After B.A. Psychology',
              options: [
                { name: 'HR Assistant', salary: '₹2-12L', growth: 'HR Manager' },
                { name: 'Social Worker', salary: '₹2-15L', growth: 'Program Director' },
                { name: 'Research Assistant', salary: '₹2-10L', growth: 'Research Coordinator' },
                { name: 'Counselor (Basic)', salary: '₹2-18L', growth: 'Senior Counselor' }
              ]
            },
            {
              phase: 'Higher Studies',
              options: [
                { name: 'M.A. Psychology → Clinical', salary: '₹4-50L', growth: 'Clinical Psychologist' },
                { name: 'M.Phil → Therapist', salary: '₹6-100L', growth: 'Private Practice' },
                { name: 'PhD → Professor/Researcher', salary: '₹8-80L', growth: 'Department Head' },
                { name: 'Organizational Psychology', salary: '₹8-120L', growth: 'Chief People Officer' }
              ]
            }
          ]
        }
      },
      // Government/All Streams careers
      government: {
        'Any Degree': {
          title: 'Government Service Pathways',
          icon: '🏛️',
          paths: [
            {
              phase: 'Civil Services',
              options: [
                { name: 'IAS Officer', salary: '₹8-50L', growth: 'District Collector → Chief Secretary' },
                { name: 'IPS Officer', salary: '₹8-50L', growth: 'SP → DGP' },
                { name: 'IFS Officer', salary: '₹8-50L', growth: 'Ambassador → Foreign Secretary' },
                { name: 'IRS Officer', salary: '₹8-50L', growth: 'Commissioner → CBDT Chairman' }
              ]
            },
            {
              phase: 'Banking & PSUs',
              options: [
                { name: 'Bank PO', salary: '₹4-30L', growth: 'General Manager → CMD' },
                { name: 'Railway Services', salary: '₹5-35L', growth: 'DRM → Railway Board' },
                { name: 'Defense Services', salary: '₹6-40L', growth: 'Colonel → General' },
                { name: 'Public Sector Jobs', salary: '₹5-25L', growth: 'GM → CMD' }
              ]
            }
          ]
        }
      }
    };

    // Handle special cases for government jobs
    if (['IAS Officer', 'Bank PO', 'Software Developer (Government)'].includes(selectedDegree)) {
      return pathways.government['Any Degree'];
    }

    return pathways[selectedStream]?.[selectedDegree];
  };

  const pathway = getCareerPathways();
  if (!pathway) return null;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-8 rounded-2xl mb-8 border border-purple-200 shadow-lg">
      <div className="flex items-center mb-6">
        <div className="text-4xl mr-4">{pathway.icon}</div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{pathway.title}</h3>
          <p className="text-sm text-gray-600">Career progression roadmap for {selectedDegree}</p>
        </div>
      </div>

      <div className="space-y-8">
        {pathway.paths.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="relative">
            {/* Phase Header */}
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {phase.phase}
              </div>
              {phaseIndex < pathway.paths.length - 1 && (
                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 ml-4"></div>
              )}
            </div>

            {/* Career Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-4">
              {phase.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">{option.name}</h4>
                    <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-1 rounded">
                      {option.salary}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="text-blue-500 mr-1">📈</span>
                    <span>{option.growth}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting Arrow for next phase */}
            {phaseIndex < pathway.paths.length - 1 && (
              <div className="flex justify-center my-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Success Tips */}
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-3">💡</span>
          <h4 className="font-bold text-gray-900">Success Tips</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Build relevant skills early through internships and projects</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Network with professionals in your chosen field</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Consider certifications and continuous learning</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Gain practical experience through competitions and hackathons</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerFlowChart;