angular.module('myApp.dashboard')
    .controller('QuantController', ['$scope', '$uibModal', 'utility', 'QuantityService', 'LoaderService', function ($scope, $uibModal, utility, quantityService, loader) {
        $scope.userRole = utility.getUserRole();
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newQuantity = { "quantityName": "", "quantity": "", "operationalStatus": "" };
        $scope.quantityList = [];
        $scope.dropDownValues = { 'status': [] };

        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }

        $scope.isAddAvailable = function () {
            if ($scope.userRole === 'Super Admin')
                return true;
            else
                return false;
        }

        $scope.loadAllQuantities = function () {
            loader.show();
            quantityService.getQuantityList().then(function (response) {
                $scope.quantityList = response.data;
                $scope.totalItems = $scope.quantityList.length;
                loader.hide();
            }, function (error) { 
                loader.hide();
                alert('Unable to load the Quantity details, Please reload the page...');
            });
        }

        $scope.loadDropdownsData = function () {
            quantityService.getStaticQuantityData().then(function(response) {
                $scope.dropDownValues.status = response.data.data.Status;
            }, function(error) {
                alert('Unable to load the dropdown values, please try again...');
                $scope.addClicked = false;
            });
        }

        $scope.addNewQuantity = function () {
            $scope.addClicked = true;
            $scope.errorMessageQuantityName = false;
            $scope.newQuantity = { "quantityName": "", "quantity": "", "operationalStatus": "" };
            $scope.loadDropdownsData();
        }

        $scope.onCancel = function () {
            $scope.addClicked = false;
        }
        $scope.saveQuantity = function (newQuantity) {
            loader.show();
            var body = { "quantityName": newQuantity.quantityName, "quantity": newQuantity.quantity, "quantityStatus": newQuantity.operationalStatus };
            quantityService.addQuantity(body).then(function (success) {
                $scope.newQuantity = { "quantityName": "", "quantity": "", "operationalStatus": "" };
                alert('Quantity added successfully...');
                $scope.loadAllQuantities();
                $scope.addClicked = false;
                loader.hide();
            }, function (error) {
                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Qunatity with a qunatity name already exist!") {
                    $scope.errorMessageQuantityName = true;
                }
                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;
                    alert('Unable to add new Quantity, please try again...');
                }
                loader.hide();
                return;
            });
        }

        $scope.openEditModal = function (size, item) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/tabs/modals/quantity-edit-modal.html',
                controller: 'QuantityEditModalCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function () {
                        return {'quantity': item, 'dropDownValues': $scope.dropDownValues};
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                if (selectedItem.$value === 'updated') {
                    $scope.loadAllQuantities();
                }
            }, function () {
            });
        };

        $scope.loadAllQuantities();
        $scope.loadDropdownsData();

    }]);