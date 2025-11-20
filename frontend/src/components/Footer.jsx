// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-4 md:px-8 text-center text-gray-600 text-sm">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/" className="hover:text-blue-600">Privacy Policy</Link>
          <Link to="/" className="hover:text-blue-600">Terms of Service</Link>
          <Link to="/" className="hover:text-blue-600">Contact Us</Link>
        </div>
        <p>&copy; 2024 CareerCompass. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;