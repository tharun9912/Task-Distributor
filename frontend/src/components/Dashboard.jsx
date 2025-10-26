import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(""); // Optional: if you want to show logged-in user
  const navigate = useNavigate();

  // Fetch distributed lists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("No token found. Please log in first.");
      return;
    }

    const fetchDistributedLists = async () => {
      try {
        const res = await axios.get("http://localhost:8000/files/distributed", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // res.data.agents should exist
        setAgents(res.data.agents || []);
        setMessage(res.data.message || "");
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Failed to fetch agents");
      }
    };

    fetchDistributedLists();
  }, []);

  // Navigate to upload page
  const handleUpload = () => navigate("/fileupload");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Navigate to add agent
  const addAgent = () => navigate("/addagent");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Buttons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md"
        >
          Upload File
        </button>
        <button
          onClick={addAgent}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md"
        >
          Add Agent
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Agents & Tasks */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {agents.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="border border-gray-300 rounded-xl p-4 w-72 bg-gray-50 shadow-sm hover:shadow-md transition-all"
              >
                <p className="font-semibold text-gray-800 text-lg mb-2">
                  {agent.agentName}
                </p>

                {agent.tasks?.length > 0 ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-2 max-h-48 overflow-y-auto">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Assigned Tasks:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {agent.tasks.map((task, i) => (
                        <li key={i} className="border-b border-gray-100 pb-1">
                          <p>
                            <span className="font-medium">Name:</span>{" "}
                            {task.FirstName}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span>{" "}
                            {task.Phone}
                          </p>
                          <p>
                            <span className="font-medium">Notes:</span>{" "}
                            {task.Notes}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No tasks assigned yet.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No distributed data yet.</p>
        )}
      </div>

      {message && (
        <p className="mt-4 text-red-500 text-center font-medium">{message}</p>
      )}
    </div>
  );
};

export default Dashboard;
