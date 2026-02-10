import React from 'react'
import { assets } from '../assets/assets'

export const AppDownload = () => {
  return (

        <div className='container px-4 2xl:px-20 mx-auto my-16'>
      <div className='relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-12 sm:p-16 lg:p-24 rounded-2xl border border-purple-100 shadow-lg overflow-hidden'>
                <div className='relative z-10 flex flex-col items-center text-center'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 max-w-xl text-gray-900'>Download Our Mobile App</h1>
                <p className='text-gray-700 font-medium mb-8 max-w-md'>Get instant job notifications and apply on the go</p>
                <div className='flex gap-4 flex-wrap justify-center'>
                    <a href='#' className='inline-block hover:scale-105 transition-transform'>
                        <img src={assets.app_store} alt="" className='h-14' />
                    </a>
                    <a href='#' className='inline-block hover:scale-105 transition-transform'>
                        <img src={assets.play_store} alt="" className='h-14' />
                    </a>
                </div>
            </div>
           </div>
    </div>
  )
}
