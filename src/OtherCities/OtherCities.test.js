import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { WeatherProvider } from "../Context/WeatherContext";
import OtherCities from "./OtherCities";

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

test("displays error message when API call fails", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch data"))
    );

  render(
    <WeatherProvider>
      <OtherCities />
    </WeatherProvider>
  );

  await waitFor(() =>
    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument()
  );
});

test("displays skeleton structure while loading", async () => {
  jest.spyOn(global, "fetch").mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        // Simulate a delay to trigger the loading state
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve([]),
          });
        }, 1000);
      })
  );

  render(
    <WeatherProvider>
      <OtherCities />
    </WeatherProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Other Cities/i)).toBeInTheDocument();

    const loadingStatus = screen.getByRole("status", { hidden: true });
    expect(loadingStatus).toBeInTheDocument();
    expect(loadingStatus).toHaveAttribute("aria-live", "polite");
  });
});

test("displays weather data correctly", async () => {
  jest.spyOn(global, "fetch").mockImplementationOnce(
    () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "New York",
            main: {
              temp: 20,
            },
            weather: [
              {
                description: "clear sky",
                icon: "01d",
              },
            ],
          }),
      })
  );

  render(
    <WeatherProvider>
      <OtherCities />
    </WeatherProvider>
  );

  await waitFor(() => {
    const cityName = screen.getAllByText(/New York/i);
    expect(cityName.length).toBeGreaterThan(0);
    const temp = screen.getAllByText(/68/i);
    expect(temp.length).toBeGreaterThan(0);
    const desc = screen.getAllByText(/clear sky/i);
    expect(desc.length).toBeGreaterThan(0);
  });
});

test("OtherCities component should have proper roles and aria attributes", async () => {
  render(
    <WeatherProvider>
      <OtherCities />
    </WeatherProvider>
  );

  await waitFor(() => {
    const weatherRegions = screen.getAllByRole("region");
    expect(weatherRegions.length).toBeGreaterThan(0);
  });
});
