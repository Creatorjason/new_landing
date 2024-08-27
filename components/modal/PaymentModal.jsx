import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle } from 'iconsax-react';
import Image from 'next/image';
import Receipt from '@/components/dashboard/wallet/Receipt'

const PaymentModal = ({ isOpen, onClose, balance }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(['', '', '', '']);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    const numericAmount = parseFloat(amount.replace(/,/g, ''));

    if (amount === '') {
      setError('');
    } else if (parseFloat(numericAmount) < 100) {
      setError('Amount too low to send');
    } else if (parseFloat(numericAmount) > balance) {
      setError('Insufficient balance');
    } else {
      setError('');
    }
  }, [amount, balance]);

  const handleProceed = () => {
    if (!error && amount !== '') {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePinChange = (index, value) => {
    // Allow only numbers
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
  
      if (value !== '' && index < 3) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };
  
  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      const newPin = [...pin];
  
      if (newPin[index] === '') {
        if (index > 0) {
          document.getElementById(`pin-${index - 1}`).focus();
          newPin[index - 1] = '';
        }
      } else {
        newPin[index] = '';
      }
  
      setPin(newPin);
    }
  };  

  const handleCreatePin = () => {
    if (pin.every(digit => digit !== '')) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleConfirmTransfer = () => {
    setTransactionSuccess(true);
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget || e.type === 'click') {
      resetModal();
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleViewReceipt = () => {
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    onClose(); // close the modal as well
  };

  const resetModal = () => {
    setAmount('');
    setError('');
    setStep(1);
    setPin(['', '', '', '']);
    setTransactionSuccess(false);
  };

  const currencies = ['USD', 'EUR', 'NGN', 'GBP'];

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
                <motion.div
                  key="step1"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                >
                  <div className="mb-4">
                    <label className="block text-sm md:text-base mb-2">Amount to send <span className='text-red-600'>*</span></label>
                    <div className="flex items-center border border-[#e2e2e2cb] overflow-hidden rounded-md mb-2">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="p-3 bg-white dark:bg-[#1c2626] border-r border-[#e2e2e2]"
                      >
                        {currencies.map((cur) => (
                          <option key={cur} value={cur}>
                            {cur}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => {
                          // Remove any non-numeric characters except for the decimal point
                          let numericValue = e.target.value.replace(/[^0-9.]/g, '');

                          // If there's a decimal point, make sure there is only one
                          const parts = numericValue.split('.');
                          if (parts.length > 2) {
                            numericValue = `${parts[0]}.${parts.slice(1).join('')}`;
                          }

                          // Format the integer part with commas
                          if (parts[0]) {
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          }

                          // Combine the parts back together
                          const formattedValue = parts.join('.');

                          // Set the formatted value back to the state
                          setAmount(formattedValue);
                        }}
                        className="w-full p-2 outline-none bg-white dark:bg-[#1c2626]"
                        placeholder="Enter amount"
                        onKeyDown={(e) => {
                          if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                            e.preventDefault(); // Prevent entering 'e', '+', and '-' for scientific notation or negative/positive signs
                          }
                        }}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Remove any non-numeric characters
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#999999] mt-1">Balance: ₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    {error && (
                      <motion.p
                        className="text-xs text-[#F27852] mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>
                  <button
                    onClick={handleProceed}
                    disabled={!!error || amount === ''}
                    className={`w-full p-3 py-2 text-sm rounded ${
                      error || amount === '' ? 'bg-gray-300 dark:bg-gray-800 cursor-not-allowed' 
                      : 'bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]'
                    }`}
                  >
                    Proceed
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                >
                  <h3 className="mb-4">Enter your Pin</h3>
                  <div className="flex justify-between mb-4">
                    {pin.map((digit, index) => (
                      <input
                        key={index}
                        id={`pin-${index}`}
                        type="password"
                        maxLength="1"
                        value={digit} autoComplete='off'
                        onChange={(e) => handlePinChange(index, e.target.value)}
                        onKeyDown={(e) => handlePinKeyDown(index, e)}
                        className="w-16 h-16 text-center border rounded-lg outline-none dark:bg-[#1c2626] border-[#e2e2e27e] focus:border-[#a2a2a2c2]"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-y-2 justify-between">
                    <button
                      onClick={handleCreatePin}
                      className="w-auto p-3 py-2 text-sm rounded border border-[#141F1F] bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]"
                    >
                      Create PIN and Proceed
                    </button>
                    <button
                      onClick={handleBack}
                      className="w-auto text-[#141F1F] dark:text-white p-3 py-2 text-sm rounded border border-gray-300"
                    >
                      Back
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && !transactionSuccess && (
                <motion.div
                  key="step3"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                >
                  <div className="text-center mb-4">
                    <div className="bg-[#7DF9FF1A] border border-[#7DF9FF70] rounded-lg p-3 px-6 inline-block mb-2">
                      <span className="text-4xl font-bold">?</span>
                    </div>
                    <h3 className="text-xl font-bold">Proceed to transfer</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      For your first in-chat payment, you need to confirm an OTP sent to your mailbox. Would you like us to automate that process and send your money?
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2 justify-between">
                    <button onClick={handleConfirmTransfer} className="w-auto p-3 py-2 text-sm rounded border border-[#141F1F] bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]">
                      Yes, confirm & send money
                    </button>
                    <button onClick={handleBack} className="w-auto text-[#141F1F] dark:text-white p-3 py-2 text-sm rounded border border-gray-300">
                      No, cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {transactionSuccess && !showReceipt && (
                <motion.div
                  key="success"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                >
                  <div className="text-center">
                    <div className="bg-[#7DF9FF1A] border border-[#7DF9FF70] rounded-lg p-4 inline-block mb-2">
                      <Image src={"/confetti.svg"} alt='Confetti' width={40} height={40} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Transfer Successful!</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      You have successfully sent ₦{amount} to Sarah Banks
                    </p>
                    <button onClick={handleViewReceipt} className="w-full p-3 py-2 text-sm rounded border border-[#141F1F] bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]">
                      View Receipt
                    </button>
                  </div>
                </motion.div>
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