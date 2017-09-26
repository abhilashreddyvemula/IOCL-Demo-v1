angular.module('myApp.dashboard')
    .controller('OperatorsController', ['$scope', 'utility', 'FanSlipsService', 'LoaderService', function ($scope, utility, fanSlipsService, loader) {

        $scope.userRole = utility.getUserRole();

        $scope.fanSlips = [];
        $scope.newFanSlip = { "truckNo": "", "driverName": "", "driverLicNo": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "", "contractorName": "", "fanCreatedBy": "" };
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.errorMessage = '';
        $scope.formInvalid = false;

        $scope.addClicked = false;

        $scope.orderByField = 'fanId';
        $scope.dropDownValues = { 'bayStatus': [], 'bayTypes': [] }

        $scope.isAddAvailable = function () {
            if ($scope.userRole === 'Super Admin')
                return true;
            else
                return false;
        }
        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first paghe
        }

        $scope.loadFanSlipsList = function () {
            loader.show();
            fanSlipsService.getFanSlipsList().then(function (response) {
                if (response.status == 200) {
                    $scope.fanSlips = response.data;
                    $scope.totalItems = $scope.fanSlips.length;
                    loader.hide();
                }

            }, function (error) {
                console.log(error);
                loader.hide();
            });
        }

        // $scope.loadDropdownsData = function () {
        //     fanSlipsService.getBayStaticData().then(function (response) {
        //         $scope.dropDownValues.bayStatus = response.data.data.BayStatus;
        //         $scope.dropDownValues.bayTypes = response.data.data.BayTypes;
        //     }, function (error) { });
        // }

        $scope.addNewFanSlip = function () {
            $scope.addClicked = true;
            $scope.newFanSlip = { "truckNumber": "", "driverName": "", "driverLicNo": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "", "contractorName": "", "fanCreatedBy": "" };
        }

        $scope.onCancel = function () {
            $scope.addClicked = false;
        }



        $scope.saveFanSlip = function (fanSlip) {
            loader.show();
            var body = {
                "fanId": fanSlip.fanId,
                "truckNumber": fanSlip.truckNumber,
                "driverName": fanSlip.driverName,
                "fanPin": fanSlip.fanPin,
                "customer": fanSlip.customer,
                "bayNum": fanSlip.bayNum,
                "quantity": fanSlip.quantity,
                "vehicleWeight": fanSlip.vehicleWeight,
                "destination": fanSlip.destination,
                "locationCode": fanSlip.locationCode,
                "contractorName": fanSlip.contractorName,
                "fanPinStatus": fanSlip.fanPinStatus,
                "fanPinCreation": fanSlip.fanPinCreation,
                "fanPinExpiration": fanSlip.fanPinExpiration
            };
            fanSlipsService.addFanSlip(body).then(function (success) {
                $scope.newFanSlip = { "truckNo": "", "driverName": "", "driverLicNo": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "", "contractorName": "", "fanCreatedBy": "" };
                $scope.addClicked = false;
                $scope.loadFanSlipsList();
                loader.hide();
            }, function (error) {

                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
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
                templateUrl: 'pages/tabs/modals/fanslip-edit-modal.html',
                controller: 'FanSlipEditModalCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function () {
                        return { 'fanSlip': item, 'dropDownValues': $scope.dropDownValues };
                    }
                }
            });

        };
        $scope.loadFanSlipsList();
        //$scope.loadDropdownsData();
    }]);