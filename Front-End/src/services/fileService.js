import { get, post } from "../utils/request"

export const createFile = async (formData) => {
  const response = await post("files", formData);
  return response;
}

export const viewFile = async (data) => {
  await get(`files/${data}`);
}