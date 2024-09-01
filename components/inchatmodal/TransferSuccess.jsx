import React from 'react';

const TransferSuccess = ({ amount, recipientName }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center text-center">
      <div className="text-[#FF8A65] text-5xl mb-4">🎉</div>
      <h3 className="text-2xl font-bold mb-2">Transfer Successful!</h3>
      <p className="text-gray-600 dark:text-gray-400">
        You have successfully sent ₦{amount} to {recipientName}
      </p>
    </div>
  );
};

export default TransferSuccess;