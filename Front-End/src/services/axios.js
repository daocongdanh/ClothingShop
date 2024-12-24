import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'sonner';
const BASEURL = "http://localhost:8080/api/v1/";

export const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status >= 400 && status < 600) {
        toast.error(error.response.data.message, {duration: 1500});
      }
      
    } else if (error.request) {
      toast.error("No response from server. Please try again.");
    } else {
      toast.error("Unexpected error: " + error.message);
    }

    return Promise.reject(error);
  }
);
