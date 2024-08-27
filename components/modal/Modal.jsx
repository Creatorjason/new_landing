"use client"

import Image from "next/image";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Money } from "iconsax-react";

const Modal = ({ showSuccess, setShowModal, selectedAmount, setSelectedAmount, handleSubmit, amounts, takeMeForASpin }) => (
  <AnimatePresence>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-[#141F1F] p-5 mx-4 rounded-2xl max-w-md w-full shadow-2xl"
      >
        {!showSuccess ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-x-3">
                <Money size="24" className="text-[#000000] dark:text-white"/>
                <h2 className="text-sm md:text-base font-semibold text-[#141F1F] dark:text-white">Amount to start with</h2>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)} 
                className="hover:text-red-700 transition-colors duration-200"
              >
                <MdOutlineClose className="text-2xl text-red-500" />
              </motion.button>
            </div>
            <motion.select
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
              className="w-full bg-white dark:bg-[#141F1F] dark:text-white text-[#141F1F] text-sm md:text-lg p-3 mb-6 border-2 border-gray-500 rounded-lg focus:border-[#141F1F] dark:focus:border-gray-600 focus:ring-2 focus:ring-[#141F1F] transition-all duration-200"
            >
              <option value="">Select amount</option>
              {amounts.map((amount) => (
                <option key={amount} className="text-base text-[#141F1F]" value={amount}>{amount}</option>
              ))}
            </motion.select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-black dark:bg-[#7DF9FF] dark:text-[#141F1F] text-white text-sm md:text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Submit
            </motion.button>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between flex-col text-[#141F1F] text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="bg-[#7DF9FF1A] border border-[#7DF9FF70] p-3 rounded-2xl"
            >
              <Image src="/confetti.svg" alt="Success" width={50} height={50} />
            </motion.div>
            <h2 className="text-lg md:text-2xl dark:text-white font-bold my-4">Peer Bank Account successful</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-50 text-sm md:text-base">Welcome to GranularX. You are a step closer to experiencing our new technology.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={takeMeForASpin}
              className="py-3 px-6 bg-black dark:bg-[#7DF9FF] dark:text-[#141F1F] text-white text-sm md:text-lg font-medium w-full rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Take me for a spin
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default Modal;