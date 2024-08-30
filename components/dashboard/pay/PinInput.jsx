import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CloseCircle } from 'iconsax-react';

const PinInput = ({ onCreatePin, pin, setPin, onClose }) => {
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const pinRefs = useRef([...Array(4)].map(() => React.createRef()));
  const confirmPinRefs = useRef([...Array(4)].map(() => React.createRef()));

  const handlePinChange = (index, value, isPinConfirmation) => {
    if (/^[0-9]?$/.test(value)) {
      const newPin = isPinConfirmation ? [...confirmPin] : [...pin];
      newPin[index] = value;
      isPinConfirmation ? setConfirmPin(newPin) : setPin(newPin);
      if (value !== '' && index < 3) {
        const nextRef = isPinConfirmation ? confirmPinRefs.current[index + 1] : pinRefs.current[index + 1];
        nextRef.current.focus();
      }
    }
  };

  const handlePinKeyDown = (index, e, isPinConfirmation) => {
    if (e.key === 'Backspace') {
      const currentPin = isPinConfirmation ? confirmPin : pin;
      if (currentPin[index] === '' && index > 0) {
        const prevRef = isPinConfirmation ? confirmPinRefs.current[index - 1] : pinRefs.current[index - 1];
        prevRef.current.focus();
      }
    }
  };

  const handleCreatePin = () => {
    if (pin.join('') !== confirmPin.join('')) {
      setError('PINs do not match. Please try again.');
    } else if (pin.join('').length !== 4) {
      setError('Please enter a 4-digit PIN.');
    } else {
      onCreatePin(pin.join(''));
    }
  };

  return (
    <motion.div
      className=""
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium">Enter a PIN</p>
        <div className="flex justify-between mb-4">
          {pin.map((digit, index) => (
            <input
              key={`pin-${index}`}
              ref={pinRefs.current[index]}
              type="password"
              maxLength="1"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value, false)}
              onKeyDown={(e) => handlePinKeyDown(index, e, false)}
              className="w-16 h-16 text-center border rounded-lg outline-none dark:bg-[#1c2626] border-[#5f5e5e4e] focus:border-[#a2a2a2c2]"
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium">Re-enter PIN</p>
        <div className="flex justify-between mb-4">
          {confirmPin.map((digit, index) => (
            <input
              key={`confirm-pin-${index}`}
              ref={confirmPinRefs.current[index]}
              type="password"
              maxLength="1"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value, true)}
              onKeyDown={(e) => handlePinKeyDown(index, e, true)}
              className="w-16 h-16 text-center border rounded-lg outline-none dark:bg-[#1c2626] border-[#5f5e5e4e] focus:border-[#a2a2a2c2]"
            />
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs font-medium -mt-2 mb-4 w-max bg-red-50 px-4 py-1.5 rounded-full">{error}</p>}

      <button
        onClick={handleCreatePin}
        className="w-full p-3 py-2 text-sm rounded border border-[#141F1F] bg-[#141F1F] text-white dark:shadow dark:shadow-[#7df8ff3d]"
      >
        Confirm PIN and Proceed
      </button>
    </motion.div>
  );
};

export default PinInput;