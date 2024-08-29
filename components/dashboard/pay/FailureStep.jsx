import React from 'react';

const FailureStep = ({ amount, currency, onGoBack }) => {
  return (
    <div className="text-center">
      <div className="mb-4">
        {/* Replace with actual icon */}
        <span className="text-6xl">❌</span>
      </div>
      <h3 className="text-lg font-bold mb-2">Transfer Failed!</h3>
      <p className="text-sm mb-4">Your transfer of {amount} {currency} to sarah banks has failed</p>
      <button
        className="w-full bg-[#141F1F] text-white py-2 rounded-md"
        onClick={onGoBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default FailureStep;