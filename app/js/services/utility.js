angular.module('myApp.utility',[])
.service('utility', ['$http', function($http){
    var token = '';
    var user = {'name': '', 'password': ''};
    var userRole = '';
    this.setUserRole = function(role){
        userRole = role;
    }

    this.getUserRole = function(){
        return userRole;
    }

    this.getToken = function(){
        return token;
    }
    this.generateToken = function(name, password){
        var hash = btoa(name+':'+password);
        return 'Basic ' + hash; 
    }

    this.getHeaders = function(){
        return { 'Content-Type': 'application/json', 'Authorization': this.generateToken(user.name, user.password) };
    }

    this.setCredentials = function(userdetails){
        user = userdetails;
        // $http.defaults.headers.common['Authorization'] = this.generateToken(user.name, user.password);
    }
    this.getCredentials = function(){
        return user;
    }
    this.clearCredentials = function(){
        user =  {'name': '', 'password': ''};
        // $http.defaults.headers.common.Authorization = 'Basic ';
    }

    this.getHTMLDiv = function(fanSlip) {
        let html = '<table class="print-div" cellspacing="0" cellpadding="0" width="100%">'
        fanSlip.forEach(function(item){
            html += '<tr>';
            html += '<td width="50%" align="right">'+ item.title +'</td><td width="50%">'+ item.value +'</td>';
            html += '</tr>';
        });
        html += '</table>';

        return html;
    }
}]);