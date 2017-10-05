angular.module('myApp.utility',[])
.service('utility', ['$http', '$cookies', function($http, $cookies){
    var token = '';
    var userRole = '';
    this.setUserRole = function(role){
        userRole = role;
        $cookies.putObject('userRole', role);
    }

    this.getUserRole = function(){
        let userRole = $cookies.getObject('userRole');
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
        let user = this.getCredentials();
        return { 'Content-Type': 'application/json', 'Authorization': this.generateToken(user.name, user.password) };
    }

    this.setCredentials = function(userdetails){
        let user = userdetails;
        this.clearCredentials();
        $cookies.putObject('globals', user);
        // $http.defaults.headers.common['Authorization'] = this.generateToken(user.name, user.password);
    }
    this.getCredentials = function(){
        let userdetails = $cookies.getObject('globals');
        return userdetails;
    }
    this.clearCredentials = function(){
        $cookies.remove('globals');
        $cookies.remove('userRole');
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