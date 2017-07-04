const mongoose = require( "mongoose" );
const idPlugin = require('mongoose-id');

const movieSchema = new mongoose.Schema({
	name: {type: String, default: ""},
	filmDirectorsIds: {type: Array, default: []},
	genresIds: {type: Array, default: []},
	rating: {type: Number, default: null},
	actorsIds: {type: Array, default: []},
	previewImageId: {type: String, default: ""},
	description: {type: String, default: ""},
	year: {type: Number, default: null},
	countriesIds: {type: Array, default: []},
	budget: {type: String, default: ""}
});

movieSchema.plugin(idPlugin);
mongoose.model("Movie", movieSchema);
