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
