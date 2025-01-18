import { get, post, put, del } from "../utils/request";

export const addToCart = async (data) => {
  const response = await post("carts", data);
  return response;
}

export const updateCart = async (productId, data) => {
  const response = await put(`carts/cart-item/${productId}`, data);
  return response;
}

export const deleteCart = async (productId) => {
  const response = await del(`carts/cart-item/${productId}`);
  return response;
}

export const getCartByUser = async () => {
  const response = await get(`carts/user`);
  return response;
}