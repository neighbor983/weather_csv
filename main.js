const axios = require("axios");
const config = require('./config');

const BASE_URL = 'https://api.darksky.net/forecast/';
const DARKSKY_API_KEY =config.darkSkyApiKey;
const latitude = config.latitude;
const longitude = config.longitude;

axios.get(BASE_URL + DARKSKY_API_KEY + '/' + latitude + ',' + longitude)
  .then(function(response) {
    console.log('data',response.data);
    console.log('status',response.status);
  });