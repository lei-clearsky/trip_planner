var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', function(req, res, next) {
	models.Hotel.find( {}, function(err, hotels) {
		models.Restaurant.find( {}, function(err, restaurants) {
			models.ThingToDo.find( {}, function(err, thingsToDo) {
				res.render('index', {
					all_hotels: hotels,
					all_restaurants: restaurants,
					all_thigs_to_do: thingsToDo
				})
			})
		})
	})
})


module.exports = router;