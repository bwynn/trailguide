angular.module('trailguideApp', ['ngRoute', 'ngAnimate', 'ui', 'angular-filepicker', 'AppRoutes', 'MainCtrl', 'DashboardCtrl', 'LoginCtrl', 'SignupCtrl'])
  .config(function(filepickerProvider) {
    filepickerProvider.setKey('AK4B8xmmRRnOsYG8g3J4Lz');
  });
