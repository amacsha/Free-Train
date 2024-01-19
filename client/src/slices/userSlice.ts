import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../user";

export interface UserState {
  value: User | null;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null >) => {
      state.value = action.payload;
    },
  },
});

export const selectUser = (state: { user: UserState }) => state.user.value;

export default userSlice.reducer;
