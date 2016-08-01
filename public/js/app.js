angular.module('trailguideApp', ['ngRoute', 'ngAnimate', 'ui', 'angular-filepicker', 'geolocation', 'GoogleMapService', 'AppRoutes', 'MainCtrl', 'DashboardCtrl', 'LoginCtrl', 'SignupCtrl', 'AboutCtrl', 'ContactCtrl', 'TrailQueryCtrl', 'TrailListCtrl', 'EditProfileCtrl', 'TrailDetailsCtrl', 'EditTrailCtrl', 'EditReviewCtrl', 'AddReviewCtrl', 'AddTrailCtrl'])
  .config(function(filepickerProvider) {
    filepickerProvider.setKey('AK4B8xmmRRnOsYG8g3J4Lz');
  });
