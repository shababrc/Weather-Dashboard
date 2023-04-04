# Weather Dashboard

## Description
A simple weather app for viewing future and current
forecasts. A user can enter the name of a city and will be presented with neatly organized cards showing the current day's weather, including detailed information like temperature in fahrenheit, wind speed in mph, and humidity percentage. Also, we can see the same information 
for the next five days of weather. The user's searches are saved as buttons, which can be clicked to show that previous searches weather
again. 



## User Story
```md
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria
```md
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```


## How we accomplished this

## By:

### in HTML: 
    We created a search button to take in a city
    name and an input field. We also added a search
    history div.
    We added paragraph elements in our one day container containing spans with ids for city name, weather icon, date, and most importantly Temp, Wind, and Humidity.
    We made the five-days-container completely empty, as we had to use javascript to create
    cards in it.

### in JavaScript:
    Wrap all code in a function that makes a call with jQuery
    set a variable to hold our OpenWeather api key
    Also getting a reference to the search button,previous cities button, search history container, and creating an empty array for search history.
    Adding an event listener for our search button, that calls our one day request, with any city search input. 
    Using local storage to set our inputted cities into the search history.
    Adding a function to render search history by creating buttons showing the searched cities.
    Adding an event listener to the 
    history button so we can always go
    back to the weather data of our cities
    we previously searched.
    Appending our button to our search history container.
    Using the openweather url and inserting our apiKey variable to fetch the weather data we need. Calling fiveDayRequest with the data recieved in our OneDayRequest gives us the
    weather data we want for the rest of the week.
    The fiveDayRequest function is the same as above function except we are passing in
    latitude and longitude coordinates that the data from the API provides.
    Adding a function that will display our date, weather data, including temp, wind, and humidity in our card in html, by accessing the class/id names and changing the text of the divs to the data provided by the OpenWeather API.
    Also we are getting the icon of the weather from our data, and adding it to our HTML.
    DisplayFiveDays function that will display five days of weather data just as it does above, butwe must use data to parse through the dt info to get to the days, as 
    well as the correct time of day.
    We creating a bootstrap card element in javascript then we are looping through a list of days of the week, and creating/populating a card with all the weather info we need.



## Completed Application Screenshots 

## Link to Github Repo:
https://github.com/shababrc/Weather-Dashboard

## Link to Deployed Site:

## Credits
Credits to the rest of the ucla bootcamp class for help on this assignment. Credit to Bryan and Shawn from the teaching staff. Major credits to tutors Jehyun Jung, Irina Kudosova, and Sheetal Srikumar.

## License
MIT
