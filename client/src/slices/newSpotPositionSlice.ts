import { createSlice } from '@reduxjs/toolkit'

type Coords = {
  lat: number;
  lng: number;
  alt?: number;
}

export const newSpotPositionSlice = createSlice({
  name: "newSpotPosition",
  initialState: {
    value: null
  },
  reducers: {
    setNewSpotPosition: (state: { value: null | Coords }, action: { type: string, payload: null | Coords }) => {
      state.value = action.payload;
    },
  }
})

export const { setNewSpotPosition } = newSpotPositionSlice.actions

export default newSpotPositionSlice.reducer
