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
}

function displayCelsius(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let mainTemp = document.querySelector("#main-temp");
    mainTemp.innerHTML= Math.round(celsiusTemp);
}


let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

search("Glasgow");