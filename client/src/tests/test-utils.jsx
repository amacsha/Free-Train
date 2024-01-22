import React from 'react'
import { render } from '@testing-library/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import userSlice from '../slices/userSlice'
import spotListSlice from '../slices/spotList'
import search from '../slices/searchSlice'
import newSpotPositionSlice from '../slices/newSpotPositionSlice'

import { BrowserRouter } from 'react-router-dom';


// const rootReducer = combineReducers({
//   user: userSlice,
//   spot: spotListSlice,
//   search: search,
//   newSpotPoisition: newSpotPositionSlice
// })

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        user: userSlice,
        spot: spotListSlice,
        search: search,
        newSpotPoisition: newSpotPositionSlice
      }, preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, BrowserRouter }) }
}