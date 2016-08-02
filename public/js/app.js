angular.module('trailguideApp', ['ngRoute', 'ngAnimate', 'ui', 'angular-filepicker', 'geolocation', 'GoogleMapService', 'AdminService', 'ProfileService', 'QueryService', 'ReviewService', 'TrailService', 'AppRoutes', 'MainCtrl', 'DashboardCtrl', 'LoginCtrl', 'SignupCtrl', 'AboutCtrl', 'ContactCtrl', 'TrailQueryCtrl', 'TrailListCtrl', 'EditProfileCtrl', 'TrailDetailsCtrl', 'EditTrailCtrl', 'EditReviewCtrl', 'AddReviewCtrl', 'AddTrailCtrl', 'AddBikeCtrl'])
  .config(function(filepickerProvider) {
    // filepicker service provider - connects with filestack.io
    filepickerProvider.setKey('AK4B8xmmRRnOsYG8g3J4Lz');
  });
