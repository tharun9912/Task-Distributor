import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import authRouter from "./routes/authRoutes.js"
import agentRouter from "./routes/agentRoutes.js"
import taskRouter from "./routes/taskRoutes.js"


// load environment varaibles from .env  file
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/auth",authRouter)
app.use("/api",agentRouter)
app.use("/files",taskRouter)

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log(" MongoDB connected successully"))
.catch((err) => console.error("MongoDB connection error:",err) )

app.listen(process.env.PORT,() => { console.log(`server running on port 8000 `)})