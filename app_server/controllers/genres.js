const mongoose = require("mongoose");
const Genre = mongoose.model("Genre");
const _ = require("lodash");
const createApi = require("./utils/createApi");

let genresMethods = createApi(Genre, "Жанр");

module.exports = genresMethods;