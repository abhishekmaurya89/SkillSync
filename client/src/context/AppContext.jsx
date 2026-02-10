import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplication,setUserApplication]=useState(null);
  // You had useApplication but it wasn't used, removed it for now.

  // showJob function was setting jobs state without argument, probably unnecessary.
  // Removed showJob or fixed it to something meaningful:
  // But since it's called once without effect, I'll remove it.

  // Fetch company data with companyToken in headers
  const fetchCompanyData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/companies/companydata`, {
        headers: {
          token: companyToken,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Error fetching company data");
    }
  };

  // Fetch user data with auth token
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      console.log("Clerk token:", token); // Debug log to check token value
      const { data } = await axios.get(backendUrl+'/api/users/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        console.log("User data fetched:", data.user); // Debug log to check user data
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  // Fetch jobs list from backend
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Error fetching jobs");
    }
  };
  //function to get user applied jobs
  const fetchUserApplication=async()=>{
    try {
      const token = await getToken();
      const {data}=await axios.get(backendUrl+"/api/users/applications",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(data.success){
        setUserApplication(data.applications)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if(user){
      fetchUserData();
      fetchUserApplication();
    }
  }, [user]);
  useEffect(() => {
    fetchJobs();
  }, []);
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    const token = localStorage.getItem("companyToken");
    if (token) {
      setCompanyToken(token);
    }
  }, []);

  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    userData,
    setUserData,
    userApplication,setUserApplication,
    fetchUserData,
    fetchUserApplication,
    fetchJobs,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
