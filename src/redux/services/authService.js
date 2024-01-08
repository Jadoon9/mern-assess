import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrl = "http://localhost:8000/api";
const token = localStorage.getItem("token");

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}` || token
    );
    return headers;
  },
});

export const authApiService = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: () => ({}),
});
