angular.module('myApp.dashboard')
    .controller('LocationsController', ['$scope', '$uibModal', 'utility', 'LocationService', 'LoaderService', function($scope, $uibModal, utility, locationService, loader) {
        $scope.userRole = utility.getUserRole();
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.formInvalid = false;
        $scope.addClicked = false;
        $scope.newLocation = { "locationName": "", "locationCode": "", "locationAddress": "", "state": "", "city": "", "pinCode": "", "operationalStatus": "" };
        $scope.locationList = [];
        $scope.dropDownValues = { 'status': [], 'states': [] };

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

        $scope.loadAllLocations = function() {
            loader.show();
            locationService.getLocationsList().then(function(response) {
                $scope.locationList = response.data;
                $scope.totalItems = $scope.locationList.length;
                loader.hide();
            }, function(error) {
                alert('Unable to load the Contractors details, Please reload the page...');
            });
        }

        $scope.loadDropdownsData = function() {
            locationService.getStaticLocationData().then(function(response) {
                $scope.dropDownValues.status = response.data.data.LocationStatus;
                //$scope.dropDownValues.states = ["abc", "def"];
                $scope.dropDownValues.states = response.data.data.States;
            }, function(error) {
                alert('Unable to load the dropdown values, please try again...');
                $scope.addClicked = false;
            });
        }

        $scope.addNewLocation = function() {
            $scope.addClicked = true;
            $scope.errorMessageLocationName = false;
            $scope.errorMessagelocationCode = false;
            $scope.newLocation = { "locationName": "", "locationCode": "", "locationAddress": "", "state": "", "city": "", "pinCode": "", "operationalStatus": "" };
            $scope.loadDropdownsData();
        }

        $scope.onCancel = function() {
            $scope.addClicked = false;
        }
        $scope.saveLocation = function(location) {
            loader.show();
            $scope.errorMessageLocationName = false;
            var body = { "locationName": location.locationName, "locationCode": location.locationCode, "locationAddress": location.locationAddress, "state": location.state, "city": location.city, "pinCode": location.pinCode, "operationalStatus": location.operationalStatus, "userName": utility.getCredentials().name };
            locationService.addLocation(body).then(function(success) {
                $scope.newLocation = { "locationName": "", "locationCode": "", "locationAddress": "", "state": "", "city": "", "pinCode": "", "operationalStatus": "" };
                alert('Location added successfully...');
                $scope.loadAllLocations();
                $scope.addClicked = false;
                loader.hide();
            }, function(error) {
                $scope.addClicked = true;
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Location with a location name already exist!") {
                    $scope.errorMessageLocationName = true;
                }
                if ($scope.errorMessage == "Location with a location code already exist!") {
                    $scope.errorMessagelocationCode = true;
                }
                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;
                    alert('Unable to add new Location, please try again...');
                }
                loader.hide();
                return;
            });
        }

        $scope.openEditModal = function(size, item) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'pages/tabs/modals/location-edit-modal.html',
                controller: 'LocationEditModalCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function() {
                        return { 'location': item, 'dropDownValues': $scope.dropDownValues };
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                if (selectedItem.$value === 'updated') {
                    $scope.loadAllLocations();
                }
            }, function() {});


        };

        $scope.loadAllLocations();
        $scope.loadDropdownsData();
    }]);