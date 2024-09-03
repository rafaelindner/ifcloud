const axios = require("axios");
require("dotenv").config();

const cloudECG_URL = process.env.FHIR_API_URL;

const api = axios.create({
    baseURL: cloudECG_URL
});

module.exports = api;