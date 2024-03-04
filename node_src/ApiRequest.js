const axios = require("axios");
require("dotenv").config();

const cloudECG_URL = process.env.CloudECG_URL;

const api = axios.create({
    baseURL: cloudECG_URL
});

module.exports = api;