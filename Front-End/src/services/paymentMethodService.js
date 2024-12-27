import { get, post} from "../utils/request";

export const createPaymentMethod = async (data) => {
  const result = await post("paymentMethods", data);
  return result;
}

export const getAllPaymentMethods = async () => {
  const result = await get("paymentMethods");
  return result;
}

export const getPaymentMethodById = async (id) => {
  const result = await get(`paymentMethods/${id}`);
  return result;
}