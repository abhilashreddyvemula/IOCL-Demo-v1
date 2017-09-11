'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
      templateUrl: 'pages/dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    });
  }])

  .controller('DashboardCtrl', ['$scope', 'BayService', function ($scope, bayService) {
    
    $scope.tabs = [
      { 'title': 'Bay', 'templateUrl': '' },
      { 'title': 'Users', 'templateUrl': '' },
      { 'title': 'Contractors', 'templateUrl': '' },
      { 'title': 'Locations', 'templateUrl': '' },
      { 'title': 'Quantity', 'templateUrl': '' }];

      $scope.main = {};
      $scope.main.active = {};
      $scope.main.active.tab = 'bay';
  }]);