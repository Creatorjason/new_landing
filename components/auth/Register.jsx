'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/modal/Modal';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const takeMeForASpin = () => {
    setShowModal(false);
    router.push('/dashboard');
  };

  const amounts = [
    'N50,000', 'N100,000', 'N300,000', 'N500,000', 'N700,000',
    'N1,000,000', 'N1,500,000', 'N2,000,000'
  ];

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAmount) {
      setShowSuccess(true);
    }
  };

  return (
    <div className="flex items-center h-dvh bg-white dark:bg-[#1C2626] text-gray-900 dark:text-gray-100">
      {/* Left column */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className='max-w-lg p-4'>
          <div className="mb-8">
            <Image src="/brand/brand2.png" alt="GranuloX Logo" width={60} height={60} className="bg-black dark:bg-[#141F1F] p-2 py-3 rounded-lg" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Get Started</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-8">Welcome to GranularX peer bank, you&apos;re a step closer to the future.</p>
          
          <form className="flex flex-col gap-y-6" onSubmit={handleCreateAccount}>
            <div>
              <label htmlFor="bvn" className="block text-base mb-1 font-medium text-[#141F1F] dark:text-white">Bank Verification Number (BVN)</label>
              <input type="text" id="bvn" name="bvn" placeholder="Enter your BVN" className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]" />
            </div>
            <div>
              <label htmlFor="iban" className="block text-base mb-1 font-medium text-[#141F1F] dark:text-white">International Bank Account Number (IBAN)</label>
              <input type="text" id="iban" name="iban" placeholder="Enter your IBAN" className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7DF9FF]" />
            </div>
            <div>
              <label htmlFor="nin" className="block text-base mb-1 font-medium text-[#141F1F] dark:text-white">National Identification Number (NIN)</label>
              <input type="text" id="nin" name="nin" placeholder="Enter your NIN" className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7DF9FF]" />
            </div>
            <div className="flex items-start md:items-center my-4">
              <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-[#7DF9FF29] dark:text-[#7DF9FF] border-[#7DF9FF29] dark:border-[#7DF9FF] rounded" />
              <label htmlFor="terms" className="ml-2 block text-xs md:text-sm text-gray-900 dark:text-gray-100">
                I have read and agree to GranularX Terms of Service and Privacy Policy
              </label>
            </div>
            <button type="submit" className="w-full transition-all duration-300 ease-in-out py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-[#141F1F] bg-black dark:bg-[#7DF9FF] hover:bg-gray-800 dark:hover:bg-[#7df8ff93] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-[#7DF9FF]">
              Create a peer account
            </button>
          </form>
        </div>
      </div>
      
      {/* Right column */}
      <div className="w-1/2 hidden gradient-01 m-5 my-6 rounded-2xl p-12 h-[97%] text-white md:flex flex-col justify-between">
        <h2 className="text-5xl font-bold leading-tight mb-12">
          Enter<br />
          the Future<br />
          of Payments,<br />
          today
        </h2>
        
        <div className="max-w-sm self-end justify-end">
          <Image src={"/brand/register.svg"} width={100} height={100} alt='Register Image' className='w-full h-full' />
        </div>
      </div>

      {showModal && <Modal takeMeForASpin={takeMeForASpin} showSuccess={showSuccess} setShowModal={setShowModal} selectedAmount={selectedAmount} setSelectedAmount={setSelectedAmount} handleSubmit={handleSubmit} amounts={amounts} />}
    </div>
  );
};

export default Register;