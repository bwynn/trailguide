angular.module('MainCtrl', [])
  .controller('mainController', ['$scope', '$rootScope', function($scope, $rootScope) {

    // showMenu
    $scope.showMenu = false;

    // various state emits
    $rootScope.$on('loggedInEmit', function(e, args) {
      $rootScope.loggedIn = args.loggedIn;
    });

    // toggle menu
    $scope.toggleMenu = function() {
      if ($scope.showMenu) {
        $scope.showMenu = false;
      } else if (!$scope.showMenu) {
        $scope.showMenu = true;
      } else {
        console.log("Toggle Menu failed.");
      }
    };

  }]);
