import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";

import JobCard from "./JobCard";

function JobListing() {

  const { searchFilter, isSearched, setSearchFilter, jobs } =
    useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filteredJob, setFilteredJob] = useState(jobs);
  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handleLocationChange = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };
  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategory.length == 0 || selectedCategory.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocation.length == 0 || selectedLocation.includes(job.location);
    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJob = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJob(newFilteredJob);

    setPage(1);
  }, [jobs, selectedCategory, selectedLocation, searchFilter]);
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search Filter from Hero component */}
        {isSearched &&
        (searchFilter.title !== "" || searchFilter.location !== "") ? (
          <>
            <h3 className="font-medium text-lg mb-4">Current Search</h3>
            <div className="mb-4 text-gray-600">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                  {searchFilter.title}
                  <img
                    src={assets.cross_icon}
                    className="cursor-pointer"
                    alt=""
                    onClick={(e) =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-blue-200 px-4 py-1.5 rounded">
                  {searchFilter.location}
                  <img
                    src={assets.cross_icon}
                    className="cursor-pointer"
                    alt=""
                    onClick={(e) =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                  />
                </span>
              )}
            </div>
          </>
        ) : (
          ""
        )}
        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filter"}
        </button>
        {/* Search by category */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-l py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-3 ">
                <input
                  type="checkbox"
                  className="scale-125"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategory.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Search by locattion */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-l py-4 pt-14">Search by Location</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex items-center gap-3 ">
                <input
                  type="checkbox"
                  className="scale-125"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocation.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/**job listing */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <div className="mb-8">
          <h3 className="font-bold text-4xl text-gray-900" id="job-list">
            Latest Job Opportunities
          </h3>
          <p className="text-gray-600 font-medium mt-2">Discover amazing roles from top companies</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredJob.slice((page - 1) * 6, page * 6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/**pagination */}
        {filteredJob.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <button
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              aria-label="Previous page"
              className='hover:scale-110 transition-transform'
            >
              <img src={assets.left_arrow_icon} alt="Previous" />
            </button>
            {Array.from({ length: Math.ceil(filteredJob.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all ${
                      page === index + 1
                        ? "bg-blue-600 text-white shadow-md"
                        : "border border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}

            <button
              onClick={() =>
                setPage((prevPage) =>
                  Math.min(prevPage + 1, Math.ceil(filteredJob.length / 6))
                )
              }
              aria-label="Next page"
              className='hover:scale-110 transition-transform'
            >
              <img src={assets.right_arrow_icon} alt="Next" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default JobListing;
