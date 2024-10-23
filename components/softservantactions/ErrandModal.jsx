import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CloseCircle, TickCircle } from 'iconsax-react';
import Image from 'next/image';

const ErrandModal = ({ isOpen, onClose }) => {
  const [customErrand, setCustomErrand] = useState('');
  const [selectedErrand, setSelectedErrand] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showTagSelection, setShowTagSelection] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef(null);

  const sectorsTags = {
    "Logistics & Transportation": ["people", "goods"],
    "Food & Beverage": ["traditional", "continental", "intercontinental"]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        resetModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const resetModal = () => {
    setSelectedErrand(null);
    setShowConfirmation(false);
    setShowSuccess(false);
    setCustomErrand('');
    onClose();
  };

  const errandOptions = [
    { label: 'Order Ride', type: 'service' },
    { label: 'Find a Friend', type: 'service' },
    { label: 'Find a Job', type: 'service' },
    { label: 'Order a Meal', type: 'service' },
    { label: 'Pay Electricity Bill', type: 'service' },
    { label: 'Collect Payment', type: 'service' },
  ];

  const handleErrandSelect = (errand) => {
    setSelectedErrand(errand);
    if (errand.label === 'Order Ride' || errand.label === 'Order a Meal') {
      setShowTagSelection(true);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setShowTagSelection(false);
    setShowConfirmation(true);
  };

  const renderTagSelection = () => {
    const tags = selectedErrand.label === 'Order Ride' 
      ? sectorsTags["Logistics & Transportation"]
      : sectorsTags["Food & Beverage"];

    const question = selectedErrand.label === 'Order Ride'
      ? "Are you moving People or Goods?"
      : "What type of cuisine would you like?";

    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 px-4">
        <h3 className="text-lg font-semibold text-center">{question}</h3>
        <div className="w-full space-y-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagSelect(tag)}
              className="w-full p-2 text-sm font-medium bg-[#f7f7f7] dark:bg-[#1C2626] hover:bg-[#FFFFFF] dark:hover:bg-[#2A3636] rounded-lg text-gray-800 dark:text-white capitalize"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleCustomErrandSubmit = () => {
    if (customErrand.trim()) {
      setSelectedErrand({ label: customErrand, type: 'custom' });
      setShowConfirmation(true);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
    setTimeout(() => {
      resetModal();
    }, 5000);
  };

  const renderContent = () => {
    if (showSuccess) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 px-4">
        <div className="">
          <TickCircle size="48" className="text-green-500" variant='Bulk' />
        </div>
        <h3 className="text-lg font-semibold text-center">Errand Confirmed!</h3>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-2">
          Your errand <span className="font-medium text-[#141F1F] dark:text-white capitalize">&quot;{selectedErrand.label}&quot;</span> has been successfully submitted. Our team will process your request promptly.
        </p>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
        You&apos;ll receive updates on the progress of your errand via notifications. Thank you for using our service!
        </p>
      </div>
      );
    }

    if (showConfirmation) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 px-4">
          <div className="bg-[#E6F7FF] p-4 px-6 rounded-lg">
            <span className="text-4xl font-bold">?</span>
          </div>
          <h3 className="text-lg font-semibold text-center">Do you approve of this?</h3>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            You have chosen to <span className="font-medium text-[#141F1F] dark:text-white capitalize">&quot;{selectedErrand.label.toLowerCase()}&quot;</span>
            {selectedTag && <> for <span className="font-medium text-[#141F1F] dark:text-white capitalize">&quot;{selectedTag}&quot;</span></>}. 
            Please do let me know if you are fine with this.
          </p>
          <button
            onClick={handleConfirmation}
            className="w-full text-sm font-medium bg-[#141F1F] text-white p-2 rounded-lg hover:bg-[#0D1414] border border-[#141F1F]"
          >
            Yes, Continue
          </button>
          <button
            onClick={() => {setShowConfirmation(false); setSelectedTag(null);}}
            className="w-full text-sm font-medium bg-white dark:bg-[#1C2626] text-[#141F1F] dark:text-white p-2 rounded-lg border border-[#141F1F] dark:border-white"
          >
            No, Cancel
          </button>
        </div>
      );
    }

    if (showTagSelection) {
      return renderTagSelection();
    }

    return (
      <div className="space-y-4">
        {errandOptions.map((option, index) => (
          <button 
            key={index} 
            onClick={() => handleErrandSelect(option)}
            className="p-4 transition-all duration-300 ease-in-out px-6 w-full flex flex-col items-start justify-start bg-[#f7f7f7] dark:bg-[#1C2626] hover:bg-[#FFFFFF] dark:hover:bg-[#2A3636] rounded-lg"
          >
            <span className="text-xs text-gray-500 font-medium uppercase mb-2">{option.type}</span>
            <p className="rounded-lg text-sm font-medium text-left text-gray-800 dark:text-white transition-colors">
              {option.label}
            </p>
          </button>
        ))}
        <div className="p-4 px-6 w-full flex flex-col items-start justify-start bg-white dark:bg-[#1C2626] rounded-lg">
          <span className="text-xs font-medium text-gray-500 uppercase mb-2">Customize your Errand</span>
          <input
            type="text"
            placeholder="Enter your errand"
            value={customErrand}
            onChange={(e) => setCustomErrand(e.target.value)}
            className="w-full bg-gray-100 text-sm font-medium dark:bg-[#1C2626] p-3 rounded-lg outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            onClick={handleCustomErrandSubmit}
            className="mt-2 bg-[#141F1F] text-white p-2 px-4 rounded-lg text-sm hover:bg-[#0D1414]"
          >
            Submit Custom Errand
          </button>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end"
        >
          <motion.div 
            ref={modalRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-[#141f1f] z-50 h-full w-full sm:w-[400px] overflow-y-auto flex flex-col"
          >
            <div className="p-4 m-4 flex flex-col flex-grow bg-[#f0eeee] dark:bg-[#1C2626] rounded-lg">
              <div className="flex items-center justify-between mb-6">
                {(showTagSelection || showConfirmation || showSuccess) && (
                  <button onClick={() => {
                    setShowTagSelection(false);
                    setShowConfirmation(false);
                    setShowSuccess(false);
                    setSelectedTag(null);
                  }} className="mr-2">
                    <ArrowLeft size="24" className="text-[#141f1f] dark:text-gray-400" />
                  </button>
                )}
                <div className="flex items-center">
                  <Image
                    src="/others/softservant.jpeg"
                    alt="Errand Mode"
                    width={30}
                    height={30}
                    className="mr-2 rounded-full"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {showTagSelection ? 'Select Option' : (showConfirmation ? 'Confirmation' : (showSuccess ? 'Success' : 'Errand Mode'))}
                  </h2>
                </div>
                <button onClick={resetModal}>
                  <CloseCircle size="24" className="text-[#141f1f] dark:text-gray-400" />
                </button>
              </div>
              <div className="flex-grow flex flex-col">
                {renderContent()}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrandModal;
