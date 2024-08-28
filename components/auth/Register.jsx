'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/modal/Modal';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    position: '',
    identifier: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    pin: ''
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      phone_number: value
    }));
  };

  const takeMeForASpin = () => {
    setShowModal(false);
    router.push('/dashboard');
  };

  const romanNumerals = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
    'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
    'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX',
    'XXXI', 'XXXII', 'XXXIII', 'XXXIV', 'XXXV', 'XXXVI', 'XXXVII', 'XXXVIII', 'XXXIX', 'XL',
    'XLI', 'XLII', 'XLIII', 'XLIV', 'XLV', 'XLVI', 'XLVII', 'XLVIII', 'XLIX', 'L'
  ];

  const amounts = [
    'N50,000', 'N100,000', 'N300,000', 'N500,000', 'N700,000',
    'N1,000,000', 'N1,500,000', 'N2,000,000'
  ];

  const countries = [
    { name: "United States", code: "+1" },
    { name: "Canada", code: "+1" },
    { name: "Nigeria", code: "+234" },
    { name: "United Kingdom", code: "+44" },
    { name: "India", code: "+91" },
    // Add more countries as needed
  ];

  const [selectedCountryCode, setSelectedCountryCode] = useState(countries[0].code);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match", {
        style: {
          fontSize: '13px',
          fontWeight: '500'
        },
        position: 'top-center',
      });
      return;
    }
  
    const request = axios.post('https://www.granularx.com/auth/signup', {
      username: formData.username,
      position: formData.position,
      identifier: formData.identifier,
      phone_number: formData.phone_number,
      password: formData.password,
      pin: parseInt(formData.pin)
    });
  
    toast.promise(
      request,
      {
        loading: 'Creating your account...',
        success: (res) => {
          console.log(res.data);
          return 'Account created successfully!';
        },
        error: (err) => {
          console.error(err);
          return err.response?.data?.error || 'Failed to create account';
        },
      }, {
        style: {
          fontSize: '13px',
          fontWeight: '500'
        },
        position: 'top-center',
      }
    );
  
    try {
      // const response = await request;
      
      // if (response.data.status === 'SUCCESS') {
      //   // Use Next-Auth to sign in the user
      //   const result = await signIn('credentials', {
      //     username: formData.username,
      //     password: formData.password,
      //     redirect: false,
      //   });
  
      //   if (result.ok) {
      //     router.push('/dashboard');
      //   } else {
      //     toast.error('Sign-in failed after registration');
      //   }
      // }
    } catch (error) {
      console.error('Error:', error);
      // Error is already handled by toast.promise, no need for additional error toast here
    }
  }

  // const handleCreateAccount = (e) => {
  //   e.preventDefault();
  //   setShowModal(true);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (selectedAmount) {
  //     setShowSuccess(true);
  //   }
  // };

  return (
    <div className="flex items-center h-dvh bg-white dark:bg-[#1C2626] text-gray-900 dark:text-gray-100">
      {/* Left column */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className='max-w-lg p-4'>
          <div className="mb-8">
            <Image src="/brand/brand.png" alt="GranuloX Logo" width={60} height={60} className="bg-black dark:bg-[#141F1F] p-2 py-3 rounded-lg" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Get Started</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-8">Welcome to GranularX peer bank, you&apos;re a step closer to the future.</p>
          
          <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
            <div className='flex items-center justify-between gap-x-2'>
              <div>
                <label htmlFor="username" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Position</label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
                >
                  {romanNumerals.map((numeral, index) => (
                    <option key={index} value={numeral}>
                      {numeral}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="identifier" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Identifier</label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  placeholder="Identifier"
                  className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Phone Number</label>
              <PhoneInput
                country={'us'}
                value={formData.phone_number}
                onChange={handlePhoneChange}
                placeholder='Enter phone number'
                containerClass="w-full py-1.5 bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e] text-gray-900 dark:text-gray-100"
                inputClass='!border-none !w-full !py-2 !pl-16 !bg-transparent !text-base'
                buttonClass='!bg-transparent hover:!bg-transparent !p-2'
                dropdownClass='dark:!bg-[#141f1f]'
              />
            </div>

            <div className='flex items-center justify-between gap-x-2'>
              <div>
                <label htmlFor="password" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Create Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimum 8 characters"
                  className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Must match password"
                  className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pin" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">PIN</label>
              <input
                type="password"
                id="pin"
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                placeholder="Enter 4-digit PIN"
                maxLength="4"
                className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
              />
            </div>
            
            <div className="flex items-start md:items-center my-2">
              <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-[#7DF9FF29] dark:text-[#7DF9FF] border-[#7DF9FF29] dark:border-[#7DF9FF] rounded" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
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

      {/* {showModal && <Modal takeMeForASpin={takeMeForASpin} showSuccess={showSuccess} setShowModal={setShowModal} selectedAmount={selectedAmount} setSelectedAmount={setSelectedAmount} handleSubmit={handleSubmit} amounts={amounts} />} */}
    </div>
  );
};

export default Register;