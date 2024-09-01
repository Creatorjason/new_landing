import React, { useState } from 'react';
import { Moneys, Happyemoji, VoiceCricle, Menu, Send } from 'iconsax-react';
import PayModal from '../../inchatmodal/PayModal';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [lastTransfer, setLastTransfer] = useState(null);

  const togglePaymentModal = () => {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  };

  const handleSuccessfulTransfer = (transferDetails) => {
    setLastTransfer(transferDetails);
    // Here you would typically send this information to your backend
    // and then update the chat with the new message
    console.log('Transfer successful:', transferDetails);
  };

  const renderReceipt = () => {
    if (!lastTransfer) return null;

    return (
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-2">Transfer Receipt</h3>
        <p>Amount: ₦{lastTransfer.amount.toLocaleString()}</p>
        <p>Recipient: {lastTransfer.recipientName}</p>
        <p>Date: {new Date(lastTransfer.date).toLocaleString()}</p>
        <p>Status: Successful</p>
      </div>
    );
  };

  return (
    <>
      {renderReceipt()}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-md p-2">
          <div className='flex items-center justify-between'>
            <input
              type="text"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow bg-transparent outline-none mx-2 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button className="p-2 rounded-md">
              <Send size={22} className="text-[#FF8A65]" variant="Bold"/>
            </button>
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <Menu size={20} color="#FF8A65"/>
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <VoiceCricle size={20} color="#FF8A65"/>
            </button>
            <button 
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={togglePaymentModal}
            >
              <Moneys size={20} color="#FF8A65"/>
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <Happyemoji size={20} color="#FF8A65"/>
            </button>
          </div>
        </div>
      </div>
      <PayModal 
        isOpen={isPaymentModalOpen} 
        onClose={togglePaymentModal}
        onSuccessfulTransfer={handleSuccessfulTransfer}
      />
    </>
  );
};

export default ChatInput;