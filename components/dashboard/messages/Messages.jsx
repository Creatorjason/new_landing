"use client";
import React, { useState, useEffect, useRef } from "react";
import { chats } from "@/data/chats"; // Adjust the import path as necessary
import { ArrowLeft, ArrowLeft2, HambergerMenu, SearchNormal1, User } from "iconsax-react";
import ChatInput from "./ChatInput";
import Image from "next/image";

const truncateMessage = (message, limit = 50) => {
  const words = message.split(" ");
  if (words.length > 5) {
    return words.slice(0, 5).join(" ") + "...";
  }
  return message.length > limit ? message.slice(0, limit) + "..." : message;
};

const MessageItem = ({
  avatar,
  name,
  message,
  time,
  pinned,
  unread,
  isSelected,
  onClick,
}) => (
  <div
    className={`flex items-center p-3 pr-5 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
      isSelected ? "bg-gray-200 dark:bg-gray-700" : ""
    }`}
    onClick={onClick}
  >
    <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <p className="font-semibold truncate text-base">{name}</p>
        <span className="text-[13px] text-gray-500 ml-2 font-medium flex-shrink-0">{time}</span>
      </div>
      <p className="text-[13px] text-gray-600 dark:text-gray-400 truncate">
        {truncateMessage(message)}
      </p>
    </div>
    {pinned && <span className="ml-2 text-blue-500 flex-shrink-0">📌</span>}
    {unread > 0 && (
      <span className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
        {unread}
      </span>
    )}
  </div>
);

const ChatView = ({
  chat,
  onBack,
  selectedChat,
  handleUpdateChat,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chat.messages]);

  return (
    <div className="h-dvh md:h-full flex flex-col transition-all ease-in-out duration-200 relative">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button onClick={onBack} className="mr-4 sm:hidden">
          <ArrowLeft size="24" />
        </button>
        <Image src={chat.avatar} alt={chat.name} width={100} height={100} className="w-9 h-9 rounded-full mr-3" />
        <div>
          <h2 className="text-lg md:text-xl font-bold">{chat.name}</h2>
          <small className='text-[#27962b] bg-[#11c0171a] px-2.5 py-1 text-xs rounded-full'>Active</small>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-4 pb-0 md:pb-[70px] overflow-y-scroll h-[calc(100vh-215px)] md:h-[420px] sm:pb-4">
          {chat.messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
              <div className={`${message.sender === 'You' ? 'flex items-end justify-end text-right' : 'flex items-end'}`}>
                {message.sender !== "You" && <Image src={chat.avatar} alt={chat.name} width={100} height={100} className="w-7 h-7 rounded-full mr-2" />}
                <div className={`inline-block p-3 rounded-lg ${message.sender === 'You' ? 'bg-[#141F1F]/50 text-white' : 'bg-[#F8F8F8] dark:bg-gray-700'}`}>
                  <p className='text-[13px]'>{message.content}</p>
                </div>
                {message.sender === "You" && <User size="22" color="#FF8A65" className="ml-2" variant="Bold"/>}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="relative sm:static sm:mb-4"> {/* Wrap the input with a relative div */}
        <ChatInput selectedChatId={selectedChat?.id} onUpdateChat={handleUpdateChat} />
      </div>
    </div>
  );
};

const MessagesPage = ({ isMobileMenuOpen, setIsMobileMenuOpen, isMobile, setIsMobile }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatsData, setChatsData] = useState(chats); // Added state to manage chats

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const handleUpdateChat = (updatedChats) => {
    setChatsData(updatedChats);
    setSelectedChat(updatedChats.find(chat => chat.id === selectedChat.id));
  };

  return (
    <div className="flex h-full transition-all ease-in-out duration-200 rounded-lg bg-white dark:bg-[#1C2626] p-0 sm:p-2">
      <div className={`w-full sm:w-1/3 border-r border-gray-200 dark:border-gray-700 ${isMobile && selectedChat ? 'hidden' : 'block'}`}>
        <div className="p-4 border-r-2 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between py-2 sm:py-0 mb-4">
            <h2 className="text-lg font-bold flex items-center gap-x-2">Messsages <span className="bg-gray-50 dark:bg-[#141f1f] p-2 py-1 border rounded-md text-sm font-medium">{chatsData.length}</span></h2>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="sm:hidden">
              <HambergerMenu size="20" color="#141f1f"/>
            </button>
          </div>

          <div className="border border-[#e6e6e6] dark:border-gray-700 rounded-md flex items-center p-3 gap-x-2">
            <SearchNormal1 size="18" color="#999999"/>
            <input type="text" name="" id="" placeholder="Search Messages" className="bg-transparent outline-none flex-1 text-sm font-normal" />
          </div>
        </div>
        <div className="overflow-y-auto h-dvh md:h-[calc(100vh-260px)] pl-0 md:pl-4">
          {chatsData.map((chat) => (
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
      <div className={`w-full sm:w-2/3 ${isMobile && !selectedChat ? 'hidden' : 'block h-[90%] md:h-auto'}`}>
        {selectedChat ? (
          <ChatView chat={selectedChat} onBack={handleBack} selectedChat={selectedChat} handleUpdateChat={handleUpdateChat} />
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