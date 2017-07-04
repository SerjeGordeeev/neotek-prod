const mongoose = require( "mongoose" );
const idPlugin = require('mongoose-id');

const attachmentSchema = new mongoose.Schema({
	name: String,
	url: {type: String, default: ""}
});

attachmentSchema.plugin(idPlugin);
mongoose.model("Attachment", attachmentSchema);
