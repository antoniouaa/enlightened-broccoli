import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserEntries = createAsyncThunk(
  "getUserEntries",
  async (token) => {
    const response = await fetch(`/entries/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return data;
    }
    throw new Error(data.detail);
  }
);

export const createEntry = createAsyncThunk("createEntry", async () => {});

export const addItemToEntry = createAsyncThunk(
  "addItemToEntry",
  async (itemId) => {
    console.log(itemId);
  }
);

const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    entries: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getUserEntries.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserEntries.fulfilled]: (state, action) => {
      state.entries = action.payload;
      state.status = "succeeded";
      state.error = "";
    },
    [getUserEntries.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
  },
});

export const getEntries = (state) => state.entries.entries;

export default entriesSlice.reducer;
