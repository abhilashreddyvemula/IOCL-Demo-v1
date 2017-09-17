angular.module('myApp.modals', [])
.controller('BayEditModalCtrl', function ($uibModalInstance, items, BayService) {
    var $ctrl = this;
    $ctrl.bay = items.bay;
    $ctrl.dropDownValues = items.dropDownValues;
  
    $ctrl.save = function () {
      //$uibModalInstance.close($ctrl.selected.item);
    };
  
    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });