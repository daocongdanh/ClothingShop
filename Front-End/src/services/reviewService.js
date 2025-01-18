import { post, get } from "../utils/request"

export const createReview = async (data) => {
  const response = await post("reviews", data);
  return response;
}

export const getReviewsByProduct = async (productId, filter) => {
  const response = await get(`reviews/product/${productId}?${filter}`);
  return response;
}