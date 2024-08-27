// app/components/Sidebar.js
"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category, MouseCircle, EmptyWallet, Setting2 } from 'iconsax-react';

const Sidebar = ({ isMobileMenuOpen }) => {
  const pathname = usePathname();

  return (
    <div className={`w-64 bg-white dark:bg-[#1C2626] transition-all duration-300 ease-in-out sm:relative sm:w-64 md:w-1/4 lg:w-1/5 ${
      isMobileMenuOpen ? "fixed sm:relative sm:translate-x-0 bottom-0 top-24 z-50 translate-x-0" : "fixed sm:relative -translate-x-full sm:translate-x-0"}`}
    >
      <div className="p-4">
        <nav className='mt-6'>
          <ul>
            <li className="mb-2">
              <Link
                href="/dashboard"
                className={`flex items-center space-x-2 p-4 rounded-lg text-base ${
                  pathname === '/dashboard' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <Category size={24} variant="Bulk" className={`${pathname === '/dashboard' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/dashboard/wallet"
                className={`flex items-center space-x-2 p-4 rounded-lg text-base ${
                  pathname === '/dashboard/wallet' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <EmptyWallet size={24} className={`${pathname === '/dashboard/wallet' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`} variant="Bulk" />
                <span>Wallet</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/dashboard/payments"
                className={`flex items-center space-x-2 p-4 rounded-lg text-base ${
                  pathname === '/dashboard/payments' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <MouseCircle size={24} className={`${pathname === '/dashboard/payments' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`} variant="Bulk" />
                <span>Payments</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/dashboard/settings"
                className={`flex items-center space-x-2 p-4 rounded-lg text-base ${
                  pathname === '/dashboard/settings' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <Setting2 size={24} className={`${pathname === '/dashboard/settings' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`} variant="Bulk" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;