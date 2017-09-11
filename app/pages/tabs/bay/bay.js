angular.module('myApp.dashboard')
    .controller('BayController', ['$scope', 'BayService', function($scope, bayService) {
        $scope.bayItems = [];
        $scope.newBay = { "bayName": "", "bayNum": null, "bayType": "", "functionalStatus": "" }
        $scope.viewby = 10;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.errorMessage = '';
        $scope.errorMessageBayName = false;
        $scope.errorMessageBayNum = false;
        $scope.formInvalid = false;

        $scope.addClicked = false;

        $scope.sortReverse = 'bayId';
        $scope.dropDownValues = { 'bayStatus': [], 'bayTypes': [] }

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first paghe
        }

        $scope.loadBayList = function() {
            bayService.getBayList().then(function(response) {
                if (response.status == 200) {
                    $scope.bayItems = response.data;
                    $scope.totalItems = $scope.bayItems.length;
                }

            }, function(error) {
                console.log(error);
            });
        }

        $scope.loadDropdownsData = function() {
            bayService.getBayStaticData().then(function(response) {
                $scope.dropDownValues.bayStatus = response.data.data.BayStatus;
                $scope.dropDownValues.bayTypes = response.data.data.BayTypes;
            }, function(error) {});
        }

        $scope.addNewBay = function() {

            $scope.addClicked = true;
            $scope.errorMessageBayNum = false;
            $scope.errorMessageBayName = false;

            $scope.newBay = { "bayName": "", "bayNum": null, "bayType": "", "functionalStatus": "" }

        }

        $scope.onCancel = function() {
            $scope.addClicked = false;


        }



        $scope.saveBay = function(bay) {



            var body = { 'bayName': bay.bayName, 'bayNum': parseInt(bay.bayNum), 'bayType': bay.bayType, 'functionalStatus': bay.functionalStatus };
            bayService.addBay(body).then(function(success) {

                $scope.addClicked = false;
                $scope.loadBayList();

            }, function(error) {

                $scope.addClicked = true;
                console.log(error);
                console.log(error.data);
                $scope.errorMessage = error.data.errorMessage;
                if ($scope.errorMessage == "Bay with a bay num already exist!") {
                    $scope.errorMessageBayNum = true;
                    $scope.errorMessageBayName = false;
                }
                if ($scope.errorMessage == "Bay with a bay name already exist!") {
                    $scope.errorMessageBayName = true;
                    $scope.errorMessageBayNum = false;
                }
                if ($scope.errorMessage !== null) {
                    $scope.formInvalid = true;

                }
                console.log($scope.errorMessage);

                return;
            });


        }

        $scope.sort = function(key) {
            //console.log(key);
            if ($scope.sortByKey === key) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortByKey = key;
                $scope.sortReverse = false;
            }
        }

        $scope.loadBayList();
        $scope.loadDropdownsData();
    }]);