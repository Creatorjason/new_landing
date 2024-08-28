"use client"

import { Moon, Sun1 } from 'iconsax-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 rounded-full bg-[#141F1F] dark:bg-white fixed bottom-16 right-5 md:bottom-10 md:right-10"
    >
      <div className="relative w-6 h-6">
        <div
          className={`absolute transition-transform duration-300 ease-in-out ${
            theme === 'dark' ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-10 opacity-0'
          }`}
        >
          <Sun1 size="24" color="#141F1F" variant="Bold" />
        </div>
        <div
          className={`absolute transition-transform duration-300 ease-in-out ${
            theme === 'dark' ? 'transform translate-x-10 opacity-0' : 'transform translate-x-0 opacity-100'
          }`}
        >
          <Moon size="24" color="#FFFFFF" variant="Bold" />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggleButton;
