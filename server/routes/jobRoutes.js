import express from "express";
import { getJobById, getJobs } from "../controllers/jobController.js";

const router = express.Router();

// Fetch all jobs
router.get('/', getJobs);

// Fetch a single job by ID
router.get('/:id',getJobById);

export default router;
