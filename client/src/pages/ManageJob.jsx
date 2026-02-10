import React from 'react'
import moment from 'moment'
import { useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext'; 

import axios from 'axios';
import { Loading } from '../components/Loading';
const ManageJob = () => {
  const navigate=useNavigate()
  const [jobs, setJobs] = useState(false);
  const {backendUrl,companyToken}=useContext(AppContext)
  //function to fetch jobs
 const fetchJobs = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/companies/list-jobs`, {
      headers: { token: companyToken },
    });

    console.log("API Response:", data);

    if (data.success && Array.isArray(data.jobs)) {
      setJobs([...data.jobs]);
    } else {
      toast.error(data.message || "No jobs found");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

//change jobs visibility
const changeJobVisibility=async(id)=>{
  try {
    const {data}=await axios.post(backendUrl+"/api/companies/change-job-visibility",{id},{
      headers:{token:companyToken}
    })
    if(data.success){
      toast.success(data.message)
      fetchJobs()
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
  useEffect(()=>{
    if(companyToken){
    fetchJobs()
    }
  },[companyToken])
  return jobs? jobs.length===0 ? (<div className='flex items-center justify-center h-[70vh]'> <p className='text-xl sm:text-2xl'>No job Posted</p> </div>) : (
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto '>
        <table className='min-w-full bg-white border-gray-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 border-b text-left'>Job Title</th>
              <th className='py-2 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 border-b text-center'>Applicants</th>
              <th className='py-2 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job,index)=>(
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td>
                  <input className='scale-125 ml-4' type="checkbox" onChange={()=>changeJobVisibility(job._id)} checked={job.visible} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>Add New Job</button>
      </div>
    </div>
  ) : <Loading/>
}

export default ManageJob;