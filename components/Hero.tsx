import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="text-center p-40 pt-20 flex justify-center items-center text-black relative overflow-hidden">
      <div className='mb-14'>
        <div className='flex flex-col items-center mb-2'>
          <h1 className="text-7xl font-black mb-4">Your Currency and Spend it Borderlessly</h1>
          <p className="text-xl mb-8 text-gray-600 max-w-[60ch]">Get your money moving internationally. Save on hidden fees when you send with GranularX.</p>
        </div>
        <div className="space-x-4">
          <Link href="/send" className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800">Send Money Now</Link>
          <Link href="/signup" className="px-6 py-3 border border-black text-black rounded-full hover:bg-gray-100">Open an account</Link>
        </div>
        <div className="mt-8">
          <span className="inline-block bg-[#00E200] text-white px-4 py-2 rounded-full text-base absolute bottom-32 left-52">Naira 🇳🇬</span>
          <span className="inline-block bg-[#141F1F] text-white px-4 py-2 rounded-full text-base absolute top-60 right-32">🇺🇸 Dollar</span>
          <div className="absolute bottom-[165px] left-[304px] transform -translate-x-1/2 cursor-pointer">
            <Image src={"/others/naira.svg"} alt='Naira cursor' width={25} height={25} className='animate-bounce-1' />
          </div>
          <div className="absolute top-52 right-56 transform translate-x-1/2 cursor-pointer">
            <Image src={"/others/dollar.svg"} alt='Naira cursor' width={25} height={25} className='animate-bounce-1' />
          </div>
        </div>
      </div>

      <div className='absolute -bottom-2/4'>
        <Image width={520} height={520}
          src={"/earth.png"} alt='earth picture'
        />
      </div>
      <div className='absolute -bottom-2/4'>
        <Image width={520} height={520}
          src={"/earth_wrap.png"} className='-rotate-6' alt='earth picture'
        />
      </div>
    </section>
  );
};

export default Hero;