const mongoose = require("mongoose");
const Actor = mongoose.model("Actor");
const _ = require("lodash");
const createApi = require("./utils/createApi");

let actorsMethods = createApi(Actor, "Актер");

module.exports = actorsMethods;