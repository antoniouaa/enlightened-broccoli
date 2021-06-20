import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./Actions/userSlice";
import entriesReducer from "./Actions/entriesSlice";
import itemsReducer from "./Actions/itemsSlice";

export default configureStore({
  reducer: {
    user: usersReducer,
    entries: entriesReducer,
    items: itemsReducer,
  },
});
