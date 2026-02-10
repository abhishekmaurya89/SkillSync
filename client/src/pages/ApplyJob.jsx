import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import kconvert from "k-convert";
import { AppContext } from "../context/AppContext";
import { Loading } from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import JobCard from "../components/JobCard";
import { Footer } from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
export const ApplyJob = () => {
  const { id } = useParams();
  const {getToken}=useAuth();
  const navigate=useNavigate();
  const [jobData, setJobData] = useState(null);
  const [isalreadyApplied,setIsAlreadyApplied]=useState(false);
  const { jobs, backendUrl,userData, userApplication,fetchUserApplication } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching job details");
    }
  };

  const appLyHandler=async()=>{
    try {
      if(!userData){
        return toast.error("Please login to apply")
      }
      if(!userData.resume){
        navigate("/applications")
        return toast.error("Please upload your resume to apply")
      }
      const token=await getToken();
      const {data}=await axios.post(backendUrl+"/api/users/apply",{jobId:jobData._id},{
        headers:{
        Authorization : `Bearer ${token}`,}});
      if(data.success){
        toast.success(data.message);
        fetchUserApplication();
      }
      else{
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  const checkAlreadyApplied=()=>{
    const alreadyApplied=userApplication.some((application)=>
      application.jobId._id===jobData._id
    );
    setIsAlreadyApplied(alreadyApplied);
  }
  useEffect(() => {
    if(jobData && userApplication){
      checkAlreadyApplied();
    }
  }, [jobData,userApplication]);
  useEffect(() => {
    fetchJob();
  }, [id]);

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full ">
          {/* Job header */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={jobData?.company?.Image}
                alt={jobData?.company?.name || "Company Logo"}
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl s:text-4xl font-medium">
                  {jobData.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData?.company?.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {jobData.salary ? kconvert.convertTo(jobData.salary) : "Not disclosed"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button onClick={appLyHandler} className="bg-blue-600 p-2.5 px-10 text-white rounded">
                {isalreadyApplied?"Already Aplied":"Apply Now"}
              </button>
              <p className="mt-1 text-gray-600">
                posted: {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Job content */}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>
              <button onClick={appLyHandler} className="mt-10 bg-blue-600 p-2.5 px-10 text-white rounded">
                {isalreadyApplied?"Already Aplied":"Apply Now"}
              </button>
            </div>

            {/* Related jobs */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2>More Jobs from {jobData?.company?.name}</h2>
              <div className="space-y-4">
                {jobs
                  .filter(
                    (job) =>
                      job._id !== jobData._id &&
                      job.company?._id === jobData?.company?._id
                  )
                  .filter((job)=>{
                    // Filter out jobs that the user has already applied to
                    if(!userApplication){
                      return true;
                    }
                    return !userApplication.some((application)=>
                      application.jobId._id===job._id
                    );
                  })
                  .slice(0, 4)
                  .map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};
