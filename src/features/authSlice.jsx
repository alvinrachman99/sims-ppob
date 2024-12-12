import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../axios/AxiosInstance";

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      // console.log('response:')
      // console.log(response)
      const { token } = response.data.data;
      return { token };
    } catch (error) {
      // console.error('error slice:', error)
      return error.response.data;
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return {};
});

const initialState = {
  token: localStorage.getItem('token') || null, // Ambil token dari localStorage jika ada
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export default authSlice.reducer;
