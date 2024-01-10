import { authApi } from "..";

export const getAllCars = async ({ queryKey }) => {
  const [, page] = queryKey;
  const response = await authApi.get(`/car/getAllCars?page=${page}`);
  return response.data;
};

export const createCar = async (data) => {
  const response = await authApi.get(`/car/add/`, data);
  return response.data;
};
