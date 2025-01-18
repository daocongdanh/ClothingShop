import { get, post, del, put } from "../utils/request";

export const filterProduct = async (filter) => {
  const response = await get(`products?${filter}`);
  return response;
}

export const getProductBySlug = async (slug) => {
  const response = await get(`products/slug/${slug}`);
  return response;
}

export const getAllProductsNew = async () => {
  const response = await get(`products/new`);
  return response;
}

export const getTop5Product = async (slug) => {
  const response = await get(`products/top5/${slug}`);
  return response;
}

export const getAllProducts = async () => {
  const response = await get(`products/all`);
  return response;
}

export const createProduct = async (data) => {
  const response = await post("products", data);
  return response;
}

export const getProductById = async (id) => {
  const response = await get(`products/${id}`);
  return response;
}

export const deleteImageProduct = async (id, image) => {
  const response = await del(`products/${id}/image?image=${image}`);
  return response;
}

export const addImageToProduct = async (id, data) => {
  const response = await put(`products/${id}/image`, data);
  return response;
}

export const updateProduct = async (id, data) => {
  const response = await put(`products/${id}`, data);
  return response;
}

export const getProductsByCategory = async (categoryId) => {
  const response = await get(`products/category/${categoryId}`);
  return response;
}