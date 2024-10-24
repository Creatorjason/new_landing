import React from 'react';
import { Delete } from 'lucide-react';

const PinInput = ({ pin, setPin, recipientName }) => {
  const handlePinInput = (value) => {
    if (value === 'backspace') {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Enter transaction PIN</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 text-center">
        Please enter your 4-digit PIN to confirm the transfer to <span className='font-semibold capitalize'>{recipientName}</span>
      </p>
      <div className="flex justify-center space-x-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-14 h-14 border-2 rounded-md flex items-center justify-center ${
              pin.length > i 
                ? 'border-green-500 bg-green-100 dark:bg-green-900' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {pin.length > i && (
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-md"></div>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'backspace'].map((num, index) => (
          <button
            key={index}
            onClick={() => handlePinInput(num)}
            className={`w-20 h-20 rounded-md text-2xl font-semibold 
              ${num === '' 
                ? 'invisible'
                : num === 'backspace'
                  ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              } 
              transition-colors duration-200 flex items-center justify-center`}
          >
            {num === 'backspace' ? <Delete size="24" /> : num}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
        Forgot your PIN? Contact support for assistance.
      </p>
    </div>
  );
};

export default PinInput;
