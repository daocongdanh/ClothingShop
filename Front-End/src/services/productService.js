import { get } from "../utils/request";

export const filterProduct = async (filter) => {
  const result = await get(`products?${filter}`);
  return result;
}

export const getProductBySlug = async (slug) => {
  const result = await get(`products/${slug}`);
  return result;
}

export const getAllProductsNew = async () => {
  const result = await get(`products/new`);
  return result;
}

export const getTop5Product = async (slug) => {
  const result = await get(`products/top5/${slug}`);
  return result;
}

export const getAllProducts = async () => {
  const result = await get(`products/all`);
  return result;
}