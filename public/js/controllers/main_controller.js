angular.module('MainCtrl', [])
  .controller('mainController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {

    // showMenu
    $scope.showMenu = false;

    // various state emits
    $rootScope.$on('loggedInEmit', function(e, args) {
      $rootScope.loggedIn = args.loggedIn;
    });

    $rootScope.$on('signupViewEmit', function(e, args) {
      $rootScope.signupView = args.signupView;
      $rootScope.loginView = false;
    });

    $rootScope.$on('loginViewEmit', function(e, args) {
      $rootScope.loginView = args.loginView;
      $rootScope.signupView = false;
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
