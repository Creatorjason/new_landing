import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UNSInput = ({ onConfirm }) => {
  const [uns, setUns] = useState('');

  const handleConfirm = () => {
    if (uns.trim()) {
      onConfirm(uns);
    }
  };

  return (
    <motion.div
      className=""
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <h2 className="text-lg font-semibold mb-4">Confirm UNS</h2>
      <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">Unique Naming System (UNS)</p>
      <input
        type="text"
        value={uns}
        onChange={(e) => setUns(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter UNS"
      />
      <button
        onClick={handleConfirm}
        className="w-full bg-[#141F1F] text-white py-3 rounded-md hover:bg-[#1c2b2b] transition duration-300 dark:shadow dark:shadow-[#7df8ff3d]"
      >
        Confirm
      </button>
    </motion.div>
  );
};

export default UNSInput;