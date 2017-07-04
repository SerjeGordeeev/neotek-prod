const mongoose = require( "mongoose" );
const idPlugin = require('mongoose-id');

const directorsSchema = new mongoose.Schema({
	name: {type: String, default: ""}
});

directorsSchema.plugin(idPlugin);
mongoose.model("Directors", directorsSchema);
