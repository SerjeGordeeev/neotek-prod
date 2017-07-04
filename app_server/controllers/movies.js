const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");
const _ = require("lodash");
const createApi = require("./utils/createApi");

let moviesMethods = createApi(Movie, "Фильм");

module.exports = moviesMethods;