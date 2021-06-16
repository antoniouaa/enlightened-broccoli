import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./Actions/userSlice";
import entriesReducer from "./Actions/entriesSlice";

export default configureStore({
  reducer: {
    user: usersReducer,
    entries: entriesReducer,
  },
});
