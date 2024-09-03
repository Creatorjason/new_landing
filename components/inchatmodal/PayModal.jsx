import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'iconsax-react';
import AmountInput from './AmountInput';
import RecipientInput from './RecipientInput';
import ConfirmTransfer from './ConfirmTransfer';
import PinInput from './PinInput';
import TransferSuccess from './TransferSuccess';
import { CloseCircle } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const PayModal = ({ isOpen, onClose, onSuccessfulTransfer }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [pin, setPin] = useState('');
  const modalRef = useRef(null);
  const { data: session } = useSession();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        resetModal();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const resetModal = () => {
    setStep(1);
    setAmount('');
    setFormattedAmount('');
    setRecipientName('');
    setPin('');
  };

  const handleProceed = () => {
    if (step === 1 && amount) setStep(2);
    else if (step === 2 && recipientName) setStep(3);
    else if (step === 3) setStep(4);
  };

  const handlePinSubmit = async () => {
    if (pin.length === 4) {
      try {
        const response = await axios.post('https://api.granularx.com/wallet/transfer', {
          sender_wallet_id: session.user.walletId,
          receiver_wallet_id: "d429698f201fc76bc3dbef55026c6d30e02ed6d5ba82ecafcdf5871f05fa6b1e",
          amount: parseFloat(amount),
        });
  
        const data = await response.json();
  
        if (response.data.status === "SUCCESS") {
          setStep(5);
          setTimeout(() => {
            onSuccessfulTransfer({
              amount: parseFloat(amount),
              recipientName,
              date: new Date().toISOString(),
            });
            resetModal();
            onClose();
          }, 2000);
        } else {
          console.error('Error transferring funds:', data.error);
          // Handle error appropriately
        }
      } catch (error) {
        console.error('Error making API request:', error);
        // Handle error appropriately
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AmountInput amount={amount} formattedAmount={formattedAmount} setAmount={setAmount} setFormattedAmount={setFormattedAmount} />;
      case 2:
        return <RecipientInput recipientName={recipientName} setRecipientName={setRecipientName} />;
      case 3:
        return <ConfirmTransfer amount={formattedAmount} recipientName={recipientName} />;
      case 4:
        return <PinInput pin={pin} setPin={setPin} recipientName={recipientName} />;
      case 5:
        return <TransferSuccess amount={formattedAmount} recipientName={recipientName} />;
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end"
        >
          <motion.div 
            ref={modalRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-[#141f1f] h-full w-full sm:w-[400px]"
          >
            <div className="p-6 md:h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="mr-4">
                    <ArrowLeft size="24" className="text-gray-600 dark:text-gray-400" />
                  </button>
                )}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {step === 1 ? 'In-Chat payment' : 
                   step === 2 ? 'Recipient Details' :
                   step === 3 ? 'Confirm Transfer' :
                   step === 4 ? 'Enter PIN' : 'Transfer Status'}
                </h2>

                <button onClick={() => onClose()}>
                  <CloseCircle size="24" className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              {renderStep()}
              {step < 4 && (
                <button
                  onClick={handleProceed}
                  disabled={
                    (step === 1 && !amount) ||
                    (step === 2 && !recipientName)
                  }
                  className={`w-full bg-[#FF8A65] text-white py-3 rounded-md hover:bg-[#FF7043] transition-colors ${
                    ((step === 1 && !amount) || (step === 2 && !recipientName))
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {step === 3 ? 'Confirm' : 'Proceed'}
                </button>
              )}
              {step === 4 && (
                <button
                  onClick={handlePinSubmit}
                  disabled={pin.length !== 4}
                  className={`w-full bg-[#FF8A65] text-white py-3 rounded-md hover:bg-[#FF7043] transition-colors ${
                    pin.length !== 4 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Submit
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