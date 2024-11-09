import { get } from "../utils/request"

export const getAllCategories = async () => {
  const result = await get("categories");
  return result;
}

export const getCategoryBySlug = async (slug) => {
  const result = await get(`categories/${slug}`);
  return result;
}

