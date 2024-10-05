import React, { useState } from 'react';
import { Moneys, Happyemoji, VoiceCricle, Menu, ArrowCircleUp2 } from 'iconsax-react';
import PayModal from '../../inchatmodal/PayModal';

const ChatInput = ({ selectedChatId, handleUpdateChat, sendMessage, onSuccessfulTransfer }) => {
  const [message, setMessage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const togglePaymentModal = () => {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      sendMessage(selectedChatId, message);
      setMessage('');
    }
  };

  const handleSuccessfulTransfer = (transferDetails) => {
    // Call the onSuccessfulTransfer callback provided by the parent component
    onSuccessfulTransfer(transferDetails);

    // Close the payment modal
    setIsPaymentModalOpen(false);
  };

  return (
    <>
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2626] mb-0">
        <div className="flex flex-col bg-gray-50 dark:bg-[#141F1F] rounded-md p-2">
          <form onSubmit={handleSubmit} className='flex items-center justify-between'>
            <input
              type="text"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow bg-transparent outline-none mx-2 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button type='submit' className="p-2">
              <ArrowCircleUp2 size={30} className="text-[#141F1F] dark:text-white" variant="Bold"/>
            </button>
          </form>
          <div className="flex items-center">
            <button className="p-2">
              <Menu size={20} className="text-[#141F1F] dark:text-white" />
            </button>
            <button className="p-2">
              <VoiceCricle size={20} className="text-[#141F1F] dark:text-white" />
            </button>
            <button
              className="p-2"
              onClick={togglePaymentModal}
            >
              <Moneys size={20} className="text-[#141F1F] dark:text-white" />
            </button>
            <button className="p-2">
              <Happyemoji size={20} className="text-[#141F1F] dark:text-white" />
            </button>
          </div>
        </div>
      </div>
      <PayModal
        isOpen={isPaymentModalOpen}
        onClose={togglePaymentModal}
        onSuccessfulTransfer={handleSuccessfulTransfer}
        selectedChatId={selectedChatId}
      />
    </>
  );
};

export default ChatInput;