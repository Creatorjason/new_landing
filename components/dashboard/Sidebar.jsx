import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Category, MouseCircle, EmptyWallet, Setting2, Messages1 } from 'iconsax-react';

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (href) => {
    if (window.innerWidth < 640) { // sm breakpoint
      setIsMobileMenuOpen(false);
    }
    router.push(href);
  };

  return (
    <div className={`w-64 bg-white dark:bg-[#1C2626] transition-all duration-300 ease-in-out sm:relative sm:w-64 md:w-1/4 lg:w-1/5 ${
      isMobileMenuOpen ? "fixed sm:relative sm:translate-x-0 bottom-0 top-24 z-50 translate-x-0" : "fixed sm:relative -translate-x-full sm:translate-x-0"}`}
    >
      <div className="p-4">
        <nav className='mt-6'>
          <ul>
            {[
              { href: "/dashboard", icon: Category, label: "Dashboard" },
              { href: "/dashboard/wallet", icon: EmptyWallet, label: "Wallet" },
              { href: "/dashboard/payment", icon: MouseCircle, label: "Payments" },
              { href: "/dashboard/messages", icon: Messages1, label: "Messages" },
              { href: "/dashboard/settings", icon: Setting2, label: "Settings" },
            ].map(({ href, icon: Icon, label }) => (
              <li key={href} className="mb-2">
                <button
                  onClick={() => handleLinkClick(href)}
                  className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                    pathname === href ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                  }`}
                >
                  <Icon size={24} variant="Bulk" className={`${pathname === href ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`} />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;