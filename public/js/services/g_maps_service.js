angular.module('GoogleMapsService', [])
  .factory('googleMapsService', ['$http', function($http) {

    var googleMapsService = {},
          locations = [],
          selectedLat = 39.5,
          selectedLong = -98.35;

    // refresh map with new data
    googleMapsService.refresh = function(latitude, longitude) {

        // reset coords array
        locations = [];

        // set the new lat and long
        selectedLat = latitude;
        selectedLong = longitude;

        $http.get('/get_all_trails').then(function(data) {

          locations = convertToMapPoints(data);

          // initialize map
          initialize(latitude, longitude);
        }, function(rejected) {
          console.log(rejected);
        });
    };

    var convertToMapPoints = function(response) {

      // clear locations
      var locations = [];

      // iterate through trail coords to populate in view
      for (var i = 0; i < response.length; i++) {
        var trail = response[i];

        // popup window
        var contentString =
              '<p><b>Trail Name</b>: ' + trail.title +
              '<br><b>Nearest City</b>: ' + trail.city +
              '<br><b>Rating</b>: ' + trail.rating +
              '</p>';

        locations.push({
          latlon = new google.maps.LatLng(trail.location[1], trail.location[0]),
          message = new google.maps.InfoWindow({
             content: contentString,
             maxWidth: 320
          }),
          title: trail.title,
          city: trail.city,
          rating: trail.rating
        });
      }
      return locations;
    };

    // initialize map
    var initialize = function(latitude, longitude) {

        var myLatLng = {lat: selectedLat, lng: selectedLong};

        // if map hasn't been initialized yet
        if (!map) {
          // create a new map and place it
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: myLatLng
          });
        }

        // loop through each trail location in array
        locations.forEach(function(n, i) {
          var marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: "Big Map",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          });

          // for each marker created, add listener
          google.maps.event.addListener(marker, "click", function(e) {
            // when clicked, display window
            currentSelectedMarker = n;
            n.message.open(map, marker);
          });
        });

        // set initial location
        var initialLocation = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
          position: initialLocation,
          map: map,
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });

        lastMarker = marker;
    };

    // refresh on window load
    google.maps.event.addDomListener(window, 'load', googleMapsService.refresh(selectedLat, selectedLong));

    return googleMapsService;

  }]);
