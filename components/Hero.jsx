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
      className="text-center p-4 pb-40 md:p-40 pt-36 flex flex-col justify-center items-center dark:text-white text-black relative overflow-hidden"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mb-10 md:mb-20'
      >
        <div className='flex flex-col items-center mb-2'>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex justify-center items-center bg-[#F1FEFF] px-6 border border-[#9FA5F71A] py-1 mb-8 rounded-full"
          >
            <motion.p className='text-[#050505] flex items-center gap-x-2 font-semibold'>
              <span>🔥</span> The Economic Super App
            </motion.p>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl font-grotesk md:text-7xl font-black mb-4"
          >
            Borderless Banking, Limitless Possibilities
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl mb-8 text-gray-600 dark:text-[#7DF9FF] max-w-[60ch]"
          >
            Your all-in-one platform for in-chat/cross-border payments, customer/community engagement, finance managemant and staying connected. The super app that optimises you everyday.
          </motion.p>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="gap-x-2 flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/auth/register" className="text-sm px-6 py-3 border border-black dark:border-gray-200 text-black dark:text-gray-200 dark:hover:text-[#141F1F] rounded-full hover:bg-gray-100">Open an account</Link>
          </motion.div>
          <motion.div className='mb-4' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/send" className="text-sm px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800">Send Money Now</Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className='relative'>
        <div className='absolute w-10 h-10 -top-14 md:-top-28 right-8 md:right-1/4'>
          <svg 
            className="w-16 h-20 md:w-24 md:h-32" 
            viewBox="0 0 113 156" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M61.75 151.112C61.5335 151.749 60.8412 152.09 60.2037 151.874C59.5661 151.657 59.2248 150.965 59.4413 150.328L61.75 151.112ZM111.443 82.861L110.242 83.0734L110.242 83.073L111.443 82.861ZM2.60844 63.6838L3.77605 63.3333L3.7761 63.3334L2.60844 63.6838ZM67.8484 13.3927L69.0672 13.4198L69.0672 13.4204L67.8484 13.3927ZM27.7076 2.41252C27.0555 2.24514 26.6625 1.58077 26.8299 0.928614C26.9973 0.276459 27.6616 -0.116533 28.3138 0.0508495L27.7076 2.41252ZM78.7178 137.73C79.2473 137.315 80.0137 137.407 80.4296 137.936C80.8455 138.466 80.7534 139.232 80.224 139.648L78.7178 137.73ZM59.0817 154.705L59.8347 155.664C59.4692 155.951 58.9723 156.005 58.5535 155.804C58.1346 155.602 57.8667 155.18 57.8626 154.716L59.0817 154.705ZM57.6037 125.091C57.5979 124.418 58.1389 123.867 58.8122 123.861C59.4854 123.855 60.036 124.396 60.0419 125.07L57.6037 125.091ZM60.5957 150.72C59.4413 150.328 59.4414 150.327 59.4416 150.327C59.4416 150.327 59.4418 150.326 59.4419 150.326C59.4422 150.325 59.4425 150.324 59.443 150.323C59.4438 150.32 59.445 150.317 59.4465 150.312C59.4495 150.304 59.4537 150.291 59.4592 150.276C59.4702 150.244 59.4863 150.198 59.5074 150.139C59.5497 150.02 59.6122 149.848 59.6954 149.626C59.8617 149.182 60.1106 148.54 60.444 147.74C61.1106 146.14 62.1169 143.9 63.4804 141.332C66.2017 136.206 70.373 129.716 76.1486 124.382L77.8027 126.174C72.3023 131.253 68.2836 137.484 65.634 142.475C64.312 144.966 63.3375 147.134 62.6947 148.677C62.3735 149.449 62.1355 150.063 61.9786 150.481C61.9002 150.69 61.8421 150.851 61.8041 150.958C61.7851 151.011 61.7711 151.051 61.7621 151.077C61.7576 151.09 61.7544 151.099 61.7523 151.105C61.7513 151.108 61.7506 151.11 61.7503 151.111C61.7501 151.112 61.7499 151.112 61.7499 151.112C61.7499 151.112 61.7499 151.112 61.7499 151.112C61.75 151.112 61.75 151.112 60.5957 150.72ZM76.1486 124.382C78.9985 121.751 82.7678 118.701 86.7117 115.425C90.6754 112.133 94.8455 108.587 98.5752 104.911C102.311 101.228 105.557 97.4594 107.704 93.7319C109.852 90.0022 110.836 86.4279 110.242 83.0734L112.643 82.6486C113.374 86.7797 112.121 90.9489 109.817 94.9489C107.512 98.9512 104.09 102.898 100.287 106.647C96.4782 110.402 92.2396 114.003 88.2697 117.301C84.28 120.615 80.5908 123.599 77.8027 126.174L76.1486 124.382ZM110.242 83.073C109.589 79.3723 107.669 76.6862 104.739 74.7232C101.767 72.7326 97.7236 71.4694 92.8555 70.7577C83.1087 69.3328 70.4979 70.1732 57.6772 71.2991C44.9347 72.4181 31.9819 73.82 21.7902 73.4299C16.6933 73.2348 12.1701 72.5901 8.65579 71.1762C5.11275 69.7507 2.47728 67.4883 1.44077 64.0342L3.7761 63.3334C4.53393 65.8588 6.46643 67.6672 9.56587 68.9142C12.694 70.1727 16.8879 70.8023 21.8834 70.9935C31.8766 71.376 44.6106 69.9989 57.4639 68.8702C70.2391 67.7483 83.1334 66.8723 93.2082 68.3452C98.2508 69.0824 102.698 70.4217 106.096 72.6974C109.535 75.0009 111.866 78.245 112.643 82.649L110.242 83.073ZM1.44083 64.0344C0.243465 60.0465 0.404985 56.4843 1.67273 53.2998C2.9314 50.138 5.24047 47.4477 8.17463 45.107C14.0104 40.4517 22.5871 36.9765 31.2614 33.858C40.0275 30.7066 48.893 27.9177 55.6559 24.6211C59.0275 22.9775 61.7768 21.2524 63.6842 19.3673C65.5754 17.4984 66.5803 15.5348 66.6296 13.365L69.0672 13.4204C68.9995 16.3982 67.5963 18.9291 65.3981 21.1016C63.2162 23.2578 60.1948 25.121 56.7243 26.8128C49.8029 30.1867 40.6981 33.0564 32.0863 36.1524C23.3827 39.2814 15.1739 42.6425 9.69512 47.0131C6.97198 49.1854 4.99145 51.5555 3.93804 54.2016C2.89371 56.8249 2.72066 59.8182 3.77605 63.3333L1.44083 64.0344ZM66.6296 13.3656C66.6713 11.4875 65.404 9.916 62.6238 8.56347C59.8658 7.22174 55.9835 6.29439 51.6501 5.59265C47.3354 4.89393 42.6942 4.436 38.4465 3.98502C34.2426 3.53869 30.3642 3.09434 27.7076 2.41252L28.3138 0.0508495C30.7621 0.679235 34.4448 1.10825 38.7039 1.56043C42.9191 2.00796 47.6425 2.47369 52.0399 3.18579C56.4186 3.89488 60.5959 4.86551 63.6904 6.37094C66.7628 7.86557 69.1411 10.0904 69.0672 13.4198L66.6296 13.3656ZM80.224 139.648L59.8347 155.664L58.3286 153.746L78.7178 137.73L80.224 139.648ZM57.8626 154.716L57.6037 125.091L60.0419 125.07L60.3007 154.694L57.8626 154.716Z" fill="#101828"/>
          </svg>
        </div>
        <div className='hidden md:block absolute top-1/4 -right-20'>
          <span className='text-9xl'>🚀</span>
        </div>
        <div className='hidden md:block absolute top-1/2 -left-40'>
          <Image src={"/text.png"} alt='Text Image' width={200} height={200} className='' />
        </div>
        <div>
          <Image src={"/banner-img.png"} alt='Text Image' width={950} height={950} className='' />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;