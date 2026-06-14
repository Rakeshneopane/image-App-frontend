import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve();
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // queue the request until refresh is done
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => axiosInstance(originalRequest))
                  .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post("/auth/refresh");
                processQueue(null);
                return axiosInstance(originalRequest); // retry original request
            } catch (refreshError) {
                processQueue(refreshError);
                // refresh failed — redirect to login
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;