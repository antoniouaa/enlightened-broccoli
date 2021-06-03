import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./Actions/userSlice";

export default configureStore({
  reducer: {
    user: usersReducer,
  },
});
