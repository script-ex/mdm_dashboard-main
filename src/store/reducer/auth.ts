import { createSlice } from '@reduxjs/toolkit';
import { ApiService } from '../../services/ApiService';

const JWT_KEY = 'SDMS_JWT_KEY';

const initialState = {
  jwtKey: '',
  isLoggedIn: false,
  user: undefined
};

const initialJwtKey = localStorage.getItem(JWT_KEY);

if (initialJwtKey && initialJwtKey.length) {
  try {
    initialState.jwtKey = initialJwtKey;
    initialState.isLoggedIn = true;
  } catch (err) {
    console.log(err);
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJWT: (data, { payload }) => {
      data.jwtKey = payload.jwtToken;
      data.isLoggedIn = true;
      localStorage.setItem(JWT_KEY, data.jwtKey);
      ApiService.startService();
    },
    logout: (data) => {
      data.jwtKey = '';
      data.isLoggedIn = false;
      localStorage.setItem(JWT_KEY, '');
      ApiService.startService();
    },
    setUser: (data, { payload }) => {
      data.user = payload;
    }
  }
});

export const { setJWT, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
