angular.module('myApp.dashboard')
.controller('QuantityController', ['$scope', function ($scope) {
    $scope.viewby = 10;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.pageChanged = function () {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    }
}]);