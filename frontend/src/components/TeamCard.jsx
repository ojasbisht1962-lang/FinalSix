import React from 'react';

const TeamCard = ({ member }) => {
  const { name, role, expertise, image } = member;
  
  return (
    <div className="text-center group">
      <div className="relative mb-6 inline-block">
        <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-orange-200 to-pink-200 p-1 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-orange-300 to-pink-300 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
              {image ? (
                <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-gray-600">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-teal-600 font-medium mb-3">{role}</p>
      <p className="text-gray-600 text-sm">{expertise}</p>
    </div>
  );
};

export default TeamCard;