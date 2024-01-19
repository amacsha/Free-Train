import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Spot } from "../spot"

export interface SpotState {
  value: Spot[]; 
}

export const spotListSlice = createSlice({
  name: "spotList",
  initialState: {
    value: [],
  } as SpotState,
  reducers: {
    setSpotListR: (state, action: PayloadAction<Spot[]>) => {
      state.value = action.payload;
    },
    addToSpotList: (state, action: PayloadAction<Spot>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { setSpotListR, addToSpotList } = spotListSlice.actions;

export default spotListSlice.reducer;
