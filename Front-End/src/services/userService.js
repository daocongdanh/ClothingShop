import { post } from "../utils/request"

export const register = async (data) => {
  const result = await post(`users/register`, data);
  return result;
}

export const login = async (data) => {
  const result = await post(`users/login`, data);
  return result;
}