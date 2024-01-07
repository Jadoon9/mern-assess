import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  data: "",
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { data, token } = action.payload;
      state.isLoggedIn = true;
      state.data = data;
      state.token = token;
    },
    userLogout: (state) => {
      localStorage.removeItem("persist:root");
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.data = "";
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
