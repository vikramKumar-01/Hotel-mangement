// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // cookies always sent
});

// (Optional) Useful logs while debugging
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);

export default axiosInstance;
