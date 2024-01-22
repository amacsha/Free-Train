
import { MockInstance, expect, it, beforeEach, describe, beforeAll, afterAll, afterEach } from 'vitest'

import App from '../App.js'

import Login from '../components/Login.js'

import {
  act,
  render,
  fireEvent,
  screen,
  MatcherOptions,
} from '@testing-library/react'

import React from 'react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import userSlice from '../slices/userSlice'
import spotListSlice from '../slices/spotList'
import search from '../slices/searchSlice'
import newSpotPositionSlice from '../slices/newSpotPositionSlice'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { BrowserRouter } from 'react-router-dom';

import MapScreen from '../components/MapScreen.js'


const renderOptions = {
  wrapper: BrowserRouter
}

function renderWithProviders(
  ui: any,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        user: userSlice,
        spot: spotListSlice,
        search: search,
        newSpotPoisition: newSpotPositionSlice
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper }) }
}


describe('login page', () => {
  renderWithProviders(<Login />)

  it('should render login form', () => {
    const form = screen.getByText('Log in')
    expect(form).toBeTruthy()
  })
})



