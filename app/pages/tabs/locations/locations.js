angular.module('myApp.dashboard')
    .controller('LocationsController', ['$scope', 'utility', 'LocationService', function($scope, utility, locationService) {
        $scope.userRole = utility.getUserRole();

        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;


        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newLocation = { "locationName": "", "locationCode": "", "address": "", "status": "" };
        $scope.locationList = [];

        $scope.dropDownValues = { 'Status': [] };



        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }

        $scope.isAddAvailable = function() {
            if ($scope.userRole === 'Super Admin')
                return true;
            else
                return false;
        }

        $scope.loadAllLocations = function() {
            locationService.getLocationsList().then(function(response) {
                $scope.locationList = response.data;
                $scope.totalItems = $scope.locationList.length;
            }, function(error) {});
        }

        $scope.loadDropdownsData = function() {
            //  alert("load user static data")
            locationService.getStaticLocationData().then(function(response) {
                $scope.dropDownValues.status = response.data.data.status;

                console.log(response.data);
            }, function(error) {});
        }

        $scope.addNewLocation = function() {

            $scope.addClicked = true;
            $scope.errorMessageLocationName = false;
            $scope.newLocation = { "locationName": "", "locationCode": "", "address": "", "status": "" };



        }

        $scope.onCancel = function() {
            $scope.addClicked = false;


        }
        $scope.saveLocation = function(location) {
            var body = { "locationName": newLocation.locationName, "locationCode": newLocation.locationCode, "address": newLocation.address, "status": newLocation.status };
            locationService.addLocation(body).then(function(success) {
                $scope.newLocation = { "locationName": "", "locationCode": "", "address": "", "status": "" };
                $scope.loadAllLocations();
                $scope.addClicked = false;
            }, function(error) {
                $scope.addClicked = true;
                console.log(error);
                console.log(error.data);
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Location  name Already Exist!") {
                    $scope.errorMessageLocationName = true;

                }

                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;

                }
                console.log($scope.errorMessage);

                return;
            });
        }

        $scope.loadAllLocations();
        $scope.loadDropdownsData();
    }]);