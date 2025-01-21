import { post, get, put } from "../utils/request"

export const createReview = async (data) => {
  const response = await post("reviews", data);
  return response;
}

export const getReviewsByProduct = async (productId, filter) => {
  const response = await get(`reviews/product/${productId}?${filter}`);
  return response;
}

export const getAllReviews = async () => {
  const response = await get("reviews");
  return response;
}

export const updateReviewStatus = async (id, status) => {
  const response = await put(`reviews/${id}/status/${status}`);
  return response;
}