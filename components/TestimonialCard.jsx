import Image from 'next/image';
import React from 'react';

const TestimonialCard = ({ flag, name, text }) => {
  return (
    <div className="bg-[#F6F6F6] dark:bg-[#141F1F] rounded-2xl p-10 text-left text-[#141F1F] dark:text-white hover:text-white hover:bg-[#141F1F] dark:hover:bg-[#7DF9FF] dark:hover:text-[#141F1F] transition duration-200 ease-in-out">
      <Image src={flag} alt={`${name} flag`} width={100} height={100} className="w-14 mb-4" />
      <h3 className="text-lg mb-4 font-semibold">{name}</h3>
      <p className="text-base mt-2">{text}</p>
    </div>
  );
};

export default TestimonialCard;