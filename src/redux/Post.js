import { createSlice } from "@reduxjs/toolkit";

const initialState = { allPosts: [] };

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    postsFetcher(state, action) {
      const posts = action.payload;
      state.allPosts = posts;
    },
  },
});

const postActions = postSlice.actions;
export { postActions };
export default postSlice;
