import { Edit2 } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const MailboxSetting = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <div className='border-b py-8'>
        <div className='block md:flex'>
          <div className='flex-1 mb-4 md:mb-0'>
            <p className='text-base font-semibold'>Reset Password</p>
          </div>
          <div className='flex-1 flex flex-col gap-y-6'>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Old Password <span className='text-red-500'>*</span></label>
              <input type="password" placeholder='Enter your old password' value={""} className='border font-medium outline-none p-3 dark:border-[#444444] dark:bg-[#141f1f] rounded-md text-sm border-[#E6E6E6]' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>New Password <span className='text-red-500'>*</span></label>
              <input type="text" placeholder='Create a new password' value={""} className='border font-medium outline-none p-3 dark:border-[#444444] dark:bg-[#141f1f] rounded-md text-sm border-[#E6E6E6]' />
              <div className='mt-1'>
                <ul className='text-xs list-disc ml-4 text-[#999999]'>
                  <li>Minimum of 10 characters</li>
                  <li>At lease one special character</li>
                  <li>At lease one number</li>
                  <li>At lease one uppercase character</li>
                  <li>At lease one lowercase character</li>
                </ul>
              </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Confirm Password <span className='text-red-500'>*</span></label>
              <input type="text" placeholder='Retype new password' value={""} className='border font-medium outline-none p-3 dark:border-[#444444] dark:bg-[#141f1f] rounded-md text-sm border-[#E6E6E6]' />
            </div>

            <button
              type="submit"
              className={`w-full flex items-center justify-center p-3 text-sm mt-2 font-medium rounded-lg bg-[#141F1F] dark:bg-[#7DF9FF] text-white dark:text-[#141F1F] hover:bg-gray-800 dark:hover:bg-[#7df8ff93] transition-all duration-200 ease-in-out`}
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MailboxSetting