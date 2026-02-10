import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Navbar() {
   const {openSignIn}=useClerk()
   const {user}=useUser();
   const navigate=useNavigate();
   const{setShowRecruiterLogin}=useContext(AppContext)
  return (
    <div className='bg-white border-b border-gray-200 shadow-sm py-4 sticky top-0 z-50'>
        <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
            <img onClick={()=>navigate('/')} className='cursor-pointer w-32 sm:w-40 hover:opacity-80 transition-opacity' src={assets.logo}/>
            {
              user?
              <div className='flex items-center gap-6'>
                <Link to={'/applications'} className='text-gray-700 font-medium hover:text-blue-600 transition-colors'>Applied Jobs</Link>
                <p className='text-gray-300'>|</p>
                <p className='max-sm:hidden text-gray-700 font-medium'>Hi, {user.firstName}</p>
                <UserButton/>
              </div>
              :<div className='flex gap-3 sm:gap-4 max-sm:text-sm'>
            <button onClick={()=>{ window.scrollTo(0, 0); setShowRecruiterLogin(true); }} className='text-gray-700 font-medium hover:text-blue-600 transition-colors'>Recruiter Login</button>
            <button onClick={e =>openSignIn()} className='bg-blue-600 text-white px-6 sm:px-8 py-2 rounded-full hover:bg-blue-700 font-medium transition-colors'>Sign In</button>
        </div>
            }
        
        </div>
    </div>
  )
}

export default Navbar