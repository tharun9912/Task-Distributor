import csv from "csvtojson";
import XLSX from "xlsx";
import DistributedList from "../models/tasks.js"; // Make sure this model file name matches exactly
import Agent from "../models/agents.js";


// ✅ Helper function to distribute tasks equally among 5 agents
const distributeItems = (items) => {
  const distributed = Array.from({ length: 5 }, () => []);
  items.forEach((item, index) => {
    const agentIndex = index % 5;
    distributed[agentIndex].push({
      FirstName: item.FirstName || item.Firstname || "",
      Phone: item.Phone || item.phone || "",
      Notes: item.Notes || item.notes || "",
    });
  });
  return distributed;
};

const getAgentsList = async () => {
      try {
            const agents = await Agent.find({},"name")
            const namesList= agents.map(agent => agent.name) 
            return namesList
      } catch (error) {
        console.log(error)
      }
}

// ✅ Upload and Distribute Controller
export const uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const ext = req.file.originalname.split(".").pop().toLowerCase();
    let records = [];

    // ✅ Handle CSV
    if (ext === "csv") {
      records = await csv().fromString(req.file.buffer.toString());
    }
    // ✅ Handle Excel files
    else if (ext === "xlsx" || ext === "xls") {
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      records = XLSX.utils.sheet_to_json(sheet);
    } else {
      return res.status(400).json({ message: "Invalid file type. Please upload a .csv, .xlsx, or .xls file." });
    }

    if (records.length === 0) {
      return res.status(400).json({ message: "No valid records found in file" });
    }

    // ✅ Distribute records among 5 agents
    const distributed = distributeItems(records);

    // ✅ Remove old data before inserting new
    await DistributedList.deleteMany({});

   const agentsList = await getAgentsList();

    const savedData = [];
    for (let i = 0; i < distributed.length; i++) {
      if (!agentsList[i]) continue;
      const newList = new DistributedList({
      agentName: agentsList[i],
      tasks: distributed[i],
      });
      await newList.save();
      savedData.push(newList);
    }

    res.status(200).json({
      message: "File uploaded and distributed successfully",
      agents: savedData,
    });
  } catch (err) {
    console.error("Error in uploadAndDistribute:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Fetch all Distributed Lists
export const getDistributedLists = async (req, res) => {
  try {
    const lists = await DistributedList.find();
    res.status(200).json({ agents: lists });
  } catch (err) {
    console.error("Error fetching distributed lists:", err);
    res.status(500).json({ message: err.message });
  }
};
