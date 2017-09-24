angular.module('myApp.dashboard')
    .controller('QuantController', ['$scope', '$uibModal', 'utility', 'QuantityService', 'LoaderService', function ($scope, $uibModal, utility, quantityService, loader) {

        //'QuantityService', 
        //quantityService
        $scope.userRole = utility.getUserRole();

        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;


        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newQuantity = { "quantityName": "", "quantity": "", "operationalStatus": "" };
        $scope.quantityList = [];

        $scope.dropDownValues = { 'status': [] };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }
        console.log('Inside************');

        $scope.isAddAvailable = function () {
            if ($scope.userRole === 'Super Admin')
                return true;
            else
                return false;
        }


        $scope.loadAllQuantities = function () {
            loader.show();
            quantityService.getQuantityList().then(function (response) {
                console.log('quantityList', response.data);
                $scope.quantityList = response.data;
                $scope.totalItems = $scope.quantityList.length;
                loader.hide();
            }, function (error) { });
        }

        $scope.loadDropdownsData = function () {
            // alert("load user static data")
            quantityService.getStaticQuantityData().then(function(response) {
                $scope.dropDownValues.status = response.data.data.Status;
                console.log(response.data);
            }, function(error) {});
        }

        $scope.addNewQuantity = function () {
            $scope.addClicked = true;
            $scope.errorMessageQuantityName = false;
            $scope.newQuantity = { "quantityName": "", "quantity": "", "operationalStatus": "" };
        }

        $scope.onCancel = function () {
            $scope.addClicked = false;


        }
        $scope.saveQuantity = function (newQuantity) {
            loader.show();
            var body = { "quantityName": newQuantity.quantityName, "quantity": newQuantity.quantity, "quantityStatus": newQuantity.operationalStatus };
            quantityService.addQuantity(body).then(function (success) {
                $scope.newQuantity = { "quantityName": "", "quantity": "", "operationalStatus": "" };
                $scope.loadAllQuantities();
                $scope.addClicked = false;
                loader.hide();
            }, function (error) {
                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Quantity name Already Exist!") {
                    $scope.errorMessageQuantityName = true;

                }

                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;

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

        };

        $scope.loadAllQuantities();
        $scope.loadDropdownsData();

    }]);