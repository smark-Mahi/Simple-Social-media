import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";

const initialState: User = {
  isAuth: false,
  id: 0,
  accessToken: "",
  exp: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<User>) {
      state.isAuth = true;
      state.id = payload.id;
      state.accessToken = payload.accessToken;
      state.exp = payload.exp;
    },
    logout(state) {
      state.isAuth = false;
      state.id = 0;
      state.accessToken = "";
      state.exp = null;
    },
    updateAccessToken(state, { payload }: PayloadAction<{ token: string }>) {
      state.accessToken = payload.token;
    },
  },
});

export default userSlice.reducer;

export const { login, logout, updateAccessToken } = userSlice.actions;
