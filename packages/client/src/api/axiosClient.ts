import axios from "axios";

// Create axios instance
const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token automatically
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global error handling
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error.response?.data || error.message);
    }
);

export default axiosClient;
