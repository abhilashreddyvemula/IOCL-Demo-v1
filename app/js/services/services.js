angular.module('myApp.services', [])
    // Login Services
    .service('loginService', ['$http', 'utility', function ($http, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/usermanagement';

        this.userValidation = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/uservalidation';
            console.log(url, headers);
            return $http({
                method: 'GET', url: url,
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
    }])

    // Users Services
    .service('UsersService', ['$http', 'utility', function ($http, utility) {
        var baseUrl = 'http://103.92.235.45/IOCLAutomation/iocl/usermanagement';

        this.getUsersList = function () {
            var headers = utility.getHeaders();
            var url = baseUrl + '/getUsers';
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
    }]);