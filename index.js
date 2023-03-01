let weatherData = [];

initiate();
search();

async function getWeather(city) {
  //Fetches weather data from API for a specific city
  const APIkey = "daa688489ff2376748ab8a652ddebe5a";
  const URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    APIkey;

  try {
    let response = await fetch(URL);
    weatherData = await response.json();

    displayWeatherData();
    initializingMap();
  } catch (error) {
    console.log("There was an error with the API ", error);
  }
}

function initiate() {
  //Default city is shown when the webapp is loaded
  let city = "Stockholm";
  getWeather(city);
}

function search() {
  //Eventlistener on the input field. Input value is set as city.
  const input = document.querySelector(".search__bar");
  input.addEventListener("search", (e) => {
    e.preventDefault();
    let city = input.value;
    getWeather(city);
  });
}

function displayWeatherData() {
  let detailsHeader = document.querySelector(".details__header");
  let detailsWeather = document.querySelector(".details__weather");
  let map = document.getElementById("map");

  //Make content visible again
  detailsWeather.classList.remove("hide");
  map.classList.remove("hide");

  if (weatherData.name == undefined) {
    //Logic and UI when the input does not match a city in the API
    detailsHeader.innerHTML = `Sorry there is no weather data for your search`;
    detailsWeather.classList.toggle("hide");
    map.classList.toggle("hide");
  } else {
    detailsHeader.innerHTML = `
    Weather details for ${weatherData.name}
    <hr>
    `;

    let temperatureMax = document.querySelector(".temperatureMax_value");
    let temperatureMin = document.querySelector(".temperatureMin_value");
    let wind = document.querySelector(".wind_value");
    let humidity = document.querySelector(".humidity_value");
    let pressure = document.querySelector(".pressure_value");
    let visibility = document.querySelector(".visibility_value");
    let visibilityIcon = document.querySelector(".icon_visibility");

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
}

function initializingMap() {
  //Fixes problem with map container already being initialized
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
  displayMap();
}

function displayMap() {
  //Map from Leaflet
  let lon = weatherData.coord.lon;
  let lat = weatherData.coord.lat;
  //The map show the location for searched city
  var map = L.map("map").setView([lat, lon], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var marker = L.marker([lat, lon]).addTo(map);
}
