// app/dashboard/page.js
"use client"

import React, { useEffect, useState } from 'react';
import TabView from '@/components/TabView'
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Dashboard = () => {
  const { data: session } = useSession();
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (session) {
        try {
          const response = await axios.get(`https://api.granularx.com/wallet/balance/${session.user.username}?platform=web`, {
            headers: {
              'Authorization': `Bearer ${session.authToken}`, // Include the user's auth token
              'x-csrf-token': session.csrfToken,
            },
          });

          const data = response.data;
          setBalance(parseFloat(data.data)); // Set the fetched balance
        } catch (error) {
          console.error('Error fetching wallet balance:', error);
        }
      }
    };

    fetchWalletBalance();
  }, [session]);

  return (
    <div className="text-[#141F1F] dark:text-white">
      <h1 className="text-lg md:text-xl font-semibold">Welcome back</h1>
      <p className="text-gray-500 text-sm md:text-base mb-8">Available Balance: <span className='text-[#141f1f] bg-green-100 font-semibold ml-1 px-2 py-1 rounded-full'>₦{balance.toLocaleString()}</span></p>

      <div>
        <TabView />
      </div>

    </div>
  );
};

export default Dashboard;