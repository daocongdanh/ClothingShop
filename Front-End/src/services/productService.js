import { get } from "../utils/request";

export const filterProduct = async (filter) => {
  const result = await get(`products?${filter}`);
  return result;
}