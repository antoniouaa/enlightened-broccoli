import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({ username, email, password }) => {
    const response = await fetch(`/users/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.status === 201) {
      return { isLoggedIn: false };
    }
    throw new Error(data.detail);
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ username, password }) => {
    const response = await fetch(`/users/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.status === 201) {
      const token = await data.access_token;
      return { token, isLoggedIn: true };
    }
    throw new Error(data.detail);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { isLoggedIn: false },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [signUpUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [signUpUser.rejected]: (state, action) => {
      state.error = action.error[0].msg;
      state.status = "failed";
    },
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "failed";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.error = action.error[0].msg;
      state.status = "failed";
    },
  },
});

export const isUserLoggedIn = (state) => state.user.user.isLoggedIn;
export const getError = (state) => state.user.error;
export const getToken = (state) => state.user.user.token;

export default userSlice.reducer;
