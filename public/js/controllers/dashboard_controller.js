angular.module('DashboardCtrl', [])
  .controller('dashboardController', ['$scope', '$rootScope', 'googleMapService', 'uiGmapGoogleMapApi',  function($scope, $rootScope, googleMapService, uiGmapGoogleMapApi) {

    // set default state
    $scope.loggedIn = true;
    // emit logged in value to rootscope
    $scope.$emit('loggedInEmit', {loggedIn: true});

    /*$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };*/

    /*uiGmapGoogleMapApi.then(function(maps) {

    });*/
  }]);
