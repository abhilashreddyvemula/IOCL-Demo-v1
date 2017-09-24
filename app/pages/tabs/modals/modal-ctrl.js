angular.module('myApp.modals', [])
  .controller('BayEditModalCtrl', function ($uibModalInstance, items, BayService) {
    var $ctrl = this;
    $ctrl.bay = items.bay;
    $ctrl.dropDownValues = items.dropDownValues;

    $ctrl.update = function () {
      //$uibModalInstance.close($ctrl.selected.item);
      let bay = { 'bayName': $ctrl.bay.bayName, 'bayNum': $ctrl.bay.bayNum, 'bayType': $ctrl.bay.bayType, 'functionalStatus': $ctrl.bay.functionalStatus, 'editbayNumFlag': true, 'editbayNameFlag': true, 'bayId': $ctrl.bay.bayId }
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
    $ctrl.user = items.user;
    $ctrl.dropDownValues = items.dropDownValues;
    console.log($ctrl.user, $ctrl.dropDownValues);
    $ctrl.save = function () {
      //$uibModalInstance.close($ctrl.selected.item);
      let user = { "userName": $ctrl.user.userName, "userFirstName": $ctrl.user.userFirstName, "userLastName": $ctrl.user.userFirstName, "userDOB": $ctrl.user.userDOB, "userAadharNum": $ctrl.user.userAadharNum, "userMobileNum":$ctrl.user.userMobileNum, "userPassword": $ctrl.user.userPassword, "userType": $ctrl.user.userType, "userStatus": $ctrl.user.userStatus, "editUserNameFlag ": true, "userId": $ctrl.user.userId };
      UsersService.updateUser(user).then(function (response) {
        console.log('Response', response);
        $ctrl.cancel();
      });
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })

  .controller('ContractorEditModalCtrl', function ($uibModalInstance, items, ContractorsService) {
    var $ctrl = this;
    $ctrl.contractor = items.contractor;
    $ctrl.dropDownValues = items.dropDownValues;
    console.log($ctrl.contractor, $ctrl.dropDownValues);
    $ctrl.save = function () {
      //$uibModalInstance.close($ctrl.selected.item);
      let contractor = { "contractorId": $ctrl.contractor.contractorId, "contractorName": $ctrl.contractor.contractorName, "contractorType": $ctrl.contractor.contractorType, "contractorState": $ctrl.contractor.contractorState, "contractorPinCode": $ctrl.contractor.contractorPinCode, "contractorOperationalStatus": $ctrl.contractor.contractorOperationalStatus, "contractorCity": $ctrl.contractor.contractorCity, "contractorAddress": $ctrl.contractor.contractorAddress, "editContractorNameFlag": true };
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
    $ctrl.location = items.location;
    $ctrl.dropDownValues = items.dropDownValues;
    console.log($ctrl.location, $ctrl.dropDownValues);
    $ctrl.save = function () {
      //$uibModalInstance.close($ctrl.selected.item);
      let location = { "locationName": $ctrl.location.locationName, "locationCode": $ctrl.location.locationCode, "operationalStatus": $ctrl.location.operationalStatus, "locationAddress": $ctrl.location.locationAddress, "state": $ctrl.location.state, "city": $ctrl.location.city, "pinCode": $ctrl.location.pinCode, "locationId": $ctrl.location.locationId, "editLocationNameFlag": true, "editLo cationCodeFlag": true };
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
    $ctrl.quantity = items.quantity;
    $ctrl.dropDownValues = items.dropDownValues;
    console.log($ctrl.quantity, $ctrl.dropDownValues);
    $ctrl.save = function () {
      //$uibModalInstance.close($ctrl.selected.item);
      let quantity = { "quantityName": $ctrl.quantity.quantityName, "quantity": $ctrl.quantity.quantity, "quantityStatus": $ctrl.quantity.quantityStatus, "editQuantityFlag": "true", "editQuantityNameFlag": "true", "quantityId": $ctrl.quantity.quantityId };
      QuantityService.updateQuantity(quantity).then(function (response) {
        console.log('Response', response);
        $ctrl.cancel();
      });
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })