"use client";

import React, { useEffect, useState } from 'react';
import { ClipboardText, Clock } from 'iconsax-react';
import WalletModal from '@/components/modal/WalletModal';
import FiatonModal from '@/components/modal/FiatonModal';
import Swap from '@/components/modal/Swap';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ActionDropdown from '@/components/ActionBtns'
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const WalletBalance = ({ balances, selectedCurrency, onCurrencyChange, setIsModalOpen, setIsFiatonModalOpen, setIsSwapModalOpen }) => (
  <div className="bg-white dark:bg-[#1C2626] rounded-lg p-6 mb-6 flex-wrap gap-y-4 md:gap-y-0 flex items-center justify-between">
    <div className="flex items-center">
      <div className="bg-[#7df8ff3d] p-4 rounded-lg mr-4">
        <ClipboardText size={30} className="text-[#141F1F] dark:text-white" />
      </div>
      <div>
        <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">Wallet Balance</p>
        <div className="flex items-center">
          <p className="text-2xl font-bold mr-2">
            {selectedCurrency === 'NGN' ? '₦' : '$'}
            {balances[selectedCurrency].toLocaleString()}
          </p>
          <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(balances).map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
    <div className='flex items-center gap-x-2'>
      <ActionDropdown setIsFiatonModalOpen={setIsFiatonModalOpen} setIsSwapModalOpen={setIsSwapModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  </div>
);

const Wallet = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiatonModalOpen, setIsFiatonModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [walletBalances, setWalletBalances] = useState({ NGN: 0, USD: 0 });
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const reference = localStorage.getItem("reference");
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);
  }, []);

  useEffect(() => {
    if (reference) {
      // ... (keep the existing reference verification logic)
    }

    const fetchWalletBalances = async () => {
      if (session) {
        try {
          const currencies = ['NGN', 'USD'];
          const balancePromises = currencies.map(currency =>
            axios.get(`https://api.granularx.com/wallet/balance/${session.user.username}/${currency}`, {
              headers: {
                'Authorization': `Bearer ${session.authToken}`,
                'x-csrf-token': session.csrfToken,
              },
            })
          );

          const responses = await Promise.all(balancePromises);
          const newBalances = {};
          responses.forEach((response, index) => {
            const data = response.data;
            newBalances[currencies[index]] = parseFloat(data.data);
          });

          setWalletBalances(newBalances);
        } catch (error) {
          console.error('Error fetching wallet balances:', error);
          setError("Failed to fetch wallet balances");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWalletBalances();
  }, [session, reference]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <div className="p-0 md:py-6">
      {!loading ? (
        <WalletBalance 
          balances={walletBalances}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={handleCurrencyChange}
          setIsSwapModalOpen={setIsSwapModalOpen}
          setIsModalOpen={setIsModalOpen}
          setIsFiatonModalOpen={setIsFiatonModalOpen}
        />
      ) : (
        <p className='py-4 text-sm font-medium'>Loading wallet balances...</p>
      )}
      {error && <p className='text-red-500'>{error}</p>}
      
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
        balance={walletBalances[selectedCurrency]}
        verificationResult={verificationResult}
      />
      <FiatonModal
        session={session}
        isOpen={isFiatonModalOpen}
        onClose={() => setIsFiatonModalOpen(false)}
      />
      <Swap
        session={session}
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        balance={walletBalances[selectedCurrency]}
      />
    </div>
  );
};

export default Wallet;
