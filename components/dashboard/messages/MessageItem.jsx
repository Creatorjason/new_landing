import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import crypto from 'crypto';

const MessageItem = ({
  name,
  isSelected,
  onClick,
  session,
  setChatID,
  setChatHistory
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateUnifiedChatID = (sender, receiver) => {
    // Sort the sender and receiver to ensure deterministic order
    const participants = [sender, receiver].sort();

    // Concatenate the participants
    const concatenated = participants.join('-');

    // Hash the concatenated string using SHA-256
    const hash = crypto.createHash('sha256').update(concatenated).digest('hex');

    // Return the hex representation of the hash as the ChatID
    return hash;
  }

  const handleClick = async () => {
    const chatID = generateUnifiedChatID(session.user.username, name);
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
      className={`flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
        isSelected ? "bg-gray-100 dark:bg-gray-600" : ""
      } ${isLoading ? "opacity-50" : ""}`}
      onClick={handleClick}
    >
      <Image width={30} height={30} src="/earth.png" alt={name} className="w-8 h-8 rounded-full mr-3" />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate text-sm">{name}</p>
      </div>
      {Math.random() > 0.5 ? (
        <span className="bg-gray-200 dark:bg-gray-600 text-xs font-medium px-2 py-1 rounded-full">2</span>
      ) : (
        isSelected && <span className="text-blue-500">✓</span>
      )}
      {isLoading && <span className="ml-2 text-xs">Loading...</span>}
    </div>
  );
};

export default MessageItem;
