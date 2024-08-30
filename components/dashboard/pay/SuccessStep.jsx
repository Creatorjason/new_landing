import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SuccessStep = ({ amount, onViewReceipt, recipientUNS }) => {
  return (
    <motion.div
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
          You have successfully sent ₦{amount} to {recipientUNS}
        </p>
        <button onClick={onViewReceipt} className="w-full p-3 py-2 text-sm rounded border border-[#141F1F] bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]">
          View Receipt
        </button>
      </div>
    </motion.div>
  );
};

export default SuccessStep;