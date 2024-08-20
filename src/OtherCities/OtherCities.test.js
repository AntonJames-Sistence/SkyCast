import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { WeatherProvider } from "../Context/WeatherContext";
import OtherCities from "./OtherCities";

// Mock data for other cities
const mockOtherCities = [
  {
    name: "New York",
    temperature: 298.15,
    weatherDescription: "clear sky",
  },
  {
    name: "London",
    temperature: 293.15,
    weatherDescription: "few clouds",
  },
];

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

// Mock the global fetch API, otherwise it'll fetch real data
beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((url) => {
    if (url.includes("weather")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockOtherCities),
      });
    }
    return Promise.reject(new Error("Failed to fetch data"));
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('displays error message when API call fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch data'))
    );
  
    render(
      <WeatherProvider>
        <OtherCities />
      </WeatherProvider>
    );
  
    await waitFor(() => expect(screen.getByText('Failed to fetch data')).toBeInTheDocument());
  });

test("displays skeleton structure while loading", async () => {
  render(
    <WeatherProvider>
      <OtherCities />
    </WeatherProvider>
  );

  // Initially, it should display the loading skeleton
  await waitFor(() => {
    expect(screen.getByText("Other Cities")).toBeInTheDocument();
    // expect(screen.getAllByRole("progressbar")).toHaveLength(4);
  });
});

// test('renders other cities correctly', () => {
//   render(
//     <WeatherProvider value={{ loading: false, otherCities: mockOtherCities, otherCititesError: null }}>
//       <OtherCities />
//     </WeatherProvider>
//   );

//   // Check if the cities are rendered
//   expect(screen.getByText('New York')).toBeInTheDocument();
//   expect(screen.getByText('London')).toBeInTheDocument();
//   expect(screen.getByText('clear sky')).toBeInTheDocument();
//   expect(screen.getByText('few clouds')).toBeInTheDocument();
//   expect(screen.getByText(/77/)).toBeInTheDocument(); // Fahrenheit conversion of 298.15K
//   expect(screen.getByText(/68/)).toBeInTheDocument(); // Fahrenheit conversion of 293.15K
// });
