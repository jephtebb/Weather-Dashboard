var apiKey = '32823741b8d73ffd72b5e88e55a0b391';


$("#searchCity").on("click",function(){
    var cityEntry = $('.cityEntry').val();
    var cityEntry = cityEntry.toLowerCase().split(' ');
    for (var i = 0; i < cityEntry.length; i++) {
        cityEntry[i] = cityEntry[i].charAt(0).toUpperCase() + cityEntry[i].substring(1);     
    }
    cityEntry = cityEntry.join(' ');
    console.log(cityEntry);

    var currentApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntry}&appid=${apiKey}`
    fetch(currentApi).then(function(response){
        if (response.ok){
     
        }
    response.json().then(function(data){
        console.log(data);
        var longitude  = data.coord['lon'];
        var latitude = data.coord['lat'];
        console.log(longitude);
        console.log(latitude);
    })

})
})