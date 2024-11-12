import { get } from "../utils/request";

export const filterProduct = async (filter) => {
  const result = await get(`products?${filter}`);
  return result;
}

export const getProductBySlug = async (slug) => {
  const result = await get(`products/${slug}`);
  return result;
}