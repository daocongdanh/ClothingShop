import { get, postFormData } from "../utils/request"

export const createFile = async (formData) => {
  const result = await postFormData("files", formData);
  return result;
}

export const viewFile = async (data) => {
  await get(`files/${data}`);
}