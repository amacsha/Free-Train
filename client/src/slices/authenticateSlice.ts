import { createSlice } from "@reduxjs/toolkit";
const initialState: { value: boolean } = {
  value: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state: { value: boolean },
      action: { type: string; payload: boolean },
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
