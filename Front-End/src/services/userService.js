import { get, post, put, del } from "../utils/request"

export const register = async (data) => {
  const response = await post(`users/register`, data);
  return response;
}

export const login = async (data) => {
  const response = await post(`users/login`, data);
  return response;
}

export const refreshToken = async (data) => {
  const response = await post(`users/refreshToken`, data);
  return response;
}

export const logout = async () => {
  const response = await post(`users/logout`);
  return response;
}

export const getMyInfo = async () => {
  const response = await get("users/my-info");
  return response;
}

export const updateMyInfo = async(data) => {
  const response = await put("users/update-my-info", data);
  return response;
}

export const addNewAddressByMyInfo = async(data) => {
  const response = await post("users/add-new-address-by-user", data);
  return response;
}

export const deleteAddressByMyInfo = async (id) => {
  const response = await del(`users/delete-address-by-user/${id}`);
  return response;
}

export const updateAddressByMyInfo = async (id, data) => {
  const response = await put(`users/update-address-by-user/${id}`, data);
  return response;
}