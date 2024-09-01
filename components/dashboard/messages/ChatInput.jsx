import React, { useState } from 'react';
import { Moneys, Happyemoji, VoiceCricle, Menu, Send } from 'iconsax-react';
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
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sm:mb-0 mb-16"> {/* mb-16 ensures space for bottom navigation on mobile */}
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
