function displayTemp(response){
    console.log(response.data)

}


let apiKey = "b6a67f67579bcd300971f2f49b91d214";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Glasgow&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayTemp);

