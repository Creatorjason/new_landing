import React from 'react';
import { formatNumber } from './utils';

const AmountInput = ({ amount, balance, formattedAmount, setAmount, setFormattedAmount }) => {
  const handleNumberClick = (num) => {
    if (amount.length < 10) {
      const newAmount = amount + num;
      setAmount(newAmount);
      setFormattedAmount(formatNumber(newAmount));
    }
  };

  const handleBackspace = () => {
    const newAmount = amount.slice(0, -1);
    setAmount(newAmount);
    setFormattedAmount(formatNumber(newAmount));
  };

  return (
    <>
      <div className="text-center mb-6">
        <span className="text-3xl md:text-4xl font-bold dark:text-white text-[#141f1f]">₦{formattedAmount || '0.00'}</span>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Wallet balance: ₦{balance.toLocaleString()}</p>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-4 mb-6 mx-auto max-w-[280px] md:max-w-xs">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-gray-100 dark:bg-gray-700 text-[#141f1f] dark:text-white rounded-full p-6 px-8 text-xl md:text-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleBackspace}
          className="bg-gray-100 dark:bg-gray-700 text-[#141f1f] dark:text-white rounded-full p-6 px-8 text-xl md:text-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          ←
        </button>
      </div>
    </>
  );
};

export default AmountInput;