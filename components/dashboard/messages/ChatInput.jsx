import React, { useState, useEffect } from 'react';
import { Moneys, Happyemoji, VoiceCricle, Menu, ArrowCircleUp2 } from 'iconsax-react';
import PayModal from '../../inchatmodal/PayModal';
import ErrandModal from '../../softservantactions/ErrandModal';

const ChatInput = ({ selectedChatId, handleUpdateChat, sendMessage, onSuccessfulTransfer, isSoftServantMode }) => {
  const [message, setMessage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isErrandModalOpen, setIsErrandModalOpen] = useState(false);

  const togglePaymentModal = () => {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  };

  const toggleErrandModal = () => {
    setIsErrandModalOpen(!isErrandModalOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      sendMessage(selectedChatId, message);
      setMessage('');
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSuccessfulTransfer = (transferDetails) => {
    onSuccessfulTransfer(transferDetails);
    setIsPaymentModalOpen(false);
  };

  return (
    <>
      {!isSoftServantMode ? (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2626] mb-0">
          <div className="flex bg-gray-50 dark:bg-[#141F1F] rounded-md p-2">
            <div className="flex items-center">
              <button className="p-2" onClick={toggleErrandModal}>
                <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1699 20.2614L11.5573 12.4235C11.2758 11.5792 12.0792 10.7758 12.9235 11.0573L20.7614 13.6699C21.7462 13.9982 21.7462 15.3911 20.7614 15.7193L17.8672 16.6841C17.5447 16.7916 17.2916 17.0447 17.1841 17.3672L16.2193 20.2614C15.8911 21.2462 14.4982 21.2462 14.1699 20.2614Z" fill="#141F1F"/>
                  <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M11.5 6.75C9.15279 6.75 7.25 8.65279 7.25 11C7.25 12.7835 8.34882 14.3122 9.90922 14.9425C10.2933 15.0976 10.4789 15.5347 10.3237 15.9188C10.1686 16.3029 9.73145 16.4884 9.34739 16.3333C7.2395 15.4818 5.75 13.4157 5.75 11C5.75 7.82436 8.32436 5.25 11.5 5.25C13.9157 5.25 15.9818 6.7395 16.8333 8.84739C16.9884 9.23145 16.8029 9.66857 16.4188 9.82371C16.0347 9.97885 15.5976 9.79328 15.4425 9.40922C14.8122 7.84882 13.2835 6.75 11.5 6.75Z" fill="#141F1F"/>
                  <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M11.5 1.75C6.39137 1.75 2.25 5.89137 2.25 11C2.25 16.0825 6.34923 20.2077 11.4218 20.2497C11.836 20.2531 12.169 20.5917 12.1655 21.0059C12.1621 21.4201 11.8236 21.7531 11.4094 21.7496C5.51395 21.7009 0.75 16.9068 0.75 11C0.75 5.06294 5.56294 0.25 11.5 0.25C17.4068 0.25 22.2009 5.01395 22.2496 10.9094C22.2531 11.3236 21.9201 11.6621 21.5059 11.6655C21.0917 11.669 20.7531 11.336 20.7497 10.9218C20.7077 5.84923 16.5825 1.75 11.5 1.75Z" fill="#141F1F"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-1 items-center justify-between'>
              <input
                type="text"
                placeholder="Write a message"
                value={message}
                onChange={handleInputChange}
                className="flex-grow bg-transparent outline-none mx-2 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button type='submit' className="p-2">
                <ArrowCircleUp2 size={30} className="text-[#141F1F] dark:text-white" variant="Bold"/>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2626] mb-0">
          <div className="flex flex-col bg-gray-50 dark:bg-[#141F1F] rounded-md p-2">
          <form onSubmit={handleSubmit} className='flex items-center justify-between'>
            <input
              type="text"
              placeholder="Write a message"
              value={message}
              onChange={handleInputChange}
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
      )}
      <PayModal
        isOpen={isPaymentModalOpen}
        onClose={togglePaymentModal}
        onSuccessfulTransfer={handleSuccessfulTransfer}
        selectedChatId={selectedChatId}
      />
      <ErrandModal
        isOpen={isErrandModalOpen}
        onClose={toggleErrandModal}
      />
    </>
  );
};

export default ChatInput;
