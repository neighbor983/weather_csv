const csv = require('csvtojson');
const Json2csvParser = require('json2csv').Parser;

const NEW_LINE = "\r\n";
const csvFilePath = './WeatherData2013-11-14to2013-12-29at1532980899212.csv';
const fs = require('fs');

let fileName = 'test.csv';

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
const parser = new Json2csvParser(opts);

let myData = [];

csv()
    .fromFile(csvFilePath)
    .then((data) => {
        for (var index = 0; index < data.length; index++) {
            myData.push(
                new dailyWeatherRecord(data[index]['time'],
                    data[index]['summary'], data[index]['icon'],
                    data[index]['sunriseTime'], data[index]['sunsetTime'],
                    data[index]['moonPhase'], data[index]['precipIntensity'],
                    data[index]['precipIntensityMax'], data[index]['precipIntensityMaxTime'],
                    data[index]['precipProbability'], data[index]['precipType'],
                    data[index]['temperatureHigh'], data[index]['temperatureHighTime'],
                    data[index]['temperatureLow'], data[index]['temperatureLowTime'],
                    data[index]['apparentTemperatureHigh'], data[index]['apparentTemperatureHighTime'],
                    data[index]['apparentTemperatureLow'], data[index]['apparentTemperatureLowTime'],
                    data[index]['dewPoint'], data[index]['humidity'],
                    data[index]['pressure'], data[index]['windSpeed'],
                    data[index]['windGust'],
                    data[index]['windGustTime'], data[index]['windBearing'],
                    data[index]['cloudCover'],
                    data[index]['uvIndex'], data[index]['uvIndexTime'], data[index]['visibility'],
                    data[index]['ozone'], data[index]['temperatureMin'], data[index]['temperatureMinTime'],
                    data[index]['temperatureMax'], data[index]['temperatureMaxTime'],
                    data[index]['apparentTemperatureMin'],
                    data[index]['apparentTemperatureMinTime'],
                    data[index]['apparentTemperatureMax'],
                    data[index]['apparentTemperatureMaxTime']));
        }

        myData.sort(compare);
        
        fs.writeFile(fileName, fields + NEW_LINE, 'utf8', function(err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            }
            else {
                console.log('It\'s saved!');
                fs.appendFile(fileName, parser.parse(myData) + NEW_LINE, function(err) {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });
            }
        });

    });







function compare(a, b) {
    if (a.temperatureMaxTime < b.temperatureMaxTime)
        return -1;
    if (a.temperatureMaxTime > b.temperatureMaxTime)
        return 1;
    return 0;
}

function dailyWeatherRecord(time, summary, icon, sunriseTime,
    sunsetTime, moonPhase, precipIntensity,
    precipIntensityMax, precipIntensityMaxTime,
    precipProbability, precipType, temperatureHigh,
    temperatureHighTime, temperatureLow, temperatureLowTime,
    apparentTemperatureHigh, apparentTemperatureHighTime,
    apparentTemperatureLow, apparentTemperatureLowTime, dewPoint,
    humidity, pressure, windSpeed, windGust, windGustTime,
    windBearing, cloudCover, uvIndex, uvIndexTime,
    visibility, ozone, temperatureMin, temperatureMinTime,
    temperatureMax, temperatureMaxTime, apparentTemperatureMin,
    apparentTemperatureMinTime, apparentTemperatureMax,
    apparentTemperatureMaxTime) {
    this.time = time;
    this.summary = summary;
    this.icon = icon;
    this.sunriseTime = sunriseTime;
    this.sunsetTime = sunsetTime;
    this.moonPhase = moonPhase;
    this.precipIntensity = precipIntensity;
    this.precipIntensityMax = precipIntensityMax;
    this.precipIntensityMaxTime = precipIntensityMaxTime;
    this.precipProbability = precipProbability;
    this.precipType = precipType;
    this.temperatureHigh = temperatureHigh;
    this.temperatureHighTime = temperatureHighTime;
    this.temperatureLow = temperatureLow;
    this.temperatureLowTime = temperatureLowTime;
    this.apparentTemperatureHigh = apparentTemperatureHigh;
    this.apparentTemperatureHighTime = apparentTemperatureHighTime;
    this.apparentTemperatureLow = apparentTemperatureLow;
    this.apparentTemperatureLowTime = apparentTemperatureLowTime;
    this.dewPoint = dewPoint;
    this.humidity = humidity;
    this.pressure = pressure;
    this.windSpeed = windSpeed;
    this.windGust = windGust;
    this.windGustTime = windGustTime;
    this.windBearing = windBearing;
    this.cloudCover = cloudCover;
    this.uvIndex = uvIndex;
    this.uvIndexTime = uvIndexTime;
    this.visibility = visibility;
    this.ozone = ozone;
    this.temperatureMin = this.temperatureMin;
    this.temperatureMinTime = temperatureMinTime;
    this.temperatureMax = temperatureMax;
    this.temperatureMaxTime = temperatureMaxTime;
    this.apparentTemperatureMin = apparentTemperatureMin;
    this.apparentTemperatureMinTime = apparentTemperatureMinTime;
    this.apparentTemperatureMax = apparentTemperatureMax;
    this.apparentTemperatureMaxTime = apparentTemperatureMaxTime;
};
