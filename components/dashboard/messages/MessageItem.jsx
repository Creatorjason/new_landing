import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

const MessageItem = ({
  name,
  isSelected,
  onClick,
  session,
  setChatHistory,
  setChatID
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const chatID = `${session.user.username}-${name}`;
    onClick(chatID);
    await fetchChatHistory(chatID);
  };

  const fetchChatHistory = async (chatID) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.granularx.com/chat/history/${chatID}`);
      
      if (response.data.status === "SUCCESS") {
        const history = response.data.data;
        localStorage.setItem(`chatHistory_${chatID}`, JSON.stringify(history));
        setChatHistory(history);
        setChatID(chatID)
      } else {
        console.error("Error fetching chat history:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center p-3 pr-5 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
        isSelected ? "bg-[#F9F9F9] dark:bg-gray-700" : ""
      } ${isLoading ? "opacity-50" : ""}`}
      onClick={handleClick}
    >
      <Image width={30} height={30} src="/earth.png" alt={name} className="w-10 h-10 rounded-full mr-3" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-semibold truncate text-sm md:text-base">{name}</p>
        </div>
      </div>
      {isLoading && <span className="ml-2">Loading...</span>}
    </div>
  );
};

export default MessageItem;