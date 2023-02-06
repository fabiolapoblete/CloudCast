const apiKey = "daa688489ff2376748ab8a652ddebe5a";
let temperatureMax = document.querySelector(".temperatureMax_value");
let temperatureMin = document.querySelector(".temperatureMin_value");
let wind = document.querySelector(".wind_value");
let humidity = document.querySelector(".humidity_value");
let pressure = document.querySelector(".pressure_value");
let visibility = document.querySelector(".visibility_value");
let visibilityIcon = document.querySelector(".icon_visibility");
let detailsHeader = document.querySelector(".details__header");

async function getWeather(city) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;

  try {
    let response = await fetch(url);
    let weatherData = await response.json();
    console.log(weatherData);

    detailsHeader.innerHTML = `
    Weather details for ${city}
    <hr>
    `;

    displayWeather(weatherData);
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(weatherData) {
  temperatureMax.innerText = weatherData.main.temp_max + " °C";

  temperatureMin.innerText = weatherData.main.temp_min + " °C";

  wind.innerText = weatherData.wind.speed + " m/s";

  humidity.innerText = weatherData.main.humidity + " %";

  pressure.innerText = weatherData.main.pressure + " hpa";

  visibility.innerText = weatherData.weather[0].description;

  visibilityIcon.src =
    "http://openweathermap.org/img/wn/" +
    weatherData.weather[0].icon +
    "@2x.png";
}

getWeather("London");
