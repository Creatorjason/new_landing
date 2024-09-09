import { Edit2 } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const ProfileSetting = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <div className='border-b py-8'>
        <div className='block md:flex items-center'>
          <div className='flex-1'>
            <p className='text-base font-semibold'>Profile photo</p>
            <p className='text-sm text-[#666666]'>This image will be displayed on your profile</p>
          </div>
          <div className='flex-1 mt-4 md:mt-0'>
            <div className='relative w-max border rounded-full'>
              <Image src={"/others/avatar.png"} alt='Avatar' width={100} height={100} loading='lazy' className='' />
              <button className='absolute bottom-0 bg-[#7df8ff8a] right-1 rounded-full p-1.5'>
                <Edit2 size="18" variant='Bold'/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='border-b py-8'>
        <div className='block md:flex items-center'>
          <div className='flex-1'>
            <p className='text-base font-semibold'>Theme</p>
            <p className='text-sm text-[#666666]'>Change theme to your preference</p>
          </div>
          <form className='flex-1 flex gap-x-6 items-center mt-4 md:mt-0'>
            <div className='flex gap-x-1 items-center'>
              <input type="radio" name="mode" id="light" value={"Light Mode"} /> <label htmlFor='light' className='text-sm font-medium'>Light Mode</label>
            </div>
            <div className='flex gap-x-1 items-center'>
              <input type="radio" name="mode" id="dark"  value={"Dark Mode"} /> <label htmlFor='dark' className='text-sm font-medium'>Dark Mode</label>
            </div>
          </form>
        </div>
      </div>

      <div className='border-b py-8'>
        <div className='block md:flex'>
          <div className='flex-1 mb-4 md:mb-0'>
            <p className='text-base font-semibold'>Profile Information</p>
          </div>
          <div className='flex-1 flex flex-col gap-y-6'>
            <div className='flex justify-between gap-4 items-center flex-wrap md:flex-nowrap'>
              <div className='flex flex-col w-full'>
                <label htmlFor="" className='text-xs font-medium mb-1'>First Name</label>
                <input type="text" placeholder='Enter your name' value={"Leonard"} className='border font-medium outline-none p-3 rounded-md text-sm bg-[#FBFBFB] dark:border-[#444444] dark:bg-[#141f1f] border-[#E6E6E6]' readOnly />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor="" className='text-xs font-medium mb-1'>Last Name</label>
                <input type="text" placeholder='Enter your name' value={"Charles"} className='border font-medium outline-none p-3 rounded-md text-sm bg-[#FBFBFB] dark:border-[#444444] dark:bg-[#141f1f] border-[#E6E6E6]' readOnly />
              </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Email Address</label>
              <input type="text" placeholder='Enter your name' value={"amelia.klocko@gmail.com"} className='border font-medium outline-none p-3 rounded-md text-sm bg-[#FBFBFB] dark:border-[#444444] dark:bg-[#141f1f] border-[#E6E6E6]' readOnly />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Unique Naming System (UNS)</label>
              <input type="text" placeholder='Enter your name' value={session?.user?.username} className='border font-medium outline-none p-3 rounded-md text-sm bg-[#FBFBFB] dark:border-[#444444] dark:bg-[#141f1f] border-[#E6E6E6]' readOnly />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Phone Number</label>
              <input type="text" placeholder='Enter your name' value={session?.user?.phoneNumber} className='border font-medium outline-none p-3 rounded-md text-sm bg-[#FBFBFB] dark:border-[#444444] dark:bg-[#141f1f] border-[#E6E6E6]' readOnly />
            </div>

            <p className='text-[#141f1f] text-xs font-medium text-right'>Contact support to make changes to personal information</p>
          </div>
        </div>
      </div>

      <div className='border-b py-8'>
        <div className='block md:flex'>
          <div className='flex-1 mb-4 md:mb-0'>
            <p className='text-base font-semibold'>Reset Password</p>
          </div>
          <div className='flex-1 flex flex-col gap-y-6'>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Old Password <span className='text-red-500'>*</span></label>
              <input type="password" placeholder='Enter your old password' value={""} className='border dark:border-[#444444] dark:bg-[#141f1f] font-medium outline-none p-3 rounded-md text-sm border-[#E6E6E6]' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>New Password <span className='text-red-500'>*</span></label>
              <input type="text" placeholder='Create a new password' value={""} className='border dark:border-[#444444] dark:bg-[#141f1f] font-medium outline-none p-3 rounded-md text-sm border-[#E6E6E6]' />
              <div className='mt-1'>
                <ul className='text-xs list-disc ml-4 text-[#999999] dark:text-gray-300'>
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
              <input type="text" placeholder='Retype new password' value={""} className='border dark:border-[#444444] dark:bg-[#141f1f] font-medium outline-none p-3 rounded-md text-sm border-[#E6E6E6]' />
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

export default ProfileSetting