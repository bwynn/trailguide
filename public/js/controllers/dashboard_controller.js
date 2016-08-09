angular.module('DashboardCtrl', [])
  .controller('dashboardController', ['$scope', '$rootScope', 'profileService', 'reviewService', 'trailService', 'filepickerService', function($scope, $rootScope, profileService, reviewService, trailService, filepickerService) {

    // set default state
    $scope.loggedIn = true;
    // emit logged in value to rootscope
    $scope.$emit('loggedInEmit', {loggedIn: true});

    // ADD BIKE FORM CONTROLS & STATES -----------------------------------------

    // default show bike form state
    $scope.showAddBikeForm = false;

    $scope.toggleAddBikeForm = function() {
      if ($scope.showAddBikeForm) {
        $scope.showAddBikeForm = false;
      }
      else {
        $scope.showAddBikeForm = true;
      }
    };

    // UPDATE BIKE FORM CONTROLS & STATES --------------------------------------

    // default form state
    $scope.editBikeForm = false;

    // toggle form
    $scope.toggleUpdateBikeForm = function(selectedBike) {

      $scope.selectedBike = selectedBike;
      console.log($scope.selectedBike);

      if ($scope.editBikeForm) {
        $scope.editBikeForm = false;
      }
      else {
        $scope.editBikeForm = true;
      }
    }

    // delete bike
    $scope.deleteBike = function(_bike) {
      console.log(_bike._id);
      profileService.deleteBike({
        bikeID: _bike._id
      }).then(function() {
        $scope.dashboardInit();
      });
    }

    // EDIT PROFILE FORM CONTROLS & STATES -------------------------------------
    $scope.editProfileForm = false;

    $scope.toggleProfileUpdateForm = function() {
      if ($scope.editProfileForm) {
        $scope.editProfileForm = false;
      }
      else {
        $scope.editProfileForm = true;
      }
    }

    // send current trail details up to rootscope,
    // this emit is used throughout when trails are selected
    $scope.setTrail = function(currentTrail) {
      $scope.$emit('setTrailEmit', {trail: currentTrail});
    };

    // ADD PROFILE IMAGE -------------------------------------------------------
    $scope.updateProfilePicture = function() {
       filepickerService.pick({
         mimetype: 'image/*',
         language: 'en',
         services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH'],
         openTo: 'IMAGE_SEARCH'
       },
       function(Blob) {
         $scope.user.profile.picture = Blob;
         $scope.$apply();

        profileService.updateProfilePicture({
          image: $scope.user.profile.picture,
          id: $scope.user._id
         }).then(function(data) {
          console.log(data);
          $scope.dashboardInit();
        });
      });
    };

    // INIT FUNCTIONS ----------------------------------------------------------

    $scope.dashboardInit = function() {
      // get profile - send to $rootScope
      profileService.getProfile().then(function(data) {
        // set user
        $scope.user = data.data;

        console.log($scope.user);

        $scope.$emit('profileEmit', {profile: $scope.user});
      }).then(function() {
        //get queried trails
        // for dev purposes, pulling all trails. this query
        // to be modified
        trailService.getAllTrails().then(function(data) {
          $scope.trails = data.data;

          console.log($scope.trails);
        }).then(function() {
          // get author reviews
          reviewService.getReviewByAuthor({
            authorID: $scope.user._id
          }).then(function(reviewData) {

            $scope.reviews = reviewData.data;

            console.log($scope.reviews);
          }).then(function() {

            // hang on to trail details
            $scope.reviewedTrails = [];

            // iterate through trails from authored reviews
            for (var i = 0; i < $scope.reviews.length; i++) {
              console.log($scope.reviews[i].trailID);
              trailService.getTrail({
                id: $scope.reviews[i].trailID
              }).then(function(trailData) {
                $scope.reviewedTrails.push(trailData);

                console.log($scope.reviewedTrails);
              });
            }
          });
        });
      });
    };

    $scope.dashboardInit();

  }]);
