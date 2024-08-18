// Function to capitalize first letter
export const capFLetter = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Function to convert temperature from Kelvin to Fahrenheit
export const KtoF = (tempKevlin) => {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
};

// Function to reflect date and time
export const getDateAndTime = () => {
  const now = new Date();
  const dayOptions = { weekday: "long" };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  const day = now.toLocaleDateString("en-US", dayOptions);
  const time = now.toLocaleTimeString("en-US", timeOptions);

  return { day, time };
};

// Function to process the data from second call to OpenWeather
export const processForecastData = (list) => {
  const dailyData = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // Get the date part only
    if (!dailyData[date]) {
      dailyData[date] = {
        temp: [],
        feels_like: [],
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        weather: item.weather[0],
        sunrise: item.sys.sunrise,
        sunset: item.sys.sunset,
      };
    }

    dailyData[date].temp.push(item.main.temp);
    dailyData[date].feels_like.push(item.main.feels_like);
    dailyData[date].temp_min = Math.min(
      dailyData[date].temp_min,
      item.main.temp_min
    );
    dailyData[date].temp_max = Math.max(
      dailyData[date].temp_max,
      item.main.temp_max
    );
  });

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  // Process each day to get the average temp and feels_like
  return Object.keys(dailyData).map((date) => {
    const dayData = dailyData[date];
    return {
      date,
      temp: average(dayData.temp),
      feels_like: average(dayData.feels_like),
      temp_min: dayData.temp_min,
      temp_max: dayData.temp_max,
      pressure: dayData.pressure,
      humidity: dayData.humidity,
      weather: dayData.weather,
      sunrise: dayData.sunrise,
      sunset: dayData.sunset,
    };
  });
};
