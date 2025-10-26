import axios from "axios";

// Use the environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default api;
