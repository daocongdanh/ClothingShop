import { del, get, post, put } from "../utils/request"

export const getAllCategories = async (query = '') => {
  const response = await get(`categories?${query}`);
  return response;
}

export const getCategoryBySlug = async (slug) => {
  const response = await get(`categories/slug/${slug}`);
  return response;
}

export const getAllCategoriesWithProduct = async () => {
  const response = await get("categories/with-product-detail");
  return response;
}

export const createCategory = async (data) => {
  const response = await post("categories", data);
  return response;
}

export const deleteCategory = async (id) => {
  const response = await del(`categories/${id}`);
  return response;
}

export const getCategoryById = async (id) => {
  const response = await get(`categories/${id}`);
  return response;
}

export const updateCategory = async (id, data) => {
  const response = await put(`categories/${id}`, data);
  return response;
}