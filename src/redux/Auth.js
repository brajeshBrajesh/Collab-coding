import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginId: "",
  isLoggedIn: false,
  userName: "",
  isAdmin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const uid = action.payload.uid;
      const isAdmin = action.payload.isAdmin;
      console.log(uid);
      console.log(isAdmin)
      state.loginId = uid;
      state.isLoggedIn = true;
      state.isAdmin = isAdmin;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loginId = "";
      state.userName = "";
    },
    userNameAdder(state, action) {
      const userName = action.payload;
      state.userName = userName;
    },
  },
});

const loginActions = loginSlice.actions;
export { loginActions };
export default loginSlice;
