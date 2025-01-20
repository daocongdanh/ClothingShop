import { get, post, put} from "../utils/request";

export const createPaymentMethod = async (data) => {
  const response = await post("paymentMethods", data);
  return response;
}

export const getAllPaymentMethods = async (query = '') => {
  const response = await get(`paymentMethods?${query}`);
  return response;
}

export const getPaymentMethodById = async (id) => {
  const response = await get(`paymentMethods/${id}`);
  return response;
}

export const updatePaymentMethod = async (id, data) => {
  const response = await put(`paymentMethods/${id}`, data);
  return response;
}