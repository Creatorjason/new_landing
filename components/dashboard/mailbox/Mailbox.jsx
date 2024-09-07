"use client";
import React, { useState, useEffect, useRef } from "react";
import { mailbox } from "@/data/mailbox"; // Adjust the import path as necessary
import { ArrowLeft2, SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import { Trash } from "iconsax-react";
import { ToggleOffCircle } from "iconsax-react";
import MailboxPasswordModal from "./MailboxPasswordModal";  
import toast from "react-hot-toast";

const truncateMessage = (message, limit = 50) => {
  const words = message.split(" ");
  if (words.length > 5) {
    return words.slice(0, 5).join(" ") + "...";
  }
  return message.length > limit ? message.slice(0, limit) + "..." : message;
};

const MailboxItem = ({
  name,
  isSelected,
  onClick,
}) => (
  <div
    className={`flex items-center p-4 border-b border-[#e6e6e6] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
      isSelected ? "bg-gray-200 dark:bg-gray-700" : ""
    }`}
    onClick={onClick}
  >
    <p className="text-sm font-semibold">{name}</p>
  </div>
);

const MailboxView = ({ mailbox, onBack, selectedItem, onItemSelect, returnToList }) => {
  return (
    <div className="h-[90%] md:h-full flex flex-col transition-all ease-in-out duration-200 relative">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-[#F2F2F2] dark:bg-[#141F1F] flex items-center">
        <button onClick={onBack} className="mr-4 sm:hidden">
          <ArrowLeft2 size="24" />
        </button>
        <div>
          <h2 className="text-lg md:text-xl font-bold">{mailbox.name}</h2>
        </div>
      </div>
      <div className="flex-1">
        {selectedItem ? (
          <div className="py-1 px-6 bg-white dark:bg-[#1C2626] my-1 h-[calc(100vh-330px)] md:h-[calc(100vh-280px)] rounded-lg">
            <div className="flex items-center justify-between py-4">
              <button onClick={returnToList} className="flex text-sm items-center gap-x-2">
                <ArrowLeft2 size="18" /> <span>Mail / All Mailbox</span>
              </button>

              <div className="flex items-center gap-x-2">
                <button className="flex items-center gap-x-1 border border-red-500 rounded-md text-xs py-1 px-2 font-medium hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out text-red-500">
                  <Trash size="18" /> <span>Delete</span>
                </button>
                <button className="flex items-center gap-x-1 border border-gray-500 rounded-md text-xs py-1 px-2 font-medium hover:bg-gray-500 hover:text-white transition-all duration-300 ease-in-out text-gray-500">
                  <span>Archive</span> <ToggleOffCircle size="18" variant="Bulk"/>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-semibold text-xl">{selectedItem.from}</h1>
              {selectedItem.tag && (
                <p className="text-xs uppercase text-[#11C017] bg-[#E8FDE8] py-1 px-2 rounded-md font-medium">
                  {selectedItem.tag}
                </p>
              )}
            </div>
            <div className="flex items-start gap-x-4">
              <Image alt="Recipient" src={selectedItem.src} width={100} height={100} className="w-12 h-12" />
              <div className="flex flex-col gap-y-2">
                <p className="font-medium text-base">{selectedItem.from}</p>
                <small>To me</small>
                <p className="text-sm">{selectedItem.content}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-1 overflow-y-scroll h-[calc(100vh-230px)] pb-[20px] md:pb-1">
            {mailbox.structure.map((structure) => (
              <div
                key={structure.id}
                className={`mb-4 rounded-lg bg-white dark:bg-[#1C2626] p-6 cursor-pointer`}
                onClick={() => onItemSelect(structure)}
              >
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-xl mb-4">{mailbox.title}</h1>
                  {structure.tag && (
                    <p className="text-xs uppercase text-[#11C017] bg-[#E8FDE8] py-1 px-2 rounded-md font-medium">
                      {structure.tag}
                    </p>
                  )}
                </div>
                <div className="flex items-start gap-x-4">
                  <Image alt="Recipient" src={structure.src} width={100} height={100} className="w-12 h-12" />
                  <div className="flex flex-col gap-y-2">
                    <p className="font-medium text-base">{structure.from}</p>
                    <small>To me</small>
                    <p className="text-sm">{truncateMessage(structure.content)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Mailbox = () => {
  const [selectedMailbox, setSelectedMailbox] = useState(null);
  const [mailboxData, setMailboxData] = useState(mailbox);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMailboxSelect = (mailbox) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      setSelectedMailbox(mailbox);
      setSelectedItem(null);
    }
  };
  
  const setToNull = () => {
    setSelectedItem(null); // Reset the selected item when switching mailboxes
  }
  
  const handlePasswordSubmit = (password) => {
    // In a real application, you would validate the password against a backend service
    if (password === "correct_password") {
      setIsAuthenticated(true);
      setIsModalOpen(false);
      // If a mailbox was previously selected, set it now
      if (selectedMailbox) {
        setSelectedMailbox(selectedMailbox);
      }
    } else {
      // Handle incorrect password (e.g., show an error message)
      toast.error("Incorrect password. Please try again.");
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };
  
  const handleBack = () => {
    setSelectedMailbox(null);
  };

  return (
    <div className="flex gap-x-4 h-full transition-all ease-in-out duration-200 p-2">
      <MailboxPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordSubmit}
      />

      <div className={`w-full sm:w-1/3 rounded-lg bg-white dark:bg-[#1C2626] dark:border-gray-700 ${isMobile && selectedMailbox ? 'hidden' : 'block'}`}>
        <div className="p-4">
          <h2 className="text-lg font-bold flex items-center gap-x-2 mb-4">Mailbox <span className="bg-gray-50 dark:bg-[#141f1f] p-2 py-1 border rounded-md text-sm font-medium">{mailboxData.length}</span></h2>
          <div className="border border-[#e6e6e6] dark:border-gray-700 rounded-md flex items-center p-3 gap-x-2">
            <SearchNormal1 size="18" color="#999999"/>
            <input type="text" name="" id="" placeholder="Search Mailbox" className="bg-transparent outline-none flex-1 text-sm font-normal" />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-330px)] md:h-[calc(100vh-280px)] px-0 md:px-4">
          {mailboxData.map((mailbox) => (
            <MailboxItem 
              key={mailbox.id}
              name={mailbox.name}
              isSelected={selectedMailbox?.id === mailbox.id}
              onClick={() => handleMailboxSelect(mailbox)}
            />
          ))}
        </div>
      </div>

      <div className={`w-full sm:w-2/3 ${isMobile && !selectedMailbox ? 'hidden' : 'block h-[90%] md:h-auto'}`}>
        {isAuthenticated && selectedMailbox ? (
          <MailboxView 
            mailbox={selectedMailbox} 
            onBack={handleBack} 
            selectedItem={selectedItem}
            onItemSelect={handleItemSelect}
            returnToList={setToNull}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">GranularX SuperDM</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Send messages to your loved ones, make in-mailbox payments,
                <br />access endless services and more...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mailbox;