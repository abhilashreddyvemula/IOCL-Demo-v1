angular.module('myApp.modals', [])
    .controller('BayEditModalCtrl', function ($uibModalInstance, items, utility, BayService, LoaderService) {
        var $ctrl = this;
        $ctrl.userRole = utility.getUserRole();
        $ctrl.bay = angular.copy(items.bay);
        let oldBay = angular.copy($ctrl.bay);
        $ctrl.dropDownValues = items.dropDownValues;

        $ctrl.update = function () {
            LoaderService.show();
            //$uibModalInstance.close($ctrl.selected.item);
            let editbayNumFlag = false;
            let editbayNameFlag = false;
            $ctrl.errorMessageBayNum = false;
            $ctrl.errorMessageBayName = false;
            if ($ctrl.bay.bayName !== oldBay.bayName) {
                editbayNameFlag = true;
            }
            if ($ctrl.bay.bayNum !== oldBay.bayNum) {
                editbayNumFlag = true;
            }
            let bay = { 'bayName': $ctrl.bay.bayName, 'bayNum': $ctrl.bay.bayNum, 'bayType': $ctrl.bay.bayType, 'functionalStatus': $ctrl.bay.functionalStatus, 'editbayNumFlag': editbayNumFlag, 'editbayNameFlag': editbayNameFlag, 'bayId': $ctrl.bay.bayId, 'userName': utility.getCredentials().name }

            BayService.updateBay(bay).then(function (response) {
                alert("Bay updated successfully...");
                $uibModalInstance.close({ $value: 'updated' });
                LoaderService.hide();
            }, function (error) {
                if (error.data !== null && error.data !== undefined)
                    $ctrl.errorMessage = error.data.errorMessage;
                if ($ctrl.errorMessage == "Bay with a bay num already exist!") {
                    $ctrl.errorMessageBayNum = true;
                    $ctrl.errorMessageBayName = false;
                }
                if ($ctrl.errorMessage == "Bay with a bay name already exist!") {
                    $ctrl.errorMessageBayName = true;
                    $ctrl.errorMessageBayNum = false;
                }
                if ($ctrl.errorMessage !== null) {
                    $ctrl.formInvalid = true;

                }
                LoaderService.hide();
                alert('Unable to update Bay, Please try again...');
            });
        };

        $ctrl.isNotSuperAdmin = function () {
            if ($ctrl.userRole === 'Super Admin') {
                return false;
            } else
                return true;
        }

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('UserEditModalCtrl', function ($uibModalInstance, items, utility, UsersService, LoaderService) {
        var $ctrl = this;
        $ctrl.userRole = utility.getUserRole();
        $ctrl.format = 'yyyy-MM-dd';
        $ctrl.options = { maxDate: new Date() };
        $ctrl.user = angular.copy(items.user);
        var actualPassword = items.user.userPassword;
        $ctrl.user.userDOB = new Date($ctrl.user.userDOB);
        $ctrl.user.userPassword = 'WWWWW!09090';
        let oldUser = angular.copy($ctrl.user);
        $ctrl.dropDownValues = items.dropDownValues;
        $ctrl.update = function () {
            LoaderService.show();
            $ctrl.errorMessageUserName = false;
            let editUserNameFlag = false;
            if ($ctrl.user.userName !== oldUser.userName) {
                editUserNameFlag = true;
            }
            //$uibModalInstance.close($ctrl.selected.item);
            var latestPassword = '';
            var pwdEditFlag = false;
            if ($ctrl.user.userPassword === 'WWWWW!09090') {
                pwdEditFlag = false;
                latestPassword = actualPassword
            } else {
                pwdEditFlag = true;
                latestPassword = btoa($ctrl.user.userPassword);
            }
            let user = { "userName": $ctrl.user.userName, "userFirstName": $ctrl.user.userFirstName, "userLastName": $ctrl.user.userLastName, "userDOB": $ctrl.user.userDOB, "userAadharNum": $ctrl.user.userAadharNum, "userMobileNum": $ctrl.user.userMobileNum, "userPassword": latestPassword, "userType": $ctrl.user.userType, "userStatus": $ctrl.user.userStatus, "editUserNameFlag": editUserNameFlag, "editPwdFlag": pwdEditFlag, "userId": $ctrl.user.userID, "userUpdatedBy": utility.getCredentials().name };
            UsersService.updateUser(user).then(function (response) {    
                var currentUserId = utility.getUserId();
                if (currentUserId === response.data.userID) {
                    var userdetails = utility.getCredentials();
                    if (pwdEditFlag) {
                        userdetails.password = $ctrl.user.userPassword;
                    }
                    if (editUserNameFlag) {
                        userdetails.name = $ctrl.user.userName;
                    }
                    utility.setCredentials(userdetails);
                    utility.setUserRole(response.data.userType);
                }
                $uibModalInstance.close({ $value: 'updated' });
                LoaderService.hide();
                alert("User updated successfully...");
            }, function (error) {
                LoaderService.hide();
                if (error.data !== null && error.data !== undefined)
                    $ctrl.errorMessage = error.data.errorMessage;
                if ($ctrl.errorMessage == "User with user name already exist!!") {
                    $ctrl.errorMessageUserName = true;
                }
                if ($ctrl.errorMessage !== null) {
                    $ctrl.formInvalid = true;

                }
                alert('Unable to update User, Please try again...');
            });
        };

        $ctrl.isNotSuperAdmin = function () {
            if ($ctrl.userRole === 'Super Admin') {
                return false;
            } else
                return true;
        }

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('ContractorEditModalCtrl', function ($uibModalInstance, items, ContractorsService, LoaderService) {
        var $ctrl = this;
        $ctrl.contractor = angular.copy(items.contractor);
        let oldContractor = angular.copy($ctrl.contractor);
        $ctrl.dropDownValues = items.dropDownValues;
        $ctrl.update = function () {
            LoaderService.show();
            $ctrl.errorMessageContractorName = false;
            let editContractorNameFlag = false;
            if ($ctrl.contractor.contractorName !== oldContractor.contractorName) {
                editContractorNameFlag = true;
            }
            //$uibModalInstance.close($ctrl.selected.item);
            let contractor = { "contractorId": $ctrl.contractor.contractorId, "contractorName": $ctrl.contractor.contractorName, "contractorType": $ctrl.contractor.contractorType, "contractorState": $ctrl.contractor.contractorState, "contractorPinCode": $ctrl.contractor.contractorPinCode, "contractorOperationalStatus": $ctrl.contractor.contractorOperationalStatus, "contractorCity": $ctrl.contractor.contractorCity, "contractorAddress": $ctrl.contractor.contractorAddress, "editContractorNameFlag": editContractorNameFlag, 'userName': utility.getCredentials().name };
            ContractorsService.updateContractor(contractor).then(function (response) {
                $uibModalInstance.close({ $value: 'updated' });
                LoaderService.hide();
                alert("Contractor updated successfully...");
            }, function (error) {
                if (error.data !== null && error.data !== undefined)
                    $ctrl.errorMessage = error.data.errorMessage;
                if ($ctrl.errorMessage == "Contractor with contractor name Already Exist!") {
                    $ctrl.errorMessageContractorName = true;
                }
                if ($ctrl.errorMessage !== null) {
                    $ctrl.formInvalid = true;
                }
                LoaderService.hide();
                alert('Unable to update Contractor, Please try again...');
            });
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('LocationEditModalCtrl', function ($uibModalInstance, items, LocationService, LoaderService) {
        var $ctrl = this;
        $ctrl.location = angular.copy(items.location);
        let oldLocation = angular.copy($ctrl.location);
        $ctrl.dropDownValues = items.dropDownValues;
        $ctrl.update = function () {
            LoaderService.show();
            $ctrl.errorMessageLocationName = false;
            $ctrl.errorMessagelocationCode = false;
            let editLocationNameFlag = false;
            let editLocationCodeFlag = false;
            if ($ctrl.location.locationName !== oldLocation.locationName) {
                editLocationNameFlag = true;
            }
            if ($ctrl.location.locationCode !== oldLocation.locationCode) {
                editLocationCodeFlag = true;
            }
            //$uibModalInstance.close($ctrl.selected.item);
            let location = { "locationName": $ctrl.location.locationName, "locationCode": $ctrl.location.locationCode, "operationalStatus": $ctrl.location.operationalStatus, "locationAddress": $ctrl.location.locationAddress, "state": $ctrl.location.state, "city": $ctrl.location.city, "pinCode": $ctrl.location.pinCode, "locationId": $ctrl.location.locationId, "editLocationNameFlag": editLocationNameFlag, "editLocationCodeFlag": editLocationCodeFlag, 'userName': utility.getCredentials().name };
            LocationService.updateLocation(location).then(function (response) {
                $uibModalInstance.close({ $value: 'updated' });
                LoaderService.hide();
                alert("Location updated successfully...");
            }, function (error) {
                if (error.data !== null && error.data !== undefined)
                    $ctrl.errorMessage = error.data.errorMessage;
                if ($ctrl.errorMessage == "Location with a location name already exist!") {
                    $ctrl.errorMessageLocationName = true;
                }
                if ($ctrl.errorMessage == "Location with a location code already exist!") {
                    $ctrl.errorMessagelocationCode = true;
                }
                if ($ctrl.errorMessage !== null) {
                    $ctrl.formInvalid = true;
                }
                LoaderService.hide();
                alert('Unable to update Location, Please try again...');
            });
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('QuantityEditModalCtrl', function ($uibModalInstance, items, QuantityService, LoaderService) {
        var $ctrl = this;
        $ctrl.quantity = angular.copy(items.quantity);
        let oldQuantity = angular.copy($ctrl.quantity);
        $ctrl.dropDownValues = items.dropDownValues;
        $ctrl.update = function () {
            LoaderService.show();
            $ctrl.errorMessageQuantityName = false;
            let editQuantityFlag = false;
            let editQuantityNameFlag = false;
            if ($ctrl.quantity.quantity !== oldQuantity.quantity) {
                editQuantityFlag = true;
            }
            if ($ctrl.quantity.quantityName !== oldQuantity.quantityName) {
                editQuantityNameFlag = true;
            }
            //$uibModalInstance.close($ctrl.selected.item);
            let quantity = { "quantityName": $ctrl.quantity.quantityName, "quantity": $ctrl.quantity.quantity, "quantityStatus": $ctrl.quantity.operationalStatus, "editQuantityFlag": editQuantityFlag, "editQuantityNameFlag": editQuantityNameFlag, "quantityId": $ctrl.quantity.qunatityId, 'userName': utility.getCredentials().name };
            QuantityService.updateQuantity(quantity).then(function (response) {
                $uibModalInstance.close({ $value: 'updated' });
                LoaderService.hide();
                alert("Quantity updated successfully...");
            }, function (error) {
                if (error.data !== null && error.data !== undefined)
                    $ctrl.errorMessage = error.data.errorMessage;
                if ($ctrl.errorMessage == "Qunatity with a qunatity name already exist!") {
                    $ctrl.errorMessageQuantityName = true;
                }
                if ($ctrl.errorMessage !== null) {
                    $ctrl.formInvalid = true;

                }
                LoaderService.hide();
                alert('Unable to update Quantity, Please try again...');
            });
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('OperatorViewModalCtrl', function ($uibModalInstance, items, FanSlipsService, utility, LoaderService, prompt) {
        var $ctrl = this;
        $ctrl.fanSlip = angular.copy(items.fanSlip);
        $ctrl.userRole = utility.getUserRole();
        $ctrl.regenerate = function () {

            prompt({
                title: 'Would you like to Regenerate the Fan slip?',
                message: 'Comments Please',
                input: true,
                label: '',
                value: ''
            }).then(function (comments) {
                LoaderService.show();
                let fanSlip = { "fanId": $ctrl.fanSlip.fanId, "truckNo": $ctrl.fanSlip.truckNumber, "driverName": $ctrl.fanSlip.driverName, "driverLicNo": $ctrl.fanSlip.driverLicenceNumber, "customer": $ctrl.fanSlip.customer, "quantity": $ctrl.fanSlip.quantity, "vehicleWgt": $ctrl.fanSlip.vehicleWeight, "destination": $ctrl.fanSlip.destination, "locationCode": $ctrl.fanSlip.locationCode, "bayNum": parseInt($ctrl.fanSlip.bayNum), "mobileNumber": "9898989898", "contractorName": $ctrl.fanSlip.contractorName, "fanCreatedBy": utility.getCredentials().name };
                FanSlipsService.regenerateFanSlip(fanSlip).then(function (response) {
                    $uibModalInstance.close({ $value: 'regenerated' });
                    LoaderService.hide();
                    alert("Fan Slip successfully Regenerated...");
                }, function (error) {
                    LoaderService.hide();
                    alert('Unable to regenerate Fan Slip, Please try again...');
                });
            });

        }

        $ctrl.print = function () {
            let fanSlip = [{ 'title': 'Truck Registration Number', 'value': $ctrl.fanSlip.truckNumber },
            { 'title': 'Driver Name', 'value': $ctrl.fanSlip.driverName },
            { 'title': 'Customer', 'value': $ctrl.fanSlip.customer },
            { 'title': 'Quantity', 'value': $ctrl.fanSlip.quantity },
            { 'title': 'Contractor', 'value': $ctrl.fanSlip.contractorName },
            { 'title': 'Destination', 'value': $ctrl.fanSlip.destination },
            { 'title': 'Location Name', 'value': $ctrl.fanSlip.locationCode },
            { 'title': 'Bay Number', 'value': parseInt($ctrl.fanSlip.bayNum) },
            { 'title': 'Bay Status', 'value': $ctrl.fanSlip.bayStatus },
            { 'title': 'Expiration Date', 'value': $ctrl.fanSlip.fanPinExpiration },
            { 'title': 'FAN Slip Number', 'value': $ctrl.fanSlip.fanId },
            { 'title': 'FAN Pin Status', 'value': $ctrl.fanSlip.fanPinStatus },
            { 'title': 'PIN', 'value': $ctrl.fanSlip.fanPin }
            ];
            var printContents = utility.getHTMLDiv(fanSlip);
            var popupWin = window.open('', '_blank', 'width=500,height=500, top=100px, left=500px');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="app.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }
        $ctrl.cancelPin = function () {
            prompt({
                title: 'Would you like to Cancel the Fan slip?',
                message: 'Comments Please',
                input: true,
                label: '',
                value: ''
            }).then(function (comments) {
                LoaderService.show();
                let username = utility.getCredentials().name;
                FanSlipsService.cancelFanSlip($ctrl.fanSlip.fanId, username).then(function (response) {
                    $uibModalInstance.close({ $value: 'cancelled' });
                    LoaderService.hide();
                    alert('Fan slip cancelled successfully...');
                }, function (error) {
                    LoaderService.hide();
                    alert('Unable to cancel fan slip, Please try again...');
                });
            });
        }

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })