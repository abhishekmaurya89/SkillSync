import React from 'react'

export const Loading = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50'>
      <div className='relative w-24 h-24 mb-6'>
        <div className='absolute inset-0 border-4 border-blue-100 rounded-full'></div>
        <div className='absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-400 rounded-full animate-spin'></div>
      </div>
      <p className='text-gray-700 font-semibold'>Loading jobs...</p>
    </div>
  )
}
