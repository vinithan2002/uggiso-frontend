import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add JWT token automatically
axiosConfig.interceptors.request.use(
    (config) => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle unauthorized responses
axiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosConfig;