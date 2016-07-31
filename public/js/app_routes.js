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
      when('/about', {
        templateUrl: 'views/about.html',
        controller: 'aboutController'
      }).
      when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactController'
      }).
      when('/find_trails', {
        templateUrl: 'views/trail_query.html',
        controller: 'trailQueryController'
      }).
      when('/trail_list', {
        templateUrl: 'views/trail_list.html',
        controller: 'trailListController'
      }).
      when('/trail/:trail_name', {
        templateUrl: 'views/trail_details.html',
        controller: 'trailDetailsController'
      }).
      otherwise('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
      });
  }]);
