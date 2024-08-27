"use client"
import { useState } from 'react';
import Image from 'next/image';

const TransferForm = () => {
  const [amount, setAmount] = useState('4,000.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('Naira');

  return (
    <div className="bg-white dark:bg-[#1C2626] p-5 md:p-10 max-w-[22rem] md:max-w-xl rounded-xl text-[#141F1F] dark:text-gray-100 shadow-md">
      <div className="flex justify-between items-center p-5 md:px-7 mb-4 bg-[#F0F7F1] dark:bg-[#141F1F] rounded-xl overflow-hidden">
        <div className='w-1/2'>
          <p className="text-sm md:text-base text-[#7E7E7E] dark:text-[#7DF9FF] font-semibold">You Send</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-1 px-0 text-lg md:text-xl font-bold bg-transparent outline-none dark:text-white"
          />
        </div>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-32 p-2 pl-4 bg-white dark:bg-[#1C2626] text-sm rounded-full outline-none appearance-none font-semibold dark:text-white"
          style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "right 0.7rem top 50%",
                 backgroundSize: "0.65rem auto" }}
        >
          <option value="USD">🇺🇸 USD</option>
          <option value="GBP">🇬🇧 GBP</option>
          <option value="NGN">🇳🇬 NGN</option>
        </select>
      </div>
      <div className="space-y-4 text-sm text-gray-500 dark:text-gray-400 p-1">
        <div>
          <div className="flex justify-between mb-2">
            <div className='flex items-center gap-x-4'>
              <div className="bg-[#D9D9D9] dark:bg-[#7DF9FF] p-1 h-3 w-3 rounded-full"></div>
              <span className='font-semibold text-sm md:text-base text-black dark:text-white'>0 USD</span>
            </div>
            <div className="flex items-center text-sm md:text-base font-semibold text-black dark:text-white"><span className='mr-2'>Bank transfer fee</span> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className='flex items-center gap-x-4'>
              <div className="bg-[#D9D9D9] dark:bg-[#7DF9FF] p-1 h-3 w-3 rounded-full"></div>
              <span className='font-semibold text-sm md:text-base text-black dark:text-white'>7.87 USD</span>
            </div>
            <div className="flex items-center text-sm md:text-base font-light text-black dark:text-white"><span>Our fee</span>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className='flex items-center gap-x-4'>
              <div className="bg-[#D9D9D9] dark:bg-[#7DF9FF] p-1 h-3 w-3 rounded-full"></div>
              <span className='font-semibold text-sm md:text-base text-black dark:text-white'>0 USD</span>
            </div>
            <div className="flex items-center text-sm md:text-base font-light text-black dark:text-white">Total Fees
            </div>
          </div>
        </div>

        <div className='w-full border border-[#CECECE] dark:border-[#7DF9FF]'></div>

        <div>
          <div className="flex justify-between mb-2">
            <div className='flex items-center gap-x-4'>
              <div className="bg-[#D9D9D9] dark:bg-[#7DF9FF] p-1 h-3 w-3 rounded-full"></div>
              <span className='font-semibold text-sm md:text-base text-black dark:text-white'>992.98 USD</span>
            </div>
            <div className="flex items-center text-sm md:text-base font-semibold text-black dark:text-white">Total amount we&apos;ll convert</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className='flex items-center gap-x-4'>
              <div className="bg-[#D9D9D9] dark:bg-[#7DF9FF] p-1 h-3 w-3 rounded-full"></div>
              <span className='font-semibold text-sm md:text-base text-black dark:text-white'>2,052.10 USD</span>
            </div>
            <div className="flex items-center text-sm md:text-base font-light text-black dark:text-white"><span>Guaranteed rate (2h)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center p-5 px-7 mb-4 bg-[#F0F7F1] dark:bg-[#141F1F] rounded-xl overflow-hidden">
          <div className=''>
            <p className="text-sm md:text-base text-[#7E7E7E] dark:text-[#7DF9FF] font-semibold">Receiver Gets</p>
            <span className="text-lg md:text-xl font-bold dark:text-white">₦7,000,000.00</span>
          </div>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-32 p-2 pl-4 text-sm bg-white dark:bg-[#1C2626] rounded-full outline-none appearance-none font-semibold dark:text-white"
            style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.7rem top 50%",
                  backgroundSize: "0.65rem auto" }}
          >
            <option value="Naira">🇳🇬 Naira</option>
            <option value="Dollars">🇺🇸 Dollars</option>
            <option value="Pounds">🇬🇧 Pounds</option>
          </select>
        </div>
      </div>
      <p className="text-sm text-black dark:text-gray-100 mt-2 mb-4">Should arrive by Thursday, August 22</p>
      <button className="w-full py-3 bg-[#141F1F] text-white dark:bg-[#7DF9FF] dark:text-[#141F1F] rounded-full hover:bg-opacity-90 dark:hover:bg-opacity-80 mt-4 font-semibold">
        Send Money Now
      </button>
    </div>
  );
};

export default TransferForm;