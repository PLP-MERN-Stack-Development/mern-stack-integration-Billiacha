import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
  withCredentials: true, // Include cookies if needed
});

export default API;
