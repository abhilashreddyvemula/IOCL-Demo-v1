angular.module('myApp.dashboard')
.controller('ContractorsController', ['$scope', 'ContractorsService', function ($scope, contractorsService) {
    $scope.viewby = 10;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;

    $scope.newContractor = {"contractorName": "", "contractorType": "" ,"contractorState": "", "contractorPinCode": "", "contractorOperationalStatus": "", "contractorCity": "", "contractorAddress": ""};
    $scope.contractorList = [];

    $scope.pageChanged = function () {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    }

    $scope.loadAllContractors = function(){
        contractorsService.getContractorsList().then(function(response){
            $scope.contractorList = response.data;
            $scope.totalItems = $scope.contractorList.length;
        }, function(error){});
    }

    $scope.saveContractor = function (contractor) {
        var body = {"contractorName": contractor.contractorName, "contractorType": contractor.contractorType ,"contractorState": contractor.contractorState, "contractorPinCode": contractor.contractorPinCode, "contractorOperationalStatus": contractor.contractorOperationalStatus, "contractorCity": contractor.contractorCity, "contractorAddress": contractor.contractorAddress};
        contractorsService.addContractor(body).then(function (success) {
            $scope.newContractor = {"contractorName": "", "contractorType": "" ,"contractorState": "", "contractorPinCode": "", "contractorOperationalStatus": "", "contractorCity": "", "contractorAddress": ""};
            $scope.loadAllContractors();
        }, function (error) {
            console.log(error);
        });
    }

    $scope.loadAllContractors();
}]);