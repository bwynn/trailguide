angular.module('UserListCtrl', [])
  .controller('userListController', ['$scope', 'profileService', function($scope, profileService) {
    profileService.getAllUsers().then(function(data) {
      $scope.users = data.data;

      console.log($scope.users);
    });
  }]);
