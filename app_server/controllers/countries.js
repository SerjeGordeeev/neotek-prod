const mongoose = require("mongoose");
const Country = mongoose.model("Country");
const _ = require("lodash");
const createApi = require("./utils/createApi");

let countriesMethods = createApi(Country, "Страна");

module.exports = countriesMethods;