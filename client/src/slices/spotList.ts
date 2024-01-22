import { createSlice } from "@reduxjs/toolkit";

import { Spot } from "../types/spot";

export const spotListSlice = createSlice({
  name: "spotList",
  initialState: {
    value: [],
  },
  reducers: {
    setSpotListR: (
      state: { value: Spot[] },
      action: { type: string; payload: Spot[] },
    ) => {
      state.value = action.payload;
    },
    addToSpotList: (
      state: { value: Spot[] },
      action: { type: string; payload: Spot },
    ) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { setSpotListR, addToSpotList } = spotListSlice.actions;

export default spotListSlice.reducer;
