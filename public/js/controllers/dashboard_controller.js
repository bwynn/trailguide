angular.module('DashboardCtrl', [])
  .controller('dashboardController', ['$scope', '$rootScope', 'geolocation', 'googleMapsService', function($scope, $rootScope, geolocation, googleMapsService) {

    // set default state
    $scope.loggedIn = true;
    // emit logged in value to rootscope
    $scope.$emit('loggedInEmit', {loggedIn: true});
  }]);
