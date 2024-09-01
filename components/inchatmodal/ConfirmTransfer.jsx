import React from 'react';

const ConfirmTransfer = ({ amount, recipientName }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center text-center">
      <div className="bg-[#7DF9FF1A] border border-[#7DF9FF70] rounded-lg p-3 px-6 inline-block mb-2">
        <span className="text-4xl font-bold">?</span>
      </div>
      <h3 className="text-xl font-bold mb-4">Proceed to transfer</h3>
      {/* <p className="mb-2 border w-full">Amount: ₦{amount}</p> */}
      <p className="mb-4 text-base">You are sending <span className='text-[#208b24] dark:text-[#11C017] font-extrabold'>₦{amount}</span> to <span className='text-[#208b24] dark:text-[#11C017] font-extrabold'>{recipientName}</span>. If this is your first time, please confirm the recipient UNS before proceeding.</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Please confirm if you want to proceed with this transfer. If not, simply press the &apos;&larr;&apos; arrow to go back.
      </p>
    </div>
  );
};

export default ConfirmTransfer;