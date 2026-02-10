import React, { use } from "react";
import { data, NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useEffect } from "react";
const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);
  //logout function
  const logout = () => {
    localStorage.removeItem("companyToken");  
    setCompanyToken(null);
    setCompanyData(null);
    navigate("/");
  }
  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-job");
    }
  }, [companyData]);

  return (
    <div className="min-h-screen">
      {/* Navbar for Recruiter Panel */}
      <div className="shadow py-2 border-b">
        <div className="px-4 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="max-sm:w-24 w-28 cursor-pointer hover:opacity-80 transition-opacity"
            src={assets.logo}
            alt="Logo"
          />
          {companyData && (
            <div className="flex items-center gap-2">
              <p className="max-sm:hidden text-sm text-gray-700">Welcome, {companyData.name}</p>

              <div className="relative group">
                <img
                  className="w-7 h-7 border rounded-full cursor-pointer"
                  src={companyData.Image}
                  alt="Company Icon"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-xs hover:shadow-lg cursor-pointer">
                    <li onClick={logout} className="px-2 py-1 hover:bg-gray-100 rounded">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left sidebar */}
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img
                className="min-w-4"
                src={assets.add_icon}
                alt="Add Job Icon"
              />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              to="/dashboard/manage-job"
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img
                className="min-w-4"
                src={assets.home_icon}
                alt="Manage Job Icon"
              />
              <p className="max-sm:hidden">Manage Job</p>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img
                className="min-w-4"
                src={assets.person_tick_icon}
                alt="View Applications Icon"
              />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
