angular.module('ReviewService', [])
  .factory('reviewService', ['$http', function($http) {
    return {
      getReviews: function() {
        return $http.get('/get_reviews');
      },
      getReviewsByAuthor: function(data) {
        return $http.post('/get_review_author', data);
      },
      getReviewsByTrail: function(data) {
        return $http.post('/get_review_trail', data);
      },
      getReviewByID: function(data) {
        return $http.post('/get_review', data);
      },
      addReview: function(data) {
        return $http.post('/add_review', data);
      },
      updateReview: function(data) {
        return $http.put('/update_review', data);
      },
      deleteReview: function(data) {
        return $http.put('/delete_review', data);
      },
      addReviewPictures: function(data) {
        return $http.put('/add_review_pictures', data);
      }
    };
  }]);
