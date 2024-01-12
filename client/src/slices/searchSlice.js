import { createSlice } from '@reduxjs/toolkit'

export const search = createSlice({
  name: "search",
  initialState: {
    value: false
  }, 
  reducers: {
    setSearch: (state) => {
      state.value = !state.value
    }
  }
})

export const {setSearch} = search.actions

export default search.reducer