import { configureStore } from "@reduxjs/toolkit";
import newSpotPositionSliceReducer from "./slices/newSpotPositionSlice";
import spotListReducer from "./slices/spotList";
import searchSlice from "./slices/searchSlice";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authenticateSlice";

const store = configureStore({
  reducer: {
    newSpotPosition: newSpotPositionSliceReducer,
    spotListR: spotListReducer,
    search: searchSlice,
    user: userSlice,
    auth: authSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
