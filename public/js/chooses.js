$(document).ready(function() {
	//select value from dropdown
	//click button 
	$('#buttonHotels').on("click", function() {
		$('#listHotels').append('<div class="itinerary-item"><span class="title">' + $('#selectHotels').val() + '</span><span class="remove"><button class="btn btn-danger btn-xs btn-circle pull-right">x</button></span></div>');
	})

	//search value in json object
	//return coordinate to map
	//add value to itinerary


	//remove button
	$('#listHotels').delegate('.remove', 'click', function () {
    	$(this).parent().remove();
	});

	var countDays = 1;
	//day button
	$("#itinButton").on("click", function() {
		$('.append-days').append('<button class="btn btn-circle day-btn">' + countDays + '</button>')
		countDays++;
	})
})