'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Eye, EyeSlash } from 'iconsax-react';
import { FaCheck } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BASE_URL="https://api.granularx.com";
// const BASE_URL =  "http://localhost:3001"

const Register = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    position: '',
    identifier: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    pin: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const romanNumerals = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
    'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
    'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX',
    'XXXI', 'XXXII', 'XXXIII', 'XXXIV', 'XXXV', 'XXXVI', 'XXXVII', 'XXXVIII', 'XXXIX', 'XL',
    'XLI', 'XLII', 'XLIII', 'XLIV', 'XLV', 'XLVI', 'XLVII', 'XLVIII', 'XLIX', 'L'
  ];

  const validateForm = () => {
    const isNotEmpty = Object.values(formData).every(field => field.trim() !== '');
    const isPasswordValid = passwordValidation.hasMinLength && passwordValidation.hasUppercase && passwordValidation.hasLowerCase && passwordValidation.hasNumber && passwordValidation.hasSpecialChar;
    const isConfirmPasswordMatching = formData.password === formData.confirmPassword;
    const isPinValid = /^\d{4}$/.test(formData.pin);

    const isFormValid = isNotEmpty && isPasswordValid && isConfirmPasswordMatching && isTermsAccepted && isPinValid;
    setIsFormValid(isFormValid);
  };  
  
  useEffect(() => {
    validateForm();
  }, [formData, isTermsAccepted]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordValidation({
        hasMinLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[@$!%*?&]/.test(value),
      });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handlePhoneChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      phone_number: value
    }));
  };

  const handleTermsChange = (e) => {
    setIsTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
   
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
  
    const request = axios.post(`${BASE_URL}/auth/signup`, {
      username: formData.username,
      position: formData.position,
      identifier: formData.identifier,
      phone_number: formData.phone_number,
      password: formData.password,
      pin: parseInt(formData.pin)
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    toast.promise(
      request,
      {
        loading: 'Creating your account...',
        success: (res) => {
          setLoading(false);
          router.push("/auth/signin");
          return 'Account created successfully!';
        },
        error: (err) => {
          setLoading(false);
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
  }

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-[#1C2626] text-gray-900 dark:text-gray-100">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className='max-w-lg p-4'>
          <div className="mb-8">
            <Image src="/brand/brand.png" alt="GranularX Logo" width={60} height={60} className="bg-black dark:bg-[#141F1F] p-2 py-3 rounded-lg" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Get Started</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-8">Welcome to GranularX peer bank, you&apos;re a step closer to the future.</p>
          
          <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
              <div className="w-full sm:w-1/3">
                <label htmlFor="username" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">
                  Username
                </label>
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
              <div className="w-full sm:w-2/3 flex flex-row gap-4 sm:gap-2">
                <div className="w-1/2">
                  <label htmlFor="position" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">
                    Position
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-3.5 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
                  >
                    {romanNumerals.map((numeral, index) => (
                      <option key={index} value={numeral}>
                        {numeral}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label htmlFor="identifier" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">
                    Identify as
                  </label>
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
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Phone Number</label>
              <PhoneInput
                country={'us'} value={formData.phone_number} onChange={handlePhoneChange} placeholder='Enter phone number'
                containerClass="w-full py-1.5 bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e] text-gray-900 dark:text-gray-100"
                inputClass='!border-none !w-full !py-2 !pl-16 !bg-transparent !text-base'
                buttonClass='!bg-transparent hover:!bg-transparent !p-2'
                dropdownClass='dark:!bg-[#141f1f]'
              />
            </div>

            <div className='flex items-center justify-between gap-x-2'>
              <div>
                <label htmlFor="password" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Create Password</label>
                <div className='relative'>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'} autoComplete='on' id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Minimum 8 characters"
                    className="mt-1 block w-full p-3 pr-10 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-1/2 right-3 flex items-center">
                    {isPasswordVisible ? (
                      <Eye size={20} className="text-[#141F1F] dark:text-[#7DF9FF29]" />
                    ) : (
                      <EyeSlash size={20} className="text-[#141F1F] dark:text-[#7DF9FF29]" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Confirm Password</label>
                <div className='relative'>
                  <input
                    type={isConfirmPasswordVisible ? 'text' : 'password'} autoComplete='on' id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Must match password"
                    className="mt-1 block w-full p-3 pr-10 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
                  />
                  <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-1/2 right-3 flex items-center">
                    {isConfirmPasswordVisible ? (
                      <Eye size={20} className="text-[#141F1F] dark:text-[#7DF9FF29]" />
                    ) : (
                      <EyeSlash size={20} className="text-[#141F1F] dark:text-[#7DF9FF29]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {!passwordValidation.hasUppercase || !passwordValidation.hasMinLength || !passwordValidation.hasLowerCase || !passwordValidation.hasNumber || !passwordValidation.hasSpecialChar ? (
              <div className="-mt-4 text-xs md:text-sm text-[#141F1F] dark:text-white">
                <p>Password must include at least:</p>
                <ul className="list-none pl-0 gap-y-1 flex flex-col">
                  <div className='flex gap-x-6 items-center mb-1'>
                    <li className="flex items-center">
                      <div className={`mr-2 border rounded-full ${passwordValidation.hasUppercase ? "p-1 bg-[#11C017] border-none" : "px-2.5 py-0.5"}`}>
                        {passwordValidation.hasUppercase ? (
                          <FaCheck size={14} className="text-white" />
                        ) : (
                            <span>1</span>
                          )}
                      </div>
                      One uppercase character.
                    </li>
                    <li className="flex items-center">
                      <div className={`mr-2 border rounded-full flex items-center justify-center ${passwordValidation.hasLowerCase ? "p-1 bg-[#11C017] border-none" : "px-2 py-0.5"}`}>
                        {passwordValidation.hasLowerCase ? (
                          <FaCheck size={14} className="text-white" />
                        ) : (
                            <span>2</span>
                          )}
                      </div>
                      One lowercase character.
                    </li>
                  </div>
                  <div className='flex gap-x-6 items-center mb-1'>
                    <li className="flex items-center">
                      <div className={`mr-2 border rounded-full flex items-center justify-center ${passwordValidation.hasNumber ? "p-1 bg-[#11C017] border-none" : "px-2 py-0.5"}`}>
                        {passwordValidation.hasNumber ? (
                          <FaCheck size={14} className="text-white" />
                        ) : (
                            <span>3</span>
                          )}
                      </div>
                      One number.
                    </li>
                    <li className="flex items-center">
                      <div className={`mr-2 border rounded-full flex items-center justify-center ${passwordValidation.hasSpecialChar ? "p-1 bg-[#11C017] border-none" : "px-2 py-0.5"}`}>
                        {passwordValidation.hasSpecialChar ? (
                          <FaCheck size={14} className="text-white" />
                        ) : (
                            <span>4</span>
                          )}
                      </div>
                      One special character.
                    </li>
                  </div>
                  <li className="flex items-center">
                      <div className={`mr-2 border rounded-full flex items-center justify-center ${passwordValidation.hasMinLength ? "p-1 bg-[#11C017] border-none" : "px-2 py-0.5"}`}>
                        {passwordValidation.hasMinLength ? (
                          <FaCheck size={14} className="text-white" />
                        ) : (
                            <span>5</span>
                          )}
                      </div>
                      Minimum of 8 characters
                    </li>
                </ul>
              </div>
              ) : null}

            <div>
              <label htmlFor="pin" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">PIN</label>
              <input
                type="text" id="pin" name="pin" value={formData.pin} maxLength={4} onChange={handleInputChange} placeholder="4-digit PIN"
                className="mt-1 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="terms" checked={isTermsAccepted} onChange={handleTermsChange} className="mr-2" />
              <label htmlFor="terms" className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                I have read and agree to GranularX Terms of Service and Privacy Policy
              </label>
            </div>

            <button
              type="submit" disabled={!isFormValid}
              className={`w-full flex justify-center items-center p-3 text-sm mt-2 font-medium rounded-lg ${isFormValid ? 'bg-[#141F1F] dark:bg-[#7DF9FF] text-white dark:text-[#141F1F] hover:bg-gray-800 dark:hover:bg-[#7df8ff93]' : 'bg-gray-400 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed'} transition-all duration-200 ease-in-out`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              <span>{loading ? "Creating your account..." : "Create a peer account"}</span>
            </button>
          </form>
          
          <p className='my-4 mb-2 text-sm text-[#141f1f] dark:text-white'>Already have an account? <Link href={"/auth/signin"} className='font-semibold hover:underline'>Sign in</Link></p>
        </div>
      </div>

      {/* Right column */}
      <div className="w-1/2 hidden gradient-01 m-5 rounded-2xl p-12 h-[800px] text-white md:flex flex-col justify-between">
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
    </div>
  );
};

export default Register;
