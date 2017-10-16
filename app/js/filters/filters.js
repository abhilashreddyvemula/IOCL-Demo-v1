angular.module('myApp.filters', [])
    .filter('search', function () {
        return function (input, searchKey, tab) {
            var output = [];
            if (searchKey !== undefined) {
                searchKey = searchKey.toLowerCase();
                // console.log(input, searchKey, tab)
                if (tab === 'bay') {
                    output = input.filter(function (obj) {
                        return !searchKey || obj.bayName.toLowerCase().indexOf(searchKey) !== -1 || obj.bayNum.toString().toLowerCase().indexOf(searchKey) !== -1 || obj.bayType.toLowerCase().indexOf(searchKey) !== -1 || obj.functionalStatus.toLowerCase().indexOf(searchKey) !== -1;
                    });
                }
                else if (tab === 'users') {
                    output = input.filter(function (obj) {
                        return !searchKey || obj.userName.toLowerCase().indexOf(searchKey) !== -1 || obj.userFirstName.toLowerCase().indexOf(searchKey) !== -1 || obj.userLastName.toLowerCase().indexOf(searchKey) !== -1 || obj.userDOB.toLowerCase().indexOf(searchKey) !== -1 || obj.userAadharNum.toLowerCase().indexOf(searchKey) !== -1 || obj.userMobileNum.toLowerCase().indexOf(searchKey) !== -1 || obj.userType[0].toLowerCase().indexOf(searchKey) !== -1;
                    });
                }
                else if (tab === 'contractors') {
                    output = input.filter(function (obj) {
                        return !searchKey || obj.contractorName.toLowerCase().indexOf(searchKey) !== -1 || obj.contractorType.toString().indexOf(searchKey) !== -1 || obj.contractorAddress.toLowerCase().indexOf(searchKey) !== -1 || obj.contractorCity.toLowerCase().indexOf(searchKey) !== -1 || obj.contractorState.toLowerCase().indexOf(searchKey) !== -1 || obj.contractorPinCode.toLowerCase().indexOf(searchKey) !== -1;
                    });
                }
                else if (tab === 'locations') {
                    output = input.filter(function (obj) {
                        return !searchKey || obj.locationName.toLowerCase().indexOf(searchKey) !== -1 || obj.locationCode.toLowerCase().indexOf(searchKey) !== -1 || obj.locationAddress.toLowerCase().indexOf(searchKey) !== -1 || obj.state.toLowerCase().indexOf(searchKey) !== -1 || obj.city.toLowerCase().indexOf(searchKey) !== -1 || obj.pinCode.toLowerCase().indexOf(searchKey) !== -1 || obj.operationalStatus.toLowerCase().indexOf(searchKey) !== -1;
                    });
                }
                else if (tab === 'quantity') {
                    output = input.filter(function (obj) {
                        return !searchKey || obj.quantityName.toLowerCase().indexOf(searchKey) !== -1 || obj.quantity.toLowerCase().indexOf(searchKey) !== -1 || obj.operationalStatus.toLowerCase().indexOf(searchKey) !== -1;
                    });
                }
                else if (tab === 'fanSlip') {
                    output = input.filter(function (obj) {
                        return !searchKey || obj.truckNumber.toLowerCase().indexOf(searchKey) !== -1
                            || obj.driverName.toLowerCase().indexOf(searchKey) !== -1
                            || obj.fanPin.toLowerCase().indexOf(searchKey) !== -1
                            || obj.customer.toLowerCase().indexOf(searchKey) !== -1
                            || obj.quantity.toLowerCase().indexOf(searchKey) !== -1
                            || obj.contractorName.toLowerCase().indexOf(searchKey) !== -1
                            || obj.destination.toLowerCase().indexOf(searchKey) !== -1
                            || obj.locationCode.toLowerCase().indexOf(searchKey) !== -1
                            || obj.bayNum.toString().toLowerCase().indexOf(searchKey) !== -1
                            || obj.bayStatus.toLowerCase().indexOf(searchKey) !== -1
                            || obj.fanPinExpiration.toLowerCase().indexOf(searchKey) !== -1;

                    });
                }
                return output;
            }
            else
                return input;
        };
    })
    .filter('bayfilter', function () {
        return function (input) {
            var outputEmpty = [];
            var outputInQueue = [];
            if (input !== undefined) {
                input.forEach(function (item) {
                    if (item.bayFunctionalStatus === 'Active') {
                        if (item.bayAvailableStatus === 'Empty') {
                            outputEmpty.push(item);
                        }
                        if (item.bayAvailableStatus === 'InQueue') {
                            outputInQueue.push(item)
                        }
                    }
                });
            }
            if (outputEmpty.length === 0) {
                return outputInQueue;
            }
            else return outputEmpty;
        };
    })