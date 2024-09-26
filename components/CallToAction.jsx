import Link from 'next/link';
import React from 'react';

const CheckItem = ({ text }) => (
  <div className='flex items-center gap-x-2 mb-4'>
    <div className='bg-[#7DF9FF] rounded-full w-max p-1 flex items-center justify-center'>
      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.66406 5.89054L5.4736 9.93994L12.3307 1.93994" stroke="#111111" strokeWidth="1.5" strokeLinecap="square"/>
      </svg>
    </div>
    <span className='font-medium tracking-wide'>{text}</span>
  </div>
);

const CallToAction = () => {
  return (
    <section className="bg-[#7DF9FF2E] dark:bg-[#1C2626] text-[#111111] p-10 mx-4 md:mx-10 md:p-16 lg:p-20 mb-16 rounded-2xl flex flex-col items-center justify-center">
      <div className='w-full max-w-md lg:max-w-none'>
        <h2 className="text-4xl md:text-5xl lg:text-7xl max-w-[12ch] mb-8 font-semibold text-left">
          Sign up now to get started.
        </h2>
        <div className='mb-8 lg:mb-0'>
          <CheckItem text="Free account" />
          <CheckItem text="Private & Secure" />
          <CheckItem text="Personalized to you" />
        </div>
        <div className='flex justify-start'>
          <Link href={"/auth/signup"} className="text-white bg-[#141F1F] dark:bg-white dark:text-[#1C2626] py-3 px-9 rounded-full font-medium hover:bg-opacity-90 transition duration-200">
            Sign Up Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;