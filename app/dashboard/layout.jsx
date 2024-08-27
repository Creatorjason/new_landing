// app/dashboard/layout.js
"use client"

import React, { useState } from 'react';
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F2F2F2] dark:bg-[#141F1F]">
      <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      <div className='flex container mt-24 mx-auto'>
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} />
        
        {/* Main content */}
        <div className="flex-1 text-[#141F1F] dark:text-white overflow-y-auto">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}