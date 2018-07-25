const axios = require("axios");
const config = require('./config');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

let startDateString = '2018-07-22';
let endDateString = '2018-07-23';

const NEW_LINE = "\r\n";
const startDate = new Date(startDateString);
const endDate = new Date(endDateString);
const fileName = 'WeatherData' + startDateString + 'to' + endDateString 
                  + 'at' + new Date().getTime() + '.csv';
const fields = [
  "time",
  "summary",
  "icon",
  "sunriseTime",
  "sunsetTime",
  "moonPhase",
  "precipIntensity",
  "precipIntensityMax",
  "precipIntensityMaxTime",
  "precipProbability",
  "precipType",
  "temperatureHigh",
  "temperatureHighTime",
  "temperatureLow",
  "temperatureLowTime",
  "apparentTemperatureHigh",
  "apparentTemperatureHighTime",
  "apparentTemperatureLow",
  "apparentTemperatureLowTime",
  "dewPoint",
  "humidity",
  "pressure",
  "windSpeed",
  "windGust",
  "windGustTime",
  "windBearing",
  "cloudCover",
  "uvIndex",
  "uvIndexTime",
  "visibility",
  "ozone",
  "temperatureMin",
  "temperatureMinTime",
  "temperatureMax",
  "temperatureMaxTime",
  "apparentTemperatureMin",
  "apparentTemperatureMinTime",
  "apparentTemperatureMax",
  "apparentTemperatureMaxTime"
];

const opts = { fields, header: false };

fs.writeFile(fileName, fields + NEW_LINE, 'utf8', function(err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else {
    console.log('It\'s saved!');
  }
});

const BASE_URL = 'https://api.darksky.net/forecast/';
const DARKSKY_API_KEY = config.darkSkyApiKey;
const latitude = config.latitude;
const longitude = config.longitude;

const parser = new Json2csvParser(opts);
let timeCounter = startDate;

do {
  timeCounter = addDays(timeCounter, 1);
  let timeString = convertTimeStamp(timeCounter);

  axios.get(BASE_URL + DARKSKY_API_KEY + '/' + latitude +
      ',' + longitude + ',' + timeString +
      '?exclude=currently,minutely,hourly,flags')
    .then(function(response) {
      addDailyWeatherRecord(response.data, parser, NEW_LINE);
    });
}
while (timeCounter <= endDate);

function addDays(beginDate, numberOfDays) {
  let resultDate = new Date(
    beginDate.getFullYear(),
    beginDate.getMonth(),
    beginDate.getDate() + numberOfDays,
    beginDate.getHours(),
    beginDate.getMinutes(),
    beginDate.getSeconds()
  );
  return resultDate;
}

function convertMonth(monthValue) {
  let newMonth = monthValue + 1;
  if (newMonth < 10) {
    return '0' + newMonth;
  }
  else {
    return newMonth;
  }
}

function convertDay(dayValue) {
  if (dayValue < 10) {
    return '0' + dayValue;
  }
  else {
    return dayValue;
  }
}

function convertTimeStamp(dateTimeStamp) {
  let timeStamp = dateTimeStamp.getFullYear() + '-' +
    convertMonth(dateTimeStamp.getMonth()) + '-' +
    convertDay(dateTimeStamp.getDate()) +
    'T00:00:00';

  return timeStamp;
}

function addDailyWeatherRecord(data, parser, NEW_LINE){
  let locationInformation = data;
  let dailyWeather = locationInformation.daily.data[0];

  fs.appendFile(fileName, parser.parse(dailyWeather) + NEW_LINE, function(err) {
    if (err) throw err;
      console.log('The "data to append" was appended to file!');
  });
}
