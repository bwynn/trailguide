angular.module('AppRoutes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // set up html5
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $routeProvider.
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
      }).
      when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'signupController'
      }).
      when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController'
      }).
      otherwise('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
      });
  }]);
