import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AuthState, LoginPayload, RegisterPayload, User } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  token: token || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

interface LoginResponse {
  access_token: string;
  user: User;
}

interface RegisterResponse {
  message: string;
}

export const login = createAsyncThunk<
  { token: string; user: User },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
      payload
    );
    const { access_token, user } = res.data;
    return { token: access_token, user };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.detail || "Login failed");
  }
});

export const register = createAsyncThunk<
  string,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post<RegisterResponse>(
      `${API_URL}/auth/register`,
      payload
    );
    return res.data.message;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.detail || "Register failed");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
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
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
