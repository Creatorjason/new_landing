import React, { useState } from 'react'
import { Moneys } from 'iconsax-react';
import { Happyemoji } from 'iconsax-react';
import { VoiceCricle } from 'iconsax-react';
import { Menu } from 'iconsax-react';
import { Send } from 'iconsax-react';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
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
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <Moneys size={20} color="#FF8A65"/>
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <Happyemoji size={20} color="#FF8A65"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput