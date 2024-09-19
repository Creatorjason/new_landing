"use client"

import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
import BottomNavigation from "@/components/dashboard/BottomNavigation"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function DashboardContent({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
  }

  if (status === 'loading') {
    return <div className='h-screen flex items-center justify-center'>Loading...</div>; // Or your custom loading component
  }

  if (!session) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex h-screen bg-[#F2F2F2] dark:bg-[#141F1F]">
      <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      <div className='flex container mt-24 mx-auto'>
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        {/* Main content */}
        <div className="flex-1 text-[#141F1F] dark:text-white overflow-y-auto pb-16 sm:pb-0">
          <div className="p-4 md:p-8 md:pt-0">
            {children}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <DashboardContent>{children}</DashboardContent>
  );
}