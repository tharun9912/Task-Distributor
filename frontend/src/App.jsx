import { useState } from 'react'
import Register from './components/Register'
import Login from "./components/Login"
import Dashboard from './components/Dashboard';
import UploadFile from './components/UploadFile';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import AddAgent from './components/AddAgent';

function App() {

  const token = localStorage.getItem("token")
  
  return (
    <>
      <BrowserRouter>
          <Routes>
             <Route  path="/" element={<Register/>}/> 
             <Route path="/login" element={<Login/>}/> 
             <Route path="/dashboard" element={<Dashboard/>}/>
             <Route path="/fileupload" element={<UploadFile/>} />
             <Route path="/addagent" element ={<AddAgent/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
