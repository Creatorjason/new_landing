'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import 'react-phone-input-2/lib/style.css';
import toast from 'react-hot-toast';
import { Eye, EyeSlash } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authenticate } from '@/lib/auth-actions';

const Signin = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    uns: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(
      authenticate(formData),
      {
        loading: 'Signing you in...',
        success: (data) => {
          if (data.success) {
            router.push("/dashboard");
            return 'Authentication successful. Welcome back!';
          } else {
            throw new Error(data.error || 'Authentication failed');
          }
        },
        error: (err) => {
          console.error(err);
          return err.message || 'Failed to sign in';
        },
      },
      {
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
        <div className='w-full max-w-lg p-4'>
          <div className="mb-8">
            <Image src="/brand/brand.png" alt="GranuloX Logo" width={60} height={60} className="bg-black dark:bg-[#141F1F] p-2 py-3 rounded-lg" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-8">Please, sign-in to your account to continue.</p>
          
          <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="username" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">
                Unique Naming System (UNS)
              </label>
              <input
                type="text"
                id="uns"
                name="uns"
                value={formData.uns}
                onChange={handleInputChange}
                placeholder="Enter your UNS"
                className="mt-1 mb-2 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
              />
              <small className='font-medium text-xs mt-2 text-green-800 bg-green-50 px-3 py-1 rounded-full'>UNS Format: Username.Position.Identifier</small>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Password</label>
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

            <button
              type="submit"
              className={`w-full p-3 text-sm mt-2 font-medium rounded-lg bg-[#141F1F] dark:bg-[#7DF9FF] text-white dark:text-[#141F1F] hover:bg-gray-800 dark:hover:bg-[#7df8ff93] transition-all duration-200 ease-in-out`}
            >
              Sign in
            </button>
          </form>

          <p className='my-4 mb-2 text-sm text-[#141f1f] dark:text-white'>Don&apos;t have an account? <Link href={"/auth/signup"} className='font-semibold hover:underline'>Sign Up</Link></p>
        </div>
      </div>

      {/* Right column */}
      <div className="w-1/2 hidden gradient-01 m-5 rounded-2xl p-12 h-[95%] text-white md:flex flex-col justify-between">
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

export default Signin;
