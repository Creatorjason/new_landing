import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle } from 'iconsax-react';
import { toast } from 'react-hot-toast';
import { Warning2, Refresh, TickCircle } from 'iconsax-react';

const MITD = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    transactionID: '',
    timestamp: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirm = () => {
    // Here you would typically make an API call to process the MITD request
    // For now, we'll just simulate a successful operation
    toast.success('MITD request processed successfully');
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ username: '', transactionID: '', timestamp: '' });
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
        >
          <motion.div
            className="bg-white dark:bg-[#1C2626] rounded-lg p-6 w-[23rem] mx-3 md:m-0 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-semibold flex items-center gap-x-2">
                <Refresh size="20" className='text-[#141F1F] dark:text-white'/> <span>Reverse Transaction</span>
              </h2>
              <button onClick={handleClose}>
                <CloseCircle className="text-[#141F1F] dark:text-white" />
              </button>
            </div>

            <AnimatePresence mode='wait'>
              {step === 1 && (
                <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm mb-2">Username (UNS)</label>
                    <input
                      type="text"
                      id="username" placeholder='Enter your UNS'
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full text-sm p-2 focus:border-gray-100 outline-none py-3 border border-gray-500 rounded bg-[#141F1F] text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="transactionID" className="block text-sm mb-2">Transaction ID</label>
                    <input
                      type="text"
                      id="transactionID" placeholder='Enter your Transaction ID'
                      name="transactionID"
                      value={formData.transactionID}
                      onChange={handleInputChange}
                      className="w-full text-sm p-2 focus:border-gray-100 outline-none py-3 border border-gray-500 rounded bg-[#141F1F] text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="timestamp" className="block text-sm mb-2">Timestamp</label>
                    <input
                      type="datetime-local"
                      id="timestamp" placeholder='Select Date'
                      name="timestamp"
                      value={formData.timestamp}
                      onChange={handleInputChange}
                      className="w-full text-sm p-2 focus:border-gray-100 outline-none py-3 border border-gray-500 rounded bg-[#141F1F] text-white"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#141F1F] shadow-sm shadow-[#7DF9FF] text-white p-2 rounded">Use MITD</button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='flex flex-col justify-center text-center items-center gap-y-4'>
                  <div className='flex justify-center items-center'>
                    <Warning2 size="60" color="#FFD700" variant="Bulk"/>
                  </div>
                  <div>
                    <p className="mb-4 font-bold text-lg">MITD Warning!</p>
                    <p className="mb-4 text-sm">
                      Using MITD can be costly, so only proceed if you&apos;re certain your funds were obtained incorrectly. Otherwise, you risk facing a potential ban.
                    </p>
                    <div className="flex flex-col justify-between gap-y-4">
                      <button onClick={handleConfirm} className="bg-[#141F1F] font-medium text-sm text-white p-2 shadow-sm shadow-[#7DF9FF] rounded w-full">Yes, I understand</button>
                      <button onClick={handleClose} className="bg-white text-sm font-medium text-[#141f1f] p-2 rounded w-full">No, nevermind</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='flex flex-col justify-center text-center items-center gap-y-4'>
                  <div className='flex justify-center items-center'>
                    <TickCircle size="60" color="#22C55E" variant="Bulk"/>
                  </div>
                  <div>
                    <p className="mb-4 font-bold text-lg">Your funds are safe now!</p>
                    <p className="mb-2 font-semibold text-sm">MITD Mode Activated!</p>
                    <div className='flex justify-center gap-x-4'>
                      <div className='flex flex-col justify-between text-left mb-4'>
                        <p className="mb-1 text-sm">Transaction ID:</p>
                        <p className="mb-1 text-sm">Timestamp:</p>
                      </div>
                      <div className='flex flex-col justify-between text-left mb-4'>
                        <p className="mb-1 text-sm">{formData.transactionID}</p>
                        <p className="mb-1 text-sm">{new Date(formData.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleClose} className="w-full font-medium bg-green-500 text-white p-2 rounded">Done</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MITD;

