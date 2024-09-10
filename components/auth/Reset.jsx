'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import 'react-phone-input-2/lib/style.css';
import toast from 'react-hot-toast';
import { Eye, EyeSlash } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

const Reset = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    uns: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

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
    setLoading(true);

    toast.promise(
      signIn('credentials', {
        redirect: false,
        uns: formData.uns,
        password: formData.password,
      }),
      {
        loading: 'Sending recovery code...',
        success: (result) => {
          setLoading(false);
          if (result?.error) {
            throw new Error(result.error);
          }
          router.push('/dashboard');
          return 'Recovery code sent!';
        },
        error: (err) => {
          setLoading(false);
          return 'Invalid UNS or password. Please try again.';
        }
      }
    );
  };

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-[#1C2626] text-gray-900 dark:text-gray-100">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className='w-full max-w-lg p-4'>
          <div className="mb-8">
            <Image src="/brand/brand.png" alt="GranuloX Logo" width={60} height={60} className="bg-black dark:bg-[#141F1F] p-2 py-3 rounded-lg" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Account Recovery</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-8">Enter your email to regain access to your account.</p>
          
          <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="username" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">
                Email Address
              </label>
              <input
                type="text"
                id="uns"
                name="uns"
                value={formData.uns}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="mt-1 mb-2 block w-full p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className={`w-full flex items-center justify-center p-3 text-sm mt-2 font-medium rounded-lg bg-[#141F1F] dark:bg-[#7DF9FF] text-white dark:text-[#141F1F] hover:bg-gray-800 dark:hover:bg-[#7df8ff93] transition-all duration-200 ease-in-out`}
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
              <span>{loading ? "Sending recovery code..." : "Send recovery code"}</span>
            </button>
          </form>

          <p className='my-4 mb-2 text-sm text-[#141f1f] dark:text-white'>Remembered your password? <Link href={"/auth/signin"} className='font-semibold hover:underline'>Sign In</Link></p>
        </div>
      </div>

      {/* Right column */}
      <div className="w-1/2 hidden gradient-01 m-5 rounded-2xl p-12 h-[95%] text-white md:flex flex-col justify-between">
        <h2 className="text-5xl font-bold leading-tight mb-12">
          Recover<br />
          your account<br />
          and pick up where<br />
          you left off.
        </h2>
        
        <div className="max-w-sm self-end justify-end">
          <Image src={"/brand/register.svg"} width={100} height={100} alt='Register Image' className='w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default Reset;