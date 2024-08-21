import Image from 'next/image'; 

const Security = () => {
  return (
    <section className="bg-white py-16 mb-20"> {/* Adjust padding as needed */}
      <div className="mx-10 px-4"> {/* Container for content */}
        <div className='p-2 px-6 w-max rounded-full bg-[#141F1F14] border border-[#0000001F] flex items-center gap-x-2'>
          <Image src={"/badge.png"} width={20} height={20} alt='Badge' />
          <span className='text-[#141F1F] text-base'>Security</span>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-8">
          {/* Text Content */}
          <div className="w-full text-center md:text-left mb-8 space-y-6"> 
            <h1 className="text-6xl font-bold text-[#141F1F] mb-4">Frustrate thieves</h1>
            <p className="text-[#111111] max-w-lg text-lg">
              Each quarter, our customers entrust us with moving over £30 billion of their money. Here's how we ensure their protection.
            </p>
            <button className="bg-[#141F1F] text-white py-3 px-10 rounded-full font-medium">
              Send Money Now
            </button>
          </div>

          {/* Image */}
          <div className="w-full">
            <Image 
              src="/security.png" // Replace with your image path
              alt="Security chain and lock"
              width={600} // Adjust as needed
              height={300} // Adjust as needed
              className="-rotate-[18deg]" 
            />
          </div>

        </div>

        {/* Feature Sections (Three Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"> {/* Adjust gap and margin as needed */}

          {/* Column 1 */}
          <div className="flex items-center justify-between p-10 gap-x-6 bg-[#F6F6F6] rounded-2xl"> 
            <Image src={"/Group.svg"} alt='Group' width={100} height={100} className='w-9 h-11' />
            <div className="w-px h-14 border border-[#E4E4E7]"> {/* Icon background */}</div>
            <h3 className="text-base text-[#111111]">Our dedicated fraud and security teams are committed to protecting your money.</h3>
          </div>

          {/* Column 2 */}
          <div className="flex items-center p-10 gap-x-6 bg-[#F6F6F6] rounded-2xl">
            <Image src={"/security.svg"} alt='Group' width={100} height={100} className='w-9 h-11' />
            <div className="w-px h-14 border border-[#E4E4E7]"></div>
            <h3 className="text-base text-[#111111]">We secure your account with two-factor authentication.</h3>
          </div>

          {/* Column 3 */}
          <div className="flex items-center p-10 gap-x-6 bg-[#F6F6F6] rounded-2xl">
            <Image src={"/phone-lock.svg"} alt='Group' width={100} height={100} className='w-9 h-11' />
            <div className="w-px h-14 border border-[#E4E4E7]"></div>
            <h3 className="text-base text-[#111111]">We safeguard your money with reputable financial institutions.</h3>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Security;