import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle } from 'iconsax-react';
import WalletAmountInput from '@/components/dashboard/pay/WalletAmountInput';
import PinInput from '@/components/dashboard/pay/PinInput';
import ConfirmOrderStep from '@/components/dashboard/pay/ConfirmOrderStep';
import BackedFiatonsStep from '@/components/dashboard/pay/BackedFiatonsStep';
import WalletSuccessStep from '@/components/dashboard/pay/WalletSuccessStep';
import FailureStep from '@/components/dashboard/pay/FailureStep';
import Receipt from '@/components/dashboard/wallet/Receipt';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WalletModal = ({ isOpen, onClose, balance, uns, session }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(['', '', '', '']);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for payment status in URL parameters when component mounts
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('payment_status');
    if (status) {
      setPaymentStatus(status);
      setStep(5);
      setTransactionSuccess(status === 'success');
    }

    console.log(window.location)
  }, []);

  useEffect(() => {
    const verifyTransaction = async (reference) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.granularx.com/wallet/topup/verify/${reference}`, {
          headers: {
            'Authorization': `Bearer ${session.authToken}`, // Include the user's auth token
            'x-csrf-token': session.csrfToken,
          },
        });

        const data = response.data;

        if (data.status === 'SUCCESS') {
          toast.success(data.data); // Show the success message from the response
        } else {
          toast.error(data.error || 'Transaction verification failed.');
        }
      } catch (error) {
        console.error('Verification failed:', error);
        toast.error('An error occurred during verification. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'success' && reference) {
      verifyTransaction(reference); // Only verify if Paystack returns with success and a reference
    }
  }, [session.authToken, session.csrfToken]);

  const handleProceed = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  // console.log(session.authToken);

  const handleConfirmOrder = async () => {
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
                <BackedFiatonsStep
                  onDone={handleProceed}
                />
              )}

              {step === 2 && (
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

              {step === 5 && !transactionSuccess && (
                <FailureStep
                  amount={amount}
                  currency={currency}
                  onGoBack={handleBack}
                />
              )}

              {showReceipt && (
                <Receipt
                  amount={amount}
                  date={new Date().toLocaleString()}
                  status={transactionSuccess ? "Success" : "Failed"}
                  transactionType="Fund Wallet"
                  bankName="GranularX"
                  accountNumber={apiResponse?.reference || "N/A"}
                  accountName={uns}
                  transactionID={apiResponse?.access_code || "N/A"}
                  onClose={handleCloseModal}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;