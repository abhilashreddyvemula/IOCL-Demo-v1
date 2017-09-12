'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
      templateUrl: 'pages/dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    });
  }])

  .controller('DashboardCtrl', ['$scope', 'utility', 'BayService', function ($scope, utility, bayService) {
    $scope.userRole = utility.getUserRole();
    console.log($scope.userRole);
    if($scope.userRole === 'Super Admin'){
      $scope.userPrivilages = {'bay': true, 'users': true, 'contractors': true, 'locations': true, 'quantity': true, 'reports': false};
    }
    else{
      $scope.userPrivilages = {'bay': true, 'users': true, 'contractors': true, 'locations': true, 'quantity': true, 'reports': true}; 
    }

      $scope.main = {};
      $scope.main.active = {};
      $scope.main.active.tab = 'bay';
  }]);