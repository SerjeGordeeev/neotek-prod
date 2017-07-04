const mongoose = require("mongoose");
const Directors = mongoose.model("Directors");
const _ = require("lodash");
const createApi = require("./utils/createApi");

let directorsMethods = createApi(Directors, "Режиссер");

module.exports = directorsMethods;