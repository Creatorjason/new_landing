"use client"

import React, { useEffect, useState } from 'react';
import { ArrowDown2 } from 'iconsax-react';
import { motion } from 'framer-motion'
import Image from 'next/image';
import VersesModal from './VersesModal'
import axios from 'axios';

const VerseItem = ({ title, description, price, imageSrc }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-400">
      <Image src={imageSrc} alt={title} width={70} height={70} className="object-cover mr-4" />
      <div className="flex-grow">
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-sm text-[#71717A]">{description}</p>
        <p className="font-medium mt-4 text-sm md:text-base text-[#71717A]">NGN {price.toFixed(2)}</p>
      </div>
      <div className="relative">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="appearance-none text-sm bg-transparent border border-[#71717A] rounded-md py-2 pl-2 outline-none pr-8 cursor-pointer"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num} className='dark:bg-[#1C2626]'>
              {num}
            </option>
          ))}
        </select>
        <ArrowDown2 size="16" className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

const ProductForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="flex flex-col gap-y-6 p-2" onSubmit={handleSubmit}>
      <div>
        <div className="mt-1 flex items-center justify-between">
          <div className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden bg-gray-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9.5C6 6.46243 8.46243 4 11.5 4C14.1907 4 16.432 5.93318 16.907 8.48668C16.9736 8.84475 17.2297 9.1383 17.5754 9.25295C19.5661 9.9132 21 11.7905 21 14C21 16.7614 18.7614 19 16 19C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21C19.866 21 23 17.866 23 14C23 11.1075 21.2462 8.62697 18.7463 7.55958C17.8909 4.358 14.9717 2 11.5 2C7.35786 2 4 5.35786 4 9.5C4 9.60028 4.00197 9.70014 4.00589 9.79955C2.21048 10.8354 1 12.7754 1 15C1 18.3137 3.68629 21 7 21C7.55228 21 8 20.5523 8 20C8 19.4477 7.55228 19 7 19C4.79086 19 3 17.2091 3 15C3 13.3427 4.00818 11.9185 5.44865 11.3117C5.86549 11.1361 6.11256 10.7026 6.05119 10.2544C6.01748 10.0083 6 9.75644 6 9.5Z" fill="#475367"/>
              <path d="M11.3356 14.2526C11.7145 13.9158 12.2855 13.9158 12.6644 14.2526L14.1644 15.5859C14.5771 15.9528 14.6143 16.5849 14.2474 16.9977C13.9264 17.3588 13.4025 17.4325 13 17.1996V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V17.1996C10.5975 17.4325 10.0736 17.3588 9.75259 16.9977C9.38567 16.5849 9.42285 15.9528 9.83564 15.5859L11.3356 14.2526Z" fill="#475367"/>
            </svg>
          </div>
          <div className='px-4 flex-1'>
            <p className='text-sm font-semibold'>Upload your pictures</p>
            <small className='text-[#98A2B3] font-medium text-xs'>Max. 5MB</small>
          </div>
          <button type="button" className="py-2 px-4 text-white border border-[#141f1f] bg-[#141f1f] rounded-md shadow-sm text-sm leading-4 font-medium outline-none">
            Upload
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="product-name" className="block text-sm font-medium dark:text-gray-50 text-gray-700">Product Name <span className='text-red-600'>*</span></label>
        <input type="text" name="product-name" id="product-name" className="mt-1 block w-full border dark:bg-[#141F1F] border-gray-300 dark:border-[#666666] rounded-md shadow-sm p-3 outline-none text-sm sm:text-base" placeholder="Enter product name" />
      </div>
      <div>
        <label htmlFor="product-price" className="block text-sm font-medium dark:text-gray-50 text-gray-700">Product Price <span className='text-red-600'>*</span></label>
        <input type="text" name="product-price" id="product-price" className="mt-1 block w-full border dark:bg-[#141F1F] border-gray-300 dark:border-[#666666] rounded-md shadow-sm p-3 outline-none text-sm sm:text-base" placeholder="Enter product price" />
      </div>
      <div>
        <label htmlFor="product-color" className="block text-sm font-medium dark:text-gray-50 text-gray-700">Product Color <span className='text-red-600'>*</span></label>
        <input type="text" name="product-color" id="product-color" className="mt-1 block w-full border dark:bg-[#141F1F] border-gray-300 dark:border-[#666666] rounded-md shadow-sm p-3 outline-none text-sm sm:text-base" placeholder="Enter product color" />
      </div>
      <div>
        <label htmlFor="product-color" className="block text-sm font-medium dark:text-gray-50 text-gray-700">Keywords <span className='text-red-600'>*</span></label>
        <input type="text" name="product-color" id="product-color" className="mt-1 block w-full border dark:bg-[#141F1F] border-gray-300 dark:border-[#666666] rounded-md shadow-sm p-3 outline-none text-sm sm:text-base" placeholder="Enter keywords" />
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#141f1f]">
          Done
        </button>
      </div>
    </form>
  )
};

const VerseForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="flex flex-col gap-y-6 p-2" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="verse-name" className="block text-sm font-medium text-gray-700 dark:text-gray-50">Name <span className='text-red-600'>*</span></label>
        <input type="text" name="verse-name" id="verse-name" className="mt-1 block w-full border border-gray-300 dark:bg-[#141F1F] rounded-md shadow-sm p-3 outline-none sm:text-sm" placeholder="Enter name" />
      </div>
      <div>
        <label htmlFor="verse-description" className="block text-sm font-medium text-gray-700 dark:text-gray-50">Description <span className='text-red-600'>*</span></label>
        <textarea name="verse-description" id="verse-description" rows="3" className="mt-1 block w-full border border-gray-300 dark:bg-[#141F1F] rounded-md shadow-sm p-3 outline-none resize-none sm:text-sm" placeholder="Enter Description"></textarea>
      </div>
      <div>
        <label htmlFor="verse-sector" className="block text-sm font-medium text-gray-700 dark:text-gray-50">Sector <span className='text-red-600'>*</span></label>
        <select name="verse-sector" id="verse-sector" className="mt-1 block w-full p-3 px-2 text-base border border-gray-300 dark:bg-[#141F1F] outline-none sm:text-sm rounded-md">
          <option>Business</option>
          <option>Technology</option>
          <option>Finance</option>
          <option>Healthcare</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-50">Do you want a soft servant to manage and automate your verse?</label>
        <div className="mt-2 flex flex-col gap-y-1">
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="soft-servant" value="yes" />
            <span className="ml-2 text-sm">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="soft-servant" value="no" />
            <span className="ml-2 text-sm">No</span>
          </label>
        </div>
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#141f1f]">
          Done
        </button>
      </div>
    </form>
  )
};

