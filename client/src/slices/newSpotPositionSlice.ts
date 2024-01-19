import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewSpotPositionState {
  lat: number | null;
  lng: number | null;
}

const initialState: NewSpotPositionState = {
  lat: null,
  lng: null,
};

export const newSpotPositionSlice = createSlice({
  name: "newSpotPosition",
  initialState,
  reducers: {
    setNewSpotPosition: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>,
    ) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { setNewSpotPosition } = newSpotPositionSlice.actions;

export default newSpotPositionSlice.reducer;
