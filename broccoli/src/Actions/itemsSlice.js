import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getItems = createAsyncThunk("getItems", async () => {
  const response = await fetch(`/items/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }
  throw new Error(data.detail);
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [getItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = "";
    },
    [getItems.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
  },
});

export const fetchItems = (state) => state.items.items;

export default itemsSlice.reducer;
