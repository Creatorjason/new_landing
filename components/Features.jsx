"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section>
      <div className='flex flex-col items-center justify-center'>
        <motion.div
          initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center items-center bg-[#F1FEFF] px-6 border border-[#9FA5F71A] py-1 mb-6 rounded-full"
        >
          <motion.p className='text-[#050505] flex items-center gap-x-2 font-semibold'>
            <span>🔥</span> Features
          </motion.p>
        </motion.div>
        <motion.div className='text-center'>
          <h2 className='text-2xl mb-4 font-grotesk font-semibold'>GranularX is your all-in-one platform</h2>
          <p className='max-w-[54ch]'>Use and invest in your favorite services from various sectors fast and easily. Book rides, order meals, invest, pay and many more.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Features