const SuccessMessage = ({ title, message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="text-center flex flex-col items-center"
  >
    <div className='bg-[#7DF9FF1A] border border-[#7DF9FF70] p-4 mb-4 rounded-lg w-max'>
      <Image src="/confetti.svg" alt="Success" width={64} height={64} />
    </div>
    <h2 className="text-lg md:text-2xl font-bold mb-2">{title}</h2>
    <p className="text-gray-600 dark:text-gray-200 text-sm md:text-base mb-6">{message}</p>
    <button
      onClick={onClose}
      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#141f1f]"
    >
      Done
    </button>
  </motion.div>
);

const MyVerseView = ({ session }) => {
  // const verses = [
  //   { id: 1, title: "Apple Watch Series 7", description: "Golden", price: 250000, imageSrc: "/flags/nigeria.png" },
  //   { id: 2, title: "Beylob 90 Speaker", description: "Space Gray", price: 250000, imageSrc: "/flags/nigeria.png" },
  //   { id: 3, title: "Beoplay M5 Bluetooth Speaker", description: "Gray Edition", price: 250000, imageSrc: "/flags/nigeria.png" },
  //   { id: 4, title: "Apple Watch Series 7 - 44mm", description: "Golden", price: 250000, imageSrc: "/flags/nigeria.png" },
  // ];
  const [verses, setVerses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerseModalOpen, setIsVerseModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVerseSuccess, setIsVerseSuccess] = useState(false);
  const [isProductSuccess, setIsProductSuccess] = useState(false);

  useEffect(() => {
    fetchVerses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVerses = async () => {
    try {
      setIsLoading(true);
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await axios.get(`https://api.granularx.com/verse/verse/${session.user.username}`);
      setVerses(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch verses');
      setIsLoading(false);
    }
  };

  const createVerseModal = () => {
    setIsVerseModalOpen(true);
  };

  const createProductModal = () => {
    setIsProductModalOpen(true);
  };

  const handleVerseSubmit = () => {
    setIsVerseSuccess(true);
    // After successful creation, refetch verses
    fetchVerses();
  };

  const handleProductSubmit = () => {
    setIsProductSuccess(true);
  };

  const closeVerseModal = () => {
    setIsVerseModalOpen(false);
    setIsVerseSuccess(false);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setIsProductSuccess(false);
  };

  const EmptyState = () => (
    <div className="text-center py-12">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Create a verses</h3>
      <p className="mt-1 text-sm max-w-[30ch] mx-auto text-gray-500">You haven&apos;t created a verse yet. Get started by creating a new verse.</p>
      <div className="mt-6">
        <button
          onClick={createVerseModal}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#141f1f] hover:bg-[#141f1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141f1f]"
        >
          Create Verse
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-0 md:py-4">
      {verses.length > 0 && 
        <div className='bg-gray-500 py-10 overflow-hidden flex flex-col items-center justify-center rounded-lg verses-banner bg-cover relative bg-opacity-35 bg-center'>
          <div className='absolute bg-black opacity-65 inset-0 z-0'></div>
          <div className='z-10 flex flex-col items-center justify-center text-center gap-y-8 p-4'>
            <p className='text-white text-3xl md:text-6xl font-extrabold'>Get your gadgets at<br />affordable prices</p>
            <p className='text-gray-100 text-base max-w-[50ch]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nunc nisl eu consectetur. Mi massa elementum odio eu viverra amet.</p>
            <div className='flex items-center gap-x-2'>
              <button onClick={createVerseModal} className='bg-white border dark:text-[#141f1f] rounded-md p-3 px-6 text-sm font-medium'>Create Verse</button>
              <button onClick={createProductModal} className='bg-transparent text-white border rounded-md p-3 px-6 text-sm font-medium'>Create Product</button>
            </div>
          </div>
        </div>
      }

      {/* List goes here */}
      <div className="p-2">
        {isLoading ? (
          <p className='py-12 flex items-center justify-center text-sm font-medium'>Loading verses...</p>
        ) : verses.length === 0 ? (
          <EmptyState />
        ) : (
          verses.map((verse) => (
            <VerseItem key={verse.id} {...verse} />
          ))
        )}
      </div>

      <VersesModal isOpen={isProductModalOpen} onClose={closeProductModal} title="Create Product">
        {isProductSuccess ? (
          <SuccessMessage
            title="Product Created Successfully!"
            message="You have successfully created this product!"
            onClose={closeProductModal}
          />
        ) : (
          <ProductForm onSubmit={handleProductSubmit} />
        )}
      </VersesModal>

      <VersesModal isOpen={isVerseModalOpen} onClose={closeVerseModal} title="Create Verse">
        {isVerseSuccess ? (
          <SuccessMessage
            title="Verse Created Successfully!"
            message="You have successfully created this verse!"
            onClose={closeVerseModal}
          />
        ) : (
          <VerseForm onSubmit={handleVerseSubmit} />
        )}
      </VersesModal>
    </div>
  );
};

export default MyVerseView;