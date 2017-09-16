angular.module('myApp.dashboard')
    .controller('LocationsController', ['$scope', 'utility', 'LocationService', 'LoaderService', function ($scope, utility, locationService, loader) {

        $scope.userRole = utility.getUserRole();

        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;


        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newLocation = { "locationName": "", "locationCode": "", "locationAddress": "", "operationalStatus": "" };
        $scope.locationList = [];

        $scope.dropDownValues = { 'status': [] };



        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };
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

        $scope.loadAllLocations = function () {
            loader.show();
            locationService.getLocationsList().then(function (response) {
                console.log('locationList',response.data);
                $scope.locationList = response.data;
                $scope.totalItems = $scope.locationList.length;
                loader.hide();
            }, function (error) { });
        }

        $scope.loadDropdownsData = function () {
            //  alert("load user static data")
            locationService.getStaticLocationData().then(function (response) {
                $scope.dropDownValues.status = response.data.data.LocationStatus;
                console.log(response.data);
            }, function (error) { });
        }

        $scope.addNewLocation = function () {
            $scope.addClicked = true;
            $scope.errorMessageLocationName = false;
            $scope.newLocation = { "locationName": "", "locationCode": "", "locationAddress": "", "operationalStatus": "" };
        }

        $scope.onCancel = function () {
            $scope.addClicked = false;
        }
        $scope.saveLocation = function (location) {
            loader.show();
            var body = { "locationName": location.locationName, "locationCode": location.locationCode, "locationAddress": location.locationAddress, "operationalStatus": location.operationalStatus };
            locationService.addLocation(body).then(function (success) {
                $scope.newLocation = { "locationName": "", "locationCode": "", "locationAddress": "", "operationalStatus": "" };
                $scope.loadAllLocations();
                $scope.addClicked = false;
                loader.hide();
            }, function (error) {
                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Location  name Already Exist!") {
                    $scope.errorMessageLocationName = true;

                }
                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;
                }
                loader.hide();
                return;
            });
        }

        $scope.loadAllLocations();
        $scope.loadDropdownsData();
    }]);