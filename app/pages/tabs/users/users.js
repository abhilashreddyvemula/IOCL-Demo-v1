angular.module('myApp.dashboard')
    .controller('UsersController', ['$scope', '$filter', '$uibModal', 'utility', 'UsersService', 'LoaderService', function ($scope, $filter, $uibModal, utility, usersService, loader) {

        $scope.userRole = utility.getUserRole();
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.errorMessage = '';
        $scope.errorMessageUserName = false;
        $scope.passwordErrorFlag = false;
        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": null, "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": [], "userStatus": "" };
        $scope.usersList = [];
        $scope.dropDownValues = { 'UserStatus': [], 'UserTypes': [] };
        $scope.format = 'yyyy-MM-dd';
        $scope.options = { maxDate: new Date() };

        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }

        $scope.isAddAvailable = function () {
            if ($scope.userRole === 'Super Admin' || $scope.userRole === 'Admin' || $scope.userRole === 'Supervisor')
                return true;
            else
                return false;
        }

        $scope.loadAllUsers = function () {
            loader.show();
            usersService.getUsersList().then(function (response) {
                $scope.usersList = response.data;
                $scope.totalItems = $scope.usersList.length;
                loader.hide();
            }, function (error) {
                loader.hide();
                alert('Unable to load the Users details, Please reload the page...');
            });
        }

        $scope.loadDropdownsData = function () {
            usersService.getStaticUserData().then(function (response) {
                $scope.dropDownValues.UserTypes = response.data.data.UserTypes;
                $scope.dropDownValues.UserStatus = response.data.data.UserStatus;
            }, function (error) { 
                alert('Unable to load the dropdown values, please try again...');
                $scope.addClicked = false;
            });
        }

        $scope.addNewUser = function () {
            $scope.addClicked = true;
            $scope.errorMessageUserName = false;
            $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": null, "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": [], "userStatus": "" };
            $scope.loadDropdownsData();
        }

        $scope.deleteUser = function (user) {
            let updatedUser = { "userName": user.userName, "userFirstName": user.userFirstName, "userLastName": user.userLastName, "userDOB": user.userDOB, "userAadharNum": user.userAadharNum, "userMobileNum": user.userMobileNum, "userPassword": user.userPassword, "userType": user.userType, "userStatus": 'Not Active', "editUserNameFlag": false, "editPwdFlag": false, "userId": user.userID };
            usersService.updateUser(updatedUser).then(function (response) {
                alert("User deleted successfully...");
                $scope.loadAllUsers();
            }, function (error) {
                alert("Unable to delete the user, Please try later...")
            });
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
            loader.show();
            $scope.errorMessageUserName = false;
            var body = { "userName": user.userName, "userFirstName": user.userFirstName, "userLastName": user.userLastName, "userDOB": $filter('date')(user.userDOB, 'yyyy-MM-dd'), "userAadharNum": user.userAadharNum, "userMobileNum": user.userMobileNum, "userPassword": user.userPassword, "userType": user.userType, "userStatus": user.userStatus };
            usersService.addUser(body).then(function (success) {
                $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": null, "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": [], "userStatus": "" };
                alert('Quantity added successfully...');
                $scope.loadAllUsers();
                $scope.addClicked = false;
                loader.hide();
            }, function (error) {
                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "User Already Exist!!") {
                    $scope.errorMessageUserName = true;
                }
                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;
                    alert('Unable to add new User, please try again...');
                }
                loader.hide();
                return;
            });
        }

        $scope.openEditModal = function (size, item) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/tabs/modals/user-edit-modal.html',
                controller: 'UserEditModalCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function () {
                        return { 'user': item, 'dropDownValues': $scope.dropDownValues };
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                if (selectedItem.$value === 'updated') {
                    $scope.loadAllUsers();
                }
            }, function () {
            });

        };

        $scope.toggle_password = function (target) {
            var d = document;
            var tag = d.getElementById('myPassword');
            var tag2 = d.getElementById('eye');
            if (tag.getAttribute('type') === 'text') {
                tag.setAttribute('type', 'password');
                tag2.classList.toggle("glyphicon-eye-close");
            } else {
                tag.setAttribute('type', 'text');
                tag2.classList.toggle("glyphicon-eye-close");
            }
        }

        $scope.loadAllUsers();
        $scope.loadDropdownsData();
    }]);