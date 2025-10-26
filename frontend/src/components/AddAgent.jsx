import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddAgent = () => {

    const [agent, setAgent] = useState({
                    name: "",
                    email: "",
                    mobile: "",
                    password: "",
                });
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);
    const navigate =  useNavigate()

     const handleChange = (e) => {
          setAgent({ ...agent, [e.target.name]: e.target.value });
          setMessage({ type: "", text: "" }); // Clear messages on typing
         };

     const handleSubmit = async (e) => {
        e.preventDefault()
       
       // email validation
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(agent.email)) {
            setMessage({ type: "error", text: "❌ Please enter a valid email address." });
          return;
        }

        // Mobile validation
      if (!/^\d{10}$/.test(agent.mobile)) {
          setMessage({ type: "error", text: "📱 Mobile number must be 10 digits." });
          return;
         }

       // Password validation
    if (agent.password.length < 8) {
       setMessage({
        type: "error",
        text: "🔒 Password must be at least 6 characters long.",
       });
       return;
     }

     setLoading(true)

     try {
        const response  = await axios.post("http://localhost:8000/api/agents",agent) 
        const data = await response.json()
        if(!response.ok)
        {
           // Display error returned from backend
           setMessage({ type: "error", text: data.message || "Failed to add agent." });
        }
        else
        {
          // Success
          setMessage({ type: "success", text: "✅ Agent added successfully!" });
          setAgent({ name: "", email: "", mobile: "", password: "" });
        }
     } catch (error) {
        setMessage({ type: "error", text: "⚠️ Network error. Try again later." });
     }finally {
      setLoading(false)
      navigate("/dashboard")
    }
         
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Add New Agent
          </h2>

        {/* Message Box */}
          {message.text && (
            <div
                 className={`mb-4 text-center py-2 px-3 rounded-md ${
                 message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
                 }`}
            >
               {message.text}
            </div>
          )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={agent.name}
              onChange={handleChange}
              placeholder="Enter agent name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={agent.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile Number (with country code)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 text-gray-600 rounded-l-lg">
                +91
              </span>
              <input
                type="tel"
                name="mobile"
                value={agent.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
                className="w-full border border-gray-300 rounded-r-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={agent.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Adding..." : "Add Agent"}
          </button>
        </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Need to go back?{" "}
            <Link to="/dashboard">Return to Dashboard</Link>
          </p>
      </div>
    </div>
  )
}

export default AddAgent