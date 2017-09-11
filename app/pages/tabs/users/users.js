angular.module('myApp.dashboard')
    .controller('UsersController', ['$scope', 'UsersService', function ($scope, usersService) {
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;

        $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": "", "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": "", "userStatus": "" };
        $scope.usersList = [];
        //$scope.dropDownValues = { 'bayStatus': [] ,'bayTypes': [] };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }

        $scope.loadAllUsers = function () {
            usersService.getUsersList().then(function (response) {
                $scope.usersList = response.data;
                $scope.totalItems = $scope.usersList.length;
            }, function (error) { });
        }

        $scope.loadDropdownsData = function () {
            usersService.getBayStaticData().then(function (response) {
                $scope.dropDownValues.bayStatus = response.data.data.BayStatus;
                $scope.dropDownValues.bayTypes = response.data.data.BayTypes;
            }, function (error) { });
        }

        $scope.saveUser = function (user) {
            var userType = [];
            userType.push(user.userType);
            var body = { "userName": user.userName, "userFirstName": user.userFirstName, "userLastName": user.userLastName, "userDOB": user.userDOB, "userAadharNum": user.userAadharNum, "userMobileNum": user.userMobileNum, "userPassword": user.userPassword, "userType": userType, "userStatus": user.userStatus };
            usersService.addUser(body).then(function (success) {
                $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": "", "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": "", "userStatus": "" };
                $scope.loadAllUsers();
            }, function (error) {
                console.log(error);
            });
        }

        $scope.loadAllUsers();
        // $scope.loadDropdownsData();
    }]);