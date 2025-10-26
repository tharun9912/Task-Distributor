import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  Phone: { type: String, required: true },
  Notes: { type: String },
});

const DistributedListSchema = new mongoose.Schema({
  agentName: { type: String, required: true },
  tasks: [TaskSchema],
});

export default mongoose.model("DistributedList", DistributedListSchema);
