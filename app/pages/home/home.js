'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'pages/home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', '$location', 'utility', 'loginService', 'LoaderService', function($scope, $location, utility, loginService, loader) {
    $scope.user = { 'name': '', 'password': '' };
    $scope.errorFlag = false;
    $scope.inActiveFlag = false;
    $scope.inValidFlag = false;
    $scope.submit = function(user) {
        console.log(user);
        loader.show();
        utility.setCredentials(user);
        loginService.userValidation(user).then(function(response) {
                console.log(response);
                console.log(response.data);
                if (response.status === 200) {
                    utility.setUserRole(response.data.userRole);
                    utility.setUserId(response.data.userId);
                    $location.path('dashboard');
                    loader.hide();
                }
                else{
                    utility.clearCredentials();
                }
                $scope.inActiveFlag = false;
                $scope.inValidFlag = false;
                //$scope.errorFlag = false;
                //if(user.name === 'superadmin' && user.password === 'superadmin')

                //else
                // alert("Invalid Username or password");
            },
            function(error) {
                loader.hide();
                utility.clearCredentials();
                if (error.data !== null && error.data !== undefined && error.data['errorCode'] == 422) {
                    $scope.inValidFlag = true;
                    $scope.errorMessage = error.data['errorMessage'];
                }
                else if (error.data !== null && error.data !== undefined && error.data['errorMessage'] == "User Locked or In Active. Please contact administrator") {
                    $scope.inActiveFlag = true;
                    $scope.inValidFlag = false;

                } else if (error.data !== null && error.data !== undefined && error.data['errorMessage'] == "Please give correct password") {
                    $scope.inValidFlag = true;
                    $scope.inActiveFlag = false;
                }
                
            });

    }
}]);