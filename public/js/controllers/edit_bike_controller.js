angular.module('EditBikeCtrl', [])
  .controller('editBikeController', ['$scope', 'profileService', 'filepickerService', function($scope, profileService, filepickerService) {

    // upload bike image
    $scope.updateBikeImage = function() {
      filepickerService.pick({
        mimetype: 'image/*',
        language: 'en',
        services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH'],
        openTo: 'IMAGE_SEARCH'
      },
      function(Blob) {
        $scope.selectedBike.picture = Blob;
        $scope.$apply();
      });
    };

    // add bike to user record
    $scope.updateBike = function() {
      profileService.updateBike({
        bikeID: $scope.selectedBike._id,
        brand: $scope.selectedBike.brand,
        year: $scope.selectedBike.year,
        model: $scope.selectedBike.model,
        image: $scope.selectedBike.picture
      }).then(function(data) {

        $scope.selectedBike = {}; // clear out for any additions
        $scope.toggleUpdateBikeForm();
        $scope.dashboardInit();
      });
    };

  }]);
