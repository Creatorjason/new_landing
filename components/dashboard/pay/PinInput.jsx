import React from 'react';
import { motion } from 'framer-motion';

const PinInput = ({ pin, setPin, onCreatePin, onBack }) => {
  const handlePinChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value !== '' && index < 3) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      const newPin = [...pin];

      if (newPin[index] === '') {
        if (index > 0) {
          document.getElementById(`pin-${index - 1}`).focus();
          newPin[index - 1] = '';
        }
      } else {
        newPin[index] = '';
      }

      setPin(newPin);
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
    >
      <h3 className="mb-4">Enter your Pin</h3>
      <div className="flex justify-between mb-4">
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`pin-${index}`}
            type="password"
            maxLength="1"
            value={digit}
            autoComplete='off'
            onChange={(e) => handlePinChange(index, e.target.value)}
            onKeyDown={(e) => handlePinKeyDown(index, e)}
            className="w-16 h-16 text-center border rounded-lg outline-none dark:bg-[#1c2626] border-[#e2e2e27e] focus:border-[#a2a2a2c2]"
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-2 justify-between">
        <button
          onClick={onCreatePin}
          className="w-auto p-3 py-2 text-sm rounded border border-[#141F1F] bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]"
        >
          Create PIN and Proceed
        </button>
        <button
          onClick={onBack}
          className="w-auto text-[#141F1F] dark:text-white p-3 py-2 text-sm rounded border border-gray-300"
        >
          Back
        </button>
      </div>
    </motion.div>
  );
};

export default PinInput;