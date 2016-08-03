angular.module('TrailDetailsCtrl', [])
  .controller('trailDetailsController', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.$watch(function() {
      return $rootScope.currentTrail;
    }, function() {
      $scope.trail = $rootScope.currentTrail;
    });

  }]);
