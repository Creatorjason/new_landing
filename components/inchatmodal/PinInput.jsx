import React from 'react';

const PinInput = ({ pin, setPin, recipientName }) => {
  
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <h3 className="text-xl mb-4">Enter PIN</h3>
      <div className="flex mb-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-12 h-12 border-2 mx-1 rounded-full flex items-center justify-center ${
              pin.length > i ? 'border-[#11C017]' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {pin.length > i && '•'}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6 mx-auto max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '←'].map((num, index) => (
          <button
            key={index}
            onClick={() => {
              if (num === '←') {
                setPin(pin.slice(0, -1));
              } else if (pin.length < 4 && num !== '') {
                setPin(pin + num);
              }
            }}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-6 px-8 text-xl md:text-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PinInput;