angular.module('DashboardCtrl', [])
  .controller('dashboardController', ['$scope', '$rootScope', 'profileService', 'reviewService', 'trailService', function($scope, $rootScope, profileService, reviewService, trailService) {

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

    // send current trail details up to rootscope,
    // this emit is used throughout when trails are selected
    $scope.setTrail = function(currentTrail) {
      $scope.$emit('setTrailEmit', {trail: currentTrail});
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
