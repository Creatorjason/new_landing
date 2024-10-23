import React, { useState } from 'react'
import Image from 'next/image'
import { SearchNormal1, AddCircle, TickCircle } from 'iconsax-react'
import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const fetchVerses = async () => {
  const response = await axios.get(`https://api.granularx.com/verse/`)
  return response.data.data
}

const OtherVerses = ({ session }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [addedVerses, setAddedVerses] = useState(new Set())

  const { data: verses, isLoading, isError, refetch } = useQuery({
    queryKey: ['verses'],
    queryFn: fetchVerses,
    enabled: !!session
  })

  const addToPlugList = useMutation({
    mutationFn: (verseName) => 
      axios.post(`https://api.granularx.com/verse/add/${session.user.username}/${verseName}`),
    onSuccess: (data, variables) => {
      setAddedVerses(prev => new Set(prev).add(variables))
      toast.success(`${variables} added to your plug list!`)
    },
    onError: (error) => {
      toast.error('Failed to add verse to plug list. Please try again.')
    }
  })

  const filteredVerses = verses?.filter(verse => 
    verse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verse.uns.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>An error occurred while fetching verses</div>

  return (
    <div className="">
      <div className="flex mb-4">
        <div className="mr-2 p-3 flex-1 flex items-center gap-x-2 border rounded-md bg-transparent outline-none focus:bg-gray-50">
          <SearchNormal1 className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search Verses"
            className="w-full text-sm bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-[#141f1f] text-white px-6 py-2 text-sm rounded-md" onClick={() => refetch()}>Search</button>
      </div>
      {filteredVerses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">No verses found</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">We couldn&apos;t find any verses matching your search. Try different keywords or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredVerses.map((verse) => (
            <div key={verse.id} className="rounded-md relative">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={verse.verse_header.header_banner_url}
                  alt="Verse thumbnail"
                  layout="fill"
                  objectFit="cover"
                />
                <button 
                  className="absolute top-2 right-2 shadow-md"
                  onClick={() => addToPlugList.mutate(verse.name)}
                  disabled={addedVerses.has(verse.name)}
                >
                  {addedVerses.has(verse.name) 
                    ? <TickCircle size="32" className="text-green-400" variant='Bold' /> 
                    : <AddCircle size="32" className="text-[#141f1f]" variant='Bold' />
                  }
                </button>
              </div>
              <div className="py-4">
                <div className="flex items-center mb-2">
                  <Image src={"/author.png"} width={18} height={18} loading='lazy' alt='Author' className='rounded-full mr-1' />
                  <span className="mr-2 text-sm font-medium">{verse.sector}</span>
                  <span className="mr-2 text-xs"> - {verse.type || 'N/A'}</span>
                </div>
                <h3 className="font-semibold mb-2">{verse.name}</h3>
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
                    <span className="mr-2">{verse.verse_header.cta_title}</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="7.5" cy="10.9375" rx="4.375" ry="2.1875" stroke="#0F0F0F" strokeWidth="1.5" strokeLinejoin="round"/>
                      <circle cx="7.5" cy="4.375" r="2.5" stroke="#0F0F0F" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    <span>{verse.uns}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OtherVerses
