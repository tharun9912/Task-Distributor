import express from "express";
import Agent from "../models/agents.js";
import bcrypt from "bcryptjs";

const agentRouter = express.Router();

// POST /api/agents - Add new agent
agentRouter.post("/agents", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;


    // Debugging line (optional)
    console.log("Incoming Agent Data:", req.body);

    // Validate input
    if (!name || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ type: "error", message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await Agent.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ type: "error", message: "Agent with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new agent
    const newAgent = new Agent({
      name,
      email,
      mobile,
      password:hashedPassword,
    });

    await newAgent.save();

    // Success response
    return res
      .status(201)
      .json({ type: "success", message: "✅ Agent added successfully!" });
  } catch (error) {
    console.error("Error adding agent:", error);
    return res.status(500).json({
      type: "error",
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
});

export default agentRouter;
