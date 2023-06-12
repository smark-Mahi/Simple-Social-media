import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {User} from "../types/user"


const initialState: User = {
  name: "",
  accessToken: "",
  refreshToken:''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<User>) {
      state.name = payload.name;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    logout(state) {
      state.name = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
    updateAccessToken(state, { payload }: PayloadAction<{ token: string }>) {
      state.accessToken = payload.token;
    },
    updateRefreshToken(state, { payload }: PayloadAction<{ token: string }>) {
      state.refreshToken = payload.token;
    },
  },
});

export default userSlice.reducer;

export const { login, logout, updateAccessToken, updateRefreshToken } =
  userSlice.actions;
