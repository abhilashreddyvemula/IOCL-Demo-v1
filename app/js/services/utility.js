angular.module('myApp.utility',[])
.service('utility', ['$http', function($http){
    var token = '';
    var user = {'name': '', 'password': ''};
    this.getToken = function(){
        return this.token;
    }
    this.generateToken = function(name, password){
        var hash = btoa(name+':'+password);
        return 'Basic ' + hash; 
    }

    this.getHeaders = function(){
        return { 'Content-Type': 'application/json', 'Authorization': this.generateToken(user.name, user.password) };
    }

    this.setCredentials = function(userdetails){
        console.log(userdetails);
        user = userdetails;
        // $http.defaults.headers.common['Authorization'] = this.generateToken(user.name, user.password);
    }
    this.clearCredentials = function(){
        user =  {'name': '', 'password': ''};
        // $http.defaults.headers.common.Authorization = 'Basic ';
    }
}]);