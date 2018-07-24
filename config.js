require('dotenv').config();

const config = {
    latitude: process.env.LATITUDE,
    longitude: process.env.LONGITUDE,
    darkSkyApiKey: process.env.DARK_SKY_API_KEY
};

module.exports = config;
