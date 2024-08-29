import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WalletAmountInput = ({ amount, setAmount, currency, setCurrency, balance, onProceed }) => {
  const [error, setError] = useState('');

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

  const currencies = ['USD', 'EUR', 'NGN', 'GBP'];

  return (
    <motion.div
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
              let numericValue = e.target.value.replace(/[^0-9.]/g, '');
              const parts = numericValue.split('.');
              if (parts.length > 2) {
                numericValue = `${parts[0]}.${parts.slice(1).join('')}`;
              }
              if (parts[0]) {
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }
              const formattedValue = parts.join('.');
              setAmount(formattedValue);
            }}
            className="w-full p-2 outline-none bg-white dark:bg-[#1c2626]"
            placeholder="Enter amount"
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                e.preventDefault();
              }
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
        onClick={onProceed}
        disabled={!!error || amount === ''}
        className={`w-full p-3 py-2 text-sm font-medium rounded ${
          error || amount === '' ? 'bg-gray-300 dark:bg-gray-800 cursor-not-allowed' 
          : 'bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]'
        }`}
      >
        Proceed
      </button>
    </motion.div>
  );
};

export default WalletAmountInput;