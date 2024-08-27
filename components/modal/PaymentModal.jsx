import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle } from 'iconsax-react';
import AmountInput from '@/components/dashboard/pay/AmountInput';
import PinInput from '@/components/dashboard/pay/PinInput';
import ConfirmationStep from '@/components/dashboard/pay/ConfirmationStep';
import SuccessStep from '@/components/dashboard/pay/SuccessStep';
import Receipt from '@/components/dashboard/wallet/Receipt';

const PaymentModal = ({ isOpen, onClose, balance }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(['', '', '', '']);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleProceed = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);
  const handleConfirmTransfer = () => setTransactionSuccess(true);
  const handleViewReceipt = () => setShowReceipt(true);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget || e.type === 'click') {
      resetModal();
      onClose();
    }
  };

  const resetModal = () => {
    setAmount('');
    setStep(1);
    setPin(['', '', '', '']);
    setTransactionSuccess(false);
    setShowReceipt(false);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    onClose();
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
          onClick={handleCloseModal}
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
              <button onClick={handleCloseModal}><CloseCircle className="text-[#141F1F] dark:text-white"/></button>
            </div>

            <AnimatePresence mode='wait'>
              {step === 1 && (
                <AmountInput
                  amount={amount}
                  setAmount={setAmount}
                  currency={currency}
                  setCurrency={setCurrency}
                  balance={balance}
                  onProceed={handleProceed}
                />
              )}

              {step === 2 && (
                <PinInput
                  pin={pin}
                  setPin={setPin}
                  onCreatePin={handleProceed}
                  onBack={handleBack}
                />
              )}

              {step === 3 && !transactionSuccess && (
                <ConfirmationStep
                  onConfirm={handleConfirmTransfer}
                  onBack={handleBack}
                />
              )}

              {transactionSuccess && !showReceipt && (
                <SuccessStep
                  amount={amount}
                  onViewReceipt={handleViewReceipt}
                />
              )}

              {showReceipt && (
                <Receipt
                  amount={amount}
                  date="9 Nov 2023 18:30"
                  status="Success"
                  transactionType="Fund Wallet"
                  bankName="GranularX"
                  accountNumber="12345678901"
                  accountName="Jason Charles"
                  transactionID="Tyuhcjdb874892f"
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