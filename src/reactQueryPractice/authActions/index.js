import { noAuthApi } from "..";

export const signUp = async (data) => {
  const response = await noAuthApi.post("/auth/signUp", data);
  return response.data;
};

export const signIn = async (data) => {
  const response = await noAuthApi.post("/auth/login", data);
  return response.data;
};
