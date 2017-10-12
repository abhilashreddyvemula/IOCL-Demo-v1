angular.module('myApp.dashboard')
    .controller('BayController', ['$scope', '$uibModal', 'utility', 'BayService', 'LoaderService', function ($scope, $uibModal, utility, bayService, loader) {
        $scope.userRole = utility.getUserRole();
        $scope.bayItems = [];
        $scope.newBay = { "bayName": "", "bayNum": null, "bayType": "", "functionalStatus": "" }
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.errorMessage = '';
        $scope.errorMessageBayName = false;
        $scope.errorMessageBayNum = false;
        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.orderByField = 'bayId';
        $scope.dropDownValues = { 'bayStatus': [], 'bayTypes': [] }

        $scope.isAddAvailable = function () {
            if ($scope.userRole === 'Super Admin')
                return true;
            else
                return false;
        }

        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first paghe
        }

        $scope.loadBayList = function () {
            loader.show();
            bayService.getBayList().then(function (response) {
                if (response.status == 200) {
                    $scope.bayItems = response.data;
                    $scope.totalItems = $scope.bayItems.length;
                    loader.hide();
                }
            }, function (error) {
                alert('Unable to load the Bays details, Please reload the page...');
                loader.hide();
            });
        }

        $scope.loadDropdownsData = function () {
            bayService.getBayStaticData().then(function (response) {
                $scope.dropDownValues.bayStatus = response.data.data.BayStatus;
                $scope.dropDownValues.bayTypes = response.data.data.BayTypes;
            }, function (error) { 
                alert('Unable to load the dropdown values, please try again...');
                $scope.addClicked = false;
            });
        }

        $scope.addNewBay = function () {
            $scope.addClicked = true;
            $scope.errorMessageBayNum = false;
            $scope.errorMessageBayName = false;
            $scope.newBay = { "bayName": "", "bayNum": null, "bayType": "", "functionalStatus": "" };
            $scope.loadDropdownsData();
        }

        $scope.onCancel = function () {
            $scope.addClicked = false;
        }



        $scope.saveBay = function (bay) {
            loader.show();
            var body = { 'bayName': bay.bayName, 'bayNum': parseInt(bay.bayNum), 'bayType': bay.bayType, 'functionalStatus': bay.functionalStatus };
            bayService.addBay(body).then(function (success) {
                $scope.newBay = { "bayName": "", "bayNum": null, "bayType": "", "functionalStatus": "" }
                $scope.addClicked = false;
                alert('Bay added successfully...');
                $scope.loadBayList();
                loader.hide();
            }, function (error) {
                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Bay with a bay num already exist!") {
                    $scope.errorMessageBayNum = true;
                    $scope.errorMessageBayName = false;
                }
                if ($scope.errorMessage == "Bay with a bay name already exist!") {
                    $scope.errorMessageBayName = true;
                    $scope.errorMessageBayNum = false;
                }
                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;
                    alert('Unable to add new bay, please try again...');
                }
                loader.hide();
                return;
            });
        }

        $scope.openEditModal = function (size, item) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/tabs/modals/bay-edit-modal.html',
                controller: 'BayEditModalCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function () {
                        return {'bay': item, 'dropDownValues': $scope.dropDownValues};
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                if (selectedItem.$value === 'updated') {
                    $scope.loadBayList();
                }
            }, function () {
            });
        };

        $scope.loadBayList();
        $scope.loadDropdownsData();
    }]);