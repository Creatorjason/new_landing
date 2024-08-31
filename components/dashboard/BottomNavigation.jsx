"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Category, MouseCircle, EmptyWallet, Setting2 } from 'iconsax-react';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/dashboard", icon: Category, label: "Home" },
    { href: "/dashboard/wallet", icon: EmptyWallet, label: "Wallet" },
    { href: "/dashboard/payment", icon: MouseCircle, label: "Payments" },
    { href: "/dashboard/messages", icon: Setting2, label: "Messages" },
    { href: "/dashboard/settings", icon: Setting2, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1C2626] sm:hidden p-2 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.2)]">
      <ul className="flex justify-around items-center">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="relative">
              <motion.button
                onClick={() => router.push(href)}
                className={`flex items-center justify-center p-2 px-4 rounded-full ${
                  isActive
                    ? 'bg-[#141F1F] text-white dark:bg-[#7df8ff23]'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} variant={isActive ? "Bold" : "Outline"} />
                {isActive && (
                  <motion.span
                    className="ml-2 text-sm font-medium"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {label}
                  </motion.span>
                )}
              </motion.button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavigation;