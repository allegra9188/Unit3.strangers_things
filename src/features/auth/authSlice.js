import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: { user: credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { user: credentials },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

// This key is used to store the token in the browser's sessionStorage.
const TOKEN_KEY = "TOKEN";

/**
 * This function is used only as an extraReducer
 * to store the token in state and session storage.
 * @param state - the current state of the slice
 * @param payload - the response sent back from the API
 */
const storeToken = (state, { payload }) => {
  // The documentation tells us how to access the token from the payload
  state.token = payload.data.token;
  sessionStorage.setItem(TOKEN_KEY, payload.data.token);
};

// We use a slice to keep track of the token
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    // Logging out simply means wiping the stored token
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

export const { logout } = authSlice.actions;

// The `auth` key here should match the name of the authSlice!
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
