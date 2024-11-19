import { post, get } from "../utils/request"

export const createReview = async (data) => {
  const result = await post("reviews", data);
  return result;
}

export const getReviewsByProduct = async (productId, filter) => {
  const result = await get(`reviews/product/${productId}?${filter}`);
  return result;
}