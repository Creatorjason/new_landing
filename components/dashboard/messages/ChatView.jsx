import { ArrowLeft, ProfileCircle, User, Receipt21, WalletAdd1 } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react'
import ChatInput from "./ChatInput";
import { useSession } from "next-auth/react";
import useWebSocket from '@/hooks/useWebSocket';
import TopUpModal from '../softservant/TopUpModal';

const ChatView = ({ chat, chatsData, onBack, selectedChat, chatIdentifier, handleUpdateChat, isSoftServantMode = false }) => {
  const balance = 0;
  const { data: session } = useSession();
  const { messages: liveMessages, sendMessage, sendTransactionAlert, isConnected } = useWebSocket(session.user.username);
  const [allMessages, setAllMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const previousLiveMessagesLengthRef = useRef(0);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${chatIdentifier}`)) || { message: [] };
    
    const newLiveMessages = liveMessages.filter(liveMsg => 
      !chatHistory.message.some(historyMsg => historyMsg.timestamp === liveMsg.timestamp)
    );
    
    const combinedMessages = [...chatHistory.message, ...newLiveMessages];
    
    const sortedMessages = combinedMessages.sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );

    setAllMessages(sortedMessages);

    if (newLiveMessages.length > 0) {
      const updatedChatHistory = {
        ...chatHistory,
        message: sortedMessages
      };
      localStorage.setItem(`chatHistory_${chatIdentifier}`, JSON.stringify(updatedChatHistory));
    }

    scrollToBottom();
    previousLiveMessagesLengthRef.current = liveMessages.length;
  }, [selectedChat, liveMessages, chatIdentifier]);

  useEffect(() => {
    scrollToBottom();
    window.addEventListener('resize', scrollToBottom);

    return () => {
      window.removeEventListener('resize', scrollToBottom);
    };
  }, []);

  const isReceiptContent = (content) => {
    try {
      const parsedContent = JSON.parse(content);
      return parsedContent && typeof parsedContent === 'object' && 'amount' in parsedContent;
    } catch {
      return false;
    }
  };

  const renderMessage = (msg) => {
    const isCurrentUser = msg.sender === session.user.username;
    
    if (typeof msg.content === 'string' && isReceiptContent(msg.content)) {
      // This is a transaction receipt
      const receiptContent = JSON.parse(msg.content);
      return (
        <div key={msg.timestamp} className={`mb-4 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
          <div className={`${isCurrentUser ? 'flex items-end justify-end' : 'flex items-end'}`}>
            {!isCurrentUser && (
              <ProfileCircle
                size="22"
                color="#999999"
                className="mr-2"
                variant="Bold"
              />
            )}

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-w-xs">
              <div className="flex items-center justify-center mb-2">
                <Receipt21 size="24" color="#27962b" variant="Bold" />
                <span className="ml-2 font-bold text-sm">Transaction Receipt</span>
              </div>
              <p className="text-sm p-2">Amount: <span className='font-medium'>₦{receiptContent.amount}</span></p>
              <p className="text-sm p-2">From: <span className='font-medium'>{receiptContent.from}</span></p>
              <p className="text-sm p-2">To: <span className='font-medium'>{receiptContent.recipientName}</span></p>
              <p className="text-sm p-2">Date: <span className='font-medium'>{new Date(receiptContent.date).toLocaleString()}</span></p>
            </div>

            {isCurrentUser && (
              <User
                size="22"
                color="#FF8A65"
                className="ml-2"
                variant="Bold"
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={msg.timestamp} className={`mb-4 ${isCurrentUser ? 'text-right' : ''}`}>
        <div className={`${isCurrentUser ? 'flex items-end justify-end text-right' : 'flex items-end'}`}>
          {!isCurrentUser && (
            <ProfileCircle
              size="22"
              color="#999999"
              className="mr-2"
              variant="Bold"
            />
          )}
 
          <div className={`inline-block text-xs max-w-[250px] sm:max-w-sm p-3 rounded-lg ${isCurrentUser ? 'bg-[#141F1F] text-white' : 'bg-[#F8F8F8] dark:bg-gray-700'}`}>
            {msg.content}
          </div>
 
          {isCurrentUser && (
            <User
              size="22"
              color="#FF8A65"
              className="ml-2"
              variant="Bold"
            />
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(msg.timestamp).toLocaleTimeString()}
        </p>
      </div>
    );
  };
 
  return (
    <div className="h-dvh md:h-full flex flex-col transition-all ease-in-out duration-200 relative">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 sm:hidden">
            <ArrowLeft size="24" />
          </button>
          <div>
            <h2 className="text-sm md:text-base font-bold">{chat.name}</h2>
            <small className={`px-2 py-1 text-[10px] font-medium rounded-full ${isConnected ? 'text-[#27962b] bg-[#11c0171a]' : 'text-red-500 bg-red-100'}`}>
              {isConnected ? 'Connection active' : 'connecting...'}
            </small>
          </div>
        </div>
        {isSoftServantMode && (
          <button 
            onClick={() => setIsTopUpModalOpen(true)} 
            className="flex items-center bg-[#141F1F]/90 hover:bg-[#141F1F] text-white px-3 py-2 rounded-lg text-sm transition-colors duration-200"
          >
            <WalletAdd1 size="16" variant='Bulk' className="mr-1" />
            Add Money
          </button>
        )}
      </div>
      <div className="flex-1">
        <div className="p-4 pb-0 overflow-y-scroll max-h-96 h-auto sm:pb-4">
          {allMessages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="relative sm:static sm:mb-4">
        <ChatInput 
          selectedChatId={selectedChat?.id} 
          sendMessage={sendMessage}
          handleUpdateChat={handleUpdateChat}
          onSuccessfulTransfer={(transferDetails) => {
            const receiptMessage = {
              id: Date.now(),
              sender: session.user.username,
              content: JSON.stringify({
                amount: transferDetails.amount,
                from: session.user.username,
                recipientName: transferDetails.recipientName,
                date: transferDetails.date,
              }),
              timestamp: new Date().toISOString(),
            };
            setAllMessages(prev => [...prev, receiptMessage]);
            const updatedChatHistory = JSON.parse(localStorage.getItem(`chatHistory_${chatIdentifier}`)) || { message: [] };
            updatedChatHistory.message.push(receiptMessage);
            localStorage.setItem(`chatHistory_${chatIdentifier}`, JSON.stringify(updatedChatHistory));
            
            const newContent = JSON.parse(receiptMessage.content)
            sendTransactionAlert(selectedChat?.id, newContent.amount, session.user.username);
          }}
        />
      </div>
      
      {/* Add the TopUpModal component */}
      <TopUpModal 
        isOpen={isTopUpModalOpen} balance={balance}
        onClose={() => setIsTopUpModalOpen(false)} 
      />
    </div>
  );
};

export default ChatView;
