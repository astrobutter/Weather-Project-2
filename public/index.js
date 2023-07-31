

async function getTime(city){
    const key = 'ey1i5vji/M3ImmgrxNIAQA==p1pAvQmQLkRpKoY9';
    var query = city;
    try{
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/worldtime?city=' + query,
            headers: { 'X-Api-Key': key},
            contentType: 'application/json',
            success: function(result) {
                var date = result.day;
                var day = result.day_of_week;
                var year = result.year;

                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var month = months[parseInt(result.month-1)];
    
                var current_time = date+' '+month+', '+year;
    
                $('.day').text(day);
                $('.date').text(current_time);
            },
        });
    }catch{
        console.log('Error getting time');
    }
}
async function checkweather(city){
    const query = city;
    const key = '9a37307e1b55c7a5ff58d169b3c9854f';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + key + '&units=metric';
    try{

        const response = await fetch(url);
        var weatherData = await response.json();
        
        var temperature = weatherData.main.temp;
        var wind = weatherData.wind.speed;
        var humidity = weatherData.main.humidity;
        var weather = weatherData.weather[0].main;
        var desc = weatherData.weather[0].description;
        var location = weatherData.name + ', '+ weatherData.sys.country;
        var weatherId = weatherData.weather[0].id;
        var icon = weatherData.weather[0].icon;
        var imgURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        var cardweatherdesc;
        
        if ( weatherId >= 200 && weatherId < 300){  cardweatherdesc='Thunderstorm'}
        else if( weatherId >= 300 && weatherId <500){   cardweatherdesc='Drizzle'}
        else if( weatherId >= 500 && weatherId < 600 ){ cardweatherdesc='Rain'}
        else if( weatherId >= 600 && weatherId < 700 ){ cardweatherdesc='Snow'}
        else if( weatherId >= 700 && weatherId < 800 ){ cardweatherdesc='Bad Atmosphere'}
        else if( weatherId == 800 ){   cardweatherdesc='Clear'}
        else if( weatherId > 800 && weatherId <= 804){  cardweatherdesc='Clouds'}
    
        $('.location').text(location);
        $('.temperature').text(temperature+'°C');
        $('.desc').text(cardweatherdesc);
        $('.humidity').text(humidity+' %');
        $('.wind').text(wind+' Km/h');
        $('.weather').text(weather);
        $('.text-desc').text(desc);
        $('.weather-icon').attr('src', imgURL);
    }
    catch{
        console.log('error')
    }
}

var query = $('.input-area').val();
if (!query){
    var query = 'tokyo';
    checkweather(query);
    getTime(query);
    setTimeout( function() {
        $('.info-box').addClass('open');
    }, 1500);
    setTimeout( function() {
        $('.info-box').addClass('close');
    }, 5000);
}
$('.search-button').click( function(e){
    var query = $('.input-area').val();
    checkweather(query);
    getTime(query);
    $('.input-area').value='';
})
