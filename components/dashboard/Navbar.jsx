import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { HambergerMenu, LogoutCurve, ProfileCircle, Setting2 } from 'iconsax-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from 'iconsax-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = ({ setIsMobileMenuOpen, isMobileMenuOpen }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname()
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: '/auth/signin' });
      router.push('/auth/signin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle any error, perhaps show a notification to the user
    }
  };

  return (
    <nav className={`bg-white fixed z-10 top-0 left-0 w-full ${pathname === "/messages" ? "hidden sm:block" : ""} dark:bg-[#1C2626] py-2 shadow-sm transition-colors duration-200`}>
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className='flex items-center'>
            {/* Mobile Menu Button */}
            {pathname === "/messages" && (
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='block sm:hidden'>
                <HambergerMenu size="20" color="#141f1f"/>
              </button>
            )}
            
            {/* Logo Section */}
            <Link href={"/"} className="flex items-center">
              <Image src="/brand/brand.png" alt="Granula X" width={32} height={32} />
              <span className="ml-2 text-lg md:text-xl font-semibold text-[#141F1F] dark:text-white">GranularX</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center gap-x-2 md:gap-x-4">
            {session && (
              <span className="bg-green-100 hidden md:inline-block text-green-800 text-sm font-medium mr-2 px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">Active</span>
            )}

            <button                                                                                                       
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-gray-600 dark:text-white"
            >
              <span className="sr-only">Toggle theme</span>
              {theme === 'dark' ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <Notification size={24} className="text-[#333333] dark:text-white" variant="Bulk"/>

            {session ? (
              <div className="flex items-center rounded-full p-1.5 relative bg-[#F2F2F2] dark:bg-[#0E1515]">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-[#1C2626] dark:text-white text-gray-700 flex items-center justify-center">
                    <span className="font-medium text-base">{session.user.username ? session.user.username[0].toUpperCase() : 'U'}</span>
                  </div>
                  <span className="hidden md:inline-block ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">{session.user.username || 'User'}</span>
                  <svg
                    className={`hidden md:inline-block ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="origin-top-right absolute top-16 right-0 mt-2 w-48 flex flex-col p-4 px-2 rounded-md shadow-lg bg-white dark:bg-[#1C2626] ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link href="/dashboard/profile" className="flex items-center gap-x-2 p-2 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
                        <ProfileCircle size={24} className="text-[#333333] dark:text-gray-50" variant="Bulk"/>
                        <span>Profile</span>
                      </Link>
                      <Link href="/dashboard/settings" className="flex items-center gap-x-2 p-2 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
                        <Setting2 size={24} className="text-[#333333] dark:text-gray-50" variant="Bulk" />
                        <span>Settings</span>
                      </Link>
                      <button onClick={handleSignOut} className="flex items-center gap-x-2 p-2 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
                        <LogoutCurve size={24} className="text-[#333333] dark:text-gray-50" variant="Bulk"/>
                        <span>Log Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/auth/signin" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;