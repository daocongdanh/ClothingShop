import { get, post} from "../utils/request";

export const createPaymentMethod = async (data) => {
  const response = await post("paymentMethods", data);
  return response;
}

export const getAllPaymentMethods = async () => {
  const response = await get("paymentMethods");
  return response;
}

export const getPaymentMethodById = async (id) => {
  const response = await get(`paymentMethods/${id}`);
  return response;
}