angular.module('trailguideApp', ['ngRoute', 'ngAnimate', 'angular-filepicker', 'MainCtrl', 'DashboardCtrl', 'LoginCtrl', 'SignupCtrl'])
  .config(function(filepickerProvider) {
    filepickerProvider.setKey('AK4B8xmmRRnOsYG8g3J4Lz');
  });
