"use client";

import React, { useState, useEffect } from 'react';
import { Wallet2 } from 'iconsax-react';
import WalletModal from '@/components/modal/WalletModal';
import FiatonModal from '@/components/modal/FiatonModal';
import Swap from '@/components/modal/Swap';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ActionDropdown from '@/components/ActionBtns';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrencySymbol } from '@/utils/currencySymbols';

const WalletBalance = ({ balance, selectedCurrency, onCurrencyChange, setIsModalOpen, setIsFiatonModalOpen, setIsSwapModalOpen, isLoading, error, availableCurrencies }) => (
  <div className="bg-white dark:bg-[#1C2626] rounded-lg p-6 mb-6 shadow-md">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="bg-[#7df8ff3d] p-4 rounded-full mr-4">
          <Wallet2 size={30} variant="Bulk" className="text-[#141F1F] dark:text-white" />
        </div>
        <div>
          <h2 className="text-sm font-normal text-gray-400 dark:text-gray-200">Wallet Balance</h2>
          <div className="flex items-center">
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : error ? (
              <p className="text-2xl font-bold text-red-500">Error fetching balance</p>
            ) : (
              <p className="text-xl font-bold mr-2 text-[#141F1F] dark:text-white">
                {getCurrencySymbol(selectedCurrency)}
                {balance.toLocaleString()}
              </p>
            )}
            <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
              <SelectTrigger className="w-[80px] ml-2 py-0 h-8 bg-gray-100 dark:bg-[#141F1F] border-none">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="bg-gray-100 dark:bg-[#141F1F]">
                {availableCurrencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-x-2 mt-4 md:mt-0'>
        <ActionDropdown setIsFiatonModalOpen={setIsFiatonModalOpen} setIsSwapModalOpen={setIsSwapModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  </div>
);

const Wallet = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiatonModalOpen, setIsFiatonModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [verificationResult, setVerificationResult] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const reference = localStorage.getItem("reference");
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);

    if (reference) {
      const verifyReference = async () => {
        try {
          const response = await axios.get(`https://api.granularx.com/wallet/topup/verify/${reference}`);
          if (response.data.status === "SUCCESS") {
            setVerificationResult({ success: true, data: response.data.data });
            // localStorage.removeItem("reference");
          } else {
            setVerificationResult({ success: false, error: response.data.error });
            // localStorage.removeItem("reference");
          }
          setIsModalOpen(true); // Automatically open the modal
        } catch (err) {
          setVerificationResult({ success: false, error: err.message });
          // localStorage.removeItem("reference");
          setIsModalOpen(true); // Open modal even on error
        } finally {
          setLoading(false);
        }
      };
  
      verifyReference();
    }
  }, [session, reference]);

  const fetchFiatons = async () => {
    if (session) {
      try {
        const response = await axios.get(`https://api.granularx.com/fiatons/view/${session.user.username}`, {
          headers: {
            'Authorization': `Bearer ${session.authToken}`,
            'x-csrf-token': session.csrfToken,
          },
        });
        if (response.data.status === "SUCCESS") {
          setAvailableCurrencies(Object.keys(response.data.data));
        }
      } catch (err) {
        console.error("Failed to fetch fiatons:", err);
      }
    }
  };

  useEffect(() => {
    fetchFiatons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const fetchBalance = async ({ queryKey }) => {
    const [_, currency] = queryKey;
    const response = await axios.get(`https://api.granularx.com/wallet/balance/${session.user.username}/${currency}`, {
      headers: {
        'Authorization': `Bearer ${session.authToken}`,
        'x-csrf-token': session.csrfToken,
      },
    });
    return parseFloat(response.data.data);
  };

  const { data: balance, isLoading, error } = useQuery({
    queryKey: ['balance', selectedCurrency],
    queryFn: fetchBalance,
    enabled: !!session,
    refetchInterval: 60000, // Refetch every minute
  });

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleSwapComplete = () => {
    queryClient.invalidateQueries(['balance', selectedCurrency]);
  };

  return (
    <div className="p-0 md:py-6">
      <WalletBalance 
        balance={balance || 0}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
        setIsSwapModalOpen={setIsSwapModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsFiatonModalOpen={setIsFiatonModalOpen}
        isLoading={isLoading}
        error={error}
        availableCurrencies={availableCurrencies}
      />
      
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
        balance={balance || 0}
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
        balance={balance || 0}
        onSwapComplete={handleSwapComplete}
      />
    </div>
  );
};

export default Wallet;
