var apiKey = '32823741b8d73ffd72b5e88e55a0b391';


$("#searchCity").on("click", function () {
    var cityEntry = $('.cityEntry').val();
    var cityEntry = cityEntry.toLowerCase().split(' ');
    for (var i = 0; i < cityEntry.length; i++) {
        cityEntry[i] = cityEntry[i].charAt(0).toUpperCase() + cityEntry[i].substring(1);
    }
    cityEntry = cityEntry.join(' ');
    console.log(cityEntry);

    var currentApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntry}&appid=${apiKey}`
    fetch(currentApi).then(function (response) {
        if (response.ok) {

        }
        response.json().then(function (data) {
            console.log(data);
            var longitude = data.coord['lon'];
            var latitude = data.coord['lat'];
            console.log(longitude);
            console.log(latitude);
            currCityData(cityEntry, longitude, latitude);
        })


    })
})
var currCityData = function (cityEntry, lon, lat) {
    var apiData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`
    fetch(apiData).then(function (response) {
        response.json().then(function (data) {
            var temp = data.current['temp'];
            temp = Math.round(((temp-273.15)*1.8 +32));
            var humidity = data.current['humidity'];
            var windSpeed = data.current['wind_speed'];
            var uvIndex = data.current['uvi'];
            var currentCityData = document.querySelector('.currentCityData');
            var cityName = document.createElement('h4');
            var temperature = document.createElement('p');
            var humid = document.createElement('p');
            var windSpeedo = document.createElement('p');
            var uvi = document.createElement('p');
            cityName.textContent = cityEntry +': ' + '(' + moment().format('l') + ')'; 
            temperature.textContent = 'Temperature: ' + temp + '°F'; 
            humid.textContent = 'Humidity: ' + humidity + '%';
            windSpeedo.textContent = 'Wind Speed: ' + windSpeed + ' MPH';
            uvi.textContent = ' UV Index: ' + uvIndex;
            currentCityData.appendChild(cityName);
            currentCityData.appendChild(temperature);
            currentCityData.appendChild(humid);
            currentCityData.appendChild(windSpeedo);
            currentCityData.appendChild(uvi);

           
            forecastCityData(data);
        })

    })

}
var forecastCityData = function(data){
    for (var i = 0; i<5; i++){
        var temperature = data.daily[i].temp['day'];
        var humidity = data.daily['humidity'];
        console.log(data);
        console.log(temperature);
    }
    
}

