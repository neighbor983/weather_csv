const axios = require("axios");
const config = require('./config');

const BASE_URL = 'https://api.darksky.net/forecast/';
const DARKSKY_API_KEY =config.darkSkyApiKey;
const latitude = config.latitude;
const longitude = config.longitude;

//24 hr/day * 60 min/day * 60 secs/min * 1000 sec/msec 
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

let startDateString ='2017-01-01';
const startDate = new Date(startDateString).getTime();

let endDateString ='2017-01-03';
const endDate= new Date(endDateString).getTime();

let timeCounter = startDate;

do {
    console.log('timeCounter:',timeCounter);
    timeCounter = timeCounter + MILLISECONDS_PER_DAY;
    
    /*
    axios.get(BASE_URL + DARKSKY_API_KEY + '/' + latitude 
              + ',' + longitude + ',' + timeCounter + 
              '?exclude=currently,minutely,hourly,flags')
      .then(function(response) {
        console.log('data',response.data);
      }
    );
  */
  
}
while( timeCounter <= endDate);
