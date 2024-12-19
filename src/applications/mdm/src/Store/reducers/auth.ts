import { createSlice } from "@reduxjs/toolkit";
import { ApiService } from "../../Service/ApiService";

const JWT_KEY = "JWT_KEY";

const initialState = {
  jwtKey: "",
  isSuperAdmin: false,
  isLoggedIn: false,
};

const initialJwtKey = localStorage.getItem(JWT_KEY);

if (initialJwtKey && initialJwtKey.length) {
  try {
    initialState.jwtKey = initialJwtKey;
    initialState.isLoggedIn = true;
  } catch (err) {}
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setJWT: (data, { payload }) => {
      data.jwtKey = payload.jwtToken;
      data.isLoggedIn = true;
      localStorage.setItem(JWT_KEY, data.jwtKey);
      ApiService.startService();
    },
    logout: (data) => {
      data.jwtKey = "";
      data.isLoggedIn = false;
      localStorage.setItem(JWT_KEY, "");
      ApiService.startService();
    },
  },
});

export const { setJWT, logout } = authSlice.actions;
export default authSlice.reducer;
