angular.module('myApp.dashboard')
    .controller('QuantityController', ['$scope', 'utility', 'QuantityService', function($scope, utility, quantityService) {
        $scope.userRole = utility.getUserRole();

        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;


        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newQuantity = { "quantityName": "", "quantity": "", "status": "" };
        $scope.quantityList = [];

        $scope.dropDownValues = { 'Status': [] };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }
        console.log('Inside************');

        $scope.isAddAvailable = function() {
            if ($scope.userRole === 'Super Admin')
                return true;
            else
                return false;
        }


        $scope.loadAllQuantities = function() {
            quantityService.getQuantityList().then(function(response) {
                $scope.quantityList = response.data;
                $scope.totalItems = $scope.quantityList.length;
            }, function(error) {});
        }

        $scope.loadDropdownsData = function() {
            //  alert("load user static data")
            quantityService.getStaticQuantityData().then(function(response) {
                $scope.dropDownValues.status = response.data.data.status;

                console.log(response.data);
            }, function(error) {});
        }

        $scope.addNewQuantity = function() {

            $scope.addClicked = true;
            $scope.errorMessageQuantityName = false;
            $scope.newQuantity = { "quantityName": "", "quantity": "", "status": "" };



        }

        $scope.onCancel = function() {
            $scope.addClicked = false;


        }
        $scope.saveQuantity = function(location) {
            var body = { "quantityName": newQuantity.locationName, "quantity": newQuantity.locationCode, "status": newQuantity.address };
            quantityService.addQuantity(body).then(function(success) {
                $scope.newQuantity = { "quantityName": "", "quantity": "", "status": "" };
                $scope.loadAllQuantities();
                $scope.addClicked = false;
            }, function(error) {
                $scope.addClicked = true;
                console.log(error);
                console.log(error.data);
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Quantity  name Already Exist!") {
                    $scope.errorMessageQuantityName = true;

                }

                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;

                }
                console.log($scope.errorMessage);

                return;
            });
        }

        $scope.loadAllQuantities();
        $scope.loadDropdownsData();

    }]);