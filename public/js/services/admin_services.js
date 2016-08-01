angular.module('AdminService', [])
  .factory('adminService', ['$http', function($http) {
    return {
      getAllUsers: function() {
        return $http.get('/api/find_users');
      },
      createUser: function(data) {
        return $http.post('/api/create_user', data);
      },
      updateUser: function(data) {
        return $http.put('/admin_update_user', data);
      }
    };
  }]);
