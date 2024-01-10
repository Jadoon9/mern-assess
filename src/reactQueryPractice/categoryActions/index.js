import { authApi } from "..";

export const getAllCategories = async ({ queryKey }) => {
  console.log(queryKey, "queryKey");
  const [, { page }] = queryKey;
  console.log(page, "00000");
  const response = await authApi.get(`/category/getAllCategory?page=${page}`);
  return response.data;
};

export const addCategory = async (data) => {
  const response = await authApi.post(`/category/add`, data);
  return response.data;
};
