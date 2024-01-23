import {
  MockInstance,
  expect,
  it,
  beforeEach,
  describe,
  beforeAll,
  afterAll,
  afterEach,
} from "vitest";

import {
  act,
  render,
  fireEvent,
  screen,
  MatcherOptions,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userSlice from "../slices/userSlice";
import spotListSlice from "../slices/spotList";
import search from "../slices/searchSlice";
import newSpotPositionSlice from "../slices/newSpotPositionSlice";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";

import MapScreen from "../components/MapScreen.tsx";
import Login from "../components/Login.tsx";
import NewSpotForm from "../components/NewSpotForm";

const renderOptions = {
  wrapper: BrowserRouter,
};

function renderWithProviders(
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        user: userSlice,
        spot: spotListSlice,
        search: search,
        newSpotPoisition: newSpotPositionSlice,
      },
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper }) };
}

describe("login page", () => {
  renderWithProviders(<Login />);

  const emailInput = screen.getByTitle("emailMain");

  it("should render email and input test email", () => {
    const emailInput = screen.getByTitle("emailMain");
    fireEvent.change(emailInput, { target: { value: "wally@hotmail.co.uk" } });
    console.log(emailInput);
    expect(emailInput.value).toBe("wally@hotmail.co.uk");
  });
  it("should render password and input test password", () => {
    const passwordInput = screen.getByTitle("password");
    fireEvent.change(passwordInput, { target: { value: "wally" } });
    expect(passwordInput.value).toBe("wally");
  });

  it("should render login button", () => {
    const logInButton = screen.getByText("Log in");
    expect(logInButton).toBeTruthy();
  });
  it("should render register button ", () => {
    const registerButton = screen.getByText("Register");
    expect(registerButton).toBeTruthy();
  });
});

// describe("mapScreen", () => {
//   renderWithProviders(<MapScreen />);
//   it("Should Render The Map", async () => {
//     const mapScreenElement = await screen.getByTestId("map-screen");
//     expect(mapScreenElement).toBeDefined();
//   });
//   it("Should Render Spot Markers", async () => {
//     const spotMarkerElement = await screen.getAllByAltText("Marker");
//     expect(spotMarkerElement).toBeDefined();
//   });
//   it("Should Render Add Spot Button After Clicks", async () => {
//     const addButton = await screen.getByText("Add Spot");
//     fireEvent.click(addButton);
//     const closeButton = screen.getByRole("button", { name: "Close popup" });
//     expect(closeButton).toBeDefined();
//   });
// });

// describe("New Spot Form", () => {
//   renderWithProviders(<NewSpotForm />);
//   it("Should Render The Map", async () => {
//     const mapScreenElement = await screen.getByTestId("map-screen");
//     expect(mapScreenElement).toBeDefined();
//   });
// });
