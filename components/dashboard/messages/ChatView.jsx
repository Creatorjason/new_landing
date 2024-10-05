import { ArrowLeft, ProfileCircle, User } from 'iconsax-react';
import React, { useEffect, useRef } from 'react'
import ChatInput from "./ChatInput";
import { useSession } from "next-auth/react";
import useWebSocket from '@/hooks/useWebSocket';

const ChatView = ({ chat, chatsData, onBack, selectedChat, handleUpdateChat }) => {
  const { data: session } = useSession();
  const { messages, sendMessage } = useWebSocket(session.user.username);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const renderMessage = (msg) => {
    const isCurrentUser = msg.sender === session.user.username;
  
    return (
      <div key={msg.id} className={`mb-4 ${isCurrentUser ? 'text-right' : ''}`}>
        <div className={`${isCurrentUser ? 'flex items-end justify-end text-right' : 'flex items-end'}`}>
          {!isCurrentUser && (
            <ProfileCircle
              size="22"
              color="#999999"
              className="mr-2"
              variant="Bold"
            />
          )}
  
          {/* Conditionally render the message content */}
          <div className={`inline-block text-xs max-w-[250px] sm:max-w-sm p-3 rounded-lg ${isCurrentUser ? 'bg-[#141F1F] text-white' : 'bg-[#F8F8F8] dark:bg-gray-700'}`}>
            {typeof msg.content === 'string' ? (
              msg.content  // Render string content normally
            ) : (
              <div>
                {/* Render receipt details directly if content is an object/JSX */}
                <p>Transfer successful!</p>
                <p>Amount: ₦{msg.content.amount.toLocaleString()}</p>
                <p>Recipient: {msg.content.recipientName}</p>
                <p>Date: {new Date(msg.content.date).toLocaleString()}</p>
              </div>
            )}
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
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button onClick={onBack} className="mr-4 sm:hidden">
          <ArrowLeft size="24" />
        </button>
        <div>
          <h2 className="text-sm md:text-base font-bold">{chat.name}</h2>
          <small className='text-[#27962b] bg-[#11c0171a] px-2 py-1 text-[10px] font-medium rounded-full'>active</small>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-4 pb-0 md:pb-[70px] overflow-y-scroll h-[calc(100vh-215px)] md:h-[420px] sm:pb-4">
          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="relative sm:static sm:mb-4">
        <ChatInput selectedChatId={selectedChat?.id} sendMessage={sendMessage} handleUpdateChat={handleUpdateChat} />
      </div>
    </div>
  );
};

export default ChatView;