angular.module('myApp.dashboard')
.controller('ContractorsController', ['$scope', 'utility', 'ContractorsService', function ($scope, utility, contractorsService) {
    $scope.userRole = utility.getUserRole();

    $scope.viewby = 10;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;

        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newContractor = { "contractorName": "", "contractorType": "", "contractorState": "", "contractorPinCode": "", "contractorOperationalStatus": "", "contractorCity": "", "contractorAddress": "" };
        $scope.contractorList = [];

        $scope.dropDownValues = { 'UserStatus': [], 'UserTypes': [] };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }


    $scope.isAddAvailable = function(){
        if($scope.userRole === 'Super Admin')
            return true;
        else
            return false;
    }
    
    $scope.loadAllContractors = function(){
        contractorsService.getContractorsList().then(function(response){
            $scope.contractorList = response.data;
            $scope.totalItems = $scope.contractorList.length;
        }, function(error){});
    }


        $scope.addNewContractor = function() {

            $scope.addClicked = true;
            $scope.errorMessageContractorName = false;
            $scope.newContractor = { "contractorName": "", "contractorType": "", "contractorState": "", "contractorPinCode": "", "contractorOperationalStatus": "", "contractorCity": "", "contractorAddress": "" };



        }

        $scope.onCancel = function() {
            $scope.addClicked = false;


        }
        $scope.saveContractor = function(contractor) {
            var body = { "contractorName": contractor.contractorName, "contractorType": contractor.contractorType, "contractorState": contractor.contractorState, "contractorPinCode": contractor.contractorPinCode, "contractorOperationalStatus": contractor.contractorOperationalStatus, "contractorCity": contractor.contractorCity, "contractorAddress": contractor.contractorAddress };
            contractorsService.addContractor(body).then(function(success) {
                $scope.newContractor = { "contractorName": "", "contractorType": "", "contractorState": "", "contractorPinCode": "", "contractorOperationalStatus": "", "contractorCity": "", "contractorAddress": "" };
                $scope.loadAllContractors();
                $scope.addClicked = false;
            }, function(error) {
                $scope.addClicked = true;
                console.log(error);
                console.log(error.data);
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "User Already Exist!!") {
                    $scope.errorMessageUserName = true;

                }

                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;

                }
                console.log($scope.errorMessage);

                return;
            });
        }

        $scope.loadAllContractors();
        //$scope.loadDropdownsData();
    }]);