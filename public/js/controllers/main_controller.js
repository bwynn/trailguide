angular.module('MainCtrl', [])
  .controller('mainController', ['$scope', '$rootScope', function($scope, $rootScope) {

    $rootScope.$on('loggedInEmit', function(e, args) {
      $rootScope.loggedIn = args.loggedIn;
    });
  }]);
