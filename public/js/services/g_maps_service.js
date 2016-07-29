angular.module('GoogleMapsService', [])
  .factory('googleMapsService', ['$http', function($http) {

    const googleMapsService = {},
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

    const convertToMapPoints = function(response) {

      // clear locations
      const locations = [];

      // iterate through trail coords to populate in view
      for (let i = 0; i < response.length; i++) {
        const trail = response[i];

        // popup window
        const contentString =
              '<p><b>Trail Name</b>: ' + trail.title +
              '<br><b>Nearest City</b>: ' + trail.city +
              '<br><b>Rating</b>: ' + trail.rating +
              '</p>';
      }
    };
  }]);
