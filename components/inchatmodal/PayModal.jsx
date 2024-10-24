import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CloseCircle } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

import AmountInput from './AmountInput';
import RecipientInput from './RecipientInput';
import ConfirmTransfer from './ConfirmTransfer';
import PinInput from './PinInput';
import TransferSuccess from './TransferSuccess';

const PayModal = ({ isOpen, onClose, onSuccessfulTransfer, selectedChatId }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [recipientName, setRecipientName] = useState(selectedChatId);
  const [submitting, setSubmitting] = useState(false)
  const [pin, setPin] = useState('');
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const modalRef = useRef(null);
  const { data: session } = useSession();
  const [transferDetails, setTransferDetails] = useState(null);

  const fetchFiatons = async () => {
    if (!session) return [];
    try {
      const response = await axios.get(`https://api.granularx.com/fiatons/view/${session.user.username}`, {
        headers: {
          'Authorization': `Bearer ${session.authToken}`,
          'x-csrf-token': session.csrfToken,
        },
      });
      if (response.data.status === "SUCCESS") {
        const currencies = Object.keys(response.data.data).map(code => ({
          code,
          balance: response.data.data[code],
        }));
        setAvailableCurrencies(currencies);
        if (currencies.length > 0 && !selectedCurrency) {
          setSelectedCurrency(currencies[0]);
        }
        return currencies;
      }
      return [];
    } catch (err) {
      console.error("Failed to fetch fiatons:", err);
      return [];
    }
  };

  const { refetch: refetchFiatons } = useQuery({
    queryKey: ['fiatons'],
    queryFn: fetchFiatons,
    enabled: isOpen && !!session,
  });

  useEffect(() => {
    if (isOpen) {
      refetchFiatons();
    }
  }, [isOpen, refetchFiatons]);

  const fetchWalletBalance = async (currency) => {
    if (!session || !currency) return 0;
    try {
      const response = await axios.get(`https://api.granularx.com/wallet/balance/${session.user.username}/${currency}`, {
        headers: {
          'Authorization': `Bearer ${session.authToken}`,
          'x-csrf-token': session.csrfToken,
        },
      });
      return parseFloat(response.data.data);
    } catch (err) {
      console.error("Failed to fetch wallet balance:", err);
      return 0;
    }
  };

  const { data: balance, refetch: refetchBalance } = useQuery({
    queryKey: ['walletBalance', session?.user?.username, selectedCurrency?.code],
    queryFn: () => fetchWalletBalance(selectedCurrency?.code),
    enabled: !!session && !!selectedCurrency,
  });

  useEffect(() => {
    if (selectedCurrency) {
      refetchBalance();
    }
  }, [selectedCurrency, refetchBalance]);

  const resetModal = () => {
    setStep(1);
    setAmount('');
    setFormattedAmount('');
    setPin('');
  };

  const handleProceed = () => {
    if (step === 1 && amount) setStep(2);
    else if (step === 2 && recipientName) setStep(3);
    else if (step === 3) setStep(4);
  };

  const handlePinSubmit = async () => {
    // Check if the amount is less than the balance
    if (parseFloat(amount.replace(/,/g, '')) > balance) {
      toast.error('Insufficient balance. Please enter a lower amount.', {
        style: {
          fontSize: '13px',
          fontWeight: '500'
        },
        position: 'top-center',
      });
      setStep(1); // Reset to step 1
      return;
    }

    const request = axios.post('https://api.granularx.com/fiatons/send/peer', {
      sender_wallet_id: session.user.username,
      receiver_wallet_id: recipientName,
      amount: parseInt(amount.replace(/,/g, '')),
      backing: "NGN"
    });


    if (pin.length === 4) {
      setSubmitting(true);

      toast.promise(
        request,
        {
          loading: 'Processing transfer...',
          success: (response) => {
            if (response.data.status === 'SUCCESS') {
              setSubmitting(false);
              const details = {
                amount: formattedAmount,
                recipientName,
                currency: selectedCurrency.code
              };
              setTransferDetails(details);
              setStep(5);
              setTimeout(() => {
                onSuccessfulTransfer(details);
                resetModal();
                onClose();
              }, 2000);
              return 'Transfer successful!';
            } else {
              setSubmitting(false)
              throw new Error(response.data.error || 'Transfer failed');
            }
          },
          error: (error) => {
            if (error.response) {
              setSubmitting(false)
              return error.response.data.error || 'An error occurred during the transfer.';
            } else if (error.request) {
              setSubmitting(false)
              return 'No response from server. Please check your internet connection.';
            } else {
              setSubmitting(false)
              return 'An error occurred while setting up the transfer.';
            }
          }
        }, {
          style: {
            fontSize: '13px',
            fontWeight: '500'
          },
          position: 'top-center',
        }
      ).catch(() => setStep(1)); // Reset to step 1 if there's an error
    } else {
      setSubmitting(false)
      toast.error('Please enter a valid 4-digit PIN.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AmountInput 
          amount={amount}
          formattedAmount={formattedAmount}
          setAmount={setAmount}
          setFormattedAmount={setFormattedAmount}
          availableCurrencies={availableCurrencies}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          balance={balance}
        />;
      case 2:
        return <ConfirmTransfer amount={formattedAmount} recipientName={recipientName} />;
      case 3:
        return <PinInput pin={pin} setPin={setPin} recipientName={recipientName} />;
      case 4:
        return <TransferSuccess amount={formattedAmount} recipientName={recipientName} />;
      case 5:
        return <TransferSuccess 
          amount={transferDetails?.amount} 
          recipientName={transferDetails?.recipientName}
          currency={transferDetails?.currency}
        />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end"
        >
          <motion.div 
            ref={modalRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-[#141f1f] z-50 h-full w-full sm:w-[400px]"
          >
            <div className="p-6 h-[90%] md:h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="mr-4">
                    <ArrowLeft size="24" className="text-[#141f1f] dark:text-gray-400" />
                  </button>
                )}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {step === 1 ? 'In-Chat payment' : 
                   step === 2 ? 'Confirm Transfer' :
                   step === 3 ? 'Enter PIN' : 'Transfer Status'}
                </h2>

                <button onClick={() => onClose()}>
                  <CloseCircle size="24" className="text-[#141f1f] dark:text-gray-400" />
                </button>
              </div>
              {renderStep()}
              {step < 3 && (
                <button
                  onClick={handleProceed}
                  disabled={
                    (step === 1 && !amount)
                  }
                  className={`w-full dark:bg-white dark:text-[#141f1f] bg-[#141f1f] text-white py-3 rounded-md hover:bg-[#090e0e] transition-colors ${
                    ((step === 1 && !amount) || (step === 2 && !recipientName))
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {step === 2 ? 'Confirm' : 'Proceed'}
                </button>
              )}
              {step === 3 && (
                <button
                  onClick={handlePinSubmit}
                  disabled={pin.length !== 4 || submitting}
                  className={`w-full dark:text-[#141f1f] dark:bg-[#11C017] bg-[#141f1f] flex items-center justify-center gap-x-1 text-white py-3 rounded-md hover:bg-[#090e0e] transition-colors ${
                    pin.length !== 4 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              <span>{submitting ? "Processing..." : "Pay now"}</span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PayModal;
