'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'pages/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$scope', '$location', 'utility', 'BayService', function ($scope, $location, utility, bayService) {
        $scope.userRole = utility.getUserRole();
        if ($scope.userRole == undefined) {
            $location.path('');
        }
        else {
            $scope.main = {};
            $scope.main.active = {};
            if ($scope.userRole === 'Super Admin') {
                $scope.main.active.tab = 'bay';
                $scope.userPrivilages = { 'bay': true, 'users': true, 'contractors': true, 'locations': true, 'quantity': true, 'reports': false, 'operator': false, 'baydetails': true };
            } else if ($scope.userRole === 'Admin') {
                $scope.main.active.tab = 'bay';
                $scope.userPrivilages = { 'bay': true, 'users': true, 'contractors': true, 'locations': true, 'quantity': true, 'reports': true, 'operator': false, 'baydetails': true };
            } else if ($scope.userRole === 'Supervisor') {
                $scope.main.active.tab = 'users';
                $scope.userPrivilages = { 'bay': false, 'users': true, 'contractors': false, 'locations': false, 'quantity': false, 'operator': true, 'baydetails': false };
            } else {
                $scope.main.active.tab = 'operator';
                $scope.userPrivilages = { 'bay': false, 'users': false, 'contractors': false, 'locations': false, 'quantity': false, 'operator': true, 'baydetails': false };
            }
        }

        $scope.logout = function () {
            utility.clearCredentials();
            $location.path('');
        }



    }]);