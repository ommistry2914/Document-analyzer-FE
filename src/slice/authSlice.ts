import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AuthState, LoginPayload, RegisterPayload } from "./types";


const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");

const initialState: AuthState = {
  token: token || null,
  loading: false,
  error: null,
};

// ✅ define backend response types
interface LoginResponse {
  access_token: string;
}

interface RegisterResponse {
  message: string;
}

export const login = createAsyncThunk<string, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post<LoginResponse>(`${API_URL}/auth/login`, payload);
      return res.data.access_token;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || "Login failed");
    }
  }
);

export const register = createAsyncThunk<string, RegisterPayload, { rejectValue: string }>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, payload);
      return res.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || "Register failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
