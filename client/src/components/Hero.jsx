import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

function Hero() {
    const {setSearchFilter,setIsSearched}=useContext(AppContext);
    const titleRef=useRef();
    const locationRef=useRef();
    const onsearch=()=>{
        setSearchFilter({
            title:titleRef.current.value,
             location:locationRef.current.value,
        })
        setIsSearched(true);
    }
  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-blue-600 to-purple-800 text-white py-20 px-6 mx-2 rounded-2xl shadow-xl'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight'>
          Over 10,000+ Jobs Waiting
        </h2>
        <p className='mb-10 max-w-2xl mx-auto text-base font-light text-purple-100'>
          Find your dream job from leading companies. Start your career journey today!
        </p>

        <div className='flex flex-col md:flex-row items-center justify-center gap-3 max-w-3xl mx-auto px-2'>
          <div className='flex items-center bg-white rounded-lg px-4 py-3 flex-grow w-full md:w-auto hover:shadow-lg transition-shadow'>
            <img src={assets.search_icon} alt="Search Icon" className='w-5 h-5 mr-3' />
            <input
              type='text'
              placeholder='Job title or keyword'
              className='w-full text-gray-700 outline-none text-sm font-medium bg-transparent'
              aria-label='Search for job'
              ref={titleRef}
            />
          </div>

          <div className='flex items-center bg-white rounded-lg px-4 py-3 flex-grow w-full md:w-auto hover:shadow-lg transition-shadow'>
            <img src={assets.location_icon} alt="Location Icon" className='w-5 h-5 mr-3' />
            <input
              type='text'
              placeholder='City or country'
              className='w-full text-gray-700 outline-none text-sm font-medium bg-transparent'
              aria-label='Location'
              ref={locationRef}
            />
          </div>

          <button onClick={onsearch} className='bg-white text-indigo-600 px-8 py-3 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-md hover:shadow-lg transition-all w-full md:w-auto'>
            Search Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
