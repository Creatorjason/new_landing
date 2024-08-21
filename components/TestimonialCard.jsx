import React from 'react';

const TestimonialCard = ({ flag, name, text }) => {
  return (
    <div className="bg-[#F6F6F6] rounded-2xl p-10 text-left">
      <img src={flag} alt={`${name} flag`} className="w-14 mb-4" />
      <h3 className="text-lg text-[#141F1F] mb-4 font-semibold">{name}</h3>
      <p className="text-[#52525B] text-base mt-2">{text}</p>
    </div>
  );
};

export default TestimonialCard;
