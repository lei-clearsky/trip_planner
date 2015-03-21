$(document).ready(function() {

  var countDays = 1;
  var currentDay = 1;
  var currentDayActivities = {};
  var currentDayMarkers = [];
  $('#day-title').hide();
  // map
  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705786,-74.007672);
  // set the map options hash
  var mapOptions = {
      center: myLatlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
      // styles: styleArr
  };
  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById("map-canvas");
  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);
  // Add the marker to the map
  var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Hello World!"
  });

  function drawLocation (location, opts) {
      if (typeof opts !== 'object') {
          opts = {}
      }
      opts.position = new google.maps.LatLng(location[0], location[1]);
      opts.map = map;
      var marker = new google.maps.Marker(opts);
      marker.setAnimation(google.maps.Animation.DROP);
      map.panTo(opts.position);
      currentDayMarkers.push(marker);
  }

  var removeMarker = function(locationName) {
    console.log(currentDayMarkers);
    currentDayMarkers.forEach(function(marker, index){
      if (marker.title + 'x'  == locationName) {
        marker.setMap(null);
        // remove from currentDayMarkers
        currentDayMarkers.splice(index, 1);
      }
    });  
  }

  var removeMarkers = function() {
    currentDayMarkers.forEach(function(marker) {
      marker.setMap(null);
    });
    console.log('remove marker');
    // remove all markers in currentDayMarkers array
    currentDayMarkers = [];
    console.log(currentDayMarkers);
  }  

  var setMarkers = function() {
    var location, locationName, iconImg;
    for (var key in currentDayActivities[currentDay]) {
      if (key === 'hotels'){
        iconImg = '/images/lodging_0star.png';
      }else if (key === 'restaurants'){
        iconImg = '/images/restaurant.png';
      }else {
        iconImg = '/images/star-3.png';
      }
      console.log(currentDayActivities[currentDay]);
      currentDayActivities[currentDay][key].forEach(function(el){
        locationName = el['name'];
        location = el['location'];
        drawLocation(location, {icon: iconImg, title: locationName});      
      });
    } 
  }  
  // find selected activity's longitude and latitude
  var findLocation = function(db, name) {
    var location;
    db.forEach(function(el) {
      if (el['name'] == name){
        location = el['place'][0]['location'];
      }
    });
    return location;
  }

  // adds the selected dropdown item to the itinerary (Hotels, Restaurants, and Things To Do)
  // var addDayActivity = function( listID, selectName, listName) {
  //   if ($('.day-btn').index()) {
  //     $('.append-days').append('<button class="btn btn-circle day-btn">' + countDays + '</button>')
  //     $('.day-btn').addClass('current-day');
  //     countDays++;
  //   }
  //   $(listID).append('<div class="itinerary-item"><span class="title">' + $(selectName).val() + '</span><span class="remove"><button class="btn btn-danger btn-xs btn-circle pull-right">x</button></span></div>');
  //   if (currentDayActivities[currentDay] === undefined) {
  //     currentDayActivities[currentDay] = {};
  //     currentDayActivities[currentDay][listName] = [];
  //   }
  //   else if (currentDayActivities[currentDay][listName] === undefined){
  //     currentDayActivities[currentDay][listName] = [];
  //   }
  //   var selectedThingsToDo =  $(selectName).val();
  //   var selectedThingsToDoLocation = findLocation(all_things_to_do, selectedThingsToDo);
  //   var thingsToDoData = {
  //     name: selectedThingsToDo,
  //     location: selectedThingsToDoLocation
  //   };
  //   currentDayActivities[currentDay][listName].push(thingsToDoData);
  // }

  var addFirstDay = function() {
    if ($('.day-btn').index()) {
      $('.append-days').append('<button class="btn btn-circle day-btn">' + countDays + '</button>')
      $('.day-btn:first-child').addClass('current-day');
      $('#itin-day').html(currentDay);
      $('#day-title').show();
      countDays++;
    }
  }

  var removeFirstDay = function() {
    if (countDays == 0) {
      $('#day-title').hide();
    }
  }

  $('#buttonHotels').on("click", function() {
    //addDayActivity('#listHotels', '#selectHotels', 'hotels');
    // adds day 1 button for first activity added
    addFirstDay();
    $('#listHotels').append('<div class="itinerary-item"><span class="title">' + $('#selectHotels').val() + '</span><span class="remove"><button class="btn btn-danger btn-xs btn-circle pull-right">x</button></span></div>');
    if (currentDayActivities[currentDay] === undefined) {
      currentDayActivities[currentDay] = {};
      currentDayActivities[currentDay]['hotels'] = [];
    }
    else if (currentDayActivities[currentDay]['hotels'] === undefined) {
      currentDayActivities[currentDay]['hotels'] = [];
    }     
    var selectedHotelName =  $('#selectHotels').val();
    var selectedHotelLocation = findLocation(all_hotels, selectedHotelName);
    var hotelData = {
      name: selectedHotelName,
      location: selectedHotelLocation
    };
    currentDayActivities[currentDay]['hotels'].push(hotelData);
    drawLocation(selectedHotelLocation, {icon: '/images/lodging_0star.png', title: selectedHotelName})
  })

  $('#buttonRestaurants').on("click", function() {
    //addDayActivity('#Restaurants', '#selectRestaurants', 'restaurants');

    if ($('.day-btn').index()) {
      $('.append-days').append('<button class="btn btn-circle day-btn">' + countDays + '</button>')
      $('.day-btn').addClass('current-day');
      $('#itin-day').html(currentDay);

      countDays++;
    }
    $('#listRestaurants').append('<div class="itinerary-item"><span class="title">' + $('#selectRestaurants').val() + '</span><span class="remove"><button class="btn btn-danger btn-xs btn-circle pull-right">x</button></span></div>');
    if (currentDayActivities[currentDay] === undefined) {
      currentDayActivities[currentDay] = {};
      currentDayActivities[currentDay]['restaurants'] = [];
    }
    else if (currentDayActivities[currentDay]['restaurants'] === undefined) {
      currentDayActivities[currentDay]['restaurants'] = [];     
    }
    var selectedRestaurantName =  $('#selectRestaurants').val();
    var selectedRestaurantLocation = findLocation(all_restaurants, selectedRestaurantName);
    var restaurantData = {
      name: selectedRestaurantName,
      location: selectedRestaurantLocation
    };
    currentDayActivities[currentDay]['restaurants'].push(restaurantData);
    drawLocation(selectedRestaurantLocation, {icon: '/images/restaurant.png', title: selectedRestaurantName});
  })

  $('#buttonThingsToDo').on("click", function() {
    //addDayActivity('#listThingsToDo', '#selectThingsToDo', 'thingsToDo');

    if ($('.day-btn').index()) {
      $('.append-days').append('<button class="btn btn-circle day-btn">' + countDays + '</button>')
      $('.day-btn').addClass('current-day');
      $('#itin-day').html(currentDay);
    
      countDays++;
    }
    $('#listThingsToDo').append('<div class="itinerary-item"><span class="title">' + $('#selectThingsToDo').val() + '</span><span class="remove"><button class="btn btn-danger btn-xs btn-circle pull-right">x</button></span></div>');
    if (currentDayActivities[currentDay] === undefined) {
      currentDayActivities[currentDay] = {};
      currentDayActivities[currentDay]['thingsToDo'] = [];
    }
    else if (currentDayActivities[currentDay]['thingsToDo'] === undefined){
      currentDayActivities[currentDay]['thingsToDo'] = [];
    }
    var selectedThingsToDo =  $('#selectThingsToDo').val();
    var selectedThingsToDoLocation = findLocation(all_things_to_do, selectedThingsToDo);
    var thingsToDoData = {
      name: selectedThingsToDo,
      location: selectedThingsToDoLocation
    };
    currentDayActivities[currentDay]['thingsToDo'].push(thingsToDoData);
    drawLocation(selectedThingsToDoLocation, {icon: '/images/star-3.png', title: selectedThingsToDo})
    console.log(currentDayMarkers);
  })

  // search object to remove function
  var searchObject = function(key, removeItem) {
    for (var item in currentDayActivities[currentDay]) {
      if (item === key) {
        for (var i = 0; i < currentDayActivities[currentDay][item].length; i++) {
          if (currentDayActivities[currentDay][item][i]['name'] + 'x' === removeItem) {
            var index = i;
            currentDayActivities[currentDay][item].splice(index, 1);
          }
        }
      }
    }
  }

  //remove button from the itinerary
  $('#listHotels').delegate('.remove', 'click', function () {
      $(this).parent().remove();
      var removedObject = $(this).parent()[0]['innerText'];
      searchObject('hotels', removedObject);
      removeMarker(removedObject);
      console.log(removedObject);
  });
  $('#listRestaurants').delegate('.remove', 'click', function () {
      $(this).parent().remove();
      var removedObject = $(this).parent()[0]['innerText'];
      searchObject('restaurants', removedObject);
      removeMarker(removedObject);
  });
  $('#listThingsToDo').delegate('.remove', 'click', function () {
      $(this).parent().remove();
      var removedObject = $(this).parent()[0]['innerText'];
      searchObject('thingsToDo', removedObject);
      removeMarker(removedObject);
   });
  
  // remove day
  $('#day-title .remove').on('click', function(){
    var removeDay = $(this).siblings('#itin-day').text();
    Object.getOwnPropertyNames(currentDayActivities[removeDay]).forEach(function(prop) {
      delete currentDayActivities[removeDay][prop];
    });
    $('.append-days .day-btn').eq(parseInt(removeDay)-1).trigger('click');
    
  });

  // remove day button
  $('#itinButtonRemove').on('click', function(){
    if ($('.append-days .day-btn:last-child')) {
      var removeDay = $('.append-days .day-btn:last-child').text();
      delete currentDayActivities[removeDay];
      $('.append-days .day-btn:last-child').remove();
      $('.append-days .day-btn:last-child').trigger('click');
    } else {
      delete currentDayActivities[1];
      $('#listHotels, #listRestaurants, #listThingsToDo').html('');
    }
    countDays--;
    console.log(countDays)
    removeFirstDay();

  });

  //add day button
  $("#itinButtonAdd").on("click", function() {
    $('.append-days').append('<button class="btn btn-circle day-btn">' + countDays + '</button>')
    countDays++;
  })

  // switch day
  $('.append-days').delegate('.day-btn', 'click', function() {
    $(this).siblings().removeClass('current-day');
    $(this).addClass('current-day');

    currentDay = $(this).text();
    $('#itin-day').html(currentDay);

    $('#listHotels, #listRestaurants, #listThingsToDo').html('');
    if(currentDayActivities[currentDay]) {
      if(currentDayActivities[currentDay]['hotels']) {
        for (var i = 0; i < currentDayActivities[currentDay]['hotels'].length; i++ ) {
          $('#listHotels').append('<div class="itinerary-item"><span class="title">' + currentDayActivities[currentDay]['hotels'][i]['name'] + '</span><span class="remove"><button class="btn btn-danger btn-xs btn-circle pull-right">x</button></span></div>');
        }
      }
      if(currentDayActivities[currentDay]['restaurants']) {
        for (var i = 0; i < currentDayActivities[currentDay]['restaurants'].length; i++ ) {
          $('#listRestaurants').append('<div class="itinerary-item"><span class="title">' + currentDayActivities[currentDay]['restaurants'][i]['name'] + '</span><span class="remove"><button class="btn btn-danger btn-xs btn-circle pull-right">x</button></span></div>');
        }
      }
      if(currentDayActivities[currentDay]['thingsToDo']) {
        for (var i = 0; i < currentDayActivities[currentDay]['thingsToDo'].length; i++ ) {
          $('#listThingsToDo').append('<div class="itinerary-item"><span class="title">' + currentDayActivities[currentDay]['thingsToDo'][i]['name'] + '</span><span class="remove"><button class="btn btn-danger btn-xs btn-circle pull-right">x</button></span></div>');
        }
      }
      removeMarkers();
      setMarkers();
    }else{
      removeMarkers();
    }
  });

})
