"use client"

import React, { useState } from 'react';
import { ClipboardText, Clock } from 'iconsax-react';

const Verses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-0 md:py-6">
      <div className='bg-gray-500 py-10 overflow-hidden flex flex-col items-center justify-center rounded-lg verses-banner bg-cover relative bg-opacity-35 bg-center'>
        <div className='absolute bg-black opacity-65 inset-0 z-0'></div>
        <div className='z-10 flex flex-col items-center justify-center text-center gap-y-8 p-4'>
          <p className='text-white text-3xl md:text-6xl font-extrabold'>Get your gadgets at<br />affordable prices</p>
          <p className='text-gray-100 text-base max-w-[50ch]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nunc nisl eu consectetur. Mi massa elementum odio eu viverra amet.</p>
          <button className='bg-white rounded-md p-3 px-6 text-sm font-medium'>Create Verse</button>
        </div>
      </div>
    </div>
  );
};

export default Verses;