const apiKey = "daa688489ff2376748ab8a652ddebe5a";

export default async function getWeather(city) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;

  try {
    let response = await fetch(url);
    let weatherData = await response.json();
  } catch (error) {}
}
