// app/dashboard/page.js
"use client"

import React from 'react';
import TabView from '@/components/TabView'

const Dashboard = () => {
  return (
    <div className="text-[#141F1F] dark:text-white">
      <h1 className="text-lg md:text-xl font-semibold">Welcome back</h1>
      <p className="text-gray-500 text-sm md:text-base mb-8">22 December, 2024 • 13:44 AM</p>

      <div>
        <TabView />
      </div>

    </div>
  );
};

export default Dashboard;