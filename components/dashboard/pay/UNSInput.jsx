import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UNSInput = ({ onConfirm }) => {
  const [error, setError] = useState('');
  const [uns, setUns] = useState('');

  const handleConfirm = () => {
    if (uns === "") {
      setError('Recipient UNS cannot be blank.');
    } else {
      setError("");
      onConfirm(uns);
    }
  };

  useEffect(() => {
    if (uns !== "") {
      setError("");
    }
  }, [uns]);

  return (
    <motion.div
      className="transition-all ease-in-out duration-200"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <h2 className="text-lg font-semibold mb-4">Enter UNS</h2>
      <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">Unique Naming System (UNS)</p>
      <input
        type="text"
        value={uns}
        onChange={(e) => setUns(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter UNS"
      />
      <AnimatePresence>
        {error && (
          <motion.p 
            className="text-red-500 text-xs font-medium -mt-2 mb-4 w-max bg-red-50 px-4 py-1.5 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <button
        onClick={handleConfirm}
        className={`${uns === "" ? "bg-gray-400" : "bg-[#141F1F]"} w-full text-white py-3 rounded-md hover:bg-[#1c2b2b] transition duration-300 dark:shadow dark:shadow-[#7df8ff3d]`}
      >
        Confirm
      </button>
    </motion.div>
  );
};

export default UNSInput;