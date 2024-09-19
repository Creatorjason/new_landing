// app/dashboard/page.js
"use client"

import React from 'react';
import TabView from '@/components/TabView'
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="text-[#141F1F] dark:text-white">
      <h1 className="text-lg md:text-xl font-semibold">Welcome back</h1>
      <p className="text-gray-500 text-sm md:text-base mb-8">WalletID: <span className='text-[#141f1f] bg-green-100 font-medium ml-1 px-2 py-1 rounded-full'>{session.user.email}</span></p>

      <div>
        <TabView />
      </div>

    </div>
  );
};

export default Dashboard;