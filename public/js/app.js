angular.module('trailguideApp', ['ngRoute', 'ngAnimate', 'ui', 'angular-filepicker', 'GoogleMapsService', 'AppRoutes', 'MainCtrl', 'DashboardCtrl', 'LoginCtrl', 'SignupCtrl', 'AboutCtrl', 'ContactCtrl', 'TrailQueryCtrl'])
  .config(function(filepickerProvider) {
    filepickerProvider.setKey('AK4B8xmmRRnOsYG8g3J4Lz');
  });
