import { Edit2 } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const WalletSetting = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <div className='border-b py-8'>
        <div className='block md:flex items-center'>
          <div className='flex-1'>
            <p className='text-base font-semibold'>Set Transaction Default Mode</p>
          </div>
          <div className='flex-1 flex gap-x-6 items-center mt-4 md:mt-0'>
            <div className='flex gap-x-1 items-center'>
              <input type="radio" name="transaction" id="hot" value={"Hot"} /> <label htmlFor='hot' className='text-sm font-medium'>Hot</label>
            </div>
            <div className='flex gap-x-1 items-center'>
              <input type="radio" name="transaction" id="cold" value={"Cold"} /> <label htmlFor='cold' className='text-sm font-medium'>Cold</label>
            </div>
          </div>
        </div>
      </div>

      <div className='border-b py-8'>
        <div className='block md:flex'>
          <div className='flex-1 mb-4 md:mb-0'>
            <p className='text-base font-semibold'>Profile Information</p>
          </div>
          <div className='flex-1 flex flex-col gap-y-6'>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Virtual Wallet Address</label>
              <input type="text" placeholder='Enter virtual wallet address' value={""} className='border font-medium outline-none p-3 rounded-md dark:border-[#444444] dark:bg-[#141f1f] text-sm bg-[#FBFBFB] border-[#E6E6E6]' readOnly />
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default WalletSetting