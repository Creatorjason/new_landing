import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Category, MouseCircle, EmptyWallet, Setting2, Messages1 } from 'iconsax-react';

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (href) => {
    if (window.innerWidth < 640) {
      setIsMobileMenuOpen(false);
    }
    router.push(href);
  };

  return (
    <div className={`w-64 bg-white dark:bg-[#1C2626] shadow-custom-shadow rounded-tr-lg transition-all duration-300 ease-in-out sm:relative sm:w-64 md:w-1/4 lg:w-1/5 ${
      isMobileMenuOpen ? "fixed sm:relative sm:translate-x-0 bottom-0 top-0 z-50 translate-x-0" : "fixed sm:relative -translate-x-full sm:translate-x-0"
    }`}>
      <div className="p-4">
        <nav className='mt-6'>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => handleLinkClick('/dashboard')}
                className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                  pathname === '/dashboard' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <Category size={24} variant="Bulk" className={`${pathname === '/dashboard' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`} />
                <span className='text-sm font-medium'>Dashboard</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleLinkClick('/dashboard/wallet')}
                className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                  pathname === '/dashboard/wallet' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <EmptyWallet size={24} variant="Bulk" className={`${pathname === '/dashboard/wallet' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`} />
                <span className='text-sm font-medium'>Wallet</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleLinkClick('/dashboard/payment')}
                className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                  pathname === '/dashboard/payment' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${pathname === '/dashboard/payment' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`}
                >
                  <path
                    opacity="0.4" d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
                    className='fill-current'
                  />
                  <path
                    fillRule="evenodd" clipRule="evenodd"
                    d="M10 3.75C10.4142 3.75 10.75 4.08579 10.75 4.5V5.35352C11.9043 5.67998 12.75 6.74122 12.75 8C12.75 8.41421 12.4142 8.75 12 8.75C11.5858 8.75 11.25 8.41421 11.25 8C11.25 7.30964 10.6904 6.75 10 6.75C9.30964 6.75 8.75 7.30964 8.75 8C8.75 8.69036 9.30964 9.25 10 9.25C11.5188 9.25 12.75 10.4812 12.75 12C12.75 13.2588 11.9043 14.32 10.75 14.6465V15.5C10.75 15.9142 10.4142 16.25 10 16.25C9.58579 16.25 9.25 15.9142 9.25 15.5V14.6465C8.09575 14.32 7.25 13.2588 7.25 12C7.25 11.5858 7.58579 11.25 8 11.25C8.41421 11.25 8.75 11.5858 8.75 12C8.75 12.6904 9.30964 13.25 10 13.25C10.6904 13.25 11.25 12.6904 11.25 12C11.25 11.3096 10.6904 10.75 10 10.75C8.48122 10.75 7.25 9.51878 7.25 8C7.25 6.74122 8.09575 5.67998 9.25 5.35352V4.5C9.25 4.08579 9.58579 3.75 10 3.75Z"
                    className='fill-current'
                  />
                </svg>
                <span className='text-sm font-medium'>Payments</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleLinkClick('/messages')}
                className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                  pathname === '/messages' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${pathname === '/messages' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'}`}>
                  <path opacity="0.4" d="M8.88889 0H7.77778C3.48223 0 0 3.52576 0 7.875V11.25C0 12.4926 0.994923 13.5 2.22222 13.5H8.88889C12.5708 13.5 15.5556 10.4779 15.5556 6.75C15.5556 6.20688 15.4922 5.67875 15.3726 5.17276C14.6711 2.20566 12.0344 0 8.88889 0Z" className='fill-current'/>
                  <path d="M8.88932 13.5001C12.5712 13.5001 15.556 10.478 15.556 6.75009C15.556 6.20698 15.4926 5.67884 15.373 5.17285C18.099 6.39704 20.0004 9.16124 20.0004 12.3751V15.7501C20.0004 16.9927 19.0055 18.0001 17.7782 18.0001H11.1115C8.20883 18.0001 5.73941 16.1218 4.82422 13.5001H8.88932Z" className='fill-current'/>
                </svg>
                <span className='text-sm font-medium'>Messages</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleLinkClick('/dashboard/verses')}
                className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                  pathname === '/dashboard/verses' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${pathname === '/dashboard/verses' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`}>
                  <path opacity="0.4" d="M17.1459 3.79337L14.8382 6.10105C13.6835 5.17734 12.2187 4.625 10.625 4.625C6.89708 4.625 3.875 7.64708 3.875 11.375C3.875 15.1029 6.89708 18.125 10.625 18.125C14.3529 18.125 17.375 15.1029 17.375 11.375C17.375 10.3006 17.124 9.28489 16.6774 8.38322L19.0597 6.00094C20.0507 7.55306 20.625 9.39696 20.625 11.375C20.625 16.8978 16.1478 21.375 10.625 21.375C5.10215 21.375 0.625 16.8978 0.625 11.375C0.625 5.85215 5.10215 1.375 10.625 1.375C13.1165 1.375 15.3951 2.28613 17.1459 3.79337Z" className='fill-current'/>
                  <path d="M13.7691 7.17019C12.8927 6.51379 11.8042 6.125 10.625 6.125C7.7255 6.125 5.375 8.4755 5.375 11.375C5.375 14.2745 7.7255 16.625 10.625 16.625C13.5245 16.625 15.875 14.2745 15.875 11.375C15.875 10.7227 15.756 10.0982 15.5386 9.52202L13.3554 11.7053C13.1922 13.0683 12.032 14.125 10.625 14.125C9.10622 14.125 7.875 12.8938 7.875 11.375C7.875 9.85622 9.10622 8.625 10.625 8.625C11.1118 8.625 11.5692 8.75151 11.9658 8.97346L13.7691 7.17019Z" className='fill-current'/>
                  <path d="M21.1553 1.90533L11.8626 11.1981C11.8708 11.2559 11.875 11.3149 11.875 11.375C11.875 12.0654 11.3154 12.625 10.625 12.625C9.93464 12.625 9.375 12.0654 9.375 11.375C9.375 10.6846 9.93464 10.125 10.625 10.125C10.6851 10.125 10.7441 10.1292 10.8019 10.1374L20.0947 0.84467C20.3876 0.551777 20.8624 0.551777 21.1553 0.84467C21.4482 1.13756 21.4482 1.61244 21.1553 1.90533Z" className='fill-current'/>
                </svg>
                <span className='text-sm font-medium'>Verses</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleLinkClick('/dashboard/softservants')}
                className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                  pathname === '/dashboard/softservants' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${pathname === '/dashboard/softservants' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`}>
                  <ellipse opacity="0.4" cx="7" cy="14" rx="7" ry="4" className='fill-current'/>
                  <circle cx="7" cy="4" r="4" className='fill-current'/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 11C17.6568 11 19 9.65684 19 7.99999C19 7.37487 18.8088 6.7944 18.4817 6.31387L14.3139 10.4816C14.0014 10.2689 13.7312 9.99866 13.5184 9.68615L17.6862 5.51837C17.2057 5.19122 16.6252 5 16 5C14.3431 5 13 6.34314 13 7.99999C13 9.65684 14.3431 11 16 11Z" className='fill-current'/>
                </svg>
                <span className='text-sm font-medium'>Soft Servants</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleLinkClick('/dashboard/mailbox')}
                className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                  pathname === '/dashboard/mailbox' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${pathname === '/dashboard/mailbox' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`}>
                  <path opacity="0.4" d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V14C20 16.2091 18.2091 18 16 18H4C1.79086 18 0 16.2091 0 14V4Z" className='fill-current'/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.37604 4.58405C3.60581 4.23941 4.07146 4.14628 4.4161 4.37604L8.19731 6.89684C9.28898 7.62462 10.7112 7.62462 11.8029 6.89684L15.5841 4.37604C15.9287 4.14628 16.3944 4.23941 16.6241 4.58405C16.8539 4.9287 16.7608 5.39435 16.4161 5.62412L12.6349 8.14492C11.0394 9.2086 8.96078 9.2086 7.36525 8.14492L3.58405 5.62412C3.23941 5.39435 3.14628 4.9287 3.37604 4.58405Z" className='fill-current'/>
                </svg>
                <span className='text-sm font-medium'>Mailbox</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleLinkClick('/dashboard/settings')}
                className={`flex items-center space-x-2 p-4 rounded-lg text-base w-full ${
                  pathname === '/dashboard/settings' ? 'bg-[#141F1F] text-white' : 'text-[#141F1F] dark:text-gray-400'
                }`}
              >
                <Setting2 size={24} variant="Bulk" className={`${pathname === '/dashboard/settings' ? 'text-gray-300 dark:text-white' : 'text-[#333333] dark:text-white'}`} />
                <span className='text-sm font-medium'>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;