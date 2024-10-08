import React from 'react';
import TestimonialCard from './TestimonialCard';
import Image from 'next/image';

const Testimonials = () => {
  return (
    <section className="p-6 md:py-12 md:pb-6 dark:bg-[#1C2626] mb-16">
      <div className="flex justify-between items-center mb-10">
        <div className='p-2 px-6 rounded-full bg-[#141F1F14] dark:bg-[#7DF9FF33] border border-[#0000001F] dark:border-[#7DF9FF1F] flex items-center gap-x-2'>
          <Image src={"/badge.png"} width={18} height={18} alt='Badge' />
          <span className='text-[#141F1F] dark:text-[#7DF9FF] text-base'>Testimonials</span>
        </div>

        <div className='flex items-center gap-x-2 md:gap-x-6'>
          <button className='bg-[#F5F5F5]/80 dark:bg-[#141F1F]/80 hover:bg-[#F5F5F5] dark:hover:bg-[#141F1F] transition duration-200 ease-in-out p-3 md:p-4 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#141F1F] dark:text-[#7DF9FF]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button className='bg-[#141F1F]/85 dark:bg-[#7DF9FF]/85 hover:bg-[#141F1F] dark:hover:bg-[#7DF9FF] transition duration-200 ease-in-out p-3 md:p-4 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white dark:text-[#141F1F]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        <TestimonialCard
          flag="/flags/nigeria.png"
          name="Jason Charles"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis."
        />
        <TestimonialCard
          flag="/flags/usa.png"
          name="Charles Emmanuel"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis."
        />
        <TestimonialCard
          flag="/flags/nigeria.png"
          name="Gbenro Blessing"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam pretium orci dui sagittis."
        />
      </div>
    </section>
  );
};

export default Testimonials;