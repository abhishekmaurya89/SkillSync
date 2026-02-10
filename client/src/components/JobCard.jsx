import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {
       const navigate=useNavigate();
  return (
 
    <div className='border border-gray-200 bg-white p-6 shadow-md rounded-lg hover:shadow-lg hover:border-blue-200 transition-all duration-300'>
        <div className='flex justify-between items-start mb-4'>
            <img className='h-10 w-10 bg-gray-100 rounded-lg p-1' src={job.company.Image} alt="" />
            <span className='text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full'>New</span>
        </div>
        <h4 className='font-bold text-lg mt-2 text-gray-900 line-clamp-2'>{job.title}</h4>
        <div className='flex items-center gap-2 mt-3 text-xs flex-wrap'>
            <span className='bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-medium'>{job.location}</span>
            <span className='bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1 rounded-full font-medium'>{job.level}</span>
        </div>
        <p className='text-gray-600 text-sm mt-4 line-clamp-2' dangerouslySetInnerHTML={{__html:job.description.slice(0,100)}}></p>
        <div className='mt-5 flex gap-3 text-sm'>
            <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors'>Apply Now</button>
            <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className='flex-1 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 font-semibold transition-colors'>Details</button>
        </div>
    </div>
  )
}

export default JobCard