angular.module('myApp.modals', [])
  .controller('BayEditModalCtrl', function ($uibModalInstance, items, BayService) {
    var $ctrl = this;
    $ctrl.bay = angular.copy(items.bay);
    let oldBay = $ctrl.bay;
    $ctrl.dropDownValues = items.dropDownValues;

    $ctrl.update = function () {
      //$uibModalInstance.close($ctrl.selected.item);
      let editbayNumFlag = false;
      let editbayNameFlag = false;
      if($ctrl.bay.bayName !== oldBay.bayName){
        editbayNameFlag = true;
      }
      if($ctrl.bay.bayNum !== oldBay.bayNum){
        editbayNumFlag = true;
      }
      let bay = { 'bayName': $ctrl.bay.bayName, 'bayNum': $ctrl.bay.bayNum, 'bayType': $ctrl.bay.bayType, 'functionalStatus': $ctrl.bay.functionalStatus, 'editbayNumFlag': editbayNumFlag, 'editbayNameFlag': editbayNameFlag, 'bayId': $ctrl.bay.bayId }
      
      BayService.updateBay(bay).then(function (response) {
        console.log('Response', response);
        $ctrl.cancel();
      });
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })

  .controller('UserEditModalCtrl', function ($uibModalInstance, items, UsersService) {
    var $ctrl = this;
    $ctrl.format = 'yyyy-MM-dd';
    $ctrl.user = angular.copy(items.user);
    var actualPassword = items.user.userPassword;
    $ctrl.user.userDOB = new Date($ctrl.user.userDOB);
    $ctrl.user.userPassword = '********';
    let oldUser = $ctrl.user;
    $ctrl.dropDownValues = items.dropDownValues;
    console.log($ctrl.user, $ctrl.dropDownValues);
    $ctrl.update = function () {
      let editUserNameFlag = false;
      if($ctrl.user.userName !== oldUser.userName){
        editUserNameFlag = true;
      }
      //$uibModalInstance.close($ctrl.selected.item);
      var latestPassword = '';
      var pwdEditFlad = false;
      if($ctrl.user.userPassword === '********'){
        pwdEditFlad = false;
        latestPassword = actualPassword
      }
      else{
        pwdEditFlad = true;
        latestPassword = $ctrl.user.userPassword;

      }
      let user = { "userName": $ctrl.user.userName, "userFirstName": $ctrl.user.userFirstName, "userLastName": $ctrl.user.userFirstName, "userDOB": $ctrl.user.userDOB, "userAadharNum": $ctrl.user.userAadharNum, "userMobileNum":$ctrl.user.userMobileNum, "userPassword": latestPassword, "userType": $ctrl.user.userType, "userStatus": $ctrl.user.userStatus, "editUserNameFlag": editUserNameFlag, "userId": $ctrl.user.userID };
      UsersService.updateUser(user).then(function (response) {
        console.log('Response', response);
        $uibModalInstance.close({$value: 'updated'});
      });
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })

  .controller('ContractorEditModalCtrl', function ($uibModalInstance, items, ContractorsService) {
    var $ctrl = this;
    $ctrl.contractor = angular.copy(items.contractor);
    let oldContractor = $ctrl.contractor;
    $ctrl.dropDownValues = items.dropDownValues;
    console.log($ctrl.contractor, $ctrl.dropDownValues);
    $ctrl.update = function () {
      let editContractorNameFlag = false;
      if($ctrl.contractor.contractorName !== oldContractor.contractorName){
        editContractorNameFlag = true;
      }
      //$uibModalInstance.close($ctrl.selected.item);
      let contractor = { "contractorId": $ctrl.contractor.contractorId, "contractorName": $ctrl.contractor.contractorName, "contractorType": $ctrl.contractor.contractorType, "contractorState": $ctrl.contractor.contractorState, "contractorPinCode": $ctrl.contractor.contractorPinCode, "contractorOperationalStatus": $ctrl.contractor.contractorOperationalStatus, "contractorCity": $ctrl.contractor.contractorCity, "contractorAddress": $ctrl.contractor.contractorAddress, "editContractorNameFlag": editContractorNameFlag };
      ContractorsService.updateContractor(contractor).then(function (response) {
        console.log('Response', response);
        $ctrl.cancel();
      });
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })

  .controller('LocationEditModalCtrl', function ($uibModalInstance, items, LocationService) {
    var $ctrl = this;
    $ctrl.location = angular.copy(items.location);
    let oldLocation = $ctrl.location;
    $ctrl.dropDownValues = items.dropDownValues;
    console.log($ctrl.location, $ctrl.dropDownValues);
    $ctrl.update = function () {
      let editLocationNameFlag = false;
      let editLocationCodeFlag = false;
      if($ctrl.location.locationName !== oldLocation.locationName){
        editLocationNameFlag = true;
      }
      if($ctrl.location.locationCode !== oldLocation.locationCode){
        editLocationCodeFlag = true;
      }
      //$uibModalInstance.close($ctrl.selected.item);
      let location = { "locationName": $ctrl.location.locationName, "locationCode": $ctrl.location.locationCode, "operationalStatus": $ctrl.location.operationalStatus, "locationAddress": $ctrl.location.locationAddress, "state": $ctrl.location.state, "city": $ctrl.location.city, "pinCode": $ctrl.location.pinCode, "locationId": $ctrl.location.locationId, "editLocationNameFlag": editLocationNameFlag, "editLocationCodeFlag": editLocationCodeFlag };
      LocationService.updateLocation(location).then(function (response) {
        console.log('Response', response);
        $ctrl.cancel();
      });
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })

  .controller('QuantityEditModalCtrl', function ($uibModalInstance, items, QuantityService) {
    var $ctrl = this;
    $ctrl.quantity = angular.copy(items.quantity);
    let oldQuantity = $ctrl.quantity;
    $ctrl.dropDownValues = items.dropDownValues;
    console.log($ctrl.quantity, $ctrl.dropDownValues);
    $ctrl.update = function () {
      let editQuantityFlag = false;
      let editQuantityNameFlag = false;
      if($ctrl.quantity.quantity !== oldQuantity.quantity){
        editQuantityFlag = true;
      }
      if($ctrl.quantity.quantityName !== oldQuantity.quantityName){
        editQuantityNameFlag = true;
      }
      //$uibModalInstance.close($ctrl.selected.item);
      let quantity = { "quantityName": $ctrl.quantity.quantityName, "quantity": $ctrl.quantity.quantity, "quantityStatus": $ctrl.quantity.quantityStatus, "editQuantityFlag": editQuantityFlag, "editQuantityNameFlag": editQuantityNameFlag, "quantityId": $ctrl.quantity.quantityId };
      QuantityService.updateQuantity(quantity).then(function (response) {
        console.log('Response', response);
        $ctrl.cancel();
      });
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })

  .controller('OperatorViewModalCtrl', function ($uibModalInstance, items, FanSlipsService, utility) {
    var $ctrl = this;
    $ctrl.fanSlip = angular.copy(items.fanSlip);

    $ctrl.regenerate = function(){
      let fanSlip = {"truckNo": $ctrl.fanSlip.truckNumber, "driverName": $ctrl.fanSlip.driverName, "driverLicNo": "123456", "customer": $ctrl.fanSlip.customer, "quantity": $ctrl.fanSlip.quantity, "vehicleWgt": $ctrl.fanSlip.vehicleWeight,"destination": $ctrl.fanSlip.destination, "locationCode": $ctrl.fanSlip.locationCode, "bayNum": parseInt($ctrl.fanSlip.bayNum), "mobileNumber": "9898989898", "contractorName": $ctrl.fanSlip.contractorName, "fanCreatedBy": utility.getCredentials().name};
      FanSlipsService.regenerateFanSlip(fanSlip).then(function(response){
        console.log('Response', response);
        $ctrl.cancel();
      }, function(error){});
    }

    $ctrl.print = function(){
        let fanSlip = [ {'title': 'Truck Registration Number', 'value': $ctrl.fanSlip.truckNumber}, 
                        {'title': 'Driver Name', 'value': $ctrl.fanSlip.driverName}, 
                        {'title': 'Customer', 'value': $ctrl.fanSlip.customer}, 
                        {'title': 'Quantity', 'value': $ctrl.fanSlip.quantity},
                        {'title': 'Contractor', 'value': $ctrl.fanSlip.contractorName},
                        {'title': 'Destination', 'value': $ctrl.fanSlip.destination},
                        {'title': 'Location Code', 'value': $ctrl.fanSlip.locationCode},
                        {'title': 'Bay Number', 'value': parseInt($ctrl.fanSlip.bayNum)},
                        {'title': 'Bay Status', 'value': $ctrl.fanSlip.bayStatus},
                        {'title': 'Expiration Date', 'value': $ctrl.fanSlip.fanPinExpiration},
                        {'title': 'FAN Slip Number', 'value': 'XXXX'},
                        {'title': 'PIN', 'value': $ctrl.fanSlip.fanPin}
                      ];
        var printContents = utility.getHTMLDiv(fanSlip);
        var popupWin = window.open('', '_blank', 'width=500,height=500');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="app.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    }

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })