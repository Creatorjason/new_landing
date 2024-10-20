import React from 'react';

const ConfirmOrderStep = ({ onConfirm, onReject }) => {
  return (
    <div className="text-center">
      <div className="bg-[#7DF9FF1A] border border-[#7DF9FF70] rounded-lg p-2 px-5 inline-block mb-2">
        <span className="text-5xl font-bold">?</span>
      </div>
      <h3 className="text-lg font-bold mb-2">Proceed to Confirm Order</h3>
      <p className="text-sm mb-4">Make a wise decision today! Do you want to accept or reject this order?</p>
      <button
        className="w-full bg-[#141F1F] text-white py-2 rounded-md mb-2 dark:shadow dark:shadow-[#7df8ff3d]"
        onClick={onConfirm}
      >
        Yes, accept
      </button>
      <button
        className="w-full bg-red-500 text-white py-2 rounded-md"
        onClick={onReject}
      >
        No, reject
      </button>
    </div>
  );
};

export default ConfirmOrderStep;