import { configureStore } from '@reduxjs/toolkit'
import newSpotPositionSliceReducer from './slices/newSpotPositionSlice'
import spotListReducer from './slices/spotList'
import searchSlice from './slices/searchSlice'
import userSlice from './slices/userSlice'

export default configureStore({
  reducer: {
    newSpotPosition: newSpotPositionSliceReducer,
    spotListR: spotListReducer,
    search: searchSlice,
    user: userSlice
  },
})