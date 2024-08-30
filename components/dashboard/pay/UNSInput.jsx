import React, { useState } from 'react';

const UNSInput = ({ onConfirm }) => {
  const [uns, setUns] = useState('');

  const handleConfirm = () => {
    if (uns.trim()) {
      onConfirm(uns);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Confirm UNS</h2>
      <p className="text-sm text-gray-600 mb-4">Unique Naming System (UNS)</p>
      <input
        type="text"
        value={uns}
        onChange={(e) => setUns(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter UNS"
      />
      <button
        onClick={handleConfirm}
        className="w-full bg-[#141F1F] text-white py-3 rounded-md hover:bg-[#1c2b2b] transition duration-300"
      >
        Confirm
      </button>
    </div>
  );
};

export default UNSInput;