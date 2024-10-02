"use client";

import React, { useEffect, useState } from 'react';
import { ClipboardText, Clock } from 'iconsax-react';
import WalletModal from '@/components/modal/WalletModal';
import FiatonModal from '@/components/modal/FiatonModal';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ActionDropdown from '@/components/ActionBtns'
import toast from 'react-hot-toast';
import Image from 'next/image';

const WalletBalance = ({ balance, setIsModalOpen, setIsFiatonModalOpen }) => (
  <div className="bg-white dark:bg-[#1C2626] rounded-lg p-6 mb-6 flex-wrap gap-y-4 md:gap-y-0 flex items-center justify-between">
    <div className="flex items-center">
      <div className="bg-[#7df8ff3d] p-4 rounded-lg mr-4">
        <ClipboardText size={30} className="text-[#141F1F] dark:text-white" />
      </div>
      <div>
        <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">Wallet Balance</p>
        <p className="text-2xl font-bold">₦{balance.toLocaleString()}</p>
      </div>
    </div>
    <div className='flex items-center gap-x-2'>
      <ActionDropdown setIsFiatonModalOpen={setIsFiatonModalOpen} setIsModalOpen={setIsModalOpen} />
      {/* <button onClick={() => setIsModalOpen(true)} className="bg-[#141F1F] text-sm text-white border border-[#141f1f] font-medium px-6 py-2 rounded-lg">
        Top Up
      </button>
      <button onClick={() => setIsFiatonModalOpen(true)} className="text-[#141F1F] text-sm bg-white border border-[#141f1f] font-medium px-6 py-2 rounded-lg">
        View Fiatons
      </button> */}
    </div>
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
  const [fiatons, setFiatons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiatonModalOpen, setIsFiatonModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0); // Set default balance to 0
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const reference = localStorage.getItem("reference");
  const [isIOS, setIsIOS] = useState(false);
  const transactions = [
    { name: 'Jason Charles', amount: '4,000.00', receiver: 'ID23456789', time: '12:00', type: 'FLIP' },
    { name: 'Jason Charles', amount: '4,000.00', receiver: 'ID23456789', time: '12:00', type: 'EXCHANGE' },
    { name: 'Jason Charles', amount: '4,000.00', receiver: 'ID23456789', time: '12:00', type: 'FLIP' },
  ];

  useEffect(() => {
    // Check if the device is running iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);
  }, []);

  useEffect(() => {
    const fetchFiatonData = async () => {
      try {
        const response = await axios.get(`https://api.granularx.com/fiatons/view/${session.user.username}`);
        if (response.data.status === "SUCCESS") {
          setFiatons(response.data.data); // Set the fiatons data
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiatonData();
  }, [session]);

  useEffect(() => {
    if (reference) {
      const verifyReference = async () => {
        try {
          const response = await axios.get(`https://api.granularx.com/wallet/topup/verify/${reference}`);
          if (response.data.status === "SUCCESS") {
            setVerificationResult({ success: true, data: response.data.data });
            localStorage.removeItem("reference");
          } else {
            setVerificationResult({ success: false, error: response.data.error });
          }
          setIsModalOpen(true); // Automatically open the modal
        } catch (err) {
          setVerificationResult({ success: false, error: err.message });
          setIsModalOpen(true); // Open modal even on error
        } finally {
          setLoading(false);
        }
      };
  
      verifyReference();
    }

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
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWalletBalance();
  }, [session, reference]);

  return (
    <div className="p-0 md:py-6">
      {!loading ? (
        <WalletBalance balance={walletBalance} setIsModalOpen={setIsModalOpen} setIsFiatonModalOpen={setIsFiatonModalOpen} />
      ) : (
        <p className='py-4 text-sm font-medium'>Loading wallet balance...</p>
      )}
      {/* <div className="flex flex-col gap-y-4">
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} {...transaction} />
        ))}
      </div> */}
      {/* Empty State */}

      {/* Empty State */}
      <div className='flex items-center justify-center flex-col min-h-60'>
        {isIOS ? (
          <Image src={"/others/notFound.png"} alt='IOS Image' width={100} height={100} className='mb-4' />
        ) : (
          <video autoPlay loop muted>
            <source src="/others/notFound.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        <p className='text-sm md:text-base text-gray-400 -mt-3'>You haven&apos;t topped up your wallet.</p>
      </div>

      <WalletModal
        session={session}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        balance={walletBalance}
        verificationResult={verificationResult}
      />
      <FiatonModal
        session={session}
        fiatons={fiatons}
        isOpen={isFiatonModalOpen}
        onClose={() => setIsFiatonModalOpen(false)}
        balance={walletBalance}
      />
    </div>
  );
};

export default Wallet;
