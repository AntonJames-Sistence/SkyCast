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
