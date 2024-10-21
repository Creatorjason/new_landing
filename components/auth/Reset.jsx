'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Eye, EyeSlash } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OTPInput from './OTPInput';
import axios from 'axios'; // Make sure to import axios

const Reset = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    resetCode: '',
    newPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasSpecial: false,
    hasNumber: false,
    hasUpper: false,
    hasLower: false,
  });
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);

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

  const handleOTPComplete = (value) => {
    setFormData(prevState => ({
      ...prevState,
      resetCode: value
    }));
  };

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      minLength: password.length >= 10,
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
    });
  };

  useEffect(() => {
    checkPasswordStrength(formData.newPassword);
  }, [formData.newPassword]);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const sendResetCode = async (email) => {
    try {
      const response = await axios.post('https://api.granularx.com/auth/reset-password?reset_type=otp', {
        email: email
      });

      if (response.data.status === "SUCCESS") {
        setStep(2);
        setCountdown(120);
        setCanResend(false);
        return 'Recovery code sent!';
      } else {
        throw new Error(response.data.error || 'Failed to send recovery code');
      }
    } catch (error) {
      console.error('Error sending reset code:', error);
      throw error;
    }
  };

  const verifyResetCode = async (email, token) => {
    try {
      const response = await axios.post('https://api.granularx.com/auth/confirm-reset-password', {
        email: email,
        token: token
      });

      if (response.data.status === "SUCCESS") {
        return 'Reset code verified successfully!';
      } else {
        throw new Error(response.data.error || 'Failed to verify reset code');
      }
    } catch (error) {
      console.error('Error verifying reset code:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (step === 1) {
      toast.promise(
        sendResetCode(formData.email),
        {
          loading: 'Sending recovery code...',
          success: (message) => {
            setLoading(false);
            return message;
          },
          error: (err) => {
            setLoading(false);
            return err.message || 'Failed to send recovery code. Please try again.';
          },
        }
      );
    } else if (step === 2) {
      toast.promise(
        verifyResetCode(formData.email, formData.resetCode),
        {
          loading: 'Verifying reset code...',
          success: (message) => {
            setLoading(false);
            setStep(3);
            return message;
          },
          error: (err) => {
            setLoading(false);
            return err.message || 'Failed to verify reset code. Please try again.';
          },
        }
      );
    } else if (step === 3) {
      // Reset password
      // Implement API call for password reset here
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'Resetting password...',
          success: () => {
            setLoading(false);
            setStep(4);
            return 'Password reset successfully!';
          },
          error: 'Failed to reset password. Please try again.',
        }
      );
    }
  };

  const handleResendCode = () => {
    toast.promise(
      sendResetCode(formData.email),
      {
        loading: 'Resending recovery code...',
        success: () => {
          setCountdown(120);
          setCanResend(false);
          return 'Recovery code resent!';
        },
        error: 'Failed to resend recovery code. Please try again.',
      }
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className='mb-6'>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Account Recovery</h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Enter your email to regain access to your account.</p>
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="mt-1 mb-2 block w-full text-sm p-3 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className='mb-6'>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Enter Reset Code</h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">A Reset Code was sent to {formData.email}</p>
            </div>
            <div className="w-full">
              <label htmlFor="resetCode" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">
                Reset Code
              </label>
              <OTPInput
                length={6}
                onComplete={handleOTPComplete}
              />
              <p className="text-sm font-medium text-gray-500 mt-4">
                {countdown > 0 ? (
                  <span>Resend code in <span className='font-bold text-green-600'>{Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</span></span>
                ) : canResend ? (
                  <>Didn&apos;t receive the code? <button type="button" onClick={handleResendCode} className="text-[#141f1f] font-medium hover:underline">Resend</button></>
                ) : null}
              </p>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className='mb-6'>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Create New Password</h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Enter your new password below.</p>
            </div>
            <div className="w-full relative">
              <label htmlFor="newPassword" className="block text-sm md:text-base mb-1 font-medium text-[#141F1F] dark:text-white">
                New Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="mt-1 mb-2 block w-full p-3 pr-10 transition-all duration-200 ease-in-out bg-gray-100 dark:bg-[#141F1F] border border-[#7DF9FF29] dark:border-[#7DF9FF29] rounded-md shadow-sm shadow-[#1018280D] focus:outline-none focus:border-[#141F1F] dark:focus:border-[#7df8ff8e]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 text-gray-500"
              >
                {isPasswordVisible ? <EyeSlash size="20" /> : <Eye size="20" />}
              </button>
            </div>
            <div className="text-xs mb-2 text-gray-500 dark:text-gray-400">
              <p className={passwordStrength.minLength ? "text-green-500" : ""}>
                • Minimum 10 characters
              </p>
              <p className={passwordStrength.hasSpecial ? "text-green-500" : ""}>
                • At least one special character
              </p>
              <p className={passwordStrength.hasNumber ? "text-green-500" : ""}>
                • At least one number
              </p>
              <p className={passwordStrength.hasUpper ? "text-green-500" : ""}>
                • At least one uppercase letter
              </p>
              <p className={passwordStrength.hasLower ? "text-green-500" : ""}>
                • At least one lowercase letter
              </p>
            </div>
          </>
        );
      case 4:
        return (
          <div className="text-center">
            <Image src="/brand/brand.png" alt="GranuloX Logo" width={60} height={60} className="mx-auto mb-4 bg-black dark:bg-[#141F1F] p-2 py-3 rounded-lg" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#141F1F] dark:text-white">Password Reset Successfully</h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-8">Please return to the login page to sign in with your new password.</p>
            <Link href="/auth/signin" className="w-full inline-block p-3 text-sm mt-2 font-medium rounded-lg bg-[#141F1F] dark:bg-[#7DF9FF] text-white dark:text-[#141F1F] hover:bg-gray-800 dark:hover:bg-[#7df8ff93] transition-all duration-200 ease-in-out text-center">
              Back to Login
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-[#1C2626] text-gray-900 dark:text-gray-100">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className='w-full max-w-lg p-4'>
          {step < 4 && (
            <div className="mb-8">
              <Image src="/brand/brand.png" alt="GranuloX Logo" width={60} height={60} className="bg-black dark:bg-[#141F1F] p-2 py-3 rounded-lg" />
            </div>
          )}
          
          <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
            {renderStep()}
            
            {step < 4 && (
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center p-3 text-sm mt-2 font-medium rounded-lg bg-[#141F1F] dark:bg-[#7DF9FF] text-white dark:text-[#141F1F] hover:bg-gray-800 dark:hover:bg-[#7df8ff93] transition-all duration-200 ease-in-out`}
              >
                {loading ? "Processing..." : "Continue"}
              </button>
            )}
          </form>

          {step === 1 && (
            <p className='my-4 mb-2 text-sm text-[#141f1f] dark:text-white'>Remembered your password? <Link href={"/auth/signin"} className='font-semibold hover:underline'>Sign In</Link></p>
          )}
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
