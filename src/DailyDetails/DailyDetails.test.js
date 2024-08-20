import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import * as WeatherContext from "../Context/WeatherContext";
import DailyDetails from "./DailyDetails";

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

test("renders loading skeletons when loading state is true", () => {
  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    cityData: null,
    loading: true,
    error: null,
  });

  render(<DailyDetails />);

  expect(screen.getByText("Today's Overview:")).toBeInTheDocument();

  const skeletonElements = screen.getAllByText((_, element) =>
    element.className.includes("animate-pulse")
  );
  expect(skeletonElements.length).toBeGreaterThan(0);
});

test("renders nothing when there's an error", () => {
  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    cityData: null,
    loading: false,
    error: 'Failed to fetch the data',
  });

  const { container } = render(<DailyDetails />);

  expect(container.firstChild).toBeNull();
});

test("renders DailyDetails with city data", async () => {
  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    cityData: {
      main: { humidity: 80, temp: 20 },
      wind: { speed: 5 },
      visibility: 10000,
      sys: { sunrise: 1623312000, sunset: 1623362400 },
    },
    loading: false,
    error: null,
  });

  render(<DailyDetails />);

  await waitFor(() => {
    const skeletonElements = screen.queryByText((_, element) =>
      element.className?.includes("animate-pulse")
    );
    expect(skeletonElements).not.toBeInTheDocument();

    expect(screen.getByText("Today's Overview:")).toBeInTheDocument();
    expect(screen.getByText("Humidity")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("Wind Status")).toBeInTheDocument();
    expect(screen.getByText("5 m/s")).toBeInTheDocument();
    expect(screen.getByText("Visibility")).toBeInTheDocument();
    expect(screen.getByText("10 km")).toBeInTheDocument();
    expect(
      screen.getByText(/Sunrise: \d{2}:\d{2} [APM]{2}/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sunset: \d{2}:\d{2} [APM]{2}/)
    ).toBeInTheDocument();
  });
});
