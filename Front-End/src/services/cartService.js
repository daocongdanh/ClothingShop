import { get, post, put, del } from "../utils/request";

export const addToCart = async (data) => {
  const result = await post("carts", data);
  return result;
}

export const updateCart = async (productId, data) => {
  const result = await put(`carts/cart-item/${productId}`, data);
  return result;
}

export const deleteCart = async (productId) => {
  const result = await del(`carts/cart-item/${productId}`);
  return result;
}

export const getCartByUser = async () => {
  const result = await get(`carts/user`);
  return result;
}