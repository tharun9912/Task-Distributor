import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios"
import api from "../api.js";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
               const res = await api.post("/auth/login",{
                        email,
                        password,
                })
                // store jwt token in localstorage
                localStorage.setItem("token",res.data.token)
                // redirect to dashboard page
                navigate("/dashboard")
        } catch (err) {
            setError( err.response?.data?.message || "Login failed");
        }
    }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
               <button
                   type="submit"
                    className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
               >
                 Login
                </button>
             </form>

           {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
            Register
           </Link>
        </p>
      </div>
    </div>
  )
}

export default Login