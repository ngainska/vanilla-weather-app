function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
  }
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
  }
    
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


function formatTime(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
  }
    let minutes = date.getMinutes();
     if (minutes < 10) {
    minutes = `0${minutes}`;
  }

    return `${hours}:${minutes} `;
}

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
 "Sun",
 "Mon",
  "Tue",
 "Wed",
  "Thur",
  "Fri",
  "Sat"
];
return days[day]; 
}



function displayForecast(response){
  console.log(response);
  let forecastData = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  forecastData.forEach(function(forecastDay, index) {
if (index < 6){

forecastMaxCelsius = `${forecastDay.temp.max}`;
forecastMinCelsius = `${forecastDay.temp.min}`;
forecastHTML = forecastHTML + `<div class = "col-2"> 
                        <div class = "forecast-day">
                            ${formatDay(forecastDay.dt)}
                        </div>
                    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="70" id="forecast-icon"/> 
                    <div class="forecast-temp">
                        <span class="forecast-high" id="forecast-high">${Math.round(forecastDay.temp.max)}</span>° <span class="forecast-low" id="forecast-low">${Math.round(forecastDay.temp.min)}</span>°
                    </div>
                    
                    </div>`;

}

  })

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML= forecastHTML;

console.log(response.data.current.weather[0].main);
let song = document.querySelector("#songlink");
if (response.data.current.weather[0].main === "Clear") {
song.innerHTML= `🎵 "Mr. Blue Sky" - Electric Light Orchestra `;
song.setAttribute(`href`,"https://youtu.be/woNqp6jchVI");
}
else if (response.data.current.weather[0].main === "Clouds"){
song.innerHTML= `🎵 "Cloudy Day" - Tones and I `;
song.setAttribute(`href`,"https://youtu.be/V91GRYjlR2I");
}
else if (response.data.current.weather[0].main === "Drizzle"){
song.innerHTML= `🎵 "Singin in the Rain" - Mint Royale `;
song.setAttribute(`href`,"https://youtu.be/fEkATMOl6WU");
}
else if (response.data.current.weather[0].main === "Rain"){
song.innerHTML= `🎵 "Umbrella" - Rihanna `;
song.setAttribute(`href`,"https://youtu.be/CvBfHwUxHIk");
}
else if (response.data.current.weather[0].main === "Snow"){
song.innerHTML= `🎵 "Do You Want To Build A Snowman?" - From "Frozen" `;
song.setAttribute(`href`,"https://youtu.be/TeQ_TTyLGMs");
}
else if (response.data.current.weather[0].main === "Thunderstorm"){
song.innerHTML= `🎵 "Thunderstruck" = AC/DC `;
song.setAttribute(`href`,"https://youtu.be/v2AC41dglnM");
}
else {
song.innerHTML= `🎵 "Blame It On The Weatherman" = B*Witched `;
song.setAttribute(`href`,"https://youtu.be/HTwiK8z2m_Y");
}
}

function getForecast(coordinates){
  let apiKey = "b6a67f67579bcd300971f2f49b91d214";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}


function displayTemp(response){
    console.log(response.data);
 
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
let sunrise = document.querySelector("#sunrise");
sunrise.innerHTML = formatTime(response.data.sys.sunrise * 1000);
let sunset = document.querySelector("#sunset"); 
sunset.innerHTML = formatTime(response.data.sys.sunset * 1000);


getForecast(response.data.coord);




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

    let forecastMaxF = (forecastMaxCelsius * 9/5) + 32;
    let forecastHigh = document.querySelector("#forecast-high");
    forecastHigh.innerHTML = Math.round(forecastMaxF);
    
    let forecastMinF = (forecastMinCelsius * 9/5) + 32;
    let forecastLow = document.querySelector("#forecast-low");
    forecastLow.innerHTML = Math.round(forecastMinF);

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

    let forecastHigh = document.querySelector("#forecast-high");
    forecastHigh.innerHTML = Math.round(forecastMaxCelsius);
    
    let forecastLow = document.querySelector("#forecast-low");
    forecastLow.innerHTML = Math.round(forecastMinCelsius);

}


let celsiusTemp = null;
let maxCelsius = null;
let minCelsius = null;
forecastMaxCelsius = null;
forecastMinCelsius = null;

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


//to do
//change icon images
//if daytime, light mode, if evening, dark mode
//forecast unit change
//change song depending on weather.main