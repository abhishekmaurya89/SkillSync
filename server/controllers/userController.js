import jobApplication from "../models/jobApplicationMode.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/Job.js";
export const getUserData = async (req, res) => {
  try {
    const auth = req.auth();
    if (!auth) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const userId = auth.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    console.log(user);
    
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const applyForJob=async(req,res)=>{
    const userId=req.auth.userId
    const {jobId}=req.body
    try {
        const alreadyApplied=await jobApplication.find({userId,jobId})
        if(alreadyApplied.length>0){
            return res.json({success:false,message:"already applied"})
        }
        const JobsData= await Job.findById(jobId)
        if(!JobsData){
            return res.json({success:false,message:"Job not found"})
        }
        const newApplication=new jobApplication({
            userId,
            company:JobsData.company,
            jobId,
            date:Date.now()
        })
        await newApplication.save()
        res.json({success:true,message:"applied successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}
export const getUserJobApplication=async(req,res)=>{
    try {
        const userId=req.auth.userId
        const applications=await jobApplication.find({userId})
        .populate("jobId","title description location category level salary").populate("company","name email Image")
        .exec()
        if(!applications){
            return res.json({success:false,message:"No applications found"})
        }

        res.json({success:true,applications})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
export const updateUserResume = async (req, res) => {
  try {
    const auth = req.auth();
    if (!auth) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const userId = auth.userId;
    const resumeFile = req.file;
    console.log("Auth object:", auth);
console.log("UserId received:", auth.userId);

    const userData = await User.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    if (resumeFile) {
      const resumeUrl = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUrl.secure_url;
    }

    await userData.save();

    res.json({
      success: true,
      message: "Resume updated successfully",
      resume: userData.resume
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

