import { createSlice } from '@reduxjs/toolkit'
const initialState: {value: string | null} = {
  value: null
}
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: { value: null | string }, action: { type: string, payload: null | string }) => {
      state.value = action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer