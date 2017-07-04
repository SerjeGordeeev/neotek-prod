const mongoose = require( "mongoose" );
const idPlugin = require('mongoose-id');

const countrySchema = new mongoose.Schema({
	name: {type: String, default: ""}
});

countrySchema.plugin(idPlugin);
mongoose.model("Country", countrySchema);
