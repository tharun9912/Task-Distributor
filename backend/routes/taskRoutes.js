import express from "express";
import multer from "multer";
import { uploadAndDistribute, getDistributedLists } from "../controllers/taskController.js";

const taskRouter = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /csv|xlsx|xls/;
    const ext = file.originalname.split(".").pop().toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only .csv, .xlsx, .xls files are allowed"));
  },
});

// Routes
taskRouter.post("/upload", upload.single("file"), uploadAndDistribute);
taskRouter.get("/distributed", getDistributedLists);

export default taskRouter;
  