'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import OTPInput from './OTPInput';  // Make sure to import the OTPInput component

const BASE_URL = "https://api.granularx.com";

const Verify = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP", {
        style: { fontSize: '13px', fontWeight: '500' },
        position: 'top-center',
      });
      setLoading(false);
      return;
    }

    const storedEmail = localStorage.getItem('userEmail');
    
    if (!storedEmail) {
      toast.error("Email not found. Please try signing up again.", {
        style: { fontSize: '13px', fontWeight: '500' },
        position: 'top-center',
      });
      setLoading(false);
      return;
    }
  
    const request = axios.post(`${BASE_URL}/auth/verify-email`, {
      email: storedEmail,
      otp: otp,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
  
    toast.promise(
      request,
      {
        loading: 'Validating your account...',
        success: (res) => {
          setLoading(false);
          localStorage.removeItem('userEmail');
          router.push("/auth/signin");
          return 'Account validated successfully!';
        },
        error: (err) => {
          setLoading(false);
          console.error(err);
          return err.response?.data?.error || 'Failed to validate account';
        },
      },
      {
        style: { fontSize: '13px', fontWeight: '500' },
        position: 'top-center',
      }
    );
  }

  const handleResendOTP = async () => {
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      toast.error("Email or username not found. Please try signing up again.", {
        style: { fontSize: '13px', fontWeight: '500' },
        position: 'top-center',
      });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/resend-otp`, {
        email: storedEmail,
      });

      if (response.data.status === "SUCCESS") {
        toast.success("OTP resent successfully!", {
          style: { fontSize: '13px', fontWeight: '500' },
          position: 'top-center',
        });
        setResendTimer(300);  // Start a 5-minute timer
      } else {
        throw new Error(response.data.error || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP", {
        style: { fontSize: '13px', fontWeight: '500' },
        position: 'top-center',
      });
    }
  }

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-[#1C2626] text-gray-900 dark:text-gray-100">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className='w-full max-w-lg p-4'>
          <div className="mb-8">
            <Image src="/brand/brand.png" alt="GranuloX Logo" width={60} height={60} className="bg-black dark:bg-[#141F1F] p-2 py-3 rounded-lg" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Verify your account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-8">You&apos;re almost there! Kindly enter the OTP sent to your email.</p>
          
          <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="otp" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">Enter your OTP</label>
              <OTPInput
                length={6}
                onComplete={(value) => setOtp(value)}
              />
            </div>

            <button
              type="submit" disabled={loading || otp.length !== 6}
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
              <span>{loading ? "Validating your OTP..." : "Verify account"}</span>
            </button>
          </form>

          <div className="mt-4 text-center">
            {resendTimer > 0 ? (
              <p>Resend OTP in {resendTimer} seconds</p>
            ) : (
              <div className='flex items-center justify-center gap-x-2'>
                <p className="text-sm">No OTP received yet?</p>
                <button onClick={handleResendOTP} className="text-[#141f1f] border-b-4 transition-all ease-in-out duration-200 text-sm font-semibold hover:border-b-[#141f1f]">
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="w-1/2 hidden gradient-01 m-5 rounded-2xl p-12 h-[95%] text-white md:flex flex-col justify-between">
        <h2 className="text-5xl font-bold leading-tight mb-12">
          You&apos;re<br />
          almost done!<br />
          Just one more<br />
          step.
        </h2>
        
        <div className="max-w-sm self-end justify-end">
          <Image src={"/brand/register.svg"} width={100} height={100} alt='Register Image' className='w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default Verify;
