import { get, post, put, del } from "../utils/request"

export const register = async (data) => {
  const result = await post(`users/register`, data);
  return result;
}

export const login = async (data) => {
  const result = await post(`users/login`, data);
  return result;
}

export const refreshToken = async (data) => {
  const result = await post(`users/refreshToken`, data);
  return result;
}

export const logout = async () => {
  const result = await post(`users/logout`);
  return result;
}

export const getMyInfo = async () => {
  const result = await get("users/my-info");
  return result;
}

export const updateMyInfo = async(data) => {
  const result = await put("users/update-my-info", data);
  return result;
}

export const addNewAddressByMyInfo = async(data) => {
  const result = await post("users/add-new-address-by-user", data);
  return result;
}

export const deleteAddressByMyInfo = async (id) => {
  const result = await del(`users/delete-address-by-user/${id}`);
  return result;
}

export const updateAddressByMyInfo = async (id, data) => {
  const result = await put(`users/update-address-by-user/${id}`, data);
  return result;
}