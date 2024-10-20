import React from 'react';
import { InfoCircle } from 'iconsax-react';

const ConfirmTransfer = ({ amount, recipientName }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center text-center p-4 max-w-md mx-auto">
      <div className="bg-blue-100 dark:bg-[#7df8ff2a] rounded-full p-4 mb-6">
        <InfoCircle size="36" className="text-blue-500 dark:text-[#7df8ff]" variant="Bulk" />
      </div>
      <h3 className="text-2xl font-bold mb-6 text-[#141f1f] dark:text-white">Confirm Transfer</h3>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">You are sending</p>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">₦{amount}</p>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">To</p>
        {recipientName ? (
          <p className="text-xl capitalize font-semibold text-[#141f1f] dark:text-white flex items-center justify-center">
            {recipientName}
          </p>
        ) : (
          <p className="text-xl font-semibold text-red-500 flex items-center justify-center">
            Unknown Recipient
          </p>
        )}
      </div>
      {recipientName ? (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          If this is your first time, please confirm the recipient UNS before proceeding.
        </p>
      ) : (
        <p className="text-sm text-red-500 mb-6">
          Please ensure you have selected a valid recipient before proceeding.
        </p>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        To go back, press the &apos;←&apos; arrow in the top left corner.
      </p>
    </div>
  );
};

export default ConfirmTransfer;
