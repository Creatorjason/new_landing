import React from 'react';

const RecipientInput = ({ recipientName, setRecipientName }) => {
  return (
    <div className="flex-grow flex flex-col justify-center">
      <input
        type="text" disabled
        placeholder="Enter recipient's UNS"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        className="w-full p-2 py-3 mb-4 text-sm border outline-none rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
};

export default RecipientInput;