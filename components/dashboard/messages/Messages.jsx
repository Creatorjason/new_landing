"use client"
import React, { useState, useEffect } from 'react';
import { chats } from '@/data/chats';  // Adjust the import path as necessary
import { ArrowLeft2 } from 'iconsax-react';
import ChatInput from './ChatInput';

const truncateMessage = (message, limit = 50) => {
  const words = message.split(' ');
  if (words.length > 5) {
    return words.slice(0, 5).join(' ') + '...';
  }
  return message.length > limit ? message.slice(0, limit) + '...' : message;
};

const MessageItem = ({ avatar, name, message, time, pinned, unread, isSelected, onClick }) => (
  <div 
    className={`flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${isSelected ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
    onClick={onClick}
  >
    <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold truncate">{name}</h3>
        <span className="text-sm text-gray-500 ml-2 flex-shrink-0">{time}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{truncateMessage(message)}</p>
    </div>
    {pinned && <span className="ml-2 text-blue-500 flex-shrink-0">📌</span>}
    {unread > 0 && (
      <span className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
        {unread}
      </span>
    )}
  </div>
);

const ChatView = ({ chat, onBack }) => (
  <div className="h-full flex transition-all ease-in-out duration-200 flex-col">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
      <button onClick={onBack} className="mr-4 sm:hidden">
        <ArrowLeft2 size="24" />
      </button>
      <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
      <div>
        <h2 className="text-lg md:text-xl font-bold">{chat.name}</h2>
        <small className='text-[#27962b] bg-[#11c0171a] px-2.5 py-1 text-xs rounded-full'>Active</small>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-4">
      {chat.messages.map((message) => (
        <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
          <div className={`inline-block p-3 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <p className='text-[13px]'>{message.content}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
    <ChatInput />
  </div>
);

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex h-full transition-all ease-in-out duration-200">
      <div className={`w-full sm:w-1/3 border-r border-gray-200 dark:border-gray-700 ${isMobile && selectedChat ? 'hidden' : 'block'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">All conversations ({chats.length})</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-230px)]">
          {chats.map((chat) => (
            <MessageItem 
              key={chat.id}
              avatar={chat.avatar}
              name={chat.name}
              message={chat.messages[chat.messages.length - 1].content}
              time={new Date(chat.messages[chat.messages.length - 1].timestamp).toLocaleTimeString()}
              isSelected={selectedChat?.id === chat.id}
              onClick={() => handleChatSelect(chat)}
            />
          ))}
        </div>
      </div>
      <div className={`w-full sm:w-2/3 bg-gray-100 dark:bg-gray-800 ${isMobile && !selectedChat ? 'hidden' : 'block'}`}>
        {selectedChat ? (
          <ChatView chat={selectedChat} onBack={handleBack} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">GranularX SuperDM</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Send messages to your loved ones, make in-chat payments,
                <br />access endless services and more...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;