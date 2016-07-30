angular.module('GoogleMapService', [])
  .factory('googleMapService', ['$http', function($http) {

    var googleMapsService = {},
          locations = [],
          selectedLat = 38,
          selectedLong = -122;

          googleMapsService.clickLat = 0,
          googleMapsService.clickLong = 0;

    // refresh map with new data
    googleMapsService.refresh = function(latitude, longitude) {

        // reset coords array
        locations = [];

        // set the new lat and long
        selectedLat = latitude;
        selectedLong = longitude;

        $http.get('/get_all_trails').then(function(data) {

          //console.log(data);

          locations = convertToMapPoints(data.data);

        }, function(rejected) {
          console.log(rejected);
        }).then(function() {
          // initialize map
          initialize(latitude, longitude);
        });
    };

    var convertToMapPoints = function(response) {
      console.log("we made it this far");

      // clear locations
      var locations = [];

      // iterate through trail coords to populate in view
      for (var i = 0; i < response.length; i++) {
        var trail = response[i];

        //console.log(trail);
        // popup window
        var contentString =
              '<p><b>Trail Name</b>: ' + trail.title +
              '<br><b>Nearest City</b>: ' + trail.city +
              '<br><b>Rating</b>: ' + trail.rating +
              '</p>';

        locations.push({
          latlon: new google.maps.LatLng(trail.coords.lat, trail.coords.lng),
          message: new google.maps.InfoWindow({
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

        //console.log(myLatLng);

        // if map hasn't been initialized yet
        if (!map) {
          // create a new map and place it
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
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

        // function for moving to a selected location
        map.panTo(new google.maps.LatLng(latitude, longitude));

        // clicking on map moves red marker
        google.maps.event.addListener(map, "click", function(e) {
          var marker = new google.maps.Marker({
            position: e.latLng,
            map: map,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          });

          if (lastMarker) {
            lastMarker.setMap(null);
          }

          lastMarker = marker;
          map.panTo(marker.position);
        });
    };

    // refresh on window load
    google.maps.event.addDomListener(window, 'load', googleMapsService.refresh(selectedLat, selectedLong));

    return googleMapsService;

  }]);
