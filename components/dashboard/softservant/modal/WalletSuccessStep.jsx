import React from 'react';

const SuccessStep = ({ onViewReceipt }) => {
  return (
    <div className="text-center">
      <div className="mb-4">
        {/* Replace with actual icon */}
        <span className="text-6xl">🎉</span>
      </div>
      <h3 className="text-lg font-bold mb-2">Order Successful!</h3>
      <p className="text-sm mb-4">You have successfully accepted this order!</p>
      <button
        className="w-full bg-[#141F1F] text-white py-2 rounded-md"
        onClick={onViewReceipt}
      >
        View Receipt
      </button>
    </div>
  );
};

export default SuccessStep;