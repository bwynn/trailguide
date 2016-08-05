angular.module('EditProfileCtrl', [])
  .controller('editProfileController', ['$scope', '$rootScope', 'profileService', function($scope, $rootScope, profileService) {

    $scope.updateProfile = function(userDetails) {

      profileService.editProfile({
        zipcode: userDetails.location.zipcode,
        city: userDetails.location.city,
        username: userDetails.profile.username,
        firstname: userDetails.profile.firstname,
        lastname: userDetails.profile.lastname
        //coords: userDetails.profile.coords
      }).then(function(data) {
        console.log(data);
        profileService.editFitnessLevel({
          fitnessLevel: userDetails.fitness.fitnessLevel,
          skillLevel: userDetails.fitness.skillLevel,
          preference: userDetails.fitness.preference
        }).then(function(fitnessData) {
          console.log(fitnessData);

          $scope.$emit('profileEmit', {profile: userDetails});
          $scope.toggleProfileUpdateForm();
          $scope.dashboardInit();
        });
      });
    };
  }]);
