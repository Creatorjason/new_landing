import React from 'react';
import { CloseCircle, Receipt1 } from 'iconsax-react';

const Receipt = ({ amount, date, status, transactionType, bankName, accountNumber, resetModal, accountName, transactionID, onClose }) => {
  const handleDownload = () => {
    const receiptElement = document.getElementById('receipt');
    const receiptHtml = receiptElement.outerHTML;
    const blob = new Blob([receiptHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt-${transactionID}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    resetModal()
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div id="receipt" className="bg-white dark:bg-[#1C2626] rounded-lg p-6 w-[23rem] mx-3 md:m-0 relative">
        <div className="mb-4 border-b border-dashed border-[#999999] bg-transparent dark:border-[#dbdbdb]">
          <div className='mb-4 flex items-center justify-between'>
            <h2 className="text-base font-semibold text-center">Transaction Receipt</h2>
            <button onClick={onClose}><CloseCircle className="text-[#141F1F] dark:text-white"/></button>
          </div>
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-green-700 dark:text-[#11BB16]">+₦{amount}</p>
            <p className="text-[#666666] dark:text-[#dbdbdb] text-sm">{date}</p>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-y-4">
          <p className='flex items-center justify-between text-sm md:text-base text-[#666666] dark:text-gray-400'><strong>Status:</strong> <span className="text-[#11BB16] py-1 px-3 rounded-full text-sm bg-[#E8FDE8] dark:bg-[#11bb172c]">{status}</span></p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'><strong className='text-[#666666] dark:text-gray-400'>Transaction Type:</strong> {transactionType}</p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'><strong className='text-[#666666] dark:text-gray-400'>Bank Name:</strong> {bankName}</p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'><strong className='text-[#666666] dark:text-gray-400'>Account Number:</strong> {accountNumber}</p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'><strong className='text-[#666666] dark:text-gray-400'>Account Name:</strong> {accountName}</p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'><strong className='text-[#666666] dark:text-gray-400'>Transaction ID:</strong> {transactionID}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="bg-[#141F1F] w-full text-white p-3 text-sm md:text-base rounded flex items-center justify-center gap-x-2 dark:shadow dark:shadow-[#7df8ff3d]"
          >
            <span>Download Receipt</span>
            <Receipt1 size={18} color="#FFFFFF"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
