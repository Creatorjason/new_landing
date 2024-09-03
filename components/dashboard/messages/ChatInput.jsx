import React, { useState } from 'react';
import { Moneys, Happyemoji, VoiceCricle, Menu, ArrowCircleUp2 } from 'iconsax-react';
import PayModal from '../../inchatmodal/PayModal';
import { chats } from '../../../data/chats'; // Import the chats array

const ChatInput = ({ selectedChatId, onUpdateChat }) => {
  const [message, setMessage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [lastTransfer, setLastTransfer] = useState(null);

  const togglePaymentModal = () => {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  };

  const handleSuccessfulTransfer = (transferDetails) => {
    setLastTransfer(transferDetails);

    // Create the receipt message
    const receiptMessage = {
      id: Date.now(), // Use a unique ID, could use a better ID generation approach
      sender: "You",
      content: `Transfer successful! Amount: ₦${transferDetails.amount.toLocaleString()}, Recipient: ${transferDetails.recipientName}, Date: ${new Date(transferDetails.date).toLocaleString()}`,
      timestamp: new Date().toISOString(),
    };

    // Find the chat by ID and update it
    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, receiptMessage],
        };
      }
      return chat;
    });

    // Update the chat state in the parent component
    onUpdateChat(updatedChats);
  };

  return (
    <>
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2626] sm:mb-0 mb-16"> {/* mb-16 ensures space for bottom navigation on mobile */}
        <div className="flex flex-col bg-gray-50 dark:bg-[#141F1F] rounded-md p-2">
          <div className='flex items-center justify-between'>
            <input
              type="text"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow bg-transparent outline-none mx-2 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button className="p-2">
              <ArrowCircleUp2 size={30} className="text-[#141F1F] dark:text-white" variant="Bold"/>
            </button>
          </div>
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
      />
    </>
  );
};

export default ChatInput;
