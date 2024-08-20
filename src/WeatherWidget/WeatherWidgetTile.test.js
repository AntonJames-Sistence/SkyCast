import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as WeatherContext from "../Context/WeatherContext";
import WeatherWidgetTile from "./WeatherWidgetTile";

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

test("renders the collapsed state correctly", async () => {
  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    cityData: null,
  });

  const mockData = {
    weather: {
      icon: "01d",
      description: "clear sky",
    },
    temp: 20,
    feels_like: 18,
    temp_max: 25,
    temp_min: 15,
    pressure: 1013,
    humidity: 60,
    date: "2024-08-20",
  };

  render(
    <WeatherWidgetTile
      weatherData={mockData}
      isOpen={false}
      onClick={jest.fn()}
      idx={1}
    />
  );

  await waitFor(() => {
    expect(
      screen.getByLabelText("Weather details for Tuesday")
    ).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(/TUE/i)).toBeInTheDocument();
    expect(screen.getByText(/68/i)).toBeInTheDocument();
    expect(
      screen.getByAltText("Weather icon representing clear sky")
    ).toBeInTheDocument();
  });
});

test("renders the expanded state correctly with cityData", async () => {
  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    cityData: {
      main: {
        temp: 293.15, // 20°C
        feels_like: 291.15, // 18°C
        temp_max: 298.15, // 25°C
        temp_min: 288.15, // 15°C
      },
    },
  });

  const mockData = {
    weather: {
      icon: "01d",
      description: "clear sky",
    },
    temp: 20,
    feels_like: 18,
    temp_max: 25,
    temp_min: 15,
    pressure: 1013,
    humidity: 60,
    date: "2024-08-20",
  };

  render(
    <WeatherWidgetTile
      weatherData={mockData}
      isOpen={true}
      onClick={jest.fn()}
      idx={0}
    />
  );

  await waitFor(() => {
    expect(
      screen.getByLabelText("Weather details for Tuesday")
    ).toHaveAttribute("aria-expanded", "true");

    expect(screen.getByText(/Tuesday/i)).toBeInTheDocument();
    expect(screen.getByText(/68/i)).toBeInTheDocument();
    expect(
      screen.getByAltText("Weather icon representing clear sky")
    ).toBeInTheDocument();
    expect(screen.getByText(/Feels Like:/i)).toBeInTheDocument();
    expect(screen.getByText(/Temp Max:/i)).toBeInTheDocument();
    expect(screen.getByText(/Temp Min:/i)).toBeInTheDocument();
    expect(screen.getByText(/Pressure:/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
  });
});

test("handles onClick event", () => {
  const mockOnClick = jest.fn();

  jest.spyOn(WeatherContext, "useWeather").mockReturnValue({
    cityData: null,
  });

  const mockData = {
    weather: {
      icon: "01d",
      description: "clear sky",
    },
    temp: 20,
    feels_like: 18,
    temp_max: 25,
    temp_min: 15,
    pressure: 1013,
    humidity: 60,
    date: "2024-08-20",
  };

  render(
    <WeatherWidgetTile
      weatherData={mockData}
      isOpen={false}
      onClick={mockOnClick}
      idx={1}
    />
  );

  const tile = screen.getByLabelText("Weather details for Tuesday");

  fireEvent.click(tile);

  expect(mockOnClick).toHaveBeenCalled();
});
