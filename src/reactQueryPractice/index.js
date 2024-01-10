import axios from "axios";

const commonConfig = {
  baseURL: "http://localhost:8000/api",
};

const authApi = axios.create({
  ...commonConfig,
});

const noAuthApi = axios.create({
  ...commonConfig,
});

// Request interceptor for the authenticated API instance
authApi.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for the non-authenticated API instance
noAuthApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for both instances
const responseInterceptor = (response) => {
  return response;
};

const errorInterceptor = (error) => {
  return Promise.reject(error);
};

authApi.interceptors.response.use(responseInterceptor, errorInterceptor);
noAuthApi.interceptors.response.use(responseInterceptor, errorInterceptor);

export { authApi, noAuthApi };
