import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhook = async (req, res) => {
  try {
    // Initialize Svix Webhook with your Clerk secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook using the raw body and required headers
    whook.verify(req.rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Extract data from Clerk webhook payload
    const { data, type } = req.body;

    switch (type) {
      case "user.created":
        await User.create({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          Image: data.Image_url,
          resume: "",
        });
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          Image: data.Image_url,
        });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log(`Unhandled webhook event type: ${type}`);
        break;
    }

    // Send 200 so Clerk knows webhook was processed
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    // 400 means Clerk will retry the webhook later
    res.status(400).json({ success: false, message: "Invalid webhook" });
  }
};
