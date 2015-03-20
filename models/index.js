var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Place, Hotel, ThingToDo, Restaurant;
var Schema = mongoose.Schema;

var placeSchema = new Schema({
	address: String,
	city: String,
	state: String,
	phone: String,
	location: [Number]
});

var hotelSchema = new Schema({
	name: String,
	place: [placeSchema],
	num_stars: { type: Number, min: 1, max: 5},
	amenities: String
});

var thingToDoSchema = new Schema ({
	name: String,
	place: [placeSchema],
	age_range: String
});

var restaurantSchema = new Schema ({
	name: String,
	place: [placeSchema],
	cuisine: String,
	price: { type: Number, min: 1, max: 5 }
});

Place = mongoose.model('Place', placeSchema);
Hotel = mongoose.model('Hotel', hotelSchema);
ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { 	"Place": Place, 
					"Hotel": Hotel, 
					"ThingToDo": ThingToDo, 
					"Restaurant": Restaurant 
				};




