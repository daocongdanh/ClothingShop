import { del, get, post, put } from "../utils/request"

export const getAllCategories = async () => {
  const result = await get("categories");
  return result;
}

export const getCategoryBySlug = async (slug) => {
  const result = await get(`categories/slug/${slug}`);
  return result;
}

export const getAllCategoriesWithProduct = async () => {
  const result = await get("categories/with-product-detail");
  return result;
}

export const createCategory = async (data) => {
  const result = await post("categories", data);
  return result;
}

export const deleteCategory = async (id) => {
  const result = await del(`categories/${id}`);
  return result;
}

export const getCategoryById = async (id) => {
  const result = await get(`categories/${id}`);
  return result;
}

export const updateCategory = async (id, data) => {
  const result = await put(`categories/${id}`, data);
  return result;
}