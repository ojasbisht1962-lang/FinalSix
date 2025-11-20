// src/routes/LoansPage.jsx

import React, { useState } from 'react';
import { ExternalLink, CreditCard, Percent, Calendar, Star } from 'lucide-react';
import ExpandableCard from '../components/ExpandableCard';
import loansData from '../data/loansData';

const LoansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState('all');
  const [loanAmountRange, setLoanAmountRange] = useState('all');

  const filteredLoans = loansData.filter(loan => {
    const matchesSearch = loan.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.keyFeature.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBank = selectedBank === 'all' || 
                       loan.bankName.toLowerCase().includes(selectedBank.toLowerCase());
    
    const matchesAmount = loanAmountRange === 'all' || 
                         (loanAmountRange === 'low' && loan.loanAmount.includes('15') || loan.loanAmount.includes('20')) ||
                         (loanAmountRange === 'medium' && loan.loanAmount.includes('30') || loan.loanAmount.includes('50')) ||
                         (loanAmountRange === 'high' && loan.loanAmount.includes('75') || loan.loanAmount.includes('1.5'));
    
    return matchesSearch && matchesBank && matchesAmount;
  });

  const LoanCard = ({ loan }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const expandedContent = (
      <div className="space-y-4 animate-fadeIn">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Eligibility & Requirements</h4>
              <p className="text-gray-600 text-sm">{loan.eligibility}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Processing Fee</h4>
              <p className="text-gray-600 text-sm">{loan.processingFee}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Collateral</h4>
              <p className="text-gray-600 text-sm">{loan.collateral}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Additional Benefits</h4>
              <ul className="space-y-1">
                {loan.additionalBenefits.map((benefit, index) => (
                  <li key={index} className="text-gray-600 text-sm flex items-start">
                    <Star className="h-3 w-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Required Documents</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {loan.documents.map((doc, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                {doc}
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <a
            href={loan.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <span>Visit Official Website</span>
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </div>
      </div>
    );

    return (
      <ExpandableCard
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        expandedContent={expandedContent}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
      >
        <div className="p-6">
          <div className="flex items-start mb-4">
            <div className="flex items-center flex-1">
              <div className={`p-3 rounded-lg ${loan.color} mr-4`}>
                <span className="text-2xl">{loan.logo}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{loan.bankName}</h3>
                <p className="text-gray-600 text-sm">{loan.keyFeature}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center">
              <Percent className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Interest Rate</p>
                <p className="font-semibold text-gray-900">{loan.interestRate}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Loan Amount</p>
                <p className="font-semibold text-gray-900">{loan.loanAmount}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Repayment Tenure</p>
                <p className="font-semibold text-gray-900">{loan.repaymentTenure}</p>
              </div>
            </div>
          </div>
        </div>
      </ExpandableCard>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Education Loans</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore education loan options to fund your future.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Loans
              </label>
              <input
                type="text"
                placeholder="Search by bank name or feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Type
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Banks</option>
                <option value="sbi">SBI</option>
                <option value="canara">Canara Bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="pnb">Punjab National Bank</option>
                <option value="baroda">Bank of Baroda</option>
                <option value="govt">Government Schemes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount Range
              </label>
              <select
                value={loanAmountRange}
                onChange={(e) => setLoanAmountRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Amounts</option>
                <option value="low">Up to ₹20 Lakh</option>
                <option value="medium">₹20 Lakh - ₹50 Lakh</option>
                <option value="high">Above ₹50 Lakh</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredLoans.length}</span> loan options
          </p>
        </div>

        {/* Loans Grid */}
        <div className="space-y-6">
          {filteredLoans.length > 0 ? (
            filteredLoans.map(loan => (
              <LoanCard key={loan.id} loan={loan} />
            ))
          ) : (
            <div className="text-center py-12">
              <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No loans found</h3>
              <p className="text-gray-500">Try adjusting your search criteria to see more options.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoansPage;