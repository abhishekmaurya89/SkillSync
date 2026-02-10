import Job from "../models/Job.js"
export const getJobs = async (req, res) => {
  try {
      const jobs = await Job.find().populate("company", "name Image").sort({ date: -1 });


    res.json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server error" });
  }
};
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate("company", "name Image");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, job }); 
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
