const express = require('express');
const router = express.Router();

["movies", "genres", "countries",
"directors", "actors", "attachments"]
.map(path =>{
	let api = require('../controllers/' + path);

	router.get(`/${path}`, api.getList);
	router.get(`/${path}/:id`, api.getOne);
	router.post(`/${path}`, api.create);
	router.delete(`/${path}/:id`, api.remove);
	router.put(`/${path}/:id`, api.update);
});

module.exports = router;
