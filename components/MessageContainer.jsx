"use client"

import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
import Messages from '@/components/dashboard/messages/Messages';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function MessageLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (status === 'loading') {
    return <div className='h-screen flex items-center justify-center'>Loading...</div>; // Or your custom loading component
  }

  if (!session) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex h-screen bg-[#F2F2F2] dark:bg-[#141F1F]">
      <Navbar setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      <div className={`flex container ${isMobile ? "mt-0" : "mt-24"} mx-auto`}>
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        {/* Main content */}
        <div className="flex-1 text-[#141F1F] dark:text-white overflow-y-auto sm:pb-0">
          <div className="p-0 sm:p-4 md:p-8 md:pt-0">
            <Messages isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} setIsMobile={setIsMobile} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessageContainer({ children }) {
  return (
    <MessageLayout />
  );
}