import Image from 'next/image';

const Security = () => {
  return (
    <section className="bg-white dark:bg-[#1C2626] py-16 mb-20">
      <div className="md:mx-10 md:px-4">
        <div className='p-2 px-6 mx-4 md:mx-0 mb-6 md:mb-0 w-max rounded-full bg-[#141F1F14] dark:bg-[#7DF9FF33] border border-[#0000001F] dark:border-[#7DF9FF1F] flex items-center gap-x-2'>
          <Image src={"/badge.png"} width={18} height={18} alt='Badge' />
          <span className='text-[#141F1F] dark:text-[#7DF9FF] text-base'>Security</span>
        </div>
        <div className="flex flex-row items-center flex-wrap md:flex-nowrap justify-between gap-x-8">
          <div className="w-full text-left mb-8 space-y-6 mx-4 md:mx-0">
            <h1 className="text-3xl md:text-6xl font-bold text-[#141F1F] dark:text-white mb-4">Frustrate thieves</h1>
            <p className="text-[#111111] dark:text-gray-100 max-w-lg text-base md:text-lg">
              Each quarter, our customers entrust us with moving over £30 billion of their money. Here's how we ensure their protection.
            </p>
            <button className="bg-[#141F1F] dark:bg-[#7DF9FF] text-white dark:text-[#1C2626] py-3 px-10 rounded-full font-medium hover:bg-opacity-90 transition duration-200">
              Send Money Now
            </button>
          </div>
          <div className="w-full">
            <Image
              src="/security.png"
              alt="Security chain and lock"
              width={600}
              height={300}
              className="md:-rotate-[18deg]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12">
          <div className="flex items-center justify-between px-8 py-10 md:p-10 gap-x-6 bg-[#F6F6F6] dark:bg-[#141F1F] rounded-2xl">
            <div className="w-9 h-11">
              <svg width="34" height="45" viewBox="0 0 34 45" fill="none" xmlns="http://www.w3.org/2000/svg"className="fill-black dark:fill-white">
                <path 
                  opacity="0.4" 
                  d="M0 22.8436C0 18.1492 3.80558 14.3436 8.5 14.3436H25.5C30.1944 14.3436 34 18.1492 34 22.8436V35.5936C34 40.288 30.1944 44.0936 25.5 44.0936H8.5C3.80558 44.0936 0 40.288 0 35.5936V22.8436Z" 
                  className="fill-current" 
                />
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M17 25.4999C17.8802 25.4999 18.5938 26.2134 18.5938 27.0936V31.3436C18.5938 32.2238 17.8802 32.9374 17 32.9374C16.1198 32.9374 15.4062 32.2238 15.4062 31.3436V27.0936C15.4062 26.2134 16.1198 25.4999 17 25.4999Z" 
                  className="fill-current" 
                />
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M10.0938 10.0936C10.0938 6.27941 13.1858 3.18738 17 3.18738C20.8142 3.18738 23.9062 6.27941 23.9062 10.0936V14.3436H27.0938V10.0936C27.0938 4.519 22.5746 -0.00012207 17 -0.00012207C11.4254 -0.00012207 6.90625 4.519 6.90625 10.0936V14.3436H10.0938V10.0936Z" 
                  className="fill-current" 
                />
              </svg>
            </div>
            <div className="w-px h-14 border border-[#E4E4E7] dark:border-[#7DF9FF33]"></div>
            <h3 className="text-sm md:text-base text-[#111111] dark:text-white">Our dedicated fraud and security teams are committed to protecting your money.</h3>
          </div>
          <div className="flex items-center px-8 py-10 md:p-10 gap-x-6 bg-[#F6F6F6] dark:bg-[#141F1F] rounded-2xl">
            <div className="w-9 h-11">
              <svg width="42" height="45" viewBox="0 0 42 45" fill="none" xmlns="http://www.w3.org/2000/svg"className="fill-black dark:fill-white">
                <path 
                  opacity="0.4" 
                  d="M17.1723 0.809586L5.43417 6.02654C2.0389 7.53555 -0.201689 10.9149 0.0143634 14.6241C0.859016 29.1252 5.10549 35.5092 16.1398 42.9795C19.0629 44.9585 22.916 44.9633 25.837 42.9812C36.9052 35.4702 40.9997 28.9959 41.9186 14.6743C42.1581 10.9406 39.9139 7.52539 36.495 6.00586L24.8034 0.809584C22.3742 -0.270025 19.6014 -0.270024 17.1723 0.809586Z" 
                  className="fill-current"
                />
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M29.1936 16.5773C29.9257 17.218 29.9999 18.3308 29.3593 19.0629L22.6189 26.7663C21.1705 28.4216 18.6756 28.6432 16.9581 27.2692L12.8413 23.9758C12.0817 23.3681 11.9585 22.2596 12.5662 21.4999C13.174 20.7402 14.2825 20.6171 15.0421 21.2248L19.1589 24.5182C19.4043 24.7145 19.7607 24.6829 19.9676 24.4464L26.708 16.743C27.3486 16.0109 28.4615 15.9367 29.1936 16.5773Z" 
                  className="fill-current"
                />
              </svg>
            </div>
            <div className="w-px h-14 border border-[#E4E4E7] dark:border-[#7DF9FF33]"></div>
            <h3 className="text-sm md:text-base text-[#111111] dark:text-white">We secure your account with two-factor authentication.</h3>
          </div>
          <div className="flex items-center px-8 py-10 md:p-10 gap-x-6 bg-[#F6F6F6] dark:bg-[#141F1F] rounded-2xl">
            <div className="w-9 h-11">
              <svg width="34" height="43" viewBox="0 0 34 43" fill="none" xmlns="http://www.w3.org/2000/svg"className="fill-black dark:fill-white">
                <path 
                  opacity="0.4" 
                  d="M23.375 -0.00012207H6.375C2.85418 -0.00012207 0 2.85406 0 6.37488V36.1249C0 39.6457 2.85419 42.4999 6.375 42.4999H23.375C26.8958 42.4999 29.75 39.6457 29.75 36.1249V6.37488C29.75 2.85406 26.8958 -0.00012207 23.375 -0.00012207Z" 
                  className="fill-current" 
                />
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M25.5 24.9686C24.033 24.9686 22.8438 26.1579 22.8438 27.6249V31.8749C22.8438 32.7551 22.1302 33.4686 21.25 33.4686C20.3698 33.4686 19.6562 32.7551 19.6562 31.8749V27.6249C19.6562 24.3975 22.2726 21.7811 25.5 21.7811C28.7274 21.7811 31.3438 24.3975 31.3438 27.6249V31.8749C31.3438 32.7551 30.6302 33.4686 29.75 33.4686C28.8698 33.4686 28.1562 32.7551 28.1562 31.8749V27.6249C28.1562 26.1579 26.967 24.9686 25.5 24.9686Z" 
                  className="fill-current" 
                />
                <path 
                  d="M29.75 29.7499H21.25C18.9028 29.7499 17 31.6527 17 33.9999V38.2499C17 40.5971 18.9028 42.4999 21.25 42.4999H29.75C32.0972 42.4999 34 40.5971 34 38.2499V33.9999C34 31.6527 32.0972 29.7499 29.75 29.7499Z" 
                  className="fill-current" 
                />
              </svg>
            </div>
            <div className="w-px h-14 border border-[#E4E4E7] dark:border-[#7DF9FF33]"></div>
            <h3 className="text-sm md:text-base text-[#111111] dark:text-white">We safeguard your money with reputable financial institutions.</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;