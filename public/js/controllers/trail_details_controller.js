angular.module('TrailDetailsCtrl', [])
  .controller('trailDetailsController', ['$scope', '$rootScope', 'reviewService', '$location', '$anchorScroll', function($scope, $rootScope, reviewService, $location, $anchorScroll) {

    // default state for form
    $scope.addReviewForm = false;

    // watch rootscope to determine trail id
    $scope.$watch(function() {
      return $rootScope.currentTrail;
    }, function() {
      $scope.trail = $rootScope.currentTrail;
      //console.log($scope.trail);
    });

    // emit trail detail controller to root scope to set child view values
    $scope.$emit('trailDetailEmit');

    // toggle form view
    $scope.showReviewForm = function() {
      if (!$scope.addReviewForm) {

        // set form state to true
        $scope.addReviewForm = true;
        console.log($scope.addReviewForm);
      }
      else {
        $scope.addReviewForm = false;
        console.log($scope.addReviewForm);
      }

      return $scope.addReviewForm;
    };

    $scope.$watch('addReviewForm', function() {
      // set element anchor point for form control
      $location.hash('form-anchor');
      // scroll to anchor point
      $anchorScroll();
    });

    reviewService.getReviewsByTrail({
      trailID: $scope.currentTrail._id
    }).then(function(data) {
      $scope.reviews = data.data;
      $scope.totalReviews = $scope.reviews.length;

      console.log($scope.reviews);
      console.log("Total Reviews: " + $scope.totalReviews);
    });

  }]);
