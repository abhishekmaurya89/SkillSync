import "./config/instrument.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import companyRoutes from "./routes/companyRoutes.js";

import cors from "cors";
import * as Sentry from "@sentry/node";
import { clerkMiddleware } from '@clerk/express'
import connectDb from "./db.js";
import { clerkWebhook } from "./controllers/webHook.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoute from './routes/jobRoutes.js'
import userRoute from './routes/userRoutes.js'
const app = express();

// Connect to MongoDB
await connectDb();
await connectCloudinary();

// Capture raw body for webhooks BEFORE express.json()
app.use(
  "/webhooks",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // Store raw body for svix
    },
  })
);

// For other routes, normal JSON parsing
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.get("/", (req, res) => res.send("API Working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Webhook endpoint (needs raw body)
app.post("/webhooks", clerkWebhook);

app.use("/api/companies",companyRoutes);
app.use("/api/jobs",jobRoute);
 app.use("/api/users",userRoute);
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
