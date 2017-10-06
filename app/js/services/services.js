angular.module('myApp.services', [])
    // Login Services
    .service('loginService', ['$http', 'utility', function ($http, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/usermanagement';

        this.userValidation = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/uservalidation';
            console.log(url, headers);
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }
    }])
    // Bay Services
    .service('BayService', ['$http', 'utility', function ($http, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/baysmanagement';

        this.getBayList = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getAllBayDetails';
            //var url = 'data/bay.json';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.addBay = function (bay) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/bayscreation';
            //var url = 'data/bay.json';

            return $http({
                method: 'POST',
                url: url,
                headers: headers,
                data: JSON.stringify(bay)
            });
        }

        this.getBayStaticData = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getBayStaticData';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.updateBay = function (bay) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/baysupdation';

            return $http({
                method: 'PUT',
                url: url,
                headers: headers,
                data: JSON.stringify(bay)
            });
        }
    }])

    // Users Services
    .service('UsersService', ['$http', 'utility', function ($http, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/usermanagement';
        this.getUsersList = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getUsers?UserRole=' + utility.getUserRole();
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.addUser = function (user) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/usercreation';
            //var url = 'data/bay.json';

            return $http({
                method: 'POST',
                url: url,
                headers: headers,
                data: JSON.stringify(user)
            });
        }

        this.deleteUser = function (userId) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/deleteUser?UserID=' + userId;
            return $http({
                method: 'DELETE',
                url: url,
                headers: headers
            });
        }

        this.getStaticUserData = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getStaticUserData?UserRole=' + utility.getUserRole();
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.updateUser = function (user) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/updateuser';

            return $http({
                method: 'PUT',
                url: url,
                headers: headers,
                data: JSON.stringify(user)
            });
        }
    }])

    // Contractors Services
    .service('ContractorsService', ['$http', 'utility', function ($http, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/contractorsmanagement';

        this.getContractorsList = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getContractorDetails';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.addContractor = function (contractor) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/addContractor';

            return $http({
                method: 'POST',
                url: url,
                headers: headers,
                data: JSON.stringify(contractor)
            });
        }

        this.getContractorsStaticData = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getContractorStaticData';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.updateContractor = function (contractor) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/updateContractor';

            return $http({
                method: 'PUT',
                url: url,
                headers: headers,
                data: JSON.stringify(contractor)
            });
        }
    }])

    // Location Services
    .service('LocationService', ['$http', 'utility', function ($http, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/locationsmanagement';
        this.getLocationsList = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getLocationDetails';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.addLocation = function (location) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/addLocation';

            return $http({
                method: 'POST',
                url: url,
                headers: headers,
                data: JSON.stringify(location)
            });
        }

        this.getStaticLocationData = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getStaticLocationData';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.updateLocation = function (location) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/updateLocation';

            return $http({
                method: 'PUT',
                url: url,
                headers: headers,
                data: JSON.stringify(location)
            });
        }
    }])

    // Quantity Services
    .service('QuantityService', ['$http', 'utility', function ($http, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/quantitymanagement';
        this.getQuantityList = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getQuantityDetails';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.addQuantity = function (quantity) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/addQuantity';

            return $http({
                method: 'POST',
                url: url,
                headers: headers,
                data: JSON.stringify(quantity)
            });
        }

        this.getStaticQuantityData = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getQuantityStaticData';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.updateQuantity = function (quantity) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/updateQuantity';

            return $http({
                method: 'PUT',
                url: url,
                headers: headers,
                data: JSON.stringify(quantity)
            });
        }
    }])

    // Fan Slip Services
    .service('FanSlipsService', ['$http', '$filter', 'utility', function ($http, $filter, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/fanslipmanagement';
        this.getFanSlipsList = function () {
            var headers = utility.getHeaders();
            var current_date = $filter('date')(new Date(), "yyyy-MM-dd");
            var url = baseUrl + '/getFanslipsDetails?selectedDate=' + current_date;
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.addFanSlip = function (fanSlip) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/fanslipgen';

            return $http({
                method: 'POST',
                url: url,
                headers: headers,
                data: JSON.stringify(fanSlip)
            });
        }

        this.getfanSlipStaticData = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getFanStaticData';
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            });
        }

        this.updateFanSlip = function (fanSlip) {
            var headers = utility.getHeaders();
            var url = baseUrl + '/fanslipCancellation?FanId=1&UserName="Rahul"';

            return $http({
                method: 'PUT',
                url: url,
                headers: headers,
                data: JSON.stringify(quantity)
            });
        }

        this.regenerateFanSlip = function(fanSlip){
            var headers = utility.getHeaders();
            var url = baseUrl + '/fanslipReGeneration';

            return $http({
                method: 'POST',
                url: url,
                headers: headers,
                data: JSON.stringify(fanSlip)
            });
        }

        this.cancelFanSlip = function(fanSlipId, user){
            var headers = utility.getHeaders();
            var url = baseUrl + '/fanslipCancellation?FanId='+fanSlipId+'&UserName='+ user;

            return $http({
                method: 'PUT',
                url: url,
                headers: headers
            });
        }
    }]);
