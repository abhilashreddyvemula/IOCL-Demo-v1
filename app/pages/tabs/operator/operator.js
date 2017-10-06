angular.module('myApp.dashboard')
    .controller('OperatorsController', ['$scope', '$uibModal', 'utility', 'FanSlipsService', 'LoaderService', function ($scope, $uibModal, utility, fanSlipsService, loader) {

        $scope.userRole = utility.getUserRole();

        $scope.fanSlips = [];
        $scope.newFanSlip = { "truckNo": "", "driverName": "", "driverLicNo": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "9898989899", "contractorName": "", "fanCreatedBy": "" };
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.errorMessage = '';
        $scope.formInvalid = false;

        $scope.addClicked = false;

        $scope.orderByField = 'fanId';
        $scope.dropDownValues = { 'contractorNames': [], 'locationCodes': [] }

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

        $scope.loadDropdownsData = function () {
            fanSlipsService.getfanSlipStaticData().then(function (response) {
                $scope.dropDownValues.contractorNames = response.data.data.ContractorNames;
                $scope.dropDownValues.locationCodes = response.data.data.LocationCodes;
            }, function (error) { });
        }

        $scope.addNewFanSlip = function () {
            $scope.addClicked = true;
            $scope.newFanSlip = { "truckNo": "", "driverName": "", "driverLicNo": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "", "contractorName": "", "fanCreatedBy": "" };
        }

        $scope.onCancel = function () {
            $scope.addClicked = false;
        }



        $scope.saveFanSlip = function (fanSlip) {
            loader.show();
            console.log(utility.getCredentials());
            var body = {
                "truckNo": fanSlip.truckNo,
                "driverName": fanSlip.driverName,
                "driverLicNo": fanSlip.driverLicNo,
                "customer": fanSlip.customer,
                "quantity": fanSlip.quantity,
                "vehicleWgt": fanSlip.vehicleWgt,
                "destination": fanSlip.destination,
                "locationCode": fanSlip.locationCode,
                "bayNum": parseInt(fanSlip.bayNum),
                "mobileNumber": "9999999999",
                "contractorName": fanSlip.contractorName,
                "fanCreatedBy": utility.getCredentials().name
            }

            fanSlipsService.addFanSlip(body).then(function (success) {
                $scope.newFanSlip = { "truckNo": "", "driverName": "", "driverLicNo": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "", "contractorName": "" };
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

        $scope.view = function (fanSlip) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/tabs/modals/operator-modal.html',
                controller: 'OperatorViewModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        return { 'fanSlip': fanSlip };
                    }
                }
            });
        }

        $scope.print = function (fanSlip) {
            let newfanSlip = [{ 'title': 'Truck Registration Number', 'value': fanSlip.truckNumber },
            { 'title': 'Driver Name', 'value': fanSlip.driverName },
            { 'title': 'Customer', 'value': fanSlip.customer },
            { 'title': 'Quantity', 'value': fanSlip.quantity },
            { 'title': 'Contractor', 'value': fanSlip.contractorName },
            { 'title': 'Destination', 'value': fanSlip.destination },
            { 'title': 'Location Code', 'value': fanSlip.locationCode },
            { 'title': 'Bay Number', 'value': parseInt(fanSlip.bayNum) },
            { 'title': 'Bay Status', 'value': fanSlip.bayStatus },
            { 'title': 'Expiration Date', 'value': fanSlip.fanPinExpiration },
            { 'title': 'FAN Slip Number', 'value': 'XXXX' },
            { 'title': 'PIN', 'value': fanSlip.fanPin }
            ];
            var printContents = utility.getHTMLDiv(newfanSlip);
            var popupWin = window.open('', '_blank', 'width=500,height=500, top=100px, left=500px');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="app.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }

        $scope.regenerate = function(fanSlip){
            let newfanSlip = {"fanId": fanSlip.fanId, "truckNo": fanSlip.truckNumber, "driverName": fanSlip.driverName, "driverLicNo": "123456", "customer": fanSlip.customer, "quantity": fanSlip.quantity, "vehicleWgt": fanSlip.vehicleWeight,"destination": fanSlip.destination, "locationCode": fanSlip.locationCode, "bayNum": parseInt(fanSlip.bayNum), "mobileNumber": "9898989898", "contractorName": fanSlip.contractorName, "fanCreatedBy": utility.getCredentials().name};
            fanSlipsService.regenerateFanSlip(newfanSlip).then(function(response){
              console.log('Response', response);
              $ctrl.cancel();
            }, function(error){});
        }
        $scope.cancel = function(){

        }


        $scope.loadFanSlipsList();
        $scope.loadDropdownsData();
    }]);