import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle } from 'iconsax-react';
import AmountInput from '@/components/dashboard/pay/AmountInput';
import PinInput from '@/components/dashboard/pay/PinInput';
import ConfirmationStep from '@/components/dashboard/pay/ConfirmationStep';
import SuccessStep from '@/components/dashboard/pay/SuccessStep';
import Receipt from '@/components/dashboard/payment/Receipt';
import UNSInput from '@/components/dashboard/pay/UNSInput';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, balance, session }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(['', '', '', '']);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [recipientUNS, setRecipientUNS] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleProceed = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);
  const handleViewReceipt = () => setShowReceipt(true);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget || e.type === 'click') {
      resetModal();
      onClose();
    }
  };

  const resetModal = () => {
    setAmount('');
    setCurrency('USD');
    setStep(1);
    setPin(['', '', '', '']);
    setTransactionSuccess(false);
    setShowReceipt(false);
    setRecipientUNS('');
    setSubmitting(false);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    onClose();
    resetModal();
  };

  const handleConfirmUNS = (uns) => {
    setRecipientUNS(uns);
    handleProceed();
  };

  const handlePinSubmit = async () => {
    if (pin.length === 4) {
      setSubmitting(true);
      const request = axios.post('https://api.granularx.com/fiatons/send/peer?platform=web', {
        sender_wallet_id: session.user.username,
        receiver_wallet_id: recipientUNS,
        amount: parseInt(amount.replace(/,/g, ''))
      });

      toast.promise(
        request,
        {
          loading: 'Processing transfer...',
          success: (response) => {
            if (response.data.status === 'SUCCESS') {
              setSubmitting(false);
              setTransactionSuccess(true);
              setTimeout(() => {
                handleViewReceipt();
              }, 2000);
              return 'Transfer successful!';
            } else {
              setSubmitting(false);
              throw new Error(response.data.error || 'Transfer failed');
            }
          },
          error: (error) => {
            setSubmitting(false);
            if (error.response) {
              return error.response.data.error || 'An error occurred during the transfer.';
            } else if (error.request) {
              return 'No response from server. Please check your internet connection.';
            } else {
              return 'An error occurred while setting up the transfer.';
            }
          }
        }
      ).catch(() => setStep(1)); // Reset to step 1 if there's an error
    } else {
      setSubmitting(false);
      toast.error('Please enter a valid 4-digit PIN.');
    }
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
              <h2 className="text-base md:text-lg font-bold">Payment</h2>
              <button onClick={handleCloseModal}>
                <CloseCircle className="text-[#141F1F] dark:text-white" />
              </button>
            </div>

            <AnimatePresence mode='wait'>
              {step === 1 && (
                <UNSInput onConfirm={handleConfirmUNS} />
              )}

              {step === 2 && (
                <AmountInput
                  amount={amount}
                  setAmount={setAmount}
                  currency={currency}
                  setCurrency={setCurrency}
                  balance={balance}
                  onProceed={handleProceed}
                />
              )}

              {step === 3 && (
                <ConfirmationStep
                  onConfirm={handleProceed}
                  onBack={handleBack}
                  amount={amount}
                  currency={currency}
                  recipientUNS={recipientUNS}
                />
              )}

              {step === 4 && (
                <PinInput
                  pin={pin}
                  setPin={setPin}
                  onCreatePin={handlePinSubmit}
                  onBack={handleBack}
                  submitting={submitting}
                />
              )}

              {transactionSuccess && !showReceipt && (
                <SuccessStep
                  amount={amount}
                  recipientUNS={recipientUNS}
                  onViewReceipt={handleViewReceipt}
                />
              )}

              {showReceipt && (
                <Receipt
                  amount={amount}
                  currency={currency}
                  status="Success"
                  recipientUNS={recipientUNS}
                  onClose={handleCloseReceipt}
                  resetModal={resetModal}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;