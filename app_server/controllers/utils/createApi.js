const _ = require("lodash");
const mongoose = require("mongoose");

module.exports = function(schema, entityName){
	let getList = function(req, res) {
		let queryParams = cleanQueryObj(req.query);

		if (queryParams.ids) {
			schema.find({
				'_id': { $in: [
					...queryParams.ids.split(",").map(id=>mongoose.Types.ObjectId(id))
				]}
			}).then(list=>{
				res.status(200);
				res.json(list)
			}).catch(err=>{
				dataError(res,err);
			});
		} else {
			let query = schema.find(queryParams);
			query.exec().then(list=>{
				res.status(200);
				res.json(list)
			}).catch(err=>{
				dataError(res,err);
			});
		}
	};

	let getOne = function(req, res) {
		schema.findById(req.params.id).exec()
			.then(item=>{
				res.status(200);
				res.json(item);
			})
			.catch()
	};

	 let remove = function(req, res) {

		schema.findById(req.params.id).exec()
			.then((org)=>{
				return org.remove()
			})
			.then(()=>{
				res.status(200);
				res.json({
					message: `Сущность типа '${entityName}' успешно удалена`
				})
			})
			.catch((err)=>{
				dataError(res,err)
			});
	};

	let create = function(req, res) {

		let item = new schema();

		_.assign(item, req.body);

		item.save()
			.then((newItem)=>{
				console.log(`Сущность типа '${entityName}' успешно создана`);
				res.status(200);
				res.json(newItem)
			})
			.catch((err)=>{
				dataError(res,err)
			});

	};

	let update = function(req, res) {

		let query = schema
			.findOneAndUpdate({_id: req.params.id}, req.body, {upsert:true})
			.exec();

		query.then((item)=>{
			console.log(`Сущность типа '${entityName}' успешно обновлена`);
			res.status(200);
			res.json(item)
		})
			.catch(err=>{
				dataError(res,err)
			});
	};

	return {
		getList,
		remove,
		create,
		update,
		getOne
	};
};
