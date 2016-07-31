angular.module('DashboardCtrl', [])
  .controller('dashboardController', ['$scope', '$rootScope', function($scope, $rootScope) {

    // set default state
    $scope.loggedIn = true;
    // emit logged in value to rootscope
    $scope.$emit('loggedInEmit', {loggedIn: true});

  }]);
