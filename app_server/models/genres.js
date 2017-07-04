const mongoose = require( "mongoose" );
const idPlugin = require('mongoose-id');

const genreSchema = new mongoose.Schema({
	name: {type: String, default: ""}
});

genreSchema.plugin(idPlugin);
mongoose.model("Genre", genreSchema);
