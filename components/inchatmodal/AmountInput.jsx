import React, { useState } from 'react';
import { formatNumber } from './utils';

const currencies = [
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { code: 'JPY', flag: '🇯🇵', name: 'Japanese Yen' },
  { code: 'NGN', flag: '🇳🇬', name: 'Nigerian Naira' },
];

const AmountInput = ({ 
  amount, 
  balance, 
  formattedAmount, 
  setAmount, 
  setFormattedAmount,
  isLoading,
  isError
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const handleSelectChange = (event) => {
    const newCurrency = currencies.find(c => c.code === event.target.value);
    setSelectedCurrency(newCurrency);
  };

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

  const handleDecimalPoint = () => {
    if (!amount.includes('.')) {
      const newAmount = amount + '.';
      setAmount(newAmount);
      setFormattedAmount(formatNumber(newAmount));
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full max-w-md mx-auto">
      <div className="mb-2 w-full">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter Amount *
        </label>
        <div className="flex items-center bg-white dark:bg-[#1C2626] border p-2 py-1 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none gap-x-4">
          <select
            value={selectedCurrency.code}
            onChange={handleSelectChange}
            className="bg-white dark:bg-[#1C2626] border-none focus:outline-none text-gray-700 dark:text-gray-300 py-2 pl-2 pr-4"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code}
              </option>
            ))}
          </select>
          <div className="flex-grow">
            <span className="text-xl font-bold dark:text-white text-gray-800">
              {formattedAmount || '0.00'}
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-10">
        Wallet balance: {selectedCurrency.code} {' '}
        {isLoading ? 'Loading...' : 
         isError ? 'Error fetching balance' : 
         balance.toLocaleString()}
      </p>
      <div className="grid grid-cols-3 gap-4 mx-auto mb-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
          <button
            key={num}
            onClick={() => num === '.' ? handleDecimalPoint() : handleNumberClick(num.toString())}
            className="bg-white justify-self-center dark:bg-[#141f1f] text-[#141f1f] dark:text-white rounded-md aspect-square w-20 text-xl font-semibold hover:text-white hover:bg-[#141f1f] dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
          >
            {num}
          </button>
        ))}
        <button
          onClick={handleBackspace}
          className="bg-white ml-2 dark:bg-[#141f1f] text-red-600 rounded-md aspect-square w-20 text-xl font-semibold hover:text-white hover:bg-red-600 dark:hover:bg-red-600 transition-colors border border-gray-200 dark:border-gray-600"
        >
          ←
        </button>
      </div>
    </div>
  );
};

export default AmountInput;
