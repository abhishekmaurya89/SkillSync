import express from "express";
import { registerCompany, loginCompany, postJob, getCompanyData, getCompanyJobsApplicants, getCompanyPostedJobs, changeJobApplicationStatus, changeJobVisibility } from "../controllers/companyControllers.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";
const router = express.Router();   

router.post('/register',upload.single('Image'),registerCompany)
router.post('/login',loginCompany)
router.post('/post-job',protectCompany,postJob)
router.get('/companydata',protectCompany, getCompanyData);
router.get('/applicants',protectCompany, getCompanyJobsApplicants); 
router.get('/list-jobs',protectCompany, getCompanyPostedJobs);
router.post('/change-status',protectCompany, changeJobApplicationStatus);
router.post('/change-job-visibility',protectCompany, changeJobVisibility);

export default router;