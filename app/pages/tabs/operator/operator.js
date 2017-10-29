angular.module('myApp.dashboard')
    .controller('OperatorsController', ['$scope', '$uibModal', 'utility', 'FanSlipsService', 'LoaderService', function ($scope, $uibModal, utility, fanSlipsService, loader) {

        $scope.userRole = utility.getUserRole();

        $scope.fanSlips = [];
        $scope.newFanSlip = { "truckNo": "", "driverName": "", "driverLicenceNumber": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "9898989899", "contractorName": "", "fanPinStatus": "", "fanCreatedBy": "" };
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.errorMessage = '';
        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.orderByField = 'fanId';
        $scope.dropDownValues = { 'contractorNames': [], 'locationCodes': [] };
        $scope.format = 'yyyy-MM-dd';
        $scope.options = { maxDate: new Date() };
        $scope.fanSlipDate = new Date();

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

        $scope.loadFanSlipsList = function (fanSlipDate) {
            loader.show();
            fanSlipsService.getFanSlipsList(fanSlipDate).then(function (response) {
                if (response.status == 200) {
                    $scope.fanSlips = response.data;
                    $scope.totalItems = $scope.fanSlips.length;
                    loader.hide();
                }

            }, function (error) {
                alert("Unable to load fan slips, please reload the page...");
                loader.hide();
            });
        }

        $scope.loadDropdownsData = function () {
            loader.show();
            fanSlipsService.getfanSlipStaticData().then(function (response) {
                $scope.dropDownValues.contractorNames = response.data.data.ContractorNames;
                $scope.dropDownValues.locationCodes = response.data.data.LocationCodes;
                loader.hide();
                fanSlipsService.getAvailableBays().then(function (res) {
                    $scope.bayNumbers = res.data;
                    loader.hide();
                }, function () {
                    alert('Unable to load Bay numbers, Please try again...');
                    loader.hide();
                });
            }, function (error) {
                alert('Unable to load static dropdown values, Please try again...');
                loader.hide();
            });
        }

        $scope.addNewFanSlip = function () {

            $scope.loadDropdownsData();
            $scope.addClicked = true;
            $scope.newFanSlip = { "truckNo": "", "driverName": "", "driverLicenceNumber": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "", "contractorName": "", "fanPinStatus": "", "fanCreatedBy": "" };
        }

        $scope.onCancel = function () {
            $scope.addClicked = false;
        }



        $scope.saveFanSlip = function (fanSlip) {
            loader.show();
            var body = {
                "truckNo": fanSlip.truckNo,
                "driverName": fanSlip.driverName,
                "driverLicNo": fanSlip.driverLicenceNumber,
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
                $scope.newFanSlip = { "truckNo": "", "driverName": "", "driverLicenceNumber": "", "customer": "", "quantity": "", "vehicleWgt": "", "destination": "", "locationCode": "", "bayNum": null, "mobileNumber": "", "contractorName": "" };
                $scope.addClicked = false;
                alert('Fan Slip added successfully...');
                loader.hide();
                $scope.loadFanSlipsList(new Date());
            }, function (error) {
                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;
                }
                alert('Unable to add Fan slip, please try again...');
                loader.hide();
                return;
            });


        }

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

            modalInstance.result.then(function (selectedItem) {
                if (selectedItem.$value === 'regenerated' || selectedItem.$value === 'cancelled') {
                    $scope.loadFanSlipsList(new Date());
                }
            }, function () {
            });
        }

        $scope.print = function (fanSlip) {
            if (!($scope.userRole === 'TTES Operator' && (fanSlip.fanPinStatus === 'Expired' || fanSlip.fanPinStatus === 'Cancelled' || fanSlip.fanPinStatus === 'Completed'))) {
                let newfanSlip = [{ 'title': 'Truck Registration Number', 'value': fanSlip.truckNumber },
                { 'title': 'Driver Name', 'value': fanSlip.driverName },
                { 'title': 'Customer', 'value': fanSlip.customer },
                { 'title': 'Quantity', 'value': fanSlip.quantity },
                { 'title': 'Contractor', 'value': fanSlip.contractorName },
                { 'title': 'Destination', 'value': fanSlip.destination },
                { 'title': 'Location Name', 'value': fanSlip.locationCode },
                { 'title': 'Bay Number', 'value': parseInt(fanSlip.bayNum) },
                { 'title': 'Bay Status', 'value': fanSlip.bayStatus },
                { 'title': 'Expiration Date', 'value': fanSlip.fanPinExpiration },
                { 'title': 'FAN Slip Number', 'value': fanSlip.fanId },
                { 'title': 'FAN Pin Status', 'value': fanSlip.fanPinStatus },
                { 'title': 'PIN', 'value': fanSlip.fanPin }
                ];
                var printContents = utility.getHTMLDiv(newfanSlip);
                var popupWin = window.open('', '_blank', 'width=500,height=500, top=100px, left=500px');
                popupWin.document.open();
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="app.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
                popupWin.document.close();
            }
        }

        $scope.regenerate = function (fanSlip) {
            prompt({
                title: 'Would you like to Regenerate the Fan slip?',
                message: 'Comments Please',
                input: true,
                label: '',
                value: ''
            }).then(function (comments) {
                loader.show();
                let newfanSlip = { "fanId": fanSlip.fanId, "truckNo": fanSlip.truckNumber, "driverName": fanSlip.driverName, "driverLicNo": "123456", "customer": fanSlip.customer, "quantity": fanSlip.quantity, "vehicleWgt": fanSlip.vehicleWeight, "destination": fanSlip.destination, "locationCode": fanSlip.locationCode, "bayNum": parseInt(fanSlip.bayNum), "mobileNumber": "9898989898", "contractorName": fanSlip.contractorName, "fanCreatedBy": utility.getCredentials().name };
                fanSlipsService.regenerateFanSlip(newfanSlip).then(function (response) {
                    loader.hide();
                    alert("Fan Slip successfully Regenerated...");
                    $scope.loadFanSlipsList(new Date());
                }, function (error) {
                    loader.hide();
                    alert('Unable to regenerate Fan Slip, Please try again...');
                });
            });
        }
        $scope.cancel = function (item) {
            prompt({
                title: 'Would you like to Cancel the Fan slip?',
                message: 'Comments Please',
                input: true,
                label: '',
                value: ''
            }).then(function (comments) {
                loader.show();
                let username = utility.getCredentials().name;
                fanSlipsService.cancelFanSlip(item.fanId, username).then(function (response) {
                    loader.hide();
                    alert('Fan slip cancelled successfully...');
                    $scope.loadFanSlipsList(new Date());
                }, function (error) {
                    loader.hide();
                    alert('Unable to cancel fan slip, Please try again...');
                });
            });
        }

        $scope.refresh = function () {
            $scope.fanSlipDate = new Date();
            $scope.loadFanSlipsList(new Date());
        }

        $scope.$watch('fanSlipDate', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.loadFanSlipsList(newVal);
            }
        });
        $scope.bayChanged = function (selectedBay) {
            if (selectedBay !== undefined) {
                $scope.newFanSlip.bayNum = selectedBay.bayNumber;
                $scope.showMessage = true;
                $scope.selectedBayStatus = selectedBay.bayAvailableStatus;
            }
        }

        $scope.loadFanSlipsList(new Date());
        $scope.loadDropdownsData();
    }]);