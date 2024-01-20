import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null
  },
  reducers: {
    setUser: (state: { value: null | string }, action: { type: string, payload: null | string }) => {
      state.value = action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer