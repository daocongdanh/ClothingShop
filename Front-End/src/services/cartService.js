import { get, post, put, del1 } from "../utils/request"

export const addToCart = async (data) => {
  const result = await post("carts", data);
  return result;
}

export const updateCart = async (productId, data) => {
  const result = await put(`carts/cart-item/${productId}`, data);
  return result;
}

export const deleteCart = async (productId, data) => {
  const result = await del1(`carts/cart-item/${productId}`, data);
  return result;
}

export const getCartByUser = async (userId) => {
  const result = await get(`carts/user/${userId}`);
  return result;
}