const mongoose = require("mongoose");
const multiparty = require('multiparty')
const Attachment = mongoose.model("Attachment");
const _ = require("lodash");
const fs = require ("fs");
const createApi = require("./utils/createApi");

let attachmentsMethods = createApi(Attachment, "Файл");

attachmentsMethods.create = function(req, res){
	var attachment = new Attachment();
	let form = new multiparty.Form();
	form.parse(req);
	form.on('file', function(name,file){
		attachment.url = `./attachments/${file.originalFilename}`;
		attachment.name = file.originalFilename;

		fs.renameSync(file.path, attachment.url, function(err) {
			if(err) console.error(err.stack);
		});

		return attachment.save().then(attachment=>{
			res.json(attachment);
		});
	})
};

attachmentsMethods.getFile = function(req, res){
	console.log(req.path)
	res.json({})
};

module.exports = attachmentsMethods;