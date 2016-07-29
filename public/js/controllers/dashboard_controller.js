angular.module('DashboardCtrl', [])
  .controller('dashboardController', ['$scope', '$rootScope', 'geolocation', 'googleMapService', function($scope, $rootScope, geolocation, googleMapService) {

    // set default state
    $scope.loggedIn = true;
    // emit logged in value to rootscope
    $scope.$emit('loggedInEmit', {loggedIn: true});
  }]);
