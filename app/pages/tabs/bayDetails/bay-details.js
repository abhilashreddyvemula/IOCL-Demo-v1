angular.module('myApp.dashboard')
.controller('BayController', ['$scope', '$uibModal', 'utility', 'BayService', 'LoaderService', function($scope, $uibModal, utility, bayService, loader) {
    $scope.userRole = utility.getUserRole();
    $scope.bayItems = [];
    $scope.viewby = 10;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;

    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    }

    $scope.loadBayList = function() {
        loader.show();
        bayService.getCurrentBayOperationalDetails().then(function(response) {
            if (response.status == 200) {
                $scope.bayItems = response.data;
                $scope.totalItems = $scope.bayItems.length;
                loader.hide();
            }
        }, function(error) {
            alert('Unable to load the Bays details, Please reload the page...');
            loader.hide();
        });
    }

    $scope.loadBayList();
}]);