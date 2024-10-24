import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy } from 'lucide-react';

const TransferSuccess = ({ amount, recipientName, currency }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here to confirm the copy action
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex-grow flex flex-col justify-center items-center text-center p-8 max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div 
        className="text-green-500 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CheckCircle size={64} />
      </motion.div>
      <motion.h3 
        className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        Transfer Successful!
      </motion.h3>
      {amount && recipientName && currency ? (
        <motion.div variants={fadeIn} transition={{ delay: 0.4 }}>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            You have successfully sent
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {currency} {amount}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              to {recipientName}
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <span className="text-sm text-gray-600 dark:text-gray-300">Amount</span>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 dark:text-gray-100 mr-2">{currency} {amount}</span>
                <button onClick={() => copyToClipboard(`${currency} ${amount}`)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <span className="text-sm text-gray-600 dark:text-gray-300">Recipient</span>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 dark:text-gray-100 mr-2">{recipientName}</span>
                <button onClick={() => copyToClipboard(recipientName)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.p 
          className="text-gray-600 dark:text-gray-400"
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          Your transfer has been processed successfully.
        </motion.p>
      )}
    </motion.div>
  );
};

export default TransferSuccess;
