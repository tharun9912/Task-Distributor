import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import Agent from "../models/agents.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const authRouter =  express.Router()
authRouter.post("/register",async (req,res) => {
    try {
        const {email,password} = req.body;
        // check if user already exists
        const existingUser  =  await User.findOne({email})
       if(existingUser)
        {
          return res.status(400).json({message:"User already exists"})
        }
    // hash password
     const hashedPassword = await bcrypt.hash(password,10)
    //save the new user
     const newUser = new User({email,password:hashedPassword})
     await newUser.save()
     res.status(201).json({message:"user registered successfully"})
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
})

authRouter.post("/login", async (req,res) => {
    try {
        const {email,password} = req.body;
        // check  if user exists 
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({message:" User not found"})
        }
        //compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(400).json({message:"Invlaid credentials"})
        }
        //create jwt token
        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{
            expiresIn:"1h",
        });
        res.status(200).json({message:"Login successfully",token})
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})   
    }
})

authRouter.get("/dashboard",authMiddleware, async (req,res) => {
    try {
            const agents = await Agent.find()
            res.json({
                        message:"Welcome to Dashboard",
                        agents:agents,
                        user:req.user
                    });
    } catch (error) {
        console.error("Error fetchig agents",error)
        res.status(500).json({message:"Server error",error:error.message})
    }
})

export default authRouter