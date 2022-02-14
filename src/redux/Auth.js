import { createSlice } from "@reduxjs/toolkit";

const initialState = { loginId: "", isLoggedIn: false,userName:""};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const uid = action.payload;
      console.log(uid);
      state.loginId = uid;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loginId = "";
      state.userName = "";
    },
    userNameAdder(state,action)
    {
      const userName=action.payload;
      state.userName=userName;
    }
  
  },
});

const loginActions = loginSlice.actions;
export { loginActions };
export default loginSlice;
