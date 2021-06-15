import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({ username, email, password }) => {
    const urlParams = new URLSearchParams({
      username: username,
      email: email,
      password: password,
    });

    const response = await fetch(`/users/signup`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: urlParams,
      redirect: "follow",
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
    const urlParams = new URLSearchParams();
    urlParams.append("username", username);
    urlParams.append("password", password);
    const response = await fetch(`/users/login`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: urlParams,
      redirect: "follow",
    });
    const data = await response.json();
    if (response.status === 201) {
      const { token, user } = data;
      return { user, token, isLoggedIn: true };
    }
    throw new Error(data.detail);
  }
);

const testState = {
  user: {
    user: {
      username: "antoniouaa",
      email: "antoniouaa@hotmail.com",
      weight: "68.4",
      height: "175",
      age: "25",
      sex: "Male",
      goals: 0,
    },
    isLoggedIn: true,
  },
  status: "succeeded",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: testState,
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
      state.error = "";
    },
    [signUpUser.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
  },
});

export const isUserLoggedIn = (state) => state.user.user.isLoggedIn;
export const getError = (state) => state.user.error;
export const getToken = (state) => state.user.user.token;
export const getUser = (state) =>
  isUserLoggedIn(state) ? state.user.user.user : null;

export default userSlice.reducer;
