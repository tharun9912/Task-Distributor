import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const allowed = ["csv", "xlsx", "xls"];

  // Handle file selection
  const handleFileChange = (e) => {
    setError("");
    setSuccessMessage("");

    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }

    const ext = selectedFile.name.split(".").pop().toLowerCase();
    if (!allowed.includes(ext)) {
      setError("Only CSV, XLSX, and XLS files are allowed.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // Handle form submit and upload file
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!file) {
      setError("Please select a valid file before uploading.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Directly call backend without external API file
      const response = await api.post(
        "/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("File uploaded and distributed successfully!");
      console.log("Distributed Data:", response.data.distributed);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Upload & Distribute File
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Uploading..." : "Upload & Distribute"}
        </button>
        
        <button className={`px-4 py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          } transition`} onClick = {()=> navigate("/dashboard")}> Return to Dashboard</button>
      </form>
    </div>
  );
};

export default UploadFile;
