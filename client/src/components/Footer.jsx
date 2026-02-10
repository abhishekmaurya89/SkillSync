import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white mt-16 py-12'>
      <div className='container px-4 2xl:px-20 mx-auto'>
        <div className='grid md:grid-cols-4 gap-8 mb-8'>
          <div>
            <img width={140} className='mb-4' src={assets.logo} alt="" />
            <p className='text-gray-400 text-sm'>Your gateway to amazing career opportunities</p>
          </div>
          <div>
            <h4 className='font-bold mb-4 text-white'>For Job Seekers</h4>
            <ul className='space-y-2 text-gray-400 text-sm'>
              <li><a href='' className='hover:text-white transition-colors'>Browse Jobs</a></li>
              <li><a href='/applications' className='hover:text-white transition-colors'>My Applications</a></li>
            </ul>
            
          </div>
          <div>
            <h4 className='font-bold mb-4 text-white'>For Recruiters</h4>
            <ul className='space-y-2 text-gray-400 text-sm'>
              <li><a href='' className='hover:text-white transition-colors'>Post a Job</a></li>
              <li><a href='' className='hover:text-white transition-colors'>Manage Jobs</a></li>
            </ul>
          </div>
          <div>
            <h4 className='font-bold mb-4 text-white'>Follow Us</h4>
            <div className='flex gap-3'>
              <a href='' className='hover:text-blue-400 transition-colors'>
                <img width={28} src={assets.twitter_icon} alt="" />
              </a>
              <a href='' className='hover:text-pink-400 transition-colors'>
                <img width={28} src={assets.instagram_icon} alt="" />
              </a>
              <a href='' className='hover:text-blue-600 transition-colors'>
                <img width={28} src={assets.facebook_icon} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-700 pt-8'>
          <p className='text-center text-gray-400 text-sm'>© 2025 SkillSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
