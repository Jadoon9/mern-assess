import { authApi } from "..";

export const getAllCategories = async ({ queryKey }) => {
  console.log(queryKey, "queryKey");
  const [, { page, limit }] = queryKey;
  console.log(page, "00000");
  let url = `/category/getAllCategory?page=${page}`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  const response = await authApi.get(url);
  return response.data;
};

export const addCategory = async (data) => {
  const response = await authApi.post(`/category/add`, data);
  return response.data;
};
export const updateCategoryData = async (data) => {
  const response = await authApi.patch(`/category/update/${data.id}`, data);
  return response.data;
};

export const deleteCategory = async (data) => {
  const response = await authApi.post(`/category/add`, data);
  return response.data;
};
