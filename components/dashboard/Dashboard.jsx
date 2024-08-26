"use client"

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from './Navbar';
import { Category } from 'iconsax-react';
import { MouseCircle } from 'iconsax-react';
import { EmptyWallet } from 'iconsax-react';
import { Setting2 } from 'iconsax-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const data = [
  { name: 'J', value: 55000 },
  { name: 'F', value: 30000 },
  { name: 'M', value: 35000 },
  { name: 'A', value: 32000 },
  { name: 'M', value: 40000 },
  { name: 'J', value: 45591 },
  { name: 'J', value: 44000 },
  { name: 'A', value: 48000 },
  { name: 'S', value: 47000 },
  { name: 'O', value: 50000 },
  { name: 'N', value: 52000 },
  { name: 'D', value: 54000 },
];

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white dark:bg-[#1C2626] p-4 rounded-lg shadow">
    <div className="flex items-center h-20 space-x-3">
      <div className="bg-gray-100 dark:bg-[#141F1F] p-2 py-3 text-3xl rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-[#666666] dark:text-gray-400">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F2F2F2] dark:bg-[#141F1F]">
      <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      <div className='flex container mt-24 mx-auto'>
        {/* Sidebar */}
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
                      pathname === '/dashboard' ? 'bg-[#141F1F] text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <Category size={24} color="#ffffff" variant="Bulk" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/services"
                    className={`flex items-center space-x-2 p-4 rounded-lg text-base ${
                      pathname === '/services' ? 'bg-[#141F1F] text-white' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <MouseCircle size={24} color="#333333" variant="Bulk" />
                    <span>My Services</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/payments"
                    className={`flex items-center space-x-2 p-4 rounded-lg text-base ${
                      pathname === '/payments' ? 'bg-[#141F1F] text-white' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <EmptyWallet size={24} color="#333333" variant="Bulk" />
                    <span>Payments</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/settings"
                    className={`flex items-center space-x-2 p-4 rounded-lg text-base ${
                      pathname === '/settings' ? 'bg-[#141F1F] text-white' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Setting2 size={24} color="#333333" variant="Bulk" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 text-[#141F1F] dark:text-white overflow-y-auto">
          <div className="p-4 md:p-8">
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="text-gray-500 text-base mb-8">22 December, 2024 • 13:44 AM</p>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
              <StatCard icon="🔒" title="Total Spend" value="₦9,000,000.00" />
              <StatCard icon="📊" title="Active Sales" value="10,000" />
              <StatCard icon="💰" title="Revenue" value="₦9,000,000.00" />
              <StatCard icon="📈" title="Total Profit" value="₦900,000.00" />
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-[#1C2626] p-4 md:p-6 rounded-lg shadow">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Total Transaction</h2>
              <div className="flex space-x-4 mb-4">
                <button className="px-4 py-2 bg-gray-200 dark:bg-[#141F1F] rounded-full text-sm font-medium">12M<span className='hidden md:inline-block'>onths</span></button>
                <button className="px-4 py-2 text-sm font-medium">6M<span className='hidden md:inline-block'>onths</span></button>
                <button className="px-4 py-2 text-sm font-medium">3D<span className='hidden md:inline-block'>ays</span></button>
                <button className="px-4 py-2 text-sm font-medium">7D<span className='hidden md:inline-block'>ays</span></button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    {/* <YAxis /> */}
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;