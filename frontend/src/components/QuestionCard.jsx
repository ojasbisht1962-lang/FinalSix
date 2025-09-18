import React from 'react';

const QuestionCard = ({ question, selectedAnswer, onAnswerChange }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 max-w-4xl mx-auto">
      {/* Question Text */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-relaxed">
          {question?.text || "Question text not available"}
        </h3>
        <p className="text-lg text-gray-600">Select the option that best applies to you.</p>
      </div>
      
      {/* Options */}
      <div className="grid gap-4">
        {question?.options?.map((option, index) => (
          <label 
            key={index} 
            className={`
              group p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
              ${selectedAnswer === option 
                ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-md' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }
            `}
          >
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerChange(question.id, option)}
              className="hidden"
            />
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{option}</span>
              <div className={`
                w-6 h-6 rounded-full border-2 transition-all duration-200
                ${selectedAnswer === option 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-400 group-hover:border-blue-400'
                }
              `}>
                {selectedAnswer === option && (
                  <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;