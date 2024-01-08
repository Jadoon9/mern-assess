import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrl = "http://localhost:8000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
});

export const noAuthApiService = createApi({
  reducerPath: "noAuthApi",
  baseQuery,
  endpoints: () => ({}),
});
