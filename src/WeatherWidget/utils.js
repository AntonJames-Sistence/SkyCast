// Function to capitalize first letter
export const capFLetter = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Function for conversion Celsius to Fahrenheit
export const CtoF = (tempCelsius) => {
  if (typeof tempCelsius !== "number" || isNaN(tempCelsius)) {
    return "N/A";
  }
  return (tempCelsius * 9) / 5 + 32;
};

// Function for conversion Kelvins to Fahrenheit
export const KtoF = (tempKelvin) => {
  if (typeof tempKelvin !== "number" || isNaN(tempKelvin)) {
    return "N/A";
  }
  return ((tempKelvin - 273.15) * 9) / 5 + 32;
};

// Function to reflect date and time
export const getDateAndTime = (dateString) => {
  // Parse the date string to get the correct day
  const date = new Date(dateString);
  const dayOptions = { weekday: "long" };
  const day = date.toLocaleDateString("en-US", dayOptions);

  // Get the current time from the machine, can be improved in the future, but it is not required right now
  const now = new Date();
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  const currentTime = now.toLocaleTimeString("en-US", timeOptions);

  return { day, time: currentTime };
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
