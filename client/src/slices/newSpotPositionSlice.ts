import { createSlice } from "@reduxjs/toolkit";

type Coords = {
  lat: number;
  lng: number;
  alt?: number;
};

type positionState = {
  value: Coords | null;
};

const initialState: positionState = {
  value: null,
};

export const newSpotPositionSlice = createSlice({
  name: "newSpotPosition",
  initialState,
  reducers: {
    setNewSpotPosition: (
      state: { value: null | Coords },
      action: { type: string; payload: null | Coords },
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setNewSpotPosition } = newSpotPositionSlice.actions;

export default newSpotPositionSlice.reducer;
