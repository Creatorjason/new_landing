import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#141F1F] text-[#DFE8EB] p-10">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-[#626262] pb-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Join our newsletter</h2>
            <p className="text-sm mb-4">Get all the latest GranularX news <br />delivered to your inbox.</p>
          </div>
          <form className="flex gap-x-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Email address"
              className="p-3 px-5 w-full md:w-auto flex-grow rounded-full bg-white border border-[#D0D5DD] text-[#101928] text-base outline-none"
            />
            <button
              type="submit"
              className="bg-[#7DF9FF] text-[#141F1F] font-semibold text-base py-3 px-6 rounded-full"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-between py-8">
          <div className="flex flex-col md:flex-row w-full justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="font-semibold mb-4">Product</h3>
              <ul>
                <li className="mb-2"><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Editor</Link></li>
                <li className="mb-2"><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Runtimes</Link></li>
                <li className="mb-2"><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Rendered</Link></li>
                <li><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Changelog</Link></li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0">
              <h3 className="font-semibold mb-4">Community</h3>
              <ul>
                <li className="mb-2"><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">GranularX Club</Link></li>
                <li className="mb-2"><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Discord</Link></li>
                <li><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Get Support</Link></li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0">
              <h3 className="font-semibold mb-4">Learn</h3>
              <ul>
                <li className="mb-2"><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Documentation</Link></li>
                <li className="mb-2"><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Blog</Link></li>
                <li><Link href="#" className="hover:text-[#0AD1C8] transition-all ease-in-out duration-300">Features</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start text-center md:text-left border-t border-[#626262] pt-8">
          <div>
            <div className="mb-8 md:mb-0">
              <div className='flex items-center mb-4'>
                <Image src="/brand/brand.png" alt="GranularX Logo" width={50} height={50} />
                <span>GranularX</span>
              </div>
              <p className="mb-4 text-base">
                © 2024 GranularX. All rights reserved.
              </p>
              <p className="mb-8 text-base">
                All trademarks, logos, and brand names are the <br />property of their respective owners.
              </p>
            </div>          
            <div className="text-xs flex space-x-6">
              <Link href="#" className="hover:text-[#0AD1C8] transition duration-300 ease-in-out text-base">Terms of Service</Link>
              <Link href="#" className="hover:text-[#0AD1C8] transition duration-300 ease-in-out text-base">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#0AD1C8] transition duration-300 ease-in-out text-base">Security</Link>
            </div>
          </div>
          
          <div className="flex space-x-4 md:mb-0">
            <Link href="#" aria-label="Facebook" className="text-[#141F1F] transition-all ease-in-out duration-300 hover:text-[#0AD1C8] bg-[#7DF9FF] p-2 rounded-full"><FaFacebook /></Link>
            <Link href="#" aria-label="Twitter" className="text-[#141F1F] transition-all ease-in-out duration-300 hover:text-[#0AD1C8] bg-[#7DF9FF] p-2 rounded-full"><FaTwitter /></Link>
            <Link href="#" aria-label="Instagram" className="text-[#141F1F] transition-all ease-in-out duration-300 hover:text-[#0AD1C8] bg-[#7DF9FF] p-2 rounded-full"><FaInstagram /></Link>
            <Link href="#" aria-label="LinkedIn" className="text-[#141F1F] transition-all ease-in-out duration-300 hover:text-[#0AD1C8] bg-[#7DF9FF] p-2 rounded-full"><FaLinkedinIn /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
