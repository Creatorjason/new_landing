import Image from 'next/image';
import React from 'react'

const MessageItem = ({
  name,
  isSelected,
  onClick,
}) => (
  <div
    className={`flex items-center p-3 pr-5 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
      isSelected ? "bg-[#F9F9F9] dark:bg-gray-700" : ""
    }`} key={name}
    onClick={onClick}
  >
    <Image width={30} height={30} src={"/earth.png"} alt={name} className="w-10 h-10 rounded-full mr-3" />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <p className="font-semibold truncate text-base">{name}</p>
      </div>
    </div>
  </div>
);
export default MessageItem