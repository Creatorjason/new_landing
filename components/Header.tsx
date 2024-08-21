import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white m-4 rounded-full shadow-custom-shadow">
      <Link href="/" className="flex items-center text-xl font-bold text-[#141F1F]">
        <Image src={"/brand/brand.png"} alt='Brand Image' width={50} height={50} />
        <span>GranularX</span>
      </Link>
      <div className='flex-1 ml-8 flex items-center gap-x-3 text-sm'>
        <Link href="/personal" className="hover:text-gray-800 py-1 px-3 rounded-full bg-[#141F1F] text-white">Personal</Link>
        <Link href="/features" className="text-gray-600 hover:text-gray-800">Platform</Link>
      </div>

      <div className='flex items-center gap-x-10'>
        <nav className=''>
          <ul className="flex space-x-6 text-sm">
            <li><Link href="/features" className="text-gray-600 hover:text-gray-800">Features</Link></li>
            <li><Link href="/help" className="text-gray-600 hover:text-gray-800">Help</Link></li>
          </ul>
        </nav>

        <div className='text-sm flex items-center gap-x-4'>
          <Link href="/login" className="text-gray-600 hover:text-gray-800">Log in</Link>
          <Link href="/signup" className="px-4 py-2 bg-[#141F1F] text-white rounded-full hover:bg-gray-800">Create Account</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;


