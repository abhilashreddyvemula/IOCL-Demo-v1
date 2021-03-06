angular.module('myApp.dashboard')
    .controller('ContractorsController', ['$scope', '$uibModal', 'utility', 'ContractorsService', 'LoaderService', function($scope, $uibModal, utility, contractorsService, loader) {
        $scope.userRole = utility.getUserRole();
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newContractor = { "contractorName": "", "contractorType": "", "contractorState": "", "contractorPinCode": "", "contractorOperationalStatus": "", "contractorCity": "", "contractorAddress": "" };
        $scope.contractorList = [];
        $scope.dropDownValues = { 'UserStatus': [], 'UserTypes': [] };

        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }

        $scope.isAddAvailable = function() {
            if ($scope.userRole === 'Super Admin' || $scope.userRole === 'Admin')
                return true;
            else
                return false;
        }

        $scope.loadAllContractors = function() {
            loader.show();
            contractorsService.getContractorsList().then(function(response) {
                $scope.contractorList = response.data;
                $scope.totalItems = $scope.contractorList.length;
                loader.hide();
            }, function(error) {
                loader.hide();
                alert('Unable to load the Contractors details, Please reload the page...');
            });
        }

        $scope.loadDropdownsData = function() {
            contractorsService.getContractorsStaticData().then(function(response) {
                $scope.dropDownValues.ContractorStatus = response.data.data.ContractorStatus;
                $scope.dropDownValues.States = response.data.data.States;
                $scope.dropDownValues.Types = response.data.data.Types;
            }, function(error) {
                alert('Unable to load the dropdown values, please try again...');
                $scope.addClicked = false;
            });
        }

        $scope.addNewContractor = function() {
            $scope.addClicked = true;
            $scope.errorMessageContractorName = false;
            $scope.newContractor = { "contractorName": "", "contractorType": "", "contractorState": "", "contractorPinCode": "", "contractorOperationalStatus": "", "contractorCity": "", "contractorAddress": "" };
            $scope.loadDropdownsData();
        }

        $scope.onCancel = function() {
            $scope.addClicked = false;
        }
        $scope.saveContractor = function(contractor) {
            loader.show();
            $scope.errorMessageContractorName = false;
            var body = { "contractorName": contractor.contractorName, "contractorType": contractor.contractorType, "contractorState": contractor.contractorState, "contractorPinCode": contractor.contractorPinCode, "contractorOperationalStatus": contractor.contractorOperationalStatus, "contractorCity": contractor.contractorCity, "contractorAddress": contractor.contractorAddress, "userName": utility.getCredentials().name };
            contractorsService.addContractor(body).then(function(success) {
                $scope.newContractor = { "contractorName": "", "contractorType": "", "contractorState": "", "contractorPinCode": "", "contractorOperationalStatus": "", "contractorCity": "", "contractorAddress": "" };
                alert('Contractor added successfully...');
                $scope.loadAllContractors();
                $scope.addClicked = false;
                loader.hide();
            }, function(error) {
                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Contractor with contractor name Already Exist!") {
                    $scope.errorMessageContractorName = true;
                }
                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;
                    alert('Unable to add new Contractor, please try again...');
                }
                loader.hide();

                return;
            });
        }

        $scope.openEditModal = function(size, item) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/tabs/modals/contractor-edit-modal.html',
                controller: 'ContractorEditModalCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function() {
                        return { 'contractor': item, 'dropDownValues': $scope.dropDownValues };
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                if (selectedItem.$value === 'updated') {
                    $scope.loadAllContractors();
                }
            }, function() {});

        };

        $scope.loadAllContractors();
        $scope.loadDropdownsData();
    }]);