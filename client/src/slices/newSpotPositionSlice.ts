import { createSlice } from "@reduxjs/toolkit";

export const newSpotPositionSlice = createSlice({
  name: "newSpotPosition",
  initialState: {
    value: null,
  },
  reducers: {
    setNewSpotPosition: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNewSpotPosition } = newSpotPositionSlice.actions;

export default newSpotPositionSlice.reducer;
