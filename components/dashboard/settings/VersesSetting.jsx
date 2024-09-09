import { useSession } from 'next-auth/react'
import React from 'react'

const VersesSetting = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <div className='border-b py-8'>
        <div className='block md:flex'>
          <div className='flex-1 mb-4 md:mb-0'>
            <p className='text-base font-semibold'>Add Verse</p>
          </div>
          <div className='flex-1 flex flex-col gap-y-6'>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Name</label>
              <input type="text" placeholder='Enter your name' value={"amelia.klocko@gmail.com"} className='border font-medium outline-none p-3 dark:border-[#444444] dark:bg-[#141f1f] rounded-md text-sm bg-[#FBFBFB] border-[#E6E6E6]' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Description</label>
              <textarea name="" id="" className='border font-medium outline-none p-3 h-24 resize-none rounded-md text-sm bg-[#FBFBFB] border-[#E6E6E6]' placeholder='Describe your verse...'></textarea>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-xs font-medium mb-1'>Sector</label>
              <select name="" id="" className='border font-medium outline-none p-3 dark:border-[#444444] dark:bg-[#141f1f] rounded-md text-sm bg-[#FBFBFB] border-[#E6E6E6]'>
                <option value="">Business</option>
                <option value="">Sports</option>
                <option value="">Entertainment</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="" className='text-sm font-medium mb-1'>Do you want a soft servant to manage your verse?</label>
              <form className='flex gap-2 flex-col mt-4 md:mt-0'>
                <div className='flex gap-x-1 items-center'>
                  <input type="radio" name="softservant" id="yes" value={"Yes"} /> <label htmlFor='yes' className='text-sm font-medium'>Yes</label>
                </div>
                <div className='flex gap-x-1 items-center'>
                  <input type="radio" name="softservant" id="no" value={"No"} /> <label htmlFor='no' className='text-sm font-medium'>No</label>
                </div>
              </form>
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

      <div className='border-b py-8'>
        <div className='block md:flex'>
          <div className='flex-1 mb-4 md:mb-0'>
            <p className='text-base font-semibold'>Add Product</p>
          </div>
          <div className='flex-1 flex flex-col gap-y-6'>
            <div>
              <div className="mt-1 flex items-center justify-between">
                <div className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden bg-gray-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9.5C6 6.46243 8.46243 4 11.5 4C14.1907 4 16.432 5.93318 16.907 8.48668C16.9736 8.84475 17.2297 9.1383 17.5754 9.25295C19.5661 9.9132 21 11.7905 21 14C21 16.7614 18.7614 19 16 19C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21C19.866 21 23 17.866 23 14C23 11.1075 21.2462 8.62697 18.7463 7.55958C17.8909 4.358 14.9717 2 11.5 2C7.35786 2 4 5.35786 4 9.5C4 9.60028 4.00197 9.70014 4.00589 9.79955C2.21048 10.8354 1 12.7754 1 15C1 18.3137 3.68629 21 7 21C7.55228 21 8 20.5523 8 20C8 19.4477 7.55228 19 7 19C4.79086 19 3 17.2091 3 15C3 13.3427 4.00818 11.9185 5.44865 11.3117C5.86549 11.1361 6.11256 10.7026 6.05119 10.2544C6.01748 10.0083 6 9.75644 6 9.5Z" fill="#475367"/>
                    <path d="M11.3356 14.2526C11.7145 13.9158 12.2855 13.9158 12.6644 14.2526L14.1644 15.5859C14.5771 15.9528 14.6143 16.5849 14.2474 16.9977C13.9264 17.3588 13.4025 17.4325 13 17.1996V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V17.1996C10.5975 17.4325 10.0736 17.3588 9.75259 16.9977C9.38567 16.5849 9.42285 15.9528 9.83564 15.5859L11.3356 14.2526Z" fill="#475367"/>
                  </svg>
                </div>
                <div className='px-4 flex-1'>
                  <p className='text-sm font-semibold'>Upload your pictures</p>
                  <small className='text-[#98A2B3] font-medium text-xs'>Max. 5MB</small>
                </div>
                <button type="button" className="py-2 px-4 text-white border border-[#141f1f] bg-[#141f1f] rounded-md shadow-sm text-sm leading-4 font-medium outline-none">
                  Upload
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product Name <span className='text-red-600'>*</span></label>
              <input type="text" name="product-name" id="product-name" className='w-full border font-medium outline-none p-3 dark:border-[#444444] dark:bg-[#141f1f] rounded-md text-sm bg-[#FBFBFB] border-[#E6E6E6]' placeholder="Enter product name" />
            </div>
            <div>
              <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">Product Price <span className='text-red-600'>*</span></label>
              <input type="text" name="product-price" id="product-price" className='w-full border font-medium outline-none p-3 dark:border-[#444444] dark:bg-[#141f1f] rounded-md text-sm bg-[#FBFBFB] border-[#E6E6E6]' placeholder="Enter product price" />
            </div>
            <div>
              <label htmlFor="product-color" className="block text-sm font-medium text-gray-700">Product Color <span className='text-red-600'>*</span></label>
              <input type="text" name="product-color" id="product-color" className='w-full border font-medium outline-none p-3 dark:border-[#444444] dark:bg-[#141f1f] rounded-md text-sm bg-[#FBFBFB] border-[#E6E6E6]' placeholder="Enter product color" />
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

export default VersesSetting