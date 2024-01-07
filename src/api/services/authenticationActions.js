import { noAuthApiService } from "./noauthService";

const createAuthentication = noAuthApiService.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (data) => {
        return {
          url: "/auth/signUp",
          method: "POST",
          body: data,
        };
      },
    }),
    login: build.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = createAuthentication;
export default createAuthentication;
