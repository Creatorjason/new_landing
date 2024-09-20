"use client"

import React, { useState } from 'react';
import { ClipboardText, Clock } from 'iconsax-react';
import WalletModal from '@/components/modal/WalletModal';
import { useSession } from 'next-auth/react';

const WalletBalance = ({ balance, setIsModalOpen }) => (
  <div className="bg-white dark:bg-[#1C2626] rounded-lg p-6 mb-6 flex-wrap gap-y-4 md:gap-y-0 flex items-center justify-between">
    <div className="flex items-center">
      <div className="bg-[#7df8ff3d] p-4 rounded-lg mr-4">
        <ClipboardText size={30} className="text-[#141F1F] dark:text-white" />
      </div>
      <div>
        <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">Wallet Balance</p>
        <p className="text-2xl font-bold">₦{balance}</p>
      </div>
    </div>
    <button onClick={() => setIsModalOpen(true)} className="bg-[#141F1F] text-sm text-white font-medium px-6 py-2 rounded-lg">
      Top Up
    </button>
  </div>
);

const TransactionItem = ({ name, amount, receiver, time, type }) => (
  <div className="bg-white dark:bg-[#1C2626] rounded-lg p-6">
    <div className='flex items-center justify-between mb-4'>
      <p className="text-base font-medium">{name}</p>
      <span className={`px-3 py-1 rounded font-medium text-xs ${type === 'FLIP' ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'}`}>
        {type}
      </span>
    </div>
    <div className='mb-4'>
      <p className="text-xs font-medium mb-1 text-[#B3B3B3]">AMOUNT</p>
      <p className="text-sm md:text-base text-[#0F0F0F] font-medium dark:text-[#7df8ff]">${amount}</p>
    </div>
    <div>
      <p className="text-xs font-medium text-[#B3B3B3]">RECEIVER</p>
      <div className="flex items-center justify-between">
        <p className="text-sm md:text-base text-[#0F0F0F] font-medium dark:text-[#7df8ff]">{receiver}</p>
        <p className="text-sm text-[#B3B3B3] mt-2 flex items-center gap-x-1"><Clock size={18} className="text-[#0F0F0F] dark:text-[#7df8ff]"/> <span>{time}</span></p>
      </div>
    </div>
  </div>
);

const Wallet = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const walletBalance = '334,000,234.56';
  const transactions = [
    { name: 'Jason Charles', amount: '4,000.00', receiver: 'ID23456789', time: '12:00', type: 'FLIP' },
    { name: 'Jason Charles', amount: '4,000.00', receiver: 'ID23456789', time: '12:00', type: 'EXCHANGE' },
    { name: 'Jason Charles', amount: '4,000.00', receiver: 'ID23456789', time: '12:00', type: 'FLIP' },
  ];

  return (
    <div className="p-0 md:py-6">
      <WalletBalance balance={walletBalance} setIsModalOpen={setIsModalOpen} />
      <div className="flex flex-col gap-y-4">
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} {...transaction} />
        ))}
      </div>
      <WalletModal
        session={session}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        balance={parseFloat(walletBalance.replace(/,/g, ''))}
      />
    </div>
  );
};

export default Wallet;