'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

const links = [
  { href: '/features', label: 'Features' },
  { href: '/help', label: 'Help' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession();
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: '/' });
      console.log("Signout Successful", status);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle any error, perhaps show a notification to the user
    }
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 flex mt-2 justify-between items-center"
      >
        <div className="container mx-auto flex justify-between backdrop-blur-[7px] shadow-custom-shadow items-center p-4 bg-white/50 dark:bg-[#141F1F]/50 rounded-full">
          <div className='flex items-center gap-x-8'>
            <Link href="/" className={`text-2xl font-bold text-[#141F1F] flex items-center`}>
              <Image src={"/brand/brand.png"} alt='Brand Logo' width={50} height={50} className='object-cover' />
              <p className='text-lg dark:text-white'>GranularX</p>
            </Link>

            {/* <div className='flex items-center gap-x-4'>
              <Link href="#" className={`text-base text-white bg-[#141F1F] rounded-full p-1 px-4 flex items-center`}>
                <p className='dark:text-white'>Personal</p>
              </Link>
              <Link href="#" className={`text-base text-[#141F1F] flex items-center`}>
                <p className='dark:text-white'>Platform</p>
              </Link>
            </div> */}
          </div>

          <div className="hidden md:flex items-center text-[#141F1F]">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}>
                <motion.div
                  className={`relative p-2 text-base mx-2 dark:text-gray-100`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                  {pathname === href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      layoutId="underline"
                    />
                  )}
                </motion.div>
              </Link>
            ))}

            {session ? (
              <div className="hidden md:flex font-medium items-center gap-x-4 ml-6 mr-4">
                <Link href={"/dashboard"} className='flex items-center transition duration-300 ease-in-out gap-x-1 text-white dark:bg-gray-100 dark:text-[#141F1F] bg-[#141F1F] hover:bg-[#0d1414] p-2 px-5 rounded-full'>
                  {session.user.username || 'User'}
                </Link>
                <button onClick={handleSignOut} className='text-red-500 hover:text-red-700 transition-all ease-in-out duration-200'>Sign out</button>
              </div>
            ) : (
              <div className="hidden md:flex font-medium items-center gap-x-6 ml-10">
                <Link href={"/auth/signin"} className='text-[#141F1F] dark:text-gray-100'>
                  Login
                </Link>
                <Link href={"/auth/signup"} className='flex items-center transition duration-300 ease-in-out gap-x-1 text-white dark:bg-gray-100 dark:text-[#141F1F] bg-[#141F1F] hover:bg-[#0d1414] p-2 px-5 rounded-full'>
                  Create Account
                </Link>
              </div>
            )}
          </div>

        <div className={`md:hidden ${isScrolled ? "text-[#141F1F] dark:text-[#7DF9FF]" : "text-gray-600 dark:text-gray-100"}`}>   
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (  
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-lvw bg-[#141F1F]/90 backdrop-blur-[5px] z-50 md:hidden overflow-y-auto"
          >
            <div className="p-4 flex flex-col">
              <button onClick={() => setIsOpen(false)} className="mb-20 text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
              <br /> <br />
              <div className="">
                {links.map(({ href, label, icon }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='text-center'
                  >
                    <Link href={href}>
                      <motion.div
                        className="px-4 py-2 mb-2"
                        whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                      >
                        {label}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {session ? (
                <div className="mt-8 flex flex-col gap-y-4 items-center justify-center">
                  <Link href={"/dashboard"} className='flex items-center transition duration-300 ease-in-out gap-x-1 text-white dark:bg-gray-100 dark:text-[#141F1F] bg-[#141F1F] hover:bg-[#0d1414] p-2 px-5 rounded-full'>
                    {session.user.username || 'User'}
                  </Link>
                  <button onClick={handleSignOut} className='text-red-400 hover:text-red-700 transition-all ease-in-out duration-200'>Sign out</button>
                </div>
              ) : (
                <div className="mt-8 flex flex-col gap-y-8 items-center justify-center">
                  <Link href={"/auth/signin"} className='text-white'>
                    Login
                  </Link>
                  <Link href={"/auth/signup"} className='flex items-center transition duration-300 ease-in-out gap-x-1 text-white dark:bg-gray-100 dark:text-[#141F1F] bg-[#141F1F] hover:bg-[#0d1414] p-2 px-5 rounded-full'>
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}