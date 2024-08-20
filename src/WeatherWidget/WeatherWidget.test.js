import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import * as WeatherContext from "../Context/WeatherContext";
import WeatherWidget from "./WeatherWidget";

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

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders loading state correctly", () => {
  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    weatherData: null,
    loading: true,
    error: null,
  });

  render(<WeatherWidget />);

  const skeletonElements = screen.getAllByText((_, element) =>
    element.className.includes("animate-pulse")
  );
  expect(skeletonElements.length).toBeGreaterThan(0);
});

test("renders error state correctly", () => {
  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    weatherData: null,
    loading: false,
    error: "Failed to fetch weather data",
  });

  render(<WeatherWidget />);

  expect(screen.getByText(/Failed to fetch weather data/i)).toBeInTheDocument();
  expect(screen.getByText(/Failed to fetch weather data/i)).toHaveClass(
    "text-red-500"
  );
});

test("renders data-loaded state correctly", async () => {
  const mockWeatherData = [
    {
      weather: { icon: "01d", description: "clear sky" },
      temp: 20,
      feels_like: 18,
      temp_max: 25,
      temp_min: 15,
      pressure: 1013,
      humidity: 60,
      date: "2024-08-20",
    },
    {
      weather: { icon: "02d", description: "few clouds" },
      temp: 22,
      feels_like: 20,
      temp_max: 27,
      temp_min: 16,
      pressure: 1012,
      humidity: 65,
      date: "2024-08-21",
    },
  ];

  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    weatherData: mockWeatherData,
    loading: false,
    error: null,
  });

  render(<WeatherWidget />);

  await waitFor(() => {
    expect(
      screen.getByLabelText("Weather details for Tuesday")
    ).toHaveAttribute("aria-expanded", "true");

    expect(
      screen.getByLabelText("Weather details for Wednesday")
    ).toHaveAttribute("aria-expanded", "false");

    expect(
        screen.getByAltText("Weather icon representing clear sky")
      ).toBeInTheDocument();
      expect(
        screen.getByAltText("Weather icon representing few clouds")
      ).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Weather details for Wednesday"));

    expect(
      screen.getByLabelText("Weather details for Wednesday")
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByLabelText("Weather details for Tuesday")
    ).toHaveAttribute("aria-expanded", "false");
  });
});
