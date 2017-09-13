angular.module('myApp.dashboard')
    .controller('UsersController', ['$scope', 'utility', 'UsersService', function ($scope, utility, usersService) {
        $scope.userRole = utility.getUserRole();
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.errorMessage = '';
        $scope.errorMessageUserName = false;
        $scope.passwordErrorFlag = false;
        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": "", "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": "", "userStatus": "" };
        $scope.usersList = [];

        $scope.dropDownValues = { 'UserStatus': [], 'UserTypes': [] };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }

        $scope.isAddAvailable = function () {
            if ($scope.userRole === 'Super Admin' || $scope.userRole === 'Admin')
                return true;
            else
                return false;
        }

        $scope.loadAllUsers = function () {
            usersService.getUsersList().then(function (response) {
                $scope.usersList = response.data;
                $scope.totalItems = $scope.usersList.length;
            }, function (error) { });
        }

        $scope.loadDropdownsData = function () {
            //alert("load user static data")
            usersService.getStaticUserData().then(function (response) {
                $scope.dropDownValues.UserTypes = response.data.data.UserTypes;
                $scope.dropDownValues.UserStatus = response.data.data.UserStatus;
                console.log(response.data);
            }, function (error) { });
        }


        $scope.addNewUser = function () {

            $scope.addClicked = true;
            $scope.errorMessageUserName = false;
            $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": "", "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": "", "userStatus": "" };



        }

        $scope.onCancel = function () {
            $scope.addClicked = false;
        }

        $scope.isPasswordSame = function () {
                    if ($scope.newUser.rePassword !== '' && $scope.newUser.userPassword !== '' && $scope.newUser.rePassword !== $scope.newUser.userPassword) {
                        return true;
                    } else {
                        return false;
                    }
        }
        $scope.saveUser = function (user) {
            var userType = [];
            userType.push(user.userType);
            var body = { "userName": user.userName, "userFirstName": user.userFirstName, "userLastName": user.userLastName, "userDOB": user.userDOB, "userAadharNum": user.userAadharNum, "userMobileNum": user.userMobileNum, "userPassword": user.userPassword, "userType": userType, "userStatus": user.userStatus };
            usersService.addUser(body).then(function (success) {
                $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": "", "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": "", "userStatus": "" };
                $scope.loadAllUsers();
                $scope.addClicked = false;
            }, function (error) {

                $scope.addClicked = true;
                console.log(error);
                console.log(error.data);
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "User Already Exist!!") {
                    $scope.errorMessageUserName = true;

                }

                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;

                }
                console.log($scope.errorMessage);

                return;
            });
        }

        $scope.loadAllUsers();
        $scope.loadDropdownsData();
    }]);