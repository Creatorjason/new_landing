"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center p-4 pb-40 md:p-40 pt-36 flex justify-center items-center text-black relative overflow-hidden"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mb-14 px-2'
      >
        <div className='flex flex-col items-center mb-2'>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-7xl font-black mb-4"
          >
            Borderless Banking, Limitless Possibilities
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl mb-8 text-gray-600 max-w-[60ch]"
          >
            Get your money moving internationally. Save on hidden fees when you send with GranularX.
          </motion.p>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="gap-4 flex justify-center flex-col md:flex-row"
        >
          <motion.div className='mb-4' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/send" className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800">Send Money Now</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup" className="px-6 py-3 border border-black text-black rounded-full hover:bg-gray-100">Open an account</Link>
          </motion.div>
        </motion.div>
        <div className="hidden sm:block mt-8">
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-block bg-[#00E200] text-white px-4 py-2 rounded-full text-base absolute bottom-32 left-52"
          >
            Naira 🇳🇬
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="inline-block bg-[#141F1F] text-white px-4 py-2 rounded-full text-base absolute top-60 right-32"
          >
            🇺🇸 Dollar
          </motion.span>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-[165px] left-[304px] transform -translate-x-1/2 cursor-pointer"
          >
            <Image src={"/others/naira.svg"} alt='Naira cursor' width={25} height={25} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
            className="absolute top-52 right-56 transform translate-x-1/2 cursor-pointer"
          >
            <Image src={"/others/dollar.svg"} alt='Dollar cursor' width={25} height={25} />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 200, ease: "linear" }}
        className='absolute -bottom-[35%] md:!-bottom-2/4'
      >
        <Image width={520} height={520}
          src={"/earth.png"} alt='earth picture'
        />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 200, ease: "linear" }}
        className='absolute -bottom-[35%] md:!-bottom-2/4'
      >
        <Image width={520} height={520}
          src={"/earth_wrap.png"} className='-rotate-6' alt='earth picture'
        />
      </motion.div>
    </motion.section>
  );
};

export default Hero;