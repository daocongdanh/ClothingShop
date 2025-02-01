import { post } from "../utils/request"

export const createOrder = async (data) => {
  const response = await post("orders", data);
  return response;
}