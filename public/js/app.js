angular.module('trailguideApp', ['ngRoute', 'ngAnimate', 'ui', 'angular-filepicker', 'geolocation', 'uiGmapgoogle-maps', 'GoogleMapService', 'AppRoutes', 'MainCtrl', 'DashboardCtrl', 'LoginCtrl', 'SignupCtrl', 'AboutCtrl', 'ContactCtrl', 'TrailQueryCtrl'])
  .config(function(filepickerProvider) {
    filepickerProvider.setKey('AK4B8xmmRRnOsYG8g3J4Lz');
  })
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyC9w6cuB9WNG4IRQKo8R0NNmvUMuPjKBoo'
    });
  });
