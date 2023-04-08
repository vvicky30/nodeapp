import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    authToken: '',
    role: ''
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload.access_token;
      state.role = action.payload.role;
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('authToken', action.payload.access_token); // Save the authentication token to local storage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = '';
      state.role = '';
      localStorage.removeItem('role');
      localStorage.removeItem('authToken'); // Remove the authentication token from local storage
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
