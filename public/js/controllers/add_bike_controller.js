angular.module('AddBikeCtrl', [])
  .controller('addBikeController', ['$scope', '$rootScope', 'profileService', 'filepickerService', function($scope, $rootScope, profileService, filepickerService) {

    $scope.bike = {};

    // upload bike image
    $scope.addBikeImage = function() {
      filepickerService.pick({
        mimetype: 'image/*',
        language: 'en',
        services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH'],
        openTo: 'IMAGE_SEARCH'
      },
      function(Blob) {
        $scope.bike.bikeImage = Blob;
        $scope.$apply();
      });
    };

    // add bike to user record
    $scope.addBike = function() {
      profileService.addBike({
        brand: $scope.bike.brand,
        year: $scope.bike.year,
        model: $scope.bike.model,
        image: $scope.bike.bikeImage
      }).then(function(data) {
        $scope.$emit('newBikeAddedEmit', {bike: $scope.bike});

        $scope.bike = {}; // clear out for any additions
        $scope.showAddBikeForm = false;
      });
    };

  }]);
