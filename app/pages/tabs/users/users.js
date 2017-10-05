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

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };
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

        $scope.formatDate = function (date) {
            function pad(n) {
                return n < 10 ? '0' + n : n;
            }

            return date && date.getFullYear() +
                '-' + pad(date.getMonth() + 1) +
                '-' + pad(date.getDate());
        };

        $scope.parseDate = function (s) {
            var tokens = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);

            return tokens && new Date(tokens[1], tokens[2] - 1, tokens[3]);
        };

        $scope.loadAllUsers = function () {
            loader.show();
            usersService.getUsersList().then(function (response) {

                $scope.usersList = response.data;
                $scope.totalItems = $scope.usersList.length;
                console.log($scope.usersList);
                loader.hide();
            }, function (error) {
                loader.hide();
            });
        }
        $scope.loadDropdownsData = function () {
            //alert("load user static data")
            usersService.getStaticUserData().then(function (response) {
                /* let userTypes = response.data.data.UserTypes;
                 let userTypesArray = [];
                 if ($scope.userRole === 'Super Admin') {
                     console.log(userTypes);
                     userTypesArray = userTypes;

                 } else if ($scope.userRole === 'Admin') {
                     for (let i = 0; i < userTypes.length; i++) {
                         if (userTypes[i] == 'Supervisor') {
                             userTypesArray.push('Supervisor');
                         }
                         if (userTypes[i] == 'TTES Operator') {
                             userTypesArray.push('TTES Operator');
                         }
                     }
                 } else if ($scope.userRole === 'Supervisor') {
                     for (let i = 0; i < userTypes.length; i++) {
                         if (userTypes[i] == 'TTES Operator') {
                             userTypesArray.push('TTES Operator');
                         }
                     }
                 }*/


                //$scope.dropDownValues.UserTypes = userTypesArray;
                console.log(response);
                $scope.dropDownValues.UserTypes = response.data.data.UserTypes;
                $scope.dropDownValues.UserStatus = response.data.data.UserStatus;
                console.log(response.data);
            }, function (error) { });
        }


        $scope.addNewUser = function () {
            $scope.addClicked = true;
            $scope.errorMessageUserName = false;
            $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": null, "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": [], "userStatus": "" };
        }
        $scope.deleteUser = function (user) {

            //let userId = user.userID;
            let updatedUser = { "userName": user.userName, "userFirstName": user.userFirstName, "userLastName": user.userFirstName, "userDOB": user.userDOB, "userAadharNum": user.userAadharNum, "userMobileNum": user.userMobileNum, "userPassword": user.userPassword, "userType": user.userType, "userStatus": 'Not Active', "editUserNameFlag": false, "editPwdFlag": false, "userId": user.userID };
            usersService.updateUser(updatedUser).then(function (response) {
                console.log('Updated user record', response);
                $scope.loadAllUsers();
            }, function (error) {
                console.log('error');
            });
        }
        $scope.editUser = function () {
            console.log('Edit user details');
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
            //var userType = [];
            //userType.push(user.userType);
            var body = { "userName": user.userName, "userFirstName": user.userFirstName, "userLastName": user.userLastName, "userDOB": $filter('date')(user.userDOB, 'yyyy-MM-dd'), "userAadharNum": user.userAadharNum, "userMobileNum": user.userMobileNum, "userPassword": user.userPassword, "userType": user.userType, "userStatus": user.userStatus };
            usersService.addUser(body).then(function (success) {
                $scope.newUser = { "userName": "", "userFirstName": "", "userLastName": "", "userDOB": null, "userAadharNum": "", "userMobileNum": "", "userPassword": "", "rePassword": "", "userType": [], "userStatus": "" };
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
                console.log();
                if(selectedItem.$value === 'updated'){
                    $scope.loadAllUsers();
                }
              }, function () {
                $log.info('modal-component dismissed at: ' + new Date());
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