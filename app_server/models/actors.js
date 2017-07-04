const mongoose = require( "mongoose" );
const idPlugin = require('mongoose-id');

const actorSchema = new mongoose.Schema({
	name: {type: String, default: ""}
});

actorSchema.plugin(idPlugin);
mongoose.model("Actor", actorSchema);
