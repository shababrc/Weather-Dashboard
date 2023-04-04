//Wrap all code in a function that makes a call with jQuery
(function( $ ){

//setting a variable to hold our OpenWeather api key
//also getting a reference to the search button,previous cities button, search history container, and an
//empty array for search history    
var apiKey = "f99e2a464f88d0930785189c1421822e";
var searchBtn = $("#search-button");
var searchHistoryContainer = $("#search-history");
var searchHistory = [];


//adding an event listener for our search button, that calls
//our one day request, with any city search input
searchBtn.on('click', function(event){
    event.preventDefault();
    var inputVal = $("#search-input").val();
    oneDayRequest(inputVal);
    //using local storage to set our inputted cities into the
    //search history
     localStorage.setItem("cityHistory", inputVal);
     searchHistory.push(inputVal);
     renderSearchHistory();
});

//a function to render search history by creating buttons showing the searched cities
function renderSearchHistory(){
    searchHistoryContainer.innerHTML= '';
    for(i = 0; i < searchHistory.length; i++){
        var cityBtn = document.createElement("button");
        cityBtn.innerHTML= searchHistory[i];   
    }

    //adding an event listener to the 
    //history button so we can always go
    //back to the weather data of our cities
    //we previously searched
    cityBtn.addEventListener('click', function(event){
        event.preventDefault();
        var cityText = cityBtn.innerHTML;
        oneDayRequest(cityText);
        // console.log(cityText)
    });
    //appending our button to our search history container
    searchHistoryContainer.append(cityBtn);
};

    

//using the openweather url and inserting our apiKey variable to 
//fetch the weather data we need
function oneDayRequest(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)
        displayOneDay(data);
    //calling fiveDayRequest with the data recieved gives us the
    //weather data we want for the rest of the week 
    fiveDayRequest(data.coord.lat, data.coord.lon);
    });
}

//this is the same as above function except we are passing in
//latitude and longitude coordinates that the data from the API
//provides
function fiveDayRequest(lat, lon){
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiURL)
    .then((response) => response.json())
    .then((data) => displayFiveDays(data));
};

//This function will display our date, weather data, including
//temp, wind, and humidity in our card in html, by accessing the
//class/id names and changing the text of the divs to the data 
//provided by the OpenWeather API

function displayOneDay(data){
    var cityName = $("#city-name");
    var currentDate = dayjs().format("M/D/YYYY");
    cityName.text(data.name);
    $("#current-date").text(currentDate);
    $("#current-temp").text(data.main.temp + " Degrees");
    $("#current-wind").text(data.wind.speed + " MPH");
    $("#current-humidity").text(data.main.humidity + "%");
    //Getting the icon of the weather from our data, and adding
    //it to our HTML.
    var iconID = data.weather[0].icon;
    var iconURL = 'https://openweathermap.org/img/w/' + iconID + '.png'; 
    $("#weather-icon").attr("src", iconURL);
}


//This function will display five days of
//weather data just as it does above, but
//we must use data to parse through the dt
//info to get to the days, as 
//well as the correct time of day.

function displayFiveDays(data){
    // console.log(data);
    var fiveDaysContainer = document.querySelector("#five-days-container");
    var startTime = dayjs().add(1,"day").startOf("day").unix();
    var endTime = dayjs().add(6,"day").startOf("day").unix();
    // console.log(startTime);
    // console.log(endTime);
   
    //creating an html element in javascript
    //then looping through a list of days of
    //the week, and creating/populating a //card with all the weather info we need.

    var allcardElement = ``;
    for(var i = 0; i < data.list.length; i++){
        if(startTime <= data.list[i].dt && data.list[i].dt < endTime){
            if(data.list[i].dt_txt.slice(11,13) === "12"){
                var iconID = data.list[i].weather[0].icon;
                var iconURL = 'https://openweathermap.org/img/w/' + iconID + '.png'; 
                // console.log(iconURL);
                allcardElement += `<div class="card text-dark bg-light" id="day-container">
                <div class="card-header">
                  <span id = "city-name"></span>  <img width='50px' src='${iconURL}' id= "weather-icon" />
                </div>
                <div id = "city-weather" class="card-body">
                  <h5 class="card-title"> Date: ${dayjs(data.list[i].dt_txt).format("MM/D/YYYY")}</h5>
                  <p class="card-text">Temp: ${data.list[i].main.temp} Degrees</p>
                  <p class="card-text">Wind: ${data.list[i].wind.speed} MPH </p>
                  <p class="card-text">Humidity: ${data.list[i].main.humidity}%</p>
                </div>
              </div>` 
            }
        } 
    }   
    fiveDaysContainer.innerHTML = allcardElement;  
}
 })( jQuery );