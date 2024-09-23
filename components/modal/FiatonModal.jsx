import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const FiatonsModal = ({ isOpen, onClose, fiatons, uns, session }) => {

  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: "0" },
    exit: { opacity: 0, y: "100vh" }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white max-w-sm p-6 rounded-md shadow-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">FIATONS</h2>
            <ul className="overflow-x-scroll max-h-96 overflow-y-scroll">
              {fiatons.map((item, index) => (
                <li key={index} className="flex max-w-sm items-center space-x-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  <p className="text-sm max-w-[50ch] font-medium text-[#141f1f]">{item}</p>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FiatonsModal;
