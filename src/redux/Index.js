import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Auth";
import postSlice from "./Post";
const store = configureStore({
  reducer: { login: loginSlice.reducer, post: postSlice.reducer },
});

export default store;
