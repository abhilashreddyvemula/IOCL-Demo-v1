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
    $scope.submit = function(user) {
        console.log(user);
        loader.show();
        utility.setCredentials(user);
        loginService.userValidation(user).then(function(response) {
                console.log(response);
                console.log(response.data);
                if (response.status === 200) {
                    utility.setUserRole(response.data.userRole);
                    $location.path('dashboard');
                    loader.hide();
                }
                $scope.errorFlag = false;
                //if(user.name === 'superadmin' && user.password === 'superadmin')

                //else
                // alert("Invalid Username or password");
            },
            function(error) {
                console.log("login error");
                console.log(error.data);
                if (error.data != null);
                $scope.errorFlag = true;
                loader.hide();

            });

    }
}]);