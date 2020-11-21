var apiKey = '32823741b8d73ffd72b5e88e55a0b391';
var currentApi = `https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=${apiKey}`

$("#searchCity").on("click",function(){
    fetch(currentApi).then(function(response){
        if (response.ok){
            var cityEntry = $('.cityEntry').val();
            console.log(cityEntry);
        }
    })
})