"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Feature = ({ icon, title, description, imageSrc, imageAlt, reverse = false, index }) => (
  <motion.div 
    className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-14"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <div className={`w-full ${reverse ? 'lg:order-2 lg:w-max' : 'lg:w-1/2'}`}>
      <div className="border-8 border-[#7DF9FF26] rounded-full p-2 w-max mb-4">
        {icon}
      </div>
      <div className="max-w-sm md:max-w-lg">
        <h2 className="text-3xl font-medium mb-4">{title}</h2>
        <p className="text-sm md:text-lg">{description}</p>
      </div>
    </div>
    <div className={`w-full lg:w-1/2 rounded-lg overflow-hidden ${reverse ? 'lg:order-1' : ''}`}>
      {Array.isArray(imageSrc) ? (
        <div className="flex">
          {imageSrc.map((src, index) => (
            <Image key={index} src={src} width={index === 0 ? 400 : 250} height={500} alt={`${imageAlt} ${index + 1}`} className="object-cover" />
          ))}
        </div>
      ) : (
        <Image src={imageSrc} width={700} height={500} alt={imageAlt} className="w-full h-full" />
      )}
    </div>
  </motion.div>
);

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className='flex flex-col gap-y-8 pb-8'>
      <div className='flex flex-col items-center justify-center'>
        <motion.div
          initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center items-center bg-[#F1FEFF] px-6 border border-[#9FA5F71A] py-1 mb-6 rounded-full"
        >
          <motion.p className='text-[#050505] flex items-center gap-x-2 font-semibold'>
            <span>🔥</span> Features
          </motion.p>
        </motion.div>
        <motion.div className='text-center flex flex-col items-center justify-center'>
          <h2 className='text-xl md:text-[28px] mb-2 font-grotesk font-bold'>GranularX is your all-in-one platform</h2>
          <p className='text-sm md:text-lg max-w-[40ch] md:max-w-[54ch]'>Use and invest in your favorite services from various sectors fast and easily. Book rides, order meals, invest, pay and many more.</p>
        </motion.div>
      </div>

      <motion.div 
        className="p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Feature
          icon={
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9H14M6 13H14M6 17H10M6 3C6 4.10457 6.89543 5 8 5H12C13.1046 5 14 4.10457 14 3M6 3C6 1.89543 6.89543 1 8 1H12C13.1046 1 14 1.89543 14 3M6 3H5C2.79086 3 1 4.79086 1 7V17C1 19.2091 2.79086 21 5 21H15C17.2091 21 19 19.2091 19 17V7C19 4.79086 17.2091 3 15 3H14" stroke="#7DC7CB" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }
          title="Keep your money safe from scammers & fraudsters"
          description="Worried about scammers? No more! With MITD (Money In Transit Devaluation), you can reverse transactions done incorrectly or fraudulently collected within a reasonable timeframe."
          imageSrc="/others/feature1.jpeg"
          imageAlt="Feature 1"
          index={0}
        />

        <Feature
          icon={
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L1 13H10L9 21L19 9H10L11 1Z" stroke="#55B5B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          title="Verses"
          description="GranularX groups are like fertile farms—they cultivate 'morphs' and reward their owners with tangible monetary benefits."
          imageSrc={["/others/feature2_1.jpeg", "/others/feature2_2.jpeg"]}
          imageAlt="Feature 2"
          reverse={true}
          index={1}
        />

        <Feature
          icon={
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 17V7M7 17V1M1 17V11" stroke="#7DC7CB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          title="Soft Servants"
          description="Tired of traditional passwords? GranularX offers sign-up/sign-in using images, audio, or videos as your unique pass forms."
          imageSrc="/others/feature3.jpeg"
          imageAlt="Feature 3"
          index={2}
        />

        <Feature
          icon={
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L1 13H10L9 21L19 9H10L11 1Z" stroke="#55B5B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          title="Lightning-fast In-Chat Payments"
          description="Say goodbye to worries about fake transfers or declined transactions. Receive payments in your DM and watch your money grow right in your DM."
          imageSrc="/others/feature4.jpeg"
          imageAlt="Feature 4"
          reverse={true}
          index={3}
        />
      </motion.div>
    </section>
  )
}

export default Features;