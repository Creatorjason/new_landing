"use client"

import React, { useEffect, useState } from 'react';
import { ArrowRight2, Coin, ClipboardText, ArrowCircleUp2 } from 'iconsax-react';
import PaymentModal from '@/components/modal/PaymentModal'
import { useSession } from 'next-auth/react';
import axios from 'axios';

const WalletBalance = ({ balance, setIsModalOpen }) => (
  <div className="bg-white dark:bg-[#1C2626] rounded-lg p-6 mb-6 gap-y-4 md:gap-y-0 flex items-center flex-wrap justify-between">
    <div className="flex items-center">
      <div className="bg-[#7df8ff3d] p-4 rounded-lg mr-4">
        <Coin size={30} className="text-[#141F1F] dark:text-white" />
      </div>
      <div>
        <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">Wallet Balance</p>
        <p className="text-lg md:text-2xl font-bold">₦{balance.toLocaleString()}</p>
      </div>
    </div>
    <button onClick={() => setIsModalOpen(true)} className="bg-[#141F1F] float-right text-sm dark:bg-[#7DF9FF3d] text-white font-medium px-6 py-2 rounded-lg">
      New Payment
    </button>
  </div>
);

const PaymentHistoryItem = ({ type, date, amount, status }) => (
  <div className="flex items-center justify-between py-4 border-b dark:border-gray-600 last:border-b-0">
    <div className="flex items-center">
      <div className={`p-2 rounded-full mr-3 ${type === 'Refund' ? 'bg-[#E8FDE8] dark:bg-[#11c01718]' : 'bg-[#7DF9FF33] dark:bg-[#7DF9FF3D]'}`}>
        {type === 'Refund' ? (
          <ArrowCircleUp2 size={24} className="text-[#11C017]" />
        ) : (
          <ClipboardText size={24} className="text-[#141F1F] dark:text-white" />
        )}
      </div>
      <div>
        <p className="text-sm md:text-base font-medium">{type}</p>
        <p className="text-xs md:text-sm text-gray-500">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm md:text-base font-medium">-₦{amount}</p>
      <p className="text-sm text-green-500">{status}</p>
    </div>
  </div>
);

const PaymentHistory = ({ payments }) => (
  <div className="bg-white dark:bg-[#1C2626] rounded-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-base md:text-lg font-semibold">Payment History</h2>
      <button className="text-blue-500 text-sm md:text-base flex items-center">
        SEE ALL
        <ArrowRight2 size={16} className="ml-1" />
      </button>
    </div>
    <div>
      {/* {payments.map((payment, index) => (
        <PaymentHistoryItem key={index} {...payment} />
      ))} */}

      {/* Empty State */}
      <div className='flex items-center justify-center flex-col min-h-60'>
        <video autoPlay loop muted>
          <source src="/others/notFound.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <p className='text-sm md:text-base text-gray-400 -mt-3'>You haven&apos;t initiated a transaction yet.</p>
      </div>
    </div>
  </div>
);

const Payment = () => {
  const { data: session } = useSession();
  const [walletBalance, setWalletBalance] = useState(0); // Set default balance to 0
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paymentHistory = [
    { type: 'Dollar Payment', date: '17 Oct, 2020', amount: '100,000.00', status: 'Successful' },
    { type: 'Refund', date: '17 Oct, 2020', amount: '100,000.00', status: 'Successful' },
    { type: 'Dollar Payment', date: '17 Oct, 2020', amount: '100,000.00', status: 'Successful' },
    { type: 'Refund', date: '17 Oct, 2020', amount: '100,000.00', status: 'Successful' },
    { type: 'Dollar Payment', date: '17 Oct, 2020', amount: '100,000.00', status: 'Successful' },
  ];

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
          setWalletBalance(parseFloat(data.data)); // Set the fetched balance
        } catch (error) {
          console.error('Error fetching wallet balance:', error);
        }
      }
    };

    fetchWalletBalance();
  }, [session]);

  return (
    <div className="p-0 md:py-6">
      <WalletBalance balance={walletBalance} setIsModalOpen={setIsModalOpen} />
      <PaymentHistory payments={paymentHistory} />

      <PaymentModal
        session={session}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        balance={walletBalance}
      />
    </div>
  );
};

export default Payment;