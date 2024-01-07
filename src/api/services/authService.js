import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// For Local
// export const baseUrl = "http://127.0.0.1:8000/api";
// export const imageUrl = "http://127.0.0.1:8000/";

// For local
export const baseUrl = "http://localhost:8000/api";

// For Server
// export const baseUrl = "https://backend.pixelpeek.xyz/api";

const token = localStorage.getItem("token");

const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.REACT_APP_API_ENDPOINT,
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
  // reducerPath: "authApi",
  baseQuery,
  endpoints: () => ({}),
});
