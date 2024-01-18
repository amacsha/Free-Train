import { createSlice } from "@reduxjs/toolkit";

export const spotListSlice = createSlice({
  name: "spotList",
  initialState: {
    value: [],
  },
  reducers: {
    setSpotListR: (state, action) => {
      state.value = action.payload;
    },
    addToSpotList: (state, action) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { setSpotListR, addToSpotList } = spotListSlice.actions;

export default spotListSlice.reducer;
