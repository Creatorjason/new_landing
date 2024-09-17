"use client"

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Wallet, DollarCircle, MessageText, More, Setting2, Messages2, UserOctagon } from 'iconsax-react';
import { Vegan, Landmark } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';

const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: "Home", href: "/dashboard" },
    { id: 'wallet', icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
    { id: 'payment', icon: DollarCircle, label: "Payment", href: "/dashboard/payment" },
    { id: 'messages', icon: MessageText, label: "Messages", href: "/messages" },
    { id: 'more', icon: More, label: "More", href: null },
  ];

  const moreItems = [
    { id: 'verses', icon: Vegan, label: "Verses", href: "/dashboard/verses" },
    { id: 'softServants', icon: UserOctagon, label: "Soft Servants", href: "/dashboard/softservants" },
    { id: 'mailbox', icon: Messages2, label: "Mailbox", href: "/dashboard/mailbox" },
    { id: 'settings', icon: Setting2, label: "Settings", href: "/dashboard/settings" },
  ];

  useEffect(() => {
    const currentItem = navItems.find(item => item.href === pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else if (moreItems.some(item => item.href === pathname)) {
      setActiveItem('more');
    }
  }, [pathname]);

  const handleItemClick = (item) => {
    if (item.id === 'more') {
      setIsMoreOpen(!isMoreOpen);
    } else {
      router.push(item.href);
      setIsMoreOpen(false);
    }
    setActiveItem(item.id);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C2626] sm:hidden p-2 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.2)]">
      <ul className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <li key={item.id} className="relative">
              <motion.button
                onClick={() => handleItemClick(item)}
                className={`flex items-center justify-center p-2 rounded-full ${
                  isActive
                    ? 'bg-[#141F1F] text-white dark:bg-[#141f1f]'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  width: isActive ? 'auto' : '40px',
                  transition: { duration: 0.3 }
                }}
              >
                <item.icon size={24} variant={isActive ? "Bold" : "Outline"} />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className="ml-2 text-sm font-medium whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              {item.id === 'more' && (
                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full w-36 py-2 right-0 mb-2 bg-white dark:bg-[#141f1f] rounded-lg shadow-lg"
                    >
                      {moreItems.map((moreItem) => (
                        <button
                          key={moreItem.id}
                          onClick={() => {
                            router.push(moreItem.href);
                            setIsMoreOpen(false);
                            setActiveItem('more');
                          }}
                          className="block w-full text-left font-medium px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2A3434]"
                        >
                          <div className='flex items-center gap-x-2'>
                            <moreItem.icon size={20} variant={isActive ? "Outline" : "Bold"} />
                            {moreItem.label}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavigation;