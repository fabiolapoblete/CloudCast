const apiKey = "daa688489ff2376748ab8a652ddebe5a";
let temperatureMax = document.querySelector(".temperatureMax_value");
let temperatureMin = document.querySelector(".temperatureMin_value");
let wind = document.querySelector(".wind_value");
let humidity = document.querySelector(".humidity_value");
let pressure = document.querySelector(".pressure_value");
let visibility = document.querySelector(".visibility_value");
let visibilityIcon = document.querySelector(".icon_visibility");
let detailsHeader = document.querySelector(".details__header");

let city = "Stockholm";
const input = document.querySelector(".search__bar");

getWeather(city);

input.addEventListener("search", (e) => {
  e.preventDefault();
  city = input.value;
  console.log(city);
  getWeather(city);
});

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
    Weather details for ${weatherData.name}
    <hr>
    `;

    let lon = weatherData.coord.lon;
    let lat = weatherData.coord.lat;
    console.log(lon, lat);

    displayWeather(weatherData);
    displayMap(lat, lon);
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(weatherData) {
  temperatureMax.innerText = Math.round(weatherData.main.temp_max) + " °C";

  temperatureMin.innerText = Math.round(weatherData.main.temp_min) + " °C";

  wind.innerText = Math.round(weatherData.wind.speed) + " m/s";

  humidity.innerText = weatherData.main.humidity + " %";

  pressure.innerText = weatherData.main.pressure + " hpa";

  visibility.innerText = weatherData.weather[0].description;

  visibilityIcon.src =
    "http://openweathermap.org/img/wn/" +
    weatherData.weather[0].icon +
    "@2x.png";
}

function displayMap(lat, lon) {
  var map = L.map("map").setView([lat, lon], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var marker = L.marker([lat, lon]).addTo(map);
}

// getWeather("Stockholm");
