import { axiosInstance } from "../services/axios";


export const get = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const post = async (url, data) => {
  const config = {
    headers: {
      "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
    },
  };
  const response = await axiosInstance.post(url, data, config);
  return response.data;
};

export const patch = async (url, data) => {
  const response = await axiosInstance.patch(url, data);
  return response.data;
};

export const put = async (url, data) => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

export const del = async (url) => {
  const response = await axiosInstance.delete(url);
  return response.data;
};
