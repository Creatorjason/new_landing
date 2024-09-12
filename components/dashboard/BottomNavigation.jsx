"use client"

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Category, Wallet, MessageText, Graph, Setting2 } from 'iconsax-react';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeGroup, setActiveGroup] = useState(null);
  const [expandedIcon, setExpandedIcon] = useState(null);

  const navGroups = [
    { id: 'dashboard', icon: Category, label: "Dashboard", href: "/dashboard" },
    { 
      id: 'finances', 
      icon: Wallet, 
      label: "Finances",
      subItems: [
        { href: "/dashboard/wallet", label: "Wallet" },
        { href: "/dashboard/payment", label: "Payment" },
      ]
    },
    { 
      id: 'communication', 
      icon: MessageText, 
      label: "Communication",
      subItems: [
        { href: "/messages", label: "Messages" },
        { href: "/dashboard/mailbox", label: "Mailbox" },
      ]
    },
    { 
      id: 'management', 
      icon: Graph, 
      label: "Management",
      subItems: [
        { href: "/dashboard/verses", label: "Verses" },
        { href: "/dashboard/softservants", label: "Soft Servants" },
      ]
    },
    { id: 'settings', icon: Setting2, label: "Settings", href: "/dashboard/settings" },
  ];

  useEffect(() => {
    const currentGroup = navGroups.find(group => 
      group.href === pathname || group.subItems?.some(item => item.href === pathname)
    );
    if (currentGroup) {
      setExpandedIcon(currentGroup.id);
    }
  }, [pathname]);

  const handleItemClick = (group) => {
    if (group.subItems) {
      setActiveGroup(activeGroup === group.id ? null : group.id);
    } else {
      router.push(group.href);
      setActiveGroup(null);
    }
    setExpandedIcon(group.id);
  };

  const isActive = (group) => expandedIcon === group.id;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C2626] sm:hidden p-2 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.2)]">
      <ul className="flex justify-around items-center">
        {navGroups.map((group) => {
          const active = isActive(group);
          return (
            <li key={group.id} className="relative">
              <motion.button
                onClick={() => handleItemClick(group)}
                className={`flex items-center justify-center p-2 rounded-full ${
                  active
                    ? 'bg-[#141F1F] text-white dark:bg-[#141f1f]'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  width: active ? 'auto' : '40px',
                  transition: { duration: 0.3 }
                }}
              >
                <group.icon size={24} variant={active ? "Bold" : "Outline"} />
                <AnimatePresence>
                  {active && (
                    <motion.span
                      className="ml-2 text-sm font-medium whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {group.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <AnimatePresence>
                {group.subItems && activeGroup === group.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-1/2 w-full transform -translate-x-1/2 mb-2 bg-white dark:bg-[#141f1f] rounded-lg shadow-lg"
                  >
                    {group.subItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          setActiveGroup(null);
                          setExpandedIcon(group.id);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2A3434]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavigation;