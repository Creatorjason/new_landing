import React from 'react'
import Image from 'next/image'
import { SearchNormal1 } from 'iconsax-react'

const OtherVerses = () => {
  const verses = Array(9).fill({
    title: "The Pinnacle at Eden Park Oakwood Village",
    bedrooms: 3,
    category: "Apartment",
    date: "15 Nov, 2024",
    author: "Jason Charles"
  })

  return (
    <div className="">
      <div className="flex mb-4">
        <div className="mr-2 p-3 flex-1 flex items-center gap-x-2 border rounded-md bg-transparent outline-none focus:bg-gray-50">
          <SearchNormal1 className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search Verses"
            className="w-full bg-transparent outline-none"
          />
        </div>
        <button className="bg-[#141f1f] text-white px-6 py-2 rounded-md">Search</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {verses.map((verse, index) => (
          <div key={index} className="rounded-md">
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image
                src="/room.png"
                alt="Verse thumbnail"
                layout="fill"
                objectFit="cover"
              />
              <span className="absolute top-2 left-2 bg-[#141f1f]/70 text-white px-3 py-1 text-xs rounded-full">
                Active
              </span>
            </div>
            <div className="py-4">
              <div className="flex items-center mb-2">
                <Image src={"/author.png"} width={18} height={18} loading='lazy' alt='Author' className='rounded-full mr-1' />
                <span className="mr-2 text-sm font-medium">{verse.bedrooms} Bedroom Flat</span>
                <span className="mr-2 text-xs"> - {verse.category}</span>
              </div>
              <h3 className="font-semibold mb-2">{verse.title}</h3>
              <div className="flex items-center text-sm text-gray-500 gap-x-2">
                <div className='flex items-center gap-x-1'>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_619_12375)">
                      <circle cx="9" cy="9" r="7.5" stroke="#0F0F0F" strokeWidth="1.5"/>
                      <path d="M10.125 9C10.125 9.62132 9.62132 10.125 9 10.125C8.37868 10.125 7.875 9.62132 7.875 9C7.875 8.37868 8.37868 7.875 9 7.875C9.62132 7.875 10.125 8.37868 10.125 9Z" stroke="#0F0F0F" strokeWidth="1.5"/>
                      <path d="M9 7.875V4.5" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_619_12375">
                      <rect width="18" height="18" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                  <span className="mr-2">{verse.date}</span>
                </div>
                <div className='flex items-center gap-x-1'>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="7.5" cy="10.9375" rx="4.375" ry="2.1875" stroke="#0F0F0F" strokeWidth="1.5" strokeLinejoin="round"/>
                    <circle cx="7.5" cy="4.375" r="2.5" stroke="#0F0F0F" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  <span>{verse.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OtherVerses