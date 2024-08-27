import React from 'react';
import { motion } from 'framer-motion';

const ConfirmationStep = ({ onConfirm, onBack }) => {
  return (
    <motion.div
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
        <button onClick={onConfirm} className="w-auto p-3 py-2 text-sm rounded border border-[#141F1F] bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]">
          Yes, confirm & send money
        </button>
        <button onClick={onBack} className="w-auto text-[#141F1F] dark:text-white p-3 py-2 text-sm rounded border border-gray-300">
          No, cancel
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmationStep;