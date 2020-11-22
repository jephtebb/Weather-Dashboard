var apiKey = '32823741b8d73ffd72b5e88e55a0b391';
var cityEntered = [];
var duplicateCitiesInclude = [];
var cityCounter = 0;
$('#searchCity').click(startWeatherSearch);
$('.cityList').on('click',function(e){
    var cityTargeted = e.target.getAttribute('data-list');
    console.log(cityTargeted);
     startWeatherSearch(cityTargeted);
});
function startWeatherSearch(cityEntry) {
    $('.currentCityData').remove();
    $('eachForecast').remove();
    var cityEntry = $('.cityEntry').val();
    var cityEntry = cityEntry.toLowerCase().split(' ');
    for (var i = 0; i < cityEntry.length; i++) {
        cityEntry[i] = cityEntry[i].charAt(0).toUpperCase() + cityEntry[i].substring(1);
    }
    cityEntry = cityEntry.join(' ');
    var currentApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntry}&appid=${apiKey}`
    fetch(currentApi).then(function (response) {
        if (response.ok) {
            if (!cityEntered.includes(cityEntry)) {
                cityEntered.push(cityEntry);
                localStorage.setItem('city', JSON.stringify(cityEntered));
            }
        }else{
            alert('Enter a city:');
        }
        response.json().then(function (data) {
            var longitude = data.coord['lon'];
            var latitude = data.coord['lat'];
            var icon = data.weather[0].icon;
            currCityData(cityEntry, longitude, latitude, icon);
        })
    })
}
var currCityData = function (cityEntry, lon, lat, icon) {
    var apiData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`
    fetch(apiData).then(function (response) {
        response.json().then(function (data) {
            var temp = data.current['temp'];
            temp = Math.round(((temp - 273.15) * 1.8 + 32));
            var humidity = data.current['humidity'];
            var windSpeed = data.current['wind_speed'];
            var uvIndex = data.current['uvi'];
            var currentCityData = document.createElement('div')
            currentCityData.className = 'currentCityData';
            var cityCurrentData = document.querySelector('.cityCurrentData');
            var cityName = document.createElement('h4');
            var temperature = document.createElement('p');
            var humid = document.createElement('p');
            var windSpeedo = document.createElement('p');
            var uvi = document.createElement('p');
            currentIcon = `<img src = http://openweathermap.org/img/wn/${icon}.png>`
            cityName.innerHTML = cityEntry + ': ' + '(' + moment().format('l') + ')' + currentIcon;
            temperature.textContent = 'Temperature: ' + temp + '°F';
            humid.textContent = 'Humidity: ' + humidity + '%';
            windSpeedo.textContent = 'Wind Speed: ' + windSpeed + ' MPH';
            var uvIndexe = document.createElement('span');
            uvIndexe.textContent = uvIndex;
            if (uvIndex<=2){
                $('uvi span').addClass('bg-success');
            }
            else if(uvIndex<=5){
                uvIndexe.className = 'bg-info';
            }
            else if(uvIndex<=7){
                uvIndexe.className = 'bg-warning';
            }
            else{
               $(this).addClass('bg-danger');
            }
            uvi.textContent = 'UV Index: ' + uvIndexe.innerHTML;
            cityCurrentData.appendChild(currentCityData);
            currentCityData.appendChild(cityName);
            currentCityData.appendChild(temperature);
            currentCityData.appendChild(humid);
            currentCityData.appendChild(windSpeedo);
            currentCityData.appendChild(uvi);
            forecastCityData(data);
        })
    })
}
var forecastCityData = function (data) {
     var allForecastData = $('.allForecastData');
     allForecastData.html("");
     var fiveDaysForecast = document.createElement('div');
     fiveDaysForecast.setAttribute('class', 'dayForecast');
    for (var i = 0; i < 5; i++) {
        var eachForecast = document.createElement('div');
        eachForecast.setAttribute('id', '#day' + i);
        eachForecast.setAttribute('class','dayForecast');
        console.log(eachForecast);
        var eachDate = document.createElement('h6');
        var eachIcon = document.createElement('p');
        var eachTemp = document.createElement('p');
        var eachHumidity = document.createElement('p');
        eachDate.textContent = moment().add(i + 1, 'days').format('l');
        eachIconn = data.daily[i].weather[0].icon;
        temperature = data.daily[i].temp['day'];
        eachTemp.textContent = 'Temp: ' + Math.round(((temperature - 273.15) * 1.8 + 32)) + '°F';
        eachHumidity.textContent = 'Humidity: ' + data.daily[i].humidity + '%';
        eachIcon.innerHTML = `<img src = http://openweathermap.org/img/wn/${eachIconn}.png>`
        eachForecast.appendChild(eachDate);
        eachForecast.appendChild(eachIcon);
        eachForecast.appendChild(eachTemp);
        eachForecast.appendChild(eachHumidity);
        allForecastData.append(eachForecast);
    } 
    loadCities();
}
var loadCities = function () {
    var cityList = JSON.parse(localStorage.getItem('city'));
    cityEntered = cityList;
    var cityDisplay = document.querySelector('.cityList');
    for (var i = 0; i < cityEntered.length; i++) {
        var listOfCities = document.createElement('button');
        listOfCities.textContent = cityEntered[i];
        listOfCities.setAttribute('data-list', cityEntered[i]);
        listOfCities.setAttribute('id', 'list' + i)
        listOfCities.setAttribute('class', 'list-group-item');
    }
    cityCounter++;
    if (cityEntered.length === cityCounter) {
        cityDisplay.appendChild(listOfCities);
    }else{
        cityCounter--;
    }
    
}