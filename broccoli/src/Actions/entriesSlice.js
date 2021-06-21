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

export const createEntry = createAsyncThunk("createEntry", async (token) => {
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
});

export const getEntryItems = createAsyncThunk(
  "getEntryItems",
  async ({ token, id }) => {
    const response = await fetch(`/entries/${id}/items`, {
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

export const addItemToEntry = createAsyncThunk(
  "addItemToEntry",
  async ({ items, id, token }) => {
    const response = await fetch(`/entries/`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: items.map((item) => item.id),
        entry_id: id,
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
    [getEntryItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [getEntryItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = "";
    },
    [getEntryItems.rejected]: (state, action) => {
      state.error = action.error;
      state.status = "failed";
    },
    [addItemToEntry.pending]: (state, action) => {
      state.status = "loading";
    },
    [addItemToEntry.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = "";
    },
    [addItemToEntry.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const getEntries = (state) => state.entries.entries;
export const getEntryById = (id) => (state) =>
  state.entries.entries.filter((entry) => entry.id === id);

export default entriesSlice.reducer;
