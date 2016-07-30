angular.module('DashboardCtrl', [])
  .controller('dashboardController', ['$scope', '$rootScope', 'googleMapService', 'geolocation', function($scope, $rootScope, googleMapService, geolocation) {

    $scope.lat = 33;
    $scope.long = -82;
    // set default state
    $scope.loggedIn = true;
    // emit logged in value to rootscope
    $scope.$emit('loggedInEmit', {loggedIn: true});

    googleMapService.refresh($scope.lat, $scope.long);

    geolocation.getLocation().then(function(data) {
      // set the lat and long to override the current default coords
      coords = {
        lat: data.coords.latitude,
        long: data.coords.longitude
      };

      $scope.lat = parseFloat(coords.lat).toFixed(3);
      $scope.long = parseFloat(coords.long).toFixed(3);

      googleMapService.refresh($scope.lat, $scope.long);
    });

  }]);
