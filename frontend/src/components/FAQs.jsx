// src/components/FAQs.jsx

import React from 'react';

const FAQs = () => {
  const faqs = [
    {
      question: "What is Career Compass?",
      answer: "Career Compass is a career guidance platform that helps students and graduates discover their ideal career path by analyzing their interests and skills through a personalized quiz."
    },
    {
      question: "How does the quiz work?",
      answer: "The quiz asks a series of questions about your personality, interests, and academic strengths. Based on your answers, it suggests a suitable academic stream, degrees, and potential career options."
    },
    {
      question: "Is my data safe?",
      answer: "Yes, we use a secure database to store your quiz results anonymously. Your personal information is not collected or shared with third parties."
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-xl font-semibold text-blue-600 mb-2">{faq.question}</h4>
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQs;