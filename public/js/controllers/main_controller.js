angular.module('MainCtrl', [])
  .controller('mainController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {

    // showMenu
    $scope.showMenu = false;

    // various state emits - changes nav options
    $rootScope.$on('loggedInEmit', function(e, args) {
      $rootScope.loggedIn = args.loggedIn;
    });

    // sign up emit - changes nav options
    $rootScope.$on('signupViewEmit', function(e, args) {
      $rootScope.signupView = args.signupView;
      $rootScope.loginView = false;
    });

    // login emit - changes nav options
    $rootScope.$on('loginViewEmit', function(e, args) {
      $rootScope.loginView = args.loginView;
      $rootScope.signupView = false;
    });

    // profile emit - get profile details
    $rootScope.$on('profileEmit', function(e, args) {
      $rootScope.user = args.profile;
      //console.log($rootScope.user);
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
