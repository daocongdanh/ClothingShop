import { get, post } from "../utils/request"

export const createFile = async (formData) => {
  const result = await post("files", formData);
  return result;
}

export const viewFile = async (data) => {
  await get(`files/${data}`);
}