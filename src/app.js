function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
 "Sunday",
 "Monday",
  "Tuesday",
 "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes} `;
}

function displayTemp(response){
    console.log(response.data)
 
celsiusTemp = response.data.main.temp;
maxCelsius = response.data.main.temp_max;
minCelsius = response.data.main.temp_min;

let mainTemp = document.querySelector("#main-temp");
mainTemp.innerHTML=Math.round(celsiusTemp);
let mainCity = document.querySelector("#city");
mainCity.innerHTML= response.data.name;
let mainDescription = document.querySelector("#main-description");
mainDescription.innerHTML = response.data.weather[0].description;
let precipitation = document.querySelector("#precipitation");
precipitation.innerHTML=response.data.main.precipitation;
let humidity = document.querySelector("#humidity");
humidity.innerHTML=response.data.main.humidity;
let wind = document.querySelector("#wind");
wind.innerHTML=Math.round(response.data.wind.speed);
let date = document.querySelector("#date");
date.innerHTML = formatDate(response.data.dt * 1000);
let mainIcon = document.querySelector("#main-icon");
let getIcon = response.data.weather[0].icon;
mainIcon.setAttribute(`src`,`http://openweathermap.org/img/wn/${getIcon}@2x.png` );
mainIcon.setAttribute(`alt`,response.data.weather[0].description);
let high = document.querySelector("#high");
high.innerHTML = Math.round(maxCelsius);
let low = document.querySelector("#low");
low.innerHTML = Math.round(minCelsius);
}

function search(city){
let apiKey = "b6a67f67579bcd300971f2f49b91d214";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayTemp);
}


function handleSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}


function displayFahrenheit(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheit = (celsiusTemp * 9/5) + 32;
    let mainTemp = document.querySelector("#main-temp");
    mainTemp.innerHTML=Math.round(fahrenheit);

    let maxF = (maxCelsius * 9/5) + 32;
    let high = document.querySelector("#high");
    high.innerHTML = Math.round(maxF);
    let minF = (minCelsius * 9/5) + 32;
    let low = document.querySelector("#low");
    low.innerHTML = Math.round(minF);
}

function displayCelsius(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let mainTemp = document.querySelector("#main-temp");
    mainTemp.innerHTML= Math.round(celsiusTemp);

    let high = document.querySelector("#high");
    high.innerHTML = Math.round(maxCelsius);
    let low = document.querySelector("#low");
    low.innerHTML = Math.round(minCelsius);

}


let celsiusTemp = null;
let maxCelsius = null;
let minCelsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);


function getPosition(position) {
  let apiKey = "b6a67f67579bcd300971f2f49b91d214";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(displayTemp);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);

search("Glasgow");