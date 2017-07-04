const express  = require("express");

require("./models/db");

require("./controllers/utils/common");

const rotesApi = require("./routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/",express.static(__dirname+"/../app_client"));

app.use("/api", rotesApi);
app.use("/attachments",express.static(__dirname+"/../attachments"));

module.exports = app;