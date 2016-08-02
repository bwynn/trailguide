angular.module('DashboardCtrl', [])
  .controller('dashboardController', ['$scope', '$rootScope', 'profileService', 'reviewService', 'trailService', function($scope, $rootScope, profileService, reviewService, trailService) {

    // set default state
    $scope.loggedIn = true;
    // emit logged in value to rootscope
    $scope.$emit('loggedInEmit', {loggedIn: true});

    // get profile - send to $rootScope
    profileService.getProfile().then(function(data) {
      // set user
      $scope.user = data.data;

      $scope.$emit('profileEmit', {profile: $scope.user});
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

  }]);
