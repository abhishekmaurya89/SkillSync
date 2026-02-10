import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import { Footer } from "../components/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
export const Applications = () => {
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const user=useUser();
  const { backendUrl, userData, userApplication, fetchUserData,fetchUserApplication } =
    useContext(AppContext);

  const upDateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        await fetchUserData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating resume");
    }
    setIsEdit(false);
    setResume(null);
  }
  useEffect(() => {
    if (user) {
      fetchUserApplication();
    }
  }, [user]);
  
  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {" "}
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label className="flex items-center" htmlFor="resume-upload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resume-upload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={upDateResume}
                className="bg-green-100 bordeer border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2 ">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href={userData?.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>

              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Job Applied</h2>
        <table className="min-w-full border rounded-lg bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">company</th>
              <th className="py-3 px-4 border-b text-left">job title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                location
              </th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                date
              </th>
              <th className="py-3 px-4 border-b text-left">status</th>
            </tr>
          </thead>
          <tbody>
            {userApplication.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    <img
                      className="w-8 h-8"
                      src={job.company.Image}
                      alt={job.company.name}
                    />
                    {job.company.name}
                  </td> 
                  <td className="py-2 px-4 border-b">{job.jobId.title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {job.jobId.location}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};
