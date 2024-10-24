import { ArrowLeft, ProfileCircle, User, Receipt21, WalletAdd1 } from 'iconsax-react';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import ChatInput from "./ChatInput";
import { useSession } from "next-auth/react";
import useWebSocket from '@/hooks/useWebSocket';
import TopUpModal from '../softservant/TopUpModal';

const ChatView = ({ chat, onBack, selectedChat, chatIdentifier, handleUpdateChat, isSoftServantMode = false }) => {
  const balance = 0;
  const { data: session } = useSession();
  const { messages: liveMessages, sendMessage, sendTransactionAlert, isConnected } = useWebSocket(session.user.username);
  const [allMessages, setAllMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${chatIdentifier}`)) || { message: [] };
    
    const newLiveMessages = liveMessages.filter(liveMsg => 
      !chatHistory.message.some(historyMsg => historyMsg.timestamp === liveMsg.timestamp)
    );
    
    if (newLiveMessages.length > 0) {
      const combinedMessages = [...chatHistory.message, ...newLiveMessages];
      
      const sortedMessages = combinedMessages.sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );

      setAllMessages(sortedMessages);

      const updatedChatHistory = {
        ...chatHistory,
        message: sortedMessages
      };
      localStorage.setItem(`chatHistory_${chatIdentifier}`, JSON.stringify(updatedChatHistory));
    } else {
      setAllMessages(chatHistory.message);
    }

    scrollToBottom();
  }, [selectedChat, liveMessages, chatIdentifier, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
    window.addEventListener('resize', scrollToBottom);

    return () => {
      window.removeEventListener('resize', scrollToBottom);
    };
  }, [scrollToBottom]);

  const isReceiptContent = useCallback((content) => {
    try {
      const parsedContent = JSON.parse(content);
      return parsedContent && typeof parsedContent === 'object' && 'amount' in parsedContent;
    } catch {
      return false;
    }
  }, []);

  const renderMessage = useCallback((msg) => {
    const isCurrentUser = msg.sender === session.user.username;
    
    if (typeof msg.content === 'string' && isReceiptContent(msg.content)) {
      // Transaction receipt
      const receiptContent = JSON.parse(msg.content);
      return (
        <div key={msg.timestamp} className={`mb-6 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
          <div className={`flex ${isCurrentUser ? 'items-end' : 'items-start'} max-w-xs sm:max-w-sm`}>
            {!isCurrentUser && (
              <ProfileCircle
                size="32"
                color="#6366F1"
                className="mr-2 mb-2"
                variant="Bold"
              />
            )}

            <div className="flex flex-col">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <Receipt21 size="24" color="#10B981" variant="Bold" />
                    <span className="ml-2 font-bold text-sm text-green-600 dark:text-green-400">Transaction Receipt</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(receiptContent.date).toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span className='font-medium'>{receiptContent.selectedCurrency?.code} {receiptContent.amount}</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">From:</span>
                    <span className='font-medium'>{receiptContent.from}</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">To:</span>
                    <span className='font-medium'>{receiptContent.recipientName}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 self-end">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
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
  }, [session.user.username, isReceiptContent]);

  const memoizedMessages = useMemo(() => allMessages.map(renderMessage), [allMessages, renderMessage]);

  const handleSuccessfulTransfer = useCallback((transferDetails) => {
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
  }, [session.user.username, chatIdentifier, selectedChat?.id, sendTransactionAlert]);

  return (
    <div className="h-dvh md:h-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-all ease-in-out duration-200 relative">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 sm:hidden hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors">
            <ArrowLeft size="24" />
          </button>
          <div>
            <h2 className="text-lg md:text-xl font-bold">{chat.name}</h2>
            <small className={`px-2 py-1 text-xs font-medium rounded-full ${isConnected ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900' : 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'}`}>
              {isConnected ? 'Connection active' : 'Connecting...'}
            </small>
          </div>
        </div>
        {isSoftServantMode && (
          <button 
            onClick={() => setIsTopUpModalOpen(true)} 
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
          >
            <WalletAdd1 size="18" variant='Bulk' className="mr-2" />
            Add Money
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)] h-full space-y-4">
          {memoizedMessages}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <ChatInput 
          selectedChatId={selectedChat?.id} 
          sendMessage={sendMessage}
          handleUpdateChat={handleUpdateChat}
          onSuccessfulTransfer={handleSuccessfulTransfer}
          isSoftServantMode={!isSoftServantMode}
        />
      </div>
      
      {/* TopUpModal */}
      <TopUpModal 
        isOpen={isTopUpModalOpen}
        balance={balance}
        onClose={() => setIsTopUpModalOpen(false)} 
      />
    </div>
  );
};

export default React.memo(ChatView);
