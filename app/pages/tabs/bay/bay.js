angular.module('myApp.dashboard')
    .controller('BayController', ['$scope', 'utility', 'BayService', 'LoaderService', function ($scope, utility, bayService, loader) {
        $scope.userRole = utility.getUserRole();

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

        $scope.orderByField = 'bayId';
        $scope.dropDownValues = { 'bayStatus': [], 'bayTypes': [] }

        $scope.isAddAvailable = function () {
            if ($scope.userRole === 'Super Admin')
                return true;
            else
                return false;
        }
        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first paghe
        }

        $scope.loadBayList = function () {
            loader.show();
            bayService.getBayList().then(function (response) {
                if (response.status == 200) {
                    $scope.bayItems = response.data;
                    $scope.totalItems = $scope.bayItems.length;
                    loader.hide();
                }

            }, function (error) {
                console.log(error);
                loader.hide();
            });
        }

        $scope.loadDropdownsData = function () {
            bayService.getBayStaticData().then(function (response) {
                $scope.dropDownValues.bayStatus = response.data.data.BayStatus;
                $scope.dropDownValues.bayTypes = response.data.data.BayTypes;
            }, function (error) { });
        }

        $scope.addNewBay = function () {

            $scope.addClicked = true;
            $scope.errorMessageBayNum = false;
            $scope.errorMessageBayName = false;

            $scope.newBay = { "bayName": "", "bayNum": null, "bayType": "", "functionalStatus": "" }

        }

        $scope.onCancel = function () {
            $scope.addClicked = false;


        }



        $scope.saveBay = function (bay) {
            loader.show();
            var body = { 'bayName': bay.bayName, 'bayNum': parseInt(bay.bayNum), 'bayType': bay.bayType, 'functionalStatus': bay.functionalStatus };
            bayService.addBay(body).then(function (success) {
                $scope.newBay = { "bayName": "", "bayNum": null, "bayType": "", "functionalStatus": "" }
                $scope.addClicked = false;
                $scope.loadBayList();
                loader.hide();
            }, function (error) {

                $scope.addClicked = true;
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
                loader.hide();

                return;
            });


        }

        // $scope.sort = function(key) {
        //     //console.log(key);
        //     if ($scope.sortByKey === key) {
        //         $scope.sortReverse = !$scope.sortReverse;
        //     } else {
        //         $scope.sortByKey = key;
        //         $scope.sortReverse = false;
        //     }
        // }

        $scope.loadBayList();
        $scope.loadDropdownsData();
    }]);