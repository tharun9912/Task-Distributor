import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../api.js";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        // email regex validation 
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const handleRegister = async (e) =>{
            e.preventDefault();

            // validate email format
            if (!validateEmail(email)) 
               {
                  setMessage("Please enter a valid email address");
                  return;
               }

            // Check if passwords match
            if (password !== confirmPassword)
               {
                  setMessage("Passwords do not match");
                  return;
               }
            try {
                const res = await api.post("/auth/register",{
                    email, // using email as username
                    password,
                });
                setMessage(res.data.message)
                navigate("/login")
            } catch (error) {
                setMessage(error.response?.data?.message || "Registration Failed");
            }
    }
 
    return (
     
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
           <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Register
            </button>
        </form>

           {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
          
          <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
             <Link to="/login" className="text-blue-500 hover:underline">
                 Login
             </Link>
          </p>
        </div>
    </div>
  )
}

export default Register