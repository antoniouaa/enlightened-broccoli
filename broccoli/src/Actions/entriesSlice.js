import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserEntries = createAsyncThunk(
  "getUserEntries",
  async (_, { getState }) => {
    const token = getState().user.user.token;
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

export const createEntry = createAsyncThunk(
  "createEntry",
  async (_, { getState }) => {
    const token = getState().user.user.token;
    const response = await fetch("/entries/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      return data;
    }
    throw new Error(data.detail);
  }
);

export const patchEntry = createAsyncThunk(
  "patchEntry",
  async ({ item_id, id, action }, { getState }) => {
    const token = getState().user.user.token;
    const response = await fetch(`/entries/`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        item_id,
        entry_id: id,
        action,
      }),
    });
    if (response.status !== 204) {
      const data = await response.json();
      throw new Error(data.detail);
    }
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
    [createEntry.pending]: (state, action) => {
      state.status = "loading";
    },
    [createEntry.fulfilled]: (state, action) => {
      state.entries.push(action.payload);
      state.status = "succeeded";
      state.error = "";
    },
    [createEntry.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
    [patchEntry.pending]: (state, action) => {
      state.status = "loading";
    },
    [patchEntry.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = "";
    },
    [patchEntry.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const getEntries = (state) => state.entries.entries;
export const getItemsByEntryId = (id) => (state) =>
  state.entries.entries.filter((entry) => entry.id === id)[0].items;

export default entriesSlice.reducer;
