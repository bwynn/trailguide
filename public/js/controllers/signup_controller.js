angular.module('SignupCtrl', [])
  .controller('signupController', ['$scope', '$rootScope', function($scope, $rootScope) {

    // set state value for logged in
    $scope.$emit('loggedInEmit', {loggedIn: false});
  }]);
