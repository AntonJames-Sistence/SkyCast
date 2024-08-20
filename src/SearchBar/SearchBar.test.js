import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WeatherProvider } from "../Context/WeatherContext";
import SearchBar from "./SearchBar";
import WeatherWidget from "../WeatherWidget/WeatherWidget";

// Mock geolocation API
beforeAll(() => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 40.7128,
            longitude: -74.006,
          },
        })
      )
    ),
  };
});

test("renders SearchBar with default content", () => {
  render(
    <WeatherProvider>
      <SearchBar />
    </WeatherProvider>
  );

  expect(screen.getByText("Current Location")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Search City")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
});

test("allows the user to type a city name and submit the form", async () => {
  render(
    <WeatherProvider>
      <SearchBar />
    </WeatherProvider>
  );

  const input = screen.getByTestId("weather-input");
  const button = screen.getByRole("button", { name: /search/i });

  fireEvent.change(input, { target: { value: "New York" } });
  expect(input.value).toBe("New York");

  fireEvent.click(button);

  await waitFor(() => expect(screen.getByText("New York")).toBeInTheDocument());
});

test("renders error message if city doesnt exist", async () => {
  render(
    <WeatherProvider>
      <SearchBar />
      <WeatherWidget />
    </WeatherProvider>
  );

  const input = screen.getByTestId("weather-input");
  const button = screen.getByRole("button", { name: /search/i });

  fireEvent.change(input, { target: { value: "Mars 3" } });
  fireEvent.click(button);

    await waitFor(() => expect(screen.getByText("Place not found: Mars 3")).toBeInTheDocument());
});