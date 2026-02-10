import bcrypt from "bcrypt";
import Company from "../models/Company.js";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplicationMode.js"; 

// REGISTER COMPANY
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const ImageFile = req.file; // multer file

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Name, email, and password are required" });
  }

  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.json({ success: false, message: "Company already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let ImageUrl = "";
    if (ImageFile) {
      const uploadedImage = await cloudinary.uploader.upload(ImageFile.path);
      ImageUrl = uploadedImage.secure_url;
    }

    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
      Image: ImageUrl,
    });

    await newCompany.save();

    return res.json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: newCompany._id,
        name: newCompany.name,
        email: newCompany.email,
        Image: newCompany.Image,
      },
      token: generateToken(newCompany._id),
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};

// LOGIN COMPANY
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and password are required" });
  }

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    return res.json({
      success: true,
      message: "Login successful",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        Image: company.Image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Error logging in company:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};

// POST JOB
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  if (!title || !description || !location || !salary) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const company = req.company._id;

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      level,
      category,
      company: company,
      date: Date.now(),
    });

    await newJob.save();
    return res.json({ success: true, message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};

// GET COMPANY DATA
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET COMPANY'S JOBS
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const company = req.company._id;
    const jobs = await Job.find({ company: company });
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({ success: true, jobs: jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// GET COMPANY JOBS WITH APPLICANTS (if your Job schema has applicants)
export const getCompanyJobsApplicants = async (req, res) => {
  try {
    const company = req.company._id;
    const jobs = await JobApplication.find({company}).populate("userId",'name Image resume')
    .populate('jobId','title location category level salary')
    .exec()
    res.json({ success: true, jobs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// CHANGE JOB VISIBILITY
export const changeJobVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const company = req.company._id;
    const job = await Job.findById(id);

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    if (job.company.toString() !== company.toString()) {
      return res.json({ success: false, message: "You are not authorized to change this job visibility" });
    }

    job.visible = !job.visible;
    await job.save();
    return res.json({ success: true, message: "Job visibility changed successfully", job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// CHANGE JOB APPLICATION STATUS (implement as per your schema)
export const changeJobApplicationStatus = async (req, res) => {
  const{id,status}=req.body
  try{
    await JobApplication.findByIdAndUpdate({_id:id},{status});
  res.json({success:true,message:"Status updated successfully"})
  }
  catch(error){
    res.json({ success: false, message: error.message });
  }
};
