function displayTemp(response){
    console.log(response.data)
let mainTemp = document.querySelector("#main-temp");
mainTemp.innerHTML=Math.round(response.data.main.temp);
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
}


let apiKey = "b6a67f67579bcd300971f2f49b91d214";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Glasgow&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayTemp);

