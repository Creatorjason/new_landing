"use client"

import React, { useState } from 'react';
import { CloseCircle } from 'iconsax-react';
import { AnimatePresence, motion } from 'framer-motion';
import WalletAmountInput from '@/components/dashboard/softservant/modal/WalletAmountInput';
import PinInput from '@/components/dashboard/softservant/modal/PinInput';
import ConfirmOrderStep from '@/components/dashboard/softservant/modal/ConfirmOrderStep';
import WalletSuccessStep from '@/components/dashboard/softservant/modal/WalletSuccessStep';
import FailureStep from '@/components/dashboard/softservant/modal/FailureStep';

const TopUpModal = ({ isOpen, onClose, balance }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(['', '', '', '']);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [reference, setReference] = useState(null);
  const [error, setError] = useState(null);

  const handleProceed = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 4);


  const handleConfirmOrder = async () => {
    localStorage.setItem('amount', amount);
    
    const request = axios.post(
      'https://api.granularx.com/wallet/topup?type=base&platform=web',
      {
        amount: parseInt(amount.replace(/,/g, '')),
        email: session.user.email,
        uns: session.user.username,
        base_currency: currency,
        transaction_type: 'base',
        pin: parseInt(pin.join('')),
      },
      {
        withCredentials: true, // Crucial for Axios to handle cookies correctly
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.authToken}`,
          'x-csrf-token': `${session.csrfToken}`,
        },
      }
    );

    toast.promise(
      request,
      {
        loading: 'Processing your transaction...',
        success: (response) => {
          const data = response.data;
          if (data.status === 'SUCCESS') {
            setApiResponse(data.data);

            localStorage.setItem('reference', data.data.reference);
            window.location.href = data.data.auth_url;
            return 'Transaction logged. Redirecting to Paystack!';
          } else {
            setTransactionSuccess(false);
            setError(data.error || 'An error occurred during the transaction.');
            setStep(5);
            throw new Error(data.error || 'Transaction failed.');
          }
        },
        error: (err) => {
          console.error('API request failed:', err);
          setTransactionSuccess(false);
          setError('An unexpected error occurred. Please try again later.');
          setStep(5);
          return 'An unexpected error occurred. Please try again later.';
        },
      }
    );
  };

  const handleViewReceipt = () => setShowReceipt(true);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget || e.type === 'click') {
      localStorage.removeItem("reference");
      localStorage.removeItem("amount");
      resetModal();
      onClose();
    }
  };

  const resetModal = () => {
    setAmount('');
    setPin(['', '', '', '']);
    setStep(1);
    setTransactionSuccess(false);
    setShowReceipt(false);
    setApiResponse(null);
    setPaymentStatus(null);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-[#1C2626] rounded-lg p-6 w-[23rem] mx-3 md:m-0 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-bold">Top Up</h2>
              <button onClick={handleCloseModal}><CloseCircle className="text-[#141F1F] dark:text-white"/></button>
            </div>

            <AnimatePresence mode='wait'>
              {step === 1 && (
                <WalletAmountInput
                  amount={amount}
                  setAmount={setAmount}
                  currency={currency}
                  setCurrency={setCurrency}
                  balance={balance}
                  onProceed={handleProceed}
                />
              )}

              {step === 3 && (
                <PinInput
                  pin={pin}
                  setPin={setPin}
                  onCreatePin={handleProceed}
                  onBack={handleBack}
                />
              )}

              {step === 4 && (
                <ConfirmOrderStep
                  onConfirm={handleConfirmOrder}
                  onReject={handleBack}
                />
              )}

              {step === 5 && transactionSuccess && !showReceipt && (
                <WalletSuccessStep
                  onViewReceipt={handleViewReceipt}
                />
              )}

              {step === 5 && !transactionSuccess && !showReceipt && (
                <FailureStep
                  amount={amount}
                  currency={currency}
                  onGoBack={handleBack}
                />
              )}

              {/* {showReceipt && (
                <Receipt
                  amount={localStorage.getItem("amount")}
                  date={new Date().toLocaleString()}
                  status={transactionSuccess ? "Success" : "Failed"}
                  transactionType="Fund Wallet"
                  bankName="GranularX"
                  accountNumber={reference || apiResponse?.reference || "N/A"}
                  accountName={session.user.username}
                  transactionID={apiResponse?.access_code || "N/A"}
                  onClose={handleCloseModal}
                />
              )} */}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopUpModal;
